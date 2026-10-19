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
    <section id="cta" className="w-full bg-[#BE132D] text-white py-12 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-20 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 relative z-10">
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-[1.14] sm:leading-[1.08] tracking-tight">
          {t.title}
        </h2>

        <p className="text-xs sm:text-base md:text-lg text-white/85 leading-relaxed font-sans max-w-xl mx-auto">
          {t.subtitle}
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
          <MagneticButton
            onClick={onExploreClick}
            className="inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-white hover:bg-white/90 text-[#BE132D] font-bold text-xs sm:text-sm rounded-full transition-colors group shadow-xl"
          >
            <span>{t.button}</span>
            <span className="w-8 h-8 rounded-full bg-[#BE132D] flex items-center justify-center text-white group-hover:scale-105 transition-transform">
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </span>
          </MagneticButton>

          <a
            href="#como-funciona"
            className="text-xs sm:text-sm font-bold tracking-[0.14em] uppercase text-white hover:opacity-80 transition-opacity"
          >
            {t.secondary}
          </a>
        </div>
      </div>
    </section>
  );
};
