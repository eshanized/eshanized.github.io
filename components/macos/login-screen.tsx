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

  // Aurora background effect
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

    const colors = [
      'rgba(124, 58, 237, 0.5)',  // purple
      'rgba(79, 70, 229, 0.5)',   // indigo
      'rgba(59, 130, 246, 0.5)',  // blue
      'rgba(236, 72, 153, 0.5)',  // pink
      'rgba(16, 185, 129, 0.5)',  // emerald
    ];

    const createParticles = () => {
      particles = [];
      for (let i = 0; i < 100; i++) {
        const radius = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocity: {
            x: (Math.random() - 0.5) * 0.2,
            y: (Math.random() - 0.5) * 0.2
          }
        });
      }
    };

    const animateParticles = () => {
      requestAnimationFrame(animateParticles);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, theme === 'dark' ? '#0f172a' : '#f0f9ff');
      gradient.addColorStop(1, theme === 'dark' ? '#1e293b' : '#e0f2fe');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Update position
        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        // Boundary checking
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.velocity.x *= -1;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.velocity.y *= -1;
        }
      });

      // Draw aurora effect
      ctx.filter = 'blur(70px)';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const x = Math.sin(Date.now() * 0.001 + i) * 100 + canvas.width / 2;
        const gradient = ctx.createRadialGradient(
          x, canvas.height * 0.5, 0,
          x, canvas.height * 0.5, 300
        );
        gradient.addColorStop(0, colors[i % colors.length].replace('0.5', '0.8'));
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.arc(x, canvas.height * 0.5, 300, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.filter = 'none';
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
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    // Show the password hint after 3 seconds
    const hintTimer = setTimeout(() => {
      setShowPasswordHint(true);
    }, 3000);
    
    // Pulse animation for avatar
    controls.start({
      scale: [1, 1.05, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" 
      }
    });
    
    return () => {
      clearInterval(interval);
      clearTimeout(hintTimer);
    };
  }, [controls]);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calculate percentage movement (-20 to 20)
    const xPercent = (clientX / windowWidth - 0.5) * 40;
    const yPercent = (clientY / windowHeight - 0.5) * 40;
    
    setBgPosition({ x: xPercent, y: yPercent });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.length > 0 && password === 'snigdha') {
      onLogin('snigdha');
    } else if (password.length > 0) {
      // For demo purposes, accept any non-empty password
      onLogin();
    } else {
      // Shake animation for empty password
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
      
      {/* Noise overlay */}
      <div className="absolute inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-[0.15]"/>
      
      {/* Status Bar - Top */}
      <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-4 z-20">
        <div className="flex items-center space-x-2">
          <div className="text-xs" style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)' }}>
            Eshanized OS
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Wifi className="w-4 h-4" style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)' }} />
          <Battery className="w-4 h-4" style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)' }} />
          <div className="text-xs" style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)' }}>
            {currentTime}
          </div>
        </div>
      </div>
      
      {/* Main content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Clock and date - Displayed above login card for visibility */}
        <motion.div 
          className="mb-6 text-center z-10"
          style={{ color: theme === 'dark' ? 'white' : '#0f172a' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-6xl font-extralight mb-1 tracking-tight drop-shadow-lg">{currentTime}</h1>
          <p className="text-xl font-light opacity-80 drop-shadow-md">{currentDate}</p>
        </motion.div>
        
        {/* Glass container */}
        <motion.div 
          className="relative z-10 p-8 rounded-2xl backdrop-blur-md border overflow-hidden max-w-md w-full mx-4"
          style={{
            background: theme === 'dark' 
              ? 'rgba(15, 23, 42, 0.3)' 
              : 'rgba(255, 255, 255, 0.25)',
            boxShadow: theme === 'dark'
              ? '0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.1)'
              : '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
            borderColor: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(255, 255, 255, 0.3)',
            transform: `perspective(1000px) rotateX(${bgPosition.y / 20}deg) rotateY(${-bgPosition.x / 20}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Floating elements */}
          <div className="absolute left-3 top-8 w-3 h-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-[1px] animate-pulse" />
          <div className="absolute right-12 bottom-5 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-green-300 blur-[2px] animate-bounce" style={{ animationDuration: '3s' }} />
          <div className="absolute right-4 top-14 w-2 h-2 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 blur-[1px] animate-ping" style={{ animationDuration: '4s' }} />
        
          {/* Theme toggle */}
          <motion.button
            className="absolute top-3 right-3 p-2 rounded-full z-20"
            style={{ 
              background: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(15, 23, 42, 0.7)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </motion.button>
            
          {/* GitHub Avatar with 3D effect */}
          <motion.div
            className="mb-5 w-28 h-28 relative mx-auto"
            animate={controls}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 opacity-70 blur-md" 
                style={{ animation: "spin 8s linear infinite" }} />
            <div className="absolute inset-1 rounded-full overflow-hidden flex items-center justify-center"
                style={{ 
                  boxShadow: theme === 'dark' 
                    ? '0 25px 50px -12px rgba(79, 70, 229, 0.4)' 
                    : '0 25px 50px -12px rgba(79, 70, 229, 0.25)',
                  transform: `perspective(1000px) rotateX(${-bgPosition.y / 10}deg) rotateY(${bgPosition.x / 10}deg)`
                }}
            >
              <Image 
                src={githubAvatarUrl} 
                alt="User Avatar"
                width={112}
                height={112}
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(1.05) brightness(1.05)' }}
                priority
              />
            </div>
          </motion.div>
          
          {/* User name */}
          <motion.h2 
            className="text-2xl font-medium mb-2 text-center"
            style={{ color: theme === 'dark' ? 'white' : '#0f172a' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {PERSONAL_INFO.name}
          </motion.h2>
          
          {/* Password hint */}
          <AnimatePresence>
            {showPasswordHint && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm mb-6 text-center"
                style={{ color: theme === 'dark' ? 'rgba(236, 72, 153, 0.8)' : 'rgba(219, 39, 119, 0.8)' }}
              >
                <p className="flex items-center justify-center">
                  <Info className="w-3.5 h-3.5 mr-1.5" />
                  <span>Hint: Try the name that brings love ♥</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Password input with glass effect */}
          <motion.form 
            onSubmit={handleSubmit}
            animate={{ x: isShaking ? [-5, 5, -5, 5, 0] : 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="mb-5 mx-auto">
              <div className="relative">
                <div 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                  style={{ color: theme === 'dark' ? 'rgba(255, 255, 255, 0.6)' : 'rgba(15, 23, 42, 0.6)' }}
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
                      ? isPasswordFocused ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)' 
                      : isPasswordFocused ? 'rgba(15, 23, 42, 0.15)' : 'rgba(15, 23, 42, 0.08)',
                    color: theme === 'dark' ? 'white' : '#0f172a',
                    borderColor: isPasswordFocused 
                      ? theme === 'dark' ? 'rgba(124, 58, 237, 0.7)' : 'rgba(79, 70, 229, 0.7)'
                      : theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)',
                    boxShadow: isPasswordFocused 
                      ? theme === 'dark' ? '0 0 0 4px rgba(124, 58, 237, 0.3)' : '0 0 0 4px rgba(79, 70, 229, 0.3)'
                      : 'none'
                  }}
                  className="w-full h-12 rounded-full pl-12 pr-14 border focus:outline-none transition-all"
                  autoFocus
                />
                <motion.button
                  type="submit"
                  style={{
                    background: 'linear-gradient(to right, rgb(126, 34, 206), rgb(107, 33, 168))'
                  }}
                  className="absolute right-2.5 top-1.5 bottom-1.5 px-2.5 aspect-square rounded-full text-white flex items-center justify-center"
                  whileHover={{ scale: 1.1, boxShadow: '0 0 15px rgba(124, 58, 237, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
            
            <div className="mt-3 text-sm flex justify-center">
              <motion.button 
                style={{
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.08)',
                  borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)'
                }}
                className="px-5 py-2.5 transition-colors flex items-center justify-center rounded-full backdrop-blur-md border"
                whileHover={{ 
                  scale: 1.05, 
                  background: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(15, 23, 42, 0.15)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  onLogin();
                }}
              >
                <span>Skip Login</span>
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
      
      {/* Bottom power controls */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10">
        <motion.div 
          className="flex items-center space-x-10 py-2 px-6 rounded-full backdrop-blur-sm"
          style={{ 
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)',
            background: theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.2)',
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)',
            border: '1px solid',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="flex flex-col items-center justify-center group"
            whileHover={{ scale: 1.05, color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(15, 23, 42, 1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors border"
              style={{ 
                background: theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Power className="w-5 h-5" />
            </div>
            <span className="text-xs">Sleep</span>
          </motion.button>
          
          <motion.button
            className="flex flex-col items-center justify-center group"
            whileHover={{ scale: 1.05, color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(15, 23, 42, 1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors border"
              style={{ 
                background: theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12,2C17.5,2 22,6.5 22,12C22,17.5 17.5,22 12,22C6.5,22 2,17.5 2,12C2,6.5 6.5,2 12,2M12,4C7.58,4 4,7.58 4,12C4,16.42 7.58,20 12,20C16.42,20 20,16.42 20,12C20,7.58 16.42,4 12,4M12,5C15.87,5 19,8.13 19,12H12V5Z" />
              </svg>
            </div>
            <span className="text-xs">Restart</span>
          </motion.button>
          
          <motion.button
            className="flex flex-col items-center justify-center group"
            whileHover={{ scale: 1.05, color: theme === 'dark' ? 'rgba(255, 255, 255, 1)' : 'rgba(15, 23, 42, 1)' }}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mb-1 transition-colors border"
              style={{ 
                background: theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <Power className="w-5 h-5" />
            </div>
            <span className="text-xs">Shut Down</span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Language selector */}
      <div className="absolute bottom-6 right-6 z-10">
        <motion.button 
          className="flex items-center text-xs backdrop-blur-md px-3.5 py-2 rounded-full border"
          style={{ 
            background: theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Globe className="w-3.5 h-3.5 mr-1.5" />
          English
          <ChevronDown className="w-3.5 h-3.5 ml-1.5" />
        </motion.button>
      </div>
      
      {/* Accessibility */}
      <div className="absolute bottom-6 left-6 z-10">
        <motion.button 
          className="flex items-center text-xs backdrop-blur-md px-3.5 py-2 rounded-full border"
          style={{ 
            background: theme === 'dark' ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.1)',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(15, 23, 42, 0.8)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <svg className="w-3.5 h-3.5 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
          </svg>
          Accessibility
        </motion.button>
      </div>
      
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