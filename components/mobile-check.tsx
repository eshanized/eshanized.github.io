"use client";

import React, { useEffect, useState } from 'react';
import { useMobileDetector } from '@/hooks/use-mobile-detector';
import dynamic from 'next/dynamic';
import { TabletLayout } from './tablet-layout';
import { OneUIThemeProvider } from '@/components/oneui/OneUIThemeContext';

// Dynamically import the OneUILayout to avoid SSR issues
const OneUILayout = dynamic(() => import('@/components/oneui/OneUILayout'), { ssr: false });

export const MobileCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile, isTablet, isClient } = useMobileDetector();
  const [hasMounted, setHasMounted] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Always call hooks at the top level
  useEffect(() => {
    setHasMounted(true);
    setIsMobileDevice(isMobile);
  }, [isMobile]);

  // Only show the warning after client-side hydration
  if (!isClient) {
    return <>{children}</>;
  }

  if (!hasMounted || !isMobileDevice) {
    return <>{children}</>; // Render children directly on desktop or before mount
  }

  // On small mobile devices, show the OneUI interface
  return (
    <OneUIThemeProvider>
      <OneUILayout />
    </OneUIThemeProvider>
  );
}; 