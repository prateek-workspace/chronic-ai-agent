import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Lightbulb, Info, X } from 'lucide-react';
import { Notification, NotificationType } from '../../types/notifications';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onItemClick: () => void;
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  alert: <AlertTriangle className="w-5 h-5 text-red-500" />,
  advice: <Lightbulb className="w-5 h-5 text-yellow-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkAsRead, onItemClick }) => {
  const timeAgo = formatDistanceToNow(notification.timestamp, { addSuffix: true });
  const navigate = useNavigate();

  const handleClick = () => {
    if (notification.link) {
      navigate(notification.link);
      onItemClick(); // Close the panel
    }
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`p-4 flex items-start gap-4 border-b border-gray-200 dark:border-gray-700 ${
        !notification.read ? 'bg-brand-primary/5 dark:bg-brand-primary/10' : ''
      } ${notification.link ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700/50' : ''}`}
      onClick={handleClick}
    >
      {!notification.read && <div className="w-2 h-2 mt-2 rounded-full bg-brand-primary flex-shrink-0"></div>}
      <div className={`flex-shrink-0 ${notification.read ? 'ml-4' : ''}`}>
        {iconMap[notification.type]}
      </div>
      <div className="flex-grow">
        <h4 className="font-bold text-gray-800 dark:text-white">{notification.title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{timeAgo}</p>
      </div>
      {!notification.read && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent navigation when marking as read
            onMarkAsRead(notification.id);
          }}
          className="p-1 rounded-full text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 z-10"
          aria-label="Mark as read"
        >
          <X size={16} />
        </button>
      )}
    </motion.li>
  );
};

export default NotificationItem;
