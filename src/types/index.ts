export type UserRole = 'student' | 'professor' | 'admin';

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  semester?: number;
  rollNumber?: string;
  rollNo?: string;
  avatarUrl?: string;
  avatar?: string;
  // Student Onboarding Fields
  university?: string;
  scheme?: string;
  collegeName?: string;
  branch?: string;
  semesterName?: string;
  section?: string;
  academicYear?: string;
  isOnboarded?: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  subjectCode?: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  points: number;
  priority?: 'low' | 'medium' | 'high';
  description?: string;
}

export interface AttendanceRecord {
  id: string;
  subject: string;
  subjectCode?: string;
  code?: string;
  totalClasses?: number;
  attendedClasses?: number;
  attended: number;
  total: number;
  percentage: number;
  minimumRequired: number;
  faculty?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  type?: string;
  difficulty?: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time?: string;
  timestamp?: string;
  read: boolean;
  type: 'exam' | 'assignment' | 'class' | 'attendance' | 'announcement';
}

export interface ClassSchedule {
  id: string;
  subjectCode: string;
  subjectName: string;
  faculty: string;
  room: string;
  building: string;
  startTime: string;
  endTime: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  color?: string;
}

export interface ClassSession {
  id: string;
  subjectCode: string;
  subjectName: string;
  faculty: string;
  room: string;
  building: string;
  startTime: string;
  endTime: string;
  dayOfWeek: string;
  color?: string;
}

export interface Exam {
  id: string;
  subjectCode?: string;
  subjectName?: string;
  subject?: string;
  code?: string;
  date: string;
  time: string;
  room: string;
  totalMarks: number;
  syllabusCovered?: string;
}

export interface AcademicDoc {
  id: string;
  title: string;
  subject: string;
  uploadDate?: string;
  uploadedAt?: string;
  fileSize?: string;
  size?: string;
  type?: 'pdf' | 'docx' | 'pptx' | string;
  fileType?: string;
  summary?: string;
  deadlinesFound?: any[];
  downloadUrl?: string;
  keyConcepts?: string[];
  formulas?: string[];
}

export interface Flashcard {
  id: string;
  front?: string;
  back?: string;
  question?: string;
  answer?: string;
  category?: string;
  subject?: string;
}

export interface CampusLocation {
  id: string;
  name: string;
  building: string;
  floor: string;
  type?: 'classroom' | 'lab' | 'office' | 'auditorium' | 'canteen';
  category?: string;
  icontype?: string;
  description: string;
  coordinates?: { x: number; y: number };
  x: number;
  y: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedActions?: string[];
  citation?: string;
}
