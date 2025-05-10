"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';
import { User, Power, Wifi, Battery, ChevronDown, Lock, ArrowRight, Info, Globe, Moon, Sun } from 'lucide-react';

export function LoginScreen({ onLogin }: { onLogin: (specialUser?: string) => void }) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const githubAvatarUrl = "https://github.com/eshanized.png";
  const controls = useAnimation();

  // MacOS-style dynamic wallpaper effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles: {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
    }[] = [];

    // macOS authentic colors for Big Sur wallpaper
    const lightColors = [
      'rgba(88, 172, 250, 0.5)',    // Blue #58ACFA
      'rgba(0, 175, 255, 0.5)',     // Teal #00AFFF
      'rgba(0, 102, 255, 0.5)',     // Default Blue #0066FF
      'rgba(255, 45, 85, 0.5)',     // Pink #FF2D55
      'rgba(255, 149, 0, 0.5)',     // Orange #FF9500
    ];
    
    const darkColors = [
      'rgba(10, 132, 255, 0.5)',    // Blue #0A84FF
      'rgba(100, 210, 255, 0.5)',   // Teal #64D2FF
      'rgba(94, 92, 230, 0.5)',     // Purple #5E5CE6
      'rgba(255, 55, 95, 0.5)',     // Pink #FF375F
      'rgba(255, 159, 10, 0.5)',    // Orange #FF9F0A
    ];
    
    const colors = theme === 'dark' ? darkColors : lightColors;

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 80; i++) {
        const radius = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocity: {
            x: (Math.random() - 0.5) * 0.15,
            y: (Math.random() - 0.5) * 0.15
          }
        });
      }
    };

    const animateParticles = () => {
      requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create macOS-style gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.height
      );
      
      if (theme === 'dark') {
        // Dark theme - Big Sur dark colors
        gradient.addColorStop(0, '#1E1E20');    // Dark gray center
        gradient.addColorStop(0.5, '#1C1C1E');  // Darker gray
        gradient.addColorStop(1, '#0C0C0E');    // Nearly black edges
      } else {
        // Light theme - Big Sur light colors
        gradient.addColorStop(0, '#F2F2F7');    // Light gray center
        gradient.addColorStop(0.5, '#FFFFFF');  // Pure white
        gradient.addColorStop(1, '#E5E5EA');    // System gray edges
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles with smoother movement
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Update position with smoother motion
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Create subtle swirl effect
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const distX = particle.x - centerX;
        const distY = particle.y - centerY;
        const dist = Math.sqrt(distX * distX + distY * distY);
        
        if (dist > 0) {
          const swirl = 0.0001 * Math.sin(Date.now() * 0.0005);
          particle.velocity.x += -distY * swirl;
          particle.velocity.y += distX * swirl;
        }

        // Boundary checking
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.velocity.x *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.velocity.y *= -1;
        }
      });

      // Draw macOS-style aurora blur effect (softer, more subtle)
      ctx.filter = 'blur(90px)';
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        const x = Math.sin(Date.now() * 0.0005 + i) * (canvas.width / 4) + canvas.width / 2;
        const y = Math.cos(Date.now() * 0.0004 + i) * (canvas.height / 5) + canvas.height / 2;
        
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, theme === 'dark' ? 350 : 400
        );
        gradient.addColorStop(0, colors[i % colors.length].replace('0.5', theme === 'dark' ? '0.4' : '0.3'));
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(x, y, theme === 'dark' ? 350 : 400, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.filter = 'none';

      // Subtle animated gradients (mimicking macOS dynamic wallpaper)
      const time = Date.now() * 0.0002;
      ctx.globalCompositeOperation = 'soft-light';
      ctx.filter = 'blur(100px)';
      ctx.globalAlpha = 0.2;
      
      // Create subtle shifting accent colors
      const accentGradient = ctx.createLinearGradient(
        Math.sin(time) * canvas.width + canvas.width / 2, 
        0, 
        Math.cos(time * 0.7) * canvas.width + canvas.width / 2, 
        canvas.height
      );
      
      if (theme === 'dark') {
        accentGradient.addColorStop(0, 'rgba(10, 132, 255, 0.15)');  // Apple Blue
        accentGradient.addColorStop(0.5, 'rgba(94, 92, 230, 0.1)');  // Apple Purple
        accentGradient.addColorStop(1, 'rgba(255, 55, 95, 0.15)');   // Apple Pink
      } else {
        accentGradient.addColorStop(0, 'rgba(0, 102, 255, 0.1)');    // Apple Blue
        accentGradient.addColorStop(0.5, 'rgba(88, 86, 214, 0.08)'); // Apple Purple
        accentGradient.addColorStop(1, 'rgba(255, 45, 85, 0.1)');    // Apple Pink
      }
      
      ctx.fillStyle = accentGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.filter = 'none';
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createParticles();
    };

    window.addEventListener('resize', handleResize);
    createParticles();
    animateParticles();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format time in macOS style (no seconds, 12-hour format with AM/PM)
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
      // Format date in macOS style (Day, Month Date)
      setCurrentDate(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Show the password hint after 3 seconds
    const hintTimer = setTimeout(() => {
      setShowPasswordHint(true);
    }, 3000);
    
    // Subtle pulsing animation for avatar (more subtle than before)
    controls.start({
      scale: [1, 1.03, 1],
      transition: { 
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" 
      }
    });
    
    return () => {
      clearInterval(interval);
      clearTimeout(hintTimer);
    };
  }, [controls]);

  // Handle mouse movement for subtle parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate percentage movement (-15 to 15) - more subtle than before
    const xPercent = (clientX / windowWidth - 0.5) * 30;
    const yPercent = (clientY / windowHeight - 0.5) * 30;
    
    setBgPosition({ x: xPercent, y: yPercent });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length > 0 && password === 'snigdha') {
      // Add scale down animation for successful login
      controls.start({
        scale: [1, 0.95, 0],
        opacity: [1, 0, 0],
        transition: { duration: 0.5 }
      }).then(() => onLogin('snigdha'));
    } else if (password.length > 0) {
      // For demo purposes, accept any non-empty password
      // Add scale down animation for successful login
      controls.start({
        scale: [1, 0.98, 0],
        opacity: [1, 0, 0],
        transition: { duration: 0.5 }
      }).then(() => onLogin());
    } else {
      // macOS-style shake animation for empty password
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="fixed inset-0 overflow-hidden select-none" onMouseMove={handleMouseMove}>
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Subtle noise texture overlay (more subtle) */}
      <div className="absolute inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-[0.08] pointer-events-none"/>
      
      {/* Status Bar - macOS style with proper SF font */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-7 flex items-center justify-between px-4 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div className="flex items-center space-x-2">
          <div className="text-xs font-medium font-sf-pro" 
               style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)' }}>
            Eshanized OS
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Wifi className="w-3.5 h-3.5" style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)' }} />
          <Battery className="w-4 h-4" style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)' }} />
          <div className="text-xs font-sf-pro" style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)' }}>
            {currentTime}
          </div>
        </div>
      </motion.div>
      
      {/* Main content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Clock and date - Displayed above login card for visibility */}
        <motion.div 
          className="mb-8 text-center z-10"
          style={{ color: theme === 'dark' ? 'white' : '#000000' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h1 className="text-7xl font-sf-pro font-light mb-2 tracking-tight drop-shadow-sm">{currentTime}</h1>
          <p className="text-xl font-sf-pro font-normal opacity-80 drop-shadow-sm">{currentDate}</p>
        </motion.div>
        
        {/* Glass container - authentic macOS style */}
        <motion.div 
          className="relative z-10 p-8 rounded-2xl overflow-hidden max-w-md w-full mx-4"
          style={{
            background: theme === 'dark' 
              ? 'rgba(28, 28, 30, 0.6)' 
              : 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(35px) saturate(180%)',
            WebkitBackdropFilter: 'blur(35px) saturate(180%)',
            boxShadow: theme === 'dark'
              ? '0 20px 50px -25px rgba(0,0,0,0.3), 0 0 1px 0 rgba(255,255,255,0.1)'
              : '0 20px 50px -25px rgba(0,0,0,0.1), 0 0 1px 0 rgba(0,0,0,0.1)',
            border: theme === 'dark' 
              ? '1px solid rgba(255, 255, 255, 0.08)' 
              : '1px solid rgba(255, 255, 255, 0.7)',
            transform: `perspective(1000px) rotateX(${bgPosition.y / 30}deg) rotateY(${-bgPosition.x / 30}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Theme toggle - macOS-style */}
          <motion.button
            className="absolute top-3 right-3 p-2 rounded-full z-20"
            style={{ 
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)'
            }}
            whileTap={{ scale: 0.92 }}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
            
          {/* GitHub Avatar with macOS style blur effect */}
          <motion.div
            className="mb-6 w-24 h-24 relative mx-auto"
            animate={controls}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 opacity-80 blur-lg" 
                style={{ animation: "spin 8s linear infinite" }} />
            
            {/* macOS-style avatar container with subtle reflection */}
            <div className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center"
                style={{ 
                  boxShadow: theme === 'dark' 
                    ? '0 15px 35px -12px rgba(79, 70, 229, 0.3), 0 0 1px rgba(255, 255, 255, 0.2)' 
                    : '0 15px 35px -12px rgba(79, 70, 229, 0.15), 0 0 1px rgba(0, 0, 0, 0.1)',
                  transform: `perspective(800px) rotateX(${-bgPosition.y / 15}deg) rotateY(${bgPosition.x / 15}deg)`
                }}
            >
              {/* Avatar image */}
              <Image 
                src={githubAvatarUrl} 
                alt="User Avatar"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                style={{ filter: theme === 'dark' ? 'brightness(1.1)' : 'contrast(1.02)' }}
                priority
              />
              
              {/* macOS-style reflection effect */}
              <div 
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-white opacity-20"
                style={{
                  transform: 'scaleY(-1) translateY(-5px)',
                  filter: 'blur(1px)'
                }}
              ></div>
            </div>
          </motion.div>
          
          {/* User name - macOS style SF font */}
          <motion.h2 
            className="text-2xl font-sf-pro font-medium mb-2 text-center"
            style={{ color: theme === 'dark' ? 'white' : '#000000' }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {PERSONAL_INFO.name}
          </motion.h2>
          
          {/* Password hint - macOS style */}
          <AnimatePresence>
            {showPasswordHint && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm mb-5 text-center font-sf-pro"
                style={{ color: theme === 'dark' ? 'rgba(255, 55, 95, 0.9)' : 'rgba(255, 45, 85, 0.9)' }}
              >
                <p className="flex items-center justify-center">
                  <Info className="w-3.5 h-3.5 mr-1.5" />
                  <span>Hint: Try the name that brings love ♥</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Password input with macOS glass effect */}
          <motion.form 
            onSubmit={handleSubmit}
            animate={{ x: isShaking ? [-5, 5, -5, 5, -3, 3, 0] : 0 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 400, damping: 10 }}
            className="relative"
          >
            <div className="mb-5 mx-auto">
              <div className="relative">
                <div 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)' }}
                >
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  onBlur={() => setIsPasswordFocused(false)}
                  placeholder="Enter password"
                  style={{
                    background: theme === 'dark' 
                      ? isPasswordFocused ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.07)' 
                      : isPasswordFocused ? 'rgba(0, 0, 0, 0.07)' : 'rgba(0, 0, 0, 0.04)',
                    color: theme === 'dark' ? 'white' : '#000000',
                    borderColor: isPasswordFocused 
                      ? theme === 'dark' ? 'rgba(10, 132, 255, 0.8)' : 'rgba(0, 102, 255, 0.6)'
                      : theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                    boxShadow: isPasswordFocused 
                      ? theme === 'dark' ? '0 0 0 4px rgba(10, 132, 255, 0.3)' : '0 0 0 4px rgba(0, 102, 255, 0.15)'
                      : 'none'
                  }}
                  className="w-full h-11 rounded-xl pl-11 pr-12 border focus:outline-none transition-all font-sf-pro text-sm"
                  autoFocus
                />
                <motion.button
                  type="submit"
                  style={{
                    background: theme === 'dark' ? '#0A84FF' : '#0066FF'
                  }}
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 aspect-square rounded-lg text-white flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
            
            <div className="mt-3 text-sm flex justify-center">
              <motion.button 
                style={{
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.03)',
                  borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)'
                }}
                className="px-5 py-2 transition-colors flex items-center justify-center rounded-lg backdrop-blur-sm border font-sf-pro text-sm"
                whileHover={{ 
                  scale: 1.02, 
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  // Add scale down animation for skip login
                  controls.start({
                    scale: [1, 0.98, 0],
                    opacity: [1, 0, 0],
                    transition: { duration: 0.5 }
                  }).then(() => onLogin());
                }}
              >
                <span>Skip Login</span>
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
      
      {/* Bottom power controls - macOS style */}
      <motion.div 
        className="absolute bottom-8 left-0 right-0 flex justify-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div 
          className="flex items-center space-x-8 py-2 px-6 rounded-2xl backdrop-blur-md"
          style={{ 
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)',
            background: theme === 'dark' ? 'rgba(28, 28, 30, 0.5)' : 'rgba(255, 255, 255, 0.3)',
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
            border: '1px solid',
            boxShadow: theme === 'dark' 
              ? '0 4px 20px rgba(0, 0, 0, 0.2)' 
              : '0 4px 20px rgba(0, 0, 0, 0.05)'
          }}
        >
          <PowerButton 
            icon={<Power className="w-5 h-5" />} 
            label="Sleep" 
            theme={theme} 
          />
          
          <PowerButton 
            icon={
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2C17.5,2 22,6.5 22,12C22,17.5 17.5,22 12,22C6.5,22 2,17.5 2,12C2,6.5 6.5,2 12,2M12,4C7.58,4 4,7.58 4,12C4,16.42 7.58,20 12,20C16.42,20 20,16.42 20,12C20,7.58 16.42,4 12,4M12,5C15.87,5 19,8.13 19,12H12V5Z" />
              </svg>
            } 
            label="Restart" 
            theme={theme} 
          />
          
          <PowerButton 
            icon={<Power className="w-5 h-5" />} 
            label="Shut Down" 
            theme={theme} 
          />
        </div>
      </motion.div>
      
      {/* Language selector - macOS style */}
      <motion.div 
        className="absolute bottom-8 right-8 z-10"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.button 
          className="flex items-center text-xs backdrop-blur-md px-4 py-2 rounded-lg border font-sf-pro"
          style={{ 
            background: theme === 'dark' ? 'rgba(28, 28, 30, 0.5)' : 'rgba(255, 255, 255, 0.3)',
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)'
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Globe className="w-3.5 h-3.5 mr-1.5" />
          English
          <ChevronDown className="w-3 h-3 ml-1.5" />
        </motion.button>
      </motion.div>
      
      {/* Accessibility - macOS style */}
      <motion.div 
        className="absolute bottom-8 left-8 z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <motion.button 
          className="flex items-center text-xs backdrop-blur-md px-4 py-2 rounded-lg border font-sf-pro"
          style={{ 
            background: theme === 'dark' ? 'rgba(28, 28, 30, 0.5)' : 'rgba(255, 255, 255, 0.3)',
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.05)',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)'
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
          </svg>
          Accessibility
        </motion.button>
      </motion.div>
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Helper component for power buttons
function PowerButton({ icon, label, theme }: { icon: React.ReactNode, label: string, theme: string }) {
  return (
    <motion.button
      className="flex flex-col items-center justify-center group"
      whileHover={{ scale: 1.05, color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(0, 0, 0, 0.8)' }}
      whileTap={{ scale: 0.95 }}
    >
      <div 
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-1 transition-colors border"
        style={{ 
          background: theme === 'dark' ? 'rgba(44, 44, 46, 0.7)' : 'rgba(255, 255, 255, 0.5)',
          borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.06)',
          backdropFilter: 'blur(8px)'
        }}
      >
        {icon}
      </div>
      <span className="text-xs font-sf-pro">{label}</span>
    </motion.button>
  );
}