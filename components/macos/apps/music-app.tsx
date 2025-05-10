"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2,
  Search,
  Repeat,
  Shuffle,
  List,
  Music,
  Heart,
  Clock,
  Plus,
  MoreHorizontal,
  VolumeX,
  Volume1,
  Youtube,
  Home,
  Mic,
  Radio,
  LibrarySquare,
  UserCircle2,
  DollarSign,
  ArrowUpRight,
  Album,
  Layers,
  Disc3,
  ListMusic,
  LayoutGrid,
  X,
  Download,
  Share2,
  Loader2,
  Info,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Types
type ViewMode = 'grid' | 'list';
type LibrarySection = 'all' | 'youtube' | 'playlists' | 'artists' | 'albums';
type PlayerState = 'playing' | 'paused' | 'loading' | 'error';

// Song type with YouTube support
type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // In seconds
  coverArt: string;
  liked: boolean;
  youtubeId?: string; // YouTube video ID
  youtubeUrl?: string; // Full YouTube URL
  genre?: string;
  year?: number;
  plays?: number;
  explicit?: boolean;
};

// Playlist type
type Playlist = {
  id: string;
  title: string;
  description: string;
  songs: Song[];
  coverArt?: string;
  gradient?: string;
  createdBy?: string;
  createdAt?: Date;
  totalDuration?: number;
  followers?: number;
};

// Artist type
type Artist = {
  id: string;
  name: string;
  image?: string;
  genres?: string[];
  albums?: number;
  monthlyListeners?: number;
};

// Custom YouTube Song type for direct URL imports
type CustomYouTubeSong = {
  id: string;
  url: string;
  title?: string;
  artist?: string;
  coverArt?: string;
  addedAt?: Date;
};

export default function MusicApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [showYoutubePlayer, setShowYoutubePlayer] = useState(false);
  const [youtubeApiReady, setYoutubeApiReady] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [librarySection, setLibrarySection] = useState<LibrarySection>('youtube');
  const [playerState, setPlayerState] = useState<PlayerState>('paused');
  const [showLyrics, setShowLyrics] = useState(false);
  const [showEqualizerEffect, setShowEqualizerEffect] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hoverSong, setHoverSong] = useState<string | null>(null);
  
  const [customSongs, setCustomSongs] = useState<CustomYouTubeSong[]>([
    { 
      id: 'song-1', 
      url: 'https://music.youtube.com/watch?v=nJZcbidTutE&list=RDAMVMnJZcbidTutE',
      title: 'Sooraj Dooba Hain (From "Roy")',
      artist: 'Arijit Singh',
      coverArt: 'https://img.youtube.com/vi/nJZcbidTutE/hqdefault.jpg',
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
    },
    { 
      id: 'song-2', 
      url: 'https://music.youtube.com/watch?v=Y7G-tYRzwYY&list=RDAMVMnJZcbidTutE',
      title: '"Subha Hone Na De Full Song"| Desi Boyz',
      artist: 'Mika Singh, Kumaar',
      coverArt: 'https://img.youtube.com/vi/Y7G-tYRzwYY/hqdefault.jpg',
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    },
    { 
      id: 'song-3', 
      url: 'https://music.youtube.com/watch?v=Fx6Pk1od_Fo',
      title: 'Old vs New Bangla Mashup',
      artist: 'Hasan S. Iqbal, Dristy Anam',
      coverArt: 'https://img.youtube.com/vi/Fx6Pk1od_Fo/hqdefault.jpg',
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1)
    },
    {
      id: 'song-4',
      url: 'https://music.youtube.com/watch?v=hgXKJvxFQA8',
      title: 'Teri Mitti - Kesari',
      artist: 'B Praak',
      coverArt: 'https://img.youtube.com/vi/hgXKJvxFQA8/hqdefault.jpg',
      addedAt: new Date(Date.now() - 1000 * 60 * 60 * 12)
    },
    {
      id: 'song-5',
      url: 'https://music.youtube.com/watch?v=qE3DdFkZ0C8',
      title: 'Tu Hai To Mujhe Phir Aur Kya Chahiye',
      artist: 'Arijit Singh',
      coverArt: 'https://img.youtube.com/vi/qE3DdFkZ0C8/hqdefault.jpg',
      addedAt: new Date(Date.now() - 1000 * 60 * 30)
    }
  ]);
  
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [newSongUrl, setNewSongUrl] = useState('');
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [showCustomPlaylist, setShowCustomPlaylist] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Sample playlists with gradients
  const playlists = useMemo(() => [
    {
      id: 'recently-added',
      title: 'Recently Added',
      description: 'Your recently added songs',
      songs: [],
      coverArt: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gradient: 'from-rose-500 to-indigo-700',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
      followers: 0
    },
    {
      id: 'favorites',
      title: 'Favorites',
      description: 'Your favorite songs',
      songs: [],
      coverArt: 'https://images.pexels.com/photos/1644888/pexels-photo-1644888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gradient: 'from-pink-500 to-purple-700',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
      followers: 5
    },
    {
      id: 'chill',
      title: 'Chill Vibes',
      description: 'Relaxing music for coding or working',
      songs: [],
      coverArt: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gradient: 'from-blue-400 to-blue-800',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
      followers: 12
    },
    {
      id: 'workout',
      title: 'Workout Mix',
      description: 'High energy tracks for your workout',
      songs: [],
      coverArt: 'https://images.pexels.com/photos/791763/pexels-photo-791763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gradient: 'from-orange-500 to-red-700',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
      followers: 8
    },
    {
      id: 'focus',
      title: 'Focus',
      description: 'Concentration and productivity music',
      songs: [],
      coverArt: 'https://images.pexels.com/photos/3756766/pexels-photo-3756766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      gradient: 'from-emerald-400 to-teal-700',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
      followers: 19
    }
  ], []);

  // Sample artist data
  const artists = useMemo(() => [
    {
      id: 'artist-1',
      name: 'Arijit Singh',
      image: 'https://img.youtube.com/vi/nJZcbidTutE/hqdefault.jpg',
      genres: ['Bollywood', 'Pop'],
      monthlyListeners: 15000000
    },
    {
      id: 'artist-2',
      name: 'Mika Singh',
      image: 'https://img.youtube.com/vi/Y7G-tYRzwYY/hqdefault.jpg',
      genres: ['Bollywood', 'Dance'],
      monthlyListeners: 8500000
    },
    {
      id: 'artist-3',
      name: 'B Praak',
      image: 'https://img.youtube.com/vi/hgXKJvxFQA8/hqdefault.jpg',
      genres: ['Bollywood', 'Folk'],
      monthlyListeners: 5000000
    }
  ], []);

  // Utility function to extract YouTube ID from URL
  const extractYouTubeId = useCallback((url: string): string => {
    let videoId = '';
    
    // Handle only music.youtube.com URLs with various formats
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
    
    // If still no ID found, try alternative approach
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

  // Convert CustomYouTubeSong to Song
  const customSongToSong = useCallback((customSong: CustomYouTubeSong): Song => {
    const youtubeId = extractYouTubeId(customSong.url);
    
    return {
      id: customSong.id,
      title: customSong.title || 'Unknown Song',
      artist: customSong.artist || 'Unknown Artist',
      album: 'YouTube Music',
      duration: 180, // Default duration
      coverArt: customSong.coverArt || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      youtubeId,
      youtubeUrl: customSong.url,
      liked: false
    };
  }, [extractYouTubeId]);

  // Convert customSongs to regular Song format
  const songs = useMemo(() => {
    return customSongs.map(customSong => customSongToSong(customSong));
  }, [customSongs, customSongToSong]);
  
  // Simplified mock function to replace YTMusic API
  const fetchYouTubeMusicInfo = useCallback(async (song: CustomYouTubeSong) => {
    // Use existing song data without API call
    if (!song.title || !song.artist) {
      const youtubeId = extractYouTubeId(song.url);
      setCustomSongs(prev => prev.map(s => {
        if (s.id === song.id) {
          return {
            ...s,
            title: s.title || 'Unknown Song',
            artist: s.artist || 'Unknown Artist',
            coverArt: s.coverArt || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
          };
        }
        return s;
      }));
    }
  }, [extractYouTubeId]);
  
  // Simplified mocked search
  const searchYoutubeMusic = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Filter existing songs based on query
    const filteredResults = songs.filter(
      song => song.title.toLowerCase().includes(query.toLowerCase()) || 
              song.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  }, [songs]);
  
  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        searchYoutubeMusic(searchQuery);
      }
    }, 500);
    
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchYoutubeMusic]);
  
  // Filter songs based on search query
  const filteredSongs = useMemo(() => songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  ), [songs, searchQuery]);
  
  // Get playlist songs
  const getPlaylistSongs = useCallback(() => {
    if (!selectedPlaylist) return songs;
    
    if (selectedPlaylist === 'recently-added') {
      return songs.slice(0, 5); // Most recent 5 songs
    } else if (selectedPlaylist === 'favorites') {
      return songs.filter(song => song.liked);
    } else {
      // For demo purposes, return a filtered set based on playlist id
      return songs.filter((_, index) => index % (parseInt(selectedPlaylist.slice(-1)) || 1) === 0);
    }
  }, [selectedPlaylist, songs]);
  
  const playlistSongs = useMemo(() => getPlaylistSongs(), [getPlaylistSongs]);
  
  // Get current playlist
  const currentPlaylist = useMemo(() => {
    return selectedPlaylist 
      ? playlists.find(p => p.id === selectedPlaylist)
      : { title: 'All Songs', description: 'Your complete music library', coverArt: '' };
  }, [selectedPlaylist, playlists]);
  
  // Format time in MM:SS format
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Format timestamp for added date
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

  // Calculate song time percentage for progress bar

  // Play a specific song
  const playSong = useCallback((song: Song) => {
    setCurrentSong(song);
    setShowYoutubePlayer(true);
    setIsPlaying(true);
    setCurrentTime(0);

    // If YouTube player is already initialized
    if (playerRef.current && song.youtubeId) {
      try {
        // Load the new video
        if (typeof playerRef.current.loadVideoById === 'function') {
          playerRef.current.loadVideoById({
            videoId: song.youtubeId,
            startSeconds: 0,
            suggestedQuality: 'medium'
          });
        }
        
        // Ensure it's unmuted
        if (typeof playerRef.current.unMute === 'function') {
          playerRef.current.unMute();
        }
        
        // Ensure volume is set
        if (typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(isMuted ? 0 : volume);
        }
        
        // Play it
        if (typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
      } catch (error) {
        console.error("Error playing song:", error);
      }
    }
  }, [isMuted, volume]);
  
  // Skip to next/previous song
  const nextSong = useCallback(() => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    playSong(songs[nextIndex]);
  }, [currentSong, songs, playSong]);
  
  // Toggle play/pause
  const togglePlayback = () => {
    if (!currentSong && songs.length > 0) {
      playSong(songs[0]);
      return;
    }
    setIsPlaying(!isPlaying);
  };
  
  const prevSong = () => {
    if (!currentSong) return;
    
    // If more than 3 seconds into song, restart it
    if (currentTime > 3) {
      if (playerRef.current && typeof playerRef.current.seekTo === 'function') {
        try {
          playerRef.current.seekTo(0);
        } catch (error) {
          console.error("Error seeking:", error);
        }
      }
      setCurrentTime(0);
      return;
    }
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    playSong(songs[prevIndex]);
  };
  
  // Toggle repeat mode
  const toggleRepeat = () => {
    if (repeatMode === 'off') setRepeatMode('all');
    else if (repeatMode === 'all') setRepeatMode('one');
    else setRepeatMode('off');
  };
  
  // Toggle shuffle
  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };
  
  // Toggle like for a song
  const toggleLike = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    // In a real app, would update the liked status in the database
  };
  
  // Handle user interaction to unlock audio
  const handleUserInteraction = () => {
    if (playerRef.current && currentSong) {
      try {
        // Try to unmute and play after user interaction
        if (typeof playerRef.current.unMute === 'function') {
          playerRef.current.unMute();
        }
        if (isPlaying && typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        }
      } catch (error) {
        console.error("Error handling user interaction:", error);
      }
    }
  };
  
  // Toggle YouTube player visibility
  const toggleYouTubePlayer = () => {
    setShowYoutubePlayer(!showYoutubePlayer);
  };
  
  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setCurrentTime(time => {
          if (time >= currentSong.duration) {
            // Song ended
            if (repeatMode === 'one') {
              return 0; // Repeat the same song
            } else {
              nextSong(); // Go to next song
              return 0;
            }
          }
          return time + 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSong, repeatMode, nextSong]);
  
  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      // Create script element to load YouTube IFrame API
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Set up the callback for when API is ready
      window.onYouTubeIframeAPIReady = () => {
        setYoutubeApiReady(true);
      };
    } else if (window.YT && window.YT.Player) {
      setYoutubeApiReady(true);
    }
  }, []);

  // Create YouTube player when API is ready and song changes
  useEffect(() => {
    if (youtubeApiReady && currentSong?.youtubeId && showYoutubePlayer) {
      // Destroy existing player if there is one
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error("Error destroying player:", e);
        }
      }

      // Create new player with proper audio settings
      playerRef.current = new window.YT.Player('youtube-player', {
        height: '1',  // Minimal height for audio-only
        width: '1',   // Minimal width for audio-only
        videoId: currentSong.youtubeId,
        playerVars: {
          autoplay: isPlaying ? 1 : 0,
          controls: 0,          // Hide controls for audio-only
          modestbranding: 1,
          rel: 0,
          fs: 0,                // Disable fullscreen for audio-only
          playsinline: 1,       // Play inline on mobile
          origin: window.location.origin, // Set origin for security
          enablejsapi: 1,       // Enable JavaScript API
          disablekb: 0,         // Enable keyboard controls
        },
        events: {
          onReady: (event: any) => {
            console.log("YouTube player ready");
            // Ensure volume is set properly
            try {
              if (typeof event.target.setVolume === 'function') {
                event.target.setVolume(volume);
              }
              // Ensure playback state is correct
              if (isPlaying && typeof event.target.playVideo === 'function') {
                event.target.playVideo();
                // Some browsers block autoplay, try to unmute if needed
                if (typeof event.target.unMute === 'function') {
                  event.target.unMute();
                }
              }
            } catch (e) {
              console.error("Error in onReady handler:", e);
            }
          },
          onStateChange: (event: any) => {
            console.log("YouTube player state changed:", event.data);
            
            try {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                if (repeatMode === 'one' && typeof event.target.playVideo === 'function') {
                  event.target.playVideo();
                } else {
                  nextSong();
                }
              }
            } catch (e) {
              console.error("Error in onStateChange handler:", e);
            }
          },
          onError: (event: any) => {
            console.error("YouTube player error:", event.data);
            // Try to play next song if there's an error
            nextSong();
          }
        }
      });
    }
  }, [currentSong, youtubeApiReady, showYoutubePlayer, volume, isPlaying, repeatMode, nextSong]);
  
  // Update player state when play/pause changes
  useEffect(() => {
    if (playerRef.current) {
      try {
        if (isPlaying && typeof playerRef.current.playVideo === 'function') {
          playerRef.current.playVideo();
        } else if (typeof playerRef.current.pauseVideo === 'function') {
          playerRef.current.pauseVideo();
        }
      } catch (error) {
        console.error("Error controlling playback:", error);
      }
    }
  }, [isPlaying]);

  // Update volume when changed
  useEffect(() => {
    if (playerRef.current) {
      try {
        if (typeof playerRef.current.setVolume === 'function') {
          playerRef.current.setVolume(isMuted ? 0 : volume);
        }
      } catch (error) {
        console.error("Error setting volume:", error);
      }
    }
  }, [volume, isMuted]);
  
  // Add a custom song
  const addCustomSong = () => {
    if (!newSongUrl) return;
    
    const youtubeId = extractYouTubeId(newSongUrl);
    if (!youtubeId) {
      alert("Invalid YouTube URL. Please enter a valid YouTube or YouTube Music URL.");
      return;
    }
    
    const newCustomSong: CustomYouTubeSong = {
      id: `custom-${Date.now()}`,
      url: newSongUrl,
      title: newSongTitle || 'Custom Song',
      artist: newSongArtist || 'Unknown Artist',
      coverArt: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
    };
    
    setCustomSongs(prev => [...prev, newCustomSong]);
    setNewSongUrl('');
    setNewSongTitle('');
    setNewSongArtist('');
    setShowAddSongModal(false);
  };

  // Remove a custom song
  const removeCustomSong = (id: string) => {
    setCustomSongs(customSongs.filter(song => song.id !== id));
  };
  
  return (
    <div ref={containerRef} className="h-full flex flex-col bg-background overflow-hidden" onClick={handleUserInteraction}>
      {/* Top bar */}
      <div className="border-b bg-muted/30 backdrop-blur-sm px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-full hover:bg-accent/30 text-muted-foreground">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-accent/30 text-muted-foreground">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search YouTube Music"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-60 bg-muted/70 rounded-full pl-8 pr-3 py-1.5 text-sm border border-transparent focus:border-primary/30 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 pr-2.5 flex items-center"
                onClick={() => setSearchQuery('')}
              >
                <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            className={`p-1.5 rounded-full transition-colors ${showYoutubePlayer ? 'bg-red-500/20 text-red-500' : 'hover:bg-accent/30 text-foreground'}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleYouTubePlayer();
              handleUserInteraction();
            }}
            title="Toggle YouTube Music Player"
          >
            <Youtube className="w-4 h-4" />
          </button>
          <button 
            className="p-1.5 rounded-full hover:bg-accent/30 transition-colors"
            onClick={() => setShowAddSongModal(true)}
            title="Add Song"
          >
            <Plus className="w-4 h-4" />
          </button>
          <div className="h-4 mx-0.5 border-r border-muted-foreground/30"></div>
          <div className="flex items-center gap-1">
            <button 
              className={`p-1.5 rounded-full hover:bg-accent/30 transition-colors ${viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('list')}
              title="List View"
            >
              <ListMusic className="w-4 h-4" />
            </button>
            <button 
              className={`p-1.5 rounded-full hover:bg-accent/30 transition-colors ${viewMode === 'grid' ? 'text-primary' : 'text-muted-foreground'}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <div className="h-4 mx-0.5 border-r border-muted-foreground/30"></div>
          <UserCircle2 className="w-6 h-6 text-muted-foreground" />
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-52 border-r p-3 overflow-y-auto flex flex-col">
          <div className="mb-5">
            <nav className="space-y-1">
              <button 
                className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent/30"
                onClick={() => {
                  setSelectedPlaylist(null);
                  setShowCustomPlaylist(false);
                  setLibrarySection('all');
                }}
              >
                <Home className="w-4 h-4 text-primary" />
                <span>Home</span>
              </button>
              
              <button 
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${librarySection === 'youtube' && showCustomPlaylist ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'}`}
                onClick={() => {
                  setSelectedPlaylist(null);
                  setShowCustomPlaylist(true);
                  setLibrarySection('youtube');
                }}
              >
                <Youtube className="w-4 h-4" />
                <span>YouTube Music</span>
              </button>
              
              <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent/30">
                <Radio className="w-4 h-4 text-red-500" />
                <span>Radio</span>
              </button>
            </nav>
          </div>
          
          <div className="mb-1">
            <h3 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Library</h3>
            <nav className="space-y-1">
              <button 
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${librarySection === 'all' && !showCustomPlaylist ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'}`}
                onClick={() => {
                  setSelectedPlaylist(null);
                  setShowCustomPlaylist(false);
                  setLibrarySection('all');
                }}
              >
                <Music className="w-4 h-4" />
                <span>All Songs</span>
              </button>
              
              <button 
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${librarySection === 'artists' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'}`}
                onClick={() => {
                  setSelectedPlaylist(null);
                  setShowCustomPlaylist(false);
                  setLibrarySection('artists');
                }}
              >
                <Mic className="w-4 h-4" />
                <span>Artists</span>
              </button>
              
              <button 
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${librarySection === 'albums' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'}`}
                onClick={() => {
                  setSelectedPlaylist(null);
                  setShowCustomPlaylist(false);
                  setLibrarySection('albums');
                }}
              >
                <Album className="w-4 h-4" />
                <span>Albums</span>
              </button>
              
              <button 
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${librarySection === 'playlists' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'}`}
                onClick={() => {
                  setSelectedPlaylist(null);
                  setShowCustomPlaylist(false);
                  setLibrarySection('playlists');
                }}
              >
                <ListMusic className="w-4 h-4" />
                <span>Playlists</span>
              </button>
            </nav>
          </div>
          
          <div className="mt-2">
            <div className="flex items-center justify-between px-3 mb-1">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Your Playlists</h3>
              <button className="p-1 rounded-full hover:bg-accent/30 text-muted-foreground">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="space-y-1 overflow-y-auto max-h-72">
              {playlists.map(playlist => (
                <button 
                  key={playlist.id}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-sm truncate ${
                    selectedPlaylist === playlist.id ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'
                  }`}
                  onClick={() => {
                    setSelectedPlaylist(playlist.id);
                    setShowCustomPlaylist(false);
                    setLibrarySection('playlists');
                  }}
                >
                  <span className="truncate">{playlist.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <div className="px-3 py-2 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Import more music directly from YouTube Music.</p>
              <button 
                className="w-full px-2 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium flex items-center justify-center gap-1.5"
                onClick={() => setShowAddSongModal(true)}
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>Add YouTube Song</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Content area - main section */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <motion.div
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading songs from YouTube...</p>
              </motion.div>
            </div>
          ) : (
            <>
              {/* Header section with cover art and actions */}
              <div className="mb-8">
                <div className="flex items-start gap-6">
                  {/* Cover art or placeholder */}
                  <div className="w-40 h-40 rounded-xl shadow-lg overflow-hidden flex-shrink-0 bg-gradient-to-br relative group">
                    {showCustomPlaylist ? (
                      <div className="w-full h-full bg-gradient-to-br from-red-500/80 to-red-900 flex items-center justify-center">
                        <Youtube className="w-16 h-16 text-white/70" />
                      </div>
                    ) : (
                      currentPlaylist?.coverArt ? (
                        <Image 
                          src={currentPlaylist.coverArt}
                          alt={currentPlaylist.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width={160}
                          height={160}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-primary/10">
                          <Music className="w-16 h-16 text-primary/70" />
                        </div>
                      )
                    )}
                    
                    {/* Play button overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      whileHover={{ scale: 1 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <button 
                        className="w-14 h-14 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (showCustomPlaylist) {
                            if (customSongs.length > 0) {
                              const song = customSongToSong(customSongs[0]);
                              playSong(song);
                            } else {
                              setShowAddSongModal(true);
                            }
                          } else if (playlistSongs.length > 0) {
                            playSong(playlistSongs[0]);
                          }
                          handleUserInteraction();
                        }}
                      >
                        <Play className="w-6 h-6 ml-1" />
                      </button>
                    </motion.div>
                  </div>
                  
                  {/* Playlist info */}
                  <div className="flex-1 pt-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {librarySection === 'playlists' ? 'PLAYLIST' : 
                       librarySection === 'artists' ? 'ARTIST' :
                       librarySection === 'albums' ? 'ALBUM' :
                       showCustomPlaylist ? 'COLLECTION' : 'LIBRARY'}
                    </span>
                    <h1 className="text-3xl font-bold mt-1 mb-2">
                      {showCustomPlaylist ? 'YouTube Music' : 
                       selectedPlaylist ? currentPlaylist?.title :
                       librarySection === 'artists' ? 'Artists' :
                       librarySection === 'albums' ? 'Albums' :
                       librarySection === 'playlists' ? 'All Playlists' : 'All Songs'}
                    </h1>
                    <p className="text-sm text-muted-foreground mb-4">
                      {showCustomPlaylist 
                        ? `${customSongs.length} songs imported from YouTube Music`
                        : currentPlaylist?.description
                      }
                    </p>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-2 mt-4">
                      <button 
                        className="px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (showCustomPlaylist) {
                            if (customSongs.length > 0) {
                              const song = customSongToSong(customSongs[0]);
                              playSong(song);
                            } else {
                              setShowAddSongModal(true);
                            }
                          } else if (playlistSongs.length > 0) {
                            playSong(playlistSongs[0]);
                          }
                          handleUserInteraction();
                        }}
                      >
                        Play
                      </button>
                      {showCustomPlaylist && (
                        <button 
                          className="px-4 py-2 rounded-full border border-muted bg-background/80 hover:bg-accent/40 text-sm font-medium transition-colors"
                          onClick={() => setShowAddSongModal(true)}
                        >
                          Add Song
                        </button>
                      )}
                      <button 
                        className="px-4 py-2 rounded-full border border-muted bg-background/80 hover:bg-accent/40 text-sm font-medium transition-colors flex items-center gap-1.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          if ((showCustomPlaylist ? customSongs : playlistSongs).length > 0) {
                            const randomIndex = Math.floor(Math.random() * (showCustomPlaylist ? customSongs : playlistSongs).length);
                            const song = showCustomPlaylist 
                              ? customSongToSong(customSongs[randomIndex])
                              : playlistSongs[randomIndex];
                            playSong(song);
                            setIsShuffleOn(true);
                          }
                          handleUserInteraction();
                        }}
                      >
                        <Shuffle className="w-3.5 h-3.5" />
                        <span>Shuffle</span>
                      </button>
                      
                      <div className="ml-2 flex items-center gap-2 text-muted-foreground">
                        <button className="p-2 rounded-full hover:bg-accent/30 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-accent/30 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-full hover:bg-accent/30 transition-colors">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Grid view for artists or playlists */}
              {(librarySection === 'artists' || librarySection === 'playlists' || librarySection === 'albums') && viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mb-8">
                  {(librarySection === 'artists' ? artists : playlists).map((item) => (
                    <motion.div
                      key={item.id}
                      className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if ('name' in item) { // Artist
                          // In real app: navigate to artist page
                          console.log("Artist clicked:", item.name);
                        } else { // Playlist
                          setSelectedPlaylist(item.id);
                          setShowCustomPlaylist(false);
                        }
                      }}
                    >
                      <div className="aspect-square relative overflow-hidden">
                        <Image 
                          src={'image' in item ? item.image! : item.coverArt!}
                          alt={'name' in item ? item.name : item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width={200}
                          height={200}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                          <button
                            className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Play first song from artist/playlist
                              if (playlistSongs.length > 0) {
                                playSong(playlistSongs[0]);
                              }
                            }}
                          >
                            <Play className="w-5 h-5 ml-0.5" />
                          </button>
                        </div>
                      </div>
                      <div className="p-3 bg-card">
                        <h3 className="font-medium text-sm truncate">{'name' in item ? item.name : item.title}</h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {'genres' in item ? item.genres?.join(', ') : 
                           `${item.songs.length} songs`}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div>
                  {/* List view for songs */}
                  {showCustomPlaylist ? (
                    customSongs.length > 0 ? (
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b text-left text-sm text-muted-foreground">
                            <th className="p-2 w-8">#</th>
                            <th className="p-2">Title</th>
                            <th className="p-2">Artist</th>
                            <th className="p-2 w-32">Added</th>
                            <th className="p-2 w-16">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {customSongs.map((song, index) => (
                            <motion.tr 
                              key={song.id}
                              className="border-b last:border-b-0 text-sm hover:bg-accent/10 cursor-pointer"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => {
                                const fullSong = customSongToSong(song);
                                playSong(fullSong);
                              }}
                              onMouseEnter={() => setHoverSong(song.id)}
                              onMouseLeave={() => setHoverSong(null)}
                            >
                              <td className="p-2 text-muted-foreground">
                                {hoverSong === song.id ? (
                                  <button className="w-5 h-5 flex items-center justify-center">
                                    <Play className="w-3.5 h-3.5" />
                                  </button>
                                ) : currentSong?.youtubeId === extractYouTubeId(song.url) && isPlaying ? (
                                  <div className="w-5 h-5 flex items-center justify-center">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                  </div>
                                ) : (
                                  index + 1
                                )}
                              </td>
                              <td className="p-2">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded overflow-hidden mr-3 flex-shrink-0">
                                    <Image 
                                      src={song.coverArt || `https://img.youtube.com/vi/${extractYouTubeId(song.url)}/default.jpg`} 
                                      alt={song.title || 'Custom Song'} 
                                      className="w-full h-full object-cover" 
                                      width={40}
                                      height={40}
                                    />
                                  </div>
                                  <span className={`truncate max-w-xs ${currentSong?.youtubeId === extractYouTubeId(song.url) ? 'font-medium text-primary' : ''}`}>
                                    {song.title || 'Unknown Title'}
                                  </span>
                                </div>
                              </td>
                              <td className="p-2 text-muted-foreground">{song.artist || 'Unknown Artist'}</td>
                              <td className="p-2 text-xs text-muted-foreground">
                                {song.addedAt ? formatTimeAgo(song.addedAt) : 'Recently added'}
                              </td>
                              <td className="p-2">
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeCustomSong(song.id);
                                  }}
                                  className="p-1.5 rounded-full hover:bg-accent/30 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="py-16 flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4">
                          <Youtube className="w-8 h-8 text-red-500" />
                        </div>
                        <p className="text-muted-foreground mb-4">No YouTube songs imported yet</p>
                        <button 
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                          onClick={() => setShowAddSongModal(true)}
                        >
                          Import from YouTube Music
                        </button>
                      </div>
                    )
                  ) : (
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b text-left text-sm text-muted-foreground">
                          <th className="p-2 w-8">#</th>
                          <th className="p-2">Title</th>
                          <th className="p-2">Artist</th>
                          <th className="p-2">Album</th>
                          <th className="p-2 text-right w-16">
                            <Clock className="w-4 h-4 inline" />
                          </th>
                          <th className="p-2 w-8"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {(searchQuery ? filteredSongs : playlistSongs).map((song, index) => (
                          <motion.tr 
                            key={song.id}
                            className={`border-b last:border-b-0 text-sm hover:bg-accent/10 ${
                              currentSong?.id === song.id ? 'bg-accent/20' : ''
                            }`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              playSong(song);
                              handleUserInteraction();
                            }}
                            onMouseEnter={() => setHoverSong(song.id)}
                            onMouseLeave={() => setHoverSong(null)}
                          >
                            <td className="p-2 text-muted-foreground">
                              {hoverSong === song.id ? (
                                <button className="w-5 h-5 flex items-center justify-center">
                                  <Play className="w-3.5 h-3.5" />
                                </button>
                              ) : currentSong?.id === song.id && isPlaying ? (
                                <div className="w-5 h-5 flex items-center justify-center">
                                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                                </div>
                              ) : (
                                index + 1
                              )}
                            </td>
                            <td className="p-2">
                              <div className="flex items-center">
                                <div className="w-10 h-10 rounded overflow-hidden mr-3 flex-shrink-0">
                                  <Image src={song.coverArt} alt={song.title} className="w-full h-full object-cover" width={40} height={40} />
                                </div>
                                <span className={`truncate max-w-xs ${currentSong?.id === song.id ? 'font-medium text-primary' : ''}`}>
                                  {song.title}
                                </span>
                              </div>
                            </td>
                            <td className="p-2 text-muted-foreground">{song.artist}</td>
                            <td className="p-2 text-muted-foreground">{song.album}</td>
                            <td className="p-2 text-right text-muted-foreground">{formatTime(song.duration)}</td>
                            <td className="p-2">
                              <button 
                                onClick={(e) => toggleLike(song.id, e)}
                                className="p-1 rounded-full hover:bg-accent/30 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Heart className={`w-4 h-4 ${song.liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                              </button>
                            </td>
                          </motion.tr>
                        ))}
                        
                        {(searchQuery ? filteredSongs : playlistSongs).length === 0 && (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-muted-foreground">
                              {searchQuery ? "No songs matching your search" : "This playlist is empty"}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      
      {/* Playback controls - enhanced with animations */}
      <div className="border-t bg-muted/30 backdrop-blur-sm p-3 flex items-center">
        {currentSong ? (
          <>
            {/* Current song info */}
            <div className="flex items-center w-1/4">
              <motion.div 
                className="w-12 h-12 rounded-lg overflow-hidden mr-3 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image src={currentSong.coverArt} alt={currentSong.title} className="w-full h-full object-cover" width={48} height={48} />
              </motion.div>
              <div className="truncate">
                <div className="font-medium text-sm truncate">{currentSong.title}</div>
                <div className="text-xs text-muted-foreground truncate">{currentSong.artist}</div>
              </div>
              <button
                className="ml-2 p-1 rounded-full hover:bg-accent/30 transition-colors"
                onClick={(e) => toggleLike(currentSong.id, e)}
              >
                <Heart className={`w-4 h-4 ${currentSong.liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
              </button>
            </div>
            
            {/* Playback controls */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2 mb-1.5">
                <motion.button 
                  className={`p-1.5 rounded-full transition-colors ${isShuffleOn ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleShuffle();
                    handleUserInteraction();
                  }}
                >
                  <Shuffle className="w-4 h-4" />
                </motion.button>
                <motion.button 
                  className="p-1.5 rounded-full text-foreground hover:bg-accent/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSong();
                    handleUserInteraction();
                  }}
                >
                  <SkipBack className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayback();
                    handleUserInteraction();
                  }}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </motion.button>
                <motion.button 
                  className="p-1.5 rounded-full text-foreground hover:bg-accent/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSong();
                    handleUserInteraction();
                  }}
                >
                  <SkipForward className="w-5 h-5" />
                </motion.button>
                <motion.button 
                  className={`p-1.5 rounded-full transition-colors ${repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRepeat();
                    handleUserInteraction();
                  }}
                >
                  <Repeat className="w-4 h-4" />
                  {repeatMode === 'one' && <span className="absolute text-[8px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">1</span>}
                </motion.button>
              </div>
              
              {/* Progress bar */}
              <div className="w-full max-w-xl flex items-center text-xs">
                <span className="w-8 text-muted-foreground text-right">{formatTime(currentTime)}</span>
                <div className="relative flex-1 mx-3 h-1 bg-muted rounded-full overflow-hidden group cursor-pointer">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-primary"
                    style={{ width: `${(currentTime / (currentSong.duration || 1)) * 100}%` }}
                    transition={{ type: "tween", ease: "linear" }}
                  ></motion.div>
                  <div className="absolute inset-y-0 left-0 w-full h-full">
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ left: `${(currentTime / (currentSong.duration || 1)) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="w-8 text-muted-foreground">{formatTime(currentSong.duration)}</span>
              </div>
            </div>
            
            {/* Volume controls */}
            <div className="w-1/4 flex items-center justify-end">
              <button 
                className="p-1.5 rounded-full hover:bg-accent/30 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                  if (playerRef.current) {
                    if (isMuted) {
                      if (typeof playerRef.current.unMute === 'function') {
                        playerRef.current.unMute();
                      }
                      if (typeof playerRef.current.setVolume === 'function') {
                        playerRef.current.setVolume(volume);
                      }
                    } else {
                      if (typeof playerRef.current.mute === 'function') {
                        playerRef.current.mute();
                      }
                    }
                  }
                  handleUserInteraction();
                }}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4 text-muted-foreground" />
                ) : volume < 50 ? (
                  <Volume1 className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              <div className="relative w-24 h-1 bg-muted rounded-full mx-2 group">
                <div 
                  className="absolute inset-y-0 left-0 bg-primary rounded-full"
                  style={{ width: `${isMuted ? 0 : volume}%` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const newVolume = parseInt(e.target.value);
                    setVolume(newVolume);
                    setIsMuted(newVolume === 0);
                    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
                      playerRef.current.setVolume(newVolume);
                      if (newVolume > 0 && typeof playerRef.current.unMute === 'function') {
                        playerRef.current.unMute();
                      }
                    }
                    handleUserInteraction();
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ left: `${isMuted ? 0 : volume}%` }}
                ></div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full py-2 flex flex-col items-center justify-center">
            <p className="text-muted-foreground text-sm mb-2">Select a song to start playing</p>
            <button 
              className="px-4 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm transition-colors"
              onClick={() => setShowAddSongModal(true)}
            >
              Add YouTube Music Song
            </button>
          </div>
        )}
      </div>

      {/* Add Song Modal */}
      <AnimatePresence>
        {showAddSongModal && (
          <motion.div 
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddSongModal(false)}
          >
            <motion.div 
              className="bg-background rounded-xl shadow-xl p-6 w-[450px] max-w-full"
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-semibold flex items-center">
                  <Youtube className="w-5 h-5 text-red-500 mr-2" />
                  Add YouTube Music Song
                </h2>
                <button
                  className="p-1.5 rounded-full hover:bg-accent/30 transition-colors"
                  onClick={() => setShowAddSongModal(false)}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">YouTube URL</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={newSongUrl}
                      onChange={(e) => setNewSongUrl(e.target.value)}
                      placeholder="https://music.youtube.com/watch?v=..."
                      className="w-full px-4 py-2.5 pr-10 border rounded-lg bg-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Youtube className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Paste any YouTube or YouTube Music URL
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">Song Title (optional)</label>
                  <input
                    type="text"
                    value={newSongTitle}
                    onChange={(e) => setNewSongTitle(e.target.value)}
                    placeholder="Enter song title"
                    className="w-full px-4 py-2.5 border rounded-lg bg-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1.5">Artist (optional)</label>
                  <input
                    type="text"
                    value={newSongArtist}
                    onChange={(e) => setNewSongArtist(e.target.value)}
                    placeholder="Enter artist name"
                    className="w-full px-4 py-2.5 border rounded-lg bg-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                  />
                </div>
              </div>
              
              {/* Preview section if URL is entered */}
              {newSongUrl && extractYouTubeId(newSongUrl) && (
                <div className="mt-5 p-4 border border-muted rounded-lg bg-muted/30 flex items-center gap-3">
                  <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0">
                    <Image 
                      src={`https://img.youtube.com/vi/${extractYouTubeId(newSongUrl)}/hqdefault.jpg`}
                      alt="Thumbnail preview"
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {newSongTitle || 'Title will be extracted'}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {newSongArtist || 'Artist will be extracted'}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Youtube className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-muted-foreground">YouTube Music</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  className="px-4 py-2 border rounded-lg hover:bg-accent/30 transition-colors"
                  onClick={() => setShowAddSongModal(false)}
                >
                  Cancel
                </button>
                <motion.button
                  className={`px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 ${!newSongUrl ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary/90'}`}
                  onClick={addCustomSong}
                  disabled={!newSongUrl}
                  whileHover={{ scale: newSongUrl ? 1.02 : 1 }}
                  whileTap={{ scale: newSongUrl ? 0.98 : 1 }}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Song</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 