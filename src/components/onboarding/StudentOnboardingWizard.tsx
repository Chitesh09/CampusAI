import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  BookOpen,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Layers,
  Zap,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const StudentOnboardingWizard: React.FC = () => {
  const { currentUser, updateUserProfile, setIsOnboardingOpen } = useApp();

  const [step, setStep] = useState(1);

  // Local Form State initialized from currentUser
  const [formData, setFormData] = useState({
    university: currentUser.university || 'VTU (Visvesvaraya Technological University)',
    scheme: currentUser.scheme || '2022 Scheme (CBCS)',
    collegeName: currentUser.collegeName || 'Atria Institute of Technology, Bengaluru',
    branch: currentUser.branch || 'Information Science & Engineering (ISE)',
    semesterName: currentUser.semesterName || '5th Semester',
    section: currentUser.section || 'Section B',
    academicYear: currentUser.academicYear || '2025 - 2026',
  });

  const collegesList = [
    'Atria Institute of Technology, Bengaluru',
    'BMS College of Engineering (BMSCE)',
    'RV College of Engineering (RVCE)',
    'MS Ramaiah Institute of Technology (MSRIT)',
    'Dayananda Sagar College of Engineering (DSCE)',
    'RNS Institute of Technology (RNSIT)',
    'PES University (PESU)',
    'CMR Institute of Technology (CMRIT)',
    'Bangalore Institute of Technology (BIT)',
  ];

  const branchesList = [
    'Computer Science & Engineering (CSE)',
    'Information Science & Engineering (ISE)',
    'Artificial Intelligence & Machine Learning (AIML)',
    'Electronics & Communication (ECE)',
    'Electrical & Electronics (EEE)',
    'Data Science (DS)',
    'Mechanical Engineering (ME)',
    'Civil Engineering (CV)',
  ];

  const semestersList = [
    '1st Semester',
    '2nd Semester',
    '3rd Semester',
    '4th Semester',
    '5th Semester',
    '6th Semester',
    '7th Semester',
    '8th Semester',
  ];

  const schemesList = [
    '2022 Scheme (CBCS)',
    '2021 Scheme (CBCS)',
    '2018 Scheme (CBCS)',
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleFinish = () => {
    const semNum = parseInt(formData.semesterName.replace(/\D/g, '')) || 6;
    updateUserProfile({
      ...formData,
      department: formData.branch,
      semester: semNum,
      isOnboarded: true,
    });
    setIsOnboardingOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="w-full max-w-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.08] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Wizard Header Bar */}
        <div className="p-6 border-b border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                <span>Student Academic Setup</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-bold border border-indigo-500/30">
                  Step {step} of 4
                </span>
              </h1>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Personalize your VTU courses, timetables, and AI study schedules.
              </p>
            </div>
          </div>
        </div>

        {/* Wizard Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5">
          <motion.div
            initial={{ width: '25%' }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="h-full bg-indigo-600 rounded-r-full"
          />
        </div>

        {/* Wizard Step Content Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>Step 1: Select University & Curriculum Scheme</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Select your affiliated technological university and syllabus scheme.
                  </p>
                </div>

                {/* University Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
                    Affiliated University:
                  </label>
                  <select
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="VTU (Visvesvaraya Technological University)">
                      VTU (Visvesvaraya Technological University)
                    </option>
                    <option value="Autonomous Engineering College">Autonomous Engineering College</option>
                    <option value="Deemed Technological University">Deemed Technological University</option>
                  </select>
                </div>

                {/* Scheme Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
                    Curriculum Scheme:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {schemesList.map((sch) => {
                      const isSelected = formData.scheme === sch;
                      return (
                        <div
                          key={sch}
                          onClick={() => setFormData({ ...formData, scheme: sch })}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold shadow-sm'
                              : 'bg-slate-100 dark:bg-zinc-800/60 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300 hover:border-slate-300'
                          }`}
                        >
                          <div className="text-xs font-bold">{sch}</div>
                          <div className="text-[10px] text-slate-400 dark:text-zinc-500 mt-1">
                            Choice Based Credit System
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-indigo-500" />
                    <span>Step 2: Select College & Engineering Branch</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Select your college campus and department branch.
                  </p>
                </div>

                {/* College Name Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
                    College Name:
                  </label>
                  <select
                    value={formData.collegeName}
                    onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  >
                    {collegesList.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Branch Selector */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
                    Engineering Branch / Stream:
                  </label>
                  <select
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                  >
                    {branchesList.map((br) => (
                      <option key={br} value={br}>
                        {br}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    <span>Step 3: Semester, Section & Academic Year</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Select your active semester, section, and academic batch.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Semester */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
                      Semester:
                    </label>
                    <select
                      value={formData.semesterName}
                      onChange={(e) => setFormData({ ...formData, semesterName: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                    >
                      {semestersList.map((sem) => (
                        <option key={sem} value={sem}>
                          {sem}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Section */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
                      Section (Optional):
                    </label>
                    <select
                      value={formData.section}
                      onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                    >
                      {['Section A', 'Section B', 'Section C', 'Section D', 'None'].map((sec) => (
                        <option key={sec} value={sec}>
                          {sec}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Academic Year */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200">
                      Academic Year:
                    </label>
                    <select
                      value={formData.academicYear}
                      onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                      className="w-full px-3.5 py-3 rounded-2xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none"
                    >
                      {['2025 - 2026', '2026 - 2027'].map((ay) => (
                        <option key={ay} value={ay}>
                          {ay}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-indigo-500" />
                    <span>Step 4: AI Personalization Ready</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Confirm your academic setup summary to configure your workspace.
                  </p>
                </div>

                {/* Personalization Summary Card */}
                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-3">
                  <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tailored Student Environment Configured:</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-0.5">
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold block">COLLEGE</span>
                      <span className="font-bold text-slate-900 dark:text-white truncate block">{formData.collegeName}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-0.5">
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold block">BRANCH & SEM</span>
                      <span className="font-bold text-slate-900 dark:text-white truncate block">{formData.branch} • {formData.semesterName} ({formData.section})</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-0.5">
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold block">UNIVERSITY & SCHEME</span>
                      <span className="font-bold text-slate-900 dark:text-white truncate block">{formData.university} • {formData.scheme}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-0.5">
                      <span className="text-[10px] text-slate-400 dark:text-zinc-500 font-bold block">ACADEMIC YEAR</span>
                      <span className="font-bold text-slate-900 dark:text-white truncate block">{formData.academicYear}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Wizard Footer Controls */}
        <div className="p-6 border-t border-slate-100 dark:border-zinc-800 bg-slate-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-xs disabled:opacity-40 transition-all flex items-center space-x-1 min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center space-x-1 min-h-[44px]"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center space-x-1.5 min-h-[44px]"
            >
              <Zap className="w-4 h-4" />
              <span>Launch Personalized Workspace</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
