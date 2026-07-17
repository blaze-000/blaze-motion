"use client";

import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { perspectiveTilt, revealTransition, viewportOnce } from "@/lib/motion";

type PerspectiveTiltInProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  trigger?: "inView" | "mount";
};

/**
 * Reveal + a whisper of depth — rise + rotateX settle over a perspective,
 * one straight ease-out, no spring. Transform-only (translate/rotate), so
 * the app-level `reducedMotion="user"` provider strips it automatically —
 * no manual guard needed here.
 */
export function PerspectiveTiltIn({
  children,
  className,
  style,
  delay = 0,
  trigger = "inView",
}: PerspectiveTiltInProps) {
  const play =
    trigger === "mount"
      ? ({ animate: perspectiveTilt.animate } as const)
      : ({ whileInView: perspectiveTilt.animate, viewport: viewportOnce } as const);

  return (
    <m.div
      className={className}
      style={style}
      initial={perspectiveTilt.initial}
      {...play}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </m.div>
  );
}
