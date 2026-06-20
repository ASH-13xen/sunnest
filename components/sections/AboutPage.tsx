"use client";

import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Award,
  Clock,
  FileCheck,
  Settings,
  ShieldCheck,
  Zap,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";
import { Section } from "@/constants/sections";
import { cn } from "@/lib/utils";
import { GlowButton } from "@/components/ui/GlowButton";

// ─── Core Benefits Data ──────────────────────────────────────────────────────
const BENEFITS = [
  {
    id: "expertise",
    title: "Backed by Industry Expertise",
    desc: "Led by professionals with 6+ years of experience in the solar industry.",
    icon: Award,
    tags: [
      { text: "6+ Years Experience", type: "featured" as const },
      { text: "Industry Veterans", type: "default" as const }
    ],
    stats: [
      { icon: ShieldCheck, text: "Proven Expertise" },
      { icon: Zap, text: "Trusted Track Record" }
    ],
  },
  {
    id: "execution",
    title: "On-Time Project Execution",
    desc: "Committed to delivering projects within agreed timelines.",
    icon: Clock,
    tags: [
      { text: "Guaranteed Timeline", type: "featured" as const },
      { text: "Efficient Delivery", type: "default" as const }
    ],
    stats: [
      { icon: ShieldCheck, text: "Timely Handover" },
      { icon: Zap, text: "Zero Quality Compromise" }
    ],
  },
  {
    id: "compliance",
    title: "DCR Compliance Support",
    desc: "Reliable sourcing and timely availability of DCR-certified modules.",
    icon: FileCheck,
    tags: [
      { text: "DCR-Certified Modules", type: "featured" as const },
      { text: "Reliable Sourcing", type: "default" as const }
    ],
    stats: [
      { icon: ShieldCheck, text: "Compliance Assured" },
      { icon: Zap, text: "On-Time Availability" }
    ],
  },
  {
    id: "epc",
    title: "End-to-End EPC Solutions",
    desc: "From consultation and design to installation and commissioning, we manage it all.",
    icon: Settings,
    tags: [
      { text: "Full EPC Scope", type: "featured" as const },
      { text: "Single-Window Execution", type: "default" as const }
    ],
    stats: [
      { icon: ShieldCheck, text: "Design to Commissioning" },
      { icon: Zap, text: "One Point of Contact" }
    ],
  }
];

const DIFFERENTIATORS = [
  "Leadership with Tata Power Solar experience",
  "Dedicated in-house engineers, not sub-contractors",
  "End-to-end support: design, install & lifetime service",
];


interface BenefitCardProps {
  position: number;
  benefit: (typeof BENEFITS)[0];
  handleMove: (steps: number) => void;
  cardSize: number;
  isMobile: boolean;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ position, benefit, handleMove, cardSize, isMobile }) => {
  const isCenter = position === 0;
  const IconComponent = benefit.icon;

  const CUT_SIZE = isMobile ? 24 : 35;
  const DIAG_LEN = Math.sqrt(2 * CUT_SIZE * CUT_SIZE);

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-[46%] cursor-pointer border p-3.5 md:p-5 transition-all duration-500 ease-in-out flex flex-col justify-between rounded-xl",
        isCenter
          ? "z-20 bg-gradient-to-b from-navy-900 to-navy-800 text-white border-gold-500"
          : "z-10 glass-card-sm text-text-dark border-gold-500/20 hover:border-gold-500/40"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath: `polygon(0 0, calc(100% - ${CUT_SIZE}px) 0%, 100% ${CUT_SIZE}px, 100% 100%, 0 100%)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.55) * position}px)
          translateY(${isCenter ? -15 : position % 2 ? 5 : -5}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.88})
        `,
        opacity: Math.abs(position) > 2 ? 0 : 1 - Math.abs(position) * 0.25,
        pointerEvents: Math.abs(position) > 1 ? "none" : "auto",
      }}
    >
      {/* Cut corner border line */}
      <span
        className={cn(
          "absolute block origin-top-right rotate-45",
          isCenter ? "bg-gold-500" : "bg-gold-500/25"
        )}
        style={{
          right: -1.2,
          top: CUT_SIZE - 1,
          width: DIAG_LEN,
          height: 1.5,
        }}
      />
      
      <div className="flex flex-col h-full justify-between">
        {/* Top: Icon + Title */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className={cn(
              "w-9.5 h-9.5 rounded-xl flex items-center justify-center shrink-0",
              isCenter ? "bg-gradient-to-br from-gold-500 to-gold-400 text-navy-900" : "bg-navy-900 text-gold-400"
            )}>
              <IconComponent className="w-4.5 h-4.5" />
            </div>
            <span className={cn("font-serif italic font-normal text-[11px] lg:text-xs capitalize tracking-wide", isCenter ? "text-gold-400" : "text-gold-500")}>
              SunNest Pillar
            </span>
          </div>

          <h3 className={cn("text-sm! md:text-base! lg:text-[17px] font-black mb-1 leading-tight! tracking-tight", isCenter ? "text-gold-400" : "text-text-dark")}>
            {benefit.title}
          </h3>
          <p className={cn("text-[10.5px]! lg:text-xs leading-relaxed! font-semibold", isCenter ? "text-white/75" : "text-text-mid")}>
            {benefit.desc}
          </p>
        </div>

        {/* Bottom tags */}
        {!isMobile && (
          <div className="mt-3 pt-2.5 border-t border-dashed border-gold-500/10 flex flex-col gap-1.5 shrink-0">
            <div className="flex flex-wrap gap-1">
              {benefit.tags.map((tag, i) => (
                <span
                  key={i}
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[8.5px] lg:text-[9.5px] font-bold tracking-wide",
                    tag.type === "featured"
                      ? "bg-gold-500/12 text-gold-500 border border-gold-500/25"
                      : isCenter
                        ? "bg-white/10 text-white/80 border border-white/10"
                        : "bg-text-dark/5 text-text-dark/70 border border-text-dark/10"
                  )}
                >
                  {tag.text}
                </span>
              ))}
            </div>
            <div className={cn("flex flex-wrap gap-2 text-[8.5px] lg:text-[9.5px] font-bold", isCenter ? "text-white/60" : "text-text-dark/60")}>
              {benefit.stats.map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <span key={i} className="inline-flex items-center gap-0.5">
                    <StatIcon className="w-3 h-3 text-gold-500" />
                    {stat.text}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface Props { section: Section; skipEntranceAnim?: boolean }

const AboutPage = memo(function AboutPage({ section, skipEntranceAnim }: Props) {
  const { highlightIndex, phase, navigate } = useNavigation();
  const isHighlighted = highlightIndex === section.index;
  const isOverview    = phase === "overview" || phase === "zooming-out" || phase === "zooming-in";

  const [isMobile, setIsMobile] = useState(false);
  const [cardSize, setCardSize] = useState(280);
  const [benefitsList, setBenefitsList] = useState(BENEFITS);

  const handleMove = (steps: number) => {
    const newList = [...benefitsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push(item);
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift(item);
      }
    }
    setBenefitsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setIsMobile(window.innerWidth < 1024);
      setCardSize(window.innerWidth < 1024 ? 220 : matches ? 305 : 270);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div
      onClick={() => { if (phase === "overview") navigate(section.index); }}
      className={cn(
        "w-screen min-h-screen lg:h-screen relative overflow-hidden flex flex-col lg:justify-center lg:items-center pt-20 pb-4 px-4 lg:px-8 lg:py-16 transition-colors duration-500 bg-bg-cream",
        isHighlighted ? "ring-4 ring-gold-400 shadow-2xl shadow-gold-500/20" : "ring-1 ring-gold-500/10",
        isOverview && phase === "overview" ? "cursor-pointer" : ""
      )}
    >
      {/* Top Border Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent z-30" />

      {/* Static split background — no blur filter for performance */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: isMobile 
            ? "var(--bg-cream)"
            : "linear-gradient(90deg, var(--navy-900) 38%, var(--bg-cream) 38%)"
        }}
      />

      {isHighlighted && (
        <div className="absolute inset-0 bg-gold-500/5 pointer-events-none z-20 rounded-2xl" />
      )}

      {/* Centered Large Card */}
      <div className="w-full flex flex-col lg:flex-row lg:h-full lg:max-w-5xl lg:max-h-[80vh] lg:min-h-[500px] lg:glass-outer lg:backdrop-blur-sm lg:border lg:border-gold-500/25 lg:rounded-[2.5rem] lg:shadow-2xl lg:shadow-navy-900/15 lg:overflow-hidden relative z-10">
        {/* Left column: Navy Sidebar */}
        <div className="w-full lg:w-[38%] bg-gradient-to-b from-navy-900 to-navy-800 p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-[#d4a017]/10 z-10 rounded-2xl lg:rounded-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.18)_0%,transparent_100%)] pointer-events-none z-0" />

          <motion.div
            initial={skipEntranceAnim ? false : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col justify-between h-full"
          >
            <div>
              <span className="font-serif italic font-normal text-gold-400 capitalize normal-case text-base md:text-lg mb-2 block tracking-wide">
                Who We Are
              </span>
              <h1 className="text-3xl! md:text-4xl! font-black text-white leading-tight! mb-3">
                Why Choose<br />
                <span className="bg-linear-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">SunNest Power?</span>
              </h1>
              <p className="text-sm! md:text-base! text-white/70 leading-relaxed! mb-4">
                At SunNest Power, we believe solar energy should be reliable, accessible, and built for
                long-term performance — from your first consultation to decades of clean energy production.
              </p>

              <div className="space-y-2.5 mb-4">
                {DIFFERENTIATORS.map((point) => (
                  <div key={point} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-green-400 mt-0.5 shrink-0" />
                    <span className="text-sm md:text-[15px] text-white/80">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <GlowButton
                onClick={(e) => { e.stopPropagation(); navigate(5); }}
                className="self-start px-7 py-3.5 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 rounded-xl text-sm md:text-base font-black hover:from-gold-600 hover:to-gold-500 transition-all border-none"
              >
                Discover Our Process →
              </GlowButton>
            </div>
          </motion.div>
        </div>

        {/* Right column: Card stack area */}
        <div className="flex-1 glass-inner backdrop-blur-md relative flex flex-col justify-center items-center p-8 md:p-10 z-0 rounded-2xl lg:rounded-none mt-4 lg:mt-0">
          <div className="absolute -bottom-36 -right-36 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.04)_0%,transparent_75%)] pointer-events-none z-0" />

          <div className="w-full max-w-md relative z-10 flex flex-col h-full justify-between py-2">
            {/* Header */}
            <div className="text-center mb-6 shrink-0">
              <span className="font-serif italic font-normal text-gold-500 capitalize normal-case text-base md:text-lg mb-1.5 block tracking-wide">
                Core Pillars
              </span>
              <h2 className="text-2xl! md:text-3xl! font-black text-text-dark tracking-tight mb-1">
                Our Core Benefits
              </h2>
              <p className="text-sm! md:text-[15px]! text-text-mid max-w-xs mx-auto">
                Click on the side cards or use the arrows below to explore how we deliver value on every project.
              </p>
            </div>

            {/* Stagger Stack Container */}
            <div className="relative w-full h-[260px] md:h-[345px] select-none shrink-0">
              {benefitsList.map((benefit, index) => {
                const centerIndex = Math.floor(benefitsList.length / 2);
                const position = index - centerIndex;
                return (
                  <BenefitCard
                    key={benefit.id}
                    position={position}
                    benefit={benefit}
                    handleMove={handleMove}
                    cardSize={cardSize}
                    isMobile={isMobile}
                  />
                );
              })}
            </div>

            {/* Stagger controls buttons */}
            <div className="absolute bottom-1 left-1/2 flex -translate-x-1/2 gap-3.5 z-20">
              <button
                onClick={(e) => { e.stopPropagation(); handleMove(-1); }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 border cursor-pointer",
                  "bg-white/80 border-gold-500/30 text-text-dark hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-400 hover:text-navy-900 hover:border-transparent",
                  "shadow-md shadow-black/3"
                )}
                aria-label="Previous core benefit"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleMove(1); }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-300 border cursor-pointer",
                  "bg-white/80 border-gold-500/30 text-text-dark hover:bg-gradient-to-r hover:from-gold-500 hover:to-gold-400 hover:text-navy-900 hover:border-transparent",
                  "shadow-md shadow-black/3"
                )}
                aria-label="Next core benefit"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

export default AboutPage;
