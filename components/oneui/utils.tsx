"use client";

import { motion } from 'framer-motion';
import React from 'react';
import { useOneUITheme } from './OneUIThemeContext';

// OneUI App Icon component for consistent styling
export const OneUIAppIcon: React.FC<{
  color: string;
  icon: React.ReactNode;
  badgeCount?: number;
  size?: 'sm' | 'md' | 'lg';
}> = ({ color, icon, badgeCount, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };
  
  const iconSizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`${sizeClasses[size]} ${color} rounded-[1.25rem] flex items-center justify-center relative transition-colors duration-300 shadow-sm`}>
      <div className={iconSizeClasses[size]}>{icon}</div>
      {badgeCount && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 dark:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-medium px-1 transition-colors duration-300">
          {badgeCount}
        </span>
      )}
    </div>
  );
};

// OneUI Status Bar component
export const OneUIStatusBar: React.FC<{
  time: string;
  showWifi?: boolean;
  showBattery?: boolean;
  batteryLevel?: number;
}> = ({ time, showWifi = true, showBattery = true, batteryLevel = 85 }) => {
  const { isDarkMode } = useOneUITheme();
  
  return (
    <div className="w-full px-5 py-3 flex justify-between items-center text-black dark:text-white transition-colors duration-300">
      <div className="font-medium">{time}</div>
      <div className="flex items-center gap-3">
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

// OneUI Button component
export const OneUIButton: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
}> = ({ children, onClick, variant = 'primary', fullWidth = false }) => {
  const { isDarkMode } = useOneUITheme();
  
  const variantClasses = {
    primary: isDarkMode 
      ? 'bg-[#0077FF] text-white' 
      : 'bg-[#0077FF] text-white',
    secondary: isDarkMode 
      ? 'bg-[#282828] text-white' 
      : 'bg-[#F0F0F0] text-black'
  };
  
  return (
    <motion.button
      className={`${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} py-3 px-6 rounded-[1.25rem] font-medium text-sm transition-colors duration-300`}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};

// OneUI Folder component
export const OneUIFolder: React.FC<{
  name: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}> = ({ name, children, isOpen, onClose }) => {
  const { isDarkMode } = useOneUITheme();
  
  return (
    <motion.div
      className={`fixed inset-0 z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      initial={false}
      animate={{ backgroundColor: isOpen ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] bg-white/30 dark:bg-black/30 backdrop-blur-xl oneui-blur rounded-[1.75rem] p-5 transition-colors duration-300"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isOpen ? 1 : 0.8, 
          opacity: isOpen ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-center text-black dark:text-white font-medium mb-4 transition-colors duration-300">{name}</h3>
        <div className="grid grid-cols-3 gap-5">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

// OneUI Card component
export const OneUICard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const { colors } = useOneUITheme();
  
  return (
    <div className={`${colors.cardBg} rounded-[1.5rem] p-5 ${colors.divider} ${className}`}>
      {children}
    </div>
  );
};

// OneUI List Item component
export const OneUIListItem: React.FC<{
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  onClick?: () => void;
}> = ({ title, subtitle, leftIcon, rightElement, onClick }) => {
  const { colors } = useOneUITheme();
  
  return (
    <div 
      className={`flex items-center px-5 py-4 ${onClick ? 'cursor-pointer active:bg-black/5 dark:active:bg-white/5' : ''}`}
      onClick={onClick}
    >
      {leftIcon && (
        <div className="mr-4">
          {leftIcon}
        </div>
      )}
      <div className="flex-1">
        <div className={`${colors.textPrimary} font-medium`}>{title}</div>
        {subtitle && <div className={`${colors.textSecondary} text-sm mt-0.5`}>{subtitle}</div>}
      </div>
      {rightElement && <div>{rightElement}</div>}
    </div>
  );
};

// OneUI Home Indicator
export const OneUIHomeIndicator: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  return (
    <div className="h-10 flex items-center justify-center">
      <div 
        className="w-32 h-1.5 bg-black/20 dark:bg-white/20 rounded-full cursor-pointer transition-colors duration-300"
        onClick={onClick}
      ></div>
    </div>
  );
}; 