"use client";

import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MoreVertical, Share } from 'lucide-react';
import { useTheme } from '../ThemeContext';

interface BaseMIUIAppProps {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  headerColor?: string;
  headerTextColor?: string;
  hasSearch?: boolean;
  rightAction?: 'more' | 'share' | ReactNode;
  onRightActionClick?: () => void;
}

export default function BaseMIUIApp({
  title,
  children,
  onBack,
  headerColor = 'bg-white dark:bg-gray-900',
  headerTextColor = 'text-gray-900 dark:text-white',
  hasSearch = false,
  rightAction,
  onRightActionClick
}: BaseMIUIAppProps) {
  const { isDarkMode } = useTheme();

  return (
    <motion.div 
      className="h-full flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* MIUI style header */}
      <header 
        className={`${headerColor} py-3 px-4 flex items-center justify-between transition-colors duration-300`}
        style={{ minHeight: '56px' }}
      >
        <div className="flex items-center flex-1">
          {onBack && (
            <motion.button 
              className="text-gray-700 dark:text-gray-200 p-1 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              onClick={onBack}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
          )}
          
          <motion.h1 
            className={`${headerTextColor} text-lg font-medium ml-2 transition-colors duration-300`}
            initial={{ y: -5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.h1>
        </div>
        
        <div className="flex items-center gap-2">
          {rightAction === 'more' && (
            <motion.button 
              className="p-2 text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 rounded-full"
              onClick={onRightActionClick}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>
          )}
          
          {rightAction === 'share' && (
            <motion.button 
              className="p-2 text-gray-700 dark:text-gray-200 hover:bg-black/5 dark:hover:bg-white/10 rounded-full"
              onClick={onRightActionClick}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <Share className="w-5 h-5" />
            </motion.button>
          )}
          
          {rightAction && typeof rightAction !== 'string' && (
            <div className="text-gray-700 dark:text-gray-200">
              {rightAction}
            </div>
          )}
        </div>
      </header>
      
      {/* App content with MIUI-style animations */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={title}
          className="flex-1 overflow-y-auto overscroll-bounce bg-gray-50 dark:bg-gray-900 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            mass: 1
          }}
          style={{ 
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
} 