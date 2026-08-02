import React, { useState } from 'react';
import { Layers, Sparkles, RefreshCw, Calendar as CalendarIcon } from 'lucide-react';

export const AIStudyPlanner: React.FC = () => {
  const [studyHours, setStudyHours] = useState(4);
  const [startDate, setStartDate] = useState('2026-08-05');
  const [endDate, setEndDate] = useState('2026-08-18');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);

  // Calculate day difference
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const formatDateLabel = (dateStr: string, addDays: number) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + addDays);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const generatedPlan = [
    {
      day: `Day 1 (${formatDateLabel(startDate, 0)})`,
      focus: 'DBMS Normalization & B+ Trees',
      tasks: [
        { time: '09:00 AM - 11:00 AM', topic: 'BCNF Decomposition & Functional Dependencies', type: 'study' },
        { time: '11:15 AM - 12:15 PM', topic: 'B+ Tree Node Split Practice Problems', type: 'practice' },
        { time: '02:00 PM - 03:00 PM', topic: 'Module 1 Quick Quiz & Revision Notes', type: 'revision' },
      ],
    },
    {
      day: `Day 2 (${formatDateLabel(startDate, 1)})`,
      focus: 'AI Search Algorithms & Heuristics',
      tasks: [
        { time: '09:00 AM - 11:00 AM', topic: 'A* Search Admissibility & Consistency', type: 'study' },
        { time: '11:15 AM - 12:15 PM', topic: 'Alpha-Beta Pruning Tracing Problems', type: 'practice' },
        { time: '02:00 PM - 03:00 PM', topic: 'AI Lab Code Review & Heuristics', type: 'revision' },
      ],
    },
    {
      day: `Day 3 (${formatDateLabel(startDate, 2)})`,
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
    }, 800);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none">
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

      {/* Interactive Inputs Form Bar */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Daily Study Hours Slider */}
        <div className="md:col-span-4">
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
            <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 shrink-0">
              {studyHours} Hours/Day
            </span>
          </div>
        </div>

        {/* Start Date Picker */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-slate-800 dark:text-zinc-200 mb-1.5 flex items-center space-x-1">
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />
            <span>Start Exam Date:</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-white"
          />
        </div>

        {/* End Date Picker */}
        <div className="md:col-span-3">
          <label className="block text-xs font-semibold text-slate-800 dark:text-zinc-200 mb-1.5 flex items-center space-x-1">
            <CalendarIcon className="w-3.5 h-3.5 text-indigo-500" />
            <span>End Exam Date:</span>
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-white"
          />
        </div>

        {/* Generate Button */}
        <div className="md:col-span-2">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5 min-h-[40px]"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Plan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Target Range Status Badge */}
      <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold flex items-center justify-between">
        <span>Selected Exam Window: {formatDateLabel(startDate, 0)} - {formatDateLabel(endDate, 0)} ({diffDays} Days Total)</span>
        <span>Study Hours: {studyHours * diffDays} Total Hours</span>
      </div>

      {/* Generated Plan Output */}
      {hasGenerated && (
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Your Personalized Day-by-Day Study Schedule ({diffDays}-Day Window)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {generatedPlan.map((p) => (
              <div
                key={p.day}
                className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4"
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
