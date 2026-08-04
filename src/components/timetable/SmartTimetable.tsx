import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, MapPin, Clock, User } from 'lucide-react';

export const SmartTimetable: React.FC = () => {
  const { setCurrentView, activeCurriculum, currentUser } = useApp();
  const [selectedDay, setSelectedDay] = useState<'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] as const;

  const colorStyles: Record<string, string> = {
    indigo: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-500/30',
    purple: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
    rose: 'bg-rose-500/10 text-rose-700 dark:text-rose-400 border-rose-500/30',
  };

  const colorsList = ['indigo', 'purple', 'emerald', 'amber'];
  const timeslots = [
    { start: '09:00 AM', end: '10:00 AM', room: 'Hall 302' },
    { start: '11:00 AM', end: '12:00 PM', room: 'Hall 104' },
    { start: '02:00 PM', end: '03:00 PM', room: 'Lab 5' },
    { start: '03:30 PM', end: '04:30 PM', room: 'Hall 201' },
  ];

  // Compute dynamic classes from activeCurriculum
  const dayClasses = useMemo(() => {
    return activeCurriculum.slice(0, 4).map((sub, idx) => ({
      id: `cls-${sub.code}-${selectedDay}`,
      subjectCode: sub.code,
      subjectName: sub.name,
      faculty: sub.faculty || 'Dept Professor',
      room: timeslots[idx]?.room || 'Hall 301',
      building: 'Main Block',
      startTime: timeslots[idx]?.start || '09:00 AM',
      endTime: timeslots[idx]?.end || '10:00 AM',
      dayOfWeek: selectedDay,
      color: colorsList[idx % colorsList.length],
    }));
  }, [activeCurriculum, selectedDay]);

  // Compute dynamic exams from activeCurriculum
  const dayExams = useMemo(() => {
    return activeCurriculum.slice(0, 3).map((sub, idx) => ({
      id: `ex-${sub.code}`,
      subject: sub.name,
      code: sub.code,
      date: `2026-08-${15 + idx * 3}`,
      time: idx % 2 === 0 ? '10:00 AM - 01:00 PM' : '02:00 PM - 05:00 PM',
      room: `Examination Hall ${idx + 1}`,
      totalMarks: 100,
      syllabusCovered: `Modules 1 to 4: ${sub.modules[0]?.title || 'Intro'}, ${sub.modules[1]?.title || 'Core Foundations'}.`,
    }));
  }, [activeCurriculum]);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Atria Academic Calendar & Class Schedule</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            {currentUser.collegeName} • {currentUser.branch} ({currentUser.semesterName})
          </p>
        </div>
      </div>

      {/* Days Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-zinc-800 no-scrollbar">
        {days.map((d) => (
          <button
            key={d}
            onClick={() => setSelectedDay(d)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDay === d
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Main Grid: Day Lectures & Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Day Lecture Schedule Timeline (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            {selectedDay} Lectures ({dayClasses.length})
          </h2>

          <div className="space-y-3">
            {dayClasses.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-zinc-900 rounded-2xl border border-slate-200 dark:border-zinc-800 text-xs text-slate-500 dark:text-zinc-400">
                No lectures scheduled for {selectedDay}. Enjoy your study day!
              </div>
            ) : (
              dayClasses.map((cls) => (
                <div
                  key={cls.id}
                  className={`p-4 rounded-2xl border ${colorStyles[(cls.color || 'indigo') as keyof typeof colorStyles]} space-y-3`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider">
                      {cls.subjectCode}
                    </span>
                    <span className="text-xs font-mono font-bold flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        {cls.startTime} - {cls.endTime}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {cls.subjectName}
                  </h3>

                  <div className="flex items-center justify-between pt-2 border-t border-black/5 dark:border-white/10 text-xs">
                    <span className="flex items-center space-x-1 font-medium text-slate-700 dark:text-zinc-300">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{cls.faculty}</span>
                    </span>

                    <button
                      onClick={() => setCurrentView('campus-map')}
                      className="px-3 py-1.5 rounded-lg bg-white/80 dark:bg-black/40 text-slate-900 dark:text-white font-bold flex items-center space-x-1 hover:underline"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{cls.room} ({cls.building})</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Exam Countdown & Calendar (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Midterm Examination Calendar
          </h2>

          <div className="space-y-3">
            {dayExams.map((ex) => (
              <div
                key={ex.id}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                    {ex.code}: {ex.subject}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold">
                    {ex.totalMarks} Marks
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-700 dark:text-zinc-300">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    📅 Date: {ex.date} ({ex.time})
                  </p>
                  <p>📍 Venue: {ex.room}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 text-[11px] text-slate-800 dark:text-zinc-200 leading-relaxed border border-slate-200 dark:border-zinc-700">
                  <strong>Syllabus:</strong> {ex.syllabusCovered}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
