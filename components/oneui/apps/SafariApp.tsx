"use client";

import React, { useState } from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import { Search, ArrowLeft, ArrowRight, Share, BookOpen, Plus, GridIcon } from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';
import { useOneUITheme } from '../OneUIThemeContext';

export default function SafariApp() {
  const [url, setUrl] = useState<string>("https://eshanized.is-a.dev");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("homepage");
  const { colors } = useOneUITheme();
  
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
    <BaseOneUIApp title="Browser" onBack={undefined}>
      <div className={`h-full flex flex-col ${colors.primary}`}>
        {/* URL/Search bar */}
        <div className={`px-4 py-2 ${colors.cardBg} border-b ${colors.divider}`}>
          <form onSubmit={handleSearch} className="flex items-center">
            <button 
              type="button" 
              className={`${colors.textSecondary} mr-2`}
              onClick={() => setIsLoading(true)}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <button 
              type="button"
              className={`${colors.textSecondary} mr-2`}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className={`w-4 h-4 ${colors.textSecondary}`} />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={`w-full py-1.5 pl-10 pr-4 ${colors.tertiary} rounded-md text-sm border border-transparent focus:outline-none focus:ring-1 focus:ring-blue-500 ${colors.textPrimary}`}
                placeholder="Search or enter website name"
              />
              {isLoading && (
                <div className="absolute right-3 inset-y-0 flex items-center">
                  <div className={`w-4 h-4 border-2 ${colors.textSecondary} border-t-transparent rounded-full animate-spin`}></div>
                </div>
              )}
            </div>
            
            <button 
              type="button"
              className={`${colors.textSecondary} ml-2`}
            >
              <Share className="w-5 h-5" />
            </button>
          </form>
        </div>
        
        {/* Browser content */}
        <div className={`flex-1 overflow-y-auto ${colors.primary}`}>
          {/* Browser homepage */}
          <div className="p-4">
            {/* Favorites */}
            <div className="mb-6">
              <h2 className={`text-lg font-medium mb-3 ${colors.textPrimary}`}>Favorites</h2>
              <div className="grid grid-cols-4 gap-4">
                {bookmarks.map((bookmark, index) => (
                  <a
                    key={index}
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center"
                  >
                    <div className={`w-14 h-14 rounded-md ${colors.tertiary} flex items-center justify-center mb-1 border ${colors.divider}`}>
                      <span className={`text-xl ${colors.accent}`}>{bookmark.name.charAt(0)}</span>
                    </div>
                    <span className={`text-xs text-center truncate w-full ${colors.textSecondary}`}>{bookmark.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Frequently Visited */}
            <div>
              <h2 className={`text-lg font-medium mb-3 ${colors.textPrimary}`}>Frequently Visited</h2>
              <div className="grid grid-cols-3 gap-3">
                {recentSites.map((site, index) => (
                  <a
                    key={index}
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center ${colors.tertiary} rounded-md p-3`}
                  >
                    <div className={`w-8 h-8 rounded-md ${colors.cardBg} flex items-center justify-center mr-3 border ${colors.divider}`}>
                      <span>{site.favicon}</span>
                    </div>
                    <span className={`text-sm truncate ${colors.textPrimary}`}>{site.name}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Privacy Report */}
            <div className={`mt-6 ${colors.tertiary} p-4 rounded-md border ${colors.divider}`}>
              <h3 className={`font-medium mb-2 ${colors.textPrimary}`}>Privacy Report</h3>
              <p className={`text-xs ${colors.textSecondary}`}>
                Browser has prevented 23 trackers from profiling you in the last seven days.
              </p>
            </div>
          </div>
        </div>
        
        {/* Tab switcher & bottom bar */}
        <div className={`p-3 ${colors.navBar} border-t ${colors.divider} flex justify-between`}>
          <button className="p-1">
            <BookOpen className={`w-6 h-6 ${colors.textSecondary}`} />
          </button>
          
          <button className="p-1">
            <Plus className={`w-6 h-6 ${colors.textSecondary}`} />
          </button>
          
          <button className="p-1">
            <GridIcon className={`w-6 h-6 ${colors.textSecondary}`} />
          </button>
        </div>
      </div>
    </BaseOneUIApp>
  );
} 