import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  PenTool,
  Presentation,
  Video,
  Layers,
  Sparkles,
  HelpCircle,
  FileCode,
  Bookmark,
  Download,
  Filter,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VTUResource {
  id: string;
  title: string;
  moduleNum: number;
  type: 'pdf' | 'handwritten' | 'ppt' | 'video' | 'flashcard' | 'ai_summary' | 'mcq' | 'pyq' | 'revision';
  sizeOrDuration: string;
  authorOrSource: string;
  previewSnippet: string;
  downloadUrl?: string;
}

export const VTUNotesLibrary: React.FC = () => {
  const { setCurrentView, setActiveChatPrompt, currentUser, updateUserProfile, activeCurriculum } = useApp();

  const selectedBranch = currentUser.branch || 'Computer Science & Engineering (CSE)';
  const selectedSem = currentUser.semesterName || '5th Semester';
  const selectedScheme = currentUser.scheme || '2022 Scheme (CBCS)';

  const subjectsList = activeCurriculum.map((s) => `${s.code} ${s.name}`);
  const [selectedSubject, setSelectedSubject] = useState(subjectsList[0] || 'BCS501 Database Management Systems');
  const [activeModule, setActiveModule] = useState<number>(1);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Automated 9 Resource Categories Data for VTU 2022 Scheme
  const mockVTUResources: VTUResource[] = [
    {
      id: 'res-1',
      title: 'BCS501 Module 1 Official VTU Printed Course Notes.pdf',
      moduleNum: 1,
      type: 'pdf',
      sizeOrDuration: '3.4 MB',
      authorOrSource: 'VTU Circle Official Notes 2022 Scheme',
      previewSnippet: 'ER Diagrams, Entity Attributes, Relational Schema Mapping & SQL DDL/DML Commands.',
    },
    {
      id: 'res-2',
      title: 'BMSCE Topper Handwritten Lecture Notes (Module 1).pdf',
      moduleNum: 1,
      type: 'handwritten',
      sizeOrDuration: '5.1 MB',
      authorOrSource: 'Rank 1 Student Lecture Scans',
      previewSnippet: 'Step-by-step ER to Relational Table Conversion Diagrams & Practice Solved Problems.',
    },
    {
      id: 'res-3',
      title: 'DBMS Module 1 Faculty Presentation Slides.pptx',
      moduleNum: 1,
      type: 'ppt',
      sizeOrDuration: '8.2 MB',
      authorOrSource: 'Dept Faculty Lecture Deck',
      previewSnippet: 'Database System Architecture, 3-Schema Architecture & Storage Engine Overview.',
    },
    {
      id: 'res-4',
      title: 'VTU Lecture Stream: Relational Algebra & ER Modeling',
      moduleNum: 1,
      type: 'video',
      sizeOrDuration: '42 mins',
      authorOrSource: 'NPTEL / VTU EDUSAT Stream',
      previewSnippet: 'Video lecture explaining Selection, Projection, Cartesian Product & Natural Join.',
    },
    {
      id: 'res-5',
      title: 'Module 1 Key Terms & ER Diagram Flashcard Deck',
      moduleNum: 1,
      type: 'flashcard',
      sizeOrDuration: '18 Flip Cards',
      authorOrSource: 'CampusCopilot AI Auto-Gen',
      previewSnippet: 'Primary Key vs Candidate Key, Weak Entity Sets & Cardinality Ratios.',
    },
    {
      id: 'res-6',
      title: 'Gemini 2.5 AI 1-Page Summary & Formula Sheet',
      moduleNum: 1,
      type: 'ai_summary',
      sizeOrDuration: '1 Page CheatSheet',
      authorOrSource: 'Gemini 2.5 Kernel',
      previewSnippet: 'Concise 10-minute exam morning revision summary for ER Diagrams & SQL syntax.',
    },
    {
      id: 'res-7',
      title: 'VTU 1st Internal Assessment Practice MCQs (Module 1)',
      moduleNum: 1,
      type: 'mcq',
      sizeOrDuration: '25 Questions',
      authorOrSource: 'VTU Question Bank 2022',
      previewSnippet: 'Multiple choice questions on Relational Integrity Constraints & Keys.',
    },
    {
      id: 'res-8',
      title: 'VTU Jan 2024 Solved Question Paper (Module 1 Questions)',
      moduleNum: 1,
      type: 'pyq',
      sizeOrDuration: '1.2 MB Solution',
      authorOrSource: 'VTU Exam Board 2024',
      previewSnippet: 'Q1(a) Explain 3-Schema Architecture (6M), Q1(b) Draw ER Diagram for Hospital (8M).',
    },
    {
      id: 'res-9',
      title: '10-Minute Exam Morning Speed Revision Notes',
      moduleNum: 1,
      type: 'revision',
      sizeOrDuration: '2 Pages',
      authorOrSource: 'VTU Circle Revision Series',
      previewSnippet: 'Bullet points on SQL Join types (INNER, LEFT, RIGHT, FULL) & Aggregate Functions.',
    },
  ];

  const filteredResources = mockVTUResources.filter((res) => {
    const matchesModule = res.moduleNum === activeModule;
    const matchesType = selectedTypeFilter === 'all' || res.type === selectedTypeFilter;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.previewSnippet.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesModule && matchesType && matchesSearch;
  });

  const getTypeIcon = (type: VTUResource['type']) => {
    switch (type) {
      case 'pdf': return <FileText className="w-4 h-4 text-indigo-400" />;
      case 'handwritten': return <PenTool className="w-4 h-4 text-emerald-400" />;
      case 'ppt': return <Presentation className="w-4 h-4 text-purple-400" />;
      case 'video': return <Video className="w-4 h-4 text-rose-400" />;
      case 'flashcard': return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'ai_summary': return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 'mcq': return <HelpCircle className="w-4 h-4 text-amber-400" />;
      case 'pyq': return <FileCode className="w-4 h-4 text-purple-400" />;
      case 'revision': return <Bookmark className="w-4 h-4 text-emerald-400" />;
    }
  };

  const getTypeLabel = (type: VTUResource['type']) => {
    switch (type) {
      case 'pdf': return 'PDF Notes';
      case 'handwritten': return 'Handwritten Notes';
      case 'ppt': return 'Lecture PPT';
      case 'video': return 'Video Stream';
      case 'flashcard': return 'Flashcards';
      case 'ai_summary': return 'AI Summary';
      case 'mcq': return 'Practice MCQs';
      case 'pyq': return 'VTU PYQP';
      case 'revision': return 'Speed Revision';
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none">
      {/* Header & Automated Hierarchy Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>VTU Automated Notes Library</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Automatically organized by <strong>Branch → Semester → Scheme → Subject → Modules 1-5</strong>.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <a
            href="https://vtucircle.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center space-x-1 transition-colors"
          >
            <span>VTU Circle Official Sync</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* AUTOMATED HIERARCHY SELECTOR BAR (Branch -> Semester -> Scheme -> Subject) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
        {/* Branch */}
        <div className="space-y-1.5">
          <label className="block text-slate-500 dark:text-zinc-400">1. Branch / Stream:</label>
          <select
            value={selectedBranch}
            onChange={(e) => updateUserProfile({ branch: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="Computer Science & Engineering (CSE)">Computer Science (CSE)</option>
            <option value="Information Science & Engineering (ISE)">Information Science (ISE)</option>
            <option value="Artificial Intelligence & Machine Learning (AIML)">AI & ML (AIML)</option>
            <option value="Electronics & Communication (ECE)">Electronics (ECE)</option>
          </select>
        </div>

        {/* Semester */}
        <div className="space-y-1.5">
          <label className="block text-slate-500 dark:text-zinc-400">2. Semester:</label>
          <select
            value={selectedSem}
            onChange={(e) => updateUserProfile({ semesterName: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none"
          >
            {['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'].map((sem) => (
              <option key={sem} value={sem}>{sem}</option>
            ))}
          </select>
        </div>

        {/* Scheme */}
        <div className="space-y-1.5">
          <label className="block text-slate-500 dark:text-zinc-400">3. Curriculum Scheme:</label>
          <select
            value={selectedScheme}
            onChange={(e) => updateUserProfile({ scheme: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="2022 Scheme (CBCS)">2022 Scheme (CBCS)</option>
            <option value="2021 Scheme (CBCS)">2021 Scheme (CBCS)</option>
            <option value="2018 Scheme (CBCS)">2018 Scheme (CBCS)</option>
          </select>
        </div>

        {/* Subject */}
        <div className="space-y-1.5">
          <label className="block text-slate-500 dark:text-zinc-400">4. Subject Code:</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none truncate"
          >
            {subjectsList.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>
      </div>

      {/* MODULE TABS BAR (Module 1 to Module 5) */}
      <div className="p-2 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
        {[1, 2, 3, 4, 5].map((modNum) => {
          const isActive = activeModule === modNum;
          return (
            <button
              key={modNum}
              onClick={() => setActiveModule(modNum)}
              className={`flex-1 min-w-[120px] py-3 px-4 rounded-xl font-bold text-xs transition-all flex flex-col items-center justify-center space-y-0.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm scale-[1.02]'
                  : 'bg-slate-100/60 dark:bg-zinc-800/60 text-slate-600 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="font-mono uppercase text-[10px] tracking-wider opacity-80">VTU 2022</span>
              <span>Module {modNum}</span>
            </button>
          );
        })}
      </div>

      {/* RESOURCE TYPE CATEGORY FILTER PILLS & SEARCH BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Resource Type Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          <button
            onClick={() => setSelectedTypeFilter('all')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              selectedTypeFilter === 'all'
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
            }`}
          >
            All Resources (9)
          </button>
          {[
            { id: 'pdf', label: 'PDF Notes' },
            { id: 'handwritten', label: 'Handwritten' },
            { id: 'ppt', label: 'PPTs' },
            { id: 'video', label: 'Videos' },
            { id: 'flashcard', label: 'Flashcards' },
            { id: 'ai_summary', label: 'AI Summary' },
            { id: 'mcq', label: 'MCQs' },
            { id: 'pyq', label: 'PYQ Papers' },
            { id: 'revision', label: 'Speed Revision' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedTypeFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl shrink-0 transition-all ${
                selectedTypeFilter === cat.id
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search Module 1 notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* AUTOMATED RESOURCE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((res) => (
          <motion.div
            key={res.id}
            whileHover={{ y: -2 }}
            className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 font-mono text-[10px] font-bold border border-slate-200 dark:border-zinc-700 flex items-center space-x-1">
                  {getTypeIcon(res.type)}
                  <span>{getTypeLabel(res.type)}</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">{res.sizeOrDuration}</span>
              </div>

              <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                {res.title}
              </h3>

              <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-relaxed font-medium">
                {res.previewSnippet}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400 dark:text-zinc-500 truncate max-w-[140px]">
                {res.authorOrSource}
              </span>

              {res.type === 'pdf' || res.type === 'handwritten' || res.type === 'ppt' ? (
                <button
                  onClick={() => setCurrentView('doc-intelligence')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Open PDF</span>
                </button>
              ) : res.type === 'flashcard' ? (
                <button
                  onClick={() => setCurrentView('doc-intelligence')}
                  className="px-3 py-1.5 rounded-lg bg-cyan-600 text-white font-bold text-xs flex items-center space-x-1"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Flip Cards</span>
                </button>
              ) : res.type === 'ai_summary' ? (
                <button
                  onClick={() => {
                    setActiveChatPrompt(`Summarize ${res.title} for exam preparation.`);
                    setCurrentView('ai-chat');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask Gemini</span>
                </button>
              ) : (
                <button
                  onClick={() => setCurrentView('doc-intelligence')}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 font-bold text-xs flex items-center space-x-1"
                >
                  <span>View Resource →</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
