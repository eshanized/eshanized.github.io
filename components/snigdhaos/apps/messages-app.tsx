"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { 
  Search, 
  MoreVertical,
  Send,
  Paperclip,
  Mic,
  ChevronDown,
  Phone,
  Video,
  Smile,
  Camera,
  Users,
  Check,
  Filter,
  ArrowLeft,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { flavors } from "@catppuccin/palette";

// WhatsApp Icon component
const WhatsAppIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <linearGradient id="whatsapp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style={{ stopColor: "#25D366" }} />
      <stop offset="100%" style={{ stopColor: "#128C7E" }} />
    </linearGradient>
    <circle cx="50" cy="50" r="45" fill="url(#whatsapp-gradient)" />
    <path d="M69.7,30.3c-5.2-5.2-12.1-8.1-19.5-8.1c-15.2,0-27.6,12.4-27.6,27.6c0,4.9,1.3,9.6,3.7,13.8l-4,14.5l14.8-3.9
      c4,2.2,8.6,3.3,13.1,3.3c15.2,0,27.6-12.4,27.6-27.6C77.8,42.4,74.9,35.5,69.7,30.3z M50.2,72.6c-4.1,0-8.2-1.1-11.7-3.2l-0.8-0.5
      l-8.7,2.3l2.3-8.4l-0.5-0.8c-2.2-3.5-3.4-7.6-3.4-11.8c0-12.3,10-22.3,22.3-22.3c6,0,11.6,2.3,15.8,6.5c4.2,4.2,6.5,9.8,6.5,15.8
      C72.1,62.6,62.1,72.6,50.2,72.6z M63.3,55.2c-0.7-0.3-4-2-4.6-2.2c-0.6-0.2-1.1-0.3-1.5,0.3c-0.4,0.7-1.7,2.2-2.1,2.7
      c-0.4,0.4-0.8,0.5-1.5,0.2c-0.7-0.3-2.9-1.1-5.5-3.4c-2-1.8-3.4-4-3.8-4.7c-0.4-0.7,0-1,0.3-1.3c0.3-0.3,0.7-0.7,1-1.1
      c0.3-0.4,0.4-0.6,0.7-1.1c0.2-0.4,0.1-0.8-0.1-1.1c-0.2-0.3-1.5-3.7-2.1-5c-0.6-1.3-1.1-1.1-1.5-1.1c-0.4,0-0.9,0-1.3,0
      c-0.4,0-1.2,0.2-1.7,0.9c-0.6,0.7-2.1,2.1-2.1,5c0,3,2.2,5.9,2.5,6.3c0.3,0.4,4.6,7,11.1,9.8c1.6,0.7,2.8,1.1,3.8,1.4
      c1.6,0.5,3,0.4,4.2,0.3c1.3-0.2,4-1.6,4.6-3.2c0.6-1.6,0.6-3,0.4-3.3C64.4,55.7,64,55.5,63.3,55.2z" fill="white"/>
  </svg>
);

// Message type
type Message = {
  id: string;
  content: string;
  sender: 'me' | 'them';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read' | 'pending';
  type?: 'text' | 'image' | 'audio' | 'video';
  media?: string;
};

// Contact type
type Contact = {
  id: string;
  name: string;
  avatar?: string;
  status?: 'online' | 'offline';
  statusText?: string;
  lastSeen?: Date;
  messages: Message[];
  typing?: boolean;
  unreadCount?: number;
};

interface WhatsAppProps {
  specialUser?: string;
}

export default function WhatsAppApp({ specialUser }: WhatsAppProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Get theme colors from Catppuccin palette
  const colors = isDark ? flavors.mocha : flavors.frappe;
  
  // Contacts data
  const contacts: Contact[] = [
    {
      id: 'contact1',
      name: 'Family Group',
      avatar: undefined,
      status: 'online',
      statusText: "Mom's birthday tomorrow!",
      messages: [
        {
          id: 'm1',
          content: 'Has everyone bought gifts for mom?',
          sender: 'them',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm2',
          content: 'Yes, I got her that watch she wanted',
          sender: 'me',
          timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm3',
          content: "I'm getting the cake 🎂",
          sender: 'them',
          timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm4',
          content: "Don't forget we're meeting at 7pm",
          sender: 'them',
          timestamp: new Date(Date.now() - 20 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm5',
          content: "I'll be there! 👍",
          sender: 'me',
          timestamp: new Date(Date.now() - 18 * 60 * 60 * 1000),
          status: 'read'
        }
      ],
      typing: true,
      unreadCount: 2
    },
    {
      id: 'contact2',
      name: 'Work Team',
      avatar: undefined,
      status: 'online',
      statusText: "Project deadline: Friday",
      messages: [
        {
          id: 'm6',
          content: 'Team meeting at 10am tomorrow',
          sender: 'them',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm7',
          content: "I'll prepare the slides for the presentation",
          sender: 'me',
          timestamp: new Date(Date.now() - 4.8 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm8',
          content: 'Great! Also, the client wants to review the latest mockups',
          sender: 'them',
          timestamp: new Date(Date.now() - 4.5 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm9',
          content: "I'll send them over this evening",
          sender: 'me',
          timestamp: new Date(Date.now() - 4.2 * 60 * 60 * 1000),
          status: 'delivered'
        }
      ],
      unreadCount: 5
    },
    {
      id: 'contact3',
      name: 'Rahul',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'online',
      statusText: "At the gym 💪",
      lastSeen: new Date(Date.now() - 30 * 60 * 1000),
      messages: [
        {
          id: 'm10',
          content: 'Are we still on for the game tonight?',
          sender: 'them',
          timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm11',
          content: 'Yes, 8pm at my place. Bringing snacks?',
          sender: 'me',
          timestamp: new Date(Date.now() - 2.5 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm12',
          content: "Sure! I'll bring chips and drinks",
          sender: 'them',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm13',
          content: 'Perfect! See you then',
          sender: 'me',
          timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
          status: 'read'
        }
      ]
    },
    {
      id: 'contact4',
      name: 'Priya',
      avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      status: 'offline',
      statusText: "Living life one day at a time ✨",
      lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
      messages: [
        {
          id: 'm14',
          content: 'Did you watch the new movie I recommended?',
          sender: 'them',
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm15',
          content: 'Not yet! Planning to watch it this weekend',
          sender: 'me',
          timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm16',
          content: 'Let me know what you think, the ending is amazing!',
          sender: 'them',
          timestamp: new Date(Date.now() - 47 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm17',
          content: 'Will do! 🍿',
          sender: 'me',
          timestamp: new Date(Date.now() - 46 * 60 * 60 * 1000),
          status: 'read'
        }
      ],
      unreadCount: 1
    },
    {
      id: 'contact5',
      name: 'Vikram',
      avatar: 'https://randomuser.me/api/portraits/men/57.jpg',
      status: 'offline',
      statusText: "Busy with work",
      lastSeen: new Date(Date.now() - 5 * 60 * 60 * 1000),
      messages: [
        {
          id: 'm18',
          content: 'Can you send me the files for the project?',
          sender: 'them',
          timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm19',
          content: 'Just emailed them to you!',
          sender: 'me',
          timestamp: new Date(Date.now() - 5.5 * 60 * 60 * 1000),
          status: 'read'
        },
        {
          id: 'm20',
          content: 'Got them, thanks!',
          sender: 'them',
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
          status: 'read'
        }
      ]
    }
  ];
  
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

  // Create chat background pattern
  const chatPattern = isDark 
    ? `data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0H0V100H100V0Z' fill='%23${colors.colors.base.hex.replace('#', '')}'/%3E%3Cpath opacity='0.03' d='M100 0H0V100H100V0Z' fill='%23${colors.colors.text.hex.replace('#', '')}'/%3E%3C/svg%3E`
    : `data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M100 0H0V100H100V0Z' fill='%23${colors.colors.base.hex.replace('#', '')}'/%3E%3Cpath opacity='0.03' d='M100 0H0V100H100V0Z' fill='%23${colors.colors.text.hex.replace('#', '')}'/%3E%3C/svg%3E`;

  // Render message status indicators
  const renderMessageStatus = (status: string) => {
    switch(status) {
      case 'sent':
        return <Check className="w-3 h-3 text-muted-foreground" />;
      case 'delivered':
        return (
          <div className="flex">
            <Check className="w-3 h-3 text-muted-foreground" />
            <Check className="w-3 h-3 text-muted-foreground -ml-1" />
          </div>
        );
      case 'read':
        return (
          <div className="flex">
            <Check className="w-3 h-3 text-blue-500" />
            <Check className="w-3 h-3 text-blue-500 -ml-1" />
          </div>
        );
      case 'pending':
        return <Clock className="w-3 h-3 text-muted-foreground" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-[#f0f2f5] dark:bg-[#111b21]">
      {/* Main interface */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 flex flex-col border-r border-[#d1d7db] dark:border-[#222e35]">
          {/* Sidebar header */}
          <div className="px-4 py-3 flex justify-between items-center bg-[#f0f2f5] dark:bg-[#202c33]">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image 
                  src="https://github.com/eshanized.png"
                  alt="Profile"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="p-1 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]">
                <Users className="w-5 h-5" />
              </button>
              <button className="p-1 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]">
                <Check className="w-5 h-5" />
              </button>
              <button className="p-1 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Search bar */}
          <div className="p-2 bg-[#f0f2f5] dark:bg-[#202c33]">
            <div className="flex items-center bg-white dark:bg-[#2a3942] rounded-lg px-3 py-1.5">
              <Search className="w-5 h-5 text-[#54656f] dark:text-[#aebac1] mr-2" />
              <input
                type="text"
                placeholder="Search or start new chat"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full text-sm outline-none text-[#111b21] dark:text-[#e9edef]"
              />
              <Filter className="w-5 h-5 text-[#54656f] dark:text-[#aebac1] ml-1" />
            </div>
          </div>
          
          {/* Chats list */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map(contact => {
              const lastMessage = contact.messages[contact.messages.length - 1];
              
              return (
                <div 
                  key={contact.id}
                  className={`px-3 py-3 flex cursor-pointer ${
                    selectedContact === contact.id 
                      ? 'bg-[#f0f2f5] dark:bg-[#2a3942]' 
                      : 'hover:bg-[#f5f6f6] dark:hover:bg-[#222e35]'
                  }`}
                  onClick={() => setSelectedContact(contact.id)}
                >
                  <div className="relative mr-3">
                    {contact.avatar ? (
                      <Image 
                        src={contact.avatar} 
                        alt={contact.name}
                        width={49}
                        height={49}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-[#00a884] dark:bg-[#6a7175] flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                    )}
                    {contact.status === 'online' && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00a884] rounded-full border-2 border-[#f0f2f5] dark:border-[#111b21]"></div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 border-b border-[#e9edef] dark:border-[#222d34] pb-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium truncate text-[#111b21] dark:text-[#e9edef]">
                        {contact.name}
                      </h3>
                      <span className="text-xs text-[#667781] dark:text-[#8696a0]">
                        {lastMessage && formatTime(lastMessage.timestamp)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-sm truncate text-[#667781] dark:text-[#8696a0] flex items-center">
                        {contact.typing ? (
                          <span className="text-[#00a884]">typing...</span>
                        ) : (
                          <>
                            {lastMessage && lastMessage.sender === 'me' && (
                              <span className="flex items-center mr-1">
                                {renderMessageStatus(lastMessage.status || 'sent')}
                              </span>
                            )}
                            <span>
                              {lastMessage && 
                                (lastMessage.content.length > 30 
                                  ? lastMessage.content.substring(0, 30) + '...' 
                                  : lastMessage.content)}
                            </span>
                          </>
                        )}
                      </p>
                      
                      {contact.unreadCount && contact.unreadCount > 0 && (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#25d366] flex items-center justify-center">
                          <span className="text-xs text-white font-medium">
                            {contact.unreadCount}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Chat area */}
        {selectedContact && activeContact ? (
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="px-4 py-2 flex justify-between items-center bg-[#f0f2f5] dark:bg-[#202c33] border-b border-[#d1d7db] dark:border-[#222e35]">
              <div className="flex items-center">
                <div className="mr-1 md:hidden">
                  <ArrowLeft className="w-5 h-5 text-[#54656f] dark:text-[#aebac1]" />
                </div>
                {activeContact.avatar ? (
                  <Image 
                    src={activeContact.avatar} 
                    alt={activeContact.name}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#00a884] dark:bg-[#6a7175] flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                )}
                <div>
                  <h2 className="font-medium text-[#111b21] dark:text-[#e9edef]">
                    {activeContact.name}
                  </h2>
                  <p className="text-xs text-[#667781] dark:text-[#8696a0]">
                    {activeContact.status === 'online' 
                      ? 'online' 
                      : activeContact.lastSeen 
                        ? `last seen ${formatTime(activeContact.lastSeen)}`
                        : 'offline'}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="p-1 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]">
                  <Search className="w-5 h-5" />
                </button>
                <button className="p-1 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-1 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-1 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Messages area */}
            <div 
              className="flex-1 overflow-y-auto p-3 bg-[#efeae2] dark:bg-[#0b141a]"
              style={{
                backgroundImage: `url("${chatPattern}")`,
                backgroundSize: '200px 200px'
              }}
            >
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
                  <div key={date} className="mb-6">
                    <div className="flex justify-center mb-3">
                      <div className="bg-[#ffffff] dark:bg-[#1f2c33] px-3 py-1 rounded-lg shadow-sm">
                        <span className="text-xs text-[#54656f] dark:text-[#8696a0] font-medium">
                          {date}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {messages.map(message => (
                        <div 
                          key={message.id}
                          className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[65%] rounded-lg px-2 py-1.5 shadow-sm relative ${
                              message.sender === 'me' 
                                ? 'bg-[#d9fdd3] dark:bg-[#005c4b]' 
                                : 'bg-[#ffffff] dark:bg-[#1f2c33]'
                            }`}
                          >
                            <p className={`text-sm ${
                              message.sender === 'me' 
                                ? 'text-[#111b21] dark:text-[#e9edef]' 
                                : 'text-[#111b21] dark:text-[#e9edef]'
                            }`}>
                              {message.content}
                            </p>
                            
                            <div className="flex items-center justify-end gap-1 -mb-1 mt-0.5">
                              <span className="text-[10px] text-[#667781] dark:text-[#8696a0]">
                                {formatTime(message.timestamp)}
                              </span>
                              
                              {message.sender === 'me' && message.status && (
                                <span className="ml-1">
                                  {renderMessageStatus(message.status)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}
              
              {activeContact.typing && (
                <div className="flex justify-start">
                  <div className="max-w-[65%] bg-[#ffffff] dark:bg-[#1f2c33] rounded-lg px-3 py-2 shadow-sm">
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 bg-[#667781] dark:bg-[#8696a0] rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-[#667781] dark:bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                      <span className="w-2 h-2 bg-[#667781] dark:bg-[#8696a0] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Message input */}
            <div className="px-4 py-2 bg-[#f0f2f5] dark:bg-[#202c33] flex items-center">
              <div className="flex space-x-3 mr-2">
                <button className="p-1 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]">
                  <Smile className="w-6 h-6" />
                </button>
                <button className="p-1 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]">
                  <Paperclip className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 bg-white dark:bg-[#2a3942] rounded-lg px-3 py-2">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="bg-transparent w-full text-sm outline-none text-[#111b21] dark:text-[#e9edef]"
                />
              </div>
              
              <div className="flex ml-2">
                {messageText.trim() ? (
                  <button 
                    className="p-2 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]"
                    onClick={handleSendMessage}
                  >
                    <Send className="w-6 h-6" />
                  </button>
                ) : (
                  <button className="p-2 rounded-full text-[#54656f] dark:text-[#aebac1] hover:bg-[#d9dbdf] dark:hover:bg-[#374045]">
                    <Mic className="w-6 h-6" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#f0f2f5] dark:bg-[#222e35]">
            <div className="text-center max-w-md px-6">
              <div className="w-72 h-72 mx-auto mb-8 opacity-20">
                <WhatsAppIcon />
              </div>
              <h1 className="text-3xl font-light text-[#41525d] dark:text-[#e9edef] mb-4">WhatsApp Web</h1>
              <p className="text-sm text-[#667781] dark:text-[#8696a0] mb-6">
                Send and receive messages without keeping your phone online.
                Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
              </p>
              <p className="text-sm text-[#8696a0] dark:text-[#8696a0] mt-40">
                <span className="border-t border-[#e9edef] dark:border-[#222d34] pt-4">End-to-end encrypted</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}