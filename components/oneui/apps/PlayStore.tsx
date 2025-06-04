"use client";

import React, { useState } from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import { Search, Star, Download, Grid, Play, Clock, User, GamepadIcon, Smartphone, Film, Book } from 'lucide-react';
import Image from 'next/image';
import { useOneUITheme } from '../OneUIThemeContext';

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
  const { colors } = useOneUITheme();
  
  // Sample apps data with OneUI-specific apps
  const apps: App[] = [
    {
      id: 1,
      name: "OneUI Themes",
      developer: "Samsung Inc.",
      icon: "https://play-lh.googleusercontent.com/TT36Nsjyt0Yn8eyPAXuNK0bJsXmryP9ovsp7qdognzL6uLLyuKJIqEVf_BnWDkNHzA=w240-h480-rw",
      screenshots: [
        "https://play-lh.googleusercontent.com/TbL8Tq4eLsEA6h8FuLNqpyGGUuuXyWLoTDrlEwY_yCUeEsOz0boZgLBXI9c6-HjH9A=w526-h296-rw",
        "https://play-lh.googleusercontent.com/TbL8Tq4eLsEA6h8FuLNqpyGGUuuXyWLoTDrlEwY_yCUeEsOz0boZgLBXI9c6-HjH9A=w526-h296-rw"
      ],
      category: "Personalization",
      rating: 4.5,
      price: "Free",
      downloads: "100M+",
      description: "Official OneUI Theme store. Customize your device with thousands of themes, wallpapers, and icons.",
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
      name: "SmartThings",
      developer: "Samsung Inc.",
      icon: "https://play-lh.googleusercontent.com/sHcbMrh5EE_RmlIk9D2wY7-KEjB9vqHTYjw9Tp9-ZdIL1_JxsDxc69GHF2wUGSOyP_E=w240-h480-rw",
      screenshots: [
        "https://play-lh.googleusercontent.com/j5ZxAlHeB9K1hkRqWioQxVKtXXTEmX4oZ1hCf1F-4vI_-f9-8nO_R0y0Z8Qx_A9RKAA=w526-h296-rw",
        "https://play-lh.googleusercontent.com/j5ZxAlHeB9K1hkRqWioQxVKtXXTEmX4oZ1hCf1F-4vI_-f9-8nO_R0y0Z8Qx_A9RKAA=w526-h296-rw"
      ],
      category: "Tools",
      rating: 4.4,
      price: "Free",
      downloads: "100M+",
      description: "Control your TV, AC, and other smart devices with your OneUI phone using SmartThings."
    },
    {
      id: 4,
      name: "Device Care",
      developer: "Samsung Inc.",
      icon: "https://play-lh.googleusercontent.com/2Jw_mZ8kUHPWaZvkgO_Q4qzqx0PGBYFGgEVXGid_kEO_OgXqQEvxm_zQGb5jF_xm8w=w240-h480-rw",
      screenshots: [
        "https://play-lh.googleusercontent.com/2Jw_mZ8kUHPWaZvkgO_Q4qzqx0PGBYFGgEVXGid_kEO_OgXqQEvxm_zQGb5jF_xm8w=w240-h480-rw",
        "https://play-lh.googleusercontent.com/2Jw_mZ8kUHPWaZvkgO_Q4qzqx0PGBYFGgEVXGid_kEO_OgXqQEvxm_zQGb5jF_xm8w=w240-h480-rw"
      ],
      category: "Tools",
      rating: 4.6,
      price: "Free",
      downloads: "50M+",
      description: "Protect your device with Device Care. Features include virus scanning, cleaner, and battery optimization."
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
    <BaseOneUIApp title="Play Store">
      <div className={`h-full flex flex-col ${colors.primary}`}>
        {/* Search bar */}
        <div className={`p-4 sticky top-0 ${colors.cardBg} z-10`}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className={`w-4 h-4 ${colors.textSecondary}`} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-2 pl-10 pr-4 ${colors.tertiary} rounded-md text-sm border-none focus:outline-none focus:ring-1 focus:ring-blue-500 ${colors.textPrimary}`}
              placeholder="Search for apps & games"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          {/* Featured section */}
          <div className="px-4 mb-6">
            <h2 className={`text-lg font-medium mb-4 ${colors.textPrimary}`}>Recommended for you</h2>
            <div className="space-y-4">
              {featuredApps.map((app) => (
                <div 
                  key={app.id}
                  className={`${colors.cardBg} border ${colors.divider} overflow-hidden`}
                >
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="w-16 h-16 rounded-md overflow-hidden">
                        <Image 
                          src={app.icon} 
                          alt={app.name} 
                          width={64} 
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className={`font-medium ${colors.textPrimary}`}>{app.name}</h3>
                        <p className={`text-xs ${colors.textSecondary}`}>{app.developer}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            <span className={`text-xs ${colors.textSecondary} ml-1`}>{app.rating}</span>
                          </div>
                          <span className={`text-xs ${colors.textSecondary} ml-3`}>{app.downloads} downloads</span>
                        </div>
                      </div>
                      <button className={`${colors.accent} text-white text-sm font-medium px-4 py-1.5 rounded-md`}>
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
                          className="w-40 h-24 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 dark:border-gray-700"
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
            <h2 className={`text-lg font-medium mb-4 ${colors.textPrimary}`}>Categories</h2>
            <div className="grid grid-cols-2 gap-3">
              {["Action", "Adventure", "Arcade", "Board", "Card", "Casino", "Casual", "Educational"].map((category) => (
                <button
                  key={category}
                  className={`flex items-center p-3 ${colors.cardBg} border ${colors.divider} rounded-md`}
                >
                  <div className={`w-8 h-8 rounded-full ${colors.tertiary} flex items-center justify-center mr-3`}>
                    <GamepadIcon className={`w-4 h-4 ${colors.accent}`} />
                  </div>
                  <span className={`text-sm ${colors.textPrimary}`}>{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Top apps section */}
          <div className="px-4 mb-6">
            <h2 className={`text-lg font-medium mb-4 ${colors.textPrimary}`}>Top Charts</h2>
            <div className="space-y-px">
              {apps.slice(0, 3).map((app, index) => (
                <div key={app.id} className={`flex items-center ${colors.cardBg} p-4 border-b ${colors.divider}`}>
                  <span className={`w-5 text-center ${colors.textSecondary} font-medium`}>{index + 1}</span>
                  <div className="w-12 h-12 rounded-md overflow-hidden mx-3">
                    <Image 
                      src={app.icon} 
                      alt={app.name} 
                      width={48} 
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-medium text-sm ${colors.textPrimary}`}>{app.name}</h4>
                    <p className={`text-xs ${colors.textSecondary}`}>{app.category}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className={`text-xs ${colors.textSecondary} ml-1`}>{app.rating}</span>
                    </div>
                  </div>
                  <button className={`${colors.accent} text-white text-xs font-medium px-3 py-1.5 rounded-md`}>
                    {app.price === "Free" ? "Install" : app.price}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Tabs */}
        <div className={`border-t ${colors.divider} ${colors.cardBg} flex justify-around`}>
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`flex flex-col items-center py-2 px-4 ${
                activeTab === tab.id 
                  ? colors.accent
                  : colors.textSecondary
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </BaseOneUIApp>
  );
} 