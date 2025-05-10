"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as IOSThemeProvider } from "./ios/ThemeContext";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <IOSThemeProvider>
        {children}
      </IOSThemeProvider>
    </NextThemesProvider>
  );
}