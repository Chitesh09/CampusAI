import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { CommandPalette } from './components/common/CommandPalette';
import { LandingPage } from './components/landing/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { AIChat } from './components/ai-chat/AIChat';
import { DocIntelligence } from './components/doc-intelligence/DocIntelligence';
import { SmartNotes } from './components/smart-notes/SmartNotes';
import { QuizGenerator } from './components/quiz/QuizGenerator';
import { AssignmentTracker } from './components/assignments/AssignmentTracker';
import { SmartTimetable } from './components/timetable/SmartTimetable';
import { AttendanceDashboard } from './components/attendance/AttendanceDashboard';
import { AIStudyPlanner } from './components/study-planner/AIStudyPlanner';
import { CampusMap } from './components/campus-map/CampusMap';
import { ProfessorMode } from './components/professor/ProfessorMode';
import { CareerAssistant } from './components/career/CareerAssistant';
import { AdminPortal } from './components/admin/AdminPortal';
import { motion, AnimatePresence } from 'framer-motion';

const MainShell: React.FC = () => {
  const { currentView } = useApp();

  if (currentView === 'landing') {
    return (
      <>
        <LandingPage />
        <AuthModal />
      </>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#09090b] text-slate-900 dark:text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Self-assembling Sidebar */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <Sidebar />
      </motion.div>

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden">
        {/* Self-assembling Header */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1, ease: 'easeOut' }}
        >
          <Header />
        </motion.div>

        {/* Self-assembling Main View Content */}
        <motion.main
          key={currentView}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15, ease: 'easeOut' }}
          className="flex-1 pb-16"
        >
          {currentView === 'dashboard' && <DashboardOverview />}
          {currentView === 'ai-chat' && <AIChat />}
          {currentView === 'doc-intelligence' && <DocIntelligence />}
          {currentView === 'smart-notes' && <SmartNotes />}
          {currentView === 'quiz' && <QuizGenerator />}
          {currentView === 'assignments' && <AssignmentTracker />}
          {currentView === 'timetable' && <SmartTimetable />}
          {currentView === 'attendance' && <AttendanceDashboard />}
          {currentView === 'study-planner' && <AIStudyPlanner />}
          {currentView === 'campus-map' && <CampusMap />}
          {currentView === 'professor' && <ProfessorMode />}
          {currentView === 'career' && <CareerAssistant />}
          {currentView === 'admin' && <AdminPortal />}
        </motion.main>
      </div>

      <CommandPalette />
      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainShell />
    </AppProvider>
  );
}
