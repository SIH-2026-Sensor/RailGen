import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import logoWhiteImg from '../../assets/logo_white.png';
import { Menu } from 'lucide-react';

export function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile navigation drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isCustomHeader = 
    location.pathname.startsWith('/admin') || 
    location.pathname.startsWith('/manager') ||
    location.pathname.startsWith('/engineering') ||
    location.pathname.startsWith('/traction') ||
    location.pathname.startsWith('/signal');

  const getDeptTitle = () => {
    if (location.pathname.startsWith('/admin')) return 'Admin Desk';
    if (location.pathname.startsWith('/manager')) return 'Operating Manager';
    if (location.pathname.startsWith('/engineering')) return 'Engineering Civil';
    if (location.pathname.startsWith('/traction')) return 'Traction TRD';
    if (location.pathname.startsWith('/signal')) return 'Signal & Telecom';
    return 'Operations Desk';
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex flex-col lg:flex-row">
      {/* Mobile Top Header (only visible on mobile & tablet viewports < 1024px) */}
      <header className="lg:hidden sticky top-0 z-30 bg-[#0B2447] border-b border-[#071A33] px-4 py-3 flex items-center justify-between text-white shadow-md select-none">
        <div className="flex items-center gap-2.5">
          <img 
            src={logoWhiteImg} 
            alt="RailGen" 
            className="h-7 w-auto object-contain" 
          />
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-slate-200 border border-white/10 tracking-wide">
            {getDeptTitle()}
          </span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center justify-center"
          title="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* Role-Specific Navigation Sidebar (Desktop sticky + Mobile slide-over drawer) */}
      <Sidebar 
        isMobileOpen={mobileOpen} 
        onCloseMobile={() => setMobileOpen(false)} 
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {!isCustomHeader && <Topbar />}
        
        <main className={`${isCustomHeader ? 'p-3.5 sm:p-6 lg:p-8' : 'p-3.5 sm:p-6'} flex-1 min-w-0`}>
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

