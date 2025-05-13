"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';
import { User, Wifi, Battery, ChevronDown, Lock, ArrowRight, Info, Globe, Moon, Sun } from 'lucide-react';
import { SnigdhaOSLogo } from './snigdhaos-logo';

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
  const controls = useAnimation();

  // Enhanced animated background effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      pulse: number;
      orbitRadius: number;
      orbitSpeed: number;
      orbitAngle: number;
    }> = [];

    // Enhanced color palette with more vibrant colors
    const colors = theme === 'dark' 
      ? [
          'rgba(100, 149, 237, 0.8)',  // Cornflower blue
          'rgba(147, 112, 219, 0.8)',  // Medium purple
          'rgba(123, 104, 238, 0.8)',  // Medium slate blue
          'rgba(72, 61, 139, 0.8)',    // Dark slate blue
          'rgba(106, 90, 205, 0.8)'    // Slate blue
        ]
      : [
          'rgba(65, 105, 225, 0.5)',   // Royal blue
          'rgba(30, 144, 255, 0.5)',   // Dodger blue
          'rgba(0, 191, 255, 0.5)',    // Deep sky blue
          'rgba(70, 130, 180, 0.5)',   // Steel blue
          'rgba(100, 149, 237, 0.5)'   // Cornflower blue
        ];

    // Create particles with enhanced properties
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 1.2,
        speedY: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.5 + 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI,
        orbitRadius: Math.random() * 100 + 50,
        orbitSpeed: (Math.random() - 0.5) * 0.02,
        orbitAngle: Math.random() * Math.PI * 2
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout: NodeJS.Timeout;

    canvas.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isMouseMoving = true;
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    });

    function drawParticles() {
      if (!canvas || !ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create dynamic gradient background with time-based animation
      const time = Date.now() * 0.0002;
      const gradient = ctx.createLinearGradient(
        Math.sin(time) * canvas.width,
        0,
        Math.cos(time) * canvas.width,
        canvas.height
      );

      if (theme === 'dark') {
        gradient.addColorStop(0, '#1a1b2e');
        gradient.addColorStop(0.5, '#14152b');
        gradient.addColorStop(1, '#1a1b2e');
      } else {
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#f0f7ff');
        gradient.addColorStop(1, '#ffffff');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles with enhanced effects
      particles.forEach((particle, i) => {
        // Update particle position with orbital motion
        if (isMouseMoving) {
          // Calculate distance to mouse
          const dx = mouseX - particle.x;
          const dy = mouseY - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply attraction/repulsion based on mouse position
          if (distance < 200) {
            const force = (200 - distance) / 200;
            particle.speedX += (dx / distance) * force * 0.2;
            particle.speedY += (dy / distance) * force * 0.2;
          }
        }

        // Update orbital motion
        particle.orbitAngle += particle.orbitSpeed;
        const orbitX = Math.cos(particle.orbitAngle) * particle.orbitRadius;
        const orbitY = Math.sin(particle.orbitAngle) * particle.orbitRadius;

        // Blend linear and orbital motion
        particle.x += particle.speedX + orbitX * 0.01;
        particle.y += particle.speedY + orbitY * 0.01;
        particle.pulse += 0.02;

        // Apply velocity dampening
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;

        // Dynamic size pulsing
        const pulsedSize = particle.size * (1 + Math.sin(particle.pulse) * 0.3);

        // Boundary check with smooth transition
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw enhanced particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulsedSize, 0, Math.PI * 2);
        
        // Create radial gradient for glow effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, pulsedSize * 2
        );
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        
        ctx.fillStyle = gradient;
        ctx.globalAlpha = particle.opacity * (0.8 + Math.sin(particle.pulse) * 0.2);
        ctx.fill();

        // Draw connecting lines with dynamic opacity and gradient
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            
            // Create gradient line with dynamic color
            const lineGradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            lineGradient.addColorStop(0, particle.color);
            lineGradient.addColorStop(1, otherParticle.color);
            
            ctx.strokeStyle = lineGradient;
            ctx.globalAlpha = (1 - distance / 150) * 0.5 * 
              (0.5 + Math.sin(particle.pulse + otherParticle.pulse) * 0.5);
            ctx.lineWidth = Math.min(2, (1 - distance / 150) * 2);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(drawParticles);
    }

    drawParticles();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearTimeout(mouseTimeout);
    };
  }, [theme]);

  // Clock and date update
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'snigdha') {
      await controls.start({
        scale: [1, 0.95, 0],
        opacity: [1, 0.5, 0],
        transition: { duration: 0.4 }
      });
      onLogin('snigdha');
    } else if (password.length > 0) {
      await controls.start({
        scale: [1, 0.95, 0],
        opacity: [1, 0.5, 0],
        transition: { duration: 0.4 }
      });
      onLogin();
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 overflow-hidden select-none" onMouseMove={handleMouseMove}>
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 pointer-events-none"/>
      <div 
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: theme === 'dark'
            ? 'radial-gradient(circle at 50% 50%, rgba(100, 149, 237, 0.15), transparent 70%), radial-gradient(circle at 100% 0%, rgba(147, 112, 219, 0.1), transparent 50%)'
            : 'radial-gradient(circle at 50% 50%, rgba(65, 105, 225, 0.2), transparent 70%), radial-gradient(circle at 100% 0%, rgba(30, 144, 255, 0.15), transparent 50%)'
        }}
      />
      <div className="absolute inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-[0.15] pointer-events-none mix-blend-overlay"/>
      
      {/* Status Bar with enhanced styling */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-12 flex items-center justify-between px-8 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        style={{
          background: theme === 'dark'
            ? 'linear-gradient(180deg, rgba(26, 27, 46, 0.85) 0%, rgba(26, 27, 46, 0) 100%)'
            : 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: theme === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(65, 105, 225, 0.1)'
        }}
      >
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SnigdhaOSLogo className="w-5 h-5" />
          </motion.div>
          <span className="text-sm font-medium" style={{ color: theme === 'dark' ? 'white' : 'black' }}>
            SnigdhaOS
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Wifi className="w-4 h-4" style={{ opacity: 0.8 }} />
          <Battery className="w-4 h-4" style={{ opacity: 0.8 }} />
          <span className="text-sm font-medium">{currentTime}</span>
        </div>
      </motion.div>
      
      {/* Main content container with enhanced styling */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Clock and date with enhanced typography */}
        <motion.div 
          className="mb-12 text-center z-10"
          style={{ 
            color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.9)',
            textShadow: theme === 'dark'
              ? '0 0 30px rgba(100, 149, 237, 0.3)'
              : '0 0 30px rgba(65, 105, 225, 0.2)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.h1 
            className="text-7xl font-light mb-3"
            style={{ 
              color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.9)',
              textShadow: theme === 'dark'
                ? '0 0 30px rgba(100, 149, 237, 0.3)'
                : '0 0 30px rgba(65, 105, 225, 0.2)'
            }}
            whileHover={{ scale: 1.02 }}
          >
            {currentTime}
          </motion.h1>
          <motion.p 
            className="text-xl"
            style={{ 
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
              textShadow: theme === 'dark'
                ? '0 0 20px rgba(100, 149, 237, 0.2)'
                : '0 0 20px rgba(65, 105, 225, 0.15)'
            }}
            whileHover={{ scale: 1.02 }}
          >
            {currentDate}
          </motion.p>
        </motion.div>
        
        {/* Glass container with enhanced styling */}
        <motion.div 
          className="relative z-10 p-8 rounded-2xl overflow-hidden max-w-md w-full mx-4"
          style={{
            backgroundColor: theme === 'dark' 
              ? 'rgba(26, 27, 46, 0.5)' 
              : 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: theme === 'dark' 
              ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1), 0 0 100px rgba(100, 149, 237, 0.1)' 
              : '0 8px 32px rgba(65, 105, 225, 0.15), inset 0 0 0 1px rgba(65, 105, 225, 0.2), 0 0 100px rgba(65, 105, 225, 0.1)',
            transform: `perspective(1000px) rotateX(${bgPosition.y / 30}deg) rotateY(${-bgPosition.x / 30}deg)`,
          }}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Theme toggle with enhanced design */}
          <motion.button
            className="absolute top-4 right-4 p-3 rounded-xl backdrop-blur-md"
            style={{ 
              backgroundColor: theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(65, 105, 225, 0.1)',
              border: `1px solid ${theme === 'dark' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : 'rgba(65, 105, 225, 0.2)'}`,
              boxShadow: theme === 'dark'
                ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                : '0 4px 12px rgba(65, 105, 225, 0.1)'
            }}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </motion.button>
            
          {/* SnigdhaOS Logo with enhanced effects */}
          <motion.div
            className="flex justify-center mb-8"
            animate={controls}
          >
            <div className="relative w-28 h-28">
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: theme === 'dark'
                    ? 'conic-gradient(from 0deg, #6495ED, #4169E1, #1E90FF, #6495ED)'
                    : 'conic-gradient(from 0deg, #4169E1, #1E90FF, #4169E1, #1E90FF)'
                }}
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${
                    theme === 'dark' ? 'rgba(100, 149, 237, 0.4)' : 'rgba(65, 105, 225, 0.4)'
                  }, transparent)`,
                  filter: 'blur(10px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative w-full h-full rounded-full flex items-center justify-center backdrop-blur-sm">
                <div
                  style={{
                    filter: `drop-shadow(0 0 10px ${theme === 'dark' ? 'rgba(255,255,255,0.5)' : 'rgba(65,105,225,0.5)'})`
                  }}
                >
                  <SnigdhaOSLogo 
                    className={`w-20 h-20 ${theme === 'dark' ? 'text-white' : 'text-[#4169E1]'}`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Brand name with enhanced typography */}
          <motion.h2 
            className="text-2xl font-bold text-center mb-2"
            style={{ 
              color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.9)',
              letterSpacing: '0.01em',
              textShadow: theme === 'dark' 
                ? '0 0 20px rgba(100, 149, 237, 0.3)' 
                : '0 0 20px rgba(65, 105, 225, 0.2)'
            }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            SnigdhaOS
          </motion.h2>
          
          {/* User name with enhanced styling */}
          <motion.p 
            className="text-base font-sf-pro font-normal mb-3 text-center"
            style={{ 
              color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
              textShadow: theme === 'dark' 
                ? '0 0 10px rgba(100, 149, 237, 0.2)' 
                : '0 0 10px rgba(65, 105, 225, 0.1)'
            }}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {PERSONAL_INFO.name}
          </motion.p>
          
          {/* Password hint with enhanced design */}
          <AnimatePresence>
            {showPasswordHint && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm mb-5 text-center font-sf-pro"
                style={{ 
                  color: theme === 'dark' 
                    ? 'rgba(100, 149, 237, 0.9)' 
                    : 'rgba(65, 105, 225, 0.9)',
                  textShadow: '0 0 10px rgba(100, 149, 237, 0.3)'
                }}
              >
                <p className="flex items-center justify-center">
                  <Info className="w-3.5 h-3.5 mr-1.5" />
                  <span>Hint: Try the name that brings love ♥</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Password input with enhanced design */}
          <motion.form 
            onSubmit={handleSubmit}
            animate={{ x: isShaking ? [-10, 10, -10, 10, 0] : 0 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                placeholder="Enter password"
                className="w-full h-14 rounded-xl px-12 outline-none transition-all duration-300"
                style={{
                  backgroundColor: theme === 'dark' 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : 'rgba(65, 105, 225, 0.08)',
                  color: theme === 'dark' ? 'white' : 'rgba(0, 0, 0, 0.8)',
                  border: `1px solid ${isPasswordFocused 
                    ? theme === 'dark' ? 'rgba(100, 149, 237, 0.8)' : 'rgba(65, 105, 225, 0.5)'
                    : theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(65, 105, 225, 0.2)'}`,
                  boxShadow: isPasswordFocused
                    ? `0 0 0 4px ${theme === 'dark' ? 'rgba(100, 149, 237, 0.2)' : 'rgba(65, 105, 225, 0.15)'}, 
                       inset 0 0 20px ${theme === 'dark' ? 'rgba(100, 149, 237, 0.1)' : 'rgba(65, 105, 225, 0.05)'}`
                    : `inset 0 0 20px ${theme === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(65, 105, 225, 0.05)'}`,
                  backdropFilter: 'blur(10px)'
                }}
                whileFocus={{ scale: 1.02 }}
              />
              <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                isPasswordFocused 
                  ? theme === 'dark' ? 'text-primary' : 'text-blue-600' 
                  : theme === 'dark' ? 'opacity-60' : 'opacity-40'
              }`} />
              <motion.button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, #6495ED, #4169E1)'
                    : 'linear-gradient(135deg, #4169E1, #1E90FF)',
                  boxShadow: `0 0 20px ${theme === 'dark' ? 'rgba(100, 149, 237, 0.3)' : 'rgba(65, 105, 225, 0.3)'}`,
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                    transform: 'translateX(-100%)',
                  }}
                  animate={{
                    transform: ['translateX(-100%)', 'translateX(100%)'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                    ease: 'linear',
                  }}
                />
                <ArrowRight className="w-5 h-5 text-white relative z-10" />
              </motion.button>
            </div>
            
            <div className="mt-6 w-full text-sm flex justify-center">
              <motion.button 
                type="button"
                className="w-full h-12 rounded-xl text-base font-medium transition-all overflow-hidden relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onLogin()}
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, rgba(100, 149, 237, 0.2), rgba(65, 105, 225, 0.2))'
                    : 'linear-gradient(135deg, rgba(65, 105, 225, 0.1), rgba(30, 144, 255, 0.1))',
                  color: theme === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)',
                  border: `1px solid ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(65, 105, 225, 0.2)'}`,
                  boxShadow: theme === 'dark'
                    ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                    : '0 4px 12px rgba(65, 105, 225, 0.1)'
                }}
              >
                Skip Login
              </motion.button>
            </div>
          </motion.form>
        </motion.div>
      </div>
      
      {/* Bottom controls with enhanced styling */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-8 z-10">
        {/* Language selector with enhanced design */}
        <motion.button 
          className="flex items-center text-xs backdrop-blur-md px-4 py-2 rounded-lg border font-sf-pro"
          style={{ 
            background: theme === 'dark' 
              ? 'rgba(30, 32, 48, 0.5)' 
              : 'rgba(65, 105, 225, 0.1)',
            borderColor: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(65, 105, 225, 0.2)',
            color: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(0, 0, 0, 0.6)',
            boxShadow: theme === 'dark'
              ? '0 4px 12px rgba(0, 0, 0, 0.2)'
              : '0 4px 12px rgba(65, 105, 225, 0.1)'
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <Globe className="w-3.5 h-3.5 mr-1.5" />
          English
          <ChevronDown className="w-3 h-3 ml-1.5" />
        </motion.button>

        {/* Accessibility button with enhanced design */}
        <motion.button 
          className="flex items-center text-xs backdrop-blur-md px-4 py-2 rounded-lg border font-sf-pro"
          style={{ 
            background: theme === 'dark' 
              ? 'rgba(30, 32, 48, 0.5)' 
              : 'rgba(65, 105, 225, 0.1)',
            borderColor: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.1)' 
              : 'rgba(65, 105, 225, 0.2)',
            color: theme === 'dark' 
              ? 'rgba(255, 255, 255, 0.8)' 
              : 'rgba(0, 0, 0, 0.6)',
            boxShadow: theme === 'dark'
              ? '0 4px 12px rgba(0, 0, 0, 0.2)'
              : '0 4px 12px rgba(65, 105, 225, 0.1)'
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
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

