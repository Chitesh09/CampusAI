import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/geminiService';
import type { GeminiResponse } from '../../services/geminiService';
import {
  Search,
  Sparkles,
  Bot,
  ArrowRight,
  Pin,
  Layers,
  FileText,
  HelpCircle,
  BarChart2,
  Calendar,
  MapPin,
  Briefcase,
  Copy,
  Check,
  RotateCcw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setCurrentView,
    setActiveChatPrompt,
    geminiApiKey,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [streamingResponse, setStreamingResponse] = useState<string | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setStreamingResponse(null);
      setIsStreaming(false);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const pinnedActions = [
    {
      id: 'pin-1',
      title: 'Summarize DBMS Module 3',
      desc: '1-page cheat sheet on 2PL & B+ Trees',
      icon: <FileText className="w-3.5 h-3.5 text-emerald-400" />,
      action: () => {
        setActiveChatPrompt('Summarize DBMS Module 3');
        setCurrentView('ai-chat');
      },
    },
    {
      id: 'pin-2',
      title: "Create Today's AI Study Plan",
      desc: 'Generate optimal revision timetable',
      icon: <Layers className="w-3.5 h-3.5 text-indigo-400" />,
      action: () => setCurrentView('study-planner'),
    },
    {
      id: 'pin-3',
      title: 'Generate 5 MCQ Practice Quiz',
      desc: 'Auto-grade DBMS & AI concepts',
      icon: <HelpCircle className="w-3.5 h-3.5 text-purple-400" />,
      action: () => setCurrentView('quiz'),
    },
    {
      id: 'pin-4',
      title: 'Find Lab 5 Classroom',
      desc: 'Turn-by-turn campus route navigation',
      icon: <MapPin className="w-3.5 h-3.5 text-amber-400" />,
      action: () => setCurrentView('campus-map'),
    },
  ];

  const navigationActions = [
    {
      id: 'nav-1',
      title: 'Open Attendance Engine & Safe Bunk',
      desc: 'Simulate lecture skips & percentage warnings',
      icon: <BarChart2 className="w-3.5 h-3.5 text-rose-400" />,
      action: () => setCurrentView('attendance'),
    },
    {
      id: 'nav-2',
      title: 'Open Academic Calendar & Timetable',
      desc: 'Weekly class schedule & exam venues',
      icon: <Calendar className="w-3.5 h-3.5 text-amber-400" />,
      action: () => setCurrentView('timetable'),
    },
    {
      id: 'nav-3',
      title: 'Open Career Assistant & Mock AI',
      desc: 'ATS resume reviewer & technical interviewer',
      icon: <Briefcase className="w-3.5 h-3.5 text-cyan-400" />,
      action: () => setCurrentView('career'),
    },
    {
      id: 'nav-4',
      title: 'Open AI Copilot Chat',
      desc: 'Full-screen conversational interface',
      icon: <Bot className="w-3.5 h-3.5 text-indigo-400" />,
      action: () => setCurrentView('ai-chat'),
    },
  ];

  const handleStreamAIQuery = async (queryText: string) => {
    if (!queryText.trim() || isStreaming) return;
    setIsStreaming(true);
    setStreamingResponse('Gemini AI is parsing query and searching academic knowledge...');

    try {
      const res: GeminiResponse = await queryGeminiAI(queryText, geminiApiKey);
      setStreamingResponse(res.text);
    } catch (err) {
      setStreamingResponse('Error retrieving Gemini AI response.');
    } finally {
      setIsStreaming(false);
    }
  };

  const allActions = [...pinnedActions, ...navigationActions];
  const filteredActions = allActions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredActions.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredActions.length) % Math.max(1, filteredActions.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim() && filteredActions.length === 0) {
        // Stream AI answer directly inside Raycast Command Palette
        handleStreamAIQuery(query);
      } else if (filteredActions[selectedIndex]) {
        filteredActions[selectedIndex].action();
        setIsCommandPaletteOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false);
    }
  };

  const copyResponse = () => {
    if (!streamingResponse) return;
    navigator.clipboard.writeText(streamingResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs select-none">
        <div className="fixed inset-0" onClick={() => setIsCommandPaletteOpen(false)} />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          className="relative w-full max-w-xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden z-50"
        >
          {/* Raycast Search Input Header */}
          <div className="p-3.5 border-b border-slate-200 dark:border-zinc-800 flex items-center space-x-3 bg-slate-50/50 dark:bg-zinc-900/50">
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 ml-1 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
                setStreamingResponse(null);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or ask Gemini AI... (Press ↵ to stream answer)"
              className="flex-1 bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
            />
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-zinc-800 rounded border border-slate-200 dark:border-zinc-700">
              ESC
            </kbd>
          </div>

          {/* INLINE CURSOR AI STREAMING ANSWER CARD */}
          {streamingResponse && (
            <div className="p-4 border-b border-slate-200 dark:border-zinc-800 bg-indigo-500/5 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Gemini AI Stream Response</span>
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={copyResponse}
                    className="p-1 rounded text-slate-400 hover:text-white text-[11px] flex items-center space-x-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveChatPrompt(query);
                      setCurrentView('ai-chat');
                      setIsCommandPaletteOpen(false);
                    }}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    Open in Full Chat →
                  </button>
                </div>
              </div>

              <div className="prose dark:prose-invert prose-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-sans">
                {streamingResponse}
                {isStreaming && <span className="inline-block w-1.5 h-3 bg-indigo-500 animate-pulse ml-1" />}
              </div>
            </div>
          )}

          {/* Results Action List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-3">
            {filteredActions.length === 0 && !streamingResponse ? (
              <div className="py-8 text-center text-xs text-slate-500 dark:text-zinc-500 space-y-2">
                <p>No matching actions found.</p>
                <button
                  onClick={() => handleStreamAIQuery(query)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold text-xs inline-flex items-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ask Gemini AI "{query}"</span>
                </button>
              </div>
            ) : (
              <>
                {/* Pinned Quick Actions */}
                {query === '' && (
                  <div>
                    <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500 flex items-center space-x-1">
                      <Pin className="w-3 h-3 text-indigo-400" />
                      <span>Pinned Quick Actions</span>
                    </div>
                    <div className="space-y-0.5 mt-1">
                      {pinnedActions.map((item, idx) => {
                        const isSelected = idx === selectedIndex;
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              item.action();
                              setIsCommandPaletteOpen(false);
                            }}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                              isSelected
                                ? 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-semibold shadow-2xs'
                                : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              {item.icon}
                              <div className="truncate">
                                <div className="font-bold text-xs">{item.title}</div>
                                <div className="text-[11px] text-slate-400 dark:text-zinc-500 truncate">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                            <ArrowRight
                              className={`w-3.5 h-3.5 shrink-0 text-slate-400 transition-opacity ${
                                isSelected ? 'opacity-100' : 'opacity-0'
                              }`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Navigation Actions */}
                <div>
                  <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                    Workspace Navigation
                  </div>
                  <div className="space-y-0.5 mt-1">
                    {(query === '' ? navigationActions : filteredActions).map((item, idx) => {
                      const actualIdx = query === '' ? idx + pinnedActions.length : idx;
                      const isSelected = actualIdx === selectedIndex;
                      return (
                        <div
                          key={item.id}
                          onClick={() => {
                            item.action();
                            setIsCommandPaletteOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(actualIdx)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-semibold shadow-2xs'
                              : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                            {item.icon}
                            <div className="truncate">
                              <div className="font-bold text-xs">{item.title}</div>
                              <div className="text-[11px] text-slate-400 dark:text-zinc-500 truncate">
                                {item.desc}
                              </div>
                            </div>
                          </div>
                          <ArrowRight
                            className={`w-3.5 h-3.5 shrink-0 text-slate-400 transition-opacity ${
                              isSelected ? 'opacity-100' : 'opacity-0'
                            }`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Navigation Bar */}
          <div className="px-3.5 py-2 bg-slate-50 dark:bg-[#09090b] border-t border-slate-200 dark:border-zinc-800 text-[10px] text-slate-500 dark:text-zinc-500 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <span>Navigate</span>
              <kbd className="px-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded font-mono">↑↓</kbd>
              <span>Execute</span>
              <kbd className="px-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded font-mono">↵</kbd>
            </span>
            <span className="flex items-center space-x-1 text-slate-400 font-mono">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Raycast x Cursor Engine</span>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
