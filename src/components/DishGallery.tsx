"use client";

import React, { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Search, MapPin, Eye, AlertCircle, PlusCircle, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Restaurant, RESTAURANTS, Language, CONTENT, NonHalalLevel } from "@/data/content";
import {
  FRAMER_EASE,
  FRAMER_TEXT_BLUR_IN,
  FRAMER_TAP,
} from "@/lib/animations";
import { DishModal } from "./DishModal";

interface DishGalleryProps {
  lang: Language;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  onOpenSubmitModal?: () => void;
}

export const DishGallery: React.FC<DishGalleryProps> = ({
  lang,
  searchQuery = "",
  onSearchChange,
  onOpenSubmitModal,
}) => {
  const [internalSearch, setInternalSearch] = useState("");
  const activeQuery = onSearchChange ? searchQuery : internalSearch;
  const setActiveQuery = onSearchChange ? onSearchChange : setInternalSearch;

  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [openNowOnly, setOpenNowOnly] = useState<boolean>(false);
  const [selectedDish, setSelectedDish] = useState<Restaurant | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState<boolean>(false);

  // Pagination state
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const t = CONTENT[lang].gallery;

  const CITIES = [
    { id: "all", label: "Semua Kota" },
    { id: "DKI Jakarta", label: "DKI Jakarta" },
    { id: "Bali", label: "Bali" },
    { id: "Medan", label: "Medan" },
    { id: "Surabaya", label: "Surabaya" },
    { id: "Bandung", label: "Bandung" },
  ];

  const CATEGORIES = [
    { id: "all", label: "Semua Kategori" },
    { id: "Bakmi & Pangsit", label: "Bakmi & Pangsit" },
    { id: "Babi Guling", label: "Babi Guling" },
    { id: "Chinese Food", label: "Chinese Food" },
    { id: "Western / Pork Ribs", label: "Western / Ribs" },
    { id: "Street Food", label: "Street Food" },
  ];

  const NON_HALAL_LEVELS = [
    { id: "all", label: "Semua Kategori Babi" },
    { id: "pork_meat", label: "Menu Olahan Daging Babi" },
    { id: "lard_used", label: "Menggunakan Minyak Babi (Lard)" },
    { id: "kitchen_100_non_halal", label: "100% Dapur Babi" },
  ];

  const filteredRestaurants = useMemo(() => {
    return RESTAURANTS.filter((r) => {
      // City match
      if (selectedCity !== "all") {
        const matchesCity =
          r.city.toLowerCase().includes(selectedCity.toLowerCase()) ||
          r.province.toLowerCase().includes(selectedCity.toLowerCase()) ||
          (selectedCity === "Bali" && (r.province === "Bali" || r.city === "Denpasar" || r.city === "Gianyar")) ||
          (selectedCity === "DKI Jakarta" && r.province === "DKI Jakarta") ||
          (selectedCity === "Medan" && r.city === "Medan") ||
          (selectedCity === "Surabaya" && r.city === "Surabaya") ||
          (selectedCity === "Bandung" && r.city === "Bandung");
        if (!matchesCity) return false;
      }

      // Category match
      if (selectedCategory !== "all" && r.category !== selectedCategory) {
        return false;
      }

      // Pork category match
      if (selectedLevel !== "all") {
        if (!r.pork_status.includes(selectedLevel as NonHalalLevel)) {
          return false;
        }
      }

      // Open Now toggle match
      if (openNowOnly && !r.is_open_now) {
        return false;
      }

      // Query match (Name, dishes, district, city)
      if (activeQuery.trim()) {
        const q = activeQuery.toLowerCase().trim();
        const inName = r.name.toLowerCase().includes(q);
        const inCity = r.city.toLowerCase().includes(q) || r.district.toLowerCase().includes(q);
        const inDishes = r.signature_dishes.some((d) => d.toLowerCase().includes(q));
        const inCategory = r.category.toLowerCase().includes(q);
        if (!inName && !inCity && !inDishes && !inCategory) return false;
      }

      return true;
    });
  }, [selectedCity, selectedCategory, selectedLevel, openNowOnly, activeQuery]);

  // Reset page when any filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCity, selectedCategory, selectedLevel, openNowOnly, activeQuery]);

  // Pagination derived state
  const totalPages = Math.max(1, Math.ceil(filteredRestaurants.length / ITEMS_PER_PAGE));

  const paginatedRestaurants = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredRestaurants.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredRestaurants, currentPage]);

  const goToPage = (page: number) => {
    const target = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(target);
    const el = document.getElementById("cardapio");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const resetFilters = () => {
    setSelectedCity("all");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setOpenNowOnly(false);
    setActiveQuery("");
    setCurrentPage(1);
  };

  return (
    <section
      id="cardapio"
      className="w-full bg-[#0b0e0c] text-white py-16 sm:py-20 md:py-28 px-4 sm:px-8 md:px-12 lg:px-20 border-t border-white/10"
    >
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10 md:space-y-14">
        {/* Header Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: FRAMER_EASE }}
            className="lg:col-span-7 space-y-3 sm:space-y-4"
          >
            <motion.h2
              {...FRAMER_TEXT_BLUR_IN}
              className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.12] tracking-tight"
            >
              {t.title}
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.58, delay: 0.08, ease: FRAMER_EASE }}
            className="lg:col-span-5"
          >
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">
              {t.description}
            </p>
          </motion.div>
        </div>

        {/* Filter Bar from PRD */}
        <div className="space-y-4 bg-white/3 p-4 sm:p-6 rounded-[22px] sm:rounded-[28px] border border-white/10 backdrop-blur-sm">
          {/* Top Search Bar */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <input
              type="text"
              value={activeQuery}
              onChange={(e) => setActiveQuery(e.target.value)}
              placeholder="Cari restoran, menu (babi guling, samcan, bakmi), atau area..."
              className="w-full pl-11 pr-14 py-2.5 sm:py-3 bg-black/40 border border-white/10 rounded-full text-xs sm:text-sm text-white placeholder-white/45 focus:outline-none focus:border-[#BE132D]/60 transition-colors"
            />
            {activeQuery && (
              <button
                onClick={() => setActiveQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>

          {/* Mobile Filter Action Bar */}
          <div className="sm:hidden flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className={`flex-1 flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-xl border text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                selectedCity !== "all" || selectedLevel !== "all"
                  ? "bg-[#BE132D]/20 border-[#BE132D] text-white"
                  : "bg-black/40 border-white/10 text-white/80 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#BE132D]" />
                <span>
                  {mobileFilterOpen ? "Tutup Filter Wilayah" : "Filter Kota & Bahan"}
                </span>
              </div>
              {(selectedCity !== "all" || selectedLevel !== "all") && (
                <span className="w-5 h-5 rounded-full bg-[#BE132D] text-white text-[11px] font-bold flex items-center justify-center">
                  {(selectedCity !== "all" ? 1 : 0) + (selectedLevel !== "all" ? 1 : 0)}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpenNowOnly(!openNowOnly)}
              className={`shrink-0 flex items-center gap-2 min-h-[44px] px-3.5 py-2.5 rounded-xl border text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                openNowOnly
                  ? "bg-emerald-500/15 border-emerald-400 text-emerald-300"
                  : "bg-black/40 border-white/10 text-white/70"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  openNowOnly ? "bg-emerald-400 shadow-[0_0_6px_#34d399]" : "bg-white/40"
                }`}
              />
              <span>Buka</span>
            </button>
          </div>

          {/* Filter Dropdowns: Collapsible on Mobile, Grid Toolbar on Desktop */}
          <div
            className={`${
              mobileFilterOpen ? "grid grid-cols-1 gap-2.5 p-3 rounded-2xl bg-white/[0.04] border border-white/10 mt-2" : "hidden"
            } sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-3 sm:pt-1 sm:bg-transparent sm:border-0 sm:p-0 sm:mt-0`}
          >
            {/* Dropdown 1: Provinsi / Kota */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/60">
                Pilih Kota / Wilayah
              </label>
              <div className="relative">
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full min-h-[44px] sm:min-h-0 appearance-none bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs text-white focus:outline-none focus:border-[#BE132D]/60 transition-colors cursor-pointer"
                >
                  {CITIES.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#11140f] text-white">
                      {c.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Dropdown 2: Kategori Makanan */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/60">
                Kategori Makanan
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full min-h-[44px] sm:min-h-0 appearance-none bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs text-white focus:outline-none focus:border-[#BE132D]/60 transition-colors cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.id} className="bg-[#11140f] text-white">
                      {cat.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Dropdown 3: Kategori Babi */}
            <div className="space-y-1.5">
              <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white/60">
                Kategori Olahan / Lard
              </label>
              <div className="relative">
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full min-h-[44px] sm:min-h-0 appearance-none bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 sm:py-2.5 text-xs text-white focus:outline-none focus:border-[#BE132D]/60 transition-colors cursor-pointer"
                >
                  {NON_HALAL_LEVELS.map((lvl) => (
                    <option key={lvl.id} value={lvl.id} className="bg-[#11140f] text-white">
                      {lvl.label}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-[10px]">
                  ▼
                </div>
              </div>
            </div>

            {/* Toggle: Buka Sekarang (Desktop inline) */}
            <div className="space-y-1.5 hidden sm:flex sm:flex-col sm:justify-end">
              <button
                type="button"
                onClick={() => setOpenNowOnly(!openNowOnly)}
                className={`w-full min-h-[44px] sm:min-h-0 flex items-center justify-between px-3.5 py-2 sm:py-2.5 rounded-xl border text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  openNowOnly
                    ? "bg-emerald-500/15 border-emerald-400 text-emerald-300"
                    : "bg-black/40 border-white/10 text-white/70 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      openNowOnly ? "bg-emerald-400 shadow-[0_0_6px_#34d399]" : "bg-white/40"
                    }`}
                  />
                  <span>Buka Sekarang</span>
                </span>
                <span className="text-[10px] uppercase opacity-75 font-mono">
                  {openNowOnly ? "ON" : "OFF"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Category Filter Pills - Horizontally scrollable on mobile */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;

            return (
              <motion.button
                key={cat.id}
                whileTap={FRAMER_TAP}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold tracking-wider transition-colors duration-200 cursor-pointer select-none whitespace-nowrap shrink-0 ${
                  isActive
                    ? "text-white"
                    : "text-white/60 hover:text-white bg-white/5 border border-white/5"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="dishFilterTab"
                    className="absolute inset-0 bg-[#BE132D] rounded-full shadow-md shadow-[#BE132D]/20"
                    transition={{ type: "spring", stiffness: 420, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Results Counter & Top Mini-Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/50 pt-1">
          <div className="flex items-center gap-3">
            <span>
              Menampilkan {filteredRestaurants.length > 0 ? `${((currentPage - 1) * ITEMS_PER_PAGE) + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredRestaurants.length)} dari ${filteredRestaurants.length}` : "0"} tempat makan olahan babi
            </span>
            {(selectedCity !== "all" ||
              selectedCategory !== "all" ||
              selectedLevel !== "all" ||
              openNowOnly ||
              activeQuery) && (
              <button
                onClick={resetFilters}
                className="text-[#BE132D] hover:underline cursor-pointer"
              >
                Reset filter
              </button>
            )}
          </div>

          {/* Mini Pagination di Atas Kanan */}
          {totalPages > 1 && (
            <div className="flex items-center self-end sm:self-auto gap-2.5 bg-white/4 border border-white/10 rounded-full px-3 py-1">
              <span className="text-[11px] text-white/60">
                Halaman <strong className="text-white font-semibold">{currentPage}</strong> dari {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Halaman sebelumnya"
                  className={`p-1 rounded-md transition-all ${
                    currentPage === 1
                      ? "opacity-30 cursor-not-allowed text-white/30"
                      : "hover:bg-white/10 text-white cursor-pointer active:scale-90"
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Halaman selanjutnya"
                  className={`p-1 rounded-md transition-all ${
                    currentPage === totalPages
                      ? "opacity-30 cursor-not-allowed text-white/30"
                      : "hover:bg-white/10 text-white cursor-pointer active:scale-90"
                  }`}
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Restaurant Cards Grid or Empty State */}
        {filteredRestaurants.length > 0 ? (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7"
            >
            <AnimatePresence>
              {paginatedRestaurants.map((dish) => (
                <motion.div
                  key={dish.id}
                  layout
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.05 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0px 0px 18px 1px rgba(255, 45, 85, 0.4), 0px 8px 24px -4px rgba(0, 0, 0, 0.7)",
                  }}
                  whileTap={FRAMER_TAP}
                  transition={{
                    duration: 0.35,
                    ease: FRAMER_EASE,
                  }}
                  onClick={() => setSelectedDish(dish)}
                  className="card dish-card group cursor-pointer flex flex-col will-change-transform"
                >
                  <div className="card2 dish-card2 p-3.5 flex flex-col justify-between overflow-hidden">
                    <div>
                      {/* Restaurant Photo */}
                      <div className="relative w-full aspect-4/3 rounded-[18px] md:rounded-[20px] overflow-hidden bg-neutral-900 mb-4">
                        <Image
                          src={dish.image}
                          alt={dish.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-108"
                        />

                        {/* Quick view overlay */}
                        <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-bold tracking-wider uppercase shadow-2xl transform translate-y-3 group-hover:translate-y-0 group-hover:scale-100 scale-95 transition-all duration-300 ease-out">
                            <Eye className="w-3.5 h-3.5 text-[#BE132D]" />
                            <span>Lihat Detail Restoran</span>
                          </div>
                        </div>

                        {/* Category Tag on Image */}
                        <div className="absolute bottom-3 left-3 pointer-events-none">
                          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[10px] font-bold tracking-wider uppercase text-white/90 border border-white/20">
                            {dish.category}
                          </span>
                        </div>

                        {/* Status Buka / Tutup Pill */}
                        <div className="absolute top-3 right-3 pointer-events-none">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase backdrop-blur-md border flex items-center gap-1.5 ${
                              dish.is_open_now
                                ? "bg-black/75 text-emerald-400 border-emerald-400/40"
                                : "bg-black/75 text-white/60 border-white/15"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                dish.is_open_now ? "bg-emerald-400 shadow-[0_0_8px_#10b981]" : "bg-red-400"
                              }`}
                            />
                            <span>{dish.is_open_now ? "Buka" : "Tutup"}</span>
                          </span>
                        </div>
                      </div>

                      {/* Restaurant Title & Location */}
                      <div className="px-2 mb-3">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="text-xl sm:text-2xl font-serif font-medium text-white/95 group-hover:text-white transition-colors">
                            {dish.name}
                          </h3>
                          <span className="text-xs font-mono font-bold text-[#ff4d6d] group-hover:scale-110 transition-transform shrink-0">
                            {dish.price_range}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-white/60">
                          <MapPin className="w-3.5 h-3.5 text-[#ff3355] shrink-0 group-hover:scale-110 transition-transform" />
                          <span>
                            {dish.district}, {dish.city}
                          </span>
                        </div>
                      </div>

                      {/* Signature Dish Preview */}
                      <div className="px-2 text-xs text-white/70 line-clamp-1 mb-2 font-sans">
                        <span className="text-white/40">Andalan: </span>
                        <span>{dish.signature_dishes.join(" • ")}</span>
                      </div>
                    </div>

                    {/* Card Footer Link */}
                    <div className="pt-3 px-2 flex items-center justify-between border-t border-white/5 mt-2">
                      <span className="text-xs font-semibold tracking-wider text-[#ff3355] group-hover:text-white flex items-center gap-1.5 group-hover:translate-x-1.5 transition-all duration-300">
                        <span>{t.cardCta}</span>
                      </span>
                      <span className="text-[11px] text-white/40 font-mono">
                        {dish.opening_hours.split(",")[0]}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Full Bottom Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
              <span className="text-xs text-white/50 order-2 sm:order-1">
                Menampilkan {((currentPage - 1) * ITEMS_PER_PAGE) + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredRestaurants.length)} dari {filteredRestaurants.length} restoran
              </span>

              <nav aria-label="Navigasi halaman" className="flex items-center gap-2 order-1 sm:order-2">
                {/* Tombol Sebelumnya */}
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Halaman sebelumnya"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/10 transition-all ${
                    currentPage === 1
                      ? "opacity-30 cursor-not-allowed bg-white/5 text-white/40"
                      : "bg-white/5 hover:bg-white/15 text-white cursor-pointer active:scale-95"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Sebelumnya</span>
                </button>

                {/* Nomor Halaman */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const isActive = currentPage === page;
                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => goToPage(page)}
                        aria-current={isActive ? "page" : undefined}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#BE132D] text-white shadow-lg shadow-[#BE132D]/35 scale-105"
                            : "bg-white/5 hover:bg-white/15 text-white/75 hover:text-white border border-white/10 active:scale-95"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                </div>

                {/* Tombol Selanjutnya */}
                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Halaman selanjutnya"
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-white/10 transition-all ${
                    currentPage === totalPages
                      ? "opacity-30 cursor-not-allowed bg-white/5 text-white/40"
                      : "bg-white/5 hover:bg-white/15 text-white cursor-pointer active:scale-95"
                  }`}
                >
                  <span className="hidden sm:inline">Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </nav>
            </div>
          )}
        </>
      ) : (
          /* Empty State from PRD */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-16 px-6 text-center max-w-lg mx-auto bg-white/2 border border-white/10 rounded-4xl space-y-4"
          >
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#BE132D]">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-serif font-medium text-white">
              Belum ada rekomendasi di area ini
            </h3>
            <p className="text-sm text-white/70 leading-relaxed font-sans">
              Kami belum menemukan tempat makan olahan babi yang terdaftar di lokasi yang kamu pilih. Punya rekomendasi langganan?
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#cta"
                onClick={onOpenSubmitModal}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#BE132D] hover:bg-[#a51026] text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Daftarkan Restoran Baru</span>
              </a>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider transition-colors cursor-pointer"
              >
                Lihat Semua Restoran
              </button>
            </div>
          </motion.div>
        )}

        {/* Sub-footer Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: FRAMER_EASE }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10 text-xs font-bold tracking-[0.16em] uppercase text-white/60"
        >
          <span>{t.bottomTag}</span>
          <a
            href="#cta"
            className="text-[#BE132D] hover:underline transition-all flex items-center gap-1 cursor-pointer"
          >
            <span>{t.bottomLink}</span>
          </a>
        </motion.div>
      </div>

      {/* Detail Modal */}
      <DishModal
        dish={selectedDish}
        lang={lang}
        onClose={() => setSelectedDish(null)}
      />
    </section>
  );
};
