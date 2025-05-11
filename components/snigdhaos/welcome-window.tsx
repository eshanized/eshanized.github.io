"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Sparkles, LucideIcon, ChevronRight, Monitor, Blocks, Layers, Palette, Code, Rocket, Star } from 'lucide-react';

type WelcomeWindowProps = {
  onCloseWelcome: () => void;
  onOpenApp: (appId: string) => void;
};

export default function WelcomeWindow({ onCloseWelcome, onOpenApp }: WelcomeWindowProps) {
  const [activeTab, setActiveTab] = useState<'welcome' | 'features' | 'apps'>('welcome');
  
  // Feature data for the features tab
  const features = [
    { 
      icon: Monitor,
      title: "Interactive UI",
      description: "Experience a fully functional desktop environment inspired by SnigdhaOS"
    },
    {
      icon: Layers,
      title: "Projects Portfolio",
      description: "Explore all my projects with detailed information in a dedicated app"
    },
    {
      icon: Code,
      title: "Skills Overview",
      description: "See my technical skills categorized and presented visually"
    },
    {
      icon: Rocket,
      title: "Applications",
      description: "Use various apps to navigate through different sections of the portfolio"
    }
  ];
  
  // App shortcuts for quick access
  const quickApps = [
    { id: 'about', title: 'About Me', icon: User, color: 'from-blue-400 to-indigo-500' },
    { id: 'projects', title: 'Projects', icon: Folder, color: 'from-emerald-400 to-teal-500' },
    { id: 'skills', title: 'Skills', icon: Code, color: 'from-amber-400 to-orange-500' },
    { id: 'contact', title: 'Contact', icon: Mail, color: 'from-rose-400 to-pink-500' }
  ];

  return (
    <div className="h-full relative overflow-hidden flex flex-col">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-indigo-950"></div>
        
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
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl -top-[300px] -right-[300px] opacity-50 animate-spin-slow"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 blur-3xl -bottom-[250px] -left-[200px] opacity-30" style={{ animationDirection: 'reverse', animationDuration: '40s' }}></div>
      </div>
      
      {/* Navigation tabs */}
      <div className="relative z-10 flex border-b border-white/10">
        <TabButton 
          isActive={activeTab === 'welcome'} 
          onClick={() => setActiveTab('welcome')}
          label="Welcome"
        />
        <TabButton 
          isActive={activeTab === 'features'} 
          onClick={() => setActiveTab('features')}
          label="Features"
        />
        <TabButton 
          isActive={activeTab === 'apps'} 
          onClick={() => setActiveTab('apps')}
          label="Quick Start"
        />
      </div>
      
      {/* Content container with scroll */}
      <div className="relative flex-1 overflow-auto z-10">
        {activeTab === 'welcome' && (
          <div className="p-6 md:p-8 min-h-full">
            <div className="max-w-5xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Left side - content */}
                <div className="w-full lg:w-3/5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-transparent bg-clip-text">
                        Welcome to SnigdhaOS
                      </span>
                    </h1>
                    
                    <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mb-6"></div>
                    
                    <p className="text-lg text-gray-300 mb-8">
                      Experience this interactive desktop environment inspired by SnigdhaOS. Navigate through different sections of my portfolio using familiar desktop applications.
                    </p>
                    
                    <div className="flex flex-wrap gap-4 mb-8">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onCloseWelcome();
                          onOpenApp('about');
                        }}
                        className="px-5 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium flex items-center gap-2"
                      >
                        <Sparkles className="w-5 h-5" />
                        Get Started
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveTab('features')}
                        className="px-5 py-3 bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors flex items-center gap-2"
                      >
                        <Star className="w-5 h-5" />
                        Explore Features
                      </motion.button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InfoItem 
                        icon={<Terminal className="w-4 h-4" />}
                        text="Open Terminal to access commands"
                      />
                      <InfoItem 
                        icon={<Palette className="w-4 h-4" />}
                        text="Modern UI inspired by SnigdhaOS"
                      />
                      <InfoItem 
                        icon={<Blocks className="w-4 h-4" />}
                        text="Interactive apps and windows"
                      />
                      <InfoItem 
                        icon={<Command className="w-4 h-4" />}
                        text="Press ⌘+Space to search"
                      />
                    </div>
                  </motion.div>
                </div>
                
                {/* Right side - illustration */}
                <div className="w-full lg:w-2/5">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                  >
                    {/* 3D-like platform for the device */}
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl transform scale-75 opacity-70"></div>
                    
                    {/* Screen mockup */}
                    <div className="relative mx-auto w-full max-w-md">
                      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-xl border border-gray-700 overflow-hidden">
                        {/* Screen content */}
                        <div className="h-full flex flex-col">
                          {/* Menu bar */}
                          <div className="h-7 bg-gray-900 flex items-center px-3">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            </div>
                            <div className="flex-1 flex justify-center">
                              <div className="text-xs text-white/50">SnigdhaOS</div>
                            </div>
                          </div>
                          
                          {/* Desktop */}
                          <div className="flex-1 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 relative">
                            {/* App window */}
                            <div className="absolute top-6 left-6 w-24 h-20 bg-white/10 rounded-lg backdrop-blur-md border border-white/20"></div>
                            <div className="absolute top-12 left-40 w-32 h-24 bg-white/10 rounded-lg backdrop-blur-md border border-white/20"></div>
                            
                            {/* Dock */}
                            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 h-8 px-3 bg-black/30 backdrop-blur-md rounded-full flex items-center gap-2 border border-white/10">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600"></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'features' && (
          <div className="p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Key Features</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10"
                    >
                      <div className="flex gap-4 items-start">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg p-2 mt-1">
                          <feature.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                          <p className="text-gray-300">{feature.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span>How to Navigate</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <NavigationTip
                      title="Use the Dock"
                      description="Click app icons in the dock to launch applications"
                    />
                    <NavigationTip
                      title="Menu Bar"
                      description="Access system controls and app menus from the top bar"
                    />
                    <NavigationTip
                      title="Window Controls"
                      description="Minimize, maximize, or close windows as needed"
                    />
                    <NavigationTip
                      title="Switch Apps"
                      description="Click on different windows to switch between apps"
                    />
                    <NavigationTip
                      title="Context Menus"
                      description="Right-click on many elements for more options"
                    />
                    <NavigationTip
                      title="Spotlight Search"
                      description="Use ⌘+Space to quickly find and launch apps"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
        
        {activeTab === 'apps' && (
          <div className="p-6 md:p-8">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-500 text-transparent bg-clip-text">Launch Applications</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
                  {QUICK_APPS.map((app) => (
                    <AppLaunchCard
                      key={app.id}
                      id={app.id}
                      title={app.title}
                      icon={app.icon}
                      color={app.color}
                      onClick={() => {
                        onCloseWelcome();
                        onOpenApp(app.id);
                      }}
                    />
                  ))}
                </div>
                
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-blue-500/20 p-2 rounded-lg">
                      <Terminal className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold">Start Exploring</h3>
                  </div>
                  <p className="text-gray-300 mb-6">
                    Click on the buttons above to launch applications directly, or close this window and explore the desktop environment on your own. You can always return to this welcome screen by restarting the system.
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCloseWelcome}
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium flex items-center gap-2"
                  >
                    <ChevronRight className="w-5 h-5" />
                    Start Using SnigdhaOS
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper components
const TabButton = ({ isActive, onClick, label }: { isActive: boolean, onClick: () => void, label: string }) => (
  <button 
    className={`px-5 py-3 font-medium text-sm transition-colors ${isActive ? 'bg-white/10 text-white border-b-2 border-blue-500' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
    onClick={onClick}
  >
    {label}
  </button>
);

const InfoItem = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-center gap-2 text-gray-300 text-sm">
    <div className="bg-white/10 p-1.5 rounded">
      {icon}
    </div>
    <span>{text}</span>
  </div>
);

const NavigationTip = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-white/5 rounded-lg p-4">
    <h4 className="font-medium text-white mb-1">{title}</h4>
    <p className="text-sm text-gray-400">{description}</p>
  </div>
);

// Define missing imports
import { User, Folder, Mail, Command } from 'lucide-react';

// Define app list
const QUICK_APPS = [
  { id: 'about', title: 'About Me', icon: User, color: 'from-blue-400 to-indigo-500' },
  { id: 'projects', title: 'Projects', icon: Folder, color: 'from-emerald-400 to-teal-500' },
  { id: 'skills', title: 'Skills', icon: Code, color: 'from-amber-400 to-orange-500' },
  { id: 'contact', title: 'Contact', icon: Mail, color: 'from-rose-400 to-pink-500' }
];

const AppLaunchCard = ({ id, title, icon: Icon, color, onClick }: { id: string, title: string, icon: LucideIcon, color: string, onClick: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.03, y: -3 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 cursor-pointer"
    onClick={onClick}
  >
    <div className={`bg-gradient-to-br ${color} p-5 flex justify-center`}>
      <Icon className="w-12 h-12 text-white" />
    </div>
    <div className="p-3 text-center">
      <h3 className="font-medium text-white">{title}</h3>
      <p className="text-xs text-gray-400 mt-1">Click to launch</p>
    </div>
  </motion.div>
); 