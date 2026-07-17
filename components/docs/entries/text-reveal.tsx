import type { DocEntry, PropRow } from "@/components/docs/registry";
import { TextReveal } from "@/components/motion/text-reveal";

/* ── Live preview ──────────────────────────────────────────────────────
 * Server component — it only composes the <TextReveal> client primitive.
 * Top line staggers by="word" (the default); the second by="char" for a
 * tighter, more granular reveal. Both play once, the first time in view.
 */
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TextReveal as="h3" className="text-lg font-medium text-foreground">
        Reveals word by word.
      </TextReveal>
      <TextReveal as="p" by="char" delay={0.1} className="text-sm text-muted-foreground">
        And char by char, a beat later.
      </TextReveal>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "string",
    def: "—",
    desc: "The text to reveal — split into words/chars internally. Required.",
  },
  {
    prop: "by",
    type: '"word" | "char"',
    def: '"word"',
    desc: "Split granularity — stagger each word, or each character within each word.",
  },
  {
    prop: "as",
    type: '"span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
    def: '"span"',
    desc: "The rendered container tag — TextReveal becomes your layout element.",
  },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "Animate on scroll-into-view (once) or immediately on mount.",
  },
  {
    prop: "stagger",
    type: "number",
    def: "0.04 word / 0.02 char",
    desc: "Seconds between each staggered word/char. Overrides the by-based default.",
  },
  {
    prop: "delay",
    type: "number",
    def: "0",
    desc: "Seconds before the first word/char animates.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through to the container tag.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "By word (default)",
      note: "Each word rises + fades in sequence, 0.04s apart — the string stays one accessible label.",
      code: `import { TextReveal } from "@/components/motion/text-reveal";

<TextReveal as="h2" className="text-2xl font-medium">
  Reveals word by word.
</TextReveal>`,
    },
    {
      label: "By char",
      note: "Finer-grained — good for short headlines or a single emphasized line.",
      code: `<TextReveal by="char" className="text-xl font-medium">
  Letter by letter.
</TextReveal>`,
    },
    {
      label: "Trigger on mount",
      note: "Play immediately instead of waiting for scroll — for above-the-fold hero text.",
      code: `<TextReveal as="h1" trigger="mount" className="text-3xl font-semibold">
  Above the fold, ready on load.
</TextReveal>`,
    },
    {
      label: "Custom stagger + delay",
      note: "Slow the step down and lead with a delay to sequence against a neighboring element.",
      code: `<TextReveal stagger={0.08} delay={0.2} className="text-sm text-muted-foreground">
  Slower, and led by a beat.
</TextReveal>`,
    },
  ],
  props,
};

export default entry;
