import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart2, AlertTriangle, CheckCircle2, Calculator } from 'lucide-react';

export const AttendanceDashboard: React.FC = () => {
  const { activeCurriculum, currentUser } = useApp();

  const dynamicAttendanceRecords = activeCurriculum.map((sub) => ({
    id: `att-${sub.code}`,
    subject: sub.name,
    code: sub.code,
    attended: Math.round((sub.attendancePct / 100) * 35),
    total: 35,
    percentage: sub.attendancePct,
    minimumRequired: 75,
    faculty: sub.faculty || 'Dept Professor',
  }));

  const [selectedSubjectId, setSelectedSubjectId] = useState(dynamicAttendanceRecords[0]?.id);
  const [lecturesToMiss, setLecturesToMiss] = useState(2);

  const activeRecord = dynamicAttendanceRecords.find((r) => r.id === selectedSubjectId) || dynamicAttendanceRecords[0];

  const predictedAttended = activeRecord.attended;
  const predictedTotal = activeRecord.total + lecturesToMiss;
  const predictedPercentage = Math.round((predictedAttended / predictedTotal) * 1000) / 10;

  const maxSafeBunks = Math.max(0, Math.floor(activeRecord.attended / 0.75 - activeRecord.total));

  const lecturesNeededToReach75 = Math.max(
    0,
    Math.ceil((0.75 * activeRecord.total - activeRecord.attended) / 0.25)
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <BarChart2 className="w-6 h-6 text-amber-500" />
            <span>Attendance Dashboard & Safe Bunk Predictor</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Monitor subject percentages and predict safe bunks before missing lectures.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Subject Attendance Cards */}
        <div className="lg:col-span-7 space-y-4">
          <h2 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Subject Attendance Overview
          </h2>

          <div className="space-y-3">
            {dynamicAttendanceRecords.map((rec) => {
              const isLow = rec.percentage < rec.minimumRequired;
              const isSelected = selectedSubjectId === rec.id;
              return (
                <div
                  key={rec.id}
                  onClick={() => setSelectedSubjectId(rec.id)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-zinc-900 border-indigo-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        {rec.code}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {rec.subject}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                        Faculty: {rec.faculty}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-xl font-extrabold ${
                          isLow ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {rec.percentage}%
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-zinc-400 block font-mono">
                        {rec.attended}/{rec.total} Classes
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 w-full bg-slate-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isLow ? 'bg-rose-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${Math.min(100, rec.percentage)}%` }}
                    />
                  </div>

                  {isLow && (
                    <div className="mt-2.5 flex items-center space-x-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Low Attendance Warning! Attend next {lecturesNeededToReach75} classes.</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Safe Bunk Calculator Widget */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Interactive Safe Bunk Predictor
          </h2>

          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-5">
            <div className="flex items-center space-x-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 pb-3 border-b border-slate-100 dark:border-zinc-800">
              <Calculator className="w-4 h-4" />
              <span>Simulate Skipping Next Lectures</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                Selected Subject:
              </label>
              <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {activeRecord.code}: {activeRecord.subject}
              </p>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Current: {activeRecord.percentage}% ({activeRecord.attended}/{activeRecord.total})
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold mb-1">
                <span className="text-slate-700 dark:text-zinc-300">If I skip next lectures:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">{lecturesToMiss} Lectures</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                value={lecturesToMiss}
                onChange={(e) => setLecturesToMiss(parseInt(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            <div
              className={`p-4 rounded-xl border text-xs space-y-2 ${
                predictedPercentage < 75
                  ? 'bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300'
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold">Predicted Attendance:</span>
                <span className="text-xl font-extrabold">{predictedPercentage}%</span>
              </div>

              {predictedPercentage >= 75 ? (
                <p className="font-medium flex items-center space-x-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 inline" />
                  <span>SAFE! You remain above the 75% threshold.</span>
                </p>
              ) : (
                <p className="font-medium flex items-center space-x-1">
                  <AlertTriangle className="w-4 h-4 text-rose-500 inline" />
                  <span>UNSAFE! Skipping {lecturesToMiss} lectures drops attendance below 75%.</span>
                </p>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Maximum Safe Bunks:</span>
              <p className="text-slate-700 dark:text-zinc-300">
                You can safely skip up to <strong>{maxSafeBunks}</strong> lectures in total without falling below 75%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
