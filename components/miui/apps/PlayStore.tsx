"use client";

import React, { useState } from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import { Search, Star, Download, Grid, Play, Clock, User, GamepadIcon, Smartphone, Film, Book } from 'lucide-react';
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
  downloads: string;
  featured?: boolean;
}

export default function PlayStore() {
  const [activeTab, setActiveTab] = useState<string>("games");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Sample apps data with MIUI-specific apps
  const apps: App[] = [
    {
      id: 1,
      name: "MIUI Themes",
      developer: "Xiaomi Inc.",
      icon: "https://play-lh.googleusercontent.com/TT36Nsjyt0Yn8eyPAXuNK0bJsXmryP9ovsp7qdognzL6uLLyuKJIqEVf_BnWDkNHzA=w240-h480-rw",
      screenshots: [
        "https://play-lh.googleusercontent.com/TbL8Tq4eLsEA6h8FuLNqpyGGUuuXyWLoTDrlEwY_yCUeEsOz0boZgLBXI9c6-HjH9A=w526-h296-rw",
        "https://play-lh.googleusercontent.com/TbL8Tq4eLsEA6h8FuLNqpyGGUuuXyWLoTDrlEwY_yCUeEsOz0boZgLBXI9c6-HjH9A=w526-h296-rw"
      ],
      category: "Personalization",
      rating: 4.5,
      price: "Free",
      downloads: "100M+",
      description: "Official MIUI Theme store. Customize your device with thousands of themes, wallpapers, and icons.",
      featured: true
    },
    {
      id: 2,
      name: "PUBG MOBILE",
      developer: "Tencent Games",
      icon: "https://play-lh.googleusercontent.com/JRd05pyBH41qjgsJuWduRJpDeZG0Hnr9GICTFuW3nMZMSdRLYU_wqIsS1GA9Po7GwnVW=w240-h480-rw",
      screenshots: [
        "https://play-lh.googleusercontent.com/V3K-qzpxwvMxPqA9dcrvTHdDcGZ3FxXvOEP9P6BrBCR6YqhEaQ4HuHRhHF2fXLp3ooU=w526-h296-rw",
        "https://play-lh.googleusercontent.com/fbZxZjU-dZS4pYGrZqI8VvBJGF4AyOBCGIXvUhxWrIo8uJuYo7UX_ckl8in979MYoX0=w526-h296-rw"
      ],
      category: "Games",
      rating: 4.3,
      price: "Free",
      downloads: "500M+",
      description: "PUBG MOBILE is the original battle royale game on mobile.",
      featured: true
    },
    {
      id: 3,
      name: "Mi Remote",
      developer: "Xiaomi Inc.",
      icon: "https://play-lh.googleusercontent.com/sHcbMrh5EE_RmlIk9D2wY7-KEjB9vqHTYjw9Tp9-ZdIL1_JxsDxc69GHF2wUGSOyP_E=w240-h480-rw",
      screenshots: [
        "https://play-lh.googleusercontent.com/j5ZxAlHeB9K1hkRqWioQxVKtXXTEmX4oZ1hCf1F-4vI_-f9-8nO_R0y0Z8Qx_A9RKAA=w526-h296-rw",
        "https://play-lh.googleusercontent.com/j5ZxAlHeB9K1hkRqWioQxVKtXXTEmX4oZ1hCf1F-4vI_-f9-8nO_R0y0Z8Qx_A9RKAA=w526-h296-rw"
      ],
      category: "Tools",
      rating: 4.4,
      price: "Free",
      downloads: "100M+",
      description: "Control your TV, AC, and other IR devices with your MIUI phone."
    },
    {
      id: 4,
      name: "Mi Security",
      developer: "Xiaomi Inc.",
      icon: "https://play-lh.googleusercontent.com/2Jw_mZ8kUHPWaZvkgO_Q4qzqx0PGBYFGgEVXGid_kEO_OgXqQEvxm_zQGb5jF_xm8w=w240-h480-rw",
      screenshots: [
        "https://play-lh.googleusercontent.com/2Jw_mZ8kUHPWaZvkgO_Q4qzqx0PGBYFGgEVXGid_kEO_OgXqQEvxm_zQGb5jF_xm8w=w240-h480-rw",
        "https://play-lh.googleusercontent.com/2Jw_mZ8kUHPWaZvkgO_Q4qzqx0PGBYFGgEVXGid_kEO_OgXqQEvxm_zQGb5jF_xm8w=w240-h480-rw"
      ],
      category: "Tools",
      rating: 4.6,
      price: "Free",
      downloads: "50M+",
      description: "Protect your device with Mi Security. Features include virus scanning, cleaner, and battery optimization."
    },
    {
      id: 5,
      name: "Genshin Impact",
      developer: "COGNOSPHERE PTE. LTD.",
      icon: "https://play-lh.googleusercontent.com/So91qs_eRRralMxUzt_tkj4aBXvVSYqWxYk1YAqwUZF_xwGaYkDkgClqoLNqOx9xqA=w240-h480-rw",
      screenshots: [
        "https://play-lh.googleusercontent.com/N3Wc6htPGnuXvMn8F5ICEoHN4vQpZ0f6beoJxVYQJQJBJvXB_Vz0x_GRpgbcJrGmNQ=w526-h296-rw",
        "https://play-lh.googleusercontent.com/N3Wc6htPGnuXvMn8F5ICEoHN4vQpZ0f6beoJxVYQJQJBJvXB_Vz0x_GRpgbcJrGmNQ=w526-h296-rw"
      ],
      category: "Games",
      rating: 4.5,
      price: "Free",
      downloads: "50M+",
      description: "Step into Teyvat, a vast world teeming with life and flowing with elemental energy.",
      featured: true
    }
  ];
  
  // Filter featured apps
  const featuredApps = apps.filter(app => app.featured);
  
  // Bottom tabs
  const tabs = [
    { id: "games", label: "Games", icon: GamepadIcon },
    { id: "apps", label: "Apps", icon: Smartphone },
    { id: "movies", label: "Movies", icon: Film },
    { id: "books", label: "Books", icon: Book }
  ];
  
  return (
    <BaseMIUIApp title="Play Store">
      <div className="h-full flex flex-col bg-white dark:bg-gray-900">
        {/* Search bar */}
        <div className="p-4 sticky top-0 bg-white dark:bg-gray-900 z-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 pl-10 pr-4 bg-gray-100 dark:bg-gray-800 rounded-full text-sm border-none focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search for apps & games"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {/* Featured section */}
          <div className="px-4 mb-6">
            <h2 className="text-lg font-medium mb-4 text-black dark:text-white">Recommended for you</h2>
            <div className="space-y-4">
              {featuredApps.map((app) => (
                <div 
                  key={app.id}
                  className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded-xl overflow-hidden">
                        <Image 
                          src={app.icon} 
                          alt={app.name} 
                          width={64} 
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium text-black dark:text-white">{app.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{app.developer}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{app.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400 ml-3">{app.downloads} downloads</span>
                        </div>
                      </div>
                      <button className="bg-green-500 text-white text-sm font-medium px-4 py-1.5 rounded-full">
                        {app.price === "Free" ? "Install" : app.price}
                      </button>
                    </div>
                  </div>
                  
                  {/* App screenshots */}
                  <div className="px-4 pb-4">
                    <div className="flex space-x-3 overflow-x-auto">
                      {app.screenshots.map((screenshot, index) => (
                        <div 
                          key={index}
                          className="w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden"
                        >
                          <Image 
                            src={screenshot} 
                            alt={`${app.name} screenshot ${index + 1}`} 
                            width={160}
                            height={96}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="px-4 mb-6">
            <h2 className="text-lg font-medium mb-4 text-black dark:text-white">Categories</h2>
            <div className="grid grid-cols-2 gap-3">
              {["Action", "Adventure", "Arcade", "Board", "Card", "Casino", "Casual", "Educational"].map((category) => (
                <button
                  key={category}
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-xl"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-3">
                    <GamepadIcon className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="text-sm text-black dark:text-white">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Top apps section */}
          <div className="px-4 mb-6">
            <h2 className="text-lg font-medium mb-4 text-black dark:text-white">Top Charts</h2>
            <div className="space-y-3">
              {apps.slice(0, 3).map((app, index) => (
                <div key={app.id} className="flex items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-xl">
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
                    <h4 className="font-medium text-sm text-black dark:text-white">{app.name}</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{app.category}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">{app.rating}</span>
                    </div>
                  </div>
                  <button className="bg-green-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    {app.price === "Free" ? "Install" : app.price}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-around p-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`flex flex-col items-center py-1 px-3 ${
                activeTab === tab.id 
                  ? 'text-green-500' 
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
    </BaseMIUIApp>
  );
} 