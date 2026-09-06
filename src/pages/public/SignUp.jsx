import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Train, ArrowRight, ShieldCheck } from 'lucide-react';
import { useRailGen } from '../../context/RailGenContext';
import logoImg from '../../assets/logo.png';

export function SignUp() {
  const navigate = useNavigate();
  const { switchRole } = useRailGen();
  const [formData, setFormData] = useState({
    name: '',
    employeeId: '',
    email: '',
    phone: '',
    department: 'Engineering',
    role: 'Civil / P-Way Engineer',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const deptKey = formData.department === 'Traction' ? 'traction' :
                    formData.department === 'Signal & Telecom' ? 'signal' :
                    formData.department === 'Manager' ? 'manager' : 'engineering';
    switchRole(deptKey);
    navigate(`/${deptKey === 'signal' ? 'signal-telecom' : deptKey}`);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] py-12 px-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white border border-[#D9E1EA] rounded-xl p-8 shadow-sm">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#D9E1EA]">
          <Link to="/" className="shrink-0">
            <img src={logoImg} alt="RailGen Logo" className="h-10 w-auto object-contain" />
          </Link>
          <div>
            <h2 className="text-xl font-bold text-[#0B2447]">Register Official Railway Account</h2>
            <p className="text-xs text-[#667085]">RailGen Intelligent Maintenance & Block Planning Access</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#142033] mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Ramesh Kumar Verma"
                className="w-full bg-[#F6F8FB] border border-[#D9E1EA] rounded text-xs px-3 py-2 text-[#142033] focus:bg-white focus:outline-none focus:border-[#EA580C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#142033] mb-1">Railway Employee ID</label>
              <input
                type="text"
                required
                value={formData.employeeId}
                onChange={e => setFormData({ ...formData, employeeId: e.target.value })}
                placeholder="e.g. EMP-NR-8402"
                className="w-full bg-[#F6F8FB] border border-[#D9E1EA] rounded text-xs px-3 py-2 text-[#142033] focus:bg-white focus:outline-none focus:border-[#EA580C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#142033] mb-1">Official Railway Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="ramesh.verma@indianrailways.gov.in"
                className="w-full bg-[#F6F8FB] border border-[#D9E1EA] rounded text-xs px-3 py-2 text-[#142033] focus:bg-white focus:outline-none focus:border-[#EA580C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#142033] mb-1">Contact Phone</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full bg-[#F6F8FB] border border-[#D9E1EA] rounded text-xs px-3 py-2 text-[#142033] focus:bg-white focus:outline-none focus:border-[#EA580C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#142033] mb-1">Department</label>
              <select
                value={formData.department}
                onChange={e => setFormData({ ...formData, department: e.target.value })}
                className="w-full bg-[#F6F8FB] border border-[#D9E1EA] rounded text-xs px-3 py-2 text-[#142033] focus:bg-white focus:outline-none focus:border-[#EA580C]"
              >
                <option value="Engineering">Engineering / Civil (P-Way)</option>
                <option value="Traction">Traction (TRD / Electrical)</option>
                <option value="Signal & Telecom">Signal & Telecom (S&T)</option>
                <option value="Manager">Operating Manager (Sr. DOM)</option>
                <option value="Admin">Headquarters Admin</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#142033] mb-1">Designation / Role</label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Senior Section Engineer"
                className="w-full bg-[#F6F8FB] border border-[#D9E1EA] rounded text-xs px-3 py-2 text-[#142033] focus:bg-white focus:outline-none focus:border-[#EA580C]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#142033] mb-1">Password</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-[#F6F8FB] border border-[#D9E1EA] rounded text-xs px-3 py-2 text-[#142033] focus:bg-white focus:outline-none focus:border-[#EA580C]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#142033] mb-1">Confirm Password</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-[#F6F8FB] border border-[#D9E1EA] rounded text-xs px-3 py-2 text-[#142033] focus:bg-white focus:outline-none focus:border-[#EA580C]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 mt-4"
          >
            <span>Submit Registration for Divisional Approval</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-[#D9E1EA] text-center text-xs text-[#667085]">
          <span>Already registered? </span>
          <Link to="/login" className="font-bold text-[#EA580C] hover:underline">
            Sign In with Existing ID
          </Link>
        </div>
      </div>
    </div>
  );
}
