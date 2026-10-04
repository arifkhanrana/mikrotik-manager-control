import { DurableObject } from "cloudflare:workers";
import { Hono } from "hono";

export class App extends DurableObject {
  private app: Hono;
  private initialized = false;

  constructor(ctx: DurableObjectState, env: Record<string, unknown>) {
    super(ctx, env);
    this.app = new Hono();
    this.setupRoutes();
  }

  private initDatabase() {
    if (this.initialized) return;

    // Create tables
    this.ctx.storage.sql.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'user',
        plan TEXT NOT NULL DEFAULT 'Pro',
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS routers (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        ip_address TEXT NOT NULL,
        port INTEGER NOT NULL DEFAULT 8728,
        username TEXT NOT NULL DEFAULT 'admin',
        password TEXT NOT NULL DEFAULT '',
        location TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'online',
        model TEXT NOT NULL DEFAULT 'hAP ac3',
        ros_version TEXT NOT NULL DEFAULT '7.14.2',
        cpu_usage INTEGER NOT NULL DEFAULT 15,
        ram_usage INTEGER NOT NULL DEFAULT 35,
        hotspot_interface TEXT NOT NULL DEFAULT 'bridge-hotspot',
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        router_id TEXT,
        name TEXT NOT NULL,
        validity_value INTEGER NOT NULL,
        validity_unit TEXT NOT NULL,
        rate_limit_dl INTEGER NOT NULL,
        rate_limit_ul INTEGER NOT NULL,
        shared_users INTEGER NOT NULL DEFAULT 1,
        price REAL NOT NULL,
        data_limit_mb INTEGER NOT NULL DEFAULT 0,
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS vouchers (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        router_id TEXT NOT NULL,
        profile_id TEXT NOT NULL,
        profile_name TEXT NOT NULL,
        code TEXT NOT NULL,
        password TEXT NOT NULL,
        batch_tag TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        price REAL NOT NULL,
        created_at INTEGER NOT NULL,
        activated_at INTEGER,
        expires_at INTEGER,
        used_by_mac TEXT,
        data_used_mb INTEGER DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS sales (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        router_id TEXT NOT NULL,
        voucher_id TEXT NOT NULL,
        profile_name TEXT NOT NULL,
        amount REAL NOT NULL,
        payment_method TEXT NOT NULL DEFAULT 'Cash / Counter',
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS active_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        router_id TEXT NOT NULL,
        username TEXT NOT NULL,
        ip_address TEXT NOT NULL,
        mac_address TEXT NOT NULL,
        uptime_seconds INTEGER NOT NULL,
        bytes_in INTEGER NOT NULL,
        bytes_out INTEGER NOT NULL,
        created_at INTEGER NOT NULL
      );

      CREATE TABLE IF NOT EXISTS system_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        level TEXT NOT NULL,
        message TEXT NOT NULL,
        category TEXT NOT NULL,
        created_at INTEGER NOT NULL
      );
    `);

    // Seed initial data if database is fresh
    const userCount = this.ctx.storage.sql
      .exec(`SELECT COUNT(*) as c FROM users`)
      .one().c as number;

    if (userCount === 0) {
      const now = Date.now();
      const adminId = "usr_admin_001";
      const demoUserId = "usr_demo_001";

      // Users
      this.ctx.storage.sql.exec(
        `INSERT INTO users (id, email, password, name, role, plan, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        adminId, "admin@mikrotik.io", "admin123", "System Administrator", "admin", "Enterprise", now
      );
      this.ctx.storage.sql.exec(
        `INSERT INTO users (id, email, password, name, role, plan, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        demoUserId, "john@wifi-provider.net", "user123", "John Doe (Hotspot Operator)", "user", "Pro", now
      );

      // Routers
      const r1 = "rtr_beach_cafe";
      const r2 = "rtr_hotel_lobby";
      const r3 = "rtr_city_mall";

      this.ctx.storage.sql.exec(
        `INSERT INTO routers (id, user_id, name, ip_address, port, username, password, location, status, model, ros_version, cpu_usage, ram_usage, hotspot_interface, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        r1, demoUserId, "Beach Cafe WiFi", "192.168.88.1", 8728, "admin", "cafe@pass2026", "Sunset Beach, Bay #3", "online", "hAP ac3 (RBD53iG-5HAC2HnD)", "v7.14.2", 18, 42, "bridge-hotspot", now
      );
      this.ctx.storage.sql.exec(
        `INSERT INTO routers (id, user_id, name, ip_address, port, username, password, location, status, model, ros_version, cpu_usage, ram_usage, hotspot_interface, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        r2, demoUserId, "Grand Hotel Lobby", "10.0.10.1", 8728, "sysadmin", "hotel#9981", "Grand Hotel Main Lobby", "online", "RB3011UiAS-RM", "v7.12.1", 29, 64, "ether2-hotspot", now
      );
      this.ctx.storage.sql.exec(
        `INSERT INTO routers (id, user_id, name, ip_address, port, username, password, location, status, model, ros_version, cpu_usage, ram_usage, hotspot_interface, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        r3, demoUserId, "City Mall Food Court", "172.16.1.1", 8728, "api_user", "mall_wifi_sec", "City Mall Level 2 Food Court", "online", "CCR1009-7G-1C-1S+", "v7.15.1", 8, 22, "sfp1-hotspot", now
      );

      // Profiles
      const p1 = "prf_1h";
      const p2 = "prf_24h";
      const p3 = "prf_7d";
      const p4 = "prf_30d";

      this.ctx.storage.sql.exec(
        `INSERT INTO profiles (id, user_id, router_id, name, validity_value, validity_unit, rate_limit_dl, rate_limit_ul, shared_users, price, data_limit_mb, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        p1, demoUserId, r1, "1 Hour Express (5 Mbps)", 1, "hours", 5, 2, 1, 1.00, 500, now
      );
      this.ctx.storage.sql.exec(
        `INSERT INTO profiles (id, user_id, router_id, name, validity_value, validity_unit, rate_limit_dl, rate_limit_ul, shared_users, price, data_limit_mb, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        p2, demoUserId, r1, "24 Hours Day Pass (10 Mbps)", 1, "days", 10, 5, 2, 3.50, 2048, now
      );
      this.ctx.storage.sql.exec(
        `INSERT INTO profiles (id, user_id, router_id, name, validity_value, validity_unit, rate_limit_dl, rate_limit_ul, shared_users, price, data_limit_mb, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        p3, demoUserId, r2, "7 Days Weekly Turbo", 7, "days", 15, 5, 2, 12.00, 10240, now
      );
      this.ctx.storage.sql.exec(
        `INSERT INTO profiles (id, user_id, router_id, name, validity_value, validity_unit, rate_limit_dl, rate_limit_ul, shared_users, price, data_limit_mb, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        p4, demoUserId, r3, "30 Days Monthly Unlimited", 30, "days", 25, 10, 3, 35.00, 0, now
      );

      // Sample Vouchers
      const voucherSamples = [
        { code: "CAFE-8821", pass: "4912", status: "used", price: 1.00, prof: "1 Hour Express (5 Mbps)", pid: p1, rid: r1, mac: "A4:C3:F0:12:88:91", mb: 342, tag: "CAFE-BATCH-01" },
        { code: "CAFE-8822", pass: "8812", status: "active", price: 1.00, prof: "1 Hour Express (5 Mbps)", pid: p1, rid: r1, mac: null, mb: 0, tag: "CAFE-BATCH-01" },
        { code: "CAFE-8823", pass: "3319", status: "active", price: 1.00, prof: "1 Hour Express (5 Mbps)", pid: p1, rid: r1, mac: null, mb: 0, tag: "CAFE-BATCH-01" },
        { code: "CAFE-8824", pass: "1092", status: "expired", price: 1.00, prof: "1 Hour Express (5 Mbps)", pid: p1, rid: r1, mac: "B8:27:EB:44:11:00", mb: 500, tag: "CAFE-BATCH-01" },
        { code: "DAY-9901", pass: "7721", status: "used", price: 3.50, prof: "24 Hours Day Pass (10 Mbps)", pid: p2, rid: r1, mac: "3C:A6:2F:89:10:44", mb: 1280, tag: "MAY-DAYPASS" },
        { code: "DAY-9902", pass: "6152", status: "active", price: 3.50, prof: "24 Hours Day Pass (10 Mbps)", pid: p2, rid: r1, mac: null, mb: 0, tag: "MAY-DAYPASS" },
        { code: "DAY-9903", pass: "9012", status: "active", price: 3.50, prof: "24 Hours Day Pass (10 Mbps)", pid: p2, rid: r1, mac: null, mb: 0, tag: "MAY-DAYPASS" },
        { code: "HOTEL-701", pass: "3310", status: "used", price: 12.00, prof: "7 Days Weekly Turbo", pid: p3, rid: r2, mac: "DC:A6:32:11:55:77", mb: 8420, tag: "HOTEL-GUESTS-W1" },
        { code: "HOTEL-702", pass: "5512", status: "active", price: 12.00, prof: "7 Days Weekly Turbo", pid: p3, rid: r2, mac: null, mb: 0, tag: "HOTEL-GUESTS-W1" },
        { code: "MALL-VIP-1", pass: "8890", status: "used", price: 35.00, prof: "30 Days Monthly Unlimited", pid: p4, rid: r3, mac: "00:1A:2B:3C:4D:5E", mb: 24500, tag: "MALL-STAFF-PASS" },
        { code: "MALL-VIP-2", pass: "1122", status: "active", price: 35.00, prof: "30 Days Monthly Unlimited", pid: p4, rid: r3, mac: null, mb: 0, tag: "MALL-STAFF-PASS" }
      ];

      voucherSamples.forEach((v, idx) => {
        const vId = `vch_${idx + 100}`;
        const actAt = v.status === 'used' ? now - 3600000 * (idx + 1) : null;
        const expAt = v.status === 'used' ? now + 86400000 * 2 : (v.status === 'expired' ? now - 3600000 : null);

        this.ctx.storage.sql.exec(
          `INSERT INTO vouchers (id, user_id, router_id, profile_id, profile_name, code, password, batch_tag, status, price, created_at, activated_at, expires_at, used_by_mac, data_used_mb) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          vId, demoUserId, v.rid, v.pid, v.prof, v.code, v.pass, v.tag, v.status, v.price, now - 86400000 * 3, actAt, expAt, v.mac, v.mb
        );

        if (v.status === 'used' || v.status === 'expired') {
          this.ctx.storage.sql.exec(
            `INSERT INTO sales (id, user_id, router_id, voucher_id, profile_name, amount, payment_method, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            `sale_${idx + 100}`, demoUserId, v.rid, vId, v.prof, v.price, "Cash / Counter", now - 86400000 * (idx % 5)
          );
        }
      });

      // Active Sessions
      const activeList = [
        { user: "CAFE-8821", ip: "10.5.50.101", mac: "A4:C3:F0:12:88:91", r: r1, up: 2840, inB: 358400120, outB: 42100800 },
        { user: "DAY-9901", ip: "10.5.50.108", mac: "3C:A6:2F:89:10:44", r: r1, up: 18200, inB: 1280900000, outB: 142000000 },
        { user: "HOTEL-701", ip: "10.0.10.45", mac: "DC:A6:32:11:55:77", r: r2, up: 86400, inB: 8840000000, outB: 920000000 },
        { user: "MALL-VIP-1", ip: "172.16.1.88", mac: "00:1A:2B:3C:4D:5E", r: r3, up: 142000, inB: 25400000000, outB: 2100000000 }
      ];

      activeList.forEach((s, idx) => {
        this.ctx.storage.sql.exec(
          `INSERT INTO active_sessions (id, user_id, router_id, username, ip_address, mac_address, uptime_seconds, bytes_in, bytes_out, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          `ses_${idx + 1}`, demoUserId, s.r, s.user, s.ip, s.mac, s.up, s.inB, s.outB, now - 10000
        );
      });

      // System logs
      this.ctx.storage.sql.exec(
        `INSERT INTO system_logs (id, user_id, level, message, category, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
        "log_101", demoUserId, "INFO", "MikroTik router 'Beach Cafe WiFi' synchronized via API port 8728", "ROUTER_SYNC", now - 3600000
      );
      this.ctx.storage.sql.exec(
        `INSERT INTO system_logs (id, user_id, level, message, category, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
        "log_102", demoUserId, "INFO", "Batch of 10 vouchers generated under tag 'CAFE-BATCH-01'", "VOUCHER_GEN", now - 7200000
      );
    }

    this.initialized = true;
  }

  private setupRoutes() {
    // Auth Routes
    this.app.post("/api/auth/login", async (c) => {
      this.initDatabase();
      const body = await c.req.json<{ email?: string; password?: string }>();
      if (!body.email || !body.password) {
        return c.json({ error: "Email and password required" }, 400);
      }

      const rows = this.ctx.storage.sql
        .exec(`SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND password = ?`, body.email.trim(), body.password)
        .toArray();

      if (rows.length === 0) {
        return c.json({ error: "Invalid email or password" }, 401);
      }

      const user = rows[0];
      return c.json({
        token: `mock_jwt_${user.id}_${Date.now()}`,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          plan: user.plan
        }
      });
    });

    this.app.post("/api/auth/register", async (c) => {
      this.initDatabase();
      const body = await c.req.json<{ name?: string; email?: string; password?: string; plan?: string }>();
      if (!body.email || !body.password || !body.name) {
        return c.json({ error: "Name, email and password are required" }, 400);
      }

      const existing = this.ctx.storage.sql
        .exec(`SELECT id FROM users WHERE LOWER(email) = LOWER(?)`, body.email.trim())
        .toArray();

      if (existing.length > 0) {
        return c.json({ error: "User with this email already exists" }, 400);
      }

      const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const now = Date.now();
      const plan = body.plan || "Pro";

      this.ctx.storage.sql.exec(
        `INSERT INTO users (id, email, password, name, role, plan, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        userId, body.email.trim(), body.password, body.name.trim(), "user", plan, now
      );

      // Log activity
      this.ctx.storage.sql.exec(
        `INSERT INTO system_logs (id, user_id, level, message, category, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
        `log_${now}`, userId, "INFO", `User ${body.name} registered account with ${plan} plan`, "AUTH", now
      );

      return c.json({
        token: `mock_jwt_${userId}_${now}`,
        user: {
          id: userId,
          email: body.email.trim(),
          name: body.name.trim(),
          role: "user",
          plan
        }
      });
    });

    // Quick demo login route
    this.app.post("/api/auth/demo-login", async (c) => {
      this.initDatabase();
      const body = await c.req.json<{ role?: string }>();
      const role = body.role === 'admin' ? 'admin' : 'user';

      const rows = this.ctx.storage.sql
        .exec(`SELECT * FROM users WHERE role = ? LIMIT 1`, role)
        .toArray();

      if (rows.length === 0) {
        return c.json({ error: "Demo user not found" }, 404);
      }

      const user = rows[0];
      return c.json({
        token: `mock_jwt_${user.id}_${Date.now()}`,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          plan: user.plan
        }
      });
    });

    // Routers APIs
    this.app.get("/api/routers", async (c) => {
      this.initDatabase();
      const userId = c.req.query("userId");
      const role = c.req.query("role");

      let query = `SELECT * FROM routers ORDER BY created_at DESC`;
      let params: any[] = [];

      if (role !== "admin" && userId) {
        query = `SELECT * FROM routers WHERE user_id = ? ORDER BY created_at DESC`;
        params = [userId];
      }

      const rows = this.ctx.storage.sql.exec(query, ...params).toArray();
      return c.json(rows);
    });

    this.app.post("/api/routers", async (c) => {
      this.initDatabase();
      const body = await c.req.json<{
        userId: string;
        name: string;
        ipAddress: string;
        port?: number;
        username?: string;
        password?: string;
        location?: string;
        model?: string;
        hotspotInterface?: string;
      }>();

      if (!body.userId || !body.name || !body.ipAddress) {
        return c.json({ error: "Router Name, IP Address, and User ID are required" }, 400);
      }

      const id = `rtr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const now = Date.now();

      this.ctx.storage.sql.exec(
        `INSERT INTO routers (id, user_id, name, ip_address, port, username, password, location, status, model, ros_version, cpu_usage, ram_usage, hotspot_interface, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        id,
        body.userId,
        body.name.trim(),
        body.ipAddress.trim(),
        body.port || 8728,
        body.username || "admin",
        body.password || "",
        body.location || "Default Location",
        "online",
        body.model || "hAP ac3 (RouterOS)",
        "v7.14.2",
        Math.floor(Math.random() * 25) + 5,
        Math.floor(Math.random() * 40) + 20,
        body.hotspotInterface || "bridge-hotspot",
        now
      );

      // Log
      this.ctx.storage.sql.exec(
        `INSERT INTO system_logs (id, user_id, level, message, category, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
        `log_${now}`, body.userId, "INFO", `Added new router '${body.name}' (${body.ipAddress})`, "ROUTER", now
      );

      const created = this.ctx.storage.sql.exec(`SELECT * FROM routers WHERE id = ?`, id).one();
      return c.json(created, 201);
    });

    this.app.delete("/api/routers/:id", async (c) => {
      this.initDatabase();
      const id = c.req.param("id");
      this.ctx.storage.sql.exec(`DELETE FROM routers WHERE id = ?`, id);
      return c.json({ success: true, id });
    });

    // Test ping/connect to MikroTik
    this.app.post("/api/routers/:id/ping", async (c) => {
      this.initDatabase();
      const id = c.req.param("id");
      const router = this.ctx.storage.sql.exec(`SELECT * FROM routers WHERE id = ?`, id).one() as any;

      if (!router) {
        return c.json({ error: "Router not found" }, 404);
      }

      // Simulate live API handshake latency
      const latency = Math.floor(Math.random() * 15) + 8;
      const newCpu = Math.floor(Math.random() * 30) + 10;
      const newRam = Math.floor(Math.random() * 40) + 25;

      // Update router health stats
      this.ctx.storage.sql.exec(
        `UPDATE routers SET status = 'online', cpu_usage = ?, ram_usage = ? WHERE id = ?`,
        newCpu, newRam, id
      );

      return c.json({
        online: true,
        latencyMs: latency,
        identity: router.name,
        model: router.model,
        rosVersion: router.ros_version,
        cpuUsagePct: newCpu,
        ramUsagePct: newRam,
        uptime: "14d 08:32:11",
        activeUsers: Math.floor(Math.random() * 18) + 4,
        freeDiskMb: 112.4
      });
    });

    // RouterOS Script Generator for setup on MikroTik Terminal
    this.app.get("/api/routers/:id/script", async (c) => {
      this.initDatabase();
      const id = c.req.param("id");
      const router = this.ctx.storage.sql.exec(`SELECT * FROM routers WHERE id = ?`, id).one() as any;

      if (!router) {
        return c.json({ error: "Router not found" }, 404);
      }

      const script = `# =========================================================
# MikroTik Hotspot & Voucher Manager Setup Script
# Router: ${router.name} (${router.ip_address})
# Interface: ${router.hotspot_interface}
# Generated: ${new Date().toISOString()}
# =========================================================

/ip hotspot profile
add dns-name="login.${router.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.wifi" \\
    hotspot-address=10.5.50.1 \\
    html-directory=hotspot \\
    login-by=http-chap,http-pap,cookie \\
    name="hsprof-${router.id.substring(0, 8)}"

/ip hotspot
add disabled=no \\
    interface="${router.hotspot_interface}" \\
    name="hotspot-${router.id.substring(0, 8)}" \\
    profile="hsprof-${router.id.substring(0, 8)}"

/ip hotspot user profile
add name="1hour-express" rate-limit="5M/2M" shared-users=1 status-autorefresh=1m
add name="24hour-daypass" rate-limit="10M/5M" shared-users=2 status-autorefresh=1m
add name="monthly-unlimited" rate-limit="25M/10M" shared-users=3 status-autorefresh=1m

/ip service
set api port=${router.port} disabled=no
set api-ssl disabled=yes

/user
add name="${router.username}" password="${router.password || 'set_your_password'}" group=full comment="Managed by MikroTik Hotspot SaaS"

# Test API handshake connection
/tool fetch url="https://mikrotik-saas.preview/api/routers/${router.id}/ping" keep-result=no
:put "MikroTik Hotspot Manager configuration complete!"
`;

      return c.text(script);
    });

    // Profiles APIs
    this.app.get("/api/profiles", async (c) => {
      this.initDatabase();
      const userId = c.req.query("userId");
      let query = `SELECT * FROM profiles ORDER BY price ASC`;
      let params: any[] = [];

      if (userId) {
        query = `SELECT * FROM profiles WHERE user_id = ? ORDER BY price ASC`;
        params = [userId];
      }

      const rows = this.ctx.storage.sql.exec(query, ...params).toArray();
      return c.json(rows);
    });

    this.app.post("/api/profiles", async (c) => {
      this.initDatabase();
      const body = await c.req.json<{
        userId: string;
        routerId?: string;
        name: string;
        validityValue: number;
        validityUnit: string;
        rateLimitDl: number;
        rateLimitUl: number;
        sharedUsers?: number;
        price: number;
        dataLimitMb?: number;
      }>();

      if (!body.userId || !body.name || !body.price) {
        return c.json({ error: "Profile Name, Price and User ID are required" }, 400);
      }

      const id = `prf_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const now = Date.now();

      this.ctx.storage.sql.exec(
        `INSERT INTO profiles (id, user_id, router_id, name, validity_value, validity_unit, rate_limit_dl, rate_limit_ul, shared_users, price, data_limit_mb, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        id,
        body.userId,
        body.routerId || null,
        body.name.trim(),
        body.validityValue || 1,
        body.validityUnit || "hours",
        body.rateLimitDl || 5,
        body.rateLimitUl || 2,
        body.sharedUsers || 1,
        body.price,
        body.dataLimitMb || 0,
        now
      );

      const created = this.ctx.storage.sql.exec(`SELECT * FROM profiles WHERE id = ?`, id).one();
      return c.json(created, 201);
    });

    this.app.delete("/api/profiles/:id", async (c) => {
      this.initDatabase();
      const id = c.req.param("id");
      this.ctx.storage.sql.exec(`DELETE FROM profiles WHERE id = ?`, id);
      return c.json({ success: true, id });
    });

    // Vouchers APIs
    this.app.get("/api/vouchers", async (c) => {
      this.initDatabase();
      const userId = c.req.query("userId");
      const routerId = c.req.query("routerId");
      const batchTag = c.req.query("batchTag");
      const status = c.req.query("status");

      let query = `SELECT * FROM vouchers WHERE 1=1`;
      const params: any[] = [];

      if (userId) {
        query += ` AND user_id = ?`;
        params.push(userId);
      }
      if (routerId) {
        query += ` AND router_id = ?`;
        params.push(routerId);
      }
      if (batchTag) {
        query += ` AND batch_tag = ?`;
        params.push(batchTag);
      }
      if (status) {
        query += ` AND status = ?`;
        params.push(status);
      }

      query += ` ORDER BY created_at DESC LIMIT 200`;

      const rows = this.ctx.storage.sql.exec(query, ...params).toArray();
      return c.json(rows);
    });

    // Batch Voucher Generation
    this.app.post("/api/vouchers/generate", async (c) => {
      this.initDatabase();
      const body = await c.req.json<{
        userId: string;
        routerId: string;
        profileId: string;
        quantity: number;
        codeLength?: number;
        prefix?: string;
        batchTag?: string;
      }>();

      if (!body.userId || !body.routerId || !body.profileId || !body.quantity) {
        return c.json({ error: "User, Router, Profile, and Quantity are required" }, 400);
      }

      const profile = this.ctx.storage.sql.exec(`SELECT * FROM profiles WHERE id = ?`, body.profileId).one() as any;
      if (!profile) {
        return c.json({ error: "Hotspot Profile not found" }, 404);
      }

      const qty = Math.min(Math.max(body.quantity, 1), 100);
      const prefix = (body.prefix || "").trim().toUpperCase();
      const len = body.codeLength || 6;
      const batchTag = body.batchTag?.trim() || `BATCH-${new Date().toISOString().slice(0, 10)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
      const now = Date.now();

      const createdVouchers: any[] = [];

      for (let i = 0; i < qty; i++) {
        const vId = `vch_${now}_${i}_${Math.random().toString(36).substring(2, 5)}`;
        const randomStr = Math.random().toString(36).substring(2, 2 + len).toUpperCase();
        const code = prefix ? `${prefix}-${randomStr}` : randomStr;
        const pass = Math.floor(1000 + Math.random() * 9000).toString();

        this.ctx.storage.sql.exec(
          `INSERT INTO vouchers (id, user_id, router_id, profile_id, profile_name, code, password, batch_tag, status, price, created_at, activated_at, expires_at, used_by_mac, data_used_mb) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          vId, body.userId, body.routerId, body.profileId, profile.name, code, pass, batchTag, "active", profile.price, now, null, null, null, 0
        );

        createdVouchers.push({
          id: vId,
          code,
          password: pass,
          batchTag,
          profileName: profile.name,
          price: profile.price,
          status: "active"
        });
      }

      // Log activity
      this.ctx.storage.sql.exec(
        `INSERT INTO system_logs (id, user_id, level, message, category, created_at) VALUES (?, ?, ?, ?, ?, ?)`,
        `log_${now}`, body.userId, "INFO", `Generated batch of ${qty} vouchers under tag '${batchTag}' for profile '${profile.name}'`, "VOUCHER_GEN", now
      );

      return c.json({
        success: true,
        count: qty,
        batchTag,
        vouchers: createdVouchers
      });
    });

    // Revoke or Delete Voucher
    this.app.put("/api/vouchers/:id/status", async (c) => {
      this.initDatabase();
      const id = c.req.param("id");
      const body = await c.req.json<{ status: string }>();

      this.ctx.storage.sql.exec(`UPDATE vouchers SET status = ? WHERE id = ?`, body.status, id);
      return c.json({ success: true, id, status: body.status });
    });

    this.app.delete("/api/vouchers/:id", async (c) => {
      this.initDatabase();
      const id = c.req.param("id");
      this.ctx.storage.sql.exec(`DELETE FROM vouchers WHERE id = ?`, id);
      return c.json({ success: true, id });
    });

    // Active Sessions API
    this.app.get("/api/sessions", async (c) => {
      this.initDatabase();
      const userId = c.req.query("userId");
      let query = `SELECT * FROM active_sessions ORDER BY created_at DESC`;
      let params: any[] = [];

      if (userId) {
        query = `SELECT * FROM active_sessions WHERE user_id = ? ORDER BY created_at DESC`;
        params = [userId];
      }

      const rows = this.ctx.storage.sql.exec(query, ...params).toArray();
      return c.json(rows);
    });

    // Disconnect active user session
    this.app.post("/api/sessions/:id/disconnect", async (c) => {
      this.initDatabase();
      const id = c.req.param("id");
      this.ctx.storage.sql.exec(`DELETE FROM active_sessions WHERE id = ?`, id);
      return c.json({ success: true, id, message: "User session disconnected from MikroTik Hotspot" });
    });

    // Sales & Analytics API
    this.app.get("/api/analytics/dashboard", async (c) => {
      this.initDatabase();
      const userId = c.req.query("userId");
      const role = c.req.query("role");

      let userFilter = "";
      let params: any[] = [];

      if (role !== "admin" && userId) {
        userFilter = "WHERE user_id = ?";
        params = [userId];
      }

      const totalRouters = this.ctx.storage.sql.exec(`SELECT COUNT(*) as c FROM routers ${userFilter}`, ...params).one().c as number;
      const totalVouchers = this.ctx.storage.sql.exec(`SELECT COUNT(*) as c FROM vouchers ${userFilter}`, ...params).one().c as number;
      const activeVouchers = this.ctx.storage.sql.exec(`SELECT COUNT(*) as c FROM vouchers ${userFilter ? userFilter + " AND status='active'" : "WHERE status='active'"}`, ...params).one().c as number;
      const soldVouchers = this.ctx.storage.sql.exec(`SELECT COUNT(*) as c FROM vouchers ${userFilter ? userFilter + " AND (status='used' OR status='expired')" : "WHERE status='used' OR status='expired'"}`, ...params).one().c as number;
      const activeSessionsCount = this.ctx.storage.sql.exec(`SELECT COUNT(*) as c FROM active_sessions ${userFilter}`, ...params).one().c as number;

      const totalRevenueRow = this.ctx.storage.sql.exec(`SELECT SUM(amount) as s FROM sales ${userFilter}`, ...params).one();
      const totalRevenue = (totalRevenueRow.s as number) || 0;

      // Sales history per profile
      const salesByProfile = this.ctx.storage.sql.exec(
        `SELECT profile_name, COUNT(*) as count, SUM(amount) as total FROM sales ${userFilter} GROUP BY profile_name`,
        ...params
      ).toArray();

      // Recent System Logs
      const logs = this.ctx.storage.sql.exec(
        `SELECT * FROM system_logs ${userFilter} ORDER BY created_at DESC LIMIT 10`,
        ...params
      ).toArray();

      return c.json({
        totalRouters,
        totalVouchers,
        activeVouchers,
        soldVouchers,
        activeSessionsCount,
        totalRevenue,
        salesByProfile,
        recentLogs: logs
      });
    });

    // Admin overview (all users & platform stats)
    this.app.get("/api/admin/users", async (c) => {
      this.initDatabase();
      const rows = this.ctx.storage.sql.exec(`SELECT id, email, name, role, plan, created_at FROM users ORDER BY created_at DESC`).toArray();
      return c.json(rows);
    });

    this.app.put("/api/admin/users/:id/plan", async (c) => {
      this.initDatabase();
      const id = c.req.param("id");
      const body = await c.req.json<{ plan: string }>();

      this.ctx.storage.sql.exec(`UPDATE users SET plan = ? WHERE id = ?`, body.plan, id);
      return c.json({ success: true, id, plan: body.plan });
    });
  }

  async fetch(request: Request) {
    return this.app.fetch(request);
  }
}
