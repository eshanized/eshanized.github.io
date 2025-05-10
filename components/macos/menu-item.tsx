"use client";

import { useState, useEffect } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger, 
  DropdownMenuSeparator, 
  DropdownMenuShortcut 
} from "@/components/ui/dropdown-menu";
import { useMenuContext } from './menu-context';
import { useWindowManager } from './window-context';
import { parseShortcutString, KeyboardShortcut } from '@/hooks/useKeyboardShortcut';
import { cn } from '@/lib/utils';
import { DESKTOP_APPS } from '@/lib/constants';

export type MenuActionRegular = {
  id?: string;
  label: string;
  shortcut?: string;
  action?: () => void;
  disabled?: boolean;
  type?: never;
  icon?: any;
  isActive?: boolean;
  isMinimized?: boolean;
  isOpen?: boolean;
};

export type MenuActionSeparator = {
  type: 'separator';
  label?: never;
  id?: never;
  shortcut?: never;
  action?: never;
  disabled?: never;
  icon?: never;
  isActive?: never;
  isMinimized?: never;
  isOpen?: never;
};

export type MenuAction = MenuActionRegular | MenuActionSeparator;

export type MacOSMenuItemProps = {
  label: string;
  items: MenuAction[];
  className?: string;
};

export function MacOSMenuItem({ label, items, className }: MacOSMenuItemProps) {
  const { activeMenu, showMenu, hideMenu, isMenuOpen, menuRef, handleMenuAction, registerShortcuts } = useMenuContext();
  const windowManager = useWindowManager();
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isActive = activeMenu === label;

  // Process menu items to add proper actions
  const processedItems = items.map(item => {
    if (item.type === 'separator') return item;
    
    // Create a new object to avoid modifying the original
    const newItem = { ...item };
    
    // If no action is provided but we have an id, check if it's a desktop app
    if (!newItem.action && newItem.id) {
      const app = DESKTOP_APPS.find(app => app.id === newItem.id);
      if (app) {
        newItem.action = () => windowManager.openWindow(newItem.id!);
      }
    }
    
    return newItem;
  });

  // Register keyboard shortcuts for this menu's items
  useEffect(() => {
    const shortcuts: KeyboardShortcut[] = processedItems
      .filter(item => item.type !== 'separator' && item.shortcut && item.action && !item.disabled)
      .map(item => {
        const shortcut = parseShortcutString((item as MenuActionRegular).shortcut!, () => {
          if ((item as MenuActionRegular).action) (item as MenuActionRegular).action!();
          hideMenu();
        });
        return shortcut;
      })
      .filter(Boolean) as KeyboardShortcut[];

    // Register shortcuts with the menu context
    if (shortcuts.length > 0) {
      registerShortcuts(shortcuts);
    }
  }, [processedItems, hideMenu, registerShortcuts]);

  // Close dropdown when menu becomes inactive
  useEffect(() => {
    if (!isMenuOpen || activeMenu !== label) {
      setIsOpen(false);
    }
  }, [isMenuOpen, activeMenu, label]);

  const handleClick = () => {
    if (isActive) {
      hideMenu();
    } else {
      showMenu(label);
      setIsOpen(true);
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (isMenuOpen && activeMenu !== label) {
      showMenu(label);
      setIsOpen(true);
    }
  };

  return (
    <DropdownMenu open={isActive && isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "h-full px-2 transition-colors outline-none",
          (isActive || hovered) ? "bg-accent" : "",
          className
        )}
      >
        {label}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={menuRef}
        className="p-0 rounded-lg overflow-hidden min-w-[220px] animate-in fade-in zoom-in-95 data-[side=bottom]:slide-in-from-top-2 mt-0.5"
        align="start"
        sideOffset={0}
        onMouseLeave={() => {
          if (!hovered) {
            hideMenu();
          }
        }}
      >
        {processedItems.map((item, index) => (
          item.type === 'separator' ? (
            <DropdownMenuSeparator key={`sep-${index}`} className="m-0" />
          ) : (
            <DropdownMenuItem
              key={`${item.label}-${index}`}
              onClick={() => {
                if (!item.disabled) {
                  handleMenuAction(item as MenuActionRegular);
                }
              }}
              disabled={item.disabled}
              className={cn(
                "px-3 py-1 rounded-none text-sm flex items-center justify-between",
                item.isActive ? 'bg-accent' : '',
                item.isMinimized ? 'opacity-50' : '',
                item.disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-default',
              )}
            >
              <div className="flex items-center">
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                <span className="truncate max-w-[200px]">{item.label}</span>
              </div>
              
              <div className="flex items-center ml-4">
                {item.isOpen && <div className="w-1 h-1 rounded-full bg-primary mr-2" />}
                {item.shortcut && (
                  <DropdownMenuShortcut className="ml-auto text-muted-foreground">
                    {item.shortcut}
                  </DropdownMenuShortcut>
                )}
              </div>
            </DropdownMenuItem>
          )
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 