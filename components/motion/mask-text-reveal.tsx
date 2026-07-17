"use client";

import * as m from "motion/react-m";
import {
  type CSSProperties,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
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

type Tag = keyof typeof TAGS;
type HostProps = { className?: string; style?: CSSProperties; children?: ReactNode };

type MaskTextRevealProps = {
  /** A single host element (h1–h6 / p / span / div) whose own children is a
   *  plain string. MaskTextReveal reconstructs THAT element as the animated one —
   *  its tag, className + style win; no extra DOM wrapper is added. */
  children: ReactNode;
  delay?: number;
  by?: "word" | "line";
  trigger?: "inView" | "mount";
};

/** Text slides up out of a hard mask — no fade, crisp editorial. Per token an
 *  overflow-hidden wrapper clips an inner span that rises from below (110% → 0). */
export function MaskTextReveal({
  children,
  delay = 0,
  by = "word",
  trigger = "inView",
}: MaskTextRevealProps) {
  const play =
    trigger === "mount"
      ? ({ animate: "animate" } as const)
      : ({ whileInView: "animate", viewport: viewportOnce } as const);

  // Read the wrapped element's tag + props + string text so we can re-render it
  // as the matching m[tag] carrying the stagger — the caller's tag/className win.
  const child = isValidElement(children) ? (children as ReactElement<HostProps>) : null;
  const tag = child && typeof child.type === "string" ? child.type : null;
  const text = child && typeof child.props.children === "string" ? child.props.children : null;

  // Fail soft: if the child isn't a single host element wrapping a plain string,
  // render it untouched (unanimated) rather than crash.
  if (!child || !tag || !(tag in TAGS) || text === null) {
    return <>{children}</>;
  }

  const Container = TAGS[tag as Tag] as typeof m.span;
  const { className, style } = child.props;
  const step = by === "line" ? feel.lineStagger : feel.textStagger;
  // Headings permit an accessible name; generic tags (span/div/p) don't — so an
  // aria-label there is prohibited. role="img" lets the label name the composite
  // while the per-token masks stay aria-hidden.
  const isHeading = tag.length === 2 && tag.startsWith("h");
  const tokens =
    by === "line"
      ? text
          .split("\n")
          .map((line) => line.trim())
          .filter(Boolean)
      : text.trim().split(/\s+/);

  return (
    // aria-label carries the full string so SR reads it whole, not per-mask.
    <Container
      className={className}
      style={style}
      aria-label={text}
      role={isHeading ? undefined : "img"}
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
