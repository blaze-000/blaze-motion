"use client";

import type { TargetAndTransition, Variants } from "motion/react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import {
  type FadeDirection,
  fadeVariants,
  feel,
  revealTransition,
  viewportOnce,
} from "@/lib/motion";

type FadeProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** Subtle FIXED drift as it fades — default "up". "none" = pure opacity. Tunable travel is Slide's job. */
  direction?: FadeDirection;
  /** Layer a blur → sharp focus-in on top. `true` uses feel.fadeBlur (~8px); a number sets custom px. */
  blur?: boolean | number;
  /** Animate the first time it's in view (once) or immediately on mount. */
  trigger?: "inView" | "mount";
};

/**
 * The one prop-driven fade — absorbs the old FadeIn / Reveal / BlurToFocus / BlurFadeRise.
 * A refined opacity fade plus an optional subtle directional drift and an optional blur settle.
 * Transforms are stripped for free by the provider's `reducedMotion="user"`, but `filter` blur
 * is NOT — so on reduced motion we drop both blur AND drift and keep a plain opacity fade.
 */
export function Fade({
  children,
  className,
  style,
  delay = 0,
  direction = "up",
  blur = false,
  trigger = "inView",
}: FadeProps) {
  const reduceMotion = useReducedMotion();
  const blurPx = blur === true ? feel.fadeBlur : blur === false ? 0 : blur;

  // Reduced motion → a plain opacity fade, no drift, no filter. Otherwise the full recipe.
  const base: Variants = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 } }
    : fadeVariants(direction, blurPx);

  // fadeVariants bakes no transition, so fold `delay` into `animate` here — a variant's own
  // transition overrides the component-level `transition` prop (the L004 idiom, as SlideIn does).
  const variants: Variants = {
    ...base,
    animate: {
      ...(base.animate as TargetAndTransition),
      transition: { ...revealTransition, delay },
    },
  };

  const play =
    trigger === "mount"
      ? ({ animate: "animate" } as const)
      : ({ whileInView: "animate", viewport: viewportOnce } as const);

  return (
    <m.div className={className} style={style} variants={variants} initial="initial" {...play}>
      {children}
    </m.div>
  );
}
