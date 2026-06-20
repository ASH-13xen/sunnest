"use client";

import React, { useState, useEffect, memo } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList, PencilRuler, FileText, Hammer, Activity, CheckCircle2,
  MessageSquare, Wrench, PiggyBank, Banknote, Sun
} from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";
import { Section } from "@/constants/sections";
import { cn } from "@/lib/utils";
import { FaqAccordion } from "@/components/ui/faq-chat-accordion";
import { Footer } from "@/components/layout/Footer";

// ─── Process Steps Data ──────────────────────────────────────────────────────
const STEPS = [
  { num: "01", icon: ClipboardList, title: "Site Assessment & Energy Analysis",   desc: "We visit your site, study your energy consumption, and analyse rooftop feasibility." },
  { num: "02", icon: PencilRuler,   title: "Customized System Design",             desc: "Our engineers design a solar system tailored to your specific load and space." },
  { num: "03", icon: FileText,      title: "Documentation & Approval Support",      desc: "We handle DCR certifications, net metering applications, and all statutory approvals." },
  { num: "04", icon: Hammer,        title: "Installation & Commissioning",          desc: "Our in-house team installs, wires, and commissions your solar plant within the agreed timeline." },
  { num: "05", icon: Activity,      title: "Monitoring & After-Sales Service",      desc: "We provide performance monitoring and responsive support throughout the plant's lifetime." },
];

// ─── FAQ Data ────────────────────────────────────────────────────────────────
interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1,
    question: "Is a solar subsidy available?",
    answer:
      "Subsidies are available for eligible residential installations as per government guidelines.",
    icon: <Banknote className="w-4 h-4" />,
    category: "Subsidy",
  },
  {
    id: 2,
    question: "What is the typical ROI period?",
    answer:
      "Most solar projects recover their investment within 3–5 years, depending on usage and system size.",
    icon: <PiggyBank className="w-4 h-4" />,
    category: "ROI",
  },
  {
    id: 3,
    question: "What is net metering?",
    answer:
      "Net metering allows you to export excess solar power to the grid and receive credits on your electricity bill.",
    icon: <Activity className="w-4 h-4" />,
    category: "Net Metering",
  },
  {
    id: 4,
    question: "Does a solar system require regular maintenance?",
    answer:
      "Solar systems require minimal maintenance, with periodic cleaning and routine inspections recommended.",
    icon: <Wrench className="w-4 h-4" />,
    category: "Maintenance",
  },
];


interface Props { section: Section }

const ServicesPage = memo(function ServicesPage({ section }: Props) {
  const { highlightIndex, phase, navigate } = useNavigation();
  const isHighlighted = highlightIndex === section.index;
  const isOverview    = phase === "overview" || phase === "zooming-out" || phase === "zooming-in";

  // Tab State: "process" or "faq"
  const [activeTab, setActiveTab] = useState<"process" | "faq">("process");

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      onClick={() => { if (phase === "overview") navigate(section.index); }}
      className={cn(
        "w-screen min-h-screen lg:h-screen overflow-y-auto no-scrollbar bg-bg-cream flex flex-col",
        isHighlighted ? "ring-4 ring-amber-400 shadow-2xl shadow-amber-200" : "ring-1 ring-amber-100/50",
        isOverview && phase === "overview" ? "cursor-pointer" : ""
      )}
    >
      {/* Main region containing the card — sized to its content (not a forced 100vh)
          so the footer below follows immediately with no dead gap. */}
      <div className="w-full flex flex-col lg:justify-center lg:items-center pt-20 pb-8 px-4 lg:py-16 lg:pb-12 relative shrink-0">
        
        {/* Top Border Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FFCA28] to-transparent z-30" />

        {/* Static split background — no blur filter for performance */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: isMobile
              ? "var(--bg-cream)"
              : "linear-gradient(90deg, #0A1628 38%, var(--bg-cream) 38%)"
          }}
        />

        {isHighlighted && (
          <div className="absolute inset-0 bg-amber-300/5 pointer-events-none z-20 rounded-2xl" />
        )}

        {/* Centered Large Card */}
        <div className="w-full flex flex-col lg:flex-row lg:h-full lg:max-w-5xl lg:max-h-[80vh] lg:min-h-[500px] lg:glass-outer lg:backdrop-blur-sm lg:border lg:border-[rgba(212,160,23,0.25)] lg:rounded-[2.5rem] lg:shadow-2xl lg:shadow-[#0A1628]/15 lg:overflow-hidden relative z-10">
          
          {/* Left column: Dark Navy sidebar */}
          <div className="w-full lg:w-[38%] bg-gradient-to-b from-[#0A1628] to-[#0D1F3C] p-8 lg:p-10 flex flex-col justify-center relative overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-[#d4a017]/10 z-10 rounded-2xl lg:rounded-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.18)_0%,transparent_100%)] pointer-events-none z-0" />

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="relative z-10 flex flex-col justify-between h-full"
            >
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4A017] to-[#FFCA28] flex items-center justify-center shadow-lg shadow-[#D4A017]/30">
                    <Sun className="w-3.5 h-3.5 text-[#0A1628]" />
                  </div>
                  <span className="font-serif italic font-normal text-amber-400 capitalize normal-case text-[14px] md:text-[15px] tracking-wide">
                    {activeTab === "process" ? "How It Works" : "FAQ Support"}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                  {activeTab === "process" ? (
                    <>
                      Our<br />
                      <span className="bg-linear-to-r from-[#D4A017] via-[#FFCA28] to-[#B38600] bg-clip-text text-transparent">Process</span>
                    </>
                  ) : (
                    <>
                      Common<br />
                      <span className="bg-linear-to-r from-[#D4A017] via-[#FFCA28] to-[#B38600] bg-clip-text text-transparent">Questions</span>
                    </>
                  )}
                </h1>

                <p className="text-[11px] text-white/70 leading-relaxed mb-4">
                  {activeTab === "process" 
                    ? "At SunNest Power, we don't just install solar systems — we build long-term energy partnerships. Our focus is on quality, transparency, technical excellence, and lifetime support."
                    : "Have query details, technical specs, or financing doubts? We have compiled responses to common solar project queries below."}
                </p>

                <div className="space-y-1 mb-4">
                  {(activeTab === "process"
                    ? ["Clean Energy.", "Reliable Performance.", "Lasting Savings."]
                    : ["24/7 Consultation.", "Instant Approvals.", "Transparent Info."]
                  ).map((line) => (
                    <p key={line} className="text-[11px] font-bold text-[#FFD700]">{line}</p>
                  ))}
                </div>
              </div>

              <div>
                <div className="p-3.5 bg-[rgba(212,160,23,0.12)] border border-[rgba(212,160,23,0.2)] rounded-xl mb-4">
                  <div className="text-[10px] font-black text-[#FFD700] mb-0.5 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FFD700] animate-pulse" />
                    {activeTab === "process" ? "Full Compliance" : "Expert Engineers"}
                  </div>
                  <div className="text-[9px] text-white/60 leading-normal">
                    {activeTab === "process" 
                      ? "Complimentary statutory net-metering applications and utility approvals support."
                      : "Have custom load requirements? Our engineering consultants are available 24/7."}
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); navigate(4); }}
                  className="self-start px-4.5 py-2 bg-gradient-to-r from-[#D4A017] to-[#FFCA28] text-[#0A1628] rounded-xl text-[10.5px] font-black hover:from-[#B38600] hover:to-[#D4A017] transition-all shadow-lg shadow-[#D4A017]/20 cursor-pointer border-none"
                >
                  {activeTab === "process" ? "Get Free Consultation →" : "Get In Touch →"}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right column: Process steps timeline or FAQ list */}
          <div className="flex-1 glass-inner backdrop-blur-md relative flex flex-col justify-center p-6 md:p-8 lg:p-10 z-0 rounded-2xl lg:rounded-none mt-4 lg:mt-0">
            <div className="w-full max-w-md relative z-10 flex flex-col h-full justify-between py-2">
              
              {/* Tab Swapper */}
              <div className="flex tab-track bg-slate-100/60 p-1 rounded-2xl mb-5 max-w-xs mx-auto w-full select-none shrink-0 border border-slate-200/20">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setActiveTab("process"); }}
                  className={cn(
                    "flex-1 py-1.5 rounded-xl text-[10.5px] font-black transition-all cursor-pointer border-none flex items-center justify-center gap-1.5",
                    activeTab === "process"
                      ? "bg-gradient-to-r from-[#D4A017] to-[#FFCA28] text-[#0A1628] shadow-md shadow-[#D4A017]/15"
                      : "text-slate-500 hover:text-slate-700 bg-transparent"
                  )}
                >
                  <ClipboardList className="w-3.5 h-3.5" /> Our Process
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setActiveTab("faq"); }}
                  className={cn(
                    "flex-1 py-1.5 rounded-xl text-[10.5px] font-black transition-all cursor-pointer border-none flex items-center justify-center gap-1.5",
                    activeTab === "faq"
                      ? "bg-gradient-to-r from-[#D4A017] to-[#FFCA28] text-[#0A1628] shadow-md shadow-[#D4A017]/15"
                      : "text-slate-500 hover:text-slate-700 bg-transparent"
                  )}
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Common Questions
                </button>
              </div>

              {/* TAB 1: Process Steps Timeline */}
              {activeTab === "process" && (
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="text-center mb-3 shrink-0">
                    <span className="font-serif italic font-normal text-amber-500 capitalize normal-case text-[13px] md:text-[15px] mb-0.5 block tracking-wide">
                      Step-by-step
                    </span>
                    <h2 className="text-lg md:text-xl font-black text-text-dark tracking-tight">
                      Our Journey Together
                    </h2>
                  </div>

                  <div className="flex-1 lg:min-h-0 lg:overflow-y-auto no-scrollbar pr-1">
                    <div className="space-y-2">
                      {STEPS.map((step, i) => {
                        const Icon = step.icon;
                        return (
                          <div key={step.num} className="flex gap-2.5 items-start">
                            <div className="flex flex-col items-center shrink-0">
                              <div className="w-7 h-7 rounded-lg bg-navy-900 flex items-center justify-center shadow-md shadow-black/5">
                                <Icon className="w-3 h-3 text-[#FFD700]" />
                              </div>
                              {i < STEPS.length - 1 && (
                                <div className="w-px h-2 bg-amber-300/40 mt-0.5" />
                              )}
                            </div>

                            <div className="flex-1 glass-card-sm border border-[rgba(212,160,23,0.2)] rounded-xl px-3.5 py-2 -mt-0.5 shadow-sm">
                              <span className="font-serif italic font-normal text-[#D4A017] text-[10.5px] lg:text-[12px] tracking-wide block mb-0.5">
                                Step {step.num}
                              </span>
                              <h3 className="text-[11px] lg:text-[13px] font-black text-text-dark mb-0.5">{step.title}</h3>
                              <p className="text-[9px] lg:text-[10.5px] text-text-mid font-medium leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FAQ Accordion */}
              {activeTab === "faq" && (
                <div className="flex-1 flex flex-col justify-between min-h-0">
                  <div className="text-center mb-4 shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A017] mb-1 block">
                      Support FAQs
                    </span>
                    <h2 className="text-lg md:text-xl font-black text-text-dark tracking-tight">
                      Frequently Asked Questions
                    </h2>
                  </div>

                  <div className="flex-1 lg:min-h-0 lg:overflow-y-auto pr-1 no-scrollbar">
                    <FaqAccordion
                      data={FAQ_DATA}
                      className="w-full"
                      timestamp=""
                    />
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Structured dynamic footer stacked below */}
      <Footer />
    </div>
  );
});

export default ServicesPage;
