"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';
import { Wifi, Battery, Lock, Info, Terminal } from 'lucide-react';
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
    green: 'rgba(166, 227, 161, 1)', // Green
  },
};

const bootMessages = [
    { text: "SNIGDHAOS v24.04 INITIALIZING...", delay: 0 },
    { text: "KERNEL BOOT SEQUENCE INITIATED...", delay: 0.5 },
    { text: "LOADING PARTICLE MATRIX...", delay: 1.2 },
    { text: "CALIBRATING RENDERER...", delay: 1.8 },
    { text: "AWAITING USER AUTHENTICATION...", delay: 2.5 },
];

export function LoginScreen({ onLogin }: { onLogin: (specialUser?: string) => void }) {
  const [isBooting, setIsBooting] = useState(true);
  const [currentTime, setCurrentTime] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [showPasswordHint, setShowPasswordHint] = useState(false);
  const [cardRotation, setCardRotation] = useState({ rotateX: 0, rotateY: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controls = useAnimation();

  // Always use dark theme
  const theme = 'dark';

  // Boot sequence
  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setIsBooting(false);
    }, 4000); // 4 second boot time
    return () => clearTimeout(bootTimer);
  }, []);

  // Animated background effect
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
      x: number; y: number; size: number; speedX: number; speedY: number;
      opacity: number; color: string; pulse: number;
    }> = [];

    const colors = catppuccinColors.dark.base;

    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: Math.random() * 0.4 + 0.1,
            color: colors[Math.floor(Math.random() * colors.length)],
            pulse: Math.random() * Math.PI,
        });
    }

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    function drawParticles() {
        if (!canvas || !ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#11111b'; // Catppuccin Mocha crust
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            const dx = p.x - mouseX;
            const dy = p.y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Repel from mouse
            if (dist < 150) {
                const force = (150 - dist) / 150;
                p.x += (dx / dist) * force * 0.5;
                p.y += (dy / dist) * force * 0.5;
            }

            p.x += p.speedX;
            p.y += p.speedY;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            p.pulse += 0.02;
            const pulsedSize = p.size * (1 + Math.sin(p.pulse) * 0.3);

            ctx.beginPath();
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulsedSize);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.globalAlpha = p.opacity;
            ctx.arc(p.x, p.y, pulsedSize, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;

            // Draw connecting lines
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dxLine = p.x - p2.x;
                const dyLine = p.y - p2.y;
                const distance = Math.sqrt(dxLine * dxLine + dyLine * dyLine);
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    const lineGradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                    lineGradient.addColorStop(0, p.color);
                    lineGradient.addColorStop(1, p2.color);
                    ctx.strokeStyle = lineGradient;
                    ctx.lineWidth = 0.3;
                    ctx.globalAlpha = (1 - distance / 120) * p.opacity * 0.8;
                    ctx.stroke();
                }
            }
            ctx.globalAlpha = 1;
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();
    window.addEventListener('resize', resizeCanvas);
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Clock and date update
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'short', month: 'long', day: 'numeric' }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - card.left - card.width / 2;
    const y = e.clientY - card.top - card.height / 2;
    
    const rotateX = (-y / card.height) * 10;
    const rotateY = (x / card.width) * 10;

    setCardRotation({ rotateX, rotateY });
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
    <div className="fixed inset-0 overflow-hidden select-none bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      <AnimatePresence>
        {!isBooting && (
            <motion.div 
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="absolute top-[-20%] left-[-20%] w-[80vmin] h-[80vmin] rounded-full blur-3xl"
                    style={{ backgroundColor: 'rgba(198, 160, 246, 0.1)' /* Mauve */ }}
                    animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
                />
                <motion.div
                    className="absolute bottom-[-20%] right-[-20%] w-[70vmin] h-[70vmin] rounded-full blur-3xl"
                    style={{ backgroundColor: 'rgba(137, 180, 250, 0.1)' /* Blue */ }}
                    animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
                    transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
                />
            </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 bg-[url(https://grainy-gradients.vercel.app/noise.svg)] opacity-[0.08] pointer-events-none mix-blend-soft-light"/>
      
      <AnimatePresence>
        {isBooting ? (
          <motion.div
            key="boot-screen"
            className="absolute inset-0 flex items-center justify-center"
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            <div className="font-mono text-green-400/80 text-lg p-8 space-y-2">
              <div className="flex items-center gap-4 mb-4">
                <Terminal className="w-8 h-8"/>
                <h1 className="text-2xl font-bold">SnigdhaOS Bootloader</h1>
              </div>
              {bootMessages.map((msg, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: msg.delay }}
                  className="flex items-center gap-2"
                >
                  <span className="text-green-400/50">{`[${(msg.delay * 1000).toString().padStart(4, '0')}]`}</span>
                  <span>{msg.text}</span>
                  <motion.span
                    className="w-2 h-4 bg-green-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ delay: msg.delay, repeat: Infinity, duration: 1 }}
                  />
                </motion.p>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="login-ui"
            className="absolute inset-0 flex flex-col items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
                className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 text-sm"
                style={{ color: catppuccinColors.dark.text }}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <div className="flex items-center gap-3 font-medium">
                    <SnigdhaOSLogo className="w-6 h-6" />
                    <span>SnigdhaOS</span>
                </div>
                <div className="flex items-center gap-6" style={{ color: 'rgba(205, 214, 244, 0.8)' }}>
                    <span>{currentDate}</span>
                    <div className="flex items-center gap-4">
                        <span>{currentTime}</span>
                        <Wifi size={18} />
                        <Battery size={18} />
                    </div>
                </div>
            </motion.div>

            <motion.div
              className="w-full max-w-sm"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateY(${cardRotation.rotateY}deg) rotateX(${cardRotation.rotateX}deg)`,
              }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={() => setCardRotation({ rotateX: 0, rotateY: 0 })}
            >
              <div
                className="w-full relative p-8 space-y-6 rounded-3xl"
                style={{ 
                  background: 'rgba(30, 30, 46, 0.75)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(205, 214, 244, 0.2)',
                  boxShadow: '0 0 80px rgba(0,0,0,0.4)',
                }}
              >
                <div 
                  className="absolute -inset-px rounded-3xl pointer-events-none"
                  style={{
                    border: '1px solid transparent',
                    backgroundImage: `radial-gradient(circle at ${cardRotation.rotateY * 5 + 50}% ${-cardRotation.rotateX * 5 + 50}%, rgba(203, 166, 247, 0.3), transparent 50%)`
                  }}
                />
                
                <div className="text-center space-y-2" style={{ transform: 'translateZ(20px)' }}>
                  <motion.div 
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                  >
                    <Image src={PERSONAL_INFO.avatar} alt="Avatar" width={80} height={80} className="rounded-full border-2 border-white/20 shadow-lg"/>
                  </motion.div>
                  <h1 className="text-2xl font-bold" style={{color: catppuccinColors.dark.text}}>
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-sm" style={{color: 'rgba(205, 214, 244, 0.7)'}}>
                    Enter password to unlock
                  </p>
                </div>

                <motion.form 
                  onSubmit={handleSubmit}
                  animate={{ x: isShaking ? [-8, 8, -8, 8, 0] : 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                  style={{ transform: 'translateZ(40px)' }}
                >
                  <div className="relative">
                    <motion.input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      placeholder="Password"
                      className="w-full h-12 rounded-lg px-12 text-center bg-transparent outline-none transition-all duration-300"
                      style={{
                        color: catppuccinColors.dark.text,
                        border: `1px solid ${isPasswordFocused ? catppuccinColors.dark.accent : 'rgba(205, 214, 244, 0.2)'}`,
                        boxShadow: isPasswordFocused ? `0 0 0 3px rgba(203, 166, 247, 0.2)` : 'none',
                      }}
                    />
                    <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${isPasswordFocused ? 'text-[#cba6f7]' : 'opacity-40'}`} />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full h-12 rounded-lg relative overflow-hidden font-semibold text-lg"
                    style={{ background: `linear-gradient(135deg, ${catppuccinColors.dark.base[0]}, ${catppuccinColors.dark.base[4]})` }}
                    whileHover={{ scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="relative z-10 text-black/80">Authenticate</span>
                  </motion.button>
                </motion.form>

                <div className="flex items-center justify-between text-sm" style={{ transform: 'translateZ(20px)' }}>
                  <button 
                    onClick={() => onLogin()}
                    className="px-4 py-2 rounded-lg transition-colors"
                    style={{ color: 'rgba(205, 214, 244, 0.6)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(205, 214, 244, 0.1)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    Guest Access
                  </button>
                  <button 
                    onClick={() => setShowPasswordHint(!showPasswordHint)}
                    className="px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                    style={{ color: 'rgba(205, 214, 244, 0.6)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(205, 214, 244, 0.1)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <Info size={14}/> Hint
                  </button>
                </div>
                
                <AnimatePresence>
                  {showPasswordHint && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: 10, height: 0 }}
                      className="text-center text-sm"
                      style={{ color: catppuccinColors.dark.text, transform: 'translateZ(20px)'}}
                    >
                      <p className="p-2 bg-black/20 rounded-lg">Hint: Try the name that brings love ♥</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div 
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-sm" style={{ color: 'rgba(205, 214, 244, 0.5)' }}>
                SnigdhaOS • Elegance in Simplicity
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

