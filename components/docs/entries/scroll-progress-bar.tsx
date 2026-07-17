import type { DocEntry, PropRow } from "@/components/docs/registry";
import { Demo } from "./scroll-progress-bar.demo";

const props: PropRow[] = [
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — composes over the default `fixed inset-x-0 z-50 bg-signal` (e.g. override to `sticky`/`absolute` for a scoped bar).",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "height", type: "number", def: "3", desc: "Bar thickness in px." },
  {
    prop: "position",
    type: '"top" | "bottom"',
    def: '"top"',
    desc: "Which viewport (or target) edge the bar pins to.",
  },
  {
    prop: "target",
    type: "RefObject<HTMLElement | null>",
    def: "—",
    desc: "Scope tracking to one scrollable element instead of the whole page — pass the ref of an `overflow-y-auto` container.",
  },
  {
    prop: "color",
    type: "string",
    def: "—",
    desc: "Any CSS color, overriding the default `bg-signal` fill.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Page scroll (default)",
      note: "Mount once near the root — with no `target`, it tracks the whole page's scroll.",
      code: `import { ScrollProgressBar } from "@/components/motion/scroll-progress-bar";

<ScrollProgressBar />`,
    },
    {
      label: "Bottom position",
      note: 'Pin it to the bottom edge instead of the top with `position="bottom"`.',
      code: `<ScrollProgressBar position="bottom" height={2} />`,
    },
    {
      label: "Scoped to an element",
      note: "Pass a ref as `target` to track one scrollable container instead of the page — override `className` to `sticky`/`absolute` so it stays inside that container.",
      code: `const panelRef = useRef<HTMLDivElement>(null);

<div ref={panelRef} className="h-64 overflow-y-auto">
  <ScrollProgressBar target={panelRef} className="sticky" />
  {/* long content */}
</div>`,
    },
    {
      label: "Custom color",
      note: "Overrides the default `bg-signal` fill with any CSS color.",
      code: `<ScrollProgressBar color="#7dd3fc" />`,
    },
  ],
  props,
};

export default entry;
