import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FolderTree,
  Bot,
  Library,
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
  Building2,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

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
    { id: 'atria-resources', label: 'Resources', icon: <Library className="w-4 h-4 text-cyan-400" /> },
    { id: 'attendance', label: 'Progress', icon: <BarChart2 className="w-4 h-4 text-rose-400" /> },
    { id: 'student-services', label: 'Services', icon: <Building2 className="w-4 h-4 text-amber-400" /> },
  ];

  // Secondary Tools (Hidden under Progressive Disclosure Drawer)
  const secondaryTools = [
    { id: 'profile', label: 'Academic Profile', icon: <GraduationCap className="w-4 h-4 text-indigo-400" /> },
    { id: 'smart-notes', label: 'Smart Notes', icon: <Bookmark className="w-4 h-4 text-amber-400" /> },
    { id: 'quiz', label: 'Quiz Generator', icon: <HelpCircle className="w-4 h-4 text-cyan-400" /> },
    { id: 'assignments', label: 'Assignments', icon: <CheckSquare className="w-4 h-4 text-rose-400" /> },
    { id: 'campus-map', label: 'Campus Map', icon: <MapPin className="w-4 h-4 text-indigo-400" /> },
    { id: 'career', label: 'Career Assistant', icon: <Briefcase className="w-4 h-4 text-amber-400" /> },
    { id: 'doc-intelligence', label: 'Doc Intelligence', icon: <Users className="w-4 h-4 text-cyan-400" /> },
    { id: 'professor', label: 'Professor Mode', icon: <UserCheck className="w-4 h-4 text-zinc-400" /> },
    { id: 'admin', label: 'System Admin', icon: <ShieldCheck className="w-4 h-4 text-zinc-400" /> },
  ];

  // Animation variants for collapsing focus mode
  const sidebarVariants: Variants = {
    expanded: { width: '14rem', transition: { type: 'spring' as const, stiffness: 300, damping: 25 } },
    collapsed: { width: '3.5rem', transition: { type: 'spring' as const, stiffness: 300, damping: 25 } },
  };

  if (isFocusMode) {
    return (
      <motion.aside
        initial="expanded"
        animate="collapsed"
        variants={sidebarVariants}
        className="bg-white dark:bg-[#08080a] border-r border-slate-200 dark:border-white/[0.06] flex flex-col items-center py-4 space-y-4 shrink-0 select-none overflow-hidden"
      >
        <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
        <div className="w-full px-2 space-y-1 flex flex-col items-center">
          {primaryDailyItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                title={item.label}
                className="relative p-2.5 rounded-xl transition-colors duration-200 cursor-pointer text-slate-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebarActivePillCollapsed"
                    className="absolute inset-0 bg-indigo-600/10 dark:bg-indigo-600/20 border border-indigo-600/30 rounded-xl pointer-events-none"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'text-indigo-600 dark:text-white' : ''}`}>
                  {item.icon}
                </span>
              </button>
            );
          })}
        </div>
      </motion.aside>
    );
  }

  return (
    <motion.aside
      initial="collapsed"
      animate="expanded"
      variants={sidebarVariants}
      className="bg-white dark:bg-[#08080a] border-r border-slate-200 dark:border-white/[0.06] flex flex-col h-screen sticky top-0 shrink-0 select-none z-20 overflow-hidden"
    >
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200 dark:border-white/[0.06] flex items-center space-x-2.5">
        <motion.div 
          whileHover={{ rotate: 180 }}
          className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md"
        >
          <Sparkles className="w-4.5 h-4.5" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-xs font-black tracking-wider uppercase text-slate-900 dark:text-white">
            CampusCopilot <span className="text-indigo-500">AI</span>
          </h1>
          <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">Atria Portal v2.5</p>
        </motion.div>
      </div>

      {/* Primary 8 Navigation Items */}
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
              className="relative w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl font-bold transition-colors duration-200 text-slate-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-white cursor-pointer"
            >
              {/* Sliding Indicator background element */}
              {isActive && (
                <motion.div
                  layoutId="sidebarActivePill"
                  className="absolute inset-0 bg-indigo-600/10 dark:bg-indigo-600/20 border border-indigo-600/20 rounded-xl pointer-events-none"
                  transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? 'text-indigo-600 dark:text-white' : ''}`}>
                {item.icon}
              </span>
              <span className={`relative z-10 truncate ${isActive ? 'text-indigo-600 dark:text-white font-black' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Collapsible Drawer section with smooth slide & height transitions */}
        <div className="pt-2 border-t border-slate-100 dark:border-zinc-800/80 mt-2">
          <button
            onClick={() => setShowMoreTools(!showMoreTools)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-400 dark:text-zinc-500 hover:text-slate-750 dark:hover:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors font-bold text-[11px] cursor-pointer"
          >
            <span>More Tools ({secondaryTools.length})</span>
            {showMoreTools ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <AnimatePresence initial={false}>
            {showMoreTools && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                className="space-y-0.5 mt-1 overflow-hidden pl-1"
              >
                {secondaryTools.map((tool) => {
                  const isActive = currentView === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => setCurrentView(tool.id)}
                      className="relative w-full flex items-center space-x-2 px-3 py-2 rounded-xl font-semibold transition-colors duration-200 text-slate-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-white cursor-pointer"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="sidebarActivePill"
                          className="absolute inset-0 bg-indigo-600/10 dark:bg-indigo-600/20 border border-indigo-600/20 rounded-xl pointer-events-none"
                          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                        />
                      )}
                      <span className={`relative z-10 ${isActive ? 'text-indigo-600 dark:text-white' : ''}`}>
                        {tool.icon}
                      </span>
                      <span className={`relative z-10 truncate ${isActive ? 'text-indigo-600 dark:text-white font-bold' : ''}`}>
                        {tool.label}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.aside>
  );
};
