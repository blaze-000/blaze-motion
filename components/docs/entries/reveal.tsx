import type { DocEntry, PropRow } from "@/components/docs/registry";
import { Reveal } from "@/components/motion/reveal";

/* ── Live preview ──────────────────────────────────────────────────────
 * A plain server component — it only composes the <Reveal> client primitive,
 * which is allowed. No "use client" needed here because there is no local
 * state; the rise plays on scroll-into-view. (Reach for a "use client" sibling
 * only when a demo needs its own useState / event handlers — e.g. a replay
 * button.) Each block rises once, the second a beat later via `delay`.
 */
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Reveal className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-foreground">
        Rises into view, once.
      </Reveal>
      <Reveal
        delay={0.15}
        className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-muted-foreground"
      >
        A beat later — delay 0.15s.
      </Reveal>
    </div>
  );
}

const props: PropRow[] = [
  { prop: "children", type: "ReactNode", def: "—", desc: "Content that rises into view, once." },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — Reveal becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Wrap any section — it lifts opacity 0 → 1 and y +28 → 0 the first time it is 30% in view.",
      code: `import { Reveal } from "@/components/motion/reveal";

<Reveal className="grid gap-4">
  <h2>Rises into view, once.</h2>
</Reveal>`,
    },
    {
      label: "With delay",
      note: "Offset sibling reveals by a beat to sequence them without a full Stagger.",
      code: `<Reveal>
  <h2>Leads</h2>
</Reveal>
<Reveal delay={0.15}>
  <p>Follows, a beat later.</p>
</Reveal>`,
    },
  ],
  props,
};

export default entry;
