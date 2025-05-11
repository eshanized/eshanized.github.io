"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface MIUIThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: {
    // Background colors
    primary: string;
    secondary: string;
    tertiary: string;
    
    // Text colors
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
    
    // UI element colors
    accent: string;
    divider: string;
    cardBg: string;
    statusBar: string;
    navBar: string;
    
    // Interactive elements
    ripple: string;
    buttonBg: string;
    toggleActive: string;
    toggleInactive: string;
  };
}

const MIUIThemeContext = createContext<MIUIThemeContextType | undefined>(undefined);

export function MIUIThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference and saved preference
    const savedTheme = localStorage.getItem('miui-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('miui-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const colors = {
    // Light mode colors
    ...(isDarkMode ? {
      // MIUI Dark Mode Colors
      primary: 'bg-black',
      secondary: 'bg-[#1C1C1E]',
      tertiary: 'bg-[#2C2C2E]',
      
      textPrimary: 'text-white',
      textSecondary: 'text-[#98989F]',
      textTertiary: 'text-[#68686A]',
      
      accent: 'text-[#0A84FF]',
      divider: 'border-[#38383A]',
      cardBg: 'bg-[#1C1C1E]',
      statusBar: 'bg-black',
      navBar: 'bg-black',
      
      ripple: 'bg-white/10',
      buttonBg: 'bg-[#3A3A3C]',
      toggleActive: 'bg-[#0A84FF]',
      toggleInactive: 'bg-[#3A3A3C]'
    } : {
      // MIUI Light Mode Colors
      primary: 'bg-[#F2F2F7]',
      secondary: 'bg-white',
      tertiary: 'bg-[#F9F9F9]',
      
      textPrimary: 'text-black',
      textSecondary: 'text-[#6D6D72]',
      textTertiary: 'text-[#8E8E93]',
      
      accent: 'text-[#007AFF]',
      divider: 'border-[#C6C6C8]',
      cardBg: 'bg-white',
      statusBar: 'bg-[#F2F2F7]',
      navBar: 'bg-[#F2F2F7]',
      
      ripple: 'bg-black/5',
      buttonBg: 'bg-white',
      toggleActive: 'bg-[#007AFF]',
      toggleInactive: 'bg-[#E9E9EA]'
    })
  };

  return (
    <MIUIThemeContext.Provider value={{ isDarkMode, toggleDarkMode, colors }}>
      {children}
    </MIUIThemeContext.Provider>
  );
}

export function useMIUITheme() {
  const context = useContext(MIUIThemeContext);
  if (context === undefined) {
    throw new Error('useMIUITheme must be used within a MIUIThemeProvider');
  }
  return context;
} 