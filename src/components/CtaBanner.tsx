"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { Language, CONTENT } from "@/data/content";
import { MagneticButton } from "./MagneticButton";

interface CtaBannerProps {
  lang: Language;
  onExploreClick: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ lang, onExploreClick }) => {
  const t = CONTENT[lang].cta;

  return (
    <section id="cta" className="w-full bg-[#bef227] text-[#11140f] py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-12 lg:px-20 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 relative z-10">
        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] sm:leading-[1.08] tracking-tight">
          {t.title}
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-[#11140f]/80 leading-relaxed font-sans max-w-xl mx-auto">
          {t.subtitle}
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
          <MagneticButton
            onClick={onExploreClick}
            className="inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-[#11140f] hover:bg-black text-white font-bold text-xs sm:text-sm rounded-full transition-colors group shadow-xl"
          >
            <span>{t.button}</span>
            <span className="w-8 h-8 rounded-full bg-[#c8ff47] flex items-center justify-center text-black group-hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-0.5 transition-transform" />
            </span>
          </MagneticButton>

          <a
            href="#como-funciona"
            className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-[#11140f] hover:opacity-70 transition-opacity"
          >
            {t.secondary}
          </a>
        </div>
      </div>
    </section>
  );
};
