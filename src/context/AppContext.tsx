import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { UserProfile, Assignment, AttendanceRecord, NotificationItem, AcademicDoc } from '../types';
import { mockAssignments, mockAttendance, mockNotifications, mockDocs } from '../data/mockData';

export interface CourseSubject {
  code: string;
  name: string;
  credits: number;
  faculty: string;
  vtuNotesUrl: string;
  progress: number;
  attendancePct: number;
  notesCount: number;
  assignmentsCount: number;
  quizzesCount: number;
  pyqCount: number;
  modules: { num: number; title: string; topics: string }[];
}

export const getCurriculumForProfile = (branch: string, semName: string, scheme: string): CourseSubject[] => {
  const is2022 = scheme.includes('2022');
  const semNum = parseInt(semName.replace(/\D/g, '')) || 5;

  if (semNum === 7) {
    if (is2022) {
      return [
        {
          code: 'BCS701',
          name: 'Big Data Analytics & Spark Framework',
          credits: 4,
          faculty: 'Prof. John Dean',
          vtuNotesUrl: 'https://vtucircle.com/notes/bcs701',
          progress: 62,
          attendancePct: 89.0,
          notesCount: 4,
          assignmentsCount: 2,
          quizzesCount: 4,
          pyqCount: 3,
          modules: [
            { num: 1, title: 'Hadoop & MapReduce Paradigm', topics: 'HDFS Architecture, YARN Resource Manager, Map & Reduce Functions' },
            { num: 2, title: 'Apache Spark & RDD Programming', topics: 'Spark Core, Resilient Distributed Datasets, Transformations & Actions' },
            { num: 3, title: 'Spark SQL & DataFrames', topics: 'Schema RDDs, DataFrames API, Catalyst Optimizer, Parquet Storage' },
            { num: 4, title: 'NoSQL Databases (Cassandra & MongoDB)', topics: 'Columnar Databases, LSM Trees, CAP Theorem, Sharding' },
            { num: 5, title: 'Streaming Data & Kafka', topics: 'Producer-Consumer Pipelines, Structured Streaming, Micro-batching' },
          ],
        },
        {
          code: 'BCS702',
          name: 'Cloud Computing & Infrastructure',
          credits: 3,
          faculty: 'Prof. Werner Vogels',
          vtuNotesUrl: 'https://vtucircle.com/notes/bcs702',
          progress: 75,
          attendancePct: 91.5,
          notesCount: 5,
          assignmentsCount: 1,
          quizzesCount: 5,
          pyqCount: 4,
          modules: [
            { num: 1, title: 'Cloud Models & Virtualization', topics: 'IaaS, PaaS, SaaS, Hypervisors (KVM, ESXi), Containerization (Docker)' },
            { num: 2, title: 'AWS Core Infrastructure', topics: 'EC2 Instances, VPC Networking, Subnets, Security Groups, IAM' },
            { num: 3, title: 'Cloud Storage & Databases', topics: 'S3 Object Storage, EBS Volumes, DynamoDB Key-Value Store' },
            { num: 4, title: 'DevOps & Serverless Architecture', topics: 'AWS Lambda, API Gateway, Terraform Infrastructure as Code' },
            { num: 5, title: 'Cloud Security & Compliance', topics: 'Shared Responsibility Model, KMS Encryption, Audit Logging' },
          ],
        },
        {
          code: 'BCS703',
          name: 'Information Security & Cryptography',
          credits: 4,
          faculty: 'Prof. Adi Shamir',
          vtuNotesUrl: 'https://vtucircle.com/notes/bcs703',
          progress: 58,
          attendancePct: 84.0,
          notesCount: 3,
          assignmentsCount: 3,
          quizzesCount: 6,
          pyqCount: 2,
          modules: [
            { num: 1, title: 'Symmetric Encryption & Ciphers', topics: 'AES, DES, Block Cipher Modes (CBC, GCM), Key Exchange' },
            { num: 2, title: 'Asymmetric Cryptography', topics: 'RSA Algorithm, Elliptic Curve Cryptography (ECC), Diffie-Hellman' },
            { num: 3, title: 'Hash Functions & Digital Signatures', topics: 'SHA-256, HMAC, Public Key Infrastructure (PKI), X.509 Certificates' },
            { num: 4, title: 'Network Security Protocols', topics: 'TLS/SSL Handshake, IPsec VPNs, SSH Tunneling, OAuth 2.0' },
            { num: 5, title: 'Cyber Attacks & Defense Strategies', topics: 'Zero-Day Exploits, Buffer Overflow, Ransomware, Intrusion Detection' },
          ],
        },
        {
          code: 'BCS704',
          name: 'Blockchain Technology & Smart Contracts',
          credits: 3,
          faculty: 'Prof. Gavin Wood',
          vtuNotesUrl: 'https://vtucircle.com/notes/bcs704',
          progress: 45,
          attendancePct: 78.0,
          notesCount: 4,
          assignmentsCount: 2,
          quizzesCount: 3,
          pyqCount: 2,
          modules: [
            { num: 1, title: 'Distributed Ledgers & Consensus', topics: 'Proof of Work (PoW), Proof of Stake (PoS), Byzantine Fault Tolerance' },
            { num: 2, title: 'Bitcoin Architecture & UTXO Model', topics: 'Merkle Trees, Cryptographic Hashes, Mining Pools, Peer P2P Network' },
            { num: 3, title: 'Ethereum Virtual Machine & Solidity', topics: 'EVM State Machine, Smart Contract Syntax, Gas Fees & Optimization' },
            { num: 4, title: 'Decentralized Finance (DeFi) & NFTs', topics: 'ERC-20 & ERC-721 Tokens, Automated Market Makers (Uniswap)' },
            { num: 5, title: 'Enterprise Blockchains (Hyperledger Fabric)', topics: 'Permissioned Ledgers, Channels, Endorsement Policies, Chaincode' },
          ],
        },
      ];
    } else {
      return [
        {
          code: '21CS71',
          name: 'Big Data Analytics & Processing',
          credits: 4,
          faculty: 'Prof. John Dean',
          vtuNotesUrl: 'https://vtucircle.com/notes/21cs71',
          progress: 65,
          attendancePct: 88.0,
          notesCount: 4,
          assignmentsCount: 2,
          quizzesCount: 4,
          pyqCount: 3,
          modules: [
            { num: 1, title: 'Hadoop & MapReduce', topics: 'HDFS, YARN, Map & Reduce Jobs' },
            { num: 2, title: 'Apache Spark Core', topics: 'RDDs, Transformations & Actions' },
            { num: 3, title: 'Spark SQL & DataFrames', topics: 'Schema RDDs, DataFrames API' },
            { num: 4, title: 'NoSQL Databases', topics: 'Cassandra, MongoDB, CAP Theorem' },
            { num: 5, title: 'Stream Processing', topics: 'Kafka, Structured Streaming' },
          ],
        },
        {
          code: '21CS72',
          name: 'Cloud Computing & Virtualization',
          credits: 3,
          faculty: 'Prof. Werner Vogels',
          vtuNotesUrl: 'https://vtucircle.com/notes/21cs72',
          progress: 72,
          attendancePct: 90.0,
          notesCount: 5,
          assignmentsCount: 1,
          quizzesCount: 5,
          pyqCount: 4,
          modules: [
            { num: 1, title: 'Cloud Models', topics: 'IaaS, PaaS, SaaS, Docker' },
            { num: 2, title: 'AWS Core', topics: 'EC2, VPC, Subnets, IAM' },
            { num: 3, title: 'Cloud Storage', topics: 'S3, EBS, DynamoDB' },
            { num: 4, title: 'Serverless', topics: 'Lambda, API Gateway, Terraform' },
            { num: 5, title: 'Cloud Security', topics: 'KMS Encryption, Audit Logging' },
          ],
        },
        {
          code: '21CS73',
          name: 'Information and Network Security',
          credits: 4,
          faculty: 'Prof. Adi Shamir',
          vtuNotesUrl: 'https://vtucircle.com/notes/21cs73',
          progress: 60,
          attendancePct: 85.0,
          notesCount: 3,
          assignmentsCount: 3,
          quizzesCount: 6,
          pyqCount: 2,
          modules: [
            { num: 1, title: 'Symmetric Encryption', topics: 'AES, DES, Block Ciphers' },
            { num: 2, title: 'Asymmetric Crypto', topics: 'RSA, ECC, Diffie-Hellman' },
            { num: 3, title: 'Hash Functions', topics: 'SHA-256, HMAC, PKI' },
            { num: 4, title: 'Network Security', topics: 'TLS/SSL, IPsec, OAuth 2.0' },
            { num: 5, title: 'Cyber Attacks', topics: 'Zero-Day Exploits, Ransomware' },
          ],
        },
        {
          code: '21CS74',
          name: 'Internet of Things & Embedded Systems',
          credits: 3,
          faculty: 'Prof. Kevin Ashton',
          vtuNotesUrl: 'https://vtucircle.com/notes/21cs74',
          progress: 50,
          attendancePct: 80.0,
          notesCount: 4,
          assignmentsCount: 2,
          quizzesCount: 3,
          pyqCount: 2,
          modules: [
            { num: 1, title: 'IoT Architecture', topics: 'Sensors, Actuators, Microcontrollers' },
            { num: 2, title: 'IoT Protocols', topics: 'MQTT, CoAP, HTTP REST, Zigbee' },
            { num: 3, title: 'Edge Computing', topics: 'Raspberry Pi, ESP32, Local Processing' },
            { num: 4, title: 'Cloud IoT Platforms', topics: 'AWS IoT Core, ThingsBoard' },
            { num: 5, title: 'IoT Security', topics: 'Device Authentication, Firmware Updates' },
          ],
        },
      ];
    }
  }

  if (semNum === 4) {
    return [
      {
        code: is2022 ? 'BCS401' : '21CS41',
        name: 'Analysis and Design of Algorithms (ADA)',
        credits: 4,
        faculty: 'Prof. Donald Knuth',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcs401',
        progress: 70,
        attendancePct: 90.0,
        notesCount: 5,
        assignmentsCount: 2,
        quizzesCount: 6,
        pyqCount: 4,
        modules: [
          { num: 1, title: 'Introduction & Asymptotic Notations', topics: 'Big-O, Omega, Theta, Recurrence Relations' },
          { num: 2, title: 'Divide & Conquer Algorithm Strategy', topics: 'Merge Sort, Quick Sort, Binary Search' },
          { num: 3, title: 'Dynamic Programming & Greedy Method', topics: '0/1 Knapsack, Prim & Kruskal MST, Dijkstra' },
          { num: 4, title: 'Backtracking & Branch-and-Bound', topics: 'N-Queens, Subset Sum, Traveling Salesperson' },
          { num: 5, title: 'NP-Completeness & P vs NP', topics: 'Polynomial Reduction, SAT Problem, Clique' },
        ],
      },
      {
        code: is2022 ? 'BCS402' : '21CS42',
        name: 'Microcontrollers & Embedded Systems',
        credits: 3,
        faculty: 'Prof. ARM Architecture',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcs402',
        progress: 65,
        attendancePct: 86.0,
        notesCount: 4,
        assignmentsCount: 1,
        quizzesCount: 4,
        pyqCount: 3,
        modules: [
          { num: 1, title: 'ARM Cortex M3 Architecture', topics: 'Registers, Memory Map, Registers & Operating Modes' },
          { num: 2, title: 'ARM Assembly Language Programming', topics: 'Instruction Set, Data Transfer, Branching' },
          { num: 3, title: 'Embedded System Components', topics: 'Timers, Counters, Interrupt Handlers, GPIO' },
          { num: 4, title: 'Real Time Operating Systems (RTOS)', topics: 'Tasks, Scheduling, Mutex, Semaphores' },
          { num: 5, title: 'Interfacing & Sensors', topics: 'LCD, Stepper Motor, ADC/DAC Interfacing' },
        ],
      },
      {
        code: is2022 ? 'BCS403' : '21CS43',
        name: 'Database Management Systems (DBMS)',
        credits: 4,
        faculty: 'Prof. Alan Turing',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcs403',
        progress: 68,
        attendancePct: 88.5,
        notesCount: 4,
        assignmentsCount: 2,
        quizzesCount: 5,
        pyqCount: 3,
        modules: [
          { num: 1, title: 'Introduction & ER Diagrams', topics: 'ER Models, Conceptual Design, SQL DDL/DML' },
          { num: 2, title: 'Relational Algebra & Normalization', topics: '1NF, 2NF, 3NF, BCNF, Functional Dependencies' },
          { num: 3, title: 'Indexing & B+ Trees', topics: 'Dense/Sparse Indexes, B+ Tree Insertion/Splitting' },
          { num: 4, title: 'Transaction Processing & 2PL', topics: 'ACID Properties, 2-Phase Locking, Deadlocks' },
          { num: 5, title: 'NoSQL & MongoDB', topics: 'Document Stores, Key-Value, CAP Theorem' },
        ],
      },
      {
        code: is2022 ? 'BIS402' : '21CS44',
        name: 'Advanced Java Programming',
        credits: 3,
        faculty: 'Prof. James Gosling',
        vtuNotesUrl: 'https://vtucircle.com/notes/bis402',
        progress: 58,
        attendancePct: 82.0,
        notesCount: 4,
        assignmentsCount: 2,
        quizzesCount: 3,
        pyqCount: 2,
        modules: [
          { num: 1, title: 'Java Collections Framework', topics: 'List, Set, Map, ArrayList, HashMap, Iterator' },
          { num: 2, title: 'JDBC & Database Connectivity', topics: 'Drivers, Connection, Statement, ResultSet' },
          { num: 3, title: 'Servlets & HTTP Request Handling', topics: 'Lifecycle, HttpServlet, Sessions, Cookies' },
          { num: 4, title: 'JSP (JavaServer Pages)', topics: 'Directives, Scriptlets, Implicit Objects, Beans' },
          { num: 5, title: 'Multithreading & Concurrency', topics: 'Thread Class, Runnable, Synchronization, Executors' },
        ],
      },
    ];
  }

  if (semNum === 3) {
    return [
      {
        code: is2022 ? 'BCS301' : '21CS31',
        name: 'Data Structures and Algorithms',
        credits: 4,
        faculty: 'Prof. Linus Torvalds',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcs301',
        progress: 80,
        attendancePct: 92.0,
        notesCount: 5,
        assignmentsCount: 2,
        quizzesCount: 6,
        pyqCount: 4,
        modules: [
          { num: 1, title: 'Arrays, Stacks & Queues', topics: 'Pointers, Dynamic Memory, Stack Infix to Postfix' },
          { num: 2, title: 'Linked Lists (Singly & Doubly)', topics: 'Node Operations, Polynomial Addition' },
          { num: 3, title: 'Trees & Binary Search Trees', topics: 'Traversals (Pre, In, Post), BST Insertion & Deletion' },
          { num: 4, title: 'Graphs & Searching Algorithms', topics: 'Adjacency Matrix, BFS, DFS, Topological Sorting' },
          { num: 5, title: 'Hashing & Heaps', topics: 'Collision Resolution, Min/Max Heap, Heap Sort' },
        ],
      },
      {
        code: is2022 ? 'BCS302' : '21CS32',
        name: 'Digital Design & Computer Organization',
        credits: 4,
        faculty: 'Prof. John von Neumann',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcs302',
        progress: 72,
        attendancePct: 88.0,
        notesCount: 4,
        assignmentsCount: 1,
        quizzesCount: 4,
        pyqCount: 3,
        modules: [
          { num: 1, title: 'Combinational Logic Circuits', topics: 'K-Maps, Multiplexers, Decoders, Adders' },
          { num: 2, title: 'Sequential Logic & Flip-Flops', topics: 'SR, JK, D, T Flip-Flops, Registers, Counters' },
          { num: 3, title: 'Basic Computer Architecture', topics: 'Bus Structure, Instruction Formats, Addressing Modes' },
          { num: 4, title: 'Memory Organization', topics: 'Cache Memory, Virtual Memory, RAM/ROM Chips' },
          { num: 5, title: 'I/O Organization', topics: 'Interrupts, Direct Memory Access (DMA), Bus Arbitration' },
        ],
      },
      {
        code: is2022 ? 'BCS303' : '21CS33',
        name: 'Object Oriented Programming (Java / C++)',
        credits: 3,
        faculty: 'Prof. Bjarne Stroustrup',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcs303',
        progress: 78,
        attendancePct: 94.0,
        notesCount: 4,
        assignmentsCount: 2,
        quizzesCount: 5,
        pyqCount: 3,
        modules: [
          { num: 1, title: 'OOP Principles & Encapsulation', topics: 'Classes, Objects, Constructors, Static Members' },
          { num: 2, title: 'Inheritance & Polymorphism', topics: 'Method Overriding, Abstract Classes, Interfaces' },
          { num: 3, title: 'Exception Handling & Packages', topics: 'Try-Catch, Custom Exceptions, Package Scope' },
          { num: 4, title: 'Generics & File I/O Streams', topics: 'Byte Streams, Character Streams, File Readers' },
          { num: 5, title: 'GUI Programming & Event Models', topics: 'Swing Components, Layout Managers, Listeners' },
        ],
      },
      {
        code: is2022 ? 'BCS304' : '21CS34',
        name: 'Discrete Mathematical Structures',
        credits: 3,
        faculty: 'Prof. George Boole',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcs304',
        progress: 60,
        attendancePct: 83.0,
        notesCount: 3,
        assignmentsCount: 3,
        quizzesCount: 4,
        pyqCount: 2,
        modules: [
          { num: 1, title: 'Fundamentals of Logic & Proofs', topics: 'Propositional Logic, Truth Tables, Predicates' },
          { num: 2, title: 'Set Theory & Relations', topics: 'Venn Diagrams, Partial Orders, Lattices' },
          { num: 3, title: 'Functions & Pigeonhole Principle', topics: 'Injective/Surjective, Counting Principles' },
          { num: 4, title: 'Graph Theory & Trees', topics: 'Euler & Hamiltonian Paths, Planar Graphs' },
          { num: 5, title: 'Group Theory & Algebraic Structures', topics: 'Semigroups, Monoids, Groups, Rings' },
        ],
      },
    ];
  }

  // Default 5th / 6th Sem fallback
  if (is2022) {
    return [
      {
        code: 'BCS501',
        name: 'Software Engineering & Project Management',
        credits: 4,
        faculty: 'Prof. Grace Hopper',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcs501',
        progress: 80,
        attendancePct: 92.0,
        notesCount: 4,
        assignmentsCount: 1,
        quizzesCount: 4,
        pyqCount: 3,
        modules: [
          { num: 1, title: 'Software Process Models', topics: 'Waterfall, Agile Scrum, User Stories, SRS' },
          { num: 2, title: 'Requirements Engineering', topics: 'Functional & Non-Functional Requirements' },
          { num: 3, title: 'Software Design & Architecture', topics: 'Cohesion, Coupling, Architectural Patterns' },
          { num: 4, title: 'Software Testing Strategies', topics: 'Black-Box, White-Box, System Testing' },
          { num: 5, title: 'DevOps & Maintenance', topics: 'CI/CD Pipelines, Refactoring, Cost Models' },
        ],
      },
      {
        code: 'BCS502',
        name: 'Computer Networks (CN)',
        credits: 4,
        faculty: 'Prof. Vint Cerf',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcs502',
        progress: 74,
        attendancePct: 89.0,
        notesCount: 5,
        assignmentsCount: 2,
        quizzesCount: 5,
        pyqCount: 4,
        modules: [
          { num: 1, title: 'Physical & Data Link Layer', topics: 'OSI 7 Layer, TCP/IP, Framing, Error Control' },
          { num: 2, title: 'Medium Access & Ethernet', topics: 'CSMA/CD, Switches, VLANs, Wi-Fi 802.11' },
          { num: 3, title: 'Network Layer & Routing', topics: 'IPv4, IPv6, Subnetting, OSPF, BGP, ICMP' },
          { num: 4, title: 'Transport Layer', topics: 'TCP 3-Way Handshake, UDP, Congestion Control' },
          { num: 5, title: 'Application Layer Protocols', topics: 'DNS, HTTP/2, HTTPS, SMTP, FTP' },
        ],
      },
      {
        code: 'BCS503',
        name: 'Theory of Computation (TOC)',
        credits: 4,
        faculty: 'Prof. Michael Sipser',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcs503',
        progress: 58,
        attendancePct: 81.0,
        notesCount: 3,
        assignmentsCount: 3,
        quizzesCount: 4,
        pyqCount: 3,
        modules: [
          { num: 1, title: 'Automata & Regular Languages', topics: 'DFA, NFA, Regular Expressions, Pumping Lemma' },
          { num: 2, title: 'Context-Free Grammars (CFG)', topics: 'Derivation Trees, Ambiguity, CNF & GNF' },
          { num: 3, title: 'Pushdown Automata (PDA)', topics: 'PDA Transitions, Acceptance by Final State' },
          { num: 4, title: 'Turing Machines (TM)', topics: 'TM Architecture, Multi-Tape TMs, Universal TM' },
          { num: 5, title: 'Decidability & Halting Problem', topics: 'Undecidable Problems, Post Correspondence' },
        ],
      },
      {
        code: 'BCSL504',
        name: 'Web Technology & Fullstack Lab',
        credits: 2,
        faculty: 'Prof. Tim Berners-Lee',
        vtuNotesUrl: 'https://vtucircle.com/notes/bcsl504',
        progress: 85,
        attendancePct: 95.0,
        notesCount: 4,
        assignmentsCount: 1,
        quizzesCount: 5,
        pyqCount: 2,
        modules: [
          { num: 1, title: 'HTML5 & CSS3 Responsive UI', topics: 'Flexbox, CSS Grid, Media Queries' },
          { num: 2, title: 'JavaScript ES6 & Async DOM', topics: 'Fetch API, Promises, Event Loop' },
          { num: 3, title: 'React.js Component Design', topics: 'Hooks, State, Virtual DOM' },
          { num: 4, title: 'Node.js & Express REST APIs', topics: 'Endpoints, Middleware, JWT' },
          { num: 5, title: 'MongoDB Fullstack Integration', topics: 'Mongoose Schemas, CRUD Apps' },
        ],
      },
    ];
  }

  return [
    {
      code: '21IS51',
      name: 'Software Engineering & SDLC',
      credits: 4,
      faculty: 'Prof. Grace Hopper',
      vtuNotesUrl: 'https://vtucircle.com/notes/21is51',
      progress: 80,
      attendancePct: 92.0,
      notesCount: 4,
      assignmentsCount: 1,
      quizzesCount: 4,
      pyqCount: 3,
      modules: [
        { num: 1, title: 'Software Process Models', topics: 'Waterfall, Agile Scrum, User Stories' },
        { num: 2, title: 'Requirements Engineering', topics: 'Functional & Non-Functional Requirements' },
        { num: 3, title: 'Software Design & Architecture', topics: 'Cohesion, Coupling, Design Patterns' },
        { num: 4, title: 'Software Testing Strategies', topics: 'Black-Box, White-Box, Integration Testing' },
        { num: 5, title: 'DevOps & Maintenance', topics: 'CI/CD Pipelines, Maintenance Costs' },
      ],
    },
    {
      code: '21IS52',
      name: 'Computer Networks & Protocol Suite',
      credits: 4,
      faculty: 'Prof. Vint Cerf',
      vtuNotesUrl: 'https://vtucircle.com/notes/21is52',
      progress: 74,
      attendancePct: 89.0,
      notesCount: 5,
      assignmentsCount: 2,
      quizzesCount: 5,
      pyqCount: 4,
      modules: [
        { num: 1, title: 'Physical & Data Link Layer', topics: 'OSI 7 Layer, Framing, Error Control' },
        { num: 2, title: 'Ethernet & Switches', topics: 'CSMA/CD, VLANs, Wi-Fi' },
        { num: 3, title: 'Network Layer & Routing', topics: 'IPv4, Subnetting, OSPF, BGP' },
        { num: 4, title: 'Transport Layer', topics: 'TCP, UDP, Congestion Control' },
        { num: 5, title: 'Application Layer', topics: 'DNS, HTTP/2, HTTPS, SMTP' },
      ],
    },
    {
      code: '21IS53',
      name: 'Database Management Systems',
      credits: 4,
      faculty: 'Prof. Alan Turing',
      vtuNotesUrl: 'https://vtucircle.com/notes/21is53',
      progress: 68,
      attendancePct: 88.5,
      notesCount: 4,
      assignmentsCount: 2,
      quizzesCount: 5,
      pyqCount: 3,
      modules: [
        { num: 1, title: 'Introduction & ER Diagrams', topics: 'ER Models, Conceptual Design, SQL' },
        { num: 2, title: 'Relational Algebra & Normalization', topics: '1NF, 2NF, 3NF, BCNF' },
        { num: 3, title: 'Indexing & B+ Trees', topics: 'Dense/Sparse Indexes, B+ Trees' },
        { num: 4, title: 'Transaction Processing & 2PL', topics: 'ACID Properties, 2PL, Deadlocks' },
        { num: 5, title: 'NoSQL & MongoDB', topics: 'Document Stores, CAP Theorem' },
      ],
    },
    {
      code: '21IS541',
      name: 'Cloud Computing & AWS Architecture',
      credits: 3,
      faculty: 'Prof. Werner Vogels',
      vtuNotesUrl: 'https://vtucircle.com/notes/21is541',
      progress: 62,
      attendancePct: 85.0,
      notesCount: 4,
      assignmentsCount: 1,
      quizzesCount: 3,
      pyqCount: 2,
      modules: [
        { num: 1, title: 'Cloud Models', topics: 'IaaS, PaaS, SaaS, Docker' },
        { num: 2, title: 'AWS Core', topics: 'EC2, VPC, Subnets, IAM' },
        { num: 3, title: 'Cloud Storage', topics: 'S3, EBS, DynamoDB' },
        { num: 4, title: 'Serverless', topics: 'Lambda, API Gateway, Terraform' },
        { num: 5, title: 'Cloud Security', topics: 'KMS Encryption, Audit Logging' },
      ],
    },
  ];
};

interface AppContextType {
  currentUser: UserProfile;
  userRole: 'student' | 'professor' | 'admin';
  setUserRole: (role: 'student' | 'professor' | 'admin') => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
  isFocusMode: boolean;
  setIsFocusMode: (mode: boolean) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  isApiKeyModalOpen: boolean;
  setIsApiKeyModalOpen: (open: boolean) => void;
  activeChatPrompt: string;
  setActiveChatPrompt: (prompt: string) => void;
  assignments: Assignment[];
  setAssignments: React.Dispatch<React.SetStateAction<Assignment[]>>;
  addAssignment: (newAssignment: Assignment) => void;
  toggleAssignmentStatus: (id: string) => void;
  attendanceRecords: AttendanceRecord[];
  setAttendanceRecords: React.Dispatch<React.SetStateAction<AttendanceRecord[]>>;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
  docs: AcademicDoc[];
  addDoc: (doc: AcademicDoc) => void;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  activeCurriculum: CourseSubject[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const initialStudentProfile: UserProfile = {
  id: 'usr-1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@bmsce.ac.in',
  role: 'student',
  department: 'Computer Science & Engineering (CSE)',
  semester: 6,
  rollNumber: '1BM22CS104',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  university: 'VTU (Visvesvaraya Technological University)',
  scheme: '2022 Scheme (CBCS)',
  collegeName: 'BMS College of Engineering',
  branch: 'Computer Science & Engineering (CSE)',
  semesterName: '6th Semester',
  section: 'Section B',
  academicYear: '2025 - 2026',
  isOnboarded: false,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialStudentProfile);
  const [userRole, setUserRole] = useState<'student' | 'professor' | 'admin'>('student');
  const [currentView, setCurrentView] = useState('dashboard');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [activeChatPrompt, setActiveChatPrompt] = useState('');
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendance);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [docs, setDocs] = useState<AcademicDoc[]>(mockDocs);
  const [geminiApiKey, setGeminiApiKey] = useState('');

  // Dynamically computed active curriculum subscribing to currentUser state
  const activeCurriculum = getCurriculumForProfile(
    currentUser.branch || 'CSE',
    currentUser.semesterName || '6th Semester',
    currentUser.scheme || '2022 Scheme'
  );

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...profile }));
  };

  const addAssignment = (newAssignment: Assignment) => {
    setAssignments((prev) => [newAssignment, ...prev]);
  };

  const toggleAssignmentStatus = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === 'completed' ? 'pending' : 'completed' } : a
      )
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const addDoc = (doc: AcademicDoc) => {
    setDocs((prev) => [doc, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        userRole,
        setUserRole,
        updateUserProfile,
        currentView,
        setCurrentView,
        isFocusMode,
        setIsFocusMode,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isApiKeyModalOpen,
        setIsApiKeyModalOpen,
        activeChatPrompt,
        setActiveChatPrompt,
        assignments,
        setAssignments,
        addAssignment,
        toggleAssignmentStatus,
        attendanceRecords,
        setAttendanceRecords,
        notifications,
        setNotifications,
        markNotificationAsRead,
        clearAllNotifications,
        docs,
        addDoc,
        geminiApiKey,
        setGeminiApiKey,
        activeCurriculum,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
