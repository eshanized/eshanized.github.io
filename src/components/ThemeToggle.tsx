import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

export function ThemeToggle({ isDark, toggle }: ThemeToggleProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      className="fixed right-24 top-4 z-50 rounded-full border border-white/20 bg-white/10 p-3 text-white shadow-lg backdrop-blur-lg transition-colors hover:bg-white/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}
