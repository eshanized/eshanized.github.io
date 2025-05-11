"use client";

import { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Car,
  Bus,
  ChevronRight,
  Home,
  Building,
  Heart,
  History,
  Plus,
  MinusCircle,
  PlusCircle,
  X,
  Compass,
  Map,
  Layers,
  Star,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';

// Location type
type Location = {
  id: string;
  name: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  category: 'restaurant' | 'hotel' | 'attraction' | 'shop' | 'other';
  favorite: boolean;
};

// Saved place type
type SavedPlace = {
  id: string;
  name: string;
  address: string;
  icon: 'home' | 'work' | 'favorite' | 'custom';
};

export default function MapsApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [showSearchPanel, setShowSearchPanel] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'transit'>('standard');
  const [zoomLevel, setZoomLevel] = useState(12);
  const [origin, setOrigin] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [transportMode, setTransportMode] = useState<'driving' | 'walking' | 'transit'>('driving');
  
  // Sample saved places
  const savedPlaces: SavedPlace[] = [
    {
      id: 'home',
      name: 'Home',
      address: '123 Main Street, Anytown, USA',
      icon: 'home'
    },
    {
      id: 'work',
      name: 'Work',
      address: '456 Corporate Avenue, Business City, USA',
      icon: 'work'
    },
    {
      id: 'gym',
      name: 'Gym',
      address: '789 Fitness Road, Active City, USA',
      icon: 'favorite'
    }
  ];
  
  // Sample locations (would be fetched from an API in a real app)
  const locations: Location[] = [
    {
      id: 'l1',
      name: 'Central Park',
      description: 'Urban park in New York City',
      address: 'Central Park, New York, NY, USA',
      coordinates: {
        lat: 40.7812,
        lng: -73.9665
      },
      category: 'attraction',
      favorite: true
    },
    {
      id: 'l2',
      name: 'Empire State Building',
      description: 'Iconic 102-story skyscraper',
      address: '20 W 34th St, New York, NY 10001, USA',
      coordinates: {
        lat: 40.7484,
        lng: -73.9857
      },
      category: 'attraction',
      favorite: false
    },
    {
      id: 'l3',
      name: 'Eleven Madison Park',
      description: 'Fine dining restaurant in Manhattan',
      address: '11 Madison Ave, New York, NY 10010, USA',
      coordinates: {
        lat: 40.7416,
        lng: -73.9872
      },
      category: 'restaurant',
      favorite: true
    },
    {
      id: 'l4',
      name: 'The Plaza Hotel',
      description: 'Historic luxury hotel',
      address: '768 5th Ave, New York, NY 10019, USA',
      coordinates: {
        lat: 40.7645,
        lng: -73.9743
      },
      category: 'hotel',
      favorite: false
    },
    {
      id: 'l5',
      name: 'SoHo Shopping District',
      description: 'Trendy shopping area',
      address: 'SoHo, New York, NY, USA',
      coordinates: {
        lat: 40.7235,
        lng: -74.0007
      },
      category: 'shop',
      favorite: false
    }
  ];
  
  // Simulated search that would normally call an API
  const handleSearch = (query: string) => {
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }
    
    const results = locations.filter(
      location => 
        location.name.toLowerCase().includes(query.toLowerCase()) ||
        location.address.toLowerCase().includes(query.toLowerCase()) ||
        location.description.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
    setShowSearchPanel(true);
  };
  
  // Toggle location as favorite
  const toggleFavorite = (id: string) => {
    // In a real app, would update the database
    console.log(`Toggling favorite for location ${id}`);
  };
  
  // Start navigation to a location
  const startNavigation = (location: Location) => {
    setDestination(location.name);
    setOrigin('Current Location');
    setShowDirections(true);
    setSelectedLocation(null);
  };
  
  // Show location details
  const viewLocationDetails = (location: Location) => {
    setSelectedLocation(location);
    setShowSearchPanel(false);
  };
  
  // Handle zoom controls
  const zoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 1, 20));
  };
  
  const zoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 1, 1));
  };
  
  // Sample route data (would be fetched from an API in a real app)
  const routeInfo = {
    distance: '5.7 mi',
    duration: '23 min',
    steps: [
      {
        instruction: 'Head northwest on Current Location',
        distance: '0.2 mi',
        duration: '1 min'
      },
      {
        instruction: 'Turn right onto Main Street',
        distance: '1.5 mi',
        duration: '7 min'
      },
      {
        instruction: 'Turn left onto Broadway',
        distance: '2.3 mi',
        duration: '9 min'
      },
      {
        instruction: 'Continue onto 5th Avenue',
        distance: '1.7 mi',
        duration: '6 min'
      }
    ]
  };
  
  return (
    <div className="h-full flex flex-col bg-background relative">
      {/* Map container (in a real app, would be a real map component) */}
      <div className="flex-1 bg-muted relative overflow-hidden">
        {/* Simulated map view */}
        <div 
          className={`w-full h-full ${
            mapType === 'standard' ? 'bg-[#e5e7eb]' : 
            mapType === 'satellite' ? 'bg-[#333c44]' : 
            'bg-[#d3e0ea]'
          }`}
        >
          {/* Simple map visualization */}
          <div className="absolute inset-0 flex items-center justify-center">
            {!showDirections ? (
              <div className="text-muted-foreground text-center">
                <Map className="w-16 h-16 mx-auto mb-2 opacity-20" />
                <p className="text-lg font-medium">Map View</p>
                <p className="text-sm">
                  {mapType === 'standard' ? 'Standard Map' : 
                   mapType === 'satellite' ? 'Satellite Imagery' : 
                   'Transit Map'}
                </p>
                <p className="text-xs mt-4">Zoom Level: {zoomLevel}</p>
              </div>
            ) : (
              <div className="w-full h-full relative">
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <Navigation className="w-16 h-16 text-primary/20" />
                </div>
                {/* Direction path visualization */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2">
                  <div className="w-full h-1 bg-primary/50 absolute top-1/2"></div>
                  <div className="w-3 h-3 rounded-full bg-primary absolute left-0 top-1/2 -translate-y-1/2"></div>
                  <div className="w-3 h-3 rounded-full bg-primary absolute right-0 top-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            )}
          </div>
          
          {/* Indicate selected location with a pin if applicable */}
          {selectedLocation && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs mb-1">
                {selectedLocation.name}
              </div>
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          )}
        </div>
      
        {/* Map controls */}
        <div className="absolute right-4 bottom-24 flex flex-col space-y-2">
          <button 
            className="w-10 h-10 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-accent/30"
            onClick={zoomIn}
          >
            <PlusCircle className="w-6 h-6" />
          </button>
          <button 
            className="w-10 h-10 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-accent/30"
            onClick={zoomOut}
          >
            <MinusCircle className="w-6 h-6" />
          </button>
          <button 
            className="w-10 h-10 bg-background rounded-full shadow-lg flex items-center justify-center hover:bg-accent/30"
            onClick={() => {
              // Reset map view
              setSelectedLocation(null);
              setShowDirections(false);
            }}
          >
            <Compass className="w-6 h-6" />
          </button>
        </div>
        
        {/* Layer selector */}
        <div className="absolute left-4 bottom-24 flex flex-col bg-background rounded-lg shadow-lg overflow-hidden">
          <button 
            className={`px-3 py-2 text-sm ${mapType === 'standard' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'}`}
            onClick={() => setMapType('standard')}
          >
            Standard
          </button>
          <button 
            className={`px-3 py-2 text-sm ${mapType === 'satellite' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'}`}
            onClick={() => setMapType('satellite')}
          >
            Satellite
          </button>
          <button 
            className={`px-3 py-2 text-sm ${mapType === 'transit' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/30'}`}
            onClick={() => setMapType('transit')}
          >
            Transit
          </button>
        </div>
      </div>
      
      {/* Search bar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-lg px-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a place or address"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            className="w-full bg-background rounded-full pl-10 pr-4 py-2 shadow-lg text-sm focus-visible:ring-1 focus-visible:ring-primary"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          {searchQuery && (
            <button 
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              onClick={() => {
                setSearchQuery('');
                setSearchResults([]);
                setShowSearchPanel(false);
              }}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Search results panel */}
        {showSearchPanel && searchResults.length > 0 && (
          <div className="mt-2 bg-background rounded-lg shadow-lg max-h-[60vh] overflow-y-auto">
            {searchResults.map(result => (
              <div 
                key={result.id}
                className="p-3 border-b last:border-b-0 hover:bg-accent/10 cursor-pointer"
                onClick={() => viewLocationDetails(result)}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium">{result.name}</h3>
                  <button 
                    className="p-1 rounded-full hover:bg-accent/30"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(result.id);
                    }}
                  >
                    <Heart className={`w-4 h-4 ${result.favorite ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>
                </div>
                <p className="text-sm text-muted-foreground">{result.address}</p>
                <p className="text-xs text-muted-foreground mt-1">{result.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Location info panel - shown when a location is selected */}
      {selectedLocation && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl shadow-lg max-h-[50vh] overflow-y-auto"
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="p-4">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4"></div>
            
            <div className="mb-4 flex justify-between items-start">
              <div>
                <h2 className="text-xl font-bold">{selectedLocation.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedLocation.category.charAt(0).toUpperCase() + selectedLocation.category.slice(1)}</p>
              </div>
              <button 
                className="p-1.5 rounded-full hover:bg-accent/30"
                onClick={() => toggleFavorite(selectedLocation.id)}
              >
                <Heart className={`w-5 h-5 ${selectedLocation.favorite ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
            
            <p className="text-muted-foreground mb-4">{selectedLocation.description}</p>
            
            <div className="flex items-center mb-4">
              <MapPin className="w-4 h-4 text-muted-foreground mr-2" />
              <p className="text-sm">{selectedLocation.address}</p>
            </div>
            
            <div className="flex space-x-2 mb-4">
              <button 
                className="flex-1 bg-primary text-primary-foreground py-2 rounded-md flex items-center justify-center"
                onClick={() => startNavigation(selectedLocation)}
              >
                <Navigation className="w-4 h-4 mr-1" />
                Directions
              </button>
              <button className="flex-1 bg-muted py-2 rounded-md flex items-center justify-center">
                <Info className="w-4 h-4 mr-1" />
                More Info
              </button>
            </div>
            
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium mb-2">Information</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted/50 p-3 rounded-md">
                  <h4 className="text-xs text-muted-foreground">COORDINATES</h4>
                  <p className="text-sm">
                    {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                  </p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md">
                  <h4 className="text-xs text-muted-foreground">CATEGORY</h4>
                  <p className="text-sm capitalize">{selectedLocation.category}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Directions panel */}
      {showDirections && (
        <motion.div 
          className="absolute bottom-0 left-0 right-0 bg-background rounded-t-2xl shadow-lg max-h-[70vh] overflow-y-auto"
          initial={{ y: 300 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <div className="p-4">
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4"></div>
            
            <div className="mb-4">
              <h2 className="text-xl font-bold">Directions</h2>
              <div className="flex items-center justify-between mt-2">
                <div className="flex-1">
                  <div className="bg-primary/10 rounded-md p-2 flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                    <input 
                      type="text" 
                      value={origin || ''}
                      onChange={(e) => setOrigin(e.target.value)}
                      placeholder="Starting point"
                      className="w-full bg-transparent border-none outline-none text-sm"
                    />
                  </div>
                </div>
                
                <div className="px-2">
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
                
                <div className="flex-1">
                  <div className="bg-primary/10 rounded-md p-2 flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <input 
                      type="text" 
                      value={destination || ''}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Destination"
                      className="w-full bg-transparent border-none outline-none text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Transport mode selector */}
            <div className="flex justify-between bg-muted rounded-lg p-1 mb-4">
              <button 
                className={`flex-1 py-1.5 rounded-md flex items-center justify-center text-sm ${
                  transportMode === 'driving' ? 'bg-background shadow-sm' : ''
                }`}
                onClick={() => setTransportMode('driving')}
              >
                <Car className="w-4 h-4 mr-1" />
                Drive
              </button>
              <button 
                className={`flex-1 py-1.5 rounded-md flex items-center justify-center text-sm ${
                  transportMode === 'walking' ? 'bg-background shadow-sm' : ''
                }`}
                onClick={() => setTransportMode('walking')}
              >
                <Navigation className="w-4 h-4 mr-1" />
                Walk
              </button>
              <button 
                className={`flex-1 py-1.5 rounded-md flex items-center justify-center text-sm ${
                  transportMode === 'transit' ? 'bg-background shadow-sm' : ''
                }`}
                onClick={() => setTransportMode('transit')}
              >
                <Bus className="w-4 h-4 mr-1" />
                Transit
              </button>
            </div>
            
            {/* Route information */}
            <div className="mb-4 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{routeInfo.duration}</h3>
                <p className="text-sm text-muted-foreground">{routeInfo.distance}</p>
              </div>
              <button className="bg-primary text-primary-foreground py-2 px-4 rounded-md text-sm">
                Start
              </button>
            </div>
            
            {/* Turn by turn directions */}
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium mb-2">Turn-by-turn directions</h3>
              <div className="space-y-3">
                {routeInfo.steps.map((step, index) => (
                  <div key={index} className="flex">
                    <div className="mr-3 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs">
                        {index + 1}
                      </div>
                      {index < routeInfo.steps.length - 1 && (
                        <div className="w-px h-full bg-muted-foreground/20 my-1"></div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm">{step.instruction}</p>
                      <p className="text-xs text-muted-foreground">{step.distance} • {step.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Bottom toolbar with saved locations */}
      {!showDirections && !selectedLocation && (
        <div className="p-3 border-t bg-background">
          <h3 className="font-medium text-sm mb-2">Favorites</h3>
          <div className="flex overflow-x-auto space-x-2 pb-2 hide-scrollbar">
            {savedPlaces.map(place => (
              <div 
                key={place.id}
                className="flex-shrink-0 flex flex-col items-center p-2 hover:bg-accent/10 rounded-md cursor-pointer"
                onClick={() => {
                  setSearchQuery(place.name);
                  handleSearch(place.name);
                }}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                  {place.icon === 'home' && <Home className="w-5 h-5 text-primary" />}
                  {place.icon === 'work' && <Building className="w-5 h-5 text-primary" />}
                  {place.icon === 'favorite' && <Heart className="w-5 h-5 text-primary" />}
                  {place.icon === 'custom' && <Star className="w-5 h-5 text-primary" />}
                </div>
                <span className="text-xs">{place.name}</span>
              </div>
            ))}
            
            <div className="flex-shrink-0 flex flex-col items-center p-2 hover:bg-accent/10 rounded-md cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-1">
                <Plus className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-xs">Add</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 