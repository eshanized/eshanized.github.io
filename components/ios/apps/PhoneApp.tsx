"use client";

import React, { useState, useEffect, useCallback } from 'react';
import BaseIOSApp from './BaseIOSApp';
import { Phone, User, VoicemailIcon, Clock, Star, Info, Plus, Trash2, Search, X, Video, Mic, Volume2, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

// Add console log to confirm component is loaded
console.log('PhoneApp component loading');

interface Contact {
  id: number;
  name: string;
  phone: string;
  avatar?: string;
  favorite?: boolean;
  recent?: boolean;
  missedCall?: boolean;
  recentTime?: string;
  recentType?: 'incoming' | 'outgoing' | 'missed' | 'video';
}

interface CallState {
  isActive: boolean;
  contact?: Contact;
  duration: number;
  isMuted: boolean;
  isSpeaker: boolean;
  isVideo: boolean;
}

const PhoneApp = () => {
  const [activeTab, setActiveTab] = useState<string>("favorites");
  const [dialPad, setDialPad] = useState<boolean>(false);
  const [dialNumber, setDialNumber] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [callState, setCallState] = useState<CallState>({
    isActive: false,
    duration: 0,
    isMuted: false,
    isSpeaker: false,
    isVideo: false
  });
  
  // Sample contacts data
  const contacts: Contact[] = [
    {
      id: 1,
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      favorite: true,
      recent: true,
      recentTime: "10:30 AM",
      recentType: 'incoming'
    },
    {
      id: 2,
      name: "Sarah Johnson",
      phone: "+1 (555) 234-5678",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      favorite: true
    },
    {
      id: 3,
      name: "David Williams",
      phone: "+1 (555) 345-6789",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      recent: true,
      missedCall: true,
      recentTime: "Yesterday",
      recentType: 'missed'
    },
    {
      id: 4,
      name: "Emma Brown",
      phone: "+1 (555) 456-7890",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      favorite: true,
      recent: true,
      recentTime: "Yesterday",
      recentType: 'video'
    },
    {
      id: 5,
      name: "Michael Jones",
      phone: "+1 (555) 567-8901",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg"
    },
    {
      id: 6,
      name: "Jennifer Miller",
      phone: "+1 (555) 678-9012",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      recent: true,
      recentTime: "Friday",
      recentType: 'outgoing'
    },
    {
      id: 7,
      name: "Robert Davis",
      phone: "+1 (555) 789-0123",
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      favorite: true
    },
    {
      id: 8,
      name: "Lisa Wilson",
      phone: "+1 (555) 890-1234",
      avatar: "https://randomuser.me/api/portraits/women/8.jpg"
    }
  ];
  
  // Filter contacts based on tab and search
  const getFilteredContacts = useCallback(() => {
    let filtered = contacts;
    
    // Apply search filter if query exists
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(query) ||
        contact.phone.includes(query)
      );
    }
    
    // Apply tab filter
    switch (activeTab) {
      case "favorites":
        return filtered.filter(contact => contact.favorite);
      case "recents":
        return filtered.filter(contact => contact.recent);
      case "contacts":
        return filtered;
      default:
        return filtered;
    }
  }, [activeTab, searchQuery, contacts]);
  
  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      const intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phone;
  };
  
  // Handle initiating a call
  const handleCall = (contact?: Contact, isVideo: boolean = false) => {
    setCallState({
      isActive: true,
      contact: contact || {
        id: Date.now(),
        name: 'Unknown',
        phone: dialNumber,
      },
      duration: 0,
      isMuted: false,
      isSpeaker: false,
      isVideo: isVideo
    });
    
    // Reset dial pad
    setDialPad(false);
    setDialNumber("");
  };
  
  // Handle ending a call
  const handleEndCall = () => {
    setCallState(prev => ({
      ...prev,
      isActive: false
    }));
  };
  
  // Update call duration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (callState.isActive) {
      interval = setInterval(() => {
        setCallState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [callState.isActive]);
  
  // Format duration for display
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Dial pad keys
  const dialPadKeys = [
    { number: "1", letters: "" },
    { number: "2", letters: "ABC" },
    { number: "3", letters: "DEF" },
    { number: "4", letters: "GHI" },
    { number: "5", letters: "JKL" },
    { number: "6", letters: "MNO" },
    { number: "7", letters: "PQRS" },
    { number: "8", letters: "TUV" },
    { number: "9", letters: "WXYZ" },
    { number: "*", letters: "" },
    { number: "0", letters: "+" },
    { number: "#", letters: "" }
  ];
  
  // Bottom tabs
  const tabs = [
    { id: "favorites", label: "Favorites", icon: Star },
    { id: "recents", label: "Recents", icon: Clock },
    { id: "contacts", label: "Contacts", icon: User },
    { id: "keypad", label: "Keypad", icon: VoicemailIcon }
  ];

  // Get app title based on state
  const getAppTitle = () => {
    if (callState.isActive) {
      return callState.isVideo ? "Video Call" : "Call";
    }
    return activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
  };

  // Get right action for header based on current state
  const getRightAction = () => {
    if (activeTab === "contacts") {
      return <Plus className="w-5 h-5" />;
    }
    return undefined;
  };

  // Active Call UI
  const ActiveCall = () => (
    <div className="flex-1 flex flex-col items-center justify-between p-6 bg-white dark:bg-black">
      <div className="w-full mt-2 mb-4">
        <button 
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
          onClick={handleEndCall}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex flex-col items-center mt-4 flex-1">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
          {callState.contact?.avatar ? (
            <Image
              src={callState.contact.avatar}
              alt={callState.contact.name}
              width={128}
              height={128}
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
              <User className="w-16 h-16 text-gray-500 dark:text-gray-400" />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-semibold mb-1">{callState.contact?.name}</h2>
        <p className="text-gray-500 mb-4">{formatPhoneNumber(callState.contact?.phone || '')}</p>
        <p className="text-gray-500">{formatDuration(callState.duration)}</p>
        
        {callState.isVideo && (
          <div className="w-full max-w-sm h-40 rounded-xl bg-gray-800 mt-4 flex items-center justify-center">
            <Video className="w-12 h-12 text-gray-500" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8 w-full max-w-sm">
        <button 
          className={`flex flex-col items-center ${
            callState.isMuted ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setCallState(prev => ({ ...prev, isMuted: !prev.isMuted }))}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            callState.isMuted ? 'bg-red-500/10' : 'bg-gray-200 dark:bg-gray-800'
          }`}>
            <Mic className="w-8 h-8" />
          </div>
          <span className="mt-2 text-sm">Mute</span>
        </button>

        <button 
          className={`flex flex-col items-center ${
            callState.isSpeaker ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'
          }`}
          onClick={() => setCallState(prev => ({ ...prev, isSpeaker: !prev.isSpeaker }))}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            callState.isSpeaker ? 'bg-red-500/10' : 'bg-gray-200 dark:bg-gray-800'
          }`}>
            <Volume2 className="w-8 h-8" />
          </div>
          <span className="mt-2 text-sm">Speaker</span>
        </button>

        {!callState.isVideo ? (
          <button 
            className="flex flex-col items-center text-gray-700 dark:text-gray-300"
            onClick={() => setCallState(prev => ({ ...prev, isVideo: true }))}
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <Video className="w-8 h-8" />
            </div>
            <span className="mt-2 text-sm">Video</span>
          </button>
        ) : (
          <button 
            className="flex flex-col items-center text-gray-700 dark:text-gray-300"
            onClick={() => setCallState(prev => ({ ...prev, isVideo: false }))}
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
              <Phone className="w-8 h-8" />
            </div>
            <span className="mt-2 text-sm">Audio</span>
          </button>
        )}
      </div>

      <button 
        className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-8"
        onClick={handleEndCall}
      >
        <Phone className="w-8 h-8 text-white transform rotate-135" />
      </button>
    </div>
  );
  
  return (
    <BaseIOSApp 
      title={getAppTitle()}
      rightAction={getRightAction()}
    >
      <div className="h-full flex flex-col bg-white dark:bg-black">
        {callState.isActive ? (
          <ActiveCall />
        ) : (
          <>
            {/* Search bar (for contacts tab) */}
            {activeTab === "contacts" && (
              <div className="p-3 bg-white dark:bg-black">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 bg-gray-200 dark:bg-gray-800 rounded-lg text-sm border border-transparent focus:outline-none"
                    placeholder="Search"
                  />
                  {searchQuery && (
                    <button 
                      className="absolute inset-y-0 right-0 flex items-center pr-3"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {/* Contact lists (for favorites, recents, contacts tabs) */}
            {(activeTab === "favorites" || activeTab === "recents" || activeTab === "contacts") && (
              <div className="flex-1 overflow-y-auto">
                {getFilteredContacts().length > 0 ? (
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {getFilteredContacts().map((contact) => (
                      <div 
                        key={contact.id}
                        className="flex items-center p-4 bg-white dark:bg-black"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          {contact.avatar ? (
                            <Image
                              src={contact.avatar}
                              alt={contact.name}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="font-medium">{contact.name}</h3>
                          {activeTab === "recents" && contact.recentTime && (
                            <div className="flex items-center text-xs">
                              {contact.recentType === 'incoming' && (
                                <Phone className="w-3 h-3 text-green-500 transform -rotate-90 mr-1" />
                              )}
                              {contact.recentType === 'outgoing' && (
                                <Phone className="w-3 h-3 text-blue-500 transform rotate-90 mr-1" />
                              )}
                              {contact.recentType === 'missed' && (
                                <Phone className="w-3 h-3 text-red-500 transform -rotate-90 mr-1" />
                              )}
                              {contact.recentType === 'video' && (
                                <Video className="w-3 h-3 text-purple-500 mr-1" />
                              )}
                              <span className={contact.missedCall ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}>
                                {contact.recentTime}
                              </span>
                            </div>
                          )}
                          {activeTab !== "recents" && (
                            <p className="text-xs text-gray-500 dark:text-gray-400">{contact.phone}</p>
                          )}
                        </div>
                        
                        <div className="flex space-x-3">
                          <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <Info className="w-4 h-4 text-blue-500" />
                          </button>
                          <button 
                            className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                            onClick={() => handleCall(contact)}
                          >
                            <Phone className="w-4 h-4 text-white" />
                          </button>
                          <button 
                            className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
                            onClick={() => handleCall(contact, true)}
                          >
                            <Video className="w-4 h-4 text-white" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full p-4 text-gray-500 dark:text-gray-400">
                    <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center mb-4">
                      {activeTab === "favorites" ? (
                        <Star className="w-8 h-8 text-gray-400" />
                      ) : activeTab === "recents" ? (
                        <Clock className="w-8 h-8 text-gray-400" />
                      ) : (
                        <User className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                    <p className="text-center">
                      {activeTab === "favorites"
                        ? "No favorites yet"
                        : activeTab === "recents"
                        ? "No recent calls"
                        : "No contacts found"}
                    </p>
                    {activeTab === "contacts" && (
                      <button 
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-full flex items-center"
                        onClick={() => alert("Add contact function would go here")}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        <span>Add Contact</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Dial pad (for keypad tab) */}
            {activeTab === "keypad" && (
              <div className="flex-1 flex flex-col">
                {/* Display number */}
                <div className="p-6 flex justify-center items-center bg-white dark:bg-black">
                  <h2 className="text-3xl font-light">
                    {dialNumber || <span className="text-gray-400">Enter a number</span>}
                  </h2>
                </div>
                
                {/* Dial pad */}
                <div className="flex-1 bg-white dark:bg-black p-2">
                  <div className="grid grid-cols-3 gap-2 h-full">
                    {dialPadKeys.map((key) => (
                      <button
                        key={key.number}
                        className="flex flex-col items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        onClick={() => setDialNumber(prev => prev + key.number)}
                      >
                        <span className="text-2xl font-light">{key.number}</span>
                        {key.letters && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{key.letters}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Call button */}
                <div className="p-4 flex justify-center bg-white dark:bg-black relative">
                  <button 
                    className={`w-14 h-14 rounded-full ${
                      dialNumber ? 'bg-green-500' : 'bg-green-500/70'
                    } flex items-center justify-center`}
                    disabled={!dialNumber}
                    onClick={() => handleCall()}
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </button>
                  {dialNumber && (
                    <button
                      className="absolute bottom-24 right-6 text-gray-500"
                      onClick={() => setDialNumber(prev => prev.slice(0, -1))}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {/* Bottom tabs */}
            <div className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black flex justify-around p-2">
              {tabs.map((tab) => (
                <button 
                  key={tab.id}
                  className={`flex flex-col items-center py-1 px-3 ${
                    activeTab === tab.id 
                      ? 'text-blue-500' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id === "keypad") {
                      setDialPad(true);
                    } else {
                      setDialPad(false);
                    }
                  }}
                >
                  <tab.icon className="w-6 h-6" />
                  <span className="text-xs mt-1">{tab.label}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </BaseIOSApp>
  );
}

export default PhoneApp; 