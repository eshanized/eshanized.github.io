"use client";

import React, { useState } from 'react';
import BaseOneUIApp from './BaseOneUIApp';
import { Camera, Zap, ArrowLeft, ArrowRight, Image as ImageIcon, Settings } from 'lucide-react';
import { useOneUITheme } from '../OneUIThemeContext';

export default function CameraApp() {
  const [cameraMode, setCameraMode] = useState<string>("photo");
  const [flashMode, setFlashMode] = useState<string>("off");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const { colors, isDarkMode } = useOneUITheme();
  
  // Camera modes
  const modes = [
    { id: "portrait", name: "Portrait" },
    { id: "photo", name: "Photo" },
    { id: "video", name: "Video" },
    { id: "pro", name: "Pro" },
    { id: "pano", name: "Panorama" },
    { id: "more", name: "More" }
  ];
  
  // Flash modes
  const toggleFlash = () => {
    const flashModes = ["off", "auto", "on"];
    const currentIndex = flashModes.indexOf(flashMode);
    const nextIndex = (currentIndex + 1) % flashModes.length;
    setFlashMode(flashModes[nextIndex]);
  };
  
  // Flip camera
  const handleFlipCamera = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Get flash icon
  const getFlashIcon = () => {
    switch (flashMode) {
      case "auto":
        return "A";
      case "on":
        return <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />;
      default:
        return <Zap className="w-5 h-5 text-white" strokeWidth={1.5} />;
    }
  };
  
  return (
    <BaseOneUIApp title="Camera" headerColor="bg-black" headerTextColor="text-white">
      <div className="h-full flex flex-col bg-black text-white">
        {/* Camera viewfinder (simulated) */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Black screen with faded circular gradient to simulate camera */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-radial from-gray-900/70 to-black"></div>
          </div>
          
          {/* Settings button */}
          <div className="absolute top-4 right-4 flex space-x-3">
            <button className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </button>
          </div>
          
          {/* Camera flip status */}
          <div className="absolute top-4 left-4 text-white/90 text-sm">
            {isFlipped ? "Front Camera" : "Back Camera"}
          </div>
          
          {/* Helpful hint */}
          <p className="text-white/70 text-sm z-10">
            {cameraMode === "photo" ? "Tap to focus" : "Press to start"}
          </p>
          
          {/* Flash mode indicator */}
          <div className="absolute bottom-28 left-6">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                {getFlashIcon()}
              </div>
              <span className="text-xs mt-1 text-white/70">
                {flashMode.charAt(0).toUpperCase() + flashMode.slice(1)}
              </span>
            </div>
          </div>
          
          {/* Flip camera button */}
          <div className="absolute bottom-28 right-6">
            <div className="flex flex-col items-center">
              <button 
                className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center"
                onClick={handleFlipCamera}
              >
                <ArrowRight className="w-4 h-4 text-white" />
                <ArrowLeft className="w-4 h-4 text-white -ml-1" />
              </button>
              <span className="text-xs mt-1 text-white/70">Flip</span>
            </div>
          </div>
        </div>
        
        {/* Camera modes and shutter */}
        <div className="py-6 px-4 bg-black">
          {/* Mode selector */}
          <div className="mb-6">
            <div className="flex justify-center space-x-6 text-sm">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  className={`px-2 ${
                    cameraMode === mode.id
                      ? "text-yellow-300 font-medium border-b-2 border-yellow-300"
                      : "text-white/70"
                  }`}
                  onClick={() => setCameraMode(mode.id)}
                >
                  {mode.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            {/* Recent photos preview */}
            <div className="w-12 h-12">
              <div className="w-10 h-10 rounded-md bg-gray-800 border border-white/20 overflow-hidden flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-white/50" />
              </div>
            </div>
            
            {/* Shutter button */}
            <div className="flex-shrink-0">
              <button 
                className="w-16 h-16 rounded-full border-[3px] border-white flex items-center justify-center"
                onClick={toggleFlash} // Added for demo interactivity
              >
                <div className="w-14 h-14 rounded-full bg-white"></div>
              </button>
            </div>
            
            {/* Flash toggle */}
            <div className="w-12 h-12 flex items-center justify-center">
              <button 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                onClick={toggleFlash}
              >
                {getFlashIcon()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </BaseOneUIApp>
  );
} 