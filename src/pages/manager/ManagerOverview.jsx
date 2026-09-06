import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRailGen } from '../../context/RailGenContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DepartmentBadge } from '../../components/common/DepartmentBadge';
import managerTrainHero from '../../assets/manager_train_hero.jpg';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  CalendarDays, 
  Wrench, 
  Search, 
  ChevronDown, 
  Bell, 
  ArrowRight, 
  Filter, 
  Check, 
  X, 
  Plus, 
  Train, 
  Activity, 
  Calendar, 
  Sparkles, 
  HardHat, 
  Zap, 
  Radio, 
  FileText, 
  Send, 
  Download, 
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  LogOut
} from 'lucide-react';

export function ManagerOverview() {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active section from URL
  const currentPath = location.pathname;
  const isApprovalsView = currentPath === '/manager/approvals' || currentPath === '/manager/requests';
  const isMaintenanceView = currentPath === '/manager/maintenance';
  const isScheduleView = currentPath === '/manager/block-schedule' || currentPath === '/manager/weekly-plan';
  const isOverview = !isApprovalsView && !isMaintenanceView && !isScheduleView;

  // Search and dropdown states
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState(null);

  // Rejection modal state
  const [rejectingItem, setRejectingItem] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('Train path conflict with high-speed passenger service');

  // Filters for Approvals tab
  const [approvalDeptFilter, setApprovalDeptFilter] = useState('All');
  const [approvalPriorityFilter, setApprovalPriorityFilter] = useState('All');

  // Schedule published banner
  const [schedulePublished, setSchedulePublished] = useState(false);

  // Schedule view mode toggle (Daily vs Weekly)
  const [scheduleViewMode, setScheduleViewMode] = useState('daily'); // 'daily' or 'weekly'

  // Maintenance filter
  const [maintDeptFilter, setMaintDeptFilter] = useState('All');
  const [maintStatusFilter, setMaintStatusFilter] = useState('All');

  // Awaiting Approvals Requests state
  const [requestsList, setRequestsList] = useState([
    {
      id: 'REQ-ENG-1042',
      type: 'Track Tamping (USFD)',
      section: 'LDH - JUC (Km 342)',
      dept: 'Civil Engineering',
      priority: 'Critical',
      status: 'Awaiting Review',
      duration: '3.5 Hours',
      window: '01:30 - 05:00 hrs',
      engineer: 'Suresh Chandra (Sr. DEN)',
      machine: 'Duomatic Tamping Machine (BCM-08)',
      aiScore: '100% Cleared (No Head-on Overlaps)'
    },
    {
      id: 'REQ-TRD-2089',
      type: 'OHE Dropper Inspection',
      section: 'LDH - JUC (Km 341)',
      dept: 'Traction TRD',
      priority: 'High',
      status: 'Awaiting Review',
      duration: '3.0 Hours',
      window: '02:00 - 05:00 hrs',
      engineer: 'Gurpreet Singh (DEE TRD)',
      machine: '25kV Tower Wagon TW-08',
      aiScore: 'Pre-cleared with Civil Mega-Block'
    },
    {
      id: 'REQ-SNT-3014',
      type: 'Point Machine 104A Overhaul',
      section: 'LDH Yard - Outer',
      dept: 'Signal & Telecom',
      priority: 'Medium',
      status: 'Awaiting Review',
      duration: '2.5 Hours',
      window: '02:30 - 05:00 hrs',
      engineer: 'Dr. Priya Raghavan (Sr. DSTE)',
      machine: 'Point Calibration Rig',
      aiScore: 'Simultaneous with OHE power cut'
    },
    {
      id: 'REQ-ENG-1049',
      type: 'Ballast Shoulder Cleaning',
      section: 'UMB - LDH (Km 248)',
      dept: 'Civil Engineering',
      priority: 'Medium',
      status: 'Awaiting Review',
      duration: '2.5 Hours',
      window: '01:00 - 03:30 hrs',
      engineer: 'Manoj Bajpayee (SSE Track)',
      machine: 'Shoulder Ballast Cleaner',
      aiScore: 'Down loop line operational'
    },
    {
      id: 'REQ-TRD-2095',
      type: 'Cantilever Mast Adjustment',
      section: 'JUC - ASR (Km 380)',
      dept: 'Traction TRD',
      priority: 'Normal',
      status: 'Awaiting Review',
      duration: '2.0 Hours',
      window: '03:00 - 05:00 hrs',
      engineer: 'Kavita Sundaram (JE TRD)',
      machine: 'Ladder Trolley Unit #04',
      aiScore: 'Clear of Rajdhani Express 12425'
    }
  ]);

  // Scheduled Blocks Count
  const [scheduledBlocksCount, setScheduledBlocksCount] = useState(12);

  // Ongoing Maintenance Works state
  const [maintenanceWorks, setMaintenanceWorks] = useState([
    {
      id: 'MW-01',
      title: 'Track Tamping & USFD Micro-Crack Rectification',
      dept: 'Civil Engineering',
      section: 'LDH - JUC Up Line (Km 342/10 - 344/18)',
      supervisor: 'Suresh Chandra (Sr. DEN)',
      equipment: 'Duomatic Tamping Machine + 22 Trackmen',
      progress: 68,
      status: 'In Progress',
      tsr: '30 km/h Temporary Speed Restriction enforced',
      timeSlot: '01:30 - 05:00 hrs'
    },
    {
      id: 'MW-02',
      title: '25kV OHE Catenary Wire Dropper Renewal',
      dept: 'Traction TRD',
      section: 'LDH - JUC Up Line (Km 341/04 - 343/12)',
      supervisor: 'Gurpreet Singh (DEE TRD)',
      equipment: 'Tower Wagon TW-08 + 14 Technicians',
      progress: 85,
      status: 'In Progress',
      tsr: '25kV Feeder Isolated & Earth Discharged',
      timeSlot: '02:00 - 05:00 hrs'
    },
    {
      id: 'MW-03',
      title: 'Electronic Interlocking Point Machine 104A Servicing',
      dept: 'Signal & Telecom',
      section: 'Ludhiana Junction Outer Yard',
      supervisor: 'Dr. Priya Raghavan (Sr. DSTE)',
      equipment: 'Interlocking Test Rig + Point Detectors',
      progress: 42,
      status: 'In Progress',
      tsr: 'Signal 14 Locked at Danger with Clamped Switch',
      timeSlot: '02:30 - 05:00 hrs'
    },
    {
      id: 'MW-04',
      title: 'Ballast Shoulder Deep Cleaning & Tamper Packing',
      dept: 'Civil Engineering',
      section: 'Ambala - Ludhiana (Km 248/06 - 250/12)',
      supervisor: 'Manoj Bajpayee (SSE Track)',
      equipment: 'BCM-14 + Ballast Regulator',
      progress: 0,
      status: 'Scheduled',
      tsr: 'Scheduled for tonight 01:00 hrs',
      timeSlot: 'Tonight, 01:00 - 03:30 hrs'
    }
  ]);


  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Approve Request
  const handleApprove = (reqId) => {
    setRequestsList(prev => prev.map(r => {
      if (r.id === reqId) {
        return { ...r, status: 'Approved' };
      }
      return r;
    }));
    setScheduledBlocksCount(prev => prev + 1);
    showToast(`Block Request ${reqId} approved and committed to tomorrow's Corridor Mega-Block schedule.`);
  };

  // Reject Request Confirmation
  const handleRejectConfirm = () => {
    if (!rejectingItem) return;
    setRequestsList(prev => prev.map(r => {
      if (r.id === rejectingItem.id) {
        return { ...r, status: 'Rejected' };
      }
      return r;
    }));
    showToast(`Block Request ${rejectingItem.id} returned to ${rejectingItem.dept} for rescheduling.`);
    setRejectingItem(null);
  };

  // Batch Approve All
  const handleBatchApproveAll = () => {
    const pending = requestsList.filter(r => r.status === 'Awaiting Review');
    if (pending.length === 0) {
      showToast("No pending requests to approve.");
      return;
    }
    setRequestsList(prev => prev.map(r => ({ ...r, status: 'Approved' })));
    setScheduledBlocksCount(prev => prev + pending.length);
    showToast(`All ${pending.length} pending corridor requests approved and published.`);
  };

  // Publish Schedule
  const handlePublishSchedule = () => {
    setSchedulePublished(true);
    showToast("Master Corridor Block Schedule published and synchronized with Northern Railway COIS/FOIS live feeds.");
    setTimeout(() => setSchedulePublished(false), 6000);
  };

  // Export Schedule CSV
  const handleExportScheduleCsv = () => {
    const headers = ['Time Window', 'Block Name', 'Section & Km', 'Departments', 'TSR / Speed', 'Status'];
    const rows = [
      ['01:30 - 05:00 hrs', 'Corridor Unified Mega-Block #LDH-01', 'LDH - JUC Up Line (Km 341-346)', 'Civil, Traction TRD, S&T', '30 km/h', 'Approved'],
      ['01:00 - 03:30 hrs', 'Ballast Shoulder Cleaning #UMB-04', 'UMB - LDH (Km 248-250)', 'Civil Engineering', '45 km/h', 'Approved'],
      ['03:00 - 05:00 hrs', 'Cantilever Mast Adjustment #JUC-09', 'JUC - ASR (Km 380)', 'Traction TRD', 'Normal', 'Scheduled']
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RailGen_Corridor_Block_Schedule_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Corridor Block Schedule downloaded as CSV.");
  };

  // Dynamic Pending Count
  const pendingApprovalsCount = requestsList.filter(r => r.status === 'Awaiting Review').length;

  // Filtered requests for Approvals View
  const filteredApprovals = useMemo(() => {
    return requestsList.filter(r => {
      const matchesSearch = 
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.dept.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = approvalDeptFilter === 'All' || r.dept.toLowerCase() === approvalDeptFilter.toLowerCase();
      const matchesPriority = approvalPriorityFilter === 'All' || r.priority.toLowerCase() === approvalPriorityFilter.toLowerCase();

      return matchesSearch && matchesDept && matchesPriority;
    });
  }, [requestsList, searchQuery, approvalDeptFilter, approvalPriorityFilter]);

  // Filtered maintenance works
  const filteredMaintenance = useMemo(() => {
    return maintenanceWorks.filter(m => {
      const matchesSearch = 
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.dept.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDept = maintDeptFilter === 'All' || m.dept.toLowerCase() === maintDeptFilter.toLowerCase();
      const matchesStatus = maintStatusFilter === 'All' || m.status.toLowerCase() === maintStatusFilter.toLowerCase();

      return matchesSearch && matchesDept && matchesStatus;
    });
  }, [maintenanceWorks, searchQuery, maintDeptFilter, maintStatusFilter]);

  return (
    <div className="space-y-6 select-none">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-[#0B2447] text-white px-4 py-3 rounded-xl shadow-2xl border border-white/20 animate-fade-in text-xs font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white ml-2">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* TOP HEADER MATCHING IMAGE 2 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 pb-2">
        {/* Universal Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search block ID, train #, section..."
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

        {/* Right Controls: Date Pill, Switch Dashboard, Notifications, User Chip */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Calendar / Today indicator */}
          <div className="hidden md:flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-600 shadow-2xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-orange-600" />
            <span>Today: 07-Sep-2026</span>
          </div>


          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 relative shadow-2xs transition-colors"
              title="Corridor Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {pendingApprovalsCount}
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-3 text-xs animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-slate-900">Corridor Notifications</span>
                  <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded font-semibold">{pendingApprovalsCount} Pending</span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  <div className="p-2 bg-orange-50/60 rounded-lg border border-orange-100">
                    <p className="font-semibold text-slate-900 text-xs">P-Way Block Request Pending</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Suresh Chandra (Sr. DEN) requested 3.5h for track tamping at Km 342.</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="font-semibold text-slate-900 text-xs">AI Unification Ready</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Unified mega-block planned for 01:30 - 05:00 hrs saving 5.5h delay.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Chip */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <div className="w-7 h-7 rounded-full bg-[#0B2447] text-white flex items-center justify-center font-bold text-xs tracking-wider">
                AD
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-tight">Ananya Deshmukh</p>
                <p className="text-[10px] text-slate-400">Manager (Sr. DOM)</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 text-xs divide-y divide-slate-100 animate-in fade-in">
                <div className="px-3 py-2">
                  <p className="font-bold text-slate-900">Ananya Deshmukh</p>
                  <p className="text-[11px] text-slate-500">Sr. DOM • Firozpur Division</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { setShowProfileDropdown(false); navigate('/manager/approvals'); }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" /> Pending Approvals
                  </button>
                  <button 
                    onClick={() => { setShowProfileDropdown(false); navigate('/manager/maintenance'); }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <Wrench className="w-3.5 h-3.5 text-slate-400" /> Maintenance Board
                  </button>
                  <button 
                    onClick={() => { setShowProfileDropdown(false); navigate('/manager/block-schedule'); }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <CalendarDays className="w-3.5 h-3.5 text-slate-400" /> Block Schedule
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
        </div>
      </div>

      {/* HERO BANNER MATCHING IMAGE 2 EXACTLY */}
      <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs relative">
        <div className="p-6 sm:p-7 max-w-xl z-10 relative">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Operations Headquarters • Northern Railway</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2447] tracking-tight">
            Ananya Deshmukh
          </h1>

          <p className="text-xs font-semibold text-orange-600 mt-0.5">
            Manager (Sr. DOM) | Firozpur Division • Northern Railway
          </p>

          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Coordinating multi-department maintenance blocks across high-density electrified corridors. Reviewing Civil P-Way, Traction TRD, and S&T requests.
          </p>
        </div>

        {/* Right side Railway Hero Image with smooth fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden hidden md:block">
          <img 
            src={managerTrainHero} 
            alt="Indian Railways Corridor" 
            className="w-full h-full object-cover object-center transform scale-105" 
          />
          {/* Seamless gradient fade from white card into photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
          
          <div className="absolute bottom-3 right-4 bg-[#0B2447]/85 backdrop-blur-xs text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 shadow-md">
            Operational Excellence & Safety
          </div>
        </div>
      </div>

      {/* 4 KPI STAT CARDS MATCHING IMAGE 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Pending Approvals */}
        <div 
          onClick={() => navigate('/manager/approvals')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm hover:border-orange-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{pendingApprovalsCount}</p>
              <p className="text-xs font-semibold text-slate-600">Pending Approvals</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-orange-600 group-hover:translate-x-0.5 transition-transform flex items-center">
            View All →
          </span>
        </div>

        {/* Card 2: Ongoing Maintenance */}
        <div 
          onClick={() => navigate('/manager/maintenance')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm hover:border-blue-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">18</p>
              <p className="text-xs font-semibold text-slate-600">Ongoing Maintenance</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center">
            View All →
          </span>
        </div>

        {/* Card 3: Scheduled Blocks */}
        <div 
          onClick={() => navigate('/manager/block-schedule')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm hover:border-emerald-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <CalendarDays className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{scheduledBlocksCount}</p>
              <p className="text-xs font-semibold text-slate-600">Scheduled Blocks</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center">
            View All →
          </span>
        </div>

        {/* Card 4: Active Conflicts */}
        <div 
          onClick={() => navigate('/manager/approvals')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm hover:border-red-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">2</p>
              <p className="text-xs font-semibold text-slate-600">Active Conflicts</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-red-600 group-hover:translate-x-0.5 transition-transform flex items-center">
            View All →
          </span>
        </div>
      </div>

      {/* SECTION TABS: DASHBOARD, APPROVE, MAINTENANCE, BLOCK SCHEDULE */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap pb-px">
        {[
          { name: 'Dashboard', path: '/manager', active: isOverview },
          { name: `Approve (${pendingApprovalsCount})`, path: '/manager/approvals', active: isApprovalsView },
          { name: 'Maintenance', path: '/manager/maintenance', active: isMaintenanceView },
          { name: 'Block Schedule', path: '/manager/block-schedule', active: isScheduleView }
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

      {/* SECTION 1: MAIN DASHBOARD OVERVIEW (IMAGE 2 LAYOUT) */}
      {isOverview && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
          {/* LEFT COLUMN: AWAITING APPROVALS TABLE (65% width) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-4 rounded-full bg-orange-500"></span>
                <h2 className="text-base font-bold text-slate-900">Awaiting Approvals</h2>
              </div>
              <button
                onClick={() => navigate('/manager/approvals')}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
              >
                <span>View All ({pendingApprovalsCount})</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl table-responsive">
              <table className="w-full min-w-[650px] text-left text-xs border-collapse">
                <thead className="bg-[#F8FAFC] text-slate-500 border-b border-slate-100 font-semibold">
                  <tr>
                    <th className="py-3 px-3.5">Request ID</th>
                    <th className="py-3 px-3.5">Type</th>
                    <th className="py-3 px-3.5">Corridor</th>
                    <th className="py-3 px-3.5">Department</th>
                    <th className="py-3 px-3.5">Priority</th>
                    <th className="py-3 px-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requestsList.slice(0, 5).map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-3.5 font-mono font-bold text-slate-900">{req.id}</td>
                      <td className="py-3.5 px-3.5 font-semibold text-slate-800">{req.type}</td>
                      <td className="py-3.5 px-3.5 text-slate-600">{req.section}</td>
                      <td className="py-3.5 px-3.5">
                        <DepartmentBadge department={req.dept} />
                      </td>
                      <td className="py-3.5 px-3.5">
                        <StatusBadge status={req.priority} size="xs" />
                      </td>
                      <td className="py-3.5 px-3.5 text-right space-x-1.5">
                        {req.status === 'Approved' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                            <Check className="w-3.5 h-3.5" /> Approved
                          </span>
                        ) : req.status === 'Rejected' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-lg border border-red-200">
                            <X className="w-3.5 h-3.5" /> Rejected
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handleApprove(req.id)}
                              className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-2xs transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => setRejectingItem(req)}
                              className="border border-slate-200 text-slate-600 hover:bg-slate-100 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-colors"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT COLUMN: TODAY'S SCHEDULE & TRAFFIC IMPACT (35% width) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Widget 1: Today's Schedule Timeline */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-orange-600" />
                  <h3 className="text-sm font-bold text-slate-900">Today's Schedule</h3>
                </div>
                <button
                  onClick={() => navigate('/manager/block-schedule')}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Event 1 */}
                <div className="flex items-start gap-3 relative">
                  <span className="font-mono text-slate-500 font-semibold w-12 text-right shrink-0 pt-0.5">01:30</span>
                  <div className="w-2 h-2 rounded-full bg-orange-500 mt-1.5 shrink-0 ring-4 ring-orange-100"></div>
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">Track Tamping (P-Way)</p>
                    <p className="text-[11px] text-slate-500">LDH - JUC Up Line (Km 342)</p>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex items-start gap-3 relative">
                  <span className="font-mono text-slate-500 font-semibold w-12 text-right shrink-0 pt-0.5">02:00</span>
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0 ring-4 ring-emerald-100"></div>
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">OHE Power Isolation (TRD)</p>
                    <p className="text-[11px] text-slate-500">Sub-Sector LDH-East (25kV)</p>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex items-start gap-3 relative">
                  <span className="font-mono text-slate-500 font-semibold w-12 text-right shrink-0 pt-0.5">03:30</span>
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 ring-4 ring-blue-100"></div>
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">Point Machine 104A Testing</p>
                    <p className="text-[11px] text-slate-500">LDH Outer Interlocking</p>
                  </div>
                </div>

                {/* Event 4 */}
                <div className="flex items-start gap-3 relative">
                  <span className="font-mono text-slate-500 font-semibold w-12 text-right shrink-0 pt-0.5">05:15</span>
                  <div className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 shrink-0 ring-4 ring-purple-100"></div>
                  <div>
                    <p className="font-bold text-slate-900 leading-tight">Track Fit Certificate Issued</p>
                    <p className="text-[11px] text-slate-500">Full corridor restored for Rajdhani</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Widget 2: Traffic Impact & AI Unification Score */}
            <div className="bg-[#0B2447] text-white rounded-2xl p-5 shadow-sm space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                    TRAFFIC IMPACT: 98.4%
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>

              <div>
                <h4 className="font-bold text-sm text-white">All Corridor Mega-Blocks on Track</h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">
                  AI block scheduler unified 3 departmental requests into a single night window (01:30 - 05:00 hrs), saving 5.5 hours of daytime passenger delays.
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400">Next Conflict Window: 06:15 hrs</span>
                <button
                  onClick={() => navigate('/manager/block-schedule')}
                  className="text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1 text-[11px]"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: APPROVAL COMMAND CENTER (/manager/approvals) */}
      {isApprovalsView && (
        <div className="space-y-4 animate-fade-in">
          {/* Action Toolbar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Department Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Department:</span>
                <select
                  value={approvalDeptFilter}
                  onChange={(e) => setApprovalDeptFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value="All">All Departments</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Traction TRD">Traction TRD</option>
                  <option value="Signal & Telecom">Signal & Telecom</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span>Priority:</span>
                <select
                  value={approvalPriorityFilter}
                  onChange={(e) => setApprovalPriorityFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value="All">All Priorities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Normal">Normal</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleBatchApproveAll}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Batch Approve All Verified ({pendingApprovalsCount})</span>
            </button>
          </div>

          {/* Detailed Approval Cards */}
          <div className="space-y-3">
            {filteredApprovals.map((req) => (
              <div 
                key={req.id} 
                className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs hover:border-orange-200 transition-all space-y-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#0B2447]">{req.id}</span>
                      <DepartmentBadge department={req.dept} />
                      <StatusBadge status={req.priority} size="xs" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">{req.type}</h3>
                    <p className="text-xs text-slate-500">{req.section} • Requested Duration: {req.duration}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {req.status === 'Approved' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                        <Check className="w-4 h-4" /> Block Approved
                      </span>
                    ) : req.status === 'Rejected' ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-700 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                        <X className="w-4 h-4" /> Request Returned
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => setRejectingItem(req)}
                          className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="px-4 py-1.5 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve Block</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 border border-slate-100 rounded-lg text-xs text-slate-600">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Window Slot</span>
                    <span className="font-bold text-slate-900">{req.window}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Supervisor</span>
                    <span className="font-semibold text-slate-800">{req.engineer}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">AI Pre-Check</span>
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      {req.aiScore}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: MAINTENANCE WORKBOARD (/manager/maintenance) */}
      {isMaintenanceView && (
        <div className="space-y-4 animate-fade-in">
          {/* Filter Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Department:</span>
                <select
                  value={maintDeptFilter}
                  onChange={(e) => setMaintDeptFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value="All">All Departments</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Traction TRD">Traction TRD</option>
                  <option value="Signal & Telecom">Signal & Telecom</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span>Status:</span>
                <select
                  value={maintStatusFilter}
                  onChange={(e) => setMaintStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>
            </div>

            <span className="text-xs font-semibold text-slate-500">
              4 Corridors Under Supervised Maintenance
            </span>
          </div>

          {/* Maintenance Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMaintenance.map((m) => (
              <div 
                key={m.id} 
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <DepartmentBadge department={m.dept} />
                      <span className="text-[11px] font-bold text-slate-500">{m.timeSlot}</span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900">{m.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{m.section}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    m.status === 'In Progress' 
                      ? 'bg-blue-50 text-blue-700 border-blue-200' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {m.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Execution Progress</span>
                    <span className="font-bold text-slate-900">{m.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        m.progress >= 80 ? 'bg-emerald-500' : m.progress >= 40 ? 'bg-orange-500' : 'bg-slate-300'
                      }`}
                      style={{ width: `${m.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                  <p><span className="font-semibold text-slate-800">Assigned:</span> {m.supervisor}</p>
                  <p><span className="font-semibold text-slate-800">Machinery:</span> {m.equipment}</p>
                  <p className="text-[11px] text-orange-700 bg-orange-50/70 px-2 py-1 rounded mt-2 font-medium">
                    {m.tsr}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: BLOCK SCHEDULE (/manager/block-schedule) */}
      {isScheduleView && (
        <div className="space-y-4 animate-fade-in">
          {/* Header Action Bar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">Master Corridor Block Schedule</h2>
              <p className="text-xs text-slate-500 mt-0.5">Approved night maintenance windows synchronized across Firozpur & Ambala divisions.</p>
            </div>

            <div className="flex items-center gap-2.5">
              {/* Daily / Weekly toggle */}
              <div className="bg-slate-100 p-0.5 rounded-lg flex items-center text-xs font-semibold">
                <button
                  onClick={() => setScheduleViewMode('daily')}
                  className={`px-3 py-1 rounded-md transition-all ${scheduleViewMode === 'daily' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
                >
                  Tonight (Daily)
                </button>
                <button
                  onClick={() => setScheduleViewMode('weekly')}
                  className={`px-3 py-1 rounded-md transition-all ${scheduleViewMode === 'weekly' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500'}`}
                >
                  Weekly Master
                </button>
              </div>

              <button
                onClick={handleExportScheduleCsv}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handlePublishSchedule}
                className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish to Station Masters</span>
              </button>
            </div>
          </div>

          {schedulePublished && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Timetable committed to live Northern Railway FOIS / COIS control system. Line clearance notifications dispatched.</span>
            </div>
          )}

          {/* Schedule Master Table */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Ludhiana Jn (LDH) — Jalandhar Cantt (JUC) Corridor Schedule</span>
              <span>Buffer Headway: 45 Mins</span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl table-responsive">
              <table className="w-full min-w-[650px] text-left text-xs border-collapse">
                <thead className="bg-[#F8FAFC] text-slate-600 border-b border-slate-200 font-semibold">
                  <tr>
                    <th className="py-3 px-3.5">Time Window</th>
                    <th className="py-3 px-3.5">Block Identifier</th>
                    <th className="py-3 px-3.5">Corridor Segment</th>
                    <th className="py-3 px-3.5">Unified Departments</th>
                    <th className="py-3 px-3.5">Speed Restriction (TSR)</th>
                    <th className="py-3 px-3.5 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50/70 transition-colors bg-orange-50/20">
                    <td className="py-3.5 px-3.5 font-mono font-bold text-orange-600">01:30 - 05:00 hrs</td>
                    <td className="py-3.5 px-3.5 font-bold text-slate-900">Unified Mega-Block #LDH-01</td>
                    <td className="py-3.5 px-3.5 text-slate-700">LDH - JUC Up Line (Km 341-346)</td>
                    <td className="py-3.5 px-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 text-[10px] font-bold">Civil</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">TRD</span>
                        <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">S&T</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3.5 font-semibold text-slate-700">30 km/h</td>
                    <td className="py-3.5 px-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <Check className="w-3 h-3" /> Approved
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-3.5 font-mono font-bold text-slate-800">01:00 - 03:30 hrs</td>
                    <td className="py-3.5 px-3.5 font-bold text-slate-900">Ballast Cleaning #UMB-04</td>
                    <td className="py-3.5 px-3.5 text-slate-700">UMB - LDH (Km 248-250)</td>
                    <td className="py-3.5 px-3.5">
                      <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 text-[10px] font-bold">Civil</span>
                    </td>
                    <td className="py-3.5 px-3.5 font-semibold text-slate-700">45 km/h</td>
                    <td className="py-3.5 px-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <Check className="w-3 h-3" /> Approved
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-3.5 font-mono font-bold text-slate-800">03:00 - 05:00 hrs</td>
                    <td className="py-3.5 px-3.5 font-bold text-slate-900">Cantilever Mast Adjustment #JUC-09</td>
                    <td className="py-3.5 px-3.5 text-slate-700">JUC - ASR (Km 380)</td>
                    <td className="py-3.5 px-3.5">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">TRD</span>
                    </td>
                    <td className="py-3.5 px-3.5 font-semibold text-slate-700">Normal</td>
                    <td className="py-3.5 px-3.5 text-right">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        Scheduled
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Passenger Service Pre-clearance Details */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pre-Cleared Passenger Train Headway Buffers</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600 pt-1">
                <div>• <span className="font-semibold text-slate-800">12425 Rajdhani Express:</span> Pre-cleared at 01:15 hrs</div>
                <div>• <span className="font-semibold text-slate-800">BOXN-8692 Freight:</span> Diverted via Down Loop Line</div>
                <div>• <span className="font-semibold text-slate-800">12004 Shatabdi Express:</span> Cleared at 05:15 (+15 min buffer)</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REJECTION REASON MODAL */}
      {rejectingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">Return Block Request</h3>
              </div>
              <button onClick={() => setRejectingItem(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Returning <span className="font-bold text-slate-900">{rejectingItem.id}</span> ({rejectingItem.type}) to <span className="font-semibold">{rejectingItem.dept}</span>. Please specify the operational reason:
            </p>

            <div className="space-y-2 text-xs">
              {[
                'Train path conflict with high-speed passenger service (12425 Rajdhani)',
                'Insufficient headway buffer for freight diversion',
                'Recommended to unify into Sunday night corridor mega-block',
                'Track machine maintenance crew unavailable for requested window'
              ].map((reason) => (
                <label key={reason} className="flex items-start gap-2 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="radio"
                    name="rejectionReason"
                    checked={rejectionReason === reason}
                    onChange={() => setRejectionReason(reason)}
                    className="mt-0.5 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-slate-700 leading-tight">{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setRejectingItem(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRejectConfirm}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-xs transition-colors"
              >
                Confirm Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER MATCHING IMAGE 2 */}
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
