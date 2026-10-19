"use client";

import React from "react";
import { Clock, Sliders, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import {
  FRAMER_EASE,
  FRAMER_TEXT_BLUR_IN,
  getPhilosophyCardEntrance,
} from "@/lib/animations";

interface PhilosophyCard {
  num: string;
  title: string;
  description: string;
  bg: string;
  text: string;
  icon: string;
}

interface PhilosophySectionProps {
  title: string;
  description: string;
  cta: string;
  cards: PhilosophyCard[];
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  title,
  description,
  cta,
  cards,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Clock":
        return <Clock className="w-6 h-6 stroke-[1.75]" />;
      case "Sliders":
        return <Sliders className="w-6 h-6 stroke-[1.75]" />;
      case "CheckCircle2":
      default:
        return <CheckCircle className="w-6 h-6 stroke-[1.75]" />;
    }
  };

  // Exact sticky offsets from Framer: Card 1 top-20/28, Card 2 top-24/36, Card 3 top-28/44
  const stickyTops = ["top-20 sm:top-24 md:top-28", "top-24 sm:top-32 md:top-36", "top-28 sm:top-40 md:top-44"];

  return (
    <section
      id="solucao"
      className="w-full bg-[#ebe8e1] text-[#11140f] py-12 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-20 relative"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16">
        {/* Left Sticky Column ("Narrativa Fixa") */}
        <div className="lg:col-span-5 relative">
          <div className="lg:sticky lg:top-28 xl:top-32 space-y-4 sm:space-y-6">
            {/* Framer signature blur-in heading */}
            <motion.h2
              {...FRAMER_TEXT_BLUR_IN}
              className="text-2xl sm:text-4xl md:text-5xl font-serif leading-[1.15] sm:leading-[1.12] tracking-tight"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.58, delay: 0.08, ease: FRAMER_EASE }}
              className="text-sm sm:text-base md:text-lg text-[#11140f]/75 leading-relaxed font-sans max-w-lg"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ duration: 0.58, delay: 0.14, ease: FRAMER_EASE }}
              className="pt-2"
            >
              <a
                href="#como-funciona"
                className="inline-flex items-center gap-2 text-xs md:text-sm font-bold tracking-[0.14em] uppercase hover:opacity-75 transition-opacity group"
              >
                <span>{cta}</span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Right Sticky Stacked Cards Column */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-8 md:space-y-12 pb-8 sm:pb-16">
          {cards.map((card, idx) => {
            const entrance = getPhilosophyCardEntrance(idx);
            return (
              <motion.div
                key={card.num}
                initial={entrance.initial}
                whileInView={entrance.whileInView}
                viewport={entrance.viewport}
                transition={entrance.transition}
                whileHover={{
                  scale: 1.01,
                  transition: { type: "spring", bounce: 0.22, duration: 0.45 },
                }}
                style={{ zIndex: idx + 1 }}
                className={`relative md:sticky ${stickyTops[idx % stickyTops.length]} p-5 sm:p-8 md:p-10 rounded-[20px] sm:rounded-[32px] md:rounded-[36px] ${card.bg} ${card.text} shadow-xl md:shadow-2xl border border-black/5 will-change-transform cursor-default`}
              >
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <div className="w-12 h-12 rounded-full border border-current/20 flex items-center justify-center">
                    {getIcon(card.icon)}
                  </div>
                  <span className="text-xs font-bold tracking-[0.16em] uppercase opacity-80 font-sans">
                    {card.num}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-medium leading-tight mb-4 tracking-tight">
                  {card.title}
                </h3>

                <p className="text-sm sm:text-base opacity-85 leading-relaxed font-sans">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
