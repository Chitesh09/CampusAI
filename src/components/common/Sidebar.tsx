import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FolderTree,
  Bot,
  FileText,
  BarChart2,
  GraduationCap,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CheckSquare,
  MapPin,
  Briefcase,
  UserCheck,
  ShieldCheck,
  Bookmark,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, isFocusMode } = useApp();
  const [showMoreTools, setShowMoreTools] = useState(false);

  // Exact 8 Daily Essential Student Items
  const primaryDailyItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4 text-indigo-500" /> },
    { id: 'subjects', label: 'Subjects', icon: <BookOpen className="w-4 h-4 text-indigo-400" /> },
    { id: 'timetable', label: 'Planner', icon: <Calendar className="w-4 h-4 text-purple-400" /> },
    { id: 'vtu-notes', label: 'Notes', icon: <FolderTree className="w-4 h-4 text-emerald-400" /> },
    { id: 'ai-chat', label: 'AI Tutor', icon: <Bot className="w-4 h-4 text-indigo-400" /> },
    { id: 'doc-intelligence', label: 'Resources', icon: <FileText className="w-4 h-4 text-cyan-400" /> },
    { id: 'attendance', label: 'Progress', icon: <BarChart2 className="w-4 h-4 text-rose-400" /> },
    { id: 'profile', label: 'Academic Profile', icon: <GraduationCap className="w-4 h-4 text-indigo-400" /> },
  ];

  // Secondary Tools (Hidden under Progressive Disclosure Drawer)
  const secondaryTools = [
    { id: 'smart-notes', label: 'Smart Notes', icon: <Bookmark className="w-4 h-4 text-amber-400" /> },
    { id: 'quiz', label: 'Quiz Generator', icon: <HelpCircle className="w-4 h-4 text-cyan-400" /> },
    { id: 'assignments', label: 'Assignments', icon: <CheckSquare className="w-4 h-4 text-rose-400" /> },
    { id: 'campus-map', label: 'Spatial Campus Map', icon: <MapPin className="w-4 h-4 text-indigo-400" /> },
    { id: 'career', label: 'Career Assistant', icon: <Briefcase className="w-4 h-4 text-amber-400" /> },
    { id: 'professor', label: 'Professor Mode', icon: <UserCheck className="w-4 h-4 text-zinc-400" /> },
    { id: 'admin', label: 'System Admin', icon: <ShieldCheck className="w-4 h-4 text-zinc-400" /> },
  ];

  if (isFocusMode) {
    return (
      <aside className="w-14 bg-white dark:bg-[#08080a] border-r border-slate-200 dark:border-white/[0.06] flex flex-col items-center py-4 space-y-4 shrink-0 transition-all select-none">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
        {primaryDailyItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            title={item.label}
            className={`p-2 rounded-xl transition-all ${
              currentView === item.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-500 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
            }`}
          >
            {item.icon}
          </button>
        ))}
      </aside>
    );
  }

  return (
    <aside className="w-56 bg-white dark:bg-[#08080a] border-r border-slate-200 dark:border-white/[0.06] flex flex-col h-screen sticky top-0 shrink-0 select-none z-20">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200 dark:border-white/[0.06] flex items-center space-x-2.5">
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md">
          <Sparkles className="w-4.5 h-4.5" />
        </div>
        <div>
          <h1 className="text-xs font-black tracking-wider uppercase text-slate-900 dark:text-white">
            CampusCopilot <span className="text-indigo-500">AI</span>
          </h1>
          <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">Student OS v2.5</p>
        </div>
      </div>

      {/* Primary 8 Essential Navigation Items */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1 text-xs">
        <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
          Daily Essentials
        </div>

        {primaryDailyItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl font-bold transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/80'
              }`}
            >
              <span>{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        {/* PROGRESSIVE DISCLOSURE COLLAPSIBLE DRAWER */}
        <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/80 mt-2">
          <button
            onClick={() => setShowMoreTools(!showMoreTools)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 dark:text-zinc-500 hover:text-slate-700 dark:hover:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800/50 transition-colors font-bold text-[11px]"
          >
            <span>More Tools ({secondaryTools.length})</span>
            {showMoreTools ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <AnimatePresence>
            {showMoreTools && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-0.5 mt-1 overflow-hidden pl-1"
              >
                {secondaryTools.map((tool) => {
                  const isActive = currentView === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setCurrentView(tool.id)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-xl font-semibold transition-all text-xs ${
                        isActive
                          ? 'bg-indigo-600 text-white shadow-sm font-bold'
                          : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800/60'
                      }`}
                    >
                      <span>{tool.icon}</span>
                      <span className="truncate">{tool.label}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </aside>
  );
};
