"use client";

import React, { useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Language, CONTENT, DISHES, Dish } from "@/data/content";
import { Navbar } from "@/components/Navbar";
import { HeroCardStack } from "@/components/HeroCardStack";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { PhilosophySection } from "@/components/PhilosophySection";
import { DishGallery } from "@/components/DishGallery";
import { DishModal } from "@/components/DishModal";
import { PathwaysSection } from "@/components/PathwaysSection";
import { FoodLanguageBanner } from "@/components/FoodLanguageBanner";
import { FourStepsSection } from "@/components/FourStepsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { FaqSection } from "@/components/FaqSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { MagneticButton } from "@/components/MagneticButton";
import { FRAMER_EASE, FRAMER_TEXT_BLUR_IN } from "@/lib/animations";

export default function Home() {
  const [lang, setLang] = useState<Language>("id");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const t = CONTENT[lang];

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleSelectDishById = useCallback((dishId: string) => {
    const found = DISHES.find((d) => d.id === dishId);
    if (found) {
      setSelectedDish(found);
    } else {
      const el = document.getElementById("cardapio");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#0b0e0c] text-[#11140f] overflow-x-clip selection:bg-[#bef227] selection:text-black">
        {/* Floating Navbar with Scrollspy & Language Toggle */}
        <Navbar
          lang={lang}
          onLanguageChange={setLang}
          onExploreClick={() => scrollToSection("cta")}
        />

        {/* Hero Section */}
        <section
          id="inicio"
          className="w-full pt-28 sm:pt-36 md:pt-44 pb-14 sm:pb-16 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-20 bg-[#0b0e0c] text-white relative overflow-hidden"
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Heading & Description */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left">
              {/* Framer signature blur-in heading effect */}
              <motion.h1
                {...FRAMER_TEXT_BLUR_IN}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] sm:leading-[1.08] tracking-tight"
              >
                {t.hero.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.1, ease: FRAMER_EASE }}
                className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed font-sans max-w-xl mx-auto lg:mx-0"
              >
                {t.hero.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.58, delay: 0.16, ease: FRAMER_EASE }}
                className="pt-2 flex justify-center lg:justify-start"
              >
                <MagneticButton
                  onClick={() => scrollToSection("cardapio")}
                  className="inline-flex items-center gap-3 pl-6 pr-2 py-2 bg-[#c8ff47] hover:bg-[#d8ff5e] text-black font-bold text-xs sm:text-sm rounded-full transition-colors group shadow-xl shadow-[#c8ff47]/20 cursor-pointer"
                >
                  <span>{t.hero.cta}</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-200">
                    <ArrowRight className="w-4 h-4 text-[#c8ff47] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </MagneticButton>
              </motion.div>
            </div>

            {/* Right Column: Interactive 3D Draggable Card Stack */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.1, ease: FRAMER_EASE }}
              className="lg:col-span-5 flex justify-center items-center"
            >
              <HeroCardStack />
            </motion.div>
          </div>
        </section>

        {/* Marquee Ticker */}
        <MarqueeTicker text={t.ticker} />

        {/* Philosophy Section */}
        <PhilosophySection
          title={t.philosophy.title}
          description={t.philosophy.description}
          cta={t.philosophy.cta}
          cards={t.philosophy.cards}
        />

        {/* Food as a Language Banner */}
        <FoodLanguageBanner
          lang={lang}
          onViewFeatured={() => scrollToSection("cardapio")}
        />

        {/* 3 Pathways Section */}
        <PathwaysSection lang={lang} onSelectDish={handleSelectDishById} />

        {/* Dishes / Restaurant Gallery with Category Filters */}
        <DishGallery
          lang={lang}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onOpenSubmitModal={() => scrollToSection("cta")}
        />

        {/* 4 Step Process */}
        <FourStepsSection lang={lang} />

        {/* Experience / Benefits */}
        <ExperienceSection lang={lang} />

        {/* FAQ Section */}
        <FaqSection lang={lang} />

        {/* CTA Final Banner */}
        <CtaBanner
          lang={lang}
          onExploreClick={() => scrollToSection("cardapio")}
        />

        {/* Footer */}
        <Footer lang={lang} />

        {/* Modal if selected from pathway */}
        <DishModal
          dish={selectedDish}
          lang={lang}
          onClose={() => setSelectedDish(null)}
        />
      </main>
    </SmoothScroll>
  );
}
