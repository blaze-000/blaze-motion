"use client";

import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { revealTransition, scaleIn, viewportOnce } from "@/lib/motion";

type ScaleInProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  trigger?: "inView" | "mount";
};

/** Soft 0.95 → 1 grow + fade — a straight ease tween, never a spring. */
export function ScaleIn({
  children,
  className,
  style,
  delay = 0,
  trigger = "inView",
}: ScaleInProps) {
  const play =
    trigger === "mount"
      ? ({ animate: scaleIn.animate } as const)
      : ({ whileInView: scaleIn.animate, viewport: viewportOnce } as const);

  return (
    <m.div
      className={className}
      style={style}
      initial={scaleIn.initial}
      {...play}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </m.div>
  );
}
