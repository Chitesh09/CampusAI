import React, { useState } from 'react';
import { UserCheck, Sparkles } from 'lucide-react';

export const ProfessorMode: React.FC = () => {
  const [lectureTitle, setLectureTitle] = useState('DBMS Module 4: Concurrency & Lock Protocols');
  const [activeTab, setActiveTab] = useState<'lesson' | 'ppt' | 'blooms' | 'rubric'>('lesson');

  const handleGenerate = () => {
    // Generate trigger action
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <UserCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>Professor & Faculty AI Suite</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Upload course materials to generate Lesson Plans, PPT outlines, Bloom's Taxonomy Qs & Rubrics.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-2 w-fit"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate Faculty Pack</span>
        </button>
      </div>

      {/* Input bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 w-full">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-1">
            Lecture Topic / PDF Source:
          </label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-white"
          />
        </div>
        <button
          onClick={handleGenerate}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold shrink-0 hover:bg-slate-200 dark:hover:bg-zinc-700"
        >
          Re-Analyze Topic
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-zinc-800 no-scrollbar">
        {[
          { id: 'lesson', label: 'Detailed Lesson Plan' },
          { id: 'ppt', label: 'PowerPoint Slide Outline' },
          { id: 'blooms', label: "Bloom's Taxonomy Qs" },
          { id: 'rubric', label: 'Evaluation Rubric' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content Output */}
      {activeTab === 'lesson' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4 text-xs text-slate-800 dark:text-zinc-200">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            60-Minute Lesson Plan: {lectureTitle}
          </h2>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
              <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">00:00 - 00:10 (10 mins): Introduction & Motivation</span>
              <p>Review ACID properties and explain why concurrent transactions require Locking Protocols (2PL).</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
              <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">00:10 - 00:35 (25 mins): Core Theoretical Exposition</span>
              <p>Derive Growing Phase and Shrinking Phase rules. Demonstrate deadlock prevention using Wait-Die and Wound-Wait algorithms.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
              <span className="font-bold text-purple-600 dark:text-purple-400 block mb-1">00:35 - 00:50 (15 mins): Blackboard Worked Example</span>
              <p>Solve precedence graph cycle detection problem with student interaction.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'blooms' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3 text-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Bloom's Taxonomy Aligned Questions
          </h2>
          {[
            { level: 'Remembering (Level 1)', q: 'Define the 4 ACID properties in Database Systems.' },
            { level: 'Understanding (Level 2)', q: 'Explain why Strict 2PL prevents cascading rollbacks.' },
            { level: 'Applying (Level 3)', q: 'Given functional dependencies {A->B, B->C}, decompose table into 3NF.' },
            { level: 'Analyzing (Level 4)', q: 'Compare Wait-Die vs Wound-Wait deadlock prevention algorithms.' },
            { level: 'Evaluating (Level 5)', q: 'Critique the performance impact of Serializability on high-throughput OLTP systems.' },
          ].map((b) => (
            <div key={b.level} className="p-3.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
              <span className="font-bold text-indigo-600 dark:text-indigo-400 block mb-0.5">{b.level}</span>
              <p className="text-slate-900 dark:text-zinc-100">{b.q}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
