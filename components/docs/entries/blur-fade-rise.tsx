import type { DocEntry, PropRow } from "@/components/docs/registry";
import { BlurFadeRise } from "@/components/motion/blur-fade-rise";

/* ── Live preview ──────────────────────────────────────────────────────
 * A plain server component — it only composes the <BlurFadeRise> client
 * primitive, which is allowed. No "use client" needed: neither trigger
 * mode needs local state — "inView" plays on scroll, "mount" plays as
 * soon as the demo mounts. The second block shows `trigger="mount"` so
 * it settles immediately rather than waiting on the viewport.
 */
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <BlurFadeRise className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-foreground">
        Soft focus-in — blur(6px) → 0, with a short rise.
      </BlurFadeRise>
      <BlurFadeRise
        trigger="mount"
        delay={0.15}
        className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-muted-foreground"
      >
        trigger=&quot;mount&quot; — plays immediately, a beat later.
      </BlurFadeRise>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "Content that blurs, fades, and rises in.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — BlurFadeRise becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "Animate the first time it's 30% in view, or immediately on mount.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Wrap a focal element — it lifts blur(6px) → 0px, opacity 0 → 1, and y +6 → 0 the first time it's 30% in view.",
      code: `import { BlurFadeRise } from "@/components/motion/blur-fade-rise";

<BlurFadeRise className="grid gap-4">
  <h2>Soft focus-in.</h2>
</BlurFadeRise>`,
    },
    {
      label: 'trigger="mount"',
      note: "Play immediately on mount instead of waiting for scroll — good for a hero that's already in view.",
      code: `<BlurFadeRise trigger="mount">
  <h1>Plays as soon as this mounts.</h1>
</BlurFadeRise>`,
    },
    {
      label: "With delay",
      note: "Offset a later block by a beat to sequence a lead + follow pair.",
      code: `<BlurFadeRise>
  <h2>Leads</h2>
</BlurFadeRise>
<BlurFadeRise delay={0.15}>
  <p>Follows, a beat later.</p>
</BlurFadeRise>`,
    },
  ],
  props,
};

export default entry;
