"use client";

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useTheme } from 'next-themes';
import { PERSONAL_INFO, DESKTOP_APPS } from '@/lib/constants';
import { SnigdhaOSLogo } from './snigdhaos-logo';
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
      label: 'Files',
      items: [
        { label: 'About Files', shortcut: '', id: 'about' },
        { type: 'separator' },
        { label: 'Preferences...', shortcut: '⌘,' },
        { type: 'separator' },
        { label: 'Empty Trash...', shortcut: '⇧⌘⌫' },
        { label: 'Hide Files', shortcut: '⌘H' },
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
        { id: 'finder', label: 'Files', icon: FolderOpen },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'messages', label: 'Messages', icon: MessagesSquare },
        { id: 'notes', label: 'Notes', icon: StickyNote },
        { type: 'separator' },
        { id: 'settings', label: 'System Settings', icon: Settings },
        { id: 'software-center', label: 'Software Center', icon: AppWindow },
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
      <style jsx global>{`
        .menu-bar, .menu-bar * {
          font-family: 'Dosis', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: 0.02em;
        }
        .glass-effect {
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          background: rgba(255,255,255,0.10);
          box-shadow: 0 8px 32px rgba(0,0,0,0.10);
          border: 1px solid rgba(255,255,255,0.10);
        }
        .menu-pill {
          transition: all 0.3s cubic-bezier(.4,2,.6,1);
          transform-origin: center;
          border-radius: 9999px;
          position: relative;
          overflow: hidden;
        }
        .menu-pill::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          pointer-events: none;
          box-shadow: 0 0 8px 2px #cba6f7, 0 0 0 0 #89b4fa;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .menu-pill:hover::after {
          opacity: 0.5;
        }
        .menu-item-animated {
          transition: background 0.2s, color 0.2s, box-shadow 0.2s;
          border-radius: 12px;
          position: relative;
          overflow: hidden;
        }
        .menu-item-animated:active {
          box-shadow: 0 0 0 2px #cba6f7;
        }
        .menu-separator {
          width: 1px;
          height: 16px;
          background: ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          margin: 0 8px;
        }
        .quick-panel {
          position: absolute;
          top: 48px;
          right: 24px;
          min-width: 320px;
          background: rgba(40,40,60,0.95);
          border-radius: 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
          z-index: 100;
          padding: 24px 20px 20px 20px;
          display: none;
        }
        .quick-panel.open {
          display: block;
          animation: slideDown 0.4s cubic-bezier(.4,2,.6,1);
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #cba6f7 0%, #89b4fa 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          font-size: 1rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          cursor: pointer;
          transition: box-shadow 0.2s;
        }
        .user-avatar:hover {
          box-shadow: 0 4px 16px #cba6f7;
        }
      `}</style>
      <motion.div
        className={`menu-bar w-full h-12 flex items-center justify-between px-6 z-50 glass-effect border-b ${theme === 'dark' ? 'border-[#3A3A3C]/30' : 'border-[#E5E5E7]/50'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        {/* Left: Logo & Menus */}
        <div className="flex items-center space-x-2 h-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="menu-pill px-3 py-1.5 flex items-center bg-white/10 dark:bg-[#2C2C2E]/60"
          >
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                <SnigdhaOSLogo className="w-5 h-5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="start"
                className={`
                  w-[380px] p-4 rounded-2xl overflow-hidden neo-dropdown
                  ${theme === 'dark'
                    ? 'bg-[#1E1E2E]/90 text-white'
                    : 'bg-white/90 text-black'
                  }
                `}
              >
                {/* Header Section */}
                <div className="mb-6">
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4"
                  >
                    <div className={`
                      p-3 rounded-xl
                      ${theme === 'dark' ? 'bg-[#313244]' : 'bg-[#F5F5F7]'}
                    `}>
                      <SnigdhaOSLogo className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">SnigdhaOS</h3>
                      <p className="text-sm opacity-60">Version 1.0.0</p>
                    </div>
                  </motion.div>
                </div>

                {/* Quick Actions Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: Settings, label: 'System Settings', action: () => windowManager.openWindow('settings') },
                    { icon: AppWindow, label: 'Software Center', action: () => windowManager.openWindow('software-center') },
                    { icon: FolderOpen, label: 'Finder', action: () => windowManager.openWindow('finder') },
                    { icon: Command, label: 'Spotlight', action: () => {} },
                    { icon: AppWindow, label: 'Software Center', action: () => windowManager.openWindow('software-center') },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      onClick={item.action}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className={`
                        glass-card p-4 text-left
                        ${theme === 'dark' ? 'hover:bg-[#313244]/50' : 'hover:bg-[#F5F5F7]/50'}
                      `}
                    >
                      <item.icon className="w-6 h-6 mb-2" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.button>
                  ))}
                </div>

                {/* System Status */}
                <div className="space-y-4 mb-6">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`
                      p-4 rounded-xl space-y-3
                      ${theme === 'dark' ? 'bg-[#313244]/50' : 'bg-[#F5F5F7]/50'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Battery className="w-4 h-4" />
                        <span className="text-sm font-medium">Battery</span>
                      </div>
                      <span className="text-sm">{batteryLevel}%</span>
                    </div>
                    <div className={`
                      h-1.5 w-full rounded-full overflow-hidden
                      ${theme === 'dark' ? 'bg-[#1E1E2E]' : 'bg-white'}
                    `}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${batteryLevel}%` }}
                        className="h-full rounded-full bg-gradient-to-r from-[#cba6f7] to-[#89b4fa]"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReload}
                    className="menu-item-hover p-3 rounded-xl text-left"
                  >
                    <div className="flex items-center gap-3">
                      <RotateCcw className="w-5 h-5" />
                      <div>
                        <p className="text-sm font-medium">Restart</p>
                        <p className="text-xs opacity-60">Refresh your system</p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReload}
                    className="menu-item-hover p-3 rounded-xl text-left"
                  >
                    <div className="flex items-center gap-3">
                      <LogOut className="w-5 h-5" />
                      <div>
                        <p className="text-sm font-medium">Log Out</p>
                        <p className="text-xs opacity-60">{PERSONAL_INFO.name}</p>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
          <div className="h-full flex items-center space-x-1">
            {allMenus.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="menu-item-animated"
              >
                <SnigdhaOSMenuItem
                  label={item.label}
                  items={item.items}
                  className="menu-pill px-3 py-1.5 text-sm bg-white/0 dark:bg-[#2C2C2E]/0 hover:bg-gradient-to-r hover:from-[#cba6f7]/20 hover:to-[#89b4fa]/20"
                />
              </motion.div>
            ))}
          </div>
        </div>
        {/* Center: Active App */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 menu-pill px-5 py-2 flex items-center gap-2 bg-white/30 dark:bg-[#2C2C2E]/60 shadow-lg"
          initial={false}
          animate={{ scale: [0.95, 1], opacity: [0.5, 1] }}
          transition={{ duration: 0.2 }}
        >
          {activeApp?.icon && <activeApp.icon size={18} />}
          <span className="font-semibold text-base tracking-wide">
            {activeApp?.title || "Snigdha OS - Eshanized Edition"}
          </span>
        </motion.div>
        {/* Right: Status, Quick Actions, User */}
        <div className="flex items-center space-x-2 relative">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleThemeToggle}
            className="status-icon p-2 rounded-full bg-white/20 dark:bg-[#2C2C2E]/60"
          >
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </motion.button>
          <div className="menu-separator" />
          {/* Battery */}
          <motion.div className="status-icon p-2 rounded-full bg-white/20 dark:bg-[#2C2C2E]/60 relative">
            <Battery size={16} className={isCharging ? "animate-pulse" : ""} />
            {batteryLevel < 20 && <span className="absolute right-1 bottom-1 w-1.5 h-1.5 bg-[#FF2D55] rounded-full" />}
            {isCharging && <span className="absolute right-1 bottom-1 w-1.5 h-1.5 bg-[#30D158] rounded-full" />}
          </motion.div>
          {/* WiFi */}
          <motion.div className="status-icon p-2 rounded-full bg-white/20 dark:bg-[#2C2C2E]/60">
            <Wifi size={16} />
          </motion.div>
          <div className="menu-separator" />
          {/* Time */}
          <motion.div className="status-icon px-3 py-1.5 rounded-full font-medium text-sm bg-white/20 dark:bg-[#2C2C2E]/60">
            {currentTime}
          </motion.div>
          {/* Quick Access Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="status-icon p-2 rounded-full bg-gradient-to-tr from-[#cba6f7] to-[#89b4fa] shadow-md"
            // onClick={toggleQuickPanel} // To be implemented
          >
            <Command size={16} />
          </motion.button>
          {/* User Avatar */}
          <div className="user-avatar ml-2">
            {/* {userInitials} */}
            U
          </div>
        </div>
      </motion.div>
    </>
  );
});

// Add display name
MenuBar.displayName = 'MenuBar';