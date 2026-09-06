import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';
import logoWhiteImg from '../../assets/logo_white.png';
import trackImg from '../../assets/track.png';
import stationImg from '../../assets/station.png';
import trainImg from '../../assets/train.png';
import emblemImg from '../../assets/emblem_india.png';
import { 
  Train, 
  Sparkles, 
  HardHat, 
  Zap, 
  Radio, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  ShieldAlert, 
  Activity, 
  Clock, 
  CalendarCheck, 
  TrendingUp,
  Cpu,
  BarChart3,
  Users,
  Search,
  ShieldCheck,
  CalendarDays,
  Building2,
  ChevronDown,
  Play,
  AlertTriangle,
  Link2,
  Database,
  FileSpreadsheet,
  UserCheck,
  ChevronRight,
  X,
  Wrench,
  Menu
} from 'lucide-react';

export function Home() {
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showProblemFlow, setShowProblemFlow] = useState(false);
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [showImpactModal, setShowImpactModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#142033] flex flex-col font-sans selection:bg-[#EA580C] selection:text-white">
      {/* Top Floating Navbar (matching image1 reference) */}
      <header className="sticky top-0 z-50 px-4 sm:px-8 pt-4 pb-2 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-16 px-6 sm:px-8 bg-white/95 backdrop-blur-md rounded-2xl shadow-md border border-slate-200/80 flex items-center justify-between">
          {/* Logo (clean, unboxed, natural aspect ratio) */}
          <Link to="/" className="flex items-center">
            <img 
              src={logoImg} 
              alt="RailGen — Intelligent Railway Generation" 
              className="h-11 sm:h-12 w-auto object-contain" 
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-[#475569]">
            <a href="#" className="text-[#EA580C] font-bold border-b-2 border-[#EA580C] pb-0.5">Home</a>
            <a href="#problem" className="hover:text-[#EA580C] transition-colors">Challenge</a>
            <a href="#solution" className="hover:text-[#EA580C] transition-colors">Solution</a>
            <a href="#departments" className="hover:text-[#EA580C] transition-colors">Departments</a>
            <a href="#vision" className="hover:text-[#EA580C] transition-colors">Vision</a>
            <a href="#impact" className="hover:text-[#EA580C] transition-colors">Impact</a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => alert("Search operational corridor, train #, or asset ID.")}
              className="p-1.5 text-slate-600 hover:text-[#EA580C] transition-colors"
              title="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            <div className="h-5 w-px bg-slate-200 hidden sm:block"></div>
            <Link
              to="/login"
              className="text-xs font-bold text-[#142033] hover:text-[#EA580C] px-3 sm:px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 transition-colors shrink-0"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-xs font-bold bg-[#EA580C] hover:bg-[#C2410C] text-white px-3.5 sm:px-6 py-2 sm:py-2.5 rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>Sign Up</span>
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 md:hidden transition-colors cursor-pointer flex items-center justify-center"
              title="Toggle Menu"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu for Nav Links */}
        {mobileNavOpen && (
          <div className="md:hidden max-w-7xl mx-auto mt-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200/80 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2 text-xs font-semibold text-[#475569]">
              <a 
                href="#" 
                onClick={() => setMobileNavOpen(false)}
                className="text-[#EA580C] font-bold p-2 rounded-lg hover:bg-orange-50"
              >
                Home
              </a>
              <a 
                href="#problem" 
                onClick={() => setMobileNavOpen(false)}
                className="hover:text-[#EA580C] p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Challenge
              </a>
              <a 
                href="#solution" 
                onClick={() => setMobileNavOpen(false)}
                className="hover:text-[#EA580C] p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Solution
              </a>
              <a 
                href="#departments" 
                onClick={() => setMobileNavOpen(false)}
                className="hover:text-[#EA580C] p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Departments
              </a>
              <a 
                href="#vision" 
                onClick={() => setMobileNavOpen(false)}
                className="hover:text-[#EA580C] p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Vision
              </a>
              <a 
                href="#impact" 
                onClick={() => setMobileNavOpen(false)}
                className="hover:text-[#EA580C] p-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Impact
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section with train.png background (matching image1 reference) */}
      <section 
        className="relative bg-cover bg-center pt-8 sm:pt-14 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 overflow-hidden"
        style={{ backgroundImage: `url('/train.png')` }}
      >
        {/* Soft Left Light Scrim Overlay for ultra-crisp text legibility while revealing the Vande Bharat train on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-transparent lg:via-white/70 pointer-events-none"></div>

        {/* Bottom smooth feathering gradient to seamlessly blend the train background into pure white (no sharp start) */}
        <div className="absolute bottom-0 inset-x-0 h-44 sm:h-56 bg-gradient-to-b from-transparent via-white/80 to-white pointer-events-none z-10"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4 pb-10">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7">
              {/* Eyebrow badge with orange dash */}
              <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-widest text-slate-600 mb-4">
                <span>AI-POWERED RAILWAY MAINTENANCE</span>
                <span className="w-8 h-0.5 bg-[#EA580C] rounded"></span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#142033] tracking-tight leading-[1.1] mb-5">
                Smarter Maintenance. <br />
                <span className="text-[#EA580C]">Smoother Railways.</span>
              </h1>

              {/* Subtext */}
              <p className="text-base sm:text-lg text-slate-700 max-w-xl leading-relaxed mb-4 font-normal">
                RailGen coordinates engineering, traction, signalling and operations for optimized block planning — ensuring safer, more reliable and disruption-free journeys.
              </p>
            </div>

            {/* Right Hero Side: Unobstructed view of train.png */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-start min-h-[300px] sm:min-h-[420px] pointer-events-none">
              {/* Slogan with Indian Tricolor Wave Ribbon placed neatly at the top right */}
              <div className="mb-4 text-center lg:text-right pointer-events-auto">
                <span className="font-script text-3xl sm:text-4xl font-bold text-[#0B2447] -rotate-3 block tracking-wide">
                  Connecting India on Track
                </span>
                {/* SVG Tricolor wave arc underneath */}
                <div className="flex justify-center lg:justify-end mt-1">
                  <svg className="w-48 h-5" viewBox="0 0 160 20" fill="none">
                    <path d="M5 4 C 50 16, 110 16, 155 4" stroke="#FF9933" strokeWidth="3.5" strokeLinecap="round"/>
                    <path d="M5 8 C 50 20, 110 20, 155 8" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M5 12 C 50 24, 110 24, 155 12" stroke="#138808" strokeWidth="3.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              {/* Note: Feature boxes removed to fully reveal the scenic Vande Bharat train image */}
            </div>

          </div>

          {/* Bottom Curved Wave Banner with 5 Highlights (shortened in width so it does not cover the train) */}
          <div className="mt-8 pt-5 pb-3.5 bg-white/95 backdrop-blur-md rounded-3xl shadow-xl border border-slate-200/80 px-4 sm:px-6 w-full lg:max-w-3xl xl:max-w-4xl lg:mr-auto mb-4 sm:mb-6">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
              
              <div className="flex items-center gap-2.5 p-1.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <h5 className="text-[11px] sm:text-xs font-bold text-[#142033] leading-tight">Multi-Department</h5>
                  <p className="text-[10px] text-[#667085] leading-tight">Coordination</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-1.5 pt-2 sm:pt-1.5 sm:pl-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                  <Cpu className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <h5 className="text-[11px] sm:text-xs font-bold text-[#142033] leading-tight">AI-Assisted</h5>
                  <p className="text-[10px] text-[#667085] leading-tight">Block Planning</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-1.5 pt-2 sm:pt-1.5 sm:pl-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                  <Train className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <h5 className="text-[11px] sm:text-xs font-bold text-[#142033] leading-tight">Train-Aware</h5>
                  <p className="text-[10px] text-[#667085] leading-tight">Scheduling</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-1.5 pt-2 sm:pt-1.5 sm:pl-3">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                  <TrendingUp className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <h5 className="text-[11px] sm:text-xs font-bold text-[#142033] leading-tight">Higher</h5>
                  <p className="text-[10px] text-[#667085] leading-tight">Asset Availability</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-1.5 pt-2 sm:pt-1.5 sm:pl-3 col-span-2 sm:col-span-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </div>
                <div>
                  <h5 className="text-[11px] sm:text-xs font-bold text-[#142033] leading-tight">A Safer</h5>
                  <p className="text-[10px] text-[#667085] leading-tight">Tomorrow</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* The Challenge Today Section (Image1 Reference with track.png background - smooth organic transition, generous spacing) */}
      <section id="problem" className="relative pt-24 sm:pt-36 lg:pt-44 pb-20 sm:pb-24 lg:pb-28 px-6 lg:px-12 bg-white overflow-hidden">
        {/* Background Track Photo (Right Aligned, Grayscale Monochromatic Elegance with Feathered Edges) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <img 
            src={trackImg} 
            alt="Railway corridor tracks" 
            className="w-full h-full object-cover object-right filter grayscale contrast-115 brightness-95 opacity-90"
          />
          {/* Top smooth fade to eliminate sharp transition from hero */}
          <div className="absolute top-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-b from-white via-white/90 to-transparent z-1"></div>
          {/* Bottom smooth fade into the solution section */}
          <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-white via-white/90 to-transparent z-1"></div>
          {/* Smooth horizontal gradient overlay to ensure text contrast and flawless white left side */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent w-full lg:w-3/5"></div>
          {/* Curved orange decorative contour line as in image1 */}
          <div className="hidden lg:block absolute -top-28 left-[36%] w-[720px] h-[720px] rounded-full border border-orange-300/40 pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading, Context, CTA & Stat Badges */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Tag / Category Badge with Accent Line */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#EA580C]">
                THE CHALLENGE TODAY
              </span>
              <div className="w-12 h-0.5 bg-[#EA580C] rounded-full"></div>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0B2447] tracking-tight leading-[1.18] mb-5">
              Fragmented Maintenance <br className="hidden sm:inline" />
              Leads to <span className="text-[#EA580C]">Bigger Disruptions.</span>
            </h2>

            {/* Description Body */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg font-normal">
              Independent maintenance plans, overlapping blocks and limited coordination across departments often result in delays, under-utilized track windows and higher operational risk.
            </p>

            {/* Action CTA Button + Inline Interactive Diagram Toggle */}
            <div className="mb-6">
              <button 
                onClick={() => setShowProblemFlow(!showProblemFlow)}
                className="inline-flex items-center gap-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:translate-x-0.5 cursor-pointer"
              >
                <span>{showProblemFlow ? 'Hide Problem Breakdown' : 'See the Problem'}</span>
                <ArrowRight className={`w-4 h-4 transition-transform duration-200 ${showProblemFlow ? 'rotate-90' : ''}`} />
              </button>
            </div>

            {/* Interactive Problem Chain Diagram: Separate Plans → Multiple Blocks → Conflicts → Train Disruption */}
            {showProblemFlow && (
              <div className="mb-8 p-5 sm:p-6 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-red-200/80 shadow-2xl shadow-red-500/10 transition-all">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 text-red-600 flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#0B2447] uppercase tracking-wider">
                      The Silo Cascade: Failure Mode Analysis
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowProblemFlow(false)}
                    className="text-xs text-slate-400 hover:text-slate-700 font-semibold p-1 transition-colors cursor-pointer"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 relative">
                  {/* Step 1: Separate Plans */}
                  <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-xl p-3 flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-extrabold text-[#EA580C] uppercase tracking-wider bg-white px-1.5 py-0.5 rounded border border-[#FED7AA]">01</span>
                      <FileSpreadsheet className="w-3.5 h-3.5 text-[#EA580C]" />
                    </div>
                    <h5 className="text-xs font-bold text-[#0B2447] mb-1">Separate Plans</h5>
                    <p className="text-[10px] text-slate-600 leading-tight">Civil, TRD & S&T raise isolated paper requests without mutual visibility.</p>
                  </div>

                  {/* Step 2: Multiple Blocks */}
                  <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-xl p-3 flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-extrabold text-[#EA580C] uppercase tracking-wider bg-white px-1.5 py-0.5 rounded border border-[#FED7AA]">02</span>
                      <Layers className="w-3.5 h-3.5 text-[#EA580C]" />
                    </div>
                    <h5 className="text-xs font-bold text-[#0B2447] mb-1">Multiple Blocks</h5>
                    <p className="text-[10px] text-slate-600 leading-tight">Corridor shut down 3 separate times across the week (total 8.5h).</p>
                  </div>

                  {/* Step 3: Conflicts */}
                  <div className="bg-[#FFF0F0] border border-[#FECACA] rounded-xl p-3 flex flex-col">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-extrabold text-[#DC2626] uppercase tracking-wider bg-white px-1.5 py-0.5 rounded border border-[#FECACA]">03</span>
                      <AlertTriangle className="w-3.5 h-3.5 text-[#DC2626]" />
                    </div>
                    <h5 className="text-xs font-bold text-[#0B2447] mb-1">Conflicts</h5>
                    <p className="text-[10px] text-slate-600 leading-tight">OHE power isolation clashes with P-Way track machine movement.</p>
                  </div>

                  {/* Step 4: Train Disruption */}
                  <div className="bg-[#FFF0F0] border border-[#DC2626] rounded-xl p-3 flex flex-col shadow-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-extrabold text-white uppercase tracking-wider bg-[#DC2626] px-1.5 py-0.5 rounded">04</span>
                      <Train className="w-3.5 h-3.5 text-[#DC2626]" />
                    </div>
                    <h5 className="text-xs font-bold text-[#DC2626] mb-1">Train Disruption</h5>
                    <p className="text-[10px] text-slate-700 leading-tight">Express trains delayed 45+ mins; cascading speed restrictions.</p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-medium text-slate-600">Consequence: Severe passenger delay & underutilized track windows</span>
                  <a href="#solution" className="text-[#EA580C] font-bold hover:underline flex items-center gap-1">
                    <span>See RailGen Solution</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* 3 Bottom Pillar Stat Badges (Delays, Higher Risk, Limited Visibility) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              {/* 1. Delays */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#EA580C] shrink-0 mt-0.5 shadow-xs">
                  <Clock className="w-4 h-4 text-[#EA580C]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B2447]">Delays</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Due to overlapping blocks</p>
                </div>
              </div>

              {/* 2. Higher Risk */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#EA580C] shrink-0 mt-0.5 shadow-xs">
                  <AlertTriangle className="w-4 h-4 text-[#EA580C]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B2447]">Higher Risk</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">For train operations</p>
                </div>
              </div>

              {/* 3. Limited Visibility */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#EA580C] shrink-0 mt-0.5 shadow-xs">
                  <Link2 className="w-4 h-4 text-[#EA580C]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B2447]">Limited Visibility</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Across departments</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Department Cards + Directional Arrows + Central Red Problem Box */}
          <div className="lg:col-span-6 relative flex flex-col items-center justify-center pt-2">
            {/* 3 Department Cards Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-md sm:max-w-lg">
              {/* 1. Engineering */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-100 flex flex-col items-center text-center relative overflow-hidden hover:-translate-y-1 transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-[#FFF7ED] flex items-center justify-center mb-2.5">
                  <HardHat className="w-5 h-5 text-[#EA580C]" />
                </div>
                <h3 className="font-extrabold text-[#0B2447] text-xs sm:text-sm">Engineering</h3>
                <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 font-medium">Track & Civil Works</span>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-[#EA580C]"></div>
              </div>

              {/* 2. Traction */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-100 flex flex-col items-center text-center relative overflow-hidden hover:-translate-y-1 transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-[#EAF8EF] flex items-center justify-center mb-2.5">
                  <Train className="w-5 h-5 text-[#15803D]" />
                </div>
                <h3 className="font-extrabold text-[#0B2447] text-xs sm:text-sm">Traction</h3>
                <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 font-medium">OHE & Power Blocks</span>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-[#15803D]"></div>
              </div>

              {/* 3. Signal & Telecom */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-100 flex flex-col items-center text-center relative overflow-hidden hover:-translate-y-1 transition-all duration-200">
                <div className="w-10 h-10 rounded-full bg-[#F5F3FF] flex items-center justify-center mb-2.5">
                  <Radio className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <h3 className="font-extrabold text-[#0B2447] text-xs sm:text-sm">Signal & Telecom</h3>
                <span className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 font-medium">Signalling & Telecom</span>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-[#7C3AED]"></div>
              </div>
            </div>

            {/* Connecting Directional SVG Arrows */}
            <div className="w-full max-w-md sm:max-w-lg h-14 relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 380 56" fill="none">
                <defs>
                  <marker id="challenge-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#EA580C" />
                  </marker>
                </defs>
                {/* Left Arrow (Engineering -> Center) */}
                <path d="M 64 2 Q 110 28 148 48" stroke="white" strokeWidth="5" strokeLinecap="round" />
                <path d="M 64 2 Q 110 28 148 48" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#challenge-arrow)" />
                
                {/* Center Arrow (Traction -> Center) */}
                <path d="M 190 2 L 190 46" stroke="white" strokeWidth="5" strokeLinecap="round" />
                <path d="M 190 2 L 190 46" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#challenge-arrow)" />
                
                {/* Right Arrow (Signal & Telecom -> Center) */}
                <path d="M 316 2 Q 270 28 232 48" stroke="white" strokeWidth="5" strokeLinecap="round" />
                <path d="M 316 2 Q 270 28 232 48" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="round" markerEnd="url(#challenge-arrow)" />
              </svg>
            </div>

            {/* Central Red Problem Alert Box */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl px-6 py-4 border-2 border-red-200 shadow-2xl shadow-red-500/15 max-w-xs sm:max-w-sm mx-auto flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shrink-0 shadow-md shadow-red-500/30">
                <AlertTriangle className="w-7 h-7 text-white fill-white" />
              </div>
              <div className="text-left font-extrabold text-[#DC2626] text-sm sm:text-base leading-tight">
                <div>Separate Blocks</div>
                <div className="my-0.5">Conflicts</div>
                <div>Delays</div>
              </div>
            </div>

            {/* Floating Dark Glass Insight Card (Bottom Right) */}
            <div className="w-full max-w-md sm:max-w-lg mt-6 flex justify-end">
              <div className="bg-[#0B1528]/85 backdrop-blur-md border border-white/15 rounded-xl py-2.5 px-3.5 max-w-[260px] shadow-2xl flex items-center gap-2.5 text-left">
                <div className="w-1 h-8 bg-[#EA580C] rounded-full shrink-0"></div>
                <p className="text-[11px] text-slate-200 leading-snug font-medium">
                  Lack of coordination turns small blocks into major disruptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The RailGen Solution Section (Image1 Reference: One Platform. Coordinated Decisions.) */}
      <section id="solution" className="relative py-20 sm:py-28 px-6 lg:px-12 bg-gradient-to-b from-white via-[#FFFBF7] to-white overflow-hidden">
        {/* Ambient Warm Radial Background Glow & Concentric Orbital Rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          <div className="absolute top-1/2 -translate-y-1/2 right-[5%] sm:right-[15%] w-[500px] sm:w-[680px] h-[500px] sm:h-[680px] bg-[radial-gradient(circle,rgba(254,215,170,0.35)_0%,transparent_70%)] rounded-full blur-2xl"></div>
          {/* Orbital Concentric Hairline Rings as in image1 */}
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[12%] w-[480px] h-[480px] rounded-full border border-[#FED7AA]/50"></div>
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[12%] w-[680px] h-[680px] rounded-full border border-[#FED7AA]/30"></div>
          <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-[12%] w-[900px] h-[900px] rounded-full border border-[#FED7AA]/15"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Solution Branding & Context */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Category Badge with Accent Dash */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#EA580C]">
                THE RAILGEN SOLUTION
              </span>
              <div className="w-12 h-0.5 bg-[#EA580C] rounded-full"></div>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0B2447] tracking-tight leading-[1.18] mb-5">
              One Platform. <br className="hidden sm:inline" />
              Coordinated <span className="text-[#EA580C]">Decisions.</span>
            </h2>

            {/* Description Body */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-7 max-w-lg font-normal">
              RailGen brings Engineering, Traction and S&T together with AI to plan, validate and optimize maintenance blocks — reducing conflicts and keeping India on track.
            </p>

            {/* Action Button */}
            <div className="mb-10">
              <button 
                onClick={() => setShowHowItWorksModal(true)}
                className="inline-flex items-center gap-2.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:translate-x-0.5 cursor-pointer"
              >
                <span>How It Works</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* 3 Bottom Solution Impact Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              {/* 1. Unified Planning */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#EA580C] shrink-0 mt-0.5 shadow-xs">
                  <BarChart3 className="w-4 h-4 text-[#EA580C]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B2447]">Unified Planning</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Across departments</p>
                </div>
              </div>

              {/* 2. Fewer Conflicts */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#EA580C] shrink-0 mt-0.5 shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-[#EA580C]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B2447]">Fewer Conflicts</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">Safer operations</p>
                </div>
              </div>

              {/* 3. Greater Reliability */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#EA580C] shrink-0 mt-0.5 shadow-xs">
                  <Clock className="w-4 h-4 text-[#EA580C]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0B2447]">Greater Reliability</h4>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">On-time railways</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Central Hub Diagram (Matching Image1 Exact Layout) */}
          <div className="lg:col-span-7 relative flex items-center justify-center py-6">
            <div className="relative w-full max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
              
              {/* Left Column: 3 Input Cards */}
              <div className="flex flex-col gap-4 z-10 w-full sm:w-48 order-1">
                {/* 1. Maintenance Requests */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 hover:-translate-x-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0 border border-[#FED7AA]/60 shadow-xs">
                    <FileSpreadsheet className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2447]">Maintenance Requests</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">From all departments</p>
                  </div>
                </div>

                {/* 2. Railway Data */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 hover:-translate-x-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0 border border-[#FED7AA]/60 shadow-xs">
                    <Database className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2447]">Railway Data</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">Trains, tracks, assets and constraints</p>
                  </div>
                </div>

                {/* 3. AI Optimization */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 hover:-translate-x-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0 border border-[#FED7AA]/60 shadow-xs">
                    <Cpu className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2447]">AI Optimization</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">Conflict detection & intelligent block planning</p>
                  </div>
                </div>
              </div>

              {/* Center: Glowing Circular RailGen Hub */}
              <div className="relative flex items-center justify-center z-20 shrink-0 my-2 sm:my-0 order-2">
                {/* Concentric Pulsing Orbit Rings */}
                <div className="hidden sm:block absolute w-48 h-48 rounded-full border border-orange-200/80 pointer-events-none"></div>
                <div className="hidden sm:block absolute w-60 h-60 rounded-full border border-orange-200/40 pointer-events-none"></div>
                
                {/* Circular White Hub Card */}
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white shadow-2xl border-4 border-orange-100/90 flex flex-col items-center justify-center text-center p-3 relative group hover:scale-105 transition-transform duration-300">
                  <img 
                    src={logoImg} 
                    alt="RailGen Logo" 
                    className="h-10 sm:h-12 w-auto object-contain mb-1" 
                  />
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-[#0B2447] tracking-tight">
                    RailGen
                  </span>
                  <span className="text-[7.5px] sm:text-[8px] font-semibold text-slate-400 uppercase tracking-tight">
                    Intelligent Railway Generation
                  </span>

                  {/* Cardinal Connection Orbit Dots in Orange */}
                  <div className="hidden sm:block absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#EA580C] border-2 border-white shadow-sm"></div>
                  <div className="hidden sm:block absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#EA580C] border-2 border-white shadow-sm"></div>
                  <div className="hidden sm:block absolute top-3 left-4 w-2.5 h-2.5 rounded-full bg-[#EA580C] border-2 border-white shadow-sm"></div>
                  <div className="hidden sm:block absolute top-3 right-4 w-2.5 h-2.5 rounded-full bg-[#EA580C] border-2 border-white shadow-sm"></div>
                  <div className="hidden sm:block absolute bottom-3 left-4 w-2.5 h-2.5 rounded-full bg-[#EA580C] border-2 border-white shadow-sm"></div>
                  <div className="hidden sm:block absolute bottom-3 right-4 w-2.5 h-2.5 rounded-full bg-[#EA580C] border-2 border-white shadow-sm"></div>
                </div>
              </div>

              {/* Right Column: 3 Output Cards */}
              <div className="flex flex-col gap-4 z-10 w-full sm:w-48 order-3">
                {/* 1. Conflict-Free Block Plan */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0 border border-[#FED7AA]/60 shadow-xs">
                    <ShieldCheck className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2447]">Conflict-Free Block Plan</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">Optimized and validated</p>
                  </div>
                </div>

                {/* 2. Manager Approval */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0 border border-[#FED7AA]/60 shadow-xs">
                    <UserCheck className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2447]">Manager Approval</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">Role-based workflow</p>
                  </div>
                </div>

                {/* 3. Published Schedule */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-3.5 shadow-xl border border-slate-100 flex items-center gap-3 hover:translate-x-1 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center shrink-0 border border-[#FED7AA]/60 shadow-xs">
                    <CalendarCheck className="w-5 h-5 text-[#EA580C]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B2447]">Published Schedule</h4>
                    <p className="text-[10px] text-slate-500 leading-tight">Ready for operations</p>
                  </div>
                </div>
              </div>

              {/* Connecting Curved Orange SVG Arrows (Visible on sm and up) */}
              <svg className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 280" fill="none">
                <defs>
                  <marker id="hub-arrow-head" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 1 L 9 5 L 0 9 z" fill="#EA580C" />
                  </marker>
                </defs>
                {/* Left Top -> Hub */}
                <path d="M 188 44 C 220 44, 220 105, 235 120" stroke="#EA580C" strokeWidth="2" strokeDasharray="3 3" />
                {/* Left Middle -> Hub */}
                <path d="M 188 140 L 225 140" stroke="#EA580C" strokeWidth="2" markerEnd="url(#hub-arrow-head)" />
                {/* Left Bottom -> Hub */}
                <path d="M 188 236 C 220 236, 220 175, 235 160" stroke="#EA580C" strokeWidth="2" strokeDasharray="3 3" />

                {/* Hub -> Right Top */}
                <path d="M 305 120 C 320 105, 320 44, 352 44" stroke="#EA580C" strokeWidth="2" markerEnd="url(#hub-arrow-head)" />
                {/* Hub -> Right Middle */}
                <path d="M 315 140 L 352 140" stroke="#EA580C" strokeWidth="2" markerEnd="url(#hub-arrow-head)" />
                {/* Hub -> Right Bottom */}
                <path d="M 305 160 C 320 175, 320 236, 352 236" stroke="#EA580C" strokeWidth="2" markerEnd="url(#hub-arrow-head)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Built For Every Operational Role Section (Image1 Reference: 5 Operational Role Cards) */}
      <section id="departments" className="py-20 sm:py-28 px-6 lg:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-10 h-0.5 bg-[#EA580C] rounded-full"></div>
              <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#EA580C]">
                BUILT FOR EVERY OPERATIONAL ROLE
              </span>
              <div className="w-10 h-0.5 bg-[#EA580C] rounded-full"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2447] tracking-tight">
              Designed with India's Railway Teams
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2.5 max-w-xl mx-auto leading-relaxed font-normal">
              Role-based access and intelligent tools for seamless collaboration across departments.
            </p>
          </div>

          {/* 5 Role Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
            {/* Card 1: Admin */}
            <div 
              onClick={() => launchRoleDemo('admin')}
              className="bg-gradient-to-b from-[#FFFDF9] via-[#FFF7ED]/35 to-[#FFF7ED]/80 rounded-3xl p-6 border border-[#FED7AA]/70 shadow-lg shadow-orange-500/5 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
            >
              {/* Top Icon Badge */}
              <div className="w-14 h-14 rounded-full bg-[#EA580C]/10 border border-[#EA580C]/20 flex items-center justify-center text-[#EA580C] shadow-xs mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-base font-extrabold text-[#0B2447] mb-1">Admin</h3>
              <p className="text-xs text-slate-500 font-medium leading-snug mb-3">Complete oversight and control</p>
              
              {/* Color Accent Dash */}
              <div className="w-7 h-0.5 bg-[#EA580C] rounded-full mx-auto mt-auto"></div>

              {/* Bottom Watermark Wave Graphic */}
              <svg className="absolute bottom-0 inset-x-0 w-full h-14 opacity-20 pointer-events-none" viewBox="0 0 160 50" fill="none">
                <path d="M0 35 C30 20, 60 45, 100 25 C130 10, 150 30, 160 20 L160 50 L0 50 Z" fill="#EA580C" />
                <path d="M0 40 C40 30, 80 50, 120 35 C145 25, 155 35, 160 30 L160 50 L0 50 Z" fill="#F97316" opacity="0.6" />
              </svg>
            </div>

            {/* Card 2: Engineering */}
            <div 
              onClick={() => launchRoleDemo('engineering')}
              className="bg-gradient-to-b from-[#F8FAFC] via-[#EFF6FF]/35 to-[#EFF6FF]/80 rounded-3xl p-6 border border-blue-200/70 shadow-lg shadow-blue-500/5 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
            >
              {/* Top Icon Badge */}
              <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-600 shadow-xs mb-4 group-hover:scale-110 transition-transform">
                <Wrench className="w-7 h-7" />
              </div>
              <h3 className="text-base font-extrabold text-[#0B2447] mb-1">Engineering</h3>
              <p className="text-xs text-slate-500 font-medium leading-snug mb-3">Track, bridge and civil maintenance</p>
              
              {/* Color Accent Dash */}
              <div className="w-7 h-0.5 bg-blue-600 rounded-full mx-auto mt-auto"></div>

              {/* Bottom Watermark Railway Viaduct/Bridge Arches */}
              <svg className="absolute bottom-0 inset-x-0 w-full h-14 opacity-25 pointer-events-none" viewBox="0 0 200 60" fill="none">
                <rect x="0" y="10" width="200" height="5" fill="#2563EB" />
                <path d="M 10 60 L 10 16 C 10 16, 25 35, 45 35 C 65 35, 80 16, 80 16 L 80 60" stroke="#2563EB" strokeWidth="2.5" fill="#3B82F6" fillOpacity="0.12" />
                <path d="M 75 60 L 75 16 C 75 16, 90 35, 110 35 C 130 35, 145 16, 145 16 L 145 60" stroke="#2563EB" strokeWidth="2.5" fill="#3B82F6" fillOpacity="0.12" />
                <path d="M 140 60 L 140 16 C 140 16, 155 35, 175 35 C 195 35, 205 16, 205 16 L 205 60" stroke="#2563EB" strokeWidth="2.5" fill="#3B82F6" fillOpacity="0.12" />
              </svg>
            </div>

            {/* Card 3: Traction */}
            <div 
              onClick={() => launchRoleDemo('traction')}
              className="bg-gradient-to-b from-[#F8FAFC] via-[#F0FDF4]/35 to-[#F0FDF4]/80 rounded-3xl p-6 border border-emerald-200/70 shadow-lg shadow-emerald-500/5 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
            >
              {/* Top Icon Badge */}
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 shadow-xs mb-4 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7 fill-emerald-600/20" />
              </div>
              <h3 className="text-base font-extrabold text-[#0B2447] mb-1">Traction</h3>
              <p className="text-xs text-slate-500 font-medium leading-snug mb-3">OHE and power block management</p>
              
              {/* Color Accent Dash */}
              <div className="w-7 h-0.5 bg-emerald-600 rounded-full mx-auto mt-auto"></div>

              {/* Bottom Watermark OHE Catenary Mast & Cantilever */}
              <svg className="absolute bottom-0 right-0 w-32 h-16 opacity-25 pointer-events-none" viewBox="0 0 140 80" fill="none">
                <line x1="90" y1="80" x2="90" y2="10" stroke="#16A34A" strokeWidth="2.5" />
                <line x1="40" y1="20" x2="110" y2="20" stroke="#16A34A" strokeWidth="2" />
                <line x1="90" y1="35" x2="50" y2="20" stroke="#16A34A" strokeWidth="1.5" />
                <line x1="0" y1="20" x2="140" y2="20" stroke="#15803D" strokeWidth="1.5" />
                <path d="M 0 10 Q 70 20 140 10" stroke="#15803D" strokeWidth="1.5" fill="none" />
                <line x1="40" y1="13" x2="40" y2="20" stroke="#16A34A" strokeWidth="1" />
                <line x1="120" y1="13" x2="120" y2="20" stroke="#16A34A" strokeWidth="1" />
              </svg>
            </div>

            {/* Card 4: Signal & Telecom */}
            <div 
              onClick={() => launchRoleDemo('signal')}
              className="bg-gradient-to-b from-[#F8FAFC] via-[#FAF5FF]/35 to-[#FAF5FF]/80 rounded-3xl p-6 border border-purple-200/70 shadow-lg shadow-purple-500/5 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
            >
              {/* Top Icon Badge */}
              <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 shadow-xs mb-4 group-hover:scale-110 transition-transform">
                <Radio className="w-7 h-7" />
              </div>
              <h3 className="text-base font-extrabold text-[#0B2447] mb-1">Signal & Telecom</h3>
              <p className="text-xs text-slate-500 font-medium leading-snug mb-3">Signalling, telecom and integrated blocks</p>
              
              {/* Color Accent Dash */}
              <div className="w-7 h-0.5 bg-purple-600 rounded-full mx-auto mt-auto"></div>

              {/* Bottom Watermark Railway Signal Light Post */}
              <svg className="absolute bottom-0 right-1 w-20 h-20 opacity-25 pointer-events-none" viewBox="0 0 80 80" fill="none">
                <line x1="50" y1="80" x2="50" y2="20" stroke="#7C3AED" strokeWidth="2.5" />
                <rect x="42" y="15" width="16" height="34" rx="8" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="2" />
                <circle cx="50" cy="23" r="3.5" fill="#7C3AED" />
                <circle cx="50" cy="32" r="3.5" fill="#7C3AED" fillOpacity="0.5" />
                <circle cx="50" cy="41" r="3.5" fill="#7C3AED" fillOpacity="0.5" />
              </svg>
            </div>

            {/* Card 5: Operating Manager */}
            <div 
              onClick={() => launchRoleDemo('manager')}
              className="bg-gradient-to-b from-[#F8FAFC] via-[#F0F9FF]/35 to-[#F0F9FF]/80 rounded-3xl p-6 border border-sky-200/70 shadow-lg shadow-sky-500/5 flex flex-col items-center text-center relative overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer group"
            >
              {/* Top Icon Badge */}
              <div className="w-14 h-14 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-600 shadow-xs mb-4 group-hover:scale-110 transition-transform">
                <UserCheck className="w-7 h-7" />
              </div>
              <h3 className="text-base font-extrabold text-[#0B2447] mb-1">Operating Manager</h3>
              <p className="text-xs text-slate-500 font-medium leading-snug mb-3">Real-time view and approvals</p>
              
              {/* Color Accent Dash */}
              <div className="w-7 h-0.5 bg-sky-600 rounded-full mx-auto mt-auto"></div>

              {/* Bottom Watermark Aerodynamic Train Silhouette */}
              <svg className="absolute bottom-0 inset-x-0 w-full h-14 opacity-30 pointer-events-none" viewBox="0 0 200 50" fill="none">
                <line x1="0" y1="46" x2="200" y2="46" stroke="#0284C7" strokeWidth="2" />
                <path d="M 10 44 L 140 44 L 175 44 C 185 44, 195 38, 190 30 C 185 22, 170 20, 150 20 L 10 20 Z" fill="#0284C7" fillOpacity="0.12" stroke="#0284C7" strokeWidth="1.5" />
                <path d="M 155 23 L 180 30 C 182 31, 180 35, 172 35 L 150 35 Z" fill="#0284C7" fillOpacity="0.35" />
                <rect x="25" y="24" width="18" height="8" rx="1.5" fill="#0284C7" fillOpacity="0.3" />
                <rect x="50" y="24" width="18" height="8" rx="1.5" fill="#0284C7" fillOpacity="0.3" />
                <rect x="75" y="24" width="18" height="8" rx="1.5" fill="#0284C7" fillOpacity="0.3" />
                <rect x="100" y="24" width="18" height="8" rx="1.5" fill="#0284C7" fillOpacity="0.3" />
                <rect x="125" y="24" width="18" height="8" rx="1.5" fill="#0284C7" fillOpacity="0.3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* OUR VISION Section (matching image1 reference with station.png background - smooth organic feathered transitions) */}
      <section id="vision" className="relative min-h-[660px] lg:min-h-[760px] bg-[#030914] text-white overflow-hidden flex items-center">
        {/* Panoramic Station Background Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img 
            src={stationImg} 
            alt="Indian Railways Modern Station Corridor" 
            className="w-full h-full object-cover object-[70%_center] lg:object-right filter brightness-[0.98] contrast-105"
          />
          {/* Deep Navy/Black Scrim on Left to guarantee high text contrast and legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030914] via-[#030914]/95 sm:via-[#030914]/85 md:via-[#030914]/75 to-transparent lg:w-[65%]"></div>
          {/* Subtle Vertical Lighting Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030914]/60 via-transparent to-[#030914]/40 pointer-events-none"></div>

          {/* Top smooth feathered gradient to eliminate sharp transition from BUILT FOR EVERY OPERATIONAL ROLE */}
          <div className="absolute top-0 inset-x-0 h-36 sm:h-48 lg:h-60 bg-gradient-to-b from-white via-white/85 to-transparent z-10 pointer-events-none"></div>

          {/* Bottom smooth feathered gradient to eliminate sharp transition into TRUSTED FOR A STRONGER INDIA */}
          <div className="absolute inset-x-0 bottom-0 h-36 sm:h-48 lg:h-60 bg-gradient-to-t from-white via-white/85 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Faint India Route Map Watermark on Left Background */}
        <div className="absolute left-8 lg:left-24 top-1/2 -translate-y-1/2 w-96 h-96 opacity-10 pointer-events-none hidden md:block z-10">
          <svg viewBox="0 0 200 240" fill="none" stroke="currentColor" className="w-full h-full text-orange-400">
            {/* Abstract Map Nodes and High-Speed Railway Corridors */}
            <path d="M100 20 L120 45 L135 70 L145 105 L155 130 L140 160 L125 190 L100 220 L80 190 L65 155 L55 120 L65 80 L80 45 Z" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="100" cy="65" r="3.5" fill="#EA580C" />
            <circle cx="75" cy="115" r="3.5" fill="#EA580C" />
            <circle cx="130" cy="120" r="3.5" fill="#EA580C" />
            <circle cx="105" cy="165" r="3.5" fill="#EA580C" />
            <line x1="100" y1="65" x2="75" y2="115" stroke="#EA580C" strokeWidth="1.5" opacity="0.6" />
            <line x1="100" y1="65" x2="130" y2="120" stroke="#EA580C" strokeWidth="1.5" opacity="0.6" />
            <line x1="75" y1="115" x2="105" y2="165" stroke="#EA580C" strokeWidth="1.5" opacity="0.6" />
            <line x1="130" y1="120" x2="105" y2="165" stroke="#EA580C" strokeWidth="1.5" opacity="0.6" />
          </svg>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 sm:py-36 lg:py-44 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* Eyebrow with Orange Accent Line */}
              <div className="flex items-center gap-3">
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#EA580C]">
                  OUR VISION
                </span>
                <span className="w-10 sm:w-14 h-0.5 bg-[#EA580C] rounded-full inline-block"></span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Railway Operations,<br />
                <span className="text-[#EA580C]">Reimagined</span> for Tomorrow.
              </h2>

              {/* Narrative Description */}
              <p className="text-sm sm:text-base text-slate-200/90 max-w-xl leading-relaxed font-normal">
                With intelligent planning, real-time coordination and AI-driven insights, RailGen enables a safer, more efficient and future-ready railway network for India.
              </p>

              {/* Action Button */}
              <div className="pt-2">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold rounded-xl shadow-lg shadow-orange-600/30 hover:shadow-orange-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all text-sm sm:text-base group"
                >
                  <span>Get Started Today</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Three Value Pillars (Safer, More Efficient, A More Connected India) */}
              <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-wrap sm:flex-nowrap items-center gap-6 sm:gap-8">
                {/* Pillar 1 */}
                <div className="flex items-center gap-3 min-w-[130px]">
                  <div className="p-2 rounded-lg bg-orange-500/15 border border-orange-500/30 text-[#EA580C] shrink-0">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none">
                      Safer
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">
                      For Every Journey
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-white/15 hidden sm:block"></div>

                {/* Pillar 2 */}
                <div className="flex items-center gap-3 min-w-[140px]">
                  <div className="p-2 rounded-lg bg-orange-500/15 border border-orange-500/30 text-[#EA580C] shrink-0">
                    <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none">
                      More Efficient
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">
                      With Smarter Planning
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-8 w-px bg-white/15 hidden sm:block"></div>

                {/* Pillar 3 */}
                <div className="flex items-center gap-3 min-w-[180px]">
                  <div className="p-2 rounded-lg bg-orange-500/15 border border-orange-500/30 text-[#EA580C] shrink-0">
                    <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-none">
                      A More Connected India
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-300 mt-1 font-medium">
                      For a Brighter Tomorrow
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hanging Digital Signboard & Station Pillar Architecture (matches image1) */}
            <div className="lg:col-span-5 xl:col-span-4 relative flex flex-col items-end justify-between min-h-[280px] lg:min-h-[400px] pointer-events-none">
              
              {/* Hanging Overhead Digital Display Monitor */}
              <div className="relative pointer-events-auto mr-0 sm:mr-4 mt-2">
                {/* Ceiling Mount Brackets */}
                <div className="flex justify-around px-8 -mb-1 relative z-0">
                  <div className="w-1.5 h-6 bg-slate-700 rounded-t border-t border-slate-500 shadow-sm"></div>
                  <div className="w-1.5 h-6 bg-slate-700 rounded-t border-t border-slate-500 shadow-sm"></div>
                </div>

                {/* Digital LED Screen Frame */}
                <div className="bg-[#0c1524]/95 backdrop-blur-md border-2 border-slate-700/80 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/80 max-w-[280px] sm:max-w-[320px] relative z-10">
                  {/* Subtle Screen Bevel Glare */}
                  <div className="absolute top-1 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                  
                  {/* Digital Board Text */}
                  <div className="text-left space-y-0.5 mb-3">
                    <div className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                      A More
                    </div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight text-[#EA580C] leading-tight">
                      Connected
                    </div>
                    <div className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
                      India
                    </div>
                  </div>

                  {/* Indian Tricolor Wave Ribbon */}
                  <div className="pt-2">
                    <svg viewBox="0 0 160 30" fill="none" className="w-full h-7 overflow-visible">
                      {/* Saffron Arc */}
                      <path 
                        d="M 5 18 Q 80 0, 155 10" 
                        stroke="#FF9933" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                      />
                      {/* White Arc */}
                      <path 
                        d="M 12 21 Q 80 4, 150 14" 
                        stroke="#FFFFFF" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                      />
                      {/* India Green Arc */}
                      <path 
                        d="M 19 24 Q 80 8, 145 18" 
                        stroke="#138808" 
                        strokeWidth="3.5" 
                        strokeLinecap="round" 
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Station Pillar Vertical Typography (matches image1 right pillar text) */}
              <div className="mt-8 lg:mt-auto pr-2 text-right hidden sm:block">
                <div className="text-[10px] sm:text-xs font-black tracking-[0.25em] text-white/50 uppercase leading-relaxed font-mono-rail">
                  <div>PEOPLE</div>
                  <div>TRACKS</div>
                  <div>PROGRESS</div>
                  <div>A STRONGER</div>
                  <div className="text-white/80 font-bold">INDIA</div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* TRUSTED FOR A STRONGER INDIA Section (matches exact image reference) */}
      <section id="impact" className="py-16 sm:py-20 lg:py-24 px-6 lg:px-12 bg-white relative overflow-hidden">
        {/* Subtle Train Watermark on Right */}
        <div className="absolute right-0 inset-y-0 w-1/3 overflow-hidden pointer-events-none opacity-20 hidden md:block">
          <img 
            src={trainImg} 
            alt="" 
            className="w-full h-full object-cover object-left filter saturate-50 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Eyebrow Header with Orange Flanking Lines */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12">
            <span className="w-8 sm:w-16 h-0.5 bg-[#EA580C] rounded-full inline-block"></span>
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em] text-[#EA580C]">
              TRUSTED FOR A STRONGER INDIA
            </span>
            <span className="w-8 sm:w-16 h-0.5 bg-[#EA580C] rounded-full inline-block"></span>
          </div>

          {/* 4 Trust Pillars Grid with Vertical Dividers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200/80">
            
            {/* Pillar 1: For a Safer India (State Emblem of India) */}
            <div className="py-4 sm:py-2 px-4 lg:px-6 flex items-center justify-start sm:justify-center gap-4">
              <img 
                src={emblemImg} 
                alt="State Emblem of India" 
                className="h-12 sm:h-14 w-auto object-contain shrink-0 filter drop-shadow-sm" 
              />
              <div className="text-left">
                <div className="text-sm sm:text-base font-extrabold text-[#0B2447] leading-snug">
                  For a Safer
                </div>
                <div className="text-sm sm:text-base font-extrabold text-[#0B2447] leading-snug">
                  India
                </div>
              </div>
            </div>

            {/* Pillar 2: For a Greener Tomorrow (Green Leaf) */}
            <div className="py-4 sm:py-2 px-4 lg:px-6 flex items-center justify-start sm:justify-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" fill="none" className="w-10 h-10">
                  <path d="M6 30 C6 30, 8 20, 16 12 C24 4, 32 3, 32 3 C32 3, 31 11, 23 19 C15 27, 6 30, 6 30 Z" fill="#16A34A" />
                  <path d="M6 30 C12 23, 20 15, 31 4" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
                  <path d="M14 20 C18 20, 22 18, 22 18" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
                  <path d="M19 14 C23 14, 26 12, 26 12" stroke="white" strokeWidth="1.4" strokeLinecap="round" opacity="0.75" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm sm:text-base font-extrabold text-[#0B2447] leading-snug">
                  For a Greener
                </div>
                <div className="text-sm sm:text-base font-extrabold text-[#0B2447] leading-snug">
                  Tomorrow
                </div>
              </div>
            </div>

            {/* Pillar 3: For Millions of Passengers */}
            <div className="py-4 sm:py-2 px-4 lg:px-6 flex items-center justify-start sm:justify-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" fill="none" className="w-11 h-11 text-[#0B2447]">
                  {/* Left person silhouette */}
                  <circle cx="9" cy="12" r="3.8" fill="currentColor" opacity="0.85" />
                  <path d="M2.5 25 C2.5 20, 6 18, 9 18 C12 18, 15.5 20, 15.5 25 Z" fill="currentColor" opacity="0.85" />
                  {/* Right person silhouette */}
                  <circle cx="27" cy="12" r="3.8" fill="currentColor" opacity="0.85" />
                  <path d="M20.5 25 C20.5 20, 24 18, 27 18 C30 18, 33.5 20, 33.5 25 Z" fill="currentColor" opacity="0.85" />
                  {/* Center front passenger */}
                  <circle cx="18" cy="14" r="4.5" fill="currentColor" />
                  <path d="M9.5 28 C9.5 22, 13.5 20, 18 20 C22.5 20, 26.5 22, 26.5 28 Z" fill="currentColor" />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm sm:text-base font-extrabold text-[#0B2447] leading-snug">
                  For Millions
                </div>
                <div className="text-sm sm:text-base font-extrabold text-[#0B2447] leading-snug">
                  of Passengers
                </div>
              </div>
            </div>

            {/* Pillar 4: For More Efficient Operations (Industrial Gear) */}
            <div className="py-4 sm:py-2 px-4 lg:px-6 flex items-center justify-start sm:justify-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 36 36" fill="none" className="w-10 h-10 text-[#0B2447]">
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M15 3.5 h6 l.9 3.6 a11 11 0 0 1 3 1.7 l3.6 -1.5 l4.2 4.2 l-1.5 3.6 a11 11 0 0 1 1.7 3 l3.6 .9 v6 l-3.6 .9 a11 11 0 0 1 -1.7 3 l1.5 3.6 l-4.2 4.2 l-3.6 -1.5 a11 11 0 0 1 -3 1.7 l-.9 3.6 h-6 l-.9 -3.6 a11 11 0 0 1 -3 -1.7 l-3.6 1.5 l-4.2 -4.2 l1.5 -3.6 a11 11 0 0 1 -1.7 -3 l-3.6 -.9 v-6 l3.6 -.9 a11 11 0 0 1 1.7 -3 l-1.5 -3.6 l4.2 -4.2 l3.6 1.5 a11 11 0 0 1 3 -1.7 Z M18 12.5 a5.5 5.5 0 1 0 0 11 a5.5 5.5 0 0 0 0 -11 Z" 
                    fill="currentColor" 
                  />
                </svg>
              </div>
              <div className="text-left">
                <div className="text-sm sm:text-base font-extrabold text-[#0B2447] leading-snug">
                  For More
                </div>
                <div className="text-sm sm:text-base font-extrabold text-[#0B2447] leading-snug">
                  Efficient Operations
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Official RailGen Footer (matches exact image reference) */}
      <footer className="mt-auto bg-[#07182E] text-white pt-14 pb-8 px-6 lg:px-12 relative overflow-hidden">
        {/* Twilight Train Watermark on Right */}
        <div className="absolute right-0 inset-y-0 w-1/2 lg:w-2/5 overflow-hidden pointer-events-none opacity-25">
          <img 
            src={stationImg} 
            alt="" 
            className="w-full h-full object-cover object-right filter brightness-75 contrast-125 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07182E] via-[#07182E]/70 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12">
            
            {/* Left Column: Brand Logo and Description */}
            <div className="md:col-span-5 space-y-4">
              <Link to="/" className="inline-block">
                <img 
                  src={logoWhiteImg} 
                  alt="RailGen — Intelligent Railway Generation" 
                  className="h-11 sm:h-12 w-auto object-contain" 
                />
              </Link>
              <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-sm">
                An AI-powered platform for coordinated, conflict-free and efficient railway maintenance across India.
              </p>
            </div>

            {/* Middle Column: Quick Links */}
            <div className="md:col-span-4">
              <h3 className="text-sm font-bold text-white mb-4 tracking-tight">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs text-slate-300 font-medium">
                <div>
                  <a href="#" className="hover:text-[#EA580C] transition-colors block py-0.5">Home</a>
                </div>
                <div>
                  <button 
                    onClick={() => setShowHowItWorksModal(true)} 
                    className="hover:text-[#EA580C] transition-colors text-left block py-0.5 cursor-pointer"
                  >
                    How It Works
                  </button>
                </div>
                <div>
                  <a href="#solution" className="hover:text-[#EA580C] transition-colors block py-0.5">Platform</a>
                </div>
                <div>
                  <button 
                    onClick={() => setShowImpactModal(true)} 
                    className="hover:text-[#EA580C] transition-colors text-left block py-0.5 cursor-pointer"
                  >
                    Impact
                  </button>
                </div>
                <div>
                  <a href="#departments" className="hover:text-[#EA580C] transition-colors block py-0.5">Departments</a>
                </div>
                <div>
                  <a href="#vision" className="hover:text-[#EA580C] transition-colors block py-0.5">About</a>
                </div>
              </div>
            </div>

            {/* Right Column: Stay Connected */}
            <div className="md:col-span-3">
              <h3 className="text-sm font-bold text-white mb-4 tracking-tight">
                Stay Connected
              </h3>
              {/* 4 Social Icon Buttons */}
              <div className="flex items-center gap-2.5">
                {/* LinkedIn */}
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="LinkedIn"
                  className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-[#EA580C] border border-white/10 hover:border-[#EA580C] flex items-center justify-center text-white transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.66 1.66 0 1 0-.02-3.32 1.66 1.66 0 0 0 .02 3.32M7.86 18.5V10.13H5.07V18.5h2.79Z" />
                  </svg>
                </a>

                {/* X (Twitter) */}
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="X"
                  className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-[#EA580C] border border-white/10 hover:border-[#EA580C] flex items-center justify-center text-white transition-all hover:scale-105"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="YouTube"
                  className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-[#EA580C] border border-white/10 hover:border-[#EA580C] flex items-center justify-center text-white transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>

                {/* GitHub */}
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer" 
                  title="GitHub"
                  className="w-9 h-9 rounded-lg bg-white/[0.06] hover:bg-[#EA580C] border border-white/10 hover:border-[#EA580C] flex items-center justify-center text-white transition-all hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </a>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-4 leading-relaxed font-normal">
                Designed for Indian Railways. Built for a better tomorrow.
              </p>
            </div>

          </div>

          {/* Bottom Row: Copyright, Heart Tag, and Subtle India Silhouette */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 relative">
            <div>
              © 2025 RailGen. All rights reserved.
            </div>
            
            <div className="flex items-center gap-1.5 font-medium">
              <span>Made with</span>
              <span className="text-red-500 inline-block animate-pulse">❤️</span>
              <span>for a stronger, connected India.</span>
            </div>

            {/* Faint India Silhouette Map at Bottom Right */}
            <div className="absolute right-0 bottom-0 w-16 h-20 opacity-15 pointer-events-none hidden sm:block">
              <svg viewBox="0 0 200 240" fill="currentColor" className="w-full h-full text-slate-300">
                <path d="M100 20 L120 45 L135 70 L145 105 L155 130 L140 160 L125 190 L100 220 L80 190 L65 155 L55 120 L65 80 L80 45 Z" />
              </svg>
            </div>
          </div>

        </div>
      </footer>

      {/* Video / Interactive Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#FFF7ED] text-[#EA580C] flex items-center justify-center">
                  <Play className="w-4 h-4 fill-[#EA580C]" />
                </div>
                <h3 className="text-base font-bold text-[#0B2447]">RailGen Interactive Workflow Tour</h3>
              </div>
              <button 
                onClick={() => setShowDemoModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700 mb-6">
              <p>
                RailGen automatically synchronizes three departments around real train timetables:
              </p>
              <div className="p-3 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl space-y-2">
                <div><strong>1. Demand Ingestion:</strong> Civil (USFD crack), TRD (catenary hotspot), and S&T (point overhaul) log their needs.</div>
                <div><strong>2. AI Coordination:</strong> System finds the 01:30 - 05:00 hrs night window on the LDH-JUC line.</div>
                <div><strong>3. Conflict Clearance:</strong> Rajdhani and Shatabdi runs are audited with safety buffers.</div>
                <div><strong>4. DOM Publishing:</strong> Operating Manager approves the mega-block in 1 click.</div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  launchRoleDemo('manager');
                }}
                className="px-5 py-2 rounded-xl bg-[#EA580C] text-white font-bold text-xs hover:bg-[#C2410C]"
              >
                Launch Manager Dashboard Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* How RailGen Works Simple Popup */}
      {showHowItWorksModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative">
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] bg-[#FFF7ED] border border-[#FED7AA] px-2.5 py-0.5 rounded-full">
                  Simple Workflow
                </span>
                <h3 className="text-xl font-extrabold text-[#0B2447] mt-1.5">How RailGen Works</h3>
              </div>
              <button 
                onClick={() => setShowHowItWorksModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* 6 Steps List */}
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFF7ED] text-[#EA580C] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FED7AA]">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-[#0B2447] text-xs sm:text-sm">Submit Requests</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">Engineering, Traction & S&T submit maintenance requirements.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFF7ED] text-[#EA580C] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FED7AA]">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-[#0B2447] text-xs sm:text-sm">Connect Data</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">RailGen combines requests with train schedules, track and operational data.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFF7ED] text-[#EA580C] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FED7AA]">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-[#0B2447] text-xs sm:text-sm">AI Coordination</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">AI detects conflicts and identifies compatible maintenance work.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFF7ED] text-[#EA580C] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FED7AA]">
                  4
                </span>
                <div>
                  <h4 className="font-bold text-[#0B2447] text-xs sm:text-sm">Optimize Block</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">Generates the best time window and combines work into one block.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFF7ED] text-[#EA580C] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FED7AA]">
                  5
                </span>
                <div>
                  <h4 className="font-bold text-[#0B2447] text-xs sm:text-sm">Manager Approval</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">Manager reviews and approves the AI-recommended plan.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#FFF7ED] text-[#EA580C] font-bold text-xs flex items-center justify-center shrink-0 border border-[#FED7AA]">
                  6
                </span>
                <div>
                  <h4 className="font-bold text-[#0B2447] text-xs sm:text-sm">Execute</h4>
                  <p className="text-slate-600 mt-0.5 leading-relaxed">Approved schedule is shared with departments for coordinated execution.</p>
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-4 pt-3.5 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Bottom line</span>
              <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-xl py-2 px-3 flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-semibold text-[#0B2447]">
                <span className="text-slate-700">Separate Requests</span>
                <span className="text-[#EA580C] font-bold">→</span>
                <span className="text-[#EA580C] font-bold">AI Coordination</span>
                <span className="text-[#EA580C] font-bold">→</span>
                <span className="text-emerald-700 font-bold">One Optimized Block</span>
                <span className="text-[#EA580C] font-bold">→</span>
                <span className="text-indigo-700 font-bold">Smoother Operations</span>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowHowItWorksModal(false)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Platform Performance Simulation (Impact) Modal */}
      {showImpactModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-[#0B2447] text-white border border-white/15 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FFEDD5] bg-[#EA580C] px-3 py-1 rounded-full">
                  Platform Performance Simulation
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                  Measurable Efficiency for Indian Railways
                </h3>
              </div>
              <button 
                onClick={() => setShowImpactModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 mb-6 italic">
              *All figures shown below represent calculated demo simulation data on standard double-line electrified corridor models.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#F97316] font-mono-rail">-58%</span>
                <h4 className="text-[11px] font-bold text-slate-200 mt-1 uppercase tracking-wide">Fewer Separate Blocks</h4>
                <p className="text-[10px] text-slate-400 mt-1">Multi-department unification eliminates repetitive shutdowns.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono-rail">+38%</span>
                <h4 className="text-[11px] font-bold text-slate-200 mt-1 uppercase tracking-wide">Block Utilization</h4>
                <p className="text-[10px] text-slate-400 mt-1">Parallel work execution fills idle track window slots.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono-rail">+32%</span>
                <h4 className="text-[11px] font-bold text-slate-200 mt-1 uppercase tracking-wide">Corridor Throughput</h4>
                <p className="text-[10px] text-slate-400 mt-1">Freight trains routed with zero queueing delays.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <span className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono-rail">99.4%</span>
                <h4 className="text-[11px] font-bold text-slate-200 mt-1 uppercase tracking-wide">Premium Punctuality</h4>
                <p className="text-[10px] text-slate-400 mt-1">Zero conflicts to Rajdhani, Shatabdi & Vande Bharat.</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="text-xs text-slate-400">Indian Railways Operational Excellence</span>
              <button
                onClick={() => {
                  setShowImpactModal(false);
                  launchRoleDemo('manager');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
              >
                <span>Launch Operating Manager View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
