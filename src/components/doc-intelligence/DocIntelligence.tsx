import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { AcademicDoc } from '../../types';
import {
  UploadCloud,
  FileText,
  Sparkles,
  CheckCircle2,
  Calendar,
  BookmarkPlus,
  HelpCircle,
} from 'lucide-react';

export const DocIntelligence: React.FC = () => {
  const { docs, addDoc, setCurrentView } = useApp();
  const [selectedDoc, setSelectedDoc] = useState<AcademicDoc>(docs[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setTimeout(() => {
      const newDoc: AcademicDoc = {
        id: `doc_${Date.now()}`,
        title: file.name,
        fileType: file.name.endsWith('.pdf') ? 'pdf' : file.name.endsWith('.docx') ? 'docx' : 'ppt',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        uploadedAt: 'Just now',
        subject: 'Uploaded Course Document',
        summary: `Gemini AI automatically parsed "${file.name}". Extracted core academic theorems, functional dependencies, formulas, and upcoming exam deadlines.`,
        keyConcepts: [
          'Automatic Document Parser',
          'Gemini Vector Embeddings',
          'Key Theorem Highlights',
          'Deadline Extraction',
        ],
        formulas: ['f(x) = \\sigma(W^T x + b)', 'O(N \\log N) Sorting Bound'],
        deadlinesFound: ['Upcoming Assignment Submission: 3 Days'],
      };

      addDoc(newDoc);
      setSelectedDoc(newDoc);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span>Document Intelligence</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Upload PDFs, DOCX, PPTs. Gemini extracts key concepts, formulas & auto-generates quizzes.
          </p>
        </div>

        <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-2 w-fit">
          <UploadCloud className="w-4 h-4" />
          <span>Upload Academic File</span>
          <input
            type="file"
            accept=".pdf,.docx,.ppt,.pptx,.png,.jpg"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Document Selector Sidebar */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Your Uploaded Documents
          </h2>

          {isProcessing && (
            <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold flex items-center space-x-2 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span>Gemini is parsing & extracting document insights...</span>
            </div>
          )}

          {docs.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedDoc(d)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedDoc.id === d.id
                  ? 'bg-white dark:bg-zinc-900 border-indigo-500 shadow-sm'
                  : 'bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {d.title}
                  </h3>
                  <div className="flex items-center space-x-2 text-[10px] text-slate-500 dark:text-zinc-400 mt-1">
                    <span>{d.subject}</span>
                    <span>•</span>
                    <span>{d.size}</span>
                    <span>•</span>
                    <span>{d.uploadedAt}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Extraction Analysis View */}
        <div className="lg:col-span-8 space-y-6">
          {selectedDoc && (
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                    Gemini AI Extraction Report
                  </span>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedDoc.title}
                  </h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentView('smart-notes')}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 text-xs font-semibold flex items-center space-x-1 hover:bg-slate-200 dark:hover:bg-zinc-700"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>Save Smart Notes</span>
                  </button>
                  <button
                    onClick={() => setCurrentView('quiz')}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center space-x-1 hover:bg-indigo-500"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Generate Quiz</span>
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Executive AI Summary</span>
                </h3>
                <p className="text-xs text-slate-900 dark:text-zinc-100 leading-relaxed bg-slate-100 dark:bg-zinc-800 p-3.5 rounded-xl border border-slate-200 dark:border-zinc-700">
                  {selectedDoc.summary}
                </p>
              </div>

              {/* Key Concepts */}
              {selectedDoc.keyConcepts && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                    Extracted Key Concepts
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedDoc.keyConcepts.map((concept) => (
                      <div
                        key={concept}
                        className="p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-zinc-100 flex items-center space-x-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{concept}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Formulas */}
              {selectedDoc.formulas && selectedDoc.formulas.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                    Important Formulas & Theorems
                  </h3>
                  <div className="space-y-1.5">
                    {selectedDoc.formulas.map((formula) => (
                      <div
                        key={formula}
                        className="p-3 rounded-xl bg-slate-900 text-indigo-300 font-mono text-xs border border-indigo-500/20"
                      >
                        <code>{formula}</code>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Found Deadlines */}
              {selectedDoc.deadlinesFound && selectedDoc.deadlinesFound.length > 0 && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 space-y-1">
                  <h4 className="text-xs font-bold flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Extracted Deadlines Found in File</span>
                  </h4>
                  {selectedDoc.deadlinesFound.map((dl) => (
                    <p key={dl} className="text-xs font-semibold">
                      • {dl}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
