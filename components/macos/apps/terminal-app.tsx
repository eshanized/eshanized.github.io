"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Copy, 
  Plus, 
  X, 
  Square,
  Minimize2, 
  RotateCcw,
  Settings,
  ExternalLink,
  Terminal as TerminalIcon,
  MoreHorizontal
} from 'lucide-react';
import { PERSONAL_INFO } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import React from 'react';

// Command type
type Command = {
  input: string;
  output: string | string[] | JSX.Element;
  timestamp: Date;
};

// Terminal config
type TerminalConfig = {
  theme: 'dark' | 'light' | 'system';
  fontSize: number;
  fontFamily: string;
  showTimestamps: boolean;
  showPromptIcon: boolean;
  transparencyLevel: number;
};

// Terminal colors
const terminalColors = {
  dark: {
    background: '#1e1e1e',
    text: '#f1f1f1',
    prompt: '#59ff59',
    comment: '#808080',
    selection: 'rgba(255, 255, 255, 0.2)',
    // macOS neofetch colors
    red: '#FF5F57',
    orange: '#FF9F43',
    yellow: '#FFBD2E',
    green: '#28CA42',
    blue: '#1E90FF',
    purple: '#BD93F9',
    cyan: '#00C0C0'
  },
  light: {
    background: '#f7f7f7',
    text: '#121212',
    prompt: '#009900',
    comment: '#6a6a6a',
    selection: 'rgba(0, 0, 0, 0.1)',
    // macOS neofetch colors
    red: '#FF3B30',
    orange: '#FF9500',
    yellow: '#FFCC00',
    green: '#34C759',
    blue: '#007AFF',
    purple: '#AF52DE',
    cyan: '#00CED1'
  }
};

export default function TerminalApp() {
  const [command, setCommand] = useState('');
  const [history, setHistory] = useState<Command[]>([
    {
      input: '',
      output: [
        `Last login: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} on ttys001`,
        `${PERSONAL_INFO.name.toLowerCase().replace(' ', '')}@MacBook-Pro ~ % `,
        `Type 'help' to see available commands.`,
        ``
      ],
      timestamp: new Date()
    }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [config, setConfig] = useState<TerminalConfig>({
    theme: 'dark',
    fontSize: 14,
    fontFamily: 'Menlo, monospace',
    showTimestamps: false,
    showPromptIcon: true,
    transparencyLevel: 0.9
  });
  
  const [showSettings, setShowSettings] = useState(false);
  const [tabs, setTabs] = useState<string[]>(['bash – 80×24']);
  const [activeTab, setActiveTab] = useState(0);
  const { theme } = useTheme();
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Autofocus the input field
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  
  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  
  // Generate authentic macOS neofetch
  const generateNeofetch = () => {
    // Get macOS version name
    const snigdhaOSVersions = {
      "14": "Sonoma",
      "13": "Ventura",
      "12": "Monterey",
      "11": "Big Sur",
      "10.15": "Catalina"
    };
    const randomVersion = Object.keys(snigdhaOSVersions)[Math.floor(Math.random() * Object.keys(snigdhaOSVersions).length)];
  const versionName = snigdhaOSVersions[randomVersion as keyof typeof snigdhaOSVersions];
    
    // Calculate uptime
    const hours = Math.floor(Math.random() * 24);
    const mins = Math.floor(Math.random() * 60);
    const secs = Math.floor(Math.random() * 60);
    const uptimeStr = `${hours}:${mins}:${secs}`;
    
    // Random memory usage
    const memUsed = Math.floor(Math.random() * 8000) + 2000;
    const memTotal = 16384;
    
    // Shell path
    const shellPath = `/bin/zsh`;
    
    // Username
    const username = PERSONAL_INFO.name.toLowerCase().replace(/\s+/g, '');
    
    // Generate terminal colors row
    const termColorBlocks = () => {
      const colors = termTheme === 'dark' ? terminalColors.dark : terminalColors.light;
      return (
        <div className="flex gap-1 mt-1">
          <span style={{color: colors.red}}>███</span>
          <span style={{color: colors.orange}}>███</span>
          <span style={{color: colors.yellow}}>███</span>
          <span style={{color: colors.green}}>███</span>
          <span style={{color: colors.blue}}>███</span>
          <span style={{color: colors.purple}}>███</span>
          <span style={{color: colors.cyan}}>███</span>
        </div>
      );
    };
    
    // macOS logo in ASCII art with custom colors
    return (
      <div className="font-mono whitespace-pre-wrap">
        <div className="flex">
          <div className="mr-6" style={{color: terminalColors[termTheme as keyof typeof terminalColors].green}}>
            {`                    .:'
                 _ :'_
             .'` + '`_.\'.\'\'.\'_.\'.' + `
          / .' \\('-.:.-')/'.\\
         / -' (( :-:.-:.)) '.\\
        / .-'.-.\\.'-'.-:.-'.-.\\
       / '.-.-. -.(..-:|:..).-'\\
      /.' -..''.' .-\\/:/-' .-.';\\
     /'.-'.'.-..-'..-'\\'-.-'.-.-;\\
    /.' .' .'   .'\\\\\\\\\\  \\ \\ \\ \\ -.;\\
   / .-' .'  .-'.-.\\\\\\\\)  \\ \\ \\-. \\ .\\
  / .-' .-' .'   \\   \\\\\\\\   \\ \\ \\ \\ \\',\\
 /-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.;`}
          </div>
          <div className="flex flex-col ml-1">
            <div><span className="font-bold" style={{color: terminalColors[termTheme as keyof typeof terminalColors].blue}}>{username}@MacBook-Pro</span></div>
            <div style={{color: terminalColors[termTheme as keyof typeof terminalColors].blue}}>--------------------</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>OS:</span> SnigdhaOS {randomVersion}.0 {versionName}</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>Host:</span> MacBook Pro (M2, 2023)</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>Kernel:</span> Darwin 23.1.0</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>Uptime:</span> {uptimeStr}</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>Shell:</span> {shellPath}</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>Terminal:</span> Portfolio Terminal</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>CPU:</span> Apple M2 Pro (10-core)</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>Memory:</span> {memUsed}MB / {memTotal}MB</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>Resolution:</span> Browser × Browser</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>DE:</span> Aqua</div>
            <div><span style={{color: terminalColors[termTheme as keyof typeof terminalColors].yellow}}>WM:</span> Quartz Compositor</div>
            <div className="mt-2" style={{color: terminalColors[termTheme as keyof typeof terminalColors].blue}}>{PERSONAL_INFO.title}</div>
            {termColorBlocks()}
          </div>
        </div>
      </div>
    );
  };
  
  // Command execution
  const executeCommand = (cmd: string) => {
    // Skip empty commands
    if (!cmd.trim()) return;
    
    let output: string | string[] | JSX.Element = '';
    const normalizedCmd = cmd.trim().toLowerCase();
    
    // Parse command and arguments
    const args = normalizedCmd.split(' ');
    const mainCommand = args[0];
    
    // Execute commands
    switch (mainCommand) {
      case 'help':
        output = [
          'Available commands:',
          '',
          'help              - Display this help message',
          'clear             - Clear the terminal screen',
          'echo [text]       - Display the text',
          'date              - Display the current date and time',
          'ls                - List directory contents',
          'pwd               - Print working directory',
          'whoami            - Display current user',
          'cat [file]        - Display file content',
          'history           - Show command history',
          'about             - Display information about this terminal',
          '',
          'Try these fun commands:',
          'neofetch          - Display system info in SnigdhaOS style',
          'fortune           - Display a random quote',
          'banner [text]     - Display text as ASCII art',
          ''
        ];
        break;
        
      case 'clear':
        // Just reset history
        setHistory([]);
        return;
        
      case 'echo':
        output = args.slice(1).join(' ') || '';
        break;
        
      case 'date':
        output = new Date().toString();
        break;
        
      case 'ls':
        output = [
          'Applications',
          'Desktop',
          'Documents',
          'Downloads',
          'Library',
          'Movies',
          'Music',
          'Pictures',
          'Public',
          'projects',
          'portfolio.md',
          'resume.pdf'
        ];
        break;
        
      case 'pwd':
        output = '/Users/' + PERSONAL_INFO.name.toLowerCase().replace(' ', '');
        break;
        
      case 'whoami':
        output = PERSONAL_INFO.name.toLowerCase().replace(' ', '');
        break;
        
      case 'cat':
        if (args.length < 2) {
          output = 'cat: missing file operand';
        } else if (args[1] === 'portfolio.md') {
          output = [
            '# Portfolio',
            '',
            `# ${PERSONAL_INFO.name}`,
            `## ${PERSONAL_INFO.title}`,
            '',
            '## Skills',
            '- Frontend Development',
            '- UI/UX Design',
            '- Backend Development',
            '- Mobile Development',
            '',
            '## Contact',
            `- Email: ${PERSONAL_INFO.email}`,
            `- Website: ${PERSONAL_INFO.website}`,
            ''
          ];
        } else {
          output = `cat: ${args[1]}: No such file or directory`;
        }
        break;
        
      case 'history':
        output = history.map((item, index) => `${index + 1}  ${item.input}`).join('\n');
        break;
        
      case 'about':
        output = [
          'Terminal App',
          'Version 1.0.0',
          '',
          'A simulated SnigdhaOS terminal for the portfolio',
          `Built with Next.js, React, and TypeScript`,
          '',
          `© ${new Date().getFullYear()} ${PERSONAL_INFO.name}`
        ];
        break;
        
      case 'neofetch':
        output = generateNeofetch();
        break;
        
      case 'banner':
        if (args.length < 2) {
          output = 'Usage: banner [text]';
        } else {
          const bannerText = args.slice(1).join(' ');
          output = [
            '##################################################',
            `#                                                #`,
            `#    ${bannerText.padEnd(42, ' ')}#`,
            `#                                                #`,
            '##################################################',
          ];
        }
        break;
        
      case 'fortune':
        const fortunes = [
          "The best way to predict the future is to create it.",
          "Code is like humor. When you have to explain it, it's bad.",
          "Programming isn't about what you know; it's about what you can figure out.",
          "The only way to learn a new programming language is by writing programs in it.",
          "The most disastrous thing that you can ever learn is your first programming language.",
          "Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday's code.",
          "It's not a bug – it's an undocumented feature.",
          "First, solve the problem. Then, write the code.",
          "Experience is the name everyone gives to their mistakes.",
          "Java is to JavaScript what car is to carpet."
        ];
        output = fortunes[Math.floor(Math.random() * fortunes.length)];
        break;
        
      default:
        output = `zsh: command not found: ${mainCommand}`;
    }
    
    // Add to history
    setHistory(prev => [
      ...prev,
      {
        input: cmd,
        output,
        timestamp: new Date()
      }
    ]);
    
    // Reset command and history index
    setCommand('');
    setHistoryIndex(-1);
  };
  
  // Handle key events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Execute command
      executeCommand(command);
    } else if (e.key === 'ArrowUp') {
      // Navigate command history (backwards)
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex].input);
      }
    } else if (e.key === 'ArrowDown') {
      // Navigate command history (forwards)
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex].input);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCommand('');
      }
    } else if (e.key === 'c' && e.ctrlKey) {
      // Cancel current command
      setCommand('');
      setHistory(prev => [
        ...prev,
        {
          input: command,
          output: '^C',
          timestamp: new Date()
        }
      ]);
    } else if (e.key === 'l' && e.ctrlKey) {
      // Clear screen
      e.preventDefault();
      setHistory([]);
    } else if (e.key === 'Tab') {
      // Simple tab completion
      e.preventDefault();
      
      // List of common commands for auto-completion
      const commands = ['help', 'clear', 'echo', 'date', 'ls', 'pwd', 'whoami', 'cat', 'history', 'about', 'neofetch', 'fortune', 'banner'];
      
      if (command.trim()) {
        const matchingCommands = commands.filter(cmd => cmd.startsWith(command.trim()));
        if (matchingCommands.length === 1) {
          setCommand(matchingCommands[0]);
        } else if (matchingCommands.length > 1) {
          // Show available options
          setHistory(prev => [
            ...prev,
            {
              input: command,
              output: matchingCommands.join('  '),
              timestamp: new Date()
            }
          ]);
        }
      }
    }
  };
  
  // Copy output to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  
  // Format output for display
  const formatOutput = (output: string | string[] | JSX.Element) => {
    if (Array.isArray(output)) {
      return output.join('\n');
    }
    return output;
  };
  
  // Handle settings change
  const updateSettings = (newSettings: Partial<TerminalConfig>) => {
    setConfig(prev => ({ ...prev, ...newSettings }));
  };
  
  // Add a new tab
  const addTab = () => {
    const newTabName = `bash – 80×24`;
    setTabs([...tabs, newTabName]);
    setActiveTab(tabs.length);
  };
  
  // Close a tab
  const closeTab = (index: number) => {
    if (tabs.length === 1) return; // Don't close the last tab
    
    const newTabs = tabs.filter((_, i) => i !== index);
    setTabs(newTabs);
    
    // Adjust active tab if needed
    if (activeTab === index) {
      setActiveTab(Math.max(0, index - 1));
    } else if (activeTab > index) {
      setActiveTab(activeTab - 1);
    }
  };
  
  // Current directory (simulated)
  const currentDirectory = '/Users/' + PERSONAL_INFO.name.toLowerCase().replace(' ', '');
  
  // Determine terminal theme
  const termTheme = config.theme === 'system' 
    ? (theme === 'dark' ? 'dark' : 'light')
    : config.theme;
  
  const termColor = terminalColors[termTheme as keyof typeof terminalColors];
  
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Terminal toolbar */}
      <div className="border-b border-black/10 dark:border-white/10 flex justify-between items-center px-2">
        <div className="flex items-center">
          {/* Window controls */}
          <div className="flex items-center py-2 pl-1 pr-3 space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-600 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer hover:bg-yellow-600 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer hover:bg-green-600 transition-colors" />
          </div>
          
          {/* Tab bar */}
          <div className="flex items-center h-7 overflow-x-auto hide-scrollbar">
            {tabs.map((tabName, index) => (
              <div 
                key={index}
                className={`flex items-center px-3 py-1 text-xs cursor-pointer
                  ${activeTab === index 
                    ? 'bg-muted/70 font-medium text-foreground rounded-t-md border-t border-x border-black/5 dark:border-white/5' 
                    : 'hover:bg-muted/40 text-muted-foreground'}`}
                onClick={() => setActiveTab(index)}
              >
                <TerminalIcon className="w-3 h-3 mr-1.5 opacity-70" />
                <span>{tabName}</span>
                {tabs.length > 1 && (
                  <button 
                    className="ml-2 opacity-50 hover:opacity-100"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeTab(index);
                    }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            
            {/* New tab button */}
            <button 
              className="p-1 rounded-md hover:bg-accent/30 text-muted-foreground"
              onClick={addTab}
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <button 
            className="p-1.5 rounded-full hover:bg-accent/30"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-1.5 rounded-full hover:bg-accent/30">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-3 font-mono"
        style={{
          fontSize: `${config.fontSize}px`,
          fontFamily: config.fontFamily,
          backgroundColor: `${termColor.background}${config.transparencyLevel < 1 ? Math.round(config.transparencyLevel * 255).toString(16).padStart(2, '0') : ''}`,
          color: termColor.text,
          wordBreak: 'break-word'
        }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Command history */}
        {history.map((item, index) => (
          <div key={index} className="mb-2">
            {/* Command prompt and input */}
            {item.input && (
              <div className="flex items-start group">
                <div className="mr-2 whitespace-nowrap flex items-center" style={{ color: termColor.prompt }}>
                  {config.showPromptIcon && (
                    <span className="mr-1">%</span>
                  )}
                  <span>{currentDirectory.split('/').pop()} $</span>
                </div>
                <div className="flex-1">{item.input}</div>
                <button 
                  className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(item.input)}
                >
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            )}
            
            {/* Command output */}
            {item.output && (
              <div className="mt-1 whitespace-pre-wrap pl-0">
                {React.isValidElement(item.output) ? item.output : formatOutput(item.output)}
              </div>
            )}
            
            {/* Timestamp */}
            {config.showTimestamps && (
              <div className="text-xs mt-1" style={{ color: termColor.comment }}>
                {item.timestamp.toLocaleTimeString()}
              </div>
            )}
          </div>
        ))}
        
        {/* Current command prompt */}
        <div className="flex items-center mt-2">
          <div className="whitespace-nowrap flex items-center mr-2" style={{ color: termColor.prompt }}>
            {config.showPromptIcon && (
              <span className="mr-1">%</span>
            )}
            <span>{currentDirectory.split('/').pop()} $</span>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none"
            autoComplete="off"
            spellCheck="false"
            style={{
              caretColor: termColor.text,
            }}
          />
        </div>
      </div>
      
      {/* Terminal settings panel */}
      {showSettings && (
        <div className="absolute right-4 top-12 w-72 bg-background border rounded-md shadow-md p-4 z-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Terminal Settings</h3>
            <button 
              className="p-1 rounded-full hover:bg-accent/30"
              onClick={() => setShowSettings(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Theme</label>
              <select 
                value={config.theme}
                onChange={(e) => updateSettings({ theme: e.target.value as 'dark' | 'light' | 'system' })}
                className="w-full bg-muted p-1.5 rounded text-sm"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
                <option value="system">System</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Font Size</label>
              <div className="flex items-center">
                <input 
                  type="range" 
                  min="10"
                  max="20"
                  value={config.fontSize}
                  onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                  className="flex-1 mr-2"
                />
                <span className="text-sm">{config.fontSize}px</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Font Family</label>
              <select 
                value={config.fontFamily}
                onChange={(e) => updateSettings({ fontFamily: e.target.value })}
                className="w-full bg-muted p-1.5 rounded text-sm"
              >
                <option value="Menlo, monospace">Menlo</option>
                <option value="Monaco, monospace">Monaco</option>
                <option value="'SF Mono', monospace">SF Mono</option>
                <option value="'Courier New', monospace">Courier New</option>
                <option value="'Source Code Pro', monospace">Source Code Pro</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm text-muted-foreground block mb-1">Background Opacity</label>
              <div className="flex items-center">
                <input 
                  type="range" 
                  min="0.5"
                  max="1"
                  step="0.05"
                  value={config.transparencyLevel}
                  onChange={(e) => updateSettings({ transparencyLevel: parseFloat(e.target.value) })}
                  className="flex-1 mr-2"
                />
                <span className="text-sm">{Math.round(config.transparencyLevel * 100)}%</span>
              </div>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="show-timestamps"
                checked={config.showTimestamps}
                onChange={(e) => updateSettings({ showTimestamps: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="show-timestamps" className="text-sm">Show timestamps</label>
            </div>
            
            <div className="flex items-center">
              <input 
                type="checkbox"
                id="show-prompt-icon"
                checked={config.showPromptIcon}
                onChange={(e) => updateSettings({ showPromptIcon: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="show-prompt-icon" className="text-sm">Show prompt icon (%)</label>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <button 
              className="w-full bg-primary text-primary-foreground py-1.5 rounded-md text-sm"
              onClick={() => {
                setHistory([{
                  input: '',
                  output: [
                    `Last login: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} on ttys001`,
                    `${PERSONAL_INFO.name.toLowerCase().replace(' ', '')}@MacBook-Pro ~ % `,
                    `Type 'help' to see available commands.`,
                    ``
                  ],
                  timestamp: new Date()
                }]);
                setShowSettings(false);
              }}
            >
              Clear Terminal History
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 