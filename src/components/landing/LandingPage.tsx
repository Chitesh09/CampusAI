import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DemoModal } from './DemoModal';
import {
  Sparkles,
  ArrowRight,
  Play,
  Terminal,
  FileText,
  MapPin,
  BarChart2,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setActiveChatPrompt, setIsAuthModalOpen } = useApp();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  const interactiveQueries = [
    {
      prompt: 'When is my DBMS exam?',
      response: 'Aug 15, 2026 • 10:00 AM • Examination Hall 1 • Modules 1 to 4 (Normalization, 2PL, B+ Trees)',
      tag: 'Academic Portal Sync',
    },
    {
      prompt: 'Where is Lab 5?',
      response: 'Tech Annex 2nd Floor (Room T-204) • 3 min walk (240m) from Central Library via South Corridor',
      tag: 'Spatial Twin Navigation',
    },
    {
      prompt: 'Can I miss next 2 Operating System lectures?',
      response: 'Current: 70.0% (Req: 75%). Missing 2 lectures drops attendance to 65.6%. UNSAFE! Attend next 4 classes.',
      tag: 'Attendance Safety Engine',
    },
    {
      prompt: 'Summarize DBMS Module 3 PDF',
      response: 'Extracted 5 key concepts (ACID, 2PL, WAL) & 2 core formulas (Conflict Serializability, B+ Tree Split)',
      tag: 'Knowledge Synthesis',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08080a] text-white selection:bg-indigo-500/20 font-sans">
      {/* Fixed Minimal Top Header */}
      <header className="fixed top-0 inset-x-0 z-40 h-14 border-b border-white/5 bg-[#08080a]/80 backdrop-blur-md px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded bg-white text-black flex items-center justify-center font-bold">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-tight text-white">CampusCopilot OS</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-3.5 py-1.5 rounded-lg bg-white text-black font-semibold text-xs hover:bg-zinc-100 transition-colors flex items-center space-x-1.5"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* CHAPTER 1: FULL VIEWPORT HERO (100vh) */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto pt-14">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Google Edu on Air Keynote Release</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            The AI Operating System <br className="hidden sm:inline" />
            <span className="text-zinc-400 font-normal">for Higher Education</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Stop searching across WhatsApp groups, PDFs, portals, and emails. Ask once. Get answers instantly with Gemini.
          </p>

          <div className="pt-4 flex items-center justify-center space-x-3">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-6 py-3 rounded-lg bg-white text-black font-bold text-xs hover:bg-zinc-100 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <span>Enter CampusCopilot</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-5 py-3 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium text-xs hover:bg-zinc-800 transition-colors flex items-center space-x-2"
            >
              <Play className="w-3.5 h-3.5 fill-zinc-300" />
              <span>Watch Keynote</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* CHAPTER 2: INTERACTIVE OPERATING SYSTEM TERMINAL STREAM */}
      <section className="py-24 px-4 max-w-5xl mx-auto border-t border-white/5 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400">
            Chapter 01 • Natural Language Core
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ask Anything. Get Verified Academic Truth.
          </h2>
          <p className="text-xs text-zinc-400">
            Gemini 2.5 Flash queries your course outlines, exam dates, room maps, and attendance records simultaneously.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl border border-zinc-800 bg-[#0d0d10] overflow-hidden shadow-2xl">
          <div className="px-4 py-3 border-b border-zinc-800 bg-[#121216] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-zinc-400">campus-copilot-kernel v2.5</span>
            </div>
            <div className="flex items-center space-x-1 text-[11px] font-mono text-indigo-400">
              <Terminal className="w-3.5 h-3.5" />
              <span>Interactive Stream</span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Selector buttons */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-zinc-800/80 no-scrollbar">
              {interactiveQueries.map((q, idx) => (
                <button
                  key={q.prompt}
                  onClick={() => setActiveQueryIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-colors ${
                    activeQueryIndex === idx
                      ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  ${q.prompt}
                </button>
              ))}
            </div>

            {/* Query Output Display */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center space-x-2 text-indigo-400">
                <span>&gt; Query:</span>
                <span className="text-white font-semibold">"{interactiveQueries[activeQueryIndex].prompt}"</span>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 leading-relaxed">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  [{interactiveQueries[activeQueryIndex].tag}]
                </span>
                {interactiveQueries[activeQueryIndex].response}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 3: KNOWLEDGE SYNTHESIS & DOC INTELLIGENCE */}
      <section className="py-24 px-4 max-w-5xl mx-auto border-t border-white/5 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400">
            Chapter 02 • Knowledge Synthesis
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Upload Notes. Extract Instant Cheat Sheets.
          </h2>
          <p className="text-xs text-zinc-400">
            Turn 50-page PDFs into key concepts, formula cards, and speed practice quizzes in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <FileText className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">1. Multi-Format Ingestion</h3>
            <p className="text-zinc-400 leading-relaxed">
              Upload PDF lecture slides, DOCX manuals, PPT presentations, or handwritten image notes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-sm font-bold text-white">2. Automatic Extraction</h3>
            <p className="text-zinc-400 leading-relaxed">
              Gemini extracts core theorems, functional dependencies, formulas, and submission deadlines.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">3. Auto Quiz & Mind Maps</h3>
            <p className="text-zinc-400 leading-relaxed">
              Auto-generate 5-minute practice quizzes and interactive visual mind map node trees.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 4: SPATIAL TWIN & ATTENDANCE SAFETY */}
      <section className="py-24 px-4 max-w-5xl mx-auto border-t border-white/5 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400">
            Chapter 03 • Spatial & Attendance Safety
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Campus Route Map & Safe Bunk Predictor
          </h2>
          <p className="text-xs text-zinc-400">
            Never get lost finding Lab 5 and never risk debarment due to low attendance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Turn-by-Turn Campus Navigation</h3>
            <p className="text-zinc-400 leading-relaxed">
              Click any class in your timetable to get exact walking steps, building floors, and walk times from your current location.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <BarChart2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Safe Bunk Calculator</h3>
            <p className="text-zinc-400 leading-relaxed">
              Simulate missing upcoming lectures and calculate exact safe limits before your attendance drops below 75%.
            </p>
          </div>
        </div>
      </section>

      {/* CHAPTER 5: SEAMLESS WORKSPACE ENTRANCE CTA */}
      <section className="py-24 px-4 max-w-3xl mx-auto text-center border-t border-white/5 space-y-6">
        <h2 className="text-3xl font-extrabold text-white">
          Ready to Upgrade Your Academic Life?
        </h2>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Built for college students, professors, and registrars. Experience CampusCopilot today.
        </p>
        <button
          onClick={() => setCurrentView('dashboard')}
          className="px-8 py-3.5 rounded-lg bg-white text-black font-bold text-xs hover:bg-zinc-100 transition-colors inline-flex items-center space-x-2 shadow-xl"
        >
          <span>Launch CampusCopilot Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-xs text-zinc-600">
        CampusCopilot AI © 2026. Built for Google's Edu on Air Event.
      </footer>

      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onLaunchApp={() => setCurrentView('dashboard')}
      />
    </div>
  );
};
