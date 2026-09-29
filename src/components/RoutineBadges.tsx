"use client";

import React from "react";
import { Eye, SlidersHorizontal, Compass, CheckCircle2 } from "lucide-react";

interface RoutineBadgesProps {
  subtitle: string;
  tags: string[];
}

export const RoutineBadges: React.FC<RoutineBadgesProps> = ({ subtitle, tags }) => {
  const icons = [
    <Eye key="1" className="w-3.5 h-3.5 text-[#40502f]" />,
    <SlidersHorizontal key="2" className="w-3.5 h-3.5 text-[#40502f]" />,
    <Compass key="3" className="w-3.5 h-3.5 text-[#40502f]" />,
    <CheckCircle2 key="4" className="w-3.5 h-3.5 text-[#40502f]" />,
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center pt-16 pb-12 px-4 text-center">
      <p className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-[#11140f]/60 uppercase mb-6">
        {subtitle}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-4xl">
        {tags.map((tag, idx) => (
          <div
            key={tag}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/70 backdrop-blur-sm border border-[#11140f]/10 text-[#11140f] text-xs sm:text-[13px] font-semibold tracking-wider uppercase shadow-xs hover:border-[#11140f]/25 transition-colors"
          >
            {icons[idx % icons.length]}
            <span>{tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
