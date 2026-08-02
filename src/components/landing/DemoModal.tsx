import React from 'react';
import { X, Play, Sparkles, CheckCircle2, Bot, FileText, Calendar, BarChart2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchApp: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onLaunchApp }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header Bar */}
          <div className="p-4 bg-zinc-950/80 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center">
                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">CampusCopilot AI Live Product Walkthrough</h3>
                <p className="text-[11px] text-zinc-400">Google Edu on Air Keynote Demo</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Interactive Simulated Video Player Interface */}
          <div className="relative aspect-video bg-zinc-950 flex flex-col justify-center items-center p-8 overflow-hidden group">
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-cyan-500/20 animate-pulse-subtle" />

            <div className="relative z-10 text-center max-w-lg space-y-4">
              <div className="w-16 h-16 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-glow-lg mx-auto group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-cyan-300" />
              </div>

              <h4 className="text-lg font-bold text-white tracking-tight">
                Experience Gemini AI Across All College Modules
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Watch how CampusCopilot instantly parses complex DBMS exam schedules, calculates safe bunks, extracts formula cheat sheets, and navigates campus buildings in real-time.
              </p>

              <div className="grid grid-cols-2 gap-3 text-left pt-2">
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center space-x-2 text-xs text-zinc-300">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  <span>Gemini 2.5 Flash Chat</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center space-x-2 text-xs text-zinc-300">
                  <FileText className="w-4 h-4 text-purple-400" />
                  <span>Doc Concept Extractor</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center space-x-2 text-xs text-zinc-300">
                  <BarChart2 className="w-4 h-4 text-amber-400" />
                  <span>Safe Bunk Predictor</span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center space-x-2 text-xs text-zinc-300">
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>Map Route Navigator</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-center space-x-3">
                <button
                  onClick={() => {
                    onClose();
                    onLaunchApp();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 hover:from-indigo-600 hover:to-cyan-500 text-white font-bold text-xs shadow-glow-md transition-all flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Launch Live Platform</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
