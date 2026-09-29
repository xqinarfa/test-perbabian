import type { TargetAndTransition, Transition } from "framer-motion";

// Exact motion parameters, eases, and spring physics reverse-engineered from the original Framer site
export const FRAMER_EASE = [0.22, 1, 0.36, 1] as const;
export const FRAMER_SWIPE_EASE = [0.32, 0.72, 0, 1] as const;

// Framer's signature card stack physics
export const FRAMER_SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 34,
};

// Framer's hover bounce spring
export const FRAMER_SPRING_BOUNCE: Transition = {
  type: "spring",
  bounce: 0.22,
  duration: 0.35,
};

// Framer's tap feedback
export const FRAMER_TAP: TargetAndTransition = {
  scale: 0.94,
  transition: {
    type: "spring",
    bounce: 0.2,
    duration: 0.25,
  },
};

// Framer's exact dish card hover: y: -6, subtle lift, shadow
export const FRAMER_HOVER_CARD: TargetAndTransition = {
  y: -6,
  boxShadow: "0px 18px 42px 0px rgba(0, 0, 0, 0.26)",
  transition: {
    type: "spring",
    bounce: 0.16,
    duration: 0.35,
  },
};

// Framer's dark experience card hover: y: -8, slight highlight
export const FRAMER_HOVER_DARK_CARD: TargetAndTransition = {
  y: -8,
  backgroundColor: "rgba(255, 255, 255, 0.08)",
  transition: {
    type: "spring",
    bounce: 0.22,
    duration: 0.35,
  },
};

// Framer's button / badge hover
export const FRAMER_HOVER_PILL: TargetAndTransition = {
  scale: 1.05,
  transition: {
    type: "spring",
    bounce: 0.2,
    duration: 0.32,
  },
};

// Framer's signature heading entrance: 100% GPU-composited transform and opacity (no CPU raster blur)
export const FRAMER_TEXT_BLUR_IN = {
  initial: {
    opacity: 0,
    y: 24,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: { once: true, amount: 0.2 },
  transition: {
    duration: 0.58,
    ease: FRAMER_EASE,
  },
};

// Standard Framer element scroll reveal
export const FRAMER_APPEAR = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.58, ease: FRAMER_EASE },
};

// Staggered list / cards scroll reveal
export const createFramerStagger = (index: number, baseDelay = 0.06) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: {
    duration: 0.58,
    delay: index * baseDelay,
    ease: FRAMER_EASE,
  },
});

// Framer's tilt entrance for philosophy stacked cards
export const getPhilosophyCardEntrance = (index: number) => {
  const initialRotate = index % 2 === 0 ? -3 : 3;
  const targetRotate = index % 2 === 0 ? 1 : -1;
  return {
    initial: { opacity: 0, rotate: initialRotate, y: 60 },
    whileInView: { opacity: 1, rotate: targetRotate, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: {
      duration: 0.62,
      delay: index * 0.08,
      ease: FRAMER_EASE,
    },
  };
};
