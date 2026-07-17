import type { DocEntry, PropRow } from "@/components/docs/registry";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

/* ── Live preview ──────────────────────────────────────────────────────
 * A plain server component — it only composes the <Stagger>/<StaggerItem>
 * client primitives, which is allowed. No "use client" needed: no local
 * state, the sequence plays once on scroll-into-view. Three rows step in
 * on the tuned `feel.stagger` cadence, each item rising from `feel.rise`.
 */
function Demo() {
  return (
    <Stagger className="flex w-full max-w-sm flex-col gap-3">
      <StaggerItem className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-foreground">
        First to rise.
      </StaggerItem>
      <StaggerItem className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-foreground">
        Then this one.
      </StaggerItem>
      <StaggerItem className="rounded-sm border border-border bg-panel-2 px-4 py-3 text-sm text-muted-foreground">
        Last, a beat later.
      </StaggerItem>
    </Stagger>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "StaggerItem children — each rises in sequence.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — Stagger becomes your list/grid container.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  {
    prop: "staggerChildren",
    type: "number",
    def: "feel.stagger (0.08)",
    desc: "Seconds between each child's animation start.",
  },
  {
    prop: "delayChildren",
    type: "number",
    def: "feel.staggerDelay (0.05)",
    desc: "Seconds before the first child animates.",
  },
];

const secondaryProps: { heading: string; rows: PropRow[] } = {
  heading: "StaggerItem",
  rows: [
    { prop: "children", type: "ReactNode", def: "—", desc: "Content for this one item." },
    {
      prop: "className",
      type: "string",
      def: "—",
      desc: "Passed straight through to the item element.",
    },
    { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  ],
};

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Wrap a list with Stagger and each direct StaggerItem rises in sequence, once, on scroll into view.",
      code: `import { Stagger, StaggerItem } from "@/components/motion/stagger";

<Stagger className="flex flex-col gap-3">
  <StaggerItem>First</StaggerItem>
  <StaggerItem>Second</StaggerItem>
  <StaggerItem>Third</StaggerItem>
</Stagger>`,
    },
    {
      label: "Grid",
      note: "Works over any layout — className passes through, so a grid staggers just as well as a stack.",
      code: `<Stagger className="grid grid-cols-3 gap-4">
  <StaggerItem>Card A</StaggerItem>
  <StaggerItem>Card B</StaggerItem>
  <StaggerItem>Card C</StaggerItem>
</Stagger>`,
    },
    {
      label: "Custom cadence",
      note: "Slow the step and add a lead delay to make a longer list read more deliberately.",
      code: `<Stagger staggerChildren={0.12} delayChildren={0.2} className="flex flex-col gap-3">
  <StaggerItem>Slower</StaggerItem>
  <StaggerItem>Cadence</StaggerItem>
  <StaggerItem>Between items</StaggerItem>
</Stagger>`,
    },
  ],
  props,
  secondaryProps,
};

export default entry;
