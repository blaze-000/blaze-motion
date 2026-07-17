import type { DocEntry, PropRow } from "@/components/docs/registry";
import { GrowFromOrigin } from "@/components/motion/grow-from-origin";

/* ── Live preview ──────────────────────────────────────────────────────
 * Four corner origins, laid out so each tile visibly grows FROM the
 * labelled corner — the dropdown/popover shape. Server component: default
 * trigger="mount" plays immediately, no local state needed.
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
    <div className="flex h-14 w-full items-center justify-center rounded-sm border border-border bg-panel-2 text-xs text-foreground">
      {children}
    </div>
  );
}

function Demo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <Cell label='origin="top-left"'>
        <GrowFromOrigin origin="top-left">
          <Tile>menu</Tile>
        </GrowFromOrigin>
      </Cell>
      <Cell label='origin="top-right"'>
        <GrowFromOrigin origin="top-right" delay={0.1}>
          <Tile>menu</Tile>
        </GrowFromOrigin>
      </Cell>
      <Cell label='origin="bottom-left"'>
        <GrowFromOrigin origin="bottom-left" delay={0.2}>
          <Tile>menu</Tile>
        </GrowFromOrigin>
      </Cell>
      <Cell label='origin="center"'>
        <GrowFromOrigin origin="center" delay={0.3}>
          <Tile>menu</Tile>
        </GrowFromOrigin>
      </Cell>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "The popover/menu content that grows in, anchored to origin.",
  },
  {
    prop: "origin",
    type: '"top" | "top-left" | "top-right" | "bottom" | "bottom-left" | "bottom-right" | "left" | "right" | "center"',
    def: '"top"',
    desc: "The transform-origin corner/edge/center it scales up from.",
  },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"mount"',
    desc: 'Menus/tooltips play on mount by default; pass trigger="inView" to scope it to scroll entry instead.',
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — GrowFromOrigin becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Fade + scale ~0.85 → 1, anchored to origin. Plays on mount by default — the dropdown/tooltip/popover entrance.",
      code: `import { GrowFromOrigin } from "@/components/motion/grow-from-origin";

<GrowFromOrigin origin="top-left">
  <DropdownMenu />
</GrowFromOrigin>`,
    },
    {
      label: "Origin",
      note: "Anchor the grow to any of 9 corners/edges/center to match where the trigger sits.",
      code: `<GrowFromOrigin origin="top-right">
  <PopoverContent />
</GrowFromOrigin>

<GrowFromOrigin origin="bottom-left">
  <Tooltip />
</GrowFromOrigin>

<GrowFromOrigin origin="center">
  <Modal />
</GrowFromOrigin>`,
    },
    {
      label: "Trigger on scroll",
      note: "Scope it to viewport entry instead of mount — for a card that grows in as the page scrolls.",
      code: `<GrowFromOrigin origin="center" trigger="inView">
  <PricingCard />
</GrowFromOrigin>`,
    },
  ],
  props,
};

export default entry;
