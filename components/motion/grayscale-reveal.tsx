"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { durations, ease, grayscaleReveal, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  trigger?: "inView" | "mount";
};

/**
 * Grayscale → color reveal, for images — `grayscale(1)` fades to `grayscale(0)`
 * alongside opacity, on `durations.slow` (filter animation reads best unhurried).
 *
 * `filter` isn't stripped by the reducedMotion="user" provider (only transforms
 * are), so reduced-motion renders the final color state with a plain opacity
 * fade instead of animating the filter.
 */
export function GrayscaleReveal({
  children,
  className,
  style,
  delay = 0,
  trigger = "inView",
}: Props) {
  const reduceMotion = useReducedMotion();
  const transition = { duration: durations.slow, ease: ease.out, delay };
  const target = reduceMotion ? { opacity: 1 } : grayscaleReveal.animate;
  const initial = reduceMotion ? { opacity: 0 } : grayscaleReveal.initial;
  const play =
    trigger === "mount"
      ? ({ animate: target } as const)
      : ({ whileInView: target, viewport: viewportOnce } as const);

  return (
    <m.div className={className} style={style} initial={initial} {...play} transition={transition}>
      {children}
    </m.div>
  );
}
