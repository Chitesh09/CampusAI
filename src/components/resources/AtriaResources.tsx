import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  BookOpen,
  FileText,
  FlaskConical,
  HelpCircle,
  Lightbulb,
  Microscope,
  Briefcase,
  Code2,
  Users,
  Shield,
  Zap,
  Trophy,
  Download,
  ExternalLink,
  Filter,
  ChevronRight,
  Star,
  Clock,
  Eye,
  FolderOpen,
  Tag,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────
interface Resource {
  id: string;
  title: string;
  category: string;
  branch: string;
  semester: string;
  subject: string;
  module: string;
  type: 'pdf' | 'doc' | 'video' | 'link' | 'zip';
  size?: string;
  author?: string;
  uploadedAt: string;
  downloads: number;
  views: number;
  starred?: boolean;
  tags: string[];
  url?: string;
}

// ─── Category Config ──────────────────────────────────────────────
const CATEGORIES = [
  { id: 'all', label: 'All Resources', icon: <FolderOpen className="w-4 h-4" />, color: 'text-slate-500', bg: 'bg-slate-500/10 border-slate-500/20' },
  { id: 'dept-notes', label: 'Department Notes', icon: <BookOpen className="w-4 h-4" />, color: 'text-indigo-500', bg: 'bg-indigo-500/10 border-indigo-500/20' },
  { id: 'faculty-notes', label: 'Faculty Notes', icon: <FileText className="w-4 h-4" />, color: 'text-purple-500', bg: 'bg-purple-500/10 border-purple-500/20' },
  { id: 'vtu-notes', label: 'VTU Notes', icon: <BookOpen className="w-4 h-4" />, color: 'text-blue-500', bg: 'bg-blue-500/10 border-blue-500/20' },
  { id: 'lab-manuals', label: 'Lab Manuals', icon: <FlaskConical className="w-4 h-4" />, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { id: 'question-papers', label: 'Question Papers', icon: <HelpCircle className="w-4 h-4" />, color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' },
  { id: 'mini-projects', label: 'Mini Project Ideas', icon: <Lightbulb className="w-4 h-4" />, color: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20' },
  { id: 'research', label: 'Research Papers', icon: <Microscope className="w-4 h-4" />, color: 'text-cyan-500', bg: 'bg-cyan-500/10 border-cyan-500/20' },
  { id: 'placement', label: 'Placement Materials', icon: <Briefcase className="w-4 h-4" />, color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/20' },
  { id: 'coding', label: 'Coding Resources', icon: <Code2 className="w-4 h-4" />, color: 'text-green-500', bg: 'bg-green-500/10 border-green-500/20' },
  { id: 'clubs', label: 'Club Activities', icon: <Users className="w-4 h-4" />, color: 'text-pink-500', bg: 'bg-pink-500/10 border-pink-500/20' },
  { id: 'ncc', label: 'NCC', icon: <Shield className="w-4 h-4" />, color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' },
  { id: 'tech-events', label: 'Technical Events', icon: <Zap className="w-4 h-4" />, color: 'text-violet-500', bg: 'bg-violet-500/10 border-violet-500/20' },
  { id: 'hackathons', label: 'Hackathons', icon: <Trophy className="w-4 h-4" />, color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20' },
];

// ─── Mock Resource Data ───────────────────────────────────────────
const generateResources = (activeCurriculum: any[], defaultBranch: string, defaultSem: string): Resource[] => {
  const resources: Resource[] = [];
  const branchShort = defaultBranch.includes('ISE') ? 'ISE' : defaultBranch.includes('CSE') ? 'CSE' : defaultBranch.includes('ECE') ? 'ECE' : 'ISE';

  activeCurriculum.forEach((sub, i) => {
    const sem = defaultSem;
    const branch = branchShort;

    // Dept Notes
    resources.push({
      id: `dept-${sub.code}-1`,
      title: `${sub.name} – Department Lecture Notes (Complete)`,
      category: 'dept-notes',
      branch,
      semester: sem,
      subject: sub.name,
      module: 'All Modules',
      type: 'pdf',
      size: '4.2 MB',
      author: sub.faculty || 'Atria Dept',
      uploadedAt: '2026-07-28',
      downloads: 320 + i * 45,
      views: 890 + i * 120,
      starred: i === 0,
      tags: [sub.code, 'Notes', 'VTU 2022'],
      url: sub.vtuNotesUrl,
    });

    // Faculty Notes
    resources.push({
      id: `faculty-${sub.code}-1`,
      title: `${sub.name} – ${sub.faculty || 'Faculty'} Handwritten Notes`,
      category: 'faculty-notes',
      branch,
      semester: sem,
      subject: sub.name,
      module: 'Module 1-3',
      type: 'pdf',
      size: '8.1 MB',
      author: sub.faculty || 'Atria Faculty',
      uploadedAt: '2026-07-30',
      downloads: 210 + i * 30,
      views: 560 + i * 80,
      tags: [sub.code, 'Handwritten'],
    });

    // VTU Notes
    resources.push({
      id: `vtu-${sub.code}-1`,
      title: `${sub.code} – Official VTU Circle Notes (2022 Scheme)`,
      category: 'vtu-notes',
      branch,
      semester: sem,
      subject: sub.name,
      module: 'All Modules',
      type: 'link',
      author: 'VTU Circle',
      uploadedAt: '2026-07-15',
      downloads: 540 + i * 60,
      views: 1200 + i * 150,
      tags: [sub.code, 'VTU', '2022 Scheme'],
      url: sub.vtuNotesUrl,
    });

    // Lab Manuals
    if (sub.code.includes('L')) {
      resources.push({
        id: `lab-${sub.code}-1`,
        title: `${sub.name} – Lab Manual with Programs (VTU Syllabus)`,
        category: 'lab-manuals',
        branch,
        semester: sem,
        subject: sub.name,
        module: 'Lab Programs',
        type: 'pdf',
        size: '3.5 MB',
        author: 'Atria CS Lab',
        uploadedAt: '2026-07-20',
        downloads: 190 + i * 40,
        views: 480 + i * 70,
        tags: [sub.code, 'Lab', 'Programs'],
      });
    }

    // Question Papers
    resources.push({
      id: `qp-${sub.code}-1`,
      title: `${sub.code} – VTU Previous Year Question Papers (2019–2024)`,
      category: 'question-papers',
      branch,
      semester: sem,
      subject: sub.name,
      module: 'All Modules',
      type: 'zip',
      size: '12.3 MB',
      author: 'VTU Exam Cell',
      uploadedAt: '2026-07-10',
      downloads: 620 + i * 80,
      views: 1450 + i * 200,
      starred: i === 1,
      tags: [sub.code, 'PYQ', 'Exam'],
    });
  });

  // Mini Projects
  const baseProjs = activeCurriculum.slice(0, 3).map((s) => `${s.name} Applied Project`);
  if (baseProjs.length === 0) {
    baseProjs.push('Blockchain Verification DApp', 'IoT Temperature Monitoring System');
  }
  baseProjs.forEach((proj, i) => {
    resources.push({
      id: `proj-${i}`,
      title: proj,
      category: 'mini-projects',
      branch: branchShort,
      semester: defaultSem,
      subject: 'Mini Project',
      module: 'Project',
      type: 'doc',
      author: 'Atria Dept',
      uploadedAt: '2026-07-25',
      downloads: 85 + i * 20,
      views: 310 + i * 60,
      tags: ['Mini Project', branchShort, defaultSem],
    });
  });

  // Research Papers
  const basePapers = activeCurriculum.slice(0, 3).map((s) => `Deep Study on ${s.name} Architectures`);
  if (basePapers.length === 0) {
    basePapers.push('Federated Privacy Systems in ML', 'Edge Computing Architectures');
  }
  basePapers.forEach((paper, i) => {
    resources.push({
      id: `research-${i}`,
      title: paper,
      category: 'research',
      branch: branchShort,
      semester: defaultSem,
      subject: 'Research',
      module: 'N/A',
      type: 'pdf',
      size: `${(1.2 + i * 0.4).toFixed(1)} MB`,
      author: 'IEEE / Atria Faculty',
      uploadedAt: '2026-07-18',
      downloads: 45 + i * 10,
      views: 180 + i * 40,
      tags: ['Research', 'IEEE', 'Advanced'],
    });
  });

  // Placement
  [`Atria Placement Cell – ${branchShort} Interview Preparation Kit`, 'TCS NQT Aptitude & Coding Guide', 'System Design Primer – FAANG Edition', 'Atria Placement Cell – Company List 2026'].forEach((title, i) => {
    resources.push({
      id: `placement-${i}`,
      title,
      category: 'placement',
      branch: branchShort,
      semester: defaultSem,
      subject: 'Placement',
      module: 'N/A',
      type: i === 3 ? 'doc' : 'pdf',
      size: `${(2.5 + i * 0.8).toFixed(1)} MB`,
      author: 'Atria Placement Cell',
      uploadedAt: '2026-08-01',
      downloads: 280 + i * 60,
      views: 720 + i * 100,
      starred: i === 0,
      tags: ['Placement', '2026', 'Interview'],
    });
  });

  // Coding
  ['DSA CheatSheet – Arrays, Trees, Graphs', 'LeetCode Top 150 Solutions – Java', 'Competitive Programming – Codeforces Templates'].forEach((title, i) => {
    resources.push({
      id: `coding-${i}`,
      title,
      category: 'coding',
      branch: branchShort,
      semester: defaultSem,
      subject: 'Coding',
      module: 'N/A',
      type: 'pdf',
      author: 'Atria Coding Club',
      uploadedAt: '2026-07-22',
      downloads: 390 + i * 50,
      views: 960 + i * 120,
      tags: ['Coding', 'DSA', 'Competitive'],
    });
  });

  // Clubs & Events
  resources.push({ id: 'club-1', title: 'IEEE Atria SB – Technical Paper Writing Guide', category: 'clubs', branch: branchShort, semester: 'All', subject: 'IEEE', module: 'N/A', type: 'pdf', author: 'IEEE Atria SB', uploadedAt: '2026-07-30', downloads: 60, views: 180, tags: ['IEEE', 'Club'] });
  resources.push({ id: 'ncc-1', title: 'NCC Annual Training Schedule 2026 – Atria', category: 'ncc', branch: 'All', semester: 'All', subject: 'NCC', module: 'N/A', type: 'doc', author: 'NCC Atria Unit', uploadedAt: '2026-08-01', downloads: 30, views: 95, tags: ['NCC', 'Training'] });
  resources.push({ id: 'event-1', title: "Cognition 2026 – Problem Statements & Rules", category: 'tech-events', branch: 'All', semester: 'All', subject: 'TechFest', module: 'N/A', type: 'pdf', author: 'Atria TechFest', uploadedAt: '2026-08-02', downloads: 210, views: 580, starred: true, tags: ['TechFest', 'Events'] });
  resources.push({ id: 'hack-1', title: 'HackAtria 2026 – Themes & Submission Guide', category: 'hackathons', branch: 'All', semester: 'All', subject: 'Hackathon', module: 'N/A', type: 'pdf', author: 'Atria Coding Club', uploadedAt: '2026-08-03', downloads: 175, views: 440, tags: ['Hackathon', '24hr'] });

  return resources;
};

const TYPE_BADGE: Record<string, string> = {
  pdf: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  doc: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  video: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  link: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  zip: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
};

export const AtriaResources: React.FC = () => {
  const { activeCurriculum, currentUser } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [sortBy, setSortBy] = useState<'recent' | 'downloads' | 'views'>('recent');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const allResources = useMemo(() => generateResources(activeCurriculum, currentUser.branch || 'Information Science & Engineering (ISE)', currentUser.semesterName || '7th Semester'), [activeCurriculum, currentUser.branch, currentUser.semesterName]);

  const filtered = useMemo(() => {
    let list = allResources;

    if (selectedCategory !== 'all') list = list.filter((r) => r.category === selectedCategory);
    if (selectedBranch !== 'all') list = list.filter((r) => r.branch === selectedBranch || r.branch === 'All');
    if (selectedSemester !== 'all') list = list.filter((r) => r.semester === selectedSemester || r.semester === 'All');
    if (selectedSubject !== 'all') list = list.filter((r) => r.subject === selectedSubject);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subject.toLowerCase().includes(q) ||
          r.tags.some((t) => t.toLowerCase().includes(q)) ||
          r.category.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'downloads') list = [...list].sort((a, b) => b.downloads - a.downloads);
    else if (sortBy === 'views') list = [...list].sort((a, b) => b.views - a.views);
    else list = [...list].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

    return list;
  }, [allResources, selectedCategory, selectedBranch, selectedSemester, selectedSubject, searchQuery, sortBy]);

  const subjectOptions = useMemo(() => ['all', ...activeCurriculum.map((s) => s.name)], [activeCurriculum]);
  const activeCat = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080a]">
      {/* ── Hero Header ───────────────────────────────────────── */}
      <div
        className="relative px-4 sm:px-6 pt-6 pb-8"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #6366f1 0%, transparent 50%), radial-gradient(circle at 80% 20%, #818cf8 0%, transparent 40%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white/90 text-[11px] font-bold border border-white/20">
                  🏛️ Atria Institute of Technology
                </span>
                <span className="text-[10px] text-white/50 font-mono">ISE • {currentUser.semesterName}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Atria Resources</h1>
              <p className="text-xs text-white/60">
                {allResources.length} resources across Department, VTU, Placement & Events
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white/80 text-xs font-bold hover:bg-white/15 transition-all"
              >
                {viewMode === 'grid' ? '☰ List' : '⊞ Grid'}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, subjects, question papers, placement materials..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm font-medium backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 text-lg leading-none">×</button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* ── Category Scrollable Chips ──────────────────────── */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                  : `bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-indigo-400/50`
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
              {cat.id !== 'all' && (
                <span className={`text-[9px] font-black px-1 py-0.5 rounded ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-zinc-800'}`}>
                  {allResources.filter((r) => r.category === cat.id).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Filter + Sort Bar ──────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              showFilters ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          <div className="flex items-center space-x-2 ml-auto">
            <span className="text-xs text-slate-500 dark:text-zinc-500 font-medium">Sort by:</span>
            {(['recent', 'downloads', 'views'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                  sortBy === s
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-indigo-400/50'
                }`}
              >
                {s === 'recent' ? '🕐 Recent' : s === 'downloads' ? '⬇ Downloads' : '👁 Views'}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Semester */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Semester</label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="all">All Semesters</option>
                    {['3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Branch */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Branch</label>
                  <select
                    value={selectedBranch}
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="all">All Branches</option>
                    <option value="ISE">Information Science (ISE)</option>
                    <option value="CSE">Computer Science (CSE)</option>
                    <option value="ECE">Electronics (ECE)</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Subject</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  >
                    <option value="all">All Subjects</option>
                    {subjectOptions.slice(1).map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Results Bar ───────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${activeCat.bg} ${activeCat.color}`}>
              {activeCat.icon}
              <span>{activeCat.label}</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-zinc-500">{filtered.length} results</span>
          </div>
          {searchQuery && (
            <span className="text-xs text-indigo-500 font-semibold">Results for "{searchQuery}"</span>
          )}
        </div>

        {/* ── Resource Cards ────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <div className="text-4xl">📂</div>
            <p className="text-sm font-bold text-slate-600 dark:text-zinc-400">No resources found</p>
            <p className="text-xs text-slate-400 dark:text-zinc-600">Try changing your search or filters</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedBranch('all'); setSelectedSemester('all'); setSelectedSubject('all'); }} className="text-xs font-bold text-indigo-500 hover:underline">Clear all filters</button>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
            {filtered.map((res) => {
              const cat = CATEGORIES.find((c) => c.id === res.category) || CATEGORIES[0];
              return viewMode === 'grid' ? (
                <motion.div
                  key={res.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400/50 hover:shadow-md transition-all cursor-pointer space-y-3"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${cat.bg} ${cat.color}`}>
                      {cat.icon}
                    </div>
                    <div className="flex items-center space-x-1.5">
                      {res.starred && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${TYPE_BADGE[res.type]}`}>
                        {res.type}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">{res.title}</h3>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500 mt-0.5">{res.subject} • {res.module}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {res.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 flex items-center space-x-0.5">
                        <Tag className="w-2 h-2" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-zinc-600">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center space-x-1"><Download className="w-2.5 h-2.5" /><span>{res.downloads}</span></span>
                      <span className="flex items-center space-x-1"><Eye className="w-2.5 h-2.5" /><span>{res.views}</span></span>
                    </div>
                    <span className="flex items-center space-x-1"><Clock className="w-2.5 h-2.5" /><span>{res.uploadedAt}</span></span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center space-x-2 pt-1 border-t border-slate-100 dark:border-zinc-800">
                    {res.url ? (
                      <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition-all">
                        <ExternalLink className="w-3 h-3" />
                        <span>Open</span>
                      </a>
                    ) : (
                      <button className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition-all">
                        <Download className="w-3 h-3" />
                        <span>Download</span>
                      </button>
                    )}
                    <button className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-[11px] font-bold text-slate-700 dark:text-zinc-300 transition-all">
                      Preview
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* List View */
                <motion.div
                  key={res.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400/50 hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${cat.bg} ${cat.color}`}>
                    {cat.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">{res.title}</h3>
                      {res.starred && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                    </div>
                    <p className="text-[10px] text-slate-500 dark:text-zinc-500">{res.subject} • {res.category} • {res.uploadedAt}</p>
                  </div>
                  <div className="flex items-center space-x-3 shrink-0">
                    <div className="hidden sm:flex items-center space-x-2 text-[10px] text-slate-400">
                      <span className="flex items-center space-x-1"><Download className="w-2.5 h-2.5" /><span>{res.downloads}</span></span>
                      <span className="flex items-center space-x-1"><Eye className="w-2.5 h-2.5" /><span>{res.views}</span></span>
                    </div>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${TYPE_BADGE[res.type]}`}>{res.type}</span>
                    <ChevronRight className="w-4 h-4 text-slate-300 dark:text-zinc-600" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
