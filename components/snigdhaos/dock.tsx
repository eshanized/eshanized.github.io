"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DivideIcon, 
  Folder, FolderOpen, File, ChevronRight, 
  Calendar, Clock, BellRing, 
  Plus, Send, Users, Video, Phone,
  Edit, Bold, Italic, Underline, Image, ListChecks,
  Compass, Mail, Music, FolderSearch, MessageCircle, MapPin, Terminal, Settings, AppWindow, StickyNote, Store, Maximize
} from 'lucide-react';
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
} from "@/components/ui/context-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { DESKTOP_APPS } from '@/lib/constants';
import { useWindowManager } from './window-context';

// macOS Dock App Icons using Lucide components
const FinderIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-blue-300 to-blue-600">
    <FolderSearch className="w-8 h-8 text-white" />
  </div>
);

const SafariIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-sky-300 to-blue-500">
    <Compass className="w-8 h-8 text-white" />
  </div>
);

const MailIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-blue-400 to-blue-600">
    <Mail className="w-8 h-8 text-white" />
  </div>
);

const MusicIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-red-400 to-red-600">
    <Music className="w-8 h-8 text-white" />
  </div>
);

const PhotosIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-orange-300 to-pink-500">
    <Image className="w-8 h-8 text-white" />
  </div>
);

const MessagesIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-green-400 to-green-600">
    <MessageCircle className="w-8 h-8 text-white" />
  </div>
);

const MapsIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-green-300 to-blue-400">
    <MapPin className="w-8 h-8 text-white" />
  </div>
);

const TerminalIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950">
    <Terminal className="w-8 h-8 text-white" />
  </div>
);

const SettingsIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-gray-400 to-gray-600">
    <Settings className="w-8 h-8 text-white" />
  </div>
);

const AppStoreIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-blue-400 to-blue-600">
    <Store className="w-8 h-8 text-white" />
  </div>
);

const NotesIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-yellow-100 to-yellow-300">
    <StickyNote className="w-8 h-8 text-yellow-800" />
  </div>
);

const CalendarIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-red-100 to-red-200">
    <Calendar className="w-8 h-8 text-red-600" />
  </div>
);

type DockProps = {
  openWindows: string[];
  activeWindow: string | null;
  minimizedWindows: string[];
  onAppClick: (appId: string) => void;
};

export function Dock({ openWindows, activeWindow, minimizedWindows, onAppClick }: DockProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState(0);
  const windowManager = useWindowManager();

  // Use DESKTOP_APPS to get app data but display them in the order we want
  const appIcons = {
    'finder': FinderIcon,
    'safari': SafariIcon,
    'mail': MailIcon,
    'messages': MessagesIcon,
    'notes': NotesIcon,
    'calendar': CalendarIcon,
    'music': MusicIcon,
    'photos': PhotosIcon,
    'maps': MapsIcon,
    'app-store': AppStoreIcon,
    'settings': SettingsIcon,
    'terminal': TerminalIcon,
  };

  // Generate apps dynamically from DESKTOP_APPS
  const apps = DESKTOP_APPS.map(app => ({
    id: app.id,
    title: app.title,
    icon: appIcons[app.id as keyof typeof appIcons] || TerminalIcon // Fallback to TerminalIcon if not found
  })).filter(app => appIcons[app.id as keyof typeof appIcons]); // Only include apps that have an icon defined

  // Split apps into system apps and other apps
  const systemApps = apps.filter(app => app.id === 'finder'); // Finder
  const otherApps = apps.filter(app => app.id !== 'finder'); // Everything else

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (dockRef.current) {
        const rect = dockRef.current.getBoundingClientRect();
        setMousePosition(e.clientX - rect.left);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getScale = (index: number) => {
    if (!dockRef.current) return 1;
    
    const rect = dockRef.current.getBoundingClientRect();
    const itemWidth = 60; // Icon width + padding
    const iconCenter = (index * itemWidth) + (itemWidth / 2);
    const distance = Math.abs(mousePosition - iconCenter);
    const maxDistance = 120;
    
    if (distance > maxDistance) return 1;
    
    return 1 + (1 - distance / maxDistance) * 0.5;
  };

  const isOpen = (id: string) => openWindows.includes(id);
  const isActive = (id: string) => activeWindow === id;
  const isMinimized = (id: string) => minimizedWindows.includes(id);

  // Get app-specific context menu items
  const getAppContextMenu = (appId: string) => {
    switch (appId) {
      case 'finder':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('finder')}>
              New Finder Window
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              New Folder
              <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Go to Home
              <ContextMenuShortcut>⇧⌘H</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Go to Documents
              <ContextMenuShortcut>⇧⌘O</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Go to Downloads
              <ContextMenuShortcut>⌥⌘L</ContextMenuShortcut>
            </ContextMenuItem>
          </>
        );
        
      case 'notes':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('notes')}>
              New Note
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              New Folder
              <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Show All Notes
            </ContextMenuItem>
            <ContextMenuItem>
              Export as PDF...
            </ContextMenuItem>
          </>
        );
        
      case 'calendar':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('calendar')}>
              New Event
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              Go to Today
              <ContextMenuShortcut>⌘T</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Day View
              <ContextMenuShortcut>⌘1</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Week View
              <ContextMenuShortcut>⌘2</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Month View
              <ContextMenuShortcut>⌘3</ContextMenuShortcut>
            </ContextMenuItem>
          </>
        );
        
      case 'messages':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('messages')}>
              New Message
              <ContextMenuShortcut>⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              New Conversation
              <ContextMenuShortcut>⇧⌘N</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Find...
              <ContextMenuShortcut>⌘F</ContextMenuShortcut>
            </ContextMenuItem>
            <ContextMenuItem>
              Hide Alerts
            </ContextMenuItem>
          </>
        );
        
      case 'settings':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('settings')}>
              Open System Settings
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              About This Mac
            </ContextMenuItem>
            <ContextMenuItem>
              System Information
            </ContextMenuItem>
            <ContextMenuItem>
              Software Update...
            </ContextMenuItem>
          </>
        );
        
      case 'app-store':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('app-store')}>
              Open App Store
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              Updates
            </ContextMenuItem>
            <ContextMenuItem>
              Purchased Apps
            </ContextMenuItem>
            <ContextMenuItem>
              Redeem Gift Card...
            </ContextMenuItem>
          </>
        );
        
      default:
        return (
          <ContextMenuItem onClick={() => onAppClick(appId)}>
            Open {DESKTOP_APPS.find(app => app.id === appId)?.title || appId}
            <ContextMenuShortcut>⌘O</ContextMenuShortcut>
          </ContextMenuItem>
        );
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="fixed bottom-4 inset-x-0 flex justify-center z-50 mx-auto"
      ref={dockRef}
    >
      <div className="dock-container glass-effect rounded-2xl p-1.5 shadow-2xl border border-white/10 backdrop-blur-xl bg-black/20 dark:bg-white/10">
        <div className="flex items-end h-16 px-1 gap-1 justify-center">
          <AnimatePresence>
            {/* System apps (Finder) */}
            {systemApps.map((app, index) => {
              const AppIcon = app.icon;
              return (
                <TooltipProvider key={app.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ContextMenu>
                        <ContextMenuTrigger asChild>
                          <motion.div
                            className="relative group"
                            animate={{ scale: getScale(index) }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            onHoverStart={() => setHovered(app.id)}
                            onHoverEnd={() => setHovered(null)}
                            layout
                          >
                            <motion.div
                              className={`relative p-1.5 rounded-xl cursor-pointer transition-all duration-200
                                ${isActive(app.id) ? 'bg-accent/60' : 'hover:bg-accent/30'} 
                                group-hover:translate-y-[-10px]`}
                              onClick={() => onAppClick(app.id)}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="w-12 h-12 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <AppIcon />
                                </div>
                                
                                {/* Icon reflection */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-200" />
                              </div>
                              
                              {/* Running indicator */}
                              {isOpen(app.id) && (
                                <motion.div 
                                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    isActive(app.id) && !isMinimized(app.id)
                                      ? 'bg-primary shadow-glow'
                                      : 'bg-white/70'
                                  }`} />
                                </motion.div>
                              )}
                              
                              {/* App bounce animation */}
                              {isActive(app.id) && (
                                <motion.div
                                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/20 rounded-full shadow-glow"
                                  layoutId={`bounce-${app.id}`}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                              )}
                            </motion.div>
                          </motion.div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                          {getAppContextMenu(app.id)}
                          
                          {isOpen(app.id) && (
                            <>
                              <ContextMenuSeparator />
                              <ContextMenuItem onClick={() => onAppClick(app.id)}>
                                {isMinimized(app.id) ? "Show" : "Hide"}
                                <ContextMenuShortcut>⌘H</ContextMenuShortcut>
                              </ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuSub>
                                <ContextMenuSubTrigger>Options</ContextMenuSubTrigger>
                                <ContextMenuSubContent className="w-48">
                                  <ContextMenuItem>
                                    Keep in Dock
                                  </ContextMenuItem>
                                  <ContextMenuItem>
                                    Show in Finder
                                  </ContextMenuItem>
                                </ContextMenuSubContent>
                              </ContextMenuSub>
                              <ContextMenuItem className="text-destructive" onClick={() => windowManager.closeWindow(app.id)}>
                                Quit
                                <ContextMenuShortcut>⌘Q</ContextMenuShortcut>
                              </ContextMenuItem>
                            </>
                          )}
                        </ContextMenuContent>
                      </ContextMenu>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="mb-2 glass-effect"
                      sideOffset={5}
                    >
                      <p>{app.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
            
            {/* Separator */}
            <div className="mx-1 h-8 w-px self-end mb-4 bg-background/30" />
            
            {/* Other apps */}
            {otherApps.map((app, index) => {
              const AppIcon = app.icon;
              return (
                <TooltipProvider key={app.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ContextMenu>
                        <ContextMenuTrigger asChild>
                          <motion.div
                            className="relative group"
                            animate={{ scale: getScale(index + systemApps.length + 1) }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            onHoverStart={() => setHovered(app.id)}
                            onHoverEnd={() => setHovered(null)}
                            layout
                          >
                            <motion.div
                              className={`relative p-1.5 rounded-xl cursor-pointer transition-all duration-200
                                ${isActive(app.id) ? 'bg-accent/60' : 'hover:bg-accent/30'} 
                                group-hover:translate-y-[-10px]`}
                              onClick={() => onAppClick(app.id)}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="w-12 h-12 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <AppIcon />
                                </div>
                                
                                {/* Icon reflection */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-200" />
                              </div>
                              
                              {/* Running indicator */}
                              {isOpen(app.id) && (
                                <motion.div 
                                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1"
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    isActive(app.id) && !isMinimized(app.id)
                                      ? 'bg-primary shadow-glow'
                                      : 'bg-white/70'
                                  }`} />
                                </motion.div>
                              )}
                              
                              {/* App bounce animation */}
                              {isActive(app.id) && (
                                <motion.div
                                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/20 rounded-full shadow-glow"
                                  layoutId={`bounce-${app.id}`}
                                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                              )}
                            </motion.div>
                          </motion.div>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                          {getAppContextMenu(app.id)}
                          
                          {isOpen(app.id) && (
                            <>
                              <ContextMenuSeparator />
                              <ContextMenuItem onClick={() => onAppClick(app.id)}>
                                {isMinimized(app.id) ? "Show" : "Hide"}
                                <ContextMenuShortcut>⌘H</ContextMenuShortcut>
                              </ContextMenuItem>
                              <ContextMenuSeparator />
                              <ContextMenuSub>
                                <ContextMenuSubTrigger>Options</ContextMenuSubTrigger>
                                <ContextMenuSubContent className="w-48">
                                  <ContextMenuItem>
                                    Keep in Dock
                                  </ContextMenuItem>
                                  <ContextMenuItem>
                                    Show in Finder
                                  </ContextMenuItem>
                                </ContextMenuSubContent>
                              </ContextMenuSub>
                              <ContextMenuItem className="text-destructive" onClick={() => windowManager.closeWindow(app.id)}>
                                Quit
                                <ContextMenuShortcut>⌘Q</ContextMenuShortcut>
                              </ContextMenuItem>
                            </>
                          )}
                        </ContextMenuContent>
                      </ContextMenu>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="top" 
                      className="mb-2 glass-effect"
                      sideOffset={5}
                    >
                      <p>{app.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}