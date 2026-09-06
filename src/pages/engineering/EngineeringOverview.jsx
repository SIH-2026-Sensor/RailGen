import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRailGen } from '../../context/RailGenContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { DepartmentBadge } from '../../components/common/DepartmentBadge';
import engineeringSunsetTracks from '../../assets/engineering_sunset_tracks.jpg';
import { 
  AlertTriangle, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  Search, 
  ChevronDown, 
  Bell, 
  ChevronRight, 
  Plus, 
  Calendar, 
  ArrowRight, 
  Filter, 
  Check, 
  X, 
  Train, 
  ExternalLink, 
  FileText, 
  BarChart2, 
  HardHat, 
  Download, 
  Layers, 
  ShieldAlert,
  AlertCircle,
  SlidersHorizontal,
  TrendingUp,
  Activity,
  LogOut
} from 'lucide-react';

export function EngineeringOverview() {
  const location = useLocation();
  const navigate = useNavigate();
  const { requests, createRequest } = useRailGen();

  // Route sub-view detection
  const currentPath = location.pathname;
  const isInspectionView = currentPath === '/engineering/inspection' || currentPath === '/engineering/defects';
  const isRequestsView = currentPath === '/engineering/requests';
  const isMaintenanceView = currentPath === '/engineering/maintenance' || currentPath === '/engineering/assets';
  const isReportsView = currentPath === '/engineering/reports' || currentPath === '/engineering/schedules';
  const isOverview = !isInspectionView && !isRequestsView && !isMaintenanceView && !isReportsView;

  // Search and dropdown state
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  // Live ticking IST clock
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB') + ' IST');
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Modals & toast state
  const [showCreateBlockModal, setShowCreateBlockModal] = useState(false);
  const [selectedDefectModal, setSelectedDefectModal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filters for sub-views
  const [defectSeverityFilter, setDefectSeverityFilter] = useState('All');
  const [defectStatusFilter, setDefectStatusFilter] = useState('All');

  // KPI Counters state
  const [pendingBlockCount, setPendingBlockCount] = useState(3);
  const [ongoingMaintCount, setOngoingMaintCount] = useState(6);

  // Defects Directory state matching Image 2
  const [defectsList, setDefectsList] = useState([
    {
      id: 'DEF-104',
      location: '334/12',
      section: 'LDH - JUC Up Line',
      issue: 'Track Crack',
      severity: 'High',
      status: 'Open',
      speedLimit: '30 km/h TSR',
      detected: 'Today, 06:15',
      description: 'Ultrasonic inspection detected transverse hairline flaw at welded rail joint Km 334/12. Recommended tamping and weld crop.',
      machineRequired: 'Duomatic Tamping Machine (BCM-08)'
    },
    {
      id: 'DEF-099',
      location: '352/08',
      section: 'LDH Yard - Outer',
      issue: 'Loose Fastening',
      severity: 'Medium',
      status: 'Open',
      speedLimit: '45 km/h Caution',
      detected: 'Today, 04:30',
      description: 'Elastic rail clips loose and missing across 14 consecutive sleepers. Gang inspection scheduled.',
      machineRequired: 'Trackmen Gang Unit #06'
    },
    {
      id: 'DEF-087',
      location: '360/14',
      section: 'UMB - LDH Up Line',
      issue: 'Ballast Deficiency',
      severity: 'Low',
      status: 'In Progress',
      speedLimit: 'Normal Speed',
      detected: 'Yesterday, 16:10',
      description: 'Cushion thickness below 250mm at switch expansion joint. Ballast hopper train deployed.',
      machineRequired: 'Shoulder Ballast Cleaner (SBC-14)'
    },
    {
      id: 'DEF-076',
      location: '368/02',
      section: 'JUC - ASR Section',
      issue: 'Rail Joint Gap',
      severity: 'Medium',
      status: 'Open',
      speedLimit: '50 km/h TSR',
      detected: 'Yesterday, 11:20',
      description: 'Thermal expansion gap variation exceeding 8mm. Destressing block required before summer temperatures peak.',
      machineRequired: 'Hydraulic Rail Tensor & Gas Cutting Unit'
    }
  ]);

  // Tasks matching Image 2
  const tasksList = [
    { id: 'T-01', day: '09', month: 'Sep', title: 'Track Inspection', section: 'Km 334 – 338', inspector: 'Suresh Chandra' },
    { id: 'T-02', day: '10', month: 'Sep', title: 'Maintenance Work', section: 'Km 341 – 346', inspector: 'BCM Gang #04' },
    { id: 'T-03', day: '12', month: 'Sep', title: 'Joint Weld Check', section: 'Km 356 – 360', inspector: 'USFD Team #02' }
  ];

  // Block Requests submitted to Operating Manager
  const [civilBlockRequests, setCivilBlockRequests] = useState([
    {
      id: 'REQ-ENG-1042',
      section: 'LDH - JUC (Km 342/10 - 344/18)',
      issue: 'Ultrasonic Rail Flaw & Track Weld Rectification',
      severity: 'Critical',
      duration: '3.5 Hours',
      window: '01:30 - 05:00 hrs',
      crew: 'BCM Machine #42 + 22 Trackmen',
      status: 'AI Analyzed',
      coordination: 'Unified with Traction OHE Block'
    },
    {
      id: 'REQ-ENG-1049',
      section: 'UMB - LDH (Km 248/06 - 250/12)',
      issue: 'Ballast Shoulder Cleaning & Packing',
      severity: 'Medium',
      duration: '2.5 Hours',
      window: '01:00 - 03:30 hrs',
      crew: 'BCM-14 Machine Team',
      status: 'Approved by Sr. DOM',
      coordination: 'Down Loop Line diverted'
    },
    {
      id: 'REQ-ENG-1055',
      section: 'LDH Yard - Outer (Km 334/12)',
      issue: 'Rail Crack Cropping & Weld Joint Replacement',
      severity: 'High',
      duration: '3.0 Hours',
      window: '02:00 - 05:00 hrs',
      crew: 'Gang #06 + Welding Rig',
      status: 'Submitted to Operating',
      coordination: 'Pending DOM Review'
    }
  ]);

  // Create Block Request Form state
  const [blockForm, setBlockForm] = useState({
    section: 'LDH - JUC Up Line (Km 334/12)',
    issue: 'Track Crack Rectification & Tamping',
    severity: 'High',
    duration: '3.0 Hours',
    window: '01:30 - 05:00 hrs',
    crew: 'Duomatic Tamping Machine + 18 Trackmen',
    notes: 'Urgent rail flaw detected by ultrasonic flaw detector (USFD). 30 km/h TSR active.'
  });


  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  // Submit Block Request
  const handleBlockFormSubmit = (e) => {
    e.preventDefault();
    const newId = `REQ-ENG-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq = {
      id: newId,
      section: blockForm.section,
      issue: blockForm.issue,
      severity: blockForm.severity,
      duration: blockForm.duration,
      window: blockForm.window,
      crew: blockForm.crew,
      status: 'Submitted to Operating',
      coordination: 'Sent to Sr. DOM for AI schedule unification'
    };

    setCivilBlockRequests(prev => [newReq, ...prev]);
    setPendingBlockCount(prev => prev + 1);
    createRequest({
      id: newId,
      department: 'Engineering',
      section: blockForm.section,
      issue: blockForm.issue,
      severity: blockForm.severity,
      duration: blockForm.duration,
      status: 'Awaiting Review'
    });

    setShowCreateBlockModal(false);
    showToast(`Block Request ${newId} submitted to Operating Control Center (Sr. DOM).`);
  };

  // Pre-fill block form from defect view
  const handleRequestBlockForDefect = (defect) => {
    setBlockForm({
      section: `${defect.section} (Km ${defect.location})`,
      issue: `${defect.issue} Rectification`,
      severity: defect.severity === 'High' ? 'Critical' : defect.severity,
      duration: '3.0 Hours',
      window: '01:30 - 05:00 hrs',
      crew: `${defect.machineRequired} + Section Gang`,
      notes: `Rectification for ${defect.id}: ${defect.description}`
    });
    setSelectedDefectModal(null);
    setShowCreateBlockModal(true);
  };

  // Filtered defects for inspection tab
  const filteredDefects = useMemo(() => {
    return defectsList.filter(d => {
      const matchesSearch = 
        d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.section.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSeverity = defectSeverityFilter === 'All' || d.severity.toLowerCase() === defectSeverityFilter.toLowerCase();
      const matchesStatus = defectStatusFilter === 'All' || d.status.toLowerCase() === defectStatusFilter.toLowerCase();

      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [defectsList, searchQuery, defectSeverityFilter, defectStatusFilter]);

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

      {/* TOP HEADER MATCHING IMAGE 2 EXACTLY */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 pb-2">
        {/* Universal Search Bar */}
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search track, block, location..."
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

        {/* Right Controls: Real-time IST Clock, Switch Dashboard, Bell, User Chip */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Live IST Clock */}
          <div className="hidden sm:flex items-center gap-2 bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-xs text-slate-700 shadow-2xs font-mono font-semibold">
            <Clock className="w-3.5 h-3.5 text-orange-600" />
            <span>{currentTime || '18:29:20 IST'}</span>
          </div>


          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 relative shadow-2xs transition-colors"
              title="Track Flaw Alerts"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-3 text-xs animate-in fade-in">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                  <span className="font-bold text-slate-900">Track Flaw & Safety Alerts</span>
                  <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-semibold">3 Active</span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  <div className="p-2 bg-red-50/60 rounded-lg border border-red-100">
                    <p className="font-semibold text-slate-900 text-xs">USFD Rail Flaw Detected</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Km 334/12 Up Line: Transverse fissure at weld. 30 km/h TSR active.</p>
                  </div>
                  <div className="p-2 bg-amber-50/60 rounded-lg border border-amber-100">
                    <p className="font-semibold text-slate-900 text-xs">Loose Fastening Alert</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Km 352/08 Outer Yard: Elastic rail clips loose across 14 sleepers.</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="font-semibold text-slate-900 text-xs">Block Schedule Aligned</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Civil request REQ-ENG-1042 synchronized with Traction OHE for 01:30 hrs.</p>
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
                SC
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-slate-800 leading-tight">Suresh Chandra P-Way</p>
                <p className="text-[10px] text-slate-400">Engineering (Civil)</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 text-xs divide-y divide-slate-100 animate-in fade-in">
                <div className="px-3 py-2">
                  <p className="font-bold text-slate-900">Suresh Chandra</p>
                  <p className="text-[11px] text-slate-500">Sr. DEN (Civil) • Ludhiana Division</p>
                </div>
                <div className="py-1">
                  <button 
                    onClick={() => { setShowProfileDropdown(false); navigate('/engineering/inspection'); }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <Search className="w-3.5 h-3.5 text-slate-400" /> Track Inspection
                  </button>
                  <button 
                    onClick={() => { setShowProfileDropdown(false); navigate('/engineering/requests'); }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-400" /> Block Requests
                  </button>
                  <button 
                    onClick={() => { setShowProfileDropdown(false); navigate('/engineering/maintenance'); }}
                    className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                  >
                    <Wrench className="w-3.5 h-3.5 text-slate-400" /> Maintenance Schedule
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
          <p className="text-xs font-medium text-slate-500 mb-0.5">Good Evening,</p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2447] tracking-tight">
            Suresh Chandra
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1">
            Engineering (Civil) | Ludhiana Division
          </p>
        </div>

        {/* Right side Sunset Railway Tracks Image with smooth fade gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden hidden md:block">
          <img 
            src={engineeringSunsetTracks} 
            alt="Scenic Railway Tracks at Sunset" 
            className="w-full h-full object-cover object-center transform scale-105" 
          />
          {/* Seamless gradient fade from white into photo */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/30 to-transparent"></div>

          {/* Slogan & Tricolor Bar matching Image 2 */}
          <div className="absolute bottom-3.5 right-5 text-right z-10">
            <p className="text-xs font-bold text-white drop-shadow-md leading-tight">Maintain Today</p>
            <p className="text-[11px] font-semibold text-slate-200 drop-shadow-md">for a Safer Tomorrow</p>
            <div className="w-12 h-1 ml-auto rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border border-white/30 mt-1 shadow-sm"></div>
          </div>
        </div>
      </div>

      {/* 4 KPI STAT CARDS MATCHING IMAGE 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Open Defects (Red Icon) */}
        <div 
          onClick={() => navigate('/engineering/inspection')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm hover:border-red-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{defectsList.length}</p>
              <p className="text-xs font-semibold text-slate-600">Open Defects</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-red-600 group-hover:translate-x-0.5 transition-transform flex items-center">
            View →
          </span>
        </div>

        {/* Card 2: Ongoing Maintenance (Blue Icon) */}
        <div 
          onClick={() => navigate('/engineering/maintenance')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm hover:border-blue-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{ongoingMaintCount}</p>
              <p className="text-xs font-semibold text-slate-600">Ongoing Maintenance</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform flex items-center">
            View →
          </span>
        </div>

        {/* Card 3: Pending Block Requests (Amber Icon) */}
        <div 
          onClick={() => navigate('/engineering/requests')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm hover:border-amber-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{pendingBlockCount}</p>
              <p className="text-xs font-semibold text-slate-600">Pending Block Requests</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-amber-600 group-hover:translate-x-0.5 transition-transform flex items-center">
            View →
          </span>
        </div>

        {/* Card 4: Track Health (Green Icon) */}
        <div 
          onClick={() => navigate('/engineering/reports')}
          className="bg-white border border-slate-200/80 rounded-2xl p-5 flex items-center justify-between shadow-2xs hover:shadow-sm hover:border-emerald-200 transition-all cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-900 tracking-tight">92%</p>
              <p className="text-xs font-semibold text-slate-600">Track Health</p>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-600 group-hover:translate-x-0.5 transition-transform flex items-center">
            View →
          </span>
        </div>
      </div>

      {/* SECTION TABS */}
      <div className="flex border-b border-slate-200 text-xs font-bold gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap pb-px">
        {[
          { name: 'Dashboard', path: '/engineering', active: isOverview },
          { name: `Track Inspection (${defectsList.length})`, path: '/engineering/inspection', active: isInspectionView },
          { name: `Block Requests (${pendingBlockCount})`, path: '/engineering/requests', active: isRequestsView },
          { name: 'Maintenance', path: '/engineering/maintenance', active: isMaintenanceView },
          { name: 'Reports', path: '/engineering/reports', active: isReportsView }
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

      {/* SECTION 1: MAIN DASHBOARD OVERVIEW (IMAGE 2 2-COLUMN LAYOUT) */}
      {isOverview && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-fade-in">
          {/* LEFT COLUMN: RECENT TRACK DEFECTS TABLE (65% width) */}
          <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                <h2 className="text-base font-bold text-slate-900">Recent Track Defects</h2>
              </div>
              <button
                onClick={() => navigate('/engineering/inspection')}
                className="text-xs font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 group"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl table-responsive">
              <table className="w-full min-w-[650px] text-left text-xs border-collapse">
                <thead className="bg-[#F8FAFC] text-slate-500 border-b border-slate-100 font-semibold">
                  <tr>
                    <th className="py-3 px-3.5">ID</th>
                    <th className="py-3 px-3.5">Location (Km)</th>
                    <th className="py-3 px-3.5">Issue</th>
                    <th className="py-3 px-3.5">Severity</th>
                    <th className="py-3 px-3.5">Status</th>
                    <th className="py-3 px-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {defectsList.slice(0, 4).map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-3.5 font-mono font-bold text-slate-900">{d.id}</td>
                      <td className="py-3.5 px-3.5 text-slate-600">{d.location}</td>
                      <td className="py-3.5 px-3.5 font-semibold text-slate-800">{d.issue}</td>
                      <td className="py-3.5 px-3.5">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                          d.severity === 'High' || d.severity === 'Critical'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : d.severity === 'Medium'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            d.severity === 'High' || d.severity === 'Critical' ? 'bg-red-500' : d.severity === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}></span>
                          {d.severity}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5">
                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                          d.status === 'Open'
                            ? 'bg-red-50 text-red-600 border border-red-100'
                            : 'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 text-right">
                        <button
                          onClick={() => setSelectedDefectModal(d)}
                          className="bg-white border border-slate-200 text-slate-700 hover:text-orange-600 hover:border-orange-300 text-[11px] font-bold px-3 py-1 rounded-lg transition-colors shadow-2xs"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT COLUMN: MY TASKS & CREATE BLOCK REQUEST CTA (35% width) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Widget 1: My Tasks */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  <h3 className="text-sm font-bold text-slate-900">My Tasks</h3>
                </div>
                <button
                  onClick={() => navigate('/engineering/inspection')}
                  className="text-xs font-semibold text-orange-600 hover:text-orange-700"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-2.5">
                {tasksList.map((t) => (
                  <div 
                    key={t.id}
                    onClick={() => showToast(`Task details: ${t.title} at ${t.section} scheduled with ${t.inspector}.`)}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      {/* Square Date Badge matching Image 2 */}
                      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shrink-0 group-hover:bg-orange-100 group-hover:border-orange-300 transition-colors">
                        <span className="text-sm font-extrabold text-slate-900 leading-none">{t.day}</span>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase mt-0.5 leading-none">{t.month}</span>
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-900 leading-tight">{t.title}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{t.section}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))}
              </div>
            </div>

            {/* Widget 2: Create Block Request Button matching Image 2 */}
            <button
              onClick={() => setShowCreateBlockModal(true)}
              className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm py-3.5 px-4 rounded-xl shadow-sm transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Create Block Request</span>
              </div>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      )}

      {/* SECTION 2: TRACK INSPECTION SUB-VIEW (/engineering/inspection) */}
      {isInspectionView && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <Filter className="w-3.5 h-3.5 text-slate-400" />
                <span>Severity:</span>
                <select
                  value={defectSeverityFilter}
                  onChange={(e) => setDefectSeverityFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value="All">All Severities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <span>Status:</span>
                <select
                  value={defectStatusFilter}
                  onChange={(e) => setDefectStatusFilter(e.target.value)}
                  className="bg-slate-50 border border-slate-200 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none focus:border-orange-500 font-medium"
                >
                  <option value="All">All Statuses</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setShowCreateBlockModal(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Block Demand</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-slate-800">Track Defect & USFD Inspection Ledger</span>
              <span>Showing {filteredDefects.length} records</span>
            </div>

            <div className="overflow-x-auto border border-slate-100 rounded-xl table-responsive">
              <table className="w-full min-w-[700px] text-left text-xs border-collapse">
                <thead className="bg-[#F8FAFC] text-slate-600 border-b border-slate-100 font-semibold">
                  <tr>
                    <th className="py-3 px-3.5">Defect ID</th>
                    <th className="py-3 px-3.5">Location & Km</th>
                    <th className="py-3 px-3.5">Section</th>
                    <th className="py-3 px-3.5">Issue Type</th>
                    <th className="py-3 px-3.5">Severity</th>
                    <th className="py-3 px-3.5">Speed Restriction</th>
                    <th className="py-3 px-3.5">Status</th>
                    <th className="py-3 px-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDefects.map((d) => (
                    <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-3.5 font-mono font-bold text-slate-900">{d.id}</td>
                      <td className="py-3.5 px-3.5 font-semibold text-slate-800">{d.location}</td>
                      <td className="py-3.5 px-3.5 text-slate-600">{d.section}</td>
                      <td className="py-3.5 px-3.5 text-slate-800 font-medium">{d.issue}</td>
                      <td className="py-3.5 px-3.5">
                        <StatusBadge status={d.severity} size="xs" />
                      </td>
                      <td className="py-3.5 px-3.5 font-mono font-bold text-red-600">{d.speedLimit}</td>
                      <td className="py-3.5 px-3.5">
                        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-red-50 text-red-600 border border-red-100">
                          {d.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3.5 text-right space-x-1.5">
                        <button
                          onClick={() => setSelectedDefectModal(d)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md font-semibold text-[11px]"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => handleRequestBlockForDefect(d)}
                          className="px-2.5 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-md font-bold text-[11px]"
                        >
                          Request Block
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: BLOCK REQUESTS SUB-VIEW (/engineering/requests) */}
      {isRequestsView && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">Submitted Civil Maintenance Block Requests</h2>
              <p className="text-xs text-slate-500 mt-0.5">Demands submitted to Operating Control Center (Sr. DOM) for corridor timetable slotting.</p>
            </div>
            <button
              onClick={() => setShowCreateBlockModal(true)}
              className="bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>New Block Request</span>
            </button>
          </div>

          <div className="space-y-3">
            {civilBlockRequests.map((req) => (
              <div key={req.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#0B2447]">{req.id}</span>
                      <StatusBadge status={req.severity} size="xs" />
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                        req.status.includes('Approved') ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 mt-1">{req.issue}</h3>
                    <p className="text-xs text-slate-500">{req.section} • Duration: {req.duration}</p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] uppercase font-semibold text-slate-400 block">Requested Window</span>
                    <span className="font-mono font-bold text-xs text-orange-600">{req.window}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                  <span><strong className="text-slate-800">Machinery:</strong> {req.crew}</span>
                  <span className="text-slate-500 italic">{req.coordination}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: MAINTENANCE SCHEDULE SUB-VIEW (/engineering/maintenance) */}
      {isMaintenanceView && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">Track Machinery & Tamping Units</h2>
              <p className="text-xs text-slate-500 mt-0.5">Heavy railway engineering machinery deployed in Ludhiana Division.</p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              6 Units Operating
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { id: 'M-01', name: 'Duomatic Tamping Machine #08', section: 'LDH - JUC Up Line (Km 342 - 344)', status: 'Active', kmDone: '2.4 / 3.2 Km', speed: '30 km/h TSR', supervisor: 'Suresh Chandra (Sr. DEN)' },
              { id: 'M-02', name: 'Ballast Cleaning Machine (BCM-14)', section: 'UMB - LDH (Km 248 - 250)', status: 'Scheduled for 01:00', kmDone: '0 / 1.8 Km', speed: 'Loop clearance active', supervisor: 'Manoj Bajpayee (SSE)' },
              { id: 'M-03', name: 'Dynamic Track Stabilizer (DGS-03)', section: 'LDH Outer Yard', status: 'Standby', kmDone: 'Ready', speed: 'Full Track Fit', supervisor: 'Gang #06' },
              { id: 'M-04', name: 'Rail Grinding Train (RGT-01)', section: 'JUC - ASR High-Speed Span', status: 'Planned', kmDone: 'Scheduled Sunday', speed: 'Normal', supervisor: 'Chief Track Engineer' }
            ].map((mach) => (
              <div key={mach.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{mach.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{mach.section}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {mach.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Track Covered</span>
                    <span className="font-bold text-slate-900">{mach.kmDone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Speed Restriction</span>
                    <span className="font-semibold text-orange-600">{mach.speed}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500">
                  <span>Supervisor in Charge: {mach.supervisor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 5: REPORTS SUB-VIEW (/engineering/reports) */}
      {isReportsView && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs">
            <div>
              <h2 className="text-base font-bold text-slate-900">Track Quality & USFD Flaw Detection Reports</h2>
              <p className="text-xs text-slate-500 mt-0.5">Ultrasonic safety ledger, Track Quality Index (TQI), and weld compliance.</p>
            </div>
            <button
              onClick={() => showToast("Exporting Track Quality Index (TQI) report to CSV...")}
              className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-3.5 py-2 rounded-lg border border-slate-300 transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export TQI Report (CSV)</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs font-semibold text-slate-500">Track Quality Index (TQI)</span>
              <p className="text-3xl font-extrabold text-[#0B2447]">88.2</p>
              <p className="text-xs text-emerald-600 font-semibold">Category: Good (Below 95 is safe)</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs font-semibold text-slate-500">USFD Rail Flaw Detection</span>
              <p className="text-3xl font-extrabold text-orange-600">4 Alerts</p>
              <p className="text-xs text-slate-500">Transverse flaws pre-isolated</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
              <span className="text-xs font-semibold text-slate-500">Overall Track Health</span>
              <p className="text-3xl font-extrabold text-emerald-600">92%</p>
              <p className="text-xs text-slate-500">Ludhiana Sub-Division Standard</p>
            </div>
          </div>
        </div>
      )}

      {/* DEFECT DETAILS MODAL */}
      {selectedDefectModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold text-slate-900">{selectedDefectModal.id} — {selectedDefectModal.issue}</h3>
              </div>
              <button onClick={() => setSelectedDefectModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Location</span>
                  <span className="font-bold text-slate-900">Km {selectedDefectModal.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Corridor</span>
                  <span className="font-semibold text-slate-800">{selectedDefectModal.section}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">TSR Enforced</span>
                  <span className="font-bold text-red-600">{selectedDefectModal.speedLimit}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Detected</span>
                  <span className="font-mono text-slate-600">{selectedDefectModal.detected}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Technical Flaw Description:</span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {selectedDefectModal.description}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1">Recommended Equipment:</span>
                <p className="text-slate-700 font-semibold">{selectedDefectModal.machineRequired}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100 text-xs">
              <button
                type="button"
                onClick={() => setSelectedDefectModal(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleRequestBlockForDefect(selectedDefectModal)}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Block Request for this Defect</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE BLOCK REQUEST MODAL */}
      {showCreateBlockModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <HardHat className="w-5 h-5 text-orange-600" />
                <h3 className="text-base font-bold text-slate-900">Create Track Block Request</h3>
              </div>
              <button onClick={() => setShowCreateBlockModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBlockFormSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Corridor & Km Location *</label>
                <input
                  type="text"
                  required
                  value={blockForm.section}
                  onChange={(e) => setBlockForm({ ...blockForm, section: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Issue / Maintenance Type *</label>
                <input
                  type="text"
                  required
                  value={blockForm.issue}
                  onChange={(e) => setBlockForm({ ...blockForm, issue: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Severity</label>
                  <select
                    value={blockForm.severity}
                    onChange={(e) => setBlockForm({ ...blockForm, severity: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500 font-medium"
                  >
                    <option value="Critical">Critical (Immediate Block)</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration Required</label>
                  <input
                    type="text"
                    required
                    value={blockForm.duration}
                    onChange={(e) => setBlockForm({ ...blockForm, duration: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Time Window</label>
                  <input
                    type="text"
                    required
                    value={blockForm.window}
                    onChange={(e) => setBlockForm({ ...blockForm, window: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Machinery & Crew</label>
                  <input
                    type="text"
                    required
                    value={blockForm.crew}
                    onChange={(e) => setBlockForm({ ...blockForm, crew: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Technical Notes</label>
                <textarea
                  rows="2"
                  value={blockForm.notes}
                  onChange={(e) => setBlockForm({ ...blockForm, notes: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-900 focus:bg-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateBlockModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold shadow-xs transition-colors"
                >
                  Submit Block Request
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
          <span>A Stronger, Connected India</span>
        </div>
      </footer>
    </div>
  );
}
