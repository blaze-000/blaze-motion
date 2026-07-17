"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import {
  glowShadow,
  type HoverEffect,
  hoverPress,
  hoverTransition,
  hoverVariants,
} from "@/lib/motion";

type HoverProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** how the wrapped element answers the pointer — a straight, measured settle. */
  effect?: HoverEffect;
};

/**
 * Generic hover wrapper — animates ANY wrapped element on hover, plus a subtle
 * tap press-down. `className` + `style` pass straight through, so <Hover> can BE
 * the layout element (button, card, link) rather than a spare div around it.
 *
 * `lift` / `scale` / `tilt` are transforms — the provider's reducedMotion="user"
 * strips them for free, no guard. `glow` animates boxShadow (NOT a transform, so
 * NOT stripped), so it guards manually: reduced-motion users get a static element.
 */
export function Hover({ children, className, style, effect = "lift" }: HoverProps) {
  const reduceMotion = useReducedMotion();
  // glow is the one non-transform effect — silence it (render static) under reduced motion.
  const glowSilent = effect === "glow" && reduceMotion;

  return (
    <m.div
      className={className}
      style={style}
      initial={effect === "glow" && !glowSilent ? { boxShadow: glowShadow.rest } : undefined}
      whileHover={glowSilent ? undefined : hoverVariants(effect)}
      whileTap={glowSilent ? undefined : hoverPress}
      transition={hoverTransition}
    >
      {children}
    </m.div>
  );
}
