"use client";

import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { springPop, springPopTransition } from "@/lib/motion";

type SpringPopProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
};

// The ~1.05 overshoot emerges from the spring itself — never keyframe it.
// Reduced motion drops the scale (a transform), leaving a clean opacity fade.
export function SpringPop({ children, className, style, delay = 0 }: SpringPopProps) {
  return (
    <m.div
      className={className}
      style={style}
      initial={springPop.initial}
      animate={springPop.animate}
      transition={{ ...springPopTransition, delay }}
    >
      {children}
    </m.div>
  );
}
