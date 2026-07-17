import type { DocEntry, PropRow } from "@/components/docs/registry";
import { ScaleIn } from "@/components/motion/scale-in";

/* ── Live preview ──────────────────────────────────────────────────────
 * Three tiles: default (inView), a delayed sibling, and a trigger="mount"
 * tile that grows immediately. Server component — it only composes the
 * <ScaleIn> client primitive; no local state needed.
 */
function Tile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      {children}
      <span className="font-mono text-[0.625rem] text-muted-foreground">{label}</span>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-16 w-full items-center justify-center rounded-sm border border-border bg-panel-2 text-xs text-foreground">
      {children}
    </div>
  );
}

function Demo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <Tile label="default">
        <ScaleIn>
          <Card>0.95 → 1</Card>
        </ScaleIn>
      </Tile>
      <Tile label="delay={0.15}">
        <ScaleIn delay={0.15}>
          <Card>a beat later</Card>
        </ScaleIn>
      </Tile>
      <Tile label='trigger="mount"'>
        <ScaleIn trigger="mount">
          <Card>plays on mount</Card>
        </ScaleIn>
      </Tile>
    </div>
  );
}

const props: PropRow[] = [
  { prop: "children", type: "ReactNode", def: "—", desc: "Content that grows + fades in." },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — ScaleIn becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "Animate on scroll-into-view (once) or immediately on mount.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Wrap any element — it settles 0.95 → 1 scale + fades in the first time it is 30% in view.",
      code: `import { ScaleIn } from "@/components/motion/scale-in";

<ScaleIn className="rounded-sm border border-border bg-panel-2 p-4">
  <Card />
</ScaleIn>`,
    },
    {
      label: "With delay",
      note: "Offset sibling scale-ins by a beat to sequence them without a full Stagger.",
      code: `<ScaleIn>
  <Card>Leads</Card>
</ScaleIn>
<ScaleIn delay={0.15}>
  <Card>Follows, a beat later</Card>
</ScaleIn>`,
    },
    {
      label: "Trigger on mount",
      note: "Play immediately instead of waiting for scroll — for above-the-fold content, e.g. a modal or popover.",
      code: `<ScaleIn trigger="mount">
  <Dialog.Content />
</ScaleIn>`,
    },
  ],
  props,
};

export default entry;
