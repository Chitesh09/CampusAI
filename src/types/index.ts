export type UserRole = 'student' | 'professor' | 'admin';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'ai-chat'
  | 'doc-intelligence'
  | 'smart-notes'
  | 'quiz'
  | 'assignments'
  | 'timetable'
  | 'attendance'
  | 'study-planner'
  | 'campus-map'
  | 'professor'
  | 'career'
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  department: string;
  semester?: number;
  rollNo?: string;
}

export interface ClassSession {
  id: string;
  subjectCode: string;
  subjectName: string;
  faculty: string;
  room: string;
  startTime: string; // e.g. "09:00 AM"
  endTime: string;   // e.g. "10:00 AM"
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  color: string;
  building: string;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  deadline: string; // YYYY-MM-DD
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed';
  description: string;
  points: number;
}

export interface Exam {
  id: string;
  subject: string;
  code: string;
  date: string;
  time: string;
  room: string;
  totalMarks: number;
  syllabusCovered: string;
}

export interface AttendanceRecord {
  id: string;
  subject: string;
  code: string;
  attended: number;
  total: number;
  percentage: number;
  minimumRequired: number;
  faculty: string;
}

export interface AcademicDoc {
  id: string;
  title: string;
  fileType: 'pdf' | 'docx' | 'ppt' | 'image';
  size: string;
  uploadedAt: string;
  subject: string;
  summary?: string;
  keyConcepts?: string[];
  formulas?: string[];
  deadlinesFound?: string[];
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
  mastered?: boolean;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true-false' | 'fill-blank' | 'coding';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  questions: QuizQuestion[];
  timeLimitMinutes: number;
}

export interface CampusLocation {
  id: string;
  name: string;
  category: 'lab' | 'department' | 'library' | 'hostel' | 'placement' | 'auditorium' | 'cafeteria';
  building: string;
  floor: string;
  description: string;
  x: number; // grid percentage x for SVG map
  y: number; // grid percentage y for SVG map
  icontype: string;
}

export interface StudyPlanDay {
  day: string;
  date: string;
  tasks: {
    time: string;
    subject: string;
    topic: string;
    type: 'study' | 'revision' | 'practice' | 'break';
    duration: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'exam' | 'assignment' | 'class' | 'attendance' | 'announcement';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  thinkingTime?: string;
  suggestedActions?: string[];
  citation?: string;
  isStreaming?: boolean;
}
