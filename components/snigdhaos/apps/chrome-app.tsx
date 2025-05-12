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
  
  return (
    <div className="h-full flex flex-col bg-[#f1f3f4] overflow-hidden">
      {/* Chrome toolbar */}
      <div className="bg-[#f1f3f4] p-1 flex flex-col select-none">
        {/* Tab bar */}
        <div className="flex items-center mb-1">
          <div className="flex-1 flex items-center space-x-1 overflow-x-auto hide-scrollbar">
            {tabs.map((tab, index) => (
              <motion.div 
                key={tab.id}
                className={`flex items-center min-w-[180px] max-w-[240px] h-9 rounded-t-lg text-xs cursor-pointer relative
                  ${tab.active 
                    ? 'bg-white text-gray-800 z-10' 
                    : 'bg-[#dee1e6] text-gray-600 hover:bg-[#e9ecf0]'
                  }
                  ${index === 0 ? '' : '-ml-2'}
                `}
                onClick={() => switchTab(tab.id)}
                layoutId={`tab-${tab.id}`}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <div className={`absolute left-0 top-0 bottom-0 w-3 rounded-tl-lg
                  ${tab.active 
                    ? 'bg-white' 
                    : index === 0 
                      ? 'bg-[#dee1e6]' 
                      : 'bg-transparent'
                  }`}
                />
                
                <div className="flex items-center px-3 pl-5 w-full h-full">
                  <span className="mr-2">{tab.favicon}</span>
                  <span className="truncate">{tab.title}</span>
                  
                  <button 
                    className="ml-auto p-1 rounded-full hover:bg-gray-200"
                    onClick={(e) => closeTab(tab.id, e)}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <div className={`absolute right-0 top-0 bottom-0 w-3 rounded-tr-lg
                  ${tab.active 
                    ? 'bg-white' 
                    : 'bg-[#dee1e6]'
                  }`}
                />
              </motion.div>
            ))}
          </div>
          
          <button 
            className="p-1.5 rounded-full hover:bg-gray-200 transition-colors ml-1 mr-2"
            onClick={addTab}
            aria-label="Add new tab"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Navigation controls and URL bar */}
        <div className="flex items-center bg-white h-10 px-2 rounded-t-lg shadow-sm">
          <div className="flex space-x-1 mr-2">
            <button 
              className={`p-1.5 rounded-full transition-colors ${historyIndex > 0 ? 'hover:bg-gray-200 text-gray-600' : 'text-gray-300 cursor-not-allowed'}`}
              onClick={navigateBack}
              disabled={historyIndex <= 0}
              aria-label="Go back"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-full transition-colors ${historyIndex < browserHistory.length - 1 ? 'hover:bg-gray-200 text-gray-600' : 'text-gray-300 cursor-not-allowed'}`}
              onClick={navigateForward}
              disabled={historyIndex >= browserHistory.length - 1}
              aria-label="Go forward"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button 
              className="p-1.5 rounded-full hover:bg-gray-200 transition-colors text-gray-600"
              onClick={reload}
              aria-label="Reload page"
            >
              <RotateCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
          
          {/* URL bar (Omnibox) */}
          <div className="flex-1 relative">
            <form 
              ref={urlBarRef}
              className="flex items-center h-8 bg-[#f1f3f4] hover:bg-[#f8f9fa] focus-within:bg-white rounded-full px-3 border border-transparent focus-within:border-[#dfe1e5] focus-within:shadow-sm"
              onSubmit={handleUrlSubmit}
            >
              <div className="flex items-center text-gray-500 mr-2">
                <Lock className="w-3.5 h-3.5" />
              </div>
              
              <input 
                ref={urlInputRef}
                type="text"
                value={url}
                onChange={handleUrlChange}
                className="flex-1 bg-transparent text-sm text-gray-800 outline-none"
                placeholder="Search Google or type a URL"
              />
              
              <button type="button" className="ml-2 text-gray-500 hover:text-gray-700">
                <Star className="w-4 h-4" />
              </button>
            </form>
          </div>
          
          {/* Browser controls */}
          <div className="flex items-center ml-2 space-x-1">
            <button 
              className={`p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600 ${showBookmarks ? 'bg-gray-200' : ''}`}
              onClick={() => togglePanel('bookmarks')}
              aria-label="Toggle bookmarks"
            >
              <BookmarkIcon className="w-4 h-4" />
            </button>
            
            <button 
              className={`p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600 ${showHistory ? 'bg-gray-200' : ''}`}
              onClick={() => togglePanel('history')}
              aria-label="History"
            >
              <History className="w-4 h-4" />
            </button>
            
            <button 
              className={`p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600 ${showDownloads ? 'bg-gray-200' : ''}`}
              onClick={() => togglePanel('downloads')}
              aria-label="Downloads"
            >
              <Download className="w-4 h-4" />
            </button>
            
            <div className="relative">
              <button 
                className={`p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-600 ${showMenu ? 'bg-gray-200' : ''}`}
                onClick={() => togglePanel('menu')}
                aria-label="Menu"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              
              {/* Menu dropdown */}
              {showMenu && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg z-50 py-2">
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <User className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-sm">Profile</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <BookmarkIcon className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-sm">Bookmarks</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <History className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-sm">History</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <Download className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-sm">Downloads</span>
                  </div>
                  <div className="border-t my-1"></div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <Settings className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-sm">Settings</span>
                  </div>
                  <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
                    <Info className="w-4 h-4 mr-3 text-gray-500" />
                    <span className="text-sm">About Chrome</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* User profile icon */}
            <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
              <span className="text-sm font-medium">E</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Bookmarks bar */}
      <AnimatePresence>
        {showBookmarks && (
          <motion.div 
            className="border-b bg-white py-1 px-2 flex items-center overflow-x-auto hide-scrollbar"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {bookmarks.map(bookmark => (
              <motion.div 
                key={bookmark.id}
                className="flex items-center px-3 py-1 rounded text-xs cursor-pointer hover:bg-gray-100 whitespace-nowrap mr-1 transition-colors"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                onClick={() => navigateToUrl(bookmark.url, bookmark.title, bookmark.favicon)}
              >
                <span className="mr-1.5">{bookmark.favicon}</span>
                <span className="text-gray-700">{bookmark.title}</span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Browser content area */}
      <div className="flex-1 bg-white relative overflow-hidden">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-8 h-8 mb-3">
              <ChromeIcon />
              <div className="w-full h-0.5 bg-gray-200 mt-4 rounded-full overflow-hidden">
                <div className="h-full w-1/2 bg-blue-500 rounded-full animate-bounce-x"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center">
            {/* If this is a "new tab" */}
            {activeTab.url === 'about:blank' ? (
              <div className="w-full h-full flex flex-col items-center justify-center">
                <div className="max-w-lg w-full px-4">
                  <div className="w-28 h-28 mx-auto mb-8">
                    <ChromeIcon />
                  </div>
                  
                  <div className="relative mb-8">
                    <input
                      type="text"
                      className="w-full py-3 px-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 shadow-sm text-gray-800"
                      placeholder="Search Google or type a URL"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      <Search className="w-5 h-5" />
                    </button>
                  </div>
                  
                  {/* Shortcuts */}
                  <div className="grid grid-cols-4 gap-4">
                    {quickAccessSites.map(site => (
                      <motion.div
                        key={site.id}
                        className="flex flex-col items-center cursor-pointer group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigateToUrl(site.url, site.title, site.icon)}
                      >
                        <div className={`w-12 h-12 rounded-full ${site.color} flex items-center justify-center mb-2 group-hover:shadow-md transition-all`}>
                          <span className="text-xl text-white">{site.icon}</span>
                        </div>
                        <p className="text-center text-xs text-gray-600">{site.title}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center max-w-2xl mx-auto p-8 pt-12">
                <div className="w-24 h-24 mx-auto mb-8">
                  <ChromeIcon />
                </div>
                <motion.h1 
                  className="text-2xl font-semibold mb-4 text-gray-800"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  Welcome to Chrome
                </motion.h1>
                <motion.p 
                  className="text-gray-600 mb-8"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  This is a simulated browser experience within this portfolio website. 
                  You can interact with the browser controls just like in Google Chrome.
                </motion.p>
                <motion.div 
                  className="grid grid-cols-2 gap-5 max-w-md mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <Globe className="w-8 h-8 mb-2 mx-auto text-blue-500" />
                    <h3 className="font-medium text-gray-700">New Tab</h3>
                  </button>
                  <button 
                    className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    onClick={() => togglePanel('bookmarks')}
                  >
                    <BookmarkIcon className="w-8 h-8 mb-2 mx-auto text-blue-500" />
                    <h3 className="font-medium text-gray-700">Bookmarks</h3>
                  </button>
                </motion.div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* History panel */}
      <AnimatePresence>
        {showHistory && (
          <motion.div 
            className="absolute top-[88px] right-0 w-96 bg-white border-l shadow-lg h-[calc(100%-88px)] z-40"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-4 border-b">
              <h3 className="font-medium text-gray-800">History</h3>
            </div>
            <div className="overflow-y-auto h-[calc(100%-57px)]">
              {browserHistoryItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigateToUrl(item.url, item.title, item.favicon)}
                >
                  <span className="mr-3 text-lg">{item.favicon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-800 truncate">{item.title}</div>
                    <div className="text-xs text-gray-500 truncate">{item.url}</div>
                  </div>
                  <div className="text-xs text-gray-500 ml-2">
                    {formatTimeAgo(item.timestamp)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Downloads panel */}
      <AnimatePresence>
        {showDownloads && (
          <motion.div 
            className="absolute bottom-0 w-full h-64 bg-white border-t shadow-lg z-40"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center p-3 border-b">
              <h3 className="font-medium text-gray-800">Downloads</h3>
              <button
                className="p-1 rounded-full hover:bg-gray-200"
                onClick={() => setShowDownloads(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 text-center text-gray-500">
              <p>No recent downloads</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Add Chrome's bounce animation */}
      <style jsx global>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(400%); }
        }
        .animate-bounce-x {
          animation: bounce-x 1.5s infinite;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
} 