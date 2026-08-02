import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockClasses } from '../../data/mockData';
import { Calendar, MapPin, CheckCircle2, Clock, User, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimatedTimeline: React.FC = () => {
  const { setCurrentView } = useApp();
  const [viewMode, setViewMode] = useState<'today' | 'tomorrow' | 'week'>('today');
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null);

  const getEventsForView = () => {
    if (viewMode === 'tomorrow') {
      return mockClasses.filter((c) => c.dayOfWeek === 'Tuesday');
    }
    if (viewMode === 'week') {
      return mockClasses.slice(0, 6);
    }
    return mockClasses.filter((c) => c.dayOfWeek === 'Monday');
  };

  const events = getEventsForView();

  return (
    <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4 select-none">
      {/* Timeline Header & View Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Linear Schedule Engine
          </span>
          <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
            Interactive Milestone Timeline
          </h2>
        </div>

        {/* View Segmented Control */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-semibold">
          {(['today', 'tomorrow', 'week'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-lg capitalize transition-all ${
                viewMode === mode
                  ? 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-800 dark:hover:text-zinc-200'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Animated Timeline Items Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-zinc-800"
        >
          {events.map((evt, idx) => {
            const isActiveNow = idx === 0 && viewMode === 'today';
            const isCompleted = idx === 0 && viewMode !== 'today';
            const isHovered = hoveredEventId === evt.id;

            return (
              <div
                key={evt.id}
                onMouseEnter={() => setHoveredEventId(evt.id)}
                onMouseLeave={() => setHoveredEventId(null)}
                className="relative group cursor-pointer"
              >
                {/* Timeline Milestone Node Dot */}
                <div
                  className={`absolute -left-6 top-1 w-3 h-3 rounded-full border-2 transition-all ${
                    isActiveNow
                      ? 'bg-emerald-500 border-emerald-400 shadow-md scale-125'
                      : isCompleted
                      ? 'bg-indigo-500 border-indigo-400'
                      : 'bg-slate-300 dark:bg-zinc-700 border-slate-400 dark:border-zinc-600 group-hover:bg-indigo-400'
                  }`}
                >
                  {isActiveNow && (
                    <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-ping" />
                  )}
                </div>

                {/* Event Card Content */}
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    isHovered
                      ? 'bg-slate-50 dark:bg-zinc-900 border-indigo-500/50 shadow-md scale-[1.01]'
                      : 'bg-slate-50/50 dark:bg-zinc-900/40 border-slate-200/80 dark:border-zinc-800/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="space-y-0.5">
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400">
                          {evt.startTime} - {evt.endTime}
                        </span>
                        {isActiveNow && (
                          <span className="px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold border border-emerald-500/30">
                            ACTIVE NOW
                          </span>
                        )}
                        {isCompleted && (
                          <span className="px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[9px] font-extrabold border border-indigo-500/30 flex items-center space-x-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            <span>COMPLETED</span>
                          </span>
                        )}
                      </div>

                      <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                        {evt.subjectCode}: {evt.subjectName}
                      </h3>

                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 flex items-center space-x-1">
                        <User className="w-3 h-3 text-slate-400" />
                        <span>Prof. {evt.faculty}</span>
                      </p>
                    </div>

                    <button
                      onClick={() => setCurrentView('campus-map')}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-bold border border-slate-200 dark:border-zinc-700 hover:border-indigo-500 flex items-center space-x-1 shrink-0 w-fit"
                    >
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{evt.room} ({evt.building})</span>
                    </button>
                  </div>

                  {/* Hover Detail Expansion */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 pt-2.5 border-t border-slate-200 dark:border-zinc-800 text-[11px] text-slate-600 dark:text-zinc-400 space-y-1 overflow-hidden"
                      >
                        <p className="font-semibold text-slate-800 dark:text-zinc-200">
                          <strong>Syllabus Focus:</strong> Relational Algebra, B+ Tree Leaf Splits & 2PL Concurrency.
                        </p>
                        <p>📍 Location: Tech Annex Building Floor 2 (Elevator B)</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
