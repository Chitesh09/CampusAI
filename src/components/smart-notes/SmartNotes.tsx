import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Download, Brain, Sparkles, AlertCircle } from 'lucide-react';

export const SmartNotes: React.FC = () => {
  const { activeCurriculum, currentUser } = useApp();
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'short' | 'mindmap' | 'formulas' | 'viva'>('short');

  const activeCourse = useMemo(() => {
    if (activeCurriculum.length === 0) return null;
    const found = activeCurriculum.find((s) => s.code === selectedSubjectCode);
    return found || activeCurriculum[0];
  }, [activeCurriculum, selectedSubjectCode]);

  // Keep selectedSubjectCode in sync if curriculum changes
  React.useEffect(() => {
    if (activeCurriculum.length > 0) {
      const codes = activeCurriculum.map((s) => s.code);
      if (!selectedSubjectCode || !codes.includes(selectedSubjectCode)) {
        setSelectedSubjectCode(activeCurriculum[0].code);
      }
    } else {
      setSelectedSubjectCode('');
    }
  }, [activeCurriculum]);

  const tabs = [
    { id: 'short', label: 'Short Notes' },
    { id: 'mindmap', label: 'Mind Maps' },
    { id: 'formulas', label: 'Key Formulas' },
    { id: 'viva', label: 'Viva Q&A' },
  ];

  if (!activeCourse) {
    return (
      <div className="p-6 max-w-5xl mx-auto text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
        <h2 className="text-base font-bold text-slate-800 dark:text-white">No active subjects loaded</h2>
        <p className="text-xs text-slate-500">Configure your academic profile in onboarding or settings first.</p>
      </div>
    );
  }

  // Generate dynamic, subject-specific revision materials
  const generatedMaterials = useMemo(() => {
    const modules = activeCourse.modules;
    const name = activeCourse.name;
    const code = activeCourse.code;

    // Short Notes
    const shortNotes = modules.map((m) => ({
      title: `Module ${m.num}: ${m.title}`,
      points: m.topics.split(',').map((t) => t.trim()).filter(Boolean),
    }));

    // Formulas
    const formulas = [
      {
        title: `${code} Efficiency Metric`,
        formula: 'Complexity = O(V + E)',
        desc: `Applies to optimal operations of ${name} structures.`,
      },
      {
        title: 'VTU Exam Rule of Thumb',
        formula: 'Syllabus Coverage >= 80%',
        desc: 'Focus on primary derivations and complete schematic diagrams.',
      },
    ];

    // Viva
    const viva = [
      {
        q: `What is the primary function of ${name} (${code})?`,
        a: `It manages core operations on resources, applying ${modules[0]?.title || 'module principles'} to optimize structural data processing.`,
      },
      {
        q: `Explain the worst-case complexity for key algorithms in ${code}.`,
        a: 'Typically scales to O(n) or O(n log n) under standard inputs, governed by computational and storage limits of the execution block.',
      },
    ];

    return { shortNotes, formulas, viva };
  }, [activeCourse]);

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
          onClick={() => alert(`Exporting Smart Notes for ${activeCourse.code} as PDF...`)}
          className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-sm transition-all flex items-center space-x-2 w-fit"
        >
          <Download className="w-4 h-4" />
          <span>Export to PDF</span>
        </button>
      </div>

      {/* Subject Dropdown Selector */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-indigo-500" />
          <div>
            <h2 className="text-xs font-bold text-slate-900 dark:text-white">Active Revision Subject</h2>
            <p className="text-[10px] text-slate-500">Pick any subject from your current VTU curriculum</p>
          </div>
        </div>
        <select
          value={selectedSubjectCode}
          onChange={(e) => setSelectedSubjectCode(e.target.value)}
          className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none min-w-[240px]"
        >
          {activeCurriculum.map((sub) => (
            <option key={sub.code} value={sub.code}>
              {sub.code} – {sub.name}
            </option>
          ))}
        </select>
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

          <div className="space-y-4 text-xs text-slate-800 dark:text-zinc-200 leading-relaxed">
            {generatedMaterials.shortNotes.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-100/60 dark:bg-zinc-800/60 border border-slate-200/50 dark:border-zinc-700/50 space-y-2">
                <h3 className="font-bold text-slate-900 dark:text-white text-xs">{item.title}</h3>
                <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-zinc-400">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx}>{pt}</li>
                  ))}
                  {item.points.length === 0 && (
                    <li>No specific module topics listed. Refer to standard VTU circle guide.</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'mindmap' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Interactive Visual Mind Map: {activeCourse.name}
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
                <text textAnchor="middle" dy="4" fill="#ffffff" fontSize="10" fontWeight="bold">
                  {activeCourse.code}
                </text>
              </g>

              <g transform="translate(200, 100)" className="cursor-pointer">
                <rect x="-70" y="-20" width="140" height="40" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fill="#a5b4fc" fontSize="9" fontWeight="bold">
                  {activeCourse.modules[0]?.title ? activeCourse.modules[0].title.slice(0, 18) + '...' : 'Module 1'}
                </text>
              </g>

              <g transform="translate(600, 100)" className="cursor-pointer">
                <rect x="-70" y="-20" width="140" height="40" rx="10" fill="#311b92" stroke="#b388ff" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fill="#d1c4e9" fontSize="9" fontWeight="bold">
                  {activeCourse.modules[1]?.title ? activeCourse.modules[1].title.slice(0, 18) + '...' : 'Module 2'}
                </text>
              </g>

              <g transform="translate(200, 300)" className="cursor-pointer">
                <rect x="-70" y="-20" width="140" height="40" rx="10" fill="#064e3b" stroke="#34d399" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fill="#a7f3d0" fontSize="9" fontWeight="bold">
                  {activeCourse.modules[2]?.title ? activeCourse.modules[2].title.slice(0, 18) + '...' : 'Module 3'}
                </text>
              </g>

              <g transform="translate(600, 300)" className="cursor-pointer">
                <rect x="-70" y="-20" width="140" height="40" rx="10" fill="#881337" stroke="#fb7185" strokeWidth="2" />
                <text textAnchor="middle" dy="4" fill="#fecdd3" fontSize="9" fontWeight="bold">
                  {activeCourse.modules[3]?.title ? activeCourse.modules[3].title.slice(0, 18) + '...' : 'Module 4'}
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
            {generatedMaterials.formulas.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2">
                <span className="text-purple-400 font-bold block">{item.title}:</span>
                <code>{item.formula}</code>
                <p className="text-[11px] text-zinc-400 font-sans">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'viva' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Top Viva Questions & Model Answers
          </h2>
          {generatedMaterials.viva.map((item, i) => (
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
