"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { StickyNote, FileText } from 'lucide-react';

type DesktopIconProps = {
  id: string;
  title: string;
  type: 'note' | 'file';
  content: string;
  position: { x: number; y: number };
  onOpen: (id: string) => void;
};

export function DesktopIcon({ id, title, type, content, position, onOpen }: DesktopIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    console.log("Icon clicked:", id);
    onOpen(id);
  };
  
  return (
    <motion.div
      className="desktop-icon absolute flex flex-col items-center w-20 cursor-pointer"
      style={{ 
        top: position.y, 
        left: position.x 
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className="group relative flex flex-col items-center">
        <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-white/10 backdrop-blur-md shadow-lg ${isHovered ? 'bg-white/20' : ''}`}>
          {type === 'note' ? (
            <StickyNote className="w-7 h-7 text-yellow-400" />
          ) : (
            <FileText className="w-7 h-7 text-blue-400" />
          )}
        </div>
        <div className={`mt-1 px-2 py-0.5 rounded ${isHovered ? 'bg-black/40 text-white' : 'text-white/90'} text-xs text-center max-w-full line-clamp-2 backdrop-blur-sm`}>
          {title}
        </div>
      </div>
    </motion.div>
  );
}