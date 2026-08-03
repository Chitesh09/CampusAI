import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Download } from 'lucide-react';

export const SmartNotes: React.FC = () => {
  const { activeCurriculum, currentUser } = useApp();
  const activeCourse = activeCurriculum[0] || { name: 'Database Management Systems', code: 'BCS501' };
  const [activeTab, setActiveTab] = useState<'short' | 'mindmap' | 'formulas' | 'viva'>('short');

  const tabs = [
    { id: 'short', label: 'Short Notes' },
    { id: 'mindmap', label: 'Mind Maps' },
    { id: 'formulas', label: 'Key Formulas' },
    { id: 'viva', label: 'Viva Q&A' },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>Smart Notes & Revision Hub</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            {currentUser.collegeName} • {currentUser.branch} ({currentUser.semesterName})
          </p>
        </div>

        <button
          onClick={() => alert('Exporting Smart Notes as PDF...')}
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-sm transition-all flex items-center space-x-2 w-fit"
        >
          <Download className="w-4 h-4" />
          <span>Export to PDF</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-zinc-800 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Display */}
      {activeTab === 'short' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {activeCourse.name} ({activeCourse.code}) - Revision Notes
            </h2>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">Module 1 - 5</span>
          </div>

          <div className="space-y-3 text-xs text-slate-800 dark:text-zinc-200 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">1. Normalization Rules</h3>
              <ul className="list-disc pl-4 space-y-1">
                <li><strong>1NF:</strong> Remove repeating groups; atomic attribute values only.</li>
                <li><strong>2NF:</strong> In 1NF + no partial dependency on composite candidate key.</li>
                <li><strong>3NF:</strong> In 2NF + no transitive dependency ($X \rightarrow Y$ where $X$ is not a superkey).</li>
                <li><strong>BCNF:</strong> For every functional dependency $X \rightarrow Y$, $X$ MUST be a superkey.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">2. Transaction Isolation Levels</h3>
              <p>Read Uncommitted $\rightarrow$ Read Committed $\rightarrow$ Repeatable Read $\rightarrow$ Serializable.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'mindmap' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Interactive Visual Mind Map: DBMS Architecture & Indexing
            </h2>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">Interactive Tree Nodes</span>
          </div>

          <div className="relative aspect-video max-h-96 w-full bg-slate-950 rounded-xl border border-zinc-800 p-4 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 800 400">
              <line x1="400" y1="200" x2="200" y2="100" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />
              <line x1="400" y1="200" x2="600" y2="100" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />
              <line x1="400" y1="200" x2="200" y2="300" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />
              <line x1="400" y1="200" x2="600" y2="300" stroke="#6366f1" strokeWidth="2" strokeDasharray="4" />

              <g transform="translate(400, 200)">
                <circle r="45" fill="#4f46e5" />
                <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="12" fontWeight="bold">
                  DBMS Core
                </text>
              </g>

              <g transform="translate(200, 100)" className="cursor-pointer">
                <rect x="-60" y="-20" width="120" height="40" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fill="#a5b4fc" fontSize="11" fontWeight="bold">
                  ACID Transactions
                </text>
              </g>

              <g transform="translate(600, 100)" className="cursor-pointer">
                <rect x="-60" y="-20" width="120" height="40" rx="10" fill="#311b92" stroke="#b388ff" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fill="#d1c4e9" fontSize="11" fontWeight="bold">
                  B+ Tree Indexing
                </text>
              </g>

              <g transform="translate(200, 300)" className="cursor-pointer">
                <rect x="-60" y="-20" width="120" height="40" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fill="#a7f3d0" fontSize="11" fontWeight="bold">
                  Normalization
                </text>
              </g>

              <g transform="translate(600, 300)" className="cursor-pointer">
                <rect x="-60" y="-20" width="120" height="40" rx="10" fill="#881337" stroke="#fb7185" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fill="#fecdd3" fontSize="11" fontWeight="bold">
                  2PL Concurrency
                </text>
              </g>
            </svg>
          </div>
        </div>
      )}

      {activeTab === 'formulas' && (
        <div className="p-6 rounded-2xl bg-slate-900 text-white border border-zinc-800 shadow-sm space-y-4 font-mono text-xs">
          <h2 className="text-sm font-bold text-indigo-400 font-sans">
            ⚡ 1-Page Midterm Exam Cheat Sheet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-purple-400 font-bold block">A* Search Formula:</span>
              <code>f(n) = g(n) + h(n)</code>
              <p className="text-[11px] text-zinc-400 font-sans">
                g(n) = path cost so far. h(n) = estimated cost to goal. Admissible if h(n) &lt;= h*(n).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-emerald-400 font-bold block">B+ Tree Split Rule:</span>
              <code>Node capacity M. Split at ceil(M/2)</code>
              <p className="text-[11px] text-zinc-400 font-sans">
                Leaf nodes store actual pointers; internal nodes store routing keys.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'viva' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Top 5 Viva Questions & Model Answers
          </h2>
          {[
            {
              q: 'What is the main difference between B-Tree and B+ Tree?',
              a: 'B+ Tree stores data records/pointers ONLY in leaf nodes and connects leaf nodes in a linked list for range queries. B-Tree stores data pointers in both internal and leaf nodes.',
            },
            {
              q: 'Why is Strict 2PL preferred over Basic 2PL?',
              a: 'Strict 2PL holds exclusive locks until transaction commit/abort, which prevents dirty reads and cascading rollbacks.',
            },
          ].map((item, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 space-y-1 text-xs">
              <p className="font-bold text-indigo-600 dark:text-indigo-400">Q{i + 1}: {item.q}</p>
              <p className="text-slate-800 dark:text-zinc-200">A: {item.a}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
