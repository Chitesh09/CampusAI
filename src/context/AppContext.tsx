import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { UserProfile, Assignment, AttendanceRecord, NotificationItem, AcademicDoc } from '../types';
import { mockAssignments, mockAttendance, mockNotifications, mockDocs } from '../data/mockData';

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
  isOnboarded: false, // Show guided onboarding wizard on first login
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

  const addDoc = (newDoc: AcademicDoc) => {
    setDocs((prev) => [newDoc, ...prev]);
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
