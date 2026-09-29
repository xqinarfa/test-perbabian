"use client";

import React, { useState } from "react";
import { Sparkles, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Language, CONTENT } from "@/data/content";
import { FRAMER_EASE, FRAMER_TEXT_BLUR_IN } from "@/lib/animations";

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const t = CONTENT[lang].faq;

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full bg-[#ebe8e1] text-[#11140f] py-16 sm:py-20 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-black/5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Sticky Column */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-28 xl:top-32 space-y-4 sm:space-y-6">
            <motion.h2
              {...FRAMER_TEXT_BLUR_IN}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.12] tracking-tight"
            >
              {t.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.58, delay: 0.08, ease: FRAMER_EASE }}
              className="text-base sm:text-lg text-[#11140f]/75 leading-relaxed font-sans max-w-md"
            >
              {t.subtitle}
            </motion.p>
          </div>
        </div>

        {/* Right Accordion List */}
        <div className="lg:col-span-7 divide-y divide-[#11140f]/15">
          {t.items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: FRAMER_EASE }}
                className="py-6 first:pt-0 last:pb-0"
              >
                <button
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-lg"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg sm:text-xl font-medium tracking-tight group-hover:opacity-75 transition-opacity">
                    {item.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: FRAMER_EASE }}
                    className={`w-8 h-8 rounded-full border border-black/15 flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-black text-white"
                        : "group-hover:border-black/35 text-black"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease: FRAMER_EASE }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm sm:text-base text-[#11140f]/80 leading-relaxed font-sans pr-6">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
