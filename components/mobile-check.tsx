"use client";

import React from 'react';
import { useMobileDetector } from '@/hooks/use-mobile-detector';
import { MobileWarning } from './mobile-warning';
import { TabletLayout } from './tablet-layout';

export const MobileCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isMobile, isTablet, isClient } = useMobileDetector();

  // Only show the warning after client-side hydration
  if (!isClient) {
    return <>{children}</>;
  }

  // On small mobile devices, show the warning
  if (isMobile && !isTablet) {
    return <MobileWarning />;
  }

  // On tablet devices, use the tablet-optimized layout
  if (isTablet) {
    return <TabletLayout>{children}</TabletLayout>;
  }

  // On desktop, render the normal content
  return <>{children}</>;
}; 