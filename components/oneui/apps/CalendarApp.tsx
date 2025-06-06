"use client";

import React, { useState, useEffect } from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useOneUITheme } from '../OneUIThemeContext';

export default function CalendarApp() {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<string>("month"); // month, week, day
  const { colors } = useOneUITheme();
  
  // Sample calendar events
  const events = [
    {
      id: 1,
      title: "Coffee with Alex",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: "09:00",
      endTime: "10:00",
      location: "Starbucks",
      color: "bg-blue-500"
    },
    {
      id: 2,
      title: "Product Meeting",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      startTime: "11:30",
      endTime: "12:30",
      location: "Conference Room B",
      color: "bg-green-500"
    },
    {
      id: 3,
      title: "Dentist Appointment",
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      startTime: "14:00",
      endTime: "15:00",
      location: "Dental Clinic",
      color: "bg-orange-500"
    },
    {
      id: 4,
      title: "Team Lunch",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      startTime: "12:30",
      endTime: "13:30",
      location: "Italian Restaurant",
      color: "bg-purple-500"
    },
    {
      id: 5,
      title: "Project Deadline",
      date: new Date(new Date().setDate(new Date().getDate() + 7)),
      startTime: "17:00",
      endTime: "18:00",
      location: "Office",
      color: "bg-red-500"
    }
  ];
  
  // Generate days for the month view
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    
    // Add previous month days to fill the first week
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false
      });
    }
    
    // Add current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add next month days to fill the last week
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Go to today
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };
  
  // Get events for selected date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
  
  // Check if a date is selected
  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };
  
  // Format date for header
  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  // Weekday headers
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <BaseOneUIApp title="Calendar" rightAction={<Plus className="w-5 h-5" />}>
      <div className={`h-full flex flex-col ${colors.primary}`}>
        {/* Calendar navigation */}
        <div className={`p-4 flex items-center justify-between border-b ${colors.divider} ${colors.cardBg}`}>
          <button 
            className={`p-1 ${colors.textSecondary}`}
            onClick={prevMonth}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center">
            <h2 className={`text-lg font-medium ${colors.textPrimary}`}>
              {formatMonthYear(currentMonth)}
            </h2>
            <button 
              className={`ml-3 px-2 py-1 text-xs ${colors.accent} font-medium rounded-sm`}
              onClick={goToToday}
            >
              Today
            </button>
          </div>
          
          <button 
            className={`p-1 ${colors.textSecondary}`}
            onClick={nextMonth}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Calendar grid */}
        <div className={`p-2 ${colors.cardBg}`}>
          {/* Weekday headers */}
          <div className="grid grid-cols-7 mb-2">
            {weekdays.map((day, i) => (
              <div 
                key={i} 
                className={`text-center text-xs font-medium ${colors.textSecondary} py-1`}
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentMonth).map((day, i) => (
              <button
                key={i}
                className={`aspect-square flex flex-col items-center justify-center p-1 relative
                  ${day.isCurrentMonth ? colors.textPrimary : colors.textTertiary}
                  ${isToday(day.date) ? 'font-bold' : ''}
                  ${isSelected(day.date) ? colors.accent + ' text-white rounded-full' : ''}
                `}
                onClick={() => setSelectedDate(day.date)}
              >
                <span className="text-xs">{day.date.getDate()}</span>
                
                {/* Event indicator dots */}
                {day.isCurrentMonth && getEventsForDate(day.date).length > 0 && !isSelected(day.date) && (
                  <div className="absolute bottom-1 flex space-x-0.5">
                    {getEventsForDate(day.date).slice(0, 3).map((event, j) => (
                      <div key={j} className={`w-1 h-1 rounded-full ${event.color}`}></div>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Events list for selected date */}
        <div className={`flex-1 overflow-y-auto p-4 pt-2 ${colors.primary}`}>
          <div className="flex items-center mb-4">
            <CalendarIcon className={`w-5 h-5 ${colors.textSecondary} mr-2`} />
            <h3 className={`font-medium ${colors.textPrimary}`}>
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
          </div>
          
          {getEventsForDate(selectedDate).length > 0 ? (
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map((event) => (
                <div 
                  key={event.id} 
                  className={`${colors.cardBg} p-3 border-l-[3px] ${colors.divider}`}
                  style={{ borderLeftColor: event.color.replace('bg-', '') }}
                >
                  <h4 className={`font-medium ${colors.textPrimary}`}>{event.title}</h4>
                  <div className={`mt-1 text-sm ${colors.textSecondary}`}>
                    <div className="flex items-center">
                      <span>{event.startTime} - {event.endTime}</span>
                    </div>
                    <div className="mt-1">
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center ${colors.textSecondary} py-8`}>
              <p>No events scheduled</p>
            </div>
          )}
        </div>
        
        {/* Add event button */}
        <div className={`p-4 border-t ${colors.divider} ${colors.cardBg} flex justify-center`}>
          <button 
            className={`px-4 py-2 ${colors.accent} text-white rounded-md flex items-center`}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Event
          </button>
        </div>
      </div>
    </BaseOneUIApp>
  );
} 