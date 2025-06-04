"use client";

import React, { useState, useEffect } from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import { Clock, AlarmClock, Timer, Watch, Globe, ChevronRight, Plus, Trash2, Play, Pause } from 'lucide-react';
import { useOneUITheme } from '../OneUIThemeContext';

export default function ClockApp() {
  const [activeTab, setActiveTab] = useState<string>("worldclock");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const { colors } = useOneUITheme();
  
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
    <BaseOneUIApp title="Clock" rightAction={activeTab === "worldclock" || activeTab === "alarm" ? <Plus className="w-5 h-5" /> : undefined}>
      <div className={`h-full flex flex-col ${colors.primary}`}>
        {/* World Clock Tab */}
        {activeTab === "worldclock" && (
          <div className={`flex-1 overflow-y-auto`}>
            <div>
              {worldClocks.map((clock, index) => (
                <div 
                  key={index}
                  className={`p-4 ${colors.cardBg} flex justify-between items-center border-b ${colors.divider}`}
                >
                  <div>
                    <h3 className={`font-medium ${colors.textPrimary}`}>{clock.city}</h3>
                    <p className={`text-xs ${colors.textSecondary}`}>
                      {getTimeDifference(clock.offset)}
                    </p>
                  </div>
                  <div className={`text-xl font-light ${colors.textPrimary}`}>
                    {formatTime(getTimezoneTime(clock.offset))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Alarm Tab */}
        {activeTab === "alarm" && (
          <div className={`flex-1 overflow-y-auto`}>
            <div className={`flex justify-between items-center p-4 mb-1 ${colors.cardBg} border-b ${colors.divider}`}>
              <h2 className={`text-sm ${colors.textSecondary}`}>SLEEP | WAKE UP</h2>
              <button className={`text-sm ${colors.accent}`}>Edit</button>
            </div>
            
            <div className={`space-y-px`}>
              {alarms.map((alarm) => (
                <div 
                  key={alarm.id} 
                  className={`flex justify-between items-center p-4 ${colors.cardBg} border-b ${colors.divider}`}
                >
                  <div>
                    <h3 className={`text-xl font-light ${!alarm.active ? colors.textTertiary : colors.textPrimary}`}>
                      {alarm.time}
                    </h3>
                    <p className={`text-sm ${!alarm.active ? colors.textTertiary : colors.textSecondary}`}>
                      {alarm.label}, {alarm.days.join(", ")}
                    </p>
                  </div>
                  <div className={`w-11 h-6 rounded-full relative ${alarm.active ? colors.toggleActive : colors.toggleInactive}`}>
                    <div 
                      className={`absolute top-[2px] ${alarm.active ? 'right-[2px]' : 'left-[2px]'} w-5 h-5 rounded-full bg-white transition-all`}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Other alarms section */}
            <div className="mt-4">
              <h2 className={`text-sm ${colors.textSecondary} p-4 pb-2`}>OTHER</h2>
              
              <div>
                {alarms.map((alarm) => (
                  <div 
                    key={alarm.id}
                    className={`p-4 ${colors.cardBg} flex justify-between items-center border-b ${colors.divider}`}
                  >
                    <div>
                      <h3 className={`font-medium ${!alarm.active ? colors.textTertiary : colors.textPrimary}`}>
                        {alarm.time}
                      </h3>
                      <p className={`text-xs ${!alarm.active ? colors.textTertiary : colors.textSecondary}`}>
                        {alarm.days.join(", ")}
                      </p>
                    </div>
                    <div className={`w-11 h-6 rounded-full relative ${alarm.active ? colors.toggleActive : colors.toggleInactive}`}>
                      <div 
                        className={`absolute top-[2px] ${alarm.active ? 'right-[2px]' : 'left-[2px]'} w-5 h-5 rounded-full bg-white transition-all`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Stopwatch Tab */}
        {activeTab === "stopwatch" && (
          <div className={`flex-1 flex flex-col items-center justify-center p-4 ${colors.cardBg}`}>
            <div className="text-center w-full">
              {/* Stopwatch Display */}
              <div className={`text-5xl font-light mb-10 ${colors.textPrimary}`}>
                {formatStopwatchTime(stopwatchTime)}
              </div>
              
              {/* Stopwatch Controls */}
              <div className="flex justify-center space-x-6">
                {isStopwatchRunning ? (
                  <>
                    <button 
                      className={`w-14 h-14 rounded-full ${colors.buttonBg} flex items-center justify-center`}
                      onClick={handleStopwatchLap}
                    >
                      <Clock className={`w-6 h-6 ${colors.textSecondary}`} />
                    </button>
                    
                    <button 
                      className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center"
                      onClick={handleStopwatchStop}
                    >
                      <Pause className="w-6 h-6 text-white" />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className={`w-14 h-14 rounded-full ${colors.buttonBg} flex items-center justify-center ${stopwatchTime === 0 ? 'opacity-50' : ''}`}
                      onClick={handleStopwatchReset}
                      disabled={stopwatchTime === 0}
                    >
                      <Trash2 className={`w-6 h-6 ${colors.textSecondary}`} />
                    </button>
                    
                    <button 
                      className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center"
                      onClick={handleStopwatchStart}
                    >
                      <Play className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}
              </div>
              
              {/* Laps */}
              {stopwatchLaps.length > 0 && (
                <div className={`mt-10 w-full max-w-xs mx-auto ${colors.cardBg}`}>
                  <div className={`text-left px-4 py-2 ${colors.textSecondary} text-sm font-medium`}>LAPS</div>
                  <div className="max-h-48 overflow-y-auto">
                    {stopwatchLaps.map((lap, index) => (
                      <div 
                        key={index} 
                        className={`flex justify-between py-2 px-4 ${index % 2 === 0 ? colors.tertiary : colors.cardBg}`}
                      >
                        <span className={`${colors.textSecondary}`}>Lap {stopwatchLaps.length - index}</span>
                        <span className={`${colors.textPrimary}`}>{formatStopwatchTime(lap)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Timer Tab */}
        {activeTab === "timer" && (
          <div className={`flex-1 flex flex-col p-4 ${colors.cardBg}`}>
            {/* Timer Display */}
            <div className="text-center flex-1 flex flex-col items-center justify-center">
              <div className={`text-6xl font-light mb-6 ${colors.textPrimary}`}>
                {formatTimerTime(timerTimeLeft)}
              </div>
              
              {/* Timer Controls */}
              <div className="flex justify-center space-x-6">
                {isTimerRunning ? (
                  <>
                    <button 
                      className={`w-14 h-14 rounded-full ${colors.buttonBg} flex items-center justify-center`}
                      onClick={handleTimerReset}
                    >
                      <Trash2 className={`w-6 h-6 ${colors.textSecondary}`} />
                    </button>
                    
                    <button 
                      className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center"
                      onClick={handleTimerStop}
                    >
                      <Pause className="w-6 h-6 text-white" />
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className={`w-14 h-14 rounded-full ${colors.buttonBg} flex items-center justify-center ${timerTimeLeft === 0 ? 'opacity-50' : ''}`}
                      onClick={handleTimerReset}
                      disabled={timerTimeLeft === 0}
                    >
                      <Trash2 className={`w-6 h-6 ${colors.textSecondary}`} />
                    </button>
                    
                    <button 
                      className={`w-14 h-14 rounded-full bg-green-500 flex items-center justify-center ${timerTimeLeft === 0 ? 'opacity-50' : ''}`}
                      onClick={handleTimerStart}
                      disabled={timerTimeLeft === 0}
                    >
                      <Play className="w-6 h-6 text-white" />
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {/* Timer Presets */}
            <div className="mt-6">
              <h3 className={`text-sm font-medium ${colors.textSecondary} mb-2`}>PRESETS</h3>
              <div className="grid grid-cols-4 gap-2">
                {timerPresets.map(preset => (
                  <button
                    key={preset}
                    className={`py-2 text-center ${colors.tertiary} rounded-sm ${colors.textPrimary}`}
                    onClick={() => handleTimerPresetClick(preset)}
                  >
                    {preset} {preset === 1 ? 'min' : 'mins'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Bottom Tabs */}
        <div className={`border-t ${colors.divider} ${colors.cardBg} flex justify-around`}>
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`flex flex-col items-center py-2 px-4 ${
                activeTab === tab.id 
                  ? colors.accent
                  : colors.textSecondary
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </BaseOneUIApp>
  );
} 