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
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTheme, ThemeProvider } from './ThemeContext';

// Dynamically import app components with SSR disabled
const AboutApp = dynamic(() => import('@/components/miui/apps/AboutApp'), { ssr: false });
const ProjectsApp = dynamic(() => import('@/components/miui/apps/ProjectsApp'), { ssr: false });
const SkillsApp = dynamic(() => import('@/components/miui/apps/SkillsApp'), { ssr: false });
const ExperienceApp = dynamic(() => import('@/components/miui/apps/ExperienceApp'), { ssr: false });
const EducationApp = dynamic(() => import('@/components/miui/apps/EducationApp'), { ssr: false });
const ContactApp = dynamic(() => import('@/components/miui/apps/ContactApp'), { ssr: false });
const SettingsApp = dynamic(() => import('@/components/miui/apps/SettingsApp'), { ssr: false });
const SafariApp = dynamic(() => import('@/components/miui/apps/SafariApp'), { ssr: false });
const MusicApp = dynamic(() => import('@/components/miui/apps/MusicApp'), { ssr: false });
const PhotosApp = dynamic(() => import('@/components/miui/apps/PhotosApp'), { ssr: false });
const CameraApp = dynamic(() => import('@/components/miui/apps/CameraApp'), { ssr: false });
const CalendarApp = dynamic(() => import('@/components/miui/apps/CalendarApp'), { ssr: false });
const ClockApp = dynamic(() => import('@/components/miui/apps/ClockApp'), { ssr: false });
const MessagesApp = dynamic(() => import('@/components/miui/apps/MessagesApp'), { ssr: false });
const PlayStore = dynamic(() => import('@/components/miui/apps/PlayStore'), { ssr: false });
const PhoneApp = dynamic(() => import('@/components/miui/apps/PhoneApp'), { ssr: false });
const TwitterApp = dynamic(() => import('@/components/miui/apps/TwitterApp'), { ssr: false });
const FacebookApp = dynamic(() => import('@/components/miui/apps/FacebookApp'), { ssr: false });
const InstagramApp = dynamic(() => import('@/components/miui/apps/InstagramApp'), { ssr: false });
const DevToApp = dynamic(() => import('@/components/miui/apps/DevToApp'), { ssr: false });

// Type definitions
interface MIUIApp {
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
  apps: MIUIApp[];
}

// MIUI Layout Component
export default function MIUILayout({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MIUILayoutContent>{children}</MIUILayoutContent>
    </ThemeProvider>
  );
}

function MIUILayoutContent({ children }: { children?: React.ReactNode }) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  // State hooks
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [batteryLevel, setBatteryLevel] = useState<number>(85);
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [openApp, setOpenApp] = useState<string | null>(null);
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState<boolean>(false);
  const [recentApps, setRecentApps] = useState<string[]>([]);
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [showControlCenter, setShowControlCenter] = useState<boolean>(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState<boolean>(false);

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
    setIsLocked(!isLocked);
    if (!isLocked) {
      // Reset all UI states when locking
      handleGoHome();
    }
  };

  // Handle folder opening
  const handleOpenFolder = (folderId: string) => {
    setOpenFolder(prev => prev === folderId ? null : folderId);
  };
  
  // Define color palette for app icons with dark mode support
  const colors = {
    blue: 'bg-blue-500 dark:bg-blue-600',
    green: 'bg-green-500 dark:bg-green-600',
    red: 'bg-red-500 dark:bg-red-600',
    purple: 'bg-purple-500 dark:bg-purple-600',
    pink: 'bg-pink-500 dark:bg-pink-600',
    orange: 'bg-orange-500 dark:bg-orange-600',
    teal: 'bg-teal-500 dark:bg-teal-600',
    cyan: 'bg-cyan-500 dark:bg-cyan-600',
    yellow: 'bg-yellow-500 dark:bg-yellow-600',
    indigo: 'bg-indigo-500 dark:bg-indigo-600',
    gray: 'bg-gray-600 dark:bg-gray-700',
    gradient1: 'bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600',
    gradient2: 'bg-gradient-to-br from-green-400 to-cyan-500 dark:from-green-500 dark:to-cyan-600',
    gradient3: 'bg-gradient-to-br from-pink-500 to-red-500 dark:from-pink-600 dark:to-red-600',
    gradient4: 'bg-gradient-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600',
    twitterBlue: 'bg-[#1DA1F2] dark:bg-[#1DA1F2]',
    facebookBlue: 'bg-[#1877F2] dark:bg-[#1877F2]',
    instagramGradient: 'bg-gradient-to-tr from-[#FF7A00] via-[#FE0697] to-[#7638FA]',
    devtoBlack: 'bg-black dark:bg-white dark:bg-opacity-90',
  };

  // Portfolio apps
  const portfolioApps: MIUIApp[] = [
    { id: 'about', name: 'About', icon: User, color: colors.blue, component: AboutApp },
    { id: 'projects', name: 'Projects', icon: Briefcase, color: colors.indigo, component: ProjectsApp },
    { id: 'skills', name: 'Skills', icon: Code, color: colors.green, component: SkillsApp },
    { id: 'experience', name: 'Experience', icon: FileText, color: colors.orange, component: ExperienceApp },
    { id: 'education', name: 'Education', icon: GraduationCap, color: colors.yellow, component: EducationApp },
    { id: 'contact', name: 'Contact', icon: Mail, color: colors.red, component: ContactApp },
  ];

  // System apps
  const systemApps: MIUIApp[] = [
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: colors.twitterBlue, component: TwitterApp },
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: colors.facebookBlue, component: FacebookApp },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: colors.instagramGradient, component: InstagramApp },
    { id: 'devto', name: 'DEV', icon: FileCode2, color: colors.devtoBlack, component: DevToApp },
    { id: 'safari', name: 'Safari', icon: Globe, color: colors.gradient2, component: SafariApp },
    { id: 'photos', name: 'Photos', icon: ImageIcon, color: colors.gradient1, component: PhotosApp },
    { id: 'camera', name: 'Camera', icon: Camera, color: colors.gray, component: CameraApp },
    { id: 'music', name: 'Music', icon: Music, color: colors.gradient3, component: MusicApp },
    { id: 'calendar', name: 'Calendar', icon: Calendar, color: colors.red, component: CalendarApp },
    { id: 'clock', name: 'Clock', icon: Clock, color: colors.gray, component: ClockApp },
    { id: 'messages', name: 'Messages', icon: MessageSquare, color: colors.green, badgeCount: 2, component: MessagesApp },
    { id: 'playstore', name: 'Play Store', icon: AppWindow, color: colors.green, component: PlayStore },
    { id: 'settings', name: 'Settings', icon: Settings, color: colors.gray, component: SettingsApp },
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
  const dockApps: MIUIApp[] = [
    { id: 'phone', name: 'Phone', icon: Phone, color: colors.green, component: PhoneApp },
    { id: 'safari', name: 'Safari', icon: Globe, color: colors.blue, component: SafariApp },
    { id: 'messages', name: 'Messages', icon: MessageSquare, color: colors.green, badgeCount: 2, component: MessagesApp },
    { id: 'about', name: 'About', icon: User, color: colors.blue, component: AboutApp },
  ];

  // All apps for home screen and search
  const allApps = [...portfolioApps, ...systemApps, ...dockApps];

  // Get home screen apps (excluding ones in folders)
  const homeScreenApps = [...systemApps];

  // Get app by ID
  const getAppById = (id: string): MIUIApp | undefined => {
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
            setError('Incorrect passcode');
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

    return (
      <motion.div 
        className="fixed inset-0 z-50 flex flex-col items-center text-white"
        style={{
          backgroundImage: 'url(/images/wallpaper.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Lock screen status bar */}
        <div className="w-full px-4 py-2 flex justify-between items-center text-white">
          <div>{currentTime}</div>
          <div className="flex items-center gap-1">
            <Wifi className="w-4 h-4" />
            <div className="flex items-center">
              <Battery className="w-4 h-4" />
              <span className="text-xs ml-1">{batteryLevel}%</span>
            </div>
          </div>
        </div>

        {/* Time and Date */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-6xl font-extralight">{currentTime}</div>
          <div className="text-xl mt-2">{currentDate}</div>
          
          {!showPasscode ? (
            /* Swipe to unlock indicator */
            <motion.div 
              className="mt-20 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Lock className="w-6 h-6 mb-2" />
              <div className="text-sm">Swipe up to unlock</div>
              
              {/* Swipe indicator */}
              <motion.div 
                className="mt-3 w-12 h-1 bg-white/80 rounded-full"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              
              <button 
                className="mt-8 px-8 py-2 bg-white/20 rounded-full backdrop-blur-md"
                onClick={() => setShowPasscode(true)}
              >
                Enter Passcode
              </button>

              <button 
                className="mt-4 px-8 py-2 bg-white/10 rounded-full backdrop-blur-md text-sm"
                onClick={handleLockToggle}
              >
                Skip Lock Screen
              </button>
            </motion.div>
          ) : (
            /* Passcode Screen */
            <motion.div 
              className="mt-10 flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-xl mb-6">Enter Passcode</div>
              
              {/* Passcode dots */}
              <div className="flex gap-4 mb-6">
                {[0,1,2,3].map((i) => (
                  <div 
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      passcode.length > i ? 'bg-white' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>

              {/* Error message */}
              {error && (
                <div className="text-red-500 text-sm mb-4">
                  {error}
                  {attempts >= 5 && " (Too many attempts. Try again later)"}
                </div>
              )}

              {/* Number pad */}
              <div className="grid grid-cols-3 gap-4">
                {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((num, i) => (
                  <button
                    key={i}
                    className={`w-16 h-16 rounded-full ${
                      num === '' ? 'cursor-default' :
                      'bg-white/20 backdrop-blur-md hover:bg-white/30 active:bg-white/40'
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

              <button 
                className="mt-6 text-sm text-blue-400"
                onClick={() => setShowPasscode(false)}
              >
                Cancel
              </button>
            </motion.div>
          )}
        </div>

        {/* Bottom grabber */}
        <div className="w-full pb-6 flex justify-center">
          <div className="w-32 h-1 bg-white/40 rounded-full" />
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

  // Main MIUI Container with dark mode support
  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <AnimatePresence>
        {isLocked && <LockScreen />}
      </AnimatePresence>
      
      {!isLocked && (
        <div className="relative h-full w-full flex flex-col">
          {/* Status Bar */}
          <div className="relative z-30">
            {/* Notch (for newer phones) */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-black w-1/3 h-7 rounded-b-3xl z-50"></div>
            
            <div className="flex justify-between items-center px-5 py-2.5 text-sm font-medium">
              <div className="text-white">{currentTime}</div>
              <div className="flex items-center gap-2 text-white">
                <div className="flex gap-1">
                  <div className="h-2.5 w-2.5 bg-green-500 dark:bg-green-400 rounded-full transition-colors duration-300"></div>
                  <div className="h-2.5 w-2.5 bg-green-500 dark:bg-green-400 rounded-full transition-colors duration-300"></div>
                  <div className="h-2.5 w-2.5 bg-green-500 dark:bg-green-400 rounded-full transition-colors duration-300"></div>
                </div>
                <Wifi className="w-4 h-4" />
                <div className="flex items-center">
                  <Battery className="w-4 h-4" />
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
                {/* Date display */}
                <div className="text-center mt-3 text-white text-lg font-light">
                  {currentDate}
                </div>
                
                {/* App Grid */}
                <div className="p-6 pt-3 grid grid-cols-4 gap-y-7 gap-x-3">
                  {/* Render home screen apps */}
                  {homeScreenApps.map((app) => (
                    <motion.button
                      key={app.id}
                      className="flex flex-col items-center"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOpenApp(app.id)}
                    >
                      <div className={`w-15 h-15 rounded-2xl flex items-center justify-center ${app.color} relative`}>
                        <app.icon className="w-9 h-9 text-white" strokeWidth={1.5} />
                        {app.badgeCount && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
                            {app.badgeCount}
                          </span>
                        )}
                      </div>
                      <span className="mt-1 text-xs text-white text-shadow">{app.name}</span>
                    </motion.button>
                  ))}
                  
                  {/* Render folders */}
                  {folders.map((folder) => (
                    <motion.button
                      key={folder.id}
                      className="flex flex-col items-center"
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleOpenFolder(folder.id)}
                    >
                      <div className="w-15 h-15 bg-white/20 backdrop-blur-xl rounded-2xl p-1.5 grid grid-cols-2 gap-1">
                        {folder.apps.slice(0, 4).map((app, index) => (
                          <div key={index} className={`rounded-lg ${app.color} flex items-center justify-center`}>
                            <app.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                          </div>
                        ))}
                      </div>
                      <span className="mt-1 text-xs text-white text-shadow">{folder.name}</span>
                    </motion.button>
                  ))}
                </div>
                
                {/* Page indicators */}
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {[0, 1].map((page) => (
                    <div
                      key={page}
                      className={`h-1.5 rounded-full ${
                        currentPage === page ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Dock */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-72 h-16 rounded-3xl bg-white/20 backdrop-blur-xl flex items-center justify-around px-2">
                  {dockApps.map((app) => (
                    <motion.button
                      key={app.id}
                      className="relative flex items-center justify-center"
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleOpenApp(app.id)}
                    >
                      <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center`}>
                        <app.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                      </div>
                      {app.badgeCount && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold">
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
                  className="absolute inset-0 bg-white"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'tween', duration: 0.3 }}
                >
                  {/* App header */}
                  <div className="bg-gray-100 py-2 px-4 flex items-center justify-between border-b border-gray-300">
                    <button 
                      className="text-blue-500 text-sm py-1"
                      onClick={handleGoHome}
                    >
                      Home
                    </button>
                    <div className="font-medium">{getAppById(openApp)?.name}</div>
                    <div className="w-10"></div>
                  </div>
                  
                  {/* App content */}
                  <div className="h-[calc(100%-54px)] overflow-auto">
                    {renderAppComponent(openApp)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Folder overlay */}
            <AnimatePresence>
              {openFolder && (
                <motion.div
                  className="absolute inset-0 bg-black/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleGoHome}
                >
                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[280px] bg-white/20 backdrop-blur-xl rounded-3xl p-4"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h3 className="text-center text-white font-medium mb-3">{folders.find(f => f.id === openFolder)?.name}</h3>
                    <div className="grid grid-cols-3 gap-4">
                      {folders.find(f => f.id === openFolder)?.apps.map((app) => (
                        <motion.button
                          key={app.id}
                          className="flex flex-col items-center"
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleOpenApp(app.id)}
                        >
                          <div className={`w-12 h-12 ${app.color} rounded-xl flex items-center justify-center`}>
                            <app.icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                          </div>
                          <span className="mt-1 text-xs text-white">{app.name}</span>
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
                <ControlCenter />
              )}
            </AnimatePresence>
          </div>
          
          {/* Home Indicator */}
          <div className="h-8 flex items-center justify-center">
            <div 
              className="w-32 h-1 bg-white/40 rounded-full cursor-pointer"
              onClick={handleGoHome}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
} 