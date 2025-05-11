"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MoreVertical, Share, Home, Square, Circle } from 'lucide-react';
import { useMIUITheme } from '../MIUIThemeContext';
import { useRouter } from 'next/navigation';

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
  headerColor,
  headerTextColor,
  hasSearch = false,
  rightAction,
  onRightActionClick
}: BaseMIUIAppProps) {
  const { colors, isDarkMode } = useMIUITheme();
  const router = useRouter();
  const [recentApps, setRecentApps] = useState<string[]>([]);
  const [isRecentOpen, setIsRecentOpen] = useState(false);

  // Track recent apps
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (!currentPath.includes('_next') && !recentApps.includes(currentPath)) {
      setRecentApps(prev => [...prev, currentPath].slice(-5)); // Keep last 5 apps
    }
  }, []);

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleRecentClick = () => {
    setIsRecentOpen(true);
    // Show recent apps overlay
    const recentAppsOverlay = document.createElement('div');
    recentAppsOverlay.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center';
    
    const recentAppsContent = document.createElement('div');
    recentAppsContent.className = 'w-full max-w-md p-4 space-y-2';
    
    // Add recent apps buttons
    recentApps.reverse().forEach(path => {
      const appButton = document.createElement('button');
      appButton.className = 'w-full p-4 bg-white/10 rounded-lg text-white text-left hover:bg-white/20 transition-colors';
      appButton.textContent = path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2);
      appButton.onclick = () => {
        router.push(path);
        document.body.removeChild(recentAppsOverlay);
        setIsRecentOpen(false);
      };
      recentAppsContent.appendChild(appButton);
    });
    
    // Add close button
    const closeButton = document.createElement('button');
    closeButton.className = 'absolute top-4 right-4 p-2 text-white/70 hover:text-white rounded-full';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => {
      document.body.removeChild(recentAppsOverlay);
      setIsRecentOpen(false);
    };
    
    recentAppsOverlay.appendChild(recentAppsContent);
    recentAppsOverlay.appendChild(closeButton);
    document.body.appendChild(recentAppsOverlay);
    
    // Close on backdrop click
    recentAppsOverlay.addEventListener('click', (e) => {
      if (e.target === recentAppsOverlay) {
        document.body.removeChild(recentAppsOverlay);
        setIsRecentOpen(false);
      }
    });
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else if (window.history.length > 1) {
      router.back();
    }
  };

  return (
    <motion.div 
      className={`h-full flex flex-col ${colors.secondary} transition-colors duration-300`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* MIUI style header */}
      <header 
        className={`${headerColor || colors.secondary} py-3 px-4 flex items-center justify-between transition-colors duration-300`}
        style={{ minHeight: '56px' }}
      >
        <div className="flex items-center flex-1">
          {onBack && (
            <motion.button 
              className={`${colors.textPrimary} p-1 -ml-2 rounded-full hover:${colors.ripple}`}
              onClick={onBack}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <ArrowLeft className="w-6 h-6" />
            </motion.button>
          )}
          
          <motion.h1 
            className={`${headerTextColor || colors.textPrimary} text-lg font-medium ml-2 transition-colors duration-300`}
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
              className={`p-2 ${colors.textPrimary} hover:${colors.ripple} rounded-full`}
              onClick={onRightActionClick}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <MoreVertical className="w-5 h-5" />
            </motion.button>
          )}
          
          {rightAction === 'share' && (
            <motion.button 
              className={`p-2 ${colors.textPrimary} hover:${colors.ripple} rounded-full`}
              onClick={onRightActionClick}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <Share className="w-5 h-5" />
            </motion.button>
          )}
          
          {rightAction && typeof rightAction !== 'string' && (
            <div className={colors.textPrimary}>
              {rightAction}
            </div>
          )}
        </div>
      </header>
      
      {/* App content with MIUI-style animations */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={title}
          className={`flex-1 overflow-y-auto overscroll-bounce ${colors.primary} transition-colors duration-300`}
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

      {/* MIUI Navigation Bar */}
      <div className={`h-[48px] ${colors.navBar} backdrop-blur-lg flex items-center justify-around px-6 border-t ${colors.divider}`}>
        <motion.button
          className="w-6 h-6 text-white/70 hover:text-white"
          onClick={handleBackClick}
          whileTap={{ scale: 0.9 }}
        >
          <Circle className="w-5 h-5" strokeWidth={1.5} />
        </motion.button>

        <motion.button
          className="w-6 h-6 text-white/70 hover:text-white"
          onClick={handleHomeClick}
          whileTap={{ scale: 0.9 }}
        >
          <Home className="w-5 h-5" strokeWidth={1.5} />
        </motion.button>

        <motion.button
          className={`w-6 h-6 ${isRecentOpen ? 'text-white' : 'text-white/70 hover:text-white'}`}
          onClick={handleRecentClick}
          whileTap={{ scale: 0.9 }}
        >
          <Square className="w-5 h-5" strokeWidth={1.5} />
        </motion.button>
      </div>
    </motion.div>
  );
} 