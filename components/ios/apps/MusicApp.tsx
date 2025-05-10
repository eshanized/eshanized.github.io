"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  Library,
  Youtube,
  Plus,
  X
} from 'lucide-react';
import Image from 'next/image';

// Extend Window interface to include YouTube API
declare global {
  interface Window {
    YT: {
      Player: any;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  youtubeId?: string;
  youtubeUrl?: string;
}

interface CustomYouTubeSong {
  id: string;
  url: string;
  title?: string;
  artist?: string;
  coverArt?: string;
  addedAt?: Date;
}

export default function MusicApp() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("listen-now");
  const [liked, setLiked] = useState<boolean>(false);
  const [showYoutubePlayer, setShowYoutubePlayer] = useState(false);
  const [youtubeApiReady, setYoutubeApiReady] = useState(false);
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [newSongUrl, setNewSongUrl] = useState('');
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const playerRef = useRef<any>(null);
  
  // Sample music library with YouTube songs
  const songs: Song[] = [
    {
      id: "yt-1",
      title: "Sooraj Dooba Hain",
      artist: "Arijit Singh",
      album: "Roy",
      cover: "https://img.youtube.com/vi/nJZcbidTutE/hqdefault.jpg",
      duration: "3:20",
      youtubeId: "nJZcbidTutE",
      youtubeUrl: "https://music.youtube.com/watch?v=nJZcbidTutE"
    },
    {
      id: "yt-2",
      title: "Subha Hone Na De",
      artist: "Mika Singh, Kumaar",
      album: "Desi Boyz",
      cover: "https://img.youtube.com/vi/Y7G-tYRzwYY/hqdefault.jpg",
      duration: "3:14",
      youtubeId: "Y7G-tYRzwYY",
      youtubeUrl: "https://music.youtube.com/watch?v=Y7G-tYRzwYY"
    },
    {
      id: "yt-3",
      title: "Don't Start Now",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      cover: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "3:03"
    },
    {
      id: "yt-4",
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      cover: "https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "2:54"
    },
    {
      id: "yt-5",
      title: "Circles",
      artist: "Post Malone",
      album: "Hollywood's Bleeding",
      cover: "https://images.pexels.com/photos/2479312/pexels-photo-2479312.jpeg?auto=compress&cs=tinysrgb&w=600",
      duration: "3:35"
    }
  ];
  
  const currentSong = songs[currentSongIndex];
  
  // Utility function to extract YouTube ID from URL
  const extractYouTubeId = useCallback((url: string): string => {
    let videoId = '';
    
    const regExps = [
      /^.*music\.youtube\.com\/watch\?v=([^#\&\?]*).*/,
      /^.*youtube\.com\/watch\?v=([^#\&\?]*).*/
    ];
    
    for (const regExp of regExps) {
      const match = url.match(regExp);
      if (match && match[1] && match[1].length === 11) {
        videoId = match[1];
        break;
      }
    }
    
    if (!videoId) {
      try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'music.youtube.com' || urlObj.hostname === 'youtube.com') {
          videoId = urlObj.searchParams.get('v') || '';
        }
      } catch (e) {
        console.error("Invalid URL:", e);
      }
    }
    
    return videoId;
  }, []);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        setYoutubeApiReady(true);
      };
    } else if (window.YT && window.YT.Player) {
      setYoutubeApiReady(true);
    }
  }, []);

  // Create YouTube player when API is ready
  useEffect(() => {
    if (youtubeApiReady && currentSong?.youtubeId && showYoutubePlayer) {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error("Error destroying player:", e);
        }
      }

      playerRef.current = new window.YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: currentSong.youtubeId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          playsinline: 1,
          origin: window.location.origin,
          enablejsapi: 1,
          disablekb: 0,
        },
        events: {
          onReady: (event: any) => {
            try {
              if (typeof event.target.setVolume === 'function') {
                event.target.setVolume(100);
              }
              if (typeof event.target.unMute === 'function') {
                event.target.unMute();
              }
              if (isPlaying && typeof event.target.playVideo === 'function') {
                event.target.playVideo();
              }
            } catch (e) {
              console.error("Error in onReady handler:", e);
            }
          },
          onStateChange: (event: any) => {
            try {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                handleNextSong();
              }
            } catch (e) {
              console.error("Error in onStateChange handler:", e);
            }
          },
          onError: (event: any) => {
            console.error("YouTube player error:", event.data);
            handleNextSong();
          }
        }
      });
    }
  }, [currentSong, youtubeApiReady, showYoutubePlayer, isPlaying]);

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
    if (currentSong?.youtubeId) {
      if (playerRef.current) {
        try {
          if (isPlaying) {
            playerRef.current.pauseVideo();
          } else {
            playerRef.current.playVideo();
          }
        } catch (error) {
          console.error("Error controlling playback:", error);
        }
      }
    }
    setIsPlaying(!isPlaying);
  };
  
  const handlePrevSong = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
    
    // If it's a YouTube song, load it
    const prevSong = songs[currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1];
    if (prevSong.youtubeId) {
      setShowYoutubePlayer(true);
    }
  };
  
  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    setCurrentTime(0);
    if (!isPlaying) setIsPlaying(true);
    
    // If it's a YouTube song, load it
    const nextSong = songs[currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1];
    if (nextSong.youtubeId) {
      setShowYoutubePlayer(true);
    }
  };

  // Handle user interaction to unlock audio
  const handleUserInteraction = () => {
    if (playerRef.current && currentSong?.youtubeId) {
      try {
        console.log("User interaction - attempting to unlock audio");
        if (typeof playerRef.current.unMute === 'function') {
          playerRef.current.unMute();
        }
        if (typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(100);
        }
        if (isPlaying && typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
      } catch (error) {
        console.error("Error handling user interaction:", error);
      }
    }
  };

  // Update playback progress for YouTube songs
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        if (currentSong?.youtubeId && playerRef.current) {
          try {
            const currentTime = playerRef.current.getCurrentTime();
            const duration = playerRef.current.getDuration();
            if (currentTime && duration) {
              setCurrentTime((currentTime / duration) * 100);
            }
          } catch (error) {
            console.error("Error getting YouTube playback time:", error);
          }
        } else {
          setCurrentTime((prev) => {
            if (prev >= 100) {
              handleNextSong();
              return 0;
            }
            return prev + 0.5;
          });
        }
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSong]);
  
  // Tabs for the bottom navigation
  const tabs = [
    { id: "listen-now", label: "Listen Now", icon: Home },
    { id: "browse", label: "Browse", icon: Search },
    { id: "library", label: "Library", icon: Library },
  ];
  
  // Add song function
  const addYouTubeSong = () => {
    if (!newSongUrl) return;
    
    const youtubeId = extractYouTubeId(newSongUrl);
    if (!youtubeId) {
      alert("Invalid YouTube URL. Please enter a valid YouTube or YouTube Music URL.");
      return;
    }
    
    const newSong: Song = {
      id: `yt-${Date.now()}`,
      title: newSongTitle || 'Unknown Title',
      artist: newSongArtist || 'Unknown Artist',
      album: 'YouTube Music',
      cover: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      duration: "0:00", // Duration will be updated when played
      youtubeId,
      youtubeUrl: newSongUrl
    };
    
    songs.push(newSong);
    setNewSongUrl('');
    setNewSongTitle('');
    setNewSongArtist('');
    setShowAddSongModal(false);
  };

  return (
    <BaseIOSApp title="Music" headerColor="bg-white dark:bg-black">
      <div className="h-full flex flex-col bg-white dark:bg-black text-black dark:text-white">
        {/* Hidden YouTube Player */}
        <div id="youtube-player" className="hidden"></div>

        {/* Top Bar */}
        <div className="px-4 py-2 flex justify-between items-center">
          <button
            className={`p-2 rounded-full transition-colors ${
              showYoutubePlayer ? 'text-red-500 bg-red-500/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            onClick={() => setShowYoutubePlayer(!showYoutubePlayer)}
          >
            <Youtube className="w-5 h-5" />
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setShowAddSongModal(true)}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Now Playing */}
        <div className="p-6 flex flex-col items-center">
          {/* Album artwork */}
          <div className="w-56 h-56 rounded-xl overflow-hidden shadow-lg mb-6 relative group">
            {currentSong.youtubeId ? (
              <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1.5">
                <Youtube className="w-4 h-4 text-white" />
              </div>
            ) : null}
            <Image
              src={currentSong.cover}
              alt={`${currentSong.album} cover`}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-105 transition-transform duration-300"
            />
            {currentSong.youtubeId && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  className="p-3 rounded-full bg-red-500 text-white"
                  onClick={() => setShowYoutubePlayer(!showYoutubePlayer)}
                >
                  <Youtube className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
          
          {/* Song info */}
          <div className="w-full text-center mb-6">
            <h2 className="text-xl font-bold flex items-center justify-center gap-2">
              {currentSong.title}
              {currentSong.youtubeId && (
                <Youtube className="w-4 h-4 text-red-500" />
              )}
            </h2>
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
                  if (song.youtubeId) {
                    setShowYoutubePlayer(true);
                  }
                }}
              >
                <div className="w-10 h-10 rounded-md overflow-hidden mr-3 relative">
                  {song.youtubeId && (
                    <div className="absolute top-0.5 right-0.5 bg-red-500 rounded-full p-0.5">
                      <Youtube className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                  <Image
                    src={song.cover}
                    alt={`${song.album} cover`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-sm flex items-center gap-1">
                    {song.title}
                    {song.youtubeId && (
                      <Youtube className="w-3 h-3 text-red-500" />
                    )}
                  </h4>
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

        {/* Add Song Modal */}
        {showAddSongModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold flex items-center">
                  <Youtube className="w-5 h-5 text-red-500 mr-2" />
                  Add YouTube Song
                </h2>
                <button
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setShowAddSongModal(false)}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">YouTube URL</label>
                  <input
                    type="text"
                    value={newSongUrl}
                    onChange={(e) => setNewSongUrl(e.target.value)}
                    placeholder="https://music.youtube.com/watch?v=..."
                    className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Song Title (optional)</label>
                  <input
                    type="text"
                    value={newSongTitle}
                    onChange={(e) => setNewSongTitle(e.target.value)}
                    placeholder="Enter song title"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Artist (optional)</label>
                  <input
                    type="text"
                    value={newSongArtist}
                    onChange={(e) => setNewSongArtist(e.target.value)}
                    placeholder="Enter artist name"
                    className="w-full px-4 py-3 rounded-xl border bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Preview if URL is entered */}
                {newSongUrl && extractYouTubeId(newSongUrl) && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <Image
                        src={`https://img.youtube.com/vi/${extractYouTubeId(newSongUrl)}/hqdefault.jpg`}
                        alt="Song preview"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{newSongTitle || 'Title will be extracted'}</p>
                      <p className="text-xs text-gray-500">{newSongArtist || 'Artist will be extracted'}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Youtube className="w-3 h-3 text-red-500" />
                        <span className="text-xs text-gray-500">YouTube Music</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 font-medium"
                    onClick={() => setShowAddSongModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`px-4 py-2 rounded-xl bg-red-500 text-white font-medium flex items-center gap-2 ${
                      !newSongUrl ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={addYouTubeSong}
                    disabled={!newSongUrl}
                  >
                    <Plus className="w-4 h-4" />
                    Add Song
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseIOSApp>
  );
} 