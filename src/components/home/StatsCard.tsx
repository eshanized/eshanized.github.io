import React from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  delay?: number;
}

function StatsCard({ icon, label, value, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-nord-polar-2 rounded-xl p-6 shadow-lg flex items-center gap-6 border border-gray-100 dark:border-nord-polar-3 transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <div className="p-4 bg-primary-100 dark:bg-nord-polar-3 rounded-lg shadow-md transition-transform transform hover:scale-110">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
    </motion.div>
  );
}

export default StatsCard;