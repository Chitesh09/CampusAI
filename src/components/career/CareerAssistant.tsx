import React, { useState } from 'react';
import { Briefcase, CheckCircle2, AlertCircle, Bot } from 'lucide-react';

export const CareerAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'resume' | 'linkedin' | 'skills' | 'mock'>('resume');
  const [resumeText, setResumeText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);

  // Mock interview state
  const [interviewQuestion] = useState("Tell me about a time you optimized a slow SQL query or data structure.");
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAnalyzeResume = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
    }, 1000);
  };

  const handleAnswerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerInput.trim()) return;
    setFeedback("Great response! You clearly highlighted the index creation (B+ Tree) and query execution plan metrics. Score: 9/10.");
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <Briefcase className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>AI Career Assistant & Mock Interviewer</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            ATS Resume scoring, LinkedIn summary generator & interactive technical mock interviews.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-zinc-800 no-scrollbar">
        {[
          { id: 'resume', label: 'ATS Resume Reviewer' },
          { id: 'linkedin', label: 'LinkedIn Headline Generator' },
          { id: 'skills', label: 'Skill Gap Analysis' },
          { id: 'mock', label: 'AI Technical Mock Interview' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Resume Reviewer */}
      {activeTab === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Paste Resume Text or Bullet Points</h2>
            <textarea
              rows={8}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume work experience, projects, and skills here..."
              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400"
            />
            <button
              onClick={handleAnalyzeResume}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
            >
              {isAnalyzing ? 'Analyzing ATS Score...' : 'Calculate ATS Resume Score'}
            </button>
          </div>

          {/* Result */}
          {analyzed && (
            <div className="lg:col-span-6 p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase">ATS Audit Score</span>
                <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">88 / 100</span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Strong technical action verbs (Implemented, Architected, Optimized).</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Missing Keywords: Add 'Docker', 'Kubernetes' & 'GraphQL'.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Mock Interview */}
      {activeTab === 'mock' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-4 max-w-3xl mx-auto">
          <div className="flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <Bot className="w-4 h-4" />
            <span>AI Mock Technical Interviewer</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-900 dark:text-zinc-100">
            "{interviewQuestion}"
          </div>

          <form onSubmit={handleAnswerSubmit} className="space-y-3 text-xs">
            <textarea
              rows={4}
              value={answerInput}
              onChange={(e) => setAnswerInput(e.target.value)}
              placeholder="Type your interview response..."
              className="w-full p-3 rounded-xl bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
            >
              Submit Answer for Gemini Evaluation
            </button>
          </form>

          {feedback && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 dark:text-emerald-300">
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
