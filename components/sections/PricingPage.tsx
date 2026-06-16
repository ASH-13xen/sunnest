"use client";

import { useRef, useState, memo } from "react";
import { useNavigation } from "@/context/NavigationContext";
import { Section } from "@/constants/sections";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Starter Home",
    tagline: "Perfect for apartments & small homes",
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
    excluded: ["Battery storage", "Priority support"],
  },
  {
    name: "Home Pro",
    tagline: "Most popular for average households",
    priceMonthly: 149,
    priceYearly: 129,
    systemSize: "8–12 kW",
    popular: true,
    color: "#D4A017",
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
    excluded: [],
  },
  {
    name: "Power Estate",
    tagline: "Complete independence for large homes",
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
    excluded: [],
  },
];

interface Props {
  section: Section;
}

const PricingPage = memo(function PricingPage({ section }: Props) {
  const { highlightIndex, phase, navigate } = useNavigation();
  const isHighlighted = highlightIndex === section.index;
  const isOverview = phase === "overview" || phase === "zooming-out" || phase === "zooming-in";

  const sectionRef = useRef<HTMLDivElement>(null);
  const [yearly, setYearly] = useState(false);

  return (
    <div
      id="pricing"
      ref={sectionRef}
      onClick={() => { if (phase === "overview") navigate(section.index); }}
      className={cn(
        "w-screen h-screen relative overflow-hidden rounded-2xl flex justify-center items-center bg-bg-cream px-4 md:px-8 py-16",
        isHighlighted ? "ring-4 ring-amber-400 shadow-2xl shadow-amber-200/50" : "ring-1 ring-amber-100",
        isOverview && phase === "overview" ? "cursor-pointer" : ""
      )}
    >
      {/* Centered Large Card with Blue Border */}
      <div className="w-full max-w-5xl h-full max-h-[80vh] min-h-[500px] glass-outer backdrop-blur-sm border border-[rgba(74,144,217,0.25)] rounded-[2.5rem] shadow-2xl shadow-[#0A1628]/10 overflow-hidden relative z-10 flex flex-col p-8 md:p-10 justify-center">
        
        {/* Header */}
        <div className="pricing-header text-center mb-5 shrink-0">
          <span className="font-serif italic font-normal text-amber-500 capitalize normal-case text-[14px] md:text-[15px] mb-1.5 block tracking-wide">
            Transparent Pricing
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-text-dark tracking-tight mb-1">
            Simple, <span className="bg-linear-to-r from-[#D4A017] via-[#FFCA28] to-[#B38600] bg-clip-text text-transparent">Honest Pricing</span>
          </h2>
          <p className="text-[11px] text-text-mid max-w-lg mx-auto mb-3">
            No hidden fees, no surprises. Choose the plan that fits your home and start saving immediately.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={cn("text-[11px] font-bold transition-colors", !yearly ? "text-text-dark" : "text-text-light")}>
              Monthly
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); setYearly(!yearly); }}
              className={cn(
                "w-11 h-5 rounded-full relative transition-all duration-300 cursor-pointer p-0.5 border-none",
                yearly ? "bg-gradient-to-r from-[#D4A017] to-[#FFCA28]" : "bg-gold-500/10"
              )}
            >
              <div
                className={cn(
                  "w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 absolute top-0.5",
                  yearly ? "left-6" : "left-0.5"
                )}
              />
            </button>
            <span className={cn("text-[11px] font-bold transition-colors flex items-center gap-1.5", yearly ? "text-text-dark" : "text-text-light")}>
              Annual
              <span className="bg-gradient-to-r from-[#D4A017] to-[#FFCA28] text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                Save 15%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing cards grid */}
        <div className="pricing-grid grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start flex-1 min-h-0 overflow-y-auto no-scrollbar py-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "pricing-card rounded-2xl p-5 relative overflow-hidden transition-all duration-300 flex flex-col h-full border",
                plan.popular
                  ? "bg-gradient-to-b from-[#0A1628] to-[#0D1F3C] border-[#D4A017] md:scale-[1.02] shadow-xl shadow-[#D4A017]/10"
                  : "glass-card-sm border-[#D4A017]/15 hover:border-[#D4A017]/40 shadow-lg shadow-black/2"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#D4A017] to-[#FFCA28] text-white text-[8px] font-black py-0.5 px-2 rounded-full tracking-wider uppercase">
                  Most Popular
                </div>
              )}

              {/* Glow overlay for popular card */}
              {plan.popular && (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.18)_0%,transparent_100%)] pointer-events-none z-0" />
              )}

              <div className="relative z-10 flex-1 flex flex-col h-full justify-between">
                <div>
                  {/* System size badge */}
                  <div
                    style={{ color: plan.color, borderColor: `${plan.color}35`, backgroundColor: `${plan.color}12` }}
                    className="inline-flex items-center gap-1 border rounded-full px-2 py-0.5 text-[9px] font-black self-start mb-3"
                  >
                    ⚡ {plan.systemSize}
                  </div>

                  <h3 className={cn("text-sm font-black mb-0.5", plan.popular ? "text-white" : "text-text-dark")}>
                    {plan.name}
                  </h3>
                  <p className={cn("font-serif italic text-[11px] mb-4 leading-normal", plan.popular ? "text-white/70" : "text-text-mid")}>
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-4 shrink-0">
                    <div className="flex items-baseline gap-1">
                      <span className={cn("font-serif font-light text-[2.1rem] tracking-tight leading-none", plan.popular ? "text-[#FFD700]" : "text-[#D4A017]")}>
                        ${yearly ? plan.priceYearly : plan.priceMonthly}
                      </span>
                      <span className={cn("text-[10px] font-semibold font-sans ml-0.5", plan.popular ? "text-white/50" : "text-slate-400")}>
                        /mo
                      </span>
                    </div>
                    {yearly && (
                      <div className="text-green-500 text-[9px] font-bold mt-0.5">
                        Save ${(plan.priceMonthly - plan.priceYearly) * 12}/year
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  {/* Button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(4); }} // Navigate to Contact/Book (4)
                    className={cn(
                      "w-full text-center py-2 rounded-xl text-[10px] font-bold transition-colors cursor-pointer mb-4 tracking-wide uppercase",
                      plan.popular
                        ? "bg-gradient-to-r from-[#D4A017] to-[#FFCA28] hover:from-[#B38600] hover:to-[#D4A017] text-white shadow-md shadow-[#D4A017]/25 border-none"
                        : "bg-[#0f2744] hover:bg-[#153457] text-white border-none"
                    )}
                  >
                    Get Started
                  </button>

                  {/* Features list */}
                  <div className="space-y-2 text-[10px]">
                    {plan.features.map((f, j) => (
                      <div key={j} className="flex items-start gap-2 pb-1.5 border-b border-dashed border-[#D4A017]/10">
                        <Check className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                        <span className={plan.popular ? "text-white/80" : "text-text-mid"}>
                          {f}
                        </span>
                      </div>
                    ))}
                    {plan.excluded.map((f, j) => (
                      <div key={j} className="flex items-start gap-2 opacity-55">
                        <X className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-slate-400 line-through">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p className="text-center mt-4 text-[9px] text-text-light shrink-0">
          * Prices shown are estimated monthly financing. One-time purchase options available.
          Federal 30% tax credit not reflected.{" "}
          <button
            onClick={(e) => { e.stopPropagation(); navigate(4); }} // Navigate to Contact (4)
            className="text-[#D4A017] font-bold underline cursor-pointer bg-transparent border-none p-0 inline text-[9px]"
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
