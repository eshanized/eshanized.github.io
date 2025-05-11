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
import SafariApp from './apps/safari-app';
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
        return <SafariApp />;
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
    const isWindow = (e.target as HTMLElement).closest('.snigdhaOS-window') !== null;
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
                <div className="h-full relative overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-blue-900"></div>
                    
                    {/* Stars background */}
                    <div className="absolute inset-0">
                      {Array.from({ length: 100 }).map((_, i) => (
                        <div 
                          key={i}
                          className="absolute rounded-full bg-white pulse"
                          style={{
                            width: Math.random() * 2 + 1 + 'px',
                            height: Math.random() * 2 + 1 + 'px',
                            top: Math.random() * 100 + '%',
                            left: Math.random() * 100 + '%',
                            animationDelay: Math.random() * 4 + 's',
                            animationDuration: Math.random() * 4 + 3 + 's',
                          }}
                        />
                      ))}
                    </div>
                    
                    {/* Gradient orbs */}
                    <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 blur-3xl -top-[200px] -right-[200px] opacity-50 spin-slow"></div>
                    <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-pink-600/30 to-red-600/30 blur-3xl -bottom-[200px] -left-[100px] opacity-40 spin-slow" style={{ animationDirection: 'reverse', animationDelay: '-4s' }}></div>
                  </div>
                  
                  {/* Content wrapper with scroll */}
                  <div className="absolute inset-0 z-10 overflow-auto">
                    <div className="min-h-full w-full flex items-center justify-center p-4">
                      <div className="w-full max-w-6xl mx-auto py-8">
                        
                        {/* Two column layout */}
                        <div className="flex flex-col lg:flex-row items-center">
                          {/* Left column - hero content */}
                          <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 lg:pr-8 mb-8 lg:mb-0">
                            {/* Main welcome content */}
                            <motion.div 
                              initial={{ opacity: 0, y: 30 }} 
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                            >
                              <h1 className="font-bold text-white">
                                <span className="block text-5xl lg:text-7xl mb-3 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-transparent bg-clip-text gradient-text">
                                  Portfolio<span className="text-white text-4xl lg:text-6xl">.</span>
                                </span>
                                <span className="text-xl lg:text-2xl text-blue-300">SnigdhaOS Experience</span>
                              </h1>
                              
                              <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full my-6"></div>
                              
                              <p className="text-base lg:text-xl text-gray-300 mb-6 leading-relaxed max-w-lg">
                                Explore my work through this interactive SnigdhaOS-inspired interface with a unique blend of design and functionality. Discover projects, skills, and more through a familiar environment.
                              </p>
                            </motion.div>
                            
                            {/* Buttons */}
                            <motion.div 
                              className="flex flex-wrap gap-4"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.7 }}
                            >
                              <motion.button
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                whileHover={{ 
                                  scale: 1.05,
                                  boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)"
                                }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                onClick={() => {
                                  setShowWelcome(false);
                                  handleOpenApp('about');
                                }}
                                className="px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-medium text-base lg:text-lg shadow-lg flex items-center gap-3 ring-2 ring-white/10"
                              >
                                <Sparkles className="w-4 h-4 lg:w-5 lg:h-5" />
                                Explore Portfolio
                              </motion.button>
                              
                              <motion.button
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                onClick={() => {
                                  setShowWelcome(false);
                                  handleOpenApp('projects');
                                }}
                                className="px-6 py-3 lg:px-8 lg:py-4 bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-xl text-white font-medium text-base lg:text-lg"
                              >
                                View Projects
                              </motion.button>
                            </motion.div>
                            
                            {/* Features list */}
                            <motion.div 
                              className="mt-6"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.5, delay: 1 }}
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                  { title: "Interactive UI", desc: "Fully functional SnigdhaOS experience" },
                                  { title: "Projects", desc: "Explore my work in detail" },
                                  { title: "Skills", desc: "Technical expertise breakdown" },
                                  { title: "Contact", desc: "Get in touch easily" }
                                ].map((item, i) => (
                                  <div key={i} className="flex items-start gap-3">
                                    <div className="mt-1 min-w-[20px] h-5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                    <div>
                                      <h3 className="text-white font-medium">{item.title}</h3>
                                      <p className="text-gray-400 text-sm">{item.desc}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          </div>
                          
                          {/* Right column - floating 3D illustration */}
                          <div className="w-full lg:w-1/2 flex items-center justify-center">
                            <motion.div 
                              className="relative w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] float"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 1, delay: 0.5 }}
                            >
                              {/* 3D Mockup of the SnigdhaOS interface */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl scale-75"></div>
                              
                              <div className="relative z-10 w-full h-full flex items-center justify-center">
                                <div className="w-[240px] h-[180px] lg:w-[340px] lg:h-[240px] bg-gradient-to-tr from-gray-800 to-gray-900 rounded-xl shadow-2xl perspective">
                                  {/* Screen mockup */}
                                  <div className="relative w-full h-full rounded-xl overflow-hidden border-2 border-gray-700">
                                    {/* Screen content with dock at bottom */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                                      {/* Menu bar */}
                                      <div className="h-6 bg-gray-900/80 backdrop-blur-md flex items-center px-3">
                                        <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                      </div>
                                      
                                      {/* Desktop */}
                                      <div className="absolute inset-0 mt-6">
                                        {/* Window */}
                                        <div className="absolute top-8 left-10 w-40 h-32 bg-gray-800/90 backdrop-blur-md rounded-lg border border-gray-700 shadow-lg">
                                          <div className="h-5 bg-gray-700 flex items-center px-2 rounded-t-lg">
                                            <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                          </div>
                                        </div>
                                        
                                        {/* Dock */}
                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-8 px-2 bg-gray-800/60 backdrop-blur-md rounded-full flex items-center border border-gray-700/50">
                                          {Array.from({ length: 5 }).map((_, i) => (
                                            <div key={i} className="w-5 h-5 mx-1 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                        
                        {/* Footer with info */}
                        <motion.div 
                          className="mt-8 lg:mt-4 flex flex-wrap justify-center items-center gap-3 lg:gap-8 px-4"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.2 }}
                        >
                          <div className="px-4 py-2 rounded-xl bg-gray-800/30 backdrop-blur-md flex items-center gap-2 text-gray-400 text-sm border border-gray-700/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                            </svg>
                            Interactive Experience
                          </div>
                          
                          <div className="px-4 py-2 rounded-xl bg-gray-800/30 backdrop-blur-md flex items-center gap-2 text-gray-400 text-sm border border-gray-700/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Press
                            <span className="bg-gray-700/80 text-blue-400 px-1.5 py-0.5 rounded text-xs font-mono">⌘</span> + 
                            <span className="bg-gray-700/80 text-blue-400 px-1.5 py-0.5 rounded text-xs font-mono">Space</span>
                            for search
                          </div>
                          
                          <div className="px-4 py-2 rounded-xl bg-gray-800/30 backdrop-blur-md flex items-center gap-2 text-gray-400 text-sm border border-gray-700/40">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Made with modern tech
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
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