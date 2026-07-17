import type { DocEntry, PropRow } from "@/components/docs/registry";
import { TextReveal } from "@/components/motion/text-reveal";

/* ── Live preview ──────────────────────────────────────────────────────
 * Server component — it only composes the <TextReveal> client primitive.
 * TextReveal WRAPS your own element: the tag + className ride the child.
 * Top line staggers by="word" (the default); the second by="char" for a
 * tighter, more granular reveal. Both play once, the first time in view.
 */
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4">
      <TextReveal>
        <h3 className="text-lg font-medium text-foreground">Reveals word by word.</h3>
      </TextReveal>
      <TextReveal by="char" delay={0.1}>
        <p className="text-sm text-muted-foreground">And char by char, a beat later.</p>
      </TextReveal>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactElement",
    def: "—",
    desc: "A single host element (h1–h6/p/span/div) wrapping plain-string text. Its tag, className + style are reused and it carries the aria-label. Required.",
  },
  {
    prop: "by",
    type: '"word" | "char"',
    def: '"word"',
    desc: "Split granularity — stagger each word, or each character within each word.",
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
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "By word (default)",
      note: "Wrap your own element — its tag + className win. Each word rises + fades 0.04s apart; the string stays one accessible label.",
      code: `import { TextReveal } from "@/components/motion/text-reveal";

<TextReveal by="word">
  <h2 className="text-2xl font-medium">Reveals word by word.</h2>
</TextReveal>`,
    },
    {
      label: "By char",
      note: "Finer-grained — good for short headlines or a single emphasized line.",
      code: `<TextReveal by="char">
  <span className="text-xl font-medium">Letter by letter.</span>
</TextReveal>`,
    },
    {
      label: "Trigger on mount",
      note: "Play immediately instead of waiting for scroll — for above-the-fold hero text.",
      code: `<TextReveal trigger="mount">
  <h1 className="text-3xl font-semibold">Above the fold, ready on load.</h1>
</TextReveal>`,
    },
    {
      label: "Custom stagger + delay",
      note: "Slow the step down and lead with a delay to sequence against a neighboring element.",
      code: `<TextReveal stagger={0.08} delay={0.2}>
  <p className="text-sm text-muted-foreground">Slower, and led by a beat.</p>
</TextReveal>`,
    },
  ],
  props,
};

export default entry;
