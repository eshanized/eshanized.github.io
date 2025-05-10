"use client";

import React, { useState, useEffect } from 'react';
import BaseIOSApp from './BaseIOSApp';
import { Clock, AlarmClock, Timer, Watch, Globe, ChevronRight, Plus, Trash2 } from 'lucide-react';

export default function ClockApp() {
  const [activeTab, setActiveTab] = useState<string>("worldclock");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Format time
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  
  // World clocks data
  const worldClocks = [
    { city: "Cupertino", timezone: "America/Los_Angeles", offset: -7 },
    { city: "New York", timezone: "America/New_York", offset: -4 },
    { city: "London", timezone: "Europe/London", offset: 1 },
    { city: "Tokyo", timezone: "Asia/Tokyo", offset: 9 },
    { city: "Sydney", timezone: "Australia/Sydney", offset: 11 }
  ];
  
  // Sample alarms
  const alarms = [
    { id: 1, time: "06:30", label: "Wake up", days: ["Mon", "Tue", "Wed", "Thu", "Fri"], active: true },
    { id: 2, time: "07:00", label: "Morning run", days: ["Mon", "Wed", "Fri"], active: true },
    { id: 3, time: "21:30", label: "Bedtime", days: ["Everyday"], active: true },
    { id: 4, time: "12:00", label: "Lunch break", days: ["Weekdays"], active: false }
  ];
  
  // Bottom tabs
  const tabs = [
    { id: "worldclock", label: "World Clock", icon: Globe },
    { id: "alarm", label: "Alarm", icon: AlarmClock },
    { id: "stopwatch", label: "Stopwatch", icon: Watch },
    { id: "timer", label: "Timer", icon: Timer }
  ];
  
  // Get time in a specific timezone
  const getTimezoneTime = (offset: number): Date => {
    const utc = currentTime.getTime() + (currentTime.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
  };
  
  // Get time difference
  const getTimeDifference = (offset: number): string => {
    const localOffset = -currentTime.getTimezoneOffset() / 60;
    const diff = offset - localOffset;
    
    if (diff === 0) return "Same as local time";
    const sign = diff > 0 ? "+" : "";
    return `${sign}${diff} HRS`;
  };
  
  return (
    <BaseIOSApp title="Clock" rightAction={activeTab === "worldclock" || activeTab === "alarm" ? <Plus className="w-5 h-5" /> : undefined}>
      <div className="h-full flex flex-col">
        {/* World Clock Tab */}
        {activeTab === "worldclock" && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-px">
              {worldClocks.map((clock, index) => (
                <div 
                  key={index}
                  className="p-3 bg-white dark:bg-gray-800 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{clock.city}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {getTimeDifference(clock.offset)}
                    </p>
                  </div>
                  <div className="text-xl font-light">
                    {formatTime(getTimezoneTime(clock.offset))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Alarm Tab */}
        {activeTab === "alarm" && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-sm text-gray-500">SLEEP | WAKE UP</h2>
              <button className="text-sm text-gray-500">Edit</button>
            </div>
            
            <div className="space-y-6">
              {alarms.map((alarm) => (
                <div key={alarm.id} className="flex justify-between items-center">
                  <div>
                    <h3 className={`text-xl font-light ${!alarm.active ? 'text-gray-400' : ''}`}>{alarm.time}</h3>
                    <p className={`text-sm ${!alarm.active ? 'text-gray-400' : 'text-gray-500'}`}>
                      {alarm.label}, {alarm.days.join(", ")}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={alarm.active}
                      onChange={() => {}}
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              ))}
            </div>
            
            {/* Other alarms section */}
            <div className="mt-8">
              <h2 className="text-sm text-gray-500 mb-3">OTHER</h2>
              
              <div className="space-y-px">
                {alarms.map((alarm) => (
                  <div 
                    key={alarm.id}
                    className="p-3 bg-white dark:bg-gray-800 flex justify-between items-center"
                  >
                    <div>
                      <h3 className={`font-medium ${!alarm.active ? 'text-gray-400' : ''}`}>{alarm.time}</h3>
                      <p className={`text-xs ${!alarm.active ? 'text-gray-400' : 'text-gray-500'}`}>
                        {alarm.days.join(", ")}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={alarm.active}
                        onChange={() => {}}
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Stopwatch Tab */}
        {activeTab === "stopwatch" && (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="text-center">
              <div className="text-6xl font-thin mb-8">00:00.00</div>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-gray-200">
                  Reset
                </button>
                <button className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white">
                  Start
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Timer Tab */}
        {activeTab === "timer" && (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="text-center">
              <div className="text-6xl font-thin mb-8">00:00:00</div>
              
              <div className="flex justify-center space-x-4 mb-6">
                <button className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-800 dark:text-gray-200 text-sm">
                  Cancel
                </button>
                <button className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-sm">
                  Start
                </button>
              </div>
              
              <div className="mt-4 text-blue-500">Choose a preset timer</div>
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
                  ? 'text-orange-500' 
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