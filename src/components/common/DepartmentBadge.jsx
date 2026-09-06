import React from 'react';
import { HardHat, Zap, Radio, ShieldCheck, UserCheck } from 'lucide-react';

export function DepartmentBadge({ department, className = '' }) {
  let style = 'bg-slate-100 text-slate-800 border-slate-200';
  let Icon = HardHat;

  switch (department?.toLowerCase()) {
    case 'engineering':
    case 'civil':
      style = 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]';
      Icon = HardHat;
      break;
    case 'traction':
    case 'trd':
      style = 'bg-[#EAF8EF] text-[#15803D] border-[#BBF7D0]';
      Icon = Zap;
      break;
    case 'signal & telecom':
    case 'signal':
    case 's&t':
      style = 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]';
      Icon = Radio;
      break;
    case 'admin':
      style = 'bg-slate-100 text-[#334155] border-slate-300';
      Icon = ShieldCheck;
      break;
    case 'manager':
    case 'operating':
      style = 'bg-[#FFF6E5] text-[#D97706] border-[#FDE68A]';
      Icon = UserCheck;
      break;
    default:
      style = 'bg-slate-100 text-slate-700 border-slate-200';
      Icon = HardHat;
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-xs font-semibold border ${style} ${className}`}>
      <Icon className="w-3.5 h-3.5" />
      <span>{department}</span>
    </span>
  );
}
