"use client";

import { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { DESKTOP_APPS } from '@/lib/constants';

type WindowContextType = {
  openWindows: string[];
  activeWindow: string | null;
  minimizedWindows: string[];
  maximizedWindows: string[];
  openWindow: (id: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  isWindowOpen: (id: string) => boolean;
  isWindowActive: (id: string) => boolean;
  isWindowMinimized: (id: string) => boolean;
  isWindowMaximized: (id: string) => boolean;
  getWindowStack: () => string[];
  bringWindowToTop: (id: string) => void;
  hideAllWindows: () => void;
  minimizeAllWindows: () => void;
  quitApp: (id: string) => void;
};

export const WindowContext = createContext<WindowContextType | undefined>(undefined);

export function WindowProvider({ children }: { children: ReactNode }) {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [maximizedWindows, setMaximizedWindows] = useState<string[]>([]);
  const [windowStack, setWindowStack] = useState<string[]>([]);

  const isWindowOpen = useCallback((id: string) => {
    return openWindows.includes(id);
  }, [openWindows]);

  const isWindowActive = useCallback((id: string) => {
    return activeWindow === id;
  }, [activeWindow]);

  const isWindowMinimized = useCallback((id: string) => {
    return minimizedWindows.includes(id);
  }, [minimizedWindows]);

  const isWindowMaximized = useCallback((id: string) => {
    return maximizedWindows.includes(id);
  }, [maximizedWindows]);

  const openWindow = useCallback((id: string) => {
    if (!isWindowOpen(id)) {
      setOpenWindows(prev => [...prev, id]);
      setWindowStack(prev => [...prev, id]);
    }
    
    if (isWindowMinimized(id)) {
      setMinimizedWindows(prev => prev.filter(windowId => windowId !== id));
    }
    
    setActiveWindow(id);
  }, [isWindowOpen, isWindowMinimized]);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows(prev => prev.filter(windowId => windowId !== id));
    setMinimizedWindows(prev => prev.filter(windowId => windowId !== id));
    setMaximizedWindows(prev => prev.filter(windowId => windowId !== id));
    setWindowStack(prev => prev.filter(windowId => windowId !== id));
    
    if (activeWindow === id) {
      // Find the next window to focus
      const newStack = windowStack.filter(windowId => windowId !== id);
      setActiveWindow(newStack.length > 0 ? newStack[newStack.length - 1] : null);
    }
  }, [activeWindow, windowStack]);

  const minimizeWindow = useCallback((id: string) => {
    if (isWindowMinimized(id)) {
      // Unminimize
      setMinimizedWindows(prev => prev.filter(windowId => windowId !== id));
      setActiveWindow(id);
      bringWindowToTop(id);
    } else {
      // Minimize
      setMinimizedWindows(prev => [...prev, id]);
      
      // Find the next window to focus
      const newStack = windowStack.filter(windowId => windowId !== id && !minimizedWindows.includes(windowId));
      setActiveWindow(newStack.length > 0 ? newStack[newStack.length - 1] : null);
    }
  }, [isWindowMinimized, minimizedWindows, windowStack]);

  const maximizeWindow = useCallback((id: string) => {
    if (isWindowMaximized(id)) {
      setMaximizedWindows(prev => prev.filter(windowId => windowId !== id));
    } else {
      setMaximizedWindows(prev => [...prev, id]);
    }
    
    setActiveWindow(id);
    bringWindowToTop(id);
  }, [isWindowMaximized]);

  const focusWindow = useCallback((id: string) => {
    if (isWindowOpen(id) && !isWindowMinimized(id)) {
      setActiveWindow(id);
      bringWindowToTop(id);
    }
  }, [isWindowOpen, isWindowMinimized]);

  const bringWindowToTop = useCallback((id: string) => {
    setWindowStack(prev => {
      const newStack = prev.filter(windowId => windowId !== id);
      return [...newStack, id];
    });
  }, []);

  const getWindowStack = useCallback(() => {
    return windowStack;
  }, [windowStack]);

  const hideAllWindows = useCallback(() => {
    // Hide all windows except active one
    const windowsToHide = openWindows.filter(id => id !== activeWindow);
    setMinimizedWindows(prev => [...prev, ...windowsToHide]);
  }, [openWindows, activeWindow]);

  const minimizeAllWindows = useCallback(() => {
    // Minimize all open windows
    setMinimizedWindows(prev => [...prev, ...openWindows.filter(id => !prev.includes(id))]);
    setActiveWindow(null);
  }, [openWindows]);

  const quitApp = useCallback((id: string) => {
    closeWindow(id);
  }, [closeWindow]);

  return (
    <WindowContext.Provider
      value={{
        openWindows,
        activeWindow,
        minimizedWindows,
        maximizedWindows,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        isWindowOpen,
        isWindowActive,
        isWindowMinimized,
        isWindowMaximized,
        getWindowStack,
        bringWindowToTop,
        hideAllWindows,
        minimizeAllWindows,
        quitApp,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export const useWindowManager = () => {
  const context = useContext(WindowContext);
  if (context === undefined) {
    throw new Error('useWindowManager must be used within a WindowProvider');
  }
  return context;
}; 