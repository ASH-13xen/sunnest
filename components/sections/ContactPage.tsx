"use client";

import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Mail, Phone, MapPin, ArrowRight, Sun, Check, Calendar, MessageSquare } from "lucide-react";
import { useNavigation } from "@/context/NavigationContext";
import { Section } from "@/constants/sections";
import { cn } from "@/lib/utils";

const CONTACT_ITEMS = [
  { icon: Mail,    label: "Email",    value: "hello@sunnestpower.com",    href: "mailto:hello@sunnestpower.com" },
  { icon: Phone,   label: "Phone",    value: "1-800-SUNNEST (786-6378)", href: "tel:+18007866378" },
  { icon: MapPin,  label: "Service Area", value: "Pan India Operations", href: "#" },
];

const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

interface Props { section: Section }

const ContactPage = memo(function ContactPage({ section }: Props) {
  const { highlightIndex, phase, navigate, activeIndex } = useNavigation();
  const isHighlighted = highlightIndex === section.index;
  const isOverview    = phase === "overview" || phase === "zooming-out" || phase === "zooming-in";

  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Tab control: 'book' or 'message'
  const [activeTab, setActiveTab] = useState<"book" | "message">("book");

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ─── Booking Calendar States ───
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // ─── General Query Form States ───
  const [queryForm, setQueryForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [querySubmitted, setQuerySubmitted] = useState(false);

  useEffect(() => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  }, []);

  const monthName = MONTH_NAMES[currentMonth];
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const isPast = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    return date < todayMidnight;
  };

  const isWeekend = (day: number) => {
    const dayOfWeek = new Date(currentYear, currentMonth, day).getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  // Submit Booking Form
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      gsap.fromTo(".success-msg-booking",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }, 50);
  };

  // Submit Query Form
  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuerySubmitted(true);
    setTimeout(() => {
      gsap.fromTo(".success-msg-query",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }, 50);
  };

  return (
    <div
      ref={sectionRef}
      id="contact"
      onClick={() => { if (phase === "overview") navigate(section.index); }}
      className={cn(
        "w-screen min-h-screen lg:h-screen relative overflow-hidden flex flex-col lg:justify-center lg:items-center pt-20 pb-4 px-4 lg:px-8 lg:py-16 bg-bg-cream",
        isHighlighted ? "ring-4 ring-amber-400 shadow-2xl shadow-amber-200" : "ring-1 ring-amber-100/50",
        isOverview && phase === "overview" ? "cursor-pointer" : ""
      )}
    >
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
        
        {/* Left sidebar: Contact Info (Dark Navy) */}
        <div className="w-full lg:w-[38%] bg-gradient-to-b from-[#0A1628] to-[#0D1F3C] p-5 lg:p-10 flex flex-col justify-center relative overflow-hidden shrink-0 border-b lg:border-b-0 lg:border-r border-[#d4a017]/10 z-10 contact-card-sidebar rounded-2xl lg:rounded-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,160,23,0.18)_0%,transparent_100%)] pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#D4A017] to-[#FFCA28] flex items-center justify-center shadow-lg shadow-[#D4A017]/30">
                  <Sun className="w-3.5 h-3.5 text-[#0A1628]" />
                </div>
                <span className="text-xs font-black uppercase tracking-widest text-[#FFD700]">
                  SunNest Power
                </span>
              </div>

              <h1 className="text-2xl! md:text-4xl! font-black text-white leading-tight! mb-3">
                Get In<br />
                <span className="bg-linear-to-r from-[#D4A017] via-[#FFCA28] to-[#B38600] bg-clip-text text-transparent">Touch</span>
              </h1>
              <p className="text-sm! md:text-base! text-white/70 leading-relaxed! mb-5">
                Ready to go solar? We're here to help you start your clean energy journey with a free inspection or consultation.
              </p>

              <div className="space-y-3">
                {CONTACT_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-2.5 group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FFD700]/40 transition-colors shrink-0">
                        <Icon className="w-3.5 h-3.5 text-[#FFD700]" />
                      </div>
                      <div>
                        <div className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{item.label}</div>
                        <div className="text-sm md:text-base text-white/80 group-hover:text-white transition-colors">{item.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right content: Form & Tab switch (Cream/white) */}
        <div className="flex-1 glass-inner backdrop-blur-md relative flex flex-col justify-center p-5 md:p-8 lg:p-10 z-0 contact-card-content rounded-2xl lg:rounded-none mt-4 lg:mt-0">
          <div className="w-full max-w-md relative z-10 flex flex-col h-full justify-between py-2">
            
            {/* Tab Swapper Header */}
            <div className="flex tab-track bg-slate-100/60 p-1 rounded-2xl mb-3.5 max-w-sm mx-auto w-full select-none shrink-0 border border-slate-200/20">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setActiveTab("book"); }}
                className={cn(
                  "flex-1 py-2 rounded-xl text-sm md:text-[15px] font-black transition-all cursor-pointer border-none flex items-center justify-center gap-1.5",
                  activeTab === "book"
                    ? "bg-gradient-to-r from-[#D4A017] to-[#FFCA28] text-[#0A1628] shadow-md shadow-[#D4A017]/15"
                    : "text-text-mid hover:text-text-dark bg-transparent"
                )}
              >
                <Calendar className="w-3.5 h-3.5" /> Book Inspection
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setActiveTab("message"); }}
                className={cn(
                  "flex-1 py-2 rounded-xl text-sm md:text-[15px] font-black transition-all cursor-pointer border-none flex items-center justify-center gap-1.5",
                  activeTab === "message"
                    ? "bg-gradient-to-r from-[#D4A017] to-[#FFCA28] text-[#0A1628] shadow-md shadow-[#D4A017]/15"
                    : "text-text-mid hover:text-text-dark bg-transparent"
                )}
              >
                <MessageSquare className="w-3.5 h-3.5" /> Send Message
              </button>
            </div>

            {/* TAB 1: Booking Calendar Flow */}
            {activeTab === "book" && (
              <div className="flex-1 flex flex-col justify-between lg:min-h-0 lg:overflow-y-auto no-scrollbar">
                {bookingSubmitted ? (
                  <div className="success-msg-booking text-center py-8 flex-1 flex flex-col justify-center">
                    <div className="text-4xl mb-4">🎉</div>
                    <h3 className="text-xl! font-black text-text-dark mb-2">
                      Inspection Booked!
                    </h3>
                    <p className="text-sm! text-text-mid leading-relaxed! max-w-sm mx-auto">
                      We've received your request for <strong>{monthName} {selectedDay}</strong> at <strong>{selectedTime}</strong>.<br />
                      A confirmation has been sent to <strong>{bookingForm.email}</strong>.
                    </p>
                    <div className="mt-5 p-3.5 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 text-xs font-semibold max-w-xs mx-auto">
                      ✓ Our team will call you within 2 hours to confirm your details.
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col justify-between min-h-0">
                    {/* Step indicator */}
                    <div className="flex gap-2 mb-4 shrink-0">
                      {[1, 2, 3].map((s) => (
                        <div key={s} className="flex-1">
                          <div className={cn(
                            "h-1 rounded-full transition-all duration-300",
                            bookingStep >= s ? "bg-gradient-to-r from-[#D4A017] to-[#FFCA28]" : "bg-amber-100"
                          )} />
                          <div className={cn(
                            "text-[11px] font-bold mt-1",
                            bookingStep >= s ? "text-[#D4A017]" : "text-text-light"
                          )}>
                            {s === 1 ? "Pick Date" : s === 2 ? "Pick Time" : "Your Details"}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Step 1: Calendar Grid */}
                    {bookingStep === 1 && (
                      <div className="flex-1 flex flex-col justify-center min-h-0">
                        <div className="flex justify-between items-center mb-3.5 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
                              else setCurrentMonth(m => m - 1);
                              setSelectedDay(null);
                            }}
                            className="border border-[#D4A017]/35 rounded-lg px-2.5 py-1 text-xs font-bold text-[#D4A017] cursor-pointer hover:bg-gold-500/10 glass-card-sm"
                          >
                            ←
                          </button>
                          <span className="text-sm font-bold text-text-dark">
                            {monthName} {currentYear}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
                              else setCurrentMonth(m => m + 1);
                              setSelectedDay(null);
                            }}
                            className="border border-[#D4A017]/35 rounded-lg px-2.5 py-1 text-xs font-bold text-[#D4A017] cursor-pointer hover:bg-gold-500/10 glass-card-sm"
                          >
                            →
                          </button>
                        </div>

                        {/* Day headers */}
                        <div className="grid grid-cols-7 gap-1 mb-1.5 shrink-0">
                          {dayNames.map((d) => (
                            <div key={d} className="text-center text-[11px] font-bold text-text-light">
                              {d}
                            </div>
                          ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1 mb-4 flex-1 lg:overflow-y-auto no-scrollbar">
                          {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} />
                          ))}
                          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                            const past = isPast(day);
                            const weekend = isWeekend(day);
                            const disabled = past || weekend;
                            const selected = selectedDay === day;
                            return (
                              <button
                                key={day}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (!disabled) setSelectedDay(day);
                                }}
                                disabled={disabled}
                                className={cn(
                                  "py-1 md:py-1.5 text-xs md:text-sm font-bold rounded-lg transition-all duration-200 border-none",
                                  selected
                                    ? "bg-gradient-to-br from-[#D4A017] to-[#FFCA28] text-white shadow-md shadow-[#D4A017]/30"
                                    : disabled
                                      ? "text-slate-200 cursor-not-allowed bg-transparent"
                                      : "text-text-dark hover:bg-gold-500/10 cursor-pointer"
                                )}
                              >
                                {day}
                              </button>
                            );
                          })}
                        </div>

                        <button
                          onClick={(e) => { e.stopPropagation(); if (selectedDay) setBookingStep(2); }}
                          disabled={!selectedDay}
                          className={cn(
                            "w-full flex items-center justify-center py-1.5 md:py-2 rounded-xl text-sm md:text-base font-bold text-white transition-all shadow-md shrink-0 border-none",
                            selectedDay
                              ? "bg-gradient-to-r from-[#D4A017] to-[#FFCA28] hover:from-[#B38600] hover:to-[#D4A017] cursor-pointer shadow-[#D4A017]/25"
                              : "bg-slate-300 cursor-not-allowed shadow-none"
                          )}
                        >
                          Continue →
                        </button>
                      </div>
                    )}

                    {/* Step 2: Time Slots */}
                    {bookingStep === 2 && (
                      <div className="flex-1 flex flex-col justify-center shrink-0">
                        <div className="flex items-center gap-2 mb-2 md:mb-3.5">
                          <button onClick={(e) => { e.stopPropagation(); setBookingStep(1); }} className="text-[#D4A017] font-black text-sm cursor-pointer bg-transparent border-none p-0">←</button>
                          <div>
                            <h3 className="text-sm font-bold text-text-dark">Select a Time</h3>
                            <p className="text-[11px] md:text-xs text-text-light">{monthName} {selectedDay}, {currentYear}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-1.5 md:gap-2 mb-3.5 md:mb-5">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={(e) => { e.stopPropagation(); setSelectedTime(time); }}
                              className={cn(
                                "py-1.5 px-0.5 md:py-2 text-xs md:text-sm font-bold rounded-xl border text-center transition-all duration-200 cursor-pointer",
                                selectedTime === time
                                  ? "bg-gradient-to-r from-[#D4A017] to-[#FFCA28] text-[#0A1628] border-transparent shadow-md shadow-[#D4A017]/25 font-black"
                                  : "border-[#D4A017]/20 text-text-mid hover:bg-gold-500/10 glass-card-sm"
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>

                        <button
                          onClick={(e) => { e.stopPropagation(); if (selectedTime) setBookingStep(3); }}
                          disabled={!selectedTime}
                          className={cn(
                            "w-full flex items-center justify-center py-1.5 md:py-2 rounded-xl text-sm md:text-base font-bold text-white transition-all shadow-md border-none",
                            selectedTime
                              ? "bg-gradient-to-r from-[#D4A017] to-[#FFCA28] hover:from-[#B38600] hover:to-[#D4A017] cursor-pointer shadow-[#D4A017]/25"
                              : "bg-slate-300 cursor-not-allowed shadow-none"
                          )}
                        >
                          Continue →
                        </button>
                      </div>
                    )}

                    {/* Step 3: Details form */}
                    {bookingStep === 3 && (
                      <form onSubmit={handleBookingSubmit} onClick={(e) => e.stopPropagation()} className="flex-1 flex flex-col justify-center space-y-2">
                        <div className="flex items-center gap-2 mb-1 shrink-0">
                          <button type="button" onClick={() => setBookingStep(2)} className="text-[#D4A017] font-black text-sm cursor-pointer bg-transparent border-none p-0">←</button>
                          <div>
                            <h3 className="text-sm font-bold text-text-dark">Your Details</h3>
                            <p className="text-[11px] md:text-xs text-text-light">{monthName} {selectedDay} at {selectedTime}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 md:gap-2.5">
                          <div>
                            <label className="block text-[11px] md:text-xs font-bold text-text-mid mb-1">Full Name *</label>
                            <input
                              type="text"
                              required
                              value={bookingForm.name}
                              onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                              className="w-full px-2.5 py-1 md:py-1.5 border border-[#D4A017]/20 rounded-lg text-sm md:text-base text-text-dark bg-white focus:outline-none focus:border-[#D4A017]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] md:text-xs font-bold text-text-mid mb-1">Email *</label>
                            <input
                              type="email"
                              required
                              value={bookingForm.email}
                              onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                              className="w-full px-2.5 py-1 md:py-1.5 border border-[#D4A017]/20 rounded-lg text-sm md:text-base text-text-dark bg-white focus:outline-none focus:border-[#D4A017]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 md:gap-2.5">
                          <div>
                            <label className="block text-[11px] md:text-xs font-bold text-text-mid mb-1">Phone *</label>
                            <input
                              type="tel"
                              required
                              value={bookingForm.phone}
                              onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                              className="w-full px-2.5 py-1 md:py-1.5 border border-[#D4A017]/20 rounded-lg text-sm md:text-base text-text-dark bg-white focus:outline-none focus:border-[#D4A017]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] md:text-xs font-bold text-text-mid mb-1">Address *</label>
                            <input
                              type="text"
                              required
                              value={bookingForm.address}
                              onChange={(e) => setBookingForm({ ...bookingForm, address: e.target.value })}
                              className="w-full px-2.5 py-1 md:py-1.5 border border-[#D4A017]/20 rounded-lg text-sm md:text-base text-text-dark bg-white focus:outline-none focus:border-[#D4A017]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] md:text-xs font-bold text-text-mid mb-1">Additional Notes</label>
                          <textarea
                            value={bookingForm.notes}
                            onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                            rows={1.5}
                            className="w-full px-2.5 py-1 md:py-1.5 border border-[#D4A017]/20 rounded-lg text-sm md:text-base text-text-dark bg-white focus:outline-none focus:border-[#D4A017] resize-none"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2 md:py-2.5 bg-gradient-to-r from-[#D4A017] to-[#FFCA28] hover:from-[#B38600] hover:to-[#D4A017] text-white rounded-xl text-sm md:text-base font-black transition-all shadow-md shadow-[#D4A017]/25 cursor-pointer flex items-center justify-center gap-1 border-none"
                        >
                          Confirm Free Inspection <Check className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: General Query Message Flow */}
            {activeTab === "message" && (
              <div className="flex-1 flex flex-col justify-between lg:min-h-0 lg:overflow-y-auto no-scrollbar">
                {querySubmitted ? (
                  <div className="success-msg-query text-center py-8 flex-1 flex flex-col justify-center">
                    <div className="text-4xl mb-4">✉️</div>
                    <h3 className="text-xl! font-black text-text-dark mb-2">Message Sent!</h3>
                    <p className="text-sm! text-text-mid leading-relaxed! max-w-sm mx-auto">
                      Thank you for contacting SunNest Power. We have received your query for <strong>{queryForm.email}</strong>.<br />
                      Our solar team will get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleQuerySubmit} onClick={(e) => e.stopPropagation()} className="flex-1 flex flex-col justify-center space-y-2.5">
                    <div className="grid grid-cols-2 gap-2 md:gap-2.5">
                      <div>
                        <label className="block text-[11px] md:text-xs font-bold text-text-mid mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={queryForm.name}
                          onChange={(e) => setQueryForm({ ...queryForm, name: e.target.value })}
                          placeholder="John Smith"
                          className="w-full px-2.5 py-1.5 border border-[#D4A017]/20 rounded-lg text-sm md:text-base text-text-dark bg-white focus:outline-none focus:border-[#D4A017]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] md:text-xs font-bold text-text-mid mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={queryForm.email}
                          onChange={(e) => setQueryForm({ ...queryForm, email: e.target.value })}
                          placeholder="john@company.com"
                          className="w-full px-2.5 py-1.5 border border-[#D4A017]/20 rounded-lg text-sm md:text-base text-text-dark bg-white focus:outline-none focus:border-[#D4A017]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] md:text-xs font-bold text-text-mid mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={queryForm.phone}
                        onChange={(e) => setQueryForm({ ...queryForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-2.5 py-1.5 border border-[#D4A017]/20 rounded-lg text-sm md:text-base text-text-dark bg-white focus:outline-none focus:border-[#D4A017]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] md:text-xs font-bold text-text-mid mb-1">Tell us about your project *</label>
                      <textarea
                        required
                        value={queryForm.message}
                        onChange={(e) => setQueryForm({ ...queryForm, message: e.target.value })}
                        placeholder="Approximate energy consumption, load details, or solar questions..."
                        rows={2}
                        className="w-full px-2.5 py-1.5 border border-[#D4A017]/20 rounded-lg text-sm md:text-base text-text-dark bg-white focus:outline-none focus:border-[#D4A017] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-gradient-to-r from-[#D4A017] to-[#FFCA28] hover:from-[#B38600] hover:to-[#D4A017] text-white rounded-xl text-sm md:text-base font-black transition-all shadow-md shadow-[#D4A017]/25 cursor-pointer flex items-center justify-center gap-1 border-none"
                    >
                      Send Message <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
});

export default ContactPage;
