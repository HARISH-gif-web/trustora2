import React, { useState } from 'react';
import { Bell, Menu, UserCheck, Shield, ChevronDown } from 'lucide-react';
import { TrustoraLogo } from './TrustoraLogo';
import { UserProfile, UserRole } from '../types';

interface HeaderNavProps {
  user: UserProfile;
  onOpenMenu: () => void;
  onNavigateHome: () => void;
  onSelectCity?: (city: string) => void;
  onToggleOnline?: (isOnline: boolean) => void;
  onSwitchRole: (role: UserRole) => void;
  notificationCount?: number;
  onOpenNotifications?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  user,
  onOpenMenu,
  onNavigateHome,
  onSelectCity,
  onToggleOnline,
  onSwitchRole,
  notificationCount = 3,
  onOpenNotifications
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Logo */}
        <div
          onClick={onNavigateHome}
          className="cursor-pointer flex items-center gap-2 group select-none shrink-0"
        >
          <TrustoraLogo size="md" />
        </div>



        {/* Right Action Cluster */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Provider Online/Offline Toggle (Screen 10 in wireframe) */}
          {user.role === 'provider' && (
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
              <button
                onClick={() => onToggleOnline && onToggleOnline(!user.isOnline)}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                  user.isOnline ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                    user.isOnline ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className="text-xs font-bold text-slate-800 hidden xs:inline">
                {user.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          )}

          {/* Quick Role Switcher Pill for reviewer demonstration */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              title="Switch user perspective"
            >
              <span className="font-semibold text-teal-700">
                {user.name || (user.role === 'provider' ? 'Provider' : user.role === 'admin' ? 'Admin' : 'Seeker')}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-50">
                <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase">
                  Switch Persona
                </div>
                <button
                  onClick={() => {
                    onSwitchRole('seeker');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center gap-2 ${
                    user.role === 'seeker' ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                  <span>Service Seeker</span>
                </button>
                <button
                  onClick={() => {
                    onSwitchRole('provider');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center gap-2 ${
                    user.role === 'provider' ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Service Provider</span>
                </button>
                <button
                  onClick={() => {
                    onSwitchRole('admin');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs flex items-center gap-2 ${
                    user.role === 'admin' ? 'bg-teal-50 text-teal-700 font-bold' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  <span>Admin & AI Hub</span>
                </button>
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-rose-500 rounded-full ring-2 ring-white">
                {notificationCount}
              </span>
            )}
          </button>

          {/* 3-line Hamburger Menu Button (Screen 4 & 5 in wireframe) */}
          <button
            onClick={onOpenMenu}
            className="p-2 rounded-lg text-slate-800 hover:text-teal-700 hover:bg-teal-50 transition-colors border border-slate-200/80 active:scale-95"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
