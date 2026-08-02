import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserRole,
  UserProfile,
  AcademicDoc,
  Assignment,
  AttendanceRecord,
  NotificationItem,
} from '../types';
import {
  mockUser,
  mockDocs,
  mockAssignments,
  mockAttendance,
  mockNotifications,
} from '../data/mockData';

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  currentUser: UserProfile;
  currentView: string;
  setCurrentView: (view: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  isFocusMode: boolean;
  toggleFocusMode: () => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isApiKeyModalOpen: boolean;
  setIsApiKeyModalOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  activeChatPrompt: string;
  setActiveChatPrompt: (prompt: string) => void;
  docs: AcademicDoc[];
  addDoc: (doc: AcademicDoc) => void;
  assignments: Assignment[];
  addAssignment: (assignment: Assignment) => void;
  toggleAssignmentStatus: (id: string) => void;
  attendanceRecords: AttendanceRecord[];
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  clearAllNotifications: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [currentView, setCurrentView] = useState<string>('landing');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(
    localStorage.getItem('gemini_api_key') || ''
  );
  const [activeChatPrompt, setActiveChatPrompt] = useState<string>('');

  const [docs, setDocs] = useState<AcademicDoc[]>(mockDocs);
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [attendanceRecords] = useState<AttendanceRecord[]>(mockAttendance);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Global Keyboard Shortcuts (⌘K, ⌘F, ⌘D, ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCmd = e.metaKey || e.ctrlKey;
      if (isCmd && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (isCmd && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        setIsFocusMode((prev) => !prev);
      } else if (isCmd && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setCurrentView('dashboard');
      } else if (e.key === 'Escape') {
        setIsCommandPaletteOpen(false);
        setIsApiKeyModalOpen(false);
        setIsAuthModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem('gemini_api_key', key);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleFocusMode = () => setIsFocusMode((prev) => !prev);

  const addDoc = (newDoc: AcademicDoc) => {
    setDocs((prev) => [newDoc, ...prev]);
  };

  const addAssignment = (assignment: Assignment) => {
    setAssignments((prev) => [assignment, ...prev]);
  };

  const toggleAssignmentStatus = (id: string) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus =
            a.status === 'pending'
              ? 'in-progress'
              : a.status === 'in-progress'
              ? 'completed'
              : 'pending';
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <AppContext.Provider
      value={{
        userRole,
        setUserRole,
        currentUser: mockUser,
        currentView,
        setCurrentView,
        darkMode,
        toggleDarkMode,
        isFocusMode,
        toggleFocusMode,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isApiKeyModalOpen,
        setIsApiKeyModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        geminiApiKey,
        setGeminiApiKey,
        activeChatPrompt,
        setActiveChatPrompt,
        docs,
        addDoc,
        assignments,
        addAssignment,
        toggleAssignmentStatus,
        attendanceRecords,
        notifications,
        markNotificationAsRead,
        clearAllNotifications,
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
