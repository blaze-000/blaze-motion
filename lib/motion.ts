import type { Transition, Variants } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────
 *  TUNE HERE — the whole engine's feel, in one place.
 *
 *  This is the only block you edit to retune blaze-motion for a project.
 *  Slower project? raise the durations. Faster? lower them. Every
 *  primitive derives from these values, so one edit re-tunes them all.
 *
 *  Per-instance overrides still win: <Reveal delay={0.1} /> etc.
 * ───────────────────────────────────────────────────────────────────── */
export const feel = {
  /** seconds — the three speeds the engine animates at */
  duration: { fast: 0.2, base: 0.55, slow: 0.8 },
  /** the tuned ease-out curve — a straight settle, no spring overshoot */
  ease: [0.22, 0.61, 0.36, 1],
  /** the softer ease used for page transitions */
  easeSoft: [0.4, 0, 0.2, 1],
  /** px a <Reveal> / <StaggerItem> rises from */
  rise: 28,
  /** how much of an element must be in view before it animates (0–1) */
  inView: 0.3,
  /** seconds between staggered children */
  stagger: 0.08,
  /** seconds before the first staggered child */
  staggerDelay: 0.05,
  /** seconds between staggered words (TextReveal, per-word) */
  textStagger: 0.04,
  /** seconds between staggered chars (TextReveal, per-char) */
  textStaggerChar: 0.02,
  /** px a TextReveal word/char rises from — shorter than a section rise */
  textRise: 12,
  /** spring pop — the ONE deliberate overshoot (SpringPop/RadialStagger); never titles */
  spring: { stiffness: 300, damping: 15 },
} as const;
/* ───────────────────────────────────────────────────────────────────── */

// Derived tokens — you rarely touch below this line.

export const durations = feel.duration;

export const ease = { out: feel.ease, soft: feel.easeSoft } as const;

export const revealTransition = {
  duration: feel.duration.base,
  ease: feel.ease,
} as const satisfies Transition;

export const viewportOnce = { once: true, amount: feel.inView } as const;

export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
} as const;

export const fadeUp = {
  initial: { opacity: 0, y: feel.rise },
  animate: { opacity: 1, y: 0 },
} as const;

/** scale-DOWN settle — for LARGE images only (never titles/text). */
export const cinematicScale = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 1, scale: 1 },
} as const;

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: feel.stagger, delayChildren: feel.staggerDelay },
  },
};

export const staggerItem: Variants = {
  initial: { opacity: 0, y: feel.rise },
  animate: { opacity: 1, y: 0, transition: revealTransition },
};

/** spring overshoot — the 0.8 → ~1.05 → 1 pop comes from the spring itself. */
export const springPopTransition = {
  type: "spring",
  stiffness: feel.spring.stiffness,
  damping: feel.spring.damping,
} as const satisfies Transition;

export const springPop = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
} as const;

/** blur → sharp; `filter` is GPU-costly — hero / single-focal use only. */
export const blurToFocus = {
  initial: { opacity: 0, filter: "blur(10px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
} as const;

/** per-word / per-char reveal — STRAIGHT rise, NO scale (the title rule). */
export const textRevealItem: Variants = {
  initial: { opacity: 0, y: feel.textRise },
  animate: { opacity: 1, y: 0, transition: revealTransition },
};

// Factory: TextReveal tunes its step per word vs char, plus an optional lead delay.
export const textRevealContainer = (
  staggerChildren: number = feel.textStagger,
  delayChildren = 0,
): Variants => ({
  initial: {},
  animate: { transition: { staggerChildren, delayChildren } },
});
