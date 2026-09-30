"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, PanInfo } from "framer-motion";

export interface HeroCardStackProps {
  dragNotice?: string;
  onActiveCardChange?: (src: string) => void;
}

export interface CardItem {
  id: string;
  imageIndex: number;
  generation: number;
  src: string;
  alt: string;
  title: string;
}

export const HERO_CARDS_DATA = [
  {
    imageIndex: 0,
    src: "/images/mediterranean-bowl.jpg",
    alt: "Samcan Crispy Panggang Khas Pontianak",
    title: "Samcan Crispy Emas PIK",
  },
  {
    imageIndex: 1,
    src: "/images/greens-grilled.jpg",
    alt: "Babi Guling Komplit Sanur Bali",
    title: "Babi Guling Karya Rejeki Bali",
  },
  {
    imageIndex: 2,
    src: "/images/crunchy-salad.jpg",
    alt: "Bakmi Babi Khek Selat Panjang Medan",
    title: "Bakmi Babi Khek Medan",
  },
];

// Framer's exact layout transforms
const CARD_LAYOUTS = [
  { x: 12, y: 0, scale: 1, rotate: 7 },
  { x: 0, y: 12, scale: 0.95, rotate: 0 },
  { x: -12, y: 24, scale: 0.9, rotate: -7 },
];

export const HeroCardStack: React.FC<HeroCardStackProps> = ({ onActiveCardChange }) => {
  const [cards, setCards] = useState<CardItem[]>([
    { id: "c1", generation: 0, ...HERO_CARDS_DATA[0] },
    { id: "c2", generation: 0, ...HERO_CARDS_DATA[1] },
    { id: "c3", generation: 0, ...HERO_CARDS_DATA[2] },
  ]);

  const [exitingCard, setExitingCard] = useState<{ id: string; direction: number } | null>(null);

  const cycleCard = (direction = 1) => {
    if (exitingCard) return;
    const topCard = cards[0];
    setExitingCard({ id: topCard.id, direction });

    // Instantly notify parent of revealed next card background
    if (cards.length > 1 && onActiveCardChange) {
      onActiveCardChange(cards[1].src);
    }

    setTimeout(() => {
      setCards((prev) => {
        const next = [...prev];
        const removed = next.shift();
        if (removed) {
          next.push({ ...removed, generation: removed.generation + 1 });
        }
        return next;
      });
      setExitingCard(null);
    }, 280);
  };

  // Ensure parent stays in sync whenever the top card changes
  React.useEffect(() => {
    if (cards[0] && onActiveCardChange) {
      onActiveCardChange(cards[0].src);
    }
  }, [cards, onActiveCardChange]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (exitingCard) return;
    if (Math.abs(info.offset.x) >= 40 || Math.abs(info.velocity.x) >= 260) {
      const direction = info.offset.x > 0 || info.velocity.x > 0 ? 1 : -1;
      cycleCard(direction);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      cycleCard(-1);
    } else if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      cycleCard(1);
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full max-w-[440px] h-[390px] sm:h-[450px] md:h-[510px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BE132D] rounded-3xl"
      aria-label="Interactive dish cards. Drag or press arrow keys to cycle."
    >
      <div className="relative w-[260px] sm:w-[330px] md:w-[370px] h-[340px] sm:h-[410px] md:h-[470px]">
        {[...cards].reverse().map((card) => {
          const index = cards.findIndex((c) => c.id === card.id);
          const isFront = index === 0;
          const isExiting = exitingCard?.id === card.id;
          const layout = CARD_LAYOUTS[Math.min(index, CARD_LAYOUTS.length - 1)];

          return (
            <motion.div
              key={`${card.id}-${card.generation}`}
              drag={isFront && !exitingCard ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.9}
              dragMomentum={false}
              dragSnapToOrigin={true}
              onDragEnd={isFront ? handleDragEnd : undefined}
              onClick={isFront && !exitingCard ? () => cycleCard(1) : undefined}
              whileDrag={{ scale: 1.02, cursor: "grabbing" }}
              initial={{
                x: layout.x,
                y: layout.y,
                scale: layout.scale,
                rotate: layout.rotate,
                opacity: 1,
              }}
              animate={
                isExiting
                  ? {
                      x: (exitingCard?.direction || 1) * 520,
                      y: layout.y + 12,
                      scale: 0.96,
                      rotate: (exitingCard?.direction || 1) * 20,
                      opacity: 0,
                    }
                  : {
                      x: layout.x,
                      y: layout.y,
                      scale: layout.scale,
                      rotate: layout.rotate,
                      opacity: 1,
                    }
              }
              transition={
                isExiting
                  ? { duration: 0.28, ease: [0.32, 0.72, 0, 1] }
                  : { type: "spring", stiffness: 420, damping: 34 }
              }
              style={{
                zIndex: 10 - index,
                borderRadius: "26px",
                boxShadow: "0px 22px 50px 0px rgba(11, 18, 14, 0.35)",
                willChange: "transform, opacity",
              }}
              className="absolute inset-0 overflow-hidden border border-white/20 bg-[#f4f2ec] p-3 md:p-3.5 flex flex-col items-center justify-between"
            >
              {/* Card Photo Container */}
              <div className="relative w-full h-full rounded-[20px] md:rounded-[22px] overflow-hidden bg-neutral-900 pointer-events-none">
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 768px) 340px, 380px"
                  priority={index === 0}
                  className="object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
