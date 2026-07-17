"use client";

import * as m from "motion/react-m";
import type { CSSProperties } from "react";
import { lineRevealContainer, lineRevealItem, viewportOnce } from "@/lib/motion";

type LineRevealProps = {
  children: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  trigger?: "inView" | "mount";
};

/** Per-line rise + fade, staggered and calm — for body copy / multiline blocks.
 *  Splits on "\n"; each line clips inside its own overflow-hidden wrapper so the
 *  rise reads as an emerge, not a slide. Transform-only (provider handles reduced
 *  motion). aria-label carries the whole text so SR reads it as one passage. */
export function LineReveal({
  children,
  className,
  style,
  delay = 0,
  trigger = "inView",
}: LineRevealProps) {
  const lines = children
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const play =
    trigger === "mount"
      ? ({ animate: "animate" } as const)
      : ({ whileInView: "animate", viewport: viewportOnce } as const);

  return (
    <m.div
      className={className}
      style={style}
      aria-label={children}
      variants={lineRevealContainer(delay)}
      initial="initial"
      {...play}
    >
      {lines.map((line, li) => {
        const lineKey = `l${li}`;
        return (
          <span key={lineKey} aria-hidden style={{ display: "block", overflow: "hidden" }}>
            <m.span variants={lineRevealItem} style={{ display: "block" }}>
              {line}
            </m.span>
          </span>
        );
      })}
    </m.div>
  );
}
