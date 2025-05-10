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
import { motion } from 'framer-motion';
import { MacOSMenuItem, MenuAction } from './menu-item';
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
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`menu-bar w-full h-6 ${theme === 'dark' ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-md flex items-center justify-between px-2 z-50 text-xs font-medium`}
    >
      {/* Left section: Apple logo and menu items */}
      <div className="flex items-center h-full">
        <DropdownMenu>
          <DropdownMenuTrigger className="h-full px-2 hover:bg-accent/50 transition-colors">
            <svg viewBox="0 0 1024 1024" className="w-4 h-4 fill-current">
              <path d="M747.4 535.7c-.4-68.2 30.5-119.6 92.9-157.5-34.9-50-87.7-77.5-149.9-87.7-57.4-9.1-113.4 10.9-147.7 10.9-35.6 0-91.3-11.3-150.5-11.3-77.9 0-149.1 42.7-189.7 110.1-77.9 128.8-20.5 321.1 55.8 426.1 37.9 54.4 82.1 115.5 139.5 113 56.2-2.3 76.7-36.2 144.1-36.2 66.1 0 86.2 36.2 144.1 35 59.6-1.8 97.5-53.5 133.7-107.1 23-35.2 40.6-74.1 51.7-115.8-58.9-25.9-96.8-88.6-96.8-157.5zm-89.5-307.3c32.5-39.8 54.8-95 47.5-150-45.9 2.7-97.5 31.1-128.8 70.1-30 35.6-55.8 91.7-48.1 144.9 47 3.7 97.3-23.1 129.4-65z" />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 p-0 rounded-lg overflow-hidden">
            <div className="bg-accent/20 p-2">
              <h4 className="text-sm">About This Mac</h4>
            </div>
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem onClick={() => windowManager.openWindow('settings')}>
              System Settings...
              <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => windowManager.openWindow('app-store')}>
              App Store...
            </DropdownMenuItem>
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem onClick={() => windowManager.openWindow('finder')}>
              Finder
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => windowManager.openWindow('calendar')}>
              Calendar
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => windowManager.openWindow('messages')}>
              Messages
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => windowManager.openWindow('notes')}>
              Notes
            </DropdownMenuItem>
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem>
              Recent Items
            </DropdownMenuItem>
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem>
              Force Quit...
              <DropdownMenuShortcut>⌥⌘⎋</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem>
              Sleep
            </DropdownMenuItem>
            <DropdownMenuItem>
              Restart...
            </DropdownMenuItem>
            <DropdownMenuItem>
              Shut Down...
            </DropdownMenuItem>
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem onClick={handleReload}>
              Log Out {PERSONAL_INFO.name}...
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="h-full flex items-center">
          {allMenus.map((item) => (
            <MacOSMenuItem 
              key={item.label} 
              label={item.label} 
              items={item.items}
            />
          ))}
        </div>
      </div>

      {/* Title of active app */}
      <div className="absolute left-1/2 -translate-x-1/2 font-semibold">
        {activeApp?.title || "Finder"}
      </div>

      {/* Right section: Status icons */}
      <div className="flex items-center space-x-2">
        <div onClick={handleThemeToggle} className="px-1 cursor-pointer">
          {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
        </div>
        
        <div className="relative px-1">
          <Battery size={14} className={isCharging ? "animate-pulse" : ""} />
          {batteryLevel < 20 && (
            <span className="absolute right-0 bottom-0 w-1 h-1 bg-red-500 rounded-full"></span>
          )}
        </div>
        
        <div className="px-1">
          <Wifi size={14} />
        </div>
        
        <div className="px-1 font-medium">
          {currentTime}
        </div>
        
        {/* Search icon */}
        <div className="ml-1 px-1">
          <Search size={14} />
        </div>
        
        {/* Control Center */}
          <DropdownMenu>
          <DropdownMenuTrigger className="px-1">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16M12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18M20,10H22V14H20V10M4,10H6V14H4V10Z" />
            </svg>
            </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="p-0 rounded-xl overflow-hidden">
            <div className="p-3 grid grid-cols-2 gap-3 bg-accent/10 w-[300px]">
              <div className="flex flex-col items-center justify-center bg-background rounded-xl p-2 hover:bg-accent/20 transition-colors cursor-pointer">
                <Wifi size={24} className="mb-1" />
                <span className="text-xs">Wi-Fi</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-background rounded-xl p-2 hover:bg-accent/20 transition-colors cursor-pointer">
                <Battery size={24} className="mb-1" />
                <span className="text-xs">Battery</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-background rounded-xl p-2 hover:bg-accent/20 transition-colors cursor-pointer" onClick={handleThemeToggle}>
                {theme === 'dark' ? <Moon size={24} className="mb-1" /> : <Sun size={24} className="mb-1" />}
                <span className="text-xs">Dark Mode</span>
                  </div>
              <div className="flex flex-col items-center justify-center bg-background rounded-xl p-2 hover:bg-accent/20 transition-colors cursor-pointer">
                <Command size={24} className="mb-1" />
                <span className="text-xs">Keyboard</span>
                  </div>
                </div>
            <div className="p-3 space-y-3">
              <div className="space-y-1">
                <h4 className="text-xs font-medium text-muted-foreground">Display</h4>
                <div className="h-1 bg-accent/50 rounded-full"></div>
              </div>
                <div className="space-y-1">
                <h4 className="text-xs font-medium text-muted-foreground">Sound</h4>
                <div className="h-1 bg-accent/50 rounded-full"></div>
              </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </motion.div>
  );
})

// Add display name
MenuBar.displayName = 'MenuBar';