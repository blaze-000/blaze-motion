import type { DocEntry, PropRow } from "@/components/docs/registry";
import { MaskTextReveal } from "@/components/motion/mask-text-reveal";

/* ── Live preview ──────────────────────────────────────────────────────
 * A heading (by="word", as="h2") over a line-clipped strapline (by="line").
 * Server component — it only composes the <MaskTextReveal> client primitive.
 * Each token rises out from behind its own overflow-hidden mask, once in view.
 */
function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <MaskTextReveal as="h2" className="text-2xl font-semibold text-foreground">
        Words rise from behind the mask.
      </MaskTextReveal>
      <MaskTextReveal
        as="p"
        by="line"
        delay={0.15}
        className="flex flex-col text-sm text-muted-foreground"
      >
        {"Clipped per line, not per word.\nNo fade — a crisp, editorial rise."}
      </MaskTextReveal>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "string",
    def: "—",
    desc: "The text to reveal — a plain string, split into tokens by `by`. Required.",
  },
  {
    prop: "by",
    type: '"word" | "line"',
    def: '"word"',
    desc: 'Split unit: "word" splits on whitespace; "line" splits on \\n.',
  },
  {
    prop: "as",
    type: '"span" | "div" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6"',
    def: '"span"',
    desc: "The rendered container tag — MaskTextReveal becomes your layout/heading element.",
  },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "Animate on scroll-into-view (once) or immediately on mount.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through to the container element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
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
      note: "Each word sits in its own overflow-hidden mask and rises up from y: 110% → 0, no opacity fade.",
      code: `import { MaskTextReveal } from "@/components/motion/mask-text-reveal";

<MaskTextReveal as="h2" className="text-2xl font-semibold">
  Words rise from behind the mask.
</MaskTextReveal>`,
    },
    {
      label: "By line",
      note: "Pass \\n-separated text — each line clips and rises inside its own mask, staggered at feel.lineStagger.",
      code: `<MaskTextReveal as="p" by="line">
{\`Clipped per line, not per word.
No fade — a crisp, editorial rise.\`}
</MaskTextReveal>`,
    },
    {
      label: "With delay",
      note: "Offset a strapline behind a heading so the two reveals read as a sequence.",
      code: `<MaskTextReveal as="h1">Leads first.</MaskTextReveal>
<MaskTextReveal as="p" delay={0.15} className="text-muted-foreground">
  Follows, a beat later.
</MaskTextReveal>`,
    },
    {
      label: "Trigger on mount",
      note: "Play immediately instead of waiting for scroll — for above-the-fold hero text.",
      code: `<MaskTextReveal as="h1" trigger="mount">
  Above the fold, plays right away.
</MaskTextReveal>`,
    },
  ],
  props,
};

export default entry;
