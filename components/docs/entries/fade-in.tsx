import type { DocEntry, PropRow } from "@/components/docs/registry";
import { FadeIn } from "@/components/motion/fade-in";

/* ── Live preview ──────────────────────────────────────────────────────
 * A plain server component — it only composes the <FadeIn> client primitive,
 * which is allowed. No "use client" needed here because there is no local
 * state; unlike <Reveal>, FadeIn animates on MOUNT (no viewport gate), so it
 * plays the moment this demo renders — the fit for above-the-fold content
 * that shouldn't wait to scroll into view. The second block trails the first
 * via `delay` to show sequencing without a rise.
 */
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <FadeIn className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-foreground">
        Fades in on mount — pure opacity, no rise.
      </FadeIn>
      <FadeIn
        delay={0.15}
        className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-muted-foreground"
      >
        A beat later — delay 0.15s.
      </FadeIn>
    </div>
  );
}

const props: PropRow[] = [
  { prop: "children", type: "ReactNode", def: "—", desc: "Content faded in on mount." },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — FadeIn becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Wrap above-the-fold content — it lifts opacity 0 → 1 the moment it mounts, no scroll gate.",
      code: `import { FadeIn } from "@/components/motion/fade-in";

<FadeIn className="grid gap-4">
  <h1>Fades in on mount.</h1>
</FadeIn>`,
    },
    {
      label: "With delay",
      note: "Offset sibling fades by a beat to sequence a hero without a full Stagger.",
      code: `<FadeIn>
  <h1>Leads</h1>
</FadeIn>
<FadeIn delay={0.15}>
  <p>Follows, a beat later.</p>
</FadeIn>`,
    },
  ],
  props,
};

export default entry;
