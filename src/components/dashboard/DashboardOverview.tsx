import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LivingAICore } from './LivingAICore';
import { AnimatedTimeline } from './AnimatedTimeline';
import { useCountUp } from '../../hooks/useCountUp';
import {
  BookOpen,
  Calendar,
  CheckSquare,
  BarChart2,
  AlertTriangle,
  ArrowRight,
  FileText,
  HelpCircle,
  Layers,
  Zap,
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { mockClasses } from '../../data/mockData';

export const DashboardOverview: React.FC = () => {
  const {
    currentUser,
    userRole,
    setCurrentView,
    assignments,
    attendanceRecords,
    setActiveChatPrompt,
  } = useApp();

  const [promptInput, setPromptInput] = useState('');

  const todayClasses = mockClasses.filter((c) => c.dayOfWeek === 'Monday');
  const pendingAssignments = assignments.filter((a) => a.status !== 'completed');
  const lowAttendance = attendanceRecords.filter((a) => a.percentage < 75);
  const overallAttendancePct =
    Math.round(
      (attendanceRecords.reduce((acc, curr) => acc + curr.percentage, 0) /
        attendanceRecords.length) *
        10
    ) / 10;

  // Upward Animated Counters
  const countTodayClasses = useCountUp(todayClasses.length, 800, 500);
  const countExamDays = useCountUp(14, 1000, 600);
  const countPendingTasks = useCountUp(pendingAssignments.length, 900, 700);
  const countAttendance = useCountUp(Math.round(overallAttendancePct), 1100, 800);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    setActiveChatPrompt(promptInput.trim());
    setCurrentView('ai-chat');
  };

  const quickPrompts = [
    'When is my DBMS exam?',
    'Where is Lab 5?',
    'Summarize Module 3',
    "Explain Dijkstra's Algorithm",
  ];

  // Dynamic Persona Memory Label
  const getPersonaMemoryLabel = () => {
    if (userRole === 'professor') {
      return 'Active Memory: Prof. Alan Turing • CS Dept Faculty • 3 Active Courses (DBMS, AI, OS)';
    }
    if (userRole === 'admin') {
      return 'Active Memory: Campus Registrar • System Admin Portal • Spring 2026 Master Timetable';
    }
    return `Active Memory: ${currentUser.name} • CS 6th Sem • DBMS CS601`;
  };

  // Framer Motion Staggered Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 350, damping: 25 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none"
    >
      {/* 1. LIVING AI CORE HERO */}
      <motion.div variants={itemVariants}>
        <LivingAICore />
      </motion.div>

      {/* 2. AI COMPANION PROMPT BAR */}
      <motion.div
        variants={itemVariants}
        className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-mono">
          <span className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>{getPersonaMemoryLabel()}</span>
          </span>
          <span className="text-[10px]">Gemini 2.5 Kernel</span>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder="Ask CampusCopilot anything... (e.g., When is my DBMS exam?)"
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            aria-label="Submit Search Query"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center space-x-1 min-h-[44px]"
          >
            <span>Ask</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 dark:text-zinc-500">Quick:</span>
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => {
                setActiveChatPrompt(prompt);
                setCurrentView('ai-chat');
              }}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors text-[11px] font-medium"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </motion.div>

      {/* 3. UNIQUE KPI METRICS WITH ANIMATED SVG SPARK LINES & CIRCULAR RINGS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Today's Lectures */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          onClick={() => setCurrentView('timetable')}
          className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm hover:border-indigo-500/50 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Today's Lectures</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {countTodayClasses}
            </p>
            <span className="text-[10px] font-mono text-emerald-500 font-bold">1 Active Now</span>
          </div>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold truncate">
            Next: CS601 in Hall 302 @ 09:00 AM
          </p>
        </motion.div>

        {/* Metric 2: DBMS Exam HUD with SVG Sparkline */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          onClick={() => setCurrentView('timetable')}
          className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm hover:border-purple-500/50 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">DBMS Midterm</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {countExamDays} Days
            </p>

            <svg className="w-16 h-6" viewBox="0 0 60 20">
              <path
                d="M 0 15 Q 15 5, 30 12 T 60 4"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                strokeDasharray="100"
                className="animate-[dash_1.5s_ease-out]"
              />
            </svg>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
            Aug 15 • Hall 1 • 100 Marks
          </p>
        </motion.div>

        {/* Metric 3: Pending Tasks */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          onClick={() => setCurrentView('assignments')}
          className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm hover:border-amber-500/50 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Tasks</span>
            <CheckSquare className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            {countPendingTasks}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold truncate">
            High Priority: B+ Tree due Aug 4
          </p>
        </motion.div>

        {/* Metric 4: Attendance Circular Progress Ring */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          onClick={() => setCurrentView('attendance')}
          className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm hover:border-emerald-500/50 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Attendance Radar</span>
            <BarChart2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {countAttendance}%
            </p>

            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 transform -rotate-90">
                <circle cx="16" cy="16" r="12" stroke="rgba(161, 161, 170, 0.2)" strokeWidth="3" fill="none" />
                <circle
                  cx="16"
                  cy="16"
                  r="12"
                  stroke="#10b981"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="75"
                  strokeDashoffset={75 - (75 * overallAttendancePct) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
            </div>
          </div>
          <p className="text-xs text-rose-500 font-bold flex items-center space-x-1">
            {lowAttendance.length > 0 && <AlertTriangle className="w-3.5 h-3.5" />}
            <span>{lowAttendance.length} subject below 75%</span>
          </p>
        </motion.div>
      </div>

      {/* 4. ANIMATED TIMELINE & QUICK WORKFLOWS */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Animated Milestone Timeline (7 cols) */}
        <div className="lg:col-span-7">
          <AnimatedTimeline />
        </div>

        {/* Quick Workflows & Warnings (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Quick Workflows
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setCurrentView('doc-intelligence')}
                aria-label="Upload PDF"
                className="p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold flex items-center space-x-2 transition-colors text-left min-h-[44px]"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Upload PDF</span>
              </button>
              <button
                onClick={() => setCurrentView('quiz')}
                aria-label="Generate Quiz"
                className="p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold flex items-center space-x-2 transition-colors text-left min-h-[44px]"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Generate Quiz</span>
              </button>
              <button
                onClick={() => setCurrentView('attendance')}
                aria-label="Safe Bunk Calculator"
                className="p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold flex items-center space-x-2 transition-colors text-left min-h-[44px]"
              >
                <BarChart2 className="w-4 h-4 text-slate-400" />
                <span>Safe Bunk Calc</span>
              </button>
              <button
                onClick={() => setCurrentView('study-planner')}
                aria-label="AI Study Plan"
                className="p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold flex items-center space-x-2 transition-colors text-left min-h-[44px]"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                <span>AI Study Plan</span>
              </button>
            </div>
          </div>

          {lowAttendance.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs space-y-1.5">
              <div className="flex items-center space-x-1.5 font-extrabold">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>ATTENDANCE WARNING</span>
              </div>
              <p className="text-xs">
                {lowAttendance[0].subject} is at <strong>{lowAttendance[0].percentage}%</strong> (Required: 75%).
              </p>
              <button
                onClick={() => setCurrentView('attendance')}
                className="mt-1 text-xs font-extrabold underline"
              >
                Open Safe Bunk Predictor →
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};
