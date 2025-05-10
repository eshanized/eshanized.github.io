"use client";

import React, { useState } from 'react';
import BaseIOSApp from './BaseIOSApp';
import { Search, Star, Download, Grid, Play, Clock, User } from 'lucide-react';
import Image from 'next/image';

interface App {
  id: number;
  name: string;
  developer: string;
  icon: string;
  screenshots: string[];
  category: string;
  rating: number;
  price: string;
  description: string;
  featured?: boolean;
}

export default function AppStoreApp() {
  const [activeTab, setActiveTab] = useState<string>("today");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Sample apps data
  const apps: App[] = [
    {
      id: 1,
      name: "Instagram",
      developer: "Meta Platforms, Inc.",
      icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/9e/4f/ea/9e4fea0d-0922-2e2e-059a-5e75d53b147b/Prod-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.webp",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/4d/90/bd/4d90bd7a-bbf3-7c8d-5b21-eb4fbf856904/7c904328-b48c-4192-af32-52c7c278cea5_2023_Instagram_Screenshots_iPhone_6.5_01.png/392x696bb.webp",
        "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/ca/4e/1a/ca4e1a53-bd2e-25b6-f626-ce3cb76cf539/df6f42c3-7043-4393-b26b-5be54298d582_2023_Instagram_Screenshots_iPhone_6.5_02.png/392x696bb.webp"
      ],
      category: "Social Networking",
      rating: 4.7,
      price: "Free",
      description: "Connect with friends, share what you're up to, or see what's new from others all over the world.",
      featured: true
    },
    {
      id: 2,
      name: "Spotify: Music & Podcasts",
      developer: "Spotify AB",
      icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/09/13/d4/0913d442-dbd4-7a05-3682-67c797cb8398/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.webp",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/3d/38/85/3d388566-3397-5c24-3311-f5a02723ee0e/16b9a6b8-9ba6-4bbf-a7f2-f104e85f68be_01.png/392x696bb.webp",
        "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/fd/e4/38/fde438a0-8dbf-34d4-1187-c07026fe0218/6870f02c-ad4a-4333-b8a5-bf7b52bd8796_02.png/392x696bb.webp"
      ],
      category: "Music",
      rating: 4.8,
      price: "Free",
      description: "Stream the songs, albums and podcasts you love – and discover new music you'll want to replay forever."
    },
    {
      id: 3,
      name: "YouTube: Watch, Listen, Stream",
      developer: "Google LLC",
      icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/37/db/ef/37dbef18-80c6-886d-eb0c-364deacce4a1/logo_youtube_color-0-0-1x_U007emarketing-0-0-0-6-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.webp",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/f1/65/bb/f165bb8e-40bd-4809-2dce-87cbd8a32bbe/5e681f65-09a2-40d4-b3bd-42eda1c0afe9_iOS-6.5-inch__U2013_01.png/392x696bb.webp",
        "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/be/48/a6/be48a6c0-70dc-8c4b-c6d3-c9c45ec9719f/4d1f5c04-9c77-434f-8d0c-7c3c8ca04e5c_iOS-6.5-inch__U2013_02.png/392x696bb.webp"
      ],
      category: "Entertainment",
      rating: 4.6,
      price: "Free",
      description: "Make YouTube yours with the latest music videos, gaming, shows, news, and more."
    },
    {
      id: 4,
      name: "Netflix",
      developer: "Netflix, Inc.",
      icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/a2/a1/f9/a2a1f9ca-fb8e-dcba-ee3f-32df9dae3dae/1be13bbe-ead7-4d5c-8e52-11470f7dab27_NETFLIX_iOS_ICONIPHONE_60PT_2X_FOLLOWUP_no_rounded.png/230x0w.webp",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/77/6c/f7/776cf7a8-de5a-8d4f-f396-d6b7a56f5f67/33a890be-ffcf-4b45-b00f-83e0f1e8dade_EN_NFlx_AppleApp_Store_PreviewScreenshots_v50_1290x2796_Squidgame2_1290x2796_Squidgame2.png/392x696bb.webp",
        "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/96/ca/b6/96cab6af-3eaf-a05c-f05a-2de5c87e9ed1/b842de24-c3fa-4a5d-9635-08e07e9963e1_EN_NFlx_AppleApp_Store_PreviewScreenshots_v50_1290x2796_BeverlyHillsCops_1290x2796_AO.png/392x696bb.webp"
      ],
      category: "Entertainment",
      rating: 4.5,
      price: "Free",
      description: "Looking for the most talked about TV shows and movies? They're all on Netflix."
    },
    {
      id: 5,
      name: "TikTok",
      developer: "TikTok Ltd.",
      icon: "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/20/5b/2f/205b2f9c-f06e-d05b-3481-9c2158c2a40c/AppIcon_TikTok-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/230x0w.webp",
      screenshots: [
        "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/cc/15/05/cc15051c-25e0-aa74-c9d6-f7cf7ed37e08/ce34c3af-cd05-4b7a-b6d3-dc002fb6a706_01.jpg/392x696bb.webp",
        "https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/af/7b/f4/af7bf4eb-3acf-cb78-11e6-c5a855ee5265/87de0232-f563-4d70-a69c-0e4d9156ed55_02.jpg/392x696bb.webp"
      ],
      category: "Entertainment",
      rating: 4.7,
      price: "Free",
      description: "TikTok is THE destination for mobile videos. On TikTok, short-form videos are exciting, spontaneous, and genuine.",
      featured: true
    }
  ];
  
  // Filter featured apps
  const featuredApps = apps.filter(app => app.featured);
  
  // Bottom tabs
  const tabs = [
    { id: "today", label: "Today", icon: Star },
    { id: "games", label: "Games", icon: Play },
    { id: "apps", label: "Apps", icon: Grid },
    { id: "arcade", label: "Arcade", icon: Play },
    { id: "search", label: "Search", icon: Search }
  ];
  
  return (
    <BaseIOSApp title="App Store">
      <div className="h-full flex flex-col">
        {/* Today tab */}
        {activeTab === "today" && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-5">
              <div>
                <p className="text-sm text-blue-500 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()}</p>
                <h1 className="text-2xl font-bold">Today</h1>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
            
            {/* Featured cards */}
            <div className="space-y-6">
              {featuredApps.map((app) => (
                <div 
                  key={app.id}
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
                >
                  <div className="p-4 bg-gray-100 dark:bg-gray-700">
                    <div className="flex justify-between items-start">
                      <div className="flex">
                        <div className="w-16 h-16 rounded-xl overflow-hidden mr-3">
                          <Image 
                            src={app.icon} 
                            alt={app.name} 
                            width={64} 
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h2 className="font-semibold">{app.name}</h2>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{app.developer}</p>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${i < Math.floor(app.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{app.rating}</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-blue-500 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                        {app.price === "Free" ? "GET" : app.price}
                      </button>
                    </div>
                  </div>
                  
                  {/* App screenshots */}
                  <div className="p-4">
                    <h3 className="font-semibold mb-3">APP OF THE DAY</h3>
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                      {app.screenshots.map((screenshot, index) => (
                        <div 
                          key={index}
                          className="w-32 h-64 flex-shrink-0 rounded-xl overflow-hidden"
                        >
                          <Image 
                            src={screenshot} 
                            alt={`${app.name} screenshot ${index + 1}`} 
                            width={128}
                            height={256}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm mt-3">
                      {app.description}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Top apps section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md p-4">
                <h3 className="font-semibold mb-3">TOP FREE APPS</h3>
                <div className="space-y-3">
                  {apps.slice(0, 3).map((app, index) => (
                    <div key={app.id} className="flex items-center">
                      <span className="w-5 text-center text-gray-500 font-medium">{index + 1}</span>
                      <div className="w-12 h-12 rounded-xl overflow-hidden mx-3">
                        <Image 
                          src={app.icon} 
                          alt={app.name} 
                          width={48} 
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{app.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{app.category}</p>
                      </div>
                      <button className="bg-gray-200 dark:bg-gray-700 text-blue-500 text-xs font-medium px-3 py-1 rounded-full">
                        {app.price === "Free" ? "GET" : app.price}
                      </button>
                    </div>
                  ))}
                  <button className="text-blue-500 text-sm font-medium">
                    See All
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Search tab */}
        {activeTab === "search" && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm border border-transparent focus:outline-none"
                  placeholder="Games, Apps, Stories and More"
                />
              </div>
              
              <h2 className="text-xl font-bold mb-4">Discover</h2>
              
              {/* Suggested searches */}
              <div className="mb-6">
                <h3 className="text-base font-semibold mb-2">Suggested</h3>
                <div className="flex flex-wrap gap-2">
                  {["Games", "Photo & Video", "Entertainment", "Social", "Productivity"].map((category) => (
                    <button
                      key={category}
                      className="px-3 py-1.5 bg-gray-200 dark:bg-gray-800 rounded-full text-sm"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Top categories */}
              <div>
                <h3 className="text-base font-semibold mb-2">Top Categories</h3>
                <div className="grid grid-cols-2 gap-3">
                  {["Games", "Entertainment", "Photo & Video", "Social Networking", "Productivity", "Utilities"].map((category) => (
                    <button
                      key={category}
                      className="flex items-center p-3 bg-white dark:bg-gray-800 rounded-xl"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
                        <Grid className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="text-sm">{category}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Placeholder for other tabs */}
        {(activeTab === "games" || activeTab === "apps" || activeTab === "arcade") && (
          <div className="flex-1 flex items-center justify-center p-4 text-gray-500">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                {activeTab === "games" ? 
                  <Play className="w-8 h-8 text-gray-400" /> : 
                  activeTab === "apps" ? 
                    <Grid className="w-8 h-8 text-gray-400" /> : 
                    <Clock className="w-8 h-8 text-gray-400" />
                }
              </div>
              <h3 className="text-lg font-medium">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
              </h3>
              <p className="text-sm mt-1">
                {activeTab === "games" ? 
                  "Discover amazing games" : 
                  activeTab === "apps" ? 
                    "Find apps for everything you love" : 
                    "Play Apple Arcade games"
                }
              </p>
            </div>
          </div>
        )}
        
        {/* Bottom tabs */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-around p-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`flex flex-col items-center py-1 px-3 ${
                activeTab === tab.id 
                  ? 'text-blue-500' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </BaseIOSApp>
  );
} 