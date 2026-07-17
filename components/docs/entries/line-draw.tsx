import type { DocEntry, PropRow } from "@/components/docs/registry";
import { Demo } from "./line-draw.demo";

// Data lives in this server module; the interactive replay button lives in
// the "use client" sibling `line-draw.demo.tsx` (LineDraw animates on mount,
// not on scroll, so a replay is the only way to re-trigger it in the docs).

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "One or more <LineDrawPath> (or other svg children), drawn in document order.",
  },
  {
    prop: "delay",
    type: "number",
    def: "0",
    desc: "Seconds before the first child path starts drawing.",
  },
  {
    prop: "stagger",
    type: "number",
    def: "0",
    desc: "Seconds between each child path's draw start — sequences a multi-path icon.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — LineDraw becomes the <svg> element itself.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  {
    prop: "...props",
    type: "SVGMotionProps<'svg'>",
    def: "—",
    desc: "Any other native <svg> attribute — viewBox, width, height, role, etc. — passes straight through.",
  },
];

const secondaryProps = {
  heading: "LineDrawPath props",
  rows: [
    { prop: "d", type: "string", def: "—", desc: "SVG path data for this stroke. Required." },
    {
      prop: "strokeLinecap",
      type: '"butt" | "round" | "square"',
      def: '"round"',
      desc: "Stroke line cap — defaulted, override per path if needed.",
    },
    {
      prop: "...props",
      type: "SVGMotionProps<'path'>",
      def: "—",
      desc: "Any other native/motion <path> prop — stroke, fill, strokeWidth, etc. Variants are inherited from the parent <LineDraw>, so you never set them yourself.",
    },
  ] satisfies PropRow[],
};

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: 'A single path draws its stroke over duration.slow, then its fill fades in. Use fill="none" for a line-only icon.',
      code: `import { LineDraw, LineDrawPath } from "@/components/motion/line-draw";

<LineDraw viewBox="0 0 24 24" className="size-8">
  <LineDrawPath
    d="M7.5 12.5l3 3 6-6"
    className="stroke-signal fill-none"
    strokeWidth={2}
  />
</LineDraw>`,
    },
    {
      label: "Multiple paths + stagger",
      note: "stagger offsets each child path's start — they draw in sequence instead of all at once.",
      code: `<LineDraw stagger={0.25} viewBox="0 0 24 24" className="size-12">
  <LineDrawPath
    d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
    className="stroke-foreground fill-signal/20"
    strokeWidth={1.5}
  />
  <LineDrawPath
    d="M7.5 12.5l3 3 6-6"
    className="stroke-signal fill-none"
    strokeWidth={1.75}
  />
</LineDraw>`,
    },
    {
      label: "Delay",
      note: "delay holds the whole group before the first path starts — useful after a slower sibling reveal.",
      code: `<LineDraw delay={0.4} viewBox="0 0 96 32" className="h-8 w-24">
  <LineDrawPath
    d="M4 26 L26 8"
    className="stroke-muted-foreground fill-none"
    strokeWidth={2}
  />
</LineDraw>`,
    },
    {
      label: "Delay + stagger, multi-segment route",
      note: "Combine both to sequence a multi-segment line — each segment draws a beat after the last.",
      code: `<LineDraw delay={0.2} stagger={0.15} viewBox="0 0 96 32" className="h-8 w-24">
  <LineDrawPath d="M4 26 L26 8" className="stroke-signal fill-none" strokeWidth={2} />
  <LineDrawPath d="M26 8 L50 22" className="stroke-signal fill-none" strokeWidth={2} />
  <LineDrawPath
    d="M50 22 L74 6 L92 16"
    className="stroke-signal fill-none"
    strokeWidth={2}
  />
</LineDraw>`,
    },
  ],
  props,
  secondaryProps,
};

export default entry;
