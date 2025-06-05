"use client";

import React, { ReactNode, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MoreVertical, Share, Home, Square, Circle, Search, X } from 'lucide-react';
import { useOneUITheme } from '../OneUIThemeContext';
import { useRouter } from 'next/navigation';

interface BaseOneUIAppProps {
  title: string;
  children: ReactNode;
  onBack?: () => void;
  headerColor?: string;
  headerTextColor?: string;
  hasSearch?: boolean;
  rightAction?: 'more' | 'share' | 'search' | ReactNode;
  onRightActionClick?: () => void;
  showHeader?: boolean;
  fullScreen?: boolean;
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
  showHeader = true,
  fullScreen = false
}: BaseOneUIAppProps) {
  const { colors, borderRadius, animation } = useOneUITheme();
  const router = useRouter();
  const [recentApps, setRecentApps] = useState<string[]>([]);
  const [isRecentOpen, setIsRecentOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else if (window.history.length > 1) {
      router.back();
    }
  };

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const renderRecentApps = () => {
    return (
      <AnimatePresence>
        {isRecentOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsRecentOpen(false)}
          >
            <motion.div
              className={`w-full max-w-md p-5 space-y-3`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {recentApps.length > 0 ? (
                <>
                  <h2 className="text-white text-lg font-medium mb-3">Recent Apps</h2>
                  {recentApps.slice().reverse().map((path, index) => (
                    <motion.button
                      key={index}
                      className={`w-full p-4 bg-white/10 ${borderRadius.lg} text-white text-left hover:bg-white/20 ${animation.default}`}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        router.push(path);
                        setIsRecentOpen(false);
                      }}
                    >
                      {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                    </motion.button>
                  ))}
                </>
              ) : (
                <p className="text-white text-center">No recent apps</p>
              )}
              <motion.button
                className={`w-full mt-4 p-4 bg-white/20 ${borderRadius.lg} text-white text-center font-medium ${animation.default}`}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRecentOpen(false)}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  const renderSearchOverlay = () => {
    return (
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className={`fixed inset-0 z-50 ${colors.secondary}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className={`p-4 ${colors.primary} shadow-sm`}>
              <div className={`flex items-center ${borderRadius.lg} bg-white/10 dark:bg-black/20 px-3 py-2`}>
                <Search className={`w-5 h-5 ${colors.textSecondary} mr-2`} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`bg-transparent outline-none flex-1 ${colors.textPrimary}`}
                  autoFocus
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')}>
                    <X className={`w-5 h-5 ${colors.textSecondary}`} />
                  </button>
                )}
              </div>
            </div>
            <div className="p-4">
              {/* Search results would go here */}
              {searchQuery ? (
                <p className={`text-center ${colors.textSecondary} py-8`}>
                  Searching for "{searchQuery}"...
                </p>
              ) : (
                <div className={`text-center ${colors.textSecondary} py-8`}>
                  <p>Enter your search query</p>
                </div>
              )}
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center">
              <motion.button
                className={`px-8 py-3 ${colors.buttonBg} ${colors.textPrimary} ${borderRadius.lg} font-medium ${animation.default}`}
                whileTap={{ scale: 0.95 }}
                onClick={handleSearchClose}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <motion.div 
      className={`h-full flex flex-col ${colors.secondary} ${animation.default} overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* OneUI style header - only show if showHeader is true */}
      {showHeader && (
        <header 
          className={`${headerColor || colors.secondary} py-4 px-5 flex items-center justify-between ${animation.default}`}
          style={{ minHeight: '64px' }}
        >
          <div className="flex items-center flex-1">
            {onBack && (
              <motion.button 
                className={`${colors.textPrimary} p-1.5 -ml-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5`}
                onClick={handleBackClick}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.1 }}
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.button>
            )}
            
            <motion.h1 
              className={`${headerTextColor || colors.textPrimary} text-xl font-medium ml-2 ${animation.default}`}
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.h1>
          </div>
          
          <div className="flex items-center gap-3">
            {rightAction === 'search' && (
              <motion.button 
                className={`p-2.5 ${colors.textPrimary} hover:bg-black/5 dark:hover:bg-white/5 rounded-full`}
                onClick={handleSearchClick}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.1 }}
              >
                <Search className="w-5 h-5" />
              </motion.button>
            )}
            
            {rightAction === 'more' && (
              <motion.button 
                className={`p-2.5 ${colors.textPrimary} hover:bg-black/5 dark:hover:bg-white/5 rounded-full`}
                onClick={onRightActionClick}
                whileTap={{ scale: 0.92 }}
                transition={{ duration: 0.1 }}
              >
                <MoreVertical className="w-5 h-5" />
              </motion.button>
            )}
            
            {rightAction === 'share' && (
              <motion.button 
                className={`p-2.5 ${colors.textPrimary} hover:bg-black/5 dark:hover:bg-white/5 rounded-full`}
                onClick={onRightActionClick}
                whileTap={{ scale: 0.92 }}
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
          className={`flex-1 overflow-y-auto overscroll-bounce ${colors.primary} ${animation.default} ${fullScreen ? 'absolute inset-0 z-10' : ''}`}
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
      
      {/* Navigation bar for bottom gestures */}
      <div className={`h-1.5 ${colors.secondary} ${animation.default}`}></div>
      
      {/* Render overlays */}
      {renderRecentApps()}
      {renderSearchOverlay()}
    </motion.div>
  );
} 