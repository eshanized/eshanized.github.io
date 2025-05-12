"use client";

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SnigdhaOSLogo } from './snigdhaos-logo';

export function BootAnimation({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    // Simulate loading progress with variable speed
    const interval = setInterval(() => {
      setProgress(prev => {
        // Slower at start, faster in middle, slow at end for natural feel
        const speed = prev < 30 ? 2 : prev > 80 ? 1 : 5;
        const newProgress = prev + (Math.random() * speed);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 120);
    
    return () => clearInterval(interval);
  }, []);
  
  // Trigger completion when progress reaches 100%
  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        
        // Wait for fadeout animation before calling onComplete
        setTimeout(() => {
          onComplete();
        }, 1000);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  // Generate particles for background effect
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 5,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <AnimatePresence>
      {!isComplete ? (
        <motion.div
          className="fixed inset-0 bg-gradient-to-b from-black via-zinc-900 to-black flex flex-col items-center justify-center z-50 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          key="boot-screen"
        >
          {/* Particle background */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
          
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 opacity-20"
            initial={{ backgroundPosition: "0% 0%" }}
            animate={{ backgroundPosition: "100% 100%" }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            style={{
              background: "radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
          
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo with glow effect */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: progress > 95 ? [1, 1.1, 1] : 1,
                y: progress > 95 ? [0, -10, 0] : 0,
              }}
              transition={{
                duration: 1.5,
                ease: "easeOut",
                scale: progress > 95 ? { repeat: 1, duration: 0.8 } : {},
                y: progress > 95 ? { repeat: 1, duration: 0.8 } : {}
              }}
            >
              {/* Glow behind logo */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-primary/30"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.4, 0.8, 0.4],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{ filter: "blur(20px)" }}
              />
              
              {/* Apple Logo with 3D rotation */}
              <motion.div
                animate={{ 
                  rotateY: progress > 80 ? [0, 360] : [0, 5, 0, -5, 0],
                  z: progress > 80 ? [0, 30, 0] : 0,
                }}
                transition={{
                  rotateY: progress > 80 ? { duration: 1.5, ease: "easeInOut" } : { repeat: Infinity, duration: 5 },
                  z: progress > 80 ? { duration: 1.5, ease: "easeInOut" } : {}
                }}
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              >
                <SnigdhaOSLogo className="w-24 h-24 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </motion.div>
            </motion.div>
            
            {/* Animated progress track */}
            <motion.div 
              className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-10 relative"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "16rem" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              {/* Animated pulse along track */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-100, 300] }}
                transition={{ 
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear"
                }}
              />
              
              {/* Actual progress bar */}
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-primary to-purple-500 rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                style={{ 
                  boxShadow: "0 0 10px rgba(99, 102, 241, 0.7)"
                }}
              />
            </motion.div>
            
            {/* Percentage counter */}
            <motion.p
              className="mt-4 text-white/80 text-sm font-light tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {Math.round(progress)}%
            </motion.p>
            
            {/* Animated text that changes */}
            <motion.div
              className="h-6 mt-4 flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <AnimatePresence mode="wait">
                {progress < 30 && (
                  <motion.p
                    key="initializing"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-white/60 text-sm font-light"
                  >
                    Initializing system...
                  </motion.p>
                )}
                {progress >= 30 && progress < 60 && (
                  <motion.p
                    key="loading"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-white/60 text-sm font-light"
                  >
                    Loading components...
                  </motion.p>
                )}
                {progress >= 60 && progress < 85 && (
                  <motion.p
                    key="preparing"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-white/60 text-sm font-light"
                  >
                    Preparing workspace...
                  </motion.p>
                )}
                {progress >= 85 && (
                  <motion.p
                    key="finishing"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="text-white/60 text-sm font-light"
                  >
                    Almost there...
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          {/* Credits and Version Info at bottom with reveal animation */}
          <motion.div 
            className="absolute bottom-8 flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-white/80 text-sm font-medium bg-gradient-to-r from-primary/80 to-purple-400/80 bg-clip-text text-transparent">
                Snigdha OS
              </p>
              <div className="flex items-center gap-2">
                <p className="text-white/60 text-xs">
                  Created by
                </p>
                <a 
                  href="https://github.com/Snigdha-OS" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary/80 hover:text-primary transition-colors text-xs font-medium"
                >
                  Snigdha
                </a>
                <span className="text-white/40">×</span>
                <a 
                  href="https://github.com/eshanized" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-400/80 hover:text-purple-400 transition-colors text-xs font-medium"
                >
                  Eshan Roy
                </a>
              </div>
            </div>
            <motion.div
              className="flex items-center gap-2 mt-2"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-white/40 text-xs font-light">
                Version 2.0.0
              </p>
            </motion.div>
          </motion.div>
          
          {/* Language & Region Indicator (top right) */}
          <motion.div
            className="absolute top-6 right-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.8, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 backdrop-blur-md bg-white/5 px-3 py-1.5 rounded-full">
              <svg 
                className="w-4 h-4 text-white/60"
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 12c-3-2.5-6-3.5-9-3l.5 14.5.5.5H12m0-12c3-2.5 6-3.5 9-3l-.5 14.5-.5.5H12"></path>
              </svg>
              <span className="text-white/60 text-xs">English</span>
            </div>
          </motion.div>
          
          {/* System Stats (bottom left) */}
          <motion.div 
            className="absolute bottom-6 left-6 flex flex-col backdrop-blur-md bg-white/5 px-3 py-2 rounded-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 0.9, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center space-x-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
              <span className="text-white/60 text-xs">CPU: 42°C</span>
            </div>
            <div className="flex items-center space-x-2 mt-0.5">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-white/60 text-xs">Memory: 8GB</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}