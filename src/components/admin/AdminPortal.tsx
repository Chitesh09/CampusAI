import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Megaphone, UploadCloud, CheckCircle2, Send, Users, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminPortal: React.FC = () => {
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle.trim()) return;
    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastSuccess(false);
      setBroadcastTitle('');
      setBroadcastMessage('');
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span>Academic Admin & Registrar Portal</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Publish timetables, exam dates, circulars, and broadcast announcements to student dashboards.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Campus Broadcast Broadcaster (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-500">
            <Megaphone className="w-4 h-4" />
            <span>Broadcast Instant Announcement</span>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold mb-1">Notice Title</label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. Google Edu on Air Event Livestream"
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Message Content</label>
              <textarea
                rows={4}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Type your official announcement here..."
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center justify-center space-x-1.5 shadow-glow-sm"
            >
              <Send className="w-4 h-4" />
              <span>{broadcastSuccess ? 'Broadcast Sent to All Students!' : 'Broadcast to Campus Dashboard'}</span>
            </button>
          </form>
        </div>

        {/* Master Upload Tools (6 cols) */}
        <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Upload & Publish Academic Data</h2>

          <div className="space-y-2.5">
            {[
              { label: 'Master Timetable CSV/Excel', desc: 'Sync class timings & room allocations' },
              { label: 'Exam Schedule PDF', desc: 'Auto-parse exam dates and hall assignments' },
              { label: 'Faculty & Subject Mapping', desc: 'Update course instructors & lab in-charges' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-850 border border-slate-200 dark:border-zinc-800 flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">{item.label}</h3>
                  <p className="text-[11px] text-slate-500 dark:text-zinc-400">{item.desc}</p>
                </div>
                <button className="px-3 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center space-x-1">
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Upload</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
