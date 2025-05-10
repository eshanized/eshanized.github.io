"use client";

import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Plus, 
  X, 
  Home, 
  Bookmark,
  Share,
  ShieldCheck,
  Search
} from 'lucide-react';
import { motion } from 'framer-motion';

// Safari Icon component
const SafariIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <g>
      <linearGradient gradientUnits="userSpaceOnUse" id="SVGID_1_" x1="12" x2="12" y1="0.5" y2="23.5">
        <stop offset="0" style={{stopColor:"#15BEF0"}}/>
        <stop offset="0.155213" style={{stopColor:"#18B2E8"}}/>
        <stop offset="0.4323524" style={{stopColor:"#2094D2"}}/>
        <stop offset="0.7966607" style={{stopColor:"#2E62AF"}}/>
        <stop offset="1" style={{stopColor:"#374499"}}/>
      </linearGradient>
      <circle cx="12" cy="12" fill="url(#SVGID_1_)" r="11.5"/>
      <linearGradient gradientUnits="userSpaceOnUse" id="SVGID_2_" x1="12" x2="20.1317215" y1="12" y2="20.1317215">
        <stop offset="0" style={{stopColor:"#000000", stopOpacity:"0.1"}}/>
        <stop offset="1" style={{stopColor:"#000000", stopOpacity:"0"}}/>
      </linearGradient>
      <path d="M23.5,12c0-0.9956055-0.1397705-1.9563599-0.3776245-2.8776245L19,5l-5.5,8.5L5,19l4.1223755,4.1223755C10.0437012,23.3602295,11.0043945,23.5,12,23.5C18.3512573,23.5,23.5,18.3512573,23.5,12z" fill="url(#SVGID_2_)"/>
      <path d="M12,24C5.3828125,24,0,18.6166992,0,12S5.3828125,0,12,0s12,5.3833008,12,12S18.6171875,24,12,24z M12,1C5.9345703,1,1,5.9345703,1,12s4.9345703,11,11,11s11-4.9345703,11-11S18.0654297,1,12,1z" fill="#F2F2F2"/>
      <polygon fill="#EF373E" points="19,5 10.5,10.5 13.5,13.5"/>
      <polygon opacity="0.1" points="19,5 12,12 13.5,13.5"/>
      <polygon fill="#FFFFFF" points="4.9999986,18.9999981 13.499999,13.499999 10.499999,10.499999"/>
      <polygon opacity="0.1" points="4.9999986,18.9999981 11.999999,11.999999 13.5,13.5"/>
      <path d="M12,23.75c-5.4144835,0-10.0010967-3.5623417-11.5193195-8.4773369c-0.11311-0.3661747-0.209189-0.7398577-0.2873104-1.1201344c0.0572594,0.3174276,0.1269963,0.6304893,0.2086847,0.9386606C1.762589,20.2238407,6.4384174,24,12,24c5.4323578,0,10.0144463-3.5743637,11.4917545-8.5204544c0.1259518-0.4216919,0.2293358-0.8533554,0.308754-1.2936239c-0.0704193,0.342782-0.155405,0.6800756-0.254282,1.0112286C22.063055,20.1644802,17.4542561,23.75,12,23.75z" opacity="0.1"/>
      <path d="M12,0.25c5.4057007,0,9.9801025,3.5333252,11.5174561,8.4031372C22.0674438,3.6561279,17.4645996,0,12,0S1.9325562,3.6561279,0.4825439,8.6531372C2.0198975,3.7833252,6.5942993,0.25,12,0.25z" fill="#FFFFFF" opacity="0.2"/>
      <linearGradient gradientUnits="userSpaceOnUse" id="SVGID_3_" x1="1.1217111" x2="22.8782883" y1="6.9273705" y2="17.0726299">
        <stop offset="0" style={{stopColor:"#FFFFFF", stopOpacity:"0.2"}}/>
        <stop offset="1" style={{stopColor:"#FFFFFF", stopOpacity:"0"}}/>
      </linearGradient>
      <circle cx="12" cy="12" fill="url(#SVGID_3_)" r="12"/>
    </g>
  </svg>
);

// Sample bookmarks
const bookmarks = [
  { id: 'b1', title: 'GitHub', url: 'https://github.com', favicon: '🐱' },
  { id: 'b2', title: 'Stack Overflow', url: 'https://stackoverflow.com', favicon: '📚' },
  { id: 'b3', title: 'MDN Web Docs', url: 'https://developer.mozilla.org', favicon: '📄' },
  { id: 'b4', title: 'CodePen', url: 'https://codepen.io', favicon: '📝' },
  { id: 'b5', title: 'Dev.to', url: 'https://dev.to', favicon: '👨‍💻' },
];

// Sample tabs
const initialTabs = [
  { id: 't1', title: 'Portfolio', url: 'https://my-portfolio.dev', favicon: '👨‍💻', active: true },
  { id: 't2', title: 'GitHub', url: 'https://github.com', favicon: '🐱', active: false },
];

// Sample history for back/forward navigation
const browserHistory = [
  'https://my-portfolio.dev',
  'https://github.com/username',
  'https://github.com/username/repository',
  'https://github.com'
];

type Tab = {
  id: string;
  title: string;
  url: string;
  favicon: string;
  active: boolean;
};

export default function SafariApp() {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [url, setUrl] = useState('https://my-portfolio.dev');
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get active tab
  const activeTab = tabs.find(tab => tab.active) || tabs[0];
  
  // Handle navigation
  const navigateBack = () => {
    if (historyIndex > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setHistoryIndex(historyIndex - 1);
        setUrl(browserHistory[historyIndex - 1]);
        setIsLoading(false);
      }, 500);
    }
  };
  
  const navigateForward = () => {
    if (historyIndex < browserHistory.length - 1) {
      setIsLoading(true);
      setTimeout(() => {
        setHistoryIndex(historyIndex + 1);
        setUrl(browserHistory[historyIndex + 1]);
        setIsLoading(false);
      }, 500);
    }
  };
  
  const reload = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  // Handle URL changes
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setTimeout(() => {
      // Update tab title
      setTabs(tabs.map(tab => {
        if (tab.active) {
          return {
            ...tab,
            title: url.replace('https://', '').split('/')[0],
            url
          };
        }
        return tab;
      }));
      
      setIsLoading(false);
    }, 800);
  };
  
  // Tab management
  const addTab = () => {
    const newTab: Tab = {
      id: `t${Date.now()}`,
      title: 'New Tab',
      url: 'about:blank',
      favicon: '🌐',
      active: false
    };
    
    setTabs(tabs.map(tab => ({ ...tab, active: false })).concat(newTab));
    switchTab(newTab.id);
  };
  
  const closeTab = (id: string) => {
    // Don't close if it's the last tab
    if (tabs.length === 1) return;
    
    const tabIndex = tabs.findIndex(tab => tab.id === id);
    const isActive = tabs[tabIndex].active;
    
    // Remove the tab
    const newTabs = tabs.filter(tab => tab.id !== id);
    
    // If the closed tab was active, activate another tab
    if (isActive) {
      const newActiveIndex = tabIndex === 0 ? 0 : tabIndex - 1;
      newTabs[newActiveIndex].active = true;
      setUrl(newTabs[newActiveIndex].url);
    }
    
    setTabs(newTabs);
  };
  
  const switchTab = (id: string) => {
    const newTabs = tabs.map(tab => ({
      ...tab,
      active: tab.id === id
    }));
    
    setTabs(newTabs);
    
    // Update URL to match the selected tab
    const selectedTab = newTabs.find(tab => tab.id === id);
    if (selectedTab) {
      setUrl(selectedTab.url);
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Safari toolbar */}
      <div className="border-b bg-muted/30 backdrop-blur-sm p-2 flex flex-col">
        {/* Tab bar */}
        <div className="flex items-center mb-2">
          <div className="flex-1 flex items-center space-x-1 overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <div 
                key={tab.id}
                className={`flex items-center min-w-[120px] max-w-[180px] px-3 py-1 rounded-t-lg text-xs cursor-pointer ${
                  tab.active ? 'bg-background' : 'bg-muted hover:bg-muted/70'
                }`}
                onClick={() => switchTab(tab.id)}
              >
                <span className="mr-1">{tab.favicon}</span>
                <span className="truncate">{tab.title}</span>
                <button 
                  className="ml-auto p-1 rounded-full hover:bg-accent/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          
          <button 
            className="ml-2 p-1 rounded-full hover:bg-accent/30"
            onClick={addTab}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Navigation controls */}
        <div className="flex items-center">
          <div className="flex space-x-1 mr-2">
            <button 
              className={`p-1 rounded-full ${historyIndex > 0 ? 'hover:bg-accent/30' : 'opacity-50 cursor-not-allowed'}`}
              onClick={navigateBack}
              disabled={historyIndex <= 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              className={`p-1 rounded-full ${historyIndex < browserHistory.length - 1 ? 'hover:bg-accent/30' : 'opacity-50 cursor-not-allowed'}`}
              onClick={navigateForward}
              disabled={historyIndex >= browserHistory.length - 1}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              className="p-1 rounded-full hover:bg-accent/30"
              onClick={reload}
            >
              <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {/* URL bar */}
          <form 
            className="flex-1 relative group"
            onSubmit={handleUrlSubmit}
          >
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500 mr-1" />
              <div className="h-3 w-px bg-muted-foreground/30"></div>
            </div>
            
            <input 
              type="text"
              value={url}
              onChange={handleUrlChange}
              className="w-full bg-muted rounded-full pl-12 pr-10 py-1.5 text-sm focus:ring-1 focus:ring-accent"
              placeholder="Search or enter website name"
            />
            
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
          </form>
          
          <div className="flex space-x-1 ml-2">
            <button 
              className="p-1 rounded-full hover:bg-accent/30"
              onClick={() => setShowBookmarks(!showBookmarks)}
            >
              <Bookmark className={`w-4 h-4 ${showBookmarks ? 'text-primary' : ''}`} />
            </button>
            <button className="p-1 rounded-full hover:bg-accent/30">
              <Share className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Bookmarks bar */}
      {showBookmarks && (
        <div className="border-b bg-muted/20 py-1 px-2 flex items-center overflow-x-auto hide-scrollbar">
          {bookmarks.map(bookmark => (
            <div 
              key={bookmark.id}
              className="flex items-center px-3 py-1 rounded text-xs cursor-pointer hover:bg-accent/20 whitespace-nowrap mr-1"
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setUrl(bookmark.url);
                  // Update tab
                  setTabs(tabs.map(tab => {
                    if (tab.active) {
                      return {
                        ...tab,
                        title: bookmark.title,
                        url: bookmark.url,
                        favicon: bookmark.favicon
                      };
                    }
                    return tab;
                  }));
                  setIsLoading(false);
                }, 500);
              }}
            >
              <span className="mr-1">{bookmark.favicon}</span>
              <span>{bookmark.title}</span>
            </div>
          ))}
        </div>
      )}
      
      {/* Browser content */}
      <div className="flex-1 flex items-center justify-center bg-muted/10 relative overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3">
              <SafariIcon />
            </div>
            <h1 className="text-2xl font-semibold mb-4">Welcome to Safari</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              This is a simulated browser experience within this portfolio website. 
              You can interact with the browser controls at the top.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
              <div className="p-4 bg-accent/10 rounded-lg hover:bg-accent/20 cursor-pointer transition-colors">
                <Home className="w-8 h-8 mb-2 mx-auto text-primary" />
                <h3 className="font-medium">Start Page</h3>
              </div>
              <div className="p-4 bg-accent/10 rounded-lg hover:bg-accent/20 cursor-pointer transition-colors">
                <Bookmark className="w-8 h-8 mb-2 mx-auto text-primary" />
                <h3 className="font-medium">Bookmarks</h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 