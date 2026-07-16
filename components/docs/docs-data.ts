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
];

export const DOCS_FLAT: NavItem[] = DOCS_NAV.flatMap((g) => g.items);

export type PropRow = { prop: string; type: string; def: string; desc: string };

const PASSTHROUGH: PropRow[] = [
  { prop: "className", type: "string", def: "—", desc: "Passed straight through — the primitive becomes your layout element." },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
];

export const PROPS: Record<string, PropRow[]> = {
  provider: [
    { prop: "children", type: "ReactNode", def: "—", desc: "Your whole app tree, wrapped once at the root." },
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
    { prop: "children", type: "ReactNode", def: "—", desc: "StaggerItem children, revealed in sequence." },
    ...PASSTHROUGH,
  ],
  staggerItem: [
    { prop: "children", type: "ReactNode", def: "—", desc: "A single item in the stagger sequence." },
    ...PASSTHROUGH,
  ],
  cinematicimage: [
    { prop: "children", type: "ReactNode", def: "—", desc: "A large image; the wrapper must carry overflow-hidden." },
    ...PASSTHROUGH,
  ],
  pagetransition: [
    { prop: "children", type: "ReactNode", def: "—", desc: "The route content to fade + shift." },
    { prop: "routeKey", type: "string", def: "—", desc: "Unique key per route (never `key` — React strips it)." },
    ...PASSTHROUGH,
  ],
};
