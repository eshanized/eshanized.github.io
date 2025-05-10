"use client";

import { motion } from 'framer-motion';
import React from 'react';
import { useTheme } from './ThemeContext';

// iOS App Icon component for consistent styling
export const IOSAppIcon: React.FC<{
  color: string;
  icon: React.ReactNode;
  badgeCount?: number;
  size?: 'sm' | 'md' | 'lg';
}> = ({ color, icon, badgeCount, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-11 h-11',
    md: 'w-15 h-15',
    lg: 'w-16 h-16'
  };
  
  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-9 h-9',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`${sizeClasses[size]} ${color} rounded-2xl flex items-center justify-center relative transition-colors duration-300`}>
      <div className={iconSizeClasses[size]}>{icon}</div>
      {badgeCount && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 dark:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300">
          {badgeCount}
        </span>
      )}
    </div>
  );
};

// iOS Status Bar component
export const IOSStatusBar: React.FC<{
  time: string;
  showWifi?: boolean;
  showBattery?: boolean;
  batteryLevel?: number;
}> = ({ time, showWifi = true, showBattery = true, batteryLevel = 85 }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="w-full px-4 py-2 flex justify-between items-center text-black dark:text-white transition-colors duration-300">
      <div>{time}</div>
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          <div className="h-2.5 w-2.5 bg-green-500 dark:bg-green-400 rounded-full transition-colors duration-300"></div>
          <div className="h-2.5 w-2.5 bg-green-500 dark:bg-green-400 rounded-full transition-colors duration-300"></div>
          <div className="h-2.5 w-2.5 bg-green-500 dark:bg-green-400 rounded-full transition-colors duration-300"></div>
        </div>
        {showWifi && (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
        )}
        {showBattery && (
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
              <line x1="23" y1="13" x2="23" y2="11"></line>
            </svg>
            <span className="text-xs ml-1">{batteryLevel}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

// iOS Button component
export const IOSButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}> = ({ children, onClick, variant = 'primary', fullWidth = false }) => {
  const variantClasses = {
    primary: 'bg-blue-500 dark:bg-blue-600 text-white',
    secondary: 'bg-white/10 dark:bg-black/10 backdrop-blur-md text-black dark:text-white'
  };
  
  return (
    <motion.button
      className={`${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} py-2.5 px-6 rounded-full font-medium text-sm ios-blur transition-colors duration-300`}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// iOS Folder component
export const IOSFolder: React.FC<{
  name: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}> = ({ name, children, isOpen, onClose }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      className={`fixed inset-0 z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      initial={false}
      animate={{ backgroundColor: isOpen ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] bg-white/30 dark:bg-black/30 backdrop-blur-xl ios-blur rounded-3xl p-4 transition-colors duration-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isOpen ? 1 : 0.8, 
          opacity: isOpen ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center text-black dark:text-white font-medium mb-3 transition-colors duration-300">{name}</h3>
        <div className="grid grid-cols-3 gap-4">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

// iOS Home Indicator
export const IOSHomeIndicator: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div className="h-8 flex items-center justify-center">
      <div 
        className="w-32 h-1 bg-black/20 dark:bg-white/20 rounded-full cursor-pointer transition-colors duration-300"
        onClick={onClick}
      ></div>
    </div>
  );
}; 