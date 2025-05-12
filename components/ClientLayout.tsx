"use client";

import React from 'react';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { NotificationProvider } from '@/components/miui/NotificationProvider';
import { MobileCheck } from '@/components/mobile-check';
import { MIUIThemeProvider } from "@/components/miui/MIUIThemeContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <MobileCheck>
          <MIUIThemeProvider>
            {children}
          </MIUIThemeProvider>
        </MobileCheck>
      </NotificationProvider>
    </ThemeProvider>
  );
} 