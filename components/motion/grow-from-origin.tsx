"use client";

import type { TargetAndTransition, Variants } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { growVariants, type Origin, revealTransition, viewportOnce } from "@/lib/motion";

type GrowFromOriginProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  /** transform-origin corner/center the element grows from. */
  origin?: Origin;
  trigger?: "inView" | "mount";
};

/**
 * Grow from origin — fade + scale ~0.85 → 1, anchored to a transform-origin
 * corner/center. The dropdown/tooltip/popover entrance. Mounts by default
 * (menus don't wait on a scroll trigger); pass trigger="inView" to scope it
 * to viewport entry instead. Transform-only — the reduced-motion provider
 * strips it for free, no manual guard needed.
 */
export function GrowFromOrigin({
  children,
  className,
  style,
  delay = 0,
  origin = "top",
  trigger = "mount",
}: GrowFromOriginProps) {
  const base = growVariants(origin);
  // growVariants bakes revealTransition into `animate` itself — a delay has
  // to be merged into that same target, since a component-level `transition`
  // prop only applies as a fallback when the variant has none of its own.
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
