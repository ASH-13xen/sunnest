"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { NavigationProvider, useNavigation } from "@/context/NavigationContext";
import { useTheme } from "@/context/ThemeContext";
import { SECTIONS, COLS, ROWS, GAP, Section } from "@/constants/sections";
import { WeaveSpinner } from "@/components/ui/WeaveSpinner";
import dynamic from "next/dynamic";
import Navbar        from "@/components/layout/Navbar";
import HeroPage      from "@/components/sections/HeroPage";

const dynamicImports = {
  about:     () => import("@/components/sections/AboutPage"),
  solutions: () => import("@/components/sections/SolutionsPage"),
  pricing:   () => import("@/components/sections/PricingPage"),
  services:  () => import("@/components/sections/ServicesPage"),
  contact:   () => import("@/components/sections/ContactPage"),
};

const AboutPage     = dynamic(dynamicImports.about,     { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><WeaveSpinner /></div> });
const SolutionsPage = dynamic(dynamicImports.solutions, { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><WeaveSpinner /></div> });
const PricingPage   = dynamic(dynamicImports.pricing,   { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><WeaveSpinner /></div> });
const ServicesPage  = dynamic(dynamicImports.services,  { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><WeaveSpinner /></div> });
const ContactPage   = dynamic(dynamicImports.contact,   { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><WeaveSpinner /></div> });

import { cn } from "@/lib/utils";

type PageComponent = React.ComponentType<{ section: Section }>;

const PAGE_MAP: Record<string, PageComponent> = {
  hero:      HeroPage,
  about:     AboutPage,
  solutions: SolutionsPage,
  pricing:   PricingPage,
  services:  ServicesPage,
  contact:   ContactPage,
};

// ── 3D Tilt Wrapper for Bento Overview Cells ───────────────────────────────
interface BentoCellWrapperProps {
  children: React.ReactNode;
  section: Section;
  isOverview: boolean;
  isVisible: boolean;
}

function BentoCellWrapper({ children, section, isOverview, isVisible }: BentoCellWrapperProps) {
  return (
    <div 
      className="w-full h-full relative"
      style={{
        gridColumnStart: section.col + 1,
        gridRowStart: section.row + 1,
      }}
    >
      <div
        className={cn(
          "w-full h-full rounded-2xl relative transition-shadow duration-300",
          isOverview 
            ? "hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_10px_30px_-10px_rgba(255,255,255,0.05)]" 
            : ""
        )}
        style={{ display: isVisible ? "block" : "none" }}
      >
        {children}
        {isOverview && (
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-gold-500/40 dark:hover:border-gold-400/40 pointer-events-none transition-colors duration-300 z-50" />
        )}
      </div>
    </div>
  );
}

// ── Scroll + keyboard handler (lives inside NavigationProvider) ───────────
function ScrollHandler() {
  const { scrollTo, phase, activeIndex } = useNavigation();

  // Date.now() prevents the first wheel event ever from immediately navigating
  const lastWheelRef = useRef(Date.now());
  const phaseRef     = useRef(phase);
  const indexRef     = useRef(activeIndex);
  const scrollFnRef  = useRef(scrollTo);

  useEffect(() => { phaseRef.current    = phase;       }, [phase]);
  useEffect(() => { indexRef.current    = activeIndex; }, [activeIndex]);
  useEffect(() => { scrollFnRef.current = scrollTo;    }, [scrollTo]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      // If a section owns its scroll (e.g. hero during expansion), stay out.
      // Sections set data-scroll-locked="true" on their root div to signal this.
      let lockEl = e.target as HTMLElement | null;
      while (lockEl && lockEl.tagName !== "BODY") {
        if (lockEl.dataset.scrollLocked === "true") return;
        lockEl = lockEl.parentElement;
      }

      // Walk up the DOM; if a scrollable element is NOT at its boundary, let
      // it scroll natively. Only proceed to section navigation when at the
      // top (scroll up) or bottom (scroll down) of every scrollable ancestor.
      let el = e.target as HTMLElement | null;
      while (el && el.tagName !== "BODY") {
        const s = window.getComputedStyle(el);
        if ((s.overflowY === "auto" || s.overflowY === "scroll") && el.scrollHeight > el.clientHeight) {
          const atTop    = e.deltaY < 0 && el.scrollTop <= 0;
          const atBottom = e.deltaY > 0 && el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
          if (!atTop && !atBottom) return; // mid-scroll — native wins
          break;                           // at boundary — fall through to navigate
        }
        el = el.parentElement;
      }

      if (phaseRef.current !== "idle") return;
      const now = Date.now();
      if (now - lastWheelRef.current < 900) return;
      lastWheelRef.current = now;

      scrollFnRef.current(indexRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onKey = (e: KeyboardEvent) => {
      if (phaseRef.current !== "idle") return;
      const dir =
        e.key === "ArrowDown" || e.key === "ArrowRight" ?  1 :
        e.key === "ArrowUp"   || e.key === "ArrowLeft"  ? -1 : 0;
      if (dir) scrollFnRef.current(indexRef.current + dir);
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, []); // stable refs — no need to re-register on each render

  return null;
}

// ── Main grid ─────────────────────────────────────────────────────────────
export default function BentoGrid() {
  const controls = useAnimation();
  const [loading, setLoading] = useState(true);
  const { theme, isWiping, setIsWiping } = useTheme();

  useEffect(() => {
    controls.set({ x: 0, y: 0, scale: 1 });
  }, [controls]);

  useEffect(() => {
    if (document.readyState === "complete") {
      const timer = setTimeout(() => setLoading(false), 1400);
      return () => clearTimeout(timer);
    } else {
      const handleLoad = () => {
        setTimeout(() => setLoading(false), 800);
      };
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    // Sequential prefetching of non-hero pages to prime the browser cache
    const keys = Object.keys(dynamicImports) as Array<keyof typeof dynamicImports>;
    const delay = 800; // ms spacing between fetches
    const timers = keys.map((key, index) => {
      return setTimeout(() => {
        dynamicImports[key]();
      }, index * delay);
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [loading]);

  return (
    <NavigationProvider controls={controls}>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A1628]"
          >
            <WeaveSpinner />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className="text-[9px] uppercase font-black tracking-widest text-[#FFD700] mt-6 font-mono"
            >
              Powering Clean Energy...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      <ScrollHandler />
      
      {/* Theme Transition Swipe Wave Overlay */}
      <AnimatePresence>
        {isWiping && (
          <>
            {/* Front styled wipe wave */}
            <motion.div
              initial={{ x: "-100%", skewX: -15 }}
              animate={{ x: ["-100%", "0%", "100%"] }}
              exit={{ x: "100%" }}
              transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
              onAnimationComplete={() => setIsWiping(false)}
              className="fixed inset-y-0 -left-[20%] w-[140%] z-[150] pointer-events-none bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 shadow-[0_0_50px_rgba(0,0,0,0.3)]"
            />
            {/* Back background mask wave */}
            <motion.div
              initial={{ x: "-100%", skewX: -15 }}
              animate={{ x: ["-100%", "0%", "100%"] }}
              transition={{ duration: 1.0, delay: 0.05, ease: [0.76, 0, 0.24, 1] }}
              className="fixed inset-y-0 -left-[20%] w-[140%] z-[140] pointer-events-none bg-bg-cream"
            />
          </>
        )}
      </AnimatePresence>

      <BentoGridContent controls={controls} theme={theme} />
    </NavigationProvider>
  );
}

// Inner content to resolve useNavigation context requirements
function BentoGridContent({ 
  controls, 
  theme 
}: { 
  controls: any; 
  theme: string;
}) {
  const { phase, activeIndex } = useNavigation();
  const isOverviewMode = phase === "overview" || phase === "zooming-out" || phase === "zooming-in";
  const isTransitioning = phase === "zooming-in" || phase === "zooming-out";

  return (
    <div className="fixed inset-0 overflow-hidden bg-bg-cream transition-colors duration-500">
      {/* Static Background Solar Farm Image */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-[background-image] duration-1000"
        style={{
          backgroundImage: `url(${
            theme === "day"
              ? "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&auto=format&fit=crop&q=80"
              : "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1920&auto=format&fit=crop&q=80"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Adaptive overlay — grid lines + wash; adapts to data-theme */}
      <div className="absolute inset-0 z-20 pointer-events-none bento-overlay" />

      <Navbar />

      {/* Grid wrapper — scaled/translated for the bento zoom animation */}
      <motion.div
        animate={controls}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width:  `calc(${COLS} * 100vw + ${(COLS - 1) * GAP}px)`,
          height: `calc(${ROWS} * 100vh + ${(ROWS - 1) * GAP}px)`,
          transformOrigin: "top left",
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 100vw)`,
          gridTemplateRows:    `repeat(${ROWS}, 100vh)`,
          gap: `${GAP}px`,
          zIndex: 30,
          pointerEvents: isTransitioning ? "none" : "auto",
          willChange: isTransitioning ? "transform" : "auto",
        }}
      >
        {SECTIONS.map((section) => {
          const Page = PAGE_MAP[section.id];
          const isVisible = isOverviewMode || activeIndex === section.index;
          return (
            <BentoCellWrapper 
              key={section.id} 
              section={section} 
              isOverview={isOverviewMode}
              isVisible={isVisible}
            >
              <Page section={section} />
            </BentoCellWrapper>
          );
        })}
      </motion.div>
    </div>
  );
}
