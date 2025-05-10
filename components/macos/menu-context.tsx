"use client";

import { createContext, useState, useContext, ReactNode, useEffect, useRef } from 'react';
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

  const showMenu = (menuName: string) => {
    setActiveMenu(menuName);
    setIsMenuOpen(true);
  };

  const hideMenu = () => {
    setActiveMenu(null);
    setIsMenuOpen(false);
  };

  const handleOutsideClick = () => {
    hideMenu();
  };

  // Handle menu actions with app launching capability
  const handleMenuAction = (menuAction: MenuActionRegular) => {
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
  };

  // Register keyboard shortcuts for menu items
  const registerShortcuts = (shortcuts: KeyboardShortcut[]) => {
    setRegisteredShortcuts(prev => [...prev, ...shortcuts]);
  };

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
  }, [isMenuOpen]);

  return (
    <MenuContext.Provider
      value={{
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
      }}
    >
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