"use client";

import React from "react";
import { Language, CONTENT } from "@/data/content";

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = CONTENT[lang].footer;

  return (
    <footer className="w-full bg-[#0b0e0c] text-white pt-12 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-8 md:px-12 lg:px-20 rounded-t-[28px] sm:rounded-t-[36px] md:rounded-t-[48px] -mt-8 relative z-10 border-t border-white/10 shadow-2xl">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Brand Info */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-base sm:text-lg font-bold tracking-[0.16em] uppercase">
              {t.brand}
            </h3>
            <p className="text-sm text-white/60 leading-relaxed font-sans max-w-sm">
              {t.description}
            </p>
          </div>

          {/* Navigation links */}
          <div className="md:col-span-5 space-y-4 md:text-right">
            <h4 className="text-xs font-bold tracking-[0.2em] text-[#bef227] uppercase">
              {t.navTitle}
            </h4>
            <ul className="space-y-2.5 text-sm text-white/80">
              {t.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 w-full" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold tracking-[0.16em] uppercase text-white/50">
          <span>{t.copyright}</span>
          <span>{t.slogan}</span>
        </div>
      </div>
    </footer>
  );
};
