import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRailGen } from '../../context/RailGenContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DepartmentBadge } from '../../components/common/DepartmentBadge';
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  Clock, 
  ClipboardList, 
  Search, 
  Plus, 
  Check, 
  X, 
  UserCheck, 
  UserPlus, 
  ArrowRight, 
  ChevronDown, 
  Bell, 
  ChevronRight, 
  Download, 
  RefreshCw, 
  Filter, 
  AlertCircle, 
  CheckCircle2, 
  Train, 
  Lock, 
  Unlock,
  KeyRound,
  Trash2,
  ExternalLink,
  SlidersHorizontal,
  Compass,
  LogOut
} from 'lucide-react';

export function AdminOverview() {
  const { auditLogs } = useRailGen();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current active section from URL path
  const currentPath = location.pathname;
  const isUsersView = currentPath === '/admin/users';
  const isDeptView = currentPath === '/admin/departments';
  const isRolesView = currentPath === '/admin/roles';
  const isAuditView = currentPath === '/admin/audit';
  const isOverview = !isUsersView && !isDeptView && !isRolesView && !isAuditView;

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Modal & feedback state
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Department and Status filters for User Management
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Audit filter state
  const [auditSubsystemFilter, setAuditSubsystemFilter] = useState('All');

  // Saved access control policy feedback
  const [policySaved, setPolicySaved] = useState(false);

  // User Directory state
  const [usersList, setUsersList] = useState([
    { id: 'EMP-MGR-104', name: 'Ananya Deshmukh', dept: 'Manager', role: 'Sr. DOM', designation: 'Sr. Divisional Operations Manager', status: 'Active', lastLogin: 'Today, 12:45', email: 'a.deshmukh@nr.railnet.gov.in' },
    { id: 'EMP-ENG-422', name: 'Suresh Chandra P-Way', dept: 'Engineering', role: 'Sr. DEN (Civil)', designation: 'Senior Divisional Engineer', status: 'Active', lastLogin: 'Today, 11:20', email: 'suresh.pway@nr.railnet.gov.in' },
    { id: 'EMP-TRD-309', name: 'Gurpreet Singh', dept: 'Traction', role: 'DEE (TRD)', designation: 'Divisional Electrical Engineer', status: 'Active', lastLogin: 'Today, 09:15', email: 'gurpreet.trd@nr.railnet.gov.in' },
    { id: 'EMP-SNT-581', name: 'Dr. Priya Raghavan', dept: 'Signal & Telecom', role: 'Sr. DSTE', designation: 'Sr. Div Signal & Telecom Engineer', status: 'Active', lastLogin: 'Today, 08:30', email: 'priya.snt@nr.railnet.gov.in' },
    { id: 'EMP-ADM-001', name: 'Vikramaditya Rao', dept: 'Admin', role: 'PCOM', designation: 'Principal Chief Operations Manager', status: 'Active', lastLogin: 'Today, 13:00', email: 'pcom.nr@railnet.gov.in' },
    { id: 'EMP-ENG-429', name: 'Manoj Bajpayee (P-Way)', dept: 'Engineering', role: 'SSE Track', designation: 'Senior Section Engineer (P-Way)', status: 'Active', lastLogin: 'Yesterday, 16:40', email: 'manoj.sse@nr.railnet.gov.in' },
    { id: 'EMP-NEW-901', name: 'Kavita Sundaram', dept: 'Traction', role: 'JE TRD', designation: 'Junior Engineer (OHE Inspection)', status: 'Pending Review', lastLogin: 'Never', email: 'kavita.trd@nr.railnet.gov.in' }
  ]);

  // Recent Activity Feed matching Image 2
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, initials: 'AS', name: 'Ananya Sharma', dept: 'Engineering', action: 'New user added', dotColor: 'bg-blue-500', time: '10:24 AM', avatarBg: 'bg-blue-100 text-blue-700' },
    { id: 2, initials: 'RK', name: 'Rohit Kumar', dept: 'Traction', action: 'Role updated', dotColor: 'bg-emerald-500', time: '09:15 AM', avatarBg: 'bg-emerald-100 text-emerald-700' },
    { id: 3, initials: 'PM', name: 'Priya Mehta', dept: 'Signal & Telecom', action: 'Access approved', dotColor: 'bg-orange-500', time: 'Yesterday, 05:40 PM', avatarBg: 'bg-purple-100 text-purple-700' },
    { id: 4, initials: 'VS', name: 'Vikram Singh', dept: 'PCOM', action: 'Password reset', dotColor: 'bg-blue-500', time: 'Yesterday, 02:18 PM', avatarBg: 'bg-slate-200 text-slate-800' }
  ]);

  // New User Form State
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
    dept: 'Engineering',
    role: 'Sr. DEN (Civil)',
    designation: 'Section Engineer',
    email: '',
    status: 'Active'
  });

  // Interactive RBAC Matrix State
  const [rbacMatrix, setRbacMatrix] = useState([
    { feature: 'View Corridor Telemetry & Live Schematic', admin: true, manager: true, eng: true, trd: true, snt: true },
    { feature: 'Create Civil P-Way Block Demands', admin: false, manager: false, eng: true, trd: false, snt: false },
    { feature: 'Create Traction OHE Power Blocks', admin: false, manager: false, eng: false, trd: true, snt: false },
    { feature: 'Create S&T Interlocking Block Requests', admin: false, manager: false, eng: false, trd: false, snt: true },
    { feature: 'Trigger Multi-Dept AI Coordination Engine', admin: true, manager: true, eng: false, trd: false, snt: false },
    { feature: 'Approve & Publish Corridor Mega Blocks', admin: false, manager: true, eng: false, trd: false, snt: false },
    { feature: 'Run What-If Corridor Scenarios & Delay Sims', admin: true, manager: true, eng: false, trd: false, snt: false },
    { feature: 'User Provisioning & Role Delegation', admin: true, manager: false, eng: false, trd: false, snt: false },
    { feature: 'Safety Interlock Override & Emergency Cut', admin: true, manager: true, eng: false, trd: true, snt: true }
  ]);

  // Departments Directory Data
  const departmentsData = [
    {
      id: 'civil',
      name: 'Civil Engineering (P-Way)',
      shortCode: 'Civil',
      head: 'Suresh Chandra (Sr. DEN)',
      staffCount: 18,
      activeDemands: 2,
      subsystem: 'TMS & Track USFD',
      zone: 'Northern Railway / DLI Division',
      status: 'Online',
      color: 'border-orange-200 bg-orange-50/30'
    },
    {
      id: 'traction',
      name: 'Traction TRD (OHE & Power)',
      shortCode: 'Traction',
      head: 'Gurpreet Singh (DEE)',
      staffCount: 14,
      activeDemands: 1,
      subsystem: 'SCADA Feeder & OHE Telemetry',
      zone: 'Northern Railway / DLI Division',
      status: 'Online',
      color: 'border-emerald-200 bg-emerald-50/30'
    },
    {
      id: 'snt',
      name: 'Signal & Telecom (S&T)',
      shortCode: 'Signal & Telecom',
      head: 'Dr. Priya Raghavan (Sr. DSTE)',
      staffCount: 11,
      activeDemands: 1,
      subsystem: 'Electronic Interlocking (EI)',
      zone: 'Northern Railway / DLI Division',
      status: 'Online',
      color: 'border-purple-200 bg-purple-50/30'
    },
    {
      id: 'operating',
      name: 'Operating & Traffic Management',
      shortCode: 'Manager',
      head: 'Ananya Deshmukh (Sr. DOM)',
      staffCount: 4,
      activeDemands: 3,
      subsystem: 'FOIS / COIS & Time Table',
      zone: 'Operations HQ / Baroda House',
      status: 'Online',
      color: 'border-blue-200 bg-blue-50/30'
    }
  ];

  // Helper Toast trigger
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };


  // Add User Handler
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newUserForm.name.trim()) return;

    const initials = newUserForm.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'UR';

    const createdUser = {
      id: newUserForm.id || `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: newUserForm.name,
      dept: newUserForm.dept,
      role: newUserForm.role,
      designation: newUserForm.designation || 'Railway Official',
      status: newUserForm.status,
      lastLogin: 'Just now',
      email: newUserForm.email || `${newUserForm.name.toLowerCase().replace(/\s+/g, '.')}@nr.railnet.gov.in`
    };

    setUsersList(prev => [createdUser, ...prev]);

    // Prepend to Recent Activity
    setRecentActivities(prev => [
      {
        id: Date.now(),
        initials,
        name: createdUser.name,
        dept: createdUser.dept,
        action: 'New user added',
        dotColor: 'bg-blue-500',
        time: 'Just now',
        avatarBg: 'bg-blue-100 text-blue-700'
      },
      ...prev
    ]);

    setShowAddUserModal(false);
    setNewUserForm({
      name: '',
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      dept: 'Engineering',
      role: 'Sr. DEN (Civil)',
      designation: 'Section Engineer',
      email: '',
      status: 'Active'
    });

    showToast(`Personnel ${createdUser.name} provisioned successfully in ${createdUser.dept}.`);
  };

  // Reset Key Action
  const handleResetKey = (userName) => {
    showToast(`Temporary access key & OTP dispatched to ${userName}'s official Gov RailNet ID.`);
    setRecentActivities(prev => [
      {
        id: Date.now(),
        initials: userName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
        name: userName,
        dept: 'Admin',
        action: 'Password reset',
        dotColor: 'bg-blue-500',
        time: 'Just now',
        avatarBg: 'bg-slate-200 text-slate-800'
      },
      ...prev
    ]);
  };

  // Toggle User Status
  const handleToggleStatus = (userId) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === userId) {
        const nextStatus = u.status === 'Active' ? 'Pending Review' : 'Active';
        showToast(`Status for ${u.name} updated to "${nextStatus}".`);
        return { ...u, status: nextStatus };
      }
      return u;
    }));
  };

  // Delete User
  const handleDeleteUser = (userId, userName) => {
    setUsersList(prev => prev.filter(u => u.id !== userId));
    showToast(`Personnel ${userName} (${userId}) removed from division registry.`);
  };

  // Toggle RBAC Permission
  const handleToggleRbac = (rowIndex, roleKey) => {
    setRbacMatrix(prev => {
      const updated = [...prev];
      updated[rowIndex] = {
        ...updated[rowIndex],
        [roleKey]: !updated[rowIndex][roleKey]
      };
      return updated;
    });
    setPolicySaved(false);
  };

  const handleSavePolicy = () => {
    setPolicySaved(true);
    showToast("Role-based access control policy saved and synchronized with Northern Railway Auth Server.");
    setTimeout(() => setPolicySaved(false), 5000);
  };

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    return usersList.filter(u => {
      const matchesSearch = 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = deptFilter === 'All' || u.dept.toLowerCase() === deptFilter.toLowerCase();
      const matchesStatus = statusFilter === 'All' || u.status.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [usersList, searchQuery, deptFilter, statusFilter]);

  // Filtered Audit Logs
  const filteredAuditLogs = useMemo(() => {
    return auditLogs.filter(log => {
      const matchesSearch = 
        log.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.module?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSubsystem = auditSubsystemFilter === 'All' || log.module?.toLowerCase().includes(auditSubsystemFilter.toLowerCase());

      return matchesSearch && matchesSubsystem;
    });
  }, [auditLogs, searchQuery, auditSubsystemFilter]);

  // Download Audit Log as CSV
  const handleExportAuditCsv = () => {
    const headers = ['Log ID', 'Timestamp', 'Operator', 'Action', 'Subsystem', 'Result'];
    const rows = filteredAuditLogs.map(l => [l.id, l.time, `"${l.user}"`, `"${l.action}"`, l.module, l.status]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RailGen_Audit_Ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Audit logs exported to CSV successfully.");
  };

  return (
    <div className="space-y-6 select-none">
      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-[#0B2447] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/20 animate-fade-in text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* TOP HEADER MATCHING IMAGE 2 EXACTLY */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1 pb-2">
        {/* Left: Welcome back, Admin & Division */}
        <div>
          <p className="text-xs font-medium text-slate-500 mb-0.5">Welcome back,</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2447] tracking-tight">
            Admin
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operations Headquarters / Northern Railway
          </p>
        </div>

        {/* Right: Search, Switch Dashboard Dropdown, Bell, User Chip, Tricolor Badge */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Universal Search Bar */}
          <div className="relative w-56 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users, departments..."
              className="w-full bg-white border border-slate-200 rounded-lg text-xs pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all shadow-2xs"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>


          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 relative shadow-2xs transition-colors"
              title="Operational Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-3 text-xs animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-slate-900">System Notifications</span>
                  <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-semibold">3 New</span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  <div className="p-2 bg-orange-50/60 rounded-lg border border-orange-100">
                    <p className="font-semibold text-slate-900 text-xs">New user approval request</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Kavita Sundaram (JE TRD) awaiting divisional verification.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">12 mins ago</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="font-semibold text-slate-900 text-xs">FOIS Live Telemetry Linked</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Freight Operations Information System API sync healthy at 100%.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">1 hr ago</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="font-semibold text-slate-900 text-xs">RBAC Policy Re-evaluated</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Multi-department clearance policy verified for Northern Railway.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">3 hrs ago</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Chip `AD Admin ▾` */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#0B2447] text-white flex items-center justify-center font-bold text-xs tracking-wider">
                AD
              </div>
              <span className="text-xs font-bold text-slate-800">Admin</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 text-xs divide-y divide-slate-100 animate-in fade-in">
                <div className="px-3 py-2">
                  <p className="font-bold text-slate-900">Administrator</p>
                  <p className="text-[11px] text-slate-500">Northern Railway / PCOM</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { setShowProfileDropdown(false); navigate('/admin/users'); }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <Users className="w-3.5 h-3.5 text-slate-400" /> User Directory
                  </button>
                  <button 
                    onClick={() => { setShowProfileDropdown(false); navigate('/admin/roles'); }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-400" /> Access Controls
                  </button>
                  <button 
                    onClick={() => { setShowProfileDropdown(false); navigate('/admin/audit'); }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <ClipboardList className="w-3.5 h-3.5 text-slate-400" /> Audit Ledger
                  </button>
                </div>
                <div className="pt-1">
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-red-50 text-red-600 font-semibold flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* "A More Connected India" Graphic Badge */}
          <div className="hidden xl:flex items-center gap-2 border-l border-slate-200 pl-3">
            <div className="text-right">
              <span className="text-xs font-bold text-[#0B2447] tracking-tight block">
                A More Connected India
              </span>
              <div className="w-16 h-1 ml-auto rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border border-slate-200 mt-1"></div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION TABS FOR SEAMLESS SUB-SECTION SWITCHING */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap pb-px">
        {[
          { name: 'Dashboard Overview', path: '/admin', active: isOverview },
          { name: 'User Management', path: '/admin/users', active: isUsersView },
          { name: 'Departments', path: '/admin/departments', active: isDeptView },
          { name: 'Access Controls', path: '/admin/roles', active: isRolesView },
          { name: 'Audit Logs', path: '/admin/audit', active: isAuditView }
        ].map((tab) => (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`pb-3 font-semibold transition-all relative shrink-0 whitespace-nowrap ${
              tab.active
                ? 'text-orange-600 border-b-2 border-orange-500 font-bold'
                : 'text-slate-500 hover:text-slate-900 border-b-2 border-transparent'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* VIEW 1: DASHBOARD OVERVIEW (EXACTLY MATCHING IMAGE 2) */}
      {isOverview && (
        <div className="space-y-6 animate-fade-in">
          {/* 4 PASTEL TINTED KPI CARDS MATCHING IMAGE 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Total Users (Pastel Blue) */}
            <div className="bg-[#F0F7FF] border border-[#DCEBFA] rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600">Total Users</p>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">48</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Across all departments</p>
              </div>
            </div>

            {/* Card 2: Departments (Pastel Green) */}
            <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600">Departments</p>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">4</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Engineering, Traction, S&T, PCOM</p>
              </div>
            </div>

            {/* Card 3: Active Users (Pastel Orange) */}
            <div className="bg-[#FFF7ED] border border-[#FFEDD5] rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600">Active Users</p>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">42</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Currently active</p>
              </div>
            </div>

            {/* Card 4: Pending Approvals (Pastel Purple) */}
            <div className="bg-[#FAF5FF] border border-[#F3E8FF] rounded-2xl p-5 flex items-center gap-4 shadow-2xs hover:shadow-sm transition-all">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-600">Pending Approvals</p>
                <p className="text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">3</p>
                <p className="text-[11px] text-slate-500 mt-0.5">New access requests</p>
              </div>
            </div>
          </div>

          {/* QUICK ACTIONS SECTION MATCHING IMAGE 2 */}
          <div className="space-y-3">
            <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Action 1: Add User */}
              <div 
                onClick={() => setShowAddUserModal(true)}
                className="bg-white border border-slate-200/80 hover:border-orange-300 hover:shadow-md transition-all rounded-xl p-4 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 leading-tight">Add User</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Create new personnel account</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Action 2: Manage Roles */}
              <div 
                onClick={() => navigate('/admin/roles')}
                className="bg-white border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all rounded-xl p-4 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 leading-tight">Manage Roles</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Assign and update permissions</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Action 3: View Departments */}
              <div 
                onClick={() => navigate('/admin/departments')}
                className="bg-white border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all rounded-xl p-4 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 leading-tight">View Departments</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Manage departmental access</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all" />
              </div>

              {/* Action 4: View Audit Logs */}
              <div 
                onClick={() => navigate('/admin/audit')}
                className="bg-white border border-slate-200/80 hover:border-purple-300 hover:shadow-md transition-all rounded-xl p-4 flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-xs text-slate-900 leading-tight">View Audit Logs</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Track system activities</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </div>

          {/* RECENT ACTIVITY SECTION MATCHING IMAGE 2 */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Recent Activity</h2>
              <button 
                onClick={() => navigate('/admin/audit')}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-medium">
                    <th className="py-2.5 px-3">User</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Action</th>
                    <th className="py-2.5 px-3 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentActivities.map((act) => (
                    <tr key={act.id} className="hover:bg-slate-50/60 transition-colors">
                      {/* User Avatar + Name */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[11px] ${act.avatarBg}`}>
                            {act.initials}
                          </div>
                          <span className="font-semibold text-slate-900">{act.name}</span>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3.5 px-3 text-slate-600 font-medium">
                        {act.dept}
                      </td>

                      {/* Action with colored status dot */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-2 text-slate-700">
                          <span className={`w-2 h-2 rounded-full ${act.dotColor} shrink-0`}></span>
                          <span>{act.action}</span>
                        </div>
                      </td>

                      {/* Time */}
                      <td className="py-3.5 px-3 text-right text-slate-500 font-medium">
                        {act.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: USER MANAGEMENT (/admin/users) */}
      {isUsersView && (
        <div className="space-y-4 animate-fade-in">
          {/* Action Toolbar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Department Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Department:</span>
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Civil Engineering</option>
                  <option value="Traction">Traction TRD</option>
                  <option value="Signal & Telecom">Signal & Telecom</option>
                  <option value="Manager">Operating / DOM</option>
                  <option value="Admin">Admin (PCOM)</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span>Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending Review">Pending Review</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Railway Personnel</span>
            </button>
          </div>

          {/* User Table */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
              <span>Showing {filteredUsers.length} of {usersList.length} railway personnel</span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg table-responsive">
              <table className="w-full min-w-[650px] text-left text-xs border-collapse">
                <thead className="bg-[#F8FAFC] text-slate-600 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-3.5">Employee ID</th>
                    <th className="py-3 px-3.5">Name</th>
                    <th className="py-3 px-3.5">Department</th>
                    <th className="py-3 px-3.5">Designation</th>
                    <th className="py-3 px-3.5">Status</th>
                    <th className="py-3 px-3.5">Last Active</th>
                    <th className="py-3 px-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No railway personnel found matching search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-3.5 font-mono text-slate-900 font-bold">{u.id}</td>
                        <td className="py-3 px-3.5">
                          <div>
                            <span className="font-semibold text-slate-900">{u.name}</span>
                            <span className="block text-[11px] text-slate-400">{u.email}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3.5"><DepartmentBadge department={u.dept} /></td>
                        <td className="py-3 px-3.5 text-slate-600">{u.designation || u.role}</td>
                        <td className="py-3 px-3.5">
                          <button 
                            onClick={() => handleToggleStatus(u.id)}
                            title="Click to toggle status"
                          >
                            <StatusBadge status={u.status} size="xs" />
                          </button>
                        </td>
                        <td className="py-3 px-3.5 text-slate-500 font-mono">{u.lastLogin}</td>
                        <td className="py-3 px-3.5 text-right space-x-1.5">
                          <button 
                            onClick={() => handleResetKey(u.name)}
                            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-orange-50 hover:text-orange-700 font-semibold transition-colors"
                            title="Generate temporary OTP / Reset key"
                          >
                            Reset Key
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(u.id, u.name)}
                            className="text-[11px] p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors inline-flex items-center"
                            title="Revoke and remove personnel"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: DEPARTMENTS (/admin/departments) */}
      {isDeptView && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between gap-4 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">Divisional Department Provisioning</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage departmental workspaces, telemetry linkages, and authorized section engineers.</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              4 Active Units Linked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {departmentsData.map((dept) => (
              <div key={dept.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:shadow-sm transition-all space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-[#0B2447] flex items-center justify-center font-bold text-xs">
                      <Building2 className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900">{dept.name}</h3>
                      <p className="text-xs text-slate-500">{dept.zone}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {dept.status}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Staff Count</span>
                    <span className="font-bold text-slate-900 text-sm">{dept.staffCount}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Blocks</span>
                    <span className="font-bold text-orange-600 text-sm">{dept.activeDemands}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Subsystem</span>
                    <span className="font-semibold text-slate-700 text-xs truncate block">{dept.subsystem}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 font-medium">Head: {dept.head}</span>
                  <button
                    onClick={() => {
                      setDeptFilter(dept.shortCode);
                      navigate('/admin/users');
                    }}
                    className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <span>View Personnel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: ACCESS CONTROLS (/admin/roles) */}
      {isRolesView && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">Role-Based Access Control (RBAC) Matrix</h2>
              <p className="text-xs text-slate-500 mt-0.5">Toggle operational authorities across Indian Railways desks. Changes are enforced immediately.</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSavePolicy}
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Save Access Policy</span>
              </button>
            </div>
          </div>

          {policySaved && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Security policy synchronized with Northern Railway Auth Gateway. All session tokens refreshed.</span>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-[#F8FAFC] text-slate-700 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Operational Capability</th>
                    <th className="py-3 px-3 text-center">Admin (PCOM)</th>
                    <th className="py-3 px-3 text-center">Manager (DOM)</th>
                    <th className="py-3 px-3 text-center">Civil (P-Way)</th>
                    <th className="py-3 px-3 text-center">Traction (TRD)</th>
                    <th className="py-3 px-3 text-center">Signal (S&T)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rbacMatrix.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-slate-800">{r.feature}</td>
                      
                      {['admin', 'manager', 'eng', 'trd', 'snt'].map((roleKey) => (
                        <td key={roleKey} className="py-3.5 px-3 text-center">
                          <button
                            onClick={() => handleToggleRbac(idx, roleKey)}
                            className={`p-1.5 rounded-md transition-all ${
                              r[roleKey] 
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                                : 'bg-slate-100 text-slate-300 hover:bg-slate-200'
                            }`}
                            title={`Click to ${r[roleKey] ? 'revoke' : 'grant'} permission`}
                          >
                            {r[roleKey] ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                          </button>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 5: AUDIT LOGS (/admin/audit) */}
      {isAuditView && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">Divisional System Audit Logs</h2>
              <p className="text-xs text-slate-500 mt-0.5">Recorded on Immutable Indian Railways Security Ledger.</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Category Filter */}
              <div className="flex items-center gap-1 text-xs text-slate-600">
                <span>Filter:</span>
                <select
                  value={auditSubsystemFilter}
                  onChange={(e) => setAuditSubsystemFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value="All">All Modules</option>
                  <option value="Coordination">AI Coordination</option>
                  <option value="Block">Block Management</option>
                  <option value="Security">Security & Auth</option>
                </select>
              </div>

              {/* Export CSV Button */}
              <button
                onClick={handleExportAuditCsv}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div className="overflow-x-auto border border-slate-200 rounded-lg table-responsive">
              <table className="w-full min-w-[650px] text-left text-xs border-collapse">
                <thead className="bg-[#F8FAFC] text-slate-600 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-2.5 px-3">Log ID</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Operator</th>
                    <th className="py-2.5 px-3">Action Description</th>
                    <th className="py-2.5 px-3">Subsystem</th>
                    <th className="py-2.5 px-3 text-right">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAuditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-400">
                        No audit events matching criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredAuditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-3 font-mono font-bold text-slate-800">{log.id}</td>
                        <td className="py-3 px-3 font-mono text-slate-500">{log.time}</td>
                        <td className="py-3 px-3 font-semibold text-slate-900">{log.user}</td>
                        <td className="py-3 px-3 text-slate-800">{log.action}</td>
                        <td className="py-3 px-3">
                          <span className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 font-mono text-[10px]">
                            {log.module}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right"><StatusBadge status={log.status} size="xs" /></td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD RAILWAY PERSONNEL */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Provision Railway Personnel</h3>
                  <p className="text-xs text-slate-500">Add an operator to Indian Railways access registry</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddUserModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar Patel"
                  value={newUserForm.name}
                  onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={newUserForm.id}
                    onChange={(e) => setNewUserForm({ ...newUserForm, id: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 font-mono text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department *</label>
                  <select
                    value={newUserForm.dept}
                    onChange={(e) => setNewUserForm({ ...newUserForm, dept: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Engineering">Civil Engineering (P-Way)</option>
                    <option value="Traction">Traction TRD (OHE)</option>
                    <option value="Signal & Telecom">Signal & Telecom (S&T)</option>
                    <option value="Manager">Operating Manager (DOM)</option>
                    <option value="Admin">Principal Chief Operations Manager</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Section Engineer"
                    value={newUserForm.designation}
                    onChange={(e) => setNewUserForm({ ...newUserForm, designation: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Account Status</label>
                  <select
                    value={newUserForm.status}
                    onChange={(e) => setNewUserForm({ ...newUserForm, status: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                  >
                    <option value="Active">Active (Immediate Clearance)</option>
                    <option value="Pending Review">Pending Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Gov Email</label>
                <input
                  type="email"
                  placeholder="name.dept@nr.railnet.gov.in"
                  value={newUserForm.email}
                  onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-sm transition-colors"
                >
                  Provision Personnel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER MATCHING IMAGE 2 EXACTLY */}
      <footer className="pt-8 pb-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>© 2025 RailGen. Built for Indian Railways.</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border border-slate-200"></div>
          <span>For a Stronger, Connected India.</span>
        </div>
      </footer>
    </div>
  );
}
