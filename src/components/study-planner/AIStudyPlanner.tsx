import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  RefreshCw,
  Calendar as CalendarIcon,
  Plus,
  Trash2,
  BookOpen,
  ExternalLink,
  CheckCircle,
  Filter,
} from 'lucide-react';

interface VTUSubject {
  id: string;
  code: string;
  name: string;
  vtuNotesModule: string;
}

export const AIStudyPlanner: React.FC = () => {
  const [selectedSem, setSelectedSem] = useState('Sem 6');
  const [studyHours, setStudyHours] = useState(4);
  const [startDate, setStartDate] = useState('2026-08-05');
  const [endDate, setEndDate] = useState('2026-08-18');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');

  // Active Subject List for current semester
  const [subjects, setSubjects] = useState<VTUSubject[]>([
    { id: 'subj-1', code: '21CS61', name: 'Database Management Systems', vtuNotesModule: 'VTU Circle Module 1-5 Notes' },
    { id: 'subj-2', code: '21CS62', name: 'Software Engineering & SDLC', vtuNotesModule: 'VTU Circle Module 1-5 Notes' },
    { id: 'subj-3', code: '21CS63', name: 'Web Technology & HTML5', vtuNotesModule: 'VTU Circle Module 1-5 Notes' },
    { id: 'subj-4', code: '21CS64', name: 'Artificial Intelligence & ML', vtuNotesModule: 'VTU Circle Module 1-5 Notes' },
  ]);

  // Modal / Form state for adding subjects
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubjCode, setNewSubjCode] = useState('');
  const [newSubjName, setNewSubjName] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);

  // Date Math
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end.getTime() - start.getTime();
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const formatDateLabel = (dateStr: string, addDays: number) => {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + addDays);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjCode.trim() || !newSubjName.trim()) return;

    const newSubj: VTUSubject = {
      id: `subj-${Date.now()}`,
      code: newSubjCode.trim().toUpperCase(),
      name: newSubjName.trim(),
      vtuNotesModule: 'VTU Circle Module 1-5 Notes',
    };

    setSubjects((prev) => [...prev, newSubj]);
    setNewSubjCode('');
    setNewSubjName('');
    setShowAddForm(false);
  };

  const handleRemoveSubject = (id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    if (selectedSubjectId === id) setSelectedSubjectId('all');
  };

  const handleSemChange = (sem: string) => {
    setSelectedSem(sem);
    if (sem === 'Sem 6') {
      setSubjects([
        { id: 'subj-1', code: '21CS61', name: 'Database Management Systems', vtuNotesModule: 'VTU Circle Module 1-5 Notes' },
        { id: 'subj-2', code: '21CS62', name: 'Software Engineering & SDLC', vtuNotesModule: 'VTU Circle Module 1-5 Notes' },
        { id: 'subj-3', code: '21CS63', name: 'Web Technology & HTML5', vtuNotesModule: 'VTU Circle Module 1-5 Notes' },
        { id: 'subj-4', code: '21CS64', name: 'Artificial Intelligence & ML', vtuNotesModule: 'VTU Circle Module 1-5 Notes' },
      ]);
    } else if (sem === 'Sem 5') {
      setSubjects([
        { id: 'subj-501', code: '21CS51', name: 'Management & Entrepreneurship', vtuNotesModule: 'VTU Circle Notes' },
        { id: 'subj-502', code: '21CS52', name: 'Computer Networks', vtuNotesModule: 'VTU Circle Notes' },
        { id: 'subj-503', code: '21CS53', name: 'DBMS Lab & Theory', vtuNotesModule: 'VTU Circle Notes' },
      ]);
    } else {
      setSubjects([
        { id: `subj-${sem}-1`, code: `21CS${sem.replace('Sem ', '')}1`, name: `${sem} Core Engineering Subject 1`, vtuNotesModule: 'VTU Circle Notes' },
        { id: `subj-${sem}-2`, code: `21CS${sem.replace('Sem ', '')}2`, name: `${sem} Core Engineering Subject 2`, vtuNotesModule: 'VTU Circle Notes' },
      ]);
    }
  };

  // Base Timetable
  const rawGeneratedPlan = [
    {
      day: `Day 1 (${formatDateLabel(startDate, 0)})`,
      focus: 'DBMS Normalization & B+ Trees',
      subjectCode: '21CS61',
      subjectName: 'Database Management Systems',
      vtuNotes: 'VTU Circle Module 1 & 2 Notes: ER Diagrams, SQL & Normalization',
      tasks: [
        { time: '09:00 AM - 11:00 AM', topic: 'BCNF Decomposition & Functional Dependencies', type: 'study' },
        { time: '11:15 AM - 12:15 PM', topic: 'B+ Tree Node Split Practice Problems', type: 'practice' },
        { time: '02:00 PM - 03:00 PM', topic: 'Module 1 Quick Quiz & Revision Notes', type: 'revision' },
      ],
    },
    {
      day: `Day 2 (${formatDateLabel(startDate, 1)})`,
      focus: 'AI Search Algorithms & Heuristics',
      subjectCode: '21CS64',
      subjectName: 'Artificial Intelligence & ML',
      vtuNotes: 'VTU Circle Module 3 Notes: A* Search, Heuristics & Alpha-Beta Pruning',
      tasks: [
        { time: '09:00 AM - 11:00 AM', topic: 'A* Search Admissibility & Consistency', type: 'study' },
        { time: '11:15 AM - 12:15 PM', topic: 'Alpha-Beta Pruning Tracing Problems', type: 'practice' },
        { time: '02:00 PM - 03:00 PM', topic: 'AI Lab Code Review & Heuristics', type: 'revision' },
      ],
    },
    {
      day: `Day 3 (${formatDateLabel(startDate, 2)})`,
      focus: 'Software Engineering & Agile SDLC',
      subjectCode: '21CS62',
      subjectName: 'Software Engineering & SDLC',
      vtuNotes: 'VTU Circle Module 4 Notes: Agile Scrum, User Stories & Software Testing',
      tasks: [
        { time: '09:00 AM - 11:00 AM', topic: 'Requirements Engineering & UML Use Cases', type: 'study' },
        { time: '11:15 AM - 12:15 PM', topic: 'Black Box vs White Box Test Cases', type: 'practice' },
        { time: '02:00 PM - 03:00 PM', topic: 'Agile Model Viva Qs', type: 'revision' },
      ],
    },
  ];

  const filteredPlan = selectedSubjectId === 'all'
    ? rawGeneratedPlan
    : rawGeneratedPlan.filter((p) => {
        const sub = subjects.find((s) => s.id === selectedSubjectId);
        return sub ? p.subjectCode === sub.code : true;
      });

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 800);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none">
      {/* Header & Semester Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <Layers className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>VTU AI Exam Study Planner</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Gemini AI references official <strong>VTU Circle Notes & Model Question Papers</strong> to generate semester & subject-wise study timetables.
          </p>
        </div>

        {/* Semester Selector Pill Dropdown */}
        <div className="flex items-center space-x-2 bg-white dark:bg-[#111114] p-1.5 rounded-xl border border-slate-200 dark:border-white/[0.06] shadow-sm">
          <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 pl-2">Semester:</span>
          <select
            value={selectedSem}
            onChange={(e) => handleSemChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
          >
            {['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'].map((sem) => (
              <option key={sem} value={sem}>
                {sem} (VTU)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* MANUAL SUBJECT MANAGEMENT BAR */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {selectedSem} Active Subjects ({subjects.length})
            </h2>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center space-x-1 shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Custom Subject</span>
          </button>
        </div>

        {/* Add Subject Inline Form */}
        {showAddForm && (
          <form onSubmit={handleAddSubject} className="p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-indigo-500/30 flex flex-col sm:flex-row items-center gap-2">
            <input
              type="text"
              placeholder="Code (e.g., 21CS65)"
              value={newSubjCode}
              onChange={(e) => setNewSubjCode(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white w-full sm:w-36 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Subject Name (e.g., Cloud Computing & AWS)"
              value={newSubjName}
              onChange={(e) => setNewSubjName(e.target.value)}
              className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white flex-1 focus:outline-none w-full"
            />
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors w-full sm:w-auto"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-bold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Subject Badges with Remove Action */}
        <div className="flex flex-wrap gap-2 pt-1">
          {subjects.map((subj) => (
            <div
              key={subj.id}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs flex items-center space-x-2 group hover:border-indigo-500 transition-colors"
            >
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">{subj.code}</span>
              <span className="font-semibold text-slate-800 dark:text-zinc-200">{subj.name}</span>
              <button
                onClick={() => handleRemoveSubject(subj.id)}
                className="text-slate-400 hover:text-rose-500 ml-1 p-0.5 rounded transition-colors"
                title="Remove Subject"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* INPUTS FORM BAR */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        {/* Daily Study Hours Slider */}
        <div className="md:col-span-3">
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
              {studyHours} Hrs/Day
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
        <div className="md:col-span-3">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center space-x-1.5 min-h-[40px]"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Generating VTU Plan...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate VTU Study Timetable</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Target Range & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold">
        <span>Selected Exam Window: {formatDateLabel(startDate, 0)} - {formatDateLabel(endDate, 0)} ({diffDays} Days • {studyHours * diffDays} Total Hours)</span>

        {/* Subject Filter Selector */}
        <div className="flex items-center space-x-2 font-sans">
          <Filter className="w-3.5 h-3.5 text-indigo-500" />
          <span>Filter Subject:</span>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-indigo-500/30 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
          >
            <option value="all">All {subjects.length} Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code}: {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Generated VTU Plan Output */}
      {hasGenerated && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Your Day-by-Day Study Schedule ({diffDays}-Day Window • {selectedSem})
            </h2>
            <a
              href="https://vtucircle.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center space-x-1"
            >
              <span>VTU Circle Official Notes Reference</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPlan.map((p) => (
              <div
                key={p.day}
                className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4"
              >
                <div className="pb-3 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {p.day}
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold border border-indigo-500/30">
                      {p.subjectCode}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {p.focus}
                  </h3>
                </div>

                {/* VTU Circle Notes Citation Card */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-[11px] space-y-1">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Syllabus Reference:</span>
                  </span>
                  <p className="text-slate-600 dark:text-zinc-400 font-medium leading-snug">{p.vtuNotes}</p>
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
