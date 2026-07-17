import type { ComponentType } from "react";
import type { PropRow } from "./docs-data";

// Re-export so every entry file imports its types from ONE place (this map),
// never reaching into docs-data directly.
export type { PropRow } from "./docs-data";

/* ─────────────────────────────────────────────────────────────────────
 *  THE ENTRY-FILE CONTRACT
 *
 *  Each components/docs/entries/<slug>.tsx default-exports a `DocEntry`.
 *  It is a SERVER module (no "use client" at the top) so the page can read
 *  its `usage` / `props` DATA directly. `Demo` may still render client
 *  motion primitives — a server component is allowed to render client
 *  children. Only reach for "use client" (in a sibling <slug>.demo file that
 *  the entry imports) when the demo needs React state/hooks of its own.
 * ───────────────────────────────────────────────────────────────────── */

/** One labelled, copyable usage snippet shown in the Usage section. */
export type UsageSnippet = {
  /** short heading above the snippet — the variant / prop it demonstrates */
  label: string;
  /** the tsx source, shown highlighted with a copy button */
  code: string;
  /** optional one-liner under the label */
  note?: string;
};

/** A companion props table (e.g. StaggerItem, LineDrawPath). */
export type SecondaryProps = {
  heading: string;
  rows: PropRow[];
};

/** The default export of every entry file. */
export type DocEntry = {
  /** the live preview — composes the real component. Server component unless
   *  it needs its own state, in which case import it from a "use client" sibling. */
  Demo: ComponentType;
  /** labelled snippets covering the component's variants + props */
  usage: UsageSnippet[];
  /** the primary props/API table (optional — omit for prop-less components) */
  props?: PropRow[];
  /** an optional second table for a companion export */
  secondaryProps?: SecondaryProps;
};

/* ─────────────────────────────────────────────────────────────────────
 *  THE CENTRAL COMPONENT MAP — all 26 components, metadata only.
 *  Written ONCE here; fan-out agents only ADD entry files, never edit this.
 * ───────────────────────────────────────────────────────────────────── */

export type DocCategory =
  | "Fade"
  | "Reveal"
  | "Slide"
  | "Scale"
  | "Clip"
  | "Text"
  | "Hover"
  | "Stagger"
  | "Scroll"
  | "SVG"
  | "Image"
  | "Routing";

export type DocMeta = {
  slug: string;
  title: string;
  description: string;
  category: DocCategory;
};

/** Category display order for the /docs index. */
export const CATEGORY_ORDER: DocCategory[] = [
  "Fade",
  "Reveal",
  "Slide",
  "Scale",
  "Clip",
  "Text",
  "Hover",
  "Stagger",
  "Scroll",
  "SVG",
  "Image",
  "Routing",
];

export const DOC_COMPONENTS: DocMeta[] = [
  {
    slug: "fade-in",
    title: "Fade In",
    description: "Pure opacity fade — for above-the-fold, on-mount reveals.",
    category: "Fade",
  },
  {
    slug: "blur-fade-rise",
    title: "Blur Fade Rise",
    description:
      "Soft focus-in — fade + blur(6px → 0) + a short rise; reduced-motion gets a plain fade.",
    category: "Fade",
  },
  {
    slug: "blur-to-focus",
    title: "Blur to Focus",
    description:
      "Blur-to-focus entrance — a gentle blur + opacity settle for a single focal element.",
    category: "Fade",
  },
  {
    slug: "reveal",
    title: "Reveal",
    description: "Scroll reveal — a straight rise from below the first time it enters view.",
    category: "Reveal",
  },
  {
    slug: "perspective-tilt-in",
    title: "Perspective Tilt In",
    description: "Reveal with a whisper of depth — rise + rotateX settle over a perspective.",
    category: "Reveal",
  },
  {
    slug: "slide-in",
    title: "Slide In",
    description:
      "Directional slide-in — content slides in from a chosen direction and distance tier, with fade.",
    category: "Slide",
  },
  {
    slug: "scale-in",
    title: "Scale In",
    description: "Soft 0.95 → 1 grow + fade on a straight ease tween, never a spring.",
    category: "Scale",
  },
  {
    slug: "scale-x-reveal",
    title: "Scale X Reveal",
    description: "A rule / divider draws open — scaleX 0 → 1 + fade from the left.",
    category: "Scale",
  },
  {
    slug: "grow-from-origin",
    title: "Grow from Origin",
    description:
      "Fade + scale (~0.85 → 1) anchored to a transform-origin corner — the dropdown/popover entrance.",
    category: "Scale",
  },
  {
    slug: "spring-pop",
    title: "Spring Pop",
    description:
      "Spring pop entrance — a natural ~1.05 overshoot that emerges from the spring itself.",
    category: "Scale",
  },
  {
    slug: "clip-reveal",
    title: "Clip Reveal",
    description: "Directional clip/wipe reveal — content wipes open from a chosen edge.",
    category: "Clip",
  },
  {
    slug: "inset-frame-reveal",
    title: "Inset Frame Reveal",
    description: "Window settle — a uniform clip-path frame insets in from the edges, then opens.",
    category: "Clip",
  },
  {
    slug: "text-reveal",
    title: "Text Reveal",
    description:
      "Word-by-word text reveal — tokens rise and fade in sequence as the line enters view.",
    category: "Text",
  },
  {
    slug: "mask-text-reveal",
    title: "Mask Text Reveal",
    description: "Masked text reveal — words rise out from behind a clip mask, token by token.",
    category: "Text",
  },
  {
    slug: "line-reveal",
    title: "Line Reveal",
    description: "Per-line rise + fade, staggered and calm — each line clips inside its own mask.",
    category: "Text",
  },
  {
    slug: "hover",
    title: "Hover",
    description:
      "Measured hover-response wrapper — a straight, tunable settle as the element answers the pointer.",
    category: "Hover",
  },
  {
    slug: "animated-underline",
    title: "Animated Underline",
    description:
      "Underline that draws left-to-right on hover and retracts out to the right on leave.",
    category: "Hover",
  },
  {
    slug: "sibling-dimming",
    title: "Sibling Dimming",
    description:
      "Sibling dimming — hovering one item dims every non-hovered sibling to 50%. Pure CSS.",
    category: "Hover",
  },
  {
    slug: "stagger",
    title: "Stagger",
    description:
      "Linear stagger — children rise into view in sequence with a tunable per-child step.",
    category: "Stagger",
  },
  {
    slug: "radial-stagger",
    title: "Radial Stagger",
    description:
      "Radial stagger — grid tiles spring in, ordered by their distance from a center point.",
    category: "Stagger",
  },
  {
    slug: "scroll-progress-bar",
    title: "Scroll Progress Bar",
    description:
      "Scroll progress bar — a spring-smoothed bar tracking page (or a target element's) scroll.",
    category: "Scroll",
  },
  {
    slug: "number-ticker",
    title: "Number Ticker",
    description: "Animated number ticker — counts up to a value when it scrolls into view.",
    category: "Scroll",
  },
  {
    slug: "line-draw",
    title: "Line Draw",
    description:
      "SVG line draw — each path draws its stroke, then its fill fades in once the stroke completes.",
    category: "SVG",
  },
  {
    slug: "cinematic-image",
    title: "Cinematic Image",
    description:
      "Cinematic scale-down settle (110% → 100%) for large images in an overflow-hidden frame.",
    category: "Image",
  },
  {
    slug: "grayscale-reveal",
    title: "Grayscale Reveal",
    description:
      "Grayscale → color image reveal — grayscale(1) fades to grayscale(0) alongside opacity.",
    category: "Image",
  },
  {
    slug: "page-transition",
    title: "Page Transition",
    description: "Route transition — fades and shifts the page on route-key change.",
    category: "Routing",
  },
];

const BY_SLUG = new Map(DOC_COMPONENTS.map((c) => [c.slug, c]));

/** Metadata for one slug, or undefined if the slug is not a known component. */
export function getDocMeta(slug: string): DocMeta | undefined {
  return BY_SLUG.get(slug);
}

/** Components grouped by category, in CATEGORY_ORDER (empty groups dropped). */
export function componentsByCategory(): { category: DocCategory; items: DocMeta[] }[] {
  return CATEGORY_ORDER.map((category) => ({
    category,
    items: DOC_COMPONENTS.filter((c) => c.category === category),
  })).filter((g) => g.items.length > 0);
}

/**
 * Lazily load a slug's entry module by convention (components/docs/entries/<slug>.tsx).
 * Returns null when the entry file does not exist yet — the page degrades to
 * install + source only, so every route builds through this phase's fan-out.
 */
export async function loadDocEntry(slug: string): Promise<DocEntry | null> {
  try {
    const mod = await import(`./entries/${slug}`);
    return (mod.default ?? null) as DocEntry | null;
  } catch {
    return null;
  }
}
