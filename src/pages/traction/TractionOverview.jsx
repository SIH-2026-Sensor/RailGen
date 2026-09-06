import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRailGen } from '../../context/RailGenContext';
import tractionHeroImg from '../../assets/traction_catenary_hero.jpg';
import { 
  Zap, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  Search, 
  Bell, 
  ChevronDown, 
  ArrowRight, 
  Plus, 
  X, 
  CheckCircle2, 
  Check, 
  Building2, 
  ShieldCheck, 
  SlidersHorizontal, 
  Activity,
  HardHat,
  Filter,
  RefreshCw,
  Info
} from 'lucide-react';

// Custom Transmission Tower Icon matching Image 2
function TransmissionTowerIcon({ className = "w-5 h-5" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M12 2v20" />
      <path d="M7 6h10" />
      <path d="M5 11h14" />
      <path d="M3 17h18" />
      <path d="M8 2l-4 20" />
      <path d="M16 2l4 20" />
      <path d="M8 6l8 5" />
      <path d="M16 6l-8 5" />
      <path d="M6 11l12 6" />
      <path d="M18 11l-12 6" />
    </svg>
  );
}

export function TractionOverview() {
  const { faultsTrd, requests, createRequest } = useRailGen();
  const location = useLocation();
  const navigate = useNavigate();

  // Real-time IST clock matching Image 2 (e.g. 20:32:17 IST)
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

  // Search & Navigation
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Sub-Stations Data matching Image 2
  const [subStations, setSubStations] = useState([
    { 
      id: 'LDH TSS', 
      name: 'LDH TSS', 
      location: 'Ludhiana', 
      voltage: 25, 
      status: 'Normal', 
      lastUpdated: 'Today, 20:10',
      feederA: '25.4 kV',
      feederB: '25.2 kV',
      temp: '41°C',
      transformerLoad: '64%',
      feedersActive: 2
    },
    { 
      id: 'PHR TSS', 
      name: 'PHR TSS', 
      location: 'Phillaur', 
      voltage: 25, 
      status: 'Normal', 
      lastUpdated: 'Today, 19:48',
      feederA: '25.3 kV',
      feederB: '25.1 kV',
      temp: '38°C',
      transformerLoad: '58%',
      feedersActive: 2
    },
    { 
      id: 'UMB TSS', 
      name: 'UMB TSS', 
      location: 'Umb', 
      voltage: 25, 
      status: 'Maintenance', 
      lastUpdated: 'Today, 17:30',
      feederA: '24.9 kV',
      feederB: 'Standby Isolated',
      temp: '47°C',
      transformerLoad: '72%',
      feedersActive: 1
    },
    { 
      id: 'JUC TSS', 
      name: 'JUC TSS', 
      location: 'Jalandhar Cantt', 
      voltage: 25, 
      status: 'Normal', 
      lastUpdated: 'Today, 20:05',
      feederA: '25.2 kV',
      feederB: '25.0 kV',
      temp: '40°C',
      transformerLoad: '61%',
      feedersActive: 2
    },
  ]);

  // Recent Faults matching Image 2
  const [recentFaults, setRecentFaults] = useState([
    {
      id: 'FLT-OHE-401',
      title: 'OHE Overheating Alert',
      section: 'Km 343/2 — LDH',
      time: 'Today, 19:20',
      severity: 'Critical',
      color: 'bg-red-500',
      details: 'Thermal hotspot detected at cantilever insulator mast 343/2. Temperature reading 78°C exceeds 65°C threshold. Requires 25kV power isolation & dropper adjustment.'
    },
    {
      id: 'FLT-OHE-402',
      title: 'Insulator Flashover',
      section: 'Km 352/1 — PHR',
      time: 'Today, 16:42',
      severity: 'High',
      color: 'bg-amber-500',
      details: 'Minor flashover marks observed on 9-ton composite insulator. Tower wagon TW-08 queued for nocturnal replacement window.'
    },
    {
      id: 'FLT-OHE-403',
      title: 'Power Fluctuation',
      section: 'Km 368/4 — JUC',
      time: 'Today, 11:15',
      severity: 'Medium',
      color: 'bg-emerald-500',
      details: 'Sub-sector feeder voltage dipped temporarily to 24.6 kV during Rajdhani passage. SCADA auto-regulated within 45 seconds.'
    }
  ]);

  // Modals state
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedSubStation, setSelectedSubStation] = useState(null);
  const [selectedFault, setSelectedFault] = useState(null);
  const [pendingBlockCount, setPendingBlockCount] = useState(3);

  // New Block Request Form Data
  const [blockForm, setBlockForm] = useState({
    section: 'LDH - JUC Up Line (Km 343/2)',
    workType: 'OHE Catenary Hotspot & Cantilever Adjustment',
    severity: 'High',
    duration: '3.0 Hours',
    preferredWindow: '01:30 - 05:00 hrs',
    crew: 'Tower Wagon TW-08 + 9 TRD Staff',
    powerIsolation: '25kV AC Feeder Isolation Required',
    description: 'Hotspot anomaly detected at mast 343/2. Requires 25kV power block isolation and tower wagon deployment.'
  });

  const handleBlockSubmit = (e) => {
    e.preventDefault();
    createRequest({
      department: 'Traction',
      section: blockForm.section,
      issue: blockForm.workType,
      severity: blockForm.severity,
      duration: blockForm.duration,
      preferredWindow: blockForm.preferredWindow,
      crew: blockForm.crew,
      description: blockForm.description,
      maintenanceType: 'OHE Power & Traffic Block'
    });
    setPendingBlockCount(prev => prev + 1);
    setShowBlockModal(false);
    showToast('25kV OHE Power Block request REQ-TRD-2090 submitted successfully to Operating Division!');
  };

  const filteredSubStations = subStations.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B2447] text-white px-5 py-3 rounded-xl shadow-2xl border border-emerald-500 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
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
            placeholder="Search sub-station, block, location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#F8FAFC] text-slate-800 text-xs rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] placeholder-slate-400 transition-all"
          />
        </div>

        {/* Right Header Controls: IST Clock, Notifications, Profile Switcher */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Real-time IST Clock */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-medium shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-mono">{currentTime || '20:32:17 IST'}</span>
          </div>

          {/* Notifications Bell with badge 2 matching Image 2 */}
          <button 
            onClick={() => showToast('2 unread alerts: OHE Overheating at Km 343/2, Insulator Flashover at Km 352/1.')}
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
              GS
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-slate-800 leading-tight">Gurpreet Singh</p>
              <p className="text-[10px] text-slate-500">Traction (TRD)</p>
            </div>
          </div>
        </div>
      </div>

      {/* HERO BANNER matching Image 2 */}
      <div className="relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[170px] items-center">
          {/* Left Content Area */}
          <div className="md:col-span-7 p-6 sm:p-8 z-10">
            <span className="text-xs font-semibold text-sky-600 tracking-wide block mb-1">
              Traction Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2447] tracking-tight">
              Powering a Safer Tomorrow
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-xl leading-relaxed">
              Monitor traction power, handle block requests, and respond to faults — for uninterrupted rail operations.
            </p>
          </div>

          {/* Right Catenary Electric Train Visual with Fade & Text Overlay */}
          <div className="md:col-span-5 relative h-48 md:h-full w-full overflow-hidden">
            <img 
              src={tractionHeroImg} 
              alt="Indian Railways Electric Locomotive under 25kV Catenary Wires" 
              className="w-full h-full object-cover object-center"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 30%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 30%, black 100%)'
              }}
            />

            {/* Overlay Slogan & Tricolor Bar matching Image 2 */}
            <div className="absolute right-6 bottom-5 text-right z-10">
              <p className="text-xs sm:text-sm font-bold text-white drop-shadow-md leading-tight">
                Stable Power.
              </p>
              <p className="text-xs sm:text-sm font-bold text-white drop-shadow-md leading-tight">
                Smoother Journeys.
              </p>
              <div className="w-12 h-1 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border border-white/30 ml-auto mt-1.5 shadow-sm"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 PASTEL METRIC / KPI CARDS matching Image 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Power Availability */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 fill-emerald-600/20" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">99.8%</p>
              <p className="text-xs text-slate-500 font-medium">Power Availability</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => showToast('Grid Voltage: 25.2 kV. Northern Power Grid feeds operating at 100% nominal capacity.')}
              className="text-emerald-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Grid Stable</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Active Faults */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
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
              className="text-amber-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Requires Action</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Traction Sub-Stations */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <TransmissionTowerIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">12</p>
              <p className="text-xs text-slate-500 font-medium">Traction Sub-Stations</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => showToast('All 12 TSS in Ludhiana - Jalandhar Cantt section monitored by SCADA.')}
              className="text-emerald-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>All Operational</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 4: Block Requests */}
        <div className="bg-white border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{pendingBlockCount}</p>
              <p className="text-xs text-slate-500 font-medium">Block Requests</p>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button 
              onClick={() => setShowBlockModal(true)}
              className="text-purple-600 font-semibold hover:underline flex items-center gap-1"
            >
              <span>Pending Approval</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 2-COLUMN OPERATIONAL LAYOUT matching Image 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (65% width) — Traction Sub-Station Status Table */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <TransmissionTowerIcon className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">Traction Sub-Station Status</h2>
            </div>
            <button 
              onClick={() => showToast('Displaying all active Traction Sub-Stations on the Northern Railway network.')}
              className="text-xs font-semibold text-[#EA580C] hover:text-orange-700 flex items-center gap-1 transition-colors"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Sub-Station Status Table */}
          <div className="overflow-x-auto table-responsive">
            <table className="w-full min-w-[550px] text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-medium">
                  <th className="py-3 px-2 font-medium">Sub-Station</th>
                  <th className="py-3 px-2 font-medium">Location</th>
                  <th className="py-3 px-2 font-medium">Voltage (kV)</th>
                  <th className="py-3 px-2 font-medium">Status</th>
                  <th className="py-3 px-2 font-medium text-right">Last Updated</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredSubStations.map((tss) => (
                  <tr 
                    key={tss.id}
                    onClick={() => setSelectedSubStation(tss)}
                    className="hover:bg-slate-50 transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-2 font-bold text-slate-900 group-hover:text-[#EA580C] transition-colors">
                      {tss.name}
                    </td>
                    <td className="py-3.5 px-2 text-slate-600">
                      {tss.location}
                    </td>
                    <td className="py-3.5 px-2 font-mono text-slate-700">
                      {tss.voltage}
                    </td>
                    <td className="py-3.5 px-2">
                      <span className={`inline-flex items-center gap-1.5 font-semibold text-xs ${
                        tss.status === 'Normal' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          tss.status === 'Normal' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}></span>
                        <span>{tss.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-right text-slate-400">
                      {tss.lastUpdated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN (35% width) — Action Card & Recent Faults */}
        <div className="lg:col-span-4 space-y-6">
          {/* TOP CARD: Request Power / Traffic Block Action Card matching Image 2 */}
          <div 
            onClick={() => setShowBlockModal(true)}
            className="bg-gradient-to-br from-[#0F274A] to-[#0A1C36] text-white p-5 rounded-2xl shadow-sm relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all border border-blue-900/30"
          >
            {/* Watermark of transmission tower */}
            <div className="absolute -right-4 -bottom-6 opacity-10 pointer-events-none group-hover:scale-110 transition-transform">
              <TransmissionTowerIcon className="w-36 h-36 text-blue-300" />
            </div>

            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-xl group-hover:scale-105 transition-transform">
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </div>
              <h3 className="text-base font-bold text-white mt-3.5 tracking-tight">
                Request Power / Traffic Block
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Submit a new block request to coordinate with operations.
              </p>
            </div>
          </div>

          {/* BOTTOM CARD: Recent Faults Widget matching Image 2 */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <h3 className="text-base font-bold text-slate-900">Recent Faults</h3>
              </div>
              <button 
                onClick={() => showToast('Displaying full TRD SCADA fault telemetry logs.')}
                className="text-xs font-semibold text-[#EA580C] hover:text-orange-700 flex items-center gap-1 transition-colors"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of Recent Faults matching Image 2 */}
            <div className="divide-y divide-slate-100">
              {recentFaults.map((fault) => (
                <div 
                  key={fault.id}
                  onClick={() => setSelectedFault(fault)}
                  className="py-3 first:pt-1 last:pb-1 flex items-start justify-between gap-3 cursor-pointer group hover:bg-slate-50/80 -mx-2 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${fault.color} shrink-0 mt-1`}></span>
                    <div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-[#EA580C] transition-colors leading-tight">
                        {fault.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {fault.section}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                    {fault.time}
                  </span>
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
          <span className="font-medium text-slate-600">A Stronger, Connected India.</span>
        </div>
      </div>

      {/* MODAL 1: REQUEST POWER / TRAFFIC BLOCK */}
      {showBlockModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-[#EA580C] flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Request Power & Traffic Block</h3>
                  <p className="text-[11px] text-slate-500">Traction TRD Division • 25kV Catenary Isolation</p>
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
                <label className="block font-semibold text-slate-700 mb-1">Corridor Track Section</label>
                <input
                  type="text"
                  value={blockForm.section}
                  onChange={(e) => setBlockForm({ ...blockForm, section: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Work Nature</label>
                  <select
                    value={blockForm.workType}
                    onChange={(e) => setBlockForm({ ...blockForm, workType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] outline-none bg-white"
                  >
                    <option value="OHE Catenary Hotspot & Cantilever Adjustment">OHE Catenary Hotspot</option>
                    <option value="Insulator Replacement & Cleaning">Insulator Replacement</option>
                    <option value="Contact Wire Tensioning & Neutral Section">Wire Tensioning</option>
                    <option value="Traction Sub-Station Feeder Overhaul">TSS Feeder Overhaul</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Severity / Priority</label>
                  <select
                    value={blockForm.severity}
                    onChange={(e) => setBlockForm({ ...blockForm, severity: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] outline-none bg-white"
                  >
                    <option value="Critical">Critical (Immediate Block)</option>
                    <option value="High">High (Next Available Window)</option>
                    <option value="Medium">Medium (Routine Nocturnal)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Block Duration</label>
                  <input
                    type="text"
                    value={blockForm.duration}
                    onChange={(e) => setBlockForm({ ...blockForm, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] outline-none"
                    placeholder="e.g. 3.0 Hours"
                    required
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Preferred Time Window</label>
                  <input
                    type="text"
                    value={blockForm.preferredWindow}
                    onChange={(e) => setBlockForm({ ...blockForm, preferredWindow: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] outline-none"
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] outline-none"
                  placeholder="e.g. Tower Wagon TW-08 + 9 TRD Staff"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Operational Description</label>
                <textarea
                  rows={2}
                  value={blockForm.description}
                  onChange={(e) => setBlockForm({ ...blockForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-[#EA580C]/20 focus:border-[#EA580C] outline-none"
                  placeholder="Explain power isolation details..."
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
                  className="px-5 py-2 rounded-lg bg-[#EA580C] hover:bg-orange-700 text-white font-bold shadow-sm transition-colors flex items-center gap-2"
                >
                  <span>Submit Block Request</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: SUB-STATION INSPECTION DETAILS */}
      {selectedSubStation && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TransmissionTowerIcon className="w-5 h-5 text-emerald-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedSubStation.name}</h3>
                  <p className="text-[11px] text-slate-500">{selectedSubStation.location} • 25kV Traction Sub-Station</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedSubStation(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Grid Voltage</span>
                  <span className="text-slate-800 font-mono font-bold text-sm">{selectedSubStation.voltage} kV AC</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Status</span>
                  <span className={`font-semibold inline-flex items-center gap-1 ${
                    selectedSubStation.status === 'Normal' ? 'text-emerald-600' : 'text-amber-600'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      selectedSubStation.status === 'Normal' ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}></span>
                    {selectedSubStation.status}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Feeder A</span>
                  <span className="text-slate-700 font-mono font-medium">{selectedSubStation.feederA}</span>
                </div>
                <div className="mt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Feeder B</span>
                  <span className="text-slate-700 font-mono font-medium">{selectedSubStation.feederB}</span>
                </div>
                <div className="mt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Transformer Temp</span>
                  <span className="text-slate-700 font-mono font-medium">{selectedSubStation.temp}</span>
                </div>
                <div className="mt-2">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Current Load</span>
                  <span className="text-slate-700 font-mono font-medium">{selectedSubStation.transformerLoad}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedSubStation(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedSubStation(null);
                    setShowBlockModal(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#EA580C] hover:bg-orange-700 text-white font-bold transition-colors"
                >
                  Request Power Block
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: FAULT DETAILS INSPECTOR */}
      {selectedFault && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedFault.title}</h3>
                  <p className="text-[11px] text-slate-500">{selectedFault.section} • {selectedFault.id}</p>
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

              <div className="flex items-center justify-between py-1 text-slate-500">
                <span>Detected: <strong className="text-slate-700 font-mono">{selectedFault.time}</strong></span>
                <span>Severity: <strong className="text-red-600 font-semibold">{selectedFault.severity}</strong></span>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  onClick={() => setSelectedFault(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => {
                    setSelectedFault(null);
                    setShowBlockModal(true);
                  }}
                  className="px-4 py-2 rounded-lg bg-[#EA580C] hover:bg-orange-700 text-white font-bold transition-colors"
                >
                  Create Block for this Fault
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
