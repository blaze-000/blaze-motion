"use client";

import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { cinematicScale, durations, ease, viewportOnce } from "@/lib/motion";

type CinematicImageProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Cinematic scale-DOWN settle (110% → 100%) for LARGE images only.
 * The wrapper (or a parent) MUST be `overflow-hidden` so the 1.1 scale is
 * clipped — otherwise the oversized image overflows and shifts layout.
 * Never apply this to titles/text; those stay a straight rise, no scale.
 */
export function CinematicImage({ children, className, style }: CinematicImageProps) {
  return (
    <m.div
      className={className}
      style={style}
      initial={cinematicScale.initial}
      whileInView={cinematicScale.animate}
      viewport={viewportOnce}
      transition={{ duration: durations.slow, ease: ease.out }}
    >
      {children}
    </m.div>
  );
}
