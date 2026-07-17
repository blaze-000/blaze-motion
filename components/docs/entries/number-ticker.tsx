import type { DocEntry, PropRow } from "@/components/docs/registry";
import { NumberTicker } from "@/components/motion/number-ticker";

/* ── Live preview ──────────────────────────────────────────────────────
 * A plain server component — it only composes the <NumberTicker> client
 * primitive, which is allowed. No "use client" needed here because there
 * is no local state; each ticker counts up once the first time it is 30%
 * in view. Four instances dogfood the real prop surface: a plain count,
 * a decimal metric, a currency prefix, and a percent suffix.
 */
function Demo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-3">
      <div className="flex flex-col gap-1 rounded-sm border border-border bg-panel-2 px-4 py-3">
        <span className="text-2xl font-semibold text-foreground">
          <NumberTicker value={2480} />
        </span>
        <span className="text-xs text-muted-foreground">stars</span>
      </div>
      <div className="flex flex-col gap-1 rounded-sm border border-border bg-panel-2 px-4 py-3">
        <span className="text-2xl font-semibold text-signal">
          <NumberTicker value={99.9} decimals={1} suffix="%" />
        </span>
        <span className="text-xs text-muted-foreground">uptime</span>
      </div>
      <div className="flex flex-col gap-1 rounded-sm border border-border bg-panel-2 px-4 py-3">
        <span className="text-2xl font-semibold text-foreground">
          <NumberTicker value={128000} prefix="$" />
        </span>
        <span className="text-xs text-muted-foreground">revenue</span>
      </div>
      <div className="flex flex-col gap-1 rounded-sm border border-border bg-panel-2 px-4 py-3">
        <span className="text-2xl font-semibold text-foreground">
          <NumberTicker value={12} from={0} duration={2} />
        </span>
        <span className="text-xs text-muted-foreground">seats left</span>
      </div>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "value",
    type: "number",
    def: "—",
    desc: "The target the count animates up to, once in view.",
  },
  { prop: "from", type: "number", def: "0", desc: "The starting count." },
  { prop: "duration", type: "number", def: "1.2", desc: "Seconds the count-up tween takes." },
  {
    prop: "decimals",
    type: "number",
    def: "0",
    desc: "Fixed fraction digits shown at every step of the count.",
  },
  {
    prop: "prefix",
    type: "string",
    def: '""',
    desc: 'Text prepended to the formatted number, e.g. "$".',
  },
  {
    prop: "suffix",
    type: "string",
    def: '""',
    desc: 'Text appended to the formatted number, e.g. "%".',
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — NumberTicker becomes your inline element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Counts from 0 up to value the first time it is 30% in view, formatted with locale thousands separators.",
      code: `import { NumberTicker } from "@/components/motion/number-ticker";

<NumberTicker value={2480} className="text-2xl font-semibold" />`,
    },
    {
      label: "Decimals",
      note: "Fix the fraction digits so the width doesn't jump mid-count — good for percentages and ratings.",
      code: `<NumberTicker value={99.9} decimals={1} suffix="%" />`,
    },
    {
      label: "Prefix / suffix",
      note: "Currency and units ride the prefix/suffix props — the count animates, the strings don't.",
      code: `<NumberTicker value={128000} prefix="$" />
<NumberTicker value={12} suffix=" seats left" />`,
    },
    {
      label: "Custom range + duration",
      note: "Start from a non-zero floor and stretch the tween for a slower, weightier count.",
      code: `<NumberTicker value={12} from={4} duration={2} />`,
    },
  ],
  props,
};

export default entry;
