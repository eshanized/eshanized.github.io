"use client";

import React, { useState } from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import { Search, MoreVertical, Send, Image as ImageIcon, Smile, Paperclip, User } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
  isMe?: boolean;
  avatar?: string;
  unread?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar?: string;
  unread?: number;
}

export default function MessagesApp() {
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'John Doe',
      lastMessage: 'Hey, how are you?',
      timestamp: '10:30 AM',
      avatar: 'https://i.pravatar.cc/150?img=1',
      unread: 2
    },
    {
      id: '2',
      name: 'Jane Smith',
      lastMessage: 'The meeting is at 3 PM',
      timestamp: 'Yesterday',
      avatar: 'https://i.pravatar.cc/150?img=2'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      lastMessage: 'Thanks for your help!',
      timestamp: 'Wed',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  ];

  const messages: Record<string, Message[]> = {
    '1': [
      {
        id: '1',
        text: 'Hey, how are you?',
        sender: 'John Doe',
        timestamp: '10:30 AM',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: '2',
        text: "I'm good, thanks! How about you?",
        sender: 'Me',
        timestamp: '10:31 AM',
        isMe: true
      },
      {
        id: '3',
        text: "I'm doing great! Just wanted to catch up.",
        sender: 'John Doe',
        timestamp: '10:32 AM',
        avatar: 'https://i.pravatar.cc/150?img=1'
      }
    ]
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'Me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    messages[activeConversation] = [...(messages[activeConversation] || []), newMsg];
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BaseOneUIApp 
      title={activeConversation ? conversations.find(c => c.id === activeConversation)?.name || 'Messages' : 'Messages'}
      headerColor="bg-gray-50 dark:bg-gray-900"
      onBack={activeConversation ? () => setActiveConversation(null) : undefined}
      rightAction="more"
    >
      <div className="h-full bg-gray-100 dark:bg-black">
        {!activeConversation ? (
          <>
            {/* Search bar */}
            <div className="p-4 bg-white dark:bg-gray-900">
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages"
                  className="ml-2 bg-transparent w-full focus:outline-none text-gray-900 dark:text-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Conversations list */}
            <div className="divide-y divide-gray-200 dark:divide-gray-800">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="flex items-center p-4 bg-white dark:bg-gray-900 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  onClick={() => setActiveConversation(conversation.id)}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 relative">
                    {conversation.avatar ? (
                      <Image
                        src={conversation.avatar}
                        alt={conversation.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-base font-medium text-gray-900 dark:text-white">
                        {conversation.name}
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  {conversation.unread && (
                    <div className="ml-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {conversation.unread}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages[activeConversation]?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end max-w-[75%] ${message.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    {!message.isMe && (
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mb-1 mx-2">
                        {message.avatar ? (
                          <Image
                            src={message.avatar}
                            alt={message.sender}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                            <User className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                    )}
                    <div>
                      <div className={`rounded-2xl px-4 py-2 ${
                        message.isMe 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}>
                        {message.text}
                      </div>
                      <div className={`text-xs mt-1 ${
                        message.isMe ? 'text-right' : ''
                      } text-gray-500`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                  <Smile className="w-6 h-6" />
                </button>
                <div className="flex-1 flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                  <input
                    type="text"
                    placeholder="Type a message"
                    className="flex-1 bg-transparent focus:outline-none text-gray-900 dark:text-white"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                  />
                  <div className="flex items-center gap-2 ml-2">
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <ImageIcon className="w-5 h-5" />
                    </button>
                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                      <Paperclip className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <button
                  className={`p-2 rounded-full ${
                    newMessage.trim() 
                      ? 'text-blue-500 hover:text-blue-600' 
                      : 'text-gray-400'
                  }`}
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </BaseOneUIApp>
  );
} 