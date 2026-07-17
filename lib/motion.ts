import type { TargetAndTransition, Transition, Variants } from "motion/react";

/* ─────────────────────────────────────────────────────────────────────
 *  TUNE HERE — the whole engine's feel, in one place.
 *
 *  This is the only block you edit to retune blaze-motion for a project.
 *  Slower project? raise the durations. Faster? lower them. Every
 *  primitive derives from these values, so one edit re-tunes them all.
 *
 *  Per-instance overrides still win: <Fade delay={0.1} /> etc.
 * ───────────────────────────────────────────────────────────────────── */
export const feel = {
  /** seconds — the three speeds the engine animates at */
  duration: { fast: 0.2, base: 0.55, slow: 0.8 },
  /** the tuned ease-out curve — a straight settle, no spring overshoot */
  ease: [0.22, 0.61, 0.36, 1],
  /** the softer ease used for page transitions */
  easeSoft: [0.4, 0, 0.2, 1],
  /** px a <StaggerItem> rises from (also Slide's `base` distance tier) */
  rise: 28,
  /** px a <Fade> drifts from — a FIXED, subtle reveal drift (Slide owns tunable travel) */
  fadeShift: 16,
  /** px a <Fade blur> focus-settles from — blur(Npx) → 0, opt-in (`filter` is GPU-costly) */
  fadeBlur: 8,
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
  /** Slide translate TIERS in px — `base` reuses `rise` (28); see `slideDistance` */
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

/** 5 directions a <Fade> drifts from as it fades in; `"none"` = pure opacity, no transform. */
export type FadeDirection = "none" | "up" | "down" | "left" | "right";

// Unit sign per direction → the offset it drifts FROM (× feel.fadeShift). Mirrors slideOffset.
const fadeOffset: Record<FadeDirection, { x: number; y: number }> = {
  none: { x: 0, y: 0 },
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

/**
 * <Fade> variants — fade + a FIXED subtle drift from `direction`, plus an optional
 * `blur`px → 0 focus-settle layered on top. The drift is fixed at `feel.fadeShift`
 * (tunable travel is Slide's job). No transition is baked in — the component folds
 * `delay` into `animate.transition` itself (the L004 variant-transition idiom).
 */
export const fadeVariants = (direction: FadeDirection = "up", blur = 0): Variants => {
  const { x, y } = fadeOffset[direction];
  const initial: TargetAndTransition = { opacity: 0, x: x * feel.fadeShift, y: y * feel.fadeShift };
  const animate: TargetAndTransition = { opacity: 1, x: 0, y: 0 };
  if (blur > 0) {
    initial.filter = `blur(${blur}px)`;
    animate.filter = "blur(0px)";
  }
  return { initial, animate };
};

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

/** 8 travel directions a <Slide> enters along (diagonals move on both axes). */
export type SlideDirection =
  | "up"
  | "down"
  | "left"
  | "right"
  | "up-left"
  | "up-right"
  | "down-left"
  | "down-right";

/** The three <Slide> distance tiers — `base` reuses `feel.rise`. */
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
