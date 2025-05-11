"use client";

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DivideIcon, X, Minus, Maximize, Minimize } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Rnd } from 'react-rnd';

type WindowProps = {
  id: string;
  title: string;
  icon: LucideIcon;
  children: ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
};

export function Window({
  id,
  title,
  icon: Icon,
  children,
  isActive,
  isMinimized,
  isMaximized,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 600, height: 400 },
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: WindowProps) {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [prevSize, setPrevSize] = useState(defaultSize);
  const [prevPosition, setPrevPosition] = useState(defaultPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (isMaximized) {
        setSize({ width: window.innerWidth, height: window.innerHeight - 38 });
        setPosition({ x: 0, y: 38 });
      }
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMaximized]);

  useEffect(() => {
    if (isMaximized) {
      setPrevSize(size);
      setPrevPosition(position);
      setSize({ width: window.innerWidth, height: window.innerHeight - 38 });
      setPosition({ x: 0, y: 38 });
    } else {
      setSize(prevSize);
      setPosition(prevPosition);
    }
  }, [isMaximized, position, size, prevPosition, prevSize]);

  // Double-click on title bar to maximize
  const handleTitleBarDoubleClick = () => {
    onMaximize();
  };

  return (
    <AnimatePresence>
      {!isMinimized && (
        <Rnd
          style={{ 
            zIndex: isActive ? 50 : 10,
            visibility: isMinimized ? 'hidden' : 'visible',
            opacity: isMinimized ? 0 : 1,
          }}
          size={{ width: size.width, height: size.height }}
          position={{ x: position.x, y: position.y }}
          onDragStart={() => setIsDragging(true)}
          onDragStop={(e, d) => {
            setPosition({ x: d.x, y: d.y });
            setIsDragging(false);
          }}
          onResizeStart={() => setIsResizing(true)}
          onResizeStop={(e, direction, ref, delta, position) => {
            setSize({
              width: parseInt(ref.style.width),
              height: parseInt(ref.style.height),
            });
            setPosition(position);
            setIsResizing(false);
          }}
          dragHandleClassName="window-drag-handle"
          disableDragging={isMaximized}
          enableResizing={!isMaximized}
          bounds="window"
          minWidth={300}
          minHeight={200}
          onMouseDown={onFocus}
          resizeHandleClasses={{
            bottom: 'resize-handle-bottom',
            bottomLeft: 'resize-handle-corner',
            bottomRight: 'resize-handle-corner',
            left: 'resize-handle-left',
            right: 'resize-handle-right',
            top: 'resize-handle-top',
            topLeft: 'resize-handle-corner',
            topRight: 'resize-handle-corner',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: isDragging ? 3 : 0,
              rotateX: isDragging ? '3deg' : '0deg',
            }}
            exit={{ 
              scale: 0.9, 
              opacity: 0,
              y: 10 
            }}
            transition={{ 
              duration: isDragging ? 0.1 : 0.2,
              type: 'spring',
              stiffness: 300,
              damping: 20
            }}
            className={`rounded-lg overflow-hidden snigdhaos-window ${
              isActive 
                ? 'shadow-2xl' 
                : 'shadow-lg'
            } flex flex-col h-full`}
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              background: isActive 
                ? 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(240, 240, 240, 0.90))' 
                : 'linear-gradient(to bottom, rgba(250, 250, 250, 0.85), rgba(230, 230, 230, 0.80))',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: isActive 
                ? '0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)' 
                : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0, 0, 0, 0.03)',
              transform: isResizing ? 'scale(1.0025)' : 'scale(1)',
              transition: 'background 0.2s, box-shadow 0.2s, transform 0.2s'
            }}
          >
            {/* Window title bar */}
            <div 
              className={`window-drag-handle h-8 flex items-center px-3 
                ${isActive ? 'bg-gradient-to-b from-gray-100/90 to-gray-200/90' : 'bg-gradient-to-b from-gray-200/80 to-gray-300/80'} 
                border-b border-gray-300/50 select-none`}
              style={{
                borderTopLeftRadius: '8px',
                borderTopRightRadius: '8px',
              }}
              onDoubleClick={handleTitleBarDoubleClick}
            >
              <div className="flex items-center space-x-2">
                <button 
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-[#FF5F57] hover:bg-[#FF5F57]/90 flex items-center justify-center group transition-all"
                  style={{
                    boxShadow: isActive ? '0 0 0 0.5px rgba(0, 0, 0, 0.2)' : 'none',
                  }}
                >
                  <X className="w-1.5 h-1.5 text-[#990000] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button 
                  onClick={onMinimize}
                  className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/90 flex items-center justify-center group transition-all"
                  style={{
                    boxShadow: isActive ? '0 0 0 0.5px rgba(0, 0, 0, 0.2)' : 'none',
                  }}
                >
                  <Minus className="w-1.5 h-1.5 text-[#996A00] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                <button 
                  onClick={onMaximize}
                  className="w-3 h-3 rounded-full bg-[#28C840] hover:bg-[#28C840]/90 flex items-center justify-center group transition-all"
                  style={{
                    boxShadow: isActive ? '0 0 0 0.5px rgba(0, 0, 0, 0.2)' : 'none',
                  }}
                >
                  {isMaximized ? (
                    <Minimize className="w-1.5 h-1.5 text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <Maximize className="w-1.5 h-1.5 text-[#006500] opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </button>
              </div>
              
              <div className="flex-1 flex justify-center items-center text-gray-700">
                <Icon className="w-3.5 h-3.5 mr-1.5 opacity-75" />
                <span className="text-xs font-medium">{title}</span>
              </div>
              
              <div className="w-16"></div>
            </div>
            
            {/* Window content */}
            <div className="flex-1 overflow-hidden bg-white/80 dark:bg-gray-800/90">
              {children}
            </div>

            {/* Invisible resize handles that show on hover */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="w-full h-full border-2 border-transparent hover:border-blue-400/30 rounded-lg opacity-0 hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        </Rnd>
      )}
    </AnimatePresence>
  );
}

/* Add these styles to your global CSS or as a style tag in your layout */
/* 
.resize-handle-bottom {
  position: absolute;
  height: 6px;
  bottom: -3px;
  left: 10px;
  right: 10px;
  cursor: ns-resize;
}

.resize-handle-top {
  position: absolute;
  height: 6px;
  top: -3px;
  left: 10px;
  right: 10px;
  cursor: ns-resize;
}

.resize-handle-left {
  position: absolute;
  width: 6px;
  left: -3px;
  top: 10px;
  bottom: 10px;
  cursor: ew-resize;
}

.resize-handle-right {
  position: absolute;
  width: 6px;
  right: -3px;
  top: 10px;
  bottom: 10px;
  cursor: ew-resize;
}

.resize-handle-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: 1;
}

.snigdhaos-window {
  will-change: transform;
}
*/