"use client";

import { useState, useEffect } from "react";
import { useNavigation } from "@/context/NavigationContext";
import { useTheme } from "@/context/ThemeContext";
import { SECTIONS } from "@/constants/sections";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { navigate, activeIndex, phase } = useNavigation();
  const { theme, toggleTheme } = useTheme();
  const isAnimating = phase !== "idle";
  const isHero = activeIndex === 0;

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-8 py-4 transition-all duration-300",
      scrolled && isMobile
        ? "bg-bg-cream/80 backdrop-blur-md border-b border-gold-500/10 shadow-md"
        : "bg-transparent border-transparent shadow-none"
    )}>
      {/* Logo text */}
      <span className={cn(
        "text-xl font-bold tracking-tight select-none transition-colors duration-300 z-[60]",
        (isHero || isOpen || theme === "night") ? "text-white" : "text-text-dark"
      )}>
        Sun<span className="text-[#FFD700]">Nest</span>
        <span className={cn(
          "text-sm font-medium ml-1 transition-colors duration-300",
          (isHero || isOpen || theme === "night") ? "text-white/70" : "text-text-mid"
        )}>Power</span>
      </span>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Desktop Nav links */}
        {!isMobile && (
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
        )}

        {/* Theme Toggle Button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleTheme(); }}
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 border shadow-md z-[60]",
            (isHero || isOpen || theme === "night")
              ? "bg-white/10 border-white/10 hover:bg-white/20 text-[#60A5FA]"
              : "bg-[#D4A017]/10 border-[#D4A017]/25 hover:bg-[#D4A017]/25 text-[#FFD700]"
          )}
          title={theme === "day" ? "Switch to Night Mode" : "Switch to Day Mode"}
        >
          {theme === "day" ? (
            <Sun className="w-4.5 h-4.5" />
          ) : (
            <Moon className="w-4.5 h-4.5" />
          )}
        </button>

        {/* Mobile Hamburger Button */}
        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "w-8 h-8 rounded-full border flex flex-col items-center justify-center gap-1.5 cursor-pointer z-[60] relative transition-colors duration-300 shadow-md",
              (isHero || isOpen || theme === "night")
                ? "bg-white/10 border-white/10 hover:bg-white/20"
                : "bg-navy-900/5 border-navy-900/10 hover:bg-navy-900/10"
            )}
            aria-label="Toggle navigation menu"
          >
            <motion.span
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 5.5 : 0 }}
              className={cn("w-4 h-0.5 block rounded-full transition-colors", (isHero || isOpen || theme === "night") ? "bg-white" : "bg-text-dark")}
            />
            <motion.span
              animate={{ opacity: isOpen ? 0 : 1 }}
              className={cn("w-4 h-0.5 block rounded-full transition-colors", (isHero || isOpen || theme === "night") ? "bg-white" : "bg-text-dark")}
            />
            <motion.span
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -5.5 : 0 }}
              className={cn("w-4 h-0.5 block rounded-full transition-colors", (isHero || isOpen || theme === "night") ? "bg-white" : "bg-text-dark")}
            />
          </button>
        )}
      </div>

      {/* Mobile Glassmorphic Navigation Drawer */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-[#0A1628]/95 backdrop-blur-md z-50 flex flex-col items-center justify-center px-8"
          >
            <ul className="flex flex-col items-center gap-6 list-none p-0 m-0 w-full max-w-xs">
              {SECTIONS.map((section, idx) => {
                const isActive = section.index === activeIndex;
                return (
                  <motion.li
                    key={section.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="w-full text-center"
                  >
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        navigate(section.index);
                      }}
                      className={cn(
                        "w-full text-lg font-black transition-all duration-300 cursor-pointer py-2 px-6 rounded-full border",
                        isActive
                          ? "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 border-transparent shadow-md shadow-gold-500/20"
                          : "text-white/85 hover:text-white border-transparent hover:bg-white/5"
                      )}
                    >
                      {section.label}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
