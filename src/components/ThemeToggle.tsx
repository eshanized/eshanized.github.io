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
      className="fixed top-4 right-24 z-50 p-3 rounded-full bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 text-white hover:bg-white/20 transition-colors"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </motion.button>
  );
}