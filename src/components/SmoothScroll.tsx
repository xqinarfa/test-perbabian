"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";

function LenisWatcher() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis && typeof window !== "undefined") {
      (window as unknown as { __lenis?: typeof lenis }).__lenis = lenis;
    }
    return () => {
      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: typeof lenis }).__lenis;
      }
    };
  }, [lenis]);
  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.0,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.2,
      }}
    >
      <LenisWatcher />
      {children}
    </ReactLenis>
  );
}
