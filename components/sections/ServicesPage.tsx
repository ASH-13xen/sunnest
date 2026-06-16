"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ClipboardList, PencilRuler, FileText, Hammer, Activity, CheckCircle2,
  MessageSquare, Wrench, PiggyBank, ShieldCheck, Banknote, FileCheck, BatteryCharging, Sun
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
    question: "How does solar panel installation work?",
    answer:
      "Our certified team handles everything — from site assessment and permits to panel mounting and final grid connection. Most installations are fully completed in 1–2 days.",
    icon: <Wrench className="w-4 h-4" />,
    category: "Installation",
  },
  {
    id: 2,
    question: "How much can I save on my electricity bill?",
    answer:
      "Most SunNest homeowners and commercial installations see a 70–90% reduction in their monthly electricity costs from the very first billing cycle.",
    icon: <PiggyBank className="w-4 h-4" />,
    category: "Savings",
  },
  {
    id: 4,
    question: "How long do SunNest panels last?",
    answer:
      "Our solar panels are engineered to perform efficiently for 25–30 years and are backed by a comprehensive 25-year performance warranty.",
    icon: <ShieldCheck className="w-4 h-4" />,
    category: "Warranty",
  },
  {
    id: 5,
    question: "What financing options are available?",
    answer:
      "We offer flexible financing including $0-down solar loans, power purchase agreements (PPAs), and leasing options tailored to commercial assets.",
    icon: <Banknote className="w-4 h-4" />,
    category: "Financing",
  },
  {
    id: 6,
    question: "Do I need permits to install solar?",
    answer:
      "Our operations team handles building permits, municipal clearance, and utility net-metering interconnection on your behalf from start to finish.",
    icon: <FileCheck className="w-4 h-4" />,
    category: "Approvals",
  },
  {
    id: 8,
    question: "What happens during a power outage?",
    answer:
      "With a grid-tied system, the solar panels turn off for safety. However, adding a SunNest battery backup system keeps your building fully powered.",
    icon: <BatteryCharging className="w-4 h-4" />,
    category: "Battery",
  },
];


interface Props { section: Section }

export default function ServicesPage({ section }: Props) {
  const { highlightIndex, phase, navigate } = useNavigation();
  const isHighlighted = highlightIndex === section.index;
  const isOverview    = phase === "overview" || phase === "zooming-out" || phase === "zooming-in";

  // Tab State: "process" or "faq"
  const [activeTab, setActiveTab] = useState<"process" | "faq">("process");

  return (
    <div
      onClick={() => { if (phase === "overview") navigate(section.index); }}
      className={cn(
        "w-screen h-screen relative overflow-y-auto no-scrollbar rounded-2xl bg-bg-cream flex flex-col justify-between",
        isHighlighted ? "ring-4 ring-amber-400 shadow-2xl shadow-amber-200" : "ring-1 ring-amber-100/50",
        isOverview && phase === "overview" ? "cursor-pointer" : ""
      )}
    >
      {/* Main viewport region containing the card (100dvh min height) */}
      <div className="flex-1 w-full min-h-screen flex justify-center items-center px-4 md:px-8 py-16 relative shrink-0">
        
        {/* Top Border Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FFCA28] to-transparent z-30" />

        {/* Static split background — no blur filter for performance */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: "linear-gradient(90deg, #0A1628 38%, var(--bg-cream) 38%)" }}
        />

        {isHighlighted && (
          <div className="absolute inset-0 bg-amber-300/5 pointer-events-none z-20 rounded-2xl" />
        )}

        {/* Centered Large Card */}
        <div className="w-full max-w-5xl h-full max-h-[80vh] min-h-[500px] glass-outer backdrop-blur-sm border border-[rgba(212,160,23,0.25)] rounded-[2.5rem] shadow-2xl shadow-[#0A1628]/15 overflow-hidden relative z-10 flex flex-col md:flex-row">
          
          {/* Left column: Dark Navy sidebar */}
          <div className="w-full md:w-[38%] bg-gradient-to-b from-[#0A1628] to-[#0D1F3C] p-8 md:p-10 flex flex-col justify-center relative overflow-hidden shrink-0 border-r border-[#d4a017]/10 z-10">
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
          <div className="flex-1 glass-inner backdrop-blur-md relative flex flex-col justify-center p-8 md:p-10 z-0">
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

              {/* TAB 1: Process timeline */}
              {activeTab === "process" && (
                <div className="flex-1 flex flex-col justify-between min-h-0">
                  <div className="text-center mb-4 shrink-0">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A017] mb-1 block">
                      Execution
                    </span>
                    <h2 className="text-lg md:text-xl font-black text-text-dark tracking-tight">
                      Our Journey Together
                    </h2>
                  </div>

                  <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar pr-1">
                    <div className="space-y-3">
                      {STEPS.map((step, i) => {
                        const Icon = step.icon;
                        return (
                          <div key={step.num} className="flex gap-4 items-start">
                            <div className="flex flex-col items-center shrink-0">
                              <div className="w-8.5 h-8.5 rounded-xl bg-navy-900 flex items-center justify-center shadow-md shadow-black/5">
                                <Icon className="w-3.5 h-3.5 text-[#FFD700]" />
                              </div>
                              {i < STEPS.length - 1 && (
                                <div className="w-px h-3.5 bg-amber-300/40 mt-1" />
                              )}
                            </div>

                            <div className="flex-1 glass-card-sm border border-[rgba(212,160,23,0.2)] rounded-xl px-4 py-2.5 -mt-0.5 shadow-sm">
                              <span className="font-serif italic font-normal text-[#D4A017] text-[11.5px] tracking-wide block mb-0.5">
                                Step {step.num}
                              </span>
                              <h3 className="text-xs font-black text-text-dark mb-0.5">{step.title}</h3>
                              <p className="text-[10px] text-text-mid font-medium leading-relaxed">{step.desc}</p>
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

                  <div className="flex-1 min-h-0 overflow-y-auto pr-1 no-scrollbar">
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
}
