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
      <header className="fixed top-3 sm:top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-2 sm:gap-3 md:gap-7 px-3.5 sm:px-6 py-2 md:py-2.5 rounded-full transition-all duration-300 ${
            scrolled
              ? "bg-[#11140f]/95 shadow-[0_12px_36px_rgba(0,0,0,0.55)] backdrop-blur-xl border border-white/15 ring-1 ring-white/5"
              : "bg-[#11140f]/80 backdrop-blur-md border border-white/10"
          }`}
          style={{ maxWidth: "1060px", width: "100%" }}
        >
          {/* Brand Logo */}
          <a
            href="#inicio"
            className="flex items-center group focus:outline-none shrink-0"
            aria-label="Perbabian"
          >
            <div className="relative h-9 sm:h-10 md:h-11 w-auto aspect-[927/220] shrink-0 group-hover:scale-[1.02] transition-transform duration-200">
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

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {/* Language Switcher with animated pill */}
            <div className="relative flex items-center bg-black/45 rounded-full p-0.5 sm:p-1 border border-white/10 text-[10px] sm:text-[11px] font-semibold tracking-wider">
              <button
                onClick={() => onLanguageChange("id")}
                className={`relative px-2 sm:px-2.5 py-1 rounded-full transition-colors z-10 cursor-pointer ${
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
                <span className="relative z-10 sm:hidden">ID</span>
                <span className="relative z-10 hidden sm:inline">INDONESIA</span>
              </button>

              <button
                onClick={() => onLanguageChange("en")}
                className={`relative px-2 sm:px-2.5 py-1 rounded-full transition-colors z-10 cursor-pointer ${
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
                <span className="relative z-10 sm:hidden">EN</span>
                <span className="relative z-10 hidden sm:inline">ENGLISH</span>
              </button>
            </div>

            {/* Desktop Explore CTA Button */}
            <MagneticButton
              onClick={onExploreClick}
              className="hidden sm:inline-flex items-center gap-2.5 pl-4 pr-1.5 py-1.5 bg-[#BE132D] hover:bg-[#d81a37] text-white font-semibold text-xs md:text-[13px] rounded-full transition-colors group shadow-lg shadow-[#BE132D]/25 whitespace-nowrap cursor-pointer"
            >
              <span>{t.exploreCta}</span>
              <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#BE132D] group-hover:scale-105 transition-transform duration-200">
                <ArrowRight className="w-3.5 h-3.5 text-[#BE132D] group-hover:translate-x-0.5 transition-transform" />
              </span>
            </MagneticButton>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BE132D] rounded-full cursor-pointer"
              aria-label="Toggle menu"
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
            className="fixed inset-0 z-40 bg-black/90 flex flex-col justify-center px-8 py-12 lg:hidden"
          >
            <div className="flex flex-col gap-6 text-center items-center">
              <div className="relative h-14 sm:h-16 w-auto aspect-[927/220] mb-2">
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
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl sm:text-3xl font-serif text-white hover:text-[#BE132D] transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}

              <div className="h-px bg-white/10 my-4" />

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onExploreClick();
                }}
                className="flex items-center justify-center gap-3 w-full py-3.5 bg-[#BE132D] text-white font-bold text-sm rounded-full active:scale-98 transition-transform"
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
