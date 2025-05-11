"use client";

import React, { useState } from 'react';
import BaseMIUIApp from './BaseMIUIApp';
import { Camera, Zap, ArrowLeft, ArrowRight, Image as ImageIcon } from 'lucide-react';

export default function CameraApp() {
  const [cameraMode, setCameraMode] = useState<string>("photo");
  const [flashMode, setFlashMode] = useState<string>("off");
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  
  // Camera modes
  const modes = [
    { id: "time-lapse", name: "Time-Lapse" },
    { id: "slo-mo", name: "Slo-Mo" },
    { id: "video", name: "Video" },
    { id: "photo", name: "Photo" },
    { id: "portrait", name: "Portrait" },
    { id: "pano", name: "Pano" }
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
        return <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />;
      default:
        return <Zap className="w-6 h-6 text-white" strokeWidth={1.5} />;
    }
  };
  
  return (
    <BaseMIUIApp title="Camera" headerColor="bg-black" headerTextColor="text-white">
      <div className="h-full flex flex-col bg-black text-white">
        {/* Camera viewfinder (simulated) */}
        <div className="flex-1 flex items-center justify-center relative">
          {/* Black screen with faded circular gradient to simulate camera */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-radial from-gray-900/70 to-black"></div>
          </div>
          
          {/* Camera flip status */}
          <div className="absolute top-4 right-4 text-white/90 text-sm">
            {isFlipped ? "Front Camera" : "Back Camera"}
          </div>
          
          {/* Default camera message */}
          <p className="text-white text-xl z-10">
            {cameraMode === "photo" ? "Point and shoot" : "Ready to record"}
          </p>
        </div>
        
        {/* Camera controls */}
        <div className="py-8 px-6 flex flex-col">
          {/* Mode selector */}
          <div className="mb-8 flex justify-center">
            <div className="flex space-x-5 overflow-x-auto pb-1 text-sm whitespace-nowrap">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  className={`px-2 py-1 ${
                    cameraMode === mode.id
                      ? "text-yellow-400 font-medium"
                      : "text-white/70"
                  }`}
                  onClick={() => setCameraMode(mode.id)}
                >
                  {mode.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Shutter area */}
          <div className="flex items-center justify-between">
            {/* Left controls */}
            <div className="flex flex-col items-center w-16">
              <button 
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-white/40"
                onClick={toggleFlash}
              >
                {getFlashIcon()}
              </button>
              <span className="text-xs mt-1 text-white/90">
                Flash {flashMode.charAt(0).toUpperCase() + flashMode.slice(1)}
              </span>
            </div>
            
            {/* Shutter button */}
            <div className="flex-shrink-0">
              <button className="w-18 h-18 rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white"></div>
              </button>
            </div>
            
            {/* Right controls */}
            <div className="flex flex-col items-center w-16">
              <button 
                className="w-12 h-12 rounded-full bg-black flex items-center justify-center border border-white/40"
                onClick={handleFlipCamera}
              >
                <ArrowRight className="w-5 h-5 text-white" />
                <ArrowLeft className="w-5 h-5 text-white -ml-1" />
              </button>
              <span className="text-xs mt-1 text-white/90">Flip</span>
            </div>
          </div>
          
          {/* Recent photos preview */}
          <div className="absolute bottom-8 left-5">
            <div className="w-12 h-12 rounded-md bg-gray-800 border border-white/20 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white/50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseMIUIApp>
  );
} 