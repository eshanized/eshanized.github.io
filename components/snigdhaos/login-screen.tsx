"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';
import { User, Wifi, Battery, ChevronDown, Lock, ArrowRight, Info, Globe, Moon, Sun } from 'lucide-react';
import { SnigdhaOSLogo } from './snigdhaos-logo';

// Catppuccin color palette
const catppuccinColors = {
  dark: {
    base: [
      'rgba(198, 160, 246, 0.8)',  // Mauve
      'rgba(245, 169, 127, 0.8)',  // Peach
      'rgba(166, 227, 161, 0.8)',  // Green
      'rgba(148, 226, 213, 0.8)',  // Teal
      'rgba(137, 180, 250, 0.8)',  // Blue
      'rgba(203, 166, 247, 0.8)',  // Lavender
    ],
    surface: 'rgba(30, 30, 46, 0.85)',  // Surface0
    overlay: 'rgba(17, 17, 27, 0.75)',  // Base
    accent: 'rgba(203, 166, 247, 1)',   // Lavender
    text: 'rgba(205, 214, 244, 1)',     // Text
  },
  light: {
    base: [
      'rgba(168, 130, 216, 0.6)',  // Mauve
      'rgba(215, 139, 97, 0.6)',   // Peach
      'rgba(136, 197, 131, 0.6)',  // Green
      'rgba(118, 196, 183, 0.6)',  // Teal
      'rgba(107, 150, 220, 0.6)',  // Blue
      'rgba(173, 136, 217, 0.6)',  // Lavender
    ],
    surface: 'rgba(239, 241, 245, 0.85)', // Surface0
    overlay: 'rgba(220, 224, 232, 0.75)', // Base
    accent: 'rgba(173, 136, 217, 1)',     // Lavender
    text: 'rgba(76, 79, 105, 1)',         // Text
  }
};

export function LoginScreen({ onLogin }: { onLogin: (specialUser?: string) => void }) {
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [bgPosition, setBgPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useAnimation();

  // Remove theme state and always use dark theme
  const theme = 'dark';

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

    // Use Catppuccin colors
    const colors = theme === 'dark' 
      ? catppuccinColors.dark.base
      : catppuccinColors.light.base;

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

      // Create dynamic gradient background with Catppuccin colors
      const time = Date.now() * 0.0002;
      const gradient = ctx.createLinearGradient(
        Math.sin(time) * canvas.width,
        0,
        Math.cos(time) * canvas.width,
        canvas.height
      );

      if (theme === 'dark') {
        gradient.addColorStop(0, '#1e1e2e');  // Catppuccin Mocha base
        gradient.addColorStop(0.5, '#181825'); // Catppuccin Mocha mantle
        gradient.addColorStop(1, '#11111b');   // Catppuccin Mocha crust
      } else {
        gradient.addColorStop(0, '#eff1f5');   // Catppuccin Latte base
        gradient.addColorStop(0.5, '#e6e9ef'); // Catppuccin Latte mantle
        gradient.addColorStop(1, '#dce0e8');   // Catppuccin Latte crust
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
            ? `radial-gradient(circle at 50% 50%, ${catppuccinColors.dark.base[0]}, transparent 70%),
               radial-gradient(circle at 100% 0%, ${catppuccinColors.dark.base[5]}, transparent 50%)`
            : `radial-gradient(circle at 50% 50%, ${catppuccinColors.light.base[0]}, transparent 70%),
               radial-gradient(circle at 100% 0%, ${catppuccinColors.light.base[5]}, transparent 50%)`
        }}
      />
      <div className="absolute inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-[0.15] pointer-events-none mix-blend-overlay"/>
      
      {/* Main content with split layout */}
      <div className="absolute inset-0 flex">
        {/* Left panel - Decorative */}
        <motion.div 
          className="hidden lg:flex w-1/2 relative overflow-hidden items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Animated circles background */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${400 + i * 100}px`,
                  height: `${400 + i * 100}px`,
                  border: `2px solid ${theme === 'dark' 
                    ? catppuccinColors.dark.base[i] 
                    : catppuccinColors.light.base[i]}`,
                  opacity: 0.2 - i * 0.05
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 20 + i * 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>

          {/* Large decorative logo */}
          <motion.div
            className="relative z-10 transform"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative w-64 h-64">
              <motion.div 
                className="absolute inset-0 rounded-full"
                style={{
                  background: `conic-gradient(from 0deg, ${
                    theme === 'dark'
                      ? catppuccinColors.dark.base.join(', ')
                      : catppuccinColors.light.base.join(', ')
                  })`
                }}
                animate={{
                  rotate: [0, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${
                    theme === 'dark' 
                      ? catppuccinColors.dark.base[0]
                      : catppuccinColors.light.base[0]
                  }, transparent)`,
                  filter: 'blur(30px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="absolute inset-0 rounded-full flex items-center justify-center backdrop-blur-lg">
                <SnigdhaOSLogo 
                  className={`w-40 h-40 ${
                    theme === 'dark' ? 'text-white' : 'text-[#4169E1]'
                  }`}
                />
              </div>
            </div>
          </motion.div>

          {/* Floating elements */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                width: '8px',
                height: '8px',
                background: theme === 'dark'
                  ? catppuccinColors.dark.base[i]
                  : catppuccinColors.light.base[i],
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.8, 0.3, 0.8],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>

        {/* Right panel - Login form */}
        <motion.div 
          className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Welcome text */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h1 
              className="text-5xl font-bold mb-4"
              style={{ 
                background: theme === 'dark'
                  ? `linear-gradient(135deg, ${catppuccinColors.dark.base[0]}, ${catppuccinColors.dark.base[5]})`
                  : `linear-gradient(135deg, ${catppuccinColors.light.base[0]}, ${catppuccinColors.light.base[5]})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome Back
            </motion.h1>
            <motion.p 
              className="text-xl"
              style={{ 
                color: theme === 'dark' 
                  ? catppuccinColors.dark.text 
                  : catppuccinColors.light.text 
              }}
            >
              {currentDate}
            </motion.p>
          </motion.div>

          {/* Login form container */}
          <motion.div 
            className="w-full max-w-md"
            style={{
              background: theme === 'dark' 
                ? catppuccinColors.dark.surface 
                : catppuccinColors.light.surface,
              borderRadius: '24px',
              padding: '32px',
              backdropFilter: 'blur(20px)',
              boxShadow: theme === 'dark'
                ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 0 0 1px rgba(255, 255, 255, 0.1)'
                : '0 8px 32px rgba(65, 105, 225, 0.15), inset 0 0 0 1px rgba(65, 105, 225, 0.2)',
            }}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Time display */}
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-6xl font-light"
                style={{ 
                  color: theme === 'dark' 
                    ? catppuccinColors.dark.text 
                    : catppuccinColors.light.text 
                }}
              >
                {currentTime}
              </h2>
            </motion.div>

            {/* Password input */}
            <motion.form 
              onSubmit={handleSubmit}
              animate={{ x: isShaking ? [-10, 10, -10, 10, 0] : 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
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
                    color: theme === 'dark' 
                      ? catppuccinColors.dark.text 
                      : catppuccinColors.light.text,
                    border: `1px solid ${isPasswordFocused 
                      ? theme === 'dark' 
                        ? catppuccinColors.dark.accent 
                        : catppuccinColors.light.accent
                      : theme === 'dark' 
                        ? 'rgba(255, 255, 255, 0.1)' 
                        : 'rgba(65, 105, 225, 0.2)'}`,
                    boxShadow: isPasswordFocused
                      ? `0 0 0 4px ${theme === 'dark' 
                        ? 'rgba(203, 166, 247, 0.2)' 
                        : 'rgba(173, 136, 217, 0.15)'}`
                      : 'none',
                  }}
                />
                <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isPasswordFocused 
                    ? theme === 'dark' 
                      ? 'text-[#cba6f7]' 
                      : 'text-[#ad88d9]' 
                    : 'opacity-50'
                }`} />
              </div>

              {/* Login button */}
              <motion.button
                type="submit"
                className="w-full h-14 rounded-xl relative overflow-hidden"
                style={{
                  background: theme === 'dark'
                    ? `linear-gradient(135deg, ${catppuccinColors.dark.base[0]}, ${catppuccinColors.dark.base[5]})`
                    : `linear-gradient(135deg, ${catppuccinColors.light.base[0]}, ${catppuccinColors.light.base[5]})`,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'linear',
                  }}
                />
                <span className="relative z-10 text-white font-medium">
                  Login
                </span>
              </motion.button>

              {/* Skip login button */}
              <motion.button
                type="button"
                onClick={() => onLogin()}
                className="w-full h-12 rounded-xl text-base font-medium"
                style={{
                  background: theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(65, 105, 225, 0.1)',
                  color: theme === 'dark'
                    ? catppuccinColors.dark.text
                    : catppuccinColors.light.text,
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Skip Login
              </motion.button>
            </motion.form>
          </motion.div>

          {/* Bottom controls - Only show password hint toggle */}
          <motion.div 
            className="flex justify-center w-full max-w-md mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {/* Password hint toggle */}
            <motion.button
              onClick={() => setShowPasswordHint(!showPasswordHint)}
              className="p-3 rounded-xl backdrop-blur-md"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Info className="w-5 h-5" />
            </motion.button>
          </motion.div>

          {/* Password hint */}
          <AnimatePresence>
            {showPasswordHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 text-sm text-center p-3 rounded-xl backdrop-blur-md"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: catppuccinColors.dark.text,
                }}
              >
                Hint: Try the name that brings love ♥
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

