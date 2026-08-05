import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, Mail, Lock, User, GraduationCap, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, userRole, setUserRole, setCurrentView } = useApp();
  const [tab, setTab] = useState<'login' | 'register' | 'forgot'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>(userRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole(selectedRole);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsAuthModalOpen(false);
      setCurrentView('dashboard');
    }, 800);
  };

  // Spring animation variants for the dialog container
  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.96, y: 15 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
        mass: 0.8,
        staggerChildren: 0.05,
        delayChildren: 0.08
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.97, 
      y: 10,
      transition: { duration: 0.15, ease: 'easeOut' }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md">
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-md bg-white dark:bg-[#111114] border border-slate-200 dark:border-white/[0.06] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Close button with subtle rotation hover */}
          <motion.button
            whileHover={{ rotate: 90, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </motion.button>

          {/* Logo Header */}
          <div className="text-center mb-6">
            <motion.div 
              variants={itemVariants}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-500/20 mx-auto mb-3"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            
            <motion.h2 
              variants={itemVariants}
              className="text-xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              {tab === 'login' && 'Welcome back to CampusCopilot'}
              {tab === 'register' && 'Create your Academic Account'}
              {tab === 'forgot' && 'Reset your Password'}
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-xs text-slate-500 dark:text-zinc-400 mt-1"
            >
              One platform for classes, exams, notes & Gemini AI
            </motion.p>
          </div>

          {/* Tab Navigation with sliding background indicator */}
          <motion.div variants={itemVariants} className="relative grid grid-cols-2 p-1 bg-slate-100 dark:bg-zinc-800/60 rounded-xl mb-6 text-xs font-semibold">
            {/* Slide active tab background */}
            <div className="absolute inset-y-1 left-1 right-1 grid grid-cols-2 pointer-events-none">
              <motion.div
                layoutId="activeAuthTab"
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm"
                style={{
                  gridColumnStart: tab === 'login' ? 1 : 2
                }}
              />
            </div>
            
            <button
              type="button"
              onClick={() => setTab('login')}
              className={`py-2 rounded-lg z-10 text-center transition-colors duration-200 cursor-pointer ${
                tab === 'login' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-zinc-400'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setTab('register')}
              className={`py-2 rounded-lg z-10 text-center transition-colors duration-200 cursor-pointer ${
                tab === 'register' ? 'text-slate-900 dark:text-white' : 'text-slate-500 dark:text-zinc-400'
              }`}
            >
              Register
            </button>
          </motion.div>

          {/* Google SSO Button */}
          {tab !== 'forgot' && (
            <motion.div variants={itemVariants} className="mb-5">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="button"
                onClick={handleSubmit}
                className="w-full flex items-center justify-center space-x-3 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-850 text-xs font-semibold text-slate-700 dark:text-zinc-200 hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.37 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
                  />
                </svg>
                <span>Continue with Google Workspace</span>
              </motion.button>

              <div className="relative my-5 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-zinc-800" />
                </div>
                <span className="relative px-3 bg-white dark:bg-[#111114] text-[11px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
                  Or email
                </span>
              </div>
            </motion.div>
          )}

          {/* Form Fields container with layout transitions */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="popLayout">
              {tab === 'register' && (
                <motion.div
                  key="name-field"
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                >
                  <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Alex Rivera"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </motion.div>
              )}

              <motion.div key="email-field" layout>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1">
                  College Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.rivera@campus.edu"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </motion.div>

              {tab !== 'forgot' && (
                <motion.div key="password-field" layout>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300">
                      Password
                    </label>
                    {tab === 'login' && (
                      <button
                        type="button"
                        onClick={() => setTab('forgot')}
                        className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </motion.div>
              )}

              {/* Role Selection Persona with layout transition */}
              <motion.div key="role-field" layout>
                <label className="block text-xs font-semibold text-slate-700 dark:text-zinc-300 mb-1.5">
                  Select Persona Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { role: 'student' as UserRole, label: 'Student', icon: GraduationCap },
                    { role: 'professor' as UserRole, label: 'Professor', icon: UserCheck },
                    { role: 'admin' as UserRole, label: 'Admin', icon: ShieldCheck },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = selectedRole === item.role;
                    return (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        key={item.role}
                        type="button"
                        onClick={() => setSelectedRole(item.role)}
                        className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500'
                            : 'bg-slate-50 dark:bg-zinc-800/40 border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <Icon className="w-4 h-4 mb-1" />
                        <span>{item.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              layout
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={submitted}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-md shadow-indigo-600/10 transition-all cursor-pointer"
            >
              <span>{submitted ? 'Signing in...' : tab === 'login' ? 'Sign In to CampusCopilot' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
