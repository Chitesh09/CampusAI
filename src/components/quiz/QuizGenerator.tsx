import React, { useState } from 'react';
import { HelpCircle, Sparkles, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { mockQuizzes } from '../../data/mockData';

export const QuizGenerator: React.FC = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(mockQuizzes[0]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId: string, optionIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    selectedQuiz.questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
            <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span>AI Practice Quiz Generator</span>
          </h1>
          <p className="text-xs text-slate-600 dark:text-zinc-400 mt-1">
            Auto-generate MCQs and viva practice questions from course materials with instant grading.
          </p>
        </div>

        <button
          onClick={() => alert('Gemini generating new practice quiz from DBMS Module 4...')}
          className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm transition-all flex items-center space-x-2 w-fit"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate New AI Quiz</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Available Quizzes (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
            Available Quizzes
          </h2>

          {mockQuizzes.map((qz) => (
            <div
              key={qz.id}
              onClick={() => {
                setSelectedQuiz(qz);
                setAnswers({});
                setSubmitted(false);
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedQuiz.id === qz.id
                  ? 'bg-white dark:bg-zinc-900 border-purple-500 shadow-sm'
                  : 'bg-slate-50 dark:bg-zinc-900/50 border-slate-200 dark:border-zinc-800 hover:border-slate-300'
              }`}
            >
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">
                {qz.subject}
              </span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                {qz.title}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 mt-1">
                {qz.questions.length} MCQ Questions • {qz.timeLimitMinutes} mins
              </p>
            </div>
          ))}
        </div>

        {/* Quiz Player (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">
                  {selectedQuiz.subject}
                </span>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedQuiz.title}
                </h2>
              </div>

              {submitted ? (
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">Score:</span>
                  <span className="text-lg font-extrabold text-purple-600 dark:text-purple-400 ml-1.5">
                    {calculateScore()} / {selectedQuiz.questions.length}
                  </span>
                </div>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  disabled={Object.keys(answers).length === 0}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-40 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Submit Quiz Answers
                </button>
              )}
            </div>

            <div className="space-y-6">
              {selectedQuiz.questions.map((q, qIdx) => (
                <div key={q.id} className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                    Q{qIdx + 1}. {q.question}
                  </h3>

                  <div className="space-y-2">
                    {(q.options || []).map((opt: string, optIdx: number) => {
                      const isSelected = answers[q.id] === optIdx;
                      const isCorrect = q.correctAnswer === optIdx;

                      let itemStyle = 'bg-slate-100 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-zinc-100';
                      if (isSelected) {
                        itemStyle = 'bg-purple-600 text-white border-purple-500 font-bold';
                      }
                      if (submitted) {
                        if (isCorrect) {
                          itemStyle = 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/40 font-bold';
                        } else if (isSelected && !isCorrect) {
                          itemStyle = 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40 font-bold';
                        }
                      }

                      return (
                        <div
                          key={optIdx}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${itemStyle}`}
                        >
                          <span>{opt}</span>
                          {submitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                          {submitted && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-500 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs space-y-1">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {submitted && (
              <button
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                }}
                className="w-full py-3 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center space-x-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Retake Quiz</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
