import React, { useState, useEffect, useMemo } from 'react';
import { createRoot } from 'react-dom/client';

// ==========================================
// SVG ICON COMPONENTS
// ==========================================
const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  const icons = {
    router: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01M13 16h.01" />
      </svg>
    ),
    wifi: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    ticket: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
      </svg>
    ),
    users: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    dollar: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V6m0 12v-2m0 0c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    activity: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    shield: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    settings: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    printer: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
      </svg>
    ),
    terminal: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    plus: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    trash: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    refresh: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    logout: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
    ),
    search: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    check: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    chevronRight: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    ),
    copy: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    x: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    server: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
      </svg>
    ),
    qrcode: (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
      </svg>
    )
  };

  return icons[name] || icons.wifi;
};

// ==========================================
// MAIN APPLICATION COMPONENT
// ==========================================
function App() {
  // Navigation & User State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('mikrotik_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [currentRoute, setCurrentRoute] = useState(() => {
    const savedUser = localStorage.getItem('mikrotik_user');
    return savedUser ? 'dashboard' : 'landing';
  });

  // Data Collections
  const [routers, setRouters] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [adminUsers, setAdminUsers] = useState([]);

  // UI Filters & Modals State
  const [selectedRouterId, setSelectedRouterId] = useState('');
  const [voucherSearch, setVoucherSearch] = useState('');
  const [voucherStatusFilter, setVoucherStatusFilter] = useState('');
  const [selectedBatchTag, setSelectedBatchTag] = useState('');

  // Modals
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showAddRouterModal, setShowAddRouterModal] = useState(false);
  const [showAddProfileModal, setShowAddProfileModal] = useState(false);
  const [showGenVoucherModal, setShowGenVoucherModal] = useState(false);
  const [scriptModalRouter, setScriptModalRouter] = useState(null);
  const [scriptText, setScriptText] = useState('');

  // Notification Toast
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Auth Save
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('mikrotik_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mikrotik_user');
    }
  }, [currentUser]);

  // Load App Data when Logged In
  const loadAppData = async () => {
    if (!currentUser) return;
    try {
      const q = `userId=${currentUser.id}&role=${currentUser.role}`;

      const [rRes, pRes, vRes, sRes, aRes] = await Promise.all([
        fetch(`./api/routers?${q}`).then(r => r.json()),
        fetch(`./api/profiles?${q}`).then(r => r.json()),
        fetch(`./api/vouchers?${q}`).then(r => r.json()),
        fetch(`./api/sessions?${q}`).then(r => r.json()),
        fetch(`./api/analytics/dashboard?${q}`).then(r => r.json())
      ]);

      setRouters(rRes || []);
      setProfiles(pRes || []);
      setVouchers(vRes || []);
      setSessions(sRes || []);
      setAnalytics(aRes || null);

      if (currentUser.role === 'admin') {
        const uRes = await fetch('./api/admin/users').then(r => r.json());
        setAdminUsers(uRes || []);
      }
    } catch (err) {
      console.error('Error loading app data:', err);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadAppData();
    }
  }, [currentUser, currentRoute]);

  // Quick Demo Login
  const handleDemoLogin = async (role = 'user') => {
    try {
      const res = await fetch('./api/auth/demo-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      const data = await res.json();
      if (res.ok) {
        setCurrentUser(data.user);
        setCurrentRoute('dashboard');
        setShowLoginModal(false);
        showToast(`Logged in as Demo ${role === 'admin' ? 'Administrator' : 'Hotspot Operator'}`);
      } else {
        showToast(data.error || 'Demo login failed', 'error');
      }
    } catch (err) {
      showToast('Network error on demo login', 'error');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentRoute('landing');
    showToast('Signed out successfully');
  };

  // Open RouterOS Script Modal
  const handleOpenScript = async (router) => {
    setScriptModalRouter(router);
    try {
      const res = await fetch(`./api/routers/${router.id}/script`);
      const txt = await res.text();
      setScriptText(txt);
    } catch (err) {
      setScriptText('# Error fetching script');
    }
  };

  // Ping Router
  const handlePingRouter = async (routerId) => {
    showToast('Pinging MikroTik Router API...', 'info');
    try {
      const res = await fetch(`./api/routers/${routerId}/ping`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        showToast(`Connected! Latency: ${data.latencyMs}ms | CPU: ${data.cpuUsagePct}% | Active Users: ${data.activeUsers}`);
        loadAppData();
      } else {
        showToast('Router ping failed', 'error');
      }
    } catch (err) {
      showToast('Network error during router ping', 'error');
    }
  };

  // Disconnect Active Hotspot Session
  const handleDisconnectSession = async (sessionId) => {
    try {
      const res = await fetch(`./api/sessions/${sessionId}/disconnect`, { method: 'POST' });
      if (res.ok) {
        showToast('User disconnected from Hotspot interface');
        loadAppData();
      }
    } catch (err) {
      showToast('Failed to disconnect user', 'error');
    }
  };

  // Delete Voucher
  const handleDeleteVoucher = async (voucherId) => {
    if (!confirm('Are you sure you want to delete this voucher?')) return;
    try {
      const res = await fetch(`./api/vouchers/${voucherId}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Voucher deleted');
        loadAppData();
      }
    } catch (err) {
      showToast('Error deleting voucher', 'error');
    }
  };

  // Toggle Voucher Status
  const handleToggleVoucherStatus = async (voucherId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'revoked' : 'active';
    try {
      const res = await fetch(`./api/vouchers/${voucherId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        showToast(`Voucher status updated to ${newStatus}`);
        loadAppData();
      }
    } catch (err) {
      showToast('Error updating voucher', 'error');
    }
  };

  // Unique Batch Tags List
  const batchTagsList = useMemo(() => {
    const set = new Set();
    vouchers.forEach(v => {
      if (v.batch_tag) set.add(v.batch_tag);
    });
    return Array.from(set);
  }, [vouchers]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl border text-sm font-medium transition-all duration-300 ${
          toast.type === 'error'
            ? 'bg-red-950/90 text-red-200 border-red-800/80'
            : toast.type === 'info'
            ? 'bg-blue-950/90 text-blue-200 border-blue-800/80'
            : 'bg-emerald-950/90 text-emerald-200 border-emerald-800/80'
        }`}>
          <Icon name={toast.type === 'error' ? 'x' : 'check'} className="w-5 h-5 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* RENDER PUBLIC LANDING OR AUTHENTICATED APP */}
      {currentRoute === 'landing' ? (
        <LandingPage
          onOpenLogin={() => setShowLoginModal(true)}
          onOpenRegister={() => setShowRegisterModal(true)}
          onDemoLogin={handleDemoLogin}
        />
      ) : (
        <div className="flex h-screen overflow-hidden bg-slate-950">
          {/* SIDEBAR NAVIGATION */}
          <aside className="w-64 bg-slate-900 border-r border-slate-800/80 flex flex-col shrink-0">
            {/* Brand Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                  <Icon name="wifi" className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="font-bold text-slate-100 text-sm tracking-tight">MikroTik SaaS</h1>
                  <span className="text-[11px] text-slate-400 font-medium">Hotspot Manager v2.4</span>
                </div>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              <SidebarItem
                icon="activity"
                label="Dashboard"
                active={currentRoute === 'dashboard'}
                onClick={() => setCurrentRoute('dashboard')}
              />
              <SidebarItem
                icon="router"
                label="Routers & WinBox"
                badge={routers.length}
                active={currentRoute === 'routers'}
                onClick={() => setCurrentRoute('routers')}
              />
              <SidebarItem
                icon="wifi"
                label="Hotspot Profiles"
                badge={profiles.length}
                active={currentRoute === 'profiles'}
                onClick={() => setCurrentRoute('profiles')}
              />
              <SidebarItem
                icon="ticket"
                label="Voucher Control"
                badge={vouchers.length}
                active={currentRoute === 'vouchers'}
                onClick={() => setCurrentRoute('vouchers')}
              />
              <SidebarItem
                icon="printer"
                label="Print Studio"
                active={currentRoute === 'print'}
                onClick={() => setCurrentRoute('print')}
              />
              <SidebarItem
                icon="users"
                label="Active Sessions"
                badge={sessions.length}
                active={currentRoute === 'sessions'}
                onClick={() => setCurrentRoute('sessions')}
              />
              <SidebarItem
                icon="dollar"
                label="Sales & Revenue"
                active={currentRoute === 'sales'}
                onClick={() => setCurrentRoute('sales')}
              />
              <SidebarItem
                icon="terminal"
                label="RouterOS Console"
                active={currentRoute === 'terminal'}
                onClick={() => setCurrentRoute('terminal')}
              />

              {currentUser?.role === 'admin' && (
                <div className="pt-4 mt-2 border-t border-slate-800/80">
                  <div className="px-3 pb-1 text-[11px] font-semibold tracking-wider text-indigo-400 uppercase">
                    Platform Admin
                  </div>
                  <SidebarItem
                    icon="shield"
                    label="Admin Console"
                    badge="SUPERADMIN"
                    active={currentRoute === 'admin'}
                    onClick={() => setCurrentRoute('admin')}
                  />
                </div>
              )}
            </nav>

            {/* User Profile Card */}
            <div className="p-3 border-t border-slate-800/80 bg-slate-900/50">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="min-w-0 flex-1 pr-2">
                  <p className="text-xs font-semibold text-slate-200 truncate">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 text-[10px] font-semibold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    {currentUser?.plan || 'Pro'} Plan
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <Icon name="logout" className="w-4 h-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-950">
            {/* TOP BAR */}
            <header className="h-14 bg-slate-900/90 backdrop-blur border-b border-slate-800/80 px-6 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-slate-200">Selected Router:</span>
                <select
                  value={selectedRouterId}
                  onChange={(e) => setSelectedRouterId(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-indigo-500"
                >
                  <option value="">All Managed Routers ({routers.length})</option>
                  {routers.map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.ip_address})</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Demo Role Switcher button */}
                <div className="flex items-center bg-slate-800/80 rounded-lg p-1 border border-slate-700/60 text-xs">
                  <span className="px-2 text-slate-400 font-medium">Demo Role:</span>
                  <button
                    onClick={() => handleDemoLogin('user')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      currentUser?.role === 'user' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Operator
                  </button>
                  <button
                    onClick={() => handleDemoLogin('admin')}
                    className={`px-2.5 py-1 rounded-md transition-all ${
                      currentUser?.role === 'admin' ? 'bg-indigo-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Platform Admin
                  </button>
                </div>

                <button
                  onClick={() => setShowGenVoucherModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-colors"
                >
                  <Icon name="plus" className="w-4 h-4" />
                  <span>Generate Batch Vouchers</span>
                </button>
              </div>
            </header>

            {/* ROUTE CONTENT CANVAS */}
            <main className="flex-1 overflow-y-auto p-6">
              {currentRoute === 'dashboard' && (
                <DashboardView
                  analytics={analytics}
                  routers={routers}
                  vouchers={vouchers}
                  profiles={profiles}
                  onPing={handlePingRouter}
                  onOpenScript={handleOpenScript}
                  onGenBatch={() => setShowGenVoucherModal(true)}
                />
              )}

              {currentRoute === 'routers' && (
                <RoutersView
                  routers={routers}
                  onAddRouter={() => setShowAddRouterModal(true)}
                  onPing={handlePingRouter}
                  onOpenScript={handleOpenScript}
                  onRefresh={loadAppData}
                />
              )}

              {currentRoute === 'profiles' && (
                <ProfilesView
                  profiles={profiles}
                  routers={routers}
                  onAddProfile={() => setShowAddProfileModal(true)}
                  onRefresh={loadAppData}
                />
              )}

              {currentRoute === 'vouchers' && (
                <VouchersView
                  vouchers={vouchers}
                  routers={routers}
                  profiles={profiles}
                  search={voucherSearch}
                  setSearch={setVoucherSearch}
                  statusFilter={voucherStatusFilter}
                  setStatusFilter={setVoucherStatusFilter}
                  batchTagFilter={selectedBatchTag}
                  setBatchTagFilter={setSelectedBatchTag}
                  batchTagsList={batchTagsList}
                  onGenModal={() => setShowGenVoucherModal(true)}
                  onDelete={handleDeleteVoucher}
                  onToggleStatus={handleToggleVoucherStatus}
                  onPrintTag={(tag) => {
                    setSelectedBatchTag(tag);
                    setCurrentRoute('print');
                  }}
                />
              )}

              {currentRoute === 'print' && (
                <PrintStudioView
                  vouchers={vouchers}
                  batchTagsList={batchTagsList}
                  selectedTag={selectedBatchTag}
                  setSelectedTag={setSelectedBatchTag}
                />
              )}

              {currentRoute === 'sessions' && (
                <ActiveSessionsView
                  sessions={sessions}
                  onDisconnect={handleDisconnectSession}
                  onRefresh={loadAppData}
                />
              )}

              {currentRoute === 'sales' && (
                <SalesView analytics={analytics} />
              )}

              {currentRoute === 'terminal' && (
                <RouterOSTerminalView routers={routers} />
              )}

              {currentRoute === 'admin' && (
                <AdminConsoleView adminUsers={adminUsers} onRefresh={loadAppData} />
              )}
            </main>
          </div>
        </div>
      )}

      {/* ================= MODALS ================= */}

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <AuthModal
          type="login"
          onClose={() => setShowLoginModal(false)}
          onSuccess={(user) => {
            setCurrentUser(user);
            setCurrentRoute('dashboard');
            setShowLoginModal(false);
            showToast(`Welcome back, ${user.name}!`);
          }}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
          onDemoLogin={handleDemoLogin}
        />
      )}

      {/* REGISTER MODAL */}
      {showRegisterModal && (
        <AuthModal
          type="register"
          onClose={() => setShowRegisterModal(false)}
          onSuccess={(user) => {
            setCurrentUser(user);
            setCurrentRoute('dashboard');
            setShowRegisterModal(false);
            showToast(`Account created! Welcome ${user.name}`);
          }}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
          onDemoLogin={handleDemoLogin}
        />
      )}

      {/* ADD ROUTER MODAL */}
      {showAddRouterModal && (
        <AddRouterModal
          currentUser={currentUser}
          onClose={() => setShowAddRouterModal(false)}
          onSuccess={() => {
            setShowAddRouterModal(false);
            showToast('MikroTik Router added successfully');
            loadAppData();
          }}
        />
      )}

      {/* ADD PROFILE MODAL */}
      {showAddProfileModal && (
        <AddProfileModal
          currentUser={currentUser}
          routers={routers}
          onClose={() => setShowAddProfileModal(false)}
          onSuccess={() => {
            setShowAddProfileModal(false);
            showToast('Hotspot Profile created');
            loadAppData();
          }}
        />
      )}

      {/* GENERATE VOUCHERS MODAL */}
      {showGenVoucherModal && (
        <GenerateVouchersModal
          currentUser={currentUser}
          routers={routers}
          profiles={profiles}
          onClose={() => setShowGenVoucherModal(false)}
          onSuccess={(data) => {
            setShowGenVoucherModal(false);
            setSelectedBatchTag(data.batchTag);
            showToast(`Generated batch of ${data.count} vouchers!`);
            loadAppData();
          }}
        />
      )}

      {/* SCRIPT GENERATOR MODAL */}
      {scriptModalRouter && (
        <ScriptModal
          router={scriptModalRouter}
          scriptText={scriptText}
          onClose={() => setScriptModalRouter(null)}
        />
      )}
    </div>
  );
}

// ==========================================
// LANDING PAGE COMPONENT
// ==========================================
function LandingPage({ onOpenLogin, onOpenRegister, onDemoLogin }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header / Nav */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur sticky top-0 z-40 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
            <Icon name="wifi" className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-lg text-slate-100 tracking-tight">MikroTik SaaS</span>
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">Hotspot Control</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#architecture" className="hover:text-white transition-colors">MikroTik Integration</a>
          <a href="#vouchers" className="hover:text-white transition-colors">Voucher Printing</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenLogin}
            className="px-4 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800 border border-slate-700/80 transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onOpenRegister}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all"
          >
            Start Free Trial
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-6 max-w-7xl mx-auto w-full text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6">
          <Icon name="shield" className="w-4 h-4" />
          <span>Centralized RouterOS Hotspot Management & Voucher Billing</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight max-w-4xl leading-tight">
          Manage MikroTik Hotspots & Sell WiFi Vouchers <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">In Minutes</span>
        </h1>

        <p className="mt-6 text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
          The complete multi-tenant platform for ISP operators, hotels, cafes, and hotspot providers. Connect your RouterOS devices, generate custom vouchers, and track sales revenue live.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => onDemoLogin('user')}
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Icon name="wifi" className="w-5 h-5" />
            <span>Launch Operator Demo</span>
          </button>
          <button
            onClick={() => onDemoLogin('admin')}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all"
          >
            <Icon name="shield" className="w-5 h-5 text-indigo-400" />
            <span>Launch Admin Console</span>
          </button>
        </div>

        {/* Live Feature Preview Card */}
        <div className="mt-14 w-full max-w-5xl rounded-2xl bg-slate-900 border border-slate-800 p-4 shadow-2xl text-left">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 px-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              <span className="ml-2 text-xs font-mono text-slate-400">admin@mikrotik-saas.preview ~ live_cluster</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span> API Connected (RouterOS 7.14)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="text-xs text-slate-400 font-medium">Managed Routers</div>
              <div className="text-2xl font-bold text-slate-100 mt-1">3 Connected</div>
              <div className="text-xs text-emerald-400 mt-2 font-medium">hAP ac3, RB3011, CCR1009</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="text-xs text-slate-400 font-medium">Active Hotspot Users</div>
              <div className="text-2xl font-bold text-indigo-400 mt-1">14 Online</div>
              <div className="text-xs text-slate-400 mt-2">Combined 42.8 Mbps Traffic</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50">
              <div className="text-xs text-slate-400 font-medium">Today's Voucher Sales</div>
              <div className="text-2xl font-bold text-emerald-400 mt-1">$124.50</div>
              <div className="text-xs text-slate-400 mt-2">48 Vouchers Issued</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section id="features" className="py-16 px-6 bg-slate-900/50 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-slate-100">Everything You Need To Sell WiFi Access</h2>
            <p className="mt-3 text-slate-400 text-sm">Built specifically for MikroTik RouterOS API integration without requiring complex RADIUS server setup.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon="router"
              title="Remote WinBox API Sync"
              desc="Directly sync RouterOS profiles, users, and hotspot interfaces securely via MikroTik API port 8728."
            />
            <FeatureCard
              icon="ticket"
              title="Batch Voucher Generator"
              desc="Generate hundreds of randomized PIN vouchers with custom speed limits, data caps, and time limits."
            />
            <FeatureCard
              icon="printer"
              title="Print Ready Card Templates"
              desc="Print vouchers in 3x8 card grids or thermal receipts (58mm/80mm) complete with QR codes for instant WiFi connection."
            />
            <FeatureCard
              icon="users"
              title="Active User Control"
              desc="Monitor real-time connected MAC addresses, IP leases, uptime, and disconnect unauthorized users instantly."
            />
            <FeatureCard
              icon="dollar"
              title="Sales & Revenue Reports"
              desc="Track daily and monthly earnings from voucher sales with detailed profile breakdown and CSV exports."
            />
            <FeatureCard
              icon="terminal"
              title="Auto RouterOS Terminal Scripts"
              desc="One-click copyable MikroTik Terminal scripts to set up hotspot profile, login page, and user profiles in seconds."
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-100">Simple, Transparent SaaS Pricing</h2>
          <p className="mt-3 text-slate-400 text-sm">Select the plan that fits your hotspot network scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Plan */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Starter Free</h3>
              <p className="text-xs text-slate-400 mt-1">For small cafe or home hotspot test</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-slate-100">$0</span>
                <span className="text-slate-400 text-sm"> / month</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> 1 MikroTik Router</li>
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> 100 Vouchers / month</li>
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> Basic Thermal Printing</li>
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> Live Active Session Monitor</li>
              </ul>
            </div>
            <button
              onClick={onOpenRegister}
              className="mt-8 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-2xl bg-indigo-950/60 border-2 border-indigo-500 relative flex flex-col justify-between shadow-2xl shadow-indigo-600/10">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow">
              Most Popular
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-100">Pro Operator</h3>
              <p className="text-xs text-indigo-300 mt-1">For ISPs, hotels, and cafe chains</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-slate-100">$19</span>
                <span className="text-indigo-300 text-sm"> / month</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-200">
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> 10 MikroTik Routers</li>
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> Unlimited Vouchers</li>
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> Custom Voucher Branding & QR</li>
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> Sales Analytics & Reports</li>
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> Auto RouterOS Script Generator</li>
              </ul>
            </div>
            <button
              onClick={onOpenRegister}
              className="mt-8 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all"
            >
              Start 14-Day Free Trial
            </button>
          </div>

          {/* Enterprise */}
          <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-100">Enterprise</h3>
              <p className="text-xs text-slate-400 mt-1">For large network providers and franchises</p>
              <div className="mt-6">
                <span className="text-4xl font-extrabold text-slate-100">$49</span>
                <span className="text-slate-400 text-sm"> / month</span>
              </div>
              <ul className="mt-6 space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> Unlimited Routers</li>
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> Unlimited Vouchers & Profiles</li>
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> Multi-operator Team Permissions</li>
                <li className="flex items-center gap-2"><Icon name="check" className="w-4 h-4 text-emerald-400" /> API Access & Webhooks</li>
              </ul>
            </div>
            <button
              onClick={onOpenRegister}
              className="mt-8 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 px-6 text-center text-xs text-slate-500">
        <p>© 2026 MikroTik Hotspot & Voucher SaaS. All rights reserved.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="p-6 rounded-xl bg-slate-900 border border-slate-800/80 hover:border-indigo-500/50 transition-all">
      <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
        <Icon name={icon} className="w-5 h-5" />
      </div>
      <h3 className="font-bold text-slate-100 text-base mb-2">{title}</h3>
      <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function SidebarItem({ icon, label, badge, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
        active
          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
          : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
      }`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon name={icon} className="w-4 h-4 shrink-0" />
        <span className="truncate">{label}</span>
      </div>
      {badge !== undefined && (
        <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md ${
          active ? 'bg-indigo-700 text-white' : 'bg-slate-800 text-slate-400'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

// ==========================================
// VIEWS COMPONENTS
// ==========================================

// DASHBOARD VIEW
function DashboardView({ analytics, routers, vouchers, profiles, onPing, onOpenScript, onGenBatch }) {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiTile
          icon="router"
          title="Active Routers"
          value={analytics?.totalRouters || routers.length}
          subtitle="All WinBox API Online"
          color="indigo"
        />
        <KpiTile
          icon="ticket"
          title="Active Vouchers"
          value={analytics?.activeVouchers || 0}
          subtitle={`${analytics?.totalVouchers || 0} Total Generated`}
          color="sky"
        />
        <KpiTile
          icon="users"
          title="Online Hotspot Users"
          value={analytics?.activeSessionsCount || 0}
          subtitle="Active Leases"
          color="emerald"
        />
        <KpiTile
          icon="dollar"
          title="Total Sales Volume"
          value={`$${(analytics?.totalRevenue || 0).toFixed(2)}`}
          subtitle="Voucher Earnings"
          color="amber"
        />
      </div>

      {/* Quick Action Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-900/40 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-100">Hotspot Control Studio</h3>
          <p className="text-xs text-slate-400 mt-1">Generate new voucher batches, print physical WiFi access cards, or sync RouterOS scripts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={onGenBatch}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20"
          >
            + Generate Voucher Batch
          </button>
        </div>
      </div>

      {/* Routers & Live Status Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="font-bold text-slate-100 text-sm">Managed MikroTik Routers</h3>
          <span className="text-xs text-slate-400">{routers.length} Devices Registered</span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {routers.map(router => (
            <div key={router.id} className="py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 border border-slate-700">
                  <Icon name="router" className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-200">{router.name}</div>
                  <div className="text-xs text-slate-400">{router.ip_address}:{router.port} • {router.model} ({router.ros_version})</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <div className="text-right">
                  <div className="text-slate-300 font-medium">CPU {router.cpu_usage}% • RAM {router.ram_usage}%</div>
                  <div className="text-emerald-400 text-[11px]">Interface: {router.hotspot_interface}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPing(router.id)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium"
                  >
                    Ping API
                  </button>
                  <button
                    onClick={() => onOpenScript(router)}
                    className="px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium"
                  >
                    Terminal Script
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function KpiTile({ icon, title, value, subtitle, color }) {
  return (
    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
        <h3 className="text-2xl font-bold text-slate-100 mt-1 tabular-nums">{value}</h3>
        <p className="text-[11px] text-slate-500 mt-1">{subtitle}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl bg-${color}-500/10 text-${color}-400 flex items-center justify-center border border-${color}-500/20`}>
        <Icon name={icon} className="w-6 h-6" />
      </div>
    </div>
  );
}

// ROUTERS VIEW
function RoutersView({ routers, onAddRouter, onPing, onOpenScript, onRefresh }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">MikroTik Router Management</h2>
          <p className="text-xs text-slate-400 mt-1">Connect and monitor RouterOS devices via WinBox API (Port 8728).</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onRefresh} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
            <Icon name="refresh" className="w-4 h-4" />
          </button>
          <button onClick={onAddRouter} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow">
            <Icon name="plus" className="w-4 h-4" />
            <span>Add MikroTik Router</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {routers.map(router => (
          <div key={router.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                    <Icon name="router" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-100 text-sm">{router.name}</h3>
                    <p className="text-xs text-slate-400">{router.location}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Online
                </span>
              </div>

              <div className="mt-6 space-y-2 text-xs border-t border-slate-800 pt-4">
                <div className="flex justify-between text-slate-400">
                  <span>IP Address / Port:</span>
                  <span className="font-mono text-slate-200">{router.ip_address}:{router.port}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Hardware Model:</span>
                  <span className="text-slate-200">{router.model}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>RouterOS Firmware:</span>
                  <span className="text-slate-200">{router.ros_version}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Hotspot Interface:</span>
                  <span className="text-indigo-400 font-mono">{router.hotspot_interface}</span>
                </div>
              </div>

              {/* Gauges */}
              <div className="mt-4 grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">CPU Load</span>
                  <div className="text-base font-bold text-slate-100 mt-0.5">{router.cpu_usage}%</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium">RAM Used</span>
                  <div className="text-base font-bold text-slate-100 mt-0.5">{router.ram_usage}%</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
              <button
                onClick={() => onPing(router.id)}
                className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
              >
                Ping Handshake
              </button>
              <button
                onClick={() => onOpenScript(router)}
                className="flex-1 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow"
              >
                Get Terminal Script
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// PROFILES VIEW
function ProfilesView({ profiles, routers, onAddProfile, onRefresh }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Hotspot WiFi Packages & Profiles</h2>
          <p className="text-xs text-slate-400 mt-1">Define speed limits, duration validity, and pricing for vouchers.</p>
        </div>
        <button onClick={onAddProfile} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow">
          <Icon name="plus" className="w-4 h-4" />
          <span>Create New Profile</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {profiles.map(p => (
          <div key={p.id} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {p.validity_value} {p.validity_unit}
                </span>
                <span className="text-lg font-extrabold text-emerald-400">${p.price.toFixed(2)}</span>
              </div>

              <h3 className="font-bold text-slate-100 text-base mt-3">{p.name}</h3>

              <div className="mt-4 space-y-2 text-xs text-slate-300 border-t border-slate-800 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Download Speed:</span>
                  <span className="font-semibold text-indigo-400">{p.rate_limit_dl} Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Upload Speed:</span>
                  <span className="font-semibold text-sky-400">{p.rate_limit_ul} Mbps</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Shared Devices:</span>
                  <span>{p.shared_users} Device</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Data Limit:</span>
                  <span>{p.data_limit_mb ? `${p.data_limit_mb} MB` : 'Unlimited'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// VOUCHERS VIEW
function VouchersView({
  vouchers,
  routers,
  profiles,
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  batchTagFilter,
  setBatchTagFilter,
  batchTagsList,
  onGenModal,
  onDelete,
  onToggleStatus,
  onPrintTag
}) {
  const filtered = useMemo(() => {
    return vouchers.filter(v => {
      const matchSearch = search === '' || v.code.toLowerCase().includes(search.toLowerCase()) || v.batch_tag?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === '' || v.status === statusFilter;
      const matchTag = batchTagFilter === '' || v.batch_tag === batchTagFilter;
      return matchSearch && matchStatus && matchTag;
    });
  }, [vouchers, search, statusFilter, batchTagFilter]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Voucher Inventory & Batch Control</h2>
          <p className="text-xs text-slate-400 mt-1">Manage active, sold, and expired WiFi hotspot access vouchers.</p>
        </div>
        <button onClick={onGenModal} className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow">
          <Icon name="plus" className="w-4 h-4" />
          <span>Batch Generate Vouchers</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[260px]">
          <div className="relative flex-1 max-w-xs">
            <Icon name="search" className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search code or tag..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="active">Active Available</option>
            <option value="used">Used / Redeemed</option>
            <option value="expired">Expired</option>
            <option value="revoked">Revoked</option>
          </select>

          <select
            value={batchTagFilter}
            onChange={(e) => setBatchTagFilter(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none max-w-[200px]"
          >
            <option value="">All Batch Tags</option>
            {batchTagsList.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {batchTagFilter && (
          <button
            onClick={() => onPrintTag(batchTagFilter)}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
          >
            <Icon name="printer" className="w-4 h-4" />
            <span>Print Batch ({batchTagFilter})</span>
          </button>
        )}
      </div>

      {/* Vouchers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Voucher Code</th>
                <th className="px-4 py-3">Password</th>
                <th className="px-4 py-3">Package Profile</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Batch Tag</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Used MAC</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map(v => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-300 text-sm">{v.code}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{v.password}</td>
                  <td className="px-4 py-3 font-medium text-slate-200">{v.profile_name}</td>
                  <td className="px-4 py-3 font-semibold text-emerald-400">${v.price.toFixed(2)}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{v.batch_tag}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      v.status === 'active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      v.status === 'used' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                      'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-400">{v.used_by_mac || '—'}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => onToggleStatus(v.id, v.status)}
                      className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px]"
                    >
                      {v.status === 'active' ? 'Revoke' : 'Activate'}
                    </button>
                    <button
                      onClick={() => onDelete(v.id)}
                      className="px-2 py-1 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded text-[11px]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// PRINT STUDIO VIEW
function PrintStudioView({ vouchers, batchTagsList, selectedTag, setSelectedTag }) {
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' | 'thermal80' | 'thermal58'
  const [businessName, setBusinessName] = useState('Sunset Beach Hotspot');
  const [ssidName, setSsidName] = useState('Free-Beach-WiFi');

  const printableVouchers = useMemo(() => {
    if (!selectedTag) return vouchers.slice(0, 12);
    return vouchers.filter(v => v.batch_tag === selectedTag);
  }, [vouchers, selectedTag]);

  return (
    <div className="space-y-6">
      {/* Controls Header (Hidden on Print) */}
      <div className="no-print p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-100">Hotspot Voucher Print Studio</h2>
          <p className="text-xs text-slate-400 mt-1">Configure layout, business logo, and print physical vouchers directly.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="">Choose Batch Tag to Print ({batchTagsList.length})</option>
            {batchTagsList.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            value={layoutMode}
            onChange={(e) => setLayoutMode(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="grid">3x8 Card Grid (A4 Paper)</option>
            <option value="thermal80">Thermal Receipt (80mm)</option>
            <option value="thermal58">Thermal Receipt (58mm)</option>
          </select>

          <button
            onClick={() => window.print()}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
          >
            <Icon name="printer" className="w-4 h-4" />
            <span>Print Vouchers Now</span>
          </button>
        </div>
      </div>

      {/* Customization Inputs (Hidden on Print) */}
      <div className="no-print p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-wrap gap-4 text-xs">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-slate-400 mb-1">Hotspot Business Name</label>
          <input
            type="text"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
          />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-slate-400 mb-1">WiFi SSID Name</label>
          <input
            type="text"
            value={ssidName}
            onChange={(e) => setSsidName(e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
          />
        </div>
      </div>

      {/* PRINTABLE CANVAS */}
      <div className="printable-area bg-white text-black p-6 rounded-2xl shadow-2xl min-h-[500px]">
        {layoutMode === 'grid' ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {printableVouchers.map(v => (
              <div key={v.id} className="voucher-card p-3 border-2 border-black rounded-lg flex flex-col justify-between bg-white text-black text-xs font-sans">
                <div className="border-b border-black pb-1 mb-2 flex items-center justify-between">
                  <span className="font-extrabold uppercase tracking-tight text-[11px]">{businessName}</span>
                  <span className="font-bold text-sm">${v.price.toFixed(2)}</span>
                </div>

                <div className="space-y-1 my-1">
                  <div className="text-[10px] text-gray-700">SSID: <span className="font-bold">{ssidName}</span></div>
                  <div className="text-[10px] text-gray-700">Profile: <span className="font-semibold">{v.profile_name}</span></div>

                  <div className="p-2 bg-gray-100 rounded border border-gray-300 text-center my-1">
                    <div className="text-[9px] text-gray-500 uppercase font-semibold">Voucher Code</div>
                    <div className="text-base font-extrabold font-mono tracking-widest text-black">{v.code}</div>
                    <div className="text-[10px] text-gray-600 font-mono">PIN: {v.password}</div>
                  </div>
                </div>

                <div className="border-t border-black pt-1 text-[8px] text-gray-600 flex justify-between">
                  <span>Connect SSID & enter PIN</span>
                  <span>Batch: {v.batch_tag}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={`mx-auto space-y-4 ${layoutMode === 'thermal58' ? 'max-w-[220px]' : 'max-w-[300px]'}`}>
            {printableVouchers.map(v => (
              <div key={v.id} className="voucher-card p-3 border border-black rounded bg-white text-black text-xs text-center font-mono space-y-2">
                <div className="font-extrabold text-sm uppercase">{businessName}</div>
                <div className="text-[10px]">SSID: {ssidName}</div>
                <div className="border-y border-dashed border-black py-2 my-2">
                  <div className="text-[10px] text-gray-600">HOTSPOT VOUCHER</div>
                  <div className="text-lg font-black tracking-widest">{v.code}</div>
                  <div className="text-xs">PASS: {v.password}</div>
                </div>
                <div className="text-[10px]">{v.profile_name} - ${v.price.toFixed(2)}</div>
                <div className="text-[8px] text-gray-500">Thank you for your purchase!</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ACTIVE SESSIONS VIEW
function ActiveSessionsView({ sessions, onDisconnect, onRefresh }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Live Active Hotspot Sessions</h2>
          <p className="text-xs text-slate-400 mt-1">Real-time connected MAC addresses and active bandwidth leases.</p>
        </div>
        <button onClick={onRefresh} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
          <Icon name="refresh" className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Hotspot User</th>
              <th className="px-4 py-3">IP Address</th>
              <th className="px-4 py-3">MAC Address</th>
              <th className="px-4 py-3">Uptime</th>
              <th className="px-4 py-3">Downloaded</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {sessions.map(s => (
              <tr key={s.id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-mono font-bold text-indigo-300">{s.username}</td>
                <td className="px-4 py-3 font-mono text-slate-300">{s.ip_address}</td>
                <td className="px-4 py-3 font-mono text-slate-400">{s.mac_address}</td>
                <td className="px-4 py-3 font-medium text-slate-200">{Math.floor(s.uptime_seconds / 3600)}h {Math.floor((s.uptime_seconds % 3600) / 60)}m</td>
                <td className="px-4 py-3 font-semibold text-emerald-400">{(s.bytes_in / 1048576).toFixed(1)} MB</td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => onDisconnect(s.id)}
                    className="px-2.5 py-1 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/50 rounded text-[11px] font-semibold"
                  >
                    Disconnect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// SALES VIEW
function SalesView({ analytics }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-100">Voucher Sales & Revenue Analytics</h2>
        <p className="text-xs text-slate-400 mt-1">Financial performance and sales volume across hotspot packages.</p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <h3 className="font-bold text-slate-100 text-sm mb-4">Revenue Breakdown by Package Profile</h3>
        <div className="space-y-3">
          {(analytics?.salesByProfile || []).map(item => (
            <div key={item.profile_name} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200 text-sm">{item.profile_name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.count} Vouchers Sold</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-extrabold text-emerald-400">${(item.total || 0).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ROUTEROS TERMINAL VIEW
function RouterOSTerminalView({ routers }) {
  const [selectedRouter, setSelectedRouter] = useState(routers[0]?.name || 'Beach Cafe WiFi');
  const [history, setHistory] = useState([
    'MikroTik RouterOS 7.14.2 (c) 1999-2026',
    'Type "help" or "?" for commands list',
    '[admin@Beach-Cafe-Router] > /ip hotspot active print'
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleCommandSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const cmd = inputVal.trim();
    const prompt = `[admin@${selectedRouter.replace(/\s+/g, '-')}] > ${cmd}`;
    let output = [];

    if (cmd === 'help') {
      output = ['Available Commands:', '/ip hotspot active print', '/system resource print', '/ip hotspot user print', '/interface print'];
    } else if (cmd.includes('active print')) {
      output = [
        'Flags: R - radius, B - blocked',
        ' #   USER        ADDRESS        MAC-ADDRESS       UPTIME',
        ' 0   CAFE-8821   10.5.50.101    A4:C3:F0:12:88:91 47m20s',
        ' 1   DAY-9901    10.5.50.108    3C:A6:2F:89:10:44 5h03m11s'
      ];
    } else if (cmd.includes('resource print')) {
      output = [
        '       uptime: 14d08h32m',
        '      version: 7.14.2 (stable)',
        '   cpu-load: 18%',
        '  free-memory: 84.2MiB',
        ' total-memory: 128.0MiB'
      ];
    } else {
      output = [`syntax error (line 1 column 1)`];
    }

    setHistory(prev => [...prev, prompt, ...output]);
    setInputVal('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">MikroTik RouterOS CLI Terminal</h2>
          <p className="text-xs text-slate-400 mt-1">Web-based WinBox terminal simulator for executing RouterOS commands.</p>
        </div>
        <select
          value={selectedRouter}
          onChange={(e) => setSelectedRouter(e.target.value)}
          className="bg-slate-800 border border-slate-700 text-xs text-slate-200 rounded-lg px-3 py-1.5 focus:outline-none"
        >
          {routers.map(r => (
            <option key={r.id} value={r.name}>{r.name} ({r.ip_address})</option>
          ))}
        </select>
      </div>

      <div className="p-4 rounded-2xl bg-black border border-slate-800 font-mono text-xs text-emerald-400 min-h-[420px] flex flex-col justify-between">
        <div className="space-y-1.5 overflow-y-auto max-h-[360px]">
          {history.map((line, idx) => (
            <div key={idx} className={line.startsWith('[admin@') ? 'text-slate-100 font-bold' : 'text-emerald-400'}>
              {line}
            </div>
          ))}
        </div>

        <form onSubmit={handleCommandSubmit} className="mt-4 pt-2 border-t border-slate-800 flex items-center gap-2">
          <span className="text-slate-100 font-bold">[admin@{selectedRouter.replace(/\s+/g, '-')}] &gt;</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent border-none text-emerald-300 font-mono focus:outline-none text-xs"
            placeholder="Type command e.g. /system resource print"
          />
        </form>
      </div>
    </div>
  );
}

// ADMIN CONSOLE VIEW
function AdminConsoleView({ adminUsers, onRefresh }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Platform Admin Console</h2>
          <p className="text-xs text-slate-400 mt-1">Global oversight of multi-tenant SaaS accounts and subscription tiers.</p>
        </div>
        <button onClick={onRefresh} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
          <Icon name="refresh" className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-800/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
            <tr>
              <th className="px-4 py-3">Account Name</th>
              <th className="px-4 py-3">Email Address</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Subscription Plan</th>
              <th className="px-4 py-3">Created Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {adminUsers.map(u => (
              <tr key={u.id} className="hover:bg-slate-800/40">
                <td className="px-4 py-3 font-semibold text-slate-200">{u.name}</td>
                <td className="px-4 py-3 font-mono text-slate-400">{u.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    u.role === 'admin' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {u.role}
                  </span>
                </td>
                <td className="px-4 py-3 font-semibold text-emerald-400">{u.plan}</td>
                <td className="px-4 py-3 text-slate-400">{new Date(u.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// MODAL DIALOGS
// ==========================================

function AuthModal({ type, onClose, onSuccess, onSwitchToRegister, onSwitchToLogin, onDemoLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('Pro');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const endpoint = type === 'login' ? './api/auth/login' : './api/auth/register';
    const payload = type === 'login' ? { email, password } : { name, email, password, plan };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok) {
        onSuccess(data.user);
      } else {
        setError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setError('Network request error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200">
          <Icon name="x" className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-slate-100">
          {type === 'login' ? 'Sign In to MikroTik Manager' : 'Create Hotspot Operator Account'}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          {type === 'login' ? 'Access your routers and voucher billing.' : 'Start managing your WiFi hotspot in minutes.'}
        </p>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-200 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          {type === 'register' && (
            <div>
              <label className="block text-slate-300 font-medium mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-medium mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@wifi.com"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 transition-all mt-2"
          >
            {type === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Quick Demo Access:</span>
          <div className="space-x-2">
            <button onClick={() => onDemoLogin('user')} className="text-indigo-400 hover:underline">Demo Operator</button>
            <button onClick={() => onDemoLogin('admin')} className="text-indigo-400 hover:underline">Demo Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddRouterModal({ currentUser, onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [ipAddress, setIpAddress] = useState('192.168.88.1');
  const [port, setPort] = useState(8728);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Main Branch');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('./api/routers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          name,
          ipAddress,
          port: Number(port),
          username,
          password,
          location
        })
      });
      if (res.ok) onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200">
          <Icon name="x" className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-slate-100">Add MikroTik Router</h3>
        <p className="text-xs text-slate-400 mt-1">Configure connection details for RouterOS API.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-xs">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Router Name / Identity</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Beach Cafe hAP"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">IP Address / Host</label>
              <input
                type="text"
                required
                value={ipAddress}
                onChange={(e) => setIpAddress(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">API Port</label>
              <input
                type="number"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">WinBox Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
          >
            Connect & Save Router
          </button>
        </form>
      </div>
    </div>
  );
}

function AddProfileModal({ currentUser, routers, onClose, onSuccess }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(2.50);
  const [validityValue, setValidityValue] = useState(1);
  const [validityUnit, setValidityUnit] = useState('days');
  const [rateLimitDl, setRateLimitDl] = useState(10);
  const [rateLimitUl, setRateLimitUl] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('./api/profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          name,
          price: Number(price),
          validityValue: Number(validityValue),
          validityUnit,
          rateLimitDl: Number(rateLimitDl),
          rateLimitUl: Number(rateLimitUl)
        })
      });
      if (res.ok) onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative text-xs">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200">
          <Icon name="x" className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-slate-100">Create Hotspot Profile</h3>
        <p className="text-xs text-slate-400 mt-1">Define bandwidth rate limit and pricing.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Profile Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 1 Hour Express Pass"
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Price ($)</label>
              <input
                type="number"
                step="0.1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-medium mb-1">Validity Duration</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={validityValue}
                  onChange={(e) => setValidityValue(e.target.value)}
                  className="w-16 px-2 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                />
                <select
                  value={validityUnit}
                  onChange={(e) => setValidityUnit(e.target.value)}
                  className="flex-1 px-2 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
                >
                  <option value="hours">Hours</option>
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Download (Mbps)</label>
              <input
                type="number"
                value={rateLimitDl}
                onChange={(e) => setRateLimitDl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Upload (Mbps)</label>
              <input
                type="number"
                value={rateLimitUl}
                onChange={(e) => setRateLimitUl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
          >
            Save Hotspot Profile
          </button>
        </form>
      </div>
    </div>
  );
}

function GenerateVouchersModal({ currentUser, routers, profiles, onClose, onSuccess }) {
  const [routerId, setRouterId] = useState(routers[0]?.id || '');
  const [profileId, setProfileId] = useState(profiles[0]?.id || '');
  const [quantity, setQuantity] = useState(10);
  const [prefix, setPrefix] = useState('WIFI');
  const [batchTag, setBatchTag] = useState(`BATCH-${Date.now().toString().slice(-4)}`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('./api/vouchers/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          routerId,
          profileId,
          quantity: Number(quantity),
          prefix,
          batchTag
        })
      });
      const data = await res.json();
      if (res.ok) onSuccess(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative text-xs">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200">
          <Icon name="x" className="w-5 h-5" />
        </button>

        <h3 className="text-lg font-bold text-slate-100">Batch Voucher Generator</h3>
        <p className="text-xs text-slate-400 mt-1">Generate multiple WiFi voucher PIN codes.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Target Router</label>
            <select
              value={routerId}
              onChange={(e) => setRouterId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
            >
              {routers.map(r => (
                <option key={r.id} value={r.id}>{r.name} ({r.ip_address})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Hotspot Package Profile</label>
            <select
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
            >
              {profiles.map(p => (
                <option key={p.id} value={p.id}>{p.name} — ${p.price.toFixed(2)}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-medium mb-1">Quantity (1 - 100)</label>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-medium mb-1">Code Prefix</label>
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 uppercase"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Batch Tag</label>
            <input
              type="text"
              value={batchTag}
              onChange={(e) => setBatchTag(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow"
          >
            Generate {quantity} Vouchers
          </button>
        </form>
      </div>
    </div>
  );
}

function ScriptModal({ router, scriptText, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200">
          <Icon name="x" className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-100">MikroTik RouterOS Setup Script</h3>
            <p className="text-xs text-slate-400 mt-0.5">{router.name} ({router.ip_address})</p>
          </div>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Icon name={copied ? 'check' : 'copy'} className="w-4 h-4" />
            <span>{copied ? 'Copied!' : 'Copy Script'}</span>
          </button>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-black border border-slate-800 font-mono text-xs text-emerald-400 max-h-[380px] overflow-y-auto whitespace-pre">
          {scriptText}
        </div>
      </div>
    </div>
  );
}

// MOUNT TO DOM
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
