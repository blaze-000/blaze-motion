import type { DocEntry, PropRow } from "@/components/docs/registry";
import { SlideIn } from "@/components/motion/slide-in";

/* ── Live preview ──────────────────────────────────────────────────────
 * Shows the four cardinal directions plus a wider `hero`-tier travel. Server
 * component — it only composes the <SlideIn> client primitive. Each tile
 * fades + slides in from its labelled direction the first time it is in view.
 */
function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {children}
      <span className="font-mono text-[0.625rem] text-muted-foreground">{label}</span>
    </div>
  );
}

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 w-full items-center justify-center rounded-sm border border-border bg-panel-2 text-xs text-foreground">
      {children}
    </div>
  );
}

function Demo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <Cell label='direction="left"'>
        <SlideIn direction="left">
          <Tile>from left</Tile>
        </SlideIn>
      </Cell>
      <Cell label='direction="right"'>
        <SlideIn direction="right">
          <Tile>from right</Tile>
        </SlideIn>
      </Cell>
      <Cell label='direction="up"'>
        <SlideIn direction="up">
          <Tile>from below</Tile>
        </SlideIn>
      </Cell>
      <Cell label='distance="hero"'>
        <SlideIn direction="up" distance="hero">
          <Tile>longer travel</Tile>
        </SlideIn>
      </Cell>
    </div>
  );
}

const props: PropRow[] = [
  { prop: "children", type: "ReactNode", def: "—", desc: "Content that slides + fades in." },
  {
    prop: "direction",
    type: '"up" | "down" | "left" | "right" | "up-left" | "up-right" | "down-left" | "down-right"',
    def: "—",
    desc: "One of 8 travel directions the content enters from. Required.",
  },
  {
    prop: "distance",
    type: '"tight" | "base" | "hero" | number',
    def: '"base"',
    desc: "Travel distance — a tier (8 / 28 / 64px) or an explicit px value.",
  },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "Animate on scroll-into-view (once) or immediately on mount.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — SlideIn becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Direction",
      note: "Pick any of the 8 travel directions — diagonals move on both axes.",
      code: `import { SlideIn } from "@/components/motion/slide-in";

<SlideIn direction="left">
  <Card />
</SlideIn>`,
    },
    {
      label: "Distance tier",
      note: "tight (8px) · base (28px) · hero (64px) — or pass an explicit number.",
      code: `<SlideIn direction="up" distance="hero">
  <h1>Big entrance</h1>
</SlideIn>

<SlideIn direction="right" distance={120}>
  <aside>Custom travel</aside>
</SlideIn>`,
    },
    {
      label: "Trigger on mount",
      note: "Play immediately instead of waiting for scroll — for above-the-fold content.",
      code: `<SlideIn direction="up" trigger="mount">
  <Hero />
</SlideIn>`,
    },
  ],
  props,
};

export default entry;
