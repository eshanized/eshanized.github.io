"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface OneUIThemeContextType {
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
    
    // One UI 7.0 specific
    notification: string;
    quickPanel: string;
    tooltip: string;
    shadow: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  animation: {
    default: string;
    fast: string;
    slow: string;
  };
}

const OneUIThemeContext = createContext<OneUIThemeContextType | undefined>(undefined);

export function OneUIThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check system preference and saved preference
    const savedTheme = localStorage.getItem('oneui-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setIsDarkMode(savedTheme === 'dark' || (!savedTheme && systemPrefersDark));
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('oneui-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const colors = {
    // Light mode colors
    ...(isDarkMode ? {
      // Samsung One UI 7.0 Dark Mode Colors
      primary: 'bg-black',
      secondary: 'bg-[#141414]',
      tertiary: 'bg-[#282828]',
      
      textPrimary: 'text-white',
      textSecondary: 'text-[#B4B4B4]',
      textTertiary: 'text-[#8C8C8C]',
      
      accent: 'text-[#0077FF]',
      divider: 'border-[#323232]',
      cardBg: 'bg-[#141414]',
      statusBar: 'bg-black',
      navBar: 'bg-[#141414]',
      
      ripple: 'bg-white/8',
      buttonBg: 'bg-[#282828]',
      toggleActive: 'bg-[#0077FF]',
      toggleInactive: 'bg-[#3C3C3C]',
      
      // One UI 7.0 specific
      notification: 'bg-[#1E1E1E]',
      quickPanel: 'bg-[#0A0A0A]',
      tooltip: 'bg-[#3C3C3C]',
      shadow: 'shadow-[0_4px_12px_rgba(0,0,0,0.4)]'
    } : {
      // Samsung One UI 7.0 Light Mode Colors
      primary: 'bg-[#F8F8F8]',
      secondary: 'bg-white',
      tertiary: 'bg-[#F0F0F0]',
      
      textPrimary: 'text-black',
      textSecondary: 'text-[#555555]',
      textTertiary: 'text-[#828282]',
      
      accent: 'text-[#0077FF]',
      divider: 'border-[#E6E6E6]',
      cardBg: 'bg-white',
      statusBar: 'bg-[#F8F8F8]',
      navBar: 'bg-white',
      
      ripple: 'bg-black/8',
      buttonBg: 'bg-[#F0F0F0]',
      toggleActive: 'bg-[#0077FF]',
      toggleInactive: 'bg-[#DCDCDC]',
      
      // One UI 7.0 specific
      notification: 'bg-[#F2F2F2]',
      quickPanel: 'bg-[#FFFFFF]',
      tooltip: 'bg-[#E0E0E0]',
      shadow: 'shadow-[0_2px_8px_rgba(0,0,0,0.1)]'
    })
  };
  
  const borderRadius = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    xl: 'rounded-[1.5rem]'
  };
  
  const animation = {
    default: 'transition-all duration-300 ease-in-out',
    fast: 'transition-all duration-150 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out'
  };

  return (
    <OneUIThemeContext.Provider value={{ 
      isDarkMode, 
      toggleDarkMode, 
      colors,
      borderRadius,
      animation
    }}>
      {children}
    </OneUIThemeContext.Provider>
  );
}

export const useOneUITheme = () => {
  const context = useContext(OneUIThemeContext);
  if (context === undefined) {
    throw new Error('useOneUITheme must be used within a OneUIThemeProvider');
  }
  return context;
} 