"use client";

import * as m from "motion/react-m";
import type { CSSProperties } from "react";
import { Fragment } from "react";
import { feel, maskTextItem, textRevealContainer, viewportOnce } from "@/lib/motion";

const TAGS = {
  span: m.span,
  div: m.div,
  p: m.p,
  h1: m.h1,
  h2: m.h2,
  h3: m.h3,
  h4: m.h4,
  h5: m.h5,
  h6: m.h6,
} as const;

type MaskTextRevealProps = {
  children: string;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  by?: "word" | "line";
  as?: keyof typeof TAGS;
  trigger?: "inView" | "mount";
};

/** Text slides up out of a hard mask — no fade, crisp editorial. Per token an
 *  overflow-hidden wrapper clips an inner span that rises from below (110% → 0). */
export function MaskTextReveal({
  children,
  className,
  style,
  delay = 0,
  by = "word",
  as = "span",
  trigger = "inView",
}: MaskTextRevealProps) {
  const Container = TAGS[as] as typeof m.span;
  const step = by === "line" ? feel.lineStagger : feel.textStagger;
  const tokens =
    by === "line"
      ? children
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      : children.trim().split(/\s+/);
  const play =
    trigger === "mount"
      ? ({ animate: "animate" } as const)
      : ({ whileInView: "animate", viewport: viewportOnce } as const);

  return (
    // aria-label carries the full string so SR reads it whole, not per-mask.
    <Container
      className={className}
      style={style}
      aria-label={children}
      variants={textRevealContainer(step, delay)}
      initial="initial"
      {...play}
    >
      {tokens.map((token, ti) => {
        const tokenKey = `t${ti}`;
        return (
          <Fragment key={tokenKey}>
            <span
              aria-hidden
              style={{ display: by === "line" ? "block" : "inline-block", overflow: "hidden" }}
            >
              <m.span variants={maskTextItem} style={{ display: "inline-block" }}>
                {token}
              </m.span>
            </span>
            {by === "word" && ti < tokens.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Container>
  );
}
