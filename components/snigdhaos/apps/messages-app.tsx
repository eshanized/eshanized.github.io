"use client";

import { useState } from 'react';
import Image from 'next/image';
import { 
  Search, 
  Video, 
  Mic, 
  Image as ImageIcon, 
  Paperclip, 
  Heart, 
  Laugh, 
  ThumbsUp, 
  MoreHorizontal,
  Send,
  Phone,
  User,
  Users,
  Plus,
  ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';

// Messages Icon component
const MessagesIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <linearGradient gradientTransform="matrix(60 0 0 -60 25311 44901)" gradientUnits="userSpaceOnUse" id="Background_13_" x1="-421.0169" x2="-421.0169" y1="748.2662" y2="746.7667">
      <stop offset="0" style={{stopColor:"#67FF81"}}/>
      <stop offset="1" style={{stopColor:"#01B41F"}}/>
    </linearGradient>
    <path className="st0" d="M63.6,5c9,0,13.5,0,18.4,1.5c5.3,1.9,9.5,6.1,11.4,11.4C95,22.8,95,27.4,95,36.4v27.2c0,9,0,13.5-1.5,18.4c-1.9,5.3-6.1,9.5-11.4,11.4C77.1,95,72.6,95,63.6,95H36.4c-9,0-13.5,0-18.4-1.5C12.6,91.5,8.5,87.4,6.5,82C5,77.2,5,72.7,5,63.6V36.4c0-9,0-13.5,1.5-18.4C8.5,12.7,12.6,8.5,18,6.6C22.8,5,27.3,5,36.4,5H63.6z" fill="url(#Background_13_)"/>
    <path d="M43.5,75.7c2.1,0.3,4.2,0.5,6.4,0.5c18.2,0,33-12.3,33-27.4S68.2,21.5,50,21.5c-18.2,0-33,12.3-33,27.4c0,9.9,6.3,18.5,15.7,23.3c0,0.3,0,0.6,0,1c0,2.9-4.8,6.7-4.5,6.7c4.8,0,8.2-3,10.5-3.7C40.6,75.7,41.7,75.6,43.5,75.7z" fill="#FFFFFF"/>
  </svg>
);

// Message type
type Message = {
  id: string;
  content: string;
  sender: 'me' | 'them';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  reactions?: { emoji: string; count: number }[];
};

// Contact type
type Contact = {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline' | 'away';
  lastSeen?: Date;
  messages: Message[];
  typing?: boolean;
};

interface MessagesAppProps {
  specialUser?: string;
}

export default function MessagesApp({ specialUser }: MessagesAppProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const isSnigdha = specialUser === 'snigdha';
  
  // Regular contacts
  const regularContacts: Contact[] = [
    {
      id: 'contact1',
      name: 'Abhiraj',
      avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
      status: 'online',
      messages: [
        {
          id: 'm1',
          content: 'Hey, have you checked out that new design tool?',
          sender: 'them',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
          status: 'read'
        },
        {
          id: 'm2',
          content: 'Yeah, it looks promising! I especially like the collaboration features.',
          sender: 'me',
          timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm3',
          content: 'Do you think we should use it for the upcoming project?',
          sender: 'them',
          timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm4',
          content: 'Definitely. Let\'s discuss it in our next team meeting.',
          sender: 'me',
          timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm5',
          content: 'Perfect! I\'ll prepare some examples to show the team.',
          sender: 'them',
          timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
          status: 'read'
        }
      ],
      typing: true
    },
    {
      id: 'contact2',
      name: 'Ashfaq',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'offline',
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      messages: [
        {
          id: 'm6',
          content: 'Are we still meeting for coffee tomorrow?',
          sender: 'them',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
          status: 'read'
        },
        {
          id: 'm7',
          content: 'Yes, 10am at the usual place works for me!',
          sender: 'me',
          timestamp: new Date(Date.now() - 4.8 * 60 * 60 * 1000),
          status: 'read',
          reactions: [{ emoji: '👍', count: 1 }]
        },
        {
          id: 'm8',
          content: 'Great, see you then!',
          sender: 'them',
          timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000),
          status: 'read'
        }
      ]
    },
    {
      id: 'contact3',
      name: 'Anamika',
      avatar: 'https://randomuser.me/api/portraits/women/18.jpg',
      status: 'away',
      lastSeen: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      messages: [
        {
          id: 'm9',
          content: 'Can you send me the files for the presentation?',
          sender: 'them',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
          status: 'read'
        },
        {
          id: 'm10',
          content: 'Just sent them to your email!',
          sender: 'me',
          timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
          status: 'delivered'
        },
        {
          id: 'm11',
          content: 'Thanks! Got them.',
          sender: 'them',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'read'
        }
      ]
    },
    {
      id: 'contact4',
      name: 'TIVision',
      avatar: undefined, // Group chat has no avatar
      messages: [
        {
          id: 'm12',
          content: 'Let\'s discuss the timeline for the next phase',
          sender: 'them',
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
          status: 'read'
        },
        {
          id: 'm13',
          content: 'I think we need to adjust some of the milestones',
          sender: 'me',
          timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm14',
          content: 'Agreed. The current schedule is too tight.',
          sender: 'them',
          timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000),
          status: 'read'
        }
      ]
    }
  ];
  
  // Love messages for special user
  const loveContacts: Contact[] = [
    {
      id: 'love1',
      name: 'My Love ❤️',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      status: 'online',
      messages: [
        {
          id: 'l1',
          content: 'Good morning, beautiful! Hope you slept well 💕',
          sender: 'me',
          timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
          status: 'read',
          reactions: [{ emoji: '❤️', count: 1 }]
        },
        {
          id: 'l2',
          content: 'Morning! I had the sweetest dream about us 🥰',
          sender: 'them',
          timestamp: new Date(Date.now() - 7.8 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'l3',
          content: 'Oh really? Tell me about it!',
          sender: 'me',
          timestamp: new Date(Date.now() - 7.7 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'l4',
          content: "We were on a beach watching the sunset together, it was perfect.",
          sender: 'them',
          timestamp: new Date(Date.now() - 7.5 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'l5',
          content: "Can't wait to see you tonight ❤️",
          sender: 'them',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'read'
        }
      ],
      typing: true
    },
    {
      id: 'love2',
      name: 'Date Plans',
      avatar: undefined,
      status: 'online',
      messages: [
        {
          id: 'd1',
          content: 'Ideas for our next date:',
          sender: 'me',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'd2',
          content: 'Picnic in the park with your favorite foods',
          sender: 'me',
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'd3',
          content: "Don't forget our anniversary next month! 📅 ❤️",
          sender: 'me',
          timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          status: 'read'
        }
      ]
    }
  ];
  
  // Use the appropriate contacts based on specialUser status
  const contacts = isSnigdha ? loveContacts : regularContacts;
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get selected contact
  const activeContact = contacts.find(contact => contact.id === selectedContact);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedContact) return;
    
    // In a real app, this would update the database
    // Here we just update local state
    setMessageText('');
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for message groups
  const formatMessageDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-72 border-r flex flex-col">
        <div className="p-3 border-b bg-muted/30 backdrop-blur-sm">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-muted rounded-full pl-8 pr-3 py-1.5 text-sm"
            />
            <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map(contact => {
            const lastMessage = contact.messages[contact.messages.length - 1];
            
            return (
              <div 
                key={contact.id}
                className={`p-3 border-b cursor-pointer hover:bg-accent/10 transition-colors ${
                  selectedContact === contact.id ? 'bg-accent/20' : ''
                }`}
                onClick={() => setSelectedContact(contact.id)}
              >
                <div className="flex items-center">
                  <div className="relative mr-3">
                    {contact.avatar ? (
                      <Image 
                        src={contact.avatar} 
                        alt={contact.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center">
                        <Users className="w-5 h-5 text-accent-foreground" />
                      </div>
                    )}
                    {contact.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                    {contact.status === 'away' && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-yellow-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-0.5">
                      <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                      <span className="text-xs text-muted-foreground">
                        {lastMessage && formatTime(lastMessage.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {contact.typing ? (
                        <span className="text-xs text-primary">typing...</span>
                      ) : (
                        <p className="text-xs text-muted-foreground truncate">
                          {lastMessage && 
                            (lastMessage.sender === 'me' ? 'You: ' : '') + 
                            lastMessage.content}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="p-3 border-t bg-muted/30 backdrop-blur-sm">
          <button className="w-full flex items-center justify-center py-1.5 bg-primary rounded-full text-primary-foreground text-sm">
            <Plus className="w-4 h-4 mr-1" />
            New Message
          </button>
        </div>
      </div>
      
      {/* Chat area */}
      {selectedContact && activeContact ? (
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="p-3 border-b bg-muted/30 backdrop-blur-sm flex items-center justify-between">
            <div className="flex items-center">
              {activeContact.avatar ? (
                <Image 
                  src={activeContact.avatar} 
                  alt={activeContact.name}
                  width={40}
                  height={40}
                  className="w-8 h-8 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center mr-3">
                  <Users className="w-4 h-4 text-accent-foreground" />
                </div>
              )}
              <div>
                <h2 className="font-medium text-sm">{activeContact.name}</h2>
                {activeContact.status && (
                  <p className="text-xs text-muted-foreground">
                    {activeContact.status === 'online' 
                      ? 'Active Now' 
                      : activeContact.status === 'away'
                        ? 'Away'
                        : activeContact.lastSeen 
                          ? `Last seen ${formatTime(activeContact.lastSeen)}`
                          : 'Offline'}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button className="p-1.5 rounded-full hover:bg-accent/30">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-full hover:bg-accent/30">
                <Video className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-full hover:bg-accent/30">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col-reverse bg-[#f5f5f7] dark:bg-zinc-900">
            <div className="space-y-4">
              {/* Group messages by date */}
              {(() => {
                const messagesByDate: Record<string, Message[]> = {};
                
                activeContact.messages.forEach(message => {
                  const dateKey = formatMessageDate(message.timestamp);
                  if (!messagesByDate[dateKey]) {
                    messagesByDate[dateKey] = [];
                  }
                  messagesByDate[dateKey].push(message);
                });
                
                return Object.entries(messagesByDate).map(([date, messages]) => (
                  <div key={date}>
                    <div className="text-center mb-3">
                      <span className="text-xs bg-white/70 dark:bg-zinc-800/70 px-2 py-1 rounded-full text-muted-foreground backdrop-blur-sm">
                        {date}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {messages.map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} items-end mb-2`}
                        >
                          {message.sender === 'them' && (
                            <div className="mr-2 flex-shrink-0">
                              {activeContact.avatar ? (
                                <Image 
                                  src={activeContact.avatar} 
                                  alt={activeContact.name}
                                  width={32}
                                  height={32}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-accent/50 flex items-center justify-center">
                                  <Users className="w-4 h-4 text-accent-foreground" />
                                </div>
                              )}
                            </div>
                          )}
                          <div>
                            <div 
                              className={`p-3 rounded-2xl max-w-[300px] shadow-sm ${
                                message.sender === 'me' 
                                  ? 'bg-blue-500 text-white rounded-br-sm' 
                                  : 'bg-white dark:bg-zinc-800 dark:text-zinc-100 rounded-bl-sm'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                            </div>
                            
                            <div className={`mt-1 flex items-center ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                              <span className="text-xs text-muted-foreground">
                                {formatTime(message.timestamp)}
                              </span>
                              {message.sender === 'me' && message.status && (
                                <span className="ml-1 text-xs text-muted-foreground">
                                  {message.status === 'sent' ? '✓' : message.status === 'delivered' ? '✓✓' : '✓✓'}
                                </span>
                              )}
                            </div>
                            
                            {message.reactions && message.reactions.length > 0 && (
                              <div className={`mt-1 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                                {message.reactions.map((reaction, index) => (
                                  <div key={index} className="flex items-center bg-white/70 dark:bg-zinc-700/70 rounded-full px-1.5 py-0.5 backdrop-blur-sm">
                                    <span className="text-xs mr-1">{reaction.emoji}</span>
                                    <span className="text-xs text-muted-foreground">{reaction.count}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                          {message.sender === 'me' && (
                            <div className="ml-2 flex-shrink-0">
                              <Image 
                                src="https://github.com/eshanized.png"
                                alt="Me"
                                width={32}
                                height={32}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
              
              {activeContact.typing && (
                <div className="flex justify-start items-end">
                  {activeContact.avatar && (
                    <div className="mr-2 flex-shrink-0">
                      <Image 
                        src={activeContact.avatar} 
                        alt={activeContact.name}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-3 bg-white dark:bg-zinc-800 rounded-2xl rounded-bl-sm shadow-sm">
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Message input */}
          <div className="px-4 py-3 border-t bg-white dark:bg-zinc-800/90 backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                <button className="p-1.5 rounded-full hover:bg-accent/20">
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                </button>
                <button className="p-1.5 rounded-full hover:bg-accent/20">
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
              
              <div className="flex-1 flex items-center bg-muted/50 rounded-full px-3 py-2 border border-muted focus-within:border-blue-200 dark:focus-within:border-blue-700 transition-colors">
                <input
                  type="text"
                  placeholder="Message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="bg-transparent w-full text-sm outline-none"
                />
                
                <div className="flex ml-2 space-x-1">
                  <button className="p-1 rounded-full hover:bg-accent/20">
                    <Heart className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-accent/20">
                    <Laugh className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-accent/20">
                    <ThumbsUp className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button className="p-1 rounded-full hover:bg-accent/20">
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
              
              <button 
                className={`p-2 rounded-full ${messageText.trim() ? 'text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30' : 'text-muted-foreground'}`}
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
            <MessagesIcon />
          </div>
          <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
          <p className="text-sm text-muted-foreground max-w-[300px] text-center">
            Choose from an existing conversation or start a new one
          </p>
          <button className="mt-6 px-4 py-2 bg-primary rounded-full text-primary-foreground text-sm font-medium flex items-center">
            <Plus className="w-4 h-4 mr-1" />
            New Message
          </button>
        </div>
      )}
    </div>
  );
}