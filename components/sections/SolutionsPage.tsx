"use client";

import { memo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Building2, Landmark, CheckCircle2 } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";
import { Section } from "@/constants/sections";
import { cn } from "@/lib/utils";
import { GlowButton } from "@/components/ui/GlowButton";

const SOLUTIONS = [
  {
    icon: Home,
    title: "Residential Solar",
    tagline: "For homeowners",
    desc: "Transform your rooftop into a source of clean energy and long-term savings. Reduce electricity bills while increasing the value of your home.",
    points: [
      "70–90% bill reduction",
      "Rooftop & ground-mount options",
      "25-year performance warranty",
      "Zero-paperwork installation",
    ],
    gradient: "from-amber-500 to-orange-500",
    bg: "from-amber-50 to-orange-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
  },
  {
    icon: Building2,
    title: "Commercial Solar",
    tagline: "For businesses",
    desc: "Help your business lower operational expenses, improve profitability, and reduce dependence on rising electricity tariffs with scalable solar systems.",
    points: [
      "Reduce operational costs",
      "Improve profit margins",
      "Scale as you grow",
      "Fast ROI (3–5 years)",
    ],
    gradient: "from-sky-500 to-blue-600",
    bg: "from-sky-50 to-blue-50",
    border: "border-sky-200",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    icon: Landmark,
    title: "Institutional Solar",
    tagline: "For schools, hospitals & government",
    desc: "Reliable solar solutions for educational institutions, hospitals, government buildings, and non-profits looking to reduce energy costs and meet sustainability goals.",
    points: [
      "Schools & colleges",
      "Hospitals & clinics",
      "Government buildings",
      "DCR & subsidy support",
    ],
    gradient: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
    border: "border-violet-200",
    badge: "bg-violet-100 text-violet-700",
  },
];

interface Props {
  section: Section;
  skipEntranceAnim?: boolean;
}

const SolutionsPage = memo(function SolutionsPage({
  section,
  skipEntranceAnim,
}: Props) {
  const { highlightIndex, phase, navigate } = useNavigation();
  const isHighlighted = highlightIndex === section.index;
  const isOverview =
    phase === "overview" || phase === "zooming-out" || phase === "zooming-in";

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      onClick={() => {
        if (phase === "overview") navigate(section.index);
      }}
      className={cn(
        "w-screen min-h-screen lg:h-screen relative overflow-hidden flex flex-col lg:justify-center lg:items-center pt-20 pb-4 px-4 lg:px-8 lg:py-16 transition-colors duration-500 bg-bg-cream",
        isHighlighted
          ? "ring-4 ring-gold-400 shadow-2xl shadow-gold-500/20"
          : "ring-1 ring-gold-500/10",
        isOverview && phase === "overview" ? "cursor-pointer" : "",
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
            : "linear-gradient(to bottom, var(--navy-900) 32%, var(--bg-cream) 32%)",
        }}
      />

      {isHighlighted && (
        <div className="absolute inset-0 bg-gold-500/5 pointer-events-none z-20 rounded-2xl" />
      )}

      {/* Centered Large Card */}
      <div className="w-full flex flex-col lg:h-full lg:max-w-5xl lg:max-h-[80vh] lg:min-h-[500px] lg:glass-outer lg:backdrop-blur-sm lg:border lg:border-gold-500/25 lg:rounded-[2.5rem] lg:shadow-2xl lg:shadow-navy-900/15 lg:overflow-hidden relative z-10">
        {/* Top header row inside the card: Dark Navy */}
        <div className="h-auto lg:min-h-[230px] bg-gradient-to-r from-navy-900 to-navy-800 px-5 py-5 md:px-8 md:py-7 lg:px-10 relative overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-[#d4a017]/10 flex items-center z-10 rounded-2xl lg:rounded-none">
          {/* Subtle radial gold overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.18)_0%,transparent_100%)] pointer-events-none z-0" />

          <motion.div
            initial={skipEntranceAnim ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col w-full gap-4"
          >
            <div className="text-center lg:text-left">
              <span className="font-serif italic font-normal text-gold-400 capitalize normal-case text-sm md:text-base lg:text-lg mb-1.5 block tracking-wide">
                What We Offer
              </span>
              <h1 className="text-2xl! md:text-3xl! lg:text-4xl font-black text-white leading-tight! mb-2">
                Our{" "}
                <span className="bg-linear-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Solutions
                </span>
              </h1>
              <p className="text-sm! md:text-base! lg:text-[17px] text-white/70 max-w-none leading-relaxed!">
                We design and deliver customized solar installations engineered
                to maximize yield, lower operational costs, and secure long-term
                energy independence.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <GlowButton
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(2);
                }} // Go to Pricing
                className="px-6 py-3 lg:px-6 lg:py-1.5 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 rounded-xl text-sm md:text-sm font-black hover:from-gold-600 hover:to-gold-500 transition-all border-none whitespace-nowrap"
              >
                Explore Pricing Plans →
              </GlowButton>
            </div>
          </motion.div>
        </div>

        {/* Bottom content row inside the card: Cream/white solutions grid */}
        <div className="flex-1 glass-inner backdrop-blur-md relative flex flex-col justify-center p-5 md:p-8 z-0 rounded-2xl lg:rounded-none mt-4 lg:mt-0">
          <div className="absolute -bottom-36 -right-36 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(212,160,23,0.04)_0%,transparent_75%)] pointer-events-none z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full relative z-10">
            {SOLUTIONS.map((sol) => {
              const Icon = sol.icon;
              return (
                <div
                  key={sol.title}
                  className="glass-card-sm border border-gold-500/20 rounded-2xl p-4 md:p-5 flex flex-col shadow-lg shadow-navy-900/2 min-h-0 justify-between"
                >
                  <div>
                    {/* Icon + badge */}
                    <div className="flex items-start justify-between mb-2 md:mb-3.5">
                      <div
                        className={cn(
                          "w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center bg-linear-to-br text-white shadow-md shadow-gold-500/10 shrink-0",
                          sol.gradient,
                        )}
                      >
                        <Icon className="w-3.5 h-3.5 md:w-4.5 md:h-4.5 text-white" />
                      </div>
                      <span className="font-serif italic text-[9px] md:text-[11px] lg:text-[12px] capitalize tracking-wide px-2 py-0.5 md:px-2.5 bg-gold-500/12 text-gold-500 border border-gold-500/25 rounded-full shrink-0">
                        {sol.tagline}
                      </span>
                    </div>

                    <h2 className="text-xs md:text-sm lg:text-[15px] font-black text-text-dark mb-1 md:mb-1.5">
                      {sol.title}
                    </h2>
                    <p className="text-[9px] md:text-[10px] lg:text-[11px] text-text-mid leading-relaxed mb-2 md:mb-4">
                      {sol.desc}
                    </p>
                  </div>

                  <ul className="space-y-0.5 md:space-y-1 pt-2 md:pt-3 border-t border-slate-100 mt-auto">
                    {sol.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-1.5 text-[8.5px] md:text-[9.5px] text-text-mid font-medium"
                      >
                        <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-500 shrink-0" />
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
});

export default SolutionsPage;
