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
  headerColor = 'bg-white/80 dark:bg-black/80',
  headerTextColor = 'text-black dark:text-white',
  hasSearch = false,
  rightAction,
  onRightActionClick
}: BaseMIUIAppProps) {
  const { isDarkMode } = useTheme();

  return (
    <motion.div 
      className="h-full flex flex-col bg-[#f2f2f7] dark:bg-[#000000] transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* MIUI style header with SF Pro font */}
      <header 
        className={`${headerColor} py-3 px-4 flex items-center justify-between border-b border-gray-200/60 dark:border-gray-800/30 backdrop-blur-md bg-opacity-80 dark:bg-opacity-80 transition-colors duration-300 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-black/60`}
      >
        {onBack ? (
          <motion.button 
            className="text-blue-500 dark:text-blue-400 flex items-center font-[system-ui] text-[17px] -ml-1"
            onClick={onBack}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.1 }}
          >
            <ArrowLeft className="w-4 h-4 mr-1 stroke-[2.5px]" />
            <span>Back</span>
          </motion.button>
        ) : (
          <div className="w-24"></div> // Empty space for alignment
        )}
        
        <motion.h1 
          className={`text-center font-semibold ${headerTextColor} text-[17px] tracking-tight font-[system-ui] transition-colors duration-300`}
          initial={{ y: -5, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h1>
        
        <div className="w-24 flex justify-end">
          {rightAction === 'more' && (
            <motion.button 
              className="p-1.5 text-blue-500 dark:text-blue-400"
              onClick={onRightActionClick}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
            >
              <MoreVertical className="w-5 h-5 stroke-[2px]" />
            </motion.button>
          )}
          
          {rightAction === 'share' && (
            <motion.button 
              className="p-1.5 text-blue-500 dark:text-blue-400"
              onClick={onRightActionClick}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.1 }}
            >
              <Share className="w-5 h-5 stroke-[2px]" />
            </motion.button>
          )}
          
          {rightAction && typeof rightAction !== 'string' && rightAction}
        </div>
      </header>
      
      {/* App content with MIUI-style animations */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={title}
          className="flex-1 overflow-y-auto overscroll-bounce bg-[#f2f2f7] dark:bg-black transition-colors duration-300"
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