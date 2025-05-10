"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as IOSThemeProvider } from "./ios/ThemeContext";

export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <IOSThemeProvider>
        {children}
      </IOSThemeProvider>
    </NextThemesProvider>
  );
}