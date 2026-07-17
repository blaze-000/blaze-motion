import type { DocEntry, PropRow } from "@/components/docs/registry";
import { PerspectiveTiltIn } from "@/components/motion/perspective-tilt-in";

/* ── Live preview ──────────────────────────────────────────────────────
 * Server component — it only composes the <PerspectiveTiltIn> client
 * primitive. Each card rises + settles its rotateX over a perspective the
 * first time it is in view; the third plays immediately on mount instead.
 * No local state needed: inView/mount + delay are the whole surface.
 */
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3" style={{ perspective: 800 }}>
      <PerspectiveTiltIn className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-foreground">
        Settles from a slight tilt, once.
      </PerspectiveTiltIn>
      <PerspectiveTiltIn
        delay={0.15}
        className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-muted-foreground"
      >
        A beat later — delay 0.15s.
      </PerspectiveTiltIn>
      <PerspectiveTiltIn
        trigger="mount"
        className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-signal"
      >
        trigger=&quot;mount&quot; — plays immediately.
      </PerspectiveTiltIn>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "Content that tilts + rises into view.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — PerspectiveTiltIn becomes your layout element.",
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
      note: "Wrap any card or section — it settles opacity 0 → 1, y +28 → 0, and rotateX 8deg → 0 over an 800px perspective, the first time it is 30% in view.",
      code: `import { PerspectiveTiltIn } from "@/components/motion/perspective-tilt-in";

<PerspectiveTiltIn className="rounded-sm border p-4">
  <h3>Settles from a slight tilt, once.</h3>
</PerspectiveTiltIn>`,
    },
    {
      label: "With delay",
      note: "Offset sibling tilt-ins by a beat to sequence them without a full Stagger.",
      code: `<PerspectiveTiltIn>
  <h3>Leads</h3>
</PerspectiveTiltIn>
<PerspectiveTiltIn delay={0.15}>
  <p>Follows, a beat later.</p>
</PerspectiveTiltIn>`,
    },
    {
      label: "Trigger on mount",
      note: "Play immediately instead of waiting for scroll — for above-the-fold content.",
      code: `<PerspectiveTiltIn trigger="mount">
  <Hero />
</PerspectiveTiltIn>`,
    },
  ],
  props,
};

export default entry;
