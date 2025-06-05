"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useOneUITheme } from './OneUIThemeContext';

interface OneUINotificationProps {
  title: string;
  message: string;
  appIcon?: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
  timestamp?: string;
}

export default function OneUINotification({
  title,
  message,
  appIcon = 'https://github.com/eshanized.png',
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
  timestamp = 'now'
}: OneUINotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const { colors, borderRadius, animation } = useOneUITheme();

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseTime);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseTime]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-sm 
      ${isExiting ? 'animate-notification-exit' : 'animate-notification-enter'}`}>
      <div className={`${colors.notification} ${borderRadius.lg} ${colors.shadow} 
        backdrop-blur-xl border border-[rgba(255,255,255,0.08)] dark:border-[rgba(58,58,60,0.2)] ${animation.default}`}>
        <div className="p-4 flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className={`w-12 h-12 ${borderRadius.md} overflow-hidden relative`}>
              <Image
                src={appIcon}
                alt="App Icon"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center mb-1">
              <h3 className={`${colors.textPrimary} font-semibold`}>
                {title}
              </h3>
              <span className={`${colors.textTertiary} text-xs`}>{timestamp}</span>
            </div>
            <p className={`${colors.textSecondary} text-sm`}>
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className={`ml-3 flex-shrink-0 ${colors.textTertiary} hover:${colors.textSecondary} 
              ${animation.fast} p-1 ${borderRadius.sm}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className={`h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 ${borderRadius.sm}`}>
          <div 
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 animate-shrink" 
            style={{
              animation: `shrink ${autoCloseTime/1000}s linear forwards`
            }}
          />
        </div>
      </div>
      <style jsx global>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        .animate-notification-enter {
          animation: notification-enter 0.3s ease-out forwards;
        }
        .animate-notification-exit {
          animation: notification-exit 0.3s ease-in forwards;
        }
        @keyframes notification-enter {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes notification-exit {
          from { opacity: 1; transform: translate(-50%, 0); }
          to { opacity: 0; transform: translate(-50%, -20px); }
        }
      `}</style>
    </div>
  );
} 