import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Layers,
  FileText,
  CheckSquare,
  FlaskConical,
  FileCode,
  Target,
  Sparkles,
  HelpCircle,
  Bot,
  BarChart2,
  Calendar,
  User,
  Clock,
  Download,
  Check,
  ChevronRight,
  ExternalLink,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SubjectsPage: React.FC = () => {
  const { setCurrentView, setActiveChatPrompt, currentUser, activeCurriculum } = useApp();

  const subjectsList = activeCurriculum;

  const [activeSubjectCode, setActiveSubjectCode] = useState<string>(
    subjectsList[0]?.code || ''
  );

  React.useEffect(() => {
    if (subjectsList.length > 0) {
      const codes = subjectsList.map((s) => s.code);
      if (!activeSubjectCode || !codes.includes(activeSubjectCode)) {
        setActiveSubjectCode(subjectsList[0].code);
      }
    } else {
      setActiveSubjectCode('');
    }
  }, [activeCurriculum]);
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'modules'
    | 'notes'
    | 'assignments'
    | 'labs'
    | 'pyqs'
    | 'imp_questions'
    | 'flashcards'
    | 'quiz'
    | 'ai_tutor'
    | 'progress'
    | 'attendance'
  >('overview');

  const currentSubject = subjectsList.find((s) => s.code === activeSubjectCode) || subjectsList[0];

  // Quiz state inside workspace
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  // Flashcards state
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  const handleLaunchAITutor = () => {
    setActiveChatPrompt(`You are my AI Tutor for ${currentSubject.code} ${currentSubject.name}. Help me revise Module 1 through 5.`);
    setCurrentView('ai-chat');
  };

  const tabsConfig = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'modules', label: 'Modules', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'notes', label: 'Notes', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'assignments', label: 'Assignments', icon: <CheckSquare className="w-3.5 h-3.5" /> },
    { id: 'labs', label: 'Lab Programs', icon: <FlaskConical className="w-3.5 h-3.5" /> },
    { id: 'pyqs', label: 'Previous Year Papers', icon: <FileCode className="w-3.5 h-3.5" /> },
    { id: 'imp_questions', label: 'Important Questions', icon: <Target className="w-3.5 h-3.5" /> },
    { id: 'flashcards', label: 'Flashcards', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'quiz', label: 'Quiz', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'ai_tutor', label: 'AI Tutor', icon: <Bot className="w-3.5 h-3.5" /> },
    { id: 'progress', label: 'Study Progress', icon: <BarChart2 className="w-3.5 h-3.5" /> },
    { id: 'attendance', label: 'Attendance', icon: <Calendar className="w-3.5 h-3.5" /> },
  ] as const;

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none">
      {/* 1. NOTION-STYLE WORKSPACE HEADER & COURSE SWITCHER */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
        {/* Course Switcher Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 mr-1">Switch Workspace:</span>
          {subjectsList.map((sub) => {
            const isActive = sub.code === activeSubjectCode;
            return (
              <button
                key={sub.code}
                onClick={() => setActiveSubjectCode(sub.code)}
                className={`px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                }`}
              >
                <span className="font-mono text-[10px] opacity-80">{sub.code}</span>
                <span>{sub.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Workspace Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-zinc-800">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold border border-indigo-500/30">
                {currentSubject.code}
              </span>
              <span className="text-xs font-mono text-slate-400">{currentSubject.credits} Credits</span>
              <span className="text-xs font-mono text-slate-400">• VTU 2022 Scheme</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {currentSubject.name} Workspace
            </h1>
            <p className="text-xs text-slate-500 dark:text-zinc-400 flex items-center space-x-2 font-medium">
              <span className="flex items-center space-x-1"><User className="w-3.5 h-3.5 text-indigo-400" /><span>{currentSubject.faculty}</span></span>
              <span>•</span>
              <span>{currentUser.collegeName}</span>
            </p>
          </div>

          <button
            onClick={handleLaunchAITutor}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-1.5 w-fit min-h-[44px]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Launch AI Tutor →</span>
          </button>
        </div>
      </div>

      {/* 2. NOTION WORKSPACE 12 TABS NAVIGATION BAR */}
      <div className="p-2 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm flex items-center space-x-1.5 overflow-x-auto no-scrollbar text-xs font-bold">
        {tabsConfig.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-xl transition-all flex items-center space-x-1.5 shrink-0 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs font-extrabold'
                  : 'text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. DEDICATED WORKSPACE TAB CONTENT BODY */}
      <div className="p-6 rounded-3xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm min-h-[400px]">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6 text-xs">
            <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-2">
              <div className="font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider text-[11px]">
                Course Description & Objectives
              </div>
              <p className="text-slate-700 dark:text-zinc-300 leading-relaxed font-medium">
                This course covers fundamental concepts of {currentSubject.name}, including relational data models, SQL queries, normalization (1NF to BCNF), transaction processing, 2-phase locking concurrency control, and NoSQL databases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Recommended Textbooks:</div>
                <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-zinc-400">
                  <li>Fundamentals of Database Systems - Elmasri & Navathe (7th Ed)</li>
                  <li>Database System Concepts - Silberschatz, Korth, Sudarshan (6th Ed)</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
                <div className="font-bold text-slate-900 dark:text-white">Faculty Office Hours:</div>
                <div className="text-slate-600 dark:text-zinc-400 space-y-1">
                  <div>Instructor: {currentSubject.faculty || 'Dept Faculty'}</div>
                  <div>Office Hours: Mon & Wed 02:00 PM - 04:00 PM (Dept Hall 302)</div>
                  <div>Contact: {(currentSubject.faculty || 'faculty').toLowerCase().replace(/[^a-z]/g, '')}@bmsce.ac.in</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MODULES */}
        {activeTab === 'modules' && (
          <div className="space-y-4 text-xs">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">Official VTU Scheme Modules (1 to 5):</h2>
            {currentSubject.modules.map((mod) => (
              <div key={mod.num} className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">MODULE {mod.num}</span>
                  <span className="text-[10px] text-slate-400">VTU Syllabus Standard</span>
                </div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">{mod.title}</h3>
                <p className="text-slate-600 dark:text-zinc-400 font-medium">{mod.topics}</p>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === 'notes' && (
          <div className="space-y-3 text-xs">
            <div className="font-extrabold text-slate-900 dark:text-white text-sm">Course Notes & PDF Decks:</div>
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                onClick={() => setCurrentView('doc-intelligence')}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-between cursor-pointer hover:border-indigo-500/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{currentSubject.code}_Module{num}_Notes.pdf</div>
                    <div className="text-[10px] text-slate-400 font-mono">Official VTU Circle Notes • 3.2 MB</div>
                  </div>
                </div>
                <Download className="w-4 h-4 text-slate-400" />
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="space-y-3 text-xs">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">Coursework Assignments & Deadlines:</h2>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Assignment 1: ER Diagram & Schema Mapping</div>
                <div className="text-[10px] text-amber-500 font-mono mt-0.5">Due: Aug 10, 2026 • 20 Marks</div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/30">Pending</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-between opacity-70">
              <div>
                <div className="font-bold text-slate-900 dark:text-white">Assignment 2: SQL Joins & Subqueries</div>
                <div className="text-[10px] text-emerald-500 font-mono mt-0.5">Submitted Jul 28 • 20/20 Marks</div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">Completed</span>
            </div>
          </div>
        )}

        {/* TAB 5: LAB PROGRAMS */}
        {activeTab === 'labs' && (
          <div className="space-y-4 text-xs">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">VTU Laboratory Practical Programs:</h2>
            {[
              { num: 1, title: 'Lab Program 1: Bank Database ER Model & SQL Tables', codeSnippet: 'CREATE TABLE Bank_Customer (AccNo INT PRIMARY KEY, Name VARCHAR(50), Balance DECIMAL(10,2));' },
              { num: 2, title: 'Lab Program 2: Order Processing System & Complex Join Queries', codeSnippet: 'SELECT Customer.Name, COUNT(Orders.OrderID) FROM Customer JOIN Orders ON Customer.ID = Orders.CID GROUP BY Customer.Name;' },
              { num: 3, title: 'Lab Program 3: Student Registration System & Triggers', codeSnippet: 'CREATE TRIGGER Check_GPA BEFORE INSERT ON Student FOR EACH ROW BEGIN IF NEW.GPA < 0 THEN SET NEW.GPA = 0; END IF; END;' },
            ].map((lab) => (
              <div key={lab.num} className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-2">
                <div className="font-extrabold text-slate-900 dark:text-white">{lab.title}</div>
                <pre className="p-3 rounded-lg bg-slate-900 text-emerald-400 font-mono text-[11px] overflow-x-auto">
                  <code>{lab.codeSnippet}</code>
                </pre>
              </div>
            ))}
          </div>
        )}

        {/* TAB 6: PREVIOUS YEAR PAPERS */}
        {activeTab === 'pyqs' && (
          <div className="space-y-3 text-xs">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">VTU Solved Model & Semester Question Papers:</h2>
            {['VTU Jan 2024 Exam Question Paper', 'VTU Jul 2023 Model Question Paper 1', 'VTU Feb 2023 Model Question Paper 2'].map((paper) => (
              <div key={paper} className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileCode className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{paper}</div>
                    <div className="text-[10px] text-slate-400 font-mono">100 Marks • Full Marking Scheme Solution</div>
                  </div>
                </div>
                <button onClick={() => setCurrentView('doc-intelligence')} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold">Open PYQ →</button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 7: IMPORTANT QUESTIONS */}
        {activeTab === 'imp_questions' && (
          <div className="space-y-3 text-xs">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">VTU 10-Mark Repeated Exam Questions:</h2>
            {[
              'Q1. Explain 3-Schema Architecture with neat block diagram. (10 Marks)',
              'Q2. State and explain 1NF, 2NF, 3NF and BCNF normalization with suitable examples. (10 Marks)',
              'Q3. What is 2-Phase Locking Protocol (2PL)? Differentiate Strict 2PL vs Rigorous 2PL. (10 Marks)',
              'Q4. Explain B+ Tree Node Insertion and Splitting Algorithm with example diagram. (10 Marks)',
            ].map((q, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 font-semibold text-slate-800 dark:text-zinc-200">
                {q}
              </div>
            ))}
          </div>
        )}

        {/* TAB 8: FLASHCARDS */}
        {activeTab === 'flashcards' && (
          <div className="space-y-4 text-xs">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">Interactive Concept Revision Flashcards (Click to flip):</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 1, front: 'What is ACID Properties in DBMS?', back: 'Atomicity, Consistency, Isolation, Durability ensuring reliable transaction processing.' },
                { id: 2, front: 'What is BCNF vs 3NF?', back: 'Boyce-Codd Normal Form requires every determinant to be a super key.' },
              ].map((card) => (
                <div
                  key={card.id}
                  onClick={() => setFlippedCardId(flippedCardId === card.id ? null : card.id)}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-indigo-500/30 cursor-pointer min-h-[120px] flex items-center justify-center text-center font-bold text-slate-900 dark:text-white transition-all shadow-xs"
                >
                  {flippedCardId === card.id ? card.back : card.front}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 9: QUIZ */}
        {activeTab === 'quiz' && (
          <div className="space-y-4 text-xs max-w-xl">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">Module Practice Test Quiz:</h2>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
              <div className="font-extrabold text-slate-900 dark:text-white">Q1: Which normal form eliminates transitive dependency?</div>
              {['1NF', '2NF', '3NF', 'BCNF'].map((opt, idx) => (
                <button
                  key={opt}
                  onClick={() => setSelectedQuizAnswer(idx)}
                  className={`w-full p-3 rounded-xl border text-left font-semibold transition-all ${
                    selectedQuizAnswer === idx
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border-slate-200 dark:border-zinc-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
              <button
                onClick={() => setIsQuizSubmitted(true)}
                className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-bold"
              >
                Submit Quiz Answer
              </button>
              {isQuizSubmitted && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-extrabold">
                  ✓ Correct Answer! 3NF eliminates transitive dependencies.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 10: AI TUTOR */}
        {activeTab === 'ai_tutor' && (
          <div className="p-8 rounded-3xl bg-indigo-600 text-white text-center space-y-4">
            <Bot className="w-10 h-10 mx-auto text-indigo-200" />
            <h2 className="text-base font-extrabold">Dedicated AI Subject Tutor for {currentSubject.code}</h2>
            <p className="text-xs text-indigo-100 max-w-md mx-auto">
              Ask Gemini 2.5 any question about ER diagrams, SQL joins, B+ tree node splits, or transaction 2PL protocols.
            </p>
            <button onClick={handleLaunchAITutor} className="px-6 py-2.5 rounded-xl bg-white text-indigo-600 font-extrabold text-xs shadow-md">
              Start AI Tutor Chat →
            </button>
          </div>
        )}

        {/* TAB 11: STUDY PROGRESS */}
        {activeTab === 'progress' && (
          <div className="space-y-4 text-xs">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">Syllabus Completion & Module Progress:</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between font-bold">
                <span>Overall Syllabus Progress</span>
                <span className="text-indigo-500">68% Completed</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                <div className="w-[68%] h-full bg-indigo-600 rounded-full" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 12: ATTENDANCE */}
        {activeTab === 'attendance' && (
          <div className="space-y-4 text-xs">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-sm">Subject Class Attendance Log:</h2>
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold text-emerald-500">88.5%</div>
                <div className="text-slate-500">31 Attended out of 35 Total Classes</div>
              </div>
              <button onClick={() => setCurrentView('attendance')} className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold">
                Open Safe Bunk Predictor →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
