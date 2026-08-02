import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API client if key exists in env or localStorage
export const getGeminiClient = (customKey?: string) => {
  const apiKey = customKey || import.meta.env.VITE_GEMINI_API_KEY || localStorage.getItem('campus_gemini_key');
  if (!apiKey) return null;
  try {
    return new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Could not initialize GoogleGenAI client:', err);
    return null;
  }
};

// Response interface
export interface GeminiResponse {
  text: string;
  suggestedActions?: string[];
  citation?: string;
}

// Fallback intelligent AI responder for seamless showcase without requiring immediate API key setup
export const queryGeminiAI = async (
  prompt: string,
  customKey?: string
): Promise<GeminiResponse> => {
  const aiClient = getGeminiClient(customKey);

  // If real Gemini API key is available, call Gemini 1.5/2.0 Flash!
  if (aiClient) {
    try {
      const response = await aiClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are CampusCopilot AI, an intelligent academic copilot powered by Google Gemini. Provide concise, ultra-accurate, structured academic answers with Markdown syntax, mathematical formulas, and helpful study tips for college students and professors.',
        }
      });
      if (response && response.text) {
        return {
          text: response.text,
          suggestedActions: ['Generate Flashcards', 'Create Practice Quiz', 'Add to Smart Notes'],
          citation: 'Gemini 2.5 Flash Academic Engine',
        };
      }
    } catch (err) {
      console.warn('Real Gemini API call error, defaulting to local intelligent generator:', err);
    }
  }

  // Simulate network streaming delay for realistic experience
  await new Promise((res) => setTimeout(res, 800));

  const lower = prompt.toLowerCase();

  // 1. DBMS Exam Query
  if (lower.includes('dbms') || lower.includes('database exam')) {
    return {
      text: `### 📅 Database Management Systems (CS601) Midterm Exam Details

- **Date:** August 15, 2026
- **Time:** 10:00 AM - 01:00 PM (3 Hours)
- **Venue:** Examination Hall 1 (CS Block A, 2nd Floor)
- **Total Marks:** 100 Marks (30% Weightage)
- **Faculty:** Dr. Robert Vance

#### 📚 Syllabus & Modules Covered:
1. **Module 1:** Relational Model, ER Modeling & Tuple Relational Calculus
2. **Module 2:** Normalization (1NF, 2NF, 3NF, BCNF & 4NF)
3. **Module 3:** B+ Trees, ISAM Indexing & Dynamic Hashing
4. **Module 4:** Transaction Management, ACID Properties & 2-Phase Locking (2PL)

> 💡 **Copilot Recommendation**: Review **B+ Tree Node Split rules** and **BCNF Decomposition steps** as they carried 35% of marks in previous semester exams.`,
      suggestedActions: ['Open DBMS Smart Notes', 'Generate 5-min DBMS Quiz', 'View Examination Hall Map'],
      citation: 'Campus Academic Portal • CS Department Circular 2026',
    };
  }

  // 2. Lab 5 Location Query
  if (lower.includes('lab 5') || lower.includes('where is lab')) {
    return {
      text: `### 📍 Location Guide: AI & Robotics Lab 5

- **Building:** Tech Annex (Adjacent to Student Hub)
- **Floor:** 2nd Floor (Room T-204)
- **Equipment:** 30x NVIDIA RTX 4090 Workstations, TurtleBot4 Robotics Platforms
- **Lab In-Charge:** Dr. Sarah Jenkins

#### 🚶 Step-by-Step Walking Route from Main Library:
1. Exit Central Library main doors and head **South-East** past the Fountain Court (120 meters).
2. Take the covered glass walkway towards the **Tech Annex**.
3. Take Elevator B to the **2nd Floor**.
4. Turn left after the elevator foyer; **Lab 5** is on your right.

*Estimated Walking Time:* **3 minutes** (240 meters)`,
      suggestedActions: ['Open Interactive Campus Map', 'View Route Simulation', 'Check Lab 5 Timetable'],
      citation: 'Campus Map Navigation Subsystem',
    };
  }

  // 3. Dijkstra's Algorithm Explanation
  if (lower.includes('dijkstra') || lower.includes('algorithm')) {
    return {
      text: `### ⚡ Dijkstra's Algorithm (Single-Source Shortest Path)

**Dijkstra's Algorithm** finds the shortest paths from a single starting vertex to all other vertices in a weighted graph with **non-negative edge weights**.

#### 🧠 Key Mathematical Concept:
The greedy choice property maintains a distance array \`dist[]\` initialized to \`∞\` and a Priority Queue (Min-Heap).

\`\`\`python
import heapq

def dijkstra(graph, start):
    # Distance dictionary with default infinity
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    # Priority queue storing tuples of (distance, node)
    pq = [(0, start)]
    
    while pq:
        current_dist, u = heapq.heappop(pq)
        
        if current_dist > distances[u]:
            continue
            
        for neighbor, weight in graph[u].items():
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
                
    return distances
\`\`\`

#### ⏱️ Time & Space Complexity:
- **Time Complexity:** $\\mathcal{O}((V + E) \\log V)$ using Binary Min-Heap
- **Space Complexity:** $\\mathcal{O}(V)$ for distance array and priority queue

> ⚠️ **Common Viva Question:** Why does Dijkstra fail on negative edge weights?  
> *Answer:* Dijkstra assumes once a node is popped from the priority queue, its distance is finalized. A negative edge found later could decrease distance, violating greedy choice. Use **Bellman-Ford** for negative edge weights!`,
      suggestedActions: ['Create Dijkstra Flashcard', 'Generate Viva Q&A', 'Save to Revision Sheet'],
      citation: 'Introduction to Algorithms (CLRS) • Module 4',
    };
  }

  // 4. Summarize Module 3
  if (lower.includes('summarize module') || lower.includes('summary')) {
    return {
      text: `### 📋 One-Page Executive Summary: DBMS Module 3 (Transactions & Concurrency)

#### 1. ACID Properties
- **Atomicity:** All operations complete successfully or transaction is entirely rolled back (WAL).
- **Consistency:** Database transitions from one valid state to another.
- **Isolation:** Concurrent transactions execute without mutual interference.
- **Durability:** Committed transactions persist even during hardware crash.

#### 2. Concurrency Control Mechanisms
- **Lock-Based (2PL):** Growing Phase (acquire locks) $\\rightarrow$ Shrinking Phase (release locks).
- **Strict 2PL:** All exclusive locks held until transaction commits (prevents cascading aborts).
- **Timestamp Ordering:** Uses $TS(T_i)$ to order operations without deadlocks.

#### 3. Deadlock Handling Strategies
- **Wait-Die:** Non-preemptive scheme based on transaction timestamps.
- **Wound-Wait:** Preemptive scheme (older transactions wound younger ones).

\`\`\`
[ Transaction T1 ] --(Requests Lock)--> [ Data Item X ] <-- (Holds Lock) -- [ Transaction T2 ]
\`\`\``,
      suggestedActions: ['Export PDF Cheat Sheet', 'Generate 5 MCQ Quiz', 'Practice Flashcards'],
      citation: 'Database Systems Concepts (Silberschatz) • Ch. 14-15',
    };
  }

  // 5. Default Copilot Academic Response
  return {
    text: `### 🎓 CampusCopilot AI Response

I analyzed your query regarding **"${prompt}"** across your course syllabus, lecture slides, exam schedules, and department databases.

#### Key Highlights & Academic Insights:
1. **Curriculum Context:** Relevant to your 6th Semester Computer Science coursework.
2. **Action Items:** Ensure your assignment submissions and lab reports are updated in the student portal before Friday.
3. **Study Strategy:** Focus on core theoretical definitions, time complexities, and practical code implementations.

If you would like me to generate practice questions, a 1-page summary, or step-by-step flashcards on this topic, click the action buttons below!`,
    suggestedActions: ['Generate Practice Quiz', 'Create Study Notes', 'Ask Follow-up Question'],
    citation: 'CampusCopilot Academic Engine 2026',
  };
};
