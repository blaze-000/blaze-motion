export type NavItem = { id: string; label: string };
export type NavGroup = { group: string; items: NavItem[] };

export const DOCS_NAV: NavGroup[] = [
  {
    group: "Getting Started",
    items: [
      { id: "installation", label: "Installation" },
      { id: "provider-setup", label: "Provider Setup" },
    ],
  },
  {
    group: "Primitives",
    items: [
      { id: "fadein", label: "FadeIn" },
      { id: "reveal", label: "Reveal" },
      { id: "stagger", label: "Stagger" },
      { id: "cinematicimage", label: "CinematicImage" },
      { id: "pagetransition", label: "PageTransition" },
    ],
  },
  {
    group: "Entrance",
    items: [
      { id: "springpop", label: "SpringPop" },
      { id: "blurtofocus", label: "BlurToFocus" },
      { id: "linedraw", label: "LineDraw" },
    ],
  },
  {
    group: "Hover",
    items: [
      { id: "animatedunderline", label: "AnimatedUnderline" },
      { id: "siblingdimming", label: "SiblingDimming" },
    ],
  },
  {
    group: "Stagger",
    items: [{ id: "radialstagger", label: "RadialStagger" }],
  },
  {
    group: "Text & Numbers",
    items: [
      { id: "textreveal", label: "TextReveal" },
      { id: "numberticker", label: "NumberTicker" },
      { id: "scrollprogressbar", label: "ScrollProgressBar" },
    ],
  },
];

export const DOCS_FLAT: NavItem[] = DOCS_NAV.flatMap((g) => g.items);

export type PropRow = { prop: string; type: string; def: string; desc: string };

const PASSTHROUGH: PropRow[] = [
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — the primitive becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
];

// `satisfies` (not `: Record<string, PropRow[]>`) checks every value against
// PropRow[] while keeping the literal key union, so `keyof typeof PROPS` narrows
// to the exact keys and indexed lookups (PROPS[p.propsKey]) resolve to PropRow[]
// instead of PropRow[] | undefined under noUncheckedIndexedAccess.
export const PROPS = {
  provider: [
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "Your whole app tree, wrapped once at the root.",
    },
  ],
  fadein: [
    { prop: "children", type: "ReactNode", def: "—", desc: "Content that fades in on mount." },
    ...PASSTHROUGH,
    { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
  ],
  reveal: [
    { prop: "children", type: "ReactNode", def: "—", desc: "Content that rises into view, once." },
    ...PASSTHROUGH,
    { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
  ],
  stagger: [
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "StaggerItem children, revealed in sequence.",
    },
    ...PASSTHROUGH,
    {
      prop: "staggerChildren",
      type: "number",
      def: "0.08",
      desc: "Seconds between each child — the tunable linear step.",
    },
    {
      prop: "delayChildren",
      type: "number",
      def: "0.05",
      desc: "Seconds before the first child begins.",
    },
  ],
  staggerItem: [
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "A single item in the stagger sequence.",
    },
    ...PASSTHROUGH,
  ],
  springpop: [
    { prop: "children", type: "ReactNode", def: "—", desc: "Content that pops in on mount." },
    ...PASSTHROUGH,
    { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
  ],
  blurtofocus: [
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "A single focal element — hero art, one image. Not lists.",
    },
    ...PASSTHROUGH,
    { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
  ],
  linedraw: [
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "LineDrawPath elements — each inherits the draw sequence.",
    },
    {
      prop: "...svg",
      type: "SVGProps",
      def: "—",
      desc: "All <svg> attributes — viewBox, fill, stroke, width. viewBox is required.",
    },
    ...PASSTHROUGH,
    {
      prop: "delay",
      type: "number",
      def: "0",
      desc: "Seconds before the first path draws (delayChildren).",
    },
    {
      prop: "stagger",
      type: "number",
      def: "0",
      desc: "Seconds between paths — >0 cascades a multi-path draw.",
    },
  ],
  linedrawpath: [
    {
      prop: "d",
      type: "string",
      def: "—",
      desc: "The SVG path data — required for a visible stroke.",
    },
    {
      prop: "strokeLinecap",
      type: "string",
      def: '"round"',
      desc: "Passed to the path; round reads best for a drawn line.",
    },
    {
      prop: "...path",
      type: "SVGProps",
      def: "—",
      desc: "All <path> attributes — stroke, strokeWidth, fill, className.",
    },
  ],
  animatedunderline: [
    {
      prop: "as",
      type: "ElementType",
      def: '"a"',
      desc: "Element or component to render — pass Link for internal nav.",
    },
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "The link text the underline draws beneath.",
    },
    { prop: "className", type: "string", def: "—", desc: "Classes for the rendered element." },
    {
      prop: "underlineClassName",
      type: "string",
      def: "h-0.5 bg-current",
      desc: "Override the underline bar (thickness, color).",
    },
  ],
  siblingdimming: [
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "SiblingDimmingItem cards. Put grid/flex classes on this container.",
    },
    ...PASSTHROUGH,
  ],
  siblingdimmingitem: [
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "One card — dims to 50% when a sibling is hovered.",
    },
    ...PASSTHROUGH,
  ],
  radialstagger: [
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "Grid tiles — each wrapped in a clickable cell button.",
    },
    ...PASSTHROUGH,
    {
      prop: "itemClassName",
      type: "string",
      def: "—",
      desc: "Classes for each tile — aspect, radius, background.",
    },
    {
      prop: "columns",
      type: "number",
      def: "4",
      desc: "Grid columns; drives both layout and the ripple geometry.",
    },
    {
      prop: "step",
      type: "number",
      def: "0.08",
      desc: "Seconds added per unit of distance from the clicked origin.",
    },
    {
      prop: "distance",
      type: '"euclidean" | "manhattan" | "chebyshev"',
      def: '"euclidean"',
      desc: "How ring distance is measured — circular, diamond, or square.",
    },
    {
      prop: "defaultOrigin",
      type: "number",
      def: "0",
      desc: "Tile index the first cascade ripples out from, before any click.",
    },
  ],
  textreveal: [
    {
      prop: "children",
      type: "string",
      def: "—",
      desc: "The text to split and animate; carried whole on aria-label.",
    },
    ...PASSTHROUGH,
    {
      prop: "delay",
      type: "number",
      def: "0",
      desc: "Lead delay before the first word/char rises.",
    },
    { prop: "by", type: '"word" | "char"', def: '"word"', desc: "Split granularity." },
    {
      prop: "as",
      type: "span | div | p | h1–h6",
      def: '"span"',
      desc: "Element the text renders as.",
    },
    {
      prop: "stagger",
      type: "number",
      def: "0.04 / 0.02",
      desc: "Per-child step — defaults per word / per char.",
    },
    {
      prop: "trigger",
      type: '"inView" | "mount"',
      def: '"inView"',
      desc: "Animate on scroll-into-view (once) or immediately on mount.",
    },
  ],
  numberticker: [
    {
      prop: "value",
      type: "number",
      def: "—",
      desc: "Target the count settles on when scrolled into view.",
    },
    { prop: "from", type: "number", def: "0", desc: "Starting value." },
    { prop: "duration", type: "number", def: "1.2", desc: "Seconds the count-up runs." },
    {
      prop: "decimals",
      type: "number",
      def: "0",
      desc: "Fixed decimal places (locale-formatted).",
    },
    { prop: "prefix", type: "string", def: '""', desc: "Text before the number — e.g. $." },
    { prop: "suffix", type: "string", def: '""', desc: "Text after the number — e.g. + or %." },
    ...PASSTHROUGH,
  ],
  scrollprogressbar: [
    ...PASSTHROUGH,
    { prop: "height", type: "number", def: "3", desc: "Bar thickness in px." },
    {
      prop: "position",
      type: '"top" | "bottom"',
      def: '"top"',
      desc: "Which edge the fixed bar pins to.",
    },
    {
      prop: "target",
      type: "RefObject",
      def: "whole page",
      desc: "Track an element's progress through the viewport instead of page scroll.",
    },
    { prop: "color", type: "string", def: "bg-signal", desc: "Override the fill color." },
  ],
  cinematicimage: [
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "A large image; the wrapper must carry overflow-hidden.",
    },
    ...PASSTHROUGH,
  ],
  pagetransition: [
    { prop: "children", type: "ReactNode", def: "—", desc: "The route content to fade + shift." },
    {
      prop: "routeKey",
      type: "string",
      def: "—",
      desc: "Unique key per route (never `key` — React strips it).",
    },
    ...PASSTHROUGH,
  ],
} satisfies Record<string, PropRow[]>;
