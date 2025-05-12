"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  PaintBucket, 
  Settings2, 
  Monitor, 
  Bell, 
  Key, 
  User, 
  Wifi, 
  Bluetooth, 
  Network, 
  Clock, 
  Languages, 
  HardDrive,
  Keyboard,
  Mouse,
  Shield,
  Search,
  Check,
  X,
  ChevronRight,
  Moon,
  Sun,
  SunMoon,
  Palette,
  Globe,
  Volume2,
  VolumeX,
  Mail,
  Calendar,
  Github
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

// Add interfaces
interface KeyboardSettings {
  repeatDelay: number;
  repeatRate: number;
  capsLockEnabled: boolean;
  fnKeyEnabled: boolean;
  keyboardBacklight: number;
}

interface MouseSettings {
  speed: number;
  acceleration: boolean;
  naturalScrolling: boolean;
  tapToClick: boolean;
  scrollSpeed: number;
}

interface NetworkSettings {
  proxyEnabled: boolean;
  vpnEnabled: boolean;
  firewallEnabled: boolean;
  bandwidthLimit: number;
}

type SettingsCategory = {
  id: string;
  name: string;
  icon: React.ElementType;
  content: React.ReactNode;
};

// Custom toggle switch component
const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <div 
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-muted'} cursor-pointer`}
    onClick={onChange}
  >
    <span 
      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} 
    />
  </div>
);

// Placeholder for personal info
const PERSONAL_INFO = {
  name: 'Eshan Roy',
  title: 'Full Stack Developer',
  email: 'm.eshanized@gmail.com',
  website: 'https://eshanized.is-a.dev'
};

export default function SettingsApp() {
  // State declarations
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const { theme, setTheme } = useTheme();
  const [accentColor, setAccentColor] = useState('blue-500');
  const [highlightColor, setHighlightColor] = useState('blue-400');
  const [wallpaper, setWallpaper] = useState('bg-gradient-to-r from-blue-800 to-indigo-900');
  const [dockSize, setDockSize] = useState(50);
  const [magnification, setMagnification] = useState(70);
  const [autohideDock, setAutohideDock] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [notificationSound, setNotificationSound] = useState(true);
  const [language, setLanguage] = useState('English (US)');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [volume, setVolume] = useState(75);
  const langMenuRef = useRef<HTMLDivElement>(null);

  // Settings state
  const [keyboardSettings, setKeyboardSettings] = useState<KeyboardSettings>({
    repeatDelay: 500,
    repeatRate: 30,
    capsLockEnabled: true,
    fnKeyEnabled: true,
    keyboardBacklight: 50
  });

  const [mouseSettings, setMouseSettings] = useState<MouseSettings>({
    speed: 50,
    acceleration: true,
    naturalScrolling: true,
    tapToClick: true,
    scrollSpeed: 50
  });

  const [networkSettings, setNetworkSettings] = useState<NetworkSettings>({
    proxyEnabled: false,
    vpnEnabled: false,
    firewallEnabled: true,
    bandwidthLimit: 0
  });

  const [passwordAfterSleep, setPasswordAfterSleep] = useState(true);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [contactsEnabled, setContactsEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(false);

  // Event handlers
  const handleKeyboardSettingChange = (setting: keyof KeyboardSettings, value: any) => {
    setKeyboardSettings(prev => ({ ...prev, [setting]: value }));
    toast.success(`Keyboard ${setting} updated`);
  };

  const handleMouseSettingChange = (setting: keyof MouseSettings, value: any) => {
    setMouseSettings(prev => ({ ...prev, [setting]: value }));
    toast.success(`Mouse ${setting} updated`);
  };

  const handleNetworkSettingChange = (setting: keyof NetworkSettings, value: any) => {
    setNetworkSettings(prev => ({ ...prev, [setting]: value }));
    toast.success(`Network ${setting} updated`);
  };

  const handleSecuritySettingChange = (setting: string, value: boolean) => {
    switch(setting) {
      case 'passwordAfterSleep':
        setPasswordAfterSleep(value);
        break;
      case 'analytics':
        setAnalyticsEnabled(value);
        break;
      case 'location':
        setLocationEnabled(value);
        break;
      case 'contacts':
        setContactsEnabled(value);
        break;
      case 'camera':
        setCameraEnabled(value);
        break;
    }
    toast.success(`Security setting updated`);
  };

  const handleChangePassword = () => {
    toast.info("Password change functionality will be implemented soon");
  };

  // Effects
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories: SettingsCategory[] = [
    {
      id: 'general',
      name: 'General',
      icon: Settings2,
      content: (
        <div className="p-6">
          <motion.h2 
            className="text-2xl font-semibold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            General Settings
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <Settings2 className="mr-2 h-5 w-5 text-primary" />
                About
              </h3>
              <div className="bg-card p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#00A9A5] to-[#7B4397] rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform">
                    <span className="text-white text-2xl font-bold">S</span>
                  </div>
                  <div>
                    <p className="text-base font-semibold bg-gradient-to-r from-[#00A9A5] to-[#7B4397] bg-clip-text text-transparent">Snigdha OS</p>
                    <p className="text-sm text-muted-foreground">Version 2.0</p>
                    <p className="text-xs mt-1 text-muted-foreground">Build 2024.03</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Created by</span>
                      <div className="flex items-center gap-2">
                        <a 
                          href="https://github.com/Snigdha-OS" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
                        >
                          <Github className="w-4 h-4" />
                          Snigdha OS
                        </a>
                        <span className="text-muted-foreground">×</span>
                        <a 
                          href="https://github.com/eshanized" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-sm text-purple-400 hover:text-purple-500 transition-colors flex items-center gap-1"
                        >
                          <Github className="w-4 h-4" />
                          Eshanized
                        </a>
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 text-sm text-primary hover:text-primary/80 transition-colors flex items-center">
                    Check for updates
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <Globe className="mr-2 h-5 w-5 text-primary" />
                Default Browser
              </h3>
              <div className="bg-card p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#00A9A5] to-[#7B4397] rounded-xl flex items-center justify-center shadow-md transform hover:scale-105 transition-transform">
                    <Globe className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-base font-medium">Snigdha Browser</p>
                    <p className="text-sm text-muted-foreground">Default web browser</p>
                  </div>
                  <button className="ml-auto text-sm px-3 py-1.5 bg-gradient-to-r from-[#00A9A5]/10 to-[#7B4397]/10 hover:from-[#00A9A5]/20 hover:to-[#7B4397]/20 text-primary rounded-lg transition-colors">
                    Change
                  </button>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              ref={langMenuRef}
            >
              <h3 className="font-medium text-lg flex items-center">
                <Languages className="mr-2 h-5 w-5 text-primary" />
                Language & Region
              </h3>
              <div className="bg-card p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Languages className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-base">{language}</span>
                  </div>
                  <button 
                    className="text-sm px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
                    onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  >
                    Change
                  </button>
                </div>
                
                {showLanguageMenu && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-card shadow-lg rounded-lg border p-2 z-10">
                    {["English (US)", "English (UK)", "Spanish", "French", "German", "Japanese", "Chinese"].map((lang) => (
                      <button 
                        key={lang}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${language === lang ? 'bg-primary/10 text-primary' : 'hover:bg-accent'}`}
                        onClick={() => {
                          setLanguage(lang);
                          setShowLanguageMenu(false);
                        }}
                      >
                        {lang}
                        {language === lang && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <Volume2 className="mr-2 h-5 w-5 text-primary" />
                Sound
              </h3>
              <div className="bg-card p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow border">
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium">Output Volume</span>
                  <div className="ml-auto flex items-center gap-3">
                    <button className="text-muted-foreground hover:text-foreground">
                      {volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </button>
                    <div className="w-32 h-2 bg-muted rounded-full relative">
                      <div 
                        className="absolute inset-y-0 left-0 bg-primary rounded-full"
                        style={{ width: `${volume}%` }}
                      ></div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-6">{volume}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Alert sounds</span>
                  </div>
                  <ToggleSwitch 
                    checked={notificationSound} 
                    onChange={() => setNotificationSound(!notificationSound)} 
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'appearance',
      name: 'Appearance',
      icon: PaintBucket,
      content: (
        <div className="p-6">
          <motion.h2 
            className="text-2xl font-semibold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Appearance
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <PaintBucket className="mr-2 h-5 w-5 text-primary" />
                Theme
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <button 
                  className={`overflow-hidden rounded-xl border transition-all ${theme === 'light' ? 'ring-2 ring-primary scale-105' : 'hover:bg-accent/50'}`}
                  onClick={() => setTheme('light')}
                >
                  <div className="p-2 bg-white text-black border-b flex items-center justify-between">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <Sun className="h-4 w-4" />
                  </div>
                  <div className="h-20 bg-gray-100 p-2">
                    <div className="h-3 w-1/2 bg-gray-300 rounded-full mb-2"></div>
                    <div className="h-3 w-3/4 bg-gray-300 rounded-full mb-2"></div>
                    <div className="h-3 w-2/3 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="p-2 text-center text-sm font-medium bg-white">Light</div>
                </button>
                
                <button 
                  className={`overflow-hidden rounded-xl border transition-all ${theme === 'dark' ? 'ring-2 ring-primary scale-105' : 'hover:bg-accent/50'}`}
                  onClick={() => setTheme('dark')}
                >
                  <div className="p-2 bg-gray-900 text-white border-b border-gray-700 flex items-center justify-between">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <Moon className="h-4 w-4" />
                  </div>
                  <div className="h-20 bg-gray-800 p-2">
                    <div className="h-3 w-1/2 bg-gray-600 rounded-full mb-2"></div>
                    <div className="h-3 w-3/4 bg-gray-600 rounded-full mb-2"></div>
                    <div className="h-3 w-2/3 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="p-2 text-center text-sm font-medium bg-gray-900 text-white">Dark</div>
                </button>
                
                <button 
                  className={`overflow-hidden rounded-xl border transition-all ${theme === 'system' ? 'ring-2 ring-primary scale-105' : 'hover:bg-accent/50'}`}
                  onClick={() => setTheme('system')}
                >
                  <div className="p-2 bg-gradient-to-r from-gray-100 to-gray-900 border-b flex items-center justify-between">
                    <div className="flex gap-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <SunMoon className="h-4 w-4 text-gray-700" />
                  </div>
                  <div className="h-20 bg-gradient-to-r from-gray-100 to-gray-800 p-2">
                    <div className="h-3 w-1/2 bg-gradient-to-r from-gray-300 to-gray-600 rounded-full mb-2"></div>
                    <div className="h-3 w-3/4 bg-gradient-to-r from-gray-300 to-gray-600 rounded-full mb-2"></div>
                    <div className="h-3 w-2/3 bg-gradient-to-r from-gray-300 to-gray-600 rounded-full"></div>
                  </div>
                  <div className="p-2 text-center text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-900 text-gray-700">Auto</div>
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <Palette className="mr-2 h-5 w-5 text-primary" />
                Accent Color
              </h3>
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <div className="grid grid-cols-8 gap-3">
                  {[
                    { color: 'blue-500', label: 'Blue' },
                    { color: 'purple-500', label: 'Purple' },
                    { color: 'pink-500', label: 'Pink' },
                    { color: 'red-500', label: 'Red' },
                    { color: 'orange-500', label: 'Orange' },
                    { color: 'yellow-500', label: 'Yellow' },
                    { color: 'green-500', label: 'Green' },
                    { color: 'teal-500', label: 'Teal' }
                  ].map(({ color, label }) => (
                    <button 
                      key={color}
                      className={`flex flex-col items-center gap-2 group`}
                      onClick={() => setAccentColor(color)}
                    >
                      <div className={`w-10 h-10 rounded-full bg-${color} transition-all ${accentColor === color ? 'ring-2 ring-offset-2 ring-offset-background scale-110' : 'hover:scale-105 group-hover:ring-1 group-hover:ring-offset-1 group-hover:ring-offset-background'}`}></div>
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-6 p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Preview accent color</span>
                    <div className={`w-6 h-6 rounded-full bg-${accentColor}`}></div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button className={`px-3 py-1.5 rounded-md text-white bg-${accentColor} text-sm`}>Primary Button</button>
                    <button className={`px-3 py-1.5 rounded-md border text-${accentColor} bg-${accentColor}/10 text-sm`}>Secondary Button</button>
                    <div className={`w-6 h-6 rounded-md border-2 border-${accentColor} flex items-center justify-center`}>
                      <div className={`w-3 h-3 rounded-sm bg-${accentColor}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <Palette className="mr-2 h-5 w-5 text-primary" />
                Highlight Color
              </h3>
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <div className="grid grid-cols-8 gap-3">
                  {[
                    { color: 'blue-400', label: 'Blue' },
                    { color: 'purple-400', label: 'Purple' },
                    { color: 'pink-400', label: 'Pink' },
                    { color: 'red-400', label: 'Red' },
                    { color: 'orange-400', label: 'Orange' },
                    { color: 'yellow-400', label: 'Yellow' },
                    { color: 'green-400', label: 'Green' },
                    { color: 'teal-400', label: 'Teal' }
                  ].map(({ color, label }) => (
                    <button 
                      key={color}
                      className={`flex flex-col items-center gap-2 group`}
                      onClick={() => setHighlightColor(color)}
                    >
                      <div className={`w-10 h-10 rounded-full bg-${color} transition-all ${highlightColor === color ? 'ring-2 ring-offset-2 ring-offset-background scale-110' : 'hover:scale-105 group-hover:ring-1 group-hover:ring-offset-1 group-hover:ring-offset-background'}`}></div>
                      <span className="text-xs text-muted-foreground">{label}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-accent/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Text selection preview</span>
                    <div className={`w-6 h-6 rounded-full bg-${highlightColor}`}></div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm leading-relaxed">
                      This text shows how your <span className={`bg-${highlightColor}/40 px-1`}>highlighted text</span> will appear when selected.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'desktop',
      name: 'Desktop & Dock',
      icon: Monitor,
      content: (
        <div className="p-6">
          <motion.h2 
            className="text-2xl font-semibold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Desktop & Dock
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <Monitor className="mr-2 h-5 w-5 text-primary" />
                Background
              </h3>
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { bg: 'bg-blue-900', name: 'Deep Blue' },
                    { bg: 'bg-purple-900', name: 'Purple Night' },
                    { bg: 'bg-gradient-to-r from-blue-800 to-indigo-900', name: 'Blue Gradient' },
                    { bg: 'bg-gradient-to-r from-purple-800 to-pink-700', name: 'Twilight' },
                    { bg: 'bg-gradient-to-br from-indigo-600 to-blue-400', name: 'Sky Blue' },
                    { bg: 'bg-gradient-to-br from-green-600 to-emerald-900', name: 'Emerald' }
                  ].map(({ bg, name }) => (
                    <button 
                      key={bg}
                      className="group"
                      onClick={() => setWallpaper(bg)}
                    >
                      <div className={`aspect-video rounded-lg ${bg} overflow-hidden ${wallpaper === bg ? 'ring-2 ring-primary scale-105' : 'hover:ring-1 hover:ring-primary/50'} transition-all`}>
                        <div className="h-full w-full flex items-end justify-center p-2">
                          <div className={`h-2 w-32 bg-white/20 rounded-full transition-opacity ${wallpaper === bg ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'}`}></div>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-center text-muted-foreground">{name}</p>
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center">
                    Choose custom background
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Change every:</span>
                    <select className="text-sm bg-accent rounded px-2 py-1 border">
                      <option>30 minutes</option>
                      <option>1 hour</option>
                      <option>Daily</option>
                      <option>Never</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <svg className="mr-2 h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <rect x="2" y="20" width="20" height="4" rx="2" strokeWidth="2" />
                  <path d="M7 16V10a1 1 0 011-1h8a1 1 0 011 1v6" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 15V9" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Dock
              </h3>
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <div className="mb-6">
                  <div className="mb-1 flex justify-between items-center">
                    <span className="text-sm font-medium">Dock size</span>
                    <span className="text-sm text-muted-foreground">{dockSize}%</span>
                  </div>
                  <div className="h-10 flex items-center">
                    <svg className="h-5 w-5 text-muted-foreground mr-2" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="10" width="14" height="4" rx="2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <div className="w-full h-2 bg-muted rounded-full relative">
                      <div 
                        className="absolute inset-y-0 left-0 bg-primary rounded-full"
                        style={{ width: `${dockSize}%` }}
                      ></div>
                      <input
                        type="range"
                        min="30"
                        max="100"
                        value={dockSize}
                        onChange={(e) => setDockSize(parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <svg className="h-6 w-6 text-muted-foreground ml-2" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="8" width="18" height="8" rx="2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="mb-1 flex justify-between items-center">
                    <span className="text-sm font-medium">Magnification</span>
                    <span className="text-sm text-muted-foreground">{magnification}%</span>
                  </div>
                  <div className="h-10 flex items-center">
                    <svg className="h-5 w-5 text-muted-foreground mr-2" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <div className="w-full h-2 bg-muted rounded-full relative">
                      <div 
                        className="absolute inset-y-0 left-0 bg-primary rounded-full" 
                        style={{ width: `${magnification}%` }}
                      ></div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={magnification}
                        onChange={(e) => setMagnification(parseInt(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <svg className="h-6 w-6 text-muted-foreground ml-2" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Automatically hide and show the Dock</span>
                    </div>
                    <ToggleSwitch 
                      checked={autohideDock} 
                      onChange={() => setAutohideDock(!autohideDock)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Show recent applications in Dock</span>
                    </div>
                    <ToggleSwitch 
                      checked={true} 
                      onChange={() => {}} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Animate opening applications</span>
                    </div>
                    <ToggleSwitch 
                      checked={true} 
                      onChange={() => {}} 
                    />
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gradient-to-r from-[#00A9A5]/5 to-[#7B4397]/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-[#00A9A5]" viewBox="0 0 24 24" fill="none">
                      <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span className="text-sm text-muted-foreground">Changes will take effect immediately</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'notifications',
      name: 'Notifications',
      icon: Bell,
      content: (
        <div className="p-6">
          <motion.h2 
            className="text-2xl font-semibold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Notifications
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-lg flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Allow Notifications
                </h3>
                <ToggleSwitch 
                  checked={notifications} 
                  onChange={() => setNotifications(!notifications)} 
                />
              </div>
              
              {notifications && (
                <div className="bg-card p-4 rounded-xl shadow-sm border transition-all">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Show notifications on lock screen</span>
                      </div>
                      <ToggleSwitch 
                        checked={true} 
                        onChange={() => {}} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Show notification preview</span>
                      </div>
                      <select className="text-sm bg-accent rounded px-2 py-1 border">
                        <option>Always</option>
                        <option>When Unlocked</option>
                        <option>Never</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Play sound for notifications</span>
                      </div>
                      <ToggleSwitch 
                        checked={notificationSound} 
                        onChange={() => setNotificationSound(!notificationSound)} 
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-3">Notification Style</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 rounded-lg border hover:border-[#00A9A5] hover:bg-gradient-to-r from-[#00A9A5]/5 to-[#7B4397]/5 transition-all flex flex-col items-center gap-2">
                        <div className="w-full h-16 rounded bg-gradient-to-r from-[#00A9A5]/10 to-[#7B4397]/10 p-2 flex flex-col justify-center">
                          <div className="h-2 w-4/5 bg-muted-foreground/30 rounded mb-1"></div>
                          <div className="h-2 w-3/5 bg-muted-foreground/30 rounded"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">Banners</span>
                      </button>
                      
                      <button className="p-4 rounded-lg border hover:border-[#7B4397] hover:bg-gradient-to-r from-[#00A9A5]/5 to-[#7B4397]/5 transition-all flex flex-col items-center gap-2">
                        <div className="w-full h-16 rounded bg-gradient-to-r from-[#00A9A5]/10 to-[#7B4397]/10 p-2 flex flex-col justify-center">
                          <div className="h-2 w-4/5 bg-muted-foreground/30 rounded mb-1"></div>
                          <div className="h-2 w-3/5 bg-muted-foreground/30 rounded mb-1"></div>
                          <div className="h-2 w-1/2 bg-muted-foreground/30 rounded"></div>
                        </div>
                        <span className="text-xs text-muted-foreground">Alerts</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              <div className={`bg-card p-4 rounded-xl shadow-sm border mt-6 ${!notifications ? 'opacity-50 pointer-events-none' : ''}`}>
                <h4 className="text-sm font-medium mb-3">Notification Center</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M20 4v16H4V4h16m0-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor" />
                          <path d="M7 12h10v2H7z" fill="currentColor" />
                          <path d="M7 8h10v2H7z" fill="currentColor" />
                          <path d="M7 16h7v2H7z" fill="currentColor" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Messages</p>
                        <p className="text-xs text-muted-foreground">Chat notifications</p>
                      </div>
                    </div>
                    <ToggleSwitch 
                      checked={true} 
                      onChange={() => {}} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-red-600 dark:text-red-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mail</p>
                        <p className="text-xs text-muted-foreground">Email notifications</p>
                      </div>
                    </div>
                    <ToggleSwitch 
                      checked={true} 
                      onChange={() => {}} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Calendar</p>
                        <p className="text-xs text-muted-foreground">Event notifications</p>
                      </div>
                    </div>
                    <ToggleSwitch 
                      checked={true} 
                      onChange={() => {}} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                        <svg className="h-5 w-5 text-amber-600 dark:text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Reminders</p>
                        <p className="text-xs text-muted-foreground">Task notifications</p>
                      </div>
                    </div>
                    <ToggleSwitch 
                      checked={false} 
                      onChange={() => {}} 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: Shield,
      content: (
        <div className="p-6">
          <motion.h2 
            className="text-2xl font-semibold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Security & Privacy
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <Shield className="mr-2 h-5 w-5 text-primary" />
                General
              </h3>
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Require password after sleep or screen saver</span>
                    </div>
                    <ToggleSwitch 
                      checked={passwordAfterSleep} 
                      onChange={() => handleSecuritySettingChange('passwordAfterSleep', !passwordAfterSleep)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Change Password...</span>
                    <button className="text-sm px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors" onClick={handleChangePassword}>
                      Change
                    </button>
                  </div>
                  
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-start gap-3">
                    <svg className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                      <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 16.01L12.01 15.9989" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10.2857 5.57116L2.85711 17.5712C2.6323 17.965 2.51989 18.162 2.5049 18.3003C2.48991 18.4386 2.52062 18.5002 2.59304 18.6064C2.66547 18.7126 2.82671 18.7779 3.14918 18.9084L3.25027 18.9496C3.65574 19.1224 3.85847 19.2088 4.12136 19.2385C4.38425 19.2681 4.83245 19.2269 5.31149 19.1005L5.42424 19.0679C7.20225 18.5706 8.09125 18.322 9.0143 18.2899C9.9374 18.2577 10.6433 18.4488 12.0553 18.8309C13.5386 19.2318 14.2802 19.4323 14.9651 19.3496C15.65 19.267 16.2343 18.9087 17.4029 18.1921L21.1428 16.027C21.9479 15.5594 22.3504 15.3255 22.4863 14.9895C22.6221 14.6535 22.5329 14.254 22.3545 13.455L19.7151 3.72076C19.5999 3.1843 19.5422 2.91606 19.3345 2.81482C19.1268 2.71358 18.8707 2.8359 18.3584 3.08055L10.2857 5.57116Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p className="text-xs text-muted-foreground">
                      Setting up a strong password is essential for maintaining the security of your account. Use a mix of letters, numbers, and special characters.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <svg className="mr-2 h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                  <path d="M12 15V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.8 9C8.8 7.9074 8.8 7.36111 9.03 6.93381C9.23 6.55836 9.55836 6.23 9.93381 6.03C10.3611 5.8 10.9074 5.8 12 5.8C13.0926 5.8 13.6389 5.8 14.0662 6.03C14.4416 6.23 14.77 6.55836 14.97 6.93381C15.2 7.36111 15.2 7.9074 15.2 9C15.2 10.0926 15.2 10.6389 14.97 11.0662C14.77 11.4416 14.4416 11.77 14.0662 11.97C13.6389 12.2 13.0926 12.2 12 12.2C10.9074 12.2 10.3611 12.2 9.93381 11.97C9.55836 11.77 9.23 11.4416 9.03 11.0662C8.8 10.6389 8.8 10.0926 8.8 9Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M3 10.5V13.5C3 17.6421 6.35786 21 10.5 21H13.5C17.6421 21 21 17.6421 21 13.5V10.5C21 6.35786 17.6421 3 13.5 3H10.5C6.35786 3 3 6.35786 3 10.5Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Privacy
              </h3>
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium mb-2">Analytics & Improvements</h4>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Share analytics data</span>
                    </div>
                    <ToggleSwitch 
                      checked={analyticsEnabled} 
                      onChange={() => handleSecuritySettingChange('analytics', !analyticsEnabled)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Receive personalized suggestions</span>
                    </div>
                    <ToggleSwitch 
                      checked={true} 
                      onChange={() => {}} 
                    />
                  </div>
                  
                  <h4 className="text-sm font-medium mt-4 mb-2">App Permissions</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <svg className="h-4 w-4 text-blue-600 dark:text-blue-300" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M3 9H21M9 21V9M7 3H17M17 9V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Location Services</p>
                          <p className="text-xs text-muted-foreground">Maps, Weather</p>
                        </div>
                      </div>
                      <ToggleSwitch 
                        checked={locationEnabled} 
                        onChange={() => handleSecuritySettingChange('location', !locationEnabled)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <svg className="h-4 w-4 text-green-600 dark:text-green-300" viewBox="0 0 24 24" fill="none">
                            <path d="M9 10.5L11 12.5L15.5 8M7 18H17C19.2091 18 21 16.2091 21 14V10C21 7.79086 19.2091 6 17 6H7C4.79086 6 3 7.79086 3 10V14C3 16.2091 4.79086 18 7 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Contacts</p>
                          <p className="text-xs text-muted-foreground">Mail, Messages</p>
                        </div>
                      </div>
                      <ToggleSwitch 
                        checked={contactsEnabled} 
                        onChange={() => handleSecuritySettingChange('contacts', !contactsEnabled)} 
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                          <svg className="h-4 w-4 text-purple-600 dark:text-purple-300" viewBox="0 0 24 24" fill="none">
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Camera</p>
                          <p className="text-xs text-muted-foreground">Photos, Messages</p>
                        </div>
                      </div>
                      <ToggleSwitch 
                        checked={cameraEnabled} 
                        onChange={() => handleSecuritySettingChange('camera', !cameraEnabled)} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'keyboard',
      name: 'Keyboard',
      icon: Keyboard,
      content: (
        <div className="p-6">
          <motion.h2 
            className="text-2xl font-semibold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Keyboard Settings
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <h3 className="font-medium text-lg mb-4">Key Repeat</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Delay Until Repeat</span>
                      <span className="text-sm text-muted-foreground">{keyboardSettings.repeatDelay}ms</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="1000"
                      value={keyboardSettings.repeatDelay}
                      onChange={(e) => handleKeyboardSettingChange('repeatDelay', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Key Repeat Rate</span>
                      <span className="text-sm text-muted-foreground">{keyboardSettings.repeatRate}/s</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={keyboardSettings.repeatRate}
                      onChange={(e) => handleKeyboardSettingChange('repeatRate', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Caps Lock Enabled</span>
                    <ToggleSwitch
                      checked={keyboardSettings.capsLockEnabled}
                      onChange={() => handleKeyboardSettingChange('capsLockEnabled', !keyboardSettings.capsLockEnabled)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Function Keys Enabled</span>
                    <ToggleSwitch
                      checked={keyboardSettings.fnKeyEnabled}
                      onChange={() => handleKeyboardSettingChange('fnKeyEnabled', !keyboardSettings.fnKeyEnabled)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <h3 className="font-medium text-lg mb-4">Keyboard Backlight</h3>
                <div className="flex items-center gap-4">
                  <svg className="w-5 h-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                  </svg>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={keyboardSettings.keyboardBacklight}
                    onChange={(e) => handleKeyboardSettingChange('keyboardBacklight', parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="5" />
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'mouse',
      name: 'Mouse & Trackpad',
      icon: Mouse,
      content: (
        <div className="p-6">
          <motion.h2 
            className="text-2xl font-semibold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Mouse & Trackpad Settings
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <h3 className="font-medium text-lg mb-4">Pointer Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Pointer Speed</span>
                      <span className="text-sm text-muted-foreground">{mouseSettings.speed}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={mouseSettings.speed}
                      onChange={(e) => handleMouseSettingChange('speed', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Scroll Speed</span>
                      <span className="text-sm text-muted-foreground">{mouseSettings.scrollSpeed}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={mouseSettings.scrollSpeed}
                      onChange={(e) => handleMouseSettingChange('scrollSpeed', parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Pointer Acceleration</span>
                    <ToggleSwitch
                      checked={mouseSettings.acceleration}
                      onChange={() => handleMouseSettingChange('acceleration', !mouseSettings.acceleration)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Natural Scrolling</span>
                    <ToggleSwitch
                      checked={mouseSettings.naturalScrolling}
                      onChange={() => handleMouseSettingChange('naturalScrolling', !mouseSettings.naturalScrolling)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tap to Click</span>
                    <ToggleSwitch
                      checked={mouseSettings.tapToClick}
                      onChange={() => handleMouseSettingChange('tapToClick', !mouseSettings.tapToClick)}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'network',
      name: 'Network',
      icon: Network,
      content: (
        <div className="p-6">
          <motion.h2 
            className="text-2xl font-semibold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Network Settings
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <h3 className="font-medium text-lg mb-4">Network Security</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Firewall</span>
                    <ToggleSwitch
                      checked={networkSettings.firewallEnabled}
                      onChange={() => handleNetworkSettingChange('firewallEnabled', !networkSettings.firewallEnabled)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">VPN</span>
                    <ToggleSwitch
                      checked={networkSettings.vpnEnabled}
                      onChange={() => handleNetworkSettingChange('vpnEnabled', !networkSettings.vpnEnabled)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Proxy</span>
                    <ToggleSwitch
                      checked={networkSettings.proxyEnabled}
                      onChange={() => handleNetworkSettingChange('proxyEnabled', !networkSettings.proxyEnabled)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <h3 className="font-medium text-lg mb-4">Bandwidth Management</h3>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Bandwidth Limit</span>
                    <span className="text-sm text-muted-foreground">
                      {networkSettings.bandwidthLimit === 0 ? 'Unlimited' : `${networkSettings.bandwidthLimit} Mbps`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={networkSettings.bandwidthLimit}
                    onChange={(e) => handleNetworkSettingChange('bandwidthLimit', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
    {
      id: 'users',
      name: 'Users & Groups',
      icon: User,
      content: (
        <div className="p-6">
          <motion.h2 
            className="text-2xl font-semibold mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Users & Groups
          </motion.h2>
          
          <div className="space-y-8">
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <User className="mr-2 h-5 w-5 text-primary" />
                Current User
              </h3>
              <div className="bg-card p-6 rounded-xl shadow-sm border">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                    {PERSONAL_INFO?.name?.charAt(0) || 'E'}
                  </div>
                  <div>
                    <p className="text-xl font-medium">{PERSONAL_INFO?.name || 'Eshan Roy'}</p>
                    <p className="text-sm text-muted-foreground">{PERSONAL_INFO?.title || 'Full Stack Developer'}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-300 ring-1 ring-inset ring-green-600/20 dark:ring-green-500/30">
                        Administrator
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2 self-start">
                    <button className="text-sm px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors">
                      Edit
                    </button>
                    <button className="text-sm px-3 py-1.5 bg-accent hover:bg-accent/80 text-accent-foreground rounded-lg transition-colors">
                      Change Picture
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium mb-3">Contact Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{PERSONAL_INFO?.email || 'm.eshanized@gmail.com'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{PERSONAL_INFO?.website || 'https://eshanized.is-a.dev'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-3">Login Options</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Automatic login</span>
                        <ToggleSwitch 
                          checked={true} 
                          onChange={() => {}} 
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Password required</span>
                        <ToggleSwitch 
                          checked={false} 
                          onChange={() => {}} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <h3 className="font-medium text-lg flex items-center">
                <svg className="mr-2 h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Login Items
              </h3>
              <div className="bg-card p-4 rounded-xl shadow-sm border">
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-2">These items will open automatically when you log in:</p>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <svg className="h-5 w-5 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                          <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M15 15L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Finder</p>
                        <p className="text-xs text-muted-foreground">System application</p>
                      </div>
                    </div>
                    <button className="text-xs px-2 py-1 text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                      Remove
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <svg className="h-5 w-5 text-green-600 dark:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M20 4v16H4V4h16m0-2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor" />
                          <path d="M7 12h10v2H7z" fill="currentColor" />
                          <path d="M7 8h10v2H7z" fill="currentColor" />
                          <path d="M7 16h7v2H7z" fill="currentColor" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Messages</p>
                        <p className="text-xs text-muted-foreground">System application</p>
                      </div>
                    </div>
                    <button className="text-xs px-2 py-1 text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                      Remove
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                        <svg className="h-5 w-5 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                          <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
                          <path d="M16.5 15.5C15 17 10.8333 18 8.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Calendar</p>
                        <p className="text-xs text-muted-foreground">System application</p>
                      </div>
                    </div>
                    <button className="text-xs px-2 py-1 text-destructive hover:bg-destructive/10 rounded-md transition-colors">
                      Remove
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="text-sm px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors flex items-center gap-1">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Add Application
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )
    },
  ];
  
  // Filter categories based on search term
  const filteredCategories = searchTerm
    ? categories.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categories;
  
  const activeContent = categories.find(cat => cat.id === activeCategory)?.content;
  
  // Close language menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/30 p-3 overflow-auto">
        <div className="sticky top-0 bg-muted/30 backdrop-blur-sm pt-2 pb-4 px-2 mb-3 z-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Settings"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-background rounded-lg border border-input py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            />
            <Search
              className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-1">
          {filteredCategories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <motion.button
                key={category.id}
                className={`flex items-center w-full px-3 py-2 text-sm rounded-lg transition-all ${
                  activeCategory === category.id
                    ? 'bg-primary text-primary-foreground dark:text-white font-medium shadow-sm'
                    : 'hover:bg-accent text-foreground'
                }`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CategoryIcon className={`h-5 w-5 mr-3 shrink-0 ${activeCategory === category.id ? 'text-primary-foreground dark:text-white' : 'text-muted-foreground'}`} />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {activeContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 