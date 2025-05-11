"use client";

import { useState } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  Image as LucideImage,
  Heart,
  Download,
  Share,
  MoreHorizontal,
  X,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Edit,
  Trash
} from 'lucide-react';
import { motion } from 'framer-motion';

// Photo type
type Photo = {
  id: string;
  url: string;
  title: string;
  date: Date;
  location?: string;
  people?: string[];
  favorite: boolean;
  album?: string;
};

// Album type
type Album = {
  id: string;
  title: string;
  coverPhoto: string;
  count: number;
  date: Date;
};

interface PhotosAppProps {
  specialUser?: string;
}

export default function PhotosApp({ specialUser }: PhotosAppProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedView, setSelectedView] = useState<'albums' | 'photos'>('albums');
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isViewingPhoto, setIsViewingPhoto] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const isSnigdha = specialUser === 'snigdha';
  
  // Sample albums
  const regularAlbums: Album[] = [
    {
      id: 'recent',
      title: 'Recents',
      coverPhoto: 'https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      count: 124,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      id: 'favorites',
      title: 'Favorites',
      coverPhoto: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      count: 42,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
      id: 'vacation',
      title: 'Vacation 2023',
      coverPhoto: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      count: 87,
      date: new Date(2023, 6, 15) // July 15, 2023
    },
    {
      id: 'work',
      title: 'Work Projects',
      coverPhoto: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      count: 34,
      date: new Date(2023, 5, 3) // June 3, 2023
    },
    {
      id: 'family',
      title: 'Family',
      coverPhoto: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      count: 56,
      date: new Date(2023, 4, 22) // May 22, 2023
    },
    {
      id: 'nature',
      title: 'Nature',
      coverPhoto: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      count: 68,
      date: new Date(2023, 3, 10) // April 10, 2023
    }
  ];
  
  // Romantic albums for special user
  const loveAlbums: Album[] = [
    {
      id: 'memories',
      title: 'Our Memories',
      coverPhoto: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      count: 48,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'dates',
      title: 'Special Dates',
      coverPhoto: 'https://images.pexels.com/photos/1024974/pexels-photo-1024974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      count: 36,
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'moments',
      title: 'Romantic Moments',
      coverPhoto: 'https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      count: 52,
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'future',
      title: 'Our Future',
      coverPhoto: 'https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      count: 24,
      date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    }
  ];
  
  // Regular photos
  const regularPhotos: Photo[] = [
    {
      id: 'p1',
      url: 'https://images.pexels.com/photos/1172253/pexels-photo-1172253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Sunset at the beach',
      date: new Date(2023, 6, 15),
      location: 'Maldives',
      favorite: true,
      album: 'vacation'
    },
    {
      id: 'p2',
      url: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Mountain view',
      date: new Date(2023, 6, 14),
      location: 'Swiss Alps',
      favorite: true,
      album: 'vacation'
    },
    {
      id: 'p3',
      url: 'https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Forest path',
      date: new Date(2023, 3, 10),
      location: 'Black Forest',
      favorite: false,
      album: 'nature'
    },
    {
      id: 'p4',
      url: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Team meeting',
      date: new Date(2023, 5, 3),
      people: ['John', 'Sarah', 'Mike'],
      favorite: false,
      album: 'work'
    },
    {
      id: 'p5',
      url: 'https://images.pexels.com/photos/1128318/pexels-photo-1128318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Family picnic',
      date: new Date(2023, 4, 22),
      people: ['Mom', 'Dad', 'Sister', 'Brother'],
      location: 'Central Park',
      favorite: true,
      album: 'family'
    },
    {
      id: 'p6',
      url: 'https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'City skyline',
      date: new Date(2023, 7, 5),
      location: 'New York',
      favorite: true,
      album: 'recent'
    },
    {
      id: 'p7',
      url: 'https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Autumn leaves',
      date: new Date(2023, 9, 10), // Oct 10
      location: 'Vermont',
      favorite: false,
      album: 'nature'
    },
    {
      id: 'p8',
      url: 'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Office desk',
      date: new Date(2023, 5, 7),
      favorite: false,
      album: 'work'
    },
  ];
  
  // Romantic photos for special user
  const lovePhotos: Photo[] = [
    {
      id: 'l1',
      url: 'https://images.pexels.com/photos/1415131/pexels-photo-1415131.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'First date picnic',
      date: new Date(2023, 1, 14), // Valentine's Day
      location: 'Central Park',
      people: ['You', 'Me'],
      favorite: true,
      album: 'memories'
    },
    {
      id: 'l2',
      url: 'https://images.pexels.com/photos/1024974/pexels-photo-1024974.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Candlelight dinner',
      date: new Date(2023, 3, 20),
      location: 'La Belle Restaurant',
      people: ['You', 'Me'],
      favorite: true,
      album: 'dates'
    },
    {
      id: 'l3',
      url: 'https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Sunset by the beach',
      date: new Date(2023, 6, 8),
      location: 'Malibu Beach',
      people: ['You', 'Me'],
      favorite: true,
      album: 'moments'
    },
    {
      id: 'l4',
      url: 'https://images.pexels.com/photos/2788488/pexels-photo-2788488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Our dream home sketch',
      date: new Date(2023, 8, 15),
      favorite: true,
      album: 'future'
    },
    {
      id: 'l5',
      url: 'https://images.pexels.com/photos/1723637/pexels-photo-1723637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Dancing under the stars',
      date: new Date(2023, 5, 22),
      location: 'City Rooftop',
      people: ['You', 'Me'],
      favorite: true,
      album: 'moments'
    },
    {
      id: 'l6',
      url: 'https://images.pexels.com/photos/935789/pexels-photo-935789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Coffee shop reading',
      date: new Date(2023, 2, 18),
      location: 'Coastal Books & Coffee',
      people: ['You', 'Me'],
      favorite: true,
      album: 'memories'
    },
    {
      id: 'l7',
      url: 'https://images.pexels.com/photos/1386604/pexels-photo-1386604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Anniversary dinner',
      date: new Date(2023, 1, 14),
      location: 'Starlight Restaurant',
      people: ['You', 'Me'],
      favorite: true,
      album: 'dates'
    },
    {
      id: 'l8',
      url: 'https://images.pexels.com/photos/3651820/pexels-photo-3651820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      title: 'Our future wedding venue',
      date: new Date(2023, 9, 5),
      location: 'Hillside Gardens',
      favorite: true,
      album: 'future'
    }
  ];
  
  // Use the appropriate data based on specialUser status
  const albums = isSnigdha ? loveAlbums : regularAlbums;
  const photos = isSnigdha ? lovePhotos : regularPhotos;
  
  // Filter photos based on search query and selected album
  const getFilteredPhotos = () => {
    let filtered = photos;
    
    // Filter by album
    if (selectedAlbum) {
      if (selectedAlbum === 'favorites') {
        filtered = filtered.filter(photo => photo.favorite);
      } else if (selectedAlbum === 'recent') {
        // Show all but sort by date
        filtered = [...filtered].sort((a, b) => b.date.getTime() - a.date.getTime());
      } else {
        filtered = filtered.filter(photo => photo.album === selectedAlbum);
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(photo => 
        photo.title.toLowerCase().includes(query) ||
        photo.location?.toLowerCase().includes(query) ||
        photo.people?.some(person => person.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };
  
  const filteredPhotos = getFilteredPhotos();
  
  // Format date for display
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Get active photo
  const activePhoto = photos.find(photo => photo.id === selectedPhoto);
  
  // Toggle favorite status
  const toggleFavorite = (id: string, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    // In a real app, would update the favorite status in the database
  };
  
  // Navigation between photos
  const nextPhoto = () => {
    if (!selectedPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex].id);
  };
  
  const prevPhoto = () => {
    if (!selectedPhoto) return;
    
    const currentIndex = filteredPhotos.findIndex(photo => photo.id === selectedPhoto);
    const prevIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    setSelectedPhoto(filteredPhotos[prevIndex].id);
  };
  
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Top bar */}
      <div className="border-b bg-muted/30 backdrop-blur-sm p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          {selectedAlbum && (
            <button 
              className="p-1.5 rounded-full hover:bg-accent/30 text-sm flex items-center"
              onClick={() => {
                setSelectedAlbum(null);
                setSelectedView('albums');
              }}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Albums
            </button>
          )}
          
          {isViewingPhoto && (
            <button 
              className="p-1.5 rounded-full hover:bg-accent/30 text-sm flex items-center"
              onClick={() => {
                setIsViewingPhoto(false);
                setSelectedPhoto(null);
              }}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Gallery
            </button>
          )}
          
          <div className="relative ml-2">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-muted rounded-full pl-8 pr-3 py-1.5 text-sm"
            />
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {!isViewingPhoto && selectedView === 'photos' && (
            <div className="bg-muted rounded-full p-0.5 flex">
              <button 
                className={`p-1.5 rounded-full ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-accent/30'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button 
                className={`p-1.5 rounded-full ${viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-accent/30'}`}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          )}
          
          <button className="p-1.5 rounded-full hover:bg-accent/30">
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {isViewingPhoto ? (
          // Photo viewer
          <div className="h-full flex flex-col">
            {/* Photo display */}
            <div className="flex-1 relative bg-black flex items-center justify-center">
              {activePhoto && (
                <Image 
                  src={activePhoto.url} 
                  alt={activePhoto.title}
                  className="max-h-full max-w-full object-contain"
                  width={800}
                  height={600}
                />
              )}
              
              {/* Navigation controls */}
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/30 hover:bg-background/50"
                onClick={prevPhoto}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/30 hover:bg-background/50"
                onClick={nextPhoto}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
              
              {/* Close button */}
              <button 
                className="absolute top-4 right-4 p-2 rounded-full bg-background/30 hover:bg-background/50"
                onClick={() => {
                  setIsViewingPhoto(false);
                  setSelectedPhoto(null);
                }}
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            {/* Photo info */}
            {activePhoto && (
              <div className="p-4 border-t flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-medium">{activePhoto.title}</h2>
                  <p className="text-sm text-muted-foreground">{formatDate(activePhoto.date)}</p>
                  {activePhoto.location && (
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      <span>{activePhoto.location}</span>
                    </div>
                  )}
                  {activePhoto.people && activePhoto.people.length > 0 && (
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Users className="w-3.5 h-3.5 mr-1" />
                      <span>{activePhoto.people.join(', ')}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-1">
                  <button 
                    className="p-1.5 rounded-full hover:bg-accent/30"
                    onClick={() => toggleFavorite(activePhoto.id)}
                  >
                    <Heart className={`w-5 h-5 ${activePhoto.favorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-accent/30">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-accent/30">
                    <Share className="w-5 h-5" />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-accent/30">
                    <Download className="w-5 h-5" />
                  </button>
                  <button className="p-1.5 rounded-full hover:bg-accent/30 text-red-500">
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : selectedView === 'albums' ? (
          // Albums view
          <div className="h-full p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">Albums</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {albums.map(album => (
                <div 
                  key={album.id}
                  className="rounded-lg overflow-hidden bg-muted/30 hover:bg-accent/10 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedAlbum(album.id);
                    setSelectedView('photos');
                  }}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image 
                      src={album.coverPhoto} 
                      alt={album.title}
                      className="w-full h-full object-cover"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">{album.title}</h3>
                    <p className="text-sm text-muted-foreground flex justify-between">
                      <span>{album.count} photos</span>
                      <span>{album.date.getFullYear()}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Photos view (inside an album)
          <div className="h-full">
            {viewMode === 'grid' ? (
              // Grid view
              <div className="p-6 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-1">
                  {selectedAlbum ? albums.find(a => a.id === selectedAlbum)?.title : 'All Photos'}
                </h1>
                <p className="text-muted-foreground text-sm mb-6">
                  {filteredPhotos.length} photos
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {filteredPhotos.map(photo => (
                    <div 
                      key={photo.id}
                      className="aspect-square relative rounded-md overflow-hidden group cursor-pointer"
                      onClick={() => {
                        setSelectedPhoto(photo.id);
                        setIsViewingPhoto(true);
                      }}
                    >
                      <Image 
                        src={photo.url} 
                        alt={photo.title}
                        className="w-full h-full object-cover"
                        width={300}
                        height={300}
                      />
                      
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                        <div className="p-3 w-full flex justify-between items-center">
                          <div className="text-white">
                            <h3 className="font-medium text-sm truncate">{photo.title}</h3>
                            <p className="text-xs text-white/70">{formatDate(photo.date)}</p>
                          </div>
                          <button 
                            className="p-1.5 rounded-full hover:bg-white/20"
                            onClick={(e) => toggleFavorite(photo.id, e)}
                          >
                            <Heart className={`w-5 h-5 ${photo.favorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // List view
              <div className="h-full overflow-y-auto">
                <div className="sticky top-0 bg-background p-4 border-b">
                  <h1 className="text-2xl font-bold">
                    {selectedAlbum ? albums.find(a => a.id === selectedAlbum)?.title : 'All Photos'}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {filteredPhotos.length} photos
                  </p>
                </div>
                
                <div className="divide-y">
                  {filteredPhotos.map(photo => (
                    <div 
                      key={photo.id}
                      className="flex py-2 px-4 hover:bg-accent/10 cursor-pointer"
                      onClick={() => {
                        setSelectedPhoto(photo.id);
                        setIsViewingPhoto(true);
                      }}
                    >
                      <div className="w-16 h-16 rounded overflow-hidden mr-4">
                        <Image 
                          src={photo.url} 
                          alt={photo.title}
                          className="w-full h-full object-cover"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{photo.title}</h3>
                        <p className="text-sm text-muted-foreground">{formatDate(photo.date)}</p>
                        {photo.location && (
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5 mr-1" />
                            <span>{photo.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <button 
                          className="p-1.5 rounded-full hover:bg-accent/30"
                          onClick={(e) => toggleFavorite(photo.id, e)}
                        >
                          <Heart className={`w-5 h-5 ${photo.favorite ? 'fill-red-500 text-red-500' : ''}`} />
                        </button>
                        <button className="p-1.5 rounded-full hover:bg-accent/30">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 