"use client";

import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { durations, ease, fade } from "@/lib/motion";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
};

/** Pure opacity fade — for above-the-fold / on-mount reveals. */
export function FadeIn({ children, className, style, delay = 0 }: FadeInProps) {
  return (
    <m.div
      className={className}
      style={style}
      initial={fade.initial}
      animate={fade.animate}
      transition={{ duration: durations.slow, ease: ease.out, delay }}
    >
      {children}
    </m.div>
  );
}
