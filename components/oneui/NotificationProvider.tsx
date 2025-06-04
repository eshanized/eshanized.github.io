"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import OneUINotification from './OneUINotification';

interface NotificationContextType {
  showNotification: (title: string, message: string, appIcon?: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notification, setNotification] = useState<{
    title: string;
    message: string;
    appIcon?: string;
  } | null>(null);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('hasVisitedBefore');
    
    if (!hasVisited && typeof window !== 'undefined') {
      // Check if the device is mobile
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      
      if (isMobile) {
        showNotification(
          'Welcome to Eshanized Web',
          'Thanks for visiting! Explore my portfolio and projects.',
          '/apple-touch-icon.png'
        );
      }
      
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  const showNotification = (title: string, message: string, appIcon?: string) => {
    setNotification({ title, message, appIcon });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <OneUINotification
          {...notification}
          onClose={() => setNotification(null)}
        />
      )}
    </NotificationContext.Provider>
  );
} 