import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useCountUp } from '../../hooks/useCountUp';
import {
  BookOpen,
  Calendar,
  CheckSquare,
  BarChart2,
  AlertTriangle,
  ArrowRight,
  FileText,
  Clock,
  Sparkles,
  Bell,
  Briefcase,
  Building2,
  ChevronRight,
  GraduationCap,
  MapPin,
  Coffee,
  Cpu,
  Trophy,
  Megaphone,
  Star,
  TrendingUp,
  Users,
  Zap,
  LibraryBig,
  FlaskConical,
  Activity,
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// Time-aware greeting
const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export const DashboardOverview: React.FC = () => {
  const {
    currentUser,
    setCurrentView,
    assignments,
    attendanceRecords,
    setActiveChatPrompt,
    activeCurriculum,
  } = useApp();

  const [promptInput, setPromptInput] = useState('');
  const [activeNewsTab, setActiveNewsTab] = useState<'announcements' | 'placement' | 'department' | 'events'>('announcements');

  const placeholders = [
    "Search Notes (e.g. DBMS)...",
    "Generate Quiz for ADA...",
    "Ask AI: Explain Module 2...",
    "Find Classroom: Lab 5...",
    "Open Module 4: Cloud...",
    "Check Attendance status..."
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const pInterval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(pInterval);
  }, []);

  const college = currentUser.collegeName || 'Atria Institute of Technology, Bengaluru';
  const branch = currentUser.branch || 'Information Science & Engineering (ISE)';
  const semName = currentUser.semesterName || '7th Semester';
  const sec = currentUser.section || 'Section B';
  const scheme = currentUser.scheme || '2022 Scheme (CBCS)';
  const userName = currentUser.name ? currentUser.name.split(' ')[0] : 'Chithu';
  const greeting = getGreeting();

  // Short branch label
  const branchShort = branch.includes('ISE') ? 'ISE' : branch.includes('CSE') ? 'CSE' : branch.includes('AIML') ? 'AIML' : branch.includes('ECE') ? 'ECE' : 'ISE';

  const pendingAssignments = assignments.filter((a) => a.status !== 'completed');
  const overallAttendancePct =
    attendanceRecords.length > 0
      ? Math.round(
          (attendanceRecords.reduce((acc, curr) => acc + curr.percentage, 0) /
            attendanceRecords.length) *
            10
        ) / 10
      : 85.5;

  const todaySubjects = activeCurriculum.slice(0, 3);

  // Today's timetable slots
  const todaySlots = useMemo(() => [
    { time: '09:00 AM', subject: activeCurriculum[0]?.name || 'Big Data Analytics', code: activeCurriculum[0]?.code || 'BCS701', room: 'CS Lab 3', faculty: activeCurriculum[0]?.faculty || 'Prof. John Dean' },
    { time: '11:00 AM', subject: activeCurriculum[1]?.name || 'Cloud Computing', code: activeCurriculum[1]?.code || 'BCS702', room: 'Seminar Hall 1', faculty: activeCurriculum[1]?.faculty || 'Prof. Werner Vogels' },
    { time: '02:00 PM', subject: activeCurriculum[2]?.name || 'Info Security', code: activeCurriculum[2]?.code || 'BCS703', room: 'Hall 302', faculty: activeCurriculum[2]?.faculty || 'Prof. Adi Shamir' },
  ], [activeCurriculum]);

  // Animated counters
  const countClasses = useCountUp(todaySlots.length, 800, 200);
  const countAttendance = useCountUp(Math.round(overallAttendancePct), 1000, 300);
  const countIADays = useCountUp(10, 900, 400);
  const countVTUDays = useCountUp(45, 1100, 500);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    setActiveChatPrompt(promptInput.trim());
    setCurrentView('ai-chat');
  };

  // Framer Motion variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 24 } },
  };

  // Campus News data
  const newsData = {
    announcements: [
      { icon: <Bell className="w-4 h-4 text-indigo-400" />, title: 'Atria College Day 2026 – Registrations Open', time: '2 hours ago', tag: 'College' },
      { icon: <GraduationCap className="w-4 h-4 text-emerald-400" />, title: 'VTU 7th Semester Exam Time Table Released', time: '5 hours ago', tag: 'VTU' },
      { icon: <Bell className="w-4 h-4 text-amber-400" />, title: '1st Internal Assessment Schedule – Aug 15–18', time: 'Yesterday', tag: 'Exam' },
      { icon: <Megaphone className="w-4 h-4 text-purple-400" />, title: 'Digital Library Access Updated – New IEEE Resources', time: '2 days ago', tag: 'Library' },
    ],
    placement: [
      { icon: <Briefcase className="w-4 h-4 text-emerald-400" />, title: 'Amazon SDE Internship Drive – Sept 10', time: 'Today', tag: 'FAANG' },
      { icon: <Briefcase className="w-4 h-4 text-blue-400" />, title: 'Cisco Systems Campus Recruitment – ISE/CSE', time: '1 day ago', tag: 'Core' },
      { icon: <Briefcase className="w-4 h-4 text-cyan-400" />, title: 'TCS NQT 2026 Registration Open – Deadline Sept 5', time: '2 days ago', tag: 'Mass' },
      { icon: <Trophy className="w-4 h-4 text-amber-400" />, title: '12 Atria Students Selected at Infosys Off-Campus', time: '3 days ago', tag: 'Result' },
    ],
    department: [
      { icon: <FlaskConical className="w-4 h-4 text-purple-400" />, title: 'Advanced Java Lab – Viva Voce Schedule Released', time: 'Today', tag: 'Lab' },
      { icon: <Users className="w-4 h-4 text-indigo-400" />, title: 'ISE Dept Workshop: Docker & Kubernetes – Aug 20', time: '1 day ago', tag: 'Workshop' },
      { icon: <Building2 className="w-4 h-4 text-cyan-400" />, title: 'Project Lab Booking System Now Live on Intranet', time: '2 days ago', tag: 'Infra' },
      { icon: <Activity className="w-4 h-4 text-rose-400" />, title: 'Big Data Analytics Assignment 2 Deadline Extended', time: '3 days ago', tag: 'Academic' },
    ],
    events: [
      { icon: <Star className="w-4 h-4 text-amber-400" />, title: "Atria TechFest 'Cognition 2026' – Sept 2–4", time: '28 days away', tag: 'Flagship' },
      { icon: <Zap className="w-4 h-4 text-indigo-400" />, title: '24-Hour Hackathon: HackAtria – Aug 25', time: '21 days away', tag: 'Hackathon' },
      { icon: <TrendingUp className="w-4 h-4 text-emerald-400" />, title: 'Guest Lecture: AI in Healthcare – Dr. Priya Rao', time: 'Aug 12', tag: 'Lecture' },
      { icon: <Users className="w-4 h-4 text-purple-400" />, title: 'IEEE Student Branch Annual Meet – Aug 8', time: '4 days away', tag: 'Club' },
    ],
  };

  // Campus resources quick-links
  const campusResources = [
    { icon: <LibraryBig className="w-5 h-5 text-indigo-400" />, label: 'Digital Library', sub: 'IEEE, Springer, Elsevier', action: 'vtu-notes', color: 'border-indigo-500/30 bg-indigo-500/5' },
    { icon: <Cpu className="w-5 h-5 text-purple-400" />, label: 'CS Labs', sub: '3 Active Labs Open', action: 'timetable', color: 'border-purple-500/30 bg-purple-500/5' },
    { icon: <Briefcase className="w-5 h-5 text-emerald-400" />, label: 'Placement Cell', sub: '3 Active Drives', action: 'career', color: 'border-emerald-500/30 bg-emerald-500/5' },
    { icon: <MapPin className="w-5 h-5 text-rose-400" />, label: 'Campus Map', sub: 'Anandanagar, Bengaluru', action: 'campus-map', color: 'border-rose-500/30 bg-rose-500/5' },
    { icon: <GraduationCap className="w-5 h-5 text-amber-400" />, label: 'VTU Resources', sub: 'PYQs & Syllabus', action: 'vtu-notes', color: 'border-amber-500/30 bg-amber-500/5' },
    { icon: <Coffee className="w-5 h-5 text-cyan-400" />, label: 'Canteen Menu', sub: 'Today: Dosa, Rice Bath', action: 'campus-map', color: 'border-cyan-500/30 bg-cyan-500/5' },
  ];

  // Pending assignments list
  const dynamicPending = activeCurriculum.map((sub) => ({
    id: `asgn-${sub.code}`,
    title: `${sub.code} Module Report`,
    subject: sub.name,
    deadline: 'Aug 12',
    priority: 'high',
    points: 50,
  })).slice(0, 3);

  const newsTabs = [
    { id: 'announcements', label: '📢 Atria Notices', count: 4 },
    { id: 'placement', label: '💼 Placement', count: 4 },
    { id: 'department', label: '🏢 Dept Notices', count: 4 },
    { id: 'events', label: '🎉 Events', count: 4 },
  ] as const;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-6 max-w-7xl mx-auto space-y-5 select-none"
    >
      {/* ═══════════════════════════════════════════════
          SECTION 1: ATRIA OFFICIAL PORTAL HEADER BANNER
      ═══════════════════════════════════════════════ */}
      <motion.div
        variants={itemVariants}
        className="relative p-6 rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 70%, #1d4ed8 100%)',
        }}
      >
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #60a5fa, transparent 70%)', transform: 'translate(-20%, 30%)' }} />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            {/* Institution badge */}
            <div className="flex items-center space-x-2 flex-wrap gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white/90 text-[11px] font-bold font-mono border border-white/20 backdrop-blur-sm">
                🏛️ Atria Institute of Technology
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 text-[10px] font-mono border border-white/10">
                VTU Affiliated • NAAC 'A' Grade
              </span>
            </div>

            {/* Greeting */}
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {greeting}, {userName} 👋
            </h1>

            {/* Academic context */}
            <div className="flex items-center space-x-2 text-white/80 text-xs font-medium flex-wrap gap-y-1">
              <span className="flex items-center space-x-1">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{branchShort}</span>
              </span>
              <span className="text-white/30">•</span>
              <span>{semName}</span>
              <span className="text-white/30">•</span>
              <span>{scheme}</span>
              <span className="text-white/30">•</span>
              <span>{sec}</span>
            </div>
          </div>

          {/* AI Quick-Ask Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-300" />
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-xs font-medium backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-300"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-white text-indigo-700 text-xs font-black shadow-lg hover:bg-indigo-50 transition-all whitespace-nowrap"
            >
              Ask AI →
            </button>
          </form>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          SECTION 2: 4-KPI ACADEMIC STATUS HUD
      ═══════════════════════════════════════════════ */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Today's Classes */}
        <motion.div
          whileHover={{ y: -4, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm cursor-pointer hover:border-indigo-500/50 transition-colors group"
          onClick={() => setCurrentView('timetable')}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <Calendar className="w-4 h-4 text-indigo-500" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600 group-hover:text-indigo-400 transition-colors" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{countClasses}</div>
          <div className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mt-0.5">Today's Classes</div>
          <div className="text-[10px] text-indigo-500 dark:text-indigo-400 font-mono mt-1">View Atria Schedule →</div>
        </motion.div>

        {/* Today's Attendance */}
        <motion.div
          whileHover={{ y: -4, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={`p-4 rounded-2xl border shadow-sm cursor-pointer transition-colors group ${
            overallAttendancePct >= 75
              ? 'bg-white dark:bg-[#111114] border-slate-200 dark:border-white/[0.06] hover:border-emerald-500/50'
              : 'bg-rose-500/5 border-rose-500/30 hover:border-rose-500/60'
          }`}
          onClick={() => setCurrentView('attendance')}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${overallAttendancePct >= 75 ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-rose-500/10 border border-rose-500/20'}`}>
              <BarChart2 className={`w-4 h-4 ${overallAttendancePct >= 75 ? 'text-emerald-500' : 'text-rose-500'}`} />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600 group-hover:text-emerald-400 transition-colors" />
          </div>
          <div className={`text-2xl font-black ${overallAttendancePct >= 75 ? 'text-slate-900 dark:text-white' : 'text-rose-600 dark:text-rose-400'}`}>{countAttendance}%</div>
          <div className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mt-0.5">Today's Attendance</div>
          <div className={`text-[10px] font-mono mt-1 ${overallAttendancePct >= 75 ? 'text-emerald-500' : 'text-rose-500'}`}>
            {overallAttendancePct >= 75 ? '✓ Safe • View Details →' : '⚠ Below 75% Alert!'}
          </div>
        </motion.div>

        {/* Upcoming Internal Assessment */}
        <motion.div
          whileHover={{ y: -4, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm cursor-pointer hover:border-amber-500/50 transition-colors group"
          onClick={() => setCurrentView('timetable')}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600 group-hover:text-amber-400 transition-colors" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{countIADays} Days</div>
          <div className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mt-0.5">1st Internal Assessment</div>
          <div className="text-[10px] text-amber-500 dark:text-amber-400 font-mono mt-1">Aug 15–18 • Atria Exam Hall</div>
        </motion.div>

        {/* Upcoming VTU Exam */}
        <motion.div
          whileHover={{ y: -4, scale: 1.015, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05)" }}
          whileTap={{ scale: 0.985 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm cursor-pointer hover:border-purple-500/50 transition-colors group"
          onClick={() => setCurrentView('timetable')}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-purple-500" />
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600 group-hover:text-purple-400 transition-colors" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">{countVTUDays} Days</div>
          <div className="text-xs font-semibold text-slate-600 dark:text-zinc-400 mt-0.5">VTU Semester Exam</div>
          <div className="text-[10px] text-purple-500 dark:text-purple-400 font-mono mt-1">Sept 20, 2026 • VTU Bengaluru</div>
        </motion.div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          SECTION 3: TODAY'S CLASSES TIMELINE
      ═══════════════════════════════════════════════ */}
      <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Today's Classes</h2>
            <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">Monday • Atria AIT Campus</span>
          </div>
          <button onClick={() => setCurrentView('timetable')} className="text-[11px] font-bold text-indigo-500 hover:underline">Full Schedule →</button>
        </div>

        <div className="space-y-2">
          {todaySlots.map((slot, idx) => {
            const colorClasses = [
              'border-indigo-500/30 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400',
              'border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-400',
              'border-emerald-500/30 bg-emerald-500/5 text-emerald-600 dark:text-emerald-400',
            ];
            return (
              <div key={idx} className={`flex items-center space-x-3 p-3 rounded-xl border ${colorClasses[idx % 3]} transition-all`}>
                <div className="text-[11px] font-mono font-bold w-20 shrink-0">{slot.time}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{slot.subject}</div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-500">{slot.faculty} • {slot.room}</div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-white/60 dark:bg-white/5 border border-current">{slot.code}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          SECTION 4: CONTINUE STUDYING + PENDING ASSIGNMENTS
      ═══════════════════════════════════════════════ */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Continue Studying */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-purple-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Continue Studying</h2>
            </div>
            <button onClick={() => setCurrentView('subjects')} className="text-[11px] font-bold text-indigo-500 hover:underline">All Subjects →</button>
          </div>

          <div className="space-y-3">
            {activeCurriculum.slice(0, 3).map((sub, idx) => {
              const colors = ['indigo', 'purple', 'emerald'];
              const c = colors[idx % 3];
              return (
                <div
                  key={sub.code}
                  onClick={() => setCurrentView('subjects')}
                  className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 cursor-pointer hover:border-indigo-400/50 transition-all"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white shrink-0`}
                    style={{ background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))` }}
                  >
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${
                      idx === 0 ? 'bg-indigo-600' : idx === 1 ? 'bg-purple-600' : 'bg-emerald-600'
                    } text-white`}>
                      {sub.code.slice(-2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{sub.name}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex-1 h-1.5 rounded-full bg-slate-200 dark:bg-zinc-700">
                        <div className={`h-1.5 rounded-full ${idx === 0 ? 'bg-indigo-500' : idx === 1 ? 'bg-purple-500' : 'bg-emerald-500'}`} style={{ width: `${sub.progress}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-zinc-500 shrink-0">{sub.progress}%</span>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Pending Assignments</h2>
              {dynamicPending.length > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
                  {dynamicPending.length} due
                </span>
              )}
            </div>
            <button onClick={() => setCurrentView('assignments')} className="text-[11px] font-bold text-indigo-500 hover:underline">All Tasks →</button>
          </div>

          <div className="space-y-2.5">
            {dynamicPending.map((asgn) => (
              <div key={asgn.id} className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 hover:border-amber-400/50 transition-all cursor-pointer" onClick={() => setCurrentView('assignments')}>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{asgn.title}</div>
                  <div className="text-[10px] text-slate-500 dark:text-zinc-500 truncate">{asgn.subject}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] font-bold text-rose-500">Due {asgn.deadline}</div>
                  <div className="text-[10px] text-slate-400">{asgn.points} pts</div>
                </div>
              </div>
            ))}
            <button
              onClick={() => setCurrentView('ai-chat')}
              className="w-full p-3 rounded-xl border border-dashed border-indigo-400/40 text-xs font-bold text-indigo-500 dark:text-indigo-400 flex items-center justify-center space-x-2 hover:bg-indigo-500/5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate AI Study Plan for Pending Tasks</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          SECTION 5: RECENT NOTES
      ═══════════════════════════════════════════════ */}
      <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-emerald-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Recent Notes</h2>
            <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">Atria ISE Vault</span>
          </div>
          <button onClick={() => setCurrentView('vtu-notes')} className="text-[11px] font-bold text-indigo-500 hover:underline">All Notes →</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activeCurriculum.slice(0, 3).map((sub, idx) => (
            <div
              key={sub.code}
              onClick={() => setCurrentView('vtu-notes')}
              className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-emerald-400/50 cursor-pointer transition-all space-y-2"
            >
              <div className="flex items-center space-x-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${idx === 0 ? 'bg-indigo-500' : idx === 1 ? 'bg-purple-500' : 'bg-emerald-500'}`}>
                  <BookOpen className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-zinc-400">{sub.code}</span>
              </div>
              <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{sub.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-zinc-500">{sub.notesCount} PDF Notes • Module 1–5</div>
              <a href={sub.vtuNotesUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-indigo-500 hover:underline flex items-center space-x-1">
                <span>Open on VTU Circle</span>
                <ArrowRight className="w-2.5 h-2.5" />
              </a>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          SECTION 6: ATRIA CAMPUS NEWSROOM
      ═══════════════════════════════════════════════ */}
      <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Megaphone className="w-4 h-4 text-indigo-500" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Atria Campus Newsroom</h2>
        </div>

        {/* News tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 no-scrollbar">
          {newsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveNewsTab(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeNewsTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* News items */}
        <div className="space-y-2.5">
          {newsData[activeNewsTab].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400/40 transition-all cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-slate-900 dark:text-white">{item.title}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-[10px] text-slate-500 dark:text-zinc-500 flex items-center space-x-1">
                    <Clock className="w-2.5 h-2.5" />
                    <span>{item.time}</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">{item.tag}</span>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-zinc-600 shrink-0" />
            </div>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          SECTION 7: CAMPUS RESOURCES QUICK-ACCESS
      ═══════════════════════════════════════════════ */}
      <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4 text-emerald-500" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Campus Resources</h2>
          <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-mono">Atria Institute of Technology</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {campusResources.map((res, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentView(res.action)}
              className={`p-3.5 rounded-xl border ${res.color} transition-all hover:scale-105 hover:shadow-md text-left space-y-1.5`}
            >
              {res.icon}
              <div className="text-xs font-bold text-slate-900 dark:text-white">{res.label}</div>
              <div className="text-[10px] text-slate-500 dark:text-zinc-500 leading-relaxed">{res.sub}</div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* ═══════════════════════════════════════════════
          SECTION 8: AI CAMPUS COPILOT QUICK PROMPTS
      ═══════════════════════════════════════════════ */}
      <motion.div variants={itemVariants} className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">Atria AI Campus Copilot</h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">Powered by Gemini</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            `Summarize ${activeCurriculum[0]?.code || 'BCS701'} Module 3`,
            `Generate 10-mark questions for ${activeCurriculum[1]?.code || 'BCS702'}`,
            `Explain ${activeCurriculum[2]?.code || 'BCS703'} Module 4`,
            `Atria 1st IA exam preparation plan`,
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => { setActiveChatPrompt(prompt); setCurrentView('ai-chat'); }}
              className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-left hover:border-indigo-400/50 hover:bg-indigo-500/5 transition-all group"
            >
              <Zap className="w-3.5 h-3.5 text-indigo-500 mb-2 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-slate-700 dark:text-zinc-300 leading-relaxed">{prompt}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
