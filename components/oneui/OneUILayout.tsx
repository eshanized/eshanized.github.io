"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  User,
  Code, 
  FileText, 
  GraduationCap, 
  Mail, 
  Settings, 
  Briefcase,
  Globe, 
  Camera, 
  Music, 
  Image as ImageIcon, 
  Calendar, 
  Clock, 
  AppWindow, 
  MessageSquare,
  Wifi,
  Battery,
  Lock,
  Home,
  Grid,
  Phone,
  Moon,
  Sun,
  Twitter,
  Facebook,
  Instagram,
  FileCode2
} from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';
import { shouldSkipLockscreen } from '@/lib/lockscreen';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useOneUITheme, OneUIThemeProvider } from './OneUIThemeContext';

// Dynamically import app components with SSR disabled
const AboutApp = dynamic(() => import('@/components/oneui/apps/AboutApp'), { ssr: false });
const ProjectsApp = dynamic(() => import('@/components/oneui/apps/ProjectsApp'), { ssr: false });
const SkillsApp = dynamic(() => import('@/components/oneui/apps/SkillsApp'), { ssr: false });
const ExperienceApp = dynamic(() => import('@/components/oneui/apps/ExperienceApp'), { ssr: false });
const EducationApp = dynamic(() => import('@/components/oneui/apps/EducationApp'), { ssr: false });
const ContactApp = dynamic(() => import('@/components/oneui/apps/ContactApp'), { ssr: false });
const SettingsApp = dynamic(() => import('@/components/oneui/apps/SettingsApp'), { ssr: false });
const SafariApp = dynamic(() => import('@/components/oneui/apps/SafariApp'), { ssr: false });
const MusicApp = dynamic(() => import('@/components/oneui/apps/MusicApp'), { ssr: false });
const PhotosApp = dynamic(() => import('@/components/oneui/apps/PhotosApp'), { ssr: false });
const CameraApp = dynamic(() => import('@/components/oneui/apps/CameraApp'), { ssr: false });
const CalendarApp = dynamic(() => import('@/components/oneui/apps/CalendarApp'), { ssr: false });
const ClockApp = dynamic(() => import('@/components/oneui/apps/ClockApp'), { ssr: false });
const MessagesApp = dynamic(() => import('@/components/oneui/apps/MessagesApp'), { ssr: false });
const PlayStore = dynamic(() => import('@/components/oneui/apps/PlayStore'), { ssr: false });
const PhoneApp = dynamic(() => import('@/components/oneui/apps/PhoneApp'), { ssr: false });
const TwitterApp = dynamic(() => import('@/components/oneui/apps/TwitterApp'), { ssr: false });
const FacebookApp = dynamic(() => import('@/components/oneui/apps/FacebookApp'), { ssr: false });
const InstagramApp = dynamic(() => import('@/components/oneui/apps/InstagramApp'), { ssr: false });
const DevToApp = dynamic(() => import('@/components/oneui/apps/DevToApp'), { ssr: false });

// Type definitions
interface OneUIApp {
  id: string;
  name: string;
  icon: React.FC<any>;
  color: string;
  component?: React.ComponentType<any>;
  badgeCount?: number;
}

interface AppFolder {
  id: string;
  name: string;
  apps: OneUIApp[];
}

// OneUI Layout Component
export default function OneUILayout({ children }: { children?: React.ReactNode }) {
  const [showLockscreen, setShowLockscreen] = useState(!shouldSkipLockscreen());
  return (
    <OneUILayoutContent>{children}</OneUILayoutContent>
  );
}

function OneUILayoutContent({ children }: { children?: React.ReactNode }) {
  const { isDarkMode, toggleDarkMode, colors: themeColors } = useOneUITheme();
  // State hooks
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [batteryLevel, setBatteryLevel] = useState<number>(85);
  const [isLocked, setIsLocked] = useState<boolean>(!shouldSkipLockscreen());
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState<boolean>(false);
  const [recentApps, setRecentApps] = useState<string[]>([]);
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showControlCenter, setShowControlCenter] = useState<boolean>(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState<boolean>(false);

  // Check if lockscreen should be skipped
  useEffect(() => {
    // If the user has chosen to skip the lockscreen, unlock immediately
    if (shouldSkipLockscreen()) {
      setIsLocked(false);
    }
  }, []);

  // Update time and date
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long', 
        day: 'numeric'
      });
      
      setCurrentTime(timeString);
      setCurrentDate(dateString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle app opening
  const handleOpenApp = (appId: string) => {
    // Close folder if open
    if (openFolder) {
      setOpenFolder(null);
    }
    
    setOpenApp(appId);
    
    // Add to recent apps if not already at front
    setRecentApps(prev => {
      const newRecent = prev.filter(id => id !== appId);
      return [appId, ...newRecent].slice(0, 5); // Keep max 5 recent apps
    });
  };

  // Handle returning to home screen
  const handleGoHome = () => {
    setOpenApp(null);
    setIsAppSwitcherOpen(false);
    setOpenFolder(null);
    setShowControlCenter(false);
    setShowNotificationCenter(false);
    setIsSearchOpen(false);
  };

  // Lock/unlock device
  const handleLockToggle = () => {
    // If skipLockscreen is enabled, don't lock the device
    if (!isLocked && !shouldSkipLockscreen()) {
      setIsLocked(true);
      // Reset all UI states when locking
      handleGoHome();
    } else {
      setIsLocked(false);
    }
  };

  // Handle folder opening
  const handleOpenFolder = (folderId: string) => {
    setOpenFolder(prev => prev === folderId ? null : folderId);
  };
  
  // Define color palette for app icons with dark mode support
  const appIconColors = {
    blue: 'bg-blue-600 dark:bg-blue-500',
    green: 'bg-green-600 dark:bg-green-500',
    red: 'bg-red-600 dark:bg-red-500',
    purple: 'bg-purple-600 dark:bg-purple-500',
    pink: 'bg-pink-600 dark:bg-pink-500',
    orange: 'bg-orange-600 dark:bg-orange-500',
    teal: 'bg-teal-600 dark:bg-teal-500',
    cyan: 'bg-cyan-600 dark:bg-cyan-500',
    yellow: 'bg-yellow-600 dark:bg-yellow-500',
    indigo: 'bg-indigo-600 dark:bg-indigo-500',
    gray: 'bg-gray-700 dark:bg-gray-600',
    gradient1: 'bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500',
    gradient2: 'bg-gradient-to-br from-green-500 to-cyan-600 dark:from-green-400 dark:to-cyan-500',
    gradient3: 'bg-gradient-to-br from-pink-600 to-red-600 dark:from-pink-500 dark:to-red-500',
    gradient4: 'bg-gradient-to-br from-yellow-500 to-orange-600 dark:from-yellow-400 dark:to-orange-500',
    twitterBlue: 'bg-[#1DA1F2]',
    facebookBlue: 'bg-[#1877F2]',
    instagramGradient: 'bg-gradient-to-tr from-[#FF7A00] via-[#FE0697] to-[#7638FA]',
    devtoBlack: 'bg-black dark:bg-white dark:bg-opacity-90',
  };
  
  // Portfolio apps
  const portfolioApps: OneUIApp[] = [
    { id: 'about', name: 'About', icon: User, color: appIconColors.blue, component: AboutApp },
    { id: 'projects', name: 'Projects', icon: Briefcase, color: appIconColors.indigo, component: ProjectsApp },
    { id: 'skills', name: 'Skills', icon: Code, color: appIconColors.green, component: SkillsApp },
    { id: 'experience', name: 'Experience', icon: FileText, color: appIconColors.orange, component: ExperienceApp },
    { id: 'education', name: 'Education', icon: GraduationCap, color: appIconColors.yellow, component: EducationApp },
    { id: 'contact', name: 'Contact', icon: Mail, color: appIconColors.red, component: ContactApp },
  ];

  // System apps
  const systemApps: OneUIApp[] = [
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: appIconColors.twitterBlue, component: TwitterApp },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: appIconColors.facebookBlue, component: FacebookApp },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: appIconColors.instagramGradient, component: InstagramApp },
    { id: 'devto', name: 'DEV', icon: FileCode2, color: appIconColors.devtoBlack, component: DevToApp },
    { id: 'safari', name: 'Safari', icon: Globe, color: appIconColors.gradient2, component: SafariApp },
    { id: 'photos', name: 'Photos', icon: ImageIcon, color: appIconColors.gradient1, component: PhotosApp },
    { id: 'camera', name: 'Camera', icon: Camera, color: appIconColors.gray, component: CameraApp },
    { id: 'music', name: 'Music', icon: Music, color: appIconColors.gradient3, component: MusicApp },
    { id: 'calendar', name: 'Calendar', icon: Calendar, color: appIconColors.red, component: CalendarApp },
    { id: 'clock', name: 'Clock', icon: Clock, color: appIconColors.gray, component: ClockApp },
    { id: 'messages', name: 'Messages', icon: MessageSquare, color: appIconColors.green, badgeCount: 2, component: MessagesApp },
    { id: 'playstore', name: 'Play Store', icon: AppWindow, color: appIconColors.green, component: PlayStore },
    { id: 'settings', name: 'Settings', icon: Settings, color: appIconColors.gray, component: SettingsApp },
  ];

  // App folders
  const folders: AppFolder[] = [
    {
      id: 'portfolio',
      name: 'Portfolio',
      apps: portfolioApps
    }
  ];

  // Dock apps (4 most important)
  const dockApps: OneUIApp[] = [
    { id: 'phone', name: 'Phone', icon: Phone, color: appIconColors.green, component: PhoneApp },
    { id: 'safari', name: 'Safari', icon: Globe, color: appIconColors.blue, component: SafariApp },
    { id: 'messages', name: 'Messages', icon: MessageSquare, color: appIconColors.green, badgeCount: 2, component: MessagesApp },
    { id: 'about', name: 'About', icon: User, color: appIconColors.blue, component: AboutApp },
  ];

  // All apps for home screen and search
  const allApps = [...portfolioApps, ...systemApps, ...dockApps];

  // Get home screen apps (excluding ones in folders)
  const homeScreenApps = [...systemApps];

  // Get app by ID
  const getAppById = (id: string): OneUIApp | undefined => {
    return allApps.find(app => app.id === id);
  };

  // Render app component
  const renderAppComponent = (appId: string) => {
    const app = getAppById(appId);
    if (!app || !app.component) {
      console.error(`App not found or has no component: ${appId}`);
      return null;
    }
    
    const AppComponent = app.component;
    return <AppComponent />;
  };

  // Lock screen component
  const LockScreen = () => {
    // If skipLockscreen is enabled, automatically unlock and don't show the lockscreen
    useEffect(() => {
      if (shouldSkipLockscreen()) {
        handleLockToggle();
      }
    }, []);
    
    const [showPasscode, setShowPasscode] = useState(false);
    const [passcode, setPasscode] = useState('');
    const correctPasscode = '5456'; // In a real app, this should be stored securely
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);

    const handlePasscodeInput = (digit: string) => {
      if (passcode.length < 4) {
        const newPasscode = passcode + digit;
        setPasscode(newPasscode);
        
        if (newPasscode.length === 4) {
          if (newPasscode === correctPasscode) {
            setError('');
            handleLockToggle();
          } else {
            setError('Wrong PIN. Try again.');
            setAttempts(prev => prev + 1);
            setPasscode('');
          }
        }
      }
    };

    const handleBackspace = () => {
      setPasscode(prev => prev.slice(0, -1));
      setError('');
    };

    // Format time for Pixel-style display
    const getFormattedTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return { hours, minutes };
    };

    const { hours, minutes } = getFormattedTime();

    return (
      <motion.div 
        className="fixed inset-0 z-50 flex flex-col text-white"
        style={{
          backgroundImage: 'url(/images/wallpaper.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Status bar */}
        <div className="w-full px-4 py-2 flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <div className="flex gap-[2px]">
              <div className="h-3 w-[3px] bg-white rounded-sm"></div>
              <div className="h-3 w-[3px] bg-white rounded-sm"></div>
              <div className="h-3 w-[3px] bg-white rounded-sm"></div>
              <div className="h-3 w-[3px] bg-white rounded-sm"></div>
            </div>
            <Wifi className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1">
            <Battery className="w-4 h-4" />
            <span className="text-xs">{batteryLevel}%</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Centered clock */}
          <div className="flex-1 flex flex-col items-center justify-center -mt-16">
            {!showPasscode ? (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-[96px] font-light tracking-tight leading-none">{hours}</span>
                  <span className="text-[96px] font-light tracking-tight leading-none">:</span>
                  <span className="text-[96px] font-light tracking-tight leading-none">{minutes}</span>
                </div>
                <div className="text-xl font-normal tracking-wide mb-8">{currentDate}</div>
                
                {/* Press to unlock text */}
                <motion.div
                  className="mt-8 flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Lock className="w-5 h-5 mb-2 opacity-80" />
                  <button 
                    className="text-sm tracking-wide opacity-80"
                    onClick={() => setShowPasscode(true)}
                  >
                    Press to unlock
                  </button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="w-full px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-8">
                  <h2 className="text-xl font-normal mb-2">Enter PIN</h2>
                  {error && (
                    <p className="text-red-400 text-sm">{error}</p>
                  )}
                </div>

                {/* PIN dots */}
                <div className="flex justify-center gap-4 mb-8">
                  {[0,1,2,3].map((i) => (
                    <div 
                      key={i}
                      className={`w-3.5 h-3.5 rounded-full border-2 ${
                        passcode.length > i 
                          ? 'bg-white border-white' 
                          : 'border-white/60 bg-transparent'
                      }`}
                    />
                  ))}
                </div>

                {/* Number pad */}
                <div className="grid grid-cols-3 gap-6 max-w-xs mx-auto">
                  {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((num, i) => (
                    <button
                      key={i}
                      className={`w-16 h-16 rounded-full ${
                        num === '' ? 'cursor-default' :
                        'hover:bg-white/10 active:bg-white/20 transition-colors'
                      } flex items-center justify-center text-2xl font-light`}
                      onClick={() => {
                        if (num === '⌫') handleBackspace();
                        else if (num !== '') handlePasscodeInput(num.toString());
                      }}
                      disabled={attempts >= 5 || num === ''}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button 
                    className="text-sm text-white/80 hover:text-white transition-colors"
                    onClick={() => setShowPasscode(false)}
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom shortcuts */}
          <div className="pb-12 px-6 flex justify-between">
            <motion.button
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              whileTap={{ scale: 0.95 }}
            >
              <Camera className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  // Control Center with dark mode toggle
  const ControlCenter = () => (
    <motion.div 
      className="absolute top-0 right-0 w-full max-w-md bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-bl-3xl p-4 text-black dark:text-white transition-colors duration-300"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-white/10 dark:bg-white/5 rounded-xl backdrop-blur-lg transition-colors duration-300">
          <h3 className="text-sm font-medium mb-2">Networks</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wifi className="w-5 h-5 mr-2" />
              <span>Wi-Fi</span>
            </div>
            <div className="w-10 h-6 bg-green-500 dark:bg-green-600 rounded-full relative px-1 flex items-center transition-colors duration-300">
              <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-white/10 dark:bg-white/5 rounded-xl backdrop-blur-lg transition-colors duration-300">
          <h3 className="text-sm font-medium mb-2">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isDarkMode ? (
                <Moon className="w-5 h-5 mr-2" />
              ) : (
                <Sun className="w-5 h-5 mr-2" />
              )}
              <span>Dark Mode</span>
            </div>
            <div 
              className={`w-10 h-6 ${isDarkMode ? 'bg-green-500 dark:bg-green-600' : 'bg-gray-300 dark:bg-gray-600'} rounded-full relative px-1 flex items-center cursor-pointer transition-colors duration-300`}
              onClick={toggleDarkMode}
            >
              <div className={`w-4 h-4 bg-white rounded-full transform transition-transform duration-300 ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 grid grid-cols-4 gap-3">
        {['Airplane Mode', 'Bluetooth', 'Rotation Lock', 'Do Not Disturb'].map((name, i) => (
          <div key={i} className="p-3 bg-white/10 rounded-xl flex flex-col items-center justify-center">
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center mb-1">
              <Grid className="w-5 h-5" />
            </div>
            <span className="text-xs text-center">{name}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-3 p-3 bg-white/10 rounded-xl">
        <h3 className="text-sm font-medium mb-2">Brightness</h3>
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white w-2/3" />
        </div>
      </div>
    </motion.div>
  );

  // Main OneUI Container with dark mode support
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <AnimatePresence>
        {isLocked && <LockScreen />}
      </AnimatePresence>
      
      {!isLocked && (
        <div className="relative h-full w-full flex flex-col">
          {/* Status Bar */}
          <div className="relative z-30">
            <div className="flex justify-between items-center px-4 py-1 text-sm font-medium bg-transparent">
              <div className="text-white flex items-center space-x-1">
                <span>{currentTime}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="flex gap-1">
                  <div className="h-3 w-[3px] bg-white rounded-sm"></div>
                  <div className="h-3 w-[3px] bg-white rounded-sm"></div>
                  <div className="h-3 w-[3px] bg-white rounded-sm"></div>
                  <div className="h-3 w-[3px] bg-white rounded-sm"></div>
                </div>
                <Wifi className="w-4 h-4" />
                <div className="flex items-center space-x-1">
                  <Battery className="w-4 h-4" />
                  <span className="text-xs">{batteryLevel}%</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1 relative overflow-hidden">
            {/* Home Screen */}
            {!openApp && (
              <motion.div 
                className="absolute inset-0"
                style={{
                  backgroundImage: 'url(/images/wallpaper.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {/* Weather widget */}
                <div className="text-center mt-3 text-white">
                  <div className="text-5xl font-light mb-1">{currentTime}</div>
                  <div className="text-lg font-normal">{currentDate}</div>
                </div>
                
                {/* App Grid */}
                <div className="p-6 pt-8 grid grid-cols-4 gap-y-8 gap-x-4">
                  {/* Render home screen apps */}
                  {homeScreenApps.map((app) => (
                    <motion.button
                      key={app.id}
                      className="flex flex-col items-center"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleOpenApp(app.id)}
                    >
                      <div className={`w-16 h-16 ${app.color} rounded-[24px] flex items-center justify-center relative shadow-lg`}>
                        <app.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                        {app.badgeCount && (
                          <span className="absolute -top-1 -right-1 min-w-[22px] h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium px-1.5">
                            {app.badgeCount}
                          </span>
                        )}
                      </div>
                      <span className="mt-2 text-sm text-white font-medium drop-shadow-md">{app.name}</span>
                    </motion.button>
                  ))}
                  
                  {/* Render folders */}
                  {folders.map((folder) => (
                    <motion.button
                      key={folder.id}
                      className="flex flex-col items-center"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleOpenFolder(folder.id)}
                    >
                      <div className="w-18 h-18 bg-white/20 backdrop-blur-xl rounded-[28px] p-2 grid grid-cols-2 gap-1.5 shadow-lg">
                        {folder.apps.slice(0, 4).map((app, index) => (
                          <div key={index} className={`rounded-[18px] ${app.color} flex items-center justify-center`}>
                            <app.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                          </div>
                        ))}
                      </div>
                      <span className="mt-2 text-sm text-white font-medium drop-shadow-md">{folder.name}</span>
                    </motion.button>
                  ))}
                </div>
                
                {/* Dock */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[85%] h-[80px] rounded-[32px] bg-white/15 backdrop-blur-xl flex items-center justify-around px-4 border border-white/20">
                  {dockApps.map((app) => (
                    <motion.button
                      key={app.id}
                      className="relative flex items-center justify-center"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleOpenApp(app.id)}
                    >
                      <div className={`w-16 h-16 ${app.color} rounded-[24px] flex items-center justify-center shadow-lg`}>
                        <app.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                      </div>
                      {app.badgeCount && (
                        <span className="absolute -top-1 -right-1 min-w-[22px] h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-medium px-1.5">
                          {app.badgeCount}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Open App */}
            <AnimatePresence>
              {openApp && (
                <motion.div 
                  className="absolute inset-0 bg-white dark:bg-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  {renderAppComponent(openApp)}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Folder overlay */}
            <AnimatePresence>
              {openFolder && (
                <motion.div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleGoHome}
                >
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] bg-white/20 backdrop-blur-xl rounded-[32px] p-6"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-center text-white text-lg font-medium mb-6">{folders.find(f => f.id === openFolder)?.name}</h3>
                    <div className="grid grid-cols-3 gap-6">
                      {folders.find(f => f.id === openFolder)?.apps.map((app) => (
                        <motion.button
                          key={app.id}
                          className="flex flex-col items-center"
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleOpenApp(app.id)}
                        >
                          <div className={`w-16 h-16 ${app.color} rounded-[24px] flex items-center justify-center shadow-lg`}>
                            <app.icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                          </div>
                          <span className="mt-2 text-sm text-white font-medium">{app.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Control Center */}
            <AnimatePresence>
              {showControlCenter && (
                <motion.div
                  className="absolute inset-x-0 top-0 bg-white/20 dark:bg-black/20 backdrop-blur-xl rounded-b-[32px] p-6"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                >
                  <ControlCenter />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Home Indicator */}
          <div className="h-1.5 w-32 mx-auto bg-white/30 rounded-full my-2" onClick={handleGoHome} />
        </div>
      )}
    </div>
  );
} 