"use client";

import React, { useEffect, useState } from 'react';

export const TabletLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scaleFactor, setScaleFactor] = useState(1);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    typeof window !== 'undefined' && window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
  );
  const [showInstructions, setShowInstructions] = useState(true);
  const [useDesktopView, setUseDesktopView] = useState(false);

  useEffect(() => {
    const updateScaleAndOrientation = () => {
      if (useDesktopView) {
        setScaleFactor(1);
        return;
      }
      
      // Calculate scale factor based on screen width
      // We want to scale down the desktop experience to fit tablet screens
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isPortrait = height > width;
      
      setOrientation(isPortrait ? 'portrait' : 'landscape');
      
      // Base scale on a reference desktop width of 1440px
      const baseWidth = 1440;
      let newScaleFactor = width / baseWidth;
      
      // Adjust based on orientation
      if (isPortrait) {
        // In portrait, we need a more aggressive scaling
        newScaleFactor = Math.min(newScaleFactor, 0.6);
      } else {
        // In landscape, we can be more generous
        newScaleFactor = Math.min(newScaleFactor, 0.85);
      }
      
      // Ensure scale is never too small
      newScaleFactor = Math.max(newScaleFactor, 0.5);
      
      setScaleFactor(newScaleFactor);
    };

    updateScaleAndOrientation();
    window.addEventListener('resize', updateScaleAndOrientation);
    
    // Auto-hide instructions after 8 seconds
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 8000);
    
    return () => {
      window.removeEventListener('resize', updateScaleAndOrientation);
      clearTimeout(timer);
    };
  }, [useDesktopView]);

  // Toggle desktop view useEffect
  useEffect(() => {
    if (useDesktopView) {
      // When switching to desktop view, scroll to top
      window.scrollTo(0, 0);
      // Add overflow handling
      document.body.style.overflow = 'auto';
    } else {
      // Remove overflow in scaled view
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [useDesktopView]);

  return (
    <div className={`tablet-container w-full h-full ${useDesktopView ? '' : 'overflow-hidden bg-black'}`}>
      <div
        className={useDesktopView ? '' : `tablet-content origin-top-left ${
          orientation === 'portrait' ? 'origin-top' : 'origin-top-left'
        }`}
        style={
          useDesktopView 
            ? {} 
            : {
                transform: `scale(${scaleFactor})`,
                width: `${(100 / scaleFactor)}%`,
                height: `${(100 / scaleFactor)}%`,
                transformOrigin: orientation === 'portrait' ? 'top center' : 'top left',
              }
        }
      >
        {children}
      </div>
      
      {/* Controls */}
      {!useDesktopView && (
        <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white text-xs p-2 rounded-md shadow-md flex gap-2">
          <button 
            onClick={() => document.documentElement.requestFullscreen().catch(err => console.log('Fullscreen error:', err))}
            className="px-3 py-1 bg-zinc-700 rounded hover:bg-zinc-600 transition"
          >
            Fullscreen
          </button>
          <button 
            onClick={() => setUseDesktopView(true)}
            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Desktop View
          </button>
          <button 
            onClick={() => setShowInstructions(true)}
            className="px-3 py-1 bg-zinc-700 rounded hover:bg-zinc-600 transition"
          >
            Help
          </button>
        </div>
      )}
      
      {/* Desktop mode floating control */}
      {useDesktopView && (
        <div className="fixed bottom-4 right-4 z-50 bg-black/80 text-white text-xs p-2 rounded-md shadow-md">
          <button 
            onClick={() => setUseDesktopView(false)}
            className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Back to Tablet View
          </button>
        </div>
      )}
      
      {/* Instructions overlay */}
      {showInstructions && !useDesktopView && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-6 text-white"
          onClick={() => setShowInstructions(false)}
        >
          <div className="max-w-md bg-zinc-900 p-6 rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">Tablet Mode</h2>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                <span>For the best experience, rotate your tablet to <strong>landscape orientation</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                <span>Tap <strong>Fullscreen</strong> for an immersive experience.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                <span>Switch to <strong>Desktop View</strong> if you prefer the full unscaled version (requires scrolling).</span>
              </li>
            </ul>
            <button 
              className="w-full bg-zinc-700 hover:bg-zinc-600 transition py-2 rounded"
              onClick={() => setShowInstructions(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 