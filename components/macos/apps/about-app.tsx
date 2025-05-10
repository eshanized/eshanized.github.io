"use client";

import { useState, useEffect, useRef } from 'react';
import { TERMINAL_COMMANDS, PERSONAL_INFO } from '@/lib/constants';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, User, ChevronRight, ArrowUp, Laptop, Cloud, Code, Coffee, Sparkles } from 'lucide-react';
import Typewriter from 'typewriter-effect';

export default function AboutApp() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [output, setOutput] = useState<JSX.Element[]>([
    <div key="welcome" className="mb-6 animate-fadeIn">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-5 h-5 text-primary animate-pulse" />
        <div className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">Welcome to Eshan Roy&apos;s Terminal</div>
      </div>
      <div className="text-muted-foreground text-sm backdrop-blur-sm bg-foreground/5 p-3 rounded-md border border-foreground/10">
        Type <span className="text-primary font-mono px-1.5 py-0.5 rounded bg-primary/10 font-semibold">help</span> to see available commands.
      </div>
    </div>
  ]);
  const { theme } = useTheme();
  const [showTyping, setShowTyping] = useState(true);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto focus the terminal
    const timer = setTimeout(() => {
      setShowTyping(false);
      processCommand('about');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to bottom when output changes
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  // Process terminal commands
  const processCommand = (cmd: string) => {
    const commandLower = cmd.toLowerCase().trim();
    
    if (commandLower === '') return;
    
    setCommandHistory(prev => [...prev, commandLower]);
    setHistoryIndex(-1);
    
    let response: JSX.Element;
    
    if (commandLower === 'clear') {
      setOutput([]);
      return;
    } else if (commandLower in TERMINAL_COMMANDS) {
      const commandOutput = TERMINAL_COMMANDS[commandLower as keyof typeof TERMINAL_COMMANDS];
      
      // Format different types of commands with unique styling
      if (commandLower === 'about') {
        response = (
          <div className="whitespace-pre-wrap mb-6 p-4 rounded-md bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20 text-foreground">
            {commandOutput}
          </div>
        );
      } else if (commandLower === 'skills') {
        response = (
          <div className="whitespace-pre-wrap mb-6 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-blue-400">Technical Skills:</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pl-6">
              {commandOutput.split(',').map((skill, i) => (
                <div key={i} className="px-2 py-1 rounded bg-blue-500/10 text-blue-400/90 text-sm flex items-center">
                  <span className="mr-1.5">•</span> {skill.trim()}
                </div>
              ))}
            </div>
          </div>
        );
      } else if (commandLower === 'projects') {
        response = (
          <div className="whitespace-pre-wrap mb-6 p-4 rounded-md bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 text-foreground">
            <div className="flex items-center gap-2 mb-3">
              <Laptop className="w-4 h-4 text-yellow-400" />
              <span className="font-semibold text-yellow-400">Projects:</span>
            </div>
            {commandOutput}
          </div>
        );
      } else if (commandLower === 'contact') {
        response = (
          <div className="whitespace-pre-wrap mb-6 p-4 rounded-md bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 text-foreground">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="w-4 h-4 text-green-400" />
              <span className="font-semibold text-green-400">Contact Info:</span>
            </div>
            {commandOutput}
          </div>
        );
      } else if (commandLower === 'help') {
        const commands = commandOutput.toString().split('\n').filter(Boolean);
        response = (
          <div className="whitespace-pre-wrap mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {commands.map((cmd, i) => {
                const [command, description] = cmd.split(':').map(part => part.trim());
                return (
                  <div key={i} className="flex items-center p-2 rounded bg-foreground/5 hover:bg-foreground/10 transition-colors">
                    <span className="text-primary font-mono font-semibold mr-3">{command}</span>
                    <span className="text-muted-foreground text-sm">{description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      } else {
        response = (
          <div className="whitespace-pre-wrap mb-4 py-2 px-3 rounded bg-foreground/5">
            {commandOutput}
          </div>
        );
      }
    } else {
      response = (
        <div className="text-destructive mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20">
          <div className="flex items-center gap-2">
            <span className="text-lg">⚠️</span>
            <span>{TERMINAL_COMMANDS.unknown}</span>
          </div>
        </div>
      );
    }
    
    setOutput(prev => [
      ...prev,
      <motion.div 
        key={`cmd-${Date.now()}`} 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex items-center mb-2 text-primary font-mono"
      >
        <span className="mr-2 text-green-500">➜</span>
        <span className="font-medium">{commandLower}</span>
      </motion.div>,
      <motion.div 
        key={`res-${Date.now()}`}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {response}
      </motion.div>
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div 
      ref={terminalRef}
      className={`h-full p-5 font-mono overflow-auto terminal-container`}
      style={{
        background: theme === 'dark' 
          ? 'linear-gradient(to bottom, #1a1a2e, #16213e)' 
          : 'linear-gradient(to bottom, #2D2D2D, #1D1D1D)',
        color: theme === 'dark' ? '#a4ffbf' : '#a4ffbf',
        boxShadow: 'inset 0 0 30px rgba(0, 0, 0, 0.3)',
        backgroundImage: theme === 'dark'
          ? 'radial-gradient(circle at 15% 95%, rgba(100, 220, 255, 0.1) 0%, transparent 20%), radial-gradient(circle at 85% 15%, rgba(255, 100, 200, 0.1) 0%, transparent 30%)'
          : 'radial-gradient(circle at 15% 95%, rgba(100, 220, 255, 0.05) 0%, transparent 20%), radial-gradient(circle at 85% 15%, rgba(255, 100, 200, 0.05) 0%, transparent 30%)'
      }}
    >
      {/* Terminal output */}
      <div className="mb-4">
        <AnimatePresence>
          {output}
        </AnimatePresence>
        
        {/* Typewriter effect for first-time visitors */}
        {showTyping && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <span className="mr-2 text-green-500 animate-pulse">➜</span>
            <Typewriter
              options={{
                strings: ['about'],
                autoStart: true,
                loop: false,
                delay: 80,
                cursor: '█'
              }}
            />
          </motion.div>
        )}
      </div>
      
      {/* Command input */}
      <div className="flex items-center p-2 rounded-md bg-black/30 border border-foreground/10">
        <div className="flex items-center mr-2">
          <User className="w-4 h-4 mr-1 text-cyan-400" />
          <span className="text-cyan-400 font-semibold">{PERSONAL_INFO.name}</span>
          <span className="mx-1 text-muted-foreground">@</span>
          <Terminal className="w-4 h-4 mr-1 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">portfolio</span>
          <ChevronRight className="w-4 h-4 mx-1 text-green-500" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none caret-green-400 text-green-300"
          autoFocus
          placeholder="Type a command..."
          style={{textShadow: '0 0 5px rgba(164, 255, 191, 0.5)'}}
        />
      </div>
      
      {/* Command suggestions */}
      <div className="mt-4 text-xs text-foreground/60 flex gap-2 flex-wrap">
        <span>Try:</span>
        {['help', 'about', 'skills', 'projects', 'contact'].map(cmd => (
          <button 
            key={cmd}
            onClick={() => {
              setInput(cmd);
              processCommand(cmd);
            }}
            className="px-2 py-1 rounded bg-foreground/10 hover:bg-foreground/20 transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
}