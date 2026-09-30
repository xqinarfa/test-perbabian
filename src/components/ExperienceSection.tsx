"use client";

import React from "react";
import { Target, SlidersHorizontal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Language, CONTENT } from "@/data/content";
import {
  FRAMER_EASE,
  FRAMER_TEXT_BLUR_IN,
  FRAMER_HOVER_DARK_CARD,
} from "@/lib/animations";

interface ExperienceSectionProps {
  lang: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ lang }) => {
  const t = CONTENT[lang].experience;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Target":
        return <Target className="w-6 h-6 text-[#BE132D]" />;
      case "Sliders":
        return <SlidersHorizontal className="w-6 h-6 text-[#BE132D]" />;
      case "Sparkles":
      default:
        return (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="text-[#BE132D]"
          >
            <path
              d="m12 3-1.4 4.1a3 3 0 0 1-1.9 1.9L4.5 10.5l4.2 1.4a3 3 0 0 1 1.9 1.9L12 18l1.4-4.2a3 3 0 0 1 1.9-1.9l4.2-1.4L15.3 9a3 3 0 0 1-1.9-1.9L12 3Z"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
    }
  };

  return (
    <section className="w-full bg-[#0b0e0c] text-white py-16 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-white/10">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        <motion.h2
          {...FRAMER_TEXT_BLUR_IN}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-center tracking-tight"
        >
          {t.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {t.cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              whileHover={FRAMER_HOVER_DARK_CARD}
              transition={{
                duration: 0.58,
                delay: idx * 0.08,
                ease: FRAMER_EASE,
              }}
              className="p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[28px] bg-[#131814] border border-white/10 flex flex-col justify-between min-h-[240px] sm:min-h-[260px] group shadow-lg will-change-transform cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/[0.06] flex items-center justify-center mb-10 group-hover:scale-105 transition-transform duration-300">
                {getIcon(card.icon)}
              </div>

              <div className="space-y-3">
                <h3 className="text-xl sm:text-2xl font-sans font-bold tracking-tight text-white/95">
                  {card.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed font-sans">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: FRAMER_EASE }}
          className="text-center pt-8 border-t border-white/10"
        >
          <p className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-white/40">
            {t.disclaimer}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
