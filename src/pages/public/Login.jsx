import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRailGen, DEMO_USERS } from '../../context/RailGenContext';
import logoImg from '../../assets/logo_white.png';
import loginImg from '../../assets/login.png';
import { 
  Users, 
  HardHat, 
  Zap, 
  Radio, 
  UserCheck, 
  ShieldCheck, 
  BarChart3, 
  ArrowRight, 
  Lock, 
  Mail, 
  HelpCircle, 
  X, 
  Eye, 
  EyeOff, 
  AlertCircle 
} from 'lucide-react';

const ROLES_CONFIG = [
  {
    key: 'admin',
    title: 'Admin',
    designation: 'Principal Chief Operations Manager (PCOM)',
    description: 'Complete oversight and system control',
    dashboardPath: '/admin',
    defaultEmail: 'admin@railgen.demo',
    defaultId: 'EMP-ADM-001',
    defaultPassword: 'railgen-admin',
    icon: Users,
    cardBorder: 'border-orange-200/80 hover:border-orange-500',
    cardBg: 'from-[#FFF7ED]/70 via-white to-white',
    badgeBg: 'bg-[#FFF7ED]',
    badgeText: 'text-[#EA580C]',
    buttonClass: 'bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-md shadow-orange-500/25',
    buttonOutline: false
  },
  {
    key: 'engineering',
    title: 'Engineering',
    designation: 'Senior Divisional Engineer (Sr. DEN / Civil)',
    description: 'Track, bridge and civil maintenance',
    dashboardPath: '/engineering',
    defaultEmail: 'engineering@railgen.demo',
    defaultId: 'EMP-ENG-422',
    defaultPassword: 'railgen-civil',
    icon: HardHat,
    cardBorder: 'border-blue-200/80 hover:border-blue-500',
    cardBg: 'from-[#EFF6FF]/60 via-white to-white',
    badgeBg: 'bg-[#EFF6FF]',
    badgeText: 'text-[#2563EB]',
    buttonClass: 'bg-[#EFF6FF] hover:bg-[#DBEAFE] text-[#1D4ED8] border border-blue-200/70',
    buttonOutline: true
  },
  {
    key: 'traction',
    title: 'Traction',
    designation: 'Divisional Electrical Engineer (DEE / TRD)',
    description: 'OHE and power block management',
    dashboardPath: '/traction',
    defaultEmail: 'traction@railgen.demo',
    defaultId: 'EMP-TRD-309',
    defaultPassword: 'railgen-trd',
    icon: Zap,
    cardBorder: 'border-emerald-200/80 hover:border-emerald-500',
    cardBg: 'from-[#ECFDF5]/60 via-white to-white',
    badgeBg: 'bg-[#ECFDF5]',
    badgeText: 'text-[#16A34A]',
    buttonClass: 'bg-[#ECFDF5] hover:bg-[#D1FAE5] text-[#15803D] border border-emerald-200/70',
    buttonOutline: true
  },
  {
    key: 'signal',
    title: 'Signal & Telecom',
    designation: 'Senior Divisional Signal & Telecom Engineer (Sr. DSTE)',
    description: 'Signalling, telecom and integrated blocks',
    dashboardPath: '/signal-telecom',
    defaultEmail: 'signal@railgen.demo',
    defaultId: 'EMP-SNT-581',
    defaultPassword: 'railgen-signal',
    icon: Radio,
    cardBorder: 'border-purple-200/80 hover:border-purple-500',
    cardBg: 'from-[#FAF5FF]/60 via-white to-white',
    badgeBg: 'bg-[#FAF5FF]',
    badgeText: 'text-[#9333EA]',
    buttonClass: 'bg-[#FAF5FF] hover:bg-[#F3E8FF] text-[#7E22CE] border border-purple-200/70',
    buttonOutline: true
  },
  {
    key: 'manager',
    title: 'Operating Manager',
    designation: 'Senior Divisional Operations Manager (Sr. DOM)',
    description: 'Real-time view and approvals',
    dashboardPath: '/manager',
    defaultEmail: 'manager@railgen.demo',
    defaultId: 'EMP-MGR-104',
    defaultPassword: 'railgen-manager',
    icon: UserCheck,
    cardBorder: 'border-sky-200/80 hover:border-sky-500',
    cardBg: 'from-[#F0F9FF]/60 via-white to-white',
    badgeBg: 'bg-[#F0F9FF]',
    badgeText: 'text-[#0284C7]',
    buttonClass: 'bg-[#F0F9FF] hover:bg-[#E0F2FE] text-[#0284C7] border border-sky-200/70',
    buttonOutline: true
  }
];

export function Login() {
  const { switchRole } = useRailGen();
  const navigate = useNavigate();

  // Selected Role for ID & Password Authentication Modal
  const [activeModalRole, setActiveModalRole] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Open credentials modal for a specific role
  const handleOpenLoginModal = (role) => {
    setActiveModalRole(role);
    setEmailInput(role.defaultEmail);
    setPasswordInput(role.defaultPassword);
    setShowPassword(false);
  };

  // Authenticate and redirect strictly to that role's dashboard
  const handleRoleAuthSubmit = (e) => {
    e.preventDefault();
    if (!activeModalRole) return;

    setIsSubmitting(true);
    setTimeout(() => {
      switchRole(activeModalRole.key);
      navigate(activeModalRole.dashboardPath);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col lg:flex-row overflow-x-hidden font-sans selection:bg-[#EA580C] selection:text-white">
      
      {/* Left Visual Hero Side (matches Image 1 with login.png) */}
      <div className="lg:w-[52%] xl:w-[50%] relative min-h-[560px] lg:min-h-screen text-white flex flex-col justify-between p-6 sm:p-10 lg:p-14 overflow-hidden">
        {/* Background Image: login.png (Sunset Train Corridor over viaduct) */}
        <div className="absolute inset-0 z-0">
          <img 
            src={loginImg} 
            alt="Indian Railways Modern Corridor" 
            className="w-full h-full object-cover object-center filter contrast-105 brightness-95" 
          />
          {/* Dark Twilight Gradient Scrim on Left to guarantee high text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030B18]/95 via-[#030B18]/80 to-transparent lg:w-[75%]"></div>
          {/* Subtle Vertical Lighting Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030B18]/80 via-transparent to-[#030B18]/40 pointer-events-none"></div>
        </div>

        {/* Top Header Row on Left Panel */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link to="/" className="inline-block" title="Back to Home">
            <img 
              src={logoImg} 
              alt="RailGen — Intelligent Railway Generation" 
              className="h-10 sm:h-12 w-auto object-contain" 
            />
          </Link>
          
          <div className="text-xs text-slate-300/80 font-medium tracking-wide flex items-center gap-2">
            <span>Indian Railways</span>
            <span className="text-white/30">|</span>
            <span>Smarter Planning</span>
            <span className="text-white/30">|</span>
            <span>Safer Journeys</span>
          </div>
        </div>

        {/* Center Main Text Content on Left Panel */}
        <div className="relative z-10 max-w-lg my-auto py-8">
          {/* Eyebrow */}
          <div className="text-xs font-extrabold uppercase tracking-widest text-slate-300 mb-3">
            OPERATIONAL CONTROL CENTER
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.14]">
            One Platform.<br />
            <span className="text-[#EA580C]">Five Teams.</span><br />
            A Stronger Network.
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-200/90 mt-4 leading-relaxed font-normal">
            Role-based access for seamless collaboration across Engineering, Traction, Signal & Telecom, Operations and Administration.
          </p>

          {/* 3 Pillars in a row */}
          <div className="mt-8 flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-orange-500/15 border border-orange-500/30 text-[#EA580C] shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white leading-none">Safer</h5>
                <p className="text-[11px] text-slate-300 mt-0.5">Operations</p>
              </div>
            </div>

            <div className="h-7 w-px bg-white/15 hidden sm:block"></div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-orange-500/15 border border-orange-500/30 text-[#EA580C] shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white leading-none">Higher</h5>
                <p className="text-[11px] text-slate-300 mt-0.5">Efficiency</p>
              </div>
            </div>

            <div className="h-7 w-px bg-white/15 hidden sm:block"></div>

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-orange-500/15 border border-orange-500/30 text-[#EA580C] shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-xs sm:text-sm font-bold text-white leading-none">A Connected</h5>
                <p className="text-[11px] text-slate-300 mt-0.5">India</p>
              </div>
            </div>
          </div>

        </div>

        {/* Left Bottom Footer */}
        <div className="relative z-10 pt-4 flex items-center justify-between text-xs text-white/50">
          <span>© 2025 RailGen. Built for Indian Railways.</span>
        </div>

        {/* Environmental Pillar Typography & Tricolor Arc on the viaduct background */}
        <div className="hidden lg:block absolute right-8 top-1/3 -translate-y-1/2 text-right pointer-events-none">
          <div className="text-[10px] font-black tracking-[0.25em] text-white/50 uppercase leading-relaxed font-mono-rail">
            <div>CONNECTING</div>
            <div>CITIES</div>
            <div>EMPOWERING</div>
            <div className="text-white/80 font-bold">INDIA</div>
          </div>
          {/* Tricolor Ribbon Bar */}
          <div className="w-12 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full ml-auto mt-2 opacity-80"></div>
        </div>
      </div>

      {/* Right Login Hub Side (matches Image 1 with 5 Role Boxes) */}
      <div className="lg:w-[48%] xl:w-[50%] bg-[#F8FAFC] flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        
        {/* Subtle Architectural Watermark at Bottom Right */}
        <div className="absolute right-0 bottom-0 w-80 h-80 opacity-[0.06] pointer-events-none hidden sm:block">
          <svg viewBox="0 0 200 200" fill="none" stroke="currentColor" className="w-full h-full text-slate-900">
            <rect x="20" y="80" width="160" height="100" rx="4" strokeWidth="2" />
            <path d="M 20 80 L 100 20 L 180 80 Z" strokeWidth="2" />
            <circle cx="100" cy="55" r="14" strokeWidth="2" />
            <line x1="45" y1="80" x2="45" y2="180" strokeWidth="1.5" />
            <line x1="75" y1="80" x2="75" y2="180" strokeWidth="1.5" />
            <line x1="125" y1="80" x2="125" y2="180" strokeWidth="1.5" />
            <line x1="155" y1="80" x2="155" y2="180" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto w-full">
          {/* Top Initiative Badge */}
          <div className="flex items-center justify-end gap-2 text-xs font-semibold text-slate-500 mb-6">
            <span>A Digital India Initiative</span>
            <div className="w-8 h-1 bg-gradient-to-r from-[#FF9933] via-white to-[#138808] rounded-full border border-slate-200"></div>
          </div>

          {/* Header */}
          <div className="mb-8">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-500">
              WELCOME TO RAILGEN
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2447] tracking-tight mt-1 mb-1.5">
              Login to Your Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-normal">
              Select your role to access the respective dashboard.
            </p>
          </div>

          {/* 5 Role Cards Layout (matches Image 1: Row 1 has 3 cards, Row 2 has 2 cards) */}
          <div className="space-y-4">
            
            {/* Row 1: 3 Cards (Admin, Engineering, Traction) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {ROLES_CONFIG.slice(0, 3).map((role) => {
                const IconComponent = role.icon;
                return (
                  <div 
                    key={role.key}
                    className={`bg-gradient-to-b ${role.cardBg} rounded-2xl p-5 border ${role.cardBorder} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center group`}
                  >
                    {/* Role Icon Circle */}
                    <div className={`w-12 h-12 rounded-full ${role.badgeBg} ${role.badgeText} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Role Title */}
                    <h3 className="text-base font-extrabold text-[#0B2447] mb-1">
                      {role.title}
                    </h3>

                    {/* Role Description */}
                    <p className="text-xs text-slate-500 leading-snug mb-4 min-h-[32px] flex items-center justify-center font-normal">
                      {role.description}
                    </p>

                    {/* Login Button: Triggers specific ID & Password auth */}
                    <button
                      type="button"
                      onClick={() => handleOpenLoginModal(role)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto ${role.buttonClass}`}
                    >
                      <span>Login</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Row 2: 2 Cards (Signal & Telecom, Operating Manager) - Centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              {ROLES_CONFIG.slice(3, 5).map((role) => {
                const IconComponent = role.icon;
                return (
                  <div 
                    key={role.key}
                    className={`bg-gradient-to-b ${role.cardBg} rounded-2xl p-5 border ${role.cardBorder} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col items-center text-center group`}
                  >
                    {/* Role Icon Circle */}
                    <div className={`w-12 h-12 rounded-full ${role.badgeBg} ${role.badgeText} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-inner`}>
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Role Title */}
                    <h3 className="text-base font-extrabold text-[#0B2447] mb-1">
                      {role.title}
                    </h3>

                    {/* Role Description */}
                    <p className="text-xs text-slate-500 leading-snug mb-4 min-h-[32px] flex items-center justify-center font-normal">
                      {role.description}
                    </p>

                    {/* Login Button */}
                    <button
                      type="button"
                      onClick={() => handleOpenLoginModal(role)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-auto ${role.buttonClass}`}
                    >
                      <span>Login</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Need Access Help Line */}
          <div className="mt-8 flex items-center justify-center sm:justify-start gap-1.5 text-xs text-slate-400">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Need access? Contact your system administrator.</span>
          </div>
        </div>

        {/* Right Bottom Footer Row (matches Image 1) */}
        <div className="relative z-10 pt-8 mt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            Built for Indian Railways. For a Stronger India.
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="font-semibold text-slate-600">Viksit Bharat</span>
              <span className="text-[10px] text-slate-400 block -mt-0.5">via Smarter Railways</span>
            </div>
            <div className="w-6 h-1 bg-[#EA580C] rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Role-Specific ID & Password Login Modal (Redirects ONLY to selected dashboard) */}
      {activeModalRole && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
            
            {/* Modal Header with Department Theme */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl ${activeModalRole.badgeBg} ${activeModalRole.badgeText} flex items-center justify-center shrink-0`}>
                  {React.createElement(activeModalRole.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] bg-[#FFF7ED] px-2.5 py-0.5 rounded-full border border-[#FED7AA]">
                    Official Portal Login
                  </span>
                  <h3 className="text-lg font-extrabold text-[#0B2447] mt-1">
                    {activeModalRole.title} Login
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {activeModalRole.designation}
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setActiveModalRole(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>



            {/* ID and Password Form */}
            <form onSubmit={handleRoleAuthSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0B2447] mb-1.5">
                  Official Employee ID or Railway Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="e.g. employee@railgen.demo"
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl text-xs pl-10 pr-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-[#EA580C] focus:bg-white transition-all font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-[#0B2447]">Password</label>
                  <Link to="/forgot-password" className="text-[11px] text-[#EA580C] hover:underline font-semibold">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl text-xs pl-10 pr-10 py-2.5 text-slate-900 focus:outline-none focus:border-[#EA580C] focus:bg-white transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#EA580C] focus:ring-[#EA580C]"
                  />
                  <span>Remember railway workstation</span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModalRole(null)}
                  className="w-1/3 py-2.5 px-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 py-2.5 px-4 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In to {activeModalRole.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>


          </div>
        </div>
      )}

    </div>
  );
}

