"use client";

import { useTheme } from 'next-themes';
import { motion, useScroll, useSpring } from 'framer-motion';
import { User, Mail, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { TERMINAL_COMMANDS, PERSONAL_INFO } from '@/lib/constants';
import { useRef, useState, useEffect } from 'react';

// Catppuccin theme colors
const catppuccinColors = {
  mocha: {
    rosewater: "#f5e0dc",
    flamingo: "#f2cdcd",
    pink: "#f5c2e7",
    mauve: "#cba6f7",
    red: "#f38ba8",
    maroon: "#eba0ac",
    peach: "#fab387",
    yellow: "#f9e2af",
    green: "#a6e3a1",
    teal: "#94e2d5",
    sky: "#89dceb",
    sapphire: "#74c7ec",
    blue: "#89b4fa",
    lavender: "#b4befe",
    text: "#cdd6f4",
    subtext1: "#bac2de",
    surface2: "#585b70",
    surface1: "#45475a",
    surface0: "#313244",
    base: "#1e1e2e",
    mantle: "#181825",
    crust: "#11111b"
  }
};

const funFacts = [
  "I love building beautiful UIs!",
  "Catppuccin is my favorite color palette.",
  "I can code and make coffee at the same time.",
  "Ask me about my favorite anime!",
  "I believe in pixel-perfect design.",
];

export default function AboutApp() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [copied, setCopied] = useState(false);
  const [factIdx, setFactIdx] = useState(0);

  // Change fun fact every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIdx(idx => (idx + 1) % funFacts.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Animated SVG Blobs Background */}
      <svg className="absolute -top-32 -left-32 w-[600px] h-[600px] opacity-30 blur-2xl z-0" viewBox="0 0 600 600" fill="none">
        <ellipse cx="300" cy="300" rx="300" ry="300" fill="#cba6f7" />
      </svg>
      <svg className="absolute -bottom-32 -right-32 w-[500px] h-[500px] opacity-20 blur-2xl z-0" viewBox="0 0 500 500" fill="none">
        <ellipse cx="250" cy="250" rx="250" ry="250" fill="#89b4fa" />
      </svg>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay z-0" />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
        style={{ 
          scaleX,
          background: `linear-gradient(to right, ${catppuccinColors.mocha.mauve}, ${catppuccinColors.mocha.blue})`
        }}
      />

      <div
        ref={containerRef}
        className="relative z-10 h-full w-full overflow-auto flex flex-col md:flex-row items-stretch md:items-center justify-center gap-8 md:gap-16 px-4 md:px-12 py-8 md:py-16"
      >
        {/* Left: Hero Section */}
        <div className="flex-1 flex flex-col items-center md:items-end gap-8 max-w-md">
          {/* Animated Avatar */}
          <motion.div
            className="w-40 h-40 relative"
            whileHover={{ scale: 1.07 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#cba6f7] to-[#89b4fa] rounded-full blur-lg opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#cba6f7] to-[#89b4fa] rounded-full p-1">
              <div className="w-full h-full rounded-full overflow-hidden bg-[#1e1e2e] p-1">
                <img
                  src={`https://github.com/${PERSONAL_INFO.github.split('/').pop()}.png`}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <motion.div
              className="absolute -right-2 -bottom-2 w-8 h-8 bg-[#a6e3a1] rounded-full border-4 border-[#1e1e2e]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
          {/* Name & Title */}
          <div className="text-right">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-[#cba6f7] to-[#89b4fa] bg-clip-text text-transparent">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-[#cdd6f4] text-lg md:text-xl font-medium mb-2">
              {TERMINAL_COMMANDS.about.split('.')[0]}.
            </p>
            <div className="flex justify-end gap-2 mt-2">
              {[
                { icon: Github, href: PERSONAL_INFO.github, color: "#f5e0dc", label: "GitHub" },
                { icon: Twitter, href: PERSONAL_INFO.twitter, color: "#89dceb", label: "Twitter" },
                { icon: Linkedin, href: PERSONAL_INFO.linkedin, color: "#74c7ec", label: "LinkedIn" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#313244] border border-[#45475a] hover:border-[#cba6f7] transition-all group"
                  whileHover={{ scale: 1.13, backgroundColor: "#45475a", color: social.color }}
                  whileTap={{ scale: 0.97 }}
                  title={social.label}
                >
                  <social.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
              {/* Copy Email Button */}
              <motion.button
                onClick={handleCopyEmail}
                className="p-3 rounded-full bg-[#313244] border border-[#45475a] hover:border-[#a6e3a1] transition-all group relative"
                whileHover={{ scale: 1.13, backgroundColor: "#45475a", color: "#a6e3a1" }}
                whileTap={{ scale: 0.97 }}
                title="Copy Email"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                {copied && (
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded bg-[#a6e3a1] text-[#1e1e2e] shadow-lg animate-fade-in">
                    Copied!
                  </span>
                )}
              </motion.button>
            </div>
          </div>
          {/* Now Playing / Mood Widget */}
          <div className="flex flex-col items-end mt-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#313244]/80 border border-[#45475a] shadow-sm">
              <span className="text-[#f5c2e7] text-lg">🎧</span>
              <span className="text-[#bac2de] text-sm font-medium">Now Playing:</span>
              <span className="text-[#cba6f7] text-sm font-semibold">"Coding Lo-Fi Beats"</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 mt-2 rounded-xl bg-[#313244]/80 border border-[#45475a] shadow-sm">
              <span className="text-[#a6e3a1] text-lg">😊</span>
              <span className="text-[#bac2de] text-sm font-medium">Mood:</span>
              <span className="text-[#f9e2af] text-sm font-semibold">Productive</span>
            </div>
          </div>
        </div>
        {/* Right: Timeline/Highlights */}
        <div className="flex-1 flex flex-col gap-8 max-w-xl">
          {/* Experience Timeline */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#cba6f7] to-[#89b4fa] bg-clip-text text-transparent">Highlights</h2>
            <div className="space-y-6">
              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <User className="w-8 h-8 text-[#cba6f7]" />
                <div>
                  <h3 className="font-semibold text-lg text-[#cdd6f4]">{PERSONAL_INFO.title || 'Web Developer'}</h3>
                  <p className="text-[#bac2de]">{TERMINAL_COMMANDS.about.split('.').slice(1).join('.').trim()}</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Github className="w-8 h-8 text-[#89b4fa]" />
                <div>
                  <h3 className="font-semibold text-lg text-[#cdd6f4]">Open Source</h3>
                  <p className="text-[#bac2de]">Active contributor on GitHub, building and sharing cool projects.</p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Heart className="w-8 h-8 text-[#f5c2e7]" />
                <div>
                  <h3 className="font-semibold text-lg text-[#cdd6f4]">Passion</h3>
                  <p className="text-[#bac2de]">Design, code, and coffee fuel my creativity every day.</p>
                </div>
              </motion.div>
            </div>
          </div>
          {/* Fun Fact / Quote Card */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-[#cba6f7]/30 to-[#89b4fa]/30 p-6 shadow-xl border border-[#45475a] flex flex-col items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-3xl mb-2">✨</span>
            <p className="text-lg text-center text-[#cdd6f4] font-medium">{funFacts[factIdx]}</p>
          </motion.div>
        </div>
      </div>
      {/* Footer */}
      <motion.footer
        className="text-center py-8 border-t border-[#45475a] relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="flex items-center justify-center gap-2 text-[#bac2de]">
          Made with
          <motion.span
            animate={{ scale: [1, 1.2, 1], color: ["#f38ba8", "#f5c2e7", "#f38ba8"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart className="w-5 h-5" />
          </motion.span>
          by Eshanized
        </p>
      </motion.footer>
    </div>
  );
}