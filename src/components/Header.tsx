import React, { useState } from 'react';
import {
  Utensils,
  Search,
  Bell,
  CheckCircle2,
  Home,
  UtensilsCrossed,
  Ticket,
  Monitor,
  ChefHat,
  BarChart3,
  LogIn,
  ChevronDown,
} from 'lucide-react';
import { AppPage, OrderTicket, UserRole } from '../types';

interface HeaderProps {
  activePage: AppPage;
  onNavigate: (page: AppPage) => void;
  userRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  liveOrdersCount: number;
  onTriggerSearchFocus: () => void;
  latestOrder?: OrderTicket;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  userRole,
  onSwitchRole,
  liveOrdersCount,
  onTriggerSearchFocus,
  latestOrder,
}) => {
  const [showNotif, setShowNotif] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const navItems: { id: AppPage; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    {
      id: 'orders',
      label: 'My Orders',
      badge: liveOrdersCount > 0 ? `${liveOrdersCount} Live` : undefined,
    },
    { id: 'kitchen', label: 'Kitchen' },
    { id: 'admin', label: 'Analytics' },
    { id: 'display', label: 'Live Display' },
  ];

  const profileMeta =
    userRole === 'kitchen'
      ? { initials: 'CV', name: 'Chef Vikram', sub: 'Kitchen Lead • Counter B' }
      : userRole === 'admin'
      ? { initials: 'DM', name: 'Dr. Meera', sub: 'Canteen Admin • North Quad' }
      : { initials: 'AK', name: 'Hey Aarav! 👋', sub: 'ID: #8492 • Hall A' };

  const mobileTabs: {
    id: AppPage;
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'menu', label: 'Menu', Icon: UtensilsCrossed },
    { id: 'orders', label: 'Orders', Icon: Ticket },
    { id: 'display', label: 'Queue', Icon: Monitor },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#172554] text-white border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left: Brand + Primary Links */}
          <div className="flex items-center gap-5 lg:gap-7 min-w-0">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2.5 text-left shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A30] rounded-lg"
            >
              <span className="w-9 h-9 rounded-xl bg-[#FF7A30] flex items-center justify-center shadow-sm shrink-0">
                <Utensils className="w-4 h-4 text-white" />
              </span>
              <span className="leading-tight">
                <span className="block text-[15px] font-extrabold tracking-tight text-white">
                  SmartCanteen
                </span>
                <span className="hidden sm:block text-[9px] font-bold uppercase tracking-[0.12em] text-slate-300">
                  CAMPUS DINING SAAS
                </span>
              </span>
            </button>

            <nav
              className="hidden md:flex items-center gap-1 lg:gap-1.5 overflow-x-auto no-scrollbar"
              aria-label="Primary Navigation"
            >
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs lg:text-[13px] font-semibold whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-white/15 text-white'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-extrabold tnum">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right: Search, Bell, Role Profile */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 relative">
            <button
              type="button"
              onClick={() => {
                onNavigate('home');
                onTriggerSearchFocus();
              }}
              aria-label="Search menu"
              className="w-9 h-9 rounded-full hover:bg-white/10 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setShowNotif((prev) => !prev);
                setShowRoleMenu(false);
              }}
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-full hover:bg-white/10 text-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF7A30]" />
            </button>

            {showNotif && (
              <div className="absolute right-0 top-12 w-72 rounded-2xl bg-white text-[#172554] p-4 card-elevation-2 z-50">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <span className="text-xs font-extrabold uppercase tracking-[0.04em]">
                    Kitchen Alerts
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowNotif(false)}
                    className="text-xs font-semibold text-[#64748B] hover:text-[#172554] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
                {latestOrder ? (
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotif(false);
                      onNavigate('orders');
                    }}
                    className="mt-3 w-full text-left flex items-start gap-2.5 p-2 rounded-xl hover:bg-[#F8FAFC] cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#172554]">
                        Token {latestOrder.token} •{' '}
                        {latestOrder.stage === 'ready'
                          ? 'Ready for Pickup'
                          : latestOrder.stage === 'preparing'
                          ? 'In Kitchen Prep'
                          : 'Confirmed'}
                      </p>
                      <p className="text-[11px] text-[#64748B] mt-0.5">
                        {latestOrder.counterName}
                      </p>
                    </div>
                  </button>
                ) : (
                  <p className="text-xs text-[#64748B] py-3">No active alerts.</p>
                )}
              </div>
            )}

            {/* Profile & Role Switcher */}
            <button
              type="button"
              onClick={() => {
                setShowRoleMenu((prev) => !prev);
                setShowNotif(false);
              }}
              className="flex items-center gap-2 pl-2.5 ml-1 border-l border-white/15 py-1 pr-1.5 rounded-r-xl hover:bg-white/5 cursor-pointer transition-colors"
            >
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF7A30] to-[#F59E0B] flex items-center justify-center text-xs font-extrabold text-white shrink-0">
                {profileMeta.initials}
              </span>
              <span className="hidden lg:block text-left leading-tight">
                <span className="block text-xs font-bold text-white whitespace-nowrap">
                  {profileMeta.name}
                </span>
                <span className="block text-[10px] text-slate-300 whitespace-nowrap tnum">
                  {profileMeta.sub}
                </span>
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-300 hidden sm:block" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 top-12 w-64 rounded-2xl bg-white text-[#172554] p-3 card-elevation-2 z-50 space-y-2">
                <p className="px-2 pt-1 text-[10px] font-extrabold uppercase tracking-[0.06em] text-[#64748B]">
                  Switch Prototype Role
                </p>

                <button
                  type="button"
                  onClick={() => {
                    onSwitchRole('student');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    userRole === 'student'
                      ? 'bg-[#172554] text-white'
                      : 'hover:bg-[#F8FAFC] text-[#172554]'
                  }`}
                >
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#FF7A30]" />
                  <span>Student (Aarav)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSwitchRole('kitchen');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    userRole === 'kitchen'
                      ? 'bg-[#172554] text-white'
                      : 'hover:bg-[#F8FAFC] text-[#172554]'
                  }`}
                >
                  <ChefHat className="w-3.5 h-3.5 text-[#FF7A30]" />
                  <span>Kitchen Staff (KDS)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSwitchRole('admin');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                    userRole === 'admin'
                      ? 'bg-[#172554] text-white'
                      : 'hover:bg-[#F8FAFC] text-[#172554]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-[#FF7A30]" />
                  <span>Administrator</span>
                </button>

                <div className="pt-2 border-t border-[#E2E8F0]">
                  <button
                    type="button"
                    onClick={() => {
                      onNavigate('login');
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#E2E8F0]/70 text-xs font-bold text-[#172554] cursor-pointer"
                  >
                    <LogIn className="w-3.5 h-3.5 text-[#FF7A30]" />
                    <span>Open Login / Role Page</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E8F0] sticky-drawer-shadow"
      >
        <div className="grid grid-cols-4 h-14">
          {mobileTabs.map(({ id, label, Icon }) => {
            const active = activePage === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                className={`flex flex-col items-center justify-center gap-0.5 text-[11px] font-bold cursor-pointer ${
                  active ? 'text-[#FF7A30]' : 'text-[#64748B]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
