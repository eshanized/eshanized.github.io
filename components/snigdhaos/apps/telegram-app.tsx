"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { 
  Search, 
  Menu,
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
  Clock,
  MoreVertical,
  Settings,
  Bookmark,
  Archive,
  MessageCircle,
  Bell
} from 'lucide-react';
import { motion } from 'framer-motion';

// Telegram Icon component
const TelegramIcon = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="45" fill="#2AABEE" />
    <path d="M20,50 C20,50 45,38 55,34 C65,30 75,25 75,25 C75,25 80,23 80,27 C80,31 75,70 75,70 C75,70 73,75 68,73 C63,71 48,61 48,61 C48,61 45,59 48,56 C51,53 65,40 65,40 C65,40 67,38 65,37 C63,36 45,48 35,55 C25,62 20,60 20,58 C20,56 20,50 20,50 Z" fill="white" />
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
  lastSeen?: Date;
  messages: Message[];
  typing?: boolean;
  unreadCount?: number;
  verified?: boolean;
  muted?: boolean;
  pinned?: boolean;
};

interface TelegramProps {
  specialUser?: string;
}

export default function TelegramApp({ specialUser }: TelegramProps = {}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Contacts data - Telegram style
  const contacts: Contact[] = [
    {
      id: 'contact1',
      name: 'Telegram News',
      avatar: '/telegram-news.png',
      status: 'online',
      verified: true,
      messages: [
        {
          id: 'm1',
          content: 'New features coming to Telegram!',
          sender: 'them',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          status: 'read'
        }
      ],
      pinned: true
    },
    {
      id: 'contact2',
      name: 'Saved Messages',
      avatar: undefined,
      status: 'online',
      messages: [
        {
          id: 'm2',
          content: 'Important links and files',
          sender: 'me',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          status: 'read'
        }
      ],
      pinned: true
    },
    {
      id: 'contact3',
      name: 'Linux Group',
      avatar: undefined,
      status: 'online',
      messages: [
        {
          id: 'm3',
          content: 'Check out this new Linux distro!',
          sender: 'them',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          status: 'read'
        }
      ],
      unreadCount: 5
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
    setMessageText('');
  };

  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

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
    <div className="h-full flex flex-col bg-white dark:bg-[#17212b]">
      {/* Main interface */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-[420px] flex flex-col border-r border-[#E6ECF0] dark:border-[#232e3c]">
          {/* Sidebar header */}
          <div className="p-4 flex items-center justify-between bg-white dark:bg-[#17212b]">
            <button className="p-2 hover:bg-[#F1F1F1] dark:hover:bg-[#232e3c] rounded-full">
              <Menu className="w-6 h-6 text-[#707579] dark:text-[#9CA3AF]" />
            </button>
            <div className="flex-1 mx-4">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F1F1F1] dark:bg-[#242f3d] text-[#707579] dark:text-[#9CA3AF] rounded-lg px-4 py-2 outline-none"
              />
            </div>
            <button className="p-2 hover:bg-[#F1F1F1] dark:hover:bg-[#232e3c] rounded-full">
              <Settings className="w-6 h-6 text-[#707579] dark:text-[#9CA3AF]" />
            </button>
          </div>

          {/* Chats list */}
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map(contact => (
              <div
                key={contact.id}
                className={`px-4 py-3 flex cursor-pointer ${
                  selectedContact === contact.id
                    ? 'bg-[#3390EC] dark:bg-[#2B5278]'
                    : 'hover:bg-[#F1F1F1] dark:hover:bg-[#232e3c]'
                }`}
                onClick={() => setSelectedContact(contact.id)}
              >
                <div className="relative mr-3">
                  {contact.avatar ? (
                    <Image
                      src={contact.avatar}
                      alt={contact.name}
                      width={54}
                      height={54}
                      className="w-[54px] h-[54px] rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-[54px] h-[54px] rounded-full flex items-center justify-center ${
                      contact.id === 'contact2' ? 'bg-[#3390EC]' : 'bg-[#F1F1F1] dark:bg-[#242f3d]'
                    }`}>
                      {contact.id === 'contact2' ? (
                        <Bookmark className="w-7 h-7 text-white" />
                      ) : (
                        <Users className="w-7 h-7 text-[#707579] dark:text-[#9CA3AF]" />
                      )}
                    </div>
                  )}
                  {contact.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-[14px] h-[14px] bg-[#4DCD5E] rounded-full border-2 border-white dark:border-[#17212b]"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <h3 className={`font-medium ${
                        selectedContact === contact.id
                          ? 'text-white'
                          : 'text-[#232e3c] dark:text-white'
                      }`}>
                        {contact.name}
                      </h3>
                      {contact.verified && (
                        <div className="ml-1 w-4 h-4 bg-[#3390EC] rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <span className={`text-xs ${
                      selectedContact === contact.id
                        ? 'text-white/70'
                        : 'text-[#707579] dark:text-[#9CA3AF]'
                    }`}>
                      {contact.messages[contact.messages.length - 1]?.timestamp &&
                        formatTime(contact.messages[contact.messages.length - 1].timestamp)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-1">
                    <p className={`text-sm truncate ${
                      selectedContact === contact.id
                        ? 'text-white/70'
                        : 'text-[#707579] dark:text-[#9CA3AF]'
                    }`}>
                      {contact.typing ? (
                        <span className="text-[#3390EC]">typing...</span>
                      ) : (
                        contact.messages[contact.messages.length - 1]?.content
                      )}
                    </p>

                    <div className="flex items-center">
                      {contact.muted && (
                        <Bell className="w-4 h-4 text-[#707579] dark:text-[#9CA3AF] mr-2" />
                      )}
                      {contact.unreadCount && contact.unreadCount > 0 && (
                        <div className="w-6 h-6 rounded-full bg-[#3390EC] flex items-center justify-center">
                          <span className="text-xs text-white font-medium">
                            {contact.unreadCount}
                          </span>
                        </div>
                      )}
                      {contact.pinned && (
                        <div className="w-4 h-4 ml-2">
                          <svg viewBox="0 0 24 24" className={`w-full h-full ${
                            selectedContact === contact.id
                              ? 'text-white/70'
                              : 'text-[#707579] dark:text-[#9CA3AF]'
                          }`}>
                            <path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat area */}
        {selectedContact && activeContact ? (
          <div className="flex-1 flex flex-col">
            {/* Chat header */}
            <div className="h-[60px] px-4 flex justify-between items-center bg-white dark:bg-[#17212b] border-b border-[#E6ECF0] dark:border-[#232e3c]">
              <div className="flex items-center">
                <div className="mr-3">
                  {activeContact.avatar ? (
                    <Image
                      src={activeContact.avatar}
                      alt={activeContact.name}
                      width={42}
                      height={42}
                      className="w-[42px] h-[42px] rounded-full object-cover"
                    />
                  ) : (
                    <div className={`w-[42px] h-[42px] rounded-full flex items-center justify-center ${
                      activeContact.id === 'contact2' ? 'bg-[#3390EC]' : 'bg-[#F1F1F1] dark:bg-[#242f3d]'
                    }`}>
                      {activeContact.id === 'contact2' ? (
                        <Bookmark className="w-6 h-6 text-white" />
                      ) : (
                        <Users className="w-6 h-6 text-[#707579] dark:text-[#9CA3AF]" />
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center">
                    <h2 className="font-medium text-[#232e3c] dark:text-white">
                      {activeContact.name}
                    </h2>
                    {activeContact.verified && (
                      <div className="ml-1 w-4 h-4 bg-[#3390EC] rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-[#707579] dark:text-[#9CA3AF]">
                    {activeContact.status === 'online'
                      ? 'online'
                      : activeContact.lastSeen
                      ? `last seen ${formatTime(activeContact.lastSeen)}`
                      : 'offline'}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-[#F1F1F1] dark:hover:bg-[#232e3c] rounded-full">
                  <Search className="w-6 h-6 text-[#707579] dark:text-[#9CA3AF]" />
                </button>
                <button className="p-2 hover:bg-[#F1F1F1] dark:hover:bg-[#232e3c] rounded-full">
                  <Phone className="w-6 h-6 text-[#707579] dark:text-[#9CA3AF]" />
                </button>
                <button className="p-2 hover:bg-[#F1F1F1] dark:hover:bg-[#232e3c] rounded-full">
                  <MoreVertical className="w-6 h-6 text-[#707579] dark:text-[#9CA3AF]" />
                </button>
              </div>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto bg-[#F1F1F1] dark:bg-[#0E1621] p-4">
              {activeContact.messages.map(message => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    message.sender === 'me'
                      ? 'bg-[#3390EC] text-white'
                      : 'bg-white dark:bg-[#182533] text-[#232e3c] dark:text-white'
                  }`}>
                    <p className="text-[15px]">{message.content}</p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[11px] opacity-70">
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

            {/* Message input */}
            <div className="px-4 py-3 bg-white dark:bg-[#17212b] flex items-center">
              <button className="p-2 hover:bg-[#F1F1F1] dark:hover:bg-[#232e3c] rounded-full mr-2">
                <Smile className="w-6 h-6 text-[#707579] dark:text-[#9CA3AF]" />
              </button>
              <div className="flex-1 bg-[#F1F1F1] dark:bg-[#242f3d] rounded-lg">
                <input
                  type="text"
                  placeholder="Message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-4 py-2 bg-transparent text-[#232e3c] dark:text-white outline-none"
                />
              </div>
              <div className="flex ml-2">
                {messageText.trim() ? (
                  <button
                    className="p-2 hover:bg-[#F1F1F1] dark:hover:bg-[#232e3c] rounded-full"
                    onClick={handleSendMessage}
                  >
                    <Send className="w-6 h-6 text-[#3390EC]" />
                  </button>
                ) : (
                  <>
                    <button className="p-2 hover:bg-[#F1F1F1] dark:hover:bg-[#232e3c] rounded-full mr-2">
                      <Paperclip className="w-6 h-6 text-[#707579] dark:text-[#9CA3AF]" />
                    </button>
                    <button className="p-2 hover:bg-[#F1F1F1] dark:hover:bg-[#232e3c] rounded-full">
                      <Mic className="w-6 h-6 text-[#707579] dark:text-[#9CA3AF]" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-[#F1F1F1] dark:bg-[#0E1621]">
            <div className="text-center max-w-md px-6">
              <div className="w-48 h-48 mx-auto mb-8 opacity-50">
                <TelegramIcon />
              </div>
              <h1 className="text-2xl font-medium text-[#232e3c] dark:text-white mb-4">
                Telegram Desktop
              </h1>
              <p className="text-sm text-[#707579] dark:text-[#9CA3AF]">
                Welcome to the official Telegram Desktop app.
                It's fast and secure.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 