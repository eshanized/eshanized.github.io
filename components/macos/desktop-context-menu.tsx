"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { 
  FolderPlus, 
  Image as ImageIcon, 
  RefreshCcw, 
  Eye, 
  List, 
  Grid, 
  Info, 
  PanelTop, 
  Terminal, 
  AlignJustify,
  ArrowRightFromLine,
  Check,
  ChevronRight,
  Paintbrush
} from 'lucide-react';

interface DesktopContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onChangeBackground?: () => void;
  onCreateNewFolder?: () => void;
  onOpenTerminal?: () => void;
}

// Submenu data interfaces
interface MenuItem {
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  action?: () => void;
  submenu?: MenuItem[];
  checked?: boolean;
  divider?: boolean;
}

export function DesktopContextMenu({ 
  x, 
  y, 
  onClose, 
  onChangeBackground,
  onCreateNewFolder,
  onOpenTerminal
}: DesktopContextMenuProps) {
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Handle clicks outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Handle menu items with default actions
  const handleItemClick = (action?: () => void) => {
    if (action) {
      action();
    }
    onClose();
  };

  // Get positioned menu style
  const getMenuStyle = () => {
    // Ensure the menu stays within the viewport
    const menuStyle: React.CSSProperties = { 
      left: x, 
      top: y,
      opacity: 1
    };
    
    // Adjust if close to the right edge
    if (menuRef.current && x + menuRef.current.offsetWidth > window.innerWidth) {
      menuStyle.left = window.innerWidth - menuRef.current.offsetWidth - 10;
    }
    
    // Adjust if close to the bottom edge
    if (menuRef.current && y + menuRef.current.offsetHeight > window.innerHeight) {
      menuStyle.top = window.innerHeight - menuRef.current.offsetHeight - 10;
    }
    
    return menuStyle;
  };

  // Menu Items
  const menuItems: MenuItem[] = [
    {
      label: "New Folder",
      icon: <FolderPlus className="w-4 h-4" />,
      shortcut: "⇧⌘N",
      action: onCreateNewFolder || (() => console.log("Create new folder"))
    },
    { divider: true },
    {
      label: "Change Desktop Background...",
      icon: <ImageIcon className="w-4 h-4" />,
      action: onChangeBackground || (() => console.log("Change background"))
    },
    { divider: true },
    {
      label: "Use Stacks",
      icon: <Grid className="w-4 h-4" />,
      checked: false,
    },
    {
      label: "Sort By",
      icon: <AlignJustify className="w-4 h-4" />,
      submenu: [
        { label: "Name", checked: true },
        { label: "Kind" },
        { label: "Date Modified" },
        { label: "Date Created" },
        { label: "Size" },
        { label: "Tags" },
        { divider: true },
        { label: "None" }
      ]
    },
    {
      label: "Clean Up",
      icon: <RefreshCcw className="w-4 h-4" />
    },
    {
      label: "Clean Up By",
      icon: <List className="w-4 h-4" />,
      submenu: [
        { label: "Name" },
        { label: "Kind" },
        { label: "Date Modified" },
        { label: "Date Created" },
        { label: "Size" },
        { label: "Tags" }
      ]
    },
    { divider: true },
    {
      label: "Show View Options",
      icon: <Eye className="w-4 h-4" />,
      shortcut: "⌘J"
    },
    { divider: true },
    {
      label: "Theme",
      icon: <Paintbrush className="w-4 h-4" />,
      submenu: [
        { 
          label: "Light", 
          checked: theme === 'light',
          action: () => setTheme('light')
        },
        { 
          label: "Dark", 
          checked: theme === 'dark',
          action: () => setTheme('dark')
        },
        { 
          label: "System", 
          checked: theme === 'system',
          action: () => setTheme('system')
        }
      ]
    },
    {
      label: "Open in Terminal",
      icon: <Terminal className="w-4 h-4" />,
      action: onOpenTerminal || (() => console.log("Open Terminal"))
    },
    {
      label: "Get Info",
      icon: <Info className="w-4 h-4" />,
      shortcut: "⌘I"
    }
  ];

  const renderMenuItem = (item: MenuItem, index: number) => {
    if (item.divider) {
      return <div key={`divider-${index}`} className="border-t border-gray-200 dark:border-gray-700 my-1"></div>;
    }
    
    return (
      <div
        key={item.label}
        className={`
          px-3 py-1 flex items-center justify-between rounded-md text-sm
          ${item.action || item.submenu ? 'cursor-pointer hover:bg-blue-500 hover:text-white' : 'text-gray-500'}
          ${activeSubmenu === item.label ? 'bg-blue-500 text-white' : ''}
        `}
        onClick={() => item.action && handleItemClick(item.action)}
        onMouseEnter={() => setActiveSubmenu(item.submenu && item.label ? item.label : null)}
      >
        <div className="flex items-center gap-3">
          {item.icon && <span className="text-inherit opacity-80">{item.icon}</span>}
          <span>{item.label}</span>
        </div>
        <div className="flex items-center gap-2">
          {item.checked && (
            <Check className="w-4 h-4" />
          )}
          {item.shortcut && (
            <span className="text-xs opacity-60 ml-4">{item.shortcut}</span>
          )}
          {item.submenu && (
            <ChevronRight className="w-3 h-3 opacity-70" />
          )}
        </div>
        
        {/* Render submenu if active */}
        {item.submenu && activeSubmenu === item.label && (
          <div 
            className="absolute left-full ml-[1px] top-0 min-w-[180px] rounded-md shadow-lg py-1 bg-white dark:bg-zinc-800 backdrop-blur-xl border border-gray-200 dark:border-gray-700"
            style={{ 
              transform: 'translateY(-4px)',
              animation: 'fadeIn 0.15s ease-out forwards'
            }}
          >
            {item.submenu.map((subItem, idx) => 
              renderMenuItem(subItem, idx)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      ref={menuRef}
      className="fixed z-[60] min-w-[220px] rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md py-1 text-gray-800 dark:text-gray-200 animate-fade-in"
      style={getMenuStyle()}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      {menuItems.map((item, index) => 
        renderMenuItem(item, index)
      )}
    </div>
  );
} 