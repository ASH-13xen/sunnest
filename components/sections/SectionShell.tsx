"use client";

import { useNavigation } from "@/context/NavigationContext";
import { Section } from "@/constants/sections";

interface Props {
  section: Section;
  children?: React.ReactNode;
}

const COLORS = [
  "from-amber-50 to-orange-50",
  "from-sky-50 to-blue-50",
  "from-amber-50 to-yellow-50",
  "from-orange-50 to-amber-50",
  "from-blue-50 to-indigo-50",
  "from-yellow-50 to-amber-50",
];

const ACCENT = [
  "text-amber-600",
  "text-sky-600",
  "text-orange-600",
  "text-amber-700",
  "text-blue-600",
  "text-yellow-600",
];

export default function SectionShell({ section, children }: Props) {
  const { highlightIndex, phase, navigate, activeIndex } = useNavigation();
  const isHighlighted = highlightIndex === section.index;
  const isOverview = phase === "overview" || phase === "zooming-out" || phase === "zooming-in";

  return (
    <div
      onClick={() => {
        if (phase === "overview") navigate(section.index);
      }}
      className={[
        "w-screen h-screen flex flex-col items-center justify-center relative rounded-2xl overflow-hidden",
        "bg-linear-to-br transition-shadow duration-300",
        COLORS[section.index],
        isHighlighted
          ? "ring-4 ring-amber-400 shadow-2xl shadow-amber-200"
          : "ring-1 ring-amber-100",
        isOverview && phase === "overview" && section.index !== activeIndex
          ? "cursor-pointer hover:ring-2 hover:ring-amber-300"
          : "",
      ].join(" ")}
    >
      {/* Section number badge */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-white/60 flex items-center justify-center text-xs font-bold text-gray-400">
          {section.index + 1}
        </span>
      </div>

      {/* Highlight glow overlay */}
      {isHighlighted && (
        <div className="absolute inset-0 bg-amber-300/10 pointer-events-none" />
      )}

      <h1 className={`text-5xl font-bold tracking-tight ${ACCENT[section.index]}`}>
        {section.label}
      </h1>
      <p className="mt-3 text-gray-400 text-sm font-medium uppercase tracking-widest">
        Page {section.index + 1}
      </p>

      {children}
    </div>
  );
}
