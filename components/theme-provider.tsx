"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as MIUIThemeProvider } from "./miui/ThemeContext";

export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <MIUIThemeProvider>
        {children}
      </MIUIThemeProvider>
    </NextThemesProvider>
  );
}