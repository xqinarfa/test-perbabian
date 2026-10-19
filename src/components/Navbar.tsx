"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLenis } from "lenis/react";
import { Language, CONTENT } from "@/data/content";
import { MagneticButton } from "./MagneticButton";

interface NavbarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onExploreClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onLanguageChange,
  onExploreClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const t = CONTENT[lang].nav;
  const hookLenis = useLenis();

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      hookLenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      hookLenis?.start();
      document.body.style.overflow = "";
    }
    return () => {
      hookLenis?.start();
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, hookLenis]);

  // Track active section via IntersectionObserver & throttled scroll
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 25;
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sectionIds = ["inicio", "cardapio", "como-funciona", "experiencia", "faq"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-30% 0px -40% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <>
      <header className="fixed top-2.5 sm:top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-2.5 sm:px-4 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-3 md:gap-6 px-3 sm:px-5 md:px-6 py-1.5 sm:py-2 md:py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#11140f]/95 shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-xl border border-white/15 ring-1 ring-white/5"
              : "bg-[#11140f]/85 backdrop-blur-md border border-white/10 shadow-lg"
          }`}
          style={{ maxWidth: "1060px", width: "100%" }}
        >
          {/* Brand Logo */}
          <a
            href="#inicio"
            className="flex items-center group focus:outline-none shrink-0"
            aria-label="Perbabian"
          >
            <div className="relative h-7.5 xs:h-8 sm:h-9 md:h-11 w-auto aspect-[927/220] shrink-0 group-hover:scale-[1.02] transition-transform duration-200">
              <Image
                src="/images/logo-clean-dark.png"
                alt="Perbabian"
                width={927}
                height={220}
                priority
                className="h-full w-auto object-contain"
              />
            </div>
          </a>

          {/* Desktop Nav Links with Active Pill Indicator */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 text-xs md:text-[13px] font-medium"
          >
            {t.links.map((link) => {
              const targetId = link.href.replace("#", "");
              const isActive = activeSection === targetId;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative px-3.5 py-1.5 rounded-full transition-colors duration-200 ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-white/10 rounded-full border border-white/15"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Controls: Desktop has Lang + CTA; Mobile shows ONLY the Hamburger button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop-only Language Switcher & CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher with animated pill */}
              <div className="relative flex items-center bg-black/50 rounded-full p-1 border border-white/10 text-[11px] font-semibold tracking-wider shrink-0">
                <button
                  onClick={() => onLanguageChange("id")}
                  className={`relative px-2.5 py-1 rounded-full transition-colors z-10 cursor-pointer ${
                    lang === "id" ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                  aria-label="Ganti ke Bahasa Indonesia"
                >
                  {lang === "id" && (
                    <motion.div
                      layoutId="activeLangIndicator"
                      className="absolute inset-0 bg-white/20 rounded-full shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 xl:hidden">ID</span>
                  <span className="relative z-10 hidden xl:inline">INDONESIA</span>
                </button>

                <button
                  onClick={() => onLanguageChange("en")}
                  className={`relative px-2.5 py-1 rounded-full transition-colors z-10 cursor-pointer ${
                    lang === "en" ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                  aria-label="Switch to English"
                >
                  {lang === "en" && (
                    <motion.div
                      layoutId="activeLangIndicator"
                      className="absolute inset-0 bg-white/20 rounded-full shadow-xs"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 xl:hidden">EN</span>
                  <span className="relative z-10 hidden xl:inline">ENGLISH</span>
                </button>
              </div>

              {/* Desktop Explore CTA Button */}
              <MagneticButton
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 bg-[#BE132D] hover:bg-[#d81a37] text-white font-semibold text-xs md:text-[13px] rounded-full transition-colors group shadow-lg shadow-[#BE132D]/25 whitespace-nowrap cursor-pointer shrink-0"
              >
                <span>{t.exploreCta}</span>
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#BE132D] group-hover:scale-105 transition-transform duration-200">
                  <ArrowRight className="w-3.5 h-3.5 text-[#BE132D] group-hover:translate-x-0.5 transition-transform" />
                </span>
              </MagneticButton>
            </div>

            {/* Mobile/Tablet Hamburger Toggle: The ONLY button visible on mobile navbar right */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white/90 hover:text-white bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BE132D] rounded-full cursor-pointer shrink-0 transition-colors"
              aria-label="Buka menu navigasi"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Drawer Menu with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-black/92 flex flex-col justify-center px-6 py-10 lg:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-5 text-center items-center max-w-sm mx-auto w-full">
              <div className="relative h-12 sm:h-14 w-auto aspect-[927/220] mb-2">
                <Image
                  src="/images/logo-clean-dark.png"
                  alt="Perbabian"
                  width={927}
                  height={220}
                  className="h-full w-auto object-contain"
                />
              </div>

              {t.links.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.28 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-xl sm:text-2xl font-serif text-white hover:text-[#BE132D] transition-colors py-1"
                >
                  {link.label}
                </motion.a>
              ))}

              {/* Language Switcher in Mobile Drawer */}
              <div className="flex items-center bg-white/10 rounded-full p-1 border border-white/15 text-xs font-semibold my-2">
                <button
                  onClick={() => onLanguageChange("id")}
                  className={`px-3.5 py-1.5 rounded-full transition-colors ${
                    lang === "id"
                      ? "bg-[#BE132D] text-white shadow-md font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  INDONESIA
                </button>
                <button
                  onClick={() => onLanguageChange("en")}
                  className={`px-3.5 py-1.5 rounded-full transition-colors ${
                    lang === "en"
                      ? "bg-[#BE132D] text-white shadow-md font-bold"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  ENGLISH
                </button>
              </div>

              <div className="h-px bg-white/10 w-full my-2" />

              {/* Daftarkan Restoran Button inside Mobile Drawer */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExploreClick();
                }}
                className="flex items-center justify-center gap-3 w-full py-3.5 px-6 bg-[#BE132D] hover:bg-[#d81a37] text-white font-bold text-sm rounded-full active:scale-98 transition-all shadow-lg shadow-[#BE132D]/30"
              >
                <span>{t.exploreCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
