"use client";

import React, { useState, useEffect, type CSSProperties } from 'react';
import { useTheme } from 'next-themes';
import { MenuBar } from './menu-bar';
import { Dock } from './dock';
import { Window } from './window';
import { BootAnimation } from './boot-animation';
import { LoginScreen } from './login-screen';
import { DESKTOP_APPS, DESKTOP_NOTES } from '@/lib/constants';
import AboutApp from './apps/about-app';
import ProjectsApp from './apps/projects-app';
import SkillsApp from './apps/skills-app';
import ExperienceApp from './apps/experience-app';
import EducationApp from './apps/education-app';
import ContactApp from './apps/contact-app';
import SettingsApp from './apps/settings-app';
import AppStoreApp from './apps/app-store';
import FinderApp from './apps/finder-app';
import CalendarApp from './apps/calendar-app';
import MessagesApp from './apps/messages-app';
import NotesApp from './apps/notes-app';
import ChromeApp from './apps/chrome-app';
import MailApp from './apps/mail-app';
import MusicApp from './apps/music-app';
import MapsApp from './apps/maps-app';
import PhotosApp from './apps/photos-app';
import TerminalApp from './apps/terminal-app';
import RomanticMusicApp from './apps/romantic-music-app';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Command, Sparkles, StickyNote } from 'lucide-react';
import { MenuProvider } from './menu-context';
import { WindowProvider, WindowContext } from './window-context';
import { DesktopIcon } from './desktop-icon';
import NoteWindow from './apps/note-window';
import RomanticWelcome from './romantic-welcome';
import { DesktopContextMenu } from './desktop-context-menu';
import WelcomeWindow from './welcome-window';

// Enhanced animated background component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-sm" />
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      <div className="absolute -bottom-8 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000" />
    </div>
  );
};

interface ParticlesEffectProps {
  theme: string;
}

// Enhanced particles component
const ParticlesEffect = ({ theme }: ParticlesEffectProps) => {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 4 + 2;
      const color = theme === 'dark' 
        ? `rgba(255, 255, 255, ${Math.random() * 0.3})`
        : `rgba(0, 0, 0, ${Math.random() * 0.2})`;
      
      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}vw;
        top: -10px;
        z-index: 0;
      `;
      
      document.querySelector('.particles-container')?.appendChild(particle);
      
      const animation = particle.animate(
        [
          { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
          { 
            transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`, 
            opacity: 0 
          }
        ], 
        {
          duration: Math.random() * 3000 + 3000,
          easing: 'linear'
        }
      );
      
      animation.onfinish = () => particle.remove();
    };
    
    const interval = setInterval(createParticle, 200);
    return () => clearInterval(interval);
  }, [theme]);
  
  return <div className="particles-container fixed inset-0 pointer-events-none" />;
};

// Enhanced heart particles for romantic theme
const HeartParticles = () => {
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerHTML = '♥';
      const cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -10vh;
        font-size: ${Math.random() * 20 + 10}px;
        color: hsla(${Math.random() * 60 + 320}, 100%, 70%, ${Math.random() * 0.5 + 0.3});
        z-index: 0;
        pointer-events: none;
        animation: fall ${Math.random() * 3 + 2}s linear forwards;
        text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
      `;
      heart.style.cssText = cssText;
      
      document.querySelector('.heart-particles')?.appendChild(heart);
      
      setTimeout(() => heart.remove(), 5000);
    };
    
    const heartInterval = setInterval(createHeart, 300);
    
    const style = document.createElement('style');
    const styleText = `
      @keyframes fall {
        to {
          transform: translateY(110vh) rotate(${Math.random() * 360}deg);
        }
      }
    `;
    style.innerHTML = styleText;
    document.head.appendChild(style);
    
    return () => {
      clearInterval(heartInterval);
      document.head.removeChild(style);
    };
  }, []);
  
  return <div className="heart-particles" />;
};

export function SnigdhaOSDesktop() {
  const [mounted, setMounted] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [specialUser, setSpecialUser] = useState<string | undefined>(undefined);
  const { theme = 'light' } = useTheme();
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [maximizedWindows, setMaximizedWindows] = useState<string[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [openNotes, setOpenNotes] = useState<string[]>([]);
  const [welcomeAnimationComplete, setWelcomeAnimationComplete] = useState(false);
  
  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Auto-complete welcome animation after 1 second
    const timer = setTimeout(() => {
      setWelcomeAnimationComplete(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBootComplete = () => {
    setIsBooting(false);
  };

  const handleLogin = (user?: string) => {
    setIsLoggedIn(true);
    setSpecialUser(user);
  };

  const handleOpenApp = (appId: string) => {
    setShowWelcome(false);
    if (minimizedWindows.includes(appId)) {
      setMinimizedWindows(minimizedWindows.filter(id => id !== appId));
    } else if (!openWindows.includes(appId)) {
      setOpenWindows([...openWindows, appId]);
    }
    setActiveWindow(appId);
  };

  const handleCloseApp = (appId: string) => {
    setOpenWindows(openWindows.filter(id => id !== appId));
    setMinimizedWindows(minimizedWindows.filter(id => id !== appId));
    setMaximizedWindows(maximizedWindows.filter(id => id !== appId));
    if (activeWindow === appId) {
      setActiveWindow(openWindows.length > 1 ? openWindows.filter(id => id !== appId)[0] : null);
    }
  };

  const handleMinimizeApp = (appId: string) => {
    if (minimizedWindows.includes(appId)) {
      setMinimizedWindows(minimizedWindows.filter(id => id !== appId));
      setActiveWindow(appId);
    } else {
      setMinimizedWindows([...minimizedWindows, appId]);
      if (activeWindow === appId) {
        setActiveWindow(openWindows.filter(id => id !== appId)[0] || null);
      }
    }
  };

  const handleMaximizeApp = (appId: string) => {
    if (maximizedWindows.includes(appId)) {
      setMaximizedWindows(maximizedWindows.filter(id => id !== appId));
    } else {
      setMaximizedWindows([...maximizedWindows, appId]);
    }
  };

  const handleWindowFocus = (appId: string) => {
    setActiveWindow(appId);
  };

  const handleOpenNote = (noteId: string) => {
    console.log("Opening note:", noteId);
    if (!openNotes.includes(noteId)) {
      setOpenNotes(prevNotes => [...prevNotes, noteId]);
    }
    
    // Make sure to set active window after state update
    setTimeout(() => {
      setActiveWindow(noteId);
      console.log("Active window set to:", noteId);
    }, 0);
  };

  const handleCloseNote = (noteId: string) => {
    setOpenNotes(openNotes.filter(id => id !== noteId));
    if (activeWindow === noteId) {
      setActiveWindow(openNotes.length > 1 ? openNotes.filter(id => id !== noteId)[0] : null);
    }
  };

  const getAppComponent = (appId: string) => {
    switch (appId) {
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'skills':
        return <SkillsApp />;
      case 'experience':
        return <ExperienceApp />;
      case 'education':
        return <EducationApp />;
      case 'contact':
        return <ContactApp specialUser={specialUser} />;
      case 'settings':
        return <SettingsApp />;
      case 'app-store':
        return <AppStoreApp />;
      case 'finder':
        return <FinderApp />;
      case 'calendar':
        return <CalendarApp />;
      case 'messages':
        return <MessagesApp specialUser={specialUser} />;
      case 'notes':
        return <NotesApp />;
      case 'safari':
        return <ChromeApp />;
      case 'mail':
        return <MailApp specialUser={specialUser} />;
      case 'music':
        return specialUser === 'snigdha' ? <RomanticMusicApp /> : <MusicApp />;
      case 'maps':
        return <MapsApp />;
      case 'photos':
        return <PhotosApp specialUser={specialUser} />;
      case 'terminal':
        return <TerminalApp />;
      default:
        return null;
    }
  };

  // Create window manager value to override the provider's internal state
  const windowManagerValue = {
    openWindows,
    activeWindow,
    minimizedWindows,
    maximizedWindows,
    openWindow: handleOpenApp,
    closeWindow: handleCloseApp,
    minimizeWindow: handleMinimizeApp,
    maximizeWindow: handleMaximizeApp,
    focusWindow: handleWindowFocus,
    isWindowOpen: (id: string) => openWindows.includes(id),
    isWindowActive: (id: string) => activeWindow === id,
    isWindowMinimized: (id: string) => minimizedWindows.includes(id),
    isWindowMaximized: (id: string) => maximizedWindows.includes(id),
    getWindowStack: () => openWindows,
    bringWindowToTop: handleWindowFocus,
    hideAllWindows: () => {
      const windowsToHide = openWindows.filter(id => id !== activeWindow);
      setMinimizedWindows([...minimizedWindows, ...windowsToHide]);
    },
    minimizeAllWindows: () => {
      setMinimizedWindows([...minimizedWindows, ...openWindows.filter(id => !minimizedWindows.includes(id))]);
      setActiveWindow(null);
    },
    quitApp: handleCloseApp,
  };

  // Enhanced window animations
  const windowVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 },
    minimized: { scale: 0.8, opacity: 0, y: 100 }
  };

  // Different wallpapers based on user
  const getWallpaperUrl = () => {
    if (specialUser === 'snigdha') {
      return theme === 'dark' 
        ? '/images/wallpaper_snigdha.png'
        : '/images/wallpaper_snigdha.png';
    }
    
    return theme === 'dark' 
      ? '/images/wallpaper.jpg'
      : '/images/wallpaper.jpg';
  };

  // Enhanced wallpaper effect
  const getWallpaperStyle = (): CSSProperties => ({
    backgroundImage: `url(${getWallpaperUrl()})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed'
  } as const);

  if (!mounted) return null;

  if (isBooting) {
    return <BootAnimation onComplete={handleBootComplete} />;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  // Apply romantic theme class if special user
  const themeClasses = specialUser === 'snigdha' ? 'snigdha-theme ' + (theme === 'dark' ? 'dark' : '') : '';

  // Desktop context menu handlers
  const handleContextMenu = (e: React.MouseEvent) => {
    // Show context menu on right-click, unless it's on an app window or UI element
    // Check if the target has a specific class or is inside a Window component
    const isWindow = (e.target as HTMLElement).closest('.snigdhaos-window') !== null;
    const isDock = (e.target as HTMLElement).closest('.dock-container') !== null;
    const isMenuBar = (e.target as HTMLElement).closest('.menu-bar') !== null;
    const isDesktopIcon = (e.target as HTMLElement).closest('.desktop-icon') !== null;
    
    if (!isWindow && !isDock && !isMenuBar && !isDesktopIcon) {
      e.preventDefault();
      setContextMenu({ x: e.clientX, y: e.clientY });
    }
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleOpenTerminalFromMenu = () => {
    handleOpenApp('terminal');
  };

  return (
    <WindowContext.Provider value={windowManagerValue}>
      <MenuProvider>
        <motion.div 
          className={`h-screen w-screen overflow-hidden relative ${themeClasses}`}
          style={getWallpaperStyle()}
          onContextMenu={handleContextMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Enhanced background effects */}
          <AnimatedBackground />
          <ParticlesEffect theme={theme} />
          
          {/* Romantic theme effects */}
          {specialUser === 'snigdha' && (
            <>
              <HeartParticles />
              <div className="fixed inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 pointer-events-none" />
            </>
          )}
          
          {/* Desktop icons with enhanced animations */}
          <div className="fixed inset-0 p-4 grid grid-cols-6 gap-4 pointer-events-none">
            <AnimatePresence>
              {specialUser === 'snigdha' && DESKTOP_NOTES.map((note, index) => (
                <motion.div
                  key={note.id}
                  className="pointer-events-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <DesktopIcon
                    id={note.id}
                    title={note.title}
                    type={note.type}
                    content={note.content}
                    position={note.position}
                    onOpen={handleOpenNote}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Enhanced MenuBar */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <MenuBar 
              openWindows={openWindows}
              activeWindow={activeWindow}
              minimizedWindows={minimizedWindows}
              onOpenWindow={handleOpenApp}
              onCloseWindow={handleCloseApp}
              onMinimizeWindow={handleMinimizeApp}
              onMaximizeWindow={handleMaximizeApp}
            />
          </motion.div>

          {/* Enhanced window animations */}
          <AnimatePresence>
            {openWindows.map((appId) => {
              const app = DESKTOP_APPS.find(app => app.id === appId);
              if (!app) return null;
              
              const isMinimized = minimizedWindows.includes(appId);
              const isMaximized = maximizedWindows.includes(appId);
              const isActive = activeWindow === appId;
              
              return (
                <motion.div
                  key={appId}
                  variants={windowVariants}
                  initial="initial"
                  animate={isMinimized ? "minimized" : "animate"}
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Window
                    id={appId}
                    title={app.title}
                    icon={app.icon}
                    defaultPosition={app.defaultPosition}
                    defaultSize={app.defaultSize}
                    isActive={isActive}
                    isMinimized={isMinimized}
                    isMaximized={isMaximized}
                    onClose={() => handleCloseApp(appId)}
                    onMinimize={() => handleMinimizeApp(appId)}
                    onMaximize={() => handleMaximizeApp(appId)}
                    onFocus={() => handleWindowFocus(appId)}
                  >
                    {getAppComponent(appId)}
                  </Window>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Enhanced Dock */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
            className="absolute bottom-0 w-full"
          >
            <Dock 
              openWindows={openWindows}
              activeWindow={activeWindow}
              minimizedWindows={minimizedWindows}
              onAppClick={handleOpenApp}
            />
          </motion.div>

          {/* Enhanced global animations */}
          <style jsx global>
            {`
              @keyframes blob {
                0% { transform: translate(0, 0) scale(1); }
                33% { transform: translate(30px, -50px) scale(1.1); }
                66% { transform: translate(-20px, 20px) scale(0.9); }
                100% { transform: translate(0, 0) scale(1); }
              }
              @keyframes float {
                0% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
                100% { transform: translateY(0); }
              }
              @keyframes pulse {
                0% { opacity: 0.6; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.05); }
                100% { opacity: 0.6; transform: scale(1); }
              }
              @keyframes spin-slow {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
              @keyframes gradient-shift {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              .animate-blob {
                animation: blob 7s infinite;
              }
              .animation-delay-2000 {
                animation-delay: 2s;
              }
              .animation-delay-4000 {
                animation-delay: 4s;
              }
              .animation-delay-6000 {
                animation-delay: 6s;
              }
              .float {
                animation: float 6s ease-in-out infinite;
              }
              .pulse {
                animation: pulse 4s ease-in-out infinite;
              }
              .spin-slow {
                animation: spin-slow 12s linear infinite;
              }
              .gradient-text {
                background-size: 300% 300%;
                animation: gradient-shift 8s ease infinite;
              }
              .shimmer {
                background: linear-gradient(
                  90deg,
                  rgba(255, 255, 255, 0) 0%,
                  rgba(255, 255, 255, 0.2) 50%,
                  rgba(255, 255, 255, 0) 100%
                );
                background-size: 200% 100%;
                animation: shimmer 2s infinite;
              }
              @keyframes shimmer {
                0% { background-position: 100% 0; }
                100% { background-position: -100% 0; }
              }
            `}
          </style>
        </motion.div>
      </MenuProvider>
    </WindowContext.Provider>
  );
}