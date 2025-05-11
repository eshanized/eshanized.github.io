"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import BaseMIUIApp from './BaseMIUIApp';
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
  X,
  VolumeX,
  Volume1,
  Loader2
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
  duration: string;
  coverArt: string;
  youtubeId: string;
  youtubeUrl: string;
  liked?: boolean;
}

interface CustomYouTubeSong {
  id: string;
  url: string;
  youtubeId: string;
  title: string;
  artist: string;
  coverArt: string;
  addedAt: Date;
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
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  
  const playerRef = useRef<any>(null);
  const handleNextSongRef = useRef(() => {});
  const handleUserInteractionRef = useRef(() => {});
  
  // Used for YouTube custom songs
  const [customSongs, setCustomSongs] = useState<CustomYouTubeSong[]>([
    { 
      id: 'song-1', 
      url: 'https://music.youtube.com/watch?v=nJZcbidTutE',
      youtubeId: 'nJZcbidTutE',
      title: 'Sooraj Dooba Hain (From "Roy")',
      artist: 'Arijit Singh',
      coverArt: 'https://img.youtube.com/vi/nJZcbidTutE/hqdefault.jpg',
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
    },
    { 
      id: 'song-2', 
      url: 'https://music.youtube.com/watch?v=Y7G-tYRzwYY',
      youtubeId: 'Y7G-tYRzwYY',
      title: 'Subha Hone Na De Full Song | Desi Boyz',
      artist: 'Mika Singh, Kumaar',
      coverArt: 'https://img.youtube.com/vi/Y7G-tYRzwYY/hqdefault.jpg',
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    },
    { 
      id: 'song-3', 
      url: 'https://music.youtube.com/watch?v=Fx6Pk1od_Fo',
      youtubeId: 'Fx6Pk1od_Fo',
      title: 'Old vs New Bangla Mashup',
      artist: 'Hasan S. Iqbal, Dristy Anam',
      coverArt: 'https://img.youtube.com/vi/Fx6Pk1od_Fo/hqdefault.jpg',
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)
    },
    {
      id: 'song-4',
      url: 'https://music.youtube.com/watch?v=hgXKJvxFQA8',
      youtubeId: 'hgXKJvxFQA8',
      title: 'Teri Mitti - Kesari',
      artist: 'B Praak',
      coverArt: 'https://img.youtube.com/vi/hgXKJvxFQA8/hqdefault.jpg',
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 12)
    },
    {
      id: 'song-5',
      url: 'https://music.youtube.com/watch?v=qE3DdFkZ0C8',
      youtubeId: 'qE3DdFkZ0C8',
      title: 'Tu Hai To Mujhe Phir Aur Kya Chahiye',
      artist: 'Arijit Singh',
      coverArt: 'https://img.youtube.com/vi/qE3DdFkZ0C8/hqdefault.jpg',
      addedAt: new Date(Date.now() - 1000 * 60 * 30)
    }
  ]);
  
  // Convert CustomYouTubeSong to Song
  const songs: Song[] = customSongs.map(song => ({
    id: song.id,
    title: song.title,
    artist: song.artist,
    album: 'YouTube Music',
    duration: "3:30", // Default duration, will be updated when played
    coverArt: song.coverArt,
    youtubeId: song.youtubeId,
    youtubeUrl: song.url,
    liked: false
  }));

  // Utility function to extract YouTube ID from URL
  const extractYouTubeId = useCallback((url: string): string => {
    let videoId = '';
    
    const regExps = [
      /^.*music\.youtube\.com\/watch\?v=([^#\&\?]*).*/,
      /^.*youtube\.com\/watch\?v=([^#\&\?]*).*/,
      /^.*youtu\.be\/([^#\&\?]*).*/
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
        if (urlObj.hostname === 'music.youtube.com' || urlObj.hostname === 'youtube.com' || urlObj.hostname === 'youtu.be') {
          videoId = urlObj.searchParams.get('v') || urlObj.pathname.slice(1) || '';
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
        console.log("YouTube API is ready");
        setYoutubeApiReady(true);
      };
    } else if (window.YT && window.YT.Player) {
      console.log("YouTube API already loaded");
      setYoutubeApiReady(true);
    }
  }, []);

  // Handle user interaction to unlock audio
  const handleUserInteraction = useCallback(() => {
    console.log("User interaction - attempting to unlock audio");
    if (!playerRef.current || !songs[currentSongIndex]?.youtubeId) return;
    
    try {
      if (typeof playerRef.current.unMute === 'function') {
        playerRef.current.unMute();
      }
      if (typeof playerRef.current.setVolume === 'function') {
        playerRef.current.setVolume(isMuted ? 0 : volume);
      }
      if (isPlaying && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error("Error handling user interaction:", error);
    }
  }, [currentSongIndex, songs, isPlaying, isMuted, volume]);

  // Update handleUserInteractionRef whenever handleUserInteraction changes
  useEffect(() => {
    handleUserInteractionRef.current = handleUserInteraction;
  }, [handleUserInteraction]);

  const handleNextSong = useCallback(() => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    setCurrentTime(0);
    setIsPlaying(true);
    handleUserInteractionRef.current();
  }, [songs.length]);

  // Update handleNextSongRef whenever handleNextSong changes
  useEffect(() => {
    handleNextSongRef.current = handleNextSong;
  }, [handleNextSong]);

  const handlePlayPause = () => {
    if (!songs.length) return;
    
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
    setIsPlaying(!isPlaying);
    handleUserInteractionRef.current();
  };

  const handlePrevSong = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setCurrentTime(0);
    setIsPlaying(true);
    handleUserInteractionRef.current();
  };

  // Create YouTube player when API is ready
  useEffect(() => {
    if (!youtubeApiReady || !songs[currentSongIndex]?.youtubeId) return;
    
    console.log("Initializing YouTube player with video ID:", songs[currentSongIndex].youtubeId);
    
    // Clean up existing player if any
    if (playerRef.current) {
      try {
        playerRef.current.destroy();
        playerRef.current = null;
      } catch (e) {
        console.error("Error destroying player:", e);
      }
    }

    try {
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: songs[currentSongIndex].youtubeId,
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
            console.log("YouTube player ready");
            try {
              if (typeof event.target.setVolume === 'function') {
                event.target.setVolume(isMuted ? 0 : volume);
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
              console.log("YouTube player state changed:", event.data);
              
              if (event.data === window.YT.PlayerState.PLAYING) {
                console.log("YouTube is now PLAYING with sound");
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                console.log("YouTube is now PAUSED");
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                console.log("YouTube playback ENDED");
                handleNextSongRef.current();
              } else if (event.data === -1) {
                // Unstarted state
                console.log("YouTube player unstarted");
                if (isPlaying) {
                  setTimeout(() => {
                    if (typeof event.target.playVideo === 'function') {
                      event.target.playVideo();
                    }
                  }, 500);
                }
              }
            } catch (e) {
              console.error("Error in onStateChange handler:", e);
            }
          },
          onError: (event: any) => {
            console.error("YouTube player error:", event.data);
            handleNextSongRef.current();
          }
        }
      });
    } catch (error) {
      console.error("Error initializing YouTube player:", error);
    }
  }, [currentSongIndex, youtubeApiReady, isPlaying, isMuted, volume]);

  // Update playback state when isPlaying changes
  useEffect(() => {
    if (!playerRef.current) return;
    
    try {
      if (isPlaying && typeof playerRef.current.playVideo === 'function') {
        playerRef.current.playVideo();
      } else if (!isPlaying && typeof playerRef.current.pauseVideo === 'function') {
        playerRef.current.pauseVideo();
      }
    } catch (error) {
      console.error("Error controlling playback:", error);
    }
  }, [isPlaying]);

  // Update playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && playerRef.current) {
      interval = setInterval(() => {
        try {
          if (typeof playerRef.current.getCurrentTime === 'function' && 
              typeof playerRef.current.getDuration === 'function') {
            const currentTime = playerRef.current.getCurrentTime() || 0;
            const duration = playerRef.current.getDuration() || 1;
            setCurrentTime((currentTime / duration) * 100);
          }
        } catch (error) {
          console.error("Error getting YouTube playback time:", error);
        }
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  // Update volume when changed
  useEffect(() => {
    if (!playerRef.current) return;
    
    try {
      if (typeof playerRef.current.setVolume === 'function') {
        playerRef.current.setVolume(isMuted ? 0 : volume);
      }
      if (isMuted && typeof playerRef.current.mute === 'function') {
        playerRef.current.mute();
      } else if (!isMuted && typeof playerRef.current.unMute === 'function') {
        playerRef.current.unMute();
      }
    } catch (error) {
      console.error("Error setting volume:", error);
    }
  }, [volume, isMuted]);

  // Format time for display
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Add a new YouTube song
  const addYouTubeSong = async () => {
    if (!newSongUrl) return;
    
    setIsLoading(true);
    
    try {
      const youtubeId = extractYouTubeId(newSongUrl);
      if (!youtubeId) {
        alert("Invalid YouTube URL. Please enter a valid YouTube or YouTube Music URL.");
        setIsLoading(false);
        return;
      }
      
      // Add the new song
      const newSong: CustomYouTubeSong = {
        id: `song-${Date.now()}`,
        url: newSongUrl,
        youtubeId: youtubeId,
        title: `YouTube Song - ${youtubeId}`,  // Will show while loading
        artist: 'Loading...',
        coverArt: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        addedAt: new Date()
      };
      
      setCustomSongs(prev => [...prev, newSong]);
      setNewSongUrl('');
      setShowAddSongModal(false);
    } catch (error) {
      console.error("Error adding song:", error);
      alert("Failed to add song. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Bottom tabs
  const tabs = [
    { id: "listen-now", label: "Listen Now", icon: Home },
    { id: "browse", label: "Browse", icon: Search },
    { id: "library", label: "Library", icon: Library },
  ];

  // If no songs available, show a message
  if (songs.length === 0) {
    return (
      <BaseMIUIApp title="Music" headerColor="bg-white dark:bg-black">
        <div className="h-full flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white">
          <Youtube className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">No Songs Available</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Add YouTube Music songs to start listening</p>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded-full"
            onClick={() => setShowAddSongModal(true)}
          >
            Add YouTube Music Songs
          </button>
        </div>
      </BaseMIUIApp>
    );
  }

  return (
    <BaseMIUIApp title="Music" headerColor="bg-white dark:bg-black">
      <div 
        className="h-full flex flex-col bg-white dark:bg-black text-black dark:text-white" 
        onClick={handleUserInteraction}
      >
        {/* Hidden YouTube Player */}
        <div id="youtube-player" className="hidden"></div>

        {/* Top Bar */}
        <div className="px-4 py-2 flex justify-between items-center">
          <button
            className={`p-2 rounded-full transition-colors ${
              isPlaying ? 'text-red-500 bg-red-500/10' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            onClick={handleUserInteraction}
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
          <div className="w-56 h-56 rounded-xl overflow-hidden shadow-lg mb-6 relative">
            {songs[currentSongIndex].youtubeId && (
              <div className="absolute top-2 right-2 bg-red-500 rounded-full p-1.5">
                <Youtube className="w-4 h-4 text-white" />
              </div>
            )}
            <Image
              src={songs[currentSongIndex].coverArt}
              alt={`${songs[currentSongIndex].album} cover`}
              layout="fill"
              objectFit="cover"
              className="hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Song info */}
          <div className="w-full text-center mb-6">
            <h2 className="text-xl font-bold">{songs[currentSongIndex].title}</h2>
            <p className="text-gray-600 dark:text-gray-400">{songs[currentSongIndex].artist}</p>
            <p className="text-gray-500 dark:text-gray-500 text-sm">{songs[currentSongIndex].album}</p>
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
              <span>
                {playerRef.current && typeof playerRef.current.getCurrentTime === 'function' 
                  ? formatTime(playerRef.current.getCurrentTime()) 
                  : "0:00"}
              </span>
              <span>
                {playerRef.current && typeof playerRef.current.getDuration === 'function'
                  ? formatTime(playerRef.current.getDuration())
                  : songs[currentSongIndex].duration}
              </span>
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
          
          {/* Volume and additional controls */}
          <div className="flex w-full justify-between px-4">
            <button 
              className={`p-2 text-gray-500 dark:text-gray-400 ${isShuffleOn ? 'text-red-500' : ''}`}
              onClick={() => setIsShuffleOn(!isShuffleOn)}
            >
              <Shuffle className="w-5 h-5" />
            </button>
            
            <div className="flex items-center">
              <button
                className="p-2 text-gray-500 dark:text-gray-400"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5" />
                ) : volume < 50 ? (
                  <Volume1 className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <div className="w-24 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gray-600 dark:bg-gray-400" 
                  style={{ width: `${isMuted ? 0 : volume}%` }}
                ></div>
              </div>
            </div>
            
            <button 
              className={`p-2 text-gray-500 dark:text-gray-400 ${repeatMode !== 'off' ? 'text-red-500' : ''}`}
              onClick={() => {
                if (repeatMode === 'off') setRepeatMode('all');
                else if (repeatMode === 'all') setRepeatMode('one');
                else setRepeatMode('off');
              }}
            >
              <Repeat className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Up Next section */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-800">
          <div className="px-6 py-3 flex justify-between items-center">
            <h3 className="font-semibold">Up Next</h3>
            <button 
              className="text-sm text-red-500"
              onClick={() => setShowAddSongModal(true)}
            >
              Add More
            </button>
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
                  handleUserInteraction();
                }}
              >
                <div className="w-10 h-10 rounded-md overflow-hidden mr-3 relative">
                  <Image
                    src={song.coverArt}
                    alt={`${song.album} cover`}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute top-0.5 right-0.5 bg-red-500 rounded-full p-0.5">
                    <Youtube className="w-2.5 h-2.5 text-white" />
                  </div>
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
        
        {/* Add Song Modal */}
        {showAddSongModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowAddSongModal(false)}>
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl p-6" onClick={(e) => e.stopPropagation()}>
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
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-1">Paste a YouTube or YouTube Music URL</p>
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
                      <p className="font-medium text-sm">YouTube Music Song</p>
                      <p className="text-xs text-gray-500">Song details will load after adding</p>
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
                      !newSongUrl || isLoading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={addYouTubeSong}
                    disabled={!newSongUrl || isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    Add Song
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseMIUIApp>
  );
} 