import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff } from 'lucide-react';

const devices = [
  { name: 'Apple Health', icon: '🍎', connected: true },
  { name: 'Google Fit', icon: '🇬', connected: false },
  { name: 'Fitbit', icon: '👣', connected: false },
  { name: 'Samsung Health', icon: '🇸', connected: false },
  { name: 'Garmin Connect', icon: '🏃‍♂️', connected: true },
  { name: 'Withings', icon: '⚖️', connected: false },
];

const Devices: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Connect Your Devices</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Sync your health data automatically from your favorite apps and devices.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device, index) => (
          <motion.div
            key={device.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start">
                <span className="text-4xl">{device.icon}</span>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  device.connected 
                    ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-300' 
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {device.connected ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mt-4">{device.name}</h2>
            </div>
            <button className={`w-full mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
              device.connected
                ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-500/20 dark:text-red-300 dark:hover:bg-red-500/30'
                : 'bg-brand-primary text-white hover:bg-opacity-90'
            }`}>
              {device.connected ? <WifiOff size={18} /> : <Wifi size={18} />}
              <span>{device.connected ? 'Disconnect' : 'Connect'}</span>
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Devices;
