import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  Globe,
  Clock,
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen } = useApp();
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

  // Rotate query automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQueryIndex((prev) => (prev + 1) % interactiveQueries.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Framer Motion staggered cinematic variants
  const heroContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const heroItemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 75,
        damping: 18,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#08080a] text-white selection:bg-indigo-500/20 font-sans overflow-x-hidden relative">
      
      {/* ── Fixed Premium Top Navigation Header ──────────────────────────────── */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 20 }}
        className="fixed top-0 inset-x-0 z-40 h-14 border-b border-white/5 bg-[#08080a]/80 backdrop-blur-md px-6 flex items-center justify-between"
      >
        <div className="flex items-center space-x-2.5">
          <div className="w-6 h-6 rounded bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm shadow-indigo-500/20 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold tracking-tight text-white">CampusCopilot OS</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            Sign In
          </button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentView('dashboard')}
            className="px-3.5 py-1.5 rounded-lg bg-white text-black font-bold text-xs hover:bg-zinc-100 transition-all flex items-center space-x-1.5 shadow-md shadow-white/5 cursor-pointer"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </motion.header>

      {/* ── Cinematic Hero Area (100vh) ─────────────────────────────────────────── */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto pt-14 relative z-10">
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Logo / Badge */}
          <motion.div variants={heroItemVariants} className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px] font-medium text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Google Edu Keynote Release</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={heroItemVariants}
            className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight"
          >
            The AI Operating System <br />
            <span className="text-zinc-500 font-normal">for Higher Education</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            variants={heroItemVariants}
            className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed"
          >
            Stop searching across WhatsApp groups, PDFs, portals, and emails. Ask once. Get answers instantly with Gemini.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            variants={heroItemVariants}
            className="pt-4 flex items-center justify-center space-x-3"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentView('dashboard')}
              className="px-6 py-3.5 rounded-lg bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-all flex items-center space-x-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <span>Enter Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDemoModalOpen(true)}
              className="px-5 py-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-medium text-xs hover:bg-zinc-800 transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-zinc-300" />
              <span>Watch Demo</span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5 text-[10px] font-mono text-zinc-500"
        >
          <span>Scroll to Explore</span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-3 rounded-full bg-zinc-500"
          />
        </motion.div>
      </section>

      {/* ── Cinematic Section 1: Natural Language Core Terminal ────────────────────── */}
      <section className="py-24 px-4 max-w-5xl mx-auto border-t border-white/5 space-y-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-indigo-400 font-bold">
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
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className="rounded-2xl border border-zinc-800 bg-[#0d0d10] overflow-hidden shadow-2xl"
        >
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
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    activeQueryIndex === idx
                      ? 'bg-indigo-600 text-white font-semibold border border-indigo-500 shadow-lg shadow-indigo-600/10'
                      : 'text-zinc-500 hover:text-zinc-300 bg-zinc-900/50 border border-zinc-800/40'
                  }`}
                >
                  ${q.prompt}
                </button>
              ))}
            </div>

            {/* Query Output Display with slide-fade transition */}
            <div className="space-y-3 font-mono text-xs h-32 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeQueryIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-x-0 top-0 space-y-3"
                >
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
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Cinematic Section 2: Knowledge Synthesis ────────────────────── */}
      <section className="py-24 px-4 max-w-5xl mx-auto border-t border-white/5 space-y-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
            Chapter 02 • Knowledge Synthesis
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Upload Notes. Extract Instant Cheat Sheets.
          </h2>
          <p className="text-xs text-zinc-400">
            Turn 50-page PDFs into key concepts, formula cards, and speed practice quizzes in seconds.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs"
        >
          {[
            { icon: <FileText className="w-5 h-5 text-indigo-400" />, title: '1. Multi-Format Ingestion', desc: 'Upload PDF lecture slides, DOCX manuals, PPT presentations, or handwritten image notes.' },
            { icon: <Sparkles className="w-5 h-5 text-purple-400" />, title: '2. Automatic Extraction', desc: 'Gemini extracts core theorems, functional dependencies, formulas, and submission deadlines.' },
            { icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />, title: '3. Auto Quiz & Mind Maps', desc: 'Auto-generate 5-minute practice quizzes and interactive visual mind map node trees.' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 15 } }
              }}
              className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-3"
            >
              {item.icon}
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Cinematic Section 3: Navigation & Safety ────────────────────── */}
      <section className="py-24 px-4 max-w-5xl mx-auto border-t border-white/5 space-y-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-widest text-amber-400 font-bold">
            Chapter 03 • Spatial & Attendance Safety
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Campus Route Map & Safe Bunk Predictor
          </h2>
          <p className="text-xs text-zinc-400">
            Never get lost finding classes and never risk debarment due to low attendance.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs"
        >
          <motion.div 
            variants={{
              hidden: { opacity: 0, x: -30 },
              visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 70, damping: 15 } }
            }}
            className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-4"
          >
            <MapPin className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Turn-by-Turn Campus Navigation</h3>
            <p className="text-zinc-400 leading-relaxed">
              Click any class in your timetable to get exact walking steps, building floors, and walk times from your current location.
            </p>
          </motion.div>

          <motion.div 
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 70, damping: 15 } }
            }}
            className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors space-y-4"
          >
            <BarChart2 className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold text-white">Safe Bunk Calculator</h3>
            <p className="text-zinc-400 leading-relaxed">
              Simulate missing upcoming lectures and calculate exact safe limits before your attendance drops below 75%.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Cinematic Section 4: Seamless Entrance CTA ────────────────── */}
      <section className="py-24 px-4 max-w-3xl mx-auto text-center border-t border-white/5 space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-extrabold text-white">
            Ready to Upgrade Your Academic Life?
          </h2>
          <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
            Built for college students, professors, and registrars. Experience CampusCopilot today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentView('dashboard')}
            className="px-8 py-4 rounded-lg bg-white text-black font-bold text-xs hover:bg-zinc-100 transition-all inline-flex items-center space-x-2 shadow-xl cursor-pointer"
          >
            <span>Launch CampusCopilot Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5 text-center text-xs text-zinc-600 relative z-10">
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
