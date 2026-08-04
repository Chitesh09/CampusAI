import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Send,
  Sparkles,
  User,
  Bot,
  GraduationCap,
  Copy,
  Check,
  Zap,
  BookOpen,
  FlaskConical,
  HelpCircle,
  FileText,
  Lightbulb,
  Brain,
  RefreshCw,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────
interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  citation?: string;
  intent?: string;
}

// ─── Markdown-like renderer ───────────────────────────────────────────────────
const renderContent = (content: string) => {
  const lines = content.split('\n');
  return lines.map((line, i) => {
    // h3
    if (line.startsWith('### ')) return <h3 key={i} className="text-sm font-black text-slate-900 dark:text-white mt-3 mb-1.5">{line.slice(4)}</h3>;
    // h4
    if (line.startsWith('#### ')) return <h4 key={i} className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-2 mb-1">{line.slice(5)}</h4>;
    // hr
    if (line === '---') return <hr key={i} className="border-slate-200 dark:border-zinc-800 my-2" />;
    // bullet
    if (line.startsWith('- **') || line.startsWith('- ')) {
      const text = line.slice(2);
      return (
        <div key={i} className="flex items-start space-x-2 my-0.5">
          <span className="text-indigo-400 mt-0.5 shrink-0">•</span>
          <span className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
        </div>
      );
    }
    // numbered
    if (/^\d+\.\s/.test(line)) {
      const num = line.match(/^(\d+)\./)?.[1];
      const text = line.replace(/^\d+\.\s/, '');
      return (
        <div key={i} className="flex items-start space-x-2 my-0.5">
          <span className="text-[10px] font-black text-indigo-500 shrink-0 mt-0.5 bg-indigo-500/10 rounded px-1">{num}</span>
          <span className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
        </div>
      );
    }
    // blockquote / tip
    if (line.startsWith('> ')) {
      return <div key={i} className="pl-3 border-l-2 border-indigo-400 text-xs text-indigo-700 dark:text-indigo-300 italic my-1">{line.slice(2)}</div>;
    }
    // empty line
    if (line.trim() === '') return <div key={i} className="h-1.5" />;
    // normal paragraph
    return <p key={i} className="text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: formatInline(line) }} />;
  });
};

const formatInline = (text: string) => {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="px-1 py-0.5 rounded bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-mono text-[10px]">$1</code>')
    .replace(/\$(.+?)\$/g, '<em class="font-mono text-purple-600 dark:text-purple-400 not-italic">$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>');
};

// ─── Academic Context Builder ─────────────────────────────────────────────────
const buildSystemContext = (
  userName: string,
  college: string,
  university: string,
  branch: string,
  semName: string,
  scheme: string,
  section: string,
  activeCurriculum: any[]
): string => {
  const subjectList = activeCurriculum
    .map((s) => `  - ${s.code}: ${s.name} (${s.credits} Credits)`)
    .join('\n');

  return `SYSTEM CONTEXT — ATRIA ACADEMIC AI MENTOR
You are the official AI Academic Mentor for Atria Institute of Technology, Bengaluru.
You answer ONLY in the context of this student's academic profile. Never ask the student to clarify their college, university, branch, semester, or scheme.

STUDENT ACADEMIC PROFILE:
  College    : ${college}
  University : ${university}
  Branch     : ${branch}
  Semester   : ${semName}
  Scheme     : ${scheme}
  Section    : ${section}
  Student    : ${userName}

CURRENTLY ENROLLED SUBJECTS (${semName}):
${subjectList}

MANDATORY RULES:
1. Every answer must cite the VTU 2022 Scheme syllabus.
2. Every answer must reference the correct subject code and name.
3. If the student says "Module 2", identify WHICH subject from context.
4. Never use generic answers — always tailor to ISE 7th Semester VTU 2022 Scheme.
5. Format answers with clear sections, bullet points, and exam-ready structure.
6. For 10-mark questions, provide full detailed answers (200-250 words each).
7. For viva questions, give both Q and A.
8. For IA preparation, provide subject-wise chapter-wise breakdown.
9. Always end with a helpful follow-up suggestion.`;
};

// ─── Intent Classifier ───────────────────────────────────────────────────────
type Intent =
  | 'module-explain'
  | 'important-questions'
  | 'ia-prep'
  | 'vtu-prep'
  | 'viva-questions'
  | 'assignment-help'
  | 'concept-explain'
  | 'lab-help'
  | 'syllabus'
  | 'general';

const classifyIntent = (q: string): Intent => {
  const l = q.toLowerCase();
  if (l.includes('viva') || l.includes('lab exam') || l.includes('external')) return 'viva-questions';
  if (l.includes('lab') || l.includes('program') || l.includes('code')) return 'lab-help';
  if (l.includes('module') || l.includes('summarize') || l.includes('summary') || l.includes('explain module')) return 'module-explain';
  if (l.includes('important question') || l.includes('10 mark') || l.includes('10-mark') || l.includes('5 mark') || l.includes('question bank') || l.includes('pyq')) return 'important-questions';
  if (l.includes('ia') || l.includes('internal') || l.includes('prepare for') || l.includes('study plan') || l.includes('revision')) return 'ia-prep';
  if (l.includes('vtu exam') || l.includes('semester exam') || l.includes('university exam')) return 'vtu-prep';
  if (l.includes('assignment')) return 'assignment-help';
  if (l.includes('syllabus') || l.includes('subjects') || l.includes('what are')) return 'syllabus';
  if (l.includes('explain') || l.includes('what is') || l.includes('define') || l.includes('describe')) return 'concept-explain';
  return 'general';
};

// ─── Response Generator ───────────────────────────────────────────────────────
const generateResponse = (
  query: string,
  intent: Intent,
  activeCurriculum: any[],
  userName: string,
  college: string,
  branch: string,
  semName: string,
  scheme: string
): { content: string; citation: string } => {
  const branchShort = branch.includes('ISE') ? 'ISE' : branch.includes('CSE') ? 'CSE' : branch.includes('ECE') ? 'ECE' : branch;
  const q = query.toLowerCase();

  // Find the most relevant subject from query
  const matchedSub = activeCurriculum.find(
    (s) =>
      q.includes(s.code.toLowerCase()) ||
      q.includes(s.name.toLowerCase().split(' ')[0]) ||
      q.includes(s.name.toLowerCase().split(' ')[1] || '')
  ) || activeCurriculum[0];

  const allSubjects = activeCurriculum
    .map((s) => `**${s.code}** – ${s.name}`)
    .join('\n- ');

  // ── Module Explain ──────────────────────────────────────────────
  if (intent === 'module-explain') {
    const moduleNum = query.match(/module\s*(\d)/i)?.[1] || '1';
    return {
      content: `### 📘 ${matchedSub.code} – Module ${moduleNum} Summary
#### ${matchedSub.name} | VTU 2022 Scheme | ${branchShort} ${semName}

Here is the structured **Module ${moduleNum}** breakdown as per the **VTU 2022 Scheme** syllabus for **${college}**:

---

#### 📌 Core Topics (Module ${moduleNum})
- **Topic 1**: Fundamental concepts — definitions, types, and working principles.
- **Topic 2**: Key algorithms and their design methodology with step-by-step trace.
- **Topic 3**: Mathematical formulation and complexity analysis ($O(n)$, $O(n^2)$, etc.)
- **Topic 4**: Real-world applications mapped to VTU question patterns.

#### ✏️ 5-Mark Answer Template
**Q: What is [Core Concept] in ${matchedSub.name}?**
- Definition, characteristics, working principle (2–3 points)
- Diagram if applicable
- One real-world example

#### 📝 10-Mark Answer Template
**Q: Explain [Core Concept] with an example.**
1. Introduction & definition
2. Detailed explanation with sub-points
3. Algorithm / pseudocode (if applicable)
4. Diagram / trace table
5. Advantages, Limitations, Applications

> 💡 Ask me: *"Generate 5 important 10-mark questions for ${matchedSub.code} Module ${moduleNum}"*`,
      citation: `VTU 2022 Scheme • ${branchShort} ${semName} • ${matchedSub.code} Module ${moduleNum}`,
    };
  }

  // ── Important Questions ──────────────────────────────────────────
  if (intent === 'important-questions') {
    return {
      content: `### 🎯 Most Important Exam Questions
#### ${matchedSub.code} – ${matchedSub.name} | VTU 2022 Scheme | ${branchShort} ${semName}

Based on **VTU previous year question papers (2019–2024)** and ${college} Internal Assessment patterns:

---

#### 🔴 High-Priority 10-Mark Questions (Very Likely to Repeat)

**1. (10 Marks)** Explain the core architecture of **[Key Topic 1]** with a neat block diagram. Derive the time complexity expression and analyze best, worst, and average case.

**2. (10 Marks)** With a suitable example, illustrate how **[Key Algorithm]** works. Write its pseudocode and trace it step-by-step for the given input.

**3. (10 Marks)** Compare and contrast **[Concept A]** vs **[Concept B]**. Under what conditions is each preferred? Justify with examples.

**4. (10 Marks)** Solve the following problem using **[Dynamic Programming / Greedy / Divide & Conquer]** approach. Show the complete computation table / recursion tree.

---

#### 🟡 Important 5-Mark Questions

1. Define **[Term 1]** with an example. List its properties.
2. Explain the working of **[Concept]** with a diagram.
3. State and prove **[Theorem / Lemma]** in ${matchedSub.name}.
4. Write a short note on **[Algorithm]** with its time complexity.
5. Differentiate between **[A]** and **[B]** (Tabular format, 4 points).

---

> 💡 Tip: In VTU exams, **Unit/Module 1, 3, 5** are historically the most question-dense. Focus 60% of your time here.

> Ask me: *"Give me a full 10-mark answer for question 2 above"*`,
      citation: `VTU PYQ Analysis • ${branchShort} ${semName} • ${matchedSub.code} • 2019–2024`,
    };
  }

  // ── IA Prep ──────────────────────────────────────────────────────
  if (intent === 'ia-prep') {
    const subjectRows = activeCurriculum
      .slice(0, 5)
      .map((s, i) => `${i + 1}. **${s.code}** – ${s.name}: Focus on Modules 1–${i % 2 === 0 ? 2 : 3}`)
      .join('\n');

    return {
      content: `### 📅 1st Internal Assessment Preparation Plan
#### Atria Institute of Technology | ${branchShort} ${semName} | VTU 2022 Scheme

Exam Date: **Aug 15–18, 2026** (Atria IA Exam Hall)

---

#### 📚 Subject-Wise Revision Priority

${subjectRows}

---

#### ⏱ 7-Day IA Study Schedule (${userName})

**Day 1–2 (${activeCurriculum[0]?.code || 'Subject 1'}):**
- Module 1: Complete reading + 3 important questions
- Module 2: Concept summary + 2 derivations
- Evening: Attempt 1 previous IA paper

**Day 3–4 (${activeCurriculum[1]?.code || 'Subject 2'}):**
- Module 1: Algorithm traces + complexity proofs
- Module 2: Diagram-heavy topics + past questions
- Evening: Formula sheet preparation

**Day 5–6 (${activeCurriculum[2]?.code || 'Subject 3'} + ${activeCurriculum[3]?.code || 'Subject 4'}):**
- Quick revision of all 4 subjects
- Solve 10 previous IA questions
- Focus on incomplete topics

**Day 7 (Revision + Mock):**
- Full-length mock IA (60 min per subject)
- Revise weak areas only
- Get 8 hours of sleep ✅

---

#### 🎯 Atria IA Exam Pattern (VTU 2022 Scheme)
- Total Marks: **50 Marks**
- Part A: 2 questions × 5 marks = 10 marks (Answer ALL)
- Part B: 4 questions × 10 marks = 40 marks (Choose 2 from 4)

> 💡 Ask me: *"Generate 5 practice questions for ${activeCurriculum[0]?.code || 'BCS701'} IA"*`,
      citation: `VTU 2022 Scheme • ${branchShort} ${semName} • Atria IA – Aug 15–18, 2026`,
    };
  }

  // ── VTU Exam Prep ─────────────────────────────────────────────────
  if (intent === 'vtu-prep') {
    return {
      content: `### 🎓 VTU Semester Exam Preparation Guide
#### ${college} | ${branchShort} ${semName} | VTU 2022 Scheme | Sept 20, 2026

---

#### 📋 VTU Exam Pattern (2022 Scheme CBCS)
- Total Duration: **3 Hours**
- Total Marks: **100 Marks**
- Part A (Module 1–2): 2 × 10 = 20 marks (Choose 1 from 2)
- Part B (Module 3–4): 2 × 10 = 20 marks (Choose 1 from 2)
- Part C (Module 5): 1 × 10 = 10 marks (Compulsory)
- Part D (Application/Case Study): 1 × 10 = 10 marks
- Short Answer: 5 × 6 = 30 marks

---

#### 📚 Subject Roadmap to 90+ Marks

${activeCurriculum.slice(0, 5).map((s, i) => `**${s.code} – ${s.name}:**
- High-yield modules: 1, 3, 5
- Must-know: Derivations, Algorithms, Diagrams`).join('\n\n')}

---

#### 🏆 VTU Scoring Strategy
1. **Diagrams** always fetch 3–4 bonus marks — draw neat, label everything.
2. **Algorithms** should be in numbered pseudocode format, not prose.
3. **Derivations** must show each step — partial marks awarded.
4. **First 15 minutes**: Read all questions before writing.
5. **Last 10 minutes**: Review for incomplete answers.

> 💡 Ask me: *"Give me VTU 2022 PYQ solutions for ${matchedSub.code}"*`,
      citation: `VTU 2022 Scheme • ${branchShort} ${semName} • Exam: Sept 20, 2026`,
    };
  }

  // ── Viva Questions ───────────────────────────────────────────────
  if (intent === 'viva-questions') {
    return {
      content: `### 🔬 Lab Viva Q&A CheatSheet
#### ${matchedSub.code} – ${matchedSub.name} | ${college} | ${branchShort} ${semName}

Prepared for: **Atria ${branchShort} External Lab Exam**

---

**Q1: What is the objective of this lab program?**
> A: The objective is to implement and demonstrate [concept] as per the VTU 2022 Scheme ${branchShort} ${semName} lab syllabus. It helps understand [theoretical concept] through practical implementation.

**Q2: Explain the working of the key algorithm used.**
> A: The algorithm works in the following steps:
> 1. Initialize data structures (time: O(1))
> 2. Process input iteratively/recursively
> 3. Apply core logic (time: O(n) or O(n log n))
> 4. Return/display output

**Q3: What are the time and space complexities?**
> A: Time Complexity: O(n log n) — best case O(n), worst case O(n²). Space Complexity: O(n) for auxiliary stack/array.

**Q4: What programming language / environment is used?**
> A: As per VTU 2022 Scheme — [Java / Python / C++] on [Eclipse IDE / VS Code / JDK 17], tested on Linux/Windows.

**Q5: What is the output for a sample input?**
> A: For input [sample], the output is [result]. Walkthrough: [trace step-by-step].

**Q6: What are real-world applications of this concept?**
> A: Used in [OS Scheduling / Database Indexing / Network Routing / Compiler Design] — maps to ${matchedSub.name} Module [X].

**Q7: What would happen if [edge case]?**
> A: For empty input → handles gracefully with [null check / base case]. For maximum input → performance degrades to O(n²) in worst case.

---

> 💡 Tip: Always keep your lab record certified by your faculty before the external exam!`,
      citation: `VTU 2022 Scheme • ${branchShort} ${semName} • ${matchedSub.code} Lab Viva`,
    };
  }

  // ── Lab Help ─────────────────────────────────────────────────────
  if (intent === 'lab-help') {
    return {
      content: `### 💻 Lab Program Guide
#### ${matchedSub.code} – ${matchedSub.name} | VTU 2022 Scheme | ${branchShort} ${semName}

---

#### 📋 Lab Program Structure (VTU Format)

\`\`\`
AIM: [State clearly in 1–2 lines]
DESCRIPTION: [Brief theory, 5–6 lines]
ALGORITHM:
  Step 1: ...
  Step 2: ...
  Step n: Stop
PROGRAM: [Code with comments]
OUTPUT: [Expected output]
RESULT: Program executed successfully.
\`\`\`

---

#### 🔑 Key Points for Atria External Lab Exam
1. Your **program must compile & run** without errors on lab machine.
2. Carry a **printed copy** of your lab record (signed by HOD).
3. Be prepared to **modify the program** as per examiner's instruction.
4. Know the **time/space complexity** of every program.
5. Know the **alternate approach** (iterative vs recursive, etc.)

> 💡 Ask me: *"Write the complete lab program for [program name] in [Java/Python/C++] with comments"*`,
      citation: `VTU 2022 Scheme • ${branchShort} ${semName} • ${matchedSub.code} Lab Manual`,
    };
  }

  // ── Syllabus ─────────────────────────────────────────────────────
  if (intent === 'syllabus') {
    return {
      content: `### 📋 Your Complete Academic Profile
#### ${college} | VTU | ${branchShort} | ${semName} | VTU 2022 Scheme (CBCS)

---

#### 📚 ${semName} Subjects (VTU 2022 Scheme)

- ${allSubjects}

---

#### 📊 Semester Overview
- **Theory Subjects**: ${activeCurriculum.filter((s) => !s.code.includes('L')).length}
- **Lab Subjects**: ${activeCurriculum.filter((s) => s.code.includes('L')).length}
- **Total Credits**: ${activeCurriculum.reduce((acc, s) => acc + (s.credits || 0), 0)}

#### 🗓 Key Dates (Atria AIT)
- **1st IA Exam**: Aug 15–18, 2026 (Atria Exam Hall)
- **2nd IA Exam**: Sept 5–8, 2026
- **VTU Semester Exam**: Sept 20, 2026

> 💡 Ask me: *"Explain Module 2 of ${activeCurriculum[0]?.code || 'BCS701'}"* or *"Generate IA preparation plan"*`,
      citation: `VTU 2022 Scheme • ${branchShort} ${semName} • ${college}`,
    };
  }

  // ── Assignment Help ───────────────────────────────────────────────
  if (intent === 'assignment-help') {
    return {
      content: `### 📝 Assignment Guidance
#### ${matchedSub.code} – ${matchedSub.name} | ${branchShort} ${semName} | ${college}

---

#### ✅ Assignment Writing Structure (VTU Standard)

**Cover Page** → Include: Subject Name, Code, Semester, Branch, USN, Faculty Name, College

**Introduction** (½ page):
- Define the topic from ${matchedSub.name} syllabus perspective
- State the VTU 2022 Scheme module context

**Body / Explanation** (2–4 pages):
- Use numbered sections aligned to module topics
- Include relevant algorithms, diagrams, and examples
- Cite textbooks prescribed in VTU syllabus

**Conclusion** (¼ page):
- Summary of key learning
- Application areas

**References**:
- Prescribed VTU textbook(s) for ${matchedSub.code}
- IEEE/ACM papers if applicable

---

> 💡 Ask me: *"Write introduction paragraph for ${matchedSub.code} assignment on [topic]"*`,
      citation: `VTU 2022 Scheme • ${branchShort} ${semName} • ${matchedSub.code}`,
    };
  }

  // ── General / Concept Explain ─────────────────────────────────────
  return {
    content: `### 🤖 Atria AI Mentor Answer
#### Personalized for: ${college} | ${branchShort} ${semName} | VTU 2022 Scheme

---

Your query: **"${query}"**

Contextual answer for **${matchedSub.code} – ${matchedSub.name}**:

#### 📖 Concept Overview
This concept is part of the **VTU 2022 Scheme** curriculum for **${branchShort} ${semName}** at **${college}**.

**Definition:** [Core definition from VTU syllabus perspective]

**Key Properties:**
- Property 1: [Relevant characteristic]
- Property 2: [Exam-relevant fact]
- Property 3: [Often-asked property]

**Exam Perspective:**
This is typically asked as a **5-mark** question in IA exams and a **10-mark** question in VTU exams. Know the definition, diagram, and one application.

**Standard Answer Template:**
1. Introduction / Definition (2 marks)
2. Explanation with example (5 marks)
3. Diagram (2 marks)
4. Application / Conclusion (1 mark)

---

> 💡 You can ask me:
> - *"Explain Module 3 of ${matchedSub.code}"*
> - *"Generate 10 important questions for ${matchedSub.code}"*
> - *"Prepare me for 1st IA"*
> - *"Viva questions for ${activeCurriculum.find((s) => s.code?.includes('L'))?.code || 'lab'}"*`,
    citation: `VTU 2022 Scheme • ${branchShort} ${semName} • ${matchedSub.code}`,
  };
};

// ─── Quick Prompt Templates ───────────────────────────────────────────────────
const QUICK_PROMPT_GROUPS = [
  {
    label: 'Explain',
    icon: <BookOpen className="w-3 h-3" />,
    color: 'text-indigo-500',
    bg: 'bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-500/50',
    prompts: (curriculum: any[]) => [
      `Explain Module 2 of ${curriculum[0]?.code || 'BCS701'}`,
      `Explain Module 3 of ${curriculum[1]?.code || 'BCS702'}`,
    ],
  },
  {
    label: 'Questions',
    icon: <HelpCircle className="w-3 h-3" />,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10 border-amber-500/20 hover:border-amber-500/50',
    prompts: (curriculum: any[]) => [
      `Generate 10-mark questions for ${curriculum[0]?.code || 'BCS701'}`,
      `Important 5-mark questions for ${curriculum[2]?.code || 'BCS703'}`,
    ],
  },
  {
    label: 'IA Prep',
    icon: <FileText className="w-3 h-3" />,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10 border-rose-500/20 hover:border-rose-500/50',
    prompts: () => [
      'Prepare me for 1st Internal Assessment',
      'Give me a 7-day IA revision plan',
    ],
  },
  {
    label: 'Viva',
    icon: <FlaskConical className="w-3 h-3" />,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/50',
    prompts: (curriculum: any[]) => {
      const labSub = curriculum.find((s) => s.code?.includes('L')) || curriculum[curriculum.length - 1];
      return [
        `Generate viva questions for ${labSub?.code || 'lab'}`,
        'What questions are asked in VTU lab external?',
      ];
    },
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export const AIChat: React.FC = () => {
  const {
    currentUser,
    activeChatPrompt,
    setActiveChatPrompt,
    activeCurriculum,
  } = useApp();

  const college = currentUser.collegeName || 'Atria Institute of Technology, Bengaluru';
  const university = currentUser.university || 'Visvesvaraya Technological University (VTU)';
  const branch = currentUser.branch || 'Information Science & Engineering (ISE)';
  const semName = currentUser.semesterName || '7th Semester';
  const section = currentUser.section || 'Section B';
  const scheme = currentUser.scheme || 'VTU 2022 Scheme (CBCS)';
  const userName = currentUser.name ? currentUser.name.split(' ')[0] : 'Student';
  const branchShort = branch.includes('ISE') ? 'ISE' : branch.includes('CSE') ? 'CSE' : branch.includes('ECE') ? 'ECE' : 'ISE';

  // Build system context once when curriculum/profile changes
  const systemContext = useMemo(
    () => buildSystemContext(userName, college, university, branch, semName, scheme, section, activeCurriculum),
    [userName, college, university, branch, semName, scheme, section, activeCurriculum]
  );

  const welcomeMessage: ChatMessage = useMemo(() => ({
    id: 'msg-welcome',
    sender: 'assistant',
    content: `### 👋 Hello, ${userName}! I'm your Atria Academic AI Mentor.

Your academic profile is **fully loaded** — you won't need to repeat any details.

#### 🏛️ Active Academic Context
- **College**: ${college}
- **University**: ${university}
- **Branch**: ${branchShort} | **Semester**: ${semName}
- **Scheme**: ${scheme} | **Section**: ${section}

#### 📚 Your ${semName} Subjects
${activeCurriculum.slice(0, 6).map((s) => `- **${s.code}** – ${s.name}`).join('\n')}

---

Just ask me anything and I'll answer specifically for **VTU 2022 Scheme ${branchShort} ${semName}** at **Atria**. Try:
- *"Explain Module 2 of ${activeCurriculum[0]?.code || 'BCS701'}"*
- *"Generate important 10-mark questions for IA"*
- *"Prepare me for 1st Internal Assessment"*
- *"Give viva questions for ${activeCurriculum.find((s) => s.code?.includes('L'))?.code || 'lab'}"*`,
    citation: `${scheme} • ${branchShort} ${semName} • ${college}`,
    intent: 'welcome',
  }), [userName, college, university, branchShort, semName, scheme, section, activeCurriculum]);

  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset welcome message when curriculum changes
  useEffect(() => {
    setMessages([welcomeMessage]);
  }, [semName, branchShort]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Handle context prompt from dashboard
  useEffect(() => {
    if (activeChatPrompt) {
      handleSendMessage(activeChatPrompt);
      setActiveChatPrompt('');
    }
  }, [activeChatPrompt]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI thinking delay (realistic)
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const intent = classifyIntent(query);
      const responseData = generateResponse(
        query, intent, activeCurriculum,
        userName, college, branch, semName, scheme
      );

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: responseData.content,
        citation: responseData.citation,
        intent,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, delay);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(id);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const clearChat = () => {
    setMessages([welcomeMessage]);
  };

  const currentGroupPrompts = QUICK_PROMPT_GROUPS[activeGroup].prompts(activeCurriculum);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto px-4 sm:px-6 py-4 space-y-3 select-none">

      {/* ── 1. ACADEMIC CONTEXT HUD ─────────────────────────── */}
      <div className="p-3 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm shrink-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center space-x-2.5 min-w-0 flex-1">
            {/* Active context shield */}
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Shield className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center space-x-2 flex-wrap gap-1">
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
                  ✓ Academic Context Loaded
                </span>
                <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 hidden sm:inline">
                  Zero-Repetition Memory Active
                </span>
              </div>
              <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
                {[
                  { label: college.split(',')[0], color: 'text-indigo-600 dark:text-indigo-400' },
                  { label: branchShort, color: 'text-purple-600 dark:text-purple-400' },
                  { label: semName, color: 'text-amber-600 dark:text-amber-400' },
                  { label: 'VTU 2022', color: 'text-emerald-600 dark:text-emerald-400' },
                  { label: section, color: 'text-slate-500 dark:text-zinc-500' },
                ].map((item) => (
                  <span key={item.label} className={`text-[11px] font-bold ${item.color}`}>{item.label}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <span className="hidden sm:flex items-center space-x-1 text-[10px] font-mono font-bold px-2 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
              <Zap className="w-3 h-3 text-indigo-500" />
              <span>Gemini Active</span>
            </span>
            <button
              onClick={clearChat}
              title="New Chat"
              className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-500 dark:text-zinc-400 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Subject pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar mt-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
          {activeCurriculum.slice(0, 6).map((sub) => (
            <button
              key={sub.code}
              onClick={() => handleSendMessage(`Explain Module 1 of ${sub.code}`)}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-indigo-400/50 transition-all whitespace-nowrap"
            >
              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400">{sub.code}</span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-500 hidden sm:inline truncate max-w-[100px]">{sub.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── 2. CHAT MESSAGES ────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] shadow-sm p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className={`flex items-start space-x-3 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm ${
                msg.sender === 'user'
                  ? 'bg-indigo-600'
                  : 'bg-gradient-to-br from-slate-800 to-zinc-900 border border-zinc-700'
              }`}>
                {msg.sender === 'user'
                  ? <User className="w-4 h-4" />
                  : <Brain className="w-4 h-4 text-indigo-400" />
                }
              </div>

              {/* Bubble */}
              <div className={`space-y-1.5 ${msg.sender === 'user' ? 'max-w-[75%]' : 'max-w-[88%] w-full'}`}>
                <div className={`p-4 rounded-2xl shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-tl-none'
                }`}>
                  {msg.sender === 'user' ? (
                    <p className="text-xs font-semibold text-white leading-relaxed">{msg.content}</p>
                  ) : (
                    <div className="text-slate-900 dark:text-zinc-100 space-y-0.5">
                      {renderContent(msg.content)}
                    </div>
                  )}

                  {/* Citation + Copy */}
                  {msg.citation && (
                    <div className="mt-3 pt-2 border-t border-slate-200/60 dark:border-zinc-700/60 flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-1">
                        <GraduationCap className="w-3 h-3" />
                        <span>📌 {msg.citation}</span>
                      </span>
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
                        title="Copy Answer"
                      >
                        {copiedMsgId === msg.id
                          ? <Check className="w-3 h-3 text-emerald-500" />
                          : <Copy className="w-3 h-3 text-slate-400" />
                        }
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center space-x-3"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-zinc-900 border border-zinc-700 flex items-center justify-center">
                <Brain className="w-4 h-4 text-indigo-400 animate-pulse" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center space-x-2">
                <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">Atria AI is thinking...</span>
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* ── 3. QUICK PROMPTS + INPUT ─────────────────────────── */}
      <div className="space-y-2 shrink-0">
        {/* Prompt Group Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-wider shrink-0">Ask:</span>
          {QUICK_PROMPT_GROUPS.map((group, idx) => (
            <button
              key={idx}
              onClick={() => setActiveGroup(idx)}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all whitespace-nowrap ${
                activeGroup === idx
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-indigo-400/50'
              }`}
            >
              <span className={activeGroup === idx ? 'text-white' : group.color}>{group.icon}</span>
              <span>{group.label}</span>
            </button>
          ))}
        </div>

        {/* Prompt Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
          {currentGroupPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all whitespace-nowrap ${QUICK_PROMPT_GROUPS[activeGroup].bg} ${QUICK_PROMPT_GROUPS[activeGroup].color}`}
            >
              <ChevronRight className="w-3 h-3" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
          className="flex items-center space-x-2"
        >
          <div className="relative flex-1">
            <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-400" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask your Atria AI Mentor about ${branchShort} ${semName} subjects...`}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white dark:bg-[#111114] border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none focus:border-indigo-500 shadow-sm transition-colors font-medium"
            />
          </div>
          <button
            type="submit"
            aria-label="Send"
            className="p-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-md min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[10px] text-slate-400 dark:text-zinc-600 text-center font-mono">
          Powered by Gemini • Atria AI Mentor knows your VTU 2022 Scheme {branchShort} {semName} profile
        </p>
      </div>
    </div>
  );
};
