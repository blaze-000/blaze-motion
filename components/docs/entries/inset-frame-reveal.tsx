import type { DocEntry, PropRow } from "@/components/docs/registry";
import { InsetFrameReveal } from "@/components/motion/inset-frame-reveal";

/* ── Live preview ──────────────────────────────────────────────────────
 * Server component — it only composes the <InsetFrameReveal> client
 * primitive. Left panel plays on scroll-into-view (once); right panel
 * plays immediately on mount, a beat later via `delay`. Each frame settles
 * from a uniform clip-path inset (feel.frameInset, 15%) out to fully open.
 */
function Panel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-24 w-full items-center justify-center rounded-sm border border-border bg-panel-2 text-sm text-foreground">
      {children}
    </div>
  );
}

function Demo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-4">
      <div className="flex flex-col items-center gap-1.5">
        <InsetFrameReveal className="w-full">
          <Panel>window settle</Panel>
        </InsetFrameReveal>
        <span className="font-mono text-[0.625rem] text-muted-foreground">
          trigger=&quot;inView&quot;
        </span>
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <InsetFrameReveal trigger="mount" delay={0.15} className="w-full">
          <Panel>opens on mount</Panel>
        </InsetFrameReveal>
        <span className="font-mono text-[0.625rem] text-muted-foreground">
          trigger=&quot;mount&quot; delay=0.15
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
    desc: "Content the frame opens to reveal.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — InsetFrameReveal becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
  {
    prop: "trigger",
    type: '"inView" | "mount"',
    def: '"inView"',
    desc: "Animate on scroll-into-view (once) or immediately on mount.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "A uniform clip-path frame insets 15% from every edge, then opens the first time it's 30% in view.",
      code: `import { InsetFrameReveal } from "@/components/motion/inset-frame-reveal";

<InsetFrameReveal className="overflow-hidden rounded-md border">
  <img src="/still.jpg" alt="" />
</InsetFrameReveal>`,
    },
    {
      label: "Trigger on mount",
      note: "Play immediately instead of waiting for scroll — for above-the-fold hero art.",
      code: `<InsetFrameReveal trigger="mount">
  <Hero />
</InsetFrameReveal>`,
    },
    {
      label: "With delay",
      note: "Offset the open by a beat to sequence it after a title or sibling reveal.",
      code: `<InsetFrameReveal trigger="mount" delay={0.15}>
  <Card />
</InsetFrameReveal>`,
    },
  ],
  props,
};

export default entry;
