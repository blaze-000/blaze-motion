"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Mount ONCE in your root layout, wrapping {children}.
 * LazyMotion `strict` means primitives must import `m` from "motion/react-m" —
 * a raw `motion.*` will throw. `reducedMotion="user"` honors the OS setting.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
