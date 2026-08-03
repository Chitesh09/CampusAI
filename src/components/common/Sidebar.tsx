import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Bot,
  FileText,
  Bookmark,
  HelpCircle,
  CheckSquare,
  Calendar,
  BarChart2,
  Layers,
  MapPin,
  UserCheck,
  Briefcase,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  BookOpen,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, isFocusMode } = useApp();

  const navigationItems = [
    { id: 'dashboard', label: 'Mission Control', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'ai-chat', label: 'AI Activity Center', icon: <Bot className="w-4 h-4 text-indigo-400" /> },
    { id: 'subjects', label: 'Subjects Learning Hub', icon: <BookOpen className="w-4 h-4 text-indigo-500" /> },
    { id: 'study-planner', label: 'VTU Study Planner', icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { id: 'doc-intelligence', label: 'Doc Intelligence', icon: <FileText className="w-4 h-4 text-emerald-400" /> },
    { id: 'smart-notes', label: 'Smart Notes', icon: <Bookmark className="w-4 h-4 text-amber-400" /> },
    { id: 'quiz', label: 'Quiz Generator', icon: <HelpCircle className="w-4 h-4 text-cyan-400" /> },
    { id: 'assignments', label: 'Assignments', icon: <CheckSquare className="w-4 h-4 text-rose-400" /> },
    { id: 'timetable', label: 'Smart Timetable', icon: <Calendar className="w-4 h-4 text-blue-400" /> },
    { id: 'attendance', label: 'Attendance Radar', icon: <BarChart2 className="w-4 h-4 text-emerald-400" /> },
    { id: 'campus-map', label: 'Spatial Campus Map', icon: <MapPin className="w-4 h-4 text-indigo-400" /> },
    { id: 'career', label: 'Career Assistant', icon: <Briefcase className="w-4 h-4 text-amber-400" /> },
    { id: 'profile', label: 'Academic Profile', icon: <GraduationCap className="w-4 h-4 text-indigo-500" /> },
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
        {navigationItems.map((item) => (
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
          <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-mono">VTU OS v2.5</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-0.5 text-xs">
        <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
          Academic OS
        </div>
        {navigationItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl font-semibold transition-all ${
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
      </nav>
    </aside>
  );
};
