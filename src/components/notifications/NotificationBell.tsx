import React from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../../contexts/NotificationContext';
import { motion } from 'framer-motion';

interface NotificationBellProps {
  onClick: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ onClick }) => {
  const { unreadCount } = useNotifications();

  return (
    <button onClick={onClick} className="relative p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <Bell size={24} />
      {unreadCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center"
        >
          {unreadCount}
        </motion.span>
      )}
    </button>
  );
};

export default NotificationBell;
