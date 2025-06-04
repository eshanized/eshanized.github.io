"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { OneUIThemeProvider } from "./oneui/OneUIThemeContext";

export function ThemeProvider({ children, ...props }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <OneUIThemeProvider>
        {children}
      </OneUIThemeProvider>
    </NextThemesProvider>
  );
}