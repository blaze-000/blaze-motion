"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { blurFadeRise, revealTransition, viewportOnce } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  trigger?: "inView" | "mount";
};

/**
 * Soft focus-in — fade + blur(6px → 0) + a short rise, magicui-style.
 * `filter` isn't stripped by the reducedMotion provider (only transforms are),
 * so this guards manually: reduced-motion users get a plain opacity fade with
 * no blur or rise. Single-element use — blur sparingly, never on stagger children.
 */
export function BlurFadeRise({ children, className, style, delay = 0, trigger = "inView" }: Props) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? { opacity: 0 } : blurFadeRise.initial;
  const target = reduceMotion ? { opacity: 1 } : blurFadeRise.animate;
  const play =
    trigger === "mount"
      ? ({ animate: target } as const)
      : ({ whileInView: target, viewport: viewportOnce } as const);

  return (
    <m.div
      className={className}
      style={style}
      initial={initial}
      {...play}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </m.div>
  );
}
