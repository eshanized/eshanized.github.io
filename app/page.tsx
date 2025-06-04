"use client";

import { SnigdhaOSDesktop } from '@/components/snigdhaos/desktop';
import { useMobileDetector } from '@/hooks/use-mobile-detector';

// Desktop components will be rendered directly
// Mobile devices will show the OneUI Layout through the MobileCheck component

export default function Home() {
  const { isMobile, isTablet } = useMobileDetector();
  
  // Only render the desktop on non-mobile devices
  // Mobile devices will show the OneUI Layout through the MobileCheck component
  if (isMobile || isTablet) {
    return null;
  }
  
  return <SnigdhaOSDesktop />;
}