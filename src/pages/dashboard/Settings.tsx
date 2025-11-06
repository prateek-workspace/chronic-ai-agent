import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, Palette, Trash2 } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';
import { useTheme } from '../../hooks/useTheme';

const Settings: React.FC = () => {
    const [theme, toggleTheme] = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-10"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>

      {/* Notification Settings */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-6 h-6 text-brand-primary" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Notifications</h2>
        </div>
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label htmlFor="email-notifications" className="font-medium text-gray-700 dark:text-gray-300">Email Notifications</label>
                <input type="checkbox" id="email-notifications" className="toggle-checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
                <label htmlFor="sms-notifications" className="font-medium text-gray-700 dark:text-gray-300">SMS Alerts (for critical events)</label>
                <input type="checkbox" id="sms-notifications" className="toggle-checkbox" />
            </div>
        </div>
      </div>

      {/* Appearance Settings */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="w-6 h-6 text-brand-primary" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Appearance</h2>
        </div>
        <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700 dark:text-gray-300">Theme</span>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="w-6 h-6 text-brand-primary" />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Security</h2>
        </div>
        <button className="w-full md:w-auto px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Change Password
        </button>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 dark:bg-red-500/10 p-8 rounded-2xl shadow-lg border border-red-200 dark:border-red-500/20">
        <div className="flex items-center gap-3 mb-6">
          <Trash2 className="w-6 h-6 text-red-500" />
          <h2 className="text-2xl font-bold text-red-700 dark:text-red-300">Danger Zone</h2>
        </div>
        <p className="text-red-600 dark:text-red-200 mb-4">
            Deleting your account is permanent and cannot be undone. All your health data will be permanently removed.
        </p>
        <button className="w-full md:w-auto px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors">
            Delete My Account
        </button>
      </div>
      
      <style>{`
        .toggle-checkbox {
          appearance: none;
          width: 3.5rem;
          height: 1.75rem;
          border-radius: 9999px;
          background-color: #d1d5db; /* gray-300 */
          position: relative;
          transition: background-color 0.2s ease-in-out;
          cursor: pointer;
        }
        .dark .toggle-checkbox {
            background-color: #4b5563; /* gray-600 */
        }
        .toggle-checkbox:checked {
          background-color: #5C2E91; /* brand-primary */
        }
        .toggle-checkbox::before {
          content: '';
          position: absolute;
          left: 0.25rem;
          top: 0.25rem;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 9999px;
          background-color: white;
          transition: transform 0.2s ease-in-out;
        }
        .toggle-checkbox:checked::before {
          transform: translateX(1.75rem);
        }
      `}</style>
    </motion.div>
  );
};

export default Settings;
