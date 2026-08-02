import React, { useState } from 'react';
import { Layers, Sparkles, RefreshCw } from 'lucide-react';

export const AIStudyPlanner: React.FC = () => {
  const [studyHours, setStudyHours] = useState(4);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);

  const samplePlan = [
    {
      day: 'Day 1 (Aug 2)',
      focus: 'DBMS Normalization & B+ Trees',
      tasks: [
        { time: '09:00 AM - 11:00 AM', topic: 'BCNF Decomposition & Functional Dependencies', type: 'study' },
        { time: '11:15 AM - 12:15 PM', topic: 'B+ Tree Node Split Practice Problems', type: 'practice' },
        { time: '02:00 PM - 03:00 PM', topic: 'Module 1 Quick Quiz & Revision Notes', type: 'revision' },
      ],
    },
    {
      day: 'Day 2 (Aug 3)',
      focus: 'AI Search Algorithms & Heuristics',
      tasks: [
        { time: '09:00 AM - 11:00 AM', topic: 'A* Search Admissibility & Consistency', type: 'study' },
        { time: '11:15 AM - 12:15 PM', topic: 'Alpha-Beta Pruning Tracing Problems', type: 'practice' },
        { time: '02:00 PM - 03:00 PM', topic: 'AI Lab Code Review & Heuristics', type: 'revision' },
      ],
    },
    {
      day: 'Day 3 (Aug 4)',
      focus: 'Operating Systems Process Synchronization',
      tasks: [
        { time: '09:00 AM - 11:00 AM', topic: 'Semaphores & Dining Philosophers Problem', type: 'study' },
        { time: '11:15 AM - 12:15 PM', topic: 'CPU Scheduling Equations (Turnaround vs Waiting)', type: 'practice' },
        { time: '02:00 PM - 03:00 PM', topic: 'OS Speed Practice Test', type: 'revision' },
      ],
    },
  ];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>AI Exam Study Planner</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Gemini generates daily study timetables, revision strategies, and break schedules.
          </p>
        </div>
      </div>

      {/* Inputs Form Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-slate-800 dark:text-zinc-200 mb-1.5">
            Daily Available Study Hours:
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="range"
              min="1"
              max="8"
              value={studyHours}
              onChange={(e) => setStudyHours(parseInt(e.target.value))}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 shrink-0">{studyHours} Hours/Day</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-800 dark:text-zinc-200 mb-1.5">
            Target Exam Date Range:
          </label>
          <input
            type="text"
            readOnly
            value="Aug 2 - Aug 15 (14 Days)"
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-white"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-2"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating Plan...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Study Timetable</span>
            </>
          )}
        </button>
      </div>

      {/* Generated Plan Output */}
      {hasGenerated && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Your Personalized Day-by-Day Study Schedule
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {samplePlan.map((p) => (
              <div
                key={p.day}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4"
              >
                <div className="pb-3 border-b border-slate-100 dark:border-zinc-800">
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                    {p.day}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {p.focus}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {p.tasks.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs space-y-1"
                    >
                      <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-300 block">
                        {t.time}
                      </span>
                      <p className="font-semibold text-slate-900 dark:text-zinc-100 leading-snug">{t.topic}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
