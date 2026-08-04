import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  GraduationCap,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentUser,
    userRole,
    setUserRole,
    isFocusMode,
    setIsFocusMode,
    setIsCommandPaletteOpen,
    setIsOnboardingOpen,
    notifications,
  } = useApp();

  const [darkMode, setDarkMode] = React.useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const college = currentUser.collegeName || 'Atria Institute of Technology, Bengaluru';
  const branch = currentUser.branch || 'Information Science & Engineering (ISE)';
  const semName = currentUser.semesterName || '5th Semester';
  const sec = currentUser.section || 'Section B';
  const scheme = currentUser.scheme || '2022 Scheme (CBCS)';

  return (
    <header className="h-11 bg-white/90 dark:bg-[#08080a]/90 backdrop-blur-md border-b border-slate-200 dark:border-white/[0.06] sticky top-0 z-30 px-4 flex items-center justify-between select-none">
      {/* Left: Interactive Student Academic Profile Badge */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsOnboardingOpen(true)}
          title="Click to edit student academic profile"
          className="flex items-center space-x-2 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800/80 hover:bg-slate-200 dark:hover:bg-zinc-700/80 border border-slate-200 dark:border-zinc-700 transition-all text-xs font-semibold text-slate-800 dark:text-zinc-200"
        >
          <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
          <span className="truncate max-w-[200px] sm:max-w-xs">
            {college.split(' ')[0]} • {branch.split(' ')[0]} {semName} ({sec})
          </span>
          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
            {scheme.split(' ')[0]}
          </span>
        </button>
      </div>

      {/* Center: Command Palette Trigger */}
      <div className="hidden md:flex items-center flex-1 max-w-sm mx-4">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full px-3 py-1 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700/60 text-xs text-slate-400 dark:text-zinc-400 flex items-center justify-between hover:border-indigo-500/40 transition-all shadow-2xs"
        >
          <span className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search or type command...</span>
          </span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-white dark:bg-zinc-900 rounded border border-slate-200 dark:border-zinc-700 text-slate-400">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2">
        {/* Role Persona Switcher */}
        <div className="flex items-center p-0.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-[11px] font-bold">
          {(['student', 'professor', 'admin'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setUserRole(r)}
              className={`px-2 py-0.5 rounded-md capitalize transition-all ${
                userRole === r
                  ? 'bg-white dark:bg-zinc-700 text-slate-900 dark:text-white shadow-2xs'
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Focus Mode Toggle */}
        <button
          onClick={() => setIsFocusMode(!isFocusMode)}
          className={`p-1.5 rounded-lg text-xs transition-colors ${
            isFocusMode
              ? 'bg-indigo-600 text-white'
              : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
          title="Focus Mode (⌘F)"
        >
          {isFocusMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-1.5 rounded-lg text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
          title="Toggle Dark Mode"
        >
          {darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Notification Icon */}
        <div className="relative">
          <button className="p-1.5 rounded-lg text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors">
            <Bell className="w-3.5 h-3.5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
