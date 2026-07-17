import type { DocEntry, PropRow } from "@/components/docs/registry";
import { MaskTextReveal } from "@/components/motion/mask-text-reveal";

/* ── Live preview ──────────────────────────────────────────────────────
 * A heading (by="word") over a line-clipped strapline (by="line").
 * Server component — it only composes the <MaskTextReveal> client primitive.
 * MaskTextReveal WRAPS your own element: the tag + className ride the child.
 * Each token rises out from behind its own overflow-hidden mask, once in view.
 */
function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <MaskTextReveal>
        <h2 className="text-2xl font-semibold text-foreground">Words rise from behind the mask.</h2>
      </MaskTextReveal>
      <MaskTextReveal by="line" delay={0.15}>
        <p className="flex flex-col text-sm text-muted-foreground">
          {"Clipped per line, not per word.\nNo fade — a crisp, editorial rise."}
        </p>
      </MaskTextReveal>
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
    type: '"word" | "line"',
    def: '"word"',
    desc: 'Split unit: "word" splits on whitespace; "line" splits on \\n.',
  },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "Animate on scroll-into-view (once) or immediately on mount.",
  },
  {
    prop: "delay",
    type: "number",
    def: "0",
    desc: "Seconds before the first token starts staggering in.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "By word (default)",
      note: "Wrap your own element — its tag + className win. Each word sits in its own overflow-hidden mask and rises y: 110% → 0, no opacity fade.",
      code: `import { MaskTextReveal } from "@/components/motion/mask-text-reveal";

<MaskTextReveal>
  <h2 className="text-2xl font-semibold">Words rise from behind the mask.</h2>
</MaskTextReveal>`,
    },
    {
      label: "By line",
      note: "Pass \\n-separated text — each line clips and rises inside its own mask, staggered at feel.lineStagger.",
      code: `<MaskTextReveal by="line">
  <p>{\`Clipped per line, not per word.
No fade — a crisp, editorial rise.\`}</p>
</MaskTextReveal>`,
    },
    {
      label: "With delay",
      note: "Offset a strapline behind a heading so the two reveals read as a sequence.",
      code: `<MaskTextReveal>
  <h1>Leads first.</h1>
</MaskTextReveal>
<MaskTextReveal delay={0.15}>
  <p className="text-muted-foreground">Follows, a beat later.</p>
</MaskTextReveal>`,
    },
    {
      label: "Trigger on mount",
      note: "Play immediately instead of waiting for scroll — for above-the-fold hero text.",
      code: `<MaskTextReveal trigger="mount">
  <h1>Above the fold, plays right away.</h1>
</MaskTextReveal>`,
    },
  ],
  props,
};

export default entry;
