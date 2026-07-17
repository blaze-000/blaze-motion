"use client";

import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { revealTransition, scaleXReveal, viewportOnce } from "@/lib/motion";

type Props = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  trigger?: "inView" | "mount";
};

/**
 * A rule / underline / divider draws open — scaleX 0 → 1 + fade from the left.
 * Self-contained by default: `<ScaleXReveal className="h-px w-full bg-border" />`.
 * If you do pass text children, put it in an inner un-scaled span — this
 * component scales the whole element horizontally, which would otherwise
 * squash the text as it draws in.
 */
export function ScaleXReveal({ children, className, style, delay = 0, trigger = "inView" }: Props) {
  const play =
    trigger === "mount"
      ? ({ animate: scaleXReveal.animate } as const)
      : ({ whileInView: scaleXReveal.animate, viewport: viewportOnce } as const);

  return (
    <m.div
      className={className}
      style={{ transformOrigin: "left", ...style }}
      initial={scaleXReveal.initial}
      {...play}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </m.div>
  );
}
