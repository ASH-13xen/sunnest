"use client";

import { motion } from "framer-motion";
import { Sun, Award, Tag, Layers, Phone, HelpCircle, LucideIcon } from "lucide-react";
import { SECTIONS } from "@/constants/sections";
import { useNavigation } from "@/context/NavigationContext";
import { cn } from "@/lib/utils";

interface TileMeta {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  blurb: string;
  area: string; // CSS grid-area shorthand: "rowStart / colStart / rowEnd / colEnd"
}

const TILE_META: Record<string, TileMeta> = {
  hero:      { icon: Sun,         eyebrow: "Welcome",        title: "SunNest Power",   blurb: "Premium solar energy, built to last.",       area: "1 / 1 / 3 / 3" },
  about:     { icon: Award,       eyebrow: "Who We Are",     title: "Why Choose Us",   blurb: "Tata-grade expertise, in-house engineers.",   area: "3 / 1 / 5 / 2" },
  pricing:   { icon: Tag,         eyebrow: "Plans",          title: "Simple Pricing",  blurb: "Transparent plans for every home.",          area: "3 / 2 / 4 / 3" },
  solutions: { icon: Layers,      eyebrow: "What We Offer",  title: "Our Solutions",   blurb: "Residential, commercial & institutional.",   area: "4 / 2 / 5 / 3" },
  contact:   { icon: Phone,       eyebrow: "Get In Touch",   title: "Book a Visit",    blurb: "Free inspection, fast response.",            area: "5 / 1 / 6 / 2" },
  services:  { icon: HelpCircle,  eyebrow: "Process & FAQ",  title: "How It Works",    blurb: "Step-by-step process, answered.",            area: "5 / 2 / 6 / 3" },
};

interface Props {
  onSelect: (index: number) => void;
}

export default function MobileBentoMosaic({ onSelect }: Props) {
  const { highlightIndex } = useNavigation();

  return (
    <div className="w-full h-full overflow-y-auto no-scrollbar pt-24 pb-10 px-4">
      <div className="text-center mb-5">
        <span className="font-serif italic font-normal text-gold-500 text-sm mb-1 block tracking-wide">
          Tap a tile to explore
        </span>
        <h1 className="text-2xl! font-black text-text-dark tracking-tight">
          Where would you like to go?
        </h1>
      </div>

      <div
        className="grid grid-cols-2 gap-3"
        style={{ gridAutoRows: "134px" }}
      >
        {SECTIONS.map((section) => {
          const meta = TILE_META[section.id];
          if (!meta) return null;
          const Icon = meta.icon;
          const isFeatured = section.id === "hero";
          const isHighlighted = highlightIndex === section.index;

          return (
            <motion.button
              key={section.id}
              layoutId={isHighlighted ? `bento-tile-${section.id}` : undefined}
              onClick={() => onSelect(section.index)}
              whileTap={{ scale: 0.96 }}
              style={{ gridArea: meta.area }}
              className={cn(
                "relative overflow-hidden rounded-2xl border bg-gradient-to-br from-navy-900 to-navy-800 text-left flex flex-col justify-between p-3.5 shadow-lg shadow-navy-900/15 cursor-pointer",
                isHighlighted ? "border-gold-400 ring-4 ring-gold-400/50 z-10" : "border-gold-500/25"
              )}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,160,23,0.22)_0%,transparent_70%)] pointer-events-none" />

              <div
                className={
                  isFeatured
                    ? "w-10 h-10 rounded-xl bg-gradient-to-br from-gold-500 to-gold-400 flex items-center justify-center shadow-md shadow-gold-500/20 relative z-10"
                    : "w-8 h-8 rounded-lg bg-gradient-to-br from-gold-500 to-gold-400 flex items-center justify-center shadow-md shadow-gold-500/20 relative z-10"
                }
              >
                <Icon className={isFeatured ? "w-5 h-5 text-navy-900" : "w-4 h-4 text-navy-900"} />
              </div>

              <div className="relative z-10">
                <span className="font-serif italic text-[10px] text-gold-400 tracking-wide block mb-0.5">
                  {meta.eyebrow}
                </span>
                <h2 className={isFeatured ? "text-lg! font-black text-white leading-tight" : "text-sm! font-black text-white leading-tight"}>
                  {meta.title}
                </h2>
                {isFeatured && (
                  <p className="text-xs! text-white/65 leading-snug mt-1 max-w-[220px]">
                    {meta.blurb}
                  </p>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
