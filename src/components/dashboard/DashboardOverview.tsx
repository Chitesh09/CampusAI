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
  PlayCircle,
  FileCode,
  Clock,
  Sparkles,
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
    activeCurriculum,
  } = useApp();

  const [promptInput, setPromptInput] = useState('');

  const college = currentUser.collegeName || 'BMS College of Engineering';
  const branch = currentUser.branch || 'Computer Science & Engineering (CSE)';
  const semName = currentUser.semesterName || '6th Semester';
  const sec = currentUser.section || 'Section B';
  const scheme = currentUser.scheme || '2022 Scheme (CBCS)';
  const userName = currentUser.name ? currentUser.name.split(' ')[0] : 'Chithu';

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
  const countExamDays = useCountUp(10, 1000, 600); // 10 Days to 1st IA
  const countPendingTasks = useCountUp(pendingAssignments.length, 900, 700);
  const countAttendance = useCountUp(Math.round(overallAttendancePct), 1100, 800);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    setActiveChatPrompt(promptInput.trim());
    setCurrentView('ai-chat');
  };

  const currentSubjects = activeCurriculum;

  const recentPDFs = [
    { title: 'DBMS_Module3_BPlusTrees_Notes.pdf', size: '2.4 MB', date: 'Opened 2 hours ago' },
    { title: 'VTU_2023_Model_Question_Paper.pdf', size: '1.8 MB', date: 'Opened Yesterday' },
    { title: 'AI_Search_Algorithms_CheatSheet.pdf', size: '3.1 MB', date: 'Opened 3 days ago' },
  ];

  const quickPrompts = [
    'When is my DBMS 1st Internal exam?',
    'Where is Lab 5?',
    'Summarize DBMS Module 3',
    "Explain Dijkstra's Algorithm",
  ];

  // Framer Motion Staggered Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
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
      {/* 1. STUDENT WELCOME & ACADEMIC BANNER */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-3xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[11px] font-bold border border-indigo-500/30">
              Student Dashboard
            </span>
            <span className="text-xs font-mono text-slate-400 dark:text-zinc-500">
              {scheme}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome back, {userName} 👋
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 font-medium">
            {college} • {branch} • {semName} ({sec})
          </p>
        </div>

        <button
          onClick={() => setCurrentView('study-planner')}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all flex items-center space-x-1.5 w-fit min-h-[44px]"
        >
          <Sparkles className="w-4 h-4" />
          <span>VTU AI Revision Plan →</span>
        </button>
      </motion.div>

      {/* 2. LIVING AI CORE HERO */}
      <motion.div variants={itemVariants}>
        <LivingAICore />
      </motion.div>

      {/* 3. AI SEARCH PROMPT BAR */}
      <motion.div
        variants={itemVariants}
        className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-3"
      >
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-mono">
          <span className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400 font-semibold truncate pr-2">
            <Zap className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Active Memory: {college} • {branch.split(' ')[0]} {semName} • 21CS61 DBMS</span>
          </span>
          <span className="text-[10px] shrink-0">Gemini 2.5 Kernel</span>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            placeholder={`Ask CampusCopilot anything about ${semName} ${branch.split(' ')[0]}...`}
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

      {/* 4. 4 PRIMARY ACADEMIC KPI METRICS */}
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

        {/* Metric 2: Upcoming Internal & VTU Exams */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          onClick={() => setCurrentView('timetable')}
          className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm hover:border-purple-500/50 transition-all cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400">
            <span className="text-[11px] font-bold uppercase tracking-wider">1st Internal Exam</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
              {countExamDays} Days
            </p>
            <span className="text-[10px] font-mono text-purple-500 font-bold">Aug 12</span>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
            VTU Theory Exams: Sep 15 (44 Days)
          </p>
        </motion.div>

        {/* Metric 3: Pending Assignments */}
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

        {/* Metric 4: Attendance Radar */}
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

      {/* 5. CURRENT SEMESTER SUBJECTS & CONTINUE LEARNING CARD */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Semester Subjects (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {semName} Curriculum
              </span>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Current Semester Subjects ({currentSubjects.length})
              </h2>
            </div>

            <button
              onClick={() => setCurrentView('study-planner')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              VTU Syllabus & Notes →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentSubjects.map((sub) => (
              <div
                key={sub.code}
                onClick={() => setCurrentView('smart-notes')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 hover:border-indigo-500/50 transition-all cursor-pointer space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                    {sub.code}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">
                    {sub.credits} Credits
                  </span>
                </div>

                <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {sub.name}
                </h3>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-zinc-500">
                    <span>Revision Progress</span>
                    <span className="font-bold text-indigo-500">{sub.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${sub.progress}%` }}
                      className="h-full bg-indigo-600 rounded-full"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Learning & Recently Opened PDFs (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Continue Learning Card */}
          <div className="p-5 rounded-2xl bg-indigo-600 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between text-xs font-mono text-indigo-200">
              <span className="flex items-center space-x-1">
                <PlayCircle className="w-3.5 h-3.5 text-white" />
                <span>Continue Learning</span>
              </span>
              <span>Module 3 (68%)</span>
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-white">
                DBMS B+ Tree Leaf Node Splitting
              </h3>
              <p className="text-xs text-indigo-100 mt-0.5">
                Review 5 viva questions & summary notes before your 1st Internal.
              </p>
            </div>

            <button
              onClick={() => setCurrentView('smart-notes')}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-slate-100 text-indigo-600 font-extrabold text-xs transition-colors flex items-center justify-center space-x-1 shadow-sm"
            >
              <span>Resume Study Notes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Recently Opened PDFs */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-3">
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-1.5">
              <FileCode className="w-4 h-4 text-indigo-500" />
              <span>Recently Opened PDFs & Notes</span>
            </h2>

            <div className="divide-y divide-slate-100 dark:divide-zinc-800">
              {recentPDFs.map((pdf) => (
                <div
                  key={pdf.title}
                  onClick={() => setCurrentView('doc-intelligence')}
                  className="py-2.5 flex items-center justify-between cursor-pointer group hover:bg-slate-50 dark:hover:bg-zinc-900/40 px-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                    <FileText className="w-4 h-4 text-indigo-400 shrink-0" />
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {pdf.title}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono flex items-center space-x-2">
                        <span>{pdf.size}</span>
                        <span>•</span>
                        <span>{pdf.date}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 6. ANIMATED TIMELINE & QUICK WORKFLOWS */}
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
