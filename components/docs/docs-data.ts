export type NavItem = { id: string; label: string };
export type NavGroup = { group: string; items: NavItem[] };

export const DOCS_NAV: NavGroup[] = [
  {
    group: "Getting Started",
    items: [
      { id: "installation", label: "Installation" },
      { id: "provider-setup", label: "Provider Setup" },
      { id: "components", label: "All components" },
    ],
  },
  {
    group: "Primitives",
    items: [
      { id: "fade", label: "Fade" },
      { id: "stagger", label: "Stagger" },
      { id: "cinematicimage", label: "CinematicImage" },
    ],
  },
  {
    group: "Entrance",
    items: [{ id: "springpop", label: "SpringPop" }],
  },
  {
    group: "Hover",
    items: [{ id: "siblingdimming", label: "SiblingDimming" }],
  },
  {
    group: "Stagger",
    items: [{ id: "radialstagger", label: "RadialStagger" }],
  },
  {
    group: "Text",
    items: [{ id: "textreveal", label: "TextReveal" }],
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
  fade: [
    { prop: "children", type: "ReactNode", def: "—", desc: "Content that fades in." },
    ...PASSTHROUGH,
    { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
    {
      prop: "direction",
      type: '"none" | "up" | "down" | "left" | "right"',
      def: '"up"',
      desc: 'A fixed, subtle drift as it fades — "none" is pure opacity.',
    },
    {
      prop: "blur",
      type: "boolean | number",
      def: "false",
      desc: "Layer a blur → sharp focus-in; true uses ~8px, a number sets custom px.",
    },
    {
      prop: "trigger",
      type: '"inView" | "mount"',
      def: '"inView"',
      desc: "Animate the first time it's in view (once), or immediately on mount.",
    },
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
      type: "ReactElement",
      def: "—",
      desc: "A single host element (h1–h6/p/span/div) wrapping plain-string text; its tag, className + style are reused and it carries the whole string on aria-label.",
    },
    {
      prop: "delay",
      type: "number",
      def: "0",
      desc: "Lead delay before the first word/char rises.",
    },
    { prop: "by", type: '"word" | "char"', def: '"word"', desc: "Split granularity." },
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
  cinematicimage: [
    {
      prop: "children",
      type: "ReactNode",
      def: "—",
      desc: "A large image; the wrapper must carry overflow-hidden.",
    },
    ...PASSTHROUGH,
  ],
} satisfies Record<string, PropRow[]>;
