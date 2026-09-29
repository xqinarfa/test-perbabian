"use client";

import React from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Language, CONTENT } from "@/data/content";
import { FRAMER_EASE, FRAMER_TEXT_BLUR_IN, FRAMER_TAP } from "@/lib/animations";

interface PathwaysSectionProps {
  lang: Language;
  onSelectDish: (dishId: string) => void;
}

export const PathwaysSection: React.FC<PathwaysSectionProps> = ({
  lang,
  onSelectDish,
}) => {
  const t = CONTENT[lang].pathways;

  // Stacking offset per card so each card sticks progressively lower, showing the rounded top of previous cards
  const stickyTops = [
    "top-16 sm:top-20 md:top-24 lg:top-28",
    "top-20 sm:top-24 md:top-32 lg:top-36",
    "top-24 sm:top-28 md:top-40 lg:top-44",
  ];

  return (
    <section id="experiencia" className="w-full bg-[#df6b51] text-[#11140f] py-16 sm:py-20 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 transition-colors">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: FRAMER_EASE }}
            className="lg:col-span-7 space-y-3 sm:space-y-4"
          >
            <motion.h2
              {...FRAMER_TEXT_BLUR_IN}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.12] tracking-tight"
            >
              {t.title}
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.58, delay: 0.08, ease: FRAMER_EASE }}
            className="lg:col-span-5"
          >
            <p className="text-sm sm:text-base text-[#11140f]/80 leading-relaxed font-sans">
              {t.subtitle}
            </p>
          </motion.div>
        </div>

        {/* 3 Large Pathway Cards - Sticky Stacking Deck */}
        <div className="relative space-y-8 sm:space-y-10 md:space-y-16 pb-16 sm:pb-24 md:pb-36">
          {t.cards.map((card, idx) => (
            <div
              key={card.num}
              style={{ zIndex: 10 + idx }}
              className={`sticky ${stickyTops[idx] || "top-28"} w-full`}
            >
              <motion.div
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{
                  scale: 1.008,
                  boxShadow: "0px 28px 60px 0px rgba(0, 0, 0, 0.24)",
                  transition: { type: "spring", bounce: 0.16, duration: 0.35 },
                }}
                transition={{ duration: 0.62, delay: idx * 0.08, ease: FRAMER_EASE }}
                className={`group rounded-[24px] sm:rounded-[28px] md:rounded-[36px] overflow-hidden ${card.bg} ${card.text} shadow-[0_16px_40px_rgba(0,0,0,0.18)] border border-black/10 grid grid-cols-1 lg:grid-cols-12 items-stretch will-change-transform cursor-pointer min-h-[380px] sm:min-h-[440px] lg:min-h-[480px]`}
                onClick={() => onSelectDish(card.dishId)}
              >
                {/* Left Content */}
                <div className="lg:col-span-6 p-6 sm:p-8 md:p-12 flex flex-col justify-between space-y-6 sm:space-y-8">
                  <div>
                    <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-70 block mb-3 sm:mb-4">
                      {card.num}
                    </span>
                    <h3 className="text-2xl sm:text-4xl md:text-5xl font-serif font-medium tracking-tight mb-3 sm:mb-4">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base opacity-85 leading-relaxed font-sans max-w-md">
                      {card.description}
                    </p>
                  </div>

                  <div className="space-y-3 sm:space-y-4 pt-4 border-t border-black/10">
                    <p className="text-xs font-bold tracking-[0.14em] uppercase opacity-75">
                      {card.subtitle}
                    </p>
                    <motion.button
                      whileTap={FRAMER_TAP}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectDish(card.dishId);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold tracking-[0.14em] uppercase hover:underline cursor-pointer group"
                    >
                      <span>{card.cta}</span>
                    </motion.button>
                  </div>
                </div>

                {/* Right Image with subtle Framer zoom */}
                <div className="lg:col-span-6 relative min-h-[200px] sm:min-h-[260px] lg:min-h-full bg-neutral-900 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: FRAMER_EASE }}
          className="text-center pt-4"
        >
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-black/60">
            {t.tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
