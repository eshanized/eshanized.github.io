"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MoreVertical, Share, Home, Square, Circle } from 'lucide-react';
import { useOneUITheme } from '../OneUIThemeContext';
import { useRouter } from 'next/navigation';

interface BaseOneUIAppProps {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  headerColor?: string;
  headerTextColor?: string;
  hasSearch?: boolean;
  rightAction?: 'more' | 'share' | ReactNode;
  onRightActionClick?: () => void;
  showHeader?: boolean;
}

export default function BaseOneUIApp({
  title,
  children,
  onBack,
  headerColor,
  headerTextColor,
  hasSearch = false,
  rightAction,
  onRightActionClick,
  showHeader = false
}: BaseOneUIAppProps) {
  const { colors, isDarkMode } = useOneUITheme();
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
    recentAppsContent.className = 'w-full max-w-md p-5 space-y-3';
    
    // Add recent apps buttons
    recentApps.reverse().forEach(path => {
      const appButton = document.createElement('button');
      appButton.className = 'w-full p-4 bg-white/10 rounded-[1.25rem] text-white text-left hover:bg-white/20 transition-colors';
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
    closeButton.className = 'absolute top-5 right-5 p-2 text-white/70 hover:text-white rounded-full';
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
      {/* OneUI style header - only show if showHeader is true */}
      {showHeader && (
        <header 
          className={`${headerColor || colors.secondary} py-4 px-5 flex items-center justify-between transition-colors duration-300`}
          style={{ minHeight: '64px' }}
        >
          <div className="flex items-center flex-1">
            {onBack && (
              <motion.button 
                className={`${colors.textPrimary} p-1.5 -ml-2 rounded-full hover:${colors.ripple}`}
                onClick={onBack}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.button>
            )}
            
            <motion.h1 
              className={`${headerTextColor || colors.textPrimary} text-xl font-medium ml-2 transition-colors duration-300`}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.h1>
          </div>
          
          <div className="flex items-center gap-3">
            {rightAction === 'more' && (
              <motion.button 
                className={`p-2.5 ${colors.textPrimary} hover:${colors.ripple} rounded-full`}
                onClick={onRightActionClick}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                <MoreVertical className="w-5 h-5" />
              </motion.button>
            )}
            
            {rightAction === 'share' && (
              <motion.button 
                className={`p-2.5 ${colors.textPrimary} hover:${colors.ripple} rounded-full`}
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
      )}
      
      {/* App content with OneUI-style animations */}
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
    </motion.div>
  );
} 