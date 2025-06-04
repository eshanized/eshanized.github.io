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
  FileCode2,
  ArrowLeft,
  X
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
    const [swipeProgress, setSwipeProgress] = useState(0);

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

    // Format time for Samsung One UI style display
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
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(/images/wallpaper.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Status bar - Samsung One UI 7.0 style */}
        <div className="w-full px-6 py-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <div className="flex gap-[3px]">
              <div className="h-3 w-[3px] bg-white rounded-full"></div>
              <div className="h-3 w-[3px] bg-white rounded-full"></div>
              <div className="h-3 w-[3px] bg-white rounded-full"></div>
              <div className="h-3 w-[3px] bg-white rounded-full"></div>
            </div>
            <Wifi className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2">
            <Battery className="w-5 h-5" />
            <span className="text-sm font-medium">{batteryLevel}%</span>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Centered clock - Samsung One UI 7.0 style */}
          <div className="flex-1 flex flex-col items-center justify-center">
            {!showPasscode ? (
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-baseline justify-center mb-3">
                  <span className="text-[120px] font-extralight tracking-tight leading-none text-shadow-lg">{hours}</span>
                  <span className="text-[120px] font-extralight tracking-tight leading-none mx-2 text-shadow-lg">:</span>
                  <span className="text-[120px] font-extralight tracking-tight leading-none text-shadow-lg">{minutes}</span>
                </div>
                <div className="text-2xl font-normal tracking-wide mb-10 text-shadow-md">{currentDate}</div>
                
                {/* Weather info - Samsung style */}
                <motion.div
                  className="mb-8 flex flex-col items-center bg-black/20 backdrop-blur-md px-8 py-4 rounded-[1.5rem]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-4xl font-light">23°</div>
                    <div className="text-left">
                      <div className="text-lg font-medium">Sunny</div>
                      <div className="text-sm opacity-80">Seoul, South Korea</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Swipe to unlock - Samsung One UI 7.0 style */}
                <motion.div
                  className="mt-12 flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPasscode(true)}
                  >
                    <Lock className="w-7 h-7" />
                  </motion.div>
                  
                  <motion.div 
                    className="relative w-48 h-10 flex items-center justify-center overflow-hidden"
                    onHoverStart={() => setSwipeProgress(0.5)}
                    onHoverEnd={() => setSwipeProgress(0)}
                    onClick={() => setShowPasscode(true)}
                  >
                    <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm" />
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 bg-white/20 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${swipeProgress * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10 text-base font-medium tracking-wide">
                      Swipe to unlock
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                className="w-full px-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-light mb-2">Enter PIN</h2>
                  <p className="text-white/70 text-base mb-3">Use your PIN to unlock</p>
                  {error && (
                    <motion.p 
                      className="text-red-400 text-base font-medium mt-2"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                {/* PIN dots - Samsung One UI 7.0 style */}
                <div className="flex justify-center gap-5 mb-12">
                  {[0,1,2,3].map((i) => (
                    <motion.div 
                      key={i}
                      className={`w-5 h-5 rounded-full border-2 ${
                        passcode.length > i 
                          ? 'bg-white border-white' 
                          : 'border-white/60 bg-transparent'
                      }`}
                      animate={passcode.length === i ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    />
                  ))}
                </div>

                {/* Number pad - Samsung One UI 7.0 style */}
                <div className="grid grid-cols-3 gap-6 max-w-xs mx-auto">
                  {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((num, i) => (
                    <motion.button
                      key={i}
                      className={`w-20 h-20 rounded-[1.5rem] ${
                        num === '' ? 'cursor-default' :
                        'bg-white/15 backdrop-blur-md hover:bg-white/20 active:bg-white/25 transition-colors'
                      } flex items-center justify-center text-3xl font-light`}
                      whileTap={num !== '' ? { scale: 0.95 } : {}}
                      onClick={() => {
                        if (num === '⌫') handleBackspace();
                        else if (num !== '') handlePasscodeInput(num.toString());
                      }}
                      disabled={attempts >= 5 || num === ''}
                    >
                      {num}
                    </motion.button>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <motion.button 
                    className="text-base text-white/90 hover:text-white transition-colors font-medium py-3 px-8 rounded-[1.25rem] bg-white/15 backdrop-blur-md"
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPasscode(false)}
                  >
                    Cancel
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Control Center with dark mode toggle
  const ControlCenter = () => (
    <motion.div 
      className="absolute top-0 right-0 w-full max-w-md bg-white/15 dark:bg-black/15 backdrop-blur-xl rounded-b-[2rem] p-5 text-black dark:text-white transition-colors duration-300"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white/10 dark:bg-white/5 rounded-[1.5rem] backdrop-blur-lg transition-colors duration-300">
          <h3 className="text-base font-medium mb-3">Networks</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Wifi className="w-6 h-6 mr-3" />
              <span className="font-medium">Wi-Fi</span>
            </div>
            <div 
              className="w-12 h-7 bg-[#0077FF] rounded-full relative px-1 flex items-center cursor-pointer transition-colors duration-300"
            >
              <div className="w-5 h-5 bg-white rounded-full ml-auto shadow-sm"></div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white/10 dark:bg-white/5 rounded-[1.5rem] backdrop-blur-lg transition-colors duration-300">
          <h3 className="text-base font-medium mb-3">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {isDarkMode ? (
                <Moon className="w-6 h-6 mr-3" />
              ) : (
                <Sun className="w-6 h-6 mr-3" />
              )}
              <span className="font-medium">Dark Mode</span>
            </div>
            <div 
              className={`w-12 h-7 ${isDarkMode ? 'bg-[#0077FF]' : 'bg-gray-300 dark:bg-gray-600'} rounded-full relative px-1 flex items-center cursor-pointer transition-colors duration-300`}
              onClick={toggleDarkMode}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isDarkMode ? 'translate-x-5' : 'translate-x-0'}`}></div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-4 gap-4">
        {['Airplane Mode', 'Bluetooth', 'Rotation Lock', 'Do Not Disturb'].map((name, i) => (
          <div key={i} className="p-4 bg-white/10 rounded-[1.25rem] flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-[1rem] bg-white/10 flex items-center justify-center mb-2">
              <Grid className="w-6 h-6" />
            </div>
            <span className="text-sm text-center font-medium">{name}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-white/10 rounded-[1.5rem]">
        <h3 className="text-base font-medium mb-3">Brightness</h3>
        <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-[#0077FF] w-2/3" />
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
            <div className="flex justify-between items-center px-5 py-3 text-sm font-medium bg-transparent">
              <div className="text-white flex items-center space-x-1">
                <span className="text-base font-medium">{currentTime}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <div className="flex gap-[3px]">
                  <div className="h-3 w-[3px] bg-white rounded-full"></div>
                  <div className="h-3 w-[3px] bg-white rounded-full"></div>
                  <div className="h-3 w-[3px] bg-white rounded-full"></div>
                  <div className="h-3 w-[3px] bg-white rounded-full"></div>
                </div>
                <Wifi className="w-5 h-5" />
                <div className="flex items-center gap-1">
                  <Battery className="w-5 h-5" />
                  <span className="text-sm font-medium">{batteryLevel}%</span>
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
                {/* Removed weather widget and clock */}
                
                {/* App Grid */}
                <div className="p-6 pt-16 grid grid-cols-4 gap-y-8 gap-x-4">
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
                  {/* App header with back button */}
                  <div className="relative z-10 w-full px-4 py-3 flex justify-between items-center bg-white/5 dark:bg-black/5 backdrop-blur-md border-b border-gray-200/10 dark:border-gray-800/20">
                    <motion.button 
                      className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGoHome}
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-white" />
                    </motion.button>
                    <div className="text-base font-medium text-gray-800 dark:text-white">
                      {getAppById(openApp)?.name}
                    </div>
                    <motion.button 
                      className="w-10 h-10 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center"
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.15)' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleGoHome}
                    >
                      <X className="w-5 h-5 text-gray-800 dark:text-white" />
                    </motion.button>
                  </div>
                  
                  {/* App content */}
                  <div className="h-[calc(100%-56px)] overflow-auto">
                    {renderAppComponent(openApp)}
                  </div>
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
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] bg-white/15 backdrop-blur-xl rounded-[2rem] p-6"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-center text-white text-xl font-medium mb-6">{folders.find(f => f.id === openFolder)?.name}</h3>
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
                    <button 
                      className="mt-6 mx-auto block bg-white/15 hover:bg-white/20 text-white py-3 px-6 rounded-[1.25rem] font-medium text-base"
                      onClick={handleGoHome}
                    >
                      Close
                    </button>
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
        </div>
      )}
    </div>
  );
} 