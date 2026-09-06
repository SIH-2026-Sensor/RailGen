import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRailGen } from '../../context/RailGenContext';
import signalHeroImg from '../../assets/signal_railway_hero.jpg';
import { 
  Radio, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Search, 
  Bell, 
  ChevronDown, 
  ChevronRight,
  ArrowRight, 
  Plus, 
  X, 
  CheckCircle2, 
  Check, 
  Cpu, 
  BarChart2, 
  SlidersHorizontal, 
  Wifi, 
  Split, 
  Activity,
  HardHat,
  ShieldCheck,
  Server
} from 'lucide-react';

export function SignalOverview() {
  const { faultsSnt, requests, createRequest } = useRailGen();
  const location = useLocation();
  const navigate = useNavigate();

  // Real-time IST clock matching Image 2 (e.g. 20:40:08 IST)
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istString = now.toLocaleTimeString('en-GB', { 
        timeZone: 'Asia/Kolkata', 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(`${istString} IST`);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Search & Navigation state
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Modals state
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedFault, setSelectedFault] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [pendingBlockCount, setPendingBlockCount] = useState(1);

  // Key System Status Data matching Image 2
  const keySystems = [
    {
      id: 'ei',
      title: 'Interlocking (EI)',
      status: 'Normal',
      statusText: 'Normal',
      location: 'Ambala Station',
      icon: Cpu,
      iconColor: 'bg-blue-50 text-blue-600',
      statusColor: 'text-emerald-600',
      dotColor: 'bg-emerald-500',
      details: 'Dual redundant Microprocessor Electronic Interlocking operational. Vital card A & B in lock-step synchronization.'
    },
    {
      id: 'point',
      title: 'Point Machines',
      status: 'Observation',
      statusText: '1 Under Observation',
      location: 'Yard Area',
      icon: SlidersHorizontal,
      iconColor: 'bg-amber-50 text-amber-600',
      statusColor: 'text-amber-600',
      dotColor: 'bg-amber-500',
      details: 'Point Machine 104A throw time measured at 4.8 seconds (normal: 3.5s). Lubrication and micro-switch recalibration scheduled.'
    },
    {
      id: 'comm',
      title: 'Communication Network',
      status: 'Healthy',
      statusText: 'Healthy',
      location: 'Fibre Network',
      icon: Radio,
      iconColor: 'bg-blue-50 text-blue-600',
      statusColor: 'text-emerald-600',
      dotColor: 'bg-emerald-500',
      details: '24-Core Armoured OFC ring network between Ambala and Ludhiana running at 100% capacity with zero packet loss.'
    }
  ];

  // Recent Faults matching Image 2
  const [recentFaults, setRecentFaults] = useState([
    {
      id: 'FLT-SIG-602',
      location: 'Km 343/00',
      equipment: 'Track Circuit',
      issue: 'Wet Leakage',
      severity: 'High',
      severityColor: 'bg-red-50 text-red-600 border border-red-200',
      detected: 'Today, 06:45',
      details: 'Ballast resistance dropped to 1.8 ohms/km due to water accumulation after rains. Track circuit TC-343 relay drops intermittently under light axle load.'
    },
    {
      id: 'FLT-SIG-601',
      location: 'Ambala Yard',
      equipment: 'Point Machine',
      issue: 'Detection Sluggish',
      severity: 'Medium',
      severityColor: 'bg-amber-50 text-amber-700 border border-amber-200',
      detected: 'Today, 11:20',
      details: 'Point Machine 104A contact pressure low. Point detection contact circuit delay observed during route setting for Loop Line 2.'
    },
    {
      id: 'FLT-SIG-598',
      location: 'JUC Station',
      equipment: 'EI Panel',
      issue: 'Reset Counter Error',
      severity: 'Medium',
      severityColor: 'bg-amber-50 text-amber-700 border border-amber-200',
      detected: 'Yesterday, 18:10',
      details: 'Axle Counter Line Clear verification counter discrepancy flagged on JUC Panel. Standby channel automatically synchronized.'
    }
  ]);

  // Upcoming Block Requests matching Image 2
  const upcomingBlocks = [
    {
      id: 'block-1',
      day: '09',
      month: 'Sep',
      title: 'Signaling Maintenance',
      section: 'Km 334 – 338',
      details: 'Glued insulated rail joint replacement & impedance bond tuning.'
    },
    {
      id: 'block-2',
      day: '12',
      month: 'Sep',
      title: 'Yard Interlocking Work',
      section: 'Ambala Yard',
      details: 'Point machine 104A gear box replacement and detection box rewiring.'
    }
  ];

  // Block Request Form Data
  const [blockForm, setBlockForm] = useState({
    section: 'Ambala Yard Interlocking (Point 104A)',
    equipment: 'Point Machine',
    workType: 'Point Machine 104A Overhaul & Glued Joint Replacement',
    severity: 'Medium',
    duration: '2.5 Hours',
    preferredWindow: '01:30 - 05:00 hrs',
    crew: 'ESM Gang #3 + Signal Inspector',
    description: 'Sluggish detection contacts on Point 104A crossover; routine pre-winter recalibration.'
  });

  const handleBlockSubmit = (e) => {
    e.preventDefault();
    createRequest({
      department: 'Signal & Telecom',
      section: blockForm.section,
      issue: blockForm.workType,
      severity: blockForm.severity,
      duration: blockForm.duration,
      preferredWindow: blockForm.preferredWindow,
      crew: blockForm.crew,
      description: blockForm.description,
      maintenanceType: 'Interlocking & Point Testing'
    });
    setPendingBlockCount(prev => prev + 1);
    setShowBlockModal(false);
    showToast('Signal & Telecom Block Request REQ-SNT-3015 submitted successfully to Operating Division!');
  };

  const filteredFaults = recentFaults.filter(f =>
    f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.equipment.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.issue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B2447] text-white px-5 py-3 rounded-xl shadow-2xl border border-blue-500 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage('')} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* TOP HEADER BAR matching Image 2 */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Universal Search Input */}
        <div className="relative flex-1 max-w-xl">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search station, signal, equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] text-slate-800 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 placeholder-slate-400 transition-all"
          />
        </div>

        {/* Right Header Controls: IST Clock, S&T Badge, Notifications, Profile Switcher */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Real-time IST Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono">{currentTime || '20:40:08 IST'}</span>
          </div>

          {/* S&T Badge matching Image 2 */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-xs font-semibold">
            <Radio className="w-3.5 h-3.5 text-purple-600" />
            <span>Signal & Telecom</span>
          </div>

          {/* Notifications Bell with badge 2 matching Image 2 */}
          <button 
            onClick={() => showToast('2 S&T alerts: Wet Leakage on Track Circuit Km 343/00, Point 104A sluggish.')}
            className="relative p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:text-[#0B2447] hover:bg-slate-50 transition-colors shadow-2xs"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* User Profile Chip matching Image 2 */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white shadow-2xs">
            <div className="w-7 h-7 rounded-full bg-[#0B2447] text-white flex items-center justify-center text-xs font-bold shrink-0">
              PR
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight">Dr. Priya Raghavan</p>
              <p className="text-[10px] text-slate-500">DSTE • Ambala Division</p>
            </div>
          </div>
        </div>
      </div>

      {/* HERO BANNER matching Image 2 */}
      <div className="relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[170px] items-center">
          {/* Left Content Area */}
          <div className="md:col-span-7 p-6 sm:p-8 z-10">
            <span className="text-xs font-semibold text-slate-500 tracking-wide block mb-1">
              Signal & Telecom Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2447] tracking-tight">
              Ensuring Safe & Reliable Signals
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-xl leading-relaxed">
              Monitor signaling systems, interlocking, and communication networks for uninterrupted railway operations.
            </p>
          </div>

          {/* Right Signal Post Visual with Fade & Quote Overlay */}
          <div className="md:col-span-5 relative h-48 md:h-full w-full overflow-hidden">
            <img 
              src={signalHeroImg} 
              alt="Indian Railways Color Light Signal Post at Sunset" 
              className="w-full h-full object-cover object-center"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 30%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 30%, black 100%)'
              }}
            />

            {/* Overlay Slogan & Tricolor Bar matching Image 2 */}
            <div className="absolute right-6 bottom-5 text-right z-10">
              <p className="text-xs sm:text-sm font-bold text-white drop-shadow-md leading-tight">
                “Clear Signals
              </p>
              <p className="text-xs sm:text-sm font-bold text-white drop-shadow-md leading-tight">
                Safer Journeys”
              </p>
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border border-white/30 ml-auto mt-1.5 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 PASTEL METRIC / KPI CARDS matching Image 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Faults */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">2</p>
              <p className="text-xs text-slate-500 font-medium">Active Faults</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => setSelectedFault(recentFaults[0])}
              className="text-slate-500 hover:text-red-600 font-medium flex items-center gap-1 transition-colors"
            >
              <span>Need attention</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Systems Online */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">5</p>
              <p className="text-xs text-slate-500 font-medium">Systems Online</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => showToast('All 5 core systems: EI, Point Machines, DAC, Block Instruments, and OFC online.')}
              className="text-emerald-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>All operational</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Pending Block Request */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{pendingBlockCount}</p>
              <p className="text-xs text-slate-500 font-medium">Pending Block Request</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => setShowBlockModal(true)}
              className="text-blue-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Awaiting approval</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 4: System Availability */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">99.8%</p>
              <p className="text-xs text-slate-500 font-medium">System Availability</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => showToast('Monthly Signaling MTBF (Mean Time Between Failures) exceeds RDSO targets.')}
              className="text-purple-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>This month</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2-COLUMN OPERATIONAL LAYOUT matching Image 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (65% width) — Key System Status & Recent Faults Table */}
        <div className="lg:col-span-8 space-y-6">
          {/* Key System Status matching Image 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5">
              <Radio className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">Key System Status</h2>
            </div>

            {/* 3 Status Cards in a row matching Image 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {keySystems.map((sys) => {
                const Icon = sys.icon;
                return (
                  <div 
                    key={sys.id}
                    onClick={() => setSelectedSystem(sys)}
                    className="p-4 rounded-xl border border-slate-100 bg-[#FAFBFD] hover:bg-slate-100/80 transition-all cursor-pointer group flex items-start gap-3.5"
                  >
                    <div className={`w-9 h-9 rounded-xl ${sys.iconColor} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{sys.title}</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${sys.dotColor}`}></span>
                        <span className={`text-[11px] font-semibold ${sys.statusColor} truncate`}>{sys.statusText}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">{sys.location}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Faults Table matching Image 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="text-base font-bold text-slate-900">Recent Faults</h3>
              </div>
              <button 
                onClick={() => showToast('Displaying full S&T Fault register.')}
                className="text-xs font-semibold text-[#EA580C] hover:text-orange-700 flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Table matching Image 2 */}
            <div className="overflow-x-auto table-responsive">
              <table className="w-full min-w-[650px] text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-medium">
                    <th className="py-3 px-2 font-medium">ID</th>
                    <th className="py-3 px-2 font-medium">Location</th>
                    <th className="py-3 px-2 font-medium">Equipment</th>
                    <th className="py-3 px-2 font-medium">Issue</th>
                    <th className="py-3 px-2 font-medium">Severity</th>
                    <th className="py-3 px-2 font-medium">Detected</th>
                    <th className="py-3 px-2 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredFaults.map((fault) => (
                    <tr 
                      key={fault.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="py-3 px-2 font-bold text-slate-900">
                        {fault.id}
                      </td>
                      <td className="py-3 px-2 text-slate-600">
                        {fault.location}
                      </td>
                      <td className="py-3 px-2 text-slate-700">
                        {fault.equipment}
                      </td>
                      <td className="py-3 px-2 text-slate-800 font-medium">
                        {fault.issue}
                      </td>
                      <td className="py-3 px-2">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md ${fault.severityColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${fault.severity === 'High' ? 'bg-red-500' : 'bg-amber-500'}`}></span>
                          <span>{fault.severity}</span>
                        </span>
                      </td>
                      <td className="py-3 px-2 text-slate-400 text-[11px]">
                        {fault.detected}
                      </td>
                      <td className="py-3 px-2 text-right">
                        <button
                          onClick={() => setSelectedFault(fault)}
                          className="px-3 py-1 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors"
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
        </div>

        {/* RIGHT COLUMN (35% width) — Action Card & Upcoming Block Requests */}
        <div className="lg:col-span-4 space-y-6">
          {/* TOP ACTION CARD: Request S&T Block Window matching Image 2 */}
          <div 
            onClick={() => setShowBlockModal(true)}
            className="bg-gradient-to-r from-[#1D4ED8] to-[#2563EB] text-white p-5 rounded-2xl shadow-sm cursor-pointer hover:shadow-lg transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform shrink-0">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                  Request S&T Block Window
                </h3>
                <p className="text-[11px] text-blue-100 mt-0.5 leading-tight">
                  Submit request for signaling / telecom block.
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-white/80 group-hover:translate-x-1 transition-transform shrink-0" />
          </div>

          {/* BOTTOM WIDGET: Upcoming Block Requests matching Image 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Upcoming Block Requests</h3>
              </div>
              <button 
                onClick={() => showToast('Displaying full S&T maintenance schedule.')}
                className="text-xs font-semibold text-[#EA580C] hover:text-orange-700 flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of upcoming items with calendar square date */}
            <div className="divide-y divide-slate-100">
              {upcomingBlocks.map((block) => (
                <div 
                  key={block.id}
                  onClick={() => showToast(`${block.title}: ${block.details}`)}
                  className="py-3 first:pt-1 last:pb-1 flex items-center justify-between gap-3 cursor-pointer group hover:bg-slate-50/80 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {/* Calendar date box matching Image 2 */}
                    <div className="w-11 h-12 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-slate-800 leading-none">{block.day}</span>
                      <span className="text-[9px] text-slate-500 uppercase font-semibold mt-0.5">{block.month}</span>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors leading-tight">
                        {block.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {block.section}
                      </p>
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER matching Image 2 */}
      <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>© 2025 RailGen. Built for Indian Railways.</p>
        <div className="flex items-center gap-2">
          <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border border-slate-300"></div>
          <span className="font-medium text-slate-600">A More Connected India</span>
        </div>
      </div>

      {/* MODAL 1: REQUEST S&T BLOCK WINDOW */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Request S&T Block Window</h3>
                  <p className="text-[11px] text-slate-500">Signal & Telecom Division • Interlocking & Circuit Testing</p>
                </div>
              </div>
              <button 
                onClick={() => setShowBlockModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBlockSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Station / Yard / Track Section</label>
                <input
                  type="text"
                  value={blockForm.section}
                  onChange={(e) => setBlockForm({ ...blockForm, section: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subsystem Category</label>
                  <select
                    value={blockForm.equipment}
                    onChange={(e) => setBlockForm({ ...blockForm, equipment: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none bg-white"
                  >
                    <option value="Point Machine">Point Machine</option>
                    <option value="Track Circuit">Track Circuit</option>
                    <option value="Electronic Interlocking (EI)">Electronic Interlocking (EI)</option>
                    <option value="Digital Axle Counter (DAC)">Digital Axle Counter (DAC)</option>
                    <option value="OFC Cable Network">OFC Cable Network</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Severity / Priority</label>
                  <select
                    value={blockForm.severity}
                    onChange={(e) => setBlockForm({ ...blockForm, severity: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none bg-white"
                  >
                    <option value="Critical">Critical (Next Available Window)</option>
                    <option value="Medium">Medium (Nocturnal Maintenance)</option>
                    <option value="Low">Low (Preventive Inspection)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    value={blockForm.duration}
                    onChange={(e) => setBlockForm({ ...blockForm, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    placeholder="e.g. 2.5 Hours"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Time Window</label>
                  <input
                    type="text"
                    value={blockForm.preferredWindow}
                    onChange={(e) => setBlockForm({ ...blockForm, preferredWindow: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                    placeholder="e.g. 01:30 - 05:00 hrs"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Depot Equipment & Crew</label>
                <input
                  type="text"
                  value={blockForm.crew}
                  onChange={(e) => setBlockForm({ ...blockForm, crew: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                  placeholder="e.g. ESM Gang #3 + Signal Inspector"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Operational Description</label>
                <textarea
                  rows={2}
                  value={blockForm.description}
                  onChange={(e) => setBlockForm({ ...blockForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none"
                  placeholder="Explain signaling overhaul details..."
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowBlockModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-bold shadow-sm transition-colors flex items-center gap-2"
                >
                  <span>Submit Block Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: FAULT DETAILS INSPECTOR */}
      {selectedFault && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedFault.issue}</h3>
                  <p className="text-[11px] text-slate-500">{selectedFault.equipment} • {selectedFault.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFault(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                {selectedFault.details}
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Location</span>
                  <span className="text-slate-800 font-bold">{selectedFault.location}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Severity</span>
                  <span className={`font-semibold ${selectedFault.severity === 'High' ? 'text-red-600' : 'text-amber-600'}`}>
                    {selectedFault.severity}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Detected</span>
                  <span className="text-slate-700 font-mono">{selectedFault.detected}</span>
                </div>
                <div className="mt-1">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Status</span>
                  <span className="text-blue-600 font-semibold">Telemetry Flagged</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedFault(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedFault(null);
                    setShowBlockModal(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-blue-700 text-white font-bold transition-colors"
                >
                  Request S&T Block
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: KEY SYSTEM TELEMETRY INSPECTOR */}
      {selectedSystem && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg ${selectedSystem.iconColor} flex items-center justify-center`}>
                  <selectedSystem.icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedSystem.title}</h3>
                  <p className="text-[11px] text-slate-500">{selectedSystem.location}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSystem(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed">
                {selectedSystem.details}
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500">Current Health:</span>
                <span className={`font-semibold inline-flex items-center gap-1.5 ${selectedSystem.statusColor}`}>
                  <span className={`w-2 h-2 rounded-full ${selectedSystem.dotColor}`}></span>
                  {selectedSystem.statusText}
                </span>
              </div>

              <div className="pt-2 flex items-center justify-end">
                <button
                  onClick={() => setSelectedSystem(null)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-medium"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
