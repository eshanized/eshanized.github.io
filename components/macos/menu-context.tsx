"use client";

import { createContext, useState, useContext, ReactNode, useEffect, useRef, useCallback, useMemo } from 'react';
import { useWindowManager } from './window-context';
import { parseShortcutString, KeyboardShortcut, useKeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { DESKTOP_APPS } from '@/lib/constants';
import { MenuActionRegular } from './menu-item';

type MenuContextType = {
  activeMenu: string | null;
  setActiveMenu: (menu: string | null) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleOutsideClick: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
  showMenu: (menuName: string) => void;
  hideMenu: () => void;
  handleMenuAction: (action: MenuActionRegular) => void;
  registerShortcuts: (shortcuts: KeyboardShortcut[]) => void;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: ReactNode }) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const windowManager = useWindowManager();
  const [registeredShortcuts, setRegisteredShortcuts] = useState<KeyboardShortcut[]>([]);

  // Memoize functions to prevent them from changing on every render
  const showMenu = useCallback((menuName: string) => {
    setActiveMenu(menuName);
    setIsMenuOpen(true);
  }, []);

  const hideMenu = useCallback(() => {
    setActiveMenu(null);
    setIsMenuOpen(false);
  }, []);

  const handleOutsideClick = useCallback(() => {
    hideMenu();
  }, [hideMenu]);

  // Handle menu actions with app launching capability
  const handleMenuAction = useCallback((menuAction: MenuActionRegular) => {
    if (menuAction.action) {
      menuAction.action();
    } else if (menuAction.id) {
      // Check if this is a desktop app
      const appExists = DESKTOP_APPS.some(app => app.id === menuAction.id);
      if (appExists) {
        windowManager.openWindow(menuAction.id);
      }
    }
    
    // Close the menu after action
    hideMenu();
  }, [windowManager, hideMenu]);

  // Register keyboard shortcuts for menu items
  const registerShortcuts = useCallback((shortcuts: KeyboardShortcut[]) => {
    setRegisteredShortcuts(prev => {
      // Avoid duplicate shortcuts by checking if they already exist
      const newShortcuts = shortcuts.filter(
        newShortcut => !prev.some(
          existingShortcut => 
            JSON.stringify(existingShortcut.key) === JSON.stringify(newShortcut.key)
        )
      );
      if (newShortcuts.length === 0) return prev;
      return [...prev, ...newShortcuts];
    });
  }, []);

  // Use the keyboard shortcut hook
  useKeyboardShortcut(registeredShortcuts);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        hideMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, hideMenu]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    activeMenu,
    setActiveMenu,
    isMenuOpen,
    setIsMenuOpen,
    handleOutsideClick,
    menuRef,
    showMenu,
    hideMenu,
    handleMenuAction,
    registerShortcuts,
  }), [
    activeMenu,
    isMenuOpen,
    handleOutsideClick,
    showMenu,
    hideMenu,
    handleMenuAction,
    registerShortcuts
  ]);

  return (
    <MenuContext.Provider value={contextValue}>
      {children}
    </MenuContext.Provider>
  );
}

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenuContext must be used within a MenuProvider');
  }
  return context;
}; 