"use client";

import React from "react";
import { motion } from "framer-motion";

interface MarqueeTickerProps {
  text: string;
}

export const MarqueeTicker: React.FC<MarqueeTickerProps> = ({ text }) => {
  // 5 items per loop is more than sufficient for wide screen wrapping without bloat
  const items = Array(5).fill(text);

  return (
    <div className="w-full bg-[#0b0e0c] py-6 sm:py-8 px-4 flex justify-center items-center overflow-hidden">
      {/* Framer exact pill ribbon container: -1deg rotation, rounded-full, max-width 1180px, hardware-accelerated */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[1180px] h-[58px] sm:h-[64px] rounded-full bg-[#141b16] border border-white/10 -rotate-1 flex items-center overflow-hidden px-4 sm:px-6 shadow-lg shadow-black/25 group cursor-default"
      >
        <div className="flex w-max items-center">
          {/* First loop */}
          <motion.div
            className="flex items-center gap-[34px] pr-[34px] shrink-0 will-change-transform"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 28,
            }}
          >
            {items.map((item, idx) => (
              <span
                key={`m1-${idx}`}
                className="text-[#BE132D] font-semibold text-[13px] sm:text-[14px] md:text-[15px] tracking-[0.08em] uppercase whitespace-nowrap select-none"
              >
                {item}
              </span>
            ))}
          </motion.div>

          {/* Second loop for seamless wrap */}
          <motion.div
            className="flex items-center gap-[34px] pr-[34px] shrink-0 will-change-transform"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 28,
            }}
          >
            {items.map((item, idx) => (
              <span
                key={`m2-${idx}`}
                className="text-[#BE132D] font-semibold text-[13px] sm:text-[14px] md:text-[15px] tracking-[0.08em] uppercase whitespace-nowrap select-none"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
