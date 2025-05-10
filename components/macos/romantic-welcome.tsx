"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, Sparkles, X } from 'lucide-react';

// Floating heart component
const FloatingHeart = ({ delay = 0, duration = 8, size = 24, left = '50%' }) => (
  <motion.div
    className="absolute pointer-events-none"
    initial={{ y: '100%', x: left, opacity: 0.3, scale: 0.5 }}
    animate={{ y: '-100%', opacity: [0.3, 0.8, 0], scale: [0.5, 1, 0.7] }}
    transition={{ 
      duration, 
      delay, 
      ease: "easeOut",
      opacity: { duration: duration * 0.8 },
      scale: { times: [0, 0.5, 1], duration: duration * 0.8 }
    }}
    style={{ left }}
  >
    <Heart className="text-pink-300 fill-pink-300" style={{ width: size, height: size }} />
  </motion.div>
);

export default function RomanticWelcome() {
  const [visible, setVisible] = useState(true);
  const [showClose, setShowClose] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  useEffect(() => {
    // Show close button after 2 seconds
    const showCloseTimer = setTimeout(() => {
      setShowClose(true);
    }, 2000);
    
    // Auto-hide after 8 seconds
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, 8000);
    
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(showCloseTimer);
    };
  }, []);
  
  const handleClose = () => {
    setVisible(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  // Generate random positions for floating hearts
  const floatingHearts = Array.from({ length: 12 }).map((_, i) => ({
    delay: Math.random() * 3 + i * 0.3,
    duration: Math.random() * 4 + 6,
    size: Math.random() * 20 + 14,
    left: `${Math.random() * 90 + 5}%`
  }));
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background particles */}
          <div className="absolute inset-0 overflow-hidden">
            {floatingHearts.map((props, i) => (
              <FloatingHeart key={i} {...props} />
            ))}
          </div>
          
          {/* Card */}
          <motion.div
            className="relative bg-gradient-to-br from-violet-600/90 via-pink-600/90 to-rose-600/90 backdrop-blur-xl p-10 rounded-2xl text-white shadow-[0_0_40px_rgba(219,39,119,0.3)] max-w-lg w-full border border-white/10"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 15 }}
          >
            {/* Close button */}
            <AnimatePresence>
              {showClose && (
                <motion.button 
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                  onClick={handleClose}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
            
            <div className="flex flex-col items-center relative">
              {/* Sparkle effect */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1, 0] }}
                transition={{ times: [0, 0.3, 0.5, 0.7, 1], duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
              >
                <Sparkles className="absolute w-6 h-6 text-yellow-300" style={{ top: '5%', left: '20%' }} />
                <Sparkles className="absolute w-5 h-5 text-purple-300" style={{ top: '15%', right: '15%' }} />
                <Stars className="absolute w-7 h-7 text-blue-300" style={{ bottom: '25%', left: '10%' }} />
              </motion.div>
              
              {/* Heart icon with pulse and glow */}
              <motion.div
                className="relative"
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  damping: 10,
                  delay: 0.3,
                  duration: 0.8
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-pink-500 blur-xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                />
                <Heart className="w-24 h-24 text-pink-100 fill-pink-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] relative z-10" />
              </motion.div>
              
              {/* Title with shine effect */}
              <motion.div
                className="mt-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-white">
                  Welcome to Your Special Theme
                </h1>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[200%] pointer-events-none"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, delay: 1, repeat: 3, repeatDelay: 5 }}
                />
              </motion.div>
              
              <motion.p
                className="mt-4 text-center text-pink-100/90 max-w-md leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                Enjoy this exclusive romantic experience created just for you, Snigdha! ♥ 
                Every detail has been crafted with love and care.
              </motion.p>
              
              <motion.div
                className="mt-8 flex justify-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <motion.button
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white font-medium backdrop-blur-md border border-white/30 shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClose}
                >
                  Begin Your Journey
                </motion.button>
              </motion.div>
              
              <motion.div
                className="mt-5 flex space-x-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <span className="text-xs text-pink-200/70">
                  Made with ❤️ just for you
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 