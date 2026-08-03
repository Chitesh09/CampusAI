import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  FileText,
  HelpCircle,
  CheckSquare,
  Bot,
  Calendar,
  User,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Layers,
  BarChart2,
  X,
  FileCode,
  Download,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SubjectHub {
  code: string;
  name: string;
  credits: number;
  faculty: string;
  progress: number;
  attendancePct: number;
  notesCount: number;
  assignmentsCount: number;
  quizzesCount: number;
  pyqCount: number;
  vtuNotesUrl: string;
  modules: { num: number; title: string; topics: string }[];
}

export const SubjectsPage: React.FC = () => {
  const { setCurrentView, setActiveChatPrompt, currentUser } = useApp();
  const [selectedSubject, setSelectedSubject] = useState<SubjectHub | null>(null);
  const [activeTab, setActiveTab] = useState<'syllabus' | 'notes' | 'pyqs' | 'ai_tutor'>('syllabus');

  const subjectsData: SubjectHub[] = [
    {
      code: '21CS61',
      name: 'Database Management Systems',
      credits: 4,
      faculty: 'Prof. Alan Turing',
      progress: 68,
      attendancePct: 88.5,
      notesCount: 4,
      assignmentsCount: 2,
      quizzesCount: 5,
      pyqCount: 3,
      vtuNotesUrl: 'https://vtucircle.com/notes/21cs61',
      modules: [
        { num: 1, title: 'Introduction & ER Diagrams', topics: 'Entity Relationships, Conceptual Design, Schema Mapping' },
        { num: 2, title: 'Relational Algebra & Normalization', topics: '1NF, 2NF, 3NF, BCNF, Functional Dependencies' },
        { num: 3, title: 'Indexing & B+ Trees', topics: 'Dense & Sparse Indexes, B+ Tree Node Insertion/Splitting' },
        { num: 4, title: 'Transaction Processing & 2PL', topics: 'ACID Properties, Two-Phase Locking, Deadlock Prevention' },
        { num: 5, title: 'NoSQL & MongoDB', topics: 'Document Databases, Key-Value Stores, CAP Theorem' },
      ],
    },
    {
      code: '21CS62',
      name: 'Software Engineering & SDLC Architecture',
      credits: 3,
      faculty: 'Prof. Grace Hopper',
      progress: 80,
      attendancePct: 92.0,
      notesCount: 3,
      assignmentsCount: 1,
      quizzesCount: 4,
      pyqCount: 2,
      vtuNotesUrl: 'https://vtucircle.com/notes/21cs62',
      modules: [
        { num: 1, title: 'Software Process Models', topics: 'Waterfall, Spiral, Agile Scrum, User Stories' },
        { num: 2, title: 'Requirements Engineering', topics: 'Functional vs Non-Functional Requirements, SRS Document' },
        { num: 3, title: 'Software Design & Architecture', topics: 'Cohesion, Coupling, Architectural Patterns' },
        { num: 4, title: 'Software Testing Strategies', topics: 'Black-Box, White-Box, Unit & System Integration Testing' },
        { num: 5, title: 'DevOps & Maintenance', topics: 'CI/CD Pipelines, Refactoring, Software Maintenance Cost' },
      ],
    },
    {
      code: '21CS63',
      name: 'Web Technology & HTML5 Fullstack',
      credits: 4,
      faculty: 'Prof. Tim Berners-Lee',
      progress: 55,
      attendancePct: 81.0,
      notesCount: 5,
      assignmentsCount: 3,
      quizzesCount: 6,
      pyqCount: 4,
      vtuNotesUrl: 'https://vtucircle.com/notes/21cs63',
      modules: [
        { num: 1, title: 'HTML5 & CSS3 Styling', topics: 'Semantic Tags, Flexbox, CSS Grid, Responsive Design' },
        { num: 2, title: 'JavaScript & ES6 Syntax', topics: 'Promises, Async/Await, DOM Manipulation, Closures' },
        { num: 3, title: 'React.js & Component Architecture', topics: 'State, Hooks, Context API, Virtual DOM' },
        { num: 4, title: 'Node.js & Express REST APIs', topics: 'Middleware, Routing, JWT Authentication' },
        { num: 5, title: 'MongoDB & MERN Stack Integration', topics: 'Mongoose Schemas, CRUD Operations, Deployment' },
      ],
    },
    {
      code: '21CS64',
      name: 'Artificial Intelligence & Machine Learning',
      credits: 3,
      faculty: 'Prof. Geoffrey Hinton',
      progress: 42,
      attendancePct: 76.5,
      notesCount: 4,
      assignmentsCount: 2,
      quizzesCount: 3,
      pyqCount: 3,
      vtuNotesUrl: 'https://vtucircle.com/notes/21cs64',
      modules: [
        { num: 1, title: 'State-Space Search & Heuristics', topics: 'BFS, DFS, A* Search, Admissibility' },
        { num: 2, title: 'Adversarial Search & Games', topics: 'Minimax Algorithm, Alpha-Beta Pruning, Evaluation Functions' },
        { num: 3, title: 'Supervised Machine Learning', topics: 'Linear Regression, Decision Trees, SVM' },
        { num: 4, title: 'Neural Networks & Deep Learning', topics: 'Perceptrons, Backpropagation, CNN Architecture' },
        { num: 5, title: 'Reinforcement Learning & Ethics', topics: 'Q-Learning, MDPs, AI Governance & Ethics' },
      ],
    },
  ];

  const handleLaunchAITutor = (subject: SubjectHub) => {
    setActiveChatPrompt(`You are my AI Tutor for ${subject.code} ${subject.name}. Help me revise Module 1 through 5.`);
    setCurrentView('ai-chat');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Enrolled Subject Learning Hubs</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            {currentUser.collegeName} • {currentUser.branch} ({currentUser.semesterName})
          </p>
        </div>

        <button
          onClick={() => setCurrentView('profile')}
          className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:border-indigo-500 text-slate-800 dark:text-zinc-200 font-bold text-xs flex items-center space-x-1.5 transition-colors w-fit"
        >
          <Layers className="w-4 h-4 text-indigo-500" />
          <span>Manage Enrolled Subjects →</span>
        </button>
      </div>

      {/* SUBJECT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjectsData.map((sub) => (
          <motion.div
            key={sub.code}
            whileHover={{ y: -3 }}
            className="p-6 rounded-3xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm hover:border-indigo-500/50 transition-all space-y-5"
          >
            {/* Subject Card Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold border border-indigo-500/30">
                    {sub.code}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 dark:text-zinc-500">
                    {sub.credits} Credits
                  </span>
                </div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  {sub.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center space-x-1 font-medium">
                  <User className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{sub.faculty}</span>
                </p>
              </div>

              <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-500 font-bold text-xs shrink-0">
                {sub.attendancePct}% Attended
              </div>
            </div>

            {/* Syllabus Progress Bar */}
            <div className="space-y-1.5 p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200/80 dark:border-zinc-800/80">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500 dark:text-zinc-400">Syllabus Completion</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{sub.progress}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  style={{ width: `${sub.progress}%` }}
                  className="h-full bg-indigo-600 rounded-full"
                />
              </div>
            </div>

            {/* Quick Metrics Hub Bar */}
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60">
                <div className="font-mono font-extrabold text-slate-900 dark:text-white">{sub.notesCount}</div>
                <div className="text-[10px] text-slate-400">Notes</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60">
                <div className="font-mono font-extrabold text-amber-500">{sub.assignmentsCount}</div>
                <div className="text-[10px] text-slate-400">Tasks</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60">
                <div className="font-mono font-extrabold text-purple-500">{sub.quizzesCount}</div>
                <div className="text-[10px] text-slate-400">Quizzes</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/60">
                <div className="font-mono font-extrabold text-emerald-500">{sub.pyqCount}</div>
                <div className="text-[10px] text-slate-400">PYQP</div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center space-x-2 pt-2">
              <button
                onClick={() => setSelectedSubject(sub)}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center space-x-1"
              >
                <span>Open Subject Hub</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleLaunchAITutor(sub)}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-xs flex items-center space-x-1 transition-colors"
                title="Launch AI Tutor"
              >
                <Bot className="w-4 h-4 text-indigo-400" />
                <span className="hidden sm:inline">AI Tutor</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* DEDICATED SUBJECT WORKSPACE MODAL */}
      <AnimatePresence>
        {selectedSubject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="w-full max-w-3xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Subject Hub Header */}
              <div className="p-6 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold border border-indigo-500/30">
                      {selectedSubject.code}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{selectedSubject.credits} Credits</span>
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {selectedSubject.name} Workspace
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Faculty: {selectedSubject.faculty} • Attendance: {selectedSubject.attendancePct}%
                  </p>
                </div>

                <button
                  onClick={() => setSelectedSubject(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Workspace Navigation Tabs */}
              <div className="flex items-center space-x-2 px-6 pt-4 border-b border-slate-100 dark:border-zinc-800 text-xs font-bold">
                {(['syllabus', 'notes', 'pyqs', 'ai_tutor'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 px-3 capitalize transition-all border-b-2 ${
                      activeTab === tab
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 font-extrabold'
                        : 'border-transparent text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
                    }`}
                  >
                    {tab === 'syllabus' && 'Modules 1-5 Syllabus'}
                    {tab === 'notes' && 'VTU Notes & PDFs'}
                    {tab === 'pyqs' && 'Previous Year Papers (PYQP)'}
                    {tab === 'ai_tutor' && 'AI Subject Tutor'}
                  </button>
                ))}
              </div>

              {/* Workspace Content Body */}
              <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
                {activeTab === 'syllabus' && (
                  <div className="space-y-3">
                    {selectedSubject.modules.map((mod) => (
                      <div
                        key={mod.num}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono text-[11px]">
                            MODULE {mod.num}
                          </span>
                          <span className="text-[10px] text-slate-400">VTU 2022 Scheme</span>
                        </div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">{mod.title}</h3>
                        <p className="text-slate-600 dark:text-zinc-400 font-medium leading-relaxed">
                          {mod.topics}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'notes' && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-between text-indigo-600 dark:text-indigo-400 font-bold">
                      <span>Official VTU Circle Notes Link</span>
                      <a
                        href={selectedSubject.vtuNotesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline flex items-center space-x-1"
                      >
                        <span>Open Notes ↗</span>
                      </a>
                    </div>

                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        onClick={() => setCurrentView('doc-intelligence')}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-between cursor-pointer hover:border-indigo-500/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <FileText className="w-4 h-4 text-indigo-400" />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {selectedSubject.code}_Module{n}_Summary_Notes.pdf
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">2.4 MB • Updated 2 days ago</div>
                          </div>
                        </div>
                        <Download className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'pyqs' && (
                  <div className="space-y-3">
                    <div className="font-bold text-slate-900 dark:text-white text-xs">
                      VTU Previous Year Question Papers (2021-2023 Scheme):
                    </div>
                    {['Jan 2024 VTU Exam Paper', 'Jul 2023 VTU Model Paper 1', 'Feb 2023 VTU Model Paper 2'].map((paper) => (
                      <div
                        key={paper}
                        onClick={() => setCurrentView('doc-intelligence')}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-between cursor-pointer hover:border-indigo-500/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <FileCode className="w-4 h-4 text-purple-400" />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{paper}</div>
                            <div className="text-[10px] text-slate-400 font-mono">100 Marks • Solved Scheme & Solution</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-indigo-400" />
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'ai_tutor' && (
                  <div className="p-6 rounded-2xl bg-indigo-600 text-white space-y-4 text-center">
                    <Bot className="w-8 h-8 text-indigo-200 mx-auto" />
                    <div>
                      <h3 className="text-sm font-extrabold">Contextual AI Tutor for {selectedSubject.code}</h3>
                      <p className="text-xs text-indigo-100 mt-1 max-w-md mx-auto">
                        Ask Gemini 2.5 any concept, derivation, or viva question regarding {selectedSubject.name}.
                      </p>
                    </div>

                    <button
                      onClick={() => handleLaunchAITutor(selectedSubject)}
                      className="px-6 py-2.5 rounded-xl bg-white text-indigo-600 font-extrabold text-xs shadow-md inline-flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Start AI Tutor Chat</span>
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
