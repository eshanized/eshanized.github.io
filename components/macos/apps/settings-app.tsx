"use client";

import { useState } from 'react';
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
  Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

type SettingsCategory = {
  id: string;
  name: string;
  icon: React.ElementType;
  content: React.ReactNode;
};

export default function SettingsApp() {
  const [activeCategory, setActiveCategory] = useState('general');
  const { theme, setTheme } = useTheme();
  
  const categories: SettingsCategory[] = [
    {
      id: 'general',
      name: 'General',
      icon: Settings2,
      content: (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">General Settings</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">About</h3>
              <div className="bg-card p-4 rounded-lg">
                <p className="text-sm">Portfolio OS</p>
                <p className="text-xs text-muted-foreground">Version 1.0</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Default Browser</h3>
              <div className="flex items-center space-x-3 bg-card p-3 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                    <path d="M12 6c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4z"/>
                    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium">Portfolio Browser</p>
                  <p className="text-xs text-muted-foreground">Default web browser</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Language & Region</h3>
              <div className="flex items-center justify-between bg-card p-3 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Languages className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">English (US)</span>
                </div>
                <button className="text-xs text-primary">Change...</button>
              </div>
            </div>
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
          <h2 className="text-xl font-semibold mb-6">Appearance</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Appearance</h3>
              <div className="flex items-center space-x-4">
                <button 
                  className={`p-4 rounded-xl border hover:bg-accent/50 transition ${theme === 'light' ? 'border-primary ring-2 ring-primary/50' : 'border-border'}`}
                  onClick={() => setTheme('light')}
                >
                  <div className="w-20 h-12 rounded-lg bg-white border border-gray-300 mb-2"></div>
                  <p className="text-sm text-center">Light</p>
                </button>
                
                <button 
                  className={`p-4 rounded-xl border hover:bg-accent/50 transition ${theme === 'dark' ? 'border-primary ring-2 ring-primary/50' : 'border-border'}`}
                  onClick={() => setTheme('dark')}
                >
                  <div className="w-20 h-12 rounded-lg bg-gray-800 border border-gray-700 mb-2"></div>
                  <p className="text-sm text-center">Dark</p>
                </button>
                
                <button 
                  className={`p-4 rounded-xl border hover:bg-accent/50 transition ${theme === 'system' ? 'border-primary ring-2 ring-primary/50' : 'border-border'}`}
                  onClick={() => setTheme('system')}
                >
                  <div className="w-20 h-12 rounded-lg bg-gradient-to-r from-white to-gray-800 border border-gray-300 mb-2"></div>
                  <p className="text-sm text-center">Auto</p>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Accent Color</h3>
              <div className="flex flex-wrap gap-2">
                {['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-teal-500'].map((color, index) => (
                  <button key={index} className={`w-6 h-6 rounded-full ${color} hover:ring-2 ring-offset-2 ring-offset-background transition`}></button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Highlight Color</h3>
              <div className="flex flex-wrap gap-2">
                {['bg-blue-400', 'bg-purple-400', 'bg-pink-400', 'bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-teal-400'].map((color, index) => (
                  <button key={index} className={`w-6 h-6 rounded-full ${color} hover:ring-2 ring-offset-2 ring-offset-background transition`}></button>
                ))}
              </div>
            </div>
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
          <h2 className="text-xl font-semibold mb-6">Desktop & Dock</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium">Background</h3>
              <div className="grid grid-cols-3 gap-3">
                {['bg-blue-900', 'bg-purple-900', 'bg-gradient-to-r from-blue-800 to-indigo-900', 'bg-gradient-to-r from-purple-800 to-pink-700'].map((bg, index) => (
                  <button key={index} className={`w-full aspect-video rounded-lg ${bg} hover:ring-2 ring-primary transition`}></button>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Dock</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Dock size</span>
                  <div className="w-32 h-2 bg-muted rounded-full relative">
                    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Magnification</span>
                  <div className="w-32 h-2 bg-muted rounded-full relative">
                    <div className="absolute top-1/2 left-2/3 -translate-y-1/2 w-4 h-4 bg-primary rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-2">
                  <input type="checkbox" id="autohide" className="rounded border-muted h-4 w-4 text-primary focus:ring-primary/30" checked />
                  <label htmlFor="autohide" className="text-sm">Automatically hide and show the Dock</label>
                </div>
              </div>
            </div>
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
          <h2 className="text-xl font-semibold mb-6">Notifications</h2>
          <p className="text-muted-foreground">Manage how apps can notify you</p>
        </div>
      )
    },
    {
      id: 'security',
      name: 'Security & Privacy',
      icon: Shield,
      content: (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Security & Privacy</h2>
          <p className="text-muted-foreground">Manage your security settings and privacy preferences</p>
        </div>
      )
    },
    {
      id: 'keyboard',
      name: 'Keyboard',
      icon: Keyboard,
      content: (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Keyboard</h2>
          <p className="text-muted-foreground">Configure keyboard settings and shortcuts</p>
        </div>
      )
    },
    {
      id: 'mouse',
      name: 'Mouse & Trackpad',
      icon: Mouse,
      content: (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Mouse & Trackpad</h2>
          <p className="text-muted-foreground">Configure mouse and trackpad settings</p>
        </div>
      )
    },
    {
      id: 'wifi',
      name: 'Wi-Fi',
      icon: Wifi,
      content: (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Wi-Fi</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="font-medium">Wi-Fi</span>
            <div className="relative inline-flex">
              <div className="w-10 h-5 bg-primary rounded-full"></div>
              <div className="absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transform translate-x-5"></div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Wifi className="h-5 w-5 text-primary" />
                <span className="font-medium">Portfolio_Network</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-3 bg-primary rounded-sm"></div>
                <div className="w-1.5 h-4 bg-primary rounded-sm"></div>
                <div className="w-1.5 h-5 bg-primary rounded-sm"></div>
                <div className="w-1.5 h-6 bg-primary rounded-sm"></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">Connected to Portfolio_Network</p>
        </div>
      )
    },
    {
      id: 'bluetooth',
      name: 'Bluetooth',
      icon: Bluetooth,
      content: (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Bluetooth</h2>
          <p className="text-muted-foreground">Manage bluetooth devices and connections</p>
        </div>
      )
    },
    {
      id: 'network',
      name: 'Network',
      icon: Network,
      content: (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Network</h2>
          <p className="text-muted-foreground">Configure network settings and connections</p>
        </div>
      )
    },
    {
      id: 'users',
      name: 'Users & Groups',
      icon: User,
      content: (
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6">Users & Groups</h2>
          <div className="bg-card p-4 rounded-lg flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              {PERSONAL_INFO?.name?.charAt(0) || 'E'}
            </div>
            <div>
              <p className="font-medium">{PERSONAL_INFO?.name || 'Eshan Roy'}</p>
              <p className="text-sm text-muted-foreground">Administrator</p>
            </div>
          </div>
        </div>
      )
    },
  ];
  
  const activeContent = categories.find(cat => cat.id === activeCategory)?.content;
  
  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-56 border-r bg-muted/30 p-2 overflow-auto">
        <div className="sticky top-0 bg-muted/30 backdrop-blur-sm pt-2 pb-3 px-2 mb-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-background rounded-md border border-input py-1.5 pl-8 pr-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 absolute left-2.5 top-2 text-muted-foreground"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="space-y-0.5">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <button
                key={category.id}
                className={`flex items-center w-full px-3 py-1.5 text-sm rounded-md transition ${
                  activeCategory === category.id
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent/50 text-foreground'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <CategoryIcon className="h-4 w-4 mr-3 shrink-0" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="h-full"
        >
          {activeContent}
        </motion.div>
      </div>
    </div>
  );
}

// Placeholder for personal info
const PERSONAL_INFO = {
  name: 'Eshan Roy',
}; 