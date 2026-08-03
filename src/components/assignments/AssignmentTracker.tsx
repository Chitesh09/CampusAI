import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Assignment } from '../../types';
import {
  CheckSquare,
  Plus,
  Calendar,
} from 'lucide-react';

export const AssignmentTracker: React.FC = () => {
  const { assignments, addAssignment, toggleAssignmentStatus, activeCurriculum, currentUser } = useApp();
  const [filter, setFilter] = useState<'all' | 'pending' | 'in-progress' | 'completed'>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState(activeCurriculum[0]?.name || 'Database Management Systems');
  const [deadline, setDeadline] = useState('2026-08-10');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');

  // Compute dynamic assignments mapped to activeCurriculum
  const dynamicAssignments = activeCurriculum.flatMap((sub, idx) => [
    {
      id: `asgn-${sub.code}-1`,
      title: `${sub.code} Module 1 & 2 Coursework Report`,
      subject: sub.name,
      deadline: '2026-08-12',
      status: 'pending' as const,
      priority: 'high' as const,
      description: `Complete technical coursework report for ${sub.name} Module 1 topics.`,
      points: 50,
    },
    {
      id: `asgn-${sub.code}-2`,
      title: `${sub.code} Practice Problems Set`,
      subject: sub.name,
      deadline: '2026-08-20',
      status: 'completed' as const,
      priority: 'medium' as const,
      description: `Solved problem set covering ${sub.name} core concepts.`,
      points: 50,
    },
  ]);

  const allAssignments = [...assignments, ...dynamicAssignments];
  const filtered = allAssignments.filter((a) => (filter === 'all' ? true : a.status === filter));

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newAssignment: Assignment = {
      id: `asgn_${Date.now()}`,
      title: title.trim(),
      subject,
      deadline,
      status: 'pending',
      priority,
      description: `Target assignment created for ${subject}. Track progress & verify submission guidelines.`,
      points: 100,
    };

    addAssignment(newAssignment);
    setTitle('');
    setShowAddModal(false);
  };

  const priorityBadges: Record<'high' | 'medium' | 'low', string> = {
    high: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30',
    medium: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    low: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <CheckSquare className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Assignment Tracker & Kanban</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Track coursework deadlines, priority submission status, and AI assignment outlines.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-zinc-800 no-scrollbar">
        {[
          { id: 'all', label: 'All Tasks' },
          { id: 'pending', label: 'Pending' },
          { id: 'in-progress', label: 'In Progress' },
          { id: 'completed', label: 'Completed' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filter === tab.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {item.subject}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${priorityBadges[(item.priority || 'medium') as keyof typeof priorityBadges]}`}>
                  {(item.priority || 'medium').toUpperCase()}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-snug">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-zinc-400 font-mono text-[11px] flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Due {item.deadline}</span>
              </span>

              <button
                onClick={() => toggleAssignmentStatus(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  item.status === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                    : item.status === 'in-progress'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                    : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300'
                }`}
              >
                {item.status === 'completed' ? 'Completed ✓' : item.status === 'in-progress' ? 'In Progress' : 'Mark In Progress'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Create New Course Assignment
            </h2>
            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">
                  Assignment Title:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. B+ Tree Leaf Node Split Implementation"
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">
                  Subject Course:
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                >
                  <option value="DBMS CS601">DBMS CS601</option>
                  <option value="AI CS602">AI CS602</option>
                  <option value="OS CS603">OS CS603</option>
                  <option value="CN CS604">CN CS604</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-zinc-300 font-semibold mb-1">
                  Deadline:
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
