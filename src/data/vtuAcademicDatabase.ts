// ─────────────────────────────────────────────────────────────────────────────
// OFFICIAL VTU ACADEMIC DATABASE
// Structure: University → Scheme → Branch → Semester → Subjects
// VTU 2022 Scheme (CBCS) — ISE All 8 Semesters
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ───────────────────────────────────────────────────────────────────

export interface VTUModuleResource {
  pdfNotes: string[];
  pyqs: string[];
  assignments: string[];
  labCode?: string;
}

export interface VTUModule {
  num: number;
  title: string;
  topics: string;
  resources: VTUModuleResource;
}

export interface VTUSubject {
  code: string;
  name: string;
  credits: number;
  type: 'theory' | 'lab' | 'project' | 'mandatory';
  faculty?: string;
  vtuNotesUrl: string;
  progress: number;
  attendancePct: number;
  notesCount: number;
  assignmentsCount: number;
  quizzesCount: number;
  pyqCount: number;
  modules: VTUModule[];
}

// University → Scheme → Branch → Semester → Subjects
export type DatabaseSchema = Record<
  string,
  Record<string, Record<string, Record<string, VTUSubject[]>>>
>;

// ─── Helper: generate a VTU Circle URL ───────────────────────────────────────
const vtuUrl = (code: string) =>
  `https://vtucircle.com/notes/${code.toLowerCase()}`;

// ─── Helper: build a module entry quickly ───────────────────────────────────
const mod = (
  num: number,
  title: string,
  topics: string,
  notes: string[],
  pyqs: string[],
  assignments: string[] = [],
  labCode?: string
): VTUModule => ({
  num,
  title,
  topics,
  resources: { pdfNotes: notes, pyqs, assignments, labCode },
});

// ─────────────────────────────────────────────────────────────────────────────
// VTU ACADEMIC DATABASE — MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export const VTU_ACADEMIC_DATABASE: DatabaseSchema = {
  'VTU (Visvesvaraya Technological University)': {
    '2022 Scheme (CBCS)': {

      // ═══════════════════════════════════════════════════════════════════════
      // BRANCH: Information Science & Engineering (ISE)
      // ═══════════════════════════════════════════════════════════════════════
      'Information Science & Engineering (ISE)': {

        // ───────────────────────────────────────────────────────────────────
        // SEMESTER 1 (Common to all branches)
        // ───────────────────────────────────────────────────────────────────
        '1st Semester': [
          {
            code: 'BMATC101',
            name: 'Mathematics for Computer Science – I',
            credits: 4, type: 'theory',
            vtuNotesUrl: vtuUrl('bmatc101'),
            progress: 100, attendancePct: 88, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Differential Calculus', 'Successive Differentiation, Leibnitz Theorem, Maclaurin & Taylor Series', ['BMATC101_M1.pdf'], ['VTU_2023_BMATC101_Q1.pdf']),
              mod(2, 'Integral Calculus', 'Reduction Formulae, Beta & Gamma Functions, Double & Triple Integrals', ['BMATC101_M2.pdf'], ['VTU_2023_BMATC101_Q2.pdf']),
              mod(3, 'Ordinary Differential Equations (ODE)', 'First-Order ODE, Bernoulli Equation, Linear ODE with Constant Coefficients', ['BMATC101_M3.pdf'], ['VTU_2022_BMATC101_Q3.pdf']),
              mod(4, 'Vector Calculus', 'Gradient, Divergence, Curl, Green\'s & Stoke\'s Theorems', ['BMATC101_M4.pdf'], ['VTU_2022_BMATC101_Q4.pdf']),
              mod(5, 'Laplace Transforms', 'Definition, Properties, Inverse Laplace, Application to ODE', ['BMATC101_M5.pdf'], ['VTU_2022_BMATC101_Q5.pdf']),
            ],
          },
          {
            code: 'BPHYC102',
            name: 'Engineering Physics',
            credits: 4, type: 'theory',
            vtuNotesUrl: vtuUrl('bphyc102'),
            progress: 100, attendancePct: 85, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Wave Optics', 'Interference, Diffraction, Polarization, Lasers', ['BPHYC102_M1.pdf'], ['VTU_2023_BPHYC102_Q1.pdf']),
              mod(2, 'Quantum Mechanics', 'Wave-Particle Duality, Schrödinger Equation, Uncertainty Principle', ['BPHYC102_M2.pdf'], ['VTU_2023_BPHYC102_Q2.pdf']),
              mod(3, 'Electrical Properties of Materials', 'Free Electron Theory, Band Theory, Semiconductors', ['BPHYC102_M3.pdf'], ['VTU_2022_BPHYC102_Q3.pdf']),
              mod(4, 'Superconductivity & Nanomaterials', 'BCS Theory, Types of Superconductors, Nanoscale Properties', ['BPHYC102_M4.pdf'], ['VTU_2022_BPHYC102_Q4.pdf']),
              mod(5, 'Optical Fibers & Photonics', 'Total Internal Reflection, Fiber Types, Photonic Devices', ['BPHYC102_M5.pdf'], ['VTU_2022_BPHYC102_Q5.pdf']),
            ],
          },
          {
            code: 'BESCK104B',
            name: 'Elements of Electrical Engineering',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('besck104b'),
            progress: 100, attendancePct: 82, notesCount: 4, assignmentsCount: 1, quizzesCount: 4, pyqCount: 4,
            modules: [
              mod(1, 'DC Circuits', 'KVL, KCL, Network Theorems (Thevenin, Norton, Superposition)', ['BESCK104B_M1.pdf'], ['VTU_2023_BESCK104B_Q1.pdf']),
              mod(2, 'AC Circuits', 'RLC Circuits, Phasors, Resonance, Power Factor', ['BESCK104B_M2.pdf'], ['VTU_2023_BESCK104B_Q2.pdf']),
              mod(3, 'Transformers', 'Principle of Operation, EMF Equation, Losses, Efficiency', ['BESCK104B_M3.pdf'], ['VTU_2023_BESCK104B_Q3.pdf']),
              mod(4, 'DC Machines', 'DC Generator, DC Motor, Torque Equation, Speed Control', ['BESCK104B_M4.pdf'], ['VTU_2022_BESCK104B_Q4.pdf']),
              mod(5, 'AC Machines', 'Induction Motor, Synchronous Generator, Starting Methods', ['BESCK104B_M5.pdf'], ['VTU_2022_BESCK104B_Q5.pdf']),
            ],
          },
          {
            code: 'BPOPS103',
            name: 'Problem Solving Through Programming in C',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bpops103'),
            progress: 100, attendancePct: 90, notesCount: 5, assignmentsCount: 3, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Introduction to C', 'Data Types, Operators, Control Flow (if, switch, loops)', ['BPOPS103_M1.pdf'], ['VTU_2023_BPOPS103_Q1.pdf'], ['Assignment 1: C programs on loops']),
              mod(2, 'Functions & Arrays', 'User-Defined Functions, Recursion, 1D & 2D Arrays', ['BPOPS103_M2.pdf'], ['VTU_2023_BPOPS103_Q2.pdf'], ['Assignment 2: Array operations']),
              mod(3, 'Pointers & Strings', 'Pointer Arithmetic, Dynamic Memory, String Functions', ['BPOPS103_M3.pdf'], ['VTU_2022_BPOPS103_Q3.pdf']),
              mod(4, 'Structures & Unions', 'Structure Declaration, Nested Structures, Bit Fields', ['BPOPS103_M4.pdf'], ['VTU_2022_BPOPS103_Q4.pdf']),
              mod(5, 'File Handling in C', 'File I/O, fopen/fclose, Sequential vs Random Access', ['BPOPS103_M5.pdf'], ['VTU_2022_BPOPS103_Q5.pdf']),
            ],
          },
          {
            code: 'BPHYP106',
            name: 'Engineering Physics Lab',
            credits: 1, type: 'lab',
            vtuNotesUrl: vtuUrl('bphyp106'),
            progress: 100, attendancePct: 92, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Lab Programs', 'Laser Diffraction, Newton\'s Rings, LCR Resonance, Optical Fiber', ['BPHYP106_Manual.pdf'], ['VTU_BPHYP106_Lab_Questions.pdf'], [], 'C'),
            ],
          },
          {
            code: 'BPOPSP107',
            name: 'Problem Solving Through C Lab',
            credits: 1, type: 'lab',
            vtuNotesUrl: vtuUrl('bpopsp107'),
            progress: 100, attendancePct: 95, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'C Lab Programs', 'Pattern printing, Sorting, Searching, String manipulation, Pointers, File I/O', ['BPOPSP107_Manual.pdf'], ['VTU_BPOPSP107_Viva.pdf'], [], 'C'),
            ],
          },
        ],

        // ───────────────────────────────────────────────────────────────────
        // SEMESTER 2 (Common to all branches)
        // ───────────────────────────────────────────────────────────────────
        '2nd Semester': [
          {
            code: 'BMATC201',
            name: 'Mathematics for Computer Science – II',
            credits: 4, type: 'theory',
            vtuNotesUrl: vtuUrl('bmatc201'),
            progress: 100, attendancePct: 86, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Linear Algebra', 'Matrices, Rank, Eigen Values, Diagonalization', ['BMATC201_M1.pdf'], ['VTU_2023_BMATC201_Q1.pdf']),
              mod(2, 'Sequences & Series', 'Convergence, Tests (Ratio, Root, Integral), Power Series', ['BMATC201_M2.pdf'], ['VTU_2023_BMATC201_Q2.pdf']),
              mod(3, 'Fourier Series', 'Full-Range & Half-Range Expansions, Parseval\'s Identity', ['BMATC201_M3.pdf'], ['VTU_2022_BMATC201_Q3.pdf']),
              mod(4, 'Partial Differential Equations', 'Formation, Solutions, Wave & Heat Equations', ['BMATC201_M4.pdf'], ['VTU_2022_BMATC201_Q4.pdf']),
              mod(5, 'Z-Transforms', 'Definition, Properties, Inverse Z-Transform, Difference Equations', ['BMATC201_M5.pdf'], ['VTU_2022_BMATC201_Q5.pdf']),
            ],
          },
          {
            code: 'BCHEC202',
            name: 'Engineering Chemistry',
            credits: 4, type: 'theory',
            vtuNotesUrl: vtuUrl('bchec202'),
            progress: 100, attendancePct: 83, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Electrochemistry & Corrosion', 'Galvanic Cells, Nernst Equation, Cathodic Protection', ['BCHEC202_M1.pdf'], ['VTU_2023_BCHEC202_Q1.pdf']),
              mod(2, 'Polymers & Plastics', 'Addition vs Condensation Polymerization, Thermoplastics, Composites', ['BCHEC202_M2.pdf'], ['VTU_2023_BCHEC202_Q2.pdf']),
              mod(3, 'Water Treatment', 'Hardness, Softening Methods, Desalination, Industrial Effluent', ['BCHEC202_M3.pdf'], ['VTU_2022_BCHEC202_Q3.pdf']),
              mod(4, 'Fuels & Combustion', 'Calorific Value, Coal Analysis, Petroleum Refining, Flue Gas Analysis', ['BCHEC202_M4.pdf'], ['VTU_2022_BCHEC202_Q4.pdf']),
              mod(5, 'Spectroscopy & Nanomaterials', 'UV-Vis, IR, NMR Spectroscopy, Carbon Nanotubes, Graphene', ['BCHEC202_M5.pdf'], ['VTU_2022_BCHEC202_Q5.pdf']),
            ],
          },
          {
            code: 'BNSC203',
            name: 'Nature & Environmental Studies',
            credits: 1, type: 'mandatory',
            vtuNotesUrl: vtuUrl('bnsc203'),
            progress: 100, attendancePct: 80, notesCount: 2, assignmentsCount: 1, quizzesCount: 2, pyqCount: 2,
            modules: [
              mod(1, 'Ecosystems & Biodiversity', 'Food Chains, Ecological Balance, Biodiversity Hotspots', ['BNSC203_M1.pdf'], ['VTU_2023_BNSC203_Q1.pdf']),
              mod(2, 'Environmental Pollution & Management', 'Air, Water, Soil Pollution, Waste Management, Sustainable Development', ['BNSC203_M2.pdf'], ['VTU_2023_BNSC203_Q2.pdf']),
            ],
          },
          {
            code: 'BKSC204',
            name: 'Samskrutika Kannada',
            credits: 1, type: 'mandatory',
            vtuNotesUrl: vtuUrl('bksc204'),
            progress: 100, attendancePct: 78, notesCount: 1, assignmentsCount: 0, quizzesCount: 1, pyqCount: 1,
            modules: [
              mod(1, 'Kannada Language & Culture', 'Prose, Poetry, Grammar, Conversations in Kannada', ['BKSC204_M1.pdf'], ['VTU_BKSC204_Q1.pdf']),
            ],
          },
          {
            code: 'BECEP205',
            name: 'Elements of Civil Engineering & Mechanics Lab',
            credits: 1, type: 'lab',
            vtuNotesUrl: vtuUrl('becep205'),
            progress: 100, attendancePct: 88, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Lab Experiments', 'Concrete Mix Design, SFD/BMD, Truss Analysis, Survey Experiments', ['BECEP205_Manual.pdf'], ['VTU_BECEP205_Viva.pdf']),
            ],
          },
          {
            code: 'BCHEM206',
            name: 'Engineering Chemistry Lab',
            credits: 1, type: 'lab',
            vtuNotesUrl: vtuUrl('bchem206'),
            progress: 100, attendancePct: 90, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Chemistry Lab Programs', 'Hardness Estimation, pH Measurement, Polymer Synthesis, Corrosion Rate', ['BCHEM206_Manual.pdf'], ['VTU_BCHEM206_Viva.pdf']),
            ],
          },
        ],

        // ───────────────────────────────────────────────────────────────────
        // SEMESTER 3
        // ───────────────────────────────────────────────────────────────────
        '3rd Semester': [
          {
            code: 'BCS301',
            name: 'Mathematics for Computer Science – III (Discrete Mathematics)',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs301'),
            progress: 100, attendancePct: 87, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Set Theory & Logic', 'Propositional & Predicate Logic, Inference Rules, Normal Forms', ['BCS301_M1.pdf'], ['VTU_2024_BCS301_Q1.pdf'], ['Assignment 1: Truth Tables']),
              mod(2, 'Relations & Functions', 'Types of Relations, Equivalence, Partial Order, Hasse Diagrams', ['BCS301_M2.pdf'], ['VTU_2024_BCS301_Q2.pdf']),
              mod(3, 'Graph Theory', 'Graph Representations, Euler Paths, Hamilton Cycles, Trees', ['BCS301_M3.pdf'], ['VTU_2023_BCS301_Q3.pdf']),
              mod(4, 'Algebraic Structures', 'Groups, Subgroups, Cosets, Lagrange\'s Theorem, Rings, Fields', ['BCS301_M4.pdf'], ['VTU_2023_BCS301_Q4.pdf']),
              mod(5, 'Combinatorics', 'Permutations, Combinations, Pigeonhole Principle, Recurrence Relations', ['BCS301_M5.pdf'], ['VTU_2023_BCS301_Q5.pdf']),
            ],
          },
          {
            code: 'BCS302',
            name: 'Data Structures & Applications',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs302'),
            progress: 100, attendancePct: 89, notesCount: 5, assignmentsCount: 3, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Arrays, Stacks & Queues', 'Linear & Circular Queues, Stack Applications, Recursion', ['BCS302_M1.pdf'], ['VTU_2024_BCS302_Q1.pdf'], ['Assignment 1: Stack implementation']),
              mod(2, 'Linked Lists', 'Singly, Doubly, Circular Linked Lists, Polynomial Representation', ['BCS302_M2.pdf'], ['VTU_2024_BCS302_Q2.pdf']),
              mod(3, 'Trees', 'Binary Trees, BST, Tree Traversals, AVL Trees, Heaps', ['BCS302_M3.pdf'], ['VTU_2023_BCS302_Q3.pdf']),
              mod(4, 'Graphs', 'BFS, DFS, Shortest Path (Dijkstra, Bellman-Ford), Spanning Trees', ['BCS302_M4.pdf'], ['VTU_2023_BCS302_Q4.pdf']),
              mod(5, 'Sorting & Searching', 'QuickSort, MergeSort, HeapSort, Binary Search, Hashing', ['BCS302_M5.pdf'], ['VTU_2023_BCS302_Q5.pdf']),
            ],
          },
          {
            code: 'BCS303',
            name: 'Digital Design & Computer Organization',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs303'),
            progress: 100, attendancePct: 85, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Boolean Algebra & Minimization', 'K-Map, Quine-McCluskey, SOP/POS Forms', ['BCS303_M1.pdf'], ['VTU_2024_BCS303_Q1.pdf']),
              mod(2, 'Combinational Circuits', 'Adder, Subtractor, Encoder, Decoder, MUX, DEMUX', ['BCS303_M2.pdf'], ['VTU_2024_BCS303_Q2.pdf']),
              mod(3, 'Sequential Circuits', 'Flip-Flops, Registers, Counters, State Machines', ['BCS303_M3.pdf'], ['VTU_2023_BCS303_Q3.pdf']),
              mod(4, 'Computer Arithmetic', 'Signed Representations, IEEE 754, Overflow Detection', ['BCS303_M4.pdf'], ['VTU_2023_BCS303_Q4.pdf']),
              mod(5, 'Memory & I/O Organization', 'Cache Memory, RAM/ROM Types, Interrupt Handling, DMA', ['BCS303_M5.pdf'], ['VTU_2023_BCS303_Q5.pdf']),
            ],
          },
          {
            code: 'BCS304',
            name: 'Object Oriented Programming with Java',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs304'),
            progress: 100, attendancePct: 91, notesCount: 5, assignmentsCount: 3, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Java Fundamentals', 'JVM Architecture, Data Types, Operators, Control Structures', ['BCS304_M1.pdf'], ['VTU_2024_BCS304_Q1.pdf'], ['Assignment 1: Java control flow programs']),
              mod(2, 'Classes & Objects', 'Constructors, Inheritance, Polymorphism, Method Overriding', ['BCS304_M2.pdf'], ['VTU_2024_BCS304_Q2.pdf']),
              mod(3, 'Interfaces & Packages', 'Abstract Classes, Interfaces, Java Packages, Access Modifiers', ['BCS304_M3.pdf'], ['VTU_2023_BCS304_Q3.pdf']),
              mod(4, 'Exception Handling & I/O Streams', 'try-catch-finally, Custom Exceptions, File I/O, Serialization', ['BCS304_M4.pdf'], ['VTU_2023_BCS304_Q4.pdf']),
              mod(5, 'Collections & Multithreading', 'ArrayList, HashMap, Thread Lifecycle, Synchronization', ['BCS304_M5.pdf'], ['VTU_2023_BCS304_Q5.pdf']),
            ],
          },
          {
            code: 'BCSM305C',
            name: 'Green Technology',
            credits: 2, type: 'theory',
            vtuNotesUrl: vtuUrl('bcsm305c'),
            progress: 100, attendancePct: 80, notesCount: 3, assignmentsCount: 1, quizzesCount: 3, pyqCount: 3,
            modules: [
              mod(1, 'Renewable Energy Systems', 'Solar, Wind, Geothermal, Biomass Energy Technologies', ['BCSM305C_M1.pdf'], ['VTU_2024_BCSM305C_Q1.pdf']),
              mod(2, 'Green Computing', 'Energy-Efficient Hardware, E-Waste Management, Carbon Footprint', ['BCSM305C_M2.pdf'], ['VTU_2023_BCSM305C_Q2.pdf']),
              mod(3, 'Sustainable Development Goals', 'UN SDGs, Climate Change Mitigation, Circular Economy', ['BCSM305C_M3.pdf'], ['VTU_2023_BCSM305C_Q3.pdf']),
            ],
          },
          {
            code: 'BCSL306',
            name: 'Data Structures Lab',
            credits: 2, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl306'),
            progress: 100, attendancePct: 93, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Lab Programs', 'Stack, Queue, Linked List, BST, Graph, Sorting (C / Java)', ['BCSL306_Manual.pdf'], ['VTU_BCSL306_Viva.pdf'], [], 'C'),
            ],
          },
          {
            code: 'BCSL307',
            name: 'OOP with Java Lab',
            credits: 2, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl307'),
            progress: 100, attendancePct: 92, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Java Lab Programs', 'Inheritance, Interfaces, Exception Handling, Collections, Threads, File I/O', ['BCSL307_Manual.pdf'], ['VTU_BCSL307_Viva.pdf'], [], 'Java'),
            ],
          },
        ],

        // ───────────────────────────────────────────────────────────────────
        // SEMESTER 4
        // ───────────────────────────────────────────────────────────────────
        '4th Semester': [
          {
            code: 'BCS401',
            name: 'Analysis & Design of Algorithms',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs401'),
            progress: 100, attendancePct: 88, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Introduction to Algorithm Design', 'Asymptotic Notations, Recurrences, Master Theorem, Sorting Analysis', ['BCS401_M1.pdf'], ['VTU_2024_BCS401_Q1.pdf'], ['Assignment 1: Recurrence solutions']),
              mod(2, 'Divide & Conquer', 'Binary Search, Merge Sort, Quick Sort, Strassen\'s Matrix', ['BCS401_M2.pdf'], ['VTU_2024_BCS401_Q2.pdf']),
              mod(3, 'Greedy Algorithms', 'Fractional Knapsack, Huffman Coding, Prim & Kruskal MST', ['BCS401_M3.pdf'], ['VTU_2023_BCS401_Q3.pdf']),
              mod(4, 'Dynamic Programming', '0/1 Knapsack, LCS, Matrix Chain, Floyd-Warshall', ['BCS401_M4.pdf'], ['VTU_2023_BCS401_Q4.pdf']),
              mod(5, 'Backtracking & Branch & Bound', 'N-Queens, Graph Coloring, Hamiltonian Cycle, 0/1 Knapsack (BB)', ['BCS401_M5.pdf'], ['VTU_2023_BCS401_Q5.pdf']),
            ],
          },
          {
            code: 'BCS402',
            name: 'Microcontrollers & Embedded Systems',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs402'),
            progress: 100, attendancePct: 84, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, '8051 Microcontroller Architecture', 'Internal Architecture, Memory Organization, I/O Ports, SFRs', ['BCS402_M1.pdf'], ['VTU_2024_BCS402_Q1.pdf']),
              mod(2, 'Assembly Language Programming', 'Instruction Set, Addressing Modes, Timing Diagrams, Assembly Programs', ['BCS402_M2.pdf'], ['VTU_2024_BCS402_Q2.pdf']),
              mod(3, 'Interrupts & Serial Communication', 'Interrupt Structure, UART, I2C, SPI Protocols', ['BCS402_M3.pdf'], ['VTU_2023_BCS402_Q3.pdf']),
              mod(4, 'ARM Cortex Architecture', 'ARM Registers, Pipeline, Instruction Set, Thumb Mode', ['BCS402_M4.pdf'], ['VTU_2023_BCS402_Q4.pdf']),
              mod(5, 'Embedded C & RTOS Basics', 'Embedded C Programming, RTOS Concepts, Scheduling, Semaphores', ['BCS402_M5.pdf'], ['VTU_2023_BCS402_Q5.pdf']),
            ],
          },
          {
            code: 'BCS403',
            name: 'Operating Systems',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs403'),
            progress: 100, attendancePct: 87, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Process Management', 'Process Lifecycle, PCB, Scheduling Algorithms (FCFS, SJF, RR, Priority)', ['BCS403_M1.pdf'], ['VTU_2024_BCS403_Q1.pdf'], ['Assignment 1: Scheduling simulations']),
              mod(2, 'Process Synchronization', 'Critical Section, Semaphores, Mutex, Monitors, Classic Problems', ['BCS403_M2.pdf'], ['VTU_2024_BCS403_Q2.pdf']),
              mod(3, 'Deadlock', 'Conditions, Prevention, Avoidance (Banker\'s), Detection & Recovery', ['BCS403_M3.pdf'], ['VTU_2023_BCS403_Q3.pdf']),
              mod(4, 'Memory Management', 'Paging, Segmentation, Virtual Memory, TLB, Page Replacement', ['BCS403_M4.pdf'], ['VTU_2023_BCS403_Q4.pdf']),
              mod(5, 'File Systems & I/O', 'File Allocation Methods, Directory Structures, Disk Scheduling', ['BCS403_M5.pdf'], ['VTU_2023_BCS403_Q5.pdf']),
            ],
          },
          {
            code: 'BCS404',
            name: 'Software Engineering',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs404'),
            progress: 100, attendancePct: 86, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Software Process Models', 'Waterfall, Agile, Scrum, Spiral, Incremental Models', ['BCS404_M1.pdf'], ['VTU_2024_BCS404_Q1.pdf']),
              mod(2, 'Requirements Engineering', 'SRS Document, Functional & Non-Functional Requirements, Use Case Diagrams', ['BCS404_M2.pdf'], ['VTU_2024_BCS404_Q2.pdf']),
              mod(3, 'Software Design', 'Coupling, Cohesion, Architectural Styles, Design Patterns', ['BCS404_M3.pdf'], ['VTU_2023_BCS404_Q3.pdf']),
              mod(4, 'Software Testing', 'Unit Testing, Integration Testing, Black Box, White Box, Coverage Metrics', ['BCS404_M4.pdf'], ['VTU_2023_BCS404_Q4.pdf']),
              mod(5, 'Project Management & Quality', 'Cost Estimation (COCOMO), Scheduling, Risk Management, SQA, CMM', ['BCS404_M5.pdf'], ['VTU_2023_BCS404_Q5.pdf']),
            ],
          },
          {
            code: 'BCSM405A',
            name: 'Biology for Engineers',
            credits: 2, type: 'theory',
            vtuNotesUrl: vtuUrl('bcsm405a'),
            progress: 100, attendancePct: 79, notesCount: 3, assignmentsCount: 1, quizzesCount: 3, pyqCount: 3,
            modules: [
              mod(1, 'Cell Biology & Genetics', 'Cell Structure, DNA Replication, Protein Synthesis, Mendelian Genetics', ['BCSM405A_M1.pdf'], ['VTU_2024_BCSM405A_Q1.pdf']),
              mod(2, 'Biotechnology Applications', 'PCR, CRISPR, Gene Cloning, Bioinformatics, Bioimaging', ['BCSM405A_M2.pdf'], ['VTU_2023_BCSM405A_Q2.pdf']),
              mod(3, 'Neuroscience & AI Interfaces', 'Neuron Models, BCI, Machine Learning in Biology', ['BCSM405A_M3.pdf'], ['VTU_2023_BCSM405A_Q3.pdf']),
            ],
          },
          {
            code: 'BCSL406',
            name: 'ADA Lab',
            credits: 2, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl406'),
            progress: 100, attendancePct: 92, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Algorithm Lab Programs', 'Sorting, Greedy, DP, Backtracking, Graph Algorithms (C / Python)', ['BCSL406_Manual.pdf'], ['VTU_BCSL406_Viva.pdf'], [], 'C'),
            ],
          },
          {
            code: 'BCSL407',
            name: 'Microcontrollers Lab',
            credits: 1, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl407'),
            progress: 100, attendancePct: 89, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Embedded Lab Programs', '8051 Assembly, Timer, Interrupt, UART, ARM Cortex programs', ['BCSL407_Manual.pdf'], ['VTU_BCSL407_Viva.pdf'], [], 'C'),
            ],
          },
        ],

        // ───────────────────────────────────────────────────────────────────
        // SEMESTER 5
        // ───────────────────────────────────────────────────────────────────
        '5th Semester': [
          {
            code: 'BCS501',
            name: 'Database Management Systems',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs501'),
            progress: 100, attendancePct: 88, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Database Architecture & ER Model', 'DBMS Architecture, ER Diagrams, Relational Algebra, Codd\'s Rules', ['BCS501_M1.pdf'], ['VTU_2024_BCS501_Q1.pdf'], ['Assignment 1: ER Diagram design']),
              mod(2, 'Relational Model & SQL', 'Normalization (1NF-BCNF), SQL DDL/DML/DCL, Joins, Subqueries', ['BCS501_M2.pdf'], ['VTU_2024_BCS501_Q2.pdf']),
              mod(3, 'Indexing & B+ Trees', 'Dense/Sparse Indexes, B-Tree, B+ Tree, Hash Indexing', ['BCS501_M3.pdf'], ['VTU_2023_BCS501_Q3.pdf']),
              mod(4, 'Transaction Management', 'ACID Properties, Concurrency Control (2PL, Timestamp), Recovery', ['BCS501_M4.pdf'], ['VTU_2023_BCS501_Q4.pdf']),
              mod(5, 'Query Processing & Optimization', 'Query Execution Plan, Cost Estimation, Heuristic Optimization', ['BCS501_M5.pdf'], ['VTU_2023_BCS501_Q5.pdf']),
            ],
          },
          {
            code: 'BCS502',
            name: 'Computer Networks',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs502'),
            progress: 100, attendancePct: 86, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Network Models & Physical Layer', 'OSI & TCP/IP Models, Transmission Media, Multiplexing, Encoding', ['BCS502_M1.pdf'], ['VTU_2024_BCS502_Q1.pdf']),
              mod(2, 'Data Link Layer', 'Framing, Error Detection (CRC, Checksum), Flow Control (Sliding Window)', ['BCS502_M2.pdf'], ['VTU_2024_BCS502_Q2.pdf']),
              mod(3, 'Network Layer', 'IPv4/IPv6, Subnetting, CIDR, Routing (RIP, OSPF, BGP)', ['BCS502_M3.pdf'], ['VTU_2023_BCS502_Q3.pdf']),
              mod(4, 'Transport Layer', 'TCP vs UDP, Connection Establishment, Congestion Control', ['BCS502_M4.pdf'], ['VTU_2023_BCS502_Q4.pdf']),
              mod(5, 'Application Layer & Security', 'DNS, HTTP, SMTP, FTP, SSL/TLS, Firewalls', ['BCS502_M5.pdf'], ['VTU_2023_BCS502_Q5.pdf']),
            ],
          },
          {
            code: 'BCS503',
            name: 'Theory of Computation',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs503'),
            progress: 100, attendancePct: 84, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'Finite Automata', 'DFA, NFA, ε-NFA, Regular Expressions, Equivalence', ['BCS503_M1.pdf'], ['VTU_2024_BCS503_Q1.pdf']),
              mod(2, 'Regular Languages & Grammars', 'Pumping Lemma for Regular Languages, Myhill-Nerode, CFG', ['BCS503_M2.pdf'], ['VTU_2024_BCS503_Q2.pdf']),
              mod(3, 'Pushdown Automata & CFL', 'PDA Definition, Acceptance, CFL Pumping Lemma', ['BCS503_M3.pdf'], ['VTU_2023_BCS503_Q3.pdf']),
              mod(4, 'Turing Machines', 'Standard TM, Variations, Church-Turing Thesis, Decidability', ['BCS503_M4.pdf'], ['VTU_2023_BCS503_Q4.pdf']),
              mod(5, 'Complexity Theory', 'P, NP, NP-Complete, NP-Hard, Reductions, Cook\'s Theorem', ['BCS503_M5.pdf'], ['VTU_2023_BCS503_Q5.pdf']),
            ],
          },
          {
            code: 'BCS504',
            name: 'Artificial Intelligence & Machine Learning',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs504'),
            progress: 100, attendancePct: 90, notesCount: 5, assignmentsCount: 3, quizzesCount: 5, pyqCount: 5,
            modules: [
              mod(1, 'AI Fundamentals & Search', 'Problem Formulation, BFS, DFS, A*, Heuristics, Hill Climbing', ['BCS504_M1.pdf'], ['VTU_2024_BCS504_Q1.pdf'], ['Assignment 1: Implement A* Search']),
              mod(2, 'Knowledge Representation', 'Propositional Logic, First-Order Logic, Inference, Resolution', ['BCS504_M2.pdf'], ['VTU_2024_BCS504_Q2.pdf']),
              mod(3, 'Machine Learning Basics', 'Supervised, Unsupervised, Reinforcement Learning, Bias-Variance', ['BCS504_M3.pdf'], ['VTU_2023_BCS504_Q3.pdf']),
              mod(4, 'Classification Algorithms', 'Decision Trees, SVM, Naive Bayes, KNN, Logistic Regression', ['BCS504_M4.pdf'], ['VTU_2023_BCS504_Q4.pdf']),
              mod(5, 'Neural Networks & Deep Learning', 'Perceptron, Backpropagation, CNN, RNN, Transfer Learning', ['BCS504_M5.pdf'], ['VTU_2023_BCS504_Q5.pdf']),
            ],
          },
          {
            code: 'BCSM505A',
            name: 'Cloud Computing',
            credits: 2, type: 'theory',
            vtuNotesUrl: vtuUrl('bcsm505a'),
            progress: 100, attendancePct: 88, notesCount: 4, assignmentsCount: 2, quizzesCount: 4, pyqCount: 4,
            modules: [
              mod(1, 'Cloud Fundamentals', 'Service Models (IaaS, PaaS, SaaS), Deployment Models, Virtualization', ['BCSM505A_M1.pdf'], ['VTU_2024_BCSM505A_Q1.pdf']),
              mod(2, 'AWS Core Services', 'EC2, S3, VPC, IAM, Lambda, CloudFormation', ['BCSM505A_M2.pdf'], ['VTU_2023_BCSM505A_Q2.pdf']),
              mod(3, 'Cloud Security & DevOps', 'Shared Responsibility Model, IAM Policies, CI/CD, Docker, Kubernetes', ['BCSM505A_M3.pdf'], ['VTU_2023_BCSM505A_Q3.pdf']),
            ],
          },
          {
            code: 'BCSL506',
            name: 'DBMS Lab',
            credits: 2, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl506'),
            progress: 100, attendancePct: 93, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'SQL & PL/SQL Lab', 'DDL, DML, Joins, Triggers, Procedures, Cursors, MongoDB basics', ['BCSL506_Manual.pdf'], ['VTU_BCSL506_Viva.pdf'], [], 'SQL'),
            ],
          },
          {
            code: 'BCSL507',
            name: 'Networks Lab',
            credits: 1, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl507'),
            progress: 100, attendancePct: 91, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Networks Lab Programs', 'Socket Programming, Packet Analysis (Wireshark), Routing Simulation (NS2/GNS3)', ['BCSL507_Manual.pdf'], ['VTU_BCSL507_Viva.pdf'], [], 'C/Python'),
            ],
          },
        ],

        // ───────────────────────────────────────────────────────────────────
        // SEMESTER 6
        // ───────────────────────────────────────────────────────────────────
        '6th Semester': [
          {
            code: 'BCS601',
            name: 'Information Security',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs601'),
            progress: 85, attendancePct: 88, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 4,
            modules: [
              mod(1, 'Cryptography Fundamentals', 'Symmetric (DES, AES, 3DES) & Asymmetric (RSA, ECC) Encryption', ['BCS601_M1.pdf'], ['VTU_2024_BCS601_Q1.pdf'], ['Assignment 1: RSA key generation']),
              mod(2, 'Public Key Infrastructure', 'Digital Signatures, Certificates, CA Hierarchy, PKI Standards (X.509)', ['BCS601_M2.pdf'], ['VTU_2024_BCS601_Q2.pdf']),
              mod(3, 'Network Security Protocols', 'SSL/TLS, IPSec, SSH, Kerberos, HTTPS Architecture', ['BCS601_M3.pdf'], ['VTU_2023_BCS601_Q3.pdf']),
              mod(4, 'Firewall & Intrusion Detection', 'Packet Filtering, Stateful Inspection, IDS/IPS, Honeypots', ['BCS601_M4.pdf'], ['VTU_2023_BCS601_Q4.pdf']),
              mod(5, 'Web & Application Security', 'OWASP Top 10, SQL Injection, XSS, CSRF, Ethical Hacking Basics', ['BCS601_M5.pdf'], ['VTU_2023_BCS601_Q5.pdf']),
            ],
          },
          {
            code: 'BCS602',
            name: 'Compiler Design',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs602'),
            progress: 80, attendancePct: 85, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 4,
            modules: [
              mod(1, 'Lexical Analysis', 'Tokens, Lexer (DFA-based), LEX Tool, Regular Expressions for Tokens', ['BCS602_M1.pdf'], ['VTU_2024_BCS602_Q1.pdf']),
              mod(2, 'Syntax Analysis', 'CFG, Parse Trees, Ambiguity, LL(1) & LR Parsing, YACC Tool', ['BCS602_M2.pdf'], ['VTU_2024_BCS602_Q2.pdf']),
              mod(3, 'Semantic Analysis', 'Type Checking, Attribute Grammars, Symbol Table Management', ['BCS602_M3.pdf'], ['VTU_2023_BCS602_Q3.pdf']),
              mod(4, 'Intermediate Code Generation', 'Three-Address Code, Quadruples, Triples, DAG', ['BCS602_M4.pdf'], ['VTU_2023_BCS602_Q4.pdf']),
              mod(5, 'Code Optimization & Generation', 'Peephole Optimization, Register Allocation, Instruction Selection', ['BCS602_M5.pdf'], ['VTU_2023_BCS602_Q5.pdf']),
            ],
          },
          {
            code: 'BCS603',
            name: 'Computer Graphics & Visualization',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs603'),
            progress: 78, attendancePct: 86, notesCount: 5, assignmentsCount: 2, quizzesCount: 5, pyqCount: 4,
            modules: [
              mod(1, 'Raster Scan & Output Primitives', 'Bresenham\'s Line & Circle, Scan Conversion, Fill Algorithms', ['BCS603_M1.pdf'], ['VTU_2024_BCS603_Q1.pdf']),
              mod(2, 'Geometric Transformations 2D/3D', 'Translation, Rotation, Scaling, Shearing, Homogeneous Coordinates', ['BCS603_M2.pdf'], ['VTU_2024_BCS603_Q2.pdf']),
              mod(3, 'Viewing & Clipping', 'Window-Viewport, Cohen-Sutherland, Sutherland-Hodgman, 3D Viewing', ['BCS603_M3.pdf'], ['VTU_2023_BCS603_Q3.pdf']),
              mod(4, 'Curves & Surfaces', 'Bezier Curves, B-Splines, NURBS, Fractal Geometry', ['BCS603_M4.pdf'], ['VTU_2023_BCS603_Q4.pdf']),
              mod(5, 'Illumination & Rendering', 'Shading Models (Phong, Gouraud), Ray Tracing, Texture Mapping', ['BCS603_M5.pdf'], ['VTU_2023_BCS603_Q5.pdf']),
            ],
          },
          {
            code: 'BCS604',
            name: 'Data Science & Analytics',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs604'),
            progress: 82, attendancePct: 89, notesCount: 5, assignmentsCount: 3, quizzesCount: 5, pyqCount: 4,
            modules: [
              mod(1, 'Python for Data Science', 'NumPy, Pandas, Matplotlib, Seaborn, Data Wrangling', ['BCS604_M1.pdf'], ['VTU_2024_BCS604_Q1.pdf'], ['Assignment 1: EDA with Pandas']),
              mod(2, 'Statistical Foundations', 'Descriptive Statistics, Probability Distributions, Hypothesis Testing', ['BCS604_M2.pdf'], ['VTU_2024_BCS604_Q2.pdf']),
              mod(3, 'Supervised & Unsupervised Learning', 'Linear/Logistic Regression, K-Means, PCA, Evaluation Metrics', ['BCS604_M3.pdf'], ['VTU_2023_BCS604_Q3.pdf']),
              mod(4, 'Time Series & NLP Basics', 'ARIMA Models, Text Preprocessing, TF-IDF, Sentiment Analysis', ['BCS604_M4.pdf'], ['VTU_2023_BCS604_Q4.pdf']),
              mod(5, 'Big Data Analytics', 'Hadoop, Spark, Data Pipelines, Dashboard Visualization (Tableau/Power BI)', ['BCS604_M5.pdf'], ['VTU_2023_BCS604_Q5.pdf']),
            ],
          },
          {
            code: 'BCSM605C',
            name: 'IoT & Wireless Sensor Networks',
            credits: 2, type: 'theory',
            vtuNotesUrl: vtuUrl('bcsm605c'),
            progress: 75, attendancePct: 83, notesCount: 3, assignmentsCount: 1, quizzesCount: 3, pyqCount: 3,
            modules: [
              mod(1, 'IoT Architecture & Protocols', 'IoT Layers, MQTT, CoAP, Zigbee, LoRa, Edge Computing', ['BCSM605C_M1.pdf'], ['VTU_2024_BCSM605C_Q1.pdf']),
              mod(2, 'Arduino & Raspberry Pi Programming', 'GPIO, Sensors, Actuators, WiFi Modules, Real-Time Monitoring', ['BCSM605C_M2.pdf'], ['VTU_2023_BCSM605C_Q2.pdf']),
              mod(3, 'WSN & Industrial IoT', 'MAC Protocols, Routing in WSNs, Industry 4.0, Predictive Maintenance', ['BCSM605C_M3.pdf'], ['VTU_2023_BCSM605C_Q3.pdf']),
            ],
          },
          {
            code: 'BCSL606',
            name: 'Compiler Design Lab',
            credits: 2, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl606'),
            progress: 80, attendancePct: 91, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Compiler Lab Programs', 'Lexer (LEX), Parser (YACC), Symbol Table, Three-Address Code Generation', ['BCSL606_Manual.pdf'], ['VTU_BCSL606_Viva.pdf'], [], 'C/LEX/YACC'),
            ],
          },
          {
            code: 'BCSL607',
            name: 'Data Science Lab',
            credits: 2, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl607'),
            progress: 82, attendancePct: 93, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Python DS Lab', 'Pandas EDA, Scikit-Learn ML Models, Matplotlib Visualizations, NLP with NLTK', ['BCSL607_Manual.pdf'], ['VTU_BCSL607_Viva.pdf'], [], 'Python'),
            ],
          },
        ],

        // ───────────────────────────────────────────────────────────────────
        // SEMESTER 7
        // ───────────────────────────────────────────────────────────────────
        '7th Semester': [
          {
            code: 'BCS701',
            name: 'Big Data Analytics & Spark Framework',
            credits: 4, type: 'theory',
            faculty: 'Prof. Ramesh Kumar',
            vtuNotesUrl: vtuUrl('bcs701'),
            progress: 62, attendancePct: 89, notesCount: 4, assignmentsCount: 2, quizzesCount: 4, pyqCount: 3,
            modules: [
              mod(1, 'Hadoop & MapReduce Paradigm', 'HDFS Architecture, YARN Resource Manager, Map & Reduce Functions, NameNode & DataNode', ['BCS701_M1.pdf'], ['VTU_Jan2024_BCS701_Q1.pdf'], ['Assignment 1: MapReduce WordCount']),
              mod(2, 'Apache Spark & RDD Programming', 'Spark Core, Resilient Distributed Datasets, Transformations & Actions, DAG Scheduler', ['BCS701_M2.pdf'], ['VTU_Jan2024_BCS701_Q2.pdf'], ['Assignment 2: Spark RDD Join Operations']),
              mod(3, 'Spark SQL & DataFrames', 'Schema RDDs, DataFrames API, Catalyst Optimizer, Parquet Storage Format', ['BCS701_M3.pdf'], ['VTU_Jul2023_BCS701_Q3.pdf']),
              mod(4, 'NoSQL Databases', 'Cassandra Architecture, LSM Trees, CAP Theorem, MongoDB CRUD, Sharding & Replication', ['BCS701_M4.pdf'], ['VTU_Jul2023_BCS701_Q4.pdf']),
              mod(5, 'Streaming Data & Kafka', 'Producer-Consumer Pipelines, Structured Streaming, Micro-batching, Flink Basics', ['BCS701_M5.pdf'], ['VTU_Feb2023_BCS701_Q5.pdf']),
            ],
          },
          {
            code: 'BCS702',
            name: 'Cloud Computing & Infrastructure',
            credits: 3, type: 'theory',
            faculty: 'Prof. Werner Vogels',
            vtuNotesUrl: vtuUrl('bcs702'),
            progress: 75, attendancePct: 91.5, notesCount: 5, assignmentsCount: 1, quizzesCount: 5, pyqCount: 4,
            modules: [
              mod(1, 'Cloud Models & Virtualization', 'IaaS, PaaS, SaaS, Hypervisors (KVM, ESXi), Docker Containerization', ['BCS702_M1.pdf'], ['VTU_Jan2024_BCS702_Q1.pdf'], ['Assignment 1: Docker Container Deployment']),
              mod(2, 'AWS Core Infrastructure', 'EC2, VPC, Subnets, Security Groups, IAM, S3, CloudWatch', ['BCS702_M2.pdf'], ['VTU_Jan2024_BCS702_Q2.pdf']),
              mod(3, 'Cloud Storage & Databases', 'RDS, DynamoDB, Elasticache, Storage Classes (S3 Glacier), CDN', ['BCS702_M3.pdf'], ['VTU_Jul2023_BCS702_Q3.pdf']),
              mod(4, 'Serverless & Microservices', 'AWS Lambda, API Gateway, ECS/EKS, Service Mesh (Istio)', ['BCS702_M4.pdf'], ['VTU_Jul2023_BCS702_Q4.pdf']),
              mod(5, 'DevOps & Cloud Security', 'CI/CD Pipelines, Terraform IaC, Shared Responsibility Model, Compliance', ['BCS702_M5.pdf'], ['VTU_Feb2023_BCS702_Q5.pdf']),
            ],
          },
          {
            code: 'BCS703',
            name: 'Information & Cyber Security',
            credits: 3, type: 'theory',
            faculty: 'Prof. Adi Shamir',
            vtuNotesUrl: vtuUrl('bcs703'),
            progress: 58, attendancePct: 87, notesCount: 4, assignmentsCount: 2, quizzesCount: 4, pyqCount: 3,
            modules: [
              mod(1, 'Cyber Threats & Attack Vectors', 'OWASP Top 10, Social Engineering, Phishing, APTs, Zero-Day Exploits', ['BCS703_M1.pdf'], ['VTU_Jan2024_BCS703_Q1.pdf'], ['Assignment 1: Threat Modeling']),
              mod(2, 'Advanced Cryptography', 'Elliptic Curve Cryptography, Post-Quantum Cryptography, Homomorphic Encryption', ['BCS703_M2.pdf'], ['VTU_Jan2024_BCS703_Q2.pdf']),
              mod(3, 'Blockchain Technology', 'Distributed Ledger, Consensus (PoW, PoS), Smart Contracts, DApps', ['BCS703_M3.pdf'], ['VTU_Jul2023_BCS703_Q3.pdf']),
              mod(4, 'Digital Forensics', 'Chain of Custody, Memory Forensics, Network Forensics, Evidence Collection', ['BCS703_M4.pdf'], ['VTU_Jul2023_BCS703_Q4.pdf']),
              mod(5, 'Legal & Ethical Aspects', 'IT Act 2000, GDPR, Cyber Crime Categories, Ethical Hacking Certification', ['BCS703_M5.pdf'], ['VTU_Feb2023_BCS703_Q5.pdf']),
            ],
          },
          {
            code: 'BCSM704A',
            name: 'Machine Learning & Applications',
            credits: 3, type: 'theory',
            faculty: 'Prof. Andrew Ng',
            vtuNotesUrl: vtuUrl('bcsm704a'),
            progress: 70, attendancePct: 93, notesCount: 5, assignmentsCount: 3, quizzesCount: 5, pyqCount: 3,
            modules: [
              mod(1, 'Supervised Learning Deep Dive', 'Regression, Classification, Ensemble Methods, Gradient Boosting (XGBoost)', ['BCSM704A_M1.pdf'], ['VTU_Jan2024_BCSM704A_Q1.pdf'], ['Assignment 1: Kaggle Competition']),
              mod(2, 'Unsupervised & Semi-supervised Learning', 'DBSCAN, Hierarchical Clustering, Self-Supervised, Contrastive Learning', ['BCSM704A_M2.pdf'], ['VTU_Jan2024_BCSM704A_Q2.pdf']),
              mod(3, 'Deep Neural Networks', 'CNN Architectures (ResNet, VGG), RNN/LSTM, Attention Mechanisms, Transformers', ['BCSM704A_M3.pdf'], ['VTU_Jul2023_BCSM704A_Q3.pdf']),
              mod(4, 'Generative AI', 'GANs, VAEs, Diffusion Models, Large Language Models, Prompt Engineering', ['BCSM704A_M4.pdf'], ['VTU_Jul2023_BCSM704A_Q4.pdf']),
              mod(5, 'MLOps & Model Deployment', 'MLflow, Model Versioning, FastAPI, Docker, Real-World Case Studies', ['BCSM704A_M5.pdf'], ['VTU_Feb2023_BCSM704A_Q5.pdf']),
            ],
          },
          {
            code: 'BCSM705B',
            name: 'Natural Language Processing',
            credits: 3, type: 'theory',
            faculty: 'Prof. Chris Manning',
            vtuNotesUrl: vtuUrl('bcsm705b'),
            progress: 50, attendancePct: 86, notesCount: 3, assignmentsCount: 1, quizzesCount: 3, pyqCount: 2,
            modules: [
              mod(1, 'Text Preprocessing & Representation', 'Tokenization, Stemming, Lemmatization, Bag of Words, TF-IDF, Word2Vec', ['BCSM705B_M1.pdf'], ['VTU_Jan2024_BCSM705B_Q1.pdf'], ['Assignment 1: Text classification']),
              mod(2, 'Syntactic & Semantic Analysis', 'POS Tagging, Named Entity Recognition, Dependency Parsing, Coreference', ['BCSM705B_M2.pdf'], ['VTU_Jan2024_BCSM705B_Q2.pdf']),
              mod(3, 'Deep NLP & Transformers', 'BERT, GPT Architecture, Fine-tuning LLMs, Sentiment Analysis, QA Systems', ['BCSM705B_M3.pdf'], ['VTU_Jul2023_BCSM705B_Q3.pdf']),
              mod(4, 'Machine Translation & Speech', 'Seq2Seq, Attention, Neural MT, ASR Fundamentals, TTS Systems', ['BCSM705B_M4.pdf'], ['VTU_Jul2023_BCSM705B_Q4.pdf']),
              mod(5, 'NLP Applications & Ethics', 'Chatbots, Information Retrieval, Bias in NLP, Responsible AI', ['BCSM705B_M5.pdf'], ['VTU_Feb2023_BCSM705B_Q5.pdf']),
            ],
          },
          {
            code: 'BCSL706',
            name: 'Big Data Analytics Lab',
            credits: 2, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl706'),
            progress: 68, attendancePct: 92, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Spark & Hadoop Lab Programs', 'HDFS File Operations, MapReduce programs, Spark RDD, Spark SQL, Kafka producer-consumer', ['BCSL706_Manual.pdf'], ['VTU_BCSL706_Viva.pdf'], [], 'Python/Scala'),
            ],
          },
          {
            code: 'BCSL707',
            name: 'Machine Learning Lab',
            credits: 2, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl707'),
            progress: 72, attendancePct: 94, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'ML Lab Programs', 'Linear Regression, Logistic Regression, K-Means, Decision Tree, SVM, CNN (Keras), NLP', ['BCSL707_Manual.pdf'], ['VTU_BCSL707_Viva.pdf'], [], 'Python'),
            ],
          },
        ],

        // ───────────────────────────────────────────────────────────────────
        // SEMESTER 8
        // ───────────────────────────────────────────────────────────────────
        '8th Semester': [
          {
            code: 'BCS801',
            name: 'Internet of Things & Embedded AI',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs801'),
            progress: 0, attendancePct: 0, notesCount: 3, assignmentsCount: 0, quizzesCount: 3, pyqCount: 2,
            modules: [
              mod(1, 'Edge AI & TinyML', 'TensorFlow Lite, Model Compression, Pruning, Quantization, Edge Devices', ['BCS801_M1.pdf'], ['VTU_2024_BCS801_Q1.pdf']),
              mod(2, 'Smart IoT Applications', 'Smart City, Healthcare IoT, Industrial IoT, Digital Twins', ['BCS801_M2.pdf'], ['VTU_2024_BCS801_Q2.pdf']),
              mod(3, 'IoT Security & Privacy', 'Device Authentication, Secure Boot, Privacy Frameworks, Regulatory Compliance', ['BCS801_M3.pdf'], ['VTU_2023_BCS801_Q3.pdf']),
              mod(4, 'Cloud & Fog Computing Integration', 'AWS Greengrass, Azure IoT Hub, Fog Node Architecture', ['BCS801_M4.pdf'], ['VTU_2023_BCS801_Q4.pdf']),
              mod(5, 'Emerging Trends', '5G-IoT Integration, Quantum IoT, Autonomous Systems, Metaverse Infrastructure', ['BCS801_M5.pdf'], ['VTU_2023_BCS801_Q5.pdf']),
            ],
          },
          {
            code: 'BCS802',
            name: 'Deep Learning & Computer Vision',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcs802'),
            progress: 0, attendancePct: 0, notesCount: 3, assignmentsCount: 0, quizzesCount: 3, pyqCount: 2,
            modules: [
              mod(1, 'Advanced CNN Architectures', 'ResNet, DenseNet, EfficientNet, ViT, Object Detection (YOLO, R-CNN)', ['BCS802_M1.pdf'], ['VTU_2024_BCS802_Q1.pdf']),
              mod(2, 'Image Segmentation & 3D Vision', 'Semantic Segmentation (U-Net), Instance Segmentation, Point Clouds, NeRF', ['BCS802_M2.pdf'], ['VTU_2024_BCS802_Q2.pdf']),
              mod(3, 'Generative Models', 'GANs (StyleGAN, CycleGAN), Diffusion Models, DALL-E Architecture', ['BCS802_M3.pdf'], ['VTU_2023_BCS802_Q3.pdf']),
              mod(4, 'Video Understanding', 'Optical Flow, Action Recognition, Temporal Models, 3D CNNs', ['BCS802_M4.pdf'], ['VTU_2023_BCS802_Q4.pdf']),
              mod(5, 'CV Applications & Ethics', 'Face Recognition, Medical Imaging AI, Autonomous Vehicles, Deepfake Detection', ['BCS802_M5.pdf'], ['VTU_2023_BCS802_Q5.pdf']),
            ],
          },
          {
            code: 'BCSM803A',
            name: 'Blockchain & Distributed Systems',
            credits: 3, type: 'theory',
            vtuNotesUrl: vtuUrl('bcsm803a'),
            progress: 0, attendancePct: 0, notesCount: 3, assignmentsCount: 0, quizzesCount: 3, pyqCount: 2,
            modules: [
              mod(1, 'Distributed Systems Fundamentals', 'CAP Theorem, Consistency Models, Paxos, Raft Consensus', ['BCSM803A_M1.pdf'], ['VTU_2024_BCSM803A_Q1.pdf']),
              mod(2, 'Blockchain Architecture', 'Bitcoin, Ethereum, Smart Contracts, EVM, Gas Fees', ['BCSM803A_M2.pdf'], ['VTU_2024_BCSM803A_Q2.pdf']),
              mod(3, 'DeFi & Web3 Applications', 'DApps, NFTs, DeFi Protocols, IPFS, Layer-2 Scaling', ['BCSM803A_M3.pdf'], ['VTU_2023_BCSM803A_Q3.pdf']),
              mod(4, 'Enterprise Blockchain', 'Hyperledger Fabric, Permissioned Chains, Supply Chain, Healthcare Use Cases', ['BCSM803A_M4.pdf'], ['VTU_2023_BCSM803A_Q4.pdf']),
              mod(5, 'Future of Blockchain', 'Cross-Chain Interoperability, Quantum-Resistant Blockchains, Regulatory Landscape', ['BCSM803A_M5.pdf'], ['VTU_2023_BCSM803A_Q5.pdf']),
            ],
          },
          {
            code: 'BCSM804B',
            name: 'Digital Entrepreneurship & Management',
            credits: 2, type: 'theory',
            vtuNotesUrl: vtuUrl('bcsm804b'),
            progress: 0, attendancePct: 0, notesCount: 2, assignmentsCount: 1, quizzesCount: 2, pyqCount: 2,
            modules: [
              mod(1, 'Startup Ecosystem & Business Models', 'Lean Startup, MVP, Business Model Canvas, Venture Capital, Incubators', ['BCSM804B_M1.pdf'], ['VTU_2024_BCSM804B_Q1.pdf']),
              mod(2, 'Digital Marketing & IPR', 'SEO, Social Media Marketing, IP Protection, Patents, Trademarks', ['BCSM804B_M2.pdf'], ['VTU_2023_BCSM804B_Q2.pdf']),
              mod(3, 'Engineering Ethics & Professional Practice', 'IEEE Code of Ethics, Professional Responsibility, Leadership, CSR', ['BCSM804B_M3.pdf'], ['VTU_2023_BCSM804B_Q3.pdf']),
            ],
          },
          {
            code: 'BCSP805',
            name: 'Major Project / Internship',
            credits: 10, type: 'project',
            vtuNotesUrl: vtuUrl('bcsp805'),
            progress: 0, attendancePct: 0, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 0,
            modules: [
              mod(1, 'Project Work', 'Industry Project / Research Project / Internship (6 months). Includes Phase I Review, Phase II Review, and Final Viva.', ['BCSP805_Guidelines.pdf'], [], ['Phase 1 Report', 'Phase 2 Report', 'Final Project Report']),
            ],
          },
          {
            code: 'BCSL806',
            name: 'Deep Learning Lab',
            credits: 2, type: 'lab',
            vtuNotesUrl: vtuUrl('bcsl806'),
            progress: 0, attendancePct: 0, notesCount: 1, assignmentsCount: 0, quizzesCount: 0, pyqCount: 1,
            modules: [
              mod(1, 'Deep Learning Lab Programs', 'CNN Image Classifiers, RNN Sentiment Analysis, GAN Image Generation, BERT Text Classification, YOLO Object Detection', ['BCSL806_Manual.pdf'], ['VTU_BCSL806_Viva.pdf'], [], 'Python/PyTorch/TensorFlow'),
            ],
          },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════
      // BRANCH: Computer Science & Engineering (CSE)
      // Only Sem 7 stub — extendable
      // ═══════════════════════════════════════════════════════════════════════
      'Computer Science & Engineering (CSE)': {
        '7th Semester': [
          { code: 'BCSM701A', name: 'Artificial Intelligence', credits: 3, type: 'theory', vtuNotesUrl: vtuUrl('bcsm701a'), progress: 0, attendancePct: 0, notesCount: 4, assignmentsCount: 2, quizzesCount: 4, pyqCount: 3, modules: [mod(1, 'Search Algorithms', 'BFS, DFS, A*, Hill Climbing, Simulated Annealing', ['BCSM701A_M1.pdf'], ['VTU_BCS701_Q1.pdf'])] },
          { code: 'BCSM702B', name: 'Computer Vision', credits: 3, type: 'theory', vtuNotesUrl: vtuUrl('bcsm702b'), progress: 0, attendancePct: 0, notesCount: 4, assignmentsCount: 2, quizzesCount: 4, pyqCount: 3, modules: [mod(1, 'Image Processing Fundamentals', 'Spatial Filtering, Edge Detection, Histogram Equalization', ['BCSM702B_M1.pdf'], ['VTU_BCSM702B_Q1.pdf'])] },
        ],
      },

      // ═══════════════════════════════════════════════════════════════════════
      // BRANCH: Electronics & Communication Engineering (ECE)
      // Only Sem 7 stub — extendable
      // ═══════════════════════════════════════════════════════════════════════
      'Electronics & Communication Engineering (ECE)': {
        '7th Semester': [
          { code: 'BEC701', name: 'Digital Signal Processing', credits: 3, type: 'theory', vtuNotesUrl: vtuUrl('bec701'), progress: 0, attendancePct: 0, notesCount: 4, assignmentsCount: 2, quizzesCount: 4, pyqCount: 3, modules: [mod(1, 'DFT & FFT', 'Discrete Fourier Transform, Fast Fourier Transform Algorithm', ['BEC701_M1.pdf'], ['VTU_BEC701_Q1.pdf'])] },
        ],
      },
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// FETCH ENGINE — Strict Hierarchical Lookup
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Resolves subjects for a given academic profile from the database.
 * Returns [] if any level is not found — never mixes semester data.
 */
export const fetchVTUSubjects = (
  university: string,
  scheme: string,
  branch: string,
  semester: string
): VTUSubject[] => {
  try {
    const db = VTU_ACADEMIC_DATABASE;

    // Fuzzy-match university key
    const uniKey = Object.keys(db).find(
      (k) => k.toLowerCase().includes(university.toLowerCase().split(' ')[0].toLowerCase()) ||
             k.toLowerCase().includes('vtu')
    );
    if (!uniKey) return [];

    // Fuzzy-match scheme key
    const schemeKey = Object.keys(db[uniKey]).find(
      (k) => k.toLowerCase().includes('2022') || k.includes(scheme.split(' ')[0])
    );
    if (!schemeKey) return [];

    // Fuzzy-match branch key
    const branchKey = Object.keys(db[uniKey][schemeKey]).find(
      (k) =>
        k.toLowerCase().includes(branch.toLowerCase().split(' ')[0]) ||
        k.toLowerCase().includes(branch.toLowerCase().split('&')[0].trim().toLowerCase()) ||
        branch.toLowerCase().includes('ise') && k.toLowerCase().includes('information') ||
        branch.toLowerCase().includes('cse') && k.toLowerCase().includes('computer science') ||
        branch.toLowerCase().includes('ece') && k.toLowerCase().includes('electronics')
    );
    if (!branchKey) return [];

    // Exact or fuzzy-match semester key
    const semKey = Object.keys(db[uniKey][schemeKey][branchKey]).find(
      (k) => k === semester ||
             k.toLowerCase().includes(semester.toLowerCase().replace('th semester', '').replace('st semester', '').replace('nd semester', '').replace('rd semester', '').trim()) ||
             semester.toLowerCase().includes(k.toLowerCase().replace('th semester', '').replace('st semester', '').replace('nd semester', '').replace('rd semester', '').trim())
    );
    if (!semKey) return [];

    return db[uniKey][schemeKey][branchKey][semKey] ?? [];
  } catch {
    return [];
  }
};

/**
 * Get all available semesters for a given university + scheme + branch
 */
export const getAvailableSemesters = (
  university: string,
  scheme: string,
  branch: string
): string[] => {
  try {
    const db = VTU_ACADEMIC_DATABASE;
    const uniKey = Object.keys(db).find((k) => k.toLowerCase().includes('vtu'));
    if (!uniKey) return [];
    const schemeKey = Object.keys(db[uniKey]).find((k) => k.includes('2022'));
    if (!schemeKey) return [];
    const branchKey = Object.keys(db[uniKey][schemeKey]).find(
      (k) =>
        branch.toLowerCase().includes('ise') && k.toLowerCase().includes('information') ||
        branch.toLowerCase().includes('cse') && k.toLowerCase().includes('computer') ||
        branch.toLowerCase().includes('ece') && k.toLowerCase().includes('electronics') ||
        k.toLowerCase().includes(branch.toLowerCase().split(' ')[0])
    );
    if (!branchKey) return [];
    return Object.keys(db[uniKey][schemeKey][branchKey]);
  } catch {
    return [];
  }
};

/**
 * Get all available branches for a given university + scheme
 */
export const getAvailableBranches = (university: string, scheme: string): string[] => {
  try {
    const db = VTU_ACADEMIC_DATABASE;
    const uniKey = Object.keys(db).find((k) => k.toLowerCase().includes('vtu'));
    if (!uniKey) return [];
    const schemeKey = Object.keys(db[uniKey]).find((k) => k.includes('2022'));
    if (!schemeKey) return [];
    return Object.keys(db[uniKey][schemeKey]);
  } catch {
    return [];
  }
};

/**
 * Get subject by code from any semester
 */
export const getSubjectByCode = (code: string): VTUSubject | null => {
  const db = VTU_ACADEMIC_DATABASE;
  for (const uni of Object.values(db)) {
    for (const scheme of Object.values(uni)) {
      for (const branch of Object.values(scheme)) {
        for (const semester of Object.values(branch)) {
          const found = semester.find((s) => s.code === code);
          if (found) return found;
        }
      }
    }
  }
  return null;
};

/**
 * Get all semester labels in display order
 */
export const SEMESTER_LABELS = [
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester',
] as const;

export type SemesterLabel = (typeof SEMESTER_LABELS)[number];
