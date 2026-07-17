import type { DocEntry, PropRow } from "@/components/docs/registry";
import { LineReveal } from "@/components/motion/line-reveal";

// Plain server component — composes the <LineReveal> client primitive (allowed).
// No "use client": no local state; the top block plays on mount, the second
// rises the first time it's scrolled into view.
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <LineReveal trigger="mount" className="text-sm leading-relaxed text-foreground">
        {"Calm, deliberate motion.\nOne line at a time.\nNever the whole block at once."}
      </LineReveal>
      <LineReveal
        delay={0.1}
        className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-muted-foreground"
      >
        {"Scrolls into view, once.\nEach line staggers a beat behind the last."}
      </LineReveal>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "string",
    def: "—",
    desc: "The passage. Split on \\n — each line gets its own clipped rise.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — LineReveal becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  {
    prop: "delay",
    type: "number",
    def: "0",
    desc: "Seconds before the first line's stagger begins.",
  },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "inView rises once at 30% visible; mount plays immediately on render.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Splits children on \\n; each line rises inside its own overflow-hidden wrapper, staggered by feel.lineStagger. aria-label carries the full passage for screen readers.",
      code: `import { LineReveal } from "@/components/motion/line-reveal";

<LineReveal className="text-lg leading-relaxed">
  {"Calm, deliberate motion.\\nOne line at a time."}
</LineReveal>`,
    },
    {
      label: 'trigger="mount"',
      note: "Play immediately on render instead of waiting for scroll — good for hero copy above the fold.",
      code: `<LineReveal trigger="mount">
  {"Rises the moment it mounts.\\nNo scroll required."}
</LineReveal>`,
    },
    {
      label: "With delay",
      note: "Offset a LineReveal behind a sibling to sequence a heading and its body copy.",
      code: `<Reveal>
  <h2>Leads</h2>
</Reveal>
<LineReveal delay={0.15}>
  {"Follows, a beat later.\\nLine by line."}
</LineReveal>`,
    },
  ],
  props,
};

export default entry;
