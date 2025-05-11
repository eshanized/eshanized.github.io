"use client";

import React, { useState } from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import { Phone, Star, Clock, User, Search, X, Video, Mic, Volume2 } from 'lucide-react';
import Image from 'next/image';
import { useMIUITheme } from '../MIUIThemeContext';

interface Contact {
  id: string;
  name: string;
  number: string;
  avatar?: string;
  recent?: boolean;
  missed?: boolean;
  timestamp?: string;
}

export default function PhoneApp() {
  const [activeTab, setActiveTab] = useState<'keypad' | 'recents' | 'contacts'>('keypad');
  const [dialNumber, setDialNumber] = useState('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { colors } = useMIUITheme();

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'John Doe',
      number: '+1 234 567 8900',
      avatar: 'https://i.pravatar.cc/150?img=1',
      recent: true,
      timestamp: '10:30 AM'
    },
    {
      id: '2',
      name: 'Jane Smith',
      number: '+1 234 567 8901',
      avatar: 'https://i.pravatar.cc/150?img=2',
      recent: true,
      missed: true,
      timestamp: 'Yesterday'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      number: '+1 234 567 8902',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  ];

  const handleKeyPress = (key: string) => {
    if (dialNumber.length < 15) {
      setDialNumber(prev => prev + key);
    }
  };

  const handleDelete = () => {
    setDialNumber(prev => prev.slice(0, -1));
  };

  const handleCall = () => {
    if (dialNumber) {
      setIsCallActive(true);
      // Start call duration timer
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.number.includes(searchQuery)
  );

  return (
    <BaseMIUIApp 
      title={isCallActive ? "Call in progress" : "Phone"}
    >
      <div className={`h-full ${colors.primary}`}>
        {isCallActive ? (
          // Call screen
          <div className={`h-full flex flex-col items-center justify-between p-6 ${colors.primary} text-white`}>
            <div className="flex flex-col items-center mt-12">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <Image
                  src="https://i.pravatar.cc/150?img=1"
                  alt="Contact"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className={`text-2xl font-medium mb-1 ${colors.textPrimary}`}>
                {contacts.find(c => c.number === dialNumber)?.name || dialNumber}
              </h2>
              <p className={colors.textSecondary}>{formatDuration(callDuration)}</p>
            </div>

            <div className="grid grid-cols-3 gap-8 mb-12">
              <button className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full ${colors.buttonBg} flex items-center justify-center mb-2`}>
                  <Volume2 className={`w-6 h-6 ${colors.textPrimary}`} />
                </div>
                <span className={`text-sm ${colors.textSecondary}`}>Speaker</span>
              </button>
              <button className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full ${colors.buttonBg} flex items-center justify-center mb-2`}>
                  <Mic className={`w-6 h-6 ${colors.textPrimary}`} />
                </div>
                <span className={`text-sm ${colors.textSecondary}`}>Mute</span>
              </button>
              <button className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full ${colors.buttonBg} flex items-center justify-center mb-2`}>
                  <Video className={`w-6 h-6 ${colors.textPrimary}`} />
                </div>
                <span className={`text-sm ${colors.textSecondary}`}>Video</span>
              </button>
              <button 
                className="flex flex-col items-center col-span-3"
                onClick={() => {
                  setIsCallActive(false);
                  setCallDuration(0);
                }}
              >
                <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-2">
                  <Phone className="w-6 h-6 text-white rotate-135" />
                </div>
                <span className={`text-sm ${colors.textSecondary}`}>End</span>
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Tabs */}
            <div className={`flex border-b ${colors.divider} ${colors.cardBg}`}>
              {[
                { id: 'keypad', icon: Phone, label: 'Keypad' },
                { id: 'recents', icon: Clock, label: 'Recents' },
                { id: 'contacts', icon: User, label: 'Contacts' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`flex-1 py-4 flex flex-col items-center ${
                    activeTab === tab.id 
                      ? colors.accent + ' border-b-2 border-current' 
                      : colors.textSecondary
                  }`}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                >
                  <tab.icon className="w-5 h-5 mb-1" />
                  <span className="text-xs">{tab.label}</span>
                </button>
              ))}
            </div>

            {activeTab === 'keypad' && (
              <div className="p-6">
                {/* Number display */}
                <div className="text-center mb-8">
                  <input
                    type="text"
                    value={dialNumber}
                    readOnly
                    className={`text-3xl font-light text-center w-full bg-transparent ${colors.textPrimary} focus:outline-none`}
                    placeholder="Enter number"
                  />
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-6">
                  {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map((key) => (
                    <button
                      key={key}
                      className={`w-16 h-16 rounded-full ${colors.buttonBg} flex flex-col items-center justify-center shadow-sm mx-auto`}
                      onClick={() => handleKeyPress(key.toString())}
                    >
                      <span className={`text-2xl font-light ${colors.textPrimary}`}>{key}</span>
                      {typeof key === 'number' && key !== 0 && (
                        <span className={`text-[10px] ${colors.textSecondary} mt-0.5`}>
                          {key === 1 ? 'Voicemail' : 'ABC'}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Call button */}
                <div className="mt-8 flex justify-center">
                  <button
                    className={`w-16 h-16 rounded-full ${
                      dialNumber ? 'bg-green-500' : colors.buttonBg
                    } flex items-center justify-center shadow-lg`}
                    onClick={handleCall}
                    disabled={!dialNumber}
                  >
                    <Phone className={`w-6 h-6 ${dialNumber ? 'text-white' : colors.textSecondary}`} />
                  </button>
                </div>
              </div>
            )}

            {(activeTab === 'recents' || activeTab === 'contacts') && (
              <div className="h-full">
                {/* Search bar */}
                <div className={`p-4 ${colors.cardBg}`}>
                  <div className={`flex items-center ${colors.tertiary} rounded-full px-4 py-2`}>
                    <Search className={`w-5 h-5 ${colors.textSecondary}`} />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}`}
                      className={`ml-2 bg-transparent w-full focus:outline-none ${colors.textPrimary}`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                {/* Contact/Recent list */}
                <div className={colors.divider}>
                  {filteredContacts
                    .filter(contact => activeTab === 'recents' ? contact.recent : true)
                    .map((contact) => (
                      <div
                        key={contact.id}
                        className={`flex items-center p-4 ${colors.cardBg}`}
                        onClick={() => {
                          setDialNumber(contact.number);
                          setActiveTab('keypad');
                        }}
                      >
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 relative">
                          {contact.avatar ? (
                            <Image
                              src={contact.avatar}
                              alt={contact.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          ) : (
                            <User className={`w-6 h-6 ${colors.textSecondary} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`} />
                          )}
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className={`text-base font-medium ${colors.textPrimary}`}>
                            {contact.name}
                          </h3>
                          <p className={`text-sm ${
                            contact.missed 
                              ? 'text-red-500' 
                              : colors.textSecondary
                          }`}>
                            {contact.number}
                            {contact.timestamp && ` • ${contact.timestamp}`}
                          </p>
                        </div>
                        <button className={`p-2 ${colors.textSecondary} hover:${colors.textPrimary}`}>
                          <Phone className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </BaseMIUIApp>
  );
}