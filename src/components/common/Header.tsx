import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Sparkles,
  ChevronDown,
  GraduationCap,
  UserCheck,
  ShieldCheck,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { NotificationDrawer } from './NotificationDrawer';
import { ApiKeyModal } from './ApiKeyModal';
import type { UserRole } from '../../types';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    userRole,
    setUserRole,
    currentUser,
    darkMode,
    toggleDarkMode,
    isFocusMode,
    toggleFocusMode,
    setIsCommandPaletteOpen,
    setIsApiKeyModalOpen,
    setIsAuthModalOpen,
    geminiApiKey,
    notifications,
  } = useApp();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode }> = {
    student: {
      label: 'Student View',
      icon: <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />,
    },
    professor: {
      label: 'Professor View',
      icon: <UserCheck className="w-3.5 h-3.5 text-zinc-400" />,
    },
    admin: {
      label: 'Admin Portal',
      icon: <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />,
    },
  };

  return (
    <>
      <header className="sticky top-0 z-30 w-full h-11 bg-[#fafafa]/80 dark:bg-[#08080a]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.06] px-4 flex items-center justify-between transition-colors select-none">
        {/* Left Section: Mobile View Title & Command Search */}
        <div className="flex items-center space-x-3">
          {currentView !== 'landing' && (
            <button
              onClick={() => setCurrentView('landing')}
              className="lg:hidden flex items-center space-x-2 text-slate-900 dark:text-white font-semibold text-xs"
            >
              <div className="w-5 h-5 rounded bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900">
                <Sparkles className="w-3 h-3" />
              </div>
              <span className="font-semibold tracking-tight">CampusCopilot</span>
            </button>
          )}

          {/* Raycast Command Search */}
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="flex items-center space-x-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 text-slate-500 dark:text-zinc-400 text-xs transition-colors w-48 sm:w-64 md:w-80 text-left"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500 shrink-0" />
            <span className="text-xs font-normal truncate">Search actions...</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[10px] font-mono font-medium bg-white dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700 rounded shadow-2xs ml-auto">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Right Section: Focus Mode, Role Switcher, Theme & Actions */}
        <div className="flex items-center space-x-2">
          {/* Focus Mode Toggle */}
          <button
            onClick={toggleFocusMode}
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all border ${
              isFocusMode
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                : 'bg-slate-100 dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800'
            }`}
            title="Toggle Focus Mode (⌘F)"
          >
            {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[11px]">
              {isFocusMode ? 'Focus Active' : 'Focus Mode'}
            </span>
            <kbd className="hidden md:inline text-[9px] font-mono opacity-80">⌘F</kbd>
          </button>

          {/* Gemini API Status */}
          <button
            onClick={() => setIsApiKeyModalOpen(true)}
            className="flex items-center space-x-1.5 px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 transition-colors"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${geminiApiKey ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
            <span className="text-[11px] font-medium hidden sm:inline">
              {geminiApiKey ? 'Gemini 2.5' : 'API Key'}
            </span>
          </button>

          {/* Persona Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center space-x-2 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
            >
              {roleLabels[userRole].icon}
              <span className="hidden sm:inline font-medium text-[11px]">{roleLabels[userRole].label}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-44 rounded-lg bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 shadow-xl py-1 z-50">
                <div className="px-3 py-1 text-[10px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  Persona View
                </div>
                {(['student', 'professor', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setUserRole(r);
                      setIsRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center space-x-2 px-3 py-1.5 text-xs transition-colors ${
                      userRole === r
                        ? 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                    }`}
                  >
                    {roleLabels[r].icon}
                    <span className="text-[11px]">{roleLabels[r].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded-md text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-3.5 h-3.5 text-zinc-300" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-1.5 rounded-md text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            )}
          </button>

          {/* User Profile Avatar */}
          <div className="pl-1 border-l border-slate-200 dark:border-zinc-800">
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center space-x-2 p-0.5 rounded-md hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-5 h-5 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
              />
              <span className="hidden lg:inline text-[11px] font-medium text-slate-700 dark:text-zinc-300">
                {currentUser.name.split(' ')[0]}
              </span>
            </button>
          </div>
        </div>
      </header>

      <NotificationDrawer isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
      <ApiKeyModal />
    </>
  );
};
