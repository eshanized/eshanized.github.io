"use client";

import { useState, useEffect } from 'react';
import { 
  Search, 
  Plus, 
  Trash, 
  Share, 
  MoreHorizontal, 
  Check, 
  ListChecks, 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Image as ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

// Note type
type Note = {
  id: string;
  title: string;
  content: string;
  folder: string;
  lastEdited: Date;
  pinned?: boolean;
};

// Folder type
type Folder = {
  id: string;
  name: string;
  count: number;
};

export default function NotesApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingContent, setEditingContent] = useState(false);
  
  // Sample folders
  const folders: Folder[] = [
    { id: 'all', name: 'All Notes', count: 8 },
    { id: 'recently-deleted', name: 'Recently Deleted', count: 0 },
    { id: 'work', name: 'Work', count: 3 },
    { id: 'personal', name: 'Personal', count: 5 },
    { id: 'ideas', name: 'Ideas', count: 2 },
  ];
  
  // Sample notes
  const notes: Note[] = [
    {
      id: 'note1',
      title: 'Project Ideas',
      content: '1. E-commerce website for handmade crafts\n2. Mobile app for tracking fitness goals\n3. Portfolio website with interactive elements\n4. Blog with AI-generated content suggestions',
      folder: 'work',
      lastEdited: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      pinned: true
    },
    {
      id: 'note2',
      title: 'Meeting Notes - Team Sync',
      content: '- Reviewed sprint progress\n- Discussed upcoming features\n- Action items assigned\n- Next meeting on Thursday',
      folder: 'work',
      lastEdited: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: 'note3',
      title: 'Shopping List',
      content: '- Milk\n- Eggs\n- Bread\n- Apples\n- Coffee\n- Pasta',
      folder: 'personal',
      lastEdited: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    },
    {
      id: 'note4',
      title: 'Books to Read',
      content: '1. Atomic Habits by James Clear\n2. Deep Work by Cal Newport\n3. The Design of Everyday Things by Don Norman\n4. Clean Code by Robert C. Martin',
      folder: 'personal',
      lastEdited: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    },
    {
      id: 'note5',
      title: 'Weekly Goals',
      content: '- Complete project proposal\n- Review new design specs\n- Schedule client meeting\n- Update portfolio website',
      folder: 'work',
      lastEdited: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      pinned: true
    },
    {
      id: 'note6',
      title: 'Travel Plans',
      content: 'Places to visit:\n- New York\n- Tokyo\n- Barcelona\n- Sydney\n\nThings to pack:\n- Passport\n- Camera\n- Comfortable shoes\n- Travel adapter',
      folder: 'personal',
      lastEdited: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    },
    {
      id: 'note7',
      title: 'App Feature Ideas',
      content: '- Dark mode toggle\n- Offline support\n- Cloud sync\n- Customizable themes\n- Keyboard shortcuts\n- Voice commands',
      folder: 'ideas',
      lastEdited: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    },
    {
      id: 'note8',
      title: 'Recipe - Pasta Carbonara',
      content: 'Ingredients:\n- 200g spaghetti\n- 100g pancetta\n- 2 eggs\n- 50g parmesan\n- Black pepper\n\nInstructions:\n1. Cook pasta according to package\n2. Fry pancetta until crispy\n3. Beat eggs with cheese\n4. Mix everything together off heat\n5. Season with pepper',
      folder: 'personal',
      lastEdited: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    }
  ];
  
  // Filter notes based on search query and selected folder
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || note.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });
  
  // Get currently selected note
  const activeNote = notes.find(note => note.id === selectedNote);
  
  // Set first note as selected by default
  useEffect(() => {
    if (filteredNotes.length > 0 && !selectedNote) {
      setSelectedNote(filteredNotes[0].id);
    }
    
    if (filteredNotes.length > 0 && selectedNote && !filteredNotes.some(note => note.id === selectedNote)) {
      setSelectedNote(filteredNotes[0].id);
    }
  }, [filteredNotes, selectedNote]);
  
  // Format date for display
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
    } else if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (diffMins > 0) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return 'Just now';
    }
  };
  
  // Create a new note
  const createNewNote = () => {
    // In a real app, this would add a new note to the database
    // Here we just select the first note
    if (filteredNotes.length > 0) {
      setSelectedNote(filteredNotes[0].id);
    }
  };
  
  // Get excerpt from note content
  const getExcerpt = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };
  
  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-60 border-r flex flex-col">
        {/* Search */}
        <div className="p-3 border-b bg-muted/30 backdrop-blur-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted rounded-lg pl-8 pr-3 py-1.5 text-sm"
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        {/* Folders */}
        <div className="p-3 border-b overflow-auto flex-shrink-0">
          <h3 className="text-xs text-muted-foreground uppercase mb-2 px-2">Folders</h3>
          <div className="space-y-1">
            {folders.map(folder => (
              <button
                key={folder.id}
                className={`w-full text-left px-2 py-1 rounded text-sm flex items-center justify-between ${
                  selectedFolder === folder.id ? 'bg-accent/50' : 'hover:bg-accent/20'
                }`}
                onClick={() => setSelectedFolder(folder.id)}
              >
                <span>{folder.name}</span>
                <span className="text-xs text-muted-foreground">{folder.count}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-3 flex justify-between px-2">
            <button className="text-xs text-primary">New Folder</button>
            <button className="text-xs text-primary">Edit</button>
          </div>
        </div>
        
        {/* Notes list */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 border-b flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {filteredNotes.length} notes
            </span>
            <div className="flex space-x-2">
              <button className="p-1 rounded hover:bg-accent/30" onClick={createNewNote}>
                <Plus className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-accent/30">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {filteredNotes.map(note => (
            <div
              key={note.id}
              className={`p-3 border-b cursor-pointer hover:bg-accent/10 ${
                selectedNote === note.id ? 'bg-accent/20' : ''
              }`}
              onClick={() => setSelectedNote(note.id)}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium text-sm truncate pr-4">{note.title}</h3>
                {note.pinned && (
                  <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5"></div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-1 line-clamp-2">
                {getExcerpt(note.content)}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {formatDate(note.lastEdited)}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {note.folder}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Note editor */}
      {activeNote ? (
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="p-2 border-b bg-muted/30 backdrop-blur-sm flex items-center justify-between">
            <div className="flex space-x-1">
              <button className="p-1 rounded hover:bg-accent/30">
                <Check className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-accent/30">
                <ListChecks className="w-4 h-4" />
              </button>
              <span className="h-4 mx-1 border-l border-muted-foreground/30"></span>
              <button className="p-1 rounded hover:bg-accent/30">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-accent/30">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-accent/30">
                <Underline className="w-4 h-4" />
              </button>
              <span className="h-4 mx-1 border-l border-muted-foreground/30"></span>
              <button className="p-1 rounded hover:bg-accent/30">
                <List className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-accent/30">
                <ListOrdered className="w-4 h-4" />
              </button>
              <span className="h-4 mx-1 border-l border-muted-foreground/30"></span>
              <button className="p-1 rounded hover:bg-accent/30">
                <AlignLeft className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-accent/30">
                <AlignCenter className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-accent/30">
                <AlignRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex space-x-1">
              <button className="p-1 rounded hover:bg-accent/30">
                <ImageIcon className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-accent/30">
                <Share className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-accent/30">
                <Trash className="w-4 h-4" />
              </button>
              <button className="p-1 rounded hover:bg-accent/30">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Note header */}
          <div className="p-4 border-b">
            {editingTitle ? (
              <input
                type="text"
                value={activeNote.title}
                className="w-full text-xl font-medium bg-transparent outline-none border-b border-primary pb-1"
                autoFocus
                onBlur={() => setEditingTitle(false)}
                onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
              />
            ) : (
              <h1 
                className="text-xl font-medium cursor-text" 
                onClick={() => setEditingTitle(true)}
              >
                {activeNote.title}
              </h1>
            )}
            <div className="text-xs text-muted-foreground mt-1">
              {`Edited ${formatDate(activeNote.lastEdited)}`}
            </div>
          </div>
          
          {/* Note content */}
          <div className="flex-1 p-4 overflow-y-auto">
            {editingContent ? (
              <textarea
                value={activeNote.content}
                className="w-full h-full text-sm bg-transparent outline-none resize-none"
                autoFocus
                onBlur={() => setEditingContent(false)}
              />
            ) : (
              <div 
                className="text-sm whitespace-pre-wrap cursor-text"
                onClick={() => setEditingContent(true)}
              >
                {activeNote.content}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">No Note Selected</p>
            <p className="text-sm text-muted-foreground mb-4">
              Select a note from the list or create a new one.
            </p>
            <button 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center mx-auto"
              onClick={createNewNote}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 