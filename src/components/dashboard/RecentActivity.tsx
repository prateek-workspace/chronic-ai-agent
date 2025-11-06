import React from 'react';
import { motion } from 'framer-motion';
import { Activity as ActivityIcon, Footprints, Pill } from 'lucide-react';
import { Activity } from '../../lib/mockData';

interface RecentActivityProps {
  activities: Activity[];
}

const iconMap = {
  log: <ActivityIcon className="w-5 h-5 text-blue-500" />,
  walk: <Footprints className="w-5 h-5 text-green-500" />,
  medication: <Pill className="w-5 h-5 text-purple-500" />,
};

const RecentActivity: React.FC<RecentActivityProps> = ({ activities }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md"
    >
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-center">
            <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-full">
              {iconMap[activity.icon]}
            </div>
            <div className="ml-4 flex-1">
              <p className="font-semibold text-gray-700 dark:text-gray-200">{activity.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default RecentActivity;
