"use client";

import React, { useState } from 'react';
import BaseIOSApp from './BaseIOSApp';
import { Search, Edit, Camera, Mic, Image as ImageIcon, Smile, SendHorizontal } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: number;
  text: string;
  sent: boolean;
  time: string;
}

interface Conversation {
  id: number;
  contact: {
    name: string;
    avatar: string;
  };
  lastMessage: string;
  time: string;
  unread: number;
  messages: Message[];
}

export default function MessagesApp() {
  const [activeView, setActiveView] = useState<string>("conversations");
  const [activeConversation, setActiveConversation] = useState<number | null>(null);
  const [messageText, setMessageText] = useState<string>("");
  
  // Sample conversations
  const conversations: Conversation[] = [
    {
      id: 1,
      contact: {
        name: "Sarah Johnson",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      lastMessage: "See you at the meetup tomorrow!",
      time: "11:42 AM",
      unread: 2,
      messages: [
        { id: 1, text: "Hey, how's it going?", sent: false, time: "11:30 AM" },
        { id: 2, text: "Pretty good! Working on that project we discussed.", sent: true, time: "11:32 AM" },
        { id: 3, text: "Great! Are you coming to the meetup tomorrow?", sent: false, time: "11:35 AM" },
        { id: 4, text: "Yes, I'll be there around 6pm", sent: true, time: "11:40 AM" },
        { id: 5, text: "See you at the meetup tomorrow!", sent: false, time: "11:42 AM" }
      ]
    },
    {
      id: 2,
      contact: {
        name: "Mike Chen",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      lastMessage: "Did you check out that article I sent?",
      time: "Yesterday",
      unread: 0,
      messages: [
        { id: 1, text: "Hey, check out this article:", sent: false, time: "Yesterday" },
        { id: 2, text: "https://example.com/interesting-tech-article", sent: false, time: "Yesterday" },
        { id: 3, text: "Did you check out that article I sent?", sent: false, time: "Yesterday" }
      ]
    },
    {
      id: 3,
      contact: {
        name: "Emma Wilson",
        avatar: "https://randomuser.me/api/portraits/women/22.jpg"
      },
      lastMessage: "The presentation looks great! Nice work.",
      time: "Yesterday",
      unread: 0,
      messages: [
        { id: 1, text: "Hi Emma, I've sent you the presentation for review", sent: true, time: "Yesterday" },
        { id: 2, text: "Got it, I'll take a look", sent: false, time: "Yesterday" },
        { id: 3, text: "The presentation looks great! Nice work.", sent: false, time: "Yesterday" }
      ]
    },
    {
      id: 4,
      contact: {
        name: "David Taylor",
        avatar: "https://randomuser.me/api/portraits/men/67.jpg"
      },
      lastMessage: "I'll bring the equipment for the project.",
      time: "Monday",
      unread: 0,
      messages: [
        { id: 1, text: "Hey, what are you bringing to the project meeting?", sent: true, time: "Monday" },
        { id: 2, text: "I'll bring the equipment for the project.", sent: false, time: "Monday" }
      ]
    },
    {
      id: 5,
      contact: {
        name: "Jennifer Lee",
        avatar: "https://randomuser.me/api/portraits/women/56.jpg"
      },
      lastMessage: "Are we still meeting for coffee on Friday?",
      time: "Monday",
      unread: 0,
      messages: [
        { id: 1, text: "Hi Jennifer! How's your week going?", sent: true, time: "Monday" },
        { id: 2, text: "Pretty busy with deadlines, but managing. How about you?", sent: false, time: "Monday" },
        { id: 3, text: "Same here. It's been hectic!", sent: true, time: "Monday" },
        { id: 4, text: "Are we still meeting for coffee on Friday?", sent: false, time: "Monday" }
      ]
    }
  ];
  
  // Get active conversation
  const getConversation = (id: number) => {
    return conversations.find(conv => conv.id === id);
  };
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    
    // In a real app, you would add the message to the conversation
    // and then clear the input
    setMessageText("");
  };
  
  // Open a conversation
  const openConversation = (id: number) => {
    setActiveConversation(id);
    setActiveView("chat");
  };
  
  // Go back to conversations list
  const goBackToConversations = () => {
    setActiveView("conversations");
    setActiveConversation(null);
  };
  
  return (
    <BaseIOSApp 
      title={activeView === "conversations" ? "Messages" : getConversation(activeConversation || 0)?.contact.name || "Chat"} 
      rightAction={activeView === "conversations" ? <Edit className="w-5 h-5" /> : "more"}
      onBack={activeView === "chat" ? goBackToConversations : undefined}
    >
      <div className="h-full flex flex-col">
        {/* Conversations List */}
        {activeView === "conversations" && (
          <>
            {/* Search bar */}
            <div className="p-4 pb-2">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-4 h-4 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm border border-transparent focus:outline-none"
                  placeholder="Search"
                />
              </div>
            </div>
            
            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  className="w-full flex items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
                  onClick={() => openConversation(conversation.id)}
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                      <Image
                        src={conversation.contact.avatar}
                        alt={conversation.contact.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {conversation.unread > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-xs text-white font-bold">{conversation.unread}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-center">
                      <h3 className={`font-semibold truncate ${conversation.unread > 0 ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                        {conversation.contact.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.time}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${
                      conversation.unread > 0 
                        ? 'text-black dark:text-white font-medium' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {conversation.lastMessage}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
        
        {/* Chat View */}
        {activeView === "chat" && activeConversation && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100 dark:bg-gray-900">
              <div className="space-y-4">
                {getConversation(activeConversation)?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.sent
                        ? 'bg-blue-500 text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-800 text-black dark:text-white rounded-tl-none'
                    }`}>
                      <p>{message.text}</p>
                      <div className={`text-xs mt-1 ${
                        message.sent ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Message input */}
            <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                <button className="p-2 text-gray-500 dark:text-gray-400">
                  <Camera className="w-6 h-6" />
                </button>
                <div className="flex-1 relative mx-2">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="w-full py-2 px-4 bg-gray-200 dark:bg-gray-800 rounded-full border-none focus:outline-none"
                    placeholder="iMessage"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button 
                  className="p-2 text-blue-500"
                  onClick={handleSendMessage}
                  disabled={messageText.trim() === ""}
                >
                  {messageText.trim() === "" ? (
                    <Mic className="w-6 h-6" />
                  ) : (
                    <SendHorizontal className="w-6 h-6" />
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </BaseIOSApp>
  );
} 