import React from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldAlert, 
  Activity, 
  HelpCircle,
  Check
} from 'lucide-react';

export function StatusBadge({ status, size = 'sm', className = '' }) {
  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let Icon = Activity;

  switch (status?.toLowerCase()) {
    case 'critical':
    case 'urgent action':
    case 'rejected':
      bg = 'bg-[#FFF0F0] text-[#DC2626] border-[#FECACA]';
      Icon = ShieldAlert;
      break;
    case 'high':
    case 'warning':
    case 'action pending':
      bg = 'bg-[#FFF6E5] text-[#D97706] border-[#FDE68A]';
      Icon = AlertCircle;
      break;
    case 'medium':
    case 'under review':
    case 'submitted':
    case 'pending review':
      bg = 'bg-[#EAF4FF] text-[#1261A0] border-[#BAE6FD]';
      Icon = Clock;
      break;
    case 'approved':
    case 'scheduled':
    case 'approved & scheduled':
    case 'completed':
    case 'resolved':
    case 'success':
      bg = 'bg-[#EAF8EF] text-[#15803D] border-[#BBF7D0]';
      Icon = CheckCircle2;
      break;
    case 'ai analyzed':
    case 'ai recommended':
    case 'ai block requested':
      bg = 'bg-[#F5F3FF] text-[#7C3AED] border-[#DDD6FE]';
      Icon = Sparkles;
      break;
    case 'in progress':
    case 'gang assigned':
    case 'block queued':
      bg = 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]';
      Icon = Activity;
      break;
    default:
      bg = 'bg-slate-100 text-slate-700 border-slate-200';
      Icon = HelpCircle;
  }

  const sizeClass = size === 'xs' 
    ? 'text-[11px] px-2 py-0.5' 
    : size === 'md' 
    ? 'text-xs px-2.5 py-1' 
    : 'text-xs px-2 py-0.5';

  return (
    <span className={`inline-flex items-center gap-1.5 font-semibold rounded-[4px] border ${sizeClass} ${bg} ${className}`}>
      <Icon className={size === 'xs' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      <span>{status}</span>
    </span>
  );
}
