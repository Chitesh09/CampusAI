import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Sparkles, Bot, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setCurrentView,
    setActiveChatPrompt,
  } = useApp();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const commandItems = [
    {
      category: 'AI Prompts',
      items: [
        {
          title: 'When is my DBMS exam?',
          desc: 'Get exact exam date, room & syllabus breakdown',
          action: () => {
            setActiveChatPrompt('When is my DBMS exam?');
            setCurrentView('ai-chat');
          },
        },
        {
          title: 'Where is Lab 5?',
          desc: 'Find step-by-step route & building floor details',
          action: () => {
            setActiveChatPrompt('Where is Lab 5?');
            setCurrentView('ai-chat');
          },
        },
        {
          title: "Explain Dijkstra's Algorithm simply",
          desc: 'Code example, viva Qs & graph time complexity',
          action: () => {
            setActiveChatPrompt("Explain Dijkstra's Algorithm simply");
            setCurrentView('ai-chat');
          },
        },
        {
          title: 'Summarize Module 3 DBMS',
          desc: '1-page cheat sheet on 2PL & ACID properties',
          action: () => {
            setActiveChatPrompt('Summarize DBMS Module 3');
            setCurrentView('ai-chat');
          },
        },
      ],
    },
    {
      category: 'Navigation',
      items: [
        {
          title: 'Go to AI Chat Assistant',
          desc: 'Ask natural language college questions',
          action: () => setCurrentView('ai-chat'),
        },
        {
          title: 'Open Document Intelligence',
          desc: 'Upload PDF/DOCX to extract key concepts & quiz',
          action: () => setCurrentView('doc-intelligence'),
        },
        {
          title: 'Open Quiz Generator',
          desc: 'Generate & play practice quizzes',
          action: () => setCurrentView('quiz'),
        },
        {
          title: 'Open Attendance & Safe Bunk',
          desc: 'Predict attendance percentage & safe skips',
          action: () => setCurrentView('attendance'),
        },
        {
          title: 'Open Smart Timetable',
          desc: 'Weekly class schedule & room numbers',
          action: () => setCurrentView('timetable'),
        },
        {
          title: 'Open Interactive Campus Map',
          desc: 'Route navigation across labs & hostels',
          action: () => setCurrentView('campus-map'),
        },
        {
          title: 'Open AI Study Planner',
          desc: 'Generate revision strategy timetable',
          action: () => setCurrentView('study-planner'),
        },
        {
          title: 'Open Professor Mode',
          desc: 'Generate lesson plans, rubrics & Bloom questions',
          action: () => setCurrentView('professor'),
        },
        {
          title: 'Open Career Assistant',
          desc: 'Resume reviewer & AI Mock Interviewer',
          action: () => setCurrentView('career'),
        },
        {
          title: 'Open Admin Portal',
          desc: 'Manage timetables & campus broadcasts',
          action: () => setCurrentView('admin'),
        },
      ],
    },
  ];

  const filteredCategories = commandItems
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (i) =>
          i.title.toLowerCase().includes(query.toLowerCase()) ||
          i.desc.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  const allFilteredItems = filteredCategories.flatMap((c) => c.items);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, allFilteredItems.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allFilteredItems.length) % Math.max(1, allFilteredItems.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (allFilteredItems[selectedIndex]) {
        allFilteredItems[selectedIndex].action();
        setIsCommandPaletteOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsCommandPaletteOpen(false);
    }
  };

  let globalIndex = 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/50 backdrop-blur-xs">
        <div className="fixed inset-0" onClick={() => setIsCommandPaletteOpen(false)} />
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.1 }}
          className="relative w-full max-w-lg bg-white dark:bg-[#121215] border border-slate-200 dark:border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50"
        >
          {/* Search Input Bar */}
          <div className="p-3 border-b border-slate-200 dark:border-zinc-800 flex items-center space-x-3">
            <Search className="w-4 h-4 text-slate-400 dark:text-zinc-500 ml-1 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type a command or query..."
              className="flex-1 bg-transparent text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
            />
            <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-100 dark:bg-zinc-800 rounded border border-slate-200 dark:border-zinc-700">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto p-1.5 space-y-2">
            {filteredCategories.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 dark:text-zinc-500">
                No matching actions found
              </div>
            ) : (
              filteredCategories.map((cat) => (
                <div key={cat.category}>
                  <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-zinc-500">
                    {cat.category}
                  </div>
                  <div className="space-y-0.5">
                    {cat.items.map((item) => {
                      const currentIndex = globalIndex++;
                      const isSelected = currentIndex === selectedIndex;
                      return (
                        <div
                          key={item.title}
                          onClick={() => {
                            item.action();
                            setIsCommandPaletteOpen(false);
                          }}
                          onMouseEnter={() => setSelectedIndex(currentIndex)}
                          className={`flex items-center justify-between px-2.5 py-2 rounded-lg text-xs cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-medium'
                              : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-50 dark:hover:bg-zinc-800/50'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <div className="font-medium truncate text-xs">{item.title}</div>
                            <div className="text-[11px] text-slate-400 dark:text-zinc-500 truncate mt-0.5">
                              {item.desc}
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
              ))
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-[#09090b] border-t border-slate-200 dark:border-zinc-800 text-[10px] text-slate-500 dark:text-zinc-500 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <span>Navigate</span>
              <kbd className="px-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded">↑↓</kbd>
              <span>Select</span>
              <kbd className="px-1 bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded">↵</kbd>
            </span>
            <span className="flex items-center space-x-1 text-slate-400">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              <span>Gemini 2.5</span>
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
