"use client";

import React, { useState, useEffect } from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import { Clock, AlarmClock, Timer, Watch, Globe, ChevronRight, Plus, Trash2, Play, Pause } from 'lucide-react';

export default function ClockApp() {
  const [activeTab, setActiveTab] = useState<string>("worldclock");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  
  // Stopwatch state
  const [stopwatchTime, setStopwatchTime] = useState<number>(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState<boolean>(false);
  const [stopwatchLaps, setStopwatchLaps] = useState<number[]>([]);

  // Timer state
  const [timerDuration, setTimerDuration] = useState<number>(0); // in seconds
  const [timerTimeLeft, setTimerTimeLeft] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  
  // Timer presets in minutes
  const timerPresets = [1, 3, 5, 10, 15, 30, 45, 60];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Stopwatch effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isStopwatchRunning) {
      interval = setInterval(() => {
        setStopwatchTime(prev => prev + 10); // Update every 10ms
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isStopwatchRunning]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timerTimeLeft > 0) {
      interval = setInterval(() => {
        setTimerTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            // Could add sound/notification here
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerTimeLeft]);

  // Format time for world clock
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format stopwatch time
  const formatStopwatchTime = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  // Format timer time
  const formatTimerTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Stopwatch controls
  const handleStopwatchStart = () => setIsStopwatchRunning(true);
  const handleStopwatchStop = () => setIsStopwatchRunning(false);
  const handleStopwatchReset = () => {
    setIsStopwatchRunning(false);
    setStopwatchTime(0);
    setStopwatchLaps([]);
  };
  const handleStopwatchLap = () => {
    setStopwatchLaps(prev => [...prev, stopwatchTime]);
  };

  // Timer controls
  const handleTimerStart = () => {
    if (timerTimeLeft > 0) {
      setIsTimerRunning(true);
    }
  };
  const handleTimerStop = () => setIsTimerRunning(false);
  const handleTimerReset = () => {
    setIsTimerRunning(false);
    setTimerTimeLeft(timerDuration);
  };
  const handleTimerPresetClick = (minutes: number) => {
    const seconds = minutes * 60;
    setTimerDuration(seconds);
    setTimerTimeLeft(seconds);
    setIsTimerRunning(false);
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
    <BaseMIUIApp title="Clock" rightAction={activeTab === "worldclock" || activeTab === "alarm" ? <Plus className="w-5 h-5" /> : undefined}>
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
            <div className="text-center w-full">
              <div className="text-6xl font-thin mb-8">{formatStopwatchTime(stopwatchTime)}</div>
              
              <div className="flex justify-center gap-4 mb-8">
                <button 
                  onClick={isStopwatchRunning ? handleStopwatchStop : handleStopwatchReset}
                  className="w-16 h-16 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-white text-sm"
                >
                  {isStopwatchRunning ? "Stop" : "Reset"}
                </button>
                {stopwatchTime > 0 && !isStopwatchRunning && (
                  <button 
                    onClick={handleStopwatchLap}
                    className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm"
                  >
                    Lap
                  </button>
                )}
                <button 
                  onClick={isStopwatchRunning ? handleStopwatchLap : handleStopwatchStart}
                  className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-sm"
                >
                  {isStopwatchRunning ? "Lap" : "Start"}
                </button>
              </div>

              {/* Laps */}
              {stopwatchLaps.length > 0 && (
                <div className="max-h-48 overflow-y-auto">
                  {stopwatchLaps.map((lapTime, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span>Lap {stopwatchLaps.length - index}</span>
                      <span>{formatStopwatchTime(lapTime)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Timer Tab */}
        {activeTab === "timer" && (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="text-center w-full">
              <div className="text-6xl font-thin mb-8">{formatTimerTime(timerTimeLeft)}</div>
              
              <div className="flex justify-center space-x-4 mb-6">
                <button 
                  onClick={handleTimerReset}
                  className="w-16 h-16 rounded-full bg-gray-800 dark:bg-gray-700 flex items-center justify-center text-white text-sm"
                >
                  Cancel
                </button>
                {timerTimeLeft > 0 && (
                  <button 
                    onClick={isTimerRunning ? handleTimerStop : handleTimerStart}
                    className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white text-sm"
                  >
                    {isTimerRunning ? "Pause" : "Start"}
                  </button>
                )}
              </div>
              
              <div className="mt-8">
                <h3 className="text-sm text-gray-500 mb-4">Presets</h3>
                <div className="grid grid-cols-4 gap-4">
                  {timerPresets.map((minutes) => (
                    <button
                      key={minutes}
                      onClick={() => handleTimerPresetClick(minutes)}
                      className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {minutes} min
                    </button>
                  ))}
                </div>
              </div>
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
    </BaseMIUIApp>
  );
} 