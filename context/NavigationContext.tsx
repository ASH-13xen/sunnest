"use client";

import React, { createContext, useContext, useRef, useState, useCallback } from "react";
import { useAnimation } from "framer-motion";
import { AnimPhase, NavigationContextValue } from "@/types/navigation";
import { SECTIONS, COLS, ROWS, GAP } from "@/constants/sections";

type AnimationControls = ReturnType<typeof useAnimation>;

const NavigationContext = createContext<NavigationContextValue | null>(null);

export function NavigationProvider({
  children,
  controls,
}: {
  children: React.ReactNode;
  controls: AnimationControls;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [phase, setPhase] = useState<AnimPhase>("idle");
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);
  // Mobile-only: the default view is a normal scroll-stack of all sections. This
  // flips true briefly while navigate() shows the bento mosaic as a "select and
  // zoom" flourish, mirroring the desktop overview, then flips back to false.
  const [mobileMosaicOpen, setMobileMosaicOpen] = useState(false);
  const animatingRef = useRef(false);

  const scrollTo = useCallback(
    async (targetIndex: number) => {
      if (animatingRef.current) return;
      if (targetIndex < 0 || targetIndex >= SECTIONS.length) return;
      if (targetIndex === activeIndex) return;
      animatingRef.current = true;

      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const target = SECTIONS[targetIndex];
      const focusX = -(target.col * (vw + GAP));
      const focusY = -(target.row * (vh + GAP));

      setPhase("zooming-in");
      setActiveIndex(targetIndex);

      await controls.start({
        x: focusX,
        y: focusY,
        scale: 1,
        transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
      });

      setPhase("idle");
      animatingRef.current = false;
    },
    [activeIndex, controls]
  );

  const navigate = useCallback(
    async (targetIndex: number) => {
      if (animatingRef.current || targetIndex === activeIndex) return;
      animatingRef.current = true;

      // Mobile has no grid to zoom through — flash the bento mosaic with the
      // target tile highlighted, then settle on that section, echoing the
      // desktop zoom-out/highlight/zoom-in flow without the pixel transforms.
      if (window.innerWidth < 1024) {
        setPhase("zooming-out");
        setMobileMosaicOpen(true);
        await new Promise((r) => setTimeout(r, 350)); // let the mosaic finish animating in

        setPhase("overview");
        setHighlightIndex(targetIndex);
        await new Promise((r) => setTimeout(r, 550)); // hold the highlight so it reads as "selected"

        // Keep highlightIndex set through "zooming-in" — the morph-target rect in
        // BentoGrid shares a layoutId with this tile and reads it to grow into
        // the full screen, fading out once it has covered the section beneath.
        setPhase("zooming-in");
        setActiveIndex(targetIndex);
        setMobileMosaicOpen(false);
        await new Promise((r) => setTimeout(r, 600)); // let the tile finish growing + fading

        setHighlightIndex(null);
        setPhase("idle");
        animatingRef.current = false;
        return;
      }

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Cell size including gaps
      const cellW = vw; // each cell is 1 viewport wide
      const cellH = vh;

      // Overview scale: fit entire grid (COLS cols, ROWS rows + gaps) into viewport
      const totalW = COLS * cellW + (COLS - 1) * GAP;
      const totalH = ROWS * cellH + (ROWS - 1) * GAP;
      const overviewScale = Math.min(vw / totalW, vh / totalH) * 0.92;

      const scaledW = totalW * overviewScale;
      const scaledH = totalH * overviewScale;
      const overviewX = (vw - scaledW) / 2;
      const overviewY = (vh - scaledH) / 2;

      // ── Zoom out ──
      setPhase("zooming-out");
      await controls.start({
        x: overviewX,
        y: overviewY,
        scale: overviewScale,
        transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
      });

      // ── Show overview briefly, highlight target ──
      setPhase("overview");
      setHighlightIndex(targetIndex);
      await new Promise((r) => setTimeout(r, 400));

      // ── Zoom in to target ──
      setPhase("zooming-in");
      setActiveIndex(targetIndex);
      const target = SECTIONS[targetIndex];
      const focusX = -(target.col * (cellW + GAP));
      const focusY = -(target.row * (cellH + GAP));

      await controls.start({
        x: focusX,
        y: focusY,
        scale: 1,
        transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
      });

      setHighlightIndex(null);
      setPhase("idle");
      animatingRef.current = false;
    },
    [activeIndex, controls]
  );

  return (
    <NavigationContext.Provider value={{ activeIndex, phase, highlightIndex, navigate, scrollTo, setActiveIndex, mobileMosaicOpen, setMobileMosaicOpen }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error("useNavigation must be used inside NavigationProvider");
  return ctx;
}
