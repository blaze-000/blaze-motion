"use client";

import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { fadeUp, revealTransition, viewportOnce } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
};

/** Scroll reveal — a straight rise from below the first time it enters view. */
export function Reveal({ children, className, style, delay = 0 }: RevealProps) {
  return (
    <m.div
      className={className}
      style={style}
      initial={fadeUp.initial}
      whileInView={fadeUp.animate}
      viewport={viewportOnce}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </m.div>
  );
}
