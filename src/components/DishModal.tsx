"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  X,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Copy,
  Check,
  Utensils,
} from "lucide-react";
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
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = async () => {
    if (!dish?.address) return;
    try {
      await navigator.clipboard.writeText(dish.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

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

  const isEn = lang === "en";

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-8 overscroll-contain"
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby="dish-modal-title"
      >
        {/* Backdrop with weighted blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClose}
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window / Mobile Bottom Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 32 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-[#131814] text-white border-t sm:border border-white/15 rounded-t-[28px] sm:rounded-4xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] z-10 max-h-[90vh] sm:max-h-[88vh] flex flex-col overscroll-contain"
          data-lenis-prevent
          style={{
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
          }}
        >
          {/* Mobile Sheet Drag Indicator */}
          <div
            onClick={onClose}
            className="sm:hidden w-full flex justify-center pt-3 pb-1 shrink-0 bg-[#131814] cursor-pointer"
            aria-label="Tutup sheet"
          >
            <div className="w-12 h-1.5 rounded-full bg-white/25" />
          </div>

          {/* Close Button with 44px touch target */}
          <button
            onClick={onClose}
            className="absolute top-3.5 sm:top-4 right-3.5 sm:right-4 z-20 min-w-[44px] min-h-[44px] rounded-full bg-black/75 hover:bg-black border border-white/20 hover:border-white/40 flex items-center justify-center text-white transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE132D]"
            aria-label={isEn ? "Close modal" : "Tutup modal"}
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Container */}
          <div
            className="overflow-y-auto overscroll-contain"
            data-lenis-prevent
          >
            {/* Editorial Hero Media */}
            <div className="relative w-full h-52 sm:h-64 md:h-72 bg-neutral-950 overflow-hidden">
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 680px"
              />
              {/* Natural gradient fade into surface */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#131814] via-[#131814]/30 to-transparent"
                aria-hidden="true"
              />

              {/* Verified seal & category bar */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-bold tracking-widest uppercase text-white border border-white/20">
                  {dish.category}
                </span>
                {dish.verified_by_team && (
                  <span className="px-3 py-1 rounded-full bg-[#BE132D]/90 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase text-white border border-[#BE132D] flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isEn ? "Verified by Team" : "Terverifikasi Tim"}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Core Modal Body */}
            <div className="p-5 sm:p-7 md:p-8 space-y-6 -mt-3 relative z-10">
              {/* Restaurant Identity Header */}
              <div className="space-y-3">
                {/* Location Breadcrumb */}
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white/60">
                  <MapPin className="w-3.5 h-3.5 text-[#BE132D] shrink-0" />
                  <span>
                    {dish.district}, {dish.city} • {dish.province}
                  </span>
                </div>

                {/* Title & Price Tier */}
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h2
                    id="dish-modal-title"
                    className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium tracking-tight text-white leading-tight"
                  >
                    {dish.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white px-3 py-1 bg-white/10 border border-white/15 rounded-full">
                      {dish.price_range}
                    </span>
                  </div>
                </div>

                {/* Editorial Description */}
                <p className="text-white/85 text-sm sm:text-base leading-relaxed">
                  {dish.description}
                </p>
              </div>


              {/* Hours & Real-time Status (Flattened row, not nested cards) */}
              <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 text-white/80">
                  <Clock className="w-4 h-4 text-white/60 shrink-0" />
                  <span className="font-mono text-xs">{dish.opening_hours}</span>
                </div>

                <div className="inline-flex items-center gap-2 shrink-0">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      dish.is_open_now
                        ? "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                        : "bg-rose-500"
                    }`}
                  />
                  <span
                    className={`font-semibold tracking-wider text-xs uppercase ${
                      dish.is_open_now ? "text-emerald-400" : "text-white/60"
                    }`}
                  >
                    {dish.is_open_now
                      ? isEn
                        ? "Open Now"
                        : "Buka Sekarang"
                      : isEn
                      ? "Closed"
                      : "Tutup"}
                  </span>
                </div>
              </div>

              {/* Curated Signature Dishes (Editorial Index instead of nested mini-cards) */}
              <div className="border-t border-white/10 pt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-white/90 flex items-center gap-2">
                    <Utensils className="w-3.5 h-3.5 text-[#BE132D]" />
                    <span>{isEn ? "Signature Dishes" : "Menu Andalan"}</span>
                  </h3>
                  <span className="text-[11px] font-mono text-white/40">
                    {dish.signature_dishes.length} {isEn ? "items" : "menu"}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {dish.signature_dishes.map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-colors"
                    >
                      <span className="font-mono text-xs font-bold text-[#BE132D] shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-white/95">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address & Direct Actions */}
              <div className="border-t border-white/10 pt-5 space-y-4">
                {/* Physical Address with Copy Action */}
                <div className="flex items-start justify-between gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex items-start gap-2.5 text-xs text-white/75 leading-relaxed">
                    <MapPin className="w-4 h-4 text-[#BE132D] shrink-0 mt-0.5" />
                    <span>{dish.address}</span>
                  </div>
                  <button
                    onClick={handleCopyAddress}
                    type="button"
                    className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#BE132D]"
                    title={isEn ? "Copy address" : "Salin alamat"}
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">
                          {isEn ? "Copied" : "Tersalin"}
                        </span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isEn ? "Copy" : "Salin"}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Primary Route Navigation */}
                <a
                  href={dish.gmaps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-[#BE132D] hover:bg-[#d81a37] active:scale-[0.99] text-white font-bold text-sm tracking-wider uppercase transition-all shadow-lg shadow-[#BE132D]/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <span>{isEn ? "Open in Google Maps" : "Buka Rute di Google Maps"}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
