import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { CommandPalette } from './components/common/CommandPalette';
import { LivingAcademicUniverse } from './components/common/LivingAcademicUniverse';
import { StudentOnboardingWizard } from './components/onboarding/StudentOnboardingWizard';
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
import { AcademicProfile } from './components/profile/AcademicProfile';
import { SubjectsPage } from './components/subjects/SubjectsPage';
import { motion } from 'framer-motion';

const MainShell: React.FC = () => {
  const { currentView, currentUser, isOnboardingOpen } = useApp();

  if (currentView === 'landing') {
    return (
      <>
        <LandingPage />
        <AuthModal />
      </>
    );
  }

  const showOnboarding = !currentUser.isOnboarded || isOnboardingOpen;

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#08080a] text-slate-900 dark:text-zinc-100 font-sans selection:bg-indigo-500/30 relative">
      {/* Living Academic Universe Background Layer */}
      <LivingAcademicUniverse />

      {/* Guided Student Onboarding Wizard Modal */}
      {showOnboarding && <StudentOnboardingWizard />}

      {/* Self-assembling Sidebar */}
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="z-10"
      >
        <Sidebar />
      </motion.div>

      {/* Main Content Shell */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-x-hidden z-10">
        {/* Self-assembling Header */}
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.1 }}
        >
          <Header />
        </motion.div>

        {/* Self-assembling Main View Content */}
        <motion.main
          key={currentView}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25, delay: 0.15 }}
          className="flex-1 pb-16"
        >
          {currentView === 'dashboard' && <DashboardOverview />}
          {currentView === 'ai-chat' && <AIChat />}
          {currentView === 'subjects' && <SubjectsPage />}
          {currentView === 'doc-intelligence' && <DocIntelligence />}
          {currentView === 'smart-notes' && <SmartNotes />}
          {currentView === 'quiz' && <QuizGenerator />}
          {currentView === 'assignments' && <AssignmentTracker />}
          {currentView === 'timetable' && <SmartTimetable />}
          {currentView === 'attendance' && <AttendanceDashboard />}
          {currentView === 'study-planner' && <AIStudyPlanner />}
          {currentView === 'campus-map' && <CampusMap />}
          {currentView === 'career' && <CareerAssistant />}
          {currentView === 'profile' && <AcademicProfile />}
          {currentView === 'professor' && <ProfessorMode />}
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
