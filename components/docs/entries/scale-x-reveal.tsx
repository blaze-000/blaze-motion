import type { DocEntry, PropRow } from "@/components/docs/registry";
import { ScaleXReveal } from "@/components/motion/scale-x-reveal";

// Plain server component — composes the <ScaleXReveal> client primitive (allowed).
// No "use client": no local state; the draw plays on scroll-into-view.
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-5">
      <ScaleXReveal className="h-px w-full bg-border" />
      <div className="flex items-center gap-3">
        <span className="text-sm text-foreground">Section</span>
        <ScaleXReveal className="h-px flex-1 bg-signal" />
      </div>
      <ScaleXReveal delay={0.15} className="h-0.5 w-24 rounded-full bg-signal" />
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "Usually omitted — pass this in an inner un-scaled span if you do, so text doesn't squash as the width draws in.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — ScaleXReveal becomes your layout element (e.g. a rule or underline).",
  },
  {
    prop: "style",
    type: "CSSProperties",
    def: "—",
    desc: "Inline style passthrough; merges with the internal transformOrigin.",
  },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "Draw open the first time it's 30% in view, or immediately on mount.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Self-contained by default — no children needed. Draws scaleX 0 → 1 with a fade, anchored left.",
      code: `import { ScaleXReveal } from "@/components/motion/scale-x-reveal";

<ScaleXReveal className="h-px w-full bg-border" />`,
    },
    {
      label: "With a label",
      note: "Put text in an inner un-scaled span — ScaleXReveal scales the whole element horizontally, which would otherwise squash text as it draws in.",
      code: `<div className="flex items-center gap-3">
  <span>Section</span>
  <ScaleXReveal className="h-px flex-1 bg-signal" />
</div>`,
    },
    {
      label: "With delay",
      note: "Offset a rule from its neighbors by a beat.",
      code: `<ScaleXReveal delay={0.15} className="h-0.5 w-24 rounded-full bg-signal" />`,
    },
    {
      label: "Trigger on mount",
      note: "Skip the scroll-into-view check and draw immediately — useful above the fold or inside a modal.",
      code: `<ScaleXReveal trigger="mount" className="h-px w-full bg-border" />`,
    },
  ],
  props,
};

export default entry;
