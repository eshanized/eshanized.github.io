"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTheme as useNextTheme } from 'next-themes';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, systemTheme } = useNextTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initialize theme based on system preference or saved theme
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setIsDarkMode(currentTheme === 'dark');
  }, [theme, systemTheme]);

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 