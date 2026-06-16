"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

type Theme = "day" | "night";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isWiping: boolean;
  setIsWiping: (val: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("day");
  const [isWiping, setIsWiping] = useState(false);

  // Load saved theme if any
  useEffect(() => {
    const saved = localStorage.getItem("sunnest-theme") as Theme;
    if (saved === "day" || saved === "night") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      document.documentElement.setAttribute("data-theme", "day");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    if (isWiping) return; // Prevent double trigger during sweep
    setIsWiping(true);

    // Halfway through the 1-second diagonal sweep, toggle the visual theme state
    setTimeout(() => {
      setTheme((prev) => {
        const next = prev === "day" ? "night" : "day";
        localStorage.setItem("sunnest-theme", next);
        document.documentElement.setAttribute("data-theme", next);
        return next;
      });
    }, 500); // syncs with the center of the 1000ms transition wipe
  }, [isWiping]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isWiping, setIsWiping }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
