import type { DocEntry, PropRow } from "@/components/docs/registry";
import { RadialStagger } from "@/components/motion/radial-stagger";

/* ── Live preview ──────────────────────────────────────────────────────
 * A plain server component — it only composes the <RadialStagger> client
 * primitive, which is allowed. No "use client" needed here: the click state
 * (origin index, replay nonce) lives inside RadialStagger itself, so this
 * demo needs no local state of its own. Decorative mode (the default) — each
 * tile pops in a ring outward from `defaultOrigin`, and clicking any tile
 * re-ripples from it.
 */
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <p className="text-xs text-muted-foreground">Click any tile to ripple outward from it.</p>
      <RadialStagger
        columns={4}
        defaultOrigin={5}
        className="gap-2"
        itemClassName="aspect-square rounded-sm border border-border bg-panel-2 hover:border-signal/50"
      >
        {Array.from({ length: 16 }, (_, i) => `radial-tile-${i}`).map((key) => (
          <div key={key} className="size-full" />
        ))}
      </RadialStagger>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "One child per grid tile — each pops in on its own ring delay.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Classes for the grid container (RadialStagger sets display:grid + columns via style).",
  },
  {
    prop: "style",
    type: "CSSProperties",
    def: "—",
    desc: "Inline style passthrough, merged onto the grid.",
  },
  {
    prop: "itemClassName",
    type: "string",
    def: "—",
    desc: "Classes applied to every tile (the grid cell).",
  },
  {
    prop: "columns",
    type: "number",
    def: "4",
    desc: "Grid columns — drives both the layout and the ring-distance geometry.",
  },
  {
    prop: "step",
    type: "number",
    def: "feel.stagger (0.08)",
    desc: "Seconds of delay added per unit of distance from the origin tile.",
  },
  {
    prop: "distance",
    type: '"euclidean" | "manhattan" | "chebyshev"',
    def: '"euclidean"',
    desc: "How ring distance from the origin cell is measured.",
  },
  {
    prop: "defaultOrigin",
    type: "number",
    def: "0",
    desc: "Index the first cascade ripples out from, before any click.",
  },
  {
    prop: "interactive",
    type: "boolean",
    def: "false",
    desc: 'Renders tiles as focusable `<button>`s instead of decorative role="presentation" elements. Requires `getItemLabel`.',
  },
  {
    prop: "getItemLabel",
    type: "(index: number) => string",
    def: "—",
    desc: "Accessible name for the tile at `index` — required when `interactive`.",
  },
  {
    prop: "onSelect",
    type: "(index: number) => void",
    def: "—",
    desc: "Fires with the tile index when an interactive tile is selected.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: 'Decorative by default — tiles are non-focusable role="presentation" cells. Clicking one re-ripples the cascade from it.',
      code: `import { RadialStagger } from "@/components/motion/radial-stagger";

<RadialStagger columns={4} className="gap-2">
  {tiles.map((tile) => (
    <div key={tile.id} className="aspect-square rounded-sm border border-border bg-panel-2" />
  ))}
</RadialStagger>`,
    },
    {
      label: "Distance metric",
      note: 'Switch how ring distance from the origin is measured — "manhattan" ripples in diamonds, "chebyshev" in squares, "euclidean" (default) in circles.',
      code: `<RadialStagger columns={5} distance="manhattan" defaultOrigin={12} className="gap-2">
  {tiles.map((tile) => (
    <div key={tile.id} className="aspect-square rounded-sm border border-border bg-panel-2" />
  ))}
</RadialStagger>`,
    },
    {
      label: "Interactive tiles",
      note: "Opt into real focusable buttons — each tile needs an accessible name via getItemLabel, or you ship nameless controls (WCAG 4.1.2).",
      code: `<RadialStagger
  columns={4}
  interactive
  getItemLabel={(index) => \`Select swatch \${index + 1}\`}
  onSelect={(index) => setActiveSwatch(index)}
  itemClassName="aspect-square rounded-sm border border-border bg-panel-2 focus-visible:outline-2 focus-visible:outline-offset-2"
>
  {swatches.map((swatch) => (
    <span key={swatch.id} style={{ background: swatch.color }} className="block size-full" />
  ))}
</RadialStagger>`,
    },
    {
      label: "Tuned step + origin",
      note: "Raise `step` for a slower, more dramatic cascade; set `defaultOrigin` to start the first ripple somewhere other than tile 0.",
      code: `<RadialStagger columns={6} step={0.14} defaultOrigin={17} className="gap-1.5">
  {tiles.map((tile) => (
    <div key={tile.id} className="aspect-square rounded-sm bg-panel-2" />
  ))}
</RadialStagger>`,
    },
  ],
  props,
};

export default entry;
