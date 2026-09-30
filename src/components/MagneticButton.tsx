"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { FRAMER_TAP } from "@/lib/animations";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  // strength kept for interface compatibility but completely inactive
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  strength,
  onClick,
  ...props
}) => {
  return (
    <motion.button
      whileTap={FRAMER_TAP}
      onClick={onClick}
      className={`relative inline-flex items-center cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#BE132D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0e0c] ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
