"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { insetFrameReveal, revealTransition, viewportOnce } from "@/lib/motion";

type InsetFrameRevealProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  trigger?: "inView" | "mount";
};

/** Window settle — a uniform clip-path frame insets in from the edges, then opens to reveal. */
export function InsetFrameReveal({
  children,
  className,
  style,
  delay = 0,
  trigger = "inView",
}: InsetFrameRevealProps) {
  const reducedMotion = useReducedMotion();

  // `clip-path` isn't stripped by the provider's reducedMotion="user" (transforms only),
  // so when reduced motion is on, skip the frame entirely and render the settled state.
  if (reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  const play =
    trigger === "mount"
      ? ({ animate: insetFrameReveal.animate } as const)
      : ({ whileInView: insetFrameReveal.animate, viewport: viewportOnce } as const);

  return (
    <m.div
      className={className}
      style={style}
      initial={insetFrameReveal.initial}
      transition={{ ...revealTransition, delay }}
      {...play}
    >
      {children}
    </m.div>
  );
}
