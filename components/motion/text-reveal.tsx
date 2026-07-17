"use client";

import * as m from "motion/react-m";
import {
  type CSSProperties,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { feel, textRevealContainer, textRevealItem, viewportOnce } from "@/lib/motion";

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

type TextRevealProps = {
  /** A single host element (h1–h6 / p / span / div) whose own children is a
   *  plain string. TextReveal reconstructs THAT element as the animated one —
   *  its tag, className + style win; no extra DOM wrapper is added. */
  children: ReactNode;
  delay?: number;
  by?: "word" | "char";
  stagger?: number;
  trigger?: "inView" | "mount";
};

export function TextReveal({
  children,
  delay = 0,
  by = "word",
  stagger,
  trigger = "inView",
}: TextRevealProps) {
  const step = stagger ?? (by === "char" ? feel.textStaggerChar : feel.textStagger);
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
  const words = text.trim().split(/\s+/);
  // Headings permit an accessible name; generic tags (span/div/p) don't — so an
  // aria-label there is prohibited. role="img" lets the label name the composite
  // while the per-token spans stay aria-hidden (no char-by-char read).
  const isHeading = tag.length === 2 && tag.startsWith("h");

  return (
    // aria-label carries the full string so SR reads it whole, not per-span.
    <Container
      className={className}
      style={style}
      aria-label={text}
      role={isHeading ? undefined : "img"}
      variants={textRevealContainer(step, delay)}
      initial="initial"
      {...play}
    >
      {words.map((word, wi) => {
        const wordKey = `w${wi}`;
        return (
          <Fragment key={wordKey}>
            {by === "word" ? (
              <m.span aria-hidden variants={textRevealItem} style={{ display: "inline-block" }}>
                {word}
              </m.span>
            ) : (
              <span aria-hidden style={{ display: "inline-block" }}>
                {Array.from(word).map((ch, ci) => {
                  const charKey = `${wordKey}c${ci}`;
                  return (
                    <m.span
                      key={charKey}
                      variants={textRevealItem}
                      style={{ display: "inline-block" }}
                    >
                      {ch}
                    </m.span>
                  );
                })}
              </span>
            )}
            {wi < words.length - 1 ? " " : null}
          </Fragment>
        );
      })}
    </Container>
  );
}
