"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X, Clock, MapPin, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { Restaurant, Language } from "@/data/content";

interface DishModalProps {
  dish: Restaurant | null;
  lang: Language;
  onClose: () => void;
}

export const DishModal: React.FC<DishModalProps> = ({ dish, lang, onClose }) => {
  const hookLenis = useLenis();

  useEffect(() => {
    if (!dish) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Retrieve Lenis instance via hook or global fallback
    const lenis =
      hookLenis ||
      (typeof window !== "undefined"
        ? (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis
        : undefined);

    // Stop Lenis virtual scrolling
    lenis?.stop();

    // Prevent layout shift from scrollbar disappearing
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalBodyPadding = document.body.style.paddingRight;
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // Resume Lenis and restore styles
      lenis?.start();
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.paddingRight = originalBodyPadding;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dish, onClose, hookLenis]);

  if (!dish) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 overscroll-contain"
        data-lenis-prevent
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="relative w-full max-w-2xl bg-[#131814] text-white border border-white/15 rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl z-10 max-h-[92vh] sm:max-h-[90vh] flex flex-col overscroll-contain"
          data-lenis-prevent
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Scrollable Container */}
          <div
            className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overscroll-contain"
            data-lenis-prevent
          >
            {/* Restaurant Image */}
            <div className="relative w-full h-48 sm:h-64 md:h-72 rounded-[18px] sm:rounded-[22px] overflow-hidden bg-neutral-900 border border-white/10">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 640px"
              />
              <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-[#c8ff47] border border-[#c8ff47]/30">
                  {dish.category}
                </span>
                {dish.verified_by_team && (
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-white/90 border border-white/20 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c8ff47]" />
                    <span>Terverifikasi Tim</span>
                  </span>
                )}
              </div>
            </div>

            {/* Header info */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-2xl sm:text-3xl font-serif font-medium tracking-tight">
                  {dish.name}
                </h3>
                <span className="text-sm font-mono font-bold text-[#c8ff47] px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                  {dish.price_range}
                </span>
              </div>

              {/* Location Tag */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-white/80">
                <MapPin className="w-4 h-4 text-[#c8ff47] shrink-0" />
                <span>{dish.address}</span>
              </div>

              {/* Status Badges from PRD */}
              <div className="flex flex-wrap gap-2 pt-1">
                {dish.status_badges.map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 rounded-full bg-[#c8ff47]/10 border border-[#c8ff47]/25 text-[#c8ff47] text-[11px] font-semibold tracking-wider uppercase"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <p className="text-white/80 text-sm sm:text-base leading-relaxed pt-1">
                {dish.description}
              </p>
            </div>

            {/* Opening Hours & Live Status */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-[#c8ff47] shrink-0" />
                <span>{dish.opening_hours}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider shrink-0">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    dish.is_open_now ? "bg-[#c8ff47] shadow-[0_0_8px_#c8ff47]" : "bg-red-500"
                  }`}
                />
                <span className={dish.is_open_now ? "text-[#c8ff47]" : "text-white/60"}>
                  {dish.is_open_now ? "Buka Sekarang" : "Tutup"}
                </span>
              </div>
            </div>

            {/* Signature Dishes */}
            <div className="space-y-3 pt-1 border-t border-white/10">
              <h4 className="text-xs font-bold tracking-[0.16em] uppercase text-[#c8ff47] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#c8ff47]" />
                <span>{lang === "en" ? "Signature Dishes" : "Menu Andalan"}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {dish.signature_dishes.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white/90"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#c8ff47]/20 flex items-center justify-center shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff47]" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button: Google Maps Navigation */}
            <div className="pt-2">
              <a
                href={dish.gmaps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#c8ff47] hover:bg-[#d8ff5e] text-black font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#c8ff47]/20 cursor-pointer"
              >
                <span>Buka Rute di Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
