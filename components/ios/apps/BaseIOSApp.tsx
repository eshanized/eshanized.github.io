"use client";

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MoreVertical, Share } from 'lucide-react';

interface BaseIOSAppProps {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  headerColor?: string;
  headerTextColor?: string;
  hasSearch?: boolean;
  rightAction?: 'more' | 'share' | ReactNode;
  onRightActionClick?: () => void;
}

export default function BaseIOSApp({
  title,
  children,
  onBack,
  headerColor = 'bg-white dark:bg-gray-900',
  headerTextColor = 'text-black dark:text-white',
  hasSearch = false,
  rightAction,
  onRightActionClick
}: BaseIOSAppProps) {
  return (
    <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-950">
      {/* iOS style header */}
      <header className={`${headerColor} py-3 px-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-800`}>
        {onBack ? (
          <button 
            className="text-blue-500 flex items-center"
            onClick={onBack}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span>Back</span>
          </button>
        ) : (
          <div className="w-16"></div> // Empty space for alignment
        )}
        
        <h1 className={`text-center font-semibold ${headerTextColor}`}>{title}</h1>
        
        <div className="w-16 flex justify-end">
          {rightAction === 'more' && (
            <button 
              className="p-1 text-blue-500"
              onClick={onRightActionClick}
            >
              <MoreVertical className="w-5 h-5" />
            </button>
          )}
          
          {rightAction === 'share' && (
            <button 
              className="p-1 text-blue-500"
              onClick={onRightActionClick}
            >
              <Share className="w-5 h-5" />
            </button>
          )}
          
          {rightAction && typeof rightAction !== 'string' && rightAction}
        </div>
      </header>
      
      {/* App content */}
      <motion.div 
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
} 