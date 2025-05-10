"use client";

import React, { useState, useEffect } from 'react';
import BaseIOSApp from './BaseIOSApp';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  ListMusic, 
  Heart,
  Repeat,
  Shuffle,
  Home,
  Search,
  Library
} from 'lucide-react';
import Image from 'next/image';

interface Song {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
}

export default function MusicApp() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("listen-now");
  const [liked, setLiked] = useState<boolean>(false);
  
  // Sample music library
  const songs: Song[] = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      cover: "https://images.pexels.com/photos/1656381/pexels-photo-1656381.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "3:20"
    },
    {
      id: 2,
      title: "Bad Guy",
      artist: "Billie Eilish",
      album: "When We All Fall Asleep, Where Do We Go?",
      cover: "https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "3:14"
    },
    {
      id: 3,
      title: "Don't Start Now",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      cover: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "3:03"
    },
    {
      id: 4,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      cover: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "2:54"
    },
    {
      id: 5,
      title: "Circles",
      artist: "Post Malone",
      album: "Hollywood's Bleeding",
      cover: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "3:35"
    }
  ];
  
  const currentSong = songs[currentSongIndex];
  
  // Simulate music playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          // Reset at 100%
          if (prev >= 100) {
            handleNextSong();
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handlePrevSong = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
  };
  
  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
  };
  
  // Tabs for the bottom navigation
  const tabs = [
    { id: "listen-now", label: "Listen Now", icon: Home },
    { id: "browse", label: "Browse", icon: Search },
    { id: "library", label: "Library", icon: Library },
  ];
  
  return (
    <BaseIOSApp title="Music" headerColor="bg-white dark:bg-black">
      <div className="h-full flex flex-col bg-white dark:bg-black text-black dark:text-white">
        {/* Now Playing */}
        <div className="p-6 flex flex-col items-center">
          {/* Album artwork */}
          <div className="w-56 h-56 rounded-xl overflow-hidden shadow-lg mb-6 relative">
            <Image
              src={currentSong.cover}
              alt={`${currentSong.album} cover`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          
          {/* Song info */}
          <div className="w-full text-center mb-6">
            <h2 className="text-xl font-bold">{currentSong.title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{currentSong.artist}</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">{currentSong.album}</p>
          </div>
          
          {/* Progress bar */}
          <div className="w-full mb-4">
            <div className="w-full h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500" 
                style={{ width: `${currentTime}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>{Math.floor(currentTime / 100 * parseInt(currentSong.duration.split(':')[0]) * 60 + parseInt(currentSong.duration.split(':')[1])) / 60 < 10 ? '0' : ''}{Math.floor(currentTime / 100 * parseInt(currentSong.duration.split(':')[0]) * 60 + parseInt(currentSong.duration.split(':')[1]) / 60)}:{Math.floor(currentTime / 100 * parseInt(currentSong.duration.split(':')[0]) * 60 + parseInt(currentSong.duration.split(':')[1]) % 60) < 10 ? '0' : ''}{Math.floor(currentTime / 100 * parseInt(currentSong.duration.split(':')[0]) * 60 + parseInt(currentSong.duration.split(':')[1]) % 60)}</span>
              <span>{currentSong.duration}</span>
            </div>
          </div>
          
          {/* Player controls */}
          <div className="flex items-center justify-between w-full mb-6">
            <button 
              className="p-2 text-gray-600 dark:text-gray-400"
              onClick={() => setLiked(!liked)}
            >
              <Heart className={`w-6 h-6 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
            </button>
            
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 text-black dark:text-white"
                onClick={handlePrevSong}
              >
                <SkipBack className="w-8 h-8" />
              </button>
              
              <button 
                className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <Play className="w-8 h-8 text-white" />
                )}
              </button>
              
              <button 
                className="p-2 text-black dark:text-white"
                onClick={handleNextSong}
              >
                <SkipForward className="w-8 h-8" />
              </button>
            </div>
            
            <button className="p-2 text-gray-600 dark:text-gray-400">
              <ListMusic className="w-6 h-6" />
            </button>
          </div>
          
          {/* Shuffle and repeat */}
          <div className="flex w-full justify-between px-4">
            <button className="p-2 text-gray-500 dark:text-gray-400">
              <Shuffle className="w-5 h-5" />
            </button>
            
            <div className="flex items-center">
              <Volume2 className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <div className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gray-600 dark:bg-gray-400 w-3/4"></div>
              </div>
            </div>
            
            <button className="p-2 text-gray-500 dark:text-gray-400">
              <Repeat className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Up Next section */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-800">
          <div className="px-6 py-3 flex justify-between items-center">
            <h3 className="font-semibold">Up Next</h3>
            <button className="text-sm text-red-500">See All</button>
          </div>
          
          <div className="px-4">
            {songs.filter((_, i) => i !== currentSongIndex).slice(0, 2).map((song) => (
              <div 
                key={song.id}
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
                onClick={() => {
                  setCurrentSongIndex(songs.findIndex(s => s.id === song.id));
                  setCurrentTime(0);
                  setIsPlaying(true);
                }}
              >
                <div className="w-10 h-10 rounded-md overflow-hidden mr-3 relative">
                  <Image
                    src={song.cover}
                    alt={`${song.album} cover`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm">{song.title}</h4>
                  <p className="text-xs text-gray-500">{song.artist}</p>
                </div>
                <span className="text-xs text-gray-500">{song.duration}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom tabs */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-800 flex justify-around p-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`flex flex-col items-center py-1 px-3 ${
                activeTab === tab.id 
                  ? 'text-red-500' 
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