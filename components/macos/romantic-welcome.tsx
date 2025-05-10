"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function RomanticWelcome() {
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="bg-gradient-to-r from-pink-500/80 to-purple-500/80 backdrop-blur-xl p-10 rounded-xl text-white shadow-2xl"
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: "spring", damping: 15 }}
          >
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <Heart className="w-20 h-20 text-pink-200 fill-pink-200" />
              </motion.div>
              
              <motion.h1
                className="text-3xl font-bold mt-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-pink-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Welcome to Your Special Theme
              </motion.h1>
              
              <motion.p
                className="mt-2 text-center text-pink-100/90 max-w-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Enjoy this exclusive romantic experience created just for you, Snigdha! ♥
              </motion.p>
              
              <motion.div
                className="mt-6 flex space-x-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <span className="text-xs text-pink-200/70">
                  This message will disappear in a few seconds...
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 