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
      {/* Add global styling for this component */}
      <style jsx global>{`
        .menu-bar, .menu-bar * {
          font-family: 'Dosis', sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: 0.02em;
        }

        .glass-effect {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .menu-pill {
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .menu-pill:hover {
          transform: translateY(-1px);
        }

        .status-icon {
          transition: all 0.2s ease;
        }

        .status-icon:hover {
          transform: scale(1.1);
        }

        .menu-separator {
          width: 1px;
          height: 16px;
          background: ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'};
          margin: 0 8px;
        }

        .neo-dropdown {
          backdrop-filter: blur(20px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .menu-item-hover {
          position: relative;
          transition: all 0.3s ease;
        }

        .menu-item-hover::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 12px;
          padding: 1px;
          background: linear-gradient(45deg, #cba6f7, #89b4fa);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .menu-item-hover:hover::before {
          opacity: 1;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }
      `}</style>
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`
          menu-bar w-full h-10 flex items-center justify-between px-4 z-50 
          ${theme === 'dark' 
            ? 'bg-gradient-to-r from-[#1D1D1F]/90 via-[#2C2C2E]/90 to-[#1D1D1F]/90 text-white' 
            : 'bg-gradient-to-r from-[#F5F5F7]/90 via-[#FFFFFF]/90 to-[#F5F5F7]/90 text-black'
          } 
          glass-effect border-b ${theme === 'dark' ? 'border-[#3A3A3C]/30' : 'border-[#E5E5E7]/50'}
        `}
      >
        {/* Left section: Apple logo and menu items */}
        <div className="flex items-center space-x-2 h-full">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
              menu-pill px-3 py-1.5 rounded-full flex items-center
              ${theme === 'dark' 
                ? 'bg-[#2C2C2E] hover:bg-[#3A3A3C]' 
                : 'bg-white hover:bg-[#F5F5F7] shadow-sm'
              }
              transition-all duration-200
            `}
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
            {allMenus.map((item) => (
              <SnigdhaOSMenuItem 
                key={item.label} 
                label={item.label} 
                items={item.items}
                className={`
                  menu-pill px-3 py-1.5 rounded-full text-sm
                  ${theme === 'dark' 
                    ? 'hover:bg-[#3A3A3C]/50' 
                    : 'hover:bg-[#E5E5E7]/50'
                  }
                `}
              />
            ))}
          </div>
        </div>

        {/* Center section: Active app title with icon */}
        <motion.div 
          className={`
            absolute left-1/2 -translate-x-1/2 
            menu-pill px-4 py-1.5 rounded-full flex items-center gap-2
            ${theme === 'dark' 
              ? 'bg-[#2C2C2E]/80 text-white' 
              : 'bg-white/80 text-black shadow-sm'
            }
          `}
          initial={false}
          animate={{ scale: [0.95, 1], opacity: [0.5, 1] }}
          transition={{ duration: 0.2 }}
        >
          {activeApp?.icon && <activeApp.icon size={14} />}
          <span className="font-medium">{activeApp?.title || "Finder"}</span>
        </motion.div>

        {/* Right section: Status icons */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleThemeToggle}
            className={`
              status-icon p-2 rounded-full
              ${theme === 'dark' 
                ? 'bg-[#2C2C2E] hover:bg-[#3A3A3C]' 
                : 'bg-white hover:bg-[#F5F5F7] shadow-sm'
              }
            `}
          >
            {theme === 'dark' ? 
              <Moon size={14} className="text-[#F5F5F7]" /> : 
              <Sun size={14} className="text-[#1D1D1F]" />
            }
          </motion.button>

          <div className="menu-separator" />

          {/* Battery Status */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`
              status-icon p-2 rounded-full relative
              ${theme === 'dark' 
                ? 'bg-[#2C2C2E] hover:bg-[#3A3A3C]' 
                : 'bg-white hover:bg-[#F5F5F7] shadow-sm'
              }
            `}
          >
            <Battery size={14} className={isCharging ? "animate-pulse" : ""} />
            {batteryLevel < 20 && (
              <span className="absolute right-1 bottom-1 w-1.5 h-1.5 bg-[#FF2D55] rounded-full" />
            )}
            {isCharging && (
              <span className="absolute right-1 bottom-1 w-1.5 h-1.5 bg-[#30D158] rounded-full" />
            )}
          </motion.div>

          {/* WiFi Status */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`
              status-icon p-2 rounded-full
              ${theme === 'dark' 
                ? 'bg-[#2C2C2E] hover:bg-[#3A3A3C]' 
                : 'bg-white hover:bg-[#F5F5F7] shadow-sm'
              }
            `}
          >
            <Wifi size={14} />
          </motion.div>

          <div className="menu-separator" />

          {/* Time */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`
              status-icon px-3 py-1.5 rounded-full font-medium text-sm
              ${theme === 'dark' 
                ? 'bg-[#2C2C2E] hover:bg-[#3A3A3C]' 
                : 'bg-white hover:bg-[#F5F5F7] shadow-sm'
              }
            `}
          >
            {currentTime}
          </motion.div>

          {/* Search and Control Center */}
          <div className="flex items-center space-x-1">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`
                status-icon p-2 rounded-full
                ${theme === 'dark' 
                  ? 'bg-[#2C2C2E] hover:bg-[#3A3A3C]' 
                  : 'bg-white hover:bg-[#F5F5F7] shadow-sm'
                }
              `}
            >
              <Search size={14} />
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className={`
                    status-icon p-2 rounded-full
                    ${theme === 'dark' 
                      ? 'bg-[#2C2C2E] hover:bg-[#3A3A3C]' 
                      : 'bg-white hover:bg-[#F5F5F7] shadow-sm'
                    }
                  `}
                >
                  <Command size={14} />
                </motion.div>
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
        </div>
      </motion.div>
    </>
  );
});

// Add display name
MenuBar.displayName = 'MenuBar';