import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, Trash2, X, AlertTriangle, BookOpen, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationAsRead, clearAllNotifications } = useApp();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs">
        <div className="absolute inset-0" onClick={onClose} />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="absolute inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-[#121215] border-l border-slate-200 dark:border-zinc-800 shadow-2xl flex flex-col z-50 select-none"
        >
          {/* Drawer Header */}
          <div className="p-4 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-indigo-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                Notifications
              </h2>
            </div>
            <div className="flex items-center space-x-1">
              {notifications.length > 0 && (
                <button
                  onClick={clearAllNotifications}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
                  title="Clear all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {notifications.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 dark:text-zinc-500">
                No new notifications
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => markNotificationAsRead(n.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    n.read
                      ? 'bg-slate-50 dark:bg-zinc-900/40 border-slate-200 dark:border-zinc-800/60 opacity-60'
                      : 'bg-white dark:bg-zinc-900 border-indigo-500/30 shadow-xs'
                  }`}
                >
                  <div className="flex items-start space-x-2.5">
                    {n.type === 'attendance' && <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                    {n.type === 'exam' && <BookOpen className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />}
                    {n.type === 'assignment' && <Sparkles className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />}
                    {(n.type === 'class' || n.type === 'announcement') && <Bell className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {n.title}
                      </h3>
                      <p className="text-[11px] text-slate-600 dark:text-zinc-400 mt-0.5 leading-snug">
                        {n.message}
                      </p>
                      <span className="text-[10px] font-mono text-slate-400 dark:text-zinc-500 mt-1 block">
                        {n.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
