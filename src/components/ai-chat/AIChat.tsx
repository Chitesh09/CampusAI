import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Send,
  Sparkles,
  User,
  Bot,
  Layers,
  GraduationCap,
  BookOpen,
  Copy,
  Check,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AIChat: React.FC = () => {
  const { currentUser, activeChatPrompt, setActiveChatPrompt } = useApp();

  const college = currentUser.collegeName || 'BMS College of Engineering';
  const branch = currentUser.branch || 'Information Science & Engineering (ISE)';
  const semName = currentUser.semesterName || '5th Semester';
  const sec = currentUser.section || 'Section B';
  const scheme = currentUser.scheme || '2022 Scheme (CBCS)';

  const [messages, setMessages] = useState<
    { id: string; sender: 'user' | 'assistant'; content: string; citation?: string }[]
  >([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      content: `Hello ${currentUser.name ? currentUser.name.split(' ')[0] : 'Student'}! 👋 I am your VTU AI Subject Tutor. I have loaded your profile context: **${college} • ${branch.split(' ')[0]} ${semName} (${sec}) • ${scheme}**. Ask me anything about your current semester subjects, module summaries, 10-mark questions, or lab viva setups!`,
      citation: `${scheme} • ${branch.split(' ')[0]} ${semName}`,
    },
  ]);

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick Profile-Specific Prompts
  const quickPrompts = [
    'Summarize Module 3 of DBMS',
    'Generate important 10-mark questions for ADA',
    'Explain TOC Module 4',
    'Generate viva questions for Advanced Java Lab',
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle passed prompt from context
  useEffect(() => {
    if (activeChatPrompt) {
      handleSendMessage(activeChatPrompt);
      setActiveChatPrompt('');
    }
  }, [activeChatPrompt]);

  const generateProfileAwareResponse = (query: string) => {
    const qLower = query.toLowerCase();

    if (qLower.includes('dbms') || qLower.includes('module 3')) {
      return {
        content: `### 📘 VTU 2022 Scheme - DBMS (BCS501 / 21CS61) Module 3 Summary

Here is the exact **Module 3: Indexing & B+ Trees** breakdown for ${branch.split(' ')[0]} ${semName}:

#### 1. Primary, Secondary & Clustering Indexes:
- **Dense Index**: Has an index record for every search key value in the data file.
- **Sparse Index**: Contains index records for only some search key values (reduces index file size).

#### 2. B+ Tree Indexing Architecture:
- **Leaf Nodes**: Linked sequentially via pointers for efficient range queries.
- **Internal Nodes**: Contain search key values and child pointers.
- **Node Splitting Rule**: When a node exceeds $m-1$ keys, split the node into two and promote the median key to the parent node.

#### 3. Key VTU Exam Formula:
$$\\text{Maximum Keys per Node } p = \\left\\lfloor \\frac{B + P}{K + P} \\right\\rfloor$$
where $B = \\text{Block Size}$, $P = \\text{Pointer Size}$, and $K = \\text{Key Size}$.`,
        citation: `VTU 2022 Scheme • ${branch.split(' ')[0]} ${semName} • BCS501 Module 3`,
      };
    }

    if (qLower.includes('ada') || qLower.includes('10-mark') || qLower.includes('10 mark')) {
      return {
        content: `### 🎯 VTU 2022 Scheme - ADA (21CS52) Repeated 10-Mark Exam Questions

Based on the ${semName} VTU question bank for ${branch}:

1. **Question 1 (10 Marks)**: Explain **Divide & Conquer Strategy**. Write the Merge Sort algorithm and derive its time complexity using Recurrence Tree method $T(n) = 2T(n/2) + \\Theta(n)$.
2. **Question 2 (10 Marks)**: Solve the **0/1 Knapsack Problem** using Dynamic Programming for capacities $W = 5$ with items $v = [10, 15, 40], w = [1, 2, 3]$. Draw the $V[i, w]$ matrix table.
3. **Question 3 (10 Marks)**: State **Greedy Strategy**. Write Dijkstra's Algorithm for Single Source Shortest Path and trace it on a 5-vertex graph.`,
        citation: `VTU 2022 Scheme • ${branch.split(' ')[0]} ${semName} • 21CS52 Question Bank`,
      };
    }

    if (qLower.includes('toc') || qLower.includes('module 4')) {
      return {
        content: `### 📘 VTU 2022 Scheme - TOC (21CS54) Module 4 Explanation

#### Pushdown Automata (PDA) & Context-Free Languages:
- **Definition**: A PDA is a 7-tuple $M = (Q, \\Sigma, \\Gamma, \\delta, q_0, Z_0, F)$ where $\\Gamma$ is the stack alphabet.
- **Transition Function**: $\\delta: Q \\times (\\Sigma \\cup \\{\\epsilon\\}) \\times \\Gamma \\rightarrow P(Q \\times \\Gamma^*)$.
- **Pumping Lemma for CFLs**: Used to prove a language is NOT context-free ($s = uvxyz$ where $|vy| \\ge 1$ and $|vxy| \\le p$).`,
        citation: `VTU 2022 Scheme • ${branch.split(' ')[0]} ${semName} • 21CS54 Module 4`,
      };
    }

    if (qLower.includes('java') || qLower.includes('viva') || qLower.includes('lab')) {
      return {
        content: `### 🔬 Advanced Java Lab (21CSL56) Viva Q&A CheatSheet

Here are the top viva questions for ${college} ${semName} external lab exam:

1. **Q: What are the 4 types of JDBC Drivers?**
   - *Answer*: Type 1 (JDBC-ODBC Bridge), Type 2 (Native-API), Type 3 (Network-Protocol), Type 4 (Thin Driver / Pure Java).
2. **Q: Explain the Servlet Lifecycle methods.**
   - *Answer*: \`init()\`, \`service()\`, and \`destroy()\`.
3. **Q: Difference between \`doGet()\` and \`doPost()\`?**
   - *Answer*: \`doGet\` appends parameters to URL (limited length, unsecure), \`doPost\` sends parameters in HTTP request body (secure, large payloads).`,
        citation: `VTU 2022 Scheme • ${branch.split(' ')[0]} ${semName} • 21CSL56 Lab Viva`,
      };
    }

    return {
      content: `### 🤖 VTU AI Tutor Answer for: "${query}"

Here is your tailored answer contextualized for **${college} • ${branch.split(' ')[0]} ${semName} (${scheme})**:

- **Curriculum Match**: VTU 2022 Scheme Syllabus.
- **Key Takeaway**: Subject concepts organized into clear 5-mark & 10-mark exam structures.
- **Next Step**: You can ask me to generate a 5-question practice quiz or viva flashcards on this topic!`,
      citation: `VTU 2022 Scheme • ${branch.split(' ')[0]} ${semName}`,
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user' as const,
      content: query.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const responseData = generateProfileAwareResponse(query);
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: 'assistant' as const,
        content: responseData.content,
        citation: responseData.citation,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto space-y-4 select-none flex flex-col h-[calc(100vh-4rem)]">
      {/* 1. LIVE ACADEMIC PROFILE CONTEXT HUD BANNER */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
            <GraduationCap className="w-4.5 h-4.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                ACTIVE AI CONTEXT
              </span>
              <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 truncate">
                Zero-Repetition Active Memory
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
              {college} • {branch.split(' ')[0]} {semName} ({sec}) • {scheme}
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shrink-0 hidden sm:inline-flex items-center space-x-1">
          <Zap className="w-3 h-3 text-emerald-500" />
          <span>Gemini 2.5 Active</span>
        </span>
      </div>

      {/* 2. CHAT MESSAGES STREAM CONTAINER */}
      <div className="flex-1 overflow-y-auto p-4 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm space-y-4">
        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            {/* Avatar */}
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0 text-xs font-bold shadow-2xs ${
                msg.sender === 'user' ? 'bg-indigo-600' : 'bg-zinc-800 border border-zinc-700'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-indigo-400" />}
            </div>

            {/* Content Bubble */}
            <div className={`space-y-1.5 max-w-[85%] sm:max-w-[75%]`}>
              <div
                className={`p-4 rounded-2xl text-xs font-medium leading-relaxed shadow-2xs ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none font-semibold'
                    : 'bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-100 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>

                {/* AI Citation Tag */}
                {msg.citation && (
                  <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-zinc-800 text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-between">
                    <span>📌 {msg.citation}</span>
                    <button
                      onClick={() => copyToClipboard(msg.content, msg.id)}
                      className="p-1 rounded hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors"
                      title="Copy Answer"
                    >
                      {copiedMsgId === msg.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono animate-pulse">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>VTU AI Tutor is synthesizing profile-tailored answer...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* 3. QUICK ACADEMIC PROMPT CHIPS & INPUT BAR */}
      <div className="space-y-2 shrink-0">
        {/* Quick Prompts */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          <span className="text-[10px] font-mono text-slate-400 uppercase font-bold shrink-0">Suggestions:</span>
          {quickPrompts.map((p) => (
            <button
              key={p}
              onClick={() => handleSendMessage(p)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-700/80 text-slate-700 dark:text-zinc-300 hover:border-indigo-500 transition-all text-[11px] font-medium shrink-0 shadow-2xs"
            >
              "{p}"
            </button>
          ))}
        </div>

        {/* Form Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask VTU AI Tutor about ${semName} ${branch.split(' ')[0]} subjects... (e.g. Summarize Module 3 of DBMS)`}
            className="flex-1 px-4 py-3 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 shadow-sm"
          />
          <button
            type="submit"
            aria-label="Send Message"
            className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
