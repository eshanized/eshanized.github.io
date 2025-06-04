"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface OneUINotificationProps {
  title: string;
  message: string;
  appIcon?: string;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

export default function OneUINotification({
  title,
  message,
  appIcon = 'https://github.com/eshanized.png',
  onClose,
  autoClose = true,
  autoCloseTime = 5000
}: OneUINotificationProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

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
      <div className="bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(58,58,60,0.7)] backdrop-blur-xl 
        rounded-2xl shadow-lg border border-[rgba(255,255,255,0.1)] dark:border-[rgba(58,58,60,0.3)]">
        <div className="p-4 flex items-start">
          <div className="flex-shrink-0 mr-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden relative">
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
            <h3 className="text-black dark:text-white font-semibold mb-1">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-500 
              dark:text-gray-500 dark:hover:text-gray-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
} 