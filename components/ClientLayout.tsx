"use client";

import React from 'react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NotificationProvider } from '@/components/oneui/NotificationProvider';
import { MobileCheck } from './mobile-check';
import { OneUIThemeProvider } from "@/components/oneui/OneUIThemeContext";
import { TooltipProvider } from "./ui/tooltip";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <OneUIThemeProvider>
          <NotificationProvider>
            <MobileCheck>{children}</MobileCheck>
          </NotificationProvider>
        </OneUIThemeProvider>
      </TooltipProvider>
    </NextThemesProvider>
  );
} 