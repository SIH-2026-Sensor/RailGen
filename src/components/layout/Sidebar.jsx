import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useRailGen, DEMO_USERS } from '../../context/RailGenContext';
import logoImg from '../../assets/logo.png';
import logoWhiteImg from '../../assets/logo_white.png';
import trainImg from '../../assets/train.png';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  ShieldCheck, 
  ClipboardList, 
  Settings, 
  GitPullRequest, 
  Sparkles, 
  AlertTriangle, 
  CalendarDays, 
  CalendarRange, 
  FileText, 
  HardHat, 
  Zap, 
  Radio, 
  ChevronLeft, 
  ChevronRight, 
  LogOut, 
  Train, 
  SlidersHorizontal,
  Compass,
  CheckCircle2,
  Search,
  Wrench,
  BarChart2,
  X
} from 'lucide-react';

export function Sidebar({ isMobileOpen = false, onCloseMobile }) {
  const { currentUser } = useRailGen();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const currentDept = location.pathname.startsWith('/engineering') 
    ? 'engineering' 
    : location.pathname.startsWith('/admin') 
    ? 'admin' 
    : location.pathname.startsWith('/traction') 
    ? 'traction' 
    : location.pathname.startsWith('/signal') 
    ? 'signal' 
    : location.pathname.startsWith('/manager') 
    ? 'manager' 
    : currentUser.department?.toLowerCase();

  const isAdmin = currentDept === 'admin';
  const isManager = currentDept === 'manager';
  const isEngineering = currentDept === 'engineering' || currentDept === 'civil';
  const isTraction = currentDept === 'traction' || currentDept === 'trd';
  const isSignal = currentDept === 'signal' || currentDept === 'signal & telecom' || currentDept === 's&t';
  const isModernDesk = isAdmin || isManager || isEngineering || isTraction || isSignal;

  const deskUser = isSignal
    ? { name: 'Dr. Priya Raghavan', role: 'Signal & Telecom (DSTE)', avatar: 'PR' }
    : isTraction
    ? { name: 'Gurpreet Singh', role: 'Traction (TRD)', avatar: 'GS' }
    : isEngineering 
    ? { name: 'Suresh Chandra P-Way', role: 'Sr. DEN (Civil)', avatar: 'SC' }
    : isAdmin 
    ? { name: 'Vikramaditya Rao', role: 'PCOM (Admin)', avatar: 'VR' }
    : currentUser;

  // Define nav links per role
  const getNavLinks = () => {
    switch (currentDept) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
          { name: 'User Management', path: '/admin/users', icon: Users },
          { name: 'Departments', path: '/admin/departments', icon: Building2 },
          { name: 'Access Controls', path: '/admin/roles', icon: ShieldCheck },
          { name: 'Audit Logs', path: '/admin/audit', icon: ClipboardList },
        ];
      case 'manager':
        return [
          { name: 'Dashboard', path: '/manager', icon: LayoutDashboard },
          { name: 'Approve', path: '/manager/approvals', icon: CheckCircle2, badge: '5' },
          { name: 'Maintenance', path: '/manager/maintenance', icon: SlidersHorizontal },
          { name: 'Block Schedule', path: '/manager/block-schedule', icon: CalendarDays },
        ];
      case 'engineering':
      case 'civil':
        return [
          { name: 'Dashboard', path: '/engineering', icon: LayoutDashboard },
          { name: 'Track Inspection', path: '/engineering/inspection', icon: Search },
          { name: 'Block Requests', path: '/engineering/requests', icon: FileText, badge: '3' },
          { name: 'Maintenance', path: '/engineering/maintenance', icon: Wrench },
          { name: 'Reports', path: '/engineering/reports', icon: BarChart2 },
        ];
      case 'traction':
      case 'trd':
        return [
          { name: 'Dashboard', path: '/traction', icon: LayoutDashboard },
          { name: 'Power Monitoring', path: '/traction/monitoring', icon: Zap },
          { name: 'Faults & Alerts', path: '/traction/faults', icon: AlertTriangle, badge: '2', badgeColor: 'bg-red-500 text-white' },
          { name: 'Block Requests', path: '/traction/requests', icon: CalendarDays },
          { name: 'Maintenance', path: '/traction/maintenance', icon: Wrench },
        ];
      case 'signal & telecom':
      case 'signal':
      case 's&t':
        return [
          { name: 'Dashboard', path: '/signal-telecom', icon: LayoutDashboard },
          { name: 'Fault Monitoring', path: '/signal-telecom/faults', icon: AlertTriangle },
          { name: 'Block Requests', path: '/signal-telecom/requests', icon: CalendarDays },
          { name: 'Equipment Status', path: '/signal-telecom/equipment', icon: Radio },
          { name: 'Reports', path: '/signal-telecom/reports', icon: BarChart2 },
        ];
      case 'manager':
      default:
        return [
          { name: 'Corridor Overview', path: '/manager', icon: LayoutDashboard },
          { name: 'Corridor Requests', path: '/manager/requests', icon: GitPullRequest, badge: '6 pending' },
          { name: 'AI Recommended Blocks', path: '/manager/ai-recommendations', icon: Sparkles, badge: 'AI Ready' },
          { name: 'What-If Simulation', path: '/manager/what-if', icon: SlidersHorizontal },
          { name: 'Safety Conflict Audit', path: '/manager/conflicts', icon: AlertTriangle, badge: '4 flagged' },
          { name: 'Weekly Corridor Plan', path: '/manager/weekly-plan', icon: CalendarDays },
          { name: 'Monthly Block Schedule', path: '/manager/monthly-plan', icon: CalendarRange }
        ];
    }
  };

  const navLinks = getNavLinks();

  const renderNavContent = (isDrawer = false) => (
    <>
      {/* Brand Header */}
      <div>
        <div className="h-16 px-3 flex items-center justify-between border-b border-[#EA580C]/20">
          {(!collapsed || isDrawer) ? (
            <div className="flex items-center px-1">
              <img 
                src={logoWhiteImg} 
                alt="RailGen — Intelligent Railway Generation" 
                className="h-10 w-auto object-contain" 
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 mx-auto" title="RailGen">
              <img 
                src={logoWhiteImg} 
                alt="RailGen" 
                className="h-7 w-auto object-contain" 
              />
            </div>
          )}

          {isDrawer ? (
            <button 
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 shrink-0 cursor-pointer"
              title="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-white/10 shrink-0 ml-1 cursor-pointer"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          )}
        </div>

        <div className="h-2"></div>

        {/* Navigation items */}
        <nav className="p-3 space-y-1.5">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            const activeBg = isSignal ? 'bg-[#2563EB]' : 'bg-[#EA580C]';

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (isDrawer && onCloseMobile) onCloseMobile();
                }}
                className={({ isActive }) => `
                  flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all
                  ${isActive 
                    ? `${activeBg} text-white font-semibold shadow-sm` 
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'}
                `}
                title={(!isDrawer && collapsed) ? item.name : undefined}
              >
                <Icon className="w-4 h-4 shrink-0 text-slate-200" />
                {(!collapsed || isDrawer) && (
                  <span className="flex-1 truncate">{item.name}</span>
                )}
                {(!collapsed || isDrawer) && item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${item.badgeColor || 'bg-white/15 text-white'}`}>
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile, Watermark & Exit to Home */}
      <div>
        {/* Modern Train Watermark & Slogan matching Image 2 */}
        {isModernDesk && (!collapsed || isDrawer) && (
          <div className="px-4 pt-4 pb-2 relative border-t border-white/10">
            <div className="relative mb-2 overflow-hidden">
              <img 
                src={trainImg} 
                alt="Indian Railways" 
                className="w-full h-16 object-contain object-left opacity-30 filter contrast-125 pointer-events-none select-none" 
              />
            </div>
            <p className="text-[11px] font-medium text-slate-300 leading-snug">
              {isSignal ? (
                <>
                  Safer Networks<br />
                  Stronger India
                </>
              ) : isTraction ? (
                <>
                  Reliable Power<br />
                  For a Moving India
                </>
              ) : isEngineering ? (
                <>
                  Safer Tracks<br />
                  Stronger India
                </>
              ) : (
                'Building a Smarter, Safer Railway for India'
              )}
            </p>
            <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] border border-white/20 mt-2"></div>
          </div>
        )}

        <div className="p-3 border-t border-white/10 bg-[#071A33]/60">
          {(!collapsed || isDrawer) && (
            <div className="mb-2 px-2 py-1.5 flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full ${(isTraction || isSignal) ? 'bg-white text-[#0B2447]' : 'bg-[#EA580C] text-white'} flex items-center justify-center text-xs font-bold shrink-0 shadow-xs`}>
                {deskUser.avatar}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">{deskUser.name}</p>
                <p className="text-[10px] text-slate-300 truncate">{deskUser.role}</p>
              </div>
            </div>
          )}

          <NavLink
            to="/login"
            onClick={() => {
              if (isDrawer && onCloseMobile) onCloseMobile();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded text-xs text-slate-400 hover:text-white hover:bg-white/10 w-full transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {(!collapsed || isDrawer) && <span>Logout</span>}
          </NavLink>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Drawer (visible on screens < 1024px) */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileOpen ? 'visible opacity-100' : 'invisible opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
        <aside 
          className={`fixed inset-y-0 left-0 w-72 bg-[#0B2447] text-slate-100 flex flex-col justify-between transition-transform duration-300 ease-out border-r border-[#071A33] shadow-2xl z-10 select-none ${
            isMobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {renderNavContent(true)}
        </aside>
      </div>

      {/* Desktop Sidebar (visible on screens >= 1024px) */}
      <aside 
        className={`${
          collapsed ? 'w-20' : 'w-64'
        } bg-[#0B2447] text-slate-100 hidden lg:flex flex-col justify-between transition-all duration-200 border-r border-[#071A33] select-none shrink-0 min-h-screen sticky top-0`}
      >
        {renderNavContent(false)}
      </aside>
    </>
  );
}
