"use client";

import { useState, useRef, useCallback } from "react";
import { useNavigation } from "@/context/NavigationContext";
import { Section } from "@/constants/sections";
import { cn } from "@/lib/utils";
import KineticMaskHero from "@/components/blocks/kinetic-mask-hero";

// ─── Placeholder images ────────────────────────────────────────────────────
// Replace these with local files in public/ when you're ready:
//   hero-bg.jpg   → the background that fades out (wide aerial or sky shot)
//   hero-media.jpg or hero-media.mp4 → the card that expands to fill the screen
// Then change the constants below to "/hero-bg.jpg" / "/hero-media.jpg"
const BG_SRC    = "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1920&auto=format&fit=crop&q=60";
const MEDIA_SRC = "/hero-bg.mp4";

// ─── Design Rectangle Variables ─────────────────────────────────────────────
// You can adjust these variables to style the custom overlay rectangle:
const RECT_BORDER_THICKNESS = "2px";             // Thickness of the border (e.g. "1px", "3px")
const RECT_CURVE            = "32px";            // Top corner radius (e.g. "12px", "40px")
const RECT_TOP              = "88px";            // Position below the top edge/navbar (e.g. "72px", "96px")
const RECT_SIDE_MARGIN      = "100px";           // Left and right spacing from screen edge (e.g. "16px", "48px")
const RECT_BOTTOM_OFFSET    = "-100px";          // Extends past bottom edge to end outside screen viewport (e.g. "-50px", "-100px")
const RECT_BORDER_COLOR     = "rgba(255, 255, 255, 0.5)"; // Border color (e.g. "white", "rgba(255,255,255,0.3)")
const RECT_Z_INDEX          = 45;                // Z-index layer placement
// ──────────────────────────────────────────────────────────────────────────

interface Props { section: Section }

export default function HeroPage({ section }: Props) {
  const { highlightIndex, phase, navigate, activeIndex } = useNavigation();
  const isHighlighted = highlightIndex === section.index;
  const isOverview    = phase === "overview" || phase === "zooming-out" || phase === "zooming-in";
  const isHeroActive  = activeIndex === 0;

  // Track whether the expanding media has reached full size.
  // While NOT expanded, data-scroll-locked prevents ScrollHandler from
  // navigating away — the expansion animation owns the wheel events.
  const [heroExpanded, setHeroExpanded] = useState(false);
  const rectRef = useRef<HTMLDivElement>(null);

  const handleProgressChange = useCallback((progress: number) => {
    if (rectRef.current) {
      rectRef.current.style.opacity = String(1 - progress);
    }
  }, []);

  return (
    <div
      onClick={() => { if (phase === "overview") navigate(section.index); }}
      data-scroll-locked={(isHeroActive && !heroExpanded) ? "true" : "false"}
      className={cn(
        "w-full h-screen lg:w-screen lg:h-screen relative overflow-hidden",
        isHighlighted
          ? "ring-4 ring-amber-400 shadow-2xl shadow-amber-400/30"
          : "ring-1 ring-white/10",
        isOverview && phase === "overview" ? "cursor-pointer" : ""
      )}
    >
      {isHighlighted && (
        <div className="absolute inset-0 bg-amber-300/10 pointer-events-none z-10" />
      )}

      {/* Premium Half-White Design Rectangle — fades out as card expands */}
      <div
        ref={rectRef}
        className="absolute pointer-events-none hidden lg:block"
        style={{
          top: RECT_TOP,
          left: RECT_SIDE_MARGIN,
          right: RECT_SIDE_MARGIN,
          bottom: RECT_BOTTOM_OFFSET,
          borderTop: `${RECT_BORDER_THICKNESS} solid ${RECT_BORDER_COLOR}`,
          borderLeft: `${RECT_BORDER_THICKNESS} solid ${RECT_BORDER_COLOR}`,
          borderRight: `${RECT_BORDER_THICKNESS} solid ${RECT_BORDER_COLOR}`,
          borderBottom: "none",
          borderTopLeftRadius: RECT_CURVE,
          borderTopRightRadius: RECT_CURVE,
          zIndex: RECT_Z_INDEX,
        }}
      />

      <KineticMaskHero
        mediaSrc={MEDIA_SRC}
        bgImageSrc={BG_SRC}
        isActive={isHeroActive && !isOverview}
        onExpansionChange={setHeroExpanded}
        onProgressChange={handleProgressChange}
      />
    </div>
  );
}
