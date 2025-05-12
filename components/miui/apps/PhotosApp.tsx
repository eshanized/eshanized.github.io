"use client";

import React, { useState } from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import { Grid, Image as ImageIcon, Search, Share, Heart, User, BookOpen } from 'lucide-react';
import Image from 'next/image';
import { useMIUITheme } from '../MIUIThemeContext';

export default function PhotosApp() {
  const [activeTab, setActiveTab] = useState<string>("library");
  const { colors } = useMIUITheme();
  
  // Sample photos for the gallery
  const photos = [
    {
      id: 1,
      src: "https://images.pexels.com/photos/1056251/pexels-photo-1056251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Today"
    },
    {
      id: 2,
      src: "https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Today"
    },
    {
      id: 3,
      src: "https://images.pexels.com/photos/2440061/pexels-photo-2440061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Yesterday"
    },
    {
      id: 4,
      src: "https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Yesterday"
    },
    {
      id: 5,
      src: "https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Last Week"
    },
    {
      id: 6,
      src: "https://images.pexels.com/photos/815880/pexels-photo-815880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Last Week"
    },
    {
      id: 7,
      src: "https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Last Week"
    },
    {
      id: 8,
      src: "https://images.pexels.com/photos/1170572/pexels-photo-1170572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Last Week"
    },
    {
      id: 9,
      src: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Last Month"
    },
    {
      id: 10,
      src: "https://images.pexels.com/photos/1212693/pexels-photo-1212693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Last Month"
    },
    {
      id: 11,
      src: "https://images.pexels.com/photos/4215113/pexels-photo-4215113.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Last Month"
    },
    {
      id: 12,
      src: "https://images.pexels.com/photos/4126724/pexels-photo-4126724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      date: "Last Month"
    }
  ];
  
  // Group photos by date
  const groupedPhotos = photos.reduce((groups, photo) => {
    const date = photo.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(photo);
    return groups;
  }, {} as Record<string, typeof photos>);
  
  // Albums data
  const albums = [
    { name: "Recents", count: 243, cover: photos[0].src },
    { name: "Favorites", count: 24, cover: photos[1].src },
    { name: "Travel", count: 86, cover: photos[4].src },
    { name: "Nature", count: 53, cover: photos[6].src },
    { name: "Portrait", count: 19, cover: photos[10].src },
    { name: "Food", count: 37, cover: photos[8].src }
  ];
  
  // Bottom tabs
  const tabs = [
    { id: "library", label: "Library", icon: ImageIcon },
    { id: "for-you", label: "For You", icon: Heart },
    { id: "albums", label: "Albums", icon: BookOpen },
    { id: "search", label: "Search", icon: Search }
  ];
  
  return (
    <BaseMIUIApp title="Gallery" rightAction="more">
      <div className={`h-full flex flex-col ${colors.primary}`}>
        {/* Photos view (Library tab) */}
        {activeTab === "library" && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-lg font-medium ${colors.textPrimary}`}>Library</h2>
                <button className={`${colors.accent} text-sm`}>Select</button>
              </div>
              
              {/* Photos by date */}
              {Object.entries(groupedPhotos).map(([date, datePhotos]) => (
                <div key={date} className="mb-6">
                  <h3 className={`text-base font-medium mb-2 ${colors.textPrimary}`}>{date}</h3>
                  <div className="grid grid-cols-3 gap-1">
                    {datePhotos.map(photo => (
                      <div key={photo.id} className="aspect-square relative">
                        <Image
                          src={photo.src}
                          alt={`Photo ${photo.id}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-sm"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Albums tab */}
        {activeTab === "albums" && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className={`text-lg font-medium ${colors.textPrimary}`}>Albums</h2>
                <button className={`${colors.accent} text-sm p-1 rounded-md`}>+</button>
              </div>
              
              <h3 className={`text-base font-medium mb-2 ${colors.textPrimary}`}>My Albums</h3>
              <div className="grid grid-cols-2 gap-3">
                {albums.map((album, index) => (
                  <div key={index} className="mb-4">
                    <div className="aspect-square relative rounded-md overflow-hidden mb-1 border border-gray-200 dark:border-gray-700">
                      <Image
                        src={album.cover}
                        alt={album.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <h4 className={`font-medium text-sm ${colors.textPrimary}`}>{album.name}</h4>
                    <p className={`text-xs ${colors.textSecondary}`}>{album.count}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Placeholder for For You and Search tabs */}
        {(activeTab === "for-you" || activeTab === "search") && (
          <div className={`flex-1 flex items-center justify-center p-4 ${colors.textSecondary}`}>
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full ${colors.tertiary} flex items-center justify-center mx-auto mb-4`}>
                {activeTab === "for-you" ? (
                  <Heart className={`w-8 h-8 ${colors.textSecondary}`} />
                ) : (
                  <Search className={`w-8 h-8 ${colors.textSecondary}`} />
                )}
              </div>
              <h3 className={`text-lg font-medium ${colors.textPrimary}`}>
                {activeTab === "for-you" ? "For You" : "Search"}
              </h3>
              <p className={`text-sm mt-1 ${colors.textSecondary}`}>
                {activeTab === "for-you" 
                  ? "Personalized photos and memories will appear here" 
                  : "Search through your photos by people, places, or keywords"}
              </p>
            </div>
          </div>
        )}
        
        {/* Bottom tabs */}
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
    </BaseMIUIApp>
  );
}