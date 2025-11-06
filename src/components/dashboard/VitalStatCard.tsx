import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { VitalCardData } from '../../lib/dataProcessor';

interface VitalStatCardProps {
  vital: VitalCardData;
  index: number;
}

const iconMap = {
  up: <ArrowUp className="w-4 h-4 text-red-500" />,
  down: <ArrowDown className="w-4 h-4 text-green-500" />,
  stable: <Minus className="w-4 h-4 text-gray-500" />,
};

const VitalStatCard: React.FC<VitalStatCardProps> = ({ vital, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex justify-between items-start">
        <h3 className="font-semibold text-gray-600 dark:text-gray-300 capitalize">{vital.name.replace('_', ' ')}</h3>
        <div className={`p-2 rounded-full ${
          vital.trend === 'up' ? 'bg-red-100 dark:bg-red-500/20' : 
          vital.trend === 'down' ? 'bg-green-100 dark:bg-green-500/20' : 
          'bg-gray-100 dark:bg-gray-700'
        }`}>
          {iconMap[vital.trend]}
        </div>
      </div>
      <div className="mt-2">
        <span className="text-4xl font-bold text-gray-800 dark:text-white">{vital.value}</span>
        <span className="ml-2 text-gray-500 dark:text-gray-400">{vital.unit}</span>
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 h-4">{vital.change}</p>
    </motion.div>
  );
};

export default VitalStatCard;
