import type { TargetAndTransition, Transition, Variants } from "motion/react";

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
  /** scale a ScaleIn tween settles up FROM (tween, never spring — that's SpringPop) */
  scaleFrom: 0.95,
  /** SlideIn translate TIERS in px — `base` reuses `rise` (28); see `slideDistance` */
  distance: { tight: 8, hero: 64 },
  /** seconds between staggered lines (LineReveal / MaskTextReveal by line) */
  lineStagger: 0.08,
  /** px a LineReveal line rises from — between a word rise and a section rise */
  lineRise: 14,
  /** scale a GrowFromOrigin element grows up FROM, anchored to its transform-origin */
  growScale: 0.85,
  /** degrees a PerspectiveTiltIn element rotates on X from → 0 */
  tiltAngle: 8,
  /** px transform-perspective depth for PerspectiveTiltIn's rotateX */
  perspective: 800,
  /** percent a InsetFrameReveal clip-path insets uniformly from → 0% */
  frameInset: 15,
  /** px a BlurFadeRise element blurs + rises from */
  blurRise: 6,
  /** hover magnitudes — subtle & measured; a fast STRAIGHT tween settles them (no overshoot). */
  hover: {
    /** px a `lift` element rises on hover (negative = up) */
    lift: -4,
    /** scale a `scale` element grows to on hover */
    scale: 1.03,
    /** degrees a `tilt` element rotates on hover */
    tilt: -1.5,
    /** scale the subtle whileTap press-down settles to */
    press: 0.98,
    /** `glow` — soft accent shadow: brand-coral rgb, hover alpha, blur + spread px */
    glow: { rgb: "240, 104, 78", alpha: 0.35, blur: 24, spread: 2 },
  },
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

/* ── Entrance components (CARD-025 wave) — all straight `feel.ease` tweens ── */

/** 8 travel directions a <SlideIn> enters along (diagonals move on both axes). */
export type SlideDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right";

/** The three <SlideIn> distance tiers — `base` reuses `feel.rise`. */
export const slideDistance = {
  tight: feel.distance.tight,
  base: feel.rise,
  hero: feel.distance.hero,
} as const;

// Unit sign per direction — travel dir → the offset it enters FROM (× distance).
const slideOffset: Record<SlideDirection, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  "up-left": { x: 1, y: 1 },
  "up-right": { x: -1, y: 1 },
  "down-left": { x: 1, y: -1 },
  "down-right": { x: -1, y: -1 },
};

/** fade + translate from `direction`; `distance` px defaults to the `base` tier. */
export const slideVariants = (
  direction: SlideDirection,
  distance: number = feel.rise,
): Variants => {
  const { x, y } = slideOffset[direction];
  return {
    initial: { opacity: 0, x: x * distance, y: y * distance },
    animate: { opacity: 1, x: 0, y: 0, transition: revealTransition },
  };
};

/** fade + scale-UP settle — a plain ease-out TWEEN (never a spring; that's SpringPop). */
export const scaleIn = {
  initial: { opacity: 0, scale: feel.scaleFrom },
  animate: { opacity: 1, scale: 1 },
} as const;

/** 4 edges a <ClipReveal> wipe reveals along; the box stays put. */
export type WipeDirection = "up" | "down" | "left" | "right";

// inset(T R B L) — one edge starts fully clipped (100%) and retracts to 0%.
// All four strings share identical numeric slots so Motion diffs them cleanly.
const wipeInset: Record<WipeDirection, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 0% 0% 100%)",
  right: "inset(0% 100% 0% 0%)",
};

/** clip-path edge wipe from `direction` → fully open `inset(0% 0% 0% 0%)`. */
export const wipeVariants = (direction: WipeDirection): Variants => ({
  initial: { clipPath: wipeInset[direction] },
  animate: { clipPath: "inset(0% 0% 0% 0%)", transition: revealTransition },
});

/** per-line rise + fade — one <LineReveal> line. Pair with `lineRevealContainer`. */
export const lineRevealItem: Variants = {
  initial: { opacity: 0, y: feel.lineRise },
  animate: { opacity: 1, y: 0, transition: revealTransition },
};

/** <LineReveal> container — reuses the text-stagger factory at the line step. */
export const lineRevealContainer = (delayChildren = 0): Variants =>
  textRevealContainer(feel.lineStagger, delayChildren);

/** transform-origin anchors a <GrowFromOrigin> grows from. */
export type Origin =
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "right"
  | "center";

/** Origin token → CSS `transform-origin` string. */
export const originMap: Record<Origin, string> = {
  top: "top",
  "top-left": "top left",
  "top-right": "top right",
  bottom: "bottom",
  "bottom-left": "bottom left",
  "bottom-right": "bottom right",
  left: "left",
  right: "right",
  center: "center",
};

/** fade + scale-UP from `origin`; transform-origin rides `style` (static, unanimated). */
export const growVariants = (origin: Origin = "center"): Variants => ({
  initial: { opacity: 0, scale: feel.growScale, transformOrigin: originMap[origin] },
  animate: {
    opacity: 1,
    scale: 1,
    transformOrigin: originMap[origin],
    transition: revealTransition,
  },
});

/** fade + scaleX 0 → 1 from the left — a rule / underline draw. */
export const scaleXReveal = {
  initial: { opacity: 0, scaleX: 0, transformOrigin: "left" },
  animate: { opacity: 1, scaleX: 1, transformOrigin: "left" },
} as const;

/** fade + rise + rotateX settle over a perspective — a subtle 3D tilt-in. */
export const perspectiveTilt = {
  initial: {
    opacity: 0,
    y: feel.rise,
    rotateX: feel.tiltAngle,
    transformPerspective: feel.perspective,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transformPerspective: feel.perspective,
  },
} as const;

/** clip-path inset uniform `feel.frameInset`% → 0% — a frame that opens outward. */
export const insetFrameReveal = {
  initial: {
    clipPath: `inset(${feel.frameInset}% ${feel.frameInset}% ${feel.frameInset}% ${feel.frameInset}%)`,
  },
  animate: { clipPath: "inset(0% 0% 0% 0%)" },
} as const;

/** masked line/word — inner rise from below its overflow-hidden wrapper, NO opacity. */
export const maskTextItem: Variants = {
  initial: { y: "110%" },
  animate: { y: 0, transition: revealTransition },
};

/** fade + filter grayscale(1) → grayscale(0) — slow, images only (`filter` is costly). */
export const grayscaleReveal = {
  initial: { opacity: 0, filter: "grayscale(1)" },
  animate: { opacity: 1, filter: "grayscale(0)" },
} as const;

/** fade + blur `feel.blurRise`px → 0 + rise — a soft focus-in (`filter` is costly). */
export const blurFadeRise = {
  initial: { opacity: 0, filter: `blur(${feel.blurRise}px)`, y: feel.blurRise },
  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
} as const;

/* ── Hover (CARD-023) — interactive whileHover, a fast STRAIGHT tween (never a spring) ── */

/** the four ways a <Hover> responds to the pointer. */
export type HoverEffect = "lift" | "scale" | "tilt" | "glow";

/** quick straight settle for hover + tap — fast tween on the tuned ease, no overshoot. */
export const hoverTransition = {
  duration: feel.duration.fast,
  ease: feel.ease,
} as const satisfies Transition;

// Brand-coral glow — a transparent → low-alpha shadow so Motion interpolates it cleanly.
const { rgb: glowRgb, alpha: glowAlpha, blur: glowBlur, spread: glowSpread } = feel.hover.glow;
/** boxShadow endpoints for the `glow` effect — `rest` is fully transparent (same shape). */
export const glowShadow = {
  rest: `0 0 0 0 rgba(${glowRgb}, 0)`,
  hover: `0 0 ${glowBlur}px ${glowSpread}px rgba(${glowRgb}, ${glowAlpha})`,
} as const;

/** subtle press-down shared by every effect's whileTap (a transform — reduced-safe). */
export const hoverPress = { scale: feel.hover.press } as const;

/** whileHover target per effect — every magnitude lives in `feel.hover`. */
export const hoverVariants = (effect: HoverEffect): TargetAndTransition => {
  switch (effect) {
    case "lift":
      return { y: feel.hover.lift };
    case "scale":
      return { scale: feel.hover.scale };
    case "tilt":
      return { rotate: feel.hover.tilt };
    case "glow":
      return { boxShadow: glowShadow.hover };
  }
};
