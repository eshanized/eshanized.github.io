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

// Modern Dock App Icons with enhanced designs
const FilesIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30">
    <div className="relative w-8 h-8">
      <FolderSearch className="w-8 h-8 text-white/90 absolute transform -rotate-3" />
      <FolderSearch className="w-8 h-8 text-white absolute transform rotate-3" />
    </div>
  </div>
);

const ChromeIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 shadow-lg shadow-sky-500/30 relative overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)]" />
    <Compass className="w-8 h-8 text-white transform hover:rotate-180 transition-transform duration-500" />
  </div>
);

const MailIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 shadow-lg shadow-blue-600/30 relative">
    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)]" />
    <Mail className="w-8 h-8 text-white transform -rotate-6" />
  </div>
);

const MusicIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl relative group">
    <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-red-500 to-orange-500 rounded-xl shadow-lg shadow-rose-500/30" />
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Music className="w-8 h-8 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
  </div>
);

const PhotosIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 shadow-lg shadow-pink-500/30" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.2),transparent)]" />
    <Image className="w-8 h-8 text-white relative z-10 transform hover:scale-110 transition-transform duration-300" />
  </div>
);

const MessagesIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#2AABEE] via-[#2AABEE] to-[#229ED9] shadow-lg shadow-[#2AABEE]/30" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_-10%,rgba(255,255,255,0.2),transparent)]" />
    <svg viewBox="0 0 100 100" className="w-8 h-8 text-white relative z-10">
      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="4" />
      <path d="M20,50 C20,50 45,38 55,34 C65,30 75,25 75,25 C75,25 80,23 80,27 C80,31 75,70 75,70 C75,70 73,75 68,73 C63,71 48,61 48,61 C48,61 45,59 48,56 C51,53 65,40 65,40 C65,40 67,38 65,37 C63,36 45,48 35,55 C25,62 20,60 20,58 C20,56 20,50 20,50 Z" fill="currentColor" />
    </svg>
  </div>
);

const MapsIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl relative group overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 shadow-lg shadow-emerald-500/30" />
    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.2),transparent)] group-hover:translate-x-full transition-transform duration-700" />
    <MapPin className="w-8 h-8 text-white relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300" />
  </div>
);

const TerminalIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black shadow-lg shadow-zinc-900/50" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent)]" />
    <Terminal className="w-8 h-8 text-green-400 relative z-10 group-hover:text-green-300 transition-colors duration-300" />
  </div>
);

const SettingsIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl relative group overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 shadow-lg shadow-gray-600/30" />
    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.1),transparent)] animate-spin-slow" />
    <Settings className="w-8 h-8 text-white relative z-10 transform group-hover:rotate-90 transition-transform duration-500" />
  </div>
);

const AppStoreIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl relative group overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-violet-600 shadow-lg shadow-blue-500/30" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Store className="w-8 h-8 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
  </div>
);

const NotesIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl relative group overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-300 shadow-lg shadow-amber-200/30" />
    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent,rgba(255,255,255,0.3),transparent)] group-hover:translate-x-full transition-transform duration-500" />
    <StickyNote className="w-8 h-8 text-amber-800 relative z-10 transform -rotate-6 group-hover:rotate-0 transition-transform duration-300" />
  </div>
);

const CalendarIcon = () => (
  <div className="flex items-center justify-center w-full h-full rounded-xl relative group overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-red-400 via-red-500 to-rose-600 shadow-lg shadow-red-500/30" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_-20%,rgba(255,255,255,0.2),transparent)]" />
    <Calendar className="w-8 h-8 text-white relative z-10 transform group-hover:-translate-y-1 transition-transform duration-300" />
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
    'finder': FilesIcon,
    'safari': ChromeIcon,
    'mail': MailIcon,
    'messages': MessagesIcon,
    'notes': NotesIcon,
    'calendar': CalendarIcon,
    'music': MusicIcon,
    'photos': PhotosIcon,
    'maps': MapsIcon,
    'software-center': AppStoreIcon,
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
  const systemApps = apps.filter(app => app.id === 'finder'); // Files
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
              New Files Window
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
        
      case 'software-center':
        return (
          <>
            <ContextMenuItem onClick={() => windowManager.openWindow('software-center')}>
              Open Software Center
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem>
              Updates
            </ContextMenuItem>
            <ContextMenuItem>
              Installed Software
            </ContextMenuItem>
            <ContextMenuItem>
              Browse Categories
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
    <>
      {/* Add global styling for enhanced dock effects */}
      <style jsx global>{`
        .neo-dock {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1) 0%,
            rgba(255, 255, 255, 0.05) 100%
          );
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.2),
            inset 0 1px 1px rgba(255, 255, 255, 0.15),
            inset 0 -1px 1px rgba(0, 0, 0, 0.15);
        }

        .dock-item {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .dock-item:hover {
          transform: translateY(-12px) scale(1.1);
        }

        .dock-item-active {
          position: relative;
        }

        .dock-item-active::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background: currentColor;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }

        .dock-glow {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dock-item:hover .dock-glow {
          opacity: 1;
          background: radial-gradient(
            circle at center,
            rgba(255, 255, 255, 0.15) 0%,
            transparent 70%
          );
        }

        .dock-reflection {
          position: absolute;
          bottom: -20px;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          filter: blur(4px);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .dock-item:hover .dock-reflection {
          opacity: 0.5;
        }

        .dock-separator {
          position: relative;
          width: 2px;
          background: rgba(255, 255, 255, 0.1);
          margin: 0 4px;
          overflow: hidden;
        }

        .dock-separator::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          animation: separator-glow 2s ease-in-out infinite;
        }

        @keyframes separator-glow {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
      `}</style>

      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.2 
        }}
        className="fixed bottom-6 inset-x-0 flex justify-center z-50 mx-auto px-4"
        ref={dockRef}
      >
        <div className="neo-dock rounded-2xl p-2 backdrop-blur-2xl border border-white/20">
          <div className="flex items-end h-16 px-2 gap-2">
            <AnimatePresence mode="popLayout">
              {/* System apps (Finder) */}
              <div className="flex items-end gap-2">
                {systemApps.map((app, index) => (
                  <DockItem
                    key={app.id}
                    app={app}
                    index={index}
                    isOpen={isOpen(app.id)}
                    isActive={isActive(app.id)}
                    isMinimized={isMinimized(app.id)}
                    onAppClick={onAppClick}
                    getScale={getScale}
                    getAppContextMenu={getAppContextMenu}
                    windowManager={windowManager}
                  />
                ))}
              </div>

              {/* Creative separator with glow effect */}
              <div className="dock-separator self-stretch my-2" />

              {/* Other apps with enhanced layout */}
              <div className="flex items-end gap-2">
                {otherApps.map((app, index) => (
                  <DockItem
                    key={app.id}
                    app={app}
                    index={index + systemApps.length + 1}
                    isOpen={isOpen(app.id)}
                    isActive={isActive(app.id)}
                    isMinimized={isMinimized(app.id)}
                    onAppClick={onAppClick}
                    getScale={getScale}
                    getAppContextMenu={getAppContextMenu}
                    windowManager={windowManager}
                  />
                ))}
              </div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dock reflection effect */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-gradient-to-b from-white/5 to-transparent blur-xl rounded-full" />
      </motion.div>
    </>
  );
}

// New DockItem component for better organization
function DockItem({ 
  app, 
  index, 
  isOpen, 
  isActive, 
  isMinimized,
  onAppClick,
  getScale,
  getAppContextMenu,
  windowManager
}: {
  app: { id: string; title: string; icon: any };
  index: number;
  isOpen: boolean;
  isActive: boolean;
  isMinimized: boolean;
  onAppClick: (id: string) => void;
  getScale: (index: number) => number;
  getAppContextMenu: (id: string) => React.ReactNode;
  windowManager: any;
}) {
  const AppIcon = app.icon;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <motion.div
                className="dock-item relative group"
                animate={{ 
                  scale: getScale(index),
                  y: isActive ? -4 : 0
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 25
                }}
                layout
              >
                <motion.div
                  className={`
                    relative p-2 rounded-xl cursor-pointer
                    ${isActive ? 'bg-accent/40' : 'hover:bg-accent/20'} 
                    transition-all duration-300 ease-out
                  `}
                  onClick={() => onAppClick(app.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-12 h-12 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <AppIcon />
                    </div>
                    
                    {/* Enhanced glow effect */}
                    <div className="dock-glow" />
                    
                    {/* Enhanced reflection */}
                    <div className="dock-reflection" />
                  </div>
                  
                  {/* Running indicator with pulse animation */}
                  {isOpen && (
                    <motion.div 
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <motion.div 
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive && !isMinimized
                            ? 'bg-primary shadow-glow'
                            : 'bg-white/70'
                        }`}
                        animate={isActive ? {
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.8, 1]
                        } : {}}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  )}
                  
                  {/* Enhanced bounce animation */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1"
                      layoutId={`bounce-${app.id}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        background: [
                          "rgba(var(--primary), 0.4)",
                          "rgba(var(--primary), 0.6)",
                          "rgba(var(--primary), 0.4)"
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              </motion.div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64 backdrop-blur-xl bg-black/40 border-white/20">
              {getAppContextMenu(app.id)}
              
              {isOpen && (
                <>
                  <ContextMenuSeparator />
                  <ContextMenuItem onClick={() => onAppClick(app.id)}>
                    {isMinimized ? "Show" : "Hide"}
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
                        Show in Files
                      </ContextMenuItem>
                    </ContextMenuSubContent>
                  </ContextMenuSub>
                  <ContextMenuItem 
                    className="text-red-400 hover:text-red-300" 
                    onClick={() => windowManager.closeWindow(app.id)}
                  >
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
          className="mb-2 backdrop-blur-xl bg-black/40 border-white/20"
          sideOffset={5}
        >
          <p>{app.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}