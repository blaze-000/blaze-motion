import type { DocEntry, PropRow } from "@/components/docs/registry";
import { SpringPop } from "@/components/motion/spring-pop";

// Plain server component — composes the <SpringPop> client primitive (allowed).
// No "use client": no local state; the pop plays once on mount, staggered by delay.
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center justify-center gap-3">
      <SpringPop className="rounded-sm border border-border bg-panel-2 px-4 py-2 text-sm text-foreground">
        Pops in
      </SpringPop>
      <SpringPop
        delay={0.1}
        className="rounded-sm border border-signal/40 bg-panel-2 px-4 py-2 text-sm text-signal"
      >
        with overshoot
      </SpringPop>
      <SpringPop
        delay={0.2}
        className="rounded-sm border border-border bg-panel-2 px-4 py-2 text-sm text-muted-foreground"
      >
        — never titles
      </SpringPop>
    </div>
  );
}

const props: PropRow[] = [
  { prop: "children", type: "ReactNode", def: "—", desc: "Content that pops in on mount." },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — SpringPop becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Wrap a badge, chip, or icon — it springs opacity 0 → 1 and scale 0.8 → ~1.05 → 1, the one deliberate overshoot in the engine. Never wrap titles or headings with it.",
      code: `import { SpringPop } from "@/components/motion/spring-pop";

<SpringPop className="rounded-full border px-3 py-1 text-sm">
  New
</SpringPop>`,
    },
    {
      label: "Staggered group",
      note: "Offset a cluster of pops by a beat each so they don't all land at once.",
      code: `<div className="flex gap-3">
  <SpringPop>First</SpringPop>
  <SpringPop delay={0.1}>Second</SpringPop>
  <SpringPop delay={0.2}>Third</SpringPop>
</div>`,
    },
  ],
  props,
};

export default entry;
