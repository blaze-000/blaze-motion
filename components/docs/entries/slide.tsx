import type { DocEntry, PropRow } from "@/components/docs/registry";
import { ReplayPreview } from "@/components/docs/replay-preview";
import { Slide } from "@/components/motion/slide";

/* ── Live preview ──────────────────────────────────────────────────────
 * One replayable panel PER direction — all 8 travel directions Slide
 * supports. Server component: it only composes the <ReplayPreview> (client)
 * + <Slide> (client) primitives. Each Slide uses trigger="mount" so it
 * plays the instant its panel (re)mounts, and each panel's own Replay button
 * remounts just that Slide — so any one direction can be re-played on its
 * own, independent of the others.
 */
const DIRECTIONS = [
  { direction: "up", label: 'direction="up"' },
  { direction: "down", label: 'direction="down"' },
  { direction: "left", label: 'direction="left"' },
  { direction: "right", label: 'direction="right"' },
  { direction: "up-left", label: 'direction="up-left"' },
  { direction: "up-right", label: 'direction="up-right"' },
  { direction: "down-left", label: 'direction="down-left"' },
  { direction: "down-right", label: 'direction="down-right"' },
] as const;

function Tile({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-12 w-full items-center justify-center rounded-sm border border-border bg-panel-2 text-xs text-foreground">
      {children}
    </div>
  );
}

function Demo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {DIRECTIONS.map(({ direction, label }) => (
        <ReplayPreview key={direction} label={label}>
          <Slide direction={direction} trigger="mount" className="w-full">
            <Tile>{direction}</Tile>
          </Slide>
        </ReplayPreview>
      ))}
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
    desc: "Passed straight through — Slide becomes your layout element.",
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
      code: `import { Slide } from "@/components/motion/slide";

<Slide direction="left">
  <Card />
</Slide>`,
    },
    {
      label: "Distance tier",
      note: "tight (8px) · base (28px) · hero (64px) — or pass an explicit number.",
      code: `<Slide direction="up" distance="hero">
  <h1>Big entrance</h1>
</Slide>

<Slide direction="right" distance={120}>
  <aside>Custom travel</aside>
</Slide>`,
    },
    {
      label: "Trigger on mount",
      note: "Play immediately instead of waiting for scroll — for above-the-fold content.",
      code: `<Slide direction="up" trigger="mount">
  <Hero />
</Slide>`,
    },
  ],
  props,
};

export default entry;
