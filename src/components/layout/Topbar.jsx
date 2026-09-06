import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useRailGen } from '../../context/RailGenContext';
import { 
  Search, 
  Bell, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  Radio, 
  ChevronDown, 
  CheckCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import { DepartmentBadge } from '../common/DepartmentBadge';

export function Topbar() {
  const { currentUser, notifications, markAllNotificationsRead } = useRailGen();
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB') + ' IST');
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Breadcrumb generator
  const getBreadcrumbs = () => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts.length === 0) return ['Home'];
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).replace('-', ' '));
  };

  return (
    <header className="h-16 bg-white border-b border-[#D9E1EA] px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Left: Breadcrumbs & Search */}
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#667085]">
          <span className="font-semibold text-[#0B2447]">RailGen Ops</span>
          <span>/</span>
          {getBreadcrumbs().map((crumb, idx, arr) => (
            <React.Fragment key={crumb}>
              <span className={idx === arr.length - 1 ? "font-semibold text-[#142033]" : ""}>
                {crumb}
              </span>
              {idx < arr.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Railway Universal Search Bar */}
        <div className="relative w-64 md:w-80">
          <Search className="w-3.5 h-3.5 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search block ID, train #, section (e.g. LDH-JUC)..."
            className="w-full bg-[#F6F8FB] border border-[#D9E1EA] rounded text-xs pl-8 pr-3 py-1.5 focus:bg-white focus:outline-none focus:border-[#EA580C] text-[#142033]"
          />
        </div>
      </div>

      {/* Right: Operational Status, Clock & Notifications */}
      <div className="flex items-center gap-4">
        {/* Real-time System Clock */}
        <div className="hidden lg:flex items-center gap-2 bg-[#F6F8FB] border border-[#D9E1EA] px-3 py-1 rounded text-xs">
          <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
          <span className="font-mono-rail font-semibold text-[#142033]">{currentTime || '13:30:00 IST'}</span>
          <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping" title="COIS Live Telemetry Connected"></span>
        </div>

        {/* Division Indicator */}
        <div className="hidden md:block">
          <DepartmentBadge department={currentUser.department} />
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded hover:bg-slate-100 text-[#667085] relative"
            title="Operational Alerts"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#EA580C] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-84 bg-white border border-[#D9E1EA] rounded-lg shadow-xl z-50 p-3 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2">
                <span className="font-bold text-[#0B2447]">Operational Alerts ({notifications.length})</span>
                <button 
                  onClick={markAllNotificationsRead}
                  className="text-[11px] text-[#EA580C] hover:underline flex items-center gap-1 font-semibold"
                >
                  <CheckCheck className="w-3 h-3" /> Mark read
                </button>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {notifications.map((notif) => (
                  <div 
                    key={notif.id}
                    className={`p-2.5 rounded border transition-colors ${notif.unread ? 'bg-[#FFF7ED] border-[#FED7AA]' : 'bg-slate-50 border-slate-200'}`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-bold text-[#142033] leading-snug">{notif.title}</span>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">{notif.time}</span>
                    </div>
                    <p className="text-[11px] text-[#667085] leading-relaxed mb-1.5">{notif.message}</p>
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                      {notif.dept}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Info Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-[#D9E1EA]">
          <div className="w-8 h-8 rounded-full bg-[#0B2447] text-white flex items-center justify-center font-bold text-xs">
            {currentUser.avatar}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-[#142033] leading-tight">{currentUser.name}</p>
            <p className="text-[10px] text-[#667085] truncate max-w-[130px]">{currentUser.zone}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
