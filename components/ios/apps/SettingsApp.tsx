"use client";

import React, { useState } from 'react';
import BaseIOSApp from './BaseIOSApp';
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
  ChevronRight
} from 'lucide-react';

export default function SettingsApp() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  
  return (
    <BaseIOSApp title="Settings">
      <div className="pb-8">
        {/* User profile section */}
        <div className="p-4 flex items-center bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
            <User className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h2 className="text-lg font-medium">Eshan Roy</h2>
            <p className="text-gray-500 dark:text-gray-400">Apple ID, iCloud+, App Store</p>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
        </div>
        
        {/* Settings groups */}
        <div className="mt-6 space-y-6 px-4">
          {/* Appearance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center mr-3">
                  {darkMode ? 
                    <Moon className="w-4 h-4 text-blue-500" /> : 
                    <Sun className="w-4 h-4 text-blue-500" />
                  }
                </div>
                <span>Dark Mode</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
              </label>
            </div>
          </div>
          
          {/* Common settings */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
            {[
              { icon: Wifi, name: 'Wi-Fi', value: 'Home Network' },
              { icon: Smartphone, name: 'General', value: '' },
              { icon: Bell, name: 'Notifications', value: '' },
              { icon: Volume2, name: 'Sounds & Haptics', value: '' },
              { icon: Lock, name: 'Privacy & Security', value: '' },
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-4 flex items-center justify-between ${
                  index !== 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                    <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  {item.value && <span className="mr-2 text-sm">{item.value}</span>}
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
          
          {/* System info */}
          <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
            {[
              { icon: Battery, name: 'Battery', value: '85%' },
              { icon: Globe, name: 'Language & Region', value: 'English' },
            ].map((item, index) => (
              <div 
                key={index}
                className={`p-4 flex items-center justify-between ${
                  index !== 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                    <item.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  {item.value && <span className="mr-2 text-sm">{item.value}</span>}
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
          
          {/* About */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4">
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              iOS 16.5.1
            </div>
            <div className="mt-1 text-center text-xs text-gray-400">
              Portfolio iOS Experience
            </div>
          </div>
        </div>
      </div>
    </BaseIOSApp>
  );
} 