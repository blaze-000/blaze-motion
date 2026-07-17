import type { DocEntry, PropRow } from "@/components/docs/registry";
import { ClipReveal } from "@/components/motion/clip-reveal";

// Plain server component — composes the <ClipReveal> client primitive (allowed).
// No "use client": no local state; each panel wipes open on scroll-into-view.
function Demo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-3">
      <ClipReveal
        direction="up"
        className="flex h-20 items-center justify-center rounded-sm border border-border bg-panel-2 text-sm text-foreground"
      >
        up
      </ClipReveal>
      <ClipReveal
        direction="down"
        delay={0.1}
        className="flex h-20 items-center justify-center rounded-sm border border-border bg-panel-2 text-sm text-foreground"
      >
        down
      </ClipReveal>
      <ClipReveal
        direction="left"
        delay={0.2}
        className="flex h-20 items-center justify-center rounded-sm border border-border bg-panel-2 text-sm text-foreground"
      >
        left
      </ClipReveal>
      <ClipReveal
        direction="right"
        delay={0.3}
        className="flex h-20 items-center justify-center rounded-sm border border-border bg-panel-2 text-sm text-muted-foreground"
      >
        right
      </ClipReveal>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "Content the wipe reveals — the box stays put while it unveils.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — ClipReveal becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "Wipe on scroll into view (once, 30% visible) or immediately on mount.",
  },
  {
    prop: "direction",
    type: '"up" | "down" | "left" | "right"',
    def: '"up"',
    desc: "Edge the clip-path wipe retracts from — the box itself stays put.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Wraps any block — a hard clip-path inset() wipes open from the bottom edge, once, on scroll into view.",
      code: `import { ClipReveal } from "@/components/motion/clip-reveal";

<ClipReveal className="rounded-sm border border-border bg-panel-2 p-6">
  <h2>Wipes open from below.</h2>
</ClipReveal>`,
    },
    {
      label: "Direction",
      note: "Four edges to wipe from — pick the one that matches the content's entrance.",
      code: `<ClipReveal direction="up">…</ClipReveal>
<ClipReveal direction="down">…</ClipReveal>
<ClipReveal direction="left">…</ClipReveal>
<ClipReveal direction="right">…</ClipReveal>`,
    },
    {
      label: "Trigger on mount",
      note: "Skip the scroll observer and wipe open immediately — for hero content already in view.",
      code: `<ClipReveal trigger="mount" direction="left">
  <h1>Wipes open on mount.</h1>
</ClipReveal>`,
    },
    {
      label: "With delay",
      note: "Offset sibling wipes by a beat to sequence them.",
      code: `<ClipReveal direction="up">
  <h2>Leads</h2>
</ClipReveal>
<ClipReveal direction="up" delay={0.15}>
  <p>Follows, a beat later.</p>
</ClipReveal>`,
    },
  ],
  props,
};

export default entry;
