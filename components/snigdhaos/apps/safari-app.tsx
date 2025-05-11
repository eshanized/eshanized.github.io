"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Plus, 
  X, 
  Home, 
  Bookmark as BookmarkIcon,
  Share,
  ShieldCheck,
  Search,
  Globe,
  Star,
  Clock,
  Settings,
  PanelLeft,
  PanelRight,
  Laptop,
  Moon,
  Sun,
  Airplay,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
type Tab = {
  id: string;
  title: string;
  url: string;
  favicon: string;
  active: boolean;
};

type Bookmark = {
  id: string;
  title: string;
  url: string;
  favicon: string;
  folder?: string;
};

type HistoryItem = {
  url: string;
  title: string;
  favicon: string;
  timestamp: Date;
};

type SidebarView = 'favorites' | 'history' | 'reading-list' | 'none';

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

// Quick access sites (for start page)
const quickAccessSites = [
  { id: 'q1', title: 'GitHub', url: 'https://github.com', icon: '🐱', color: 'bg-gradient-to-br from-gray-800 to-gray-900' },
  { id: 'q2', title: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', color: 'bg-gradient-to-br from-blue-600 to-blue-700' },
  { id: 'q3', title: 'Twitter/X', url: 'https://twitter.com', icon: '🐦', color: 'bg-gradient-to-br from-black to-gray-800' },
  { id: 'q4', title: 'YouTube', url: 'https://youtube.com', icon: '📺', color: 'bg-gradient-to-br from-red-600 to-red-700' },
  { id: 'q5', title: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚', color: 'bg-gradient-to-br from-orange-500 to-orange-600' },
  { id: 'q6', title: 'Dev.to', url: 'https://dev.to', icon: '👨‍💻', color: 'bg-gradient-to-br from-indigo-600 to-indigo-700' },
  { id: 'q7', title: 'CodePen', url: 'https://codepen.io', icon: '🖋️', color: 'bg-gradient-to-br from-gray-700 to-gray-800' },
  { id: 'q8', title: 'MDN Docs', url: 'https://developer.mozilla.org', icon: '📘', color: 'bg-gradient-to-br from-blue-700 to-blue-800' },
];

// Sample bookmarks (organized by folders)
const bookmarks: Bookmark[] = [
  { id: 'b1', title: 'GitHub', url: 'https://github.com', favicon: '🐱', folder: 'Development' },
  { id: 'b2', title: 'Stack Overflow', url: 'https://stackoverflow.com', favicon: '📚', folder: 'Development' },
  { id: 'b3', title: 'MDN Web Docs', url: 'https://developer.mozilla.org', favicon: '📄', folder: 'Development' },
  { id: 'b4', title: 'CodePen', url: 'https://codepen.io', favicon: '📝', folder: 'Development' },
  { id: 'b5', title: 'Dev.to', url: 'https://dev.to', favicon: '👨‍💻', folder: 'Development' },
  { id: 'b6', title: 'LinkedIn', url: 'https://linkedin.com', favicon: '💼', folder: 'Social' },
  { id: 'b7', title: 'Twitter', url: 'https://twitter.com', favicon: '🐦', folder: 'Social' },
  { id: 'b8', title: 'YouTube', url: 'https://youtube.com', favicon: '📺', folder: 'Entertainment' },
  { id: 'b9', title: 'Netflix', url: 'https://netflix.com', favicon: '🎬', folder: 'Entertainment' },
];

// Sample tabs with more realistic data
const initialTabs = [
  { id: 't1', title: 'Portfolio', url: 'https://my-portfolio.dev', favicon: '👨‍💻', active: true },
  { id: 't2', title: 'GitHub', url: 'https://github.com', favicon: '🐱', active: false },
];

// Sample history with more entries and timestamps
const browserHistoryItems: HistoryItem[] = [
  { url: 'https://my-portfolio.dev', title: 'Portfolio', favicon: '👨‍💻', timestamp: new Date(Date.now() - 1000 * 60) },
  { url: 'https://github.com/username', title: 'GitHub Profile', favicon: '🐱', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
  { url: 'https://github.com/username/repository', title: 'Project Repository', favicon: '🐱', timestamp: new Date(Date.now() - 1000 * 60 * 30) },
  { url: 'https://linkedin.com/in/username', title: 'LinkedIn Profile', favicon: '💼', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
  { url: 'https://dev.to/username', title: 'Dev.to Profile', favicon: '👨‍💻', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
  { url: 'https://stackoverflow.com/users/123456', title: 'Stack Overflow Profile', favicon: '📚', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) },
];

// Simple array of URLs for navigation history
const browserHistory = browserHistoryItems.map(item => item.url);

export default function SafariApp() {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [url, setUrl] = useState('https://my-portfolio.dev');
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarView, setSidebarView] = useState<SidebarView>('none');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [readerMode, setReaderMode] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  
  // Refs
  const urlInputRef = useRef<HTMLInputElement>(null);
  const urlBarRef = useRef<HTMLFormElement>(null);
  
  // Get active tab
  const activeTab = tabs.find(tab => tab.active) || tabs[0];
  
  // Filter bookmarks for bookmark bar
  const bookmarkBarItems = bookmarks.filter(bookmark => !bookmark.folder);
  
  // Group bookmarks by folder for sidebar
  const bookmarksByFolder = bookmarks.reduce((acc, bookmark) => {
    if (bookmark.folder) {
      if (!acc[bookmark.folder]) {
        acc[bookmark.folder] = [];
      }
      acc[bookmark.folder].push(bookmark);
    }
    return acc;
  }, {} as Record<string, Bookmark[]>);
  
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
            title: url.replace(/^https?:\/\//, '').split('/')[0],
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
  
  const closeTab = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
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
  
  // Toggle sidebar views
  const toggleSidebar = (view: SidebarView) => {
    setSidebarView(currentView => (currentView === view ? 'none' : view));
  };
  
  // Navigation to a URL (used by bookmarks, history, etc.)
  const navigateToUrl = (targetUrl: string, targetTitle: string, targetFavicon: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setUrl(targetUrl);
      
      // Update active tab
      setTabs(tabs.map(tab => {
        if (tab.active) {
          return {
            ...tab,
            title: targetTitle,
            url: targetUrl,
            favicon: targetFavicon
          };
        }
        return tab;
      }));
      
      setIsLoading(false);
    }, 500);
  };
  
  // Focus URL bar when pressing Command+L
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        urlInputRef.current?.focus();
        urlInputRef.current?.select();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Animate URL bar on focus
  const focusUrlBar = () => {
    urlBarRef.current?.classList.add('ring-2', 'ring-primary/50');
  };
  
  const blurUrlBar = () => {
    urlBarRef.current?.classList.remove('ring-2', 'ring-primary/50');
  };
  
  // Format timestamp for history
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));
    const diffHours = Math.round(diffMs / (1000 * 60 * 60));
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };
  
  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Safari toolbar */}
      <div className="border-b bg-muted/30 backdrop-blur-sm p-2 flex flex-col select-none">
        {/* Tab bar */}
        <div className="flex items-center mb-2">
          <div className="flex-1 flex items-center space-x-1 overflow-x-auto hide-scrollbar">
            {tabs.map(tab => (
              <motion.div 
                key={tab.id}
                className={`flex items-center min-w-[120px] max-w-[180px] px-3 py-1 rounded-t-lg text-xs cursor-pointer ${
                  tab.active ? 'bg-background shadow-sm' : 'bg-muted/60 hover:bg-muted/80'
                }`}
                onClick={() => switchTab(tab.id)}
                layoutId={`tab-${tab.id}`}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <span className="mr-1">{tab.favicon}</span>
                <span className="truncate">{tab.title}</span>
                <button 
                  className="ml-auto p-1 rounded-full hover:bg-accent/30"
                  onClick={(e) => closeTab(tab.id, e)}
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.div>
            ))}
          </div>
          
          <button 
            className="ml-2 p-1.5 rounded-full hover:bg-accent/30 transition-colors"
            onClick={addTab}
            aria-label="Add new tab"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Navigation controls */}
        <div className="flex items-center">
          <div className="flex space-x-1 mr-2">
            <button 
              className={`p-1.5 rounded-full transition-colors ${historyIndex > 0 ? 'hover:bg-accent/30 text-foreground' : 'text-muted-foreground/50 cursor-not-allowed'}`}
              onClick={navigateBack}
              disabled={historyIndex <= 0}
              aria-label="Go back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-full transition-colors ${historyIndex < browserHistory.length - 1 ? 'hover:bg-accent/30 text-foreground' : 'text-muted-foreground/50 cursor-not-allowed'}`}
              onClick={navigateForward}
              disabled={historyIndex >= browserHistory.length - 1}
              aria-label="Go forward"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              className="p-1.5 rounded-full hover:bg-accent/30 transition-colors"
              onClick={reload}
              aria-label="Reload page"
            >
              <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              className={`p-1.5 rounded-full hover:bg-accent/30 transition-colors ${sidebarView === 'favorites' ? 'bg-accent/30' : ''}`}
              onClick={() => toggleSidebar('favorites')}
              aria-label="Show bookmarks sidebar"
            >
              <PanelLeft className="w-4 h-4" />
            </button>
          </div>
          
          {/* URL bar */}
          <form 
            ref={urlBarRef}
            className="flex-1 relative group transition-all duration-200"
            onSubmit={handleUrlSubmit}
          >
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none">
              <ShieldCheck className="w-3.5 h-3.5 text-green-500 mr-1" />
              <div className="h-3 w-px bg-muted-foreground/30"></div>
            </div>
            
            <input 
              ref={urlInputRef}
              type="text"
              value={url}
              onChange={handleUrlChange}
              onFocus={focusUrlBar}
              onBlur={blurUrlBar}
              className="w-full bg-muted/80 rounded-full pl-12 pr-10 py-1.5 text-sm focus:outline-none transition-colors"
              placeholder="Search or enter website name"
            />
            
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
          </form>
          
          <div className="flex space-x-1 ml-2">
            <button 
              className={`p-1.5 rounded-full hover:bg-accent/30 transition-colors ${showBookmarks ? 'bg-accent/30' : ''}`}
              onClick={() => setShowBookmarks(!showBookmarks)}
              aria-label="Toggle bookmarks bar"
            >
              <BookmarkIcon className={`w-4 h-4 ${showBookmarks ? 'text-primary' : ''}`} />
            </button>
            <button 
              className="p-1.5 rounded-full hover:bg-accent/30 transition-colors"
              onClick={() => setShowDownloads(!showDownloads)}
              aria-label="Show downloads"
            >
              <Download className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-full hover:bg-accent/30 transition-colors ${sidebarView === 'history' ? 'bg-accent/30' : ''}`}
              onClick={() => toggleSidebar('history')}
              aria-label="Show history sidebar"
            >
              <PanelRight className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-accent/30 transition-colors">
              <Share className="w-4 h-4" />
            </button>
            <button 
              className="p-1.5 rounded-full hover:bg-accent/30 transition-colors"
              onClick={() => setReaderMode(!readerMode)}
              aria-label="Toggle reader mode"
            >
              <Settings className={`w-4 h-4 ${readerMode ? 'text-primary' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Bookmarks bar */}
      <AnimatePresence>
        {showBookmarks && (
          <motion.div 
            className="border-b bg-muted/20 py-1 px-2 flex items-center overflow-x-auto hide-scrollbar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {bookmarks.map(bookmark => (
              <motion.div 
                key={bookmark.id}
                className="flex items-center px-3 py-1 rounded text-xs cursor-pointer hover:bg-accent/20 whitespace-nowrap mr-1 transition-colors"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                onClick={() => navigateToUrl(bookmark.url, bookmark.title, bookmark.favicon)}
              >
                <span className="mr-1">{bookmark.favicon}</span>
                <span>{bookmark.title}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Main content area with optional sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarView !== 'none' && (
            <motion.div 
              className="w-64 border-r bg-background overflow-y-auto"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 240, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="p-2">
                <div className="flex justify-between items-center p-2 mb-2">
                  <h3 className="font-medium">
                    {sidebarView === 'favorites' ? 'Bookmarks' : 'History'}
                  </h3>
                  <button 
                    className="p-1 rounded-full hover:bg-accent/30"
                    onClick={() => setSidebarView('none')}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                
                {sidebarView === 'favorites' && (
                  <div className="space-y-2">
                    {Object.entries(bookmarksByFolder).map(([folder, items]) => (
                      <div key={folder} className="space-y-1">
                        <h4 className="text-xs font-medium text-muted-foreground px-2">{folder}</h4>
                        {items.map(bookmark => (
                          <div
                            key={bookmark.id}
                            className="flex items-center px-2 py-1.5 rounded-md text-sm hover:bg-accent/20 cursor-pointer"
                            onClick={() => navigateToUrl(bookmark.url, bookmark.title, bookmark.favicon)}
                          >
                            <span className="mr-2 text-lg">{bookmark.favicon}</span>
                            <span className="truncate">{bookmark.title}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                
                {sidebarView === 'history' && (
                  <div className="space-y-1">
                    {browserHistoryItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center px-2 py-1.5 rounded-md text-sm hover:bg-accent/20 cursor-pointer"
                        onClick={() => navigateToUrl(item.url, item.title, item.favicon)}
                      >
                        <span className="mr-2 text-lg">{item.favicon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="truncate">{item.title}</div>
                          <div className="text-xs text-muted-foreground truncate">{item.url}</div>
                        </div>
                        <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                          {formatTimeAgo(item.timestamp)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Browser content area */}
        <div className="flex-1 bg-muted/10 relative overflow-hidden">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              {/* If this is a "new tab" */}
              {activeTab.url === 'about:blank' ? (
                <div className="max-w-3xl w-full p-6">
                  {/* Search bar */}
                  <div className="mb-12 max-w-xl mx-auto">
                    <div className="w-24 h-24 mx-auto mb-6">
                      <SafariIcon />
                    </div>
                    <form className="relative">
                      <input
                        type="text"
                        className="w-full py-3 pl-5 pr-12 rounded-full bg-muted/50 border border-muted-foreground/20 focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-sm"
                        placeholder="Search the web"
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                      >
                        <Search className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                  
                  {/* Quick access grid */}
                  <div className="grid grid-cols-4 gap-4">
                    {quickAccessSites.map(site => (
                      <motion.div
                        key={site.id}
                        className={`${site.color} rounded-xl p-4 cursor-pointer shadow-md hover:shadow-lg transition-all`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigateToUrl(site.url, site.title, site.icon)}
                      >
                        <div className="bg-white/10 w-12 h-12 rounded-full flex items-center justify-center mb-3 mx-auto">
                          <span className="text-2xl">{site.icon}</span>
                        </div>
                        <p className="text-center text-white text-sm font-medium truncate">{site.title}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center max-w-2xl mx-auto p-8">
                  <div className="w-16 h-16 mx-auto mb-3">
                    <SafariIcon />
                  </div>
                  <motion.h1 
                    className="text-2xl font-semibold mb-4"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Welcome to Safari
                  </motion.h1>
                  <motion.p 
                    className="text-muted-foreground mb-8 max-w-md mx-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    This is a simulated browser experience within this portfolio website. 
                    You can interact with all browser controls at the top.
                  </motion.p>
                  <motion.div 
                    className="grid grid-cols-2 gap-4 max-w-md mx-auto"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="p-5 bg-accent/10 rounded-lg hover:bg-accent/20 cursor-pointer transition-colors">
                      <Home className="w-8 h-8 mb-3 mx-auto text-primary" />
                      <h3 className="font-medium">Start Page</h3>
                    </div>
                    <div className="p-5 bg-accent/10 rounded-lg hover:bg-accent/20 cursor-pointer transition-colors"
                      onClick={() => toggleSidebar('favorites')}
                    >
                      <BookmarkIcon className="w-8 h-8 mb-3 mx-auto text-primary" />
                      <h3 className="font-medium">Bookmarks</h3>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Downloads panel */}
      <AnimatePresence>
        {showDownloads && (
          <motion.div 
            className="absolute bottom-0 right-0 w-80 bg-background border-l border-t rounded-tl-lg shadow-lg"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="font-medium">Downloads</h3>
              <button
                className="p-1 rounded-full hover:bg-accent/30"
                onClick={() => setShowDownloads(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 text-center text-muted-foreground">
              <p>No recent downloads</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 