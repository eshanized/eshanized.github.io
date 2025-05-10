"use client";

import { useState } from 'react';
import { Folder, File, ChevronRight, Search, Grid2X2, List, Image, Clock, Download, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';

// Define folder/file types
type Item = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: React.ElementType;
  size?: string;
  modified?: string;
  children?: Item[];
};

export default function FinderApp() {
  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
  // Mock file system structure
  const fileSystem: Item[] = [
    {
      id: 'desktop',
      name: 'Desktop',
      type: 'folder',
      icon: Folder,
      modified: 'Today',
      children: [
        {
          id: 'portfolio-screenshot',
          name: 'Portfolio Screenshot.png',
          type: 'file',
          icon: Image,
          size: '1.2 MB',
          modified: 'Today'
        },
        {
          id: 'resume',
          name: 'Resume.pdf',
          type: 'file',
          icon: File,
          size: '245 KB',
          modified: 'Yesterday'
        }
      ]
    },
    {
      id: 'documents',
      name: 'Documents',
      type: 'folder',
      icon: Folder,
      modified: 'Yesterday',
      children: [
        {
          id: 'projects',
          name: 'Projects',
          type: 'folder',
          icon: Folder,
          modified: 'Last week',
          children: [
            {
              id: 'project1',
              name: 'Project Plan.docx',
              type: 'file',
              icon: File,
              size: '56 KB',
              modified: 'Last week'
            },
            {
              id: 'project2',
              name: 'Budget.xlsx',
              type: 'file',
              icon: File,
              size: '102 KB',
              modified: 'Last week'
            }
          ]
        },
        {
          id: 'personal',
          name: 'Personal',
          type: 'folder',
          icon: Folder,
          modified: 'Last month'
        }
      ]
    },
    {
      id: 'downloads',
      name: 'Downloads',
      type: 'folder',
      icon: Download,
      modified: 'Yesterday',
      children: [
        {
          id: 'software',
          name: 'Software.dmg',
          type: 'file',
          icon: HardDrive,
          size: '145 MB',
          modified: 'Yesterday'
        }
      ]
    },
    {
      id: 'pictures',
      name: 'Pictures',
      type: 'folder',
      icon: Image,
      modified: 'Last week'
    },
    {
      id: 'music',
      name: 'Music',
      type: 'folder',
      icon: Folder,
      modified: 'Last month'
    }
  ];
  
  // Function to find current directory based on path
  const getCurrentItems = (): Item[] => {
    if (currentPath.length === 1) {
      return fileSystem;
    }
    
    let current: Item[] = fileSystem;
    // Skip 'Home' (index 0)
    for (let i = 1; i < currentPath.length; i++) {
      const folder = current.find(item => item.name === currentPath[i]);
      if (folder && folder.children) {
        current = folder.children;
      } else {
        return [];
      }
    }
    return current;
  };
  
  // Navigate to a folder
  const navigateToFolder = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
    setSelectedItem(null);
  };
  
  // Navigate up one level
  const navigateUp = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
      setSelectedItem(null);
    }
  };
  
  // Filter items based on search query
  const filteredItems = getCurrentItems().filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Toolbar */}
      <div className="border-b bg-muted/30 backdrop-blur-sm p-2 flex items-center">
        <div className="flex space-x-1">
          <button 
            onClick={navigateUp}
            disabled={currentPath.length <= 1}
            className="p-1 rounded hover:bg-accent/50 disabled:opacity-50"
          >
            <ChevronRight className="w-4 h-4 transform rotate-180" />
          </button>
        </div>
        
        <div className="mx-2 px-3 py-1 bg-muted rounded-md text-xs flex items-center flex-1">
          {currentPath.map((path, i) => (
            <div key={i} className="flex items-center">
              {i > 0 && <ChevronRight className="w-3 h-3 mx-1 text-muted-foreground" />}
              <span>{path}</span>
            </div>
          ))}
        </div>
        
        <div className="flex space-x-1">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1 rounded ${viewMode === 'grid' ? 'bg-accent/50' : 'hover:bg-accent/30'}`}
          >
            <Grid2X2 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1 rounded ${viewMode === 'list' ? 'bg-accent/50' : 'hover:bg-accent/30'}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Sidebar and Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r p-2 overflow-y-auto">
          <div className="text-xs text-muted-foreground uppercase mb-1 px-2">Favorites</div>
          {['Desktop', 'Documents', 'Downloads', 'Pictures', 'Music'].map(name => {
            const folder = fileSystem.find(item => item.name === name);
            if (!folder) return null;
            
            const Icon = folder.icon;
            return (
              <button 
                key={name}
                className={`w-full text-left p-2 rounded text-sm flex items-center space-x-2 ${
                  currentPath.includes(name) ? 'bg-accent/50' : 'hover:bg-accent/30'
                }`}
                onClick={() => setCurrentPath(['Home', name])}
              >
                <Icon className="w-4 h-4" />
                <span>{name}</span>
              </button>
            );
          })}
          
          <div className="text-xs text-muted-foreground uppercase mt-4 mb-1 px-2">Recent</div>
          <button className="w-full text-left p-2 rounded text-sm flex items-center space-x-2 hover:bg-accent/30">
            <Clock className="w-4 h-4" />
            <span>Recent Files</span>
          </button>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search bar */}
          <div className="p-2 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-muted rounded-md border border-input py-1 pl-8 pr-3 text-sm"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
          
          {/* Items */}
          <div className="flex-1 p-2 overflow-y-auto">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-4">
                {filteredItems.map(item => {
                  const ItemIcon = item.icon;
                  return (
                    <div 
                      key={item.id}
                      className={`p-2 rounded flex flex-col items-center justify-center cursor-pointer transition-colors ${
                        selectedItem === item.id ? 'bg-accent' : 'hover:bg-accent/30'
                      }`}
                      onClick={() => {
                        setSelectedItem(item.id);
                        if (item.type === 'folder' && item.children) {
                          navigateToFolder(item.name);
                        }
                      }}
                    >
                      <div className="w-16 h-16 flex items-center justify-center">
                        <ItemIcon className={`w-12 h-12 ${item.type === 'folder' ? 'text-blue-400' : 'text-gray-400'}`} />
                      </div>
                      <div className="mt-1 text-center">
                        <p className="text-xs truncate max-w-[90px]">{item.name}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex text-xs text-muted-foreground border-b py-1">
                  <div className="flex-1">Name</div>
                  <div className="w-24">Date Modified</div>
                  <div className="w-20">Size</div>
                  <div className="w-20">Kind</div>
                </div>
                {filteredItems.map(item => {
                  const ItemIcon = item.icon;
                  return (
                    <div 
                      key={item.id}
                      className={`flex items-center text-sm p-1 rounded ${
                        selectedItem === item.id ? 'bg-accent' : 'hover:bg-accent/30'
                      }`}
                      onClick={() => {
                        setSelectedItem(item.id);
                        if (item.type === 'folder' && item.children) {
                          navigateToFolder(item.name);
                        }
                      }}
                    >
                      <div className="flex-1 flex items-center">
                        <ItemIcon className={`w-4 h-4 mr-2 ${item.type === 'folder' ? 'text-blue-400' : 'text-gray-400'}`} />
                        {item.name}
                      </div>
                      <div className="w-24 text-xs text-muted-foreground">{item.modified || '-'}</div>
                      <div className="w-20 text-xs text-muted-foreground">{item.size || '-'}</div>
                      <div className="w-20 text-xs text-muted-foreground capitalize">{item.type}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {/* Status bar */}
          <div className="border-t py-1 px-3 text-xs text-muted-foreground flex justify-between">
            <div>{filteredItems.length} items</div>
            <div>64.7 GB available</div>
          </div>
        </div>
      </div>
    </div>
  );
} 