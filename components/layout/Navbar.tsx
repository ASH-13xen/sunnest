"use client";

import { useNavigation } from "@/context/NavigationContext";
import { useTheme } from "@/context/ThemeContext";
import { SECTIONS } from "@/constants/sections";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { navigate, activeIndex, phase } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const isAnimating = phase !== "idle";
  const isHero = activeIndex === 0;

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-300",
      "bg-transparent border-transparent shadow-none"
    )}>
      {/* Logo text */}
      <span className="text-xl font-bold tracking-tight text-white select-none">
        Sun<span className="text-[#FFD700]">Nest</span>
        <span className="text-white/70 text-sm font-medium ml-1">Power</span>
      </span>

      <div className="flex items-center gap-4">
        {/* Nav links */}
        <ul className="flex items-center gap-1 list-none p-0 m-0">
          {SECTIONS.map((section) => {
            const isActive = section.index === activeIndex;
            return (
              <li key={section.id}>
                <button
                  onClick={() => navigate(section.index)}
                  disabled={isAnimating}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer",
                    isActive
                      ? "bg-navy-900 text-gold-400 shadow-md border border-gold-500/35"
                      : isHero
                        ? "text-white/95 hover:bg-white/10 hover:text-white"
                        : "text-text-mid hover:bg-gold-500/10 hover:text-text-dark",
                    isAnimating ? "opacity-50 cursor-not-allowed" : ""
                  )}
                >
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Theme Toggle Button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border border-white/10 shadow-md",
            theme === "day"
              ? "bg-[#D4A017]/10 hover:bg-[#D4A017]/25 text-[#FFD700]"
              : "bg-white/10 hover:bg-white/20 text-[#60A5FA]"
          )}
          title={theme === "day" ? "Switch to Night Mode" : "Switch to Day Mode"}
        >
          {theme === "day" ? (
            <Sun className="w-4.5 h-4.5" />
          ) : (
            <Moon className="w-4.5 h-4.5" />
          )}
        </button>
      </div>
    </nav>
  );
}
