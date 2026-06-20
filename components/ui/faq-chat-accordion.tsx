"use client";

import * as React from "react";
import { motion } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

interface FaqAccordionProps {
  data: FAQItem[];
  className?: string;
  timestamp?: string;
  questionClassName?: string;
  answerClassName?: string;
}

export function FaqAccordion({
  data,
  className,
  timestamp,
  questionClassName,
  answerClassName,
}: FaqAccordionProps) {
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  // Keep the top item selected by default whenever the dataset changes
  React.useEffect(() => {
    if (data.length > 0) {
      setOpenItem(data[0].id.toString());
    } else {
      setOpenItem(null);
    }
  }, [data]);

  return (
    <div className={cn("p-1", className)}>
      {timestamp && (
        <div className="mb-4 text-xs text-text-light font-semibold uppercase tracking-widest">{timestamp}</div>
      )}

      <Accordion.Root
        type="single"
        collapsible
        value={openItem || ""}
        onValueChange={(value) => setOpenItem(value)}
      >
        {data.map((item) => (
          <Accordion.Item
            value={item.id.toString()}
            key={item.id}
            className="mb-4"
          >
            <Accordion.Header>
              <Accordion.Trigger className="flex w-full items-center justify-between py-1 px-1 text-left cursor-pointer group">
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 transition-all duration-200 font-bold text-sm lg:text-base tracking-tight shadow-xs border",
                    openItem === item.id.toString()
                      ? "bg-navy-900 text-gold-400 border-transparent shadow-md shadow-navy-900/15"
                      : "glass-card-sm text-text-dark border-gold-500/20 hover:bg-gold-500/10 hover:text-navy-900",
                    questionClassName
                  )}
                >
                  {item.question}
                </div>

                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ml-4",
                    openItem === item.id.toString()
                      ? "bg-navy-900/10 text-navy-900 rotate-180"
                      : "text-text-light hover:text-navy-900"
                  )}
                >
                  {openItem === item.id.toString() ? (
                    <Minus className="h-4 w-4 stroke-[2.5]" />
                  ) : (
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                  )}
                </div>
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content asChild forceMount>
              <motion.div
                initial="collapsed"
                animate={
                  openItem === item.id.toString() ? "open" : "collapsed"
                }
                variants={{
                  open: { opacity: 1, height: "auto" },
                  collapsed: { opacity: 0, height: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="ml-4 mt-2 md:ml-8 pb-3">
                  <div
                    className={cn(
                      "relative max-w-lg rounded-2xl bg-gradient-to-br from-gold-500 to-gold-600 px-4.5 py-3 text-white text-xs lg:text-sm font-semibold shadow-md shadow-gold-500/10 leading-relaxed",
                      answerClassName
                    )}
                  >
                    {item.answer}
                  </div>
                </div>
              </motion.div>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
}
