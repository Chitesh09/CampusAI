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
  Zap,
  Cpu,
  Brain,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIChat: React.FC = () => {
  const { currentUser, activeChatPrompt, setActiveChatPrompt, geminiApiKey, setCurrentView } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      content: `### 👋 Welcome! I am your personal Gemini AI Academic Companion.

I maintain active context of your courses, lab manuals, exam schedules, and attendance records:
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
  const [executingTool, setExecutingTool] = useState<string | null>(null);
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
  }, [messages, isThinking, executingTool]);

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

    // Simulate tool execution animation step
    const lower = queryText.toLowerCase();
    if (lower.includes('exam') || lower.includes('date')) {
      setExecutingTool('Executing Tool: Academic Calendar Query');
    } else if (lower.includes('lab') || lower.includes('where')) {
      setExecutingTool('Executing Tool: Spatial Campus Navigation Twin');
    } else if (lower.includes('summarize') || lower.includes('pdf')) {
      setExecutingTool('Executing Tool: Document Intelligence Synthesis Engine');
    } else {
      setExecutingTool('Executing Tool: Gemini 2.5 Knowledge Base Retrieval');
    }

    await new Promise((res) => setTimeout(res, 600));
    setExecutingTool(null);

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
      setExecutingTool(null);
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
      {/* ACTIVE MEMORY & CONTEXT HEADER */}
      <div className="p-3 rounded-xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs">
          <Brain className="w-4 h-4 text-indigo-500" />
          <span className="font-bold text-slate-900 dark:text-white">
            Companion Context:
          </span>
          <span className="font-mono text-slate-500 dark:text-zinc-400">
            {currentUser.name} • {currentUser.department} (Semester {currentUser.semester})
          </span>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'msg_reset',
                sender: 'assistant',
                content: 'Chat reset. What would you like to ask your companion?',
                timestamp: 'Just now',
              },
            ])
          }
          className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-zinc-200 text-xs flex items-center space-x-1"
          title="New Chat"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold">New Session</span>
        </button>
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
                  : 'bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 text-slate-800 dark:text-zinc-200 shadow-sm'
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

        {/* ANIMATED TOOL EXECUTION CARD */}
        <AnimatePresence>
          {executingTool && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-bold flex items-center space-x-2 w-fit shadow-sm"
            >
              <Cpu className="w-4 h-4 animate-spin text-indigo-500" />
              <span>{executingTool}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {isThinking && !executingTool && (
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
          className="w-full pl-3.5 pr-10 py-3 rounded-xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
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
