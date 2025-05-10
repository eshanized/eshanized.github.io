"use client";

import React from 'react';
import { useMobileDetector } from '@/hooks/use-mobile-detector';
import dynamic from 'next/dynamic';
import { TabletLayout } from './tablet-layout';

// Dynamically import the IOSLayout to avoid SSR issues
const IOSLayout = dynamic(() => import('@/components/ios/IOSLayout'), { ssr: false });

export const MobileCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile, isTablet, isClient } = useMobileDetector();

  // Only show the warning after client-side hydration
  if (!isClient) {
    return <>{children}</>;
  }

  // On small mobile devices, show the iOS interface
  if (isMobile && !isTablet) {
    return <IOSLayout>{children}</IOSLayout>;
  }

  // On tablet devices, use the tablet-optimized layout
  if (isTablet) {
    return <TabletLayout>{children}</TabletLayout>;
  }

  // On desktop, render the normal content
  return <>{children}</>;
}; 