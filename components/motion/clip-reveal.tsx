"use client";

import type { TargetAndTransition, Variants } from "motion/react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import {
  fade,
  revealTransition,
  viewportOnce,
  type WipeDirection,
  wipeVariants,
} from "@/lib/motion";

type ClipRevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  trigger?: "inView" | "mount";
  direction?: WipeDirection;
};

/** Hard clip-path inset() edge wipe — the box stays put while its content is
 *  unveiled from `direction`. clip-path survives reducedMotion="user", so we
 *  guard it: on reduce, the element renders fully open with a plain fade. */
export function ClipReveal({
  children,
  className,
  style,
  delay = 0,
  trigger = "inView",
  direction = "up",
}: ClipRevealProps) {
  const reduced = useReducedMotion();

  // Reduced motion: clip-path is NOT auto-stripped, so drop the wipe entirely
  // and settle in with a plain opacity fade (the prop-object `fade` carries no
  // transition of its own, so the component-level `delay` applies cleanly).
  if (reduced) {
    const play =
      trigger === "mount"
        ? ({ animate: fade.animate } as const)
        : ({ whileInView: fade.animate, viewport: viewportOnce } as const);
    return (
      <m.div
        className={className}
        style={style}
        initial={fade.initial}
        {...play}
        transition={{ ...revealTransition, delay }}
      >
        {children}
      </m.div>
    );
  }

  // A variant's own transition overrides the component `transition` prop, so
  // fold `delay` into the variant rather than passing it alongside.
  const base = wipeVariants(direction) as {
    initial: TargetAndTransition;
    animate: TargetAndTransition;
  };
  const variants: Variants = {
    initial: base.initial,
    animate: { ...base.animate, transition: { ...revealTransition, delay } },
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
