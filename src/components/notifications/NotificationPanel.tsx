import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNotifications } from '../../contexts/NotificationContext';
import NotificationItem from './NotificationItem';
import { BellOff } from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead } = useNotifications();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 z-40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col"
          >
            <header className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Notifications</h2>
              <button
                onClick={markAllAsRead}
                className="text-sm font-semibold text-brand-primary hover:underline"
              >
                Mark all as read
              </button>
            </header>
            <div className="flex-grow overflow-y-auto">
              {notifications.length > 0 ? (
                <ul>
                  <AnimatePresence>
                    {notifications.map(n => (
                      <NotificationItem key={n.id} notification={n} onMarkAsRead={markAsRead} onItemClick={onClose} />
                    ))}
                  </AnimatePresence>
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <BellOff size={48} />
                  <p className="mt-4 font-semibold">No notifications</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;
