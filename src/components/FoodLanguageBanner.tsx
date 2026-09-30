"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Language, CONTENT } from "@/data/content";
import { FRAMER_EASE, FRAMER_TEXT_BLUR_IN, FRAMER_TAP } from "@/lib/animations";
import { MagneticButton } from "./MagneticButton";

interface FoodLanguageBannerProps {
  lang: Language;
  onViewFeatured: () => void;
}

export const FoodLanguageBanner: React.FC<FoodLanguageBannerProps> = ({
  lang,
  onViewFeatured,
}) => {
  const t = CONTENT[lang].foodLanguage;

  return (
    <section id="cardapio-banner" className="w-full bg-[#c3b8eb] text-[#11140f] py-16 sm:py-20 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Tilted Card Stack Visual */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-[240px] xs:w-[270px] sm:w-[320px] h-[300px] xs:h-[340px] sm:h-[380px]">
            {/* Background tilted card */}
            <motion.div
              initial={{ opacity: 0, rotate: -12, y: 20 }}
              whileInView={{ opacity: 1, rotate: -8, y: 12 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: FRAMER_EASE }}
              className="absolute inset-0 bg-[#0e120f] rounded-[26px] sm:rounded-[30px] shadow-xl border border-black/10"
            />

            {/* Mid tilted card */}
            <motion.div
              initial={{ opacity: 0, rotate: -8, y: 15 }}
              whileInView={{ opacity: 1, rotate: -4, y: 4 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: 0.05, ease: FRAMER_EASE }}
              className="absolute inset-0 bg-[#f4f2ec] rounded-[26px] sm:rounded-[30px] shadow-lg p-2.5 sm:p-3"
            >
              <div className="w-full h-full rounded-[20px] sm:rounded-[22px] bg-neutral-800" />
            </motion.div>

            {/* Front card with food photo */}
            <motion.div
              initial={{ opacity: 0, rotate: -2, y: 30 }}
              whileInView={{ opacity: 1, rotate: 4, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                rotate: 1,
                scale: 1.03,
                transition: { type: "spring", stiffness: 350, damping: 25 },
              }}
              whileTap={FRAMER_TAP}
              transition={{
                rotate: { type: "spring", stiffness: 350, damping: 25 },
                scale: { type: "spring", stiffness: 350, damping: 25 },
                opacity: { duration: 0.62, ease: FRAMER_EASE },
                y: { duration: 0.62, ease: FRAMER_EASE },
              }}
              className="absolute inset-0 bg-[#f8f7f3] rounded-[26px] sm:rounded-[30px] shadow-2xl p-2.5 sm:p-3 border border-white/60 cursor-pointer will-change-transform"
              onClick={onViewFeatured}
            >
              <div className="relative w-full h-full rounded-[20px] sm:rounded-[22px] overflow-hidden bg-neutral-900">
                <Image
                  src="/images/mediterranean-bowl.jpg"
                  alt="Food as a language"
                  fill
                  sizes="(max-width: 640px) 270px, (max-width: 768px) 320px, 360px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
          <motion.h2
            {...FRAMER_TEXT_BLUR_IN}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-[1.12] tracking-tight"
          >
            {t.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.58, delay: 0.08, ease: FRAMER_EASE }}
            className="text-base sm:text-lg text-[#11140f]/80 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0"
          >
            {t.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.58, delay: 0.14, ease: FRAMER_EASE }}
            className="pt-2 flex justify-center lg:justify-start"
          >
            <MagneticButton
              onClick={onViewFeatured}
              className="inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-[#11140f] hover:bg-black text-white font-bold text-xs sm:text-sm rounded-full transition-colors group shadow-lg"
            >
              <span>{t.cta}</span>
              <span className="w-8 h-8 rounded-full bg-[#BE132D] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </span>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
