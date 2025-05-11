"use client";

import React, { useState } from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import Image from 'next/image';
import { 
  User, 
  Moon, 
  Sun, 
  Smartphone, 
  Wifi, 
  Bell, 
  Volume2, 
  Globe,
  Lock,
  Battery,
  ChevronRight,
  Check,
  Info
} from 'lucide-react';
import { useTheme } from '../ThemeContext';
import { PERSONAL_INFO } from '@/lib/constants';

// Types for settings
type NotificationSettings = {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  appNotifications: boolean;
};

type WifiNetwork = {
  name: string;
  connected: boolean;
  strength: number;
  secure: boolean;
};

export default function SettingsApp() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  // State for various settings
  const [volume, setVolume] = useState(75);
  const [brightness, setBrightness] = useState(80);
  const [notifications, setNotifications] = useState<NotificationSettings>({
    enabled: true,
    sound: true,
    vibration: true,
    appNotifications: true
  });
  const [wifiEnabled, setWifiEnabled] = useState(true);
  const [currentNetwork, setCurrentNetwork] = useState("Home Network");
  const [availableNetworks] = useState<WifiNetwork[]>([
    { name: "Home Network", connected: true, strength: 90, secure: true },
    { name: "Coffee Shop", connected: false, strength: 75, secure: true },
    { name: "Guest Network", connected: false, strength: 60, secure: false }
  ]);
  const [language, setLanguage] = useState("English (US)");
  const [batteryLevel] = useState(85);
  const [batteryCharging] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    locationServices: true,
    analytics: false,
    advertising: false
  });

  // Handlers for various settings
  const handleNotificationToggle = (key: keyof NotificationSettings) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleWifiToggle = () => {
    setWifiEnabled(!wifiEnabled);
    if (!wifiEnabled) {
      setCurrentNetwork("Searching...");
      // Simulate network search
      setTimeout(() => {
        setCurrentNetwork("Home Network");
      }, 1500);
    } else {
      setCurrentNetwork("Not Connected");
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  const handleBrightnessChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrightness(Number(e.target.value));
  };

  const handlePrivacyToggle = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <BaseMIUIApp title="Settings">
      <div className="pb-8 bg-[#f2f2f7] dark:bg-black min-h-screen">
        {/* User profile section */}
        <div className="p-4 flex items-center bg-white dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700/80">
          <div className="w-16 h-16 rounded-full overflow-hidden relative">
            <Image
              src="https://github.com/eshanized.png"
              alt={PERSONAL_INFO.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="ml-4">
            <h2 className="text-lg font-medium text-black dark:text-white">{PERSONAL_INFO.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">MIUI Account, Cloud Storage, App Store</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 ml-auto" />
        </div>
        
        {/* Settings groups */}
        <div className="mt-6 space-y-6 px-4">
          {/* Appearance */}
          <div className="bg-white dark:bg-gray-800/80 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center mr-3">
                  {isDarkMode ? 
                    <Moon className="w-4 h-4 text-blue-500 dark:text-blue-400" /> : 
                    <Sun className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                  }
                </div>
                <span className="text-black dark:text-white">Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
                <div className={`w-11 h-6 ${isDarkMode ? 'bg-blue-500' : 'bg-gray-300'} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
            </div>
          </div>
          
          {/* Wi-Fi settings */}
          <div className="bg-white dark:bg-gray-800/80 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700/80">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center mr-3">
                  <Wifi className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                </div>
                <span className="text-black dark:text-white">Wi-Fi</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={wifiEnabled}
                  onChange={handleWifiToggle}
                />
                <div className={`w-11 h-6 ${wifiEnabled ? 'bg-blue-500' : 'bg-gray-300'} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
            </div>
            {wifiEnabled && (
              <div className="py-2">
                {availableNetworks.map((network, index) => (
                  <div 
                    key={network.name}
                    className={`px-4 py-3 flex items-center justify-between ${
                      index !== availableNetworks.length - 1 ? 'border-b border-gray-200 dark:border-gray-700/80' : ''
                    }`}
                  >
                    <div className="flex items-center">
                      <Wifi className={`w-4 h-4 mr-3 ${
                        network.strength > 70 ? 'text-blue-500' : 
                        network.strength > 40 ? 'text-yellow-500' : 'text-gray-400'
                      }`} />
                      <span className="text-black dark:text-white">{network.name}</span>
                      {network.secure && <Lock className="w-3 h-3 ml-2 text-gray-400" />}
                    </div>
                    {network.connected && <Check className="w-4 h-4 text-blue-500" />}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Notifications */}
          <div className="bg-white dark:bg-gray-800/80 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700/80">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/60 flex items-center justify-center mr-3">
                  <Bell className="w-4 h-4 text-red-500 dark:text-red-400" />
                </div>
                <span className="text-black dark:text-white">Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.enabled}
                  onChange={() => handleNotificationToggle('enabled')}
                />
                <div className={`w-11 h-6 ${notifications.enabled ? 'bg-blue-500' : 'bg-gray-300'} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
            </div>
            {notifications.enabled && (
              <div className="py-2">
                <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700/80">
                  <span className="text-black dark:text-white">Sound</span>
                  <input
                    type="checkbox"
                    checked={notifications.sound}
                    onChange={() => handleNotificationToggle('sound')}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-black dark:text-white">Vibration</span>
                  <input
                    type="checkbox"
                    checked={notifications.vibration}
                    onChange={() => handleNotificationToggle('vibration')}
                    className="rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            )}
          </div>
          
          {/* Sounds & Haptics */}
          <div className="bg-white dark:bg-gray-800/80 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700/80">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/60 flex items-center justify-center mr-3">
                  <Volume2 className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                </div>
                <span className="text-black dark:text-white">Volume</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span>0%</span>
                <span>{volume}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
          
          {/* Privacy & Security */}
          <div className="bg-white dark:bg-gray-800/80 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700/80">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/60 flex items-center justify-center mr-3">
                  <Lock className="w-4 h-4 text-green-500 dark:text-green-400" />
                </div>
                <span className="text-black dark:text-white">Location Services</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={privacySettings.locationServices}
                  onChange={() => handlePrivacyToggle('locationServices')}
                />
                <div className={`w-11 h-6 ${privacySettings.locationServices ? 'bg-blue-500' : 'bg-gray-300'} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
            </div>
          </div>
          
          {/* Battery */}
          <div className="bg-white dark:bg-gray-800/80 rounded-xl overflow-hidden shadow-sm">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/60 flex items-center justify-center mr-3">
                  <Battery className="w-4 h-4 text-green-500 dark:text-green-400" />
                </div>
                <span className="text-black dark:text-white">Battery</span>
                <span className="ml-auto text-gray-500 dark:text-gray-400">{batteryLevel}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 dark:bg-green-400 rounded-full transition-all duration-300"
                  style={{ width: `${batteryLevel}%` }}
                />
              </div>
              {batteryCharging && (
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Charging - 1 hour until full
                </p>
              )}
            </div>
          </div>
          
          {/* About */}
          <div className="bg-white dark:bg-gray-800/80 rounded-xl p-4">
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              MIUI 14
            </div>
            <div className="mt-1 text-center text-xs text-gray-400 dark:text-gray-500">
              Portfolio MIUI Experience
            </div>
          </div>
        </div>
      </div>
    </BaseMIUIApp>
  );
} 