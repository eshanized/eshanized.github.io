"use client";

import { useState, useEffect } from 'react';
import { 
  Folder, File, ChevronRight, Search, 
  Grid2X2, List, Image, Clock, Download, 
  HardDrive, Home, Star, Trash2, Cloud,
  Share2, Settings, Plus, MoreHorizontal,
  FolderOpen, FileText, Music, Video,
  Code, Archive
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area";

// Define folder/file types with enhanced metadata
type Item = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  icon: React.ElementType;
  size?: string;
  modified?: string;
  category?: 'document' | 'image' | 'video' | 'music' | 'code' | 'archive';
  favorite?: boolean;
  shared?: boolean;
  children?: Item[];
};

export default function Files() {
  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Enhanced file system structure
  const fileSystem: Item[] = [
    {
      id: 'documents',
      name: 'Documents',
      type: 'folder',
      icon: FileText,
      modified: 'Today',
      category: 'document',
      children: [
        {
          id: 'project-docs',
          name: 'Project Documentation',
          type: 'folder',
          icon: FolderOpen,
          modified: 'Today',
          children: [
            {
              id: 'architecture',
              name: 'Architecture.md',
              type: 'file',
              icon: FileText,
              size: '128 KB',
              modified: '2 hours ago',
              category: 'document'
            }
          ]
        }
      ]
    },
    {
      id: 'code',
      name: 'Development',
      type: 'folder',
      icon: Code,
      modified: 'Yesterday',
      category: 'code',
      favorite: true,
      children: [
        {
          id: 'src',
          name: 'Source Code',
          type: 'folder',
          icon: Code,
          modified: 'Yesterday',
          children: [
            {
              id: 'main',
              name: 'main.ts',
              type: 'file',
              icon: Code,
              size: '45 KB',
              modified: 'Yesterday',
              category: 'code'
            }
          ]
        }
      ]
    },
    {
      id: 'media',
      name: 'Media',
      type: 'folder',
      icon: Image,
      modified: 'Last week',
      shared: true,
      children: [
        {
          id: 'photos',
          name: 'Photos',
          type: 'folder',
          icon: Image,
          modified: 'Last week',
          category: 'image'
        },
        {
          id: 'videos',
          name: 'Videos',
          type: 'folder',
          icon: Video,
          modified: 'Last week',
          category: 'video'
        },
        {
          id: 'music',
          name: 'Music',
          type: 'folder',
          icon: Music,
          modified: 'Last week',
          category: 'music'
        }
      ]
    }
  ];

  // Quick access categories
  const categories = [
    { id: 'recent', name: 'Recent', icon: Clock },
    { id: 'favorites', name: 'Favorites', icon: Star },
    { id: 'shared', name: 'Shared', icon: Share2 },
    { id: 'cloud', name: 'Cloud', icon: Cloud },
    { id: 'trash', name: 'Trash', icon: Trash2 }
  ];

  // Get current directory items
  const getCurrentItems = (): Item[] => {
    if (currentPath.length === 1) return fileSystem;
    
    let current: Item[] = fileSystem;
    for (let i = 1; i < currentPath.length; i++) {
      const folder = current.find(item => item.name === currentPath[i]);
      if (folder?.children) {
        current = folder.children;
      } else {
        return [];
      }
    }
    return current;
  };

  // Filter items based on search and category
  const filteredItems = getCurrentItems().filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !activeCategory || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Modern header with search and actions */}
      <motion.div 
        className="p-4 border-b bg-background/50 backdrop-blur-xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Files</h1>
            <div className="flex gap-1">
              {currentPath.map((path, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && <ChevronRight className="w-4 h-4 mx-1 text-muted-foreground" />}
                  <button 
                    className="px-2 py-1 rounded-lg hover:bg-accent/30 text-sm"
                    onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}
                  >
                    {path}
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-accent/30">
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-accent/30">
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-accent/30">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted/50 rounded-xl border border-input/50 py-2 pl-10 pr-4 text-sm"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          </div>
          
          <div className="flex gap-1 bg-muted/50 rounded-xl p-1">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
            >
              <Grid2X2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-background shadow-sm' : 'hover:bg-background/50'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="flex-1 flex min-h-0">
        {/* Modern sidebar with categories */}
        <motion.div 
          className={`border-r bg-muted/10 backdrop-blur-sm ${sidebarCollapsed ? 'w-16' : 'w-64'}`}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <ScrollArea className="h-full">
            <div className="p-3">
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all
                      ${activeCategory === category.id ? 'bg-accent shadow-sm' : 'hover:bg-accent/30'}`}
                    onClick={() => setActiveCategory(category.id === activeCategory ? null : category.id)}
                  >
                    <category.icon className="w-5 h-5" />
                    {!sidebarCollapsed && <span>{category.name}</span>}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="text-xs text-muted-foreground mb-2 px-2">
                  {!sidebarCollapsed && 'LOCATIONS'}
                </div>
                {fileSystem.map(item => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 p-2 rounded-xl transition-all
                      ${currentPath.includes(item.name) ? 'bg-accent shadow-sm' : 'hover:bg-accent/30'}`}
                    onClick={() => setCurrentPath(['Home', item.name])}
                  >
                    <item.icon className="w-5 h-5" />
                    {!sidebarCollapsed && (
                      <div className="flex-1 flex items-center justify-between">
                        <span>{item.name}</span>
                        {item.shared && <Share2 className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </motion.div>

        {/* Main content area */}
        <div className="flex-1 min-h-0">
          <ScrollArea className="h-full">
            <AnimatePresence mode="wait">
              <motion.div 
                key={viewMode + currentPath.join('/')}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="p-4"
              >
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
                    {filteredItems.map(item => (
                      <motion.div
                        key={item.id}
                        layoutId={item.id}
                        className={`group relative p-4 rounded-xl border border-transparent transition-all cursor-pointer
                          ${selectedItem === item.id ? 'bg-accent border-accent shadow-lg' : 'hover:bg-accent/30 hover:border-accent/30'}`}
                        onClick={() => {
                          setSelectedItem(item.id);
                          if (item.type === 'folder') {
                            setCurrentPath([...currentPath, item.name]);
                          }
                        }}
                      >
                        <div className="aspect-square rounded-xl bg-background/50 backdrop-blur-sm p-4 mb-3 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <item.icon className={`w-12 h-12 ${
                            item.type === 'folder' ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        
                        <div className="space-y-1">
                          <div className="font-medium truncate">{item.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {item.modified}
                            {item.size && ` • ${item.size}`}
                          </div>
                        </div>

                        {/* Quick actions overlay */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex gap-1">
                            {item.favorite && (
                              <div className="p-1.5 rounded-full bg-background/50 backdrop-blur-sm">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                              </div>
                            )}
                            {item.shared && (
                              <div className="p-1.5 rounded-full bg-background/50 backdrop-blur-sm">
                                <Share2 className="w-4 h-4 text-primary" />
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border bg-background/50 backdrop-blur-sm overflow-hidden">
                    <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-2 text-sm font-medium text-muted-foreground border-b">
                      <div className="w-8"></div>
                      <div>Name</div>
                      <div className="w-32">Modified</div>
                      <div className="w-24">Size</div>
                      <div className="w-8"></div>
                    </div>
                    
                    {filteredItems.map(item => (
                      <motion.div
                        key={item.id}
                        layoutId={item.id}
                        className={`grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 p-2 items-center text-sm
                          ${selectedItem === item.id ? 'bg-accent' : 'hover:bg-accent/30'}`}
                        onClick={() => {
                          setSelectedItem(item.id);
                          if (item.type === 'folder') {
                            setCurrentPath([...currentPath, item.name]);
                          }
                        }}
                      >
                        <div className="w-8 flex justify-center">
                          <item.icon className={`w-5 h-5 ${
                            item.type === 'folder' ? 'text-primary' : 'text-muted-foreground'
                          }`} />
                        </div>
                        <div className="font-medium">{item.name}</div>
                        <div className="w-32 text-muted-foreground">{item.modified}</div>
                        <div className="w-24 text-muted-foreground">{item.size || '--'}</div>
                        <div className="w-8 flex justify-center">
                          {(item.favorite || item.shared) && (
                            <div className="flex gap-1">
                              {item.favorite && <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />}
                              {item.shared && <Share2 className="w-4 h-4 text-primary" />}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </ScrollArea>
        </div>
      </div>

      {/* Status bar */}
      <motion.div 
        className="border-t py-2 px-4 text-sm text-muted-foreground flex justify-between items-center bg-background/50 backdrop-blur-xl"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-4">
          <span>{filteredItems.length} items</span>
          <span>|</span>
          <span>64.7 GB available</span>
        </div>
        <button 
          className="p-1 rounded-lg hover:bg-accent/30"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          <ChevronRight className={`w-5 h-5 transition-transform ${sidebarCollapsed ? 'rotate-0' : 'rotate-180'}`} />
        </button>
      </motion.div>
    </div>
  );
} 