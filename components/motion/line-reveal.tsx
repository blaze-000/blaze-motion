"use client";

import * as m from "motion/react-m";
import { type CSSProperties, isValidElement, type ReactElement, type ReactNode } from "react";
import { lineRevealContainer, lineRevealItem, viewportOnce } from "@/lib/motion";

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

type LineRevealProps = {
  /** A single host element (h1–h6 / p / span / div) whose own children is a
   *  plain string (split on "\n"). LineReveal reconstructs THAT element as the
   *  animated one — its tag, className + style win; no extra DOM wrapper. */
  children: ReactNode;
  delay?: number;
  trigger?: "inView" | "mount";
};

/** Per-line rise + fade, staggered and calm — for body copy / multiline blocks.
 *  Splits the wrapped element's string on "\n"; each line clips inside its own
 *  overflow-hidden wrapper so the rise reads as an emerge, not a slide.
 *  Transform-only (provider handles reduced motion). aria-label carries the whole
 *  text so SR reads it as one passage. */
export function LineReveal({ children, delay = 0, trigger = "inView" }: LineRevealProps) {
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

  const Container = TAGS[tag as Tag] as typeof m.div;
  const { className, style } = child.props;
  const lines = text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  // Headings permit an accessible name; generic tags (span/div/p) don't — so an
  // aria-label there is prohibited. role="img" lets the label name the composite
  // while the per-line masks stay aria-hidden.
  const isHeading = tag.length === 2 && tag.startsWith("h");

  return (
    <Container
      className={className}
      style={style}
      aria-label={text}
      role={isHeading ? undefined : "img"}
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
    </Container>
  );
}
