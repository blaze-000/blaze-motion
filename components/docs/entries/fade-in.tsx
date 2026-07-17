import type { DocEntry, PropRow } from "@/components/docs/registry";
import { ReplayPreview } from "@/components/docs/replay-preview";
import { FadeIn } from "@/components/motion/fade-in";

/* ── Live preview ──────────────────────────────────────────────────────
 * FadeIn is pure opacity with no direction — so the variant set is small:
 * a basic fade and a delayed one. Each sits in its own <ReplayPreview>
 * (client) panel with its own Replay button. FadeIn always animates on MOUNT
 * (no viewport gate), so remounting a panel via that button re-plays just
 * that fade — the two panels replay independently. This entry stays a server
 * module; it only composes the client primitives.
 */
function Demo() {
  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
      <ReplayPreview label="Basic">
        <FadeIn className="w-full rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-foreground">
          Fades in on mount — pure opacity, no rise.
        </FadeIn>
      </ReplayPreview>
      <ReplayPreview label="delay={0.15}">
        <FadeIn
          delay={0.15}
          className="w-full rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-muted-foreground"
        >
          A beat later — delay 0.15s.
        </FadeIn>
      </ReplayPreview>
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
