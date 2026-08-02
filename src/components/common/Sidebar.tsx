import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  LayoutDashboard,
  Bot,
  FileText,
  HelpCircle,
  CheckSquare,
  Calendar,
  BarChart2,
  Layers,
  MapPin,
  UserCheck,
  Briefcase,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import type { UserRole } from '../../types';

export const Sidebar: React.FC = () => {
  const { currentView, setCurrentView, userRole, assignments, isFocusMode } = useApp();

  const pendingAssignmentsCount = assignments.filter((a) => a.status !== 'completed').length;

  if (isFocusMode) {
    return null; // Hide sidebar during Focus Mode for distraction-free reading
  }

  const studentNavGroups = [
    {
      title: 'Academics',
      items: [
        { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'ai-chat', label: 'AI Assistant', icon: <Bot className="w-4 h-4" /> },
        { id: 'doc-intelligence', label: 'Doc Intelligence', icon: <FileText className="w-4 h-4" /> },
        { id: 'smart-notes', label: 'Smart Notes', icon: <BookOpen className="w-4 h-4" /> },
        { id: 'quiz', label: 'Quiz Generator', icon: <HelpCircle className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Management',
      items: [
        {
          id: 'assignments',
          label: 'Assignments',
          icon: <CheckSquare className="w-4 h-4" />,
          badge: pendingAssignmentsCount > 0 ? pendingAssignmentsCount : undefined,
        },
        { id: 'timetable', label: 'Smart Timetable', icon: <Calendar className="w-4 h-4" /> },
        { id: 'attendance', label: 'Attendance', icon: <BarChart2 className="w-4 h-4" /> },
        { id: 'study-planner', label: 'AI Study Planner', icon: <Layers className="w-4 h-4" /> },
        { id: 'campus-map', label: 'Campus Navigation', icon: <MapPin className="w-4 h-4" /> },
      ],
    },
    {
      title: 'Career & Faculty',
      items: [
        { id: 'professor', label: 'Professor Mode', icon: <UserCheck className="w-4 h-4" /> },
        { id: 'career', label: 'Career Assistant', icon: <Briefcase className="w-4 h-4" /> },
        { id: 'admin', label: 'Admin Portal', icon: <ShieldCheck className="w-4 h-4" /> },
      ],
    },
  ];

  const getNavGroups = (role: UserRole) => {
    if (role === 'professor') {
      return [
        {
          title: 'Faculty Suite',
          items: [
            { id: 'professor', label: 'Professor Mode', icon: <UserCheck className="w-4 h-4" /> },
            { id: 'doc-intelligence', label: 'Course Docs', icon: <FileText className="w-4 h-4" /> },
            { id: 'quiz', label: 'Quiz Creator', icon: <HelpCircle className="w-4 h-4" /> },
          ],
        },
        {
          title: 'Student Analytics',
          items: [
            { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'attendance', label: 'Attendance', icon: <BarChart2 className="w-4 h-4" /> },
            { id: 'admin', label: 'Broadcasts', icon: <ShieldCheck className="w-4 h-4" /> },
          ],
        },
      ];
    }

    if (role === 'admin') {
      return [
        {
          title: 'Registrar & Admin',
          items: [
            { id: 'admin', label: 'Admin Portal', icon: <ShieldCheck className="w-4 h-4" /> },
            { id: 'timetable', label: 'Timetable Manager', icon: <Calendar className="w-4 h-4" /> },
            { id: 'attendance', label: 'Attendance Records', icon: <BarChart2 className="w-4 h-4" /> },
          ],
        },
        {
          title: 'System Access',
          items: [
            { id: 'dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'ai-chat', label: 'AI Diagnostic', icon: <Bot className="w-4 h-4" /> },
          ],
        },
      ];
    }

    return studentNavGroups;
  };

  const navGroups = getNavGroups(userRole);

  return (
    <aside className="w-56 h-screen sticky top-0 hidden lg:flex flex-col bg-white dark:bg-[#09090b] border-r border-slate-200 dark:border-zinc-800 transition-all select-none">
      {/* Brand Header */}
      <div className="h-12 px-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
        <button
          onClick={() => setCurrentView('landing')}
          className="flex items-center space-x-2 text-slate-900 dark:text-white font-semibold text-xs hover:opacity-80 transition-opacity"
        >
          <div className="w-6 h-6 rounded-md bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold tracking-tight">CampusCopilot</span>
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {navGroups.map((group) => (
          <div key={group.title}>
            <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
              {group.title}
            </div>
            <div className="space-y-0.5 mt-1">
              {group.items.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-semibold'
                        : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800/50 hover:text-slate-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className={isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-zinc-500'}>
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className="px-1.5 py-0.2 text-[10px] font-mono font-semibold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Workspace Footer */}
      <div className="p-3 border-t border-slate-200 dark:border-zinc-800 text-[11px] text-slate-400 dark:text-zinc-500 font-mono">
        <div className="flex items-center justify-between">
          <span>Spring 2026</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
            v2.5
          </span>
        </div>
      </div>
    </aside>
  );
};
