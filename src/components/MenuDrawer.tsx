import React from 'react';
import {
  X,
  ChevronRight,
  Home,
  CalendarCheck,
  Heart,
  Wallet,
  Bell,
  User,
  Settings,
  HelpCircle,
  Share2,
  LogOut,
  Sparkles,
  Briefcase,
  DollarSign,
  Clock,
  Star,
  Activity,
  ShieldAlert
} from 'lucide-react';
import { UserProfile, ScreenName, UserRole } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onNavigate: (screen: ScreenName) => void;
  onLogout: () => void;
  onSwitchRole: (role: UserRole) => void;
  notificationCount?: number;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  user,
  onNavigate,
  onLogout,
  onSwitchRole,
  notificationCount = 3
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Slide-over Drawer panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xs sm:max-w-sm bg-white shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250">
          <div>
            {/* Drawer Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {user.role === 'provider' ? 'Provider Portal' : user.role === 'admin' ? 'Administration' : 'Seeker Menu'}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Profile Card (Screen 5) */}
            <div
              onClick={() => {
                onNavigate(user.role === 'provider' ? 'home_provider' : 'home_seeker');
                onClose();
              }}
              className="p-4 mx-4 my-3 bg-gradient-to-r from-teal-50 to-emerald-50/50 border border-teal-100/80 rounded-2xl flex items-center justify-between cursor-pointer hover:border-teal-200 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-teal-100 ring-2 ring-teal-500/30 shrink-0">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="truncate">
                  <div className="font-bold text-slate-900 text-sm group-hover:text-teal-700 transition">
                    {user.name || (user.role === 'provider' ? 'Service Partner' : 'Service Seeker')}
                  </div>
                  <div className="text-xs text-slate-500 truncate font-mono">
                    {user.phone || '+91 98765 00000'}
                  </div>
                  <span className="inline-block mt-1 text-[10px] font-semibold bg-white/80 px-2 py-0.5 rounded-full text-teal-700 border border-teal-200/50">
                    {user.role === 'provider' ? '✓ Verified Professional' : 'Service Seeker'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 transition group-hover:translate-x-0.5" />
            </div>

            {/* Role switch in drawer */}
            <div className="px-5 py-1 mb-2">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Quick Perspective
              </div>
              <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
                <button
                  onClick={() => {
                    onSwitchRole('seeker');
                    onClose();
                  }}
                  className={`py-1.5 rounded-lg text-center transition ${
                    user.role === 'seeker' ? 'bg-white text-teal-700 shadow-xs font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  Seeker
                </button>
                <button
                  onClick={() => {
                    onSwitchRole('provider');
                    onClose();
                  }}
                  className={`py-1.5 rounded-lg text-center transition ${
                    user.role === 'provider' ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  Provider
                </button>
                <button
                  onClick={() => {
                    onSwitchRole('admin');
                    onClose();
                  }}
                  className={`py-1.5 rounded-lg text-center transition ${
                    user.role === 'admin' ? 'bg-white text-purple-700 shadow-xs' : 'hover:text-slate-900'
                  }`}
                >
                  Admin
                </button>
              </div>
            </div>

            {/* Menu Items List */}
            <div className="px-3 py-1 space-y-0.5">
              {user.role === 'seeker' ? (
                <>
                  <button
                    onClick={() => {
                      onNavigate('home_seeker');
                      onClose();
                    }}
                    className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <Home className="w-4 h-4 text-slate-500" />
                    <span>Home</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('my_bookings');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <CalendarCheck className="w-4 h-4 text-slate-500" />
                      <span>My Bookings</span>
                    </div>
                    <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('saved_professionals');
                      onClose();
                    }}
                    className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <Heart className="w-4 h-4 text-slate-500" />
                    <span>Saved Professionals</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('wallet');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <Wallet className="w-4 h-4 text-slate-500" />
                      <span>My Wallet</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">₹350</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('my_bookings');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <Bell className="w-4 h-4 text-slate-500" />
                      <span>Notifications</span>
                    </div>
                    {notificationCount > 0 && (
                      <span className="text-xs font-bold text-white bg-rose-500 px-2 py-0.5 rounded-full">
                        {notificationCount}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('ai_evaluations');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-teal-900 bg-teal-50/70 hover:bg-teal-100/70 transition border border-teal-200/50"
                  >
                    <div className="flex items-center gap-3.5">
                      <Sparkles className="w-4 h-4 text-teal-600" />
                      <span className="font-semibold">AI Diagnostic & ML Hub</span>
                    </div>
                    <span className="text-[10px] font-mono bg-teal-600 text-white px-1.5 py-0.5 rounded font-bold">
                      RAG / ML
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('home_seeker');
                      onClose();
                    }}
                    className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>My Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('home_seeker');
                      onClose();
                    }}
                    className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('home_seeker');
                      onClose();
                    }}
                    className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                    <span>Help & Support</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('home_seeker');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <Share2 className="w-4 h-4 text-slate-500" />
                      <span>Refer & Earn</span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      Get ₹100
                    </span>
                  </button>
                </>
              ) : (
                <>
                  {/* Provider Menu */}
                  <button
                    onClick={() => {
                      onNavigate('home_provider');
                      onClose();
                    }}
                    className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <Home className="w-4 h-4 text-slate-500" />
                    <span>Provider Dashboard</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('home_provider');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <Briefcase className="w-4 h-4 text-slate-500" />
                      <span>My Jobs & Requests</span>
                    </div>
                    <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                      12 New
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('home_provider');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <DollarSign className="w-4 h-4 text-slate-500" />
                      <span>My Earnings & Payouts</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600">₹3,250</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('home_provider');
                      onClose();
                    }}
                    className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>My Availability</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('home_provider');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <div className="flex items-center gap-3.5">
                      <Star className="w-4 h-4 text-slate-500" />
                      <span>Customer Reviews</span>
                    </div>
                    <span className="text-xs font-bold text-amber-600">★ 4.8</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('ai_evaluations');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-teal-900 bg-teal-50 hover:bg-teal-100 transition border border-teal-200"
                  >
                    <div className="flex items-center gap-3.5">
                      <Activity className="w-4 h-4 text-teal-600" />
                      <span>AI Engineering & Metrics</span>
                    </div>
                    <span className="text-[10px] bg-teal-600 text-white px-1.5 py-0.5 rounded font-bold">
                      v2.4
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('admin_dashboard');
                      onClose();
                    }}
                    className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-purple-700 hover:bg-purple-50 transition"
                  >
                    <ShieldAlert className="w-4 h-4 text-purple-600" />
                    <span>Admin Operations</span>
                  </button>

                  <button
                    onClick={() => {
                      onNavigate('home_provider');
                      onClose();
                    }}
                    className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-slate-50 transition"
                  >
                    <HelpCircle className="w-4 h-4 text-slate-500" />
                    <span>Help & Support</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Drawer Footer with Logout (Screen 5) */}
          <div className="p-4 border-t border-slate-100 bg-slate-50/50">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-rose-600 hover:bg-rose-50 font-semibold text-sm transition"
            >
              <LogOut className="w-5 h-5 text-rose-600" />
              <span>Logout</span>
            </button>
            <div className="mt-2 text-center text-[10px] text-slate-400 font-mono">
              Trustora AI v2.4 • Trusted Help. Right Around You.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
