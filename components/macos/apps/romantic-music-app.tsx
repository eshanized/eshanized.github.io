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
  Youtube
} from 'lucide-react';
import { motion } from 'framer-motion';
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

// Song type with YouTube ID
type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // In seconds
  coverArt: string;
  youtubeId: string;
  youtubeUrl?: string; // Full YouTube URL (optional)
  liked: boolean;
};

// Custom YouTube Song for direct URL imports
type CustomYouTubeSong = {
  id: string;
  url: string;
  title?: string;
  artist?: string;
  coverArt?: string;
};

// Playlist type
type Playlist = {
  id: string;
  title: string;
  description: string;
  songs: Song[];
  coverArt?: string;
};

// Alternative playlist type to fix TypeScript error
interface PlaylistInfo {
  title: string;
  description: string;
  songs: Song[];
  coverArt?: string;
}

export default function RomanticMusicApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>('romantic');
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [showYoutubePlayer, setShowYoutubePlayer] = useState(false);
  const [youtubeApiReady, setYoutubeApiReady] = useState(false);
  const [customSongs, setCustomSongs] = useState<CustomYouTubeSong[]>([
    { 
      id: 'song-1', 
      url: 'https://music.youtube.com/watch?v=HP2zqQsrsyg',
      title: 'Mann Mera',
      artist: 'Gajendra Verma',
      coverArt: 'https://img.youtube.com/vi/HP2zqQsrsyg/hqdefault.jpg'
    },
    { 
      id: 'song-2', 
      url: 'https://music.youtube.com/watch?v=a3-HFoJJPzk&list=RDAMVMa3-HFoJJPzk',
      title: 'Behula',
      artist: 'Shunno',
      coverArt: 'https://img.youtube.com/vi/a3-HFoJJPzk/hqdefault.jpg'
    },
    { 
      id: 'song-3', 
      url: 'https://music.youtube.com/watch?v=Ntlhy3Bc6u0',
      title: 'Pehli Pehli Baar X Dhadkan X Aja We Mahiya X Punjabi Mashup | Imran Khan | Hindi X Punjabi Song |TRM',
      artist: 'The Royal Music',
      coverArt: 'https://img.youtube.com/vi/Ntlhy3Bc6u0/hqdefault.jpg'
    },
    { 
      id: 'song-4', 
      url: 'https://music.youtube.com/watch?v=moIXcDQB9-g',
      title: 'Koi Si',
      artist: 'Afsana Khan',
      coverArt: 'https://img.youtube.com/vi/moIXcDQB9-g/hqdefault.jpg'
    },
    { 
      id: 'song-5', 
      url: 'https://music.youtube.com/watch?v=QOStnlNGfDQ&list=RDAMVMQOStnlNGfDQ',
      title: 'Hamqadam',
      artist: 'Shrey Singhal',
      coverArt: 'https://img.youtube.com/vi/QOStnlNGfDQ/hqdefault.jpg'
    }
  ]);
  const [showAddSongModal, setShowAddSongModal] = useState(false);
  const [newSongUrl, setNewSongUrl] = useState('');
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongArtist, setNewSongArtist] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  
  const playerRef = useRef<any>(null);
  
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
  
  // Convert customSongs to regular Song format
  const romanticSongs = useMemo(() => {
    return customSongs.map(customSong => {
      const youtubeId = extractYouTubeId(customSong.url);
      return {
        id: customSong.id,
        title: customSong.title || 'Unknown Song',
        artist: customSong.artist || 'Unknown Artist',
        album: 'YouTube Music',
        duration: 210, // Default duration
        coverArt: customSong.coverArt || `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
        youtubeId,
        youtubeUrl: customSong.url,
        liked: true
      };
    });
  }, [customSongs, extractYouTubeId]);
  
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
    const filteredResults = romanticSongs.filter(
      song => song.title.toLowerCase().includes(query.toLowerCase()) || 
              song.artist.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(filteredResults);
  }, [romanticSongs]);
  
  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        searchYoutubeMusic(searchQuery);
      }
    }, 500);
    
    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, searchYoutubeMusic]);
  
  // All playlists
  const playlists = useMemo(() => [
    {
      id: 'romantic',
      title: 'Romantic Favorites',
      description: 'Love songs specially curated for you',
      songs: romanticSongs,
      coverArt: 'https://images.pexels.com/photos/1028725/pexels-photo-1028725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'memories',
      title: 'Special Memories',
      description: 'Songs that remind us of special moments',
      songs: romanticSongs.slice(2, 4),
      coverArt: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 'our-story',
      title: 'Our Story',
      description: 'The soundtrack of our journey together',
      songs: romanticSongs.slice(0, 3),
      coverArt: 'https://images.pexels.com/photos/1024972/pexels-photo-1024972.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    }
  ], [romanticSongs]);
  
  // Filter songs based on search query
  const filteredSongs = useMemo(() => {
    if (searchResults.length > 0 && searchQuery.trim().length > 2) {
      // If we have search results use those
      return searchResults;
    }
    
    // Otherwise, filter local songs
    return romanticSongs.filter(song => 
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [romanticSongs, searchQuery, searchResults]);
  
  // Get playlist songs
  const getPlaylistSongs = useCallback(() => {
    if (!selectedPlaylist) return romanticSongs;
    
    const playlist = playlists.find(p => p.id === selectedPlaylist);
    return playlist ? playlist.songs : romanticSongs;
  }, [selectedPlaylist, playlists, romanticSongs]);
  
  const playlistSongs = useMemo(() => getPlaylistSongs(), [getPlaylistSongs]);
  
  // Get current playlist
  const currentPlaylist = useMemo(() => selectedPlaylist 
    ? playlists.find(p => p.id === selectedPlaylist) || { 
        title: 'All Songs', 
        description: 'Your complete music library', 
        songs: romanticSongs,
        coverArt: 'https://images.pexels.com/photos/1028725/pexels-photo-1028725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      }
    : { 
        title: 'All Songs', 
        description: 'Your complete music library', 
        songs: romanticSongs,
        coverArt: 'https://images.pexels.com/photos/1028725/pexels-photo-1028725.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      },
  [selectedPlaylist, playlists, romanticSongs]);
  
  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Toggle play/pause
  const togglePlayback = () => {
    try {
      if (!currentSong && playlistSongs.length > 0) {
        playSong(playlistSongs[0]);
        return;
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error toggling playback:", error);
    }
  };
  
  // Play a specific song
  const playSong = useCallback((song: Song) => {
    setCurrentSong(song);
    setShowYoutubePlayer(true);
    setIsPlaying(true);
    setCurrentTime(0);

    // If we already have a player, try to play it directly
    if (playerRef.current && typeof playerRef.current.loadVideoById === 'function') {
      try {
        // Load the new video
        playerRef.current.loadVideoById({
          videoId: song.youtubeId,
          startSeconds: 0,
          suggestedQuality: 'medium'
        });
        
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
    if (!currentSong || playlistSongs.length === 0) return;
    
    const currentIndex = playlistSongs.findIndex(song => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % playlistSongs.length;
    playSong(playlistSongs[nextIndex]);
  }, [currentSong, playlistSongs, playSong]);
  
  const prevSong = () => {
    if (!currentSong || playlistSongs.length === 0) return;
    
    // If more than 3 seconds into song, restart it
    if (currentTime > 3 && playerRef.current) {
      try {
        if (typeof playerRef.current.seekTo === 'function') {
          playerRef.current.seekTo(0);
        }
        setCurrentTime(0);
        return;
      } catch (error) {
        console.error("Error seeking:", error);
      }
    }
    
    const currentIndex = playlistSongs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? playlistSongs.length - 1 : currentIndex - 1;
    playSong(playlistSongs[prevIndex]);
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
    // Toggle like status in UI (in a real app would update database)
    romanticSongs.forEach(song => {
      if (song.id === id) {
        song.liked = !song.liked;
      }
    });
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

  // Create YouTube Music player when API is ready and song changes
  useEffect(() => {
    if (youtubeApiReady && currentSong && showYoutubePlayer) {
      try {
        // Destroy existing player if there is one
        if (playerRef.current && typeof playerRef.current.destroy === 'function') {
          try {
            playerRef.current.destroy();
          } catch (e) {
            console.error("Error destroying player:", e);
          }
          // Set to null to avoid referencing destroyed player
          playerRef.current = null;
        }

        // Make sure the container element exists
        const playerContainer = document.getElementById('youtube-player');
        if (!playerContainer) {
          console.error("YouTube Music player container not found");
          return;
        }

        // Create new player
        setTimeout(() => {
          try {
            if (window.YT && window.YT.Player) {
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
                  origin: window.location.origin,
                  enablejsapi: 1,
                  disablekb: 0,
                },
                events: {
                  onReady: (event: any) => {
                    console.log("YouTube Music player ready");
                    try {
                      // Ensure volume is set properly
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
                    console.log("YouTube Music player state changed:", event.data);
                    
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
                    console.error("YouTube Music player error:", event.data);
                    // Try to play next song if there's an error
                    nextSong();
                  }
                }
              });
            } else {
              console.error("YouTube Music API not available");
            }
          } catch (e) {
            console.error("Error creating YouTube Music player:", e);
          }
        }, 100); // Short delay to ensure DOM element is ready
      } catch (e) {
        console.error("Error in YouTube Music player setup:", e);
      }
    }
  }, [currentSong, youtubeApiReady, showYoutubePlayer, volume, isPlaying, repeatMode, nextSong]);

  // Update player state when play/pause changes
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        if (isPlaying) {
          playerRef.current.playVideo();
        } else {
          playerRef.current.pauseVideo();
        }
      } catch (error) {
        console.error("Error controlling playback:", error);
      }
    }
  }, [isPlaying]);

  // Update volume when changed
  useEffect(() => {
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      try {
        playerRef.current.setVolume(isMuted ? 0 : volume);
      } catch (error) {
        console.error("Error setting volume:", error);
      }
    }
  }, [volume, isMuted]);
  
  // Convert CustomYouTubeSong to Song
  const customSongToSong = (customSong: CustomYouTubeSong): Song => {
    const youtubeId = extractYouTubeId(customSong.url);
    
    return {
      id: customSong.id,
      title: customSong.title || 'Custom Song',
      artist: customSong.artist || 'Unknown Artist',
      album: 'Custom Playlist',
      duration: 180, // Default duration
      coverArt: customSong.coverArt || 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      youtubeId,
      youtubeUrl: customSong.url,
      liked: true
    };
  };
  
  // Add a custom song
  const addCustomSong = () => {
    if (!newSongUrl) return;
    
    // Convert regular YouTube URL to YouTube Music URL if needed
    let musicUrl = newSongUrl;
    if (musicUrl.includes('youtube.com') && !musicUrl.includes('music.youtube.com')) {
      try {
        const urlObj = new URL(musicUrl);
        const videoId = urlObj.searchParams.get('v');
        if (videoId) {
          musicUrl = `https://music.youtube.com/watch?v=${videoId}`;
        }
      } catch (e) {
        console.error("Error converting to YouTube Music URL:", e);
      }
    }
    
    const youtubeId = extractYouTubeId(musicUrl);
    if (!youtubeId) {
      alert("Invalid URL. Please enter a valid YouTube Music URL (music.youtube.com).");
      return;
    }
    
    const newCustomSong: CustomYouTubeSong = {
      id: `custom-${Date.now()}`,
      url: musicUrl,
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
    <div className="h-full flex flex-col bg-background" onClick={handleUserInteraction}>
      {/* Top bar */}
      <div className="border-b bg-muted/30 backdrop-blur-sm p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search YouTube Music"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-muted rounded-full pl-8 pr-3 py-1.5 text-sm"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            className={`p-1.5 rounded-full ${showYoutubePlayer ? 'bg-accent/30' : 'hover:bg-accent/30'}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleYouTubePlayer();
              handleUserInteraction();
            }}
            title="Toggle YouTube Music Player"
          >
            <Youtube className="w-5 h-5 text-red-500" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-accent/30">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-accent/30">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r p-2 overflow-y-auto">
          <div className="mb-4">
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase">
              Library
            </div>
            <div className="flex flex-col space-y-1">
              <div 
                className={`flex items-center py-1 px-2 rounded text-sm cursor-pointer ${
                  !selectedPlaylist ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/30'
                }`}
                onClick={() => setSelectedPlaylist(null)}
              >
                <Music className="w-4 h-4 mr-2" />
                <span>All Songs</span>
              </div>
            </div>
          </div>
          
          <div>
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase">
              Playlists
            </div>
            <div className="flex flex-col space-y-1">
              {playlists.map(playlist => (
                <div 
                  key={playlist.id}
                  className={`flex items-center py-1 px-2 rounded text-sm cursor-pointer ${
                    selectedPlaylist === playlist.id ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/30'
                  }`}
                  onClick={() => setSelectedPlaylist(playlist.id)}
                >
                  <List className="w-4 h-4 mr-2" />
                  <span className="truncate">{playlist.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Song list and YouTube player */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* YouTube player - hidden but active for audio */}
          {showYoutubePlayer && currentSong && (
            <div className="flex items-center justify-center p-3 bg-red-500/5 border-b border-red-200/20">
              <div id="youtube-player" className="hidden"></div>
              <div className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                <span className="text-sm font-medium">Playing from YouTube Music</span>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <button
                  className="px-2 py-0.5 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-200/20 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    try {
                      if (playerRef.current) {
                        if (typeof playerRef.current.unMute === 'function') {
                          playerRef.current.unMute();
                        }
                        if (typeof playerRef.current.playVideo === 'function') {
                          playerRef.current.playVideo();
                        }
                        if (typeof playerRef.current.setVolume === 'function') {
                          playerRef.current.setVolume(volume);
                        }
                      }
                    } catch (error) {
                      console.error("Error refreshing audio:", error);
                    }
                    handleUserInteraction();
                  }}
                >
                  Unlock Audio
                </button>
              </div>
            </div>
          )}
          
          {/* Playlist header */}
          <div className="p-4 flex items-center">
            <div className="flex-shrink-0 mr-4">
              <div className="w-32 h-32 rounded-md bg-muted overflow-hidden">
                {currentPlaylist && currentPlaylist.coverArt ? (
                  <Image 
                    src={currentPlaylist.coverArt} 
                    alt={currentPlaylist.title} 
                    className="w-full h-full object-cover"
                    width={128}
                    height={128}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10">
                    <Music className="w-12 h-12 text-primary/50" />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold mb-1">{currentPlaylist?.title}</h1>
              <p className="text-sm text-muted-foreground mb-2">{currentPlaylist?.description}</p>
              <div className="flex items-center space-x-2">
                <button 
                  className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (playlistSongs.length > 0) {
                      playSong(playlistSongs[0]);
                    }
                    handleUserInteraction();
                  }}
                >
                  Play with YouTube Music
                </button>
                <button 
                  className="px-4 py-1.5 rounded-full bg-muted hover:bg-accent/40 text-sm font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (playlistSongs.length > 0) {
                      const randomIndex = Math.floor(Math.random() * playlistSongs.length);
                      playSong(playlistSongs[randomIndex]);
                      setIsShuffleOn(true);
                    }
                    handleUserInteraction();
                  }}
                >
                  Shuffle
                </button>
              </div>
            </div>
          </div>
          
          {/* Song table with loading state */}
          <div className="flex-1 overflow-y-auto px-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <span className="ml-2 text-muted-foreground">Loading songs from YouTube Music...</span>
              </div>
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
                    <tr 
                      key={song.id}
                      className={`border-b last:border-b-0 text-sm hover:bg-accent/10 cursor-pointer ${
                        currentSong?.id === song.id ? 'bg-accent/20' : ''
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        playSong(song);
                        handleUserInteraction();
                      }}
                    >
                      <td className="p-2 text-muted-foreground">
                        {currentSong?.id === song.id && isPlaying ? (
                          <div className="w-4 h-4 flex items-center justify-center">
                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                          </div>
                        ) : (
                          index + 1
                        )}
                      </td>
                      <td className="p-2">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded overflow-hidden mr-2">
                            <Image src={song.coverArt} alt={song.title} className="w-full h-full object-cover" width={32} height={32} />
                          </div>
                          <span className={currentSong?.id === song.id ? 'font-medium' : ''}>{song.title}</span>
                        </div>
                      </td>
                      <td className="p-2 text-muted-foreground">{song.artist}</td>
                      <td className="p-2 text-muted-foreground">{song.album}</td>
                      <td className="p-2 text-right text-muted-foreground">{formatTime(song.duration)}</td>
                      <td className="p-2">
                        <button 
                          onClick={(e) => toggleLike(song.id, e)}
                          className="p-1 rounded-full hover:bg-accent/30"
                        >
                          <Heart className={`w-4 h-4 ${song.liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                        </button>
                      </td>
                    </tr>
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
        </div>
      </div>
      
      {/* Playback controls */}
      <div className="border-t bg-muted/30 backdrop-blur-sm p-3 flex items-center">
        {currentSong ? (
          <>
            {/* Current song info */}
            <div className="flex items-center w-1/4">
              <div className="w-12 h-12 rounded overflow-hidden mr-3">
                <Image src={currentSong.coverArt} alt={currentSong.title} className="w-full h-full object-cover" width={48} height={48} />
              </div>
              <div className="truncate">
                <div className="font-medium text-sm truncate">{currentSong.title}</div>
                <div className="text-xs text-muted-foreground truncate">{currentSong.artist}</div>
              </div>
              <button className="ml-2 p-1 rounded-full hover:bg-accent/30">
                <Heart className={`w-4 h-4 ${currentSong.liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
              </button>
            </div>
            
            {/* Playback controls */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2 mb-1">
                <button 
                  className={`p-1.5 rounded-full hover:bg-accent/30 ${isShuffleOn ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleShuffle();
                    handleUserInteraction();
                  }}
                >
                  <Shuffle className="w-4 h-4" />
                </button>
                <button 
                  className="p-1.5 rounded-full hover:bg-accent/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSong();
                    handleUserInteraction();
                  }}
                >
                  <SkipBack className="w-5 h-5" />
                </button>
                <button 
                  className="p-1.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayback();
                    handleUserInteraction();
                  }}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button 
                  className="p-1.5 rounded-full hover:bg-accent/30"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSong();
                    handleUserInteraction();
                  }}
                >
                  <SkipForward className="w-5 h-5" />
                </button>
                <button 
                  className={`p-1.5 rounded-full hover:bg-accent/30 ${repeatMode !== 'off' ? 'text-primary' : 'text-muted-foreground'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleRepeat();
                    handleUserInteraction();
                  }}
                >
                  <Repeat className="w-4 h-4" />
                  {repeatMode === 'one' && <span className="absolute text-[8px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">1</span>}
                </button>
              </div>
              
              {/* Progress bar - controlled by YouTube API in this case */}
              <div className="w-full max-w-md flex items-center text-xs">
                <div className="flex-1 h-1 bg-muted rounded-full mx-2 overflow-hidden">
                  <div 
                    className="h-full bg-primary"
                    style={{ width: `${(currentTime / currentSong.duration) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Volume controls */}
            <div className="w-1/4 flex items-center justify-end">
              <button 
                className="p-1 rounded-full hover:bg-accent/30"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMuted(!isMuted);
                  if (playerRef.current) {
                    try {
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
                    } catch (error) {
                      console.error("Error toggling mute:", error);
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
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  const newVolume = parseInt(e.target.value);
                  setVolume(newVolume);
                  if (playerRef.current) {
                    try {
                      if (typeof playerRef.current.unMute === 'function') {
                        playerRef.current.unMute();
                      }
                      if (typeof playerRef.current.setVolume === 'function') {
                        playerRef.current.setVolume(newVolume);
                      }
                    } catch (error) {
                      console.error("Error setting volume:", error);
                    }
                  }
                  if (isMuted && newVolume > 0) {
                    setIsMuted(false);
                  }
                  handleUserInteraction();
                }}
                onClick={(e) => e.stopPropagation()}
                className="w-24 h-1 bg-muted rounded-full mx-2"
              />
            </div>
          </>
        ) : (
          <div className="w-full text-center text-muted-foreground text-sm">
            Select a romantic song to start playing. Audio powered by YouTube Music.
          </div>
        )}
      </div>
      
      {/* Add Song Modal */}
      {showAddSongModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={() => setShowAddSongModal(false)}
        >
          <div 
            className="bg-background rounded-lg shadow-xl p-6 w-[400px] max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Youtube className="w-5 h-5 text-red-500 mr-2" />
              Add YouTube Music Song
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">YouTube Music URL</label>
                <input
                  type="text"
                  value={newSongUrl}
                  onChange={(e) => setNewSongUrl(e.target.value)}
                  placeholder="https://music.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 border rounded-md bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Paste a YouTube Music URL (music.youtube.com)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Song Title (optional)</label>
                <input
                  type="text"
                  value={newSongTitle}
                  onChange={(e) => setNewSongTitle(e.target.value)}
                  placeholder="Enter song title"
                  className="w-full px-3 py-2 border rounded-md bg-muted"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Artist (optional)</label>
                <input
                  type="text"
                  value={newSongArtist}
                  onChange={(e) => setNewSongArtist(e.target.value)}
                  placeholder="Enter artist name"
                  className="w-full px-3 py-2 border rounded-md bg-muted"
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-2">
                <button
                  className="px-4 py-2 border rounded-md hover:bg-accent/30"
                  onClick={() => setShowAddSongModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
                  onClick={addCustomSong}
                >
                  Add Song
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 