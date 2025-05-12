"use client";

import { useState, useEffect } from 'react';
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

// Heart Particles Component for the romantic theme
const HeartParticles = () => {
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerHTML = '♥';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = Math.random() * 3 + 2 + 's';
      heart.style.position = 'fixed';
      heart.style.fontSize = Math.random() * 20 + 10 + 'px';
      heart.style.color = `hsla(${Math.random() * 60 + 320}, 100%, 70%, ${Math.random() * 0.5 + 0.3})`;
      heart.style.zIndex = '0';
      heart.style.pointerEvents = 'none';
      heart.style.top = '-10vh';
      heart.style.transform = 'translateY(0)';
      heart.style.animation = 'fall linear forwards';
      
      document.querySelector('.heart-particles')?.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, 5000);
    };
    
    const heartInterval = setInterval(createHeart, 300);
    
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes fall {
        to {
          transform: translateY(110vh) rotate(${Math.random() * 360}deg);
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      clearInterval(heartInterval);
      document.head.removeChild(style);
    };
  }, []);
  
  return <div className="heart-particles"></div>;
};

export function SnigdhaOSDesktop() {
  const [mounted, setMounted] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [specialUser, setSpecialUser] = useState<string | undefined>(undefined);
  const { theme } = useTheme();
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

  if (!mounted) return null;

  if (isBooting) {
    return <BootAnimation onComplete={handleBootComplete} />;
  }

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

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

  // Apply romantic theme class if special user
  const themeClasses = specialUser === 'snigdha' ? `snigdha-theme ${theme === 'dark' ? 'dark' : ''}` : '';

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
        <div 
          className={`h-screen w-screen overflow-hidden relative bg-cover bg-center bg-fixed ${themeClasses}`}
          style={{ backgroundImage: `url(${getWallpaperUrl()})` }}
          onContextMenu={handleContextMenu}
        >
          <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px]" />
          
          {/* Romantic welcome message when logging in with special password */}
          {specialUser === 'snigdha' && <RomanticWelcome />}
          
          {/* Heart particles for romantic theme */}
          {specialUser === 'snigdha' && <HeartParticles />}
          
          {/* Context Menu */}
          {contextMenu && (
            <DesktopContextMenu
              x={contextMenu.x}
              y={contextMenu.y}
              onClose={handleCloseContextMenu}
              onOpenTerminal={handleOpenTerminalFromMenu}
              onCreateNewFolder={() => console.log("Create folder not implemented")}
              onChangeBackground={() => console.log("Change background not implemented")}
            />
          )}
          
          {/* CSS for animations */}
          <style jsx global>{`
            @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0px); }
            }
            @keyframes pulse {
              0% { opacity: 0.6; transform: scale(1); }
              50% { opacity: 1; transform: scale(1.05); }
              100% { opacity: 0.6; transform: scale(1); }
            }
            @keyframes spin-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
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
          `}</style>
          
          {/* Desktop icons - only visible for special user */}
          {specialUser === 'snigdha' && DESKTOP_NOTES.map((note) => (
            <DesktopIcon
              key={note.id}
              id={note.id}
              title={note.title}
              type={note.type}
              content={note.content}
              position={note.position}
              onOpen={handleOpenNote}
            />
          ))}
          
          <MenuBar 
            openWindows={openWindows}
            activeWindow={activeWindow}
            minimizedWindows={minimizedWindows}
            onOpenWindow={handleOpenApp}
            onCloseWindow={handleCloseApp}
            onMinimizeWindow={handleMinimizeApp}
            onMaximizeWindow={handleMaximizeApp}
          />
          
          {/* Note windows - rendered separately from app windows */}
          <AnimatePresence>
            {openNotes.map((noteId) => {
              const note = DESKTOP_NOTES.find(note => note.id === noteId);
              if (!note) return null;
              
              return (
                <Window
                  key={noteId}
                  id={noteId}
                  title={note.title}
                  icon={StickyNote}
                  defaultPosition={note.position}
                  defaultSize={{ width: 500, height: 400 }}
                  isActive={activeWindow === noteId}
                  isMinimized={false}
                  isMaximized={false}
                  onClose={() => handleCloseNote(noteId)}
                  onMinimize={() => {}}
                  onMaximize={() => {}}
                  onFocus={() => setActiveWindow(noteId)}
                >
                  <NoteWindow title={note.title} content={note.content} />
                </Window>
              );
            })}
          </AnimatePresence>
          
          <AnimatePresence>
            {openWindows.map((appId) => {
              const app = DESKTOP_APPS.find(app => app.id === appId);
              if (!app) return null;
              
              const isMinimized = minimizedWindows.includes(appId);
              const isMaximized = maximizedWindows.includes(appId);
              const isActive = activeWindow === appId;
              
              return (
                <Window
                  key={appId}
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
              );
            })}
          </AnimatePresence>
          
          <AnimatePresence>
            {mounted && showWelcome && (
              <Window
                id="welcome"
                title="Welcome"
                icon={Terminal}
                isActive={true}
                isMinimized={false}
                isMaximized={false}
                defaultPosition={{ x: window.innerWidth / 2 - 400, y: window.innerHeight / 2 - 300 }}
                defaultSize={{ width: 800, height: 600 }}
                onClose={() => setShowWelcome(false)}
                onMinimize={() => {}}
                onMaximize={() => {}}
                onFocus={() => {}}
              >
                <WelcomeWindow
                  onCloseWelcome={() => setShowWelcome(false)}
                  onOpenApp={handleOpenApp}
                />
              </Window>
            )}
          </AnimatePresence>
          
          <Dock 
            openWindows={openWindows}
            activeWindow={activeWindow}
            minimizedWindows={minimizedWindows}
            onAppClick={handleOpenApp}
          />
        </div>
      </MenuProvider>
    </WindowContext.Provider>
  );
}