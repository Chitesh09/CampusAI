import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  CheckSquare,
  BarChart2,
  AlertTriangle,
  ArrowRight,
  FileText,
  HelpCircle,
  Layers,
  MapPin,
  Bot,
  Activity,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { mockClasses } from '../../data/mockData';

export const DashboardOverview: React.FC = () => {
  const {
    currentUser,
    setCurrentView,
    assignments,
    attendanceRecords,
    setActiveChatPrompt,
    setIsCommandPaletteOpen,
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

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none">
      {/* MISSION CONTROL HUD TOP BAR */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Academic Mission Control
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            </div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white">
              {currentUser.name} • {currentUser.department}
            </h1>
          </div>
        </div>

        {/* Quick Companion Launcher */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-medium text-xs border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors flex items-center space-x-1.5"
          >
            <kbd className="font-mono text-[10px]">⌘K</kbd>
            <span>Command Bar</span>
          </button>

          <button
            onClick={() => setCurrentView('ai-chat')}
            className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-sm"
          >
            <Bot className="w-4 h-4" />
            <span>Launch AI Companion</span>
          </button>
        </div>
      </motion.div>

      {/* AI COMPANION PROMPT HUD */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.05 }}
        className="p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-mono">
          <span className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Memory Active: CS 6th Sem • DBMS CS601 • OS CS603</span>
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
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-colors flex items-center space-x-1"
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
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors text-[11px] font-medium"
            >
              "{prompt}"
            </button>
          ))}
        </div>
      </motion.div>

      {/* 4 PRIMARY MISSION CONTROL KPI METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Next Lecture */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => setCurrentView('timetable')}
          className="p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-indigo-500/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Today's Lectures</span>
            <BookOpen className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 tabular-nums">
            {todayClasses.length}
          </p>
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1 truncate">
            Next: CS601 in Hall 302 @ 09:00 AM
          </p>
        </motion.div>

        {/* Metric 2: DBMS Exam HUD */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => setCurrentView('timetable')}
          className="p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-purple-500/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">DBMS Midterm</span>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 tabular-nums">
            14 Days
          </p>
          <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-1">
            Aug 15 • Hall 1 • 100 Marks
          </p>
        </motion.div>

        {/* Metric 3: Pending Tasks */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => setCurrentView('assignments')}
          className="p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-amber-500/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Pending Tasks</span>
            <CheckSquare className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 tabular-nums">
            {pendingAssignments.length}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1 truncate">
            High Priority: B+ Tree due Aug 4
          </p>
        </motion.div>

        {/* Metric 4: Attendance Radar */}
        <motion.div
          whileHover={{ y: -2 }}
          onClick={() => setCurrentView('attendance')}
          className="p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 shadow-sm hover:border-emerald-500/50 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">Attendance Radar</span>
            <BarChart2 className="w-4 h-4 text-slate-400" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2 tabular-nums">
            {overallAttendancePct}%
          </p>
          <p className="text-xs text-rose-500 font-bold mt-1 flex items-center space-x-1">
            {lowAttendance.length > 0 && <AlertTriangle className="w-3.5 h-3.5" />}
            <span>{lowAttendance.length} subject below 75%</span>
          </p>
        </motion.div>
      </div>

      {/* ADAPTIVE SCHEDULE TABLE & QUICK WORKFLOWS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Schedule Table (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Today's Schedule (Monday)
            </h2>
            <button
              onClick={() => setCurrentView('timetable')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Full Week →
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-zinc-800">
            {todayClasses.map((cls) => (
              <div key={cls.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 w-28">
                    {cls.startTime} - {cls.endTime}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {cls.subjectCode}: {cls.subjectName}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                      Prof. {cls.faculty}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentView('campus-map')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-bold flex items-center space-x-1 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{cls.room}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Workflows & Low Attendance Radar (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Quick Workflows
            </h2>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setCurrentView('doc-intelligence')}
                className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold flex items-center space-x-2 transition-colors text-left"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>Upload PDF</span>
              </button>
              <button
                onClick={() => setCurrentView('quiz')}
                className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold flex items-center space-x-2 transition-colors text-left"
              >
                <HelpCircle className="w-4 h-4 text-slate-400" />
                <span>Generate Quiz</span>
              </button>
              <button
                onClick={() => setCurrentView('attendance')}
                className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold flex items-center space-x-2 transition-colors text-left"
              >
                <BarChart2 className="w-4 h-4 text-slate-400" />
                <span>Safe Bunk Calc</span>
              </button>
              <button
                onClick={() => setCurrentView('study-planner')}
                className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold flex items-center space-x-2 transition-colors text-left"
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
      </div>
    </div>
  );
};
