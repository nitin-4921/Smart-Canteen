import React, { useState } from 'react';
import { Utensils, UtensilsCrossed, ChefHat, BarChart3, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserRole } from '../types';

interface LoginViewProps {
  currentRole: UserRole;
  onLogin: (role: UserRole, email: string) => void;
}

const ROLE_PRESETS: {
  role: UserRole;
  label: string;
  subtitle: string;
  email: string;
  Icon: React.ComponentType<{ className?: string }>;
}[] = [
  {
    role: 'student',
    label: 'Student',
    subtitle: 'Pre-order & track tokens',
    email: 'aarav.kulkarni@campus.edu',
    Icon: UtensilsCrossed,
  },
  {
    role: 'kitchen',
    label: 'Kitchen Staff',
    subtitle: 'Manage KDS & batches',
    email: 'chef.vikram@smartcanteen.edu',
    Icon: ChefHat,
  },
  {
    role: 'admin',
    label: 'Admin',
    subtitle: 'Demand & slot analytics',
    email: 'meera.admin@smartcanteen.edu',
    Icon: BarChart3,
  },
];

export const LoginView: React.FC<LoginViewProps> = ({ currentRole, onLogin }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);
  const [email, setEmail] = useState<string>(
    ROLE_PRESETS.find((r) => r.role === currentRole)?.email ?? 'aarav.kulkarni@campus.edu'
  );
  const [password, setPassword] = useState<string>('••••••••••••');
  const [resetNotice, setResetNotice] = useState<boolean>(false);

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    const preset = ROLE_PRESETS.find((r) => r.role === role);
    if (preset) setEmail(preset.email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole, email);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-12 pb-20 md:pb-12">
      <div className="bg-white rounded-3xl card-elevation-2 overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Minimal Illustration & Branding */}
        <div className="md:col-span-5 bg-[#172554] text-white p-8 flex flex-col justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-10 h-10 rounded-xl bg-[#FF7A30] flex items-center justify-center">
                <Utensils className="w-5 h-5 text-white" />
              </span>
              <div>
                <p className="text-lg font-extrabold tracking-tight">SmartCanteen</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-300">
                  Order Smart. Skip the Queue.
                </p>
              </div>
            </div>

            <h1 className="mt-8 text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
              Campus dining built for zero noon wait.
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              Choose a prototype role to explore instant student ordering, live kitchen dispatching, or demand forecasting analytics.
            </p>
          </div>

          {/* Minimal Geometric Dining Illustration */}
          <div className="rounded-2xl bg-white/10 border border-white/15 p-4">
            <svg viewBox="0 0 280 120" className="w-full h-24" role="img" aria-label="SmartCanteen Fast-Pass Illustration">
              <rect x="8" y="18" width="90" height="84" rx="14" fill="#FFFFFF" opacity="0.14" />
              <text x="53" y="54" textAnchor="middle" fill="#FFB693" fontSize="10" fontWeight="700">TOKEN</text>
              <text x="53" y="76" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800">TK-142</text>
              <line x1="108" y1="60" x2="148" y2="60" stroke="#FF7A30" strokeWidth="3" strokeDasharray="5 4" />
              <circle cx="176" cy="60" r="24" fill="#10B981" />
              <path d="M167 60 L174 67 L187 52" stroke="#FFFFFF" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="214" y="28" width="56" height="64" rx="12" fill="#FF7A30" />
              <circle cx="242" cy="54" r="10" fill="#FFFFFF" />
              <rect x="228" y="72" width="28" height="6" rx="3" fill="#FFFFFF" />
            </svg>
          </div>
        </div>

        {/* Right Form & Role Selector */}
        <form onSubmit={handleSubmit} className="md:col-span-7 p-8 space-y-6">
          <div>
            <h2 className="text-xl font-extrabold text-[#172554]">Sign in to SmartCanteen</h2>
            <p className="text-xs text-[#64748B] mt-1">
              Select a role below or enter your campus credentials.
            </p>
          </div>

          {/* Role Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {ROLE_PRESETS.map(({ role, label, subtitle, Icon }) => {
              const active = selectedRole === role;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleSelectRole(role)}
                  className={`text-left rounded-xl p-3 border transition-all cursor-pointer ${
                    active
                      ? 'bg-[#FFF4EC] border-[#FF7A30] ring-1 ring-[#FF7A30]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${active ? 'text-[#FF7A30]' : 'text-[#64748B]'}`}
                  />
                  <p className="mt-2 text-xs font-extrabold text-[#172554]">{label}</p>
                  <p className="text-[10px] text-[#64748B] mt-0.5 leading-tight">{subtitle}</p>
                </button>
              );
            })}
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="login-email"
                className="block text-xs font-bold text-[#172554] mb-1.5"
              >
                Campus Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border-[1.5px] border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#172554] focus:outline-none focus:border-[#FF7A30] focus:ring-[3px] focus:ring-[#FF7A30]/15"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-bold text-[#172554]"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setResetNotice(true)}
                  className="text-xs font-semibold text-[#FF7A30] hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl border-[1.5px] border-[#E2E8F0] bg-[#F8FAFC] text-sm text-[#172554] focus:outline-none focus:border-[#FF7A30] focus:ring-[3px] focus:ring-[#FF7A30]/15"
              />
            </div>

            {resetNotice && (
              <p className="text-xs font-semibold text-[#047857] bg-[#ECFDF5] border border-[#10B981]/30 rounded-xl px-3.5 py-2.5 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Password reset link sent to {email} (prototype mode).
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-12 rounded-xl bg-[#FF7A30] hover:bg-[#EA661E] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <span>
              Continue as{' '}
              {ROLE_PRESETS.find((r) => r.role === selectedRole)?.label ?? 'Student'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
