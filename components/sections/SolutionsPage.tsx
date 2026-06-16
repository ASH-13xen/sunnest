"use client";

import { motion } from "framer-motion";
import { Home, Building2, Landmark, CheckCircle2 } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";
import { Section } from "@/constants/sections";
import { cn } from "@/lib/utils";
import { GlowButton } from "@/components/ui/GlowButton";

const SOLUTIONS = [
  {
    icon:  Home,
    title: "Residential Solar",
    tagline: "For homeowners",
    desc:  "Transform your rooftop into a source of clean energy and long-term savings. Reduce electricity bills while increasing the value of your home.",
    points: ["70–90% bill reduction", "Rooftop & ground-mount options", "25-year performance warranty", "Zero-paperwork installation"],
    gradient: "from-amber-500 to-orange-500",
    bg:       "from-amber-50 to-orange-50",
    border:   "border-amber-200",
    badge:    "bg-amber-100 text-amber-700",
  },
  {
    icon:  Building2,
    title: "Commercial Solar",
    tagline: "For businesses",
    desc:  "Help your business lower operational expenses, improve profitability, and reduce dependence on rising electricity tariffs with scalable solar systems.",
    points: ["Reduce operational costs", "Improve profit margins", "Scale as you grow", "Fast ROI (3–5 years)"],
    gradient: "from-sky-500 to-blue-600",
    bg:       "from-sky-50 to-blue-50",
    border:   "border-sky-200",
    badge:    "bg-sky-100 text-sky-700",
  },
  {
    icon:  Landmark,
    title: "Institutional Solar",
    tagline: "For schools, hospitals & government",
    desc:  "Reliable solar solutions for educational institutions, hospitals, government buildings, and non-profits looking to reduce energy costs and meet sustainability goals.",
    points: ["Schools & colleges", "Hospitals & clinics", "Government buildings", "DCR & subsidy support"],
    gradient: "from-violet-500 to-purple-600",
    bg:       "from-violet-50 to-purple-50",
    border:   "border-violet-200",
    badge:    "bg-violet-100 text-violet-700",
  },
];


interface Props { section: Section }

export default function SolutionsPage({ section }: Props) {
  const { highlightIndex, phase, navigate } = useNavigation();
  const isHighlighted = highlightIndex === section.index;
  const isOverview    = phase === "overview" || phase === "zooming-out" || phase === "zooming-in";

  return (
    <div
      onClick={() => { if (phase === "overview") navigate(section.index); }}
      className={cn(
        "w-screen h-screen relative overflow-hidden rounded-2xl flex justify-center items-center px-4 md:px-8 py-16 transition-colors duration-500 bg-bg-cream",
        isHighlighted ? "ring-4 ring-gold-400 shadow-2xl shadow-gold-500/20" : "ring-1 ring-gold-500/10",
        isOverview && phase === "overview" ? "cursor-pointer" : ""
      )}
    >
      {/* Top Border Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-gold-400 to-transparent z-30" />

      {/* Static split background — no blur filter for performance */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, var(--navy-900) 32%, var(--bg-cream) 32%)" }}
      />

      {isHighlighted && (
        <div className="absolute inset-0 bg-gold-500/5 pointer-events-none z-20 rounded-2xl" />
      )}

      {/* Centered Large Card */}
      <div className="w-full max-w-5xl h-full max-h-[80vh] min-h-[500px] glass-outer backdrop-blur-sm border border-gold-500/25 rounded-[2.5rem] shadow-2xl shadow-navy-900/15 overflow-hidden relative z-10 flex flex-col">
        
        {/* Top header row inside the card: Dark Navy */}
        <div className="h-[32%] min-h-[160px] bg-gradient-to-r from-navy-900 to-navy-800 px-8 py-6 relative overflow-hidden shrink-0 border-b border-[#d4a017]/10 flex flex-col md:flex-row justify-between items-center z-10">
          {/* Subtle radial gold overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.18)_0%,transparent_100%)] pointer-events-none z-0" />

          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col md:flex-row justify-between items-center w-full gap-4"
          >
            <div className="text-center md:text-left">
              <span className="font-serif italic font-normal text-amber-400 capitalize normal-case text-[14px] md:text-[15px] mb-1.5 block tracking-wide">
                What We Offer
              </span>
              <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                Our <span className="bg-linear-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">Solutions</span>
              </h1>
              <p className="text-[11px] text-white/70 max-w-xl leading-relaxed">
                We design and deliver customized solar installations engineered to maximize yield, lower operational costs, and secure long-term energy independence.
              </p>
            </div>

            <div className="flex items-center gap-6 shrink-0">
              {/* Alert Box */}
              <div className="hidden lg:block p-3.5 bg-gold-500/12 border border-gold-500/20 rounded-xl max-w-[240px] text-left">
                <div className="text-[10px] font-black text-gold-400 mb-0.5 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
                  Financing Support
                </div>
                <div className="text-[9px] text-white/60 leading-normal">
                  Flexible $0-down solar financing and PPA options designed to meet your cashflow needs.
                </div>
              </div>

              <GlowButton
                onClick={(e) => { e.stopPropagation(); navigate(2); }} // Go to Pricing
                className="px-4 py-2.5 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 rounded-xl text-[11px] font-black hover:from-gold-600 hover:to-gold-500 transition-all border-none whitespace-nowrap"
              >
                Explore Pricing Plans →
              </GlowButton>
            </div>
          </motion.div>
        </div>

        {/* Bottom content row inside the card: Cream/white solutions grid */}
        <div className="flex-1 glass-inner backdrop-blur-md relative flex flex-col justify-center p-6 md:p-8 z-0">
          <div className="absolute -bottom-36 -right-36 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.04)_0%,transparent_75%)] pointer-events-none z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full relative z-10">
            {SOLUTIONS.map((sol) => {
              const Icon = sol.icon;
              return (
                <div
                  key={sol.title}
                  className="glass-card-sm border border-gold-500/20 rounded-2xl p-5 flex flex-col shadow-lg shadow-navy-900/2 min-h-0 justify-between"
                >
                  <div>
                    {/* Icon + badge */}
                    <div className="flex items-start justify-between mb-3.5">
                      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-linear-to-br text-white shadow-md shadow-gold-500/10 shrink-0", sol.gradient)}>
                        <Icon className="w-4.5 h-4.5 text-white" />
                      </div>
                      <span className="font-serif italic text-[11px] capitalize tracking-wide px-2.5 py-0.5 bg-amber-100/60 text-gold-500 rounded-full shrink-0">
                        {sol.tagline}
                      </span>
                    </div>

                    <h2 className="text-sm font-black text-text-dark mb-1.5">{sol.title}</h2>
                    <p className="text-[10px] text-text-mid leading-relaxed mb-4">{sol.desc}</p>
                  </div>

                  <ul className="space-y-1 pt-3 border-t border-slate-100 mt-auto">
                    {sol.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-[9.5px] text-text-mid font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
