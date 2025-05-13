"use client";

import { useTheme } from 'next-themes';
import { motion, useScroll, useSpring } from 'framer-motion';
import { User, Mail, Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { TERMINAL_COMMANDS, PERSONAL_INFO } from '@/lib/constants';
import { useRef } from 'react';

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

export default function AboutApp() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative h-full">
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
        className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-[#cba6f7] scrollbar-track-[#313244] scrollbar-thumb-rounded-full scrollbar-track-rounded-full"
      >
        <motion.div 
          className="min-h-full p-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Background Elements */}
          <div className="fixed inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#cba6f7]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#89b4fa]/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.015] mix-blend-overlay" />
          </div>

          <div className="max-w-6xl mx-auto space-y-24 relative">
            {/* Hero Section */}
            <motion.section 
              className="relative pt-12 pb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-[#cba6f7] to-transparent" />
              
              <div className="relative">
                <motion.div 
                  className="w-40 h-40 mx-auto relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#cba6f7] to-[#89b4fa] rounded-full blur-lg opacity-50" />
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
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>

                <motion.div 
                  className="text-center mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-[#cba6f7] to-[#89b4fa] bg-clip-text text-transparent">
                    {PERSONAL_INFO.name}
                  </h1>
                  <p className="text-[#cdd6f4] text-xl max-w-2xl mx-auto leading-relaxed">
                    {TERMINAL_COMMANDS.about}
                  </p>
                </motion.div>

                <div className="flex justify-center gap-4 mt-8">
                  {[
                    { icon: Github, href: PERSONAL_INFO.github, color: "#f5e0dc" },
                    { icon: Twitter, href: PERSONAL_INFO.twitter, color: "#89dceb" },
                    { icon: Linkedin, href: PERSONAL_INFO.linkedin, color: "#74c7ec" },
                    { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, color: "#a6e3a1" }
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-xl bg-[#313244] backdrop-blur-sm border border-[#45475a] hover:border-[#cba6f7] transition-all"
                      whileHover={{ 
                        scale: 1.1,
                        backgroundColor: "#45475a",
                        color: social.color
                      }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <social.icon className="w-6 h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.section>

            {/* Footer */}
            <motion.footer 
              className="text-center py-12 border-t border-[#45475a]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="flex items-center justify-center gap-2 text-[#bac2de]">
                Made with 
                <motion.span
                  animate={{
                    scale: [1, 1.2, 1],
                    color: ["#f38ba8", "#f5c2e7", "#f38ba8"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="w-5 h-5" />
                </motion.span>
                by Eshanized
              </p>
            </motion.footer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}