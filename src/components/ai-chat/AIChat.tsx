import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/geminiService';
import type { GeminiResponse } from '../../services/geminiService';
import type { ChatMessage } from '../../types';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Copy,
  Check,
  BookmarkPlus,
  HelpCircle,
  RotateCcw,
  ExternalLink,
  Cpu,
  Brain,
  FileText,
  Calendar,
  Layers,
  Activity,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIChat: React.FC = () => {
  const { currentUser, activeChatPrompt, setActiveChatPrompt, geminiApiKey, setCurrentView } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      content: `### 👋 Welcome to the Gemini AI Activity Center

I actively monitor your course outlines, lab manuals, exam schedules, and attendance metrics:
- **Exam Details:** *"When is my DBMS exam?"*
- **Campus Locations:** *"Where is Lab 5?"*
- **Course Summaries:** *"Summarize DBMS Module 3"*
- **Code & Algorithms:** *"Explain Dijkstra's Algorithm"*`,
      timestamp: 'Just now',
      suggestedActions: ['When is my DBMS exam?', 'Where is Lab 5?', "Explain Dijkstra's Algorithm"],
    },
  ]);

  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [activeActivity, setActiveActivity] = useState<{ label: string; icon: React.ReactNode; progress: number } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeChatPrompt) {
      handleSendMessage(activeChatPrompt);
      setActiveChatPrompt('');
    }
  }, [activeChatPrompt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking, activeActivity]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      content: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsThinking(true);

    // AI Activity Center Streaming Pipeline Simulation
    const lower = queryText.toLowerCase();
    let activityLabel = 'Understanding Student Academic Context...';
    let activityIcon = <Brain className="w-4 h-4 text-indigo-400" />;

    if (lower.includes('exam') || lower.includes('date')) {
      activityLabel = 'Reading Academic Calendar & Timetable...';
      activityIcon = <Calendar className="w-4 h-4 text-purple-400" />;
    } else if (lower.includes('summarize') || lower.includes('pdf')) {
      activityLabel = 'Analyzing PDF Document & Extracting Key Concepts...';
      activityIcon = <FileText className="w-4 h-4 text-emerald-400" />;
    } else if (lower.includes('plan') || lower.includes('schedule')) {
      activityLabel = 'Planning Revision Strategy & Break Timetable...';
      activityIcon = <Layers className="w-4 h-4 text-amber-400" />;
    }

    // Step 1: Progress 40%
    setActiveActivity({ label: activityLabel, icon: activityIcon, progress: 40 });
    await new Promise((res) => setTimeout(res, 400));

    // Step 2: Progress 85%
    setActiveActivity({ label: 'Generating Gemini 2.5 Response...', icon: <Sparkles className="w-4 h-4 text-indigo-400" />, progress: 85 });
    await new Promise((res) => setTimeout(res, 400));

    setActiveActivity(null);

    try {
      const res: GeminiResponse = await queryGeminiAI(queryText, geminiApiKey);

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        content: res.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedActions: res.suggestedActions,
        citation: res.citation,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot_err_${Date.now()}`,
          sender: 'assistant',
          content: 'Error connecting to Gemini API. Please try again.',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsThinking(false);
      setActiveActivity(null);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const presetPrompts = [
    'When is my DBMS exam?',
    'Where is Lab 5?',
    'Summarize DBMS Module 3',
    "Explain Dijkstra's Algorithm",
    'Generate DBMS viva questions',
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] max-w-4xl mx-auto p-4 space-y-3 select-none">
      {/* REAL-TIME AI ACTIVITY CENTER HEADER */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900 dark:text-white">
                AI Activity Center Pipeline
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                Active Profile: {currentUser.name} • {currentUser.department} (Sem {currentUser.semester})
              </p>
            </div>
          </div>

          <button
            onClick={() =>
              setMessages([
                {
                  id: 'msg_reset',
                  sender: 'assistant',
                  content: 'Chat session reset. What would you like to analyze next?',
                  timestamp: 'Just now',
                },
              ])
            }
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 text-xs flex items-center space-x-1"
            title="New Chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold">Reset</span>
          </button>
        </div>

        {/* Streaming Task Execution Activity Card */}
        <AnimatePresence>
          {activeActivity && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs space-y-2 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 font-bold">
                  {activeActivity.icon}
                  <span>{activeActivity.label}</span>
                </div>
                <span className="font-mono text-[10px] font-bold">{activeActivity.progress}%</span>
              </div>

              {/* Progress Bar Ring Simulation */}
              <div className="w-full bg-indigo-500/20 h-1.5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${activeActivity.progress}%` }}
                  transition={{ duration: 0.3 }}
                  className="h-full bg-indigo-500 rounded-full"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* MESSAGES SCROLL AREA */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`flex items-start space-x-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-bold shrink-0 mt-0.5 shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-xl rounded-2xl p-4 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white font-medium shadow-sm'
                  : 'bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] text-slate-800 dark:text-zinc-200 shadow-sm'
              }`}
            >
              <div className="prose dark:prose-invert prose-xs max-w-none space-y-2 whitespace-pre-wrap">
                {msg.content}
              </div>

              {msg.citation && (
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-zinc-800 text-[10px] text-slate-400 dark:text-zinc-500 flex items-center space-x-1 font-mono">
                  <ExternalLink className="w-3 h-3 text-indigo-400" />
                  <span>Source: {msg.citation}</span>
                </div>
              )}

              {msg.sender === 'assistant' && (
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => setCurrentView('smart-notes')}
                      className="p-1 rounded text-slate-400 hover:text-indigo-400"
                      title="Save to Smart Notes"
                    >
                      <BookmarkPlus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setCurrentView('quiz')}
                      className="p-1 rounded text-slate-400 hover:text-purple-400"
                      title="Generate Quiz"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500">
                    {msg.timestamp}
                  </span>
                </div>
              )}

              {msg.suggestedActions && (
                <div className="mt-3 flex flex-wrap gap-1.5 pt-1">
                  {msg.suggestedActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => handleSendMessage(action)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold transition-colors"
                    >
                      + {action}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        ))}

        {isThinking && !activeActivity && (
          <div className="flex items-center space-x-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Gemini is thinking...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* PRESET PROMPTS BAR */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar">
        <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 shrink-0">Presets:</span>
        {presetPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => handleSendMessage(prompt)}
            className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-semibold shrink-0 hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* INPUT FORM */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="relative flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask CampusCopilot anything about your courses, exams, or labs..."
          className="w-full pl-3.5 pr-10 py-3 rounded-xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          className="absolute right-2 p-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-40 transition-colors shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
