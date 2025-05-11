"use client";

import { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search,
  Calendar as CalendarIcon
} from 'lucide-react';
import { motion } from 'framer-motion';

// Define event type
type Event = {
  id: string;
  title: string;
  date: Date;
  time?: string;
  color: string;
  location?: string;
};

// Define view modes
type ViewMode = 'month' | 'week' | 'day';

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  
  // Sample events wrapped in useMemo
  const events = useMemo(() => [
    {
      id: '1',
      title: 'Coffee with Client',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      time: '10:00 AM',
      color: 'bg-blue-500',
      location: 'Starbucks'
    },
    {
      id: '2',
      title: 'Project Deadline',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22),
      time: '6:00 PM',
      color: 'bg-red-500'
    },
    {
      id: '3',
      title: 'Team Meeting',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      time: '2:00 PM',
      color: 'bg-green-500',
      location: 'Conference Room B'
    },
    {
      id: '4',
      title: 'Dentist Appointment',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      time: '11:30 AM',
      color: 'bg-orange-500',
      location: 'Downtown Dental'
    },
    {
      id: '5',
      title: 'Birthday Party',
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 28),
      time: '7:00 PM',
      color: 'bg-purple-500',
      location: 'Dave\'s House'
    }
  ], [currentDate]);
  
  // Calendar navigation
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentDate(new Date());
  };
  
  // Generate calendar data
  const calendarData = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstDayOfMonth.getDay();
    
    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Calculate the number of days from the previous month to show
    const daysFromPrevMonth = dayOfWeek;
    
    // Get the number of days in the previous month
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    
    // Calculate the starting date (might be from the previous month)
    const startingDate = daysFromPrevMonth > 0 
      ? new Date(year, month - 1, daysInPrevMonth - daysFromPrevMonth + 1) 
      : firstDayOfMonth;
    
    // Generate 6 weeks (42 days) of data
    const days = [];
    const currentDateObj = new Date(startingDate);
    
    for (let i = 0; i < 42; i++) {
      days.push({
        date: new Date(currentDateObj),
        isCurrentMonth: currentDateObj.getMonth() === month,
        isToday: 
          currentDateObj.getDate() === new Date().getDate() &&
          currentDateObj.getMonth() === new Date().getMonth() &&
          currentDateObj.getFullYear() === new Date().getFullYear(),
        events: events.filter(event => 
          event.date.getDate() === currentDateObj.getDate() &&
          event.date.getMonth() === currentDateObj.getMonth() &&
          event.date.getFullYear() === currentDateObj.getFullYear()
        )
      });
      
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }
    
    // Chunk the days into weeks
    const weeks = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }
    
    return weeks;
  }, [currentDate, events]);
  
  // Format date for display
  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };
  
  // Format date for day view
  const formatDay = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };
  
  // Get events for selected date
  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };
  
  // Handle day click
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    if (viewMode === 'month') {
      setViewMode('day');
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Toolbar */}
      <div className="border-b bg-muted/30 backdrop-blur-sm p-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button 
            onClick={prevMonth}
            className="p-1 rounded hover:bg-accent/50"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-1 rounded hover:bg-accent/50"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button 
            onClick={goToToday}
            className="px-3 py-1 text-xs bg-muted rounded hover:bg-accent/50"
          >
            Today
          </button>
          <h2 className="text-sm font-medium ml-2">
            {viewMode === 'month' && formatMonth(currentDate)}
            {viewMode === 'day' && selectedDate && formatDay(selectedDate)}
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex border rounded overflow-hidden">
            <button 
              onClick={() => setViewMode('day')}
              className={`px-3 py-1 text-xs ${viewMode === 'day' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/30'}`}
            >
              Day
            </button>
            <button 
              onClick={() => setViewMode('week')}
              className={`px-3 py-1 text-xs ${viewMode === 'week' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/30'}`}
            >
              Week
            </button>
            <button 
              onClick={() => setViewMode('month')}
              className={`px-3 py-1 text-xs ${viewMode === 'month' ? 'bg-accent text-accent-foreground' : 'hover:bg-accent/30'}`}
            >
              Month
            </button>
          </div>
          
          <button 
            onClick={() => setShowEventModal(true)}
            className="p-1 rounded hover:bg-accent/50"
          >
            <Plus className="w-4 h-4" />
          </button>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="w-32 bg-muted rounded-md border border-input py-1 pl-8 pr-3 text-xs"
            />
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          </div>
        </div>
      </div>
      
      {/* Sidebar and Calendar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r p-2 flex flex-col">
          <div className="w-full h-48 rounded-lg bg-accent/10 flex flex-col items-center justify-center mb-4">
            <CalendarIcon className="w-12 h-12 text-accent mb-2" />
            <div className="text-2xl font-bold">{new Date().getDate()}</div>
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
          </div>
          
          <h3 className="font-medium text-sm mb-2">My Calendars</h3>
          <div className="space-y-1 mb-4">
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
              <span>Work</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span>Personal</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span>Deadlines</span>
            </div>
            <div className="flex items-center text-xs">
              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
              <span>Social</span>
            </div>
          </div>
          
          <h3 className="font-medium text-sm mb-2">Upcoming Events</h3>
          <div className="space-y-2 flex-1 overflow-y-auto">
            {events
              .filter(event => event.date >= new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 3)
              .map(event => (
                <div key={event.id} className="p-2 bg-muted rounded-md text-xs">
                  <div className="font-medium truncate">{event.title}</div>
                  <div className="text-muted-foreground mt-1">
                    {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {event.time && ` • ${event.time}`}
                  </div>
                  {event.location && (
                    <div className="text-muted-foreground mt-0.5 truncate">{event.location}</div>
                  )}
                </div>
              ))
            }
          </div>
        </div>
        
        {/* Calendar Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {viewMode === 'month' && (
            <div className="flex-1 flex flex-col">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b text-xs text-center py-2 text-muted-foreground">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day}>{day}</div>
                ))}
              </div>
              
              {/* Calendar grid */}
              <div className="flex-1 grid grid-rows-6 overflow-auto">
                {calendarData.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-cols-7 border-b">
                    {week.map((day, dayIndex) => (
                      <div 
                        key={dayIndex} 
                        className={`min-h-[80px] p-1 border-r relative cursor-pointer hover:bg-accent/10 ${
                          !day.isCurrentMonth ? 'text-muted-foreground' : ''
                        }`}
                        onClick={() => handleDayClick(day.date)}
                      >
                        <div className={`text-xs w-5 h-5 flex items-center justify-center ${
                          day.isToday ? 'bg-primary text-primary-foreground rounded-full' : ''
                        }`}>
                          {day.date.getDate()}
                        </div>
                        
                        {/* Events */}
                        <div className="mt-1 space-y-1">
                          {day.events.slice(0, 3).map(event => (
                            <div 
                              key={event.id}
                              className={`${event.color} text-white text-xs p-1 rounded truncate`}
                            >
                              {event.time && <span className="mr-1 opacity-80">{event.time}</span>}
                              {event.title}
                            </div>
                          ))}
                          {day.events.length > 3 && (
                            <div className="text-xs text-muted-foreground px-1">
                              +{day.events.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {viewMode === 'day' && selectedDate && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="grid grid-cols-1 flex-1 overflow-auto">
                {/* Time slots */}
                {Array.from({ length: 24 }).map((_, hour) => (
                  <div key={hour} className="border-b flex">
                    <div className="w-16 text-xs text-muted-foreground p-2 border-r">
                      {hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`}
                    </div>
                    <div className="flex-1 p-1 relative min-h-[60px]">
                      {getEventsForDate(selectedDate)
                        .filter(event => {
                          if (!event.time) return false;
                          const eventHour = parseInt(event.time.split(':')[0]);
                          return (
                            event.time.includes('AM') && eventHour === hour ||
                            event.time.includes('PM') && (eventHour + 12) % 12 + 12 === hour
                          );
                        })
                        .map(event => (
                          <div 
                            key={event.id}
                            className={`${event.color} text-white text-xs p-2 rounded absolute top-1 left-1 right-1 min-h-[50px]`}
                          >
                            <div className="font-medium">{event.title}</div>
                            <div className="mt-1 opacity-80">{event.time}</div>
                            {event.location && <div className="mt-0.5 opacity-80">{event.location}</div>}
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {viewMode === 'week' && (
            <div className="flex-1 flex flex-col">
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b text-xs text-center py-2">
                {Array.from({ length: 7 }).map((_, i) => {
                  const date = new Date(currentDate);
                  date.setDate(date.getDate() - date.getDay() + i);
                  const isToday = 
                    date.getDate() === new Date().getDate() &&
                    date.getMonth() === new Date().getMonth() &&
                    date.getFullYear() === new Date().getFullYear();
                  
                  return (
                    <div key={i} className="flex flex-col items-center">
                      <div className="text-muted-foreground">
                        {date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </div>
                      <div className={`w-6 h-6 flex items-center justify-center mt-1 ${
                        isToday ? 'bg-primary text-primary-foreground rounded-full' : ''
                      }`}>
                        {date.getDate()}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Week view */}
              <div className="flex-1 overflow-auto">
                <div className="grid grid-cols-7 h-full">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const date = new Date(currentDate);
                    date.setDate(date.getDate() - date.getDay() + dayIndex);
                    
                    const dayEvents = events.filter(event => 
                      event.date.getDate() === date.getDate() &&
                      event.date.getMonth() === date.getMonth() &&
                      event.date.getFullYear() === date.getFullYear()
                    );
                    
                    return (
                      <div key={dayIndex} className="border-r p-1 relative">
                        {dayEvents.map((event, i) => (
                          <div 
                            key={event.id}
                            className={`${event.color} text-white text-xs p-1 rounded mb-1 truncate`}
                            style={{ top: `${(i * 30) + 10}px` }}
                          >
                            {event.time && <span className="mr-1 opacity-80">{event.time}</span>}
                            {event.title}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 