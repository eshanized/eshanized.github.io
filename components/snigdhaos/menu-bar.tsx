"use client";

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useTheme } from 'next-themes';
import { PERSONAL_INFO, DESKTOP_APPS } from '@/lib/constants';
import { 
  Moon, Sun, Wifi, Battery, Command, Search, ChevronDown,
  FileText, Edit2, Eye, Layout, HelpCircle, Settings, Power,
  FolderOpen, ArrowUpRight, Clock, RotateCcw, LogOut, Calendar, MessagesSquare, StickyNote, AppWindow
} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuShortcut } from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';
import { SnigdhaOSMenuItem, MenuAction } from './menu-item';
import { useWindowManager } from './window-context';

type MenuBarProps = {
  openWindows: string[];
  activeWindow: string | null;
  minimizedWindows: string[];
  onOpenWindow: (id: string) => void;
  onCloseWindow: (id: string) => void;
  onMinimizeWindow: (id: string) => void;
  onMaximizeWindow: (id: string) => void;
};

// Define types for menu items
type MenuSubItemRegular = MenuAction;

type MenuSubItemSeparator = {
  type: 'separator';
  label?: never;
  shortcut?: never;
  action?: never;
  disabled?: never;
  icon?: never;
  isActive?: never;
  isMinimized?: never;
  isOpen?: never;
};

type MenuSubItem = MenuSubItemRegular | MenuSubItemSeparator;

type MenuItem = {
  label: string;
  items: MenuSubItem[];
};

// Use memo to prevent unnecessary re-renders
export const MenuBar = memo(function MenuBar({
  openWindows,
  activeWindow,
  minimizedWindows,
  onOpenWindow,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
}: MenuBarProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const windowManager = useWindowManager();

  useEffect(() => {
    setMounted(true);
    
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setBatteryLevel(Math.floor(battery.level * 100));
        setIsCharging(battery.charging);

        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.floor(battery.level * 100));
        });

        battery.addEventListener('chargingchange', () => {
          setIsCharging(battery.charging);
        });
      });
    }
    
    return () => clearInterval(interval);
  }, []);

  // Memoized event handlers
  const handleThemeToggle = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  const activeApp = useMemo(() => {
    return activeWindow ? DESKTOP_APPS.find(app => app.id === activeWindow) : null;
  }, [activeWindow]);

  // Define menu items with memoization to prevent recreation on each render
  const MENU_ITEMS = useMemo<MenuItem[]>(() => [
    {
      label: 'Finder',
      items: [
        { label: 'About Finder', shortcut: '', id: 'about' },
        { type: 'separator' },
        { label: 'Preferences...', shortcut: '⌘,' },
        { type: 'separator' },
        { label: 'Empty Trash...', shortcut: '⇧⌘⌫' },
        { label: 'Hide Finder', shortcut: '⌘H' },
        { label: 'Hide Others', shortcut: '⌥⌘H' },
        { label: 'Show All', shortcut: '' },
      ]
    },
    {
      label: 'File',
      items: [
        { label: 'New Folder', shortcut: '⇧⌘N' },
        { label: 'New Finder Window', shortcut: '⌘N' },
        { label: 'Open', shortcut: '⌘O' },
        { label: 'Close Window', shortcut: '⌘W', action: () => activeWindow && onCloseWindow(activeWindow) },
        { type: 'separator' },
        { label: 'Get Info', shortcut: '⌘I' },
        { type: 'separator' },
        { label: 'Move to Trash', shortcut: '⌘⌫' },
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z' },
        { label: 'Redo', shortcut: '⇧⌘Z' },
        { type: 'separator' },
        { label: 'Cut', shortcut: '⌘X' },
        { label: 'Copy', shortcut: '⌘C' },
        { label: 'Paste', shortcut: '⌘V' },
        { label: 'Select All', shortcut: '⌘A' },
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'as Icons', shortcut: '⌘1' },
        { label: 'as List', shortcut: '⌘2' },
        { label: 'as Columns', shortcut: '⌘3' },
        { label: 'as Gallery', shortcut: '⌘4' },
        { type: 'separator' },
        { label: 'Show Preview', shortcut: '⇧⌘P' },
        { label: 'Hide Sidebar', shortcut: '⌥⌘S' },
        { type: 'separator' },
        { label: 'Show Status Bar', shortcut: '' },
        { label: 'Hide Toolbar', shortcut: '⌥⌘T' },
      ]
    },
    {
      label: 'Go',
      items: [
        { label: 'Back', shortcut: '⌘[' },
        { label: 'Forward', shortcut: '⌘]' },
        { type: 'separator' },
        { label: 'Home', shortcut: '⇧⌘H' },
        { label: 'Computer', shortcut: '⇧⌘C' },
        { label: 'Documents', shortcut: '⇧⌘O' },
        { label: 'Downloads', shortcut: '⌥⌘L' },
        { type: 'separator' },
        { label: 'Connect to Server...', shortcut: '⌘K' },
      ]
    },
    {
      label: 'Window',
      items: [
        { 
          label: 'Minimize', 
          shortcut: '⌘M',
          action: () => activeWindow && onMinimizeWindow(activeWindow),
          disabled: !activeWindow
        },
        { 
          label: 'Zoom',
          shortcut: '⌃⌘Z',
          action: () => activeWindow && onMaximizeWindow(activeWindow),
          disabled: !activeWindow
        },
        { type: 'separator' },
        { label: 'Show Previous Tab', shortcut: '⇧⌘{' },
        { label: 'Show Next Tab', shortcut: '⇧⌘}' },
        { type: 'separator' },
        ...openWindows.map(id => {
          const app = DESKTOP_APPS.find(app => app.id === id);
          const menuItem: MenuSubItem = {
            label: app?.title || id,
            icon: app?.icon,
            action: () => {
              if (minimizedWindows.includes(id)) {
                onMinimizeWindow(id);
              } else {
                onOpenWindow(id);
              }
            },
            isActive: activeWindow === id,
            isMinimized: minimizedWindows.includes(id),
          };
          return menuItem;
        })
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Portfolio Help', shortcut: '⌘?' },
        { label: 'Search' },
        { type: 'separator' },
        { label: 'Visit GitHub Repo', action: () => window.open('https://github.com/eshanroy/portfolio', '_blank') },
      ]
    }
  ], [activeWindow, onCloseWindow, onMinimizeWindow, onMaximizeWindow, openWindows, minimizedWindows, onOpenWindow]);

  // Add app-specific menus with memoization
  const appMenus = useMemo<MenuItem[]>(() => [
    {
      label: 'About',
      items: [
        { id: 'about', label: 'About Me' },
        { type: 'separator' },
        { id: 'skills', label: 'My Skills' },
        { id: 'experience', label: 'My Experience' },
        { id: 'education', label: 'My Education' },
      ]
    },
    {
      label: 'Portfolio',
      items: [
        { id: 'projects', label: 'My Projects' },
        { type: 'separator' },
        { id: 'contact', label: 'Contact Me' },
      ]
    },
    {
      label: 'Applications',
      items: [
        { id: 'finder', label: 'Finder', icon: FolderOpen },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'messages', label: 'Messages', icon: MessagesSquare },
        { id: 'notes', label: 'Notes', icon: StickyNote },
        { type: 'separator' },
        { id: 'settings', label: 'System Settings', icon: Settings },
        { id: 'app-store', label: 'App Store', icon: AppWindow },
      ]
    }
  ], []);

  // Combine default menus with app-specific menus
  const allMenus = useMemo(() => {
    let combinedMenus = [...MENU_ITEMS, ...appMenus];

    // Add application-specific menu items based on active window
    if (activeWindow) {
      switch (activeWindow) {
        case 'finder':
          // Add Finder-specific menu items
          const finderMenus: MenuItem[] = [
            {
              label: 'File',
              items: [
                { label: 'New Folder', shortcut: '⇧⌘N' },
                { label: 'New Finder Window', shortcut: '⌘N' },
                { type: 'separator' },
                { label: 'Close Window', shortcut: '⌘W', action: () => windowManager.closeWindow('finder') },
                { type: 'separator' },
                { label: 'Get Info', shortcut: '⌘I' },
                { label: 'Compress', shortcut: '' },
                { type: 'separator' },
                { label: 'Move to Trash', shortcut: '⌘⌫' },
              ]
            },
            {
              label: 'Edit',
              items: [
                { label: 'Undo', shortcut: '⌘Z' },
                { label: 'Redo', shortcut: '⇧⌘Z' },
                { type: 'separator' },
                { label: 'Cut', shortcut: '⌘X' },
                { label: 'Copy', shortcut: '⌘C' },
                { label: 'Paste', shortcut: '⌘V' },
                { label: 'Select All', shortcut: '⌘A' },
              ]
            },
            {
              label: 'View',
              items: [
                { label: 'as Icons', shortcut: '⌘1' },
                { label: 'as List', shortcut: '⌘2' },
                { type: 'separator' },
                { label: 'Show Preview', shortcut: '⇧⌘P' },
                { label: 'Show Path Bar', shortcut: '⌥⌘P' },
                { label: 'Show Status Bar', shortcut: '⌘/' },
              ]
            },
            {
              label: 'Go',
              items: [
                { label: 'Back', shortcut: '⌘[' },
                { label: 'Forward', shortcut: '⌘]' },
                { type: 'separator' },
                { label: 'Home', shortcut: '⇧⌘H' },
                { label: 'Documents', shortcut: '⇧⌘O' },
                { label: 'Downloads', shortcut: '⌥⌘L' },
                { label: 'Pictures', shortcut: '⇧⌘P' },
                { label: 'Music', shortcut: '⇧⌘M' },
              ]
            }
          ];
          // Replace default File/Edit/View menus with Finder-specific ones
          combinedMenus.splice(1, 3, ...finderMenus);
          break;
          
        case 'notes':
          // Add Notes-specific menu items
          const notesMenus: MenuItem[] = [
            {
              label: 'File',
              items: [
                { label: 'New Note', shortcut: '⌘N' },
                { label: 'New Folder', shortcut: '⇧⌘N' },
                { type: 'separator' },
                { label: 'Close', shortcut: '⌘W', action: () => windowManager.closeWindow('notes') },
                { label: 'Save', shortcut: '⌘S' },
                { type: 'separator' },
                { label: 'Export as PDF...', shortcut: '' },
                { label: 'Print...', shortcut: '⌘P' },
              ]
            },
            {
              label: 'Edit',
              items: [
                { label: 'Undo', shortcut: '⌘Z' },
                { label: 'Redo', shortcut: '⇧⌘Z' },
                { type: 'separator' },
                { label: 'Cut', shortcut: '⌘X' },
                { label: 'Copy', shortcut: '⌘C' },
                { label: 'Paste', shortcut: '⌘V' },
                { type: 'separator' },
                { label: 'Select All', shortcut: '⌘A' },
                { type: 'separator' },
                { label: 'Find', shortcut: '⌘F' },
                { label: 'Replace...', shortcut: '⌥⌘F' },
              ]
            },
            {
              label: 'Format',
              items: [
                { label: 'Bold', shortcut: '⌘B' },
                { label: 'Italic', shortcut: '⌘I' },
                { label: 'Underline', shortcut: '⌘U' },
                { type: 'separator' },
                { label: 'Bulleted List', shortcut: '⇧⌘7' },
                { label: 'Numbered List', shortcut: '⇧⌘8' },
                { label: 'Checklist', shortcut: '⇧⌘L' },
                { type: 'separator' },
                { label: 'Align Left', shortcut: '' },
                { label: 'Align Center', shortcut: '' },
                { label: 'Align Right', shortcut: '' },
              ]
            },
            {
              label: 'View',
              items: [
                { label: 'Show Folders', shortcut: '⌘⇧F' },
                { label: 'Show Note List', shortcut: '⌘⇧1' },
                { type: 'separator' },
                { label: 'Show Attachment Browser', shortcut: '⌘⇧A' },
                { type: 'separator' },
                { label: 'Pin Note', shortcut: '' },
              ]
            }
          ];
          // Replace default File/Edit/View menus with Notes-specific ones
          combinedMenus.splice(1, 3, ...notesMenus);
          break;
          
        case 'calendar':
          // Add Calendar-specific menu items
          const calendarMenus: MenuItem[] = [
            {
              label: 'File',
              items: [
                { label: 'New Event', shortcut: '⌘N' },
                { label: 'New Calendar', shortcut: '⌥⌘N' },
                { type: 'separator' },
                { label: 'Close', shortcut: '⌘W', action: () => windowManager.closeWindow('calendar') },
                { type: 'separator' },
                { label: 'Export...', shortcut: '' },
                { label: 'Print...', shortcut: '⌘P' },
              ]
            },
            {
              label: 'Edit',
              items: [
                { label: 'Undo', shortcut: '⌘Z' },
                { label: 'Redo', shortcut: '⇧⌘Z' },
                { type: 'separator' },
                { label: 'Cut', shortcut: '⌘X' },
                { label: 'Copy', shortcut: '⌘C' },
                { label: 'Paste', shortcut: '⌘V' },
                { label: 'Select All', shortcut: '⌘A' },
                { type: 'separator' },
                { label: 'Find', shortcut: '⌘F' },
              ]
            },
            {
              label: 'View',
              items: [
                { label: 'Day', shortcut: '⌘1' },
                { label: 'Week', shortcut: '⌘2' },
                { label: 'Month', shortcut: '⌘3' },
                { label: 'Year', shortcut: '⌘4' },
                { type: 'separator' },
                { label: 'Go to Today', shortcut: '⌘T' },
                { label: 'Go to Date...', shortcut: '⇧⌘T' },
                { type: 'separator' },
                { label: 'Show Calendar List', shortcut: '⌘⇧S' },
                { label: 'Show Sidebar', shortcut: '⌘⇧1' },
              ]
            },
            {
              label: 'Calendar',
              items: [
                { label: 'Add Calendar...', shortcut: '' },
                { label: 'New Calendar List...', shortcut: '' },
                { type: 'separator' },
                { label: 'Refresh Calendars', shortcut: '⌘R' },
                { type: 'separator' },
                { label: 'Work', shortcut: '', icon: () => <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" /> },
                { label: 'Personal', shortcut: '', icon: () => <div className="w-2 h-2 bg-green-500 rounded-full mr-2" /> },
                { label: 'Deadlines', shortcut: '', icon: () => <div className="w-2 h-2 bg-red-500 rounded-full mr-2" /> },
                { label: 'Social', shortcut: '', icon: () => <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" /> },
              ]
            }
          ];
          // Replace default File/Edit/View menus with Calendar-specific ones
          combinedMenus.splice(1, 3, ...calendarMenus);
          break;
          
        case 'messages':
          // Add Messages-specific menu items
          const messagesMenus: MenuItem[] = [
            {
              label: 'File',
              items: [
                { label: 'New Message', shortcut: '⌘N' },
                { label: 'New Conversation', shortcut: '⇧⌘N' },
                { type: 'separator' },
                { label: 'Close', shortcut: '⌘W', action: () => windowManager.closeWindow('messages') },
                { type: 'separator' },
                { label: 'Save Chat Transcript...', shortcut: '' },
                { label: 'Print...', shortcut: '⌘P' },
              ]
            },
            {
              label: 'Edit',
              items: [
                { label: 'Undo', shortcut: '⌘Z' },
                { label: 'Redo', shortcut: '⇧⌘Z' },
                { type: 'separator' },
                { label: 'Cut', shortcut: '⌘X' },
                { label: 'Copy', shortcut: '⌘C' },
                { label: 'Paste', shortcut: '⌘V' },
                { label: 'Select All', shortcut: '⌘A' },
                { type: 'separator' },
                { label: 'Find', shortcut: '⌘F' },
                { label: 'Find in Conversation...', shortcut: '⌥⌘F' },
              ]
            },
            {
              label: 'View',
              items: [
                { label: 'Show Sidebar', shortcut: '⇧⌘S' },
                { type: 'separator' },
                { label: 'Conversations', shortcut: '⌘1' },
                { label: 'Media', shortcut: '⌘2' },
                { label: 'Files', shortcut: '⌘3' },
                { label: 'Links', shortcut: '⌘4' },
              ]
            },
            {
              label: 'Conversation',
              items: [
                { label: 'Add Contact...', shortcut: '' },
                { label: 'Add to Group...', shortcut: '' },
                { type: 'separator' },
                { label: 'Audio Call', shortcut: '⇧⌘A' },
                { label: 'Video Call', shortcut: '⇧⌘V' },
                { type: 'separator' },
                { label: 'Hide Alerts', shortcut: '' },
                { label: 'Delete Conversation', shortcut: '⌫' },
              ]
            }
          ];
          // Replace default File/Edit/View menus with Messages-specific ones
          combinedMenus.splice(1, 3, ...messagesMenus);
          break;
      }
    }
    
    return combinedMenus;
  }, [MENU_ITEMS, appMenus, activeWindow, windowManager]);

  if (!mounted) return null;

  return (
    <>
      {/* Add global styling for this component */}
      <style jsx global>{`
        .menu-bar, .menu-bar * {
          font-family: 'Dosis', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: 0.02em;
        }

        .menu-name {
          font-family: 'Dosis', sans-serif;
          letter-spacing: 0.02em;
        }

        .menu-bar-item {
          font-family: 'Dosis', sans-serif;
          letter-spacing: 0.02em;
        }
      `}</style>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 30 
        }}
        className={`
          menu-bar w-full h-7 flex items-center justify-between px-2 z-50 text-xs font-sans
          ${theme === 'dark' 
            ? 'bg-[#1D1D1F]/80 text-white border-b border-[#3A3A3C]/30' 
            : 'bg-[#F5F5F7]/80 text-black border-b border-[#E5E5E7]/50'
          } 
          backdrop-blur-xl shadow-sm
        `}
      >
        {/* Left section: Apple logo and menu items */}
        <div className="flex items-center h-full">
          <DropdownMenu>
            <DropdownMenuTrigger 
              className={`
                h-full px-2.5 rounded-sm flex items-center justify-center
                ${theme === 'dark'
                  ? 'hover:bg-[#3A3A3C]/50 active:bg-[#3A3A3C]/70'
                  : 'hover:bg-[#E5E5E7]/50 active:bg-[#E5E5E7]/70'
                }
                transition-colors duration-150
              `}
            >
              <svg viewBox="0 0 256 256" className="w-[14px] h-[14px] fill-current">
                <path fillRule="evenodd" d="m112.8 111.5q25.7 27 1.7 53.9-21.4 20.9-41.9 22.9c8.6-7.4 11-19.8 5.8-29.9q-26.1-27.2-39.2-47.7-15.1-39.6 40.9-53.8 9.4-15.5 91.4-55.6c15.4-4.4 31.8 2.8 38.9 17.2 7 14.4 2.8 31.8-10.2 41.3l-112.8 7.1q-1.9 20.7 25.4 44.6zm-35.5-43.4c-11.4 3.4-26.3 9.6-30.2 20.4-2 5.8-0.9 12.1 1.1 17.7 10.5 16.1 24.2 31.5 37.5 45.3l1 1.1 0.7 1.3c2.8 5.5 4 11.5 3.7 17.4 6-3.7 11.4-8.2 16.2-12.8 12.4-14.2 11.3-26.2-1.5-39.8-14.4-12.7-29.3-30.2-28.5-50.6zm124.1-45.1c-4.8-9.8-15.8-14.9-26.4-12.3-20.9 10.3-42.3 21.1-62.1 33.2-3.7 2.2-12.5 7.7-18.6 12.5l102.1-6.4c7.4-6.8 9.5-17.8 5-27z" />
                <path fillRule="evenodd" d="m143.8 144.3q-25.7-26.9-1.8-53.9 21.5-20.8 42-22.8c-8.6 7.4-11 19.7-5.9 29.8q26.2 27.2 39.3 47.8 15 39.6-40.9 53.7-9.4 15.5-91.5 55.7c-15.4 4.4-31.7-2.9-38.8-17.3-7-14.4-2.8-31.7 10.1-41.3l112.8-7.1q2-20.7-25.3-44.6zm35.5 43.5c11.4-3.4 26.3-9.6 30.2-20.5 2-5.7 0.9-12-1.2-17.6-10.4-16.1-24.2-31.5-37.4-45.4l-1.1-1-0.6-1.3c-2.8-5.5-4-11.5-3.8-17.4-5.9 3.6-11.4 8.2-16.1 12.8-12.5 14.1-11.3 26.2 1.4 39.7 14.5 12.7 29.4 30.3 28.6 50.7zm-124.1 45.1c4.8 9.7 15.8 14.8 26.3 12.2 20.9-10.2 42.3-21 62.2-33.1 3.7-2.2 12.5-7.7 18.5-12.6l-102 6.5c-7.4 6.8-9.5 17.8-5 27z" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className={`
                w-64 p-0 rounded-lg overflow-hidden shadow-lg font-sans
                ${theme === 'dark'
                  ? 'bg-[#2C2C2E]/90 backdrop-blur-xl border border-[#3A3A3C]/50'
                  : 'bg-[#F5F5F7]/90 backdrop-blur-xl border border-[#E5E5E7]/70'
                }
              `}
            >
              <div className={`p-3 border-b ${theme === 'dark' ? 'border-[#3A3A3C]/50' : 'border-[#E5E5E7]/70'}`}>
                <h4 className="text-sm font-medium">About This Mac</h4>
              </div>
              <div className="p-1">
                <DropdownMenuItem 
                  onClick={() => windowManager.openWindow('settings')}
                  className="rounded-md px-3"
                >
                  System Settings...
                  <DropdownMenuShortcut className="ml-auto">⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => windowManager.openWindow('app-store')}
                  className="rounded-md px-3"  
                >
                  App Store...
                </DropdownMenuItem>
                <DropdownMenuSeparator className={`my-1 ${theme === 'dark' ? 'bg-[#3A3A3C]/50' : 'bg-[#E5E5E7]/70'}`} />
                <DropdownMenuItem 
                  onClick={() => windowManager.openWindow('finder')}
                  className="rounded-md px-3"
                >
                  <div className="flex items-center">
                    <FolderOpen size={14} className="mr-2" />
                    Finder
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => windowManager.openWindow('calendar')}
                  className="rounded-md px-3"
                >
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2" />
                    Calendar
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => windowManager.openWindow('messages')}
                  className="rounded-md px-3"
                >
                  <div className="flex items-center">
                    <MessagesSquare size={14} className="mr-2" />
                    Messages
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => windowManager.openWindow('notes')}
                  className="rounded-md px-3"
                >
                  <div className="flex items-center">
                    <StickyNote size={14} className="mr-2" />
                    Notes
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className={`my-1 ${theme === 'dark' ? 'bg-[#3A3A3C]/50' : 'bg-[#E5E5E7]/70'}`} />
                <DropdownMenuItem className="rounded-md px-3">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2" />
                    Recent Items
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className={`my-1 ${theme === 'dark' ? 'bg-[#3A3A3C]/50' : 'bg-[#E5E5E7]/70'}`} />
                <DropdownMenuItem className="rounded-md px-3">
                  Force Quit...
                  <DropdownMenuShortcut className="ml-auto">⌥⌘⎋</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator className={`my-1 ${theme === 'dark' ? 'bg-[#3A3A3C]/50' : 'bg-[#E5E5E7]/70'}`} />
                <DropdownMenuItem className="rounded-md px-3">
                  <div className="flex items-center">
                    <svg className="w-3.5 h-3.5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19C8.13 19 5 15.87 5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 2V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Sleep
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-3">
                  <div className="flex items-center">
                    <RotateCcw size={14} className="mr-2" />
                    Restart...
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-md px-3">
                  <div className="flex items-center">
                    <Power size={14} className="mr-2" />
                    Shut Down...
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator className={`my-1 ${theme === 'dark' ? 'bg-[#3A3A3C]/50' : 'bg-[#E5E5E7]/70'}`} />
                <DropdownMenuItem 
                  onClick={handleReload}
                  className="rounded-md px-3"
                >
                  <div className="flex items-center">
                    <LogOut size={14} className="mr-2" />
                    Log Out {PERSONAL_INFO.name}...
                  </div>
                  <DropdownMenuShortcut className="ml-auto">⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="h-full flex items-center">
            {allMenus.map((item) => (
              <SnigdhaOSMenuItem 
                key={item.label} 
                label={item.label} 
                items={item.items}
              />
            ))}
          </div>
        </div>

        {/* Title of active app */}
        <div className="absolute left-1/2 -translate-x-1/2 font-semibold tracking-tight">
          {activeApp?.title || "Finder"}
        </div>

        {/* Right section: Status icons */}
        <div className="flex items-center space-x-1.5">
          <motion.div 
            whileTap={{ scale: 0.95 }}
            onClick={handleThemeToggle} 
            className={`
              px-1.5 py-1 rounded-sm cursor-pointer
              ${theme === 'dark'
                ? 'hover:bg-[#3A3A3C]/50 active:bg-[#3A3A3C]/70'
                : 'hover:bg-[#E5E5E7]/50 active:bg-[#E5E5E7]/70'
              }
              transition-colors duration-150
            `}
          >
            {theme === 'dark' ? 
              <Moon size={13} className="text-[#F5F5F7]" /> : 
              <Sun size={13} className="text-[#1D1D1F]" />
            }
          </motion.div>
          
          <div className={`
            relative px-1.5 py-1 rounded-sm
            ${theme === 'dark'
              ? 'hover:bg-[#3A3A3C]/50'
              : 'hover:bg-[#E5E5E7]/50'
            }
            transition-colors duration-150
          `}>
            <Battery size={13} className={isCharging ? "animate-pulse" : ""} />
            {batteryLevel < 20 && (
              <span className="absolute right-0.5 bottom-0.5 w-1.5 h-1.5 bg-[#FF2D55] rounded-full"></span>
            )}
            {isCharging && (
              <span className="absolute right-0.5 bottom-0.5 w-1.5 h-1.5 bg-[#30D158] rounded-full"></span>
            )}
          </div>
          
          <div className={`
            px-1.5 py-1 rounded-sm
            ${theme === 'dark'
              ? 'hover:bg-[#3A3A3C]/50'
              : 'hover:bg-[#E5E5E7]/50'
            }
            transition-colors duration-150
          `}>
            <Wifi size={13} />
          </div>
          
          <div className={`
            px-1.5 py-1 rounded-sm font-medium
            ${theme === 'dark'
              ? 'hover:bg-[#3A3A3C]/50'
              : 'hover:bg-[#E5E5E7]/50'
            }
            transition-colors duration-150
          `}>
            {currentTime}
          </div>
          
          {/* Search icon */}
          <div className={`
            px-1.5 py-1 rounded-sm
            ${theme === 'dark'
              ? 'hover:bg-[#3A3A3C]/50'
              : 'hover:bg-[#E5E5E7]/50'
            }
            transition-colors duration-150
          `}>
            <Search size={13} />
          </div>
          
          {/* Control Center */}
          <DropdownMenu>
            <DropdownMenuTrigger className={`
              px-1.5 py-1 rounded-sm
              ${theme === 'dark'
                ? 'hover:bg-[#3A3A3C]/50 active:bg-[#3A3A3C]/70'
                : 'hover:bg-[#E5E5E7]/50 active:bg-[#E5E5E7]/70'
              }
              transition-colors duration-150
            `}>
              <svg viewBox="0 0 24 24" className="w-[13px] h-[13px] fill-current">
                <path d="M12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16M12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18M20,10H22V14H20V10M4,10H6V14H4V10Z" />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className={`
                absolute z-50 right-0 top-full mt-1 w-80 rounded-lg shadow-lg 
                ${theme === 'dark' ? 'bg-[#1E1E1E]/90 text-white' : 'bg-white/90 text-black'} 
                backdrop-blur-md border 
                ${theme === 'dark' ? 'border-[#3A3A3C]/50' : 'border-[#E5E5E7]/70'}
                font-sans
              `}
            >
              <div className={`p-3 grid grid-cols-2 gap-2 w-[320px]`}>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex flex-col items-center justify-center rounded-xl p-3
                    ${theme === 'dark'
                      ? 'bg-[#3A3A3C]/50 hover:bg-[#3A3A3C]/70'
                      : 'bg-white/80 hover:bg-white shadow-sm'
                    }
                    transition-all duration-200 cursor-pointer
                  `}
                >
                  <Wifi size={22} className="mb-2" />
                  <span className="text-xs font-medium">Wi-Fi</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex flex-col items-center justify-center rounded-xl p-3
                    ${theme === 'dark'
                      ? 'bg-[#3A3A3C]/50 hover:bg-[#3A3A3C]/70'
                      : 'bg-white/80 hover:bg-white shadow-sm'
                    }
                    transition-all duration-200 cursor-pointer
                  `}
                >
                  <Battery size={22} className="mb-2" />
                  <span className="text-xs font-medium">Battery</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleThemeToggle}
                  className={`
                    flex flex-col items-center justify-center rounded-xl p-3
                    ${theme === 'dark'
                      ? 'bg-[#3A3A3C]/50 hover:bg-[#3A3A3C]/70'
                      : 'bg-white/80 hover:bg-white shadow-sm'
                    }
                    transition-all duration-200 cursor-pointer
                  `}
                >
                  {theme === 'dark' ? 
                    <Moon size={22} className="mb-2" /> : 
                    <Sun size={22} className="mb-2" />
                  }
                  <span className="text-xs font-medium">
                    {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  </span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex flex-col items-center justify-center rounded-xl p-3
                    ${theme === 'dark'
                      ? 'bg-[#3A3A3C]/50 hover:bg-[#3A3A3C]/70'
                      : 'bg-white/80 hover:bg-white shadow-sm'
                    }
                    transition-all duration-200 cursor-pointer
                  `}
                >
                  <Command size={22} className="mb-2" />
                  <span className="text-xs font-medium">Keyboard</span>
                </motion.div>
              </div>
              <div className="p-3 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-medium text-muted-foreground">Display</h4>
                    <span className="text-xs font-medium">100%</span>
                  </div>
                  <div className={`
                    h-1.5 w-full rounded-full overflow-hidden
                    ${theme === 'dark' ? 'bg-[#3A3A3C]/50' : 'bg-[#E5E5E7]/70'}
                  `}>
                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${theme === 'dark' ? 'bg-[#0A84FF]' : 'bg-[#0066FF]'}`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-medium text-muted-foreground">Sound</h4>
                    <span className="text-xs font-medium">85%</span>
                  </div>
                  <div className={`
                    h-1.5 w-full rounded-full overflow-hidden
                    ${theme === 'dark' ? 'bg-[#3A3A3C]/50' : 'bg-[#E5E5E7]/70'}
                  `}>
                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: '85%' }}
                      transition={{ duration: 0.5 }}
                      className={`h-full rounded-full ${theme === 'dark' ? 'bg-[#0A84FF]' : 'bg-[#0066FF]'}`}
                    />
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>
    </>
  );
});

// Add display name
MenuBar.displayName = 'MenuBar';