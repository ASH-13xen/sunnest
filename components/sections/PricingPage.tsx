"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "@/context/NavigationContext";
import { Section } from "@/constants/sections";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

const PREVIEW_COUNT = 4;

const plans = [
  {
    name: "Starter Home",
    tagline: "Apartments & small homes",
    priceMonthly: 89,
    priceYearly: 79,
    systemSize: "4–6 kW",
    popular: false,
    color: "#4A90D9",
    features: [
      "Up to 6 premium solar panels",
      "Standard microinverter system",
      "SunNest monitoring app",
      "25-year panel warranty",
      "10-year workmanship warranty",
      "Grid-tie setup",
      "Annual performance review",
      "Net metering registration",
    ],
  },
  {
    name: "Home Pro",
    tagline: "Most popular for households",
    priceMonthly: 149,
    priceYearly: 129,
    systemSize: "8–12 kW",
    popular: true,
    color: "#4A90D9",
    features: [
      "Up to 20 premium solar panels",
      "Premium microinverter system",
      "SunNest monitoring app (Pro)",
      "25-year panel warranty",
      "25-year workmanship warranty",
      "10 kWh battery storage",
      "Priority 24/7 support",
      "Net metering registration",
      "Annual performance reviews",
      "AI energy optimization",
    ],
  },
  {
    name: "Power Estate",
    tagline: "Complete independence, large homes",
    priceMonthly: 229,
    priceYearly: 199,
    systemSize: "15–25 kW",
    popular: false,
    color: "#6366F1",
    features: [
      "Unlimited premium solar panels",
      "Commercial-grade microinverters",
      "SunNest monitoring app (Elite)",
      "25-year full system warranty",
      "30 kWh battery storage",
      "EV charger integration",
      "Dedicated account manager",
      "Quarterly system reviews",
      "Same-day service guarantee",
      "AI predictive maintenance",
    ],
  },
];

interface Props {
  section: Section;
}

const PricingPage = memo(function PricingPage({ section }: Props) {
  const { highlightIndex, phase, navigate } = useNavigation();
  const isHighlighted = highlightIndex === section.index;
  const isOverview =
    phase === "overview" || phase === "zooming-out" || phase === "zooming-in";

  const [yearly, setYearly] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (name: string) =>
    setExpanded((prev) => ({ ...prev, [name]: !prev[name] }));

  return (
    <div
      id="pricing"
      onClick={() => {
        if (phase === "overview") navigate(section.index);
      }}
      className={cn(
        "w-screen min-h-screen lg:h-screen relative overflow-hidden flex flex-col lg:justify-center lg:items-center pt-20 pb-8 px-4 lg:px-8 lg:py-14 bg-bg-cream",
        isHighlighted
          ? "ring-4 ring-gold-400 shadow-2xl shadow-gold-400/30"
          : "ring-1 ring-gold-500/15",
        isOverview && phase === "overview" ? "cursor-pointer" : "",
      )}
    >
      {/* Centered Large Card */}
      <div className="w-full flex flex-col lg:h-full lg:max-w-5xl lg:max-h-[80vh] lg:min-h-[500px] lg:glass-outer lg:backdrop-blur-sm lg:border lg:border-gold-500/25 lg:rounded-[2.5rem] lg:shadow-2xl lg:shadow-navy-900/10 lg:overflow-hidden relative z-10 p-4 lg:p-9 justify-center">
        {/* Header */}
        <div className="pricing-header text-center mb-3 md:mb-5 shrink-0">
          <span className="font-serif italic font-normal text-gold-500 capitalize normal-case text-[13px] md:text-[15px] mb-1 block tracking-wide">
            Transparent Pricing
          </span>
          <h2 className="text-xl md:text-3xl font-black text-text-dark tracking-tight mb-1">
            Simple,{" "}
            <span className="bg-linear-to-r from-gold-500 via-gold-400 to-gold-600 bg-clip-text text-transparent">
              Honest Pricing
            </span>
          </h2>
          <p className="text-[10px] md:text-[11px] text-text-mid max-w-lg mx-auto mb-2">
            No hidden fees, no surprises. Choose the plan that fits your home
            and start saving immediately.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-2">
            <span
              className={cn(
                "text-[10px] md:text-[11px] font-bold transition-colors",
                !yearly ? "text-text-dark" : "text-text-light",
              )}
            >
              Monthly
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setYearly(!yearly);
              }}
              className={cn(
                "w-9 h-4.5 rounded-full relative transition-all duration-300 cursor-pointer p-0.5 border-none",
                yearly
                  ? "bg-gradient-to-r from-gold-500 to-gold-400"
                  : "bg-gold-500/10",
              )}
            >
              <div
                className={cn(
                  "w-3.5 h-3.5 rounded-full bg-white shadow-md transition-all duration-300 absolute top-0.5",
                  yearly ? "left-5" : "left-0.5",
                )}
              />
            </button>
            <span
              className={cn(
                "text-[10px] md:text-[11px] font-bold transition-colors flex items-center gap-1.5",
                yearly ? "text-text-dark" : "text-text-light",
              )}
            >
              Annual
              <span className="bg-gradient-to-r from-gold-500 to-gold-400 text-white text-[7.5px] md:text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                Save 15%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing cards — compact, all three always visible, no cutoff */}
        <div className="pricing-grid grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 items-start w-full">
          {plans.map((plan) => {
            const isOpen = !!expanded[plan.name];
            const previewFeatures = plan.features.slice(0, PREVIEW_COUNT);
            const restFeatures = plan.features.slice(PREVIEW_COUNT);

            return (
              <div
                key={plan.name}
                className={cn(
                  "pricing-card rounded-2xl p-3.5 md:p-4 relative overflow-hidden transition-all duration-300 border",
                  plan.popular
                    ? "bg-gradient-to-b from-navy-900 to-navy-800 border-gold-500 lg:scale-[1.02] shadow-xl shadow-gold-500/10"
                    : "glass-card-sm border-gold-500/15 hover:border-gold-500/40 shadow-lg shadow-black/2",
                )}
              >
                {/* Glow overlay for popular card */}
                {plan.popular && (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.18)_0%,transparent_100%)] pointer-events-none z-0" />
                )}

                <div className="relative z-10">
                  {/* Top row: system size + popular badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div
                      style={{
                        color: plan.color,
                        borderColor: `${plan.color}35`,
                        backgroundColor: `${plan.color}12`,
                      }}
                      className="inline-flex items-center gap-1 border rounded-full px-2 py-0.5 text-[8px] md:text-[9px] font-black"
                    >
                      ⚡ {plan.systemSize}
                    </div>
                    {plan.popular && (
                      <div className="bg-gradient-to-r from-gold-500 to-gold-400 text-white text-[7.5px] md:text-[8px] font-black py-0.5 px-1.5 rounded-full tracking-wider uppercase">
                        Most Popular
                      </div>
                    )}
                  </div>

                  {/* Name + price on one row */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="min-w-0">
                      <h3
                        className={cn(
                          "text-xs md:text-sm font-black mb-0.5 truncate",
                          plan.popular ? "text-white" : "text-text-dark",
                        )}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={cn(
                          "font-serif italic text-[9px] md:text-[10px] leading-snug",
                          plan.popular ? "text-white/70" : "text-text-mid",
                        )}
                      >
                        {plan.tagline}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-baseline justify-end gap-0.5">
                        <span
                          className={cn(
                            "font-serif font-light text-xl md:text-2xl tracking-tight leading-none",
                            plan.popular ? "text-gold-400" : "text-gold-500",
                          )}
                        >
                          ${yearly ? plan.priceYearly : plan.priceMonthly}
                        </span>
                        <span
                          className={cn(
                            "text-[8px] md:text-[9px] font-semibold font-sans",
                            plan.popular ? "text-white/50" : "text-slate-400",
                          )}
                        >
                          /mo
                        </span>
                      </div>
                      {yearly && (
                        <div className="text-green-500 text-[7.5px] md:text-[8.5px] font-bold">
                          Save ${(plan.priceMonthly - plan.priceYearly) * 12}/yr
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(4);
                    }} // Navigate to Contact/Book (4)
                    className={cn(
                      "w-full text-center py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold transition-colors cursor-pointer mb-2.5 tracking-wide uppercase",
                      plan.popular
                        ? "bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-600 hover:to-gold-500 text-white shadow-md shadow-gold-500/25 border-none"
                        : "bg-[#0f2744] hover:bg-[#153457] text-white border-none",
                    )}
                  >
                    Get Started
                  </button>

                  {/* Preview features — always visible, keeps every card compact */}
                  <div className="space-y-1 text-[9px] md:text-[10px]">
                    {previewFeatures.map((f, j) => (
                      <div key={j} className="flex items-start gap-1.5">
                        <Check className="w-2.5 h-2.5 text-green-500 shrink-0 mt-0.5" />
                        <span
                          className={
                            plan.popular ? "text-white/80" : "text-text-mid"
                          }
                        >
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Expand toggle for remaining features */}
                  {restFeatures.length > 0 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(plan.name);
                        }}
                        className={cn(
                          "w-full flex items-center justify-center gap-1 mt-2 pt-2 border-t border-dashed text-[8.5px] md:text-[9px] font-bold cursor-pointer bg-transparent border-x-0 border-b-0",
                          plan.popular
                            ? "border-white/15 text-white/60 hover:text-white"
                            : "border-gold-500/15 text-text-light hover:text-gold-500",
                        )}
                      >
                        {isOpen
                          ? "Show less"
                          : `+${restFeatures.length} more features`}
                        <ChevronDown
                          className={cn(
                            "w-3 h-3 transition-transform duration-300",
                            isOpen && "rotate-180",
                          )}
                        />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-1 text-[9px] md:text-[10px] pt-2">
                              {restFeatures.map((f, j) => (
                                <div
                                  key={j}
                                  className="flex items-start gap-1.5"
                                >
                                  <Check className="w-2.5 h-2.5 text-green-500 shrink-0 mt-0.5" />
                                  <span
                                    className={
                                      plan.popular
                                        ? "text-white/80"
                                        : "text-text-mid"
                                    }
                                  >
                                    {f}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p className="text-center mt-3 md:mt-4 text-[9px] text-text-light shrink-0">
          * Prices shown are estimated monthly financing. One-time purchase
          options available. Federal 30% tax credit not reflected.{" "}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(4);
            }} // Navigate to Contact (4)
            className="text-gold-500 font-bold underline cursor-pointer bg-transparent border-none p-0 inline text-[9px]"
          >
            Contact us
          </button>{" "}
          for a precise quote.
        </p>
      </div>
    </div>
  );
});

export default PricingPage;
