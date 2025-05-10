"use client";

import React, { useState } from 'react';
import BaseIOSApp from './BaseIOSApp';
import { Search, ArrowLeft, ArrowRight, Share, BookOpen, Plus, GridIcon } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';

export default function SafariApp() {
  const [url, setUrl] = useState<string>("https://eshanized.is-a.dev");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("homepage");
  
  // Sample bookmarks
  const bookmarks = [
    { name: "GitHub", url: PERSONAL_INFO.github },
    { name: "LinkedIn", url: PERSONAL_INFO.linkedin },
    { name: "Twitter", url: PERSONAL_INFO.twitter },
    { name: "Portfolio", url: PERSONAL_INFO.website },
  ];
  
  // Sample recent sites
  const recentSites = [
    { name: "GitHub", url: "https://github.com", favicon: "🛠️" },
    { name: "DEV.to", url: "https://dev.to", favicon: "🧰" },
    { name: "YouTube", url: "https://youtube.com", favicon: "📺" },
    { name: "MDN Web Docs", url: "https://developer.mozilla.org", favicon: "📚" },
    { name: "Hashnode", url: "https://hashnode.com", favicon: "💻" },
    { name: "Stack Overflow", url: "https://stackoverflow.com", favicon: "❓" },
  ];
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate loading
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <BaseIOSApp title="Safari" onBack={undefined}>
      <div className="h-full flex flex-col">
        {/* URL/Search bar */}
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSearch} className="flex items-center">
            <button 
              type="button" 
              className="text-gray-500 mr-2"
              onClick={() => setIsLoading(true)}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button 
              type="button"
              className="text-gray-500 mr-2"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full py-1.5 pl-10 pr-4 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm border border-transparent focus:outline-none focus:border-blue-500"
                placeholder="Search or enter website name"
              />
              {isLoading && (
                <div className="absolute right-3 inset-y-0 flex items-center">
                  <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            
            <button 
              type="button"
              className="text-gray-500 ml-2"
            >
              <Share className="w-5 h-5" />
            </button>
          </form>
        </div>
        
        {/* Browser content */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
          {/* Safari homepage */}
          <div className="p-4">
            {/* Favorites */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3">Favorites</h2>
              <div className="grid grid-cols-4 gap-4">
                {bookmarks.map((bookmark, index) => (
                  <a
                    key={index}
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <div className="w-14 h-14 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-1">
                      <span className="text-xl">{bookmark.name.charAt(0)}</span>
                    </div>
                    <span className="text-xs text-center truncate w-full">{bookmark.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Frequently Visited */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Frequently Visited</h2>
              <div className="grid grid-cols-3 gap-3">
                {recentSites.map((site, index) => (
                  <a
                    key={index}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-lg p-3"
                  >
                    <div className="w-8 h-8 rounded-md bg-white dark:bg-gray-700 flex items-center justify-center mr-3">
                      <span>{site.favicon}</span>
                    </div>
                    <span className="text-sm truncate">{site.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Privacy Report */}
            <div className="mt-6 bg-gray-100 dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="font-medium mb-2">Privacy Report</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Safari has prevented 23 trackers from profiling you in the last seven days.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tab switcher & bottom bar */}
        <div className="p-3 bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <button className="p-1">
            <BookOpen className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button className="p-1">
            <Plus className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
          
          <button className="p-1">
            <GridIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </BaseIOSApp>
  );
} 