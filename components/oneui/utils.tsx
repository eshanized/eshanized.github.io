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
  onClick?: () => void;
}> = ({ color, icon, badgeCount, size = 'md', onClick }) => {
  const { borderRadius, animation } = useOneUITheme();
  
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
    <motion.div 
      className={`${sizeClasses[size]} ${color} ${borderRadius.xl} flex items-center justify-center relative ${animation.default} shadow-sm`}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <div className={iconSizeClasses[size]}>{icon}</div>
      {badgeCount && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 bg-red-500 dark:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-medium px-1 shadow-sm">
          {badgeCount}
        </span>
      )}
    </motion.div>
  );
};

// OneUI Status Bar component
export const OneUIStatusBar: React.FC<{
  time: string;
  showWifi?: boolean;
  showBattery?: boolean;
  batteryLevel?: number;
}> = ({ time, showWifi = true, showBattery = true, batteryLevel = 85 }) => {
  const { colors, animation } = useOneUITheme();
  
  return (
    <div className={`w-full px-5 py-3 flex justify-between items-center ${colors.textPrimary} ${animation.default}`}>
      <div className="font-medium">{time}</div>
      <div className="flex items-center gap-3">
        {/* Signal strength */}
        <div className="flex gap-[2px] items-end h-3">
          <div className="h-1.5 w-1 bg-green-500 dark:bg-green-400 rounded-sm"></div>
          <div className="h-2 w-1 bg-green-500 dark:bg-green-400 rounded-sm"></div>
          <div className="h-2.5 w-1 bg-green-500 dark:bg-green-400 rounded-sm"></div>
          <div className="h-3 w-1 bg-green-500 dark:bg-green-400 rounded-sm"></div>
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
            <div className="relative w-6 h-3 border border-current rounded-sm flex items-center">
              <div 
                className="absolute left-0 top-0 bottom-0 bg-green-500 dark:bg-green-400 rounded-sm" 
                style={{ width: `${batteryLevel}%` }}
              ></div>
              <div className="absolute -right-[2px] top-1/2 -translate-y-1/2 w-[2px] h-2 bg-current rounded-r-sm"></div>
            </div>
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
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  fullWidth = false, 
  disabled = false,
  size = 'md'
}) => {
  const { isDarkMode, colors, borderRadius, animation } = useOneUITheme();
  
  const variantClasses = {
    primary: isDarkMode 
      ? 'bg-[#0077FF] text-white hover:bg-[#0066DD] active:bg-[#0055CC]' 
      : 'bg-[#0077FF] text-white hover:bg-[#0066DD] active:bg-[#0055CC]',
    secondary: isDarkMode 
      ? 'bg-[#282828] text-white hover:bg-[#333333] active:bg-[#222222]' 
      : 'bg-[#F0F0F0] text-black hover:bg-[#E5E5E5] active:bg-[#DADADA]',
    outline: isDarkMode
      ? 'bg-transparent border border-[#444444] text-white hover:bg-[#282828]'
      : 'bg-transparent border border-[#DDDDDD] text-black hover:bg-[#F5F5F5]'
  };
  
  const sizeClasses = {
    sm: 'py-2 px-4 text-xs',
    md: 'py-3 px-6 text-sm',
    lg: 'py-4 px-8 text-base'
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';
  
  return (
    <motion.button
      className={`${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} 
        ${borderRadius.xl} font-medium ${animation.default} ${disabledClasses}`}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
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
  const { colors, borderRadius, animation } = useOneUITheme();
  
  return (
    <motion.div
      className={`fixed inset-0 z-40 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      initial={false}
      animate={{ backgroundColor: isOpen ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] 
          ${colors.secondary} bg-opacity-90 dark:bg-opacity-90 backdrop-blur-xl ${borderRadius.xl} 
          p-5 ${colors.shadow} ${animation.default}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: isOpen ? 1 : 0.8, 
          opacity: isOpen ? 1 : 0,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={`text-center ${colors.textPrimary} font-medium mb-4`}>{name}</h3>
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
  onClick?: () => void;
  elevated?: boolean;
}> = ({ children, className = '', onClick, elevated = false }) => {
  const { colors, borderRadius, animation } = useOneUITheme();
  
  return (
    <motion.div 
      className={`${colors.cardBg} ${borderRadius.xl} p-5 border ${colors.divider} ${className}
        ${elevated ? colors.shadow : ''} ${onClick ? 'cursor-pointer' : ''} ${animation.default}`}
      whileTap={onClick ? { scale: 0.98 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

// OneUI List Item component
export const OneUIListItem: React.FC<{
  title: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  onClick?: () => void;
  divider?: boolean;
}> = ({ title, subtitle, leftIcon, rightElement, onClick, divider = true }) => {
  const { colors, animation } = useOneUITheme();
  
  return (
    <motion.div 
      className={`flex items-center px-5 py-4 ${onClick ? 'cursor-pointer' : ''} 
        ${divider ? `border-b ${colors.divider}` : ''} ${animation.fast}`}
      whileTap={onClick ? { backgroundColor: 'rgba(0,0,0,0.05)' } : {}}
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
    </motion.div>
  );
};

// OneUI Home Indicator
export const OneUIHomeIndicator: React.FC<{ onClick?: () => void }> = ({ onClick }) => {
  const { colors, animation } = useOneUITheme();
  
  return (
    <div className="h-10 flex items-center justify-center">
      <motion.div 
        className={`w-32 h-1.5 bg-black/20 dark:bg-white/20 rounded-full cursor-pointer ${animation.default}`}
        whileHover={{ width: '140px' }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
      ></motion.div>
    </div>
  );
};

// OneUI Switch component
export const OneUISwitch: React.FC<{
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}> = ({ checked, onChange, disabled = false }) => {
  const { colors, animation } = useOneUITheme();
  
  return (
    <div 
      className={`relative inline-block w-12 h-6 ${disabled ? 'opacity-50' : ''}`}
      onClick={!disabled ? onChange : undefined}
    >
      <div 
        className={`w-full h-full rounded-full ${checked ? colors.toggleActive : colors.toggleInactive} ${animation.default} cursor-pointer`}
      />
      <div 
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform ${animation.default}
          ${checked ? 'translate-x-6' : ''}`}
      />
    </div>
  );
};

// OneUI Badge component
export const OneUIBadge: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'success' | 'warning' | 'error';
}> = ({ children, variant = 'primary' }) => {
  const { borderRadius } = useOneUITheme();
  
  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-black',
    error: 'bg-red-500 text-white'
  };
  
  return (
    <span className={`${variantClasses[variant]} ${borderRadius.sm} px-2 py-0.5 text-xs font-medium`}>
      {children}
    </span>
  );
}; 