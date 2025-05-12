"use client";

import { useState, useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Plus, 
  X, 
  Home, 
  Bookmark as BookmarkIcon,
  Info,
  Bell,
  Search,
  Globe,
  Star,
  History,
  Menu,
  Download,
  MoreVertical,
  Lock,
  User,
  Settings
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

// Chrome Icon component
const ChromeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full">
    <circle cx="12" cy="12" r="11" fill="#fff"></circle>
    <path fill="#EA4335" d="M12,4.7c1.7,0,3.3,0.6,4.6,1.7L12,12V4.7z"></path>
    <path fill="#4285F4" d="M19.3,12c0,2.8-1.5,5.3-3.9,6.7L12,12H19.3z"></path>
    <path fill="#34A853" d="M12,19.3c-2.8,0-5.3-1.5-6.7-3.9L12,12V19.3z"></path>
    <path fill="#FBBC05" d="M4.7,12c0-2.8,1.5-5.3,3.9-6.7L12,12H4.7z"></path>
    <circle cx="12" cy="12" r="4" fill="#fff"></circle>
    <circle cx="12" cy="12" r="3" fill="#4285F4"></circle>
  </svg>
);

// Quick access sites (for start page)
const quickAccessSites = [
  { id: 'q1', title: 'GitHub', url: 'https://github.com', icon: '🐱', color: 'bg-[#24292e]' },
  { id: 'q2', title: 'LinkedIn', url: 'https://linkedin.com', icon: '💼', color: 'bg-[#0a66c2]' },
  { id: 'q3', title: 'Twitter/X', url: 'https://twitter.com', icon: '🐦', color: 'bg-[#1da1f2]' },
  { id: 'q4', title: 'YouTube', url: 'https://youtube.com', icon: '📺', color: 'bg-[#ff0000]' },
  { id: 'q5', title: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '📚', color: 'bg-[#f48024]' },
  { id: 'q6', title: 'Dev.to', url: 'https://dev.to', icon: '👨‍💻', color: 'bg-[#0a0a0a]' },
  { id: 'q7', title: 'CodePen', url: 'https://codepen.io', icon: '🖋️', color: 'bg-[#000000]' },
  { id: 'q8', title: 'MDN Docs', url: 'https://developer.mozilla.org', icon: '📘', color: 'bg-[#83bff4]' },
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

export default function ChromeApp() {
  const { theme } = useTheme();
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [url, setUrl] = useState('https://my-portfolio.dev');
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  // Refs
  const urlInputRef = useRef<HTMLInputElement>(null);
  const urlBarRef = useRef<HTMLFormElement>(null);
  
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
  
  // Focus URL bar when pressing Control+L
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
  
  // Toggle panels
  const togglePanel = (panel: 'bookmarks' | 'history' | 'downloads' | 'menu') => {
    if (panel === 'bookmarks') {
      setShowBookmarks(!showBookmarks);
      setShowHistory(false);
      setShowDownloads(false);
      setShowMenu(false);
    } else if (panel === 'history') {
      setShowHistory(!showHistory);
      setShowBookmarks(false);
      setShowDownloads(false);
      setShowMenu(false);
    } else if (panel === 'downloads') {
      setShowDownloads(!showDownloads);
      setShowBookmarks(false);
      setShowHistory(false);
      setShowMenu(false);
    } else if (panel === 'menu') {
      setShowMenu(!showMenu);
      setShowBookmarks(false);
      setShowHistory(false);
      setShowDownloads(false);
    }
  };
  
  // Theme-aware styles
  const isDark = theme === 'dark';
  
  // Window color based on theme
  const chromeWindowStyle = {
    background: isDark ? 'var(--background)' : 'var(--background)',
    color: isDark ? 'var(--foreground)' : 'var(--foreground)',
  };
  
  // Tab colors based on theme
  const tabStyle = (isActive: boolean) => ({
    background: isActive 
      ? isDark ? 'var(--card)' : 'var(--card)'
      : isDark ? 'var(--muted)' : 'var(--muted)',
    color: isActive
      ? isDark ? 'var(--card-foreground)' : 'var(--card-foreground)'
      : isDark ? 'var(--muted-foreground)' : 'var(--muted-foreground)',
  });
  
  // URL bar colors
  const urlBarStyle = {
    background: isDark ? 'var(--input)' : 'var(--input)',
    color: isDark ? 'var(--foreground)' : 'var(--foreground)',
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden rounded-lg" style={chromeWindowStyle}>
      {/* Chrome window header with tabs */}
      <div className="bg-gray-100 dark:bg-gray-800 flex items-center p-1 pl-2">
        {/* Navigation buttons */}
        <div className="flex space-x-1 mr-2">
          <button 
            onClick={navigateBack}
            disabled={historyIndex <= 0}
            className={`p-1 rounded-full ${historyIndex <= 0 ? 'text-gray-400' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={navigateForward}
            disabled={historyIndex >= browserHistory.length - 1}
            className={`p-1 rounded-full ${historyIndex >= browserHistory.length - 1 ? 'text-gray-400' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <ChevronRight size={16} />
          </button>
          <button 
            onClick={reload}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <RotateCcw size={16} className={isLoading ? 'animate-spin' : ''} />
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex-1 flex items-center min-w-0 h-8">
          {tabs.map(tab => (
            <div 
              key={tab.id}
              onClick={() => switchTab(tab.id)}
              style={tabStyle(tab.active)}
              className={`
                flex items-center px-3 py-1 rounded-t-lg mr-1 cursor-pointer relative min-w-0 max-w-[180px]
                ${tab.active ? 'bg-white dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'}
              `}
            >
              <span className="mr-2 text-sm">{tab.favicon}</span>
              <span className="truncate text-sm">{tab.title}</span>
              <button 
                onClick={(e) => closeTab(tab.id, e)}
                className="ml-2 p-0.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <X size={14} />
              </button>
              
              {tab.active && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 dark:bg-blue-400"
                />
              )}
            </div>
          ))}
          
          {/* New Tab button */}
          <button 
            onClick={addTab}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 flex-shrink-0"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      {/* URL bar and tools */}
      <div className="bg-gray-200 dark:bg-gray-700 px-2 py-1.5 flex items-center space-x-2">
        <form ref={urlBarRef} className="flex-1 relative" onSubmit={handleUrlSubmit}>
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-gray-500 dark:border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              url.startsWith('https') ? <Lock size={14} /> : <Globe size={14} />
            )}
          </div>
          
          <input
            ref={urlInputRef}
            type="text"
            value={url}
            onChange={handleUrlChange}
            style={urlBarStyle}
            className="w-full rounded-full py-1.5 pl-9 pr-3 text-sm bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onFocus={(e) => e.target.select()}
          />
        </form>
        
        {/* Bookmark button */}
        <button 
          onClick={() => togglePanel('bookmarks')}
          className={`p-1.5 rounded-full ${showBookmarks ? 'bg-gray-300 dark:bg-gray-600' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
        >
          <BookmarkIcon size={16} className="text-gray-700 dark:text-gray-300" />
        </button>
        
        {/* Menu button */}
        <button 
          onClick={() => togglePanel('menu')}
          className={`p-1.5 rounded-full ${showMenu ? 'bg-gray-300 dark:bg-gray-600' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}`}
        >
          <MoreVertical size={16} className="text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      
      {/* Bookmarks bar */}
      <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 flex items-center text-xs border-b border-gray-200 dark:border-gray-700">
        {bookmarks.filter(b => !b.folder).slice(0, 8).map((bookmark) => (
          <div 
            key={bookmark.id}
            onClick={() => navigateToUrl(bookmark.url, bookmark.title, bookmark.favicon)}
            className="flex items-center px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer mr-1"
          >
            <span className="mr-1.5">{bookmark.favicon}</span>
            <span className="truncate max-w-[80px]">{bookmark.title}</span>
          </div>
        ))}
      </div>
      
      {/* Content area */}
      <div className="flex-1 bg-white dark:bg-gray-900 overflow-hidden relative">
        {/* Loading bar animation */}
        {isLoading && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <motion.div 
              className="h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </div>
        )}
        
        {/* Page content - simplified for demo */}
        <div className="w-full h-full flex items-center justify-center text-center p-6">
          {/* This would be the actual web page - simplified for the demo */}
          {url === 'about:blank' ? (
            <div className="w-full max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="w-28 h-28 mx-auto">
                  <ChromeIcon />
                </div>
              </div>
              
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search Google or type a URL"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-3 px-4 pr-10 rounded-full border border-gray-300 dark:border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="text-gray-500 dark:text-gray-400" size={20} />
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-4 md:grid-cols-4">
                {quickAccessSites.map((site) => (
                  <div 
                    key={site.id}
                    onClick={() => navigateToUrl(site.url, site.title, site.icon)}
                    className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition duration-100"
                  >
                    <div className={`w-12 h-12 rounded-full ${site.color} flex items-center justify-center text-white text-xl mb-2`}>
                      {site.icon}
                    </div>
                    <div className="text-sm text-gray-800 dark:text-gray-200">{site.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <p className="text-center max-w-md">
                {!isLoading && (
                  <>
                    <span className="block text-lg font-medium mb-2">Content for: {url}</span>
                    <span className="block text-sm">This is a simplified browser simulation. Real page content would appear here.</span>
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Dropdowns and menus */}
      <AnimatePresence>
        {/* Bookmarks panel */}
        {showBookmarks && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[122px] right-12 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium">Bookmarks</h3>
            </div>
            
            <div className="max-h-80 overflow-y-auto">
              {/* Group bookmarks by folder */}
              {Array.from(new Set(bookmarks.map(b => b.folder || 'Other'))).map(folder => (
                <div key={folder} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                  <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-850">
                    {folder}
                  </div>
                  {bookmarks.filter(b => (b.folder || 'Other') === folder).map(bookmark => (
                    <div 
                      key={bookmark.id}
                      onClick={() => {
                        navigateToUrl(bookmark.url, bookmark.title, bookmark.favicon);
                        setShowBookmarks(false);
                      }}
                      className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center cursor-pointer"
                    >
                      <span className="mr-2">{bookmark.favicon}</span>
                      <span className="text-sm truncate">{bookmark.title}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Menu panel */}
        {showMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[122px] right-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="py-1">
              <div 
                onClick={() => togglePanel('history')}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center cursor-pointer"
              >
                <History size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                <span>History</span>
              </div>
              
              <div 
                onClick={() => togglePanel('downloads')}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center cursor-pointer"
              >
                <Download size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                <span>Downloads</span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
              
              <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center cursor-pointer">
                <Settings size={16} className="mr-3 text-gray-500 dark:text-gray-400" />
                <span>Settings</span>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* History panel */}
        {showHistory && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[122px] right-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium">History</h3>
              <button 
                onClick={() => setShowHistory(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {browserHistoryItems.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => {
                    navigateToUrl(item.url, item.title, item.favicon);
                    setShowHistory(false);
                  }}
                  className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center cursor-pointer"
                >
                  <span className="mr-2">{item.favicon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{item.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{item.url}</div>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 ml-2">
                    {formatTimeAgo(item.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Downloads panel */}
        {showDownloads && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[122px] right-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50"
          >
            <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-medium">Downloads</h3>
              <button 
                onClick={() => setShowDownloads(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X size={16} />
              </button>
            </div>
            
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <Download size={24} className="mx-auto mb-2 opacity-50" />
              <p>No recent downloads</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 