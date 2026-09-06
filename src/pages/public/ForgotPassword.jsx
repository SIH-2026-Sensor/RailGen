import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Train, ArrowRight, CheckCircle2 } from 'lucide-react';

export function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false);
  const [employeeId, setEmployeeId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FB] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-[#D9E1EA] rounded-xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 mx-auto rounded-lg bg-white border border-[#D9E1EA] p-1.5 flex items-center justify-center mb-4 shadow-sm overflow-hidden">
          <img src="/logo.png" alt="RailGen Logo" className="w-full h-full object-contain" />
        </div>

        <h2 className="text-xl font-bold text-[#0B2447]">Reset Official Password</h2>
        <p className="text-xs text-[#667085] mt-1 mb-6">
          RailGen Indian Railways Central Authentication Recovery
        </p>

        {submitted ? (
          <div className="p-4 bg-[#EAF8EF] border border-[#BBF7D0] rounded-lg text-left">
            <div className="flex items-center gap-2 text-[#15803D] font-bold text-xs mb-1">
              <CheckCircle2 className="w-4 h-4" /> Password Reset Ticket Dispatched
            </div>
            <p className="text-xs text-[#142033] leading-relaxed">
              A temporary OTP link has been dispatched to the registered official railway email linked to employee ID <strong>{employeeId}</strong>.
            </p>
            <Link
              to="/login"
              className="mt-4 inline-block text-xs font-bold text-[#EA580C] hover:underline"
            >
              ← Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-[#142033] mb-1">
                Railway Employee ID or Official Email
              </label>
              <input
                type="text"
                required
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="e.g. EMP-NR-8402 or manager@railgen.demo"
                className="w-full bg-[#F6F8FB] border border-[#D9E1EA] rounded text-xs px-3 py-2 text-[#142033] focus:bg-white focus:outline-none focus:border-[#EA580C]"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold py-3 rounded-xl shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>Verify & Send Reset Link</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="text-xs font-medium text-[#667085] hover:text-[#EA580C]">
                Remembered credentials? Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
