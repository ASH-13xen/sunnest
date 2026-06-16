"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlowButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export const GlowButton = ({ children, className, onClick, ...props }: GlowButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coords relative to button for radial glow
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  // Magnetic displacement springs (smooth lag)
  const translateX = useSpring(0, { stiffness: 120, damping: 15 });
  const translateY = useSpring(0, { stiffness: 120, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    
    // Relative coordinates inside button for glow spotlight
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowX.set(x);
    glowY.set(y);

    // Magnetic pull: offset button center slightly toward cursor (max 8px)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (e.clientX - (rect.left + centerX)) * 0.18; // Pull intensity
    const deltaY = (e.clientY - (rect.top + centerY)) * 0.18;
    
    const maxDisplacement = 8;
    const mag = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (mag > maxDisplacement) {
      translateX.set((deltaX / mag) * maxDisplacement);
      translateY.set((deltaY / mag) * maxDisplacement);
    } else {
      translateX.set(deltaX);
      translateY.set(deltaY);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    translateX.set(0);
    translateY.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: translateX,
        y: translateY,
      }}
      className={cn(
        "relative overflow-hidden transition-all duration-300 shadow-md",
        className
      )}
      {...props}
    >
      {/* Golden spotlight hover background */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle 80px at ${glowX}px ${glowY}px, rgba(255, 215, 0, 0.28), transparent)`,
        }}
      />
      
      {/* Content wrapper */}
      <span className="relative z-10 flex items-center justify-center gap-1.5">{children}</span>
    </motion.button>
  );
};
