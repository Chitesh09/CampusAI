import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { fetchVTUSubjects } from '../../data/vtuAcademicDatabase';
import {
  GraduationCap,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  BookOpen,
  Zap,
  Layers,
  Code,
  FlaskConical,
  FolderGit2,
  Check,
} from 'lucide-react';

interface AcademicSubject {
  id: string;
  code: string;
  name: string;
  credits: number;
  type: 'core' | 'professional_elective' | 'open_elective' | 'lab' | 'mini_project';
  enabled: boolean;
}

export const AcademicProfile: React.FC = () => {
  const { currentUser, updateUserProfile, activeCurriculum } = useApp();

  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [profileForm, setProfileForm] = useState({
    university: currentUser.university || 'VTU (Visvesvaraya Technological University)',
    scheme: currentUser.scheme || '2022 Scheme (CBCS)',
    collegeName: currentUser.collegeName || 'Atria Institute of Technology, Bengaluru',
    branch: currentUser.branch || 'Information Science & Engineering (ISE)',
    semesterName: currentUser.semesterName || '7th Semester',
    section: currentUser.section || 'Section B',
    academicYear: currentUser.academicYear || '2026 - 2027',
  });

  // Initialize from global activeCurriculum
  const [subjectsList, setSubjectsList] = useState<AcademicSubject[]>(() =>
    activeCurriculum.map((s, idx) => ({
      id: `sub-${idx + 1}`,
      code: s.code,
      name: s.name,
      credits: s.credits,
      type: s.code.includes('L')
        ? 'lab'
        : s.code.includes('P')
        ? 'mini_project'
        : s.code.includes('M')
        ? 'professional_elective'
        : 'core',
      enabled: true,
    }))
  );

  // Synchronize when curriculum changes globally (e.g. from onboarding or other pages)
  useEffect(() => {
    setSubjectsList(
      activeCurriculum.map((s, idx) => ({
        id: `sub-${idx + 1}`,
        code: s.code,
        name: s.name,
        credits: s.credits,
        type: s.code.includes('L')
          ? 'lab'
          : s.code.includes('P')
          ? 'mini_project'
          : s.code.includes('M')
          ? 'professional_elective'
          : 'core',
        enabled: true,
      }))
    );
  }, [activeCurriculum]);

  // Custom Subject Form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [newName, setNewName] = useState('');
  const [newCredits, setNewCredits] = useState(3);
  const [newType, setNewType] = useState<AcademicSubject['type']>('core');

  const handleImportVTUSubjects = () => {
    // Dynamic database import
    const fetched = fetchVTUSubjects(
      profileForm.university,
      profileForm.scheme,
      profileForm.branch,
      profileForm.semesterName
    );

    if (fetched && fetched.length > 0) {
      setSubjectsList(
        fetched.map((s, idx) => ({
          id: `sub-imp-${idx + 1}`,
          code: s.code,
          name: s.name,
          credits: s.credits,
          type: s.code.includes('L')
            ? 'lab'
            : s.code.includes('P')
            ? 'mini_project'
            : s.code.includes('M')
            ? 'professional_elective'
            : 'core',
          enabled: true,
        }))
      );
    } else {
      // Auto-generate official VTU subject codes for selected branch & semester as fallback
      const semNum = profileForm.semesterName.replace(/\D/g, '') || '7';
      const branchPrefix = profileForm.branch.includes('ISE') ? 'IS' : 'CS';
      setSubjectsList([
        { id: `sub-imp-1`, code: `21${branchPrefix}${semNum}1`, name: `${profileForm.branch.split(' ')[0]} Core Theory 1`, credits: 4, type: 'core', enabled: true },
        { id: `sub-imp-2`, code: `21${branchPrefix}${semNum}2`, name: `${profileForm.branch.split(' ')[0]} Core Theory 2`, credits: 4, type: 'core', enabled: true },
        { id: `sub-imp-3`, code: `21${branchPrefix}${semNum}3`, name: `${profileForm.branch.split(' ')[0]} Systems Architecture`, credits: 3, type: 'core', enabled: true },
        { id: `sub-imp-4`, code: `21${branchPrefix}${semNum}41`, name: 'Professional Elective - Cloud / AI', credits: 3, type: 'professional_elective', enabled: true },
        { id: `sub-imp-5`, code: `21${branchPrefix}${semNum}51`, name: 'Open Elective - Fullstack Web Tech', credits: 3, type: 'open_elective', enabled: true },
        { id: `sub-imp-6`, code: `21${branchPrefix}L${semNum}6`, name: 'Engineering Specialized Lab', credits: 1.5, type: 'lab', enabled: true },
        { id: `sub-imp-7`, code: `21${branchPrefix}P${semNum}7`, name: 'Semester Mini Project', credits: 2, type: 'mini_project', enabled: true },
      ]);
    }
  };

  const handleToggleSubject = (id: string) => {
    setSubjectsList((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  const handleRemoveSubject = (id: string) => {
    setSubjectsList((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddCustomSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim() || !newName.trim()) return;

    const newSub: AcademicSubject = {
      id: `sub-custom-${Date.now()}`,
      code: newCode.trim().toUpperCase(),
      name: newName.trim(),
      credits: newCredits,
      type: newType,
      enabled: true,
    };

    setSubjectsList((prev) => [...prev, newSub]);
    setNewCode('');
    setNewName('');
    setShowAddForm(false);
  };

  const handleSaveProfile = () => {
    const semNum = parseInt(profileForm.semesterName.replace(/\D/g, '')) || 5;
    updateUserProfile({
      ...profileForm,
      department: profileForm.branch,
      semester: semNum,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const getTypeBadge = (type: AcademicSubject['type']) => {
    switch (type) {
      case 'core':
        return <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-mono text-[10px] font-bold border border-indigo-500/30 flex items-center space-x-1"><BookOpen className="w-3 h-3" /><span>Core Theory</span></span>;
      case 'professional_elective':
        return <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-mono text-[10px] font-bold border border-purple-500/30 flex items-center space-x-1"><Zap className="w-3 h-3" /><span>Prof. Elective</span></span>;
      case 'open_elective':
        return <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-mono text-[10px] font-bold border border-cyan-500/30 flex items-center space-x-1"><Code className="w-3 h-3" /><span>Open Elective</span></span>;
      case 'lab':
        return <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold border border-emerald-500/30 flex items-center space-x-1"><FlaskConical className="w-3 h-3" /><span>Lab Practical</span></span>;
      case 'mini_project':
        return <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-[10px] font-bold border border-amber-500/30 flex items-center space-x-1"><FolderGit2 className="w-3 h-3" /><span>Mini Project</span></span>;
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none">
      {/* Header & Save Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Academic Profile & VTU Curriculum Manager</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Configure your University scheme, Branch, Semester, Electives, Labs, and Mini Projects.
          </p>
        </div>

        <button
          onClick={handleSaveProfile}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center space-x-1.5 min-h-[44px] w-fit"
        >
          {savedSuccess ? (
            <>
              <Check className="w-4 h-4 text-emerald-300" />
              <span>Profile Saved!</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Save Academic Profile</span>
            </>
          )}
        </button>
      </div>

      {/* SECTION 1: ACADEMIC METADATA FORM */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
        <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-500" />
          <span>Academic Environment Metadata</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-semibold">
          {/* University */}
          <div className="space-y-1.5">
            <label className="block text-slate-800 dark:text-zinc-200">University:</label>
            <select
              value={profileForm.university}
              onChange={(e) => setProfileForm({ ...profileForm, university: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="VTU (Visvesvaraya Technological University)">VTU (Visvesvaraya Technological University)</option>
              <option value="Autonomous Engineering College">Autonomous Engineering College</option>
              <option value="Deemed Technological University">Deemed Technological University</option>
            </select>
          </div>

          {/* Scheme */}
          <div className="space-y-1.5">
            <label className="block text-slate-800 dark:text-zinc-200">Curriculum Scheme:</label>
            <select
              value={profileForm.scheme}
              onChange={(e) => setProfileForm({ ...profileForm, scheme: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="2022 Scheme (CBCS)">2022 Scheme (CBCS)</option>
              <option value="2021 Scheme (CBCS)">2021 Scheme (CBCS)</option>
              <option value="2018 Scheme (CBCS)">2018 Scheme (CBCS)</option>
            </select>
          </div>

          {/* Branch */}
          <div className="space-y-1.5">
            <label className="block text-slate-800 dark:text-zinc-200">Engineering Branch:</label>
            <select
              value={profileForm.branch}
              onChange={(e) => setProfileForm({ ...profileForm, branch: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value="Information Science & Engineering (ISE)">Information Science & Engineering (ISE)</option>
              <option value="Computer Science & Engineering (CSE)">Computer Science & Engineering (CSE)</option>
              <option value="Artificial Intelligence & Machine Learning (AIML)">Artificial Intelligence & ML (AIML)</option>
              <option value="Electronics & Communication (ECE)">Electronics & Communication (ECE)</option>
              <option value="Electrical & Electronics (EEE)">Electrical & Electronics (EEE)</option>
              <option value="Data Science (DS)">Data Science (DS)</option>
            </select>
          </div>

          {/* Semester */}
          <div className="space-y-1.5">
            <label className="block text-slate-800 dark:text-zinc-200">Semester:</label>
            <select
              value={profileForm.semesterName}
              onChange={(e) => setProfileForm({ ...profileForm, semesterName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none"
            >
              {['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'].map((sem) => (
                <option key={sem} value={sem}>{sem}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 2: IMPORT VTU SUBJECTS & SUBJECT MANAGEMENT */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
          <div>
            <h2 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {profileForm.branch} • {profileForm.semesterName} Subjects ({subjectsList.filter((s) => s.enabled).length} Enabled)
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-0.5">
              Core Theory, Professional Electives, Open Electives, Labs, and Mini Projects.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleImportVTUSubjects}
              className="px-3.5 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Import VTU Official Subjects</span>
            </button>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-xs flex items-center space-x-1 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Subject</span>
            </button>
          </div>
        </div>

        {/* Add Custom Subject Form Modal */}
        {showAddForm && (
          <form onSubmit={handleAddCustomSubject} className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-indigo-500/30 space-y-3">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Add New Subject to Curriculum:</div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                placeholder="Code (e.g. 21IS543)"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Subject Title (e.g. Mobile App Dev)"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
              />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as AcademicSubject['type'])}
                className="px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
              >
                <option value="core">Core Theory</option>
                <option value="professional_elective">Professional Elective</option>
                <option value="open_elective">Open Elective</option>
                <option value="lab">Lab Practical</option>
                <option value="mini_project">Mini Project</option>
              </select>
              <div className="flex items-center space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-bold text-xs"
                >
                  Add Subject
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Subjects List Grid with Enable/Disable Toggles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {subjectsList.map((sub) => (
            <div
              key={sub.id}
              className={`p-4 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                sub.enabled
                  ? 'bg-white dark:bg-zinc-900/80 border-slate-200 dark:border-zinc-800 shadow-2xs'
                  : 'bg-slate-100/60 dark:bg-zinc-900/30 border-slate-200/50 dark:border-zinc-800/40 opacity-60'
              }`}
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                    {sub.code}
                  </span>
                  {getTypeBadge(sub.type)}
                  <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">
                    {sub.credits} Credits
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate">
                  {sub.name}
                </h3>
              </div>

              {/* Enable / Disable Toggle Controls */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => handleToggleSubject(sub.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1 transition-all ${
                    sub.enabled
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-200 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-300 dark:border-zinc-700'
                  }`}
                >
                  {sub.enabled ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Enabled</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Disabled</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleRemoveSubject(sub.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  title="Delete Subject"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
