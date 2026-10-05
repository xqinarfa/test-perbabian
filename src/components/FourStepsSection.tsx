"use client";

import React from "react";
import { motion } from "framer-motion";
import { Language, CONTENT } from "@/data/content";
import {
  FRAMER_EASE,
  FRAMER_TEXT_BLUR_IN,
  FRAMER_TAP,
} from "@/lib/animations";

interface FourStepsSectionProps {
  lang: Language;
}

export const FourStepsSection: React.FC<FourStepsSectionProps> = ({ lang }) => {
  const t = CONTENT[lang].steps;

  return (
    <section id="como-funciona" className="w-full bg-[#ebe8e1] text-[#11140f] py-16 sm:py-20 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-black/5">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
          <motion.h2
            {...FRAMER_TEXT_BLUR_IN}
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.15] tracking-tight"
          >
            {t.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.58, delay: 0.08, ease: FRAMER_EASE }}
            className="text-sm sm:text-base text-[#11140f]/75 leading-relaxed font-sans"
          >
            {t.subtitle}
          </motion.p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
          {t.items.map((item, idx) => (
            <motion.div
              key={item.num}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={{
                y: -6,
                boxShadow: "0px 18px 42px 0px rgba(0, 0, 0, 0.15)",
                transition: { type: "spring", bounce: 0.16, duration: 0.35 },
              }}
              whileTap={FRAMER_TAP}
              transition={{
                duration: 0.58,
                delay: idx * 0.08,
                ease: FRAMER_EASE,
              }}
              className={`p-6 sm:p-7 md:p-8 rounded-[24px] sm:rounded-[28px] ${item.bg} ${item.text} shadow-lg border border-black/5 flex flex-col justify-between min-h-[250px] sm:min-h-[280px] md:min-h-[300px] will-change-transform cursor-default`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.16em] uppercase opacity-75 font-sans">
                  {item.num}
                </span>
                <span className="text-[11px] font-bold tracking-[0.16em] opacity-40 font-mono">
                  STEP {item.num}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-serif font-medium leading-snug tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
