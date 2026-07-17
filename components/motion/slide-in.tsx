"use client";

import type { TargetAndTransition, Variants } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import {
  revealTransition,
  type SlideDirection,
  slideDistance,
  slideVariants,
  viewportOnce,
} from "@/lib/motion";

type DistanceTier = keyof typeof slideDistance;

type SlideInProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  direction: SlideDirection;
  distance?: DistanceTier | number;
  trigger?: "inView" | "mount";
};

/** Directional fade + slide — enters from one of 8 travel directions. Transform-only, so the provider's `reducedMotion="user"` strips it for free. */
export function SlideIn({
  children,
  className,
  style,
  delay = 0,
  direction,
  distance = "base",
  trigger = "inView",
}: SlideInProps) {
  const px = typeof distance === "number" ? distance : slideDistance[distance];
  const base = slideVariants(direction, px);
  // slideVariants bakes revealTransition into `animate`, and a variant's own
  // transition overrides the component-level `transition` prop — so fold `delay`
  // into that same target (same idiom as ClipReveal / GrowFromOrigin).
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
