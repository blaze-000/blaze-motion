import type { DocEntry, PropRow } from "@/components/docs/registry";
import { GrayscaleReveal } from "@/components/motion/grayscale-reveal";

/* ── Live preview ──────────────────────────────────────────────────────
 * Two "photo" swatches standing in for images — a gradient tile since no
 * real asset is needed to feel the effect. Server component: it only
 * composes the <GrayscaleReveal> client primitive, which owns the filter
 * animation. Left plays on scroll-into-view (default); right plays on
 * mount with a short delay, as a hero image would.
 */
function Demo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <div className="flex flex-col gap-1.5">
        <GrayscaleReveal className="flex h-32 w-full items-end overflow-hidden rounded-sm border border-border bg-gradient-to-br from-panel-2 to-signal/30 p-2">
          <span className="text-[0.625rem] text-muted-foreground">on scroll</span>
        </GrayscaleReveal>
        <span className="font-mono text-[0.625rem] text-muted-foreground">
          trigger=&quot;inView&quot;
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        <GrayscaleReveal
          trigger="mount"
          delay={0.2}
          className="flex h-32 w-full items-end overflow-hidden rounded-sm border border-border bg-gradient-to-br from-panel-2 to-signal/30 p-2"
        >
          <span className="text-[0.625rem] text-muted-foreground">on mount</span>
        </GrayscaleReveal>
        <span className="font-mono text-[0.625rem] text-muted-foreground">
          trigger=&quot;mount&quot; delay=0.2
        </span>
      </div>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "The image (or any element) that fades from grayscale to color.",
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
    desc: "Passed straight through — GrayscaleReveal becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Wrap an image — opacity and grayscale(1) → grayscale(0) settle together on durations.slow, the first time it's 30% in view.",
      code: `import { GrayscaleReveal } from "@/components/motion/grayscale-reveal";

<GrayscaleReveal className="overflow-hidden rounded-md">
  <img src="/photo.jpg" alt="" className="h-full w-full object-cover" />
</GrayscaleReveal>`,
    },
    {
      label: "Trigger on mount",
      note: "Play immediately instead of waiting for scroll — for an above-the-fold hero image.",
      code: `<GrayscaleReveal trigger="mount">
  <img src="/hero.jpg" alt="" className="h-full w-full object-cover" />
</GrayscaleReveal>`,
    },
    {
      label: "With delay",
      note: "Offset a grid of images so they colorize in sequence rather than all at once.",
      code: `<GrayscaleReveal delay={0}>
  <img src="/one.jpg" alt="" />
</GrayscaleReveal>
<GrayscaleReveal delay={0.15}>
  <img src="/two.jpg" alt="" />
</GrayscaleReveal>
<GrayscaleReveal delay={0.3}>
  <img src="/three.jpg" alt="" />
</GrayscaleReveal>`,
    },
  ],
  props,
};

export default entry;
