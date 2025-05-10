"use client";

import React, { useState } from 'react';
import BaseIOSApp from './BaseIOSApp';
import { Phone, User, VoicemailIcon, Clock, Star, Info, Plus, Trash2, Search } from 'lucide-react';
import Image from 'next/image';

interface Contact {
  id: number;
  name: string;
  phone: string;
  avatar?: string;
  favorite?: boolean;
  recent?: boolean;
  missedCall?: boolean;
  recentTime?: string;
}

export default function PhoneApp() {
  const [activeTab, setActiveTab] = useState<string>("favorites");
  const [dialPad, setDialPad] = useState<boolean>(false);
  const [dialNumber, setDialNumber] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Sample contacts data
  const contacts: Contact[] = [
    {
      id: 1,
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      favorite: true,
      recent: true,
      recentTime: "10:30 AM"
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
      recentTime: "Yesterday"
    },
    {
      id: 4,
      name: "Emma Brown",
      phone: "+1 (555) 456-7890",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      favorite: true,
      recent: true,
      recentTime: "Yesterday"
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
      recentTime: "Friday"
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
  
  // Filter contacts based on tab
  const getFilteredContacts = () => {
    switch (activeTab) {
      case "favorites":
        return contacts.filter(contact => contact.favorite);
      case "recents":
        return contacts.filter(contact => contact.recent);
      case "contacts":
        return contacts;
      default:
        return contacts;
    }
  };
  
  // Handle dial pad input
  const handleDialPadInput = (value: string) => {
    setDialNumber(prev => prev + value);
  };
  
  // Handle dial pad backspace
  const handleDialPadBackspace = () => {
    setDialNumber(prev => prev.slice(0, -1));
  };
  
  // Format phone number for display
  const formatPhoneNumber = (phone: string) => {
    return phone;
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
  
  return (
    <BaseIOSApp 
      title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      rightAction={activeTab === "contacts" ? <Plus className="w-5 h-5" /> : undefined}
    >
      <div className="h-full flex flex-col bg-gray-100 dark:bg-gray-900">
        {/* Search bar (for contacts tab) */}
        {activeTab === "contacts" && (
          <div className="p-3 bg-gray-100 dark:bg-gray-900">
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
                    className="flex items-center p-4 bg-white dark:bg-gray-800"
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
                        <p className={`text-xs ${contact.missedCall ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                          {contact.missedCall ? 'Missed Call • ' : ''}{contact.recentTime}
                        </p>
                      )}
                      {activeTab !== "recents" && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">{contact.phone}</p>
                      )}
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <Info className="w-4 h-4 text-blue-500" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                        <Phone className="w-4 h-4 text-white" />
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
              </div>
            )}
          </div>
        )}
        
        {/* Dial pad (for keypad tab) */}
        {activeTab === "keypad" && (
          <div className="flex-1 flex flex-col">
            {/* Display number */}
            <div className="p-6 flex justify-center items-center bg-white dark:bg-gray-800">
              <h2 className="text-3xl font-light">
                {dialNumber || <span className="text-gray-400">Enter a number</span>}
              </h2>
            </div>
            
            {/* Dial pad */}
            <div className="flex-1 bg-white dark:bg-gray-800 p-2">
              <div className="grid grid-cols-3 gap-2 h-full">
                {dialPadKeys.map((key) => (
                  <button
                    key={key.number}
                    className="flex flex-col items-center justify-center rounded-full"
                    onClick={() => handleDialPadInput(key.number)}
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
            <div className="p-4 flex justify-center bg-white dark:bg-gray-800">
              <button 
                className={`w-14 h-14 rounded-full ${
                  dialNumber ? 'bg-green-500' : 'bg-green-500/70'
                } flex items-center justify-center`}
                disabled={!dialNumber}
              >
                <Phone className="w-6 h-6 text-white" />
              </button>
              {dialNumber && (
                <button
                  className="absolute bottom-24 right-6 text-gray-500"
                  onClick={handleDialPadBackspace}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Bottom tabs */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex justify-around p-2">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`flex flex-col items-center py-1 px-3 ${
                activeTab === tab.id 
                  ? 'text-blue-500' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-6 h-6" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </BaseIOSApp>
  );
} 