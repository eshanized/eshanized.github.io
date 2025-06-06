"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SnigdhaOSLogo } from './snigdhaos-logo';
import { CheckCircle, Loader } from 'lucide-react';

const bootSequence = [
  { text: "SNIGDHA-OS BIOS v2.1.8", duration: 500 },
  { text: "Initializing mainboard...", duration: 300 },
  { text: "Checking memory presence...", duration: 400 },
  { text: "Calibrating CPU clock...", status: "OK", duration: 500 },
  { text: "Loading kernel module 'snigdha_core.ko'", duration: 700 },
  { text: "Mounting virtual filesystem...", duration: 400 },
  { text: "Starting UI server...", status: "OK", duration: 600 },
  { text: "Launching Window Manager...", duration: 500 },
  { text: "System ready.", status: "DONE", duration: 1000 },
];

export function BootAnimation({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (step < bootSequence.length) {
      const timer = setTimeout(() => {
        setStep(step + 1);
      }, bootSequence[step].duration);
      return () => clearTimeout(timer);
    } else {
      const completionTimer = setTimeout(() => {
        setCompleted(true);
        onComplete();
      }, 500); // Wait a bit after the final message
      return () => clearTimeout(completionTimer);
    }
  }, [step, onComplete]);

  const currentProgress = (step / (bootSequence.length -1)) * 100;

  return (
    <AnimatePresence>
      {!completed && (
        <motion.div
          key="boot-screen"
          className="fixed inset-0 bg-[#0D0D0D] flex flex-col items-center justify-center z-50 overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } }}
        >
          {/* Background Grid */}
          <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20" />
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(137,180,250,0.15),transparent_40%)]" />

          {/* Center Logo and Progress */}
          <motion.div 
            className="relative flex items-center justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.svg
              className="absolute w-48 h-48"
              viewBox="0 0 100 100"
              initial={{ rotate: -90 }}
            >
              <motion.circle
                cx="50" cy="50" r="45"
                stroke="rgba(205, 214, 244, 0.1)"
                strokeWidth="3"
                fill="transparent"
              />
              <motion.circle
                cx="50" cy="50" r="45"
                stroke="rgba(137, 180, 250, 1)" // Blue
                strokeWidth="3"
                fill="transparent"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: currentProgress / 100 }}
                transition={{ duration: 0.3 }}
              />
            </motion.svg>
            <SnigdhaOSLogo className="w-24 h-24 text-white" />
          </motion.div>

          {/* Boot Log */}
          <div className="w-full max-w-lg h-48 font-mono text-sm text-gray-400 p-4 overflow-hidden">
            <AnimatePresence>
              {bootSequence.slice(0, step).map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  <p>
                    <span className="text-gray-600 mr-2">{`[${(item.duration / 1000).toFixed(2)}]`}</span>
                    {item.text}
                  </p>
                  {item.status && (
                     <p className={`font-bold ${item.status === "DONE" ? 'text-green-400' : 'text-blue-400'}`}>
                       {item.status === "DONE" ? <CheckCircle size={16} /> : `[ ${item.status} ]`}
                     </p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {step < bootSequence.length && (
              <motion.div 
                className="flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                  <Loader className="animate-spin text-gray-500 mr-2" size={14}/>
                  <span>{bootSequence[step].text}</span>
              </motion.div>
            )}
          </div>
          
          <motion.div
            className="absolute bottom-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-gray-500 text-xs">SnigdhaOS v2.0.0 "Aurora"</p>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}