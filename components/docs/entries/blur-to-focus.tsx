import type { DocEntry, PropRow } from "@/components/docs/registry";
import { BlurToFocus } from "@/components/motion/blur-to-focus";

/* ── Live preview ──────────────────────────────────────────────────────
 * A plain server component — it only composes the <BlurToFocus> client
 * primitive, which is allowed. No "use client" needed here: no local state,
 * it settles once on mount. `filter: blur` is GPU-costly, so the demo keeps
 * to a single hero-style focal block plus one delayed supporting line —
 * never a list (that's BlurFadeRise's job).
 */
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col items-start gap-3">
      <BlurToFocus className="rounded-sm border border-border bg-panel-2 px-5 py-4 text-lg font-medium text-foreground">
        Sharpens into focus.
      </BlurToFocus>
      <BlurToFocus delay={0.15} className="px-1 text-sm text-muted-foreground">
        A single focal element — reach for this over a list.
      </BlurToFocus>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "The single focal element that settles from blur into focus.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — BlurToFocus becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Wraps a single focal element — it settles from opacity 0 + blur(10px) to opaque + sharp on mount.",
      code: `import { BlurToFocus } from "@/components/motion/blur-to-focus";

<BlurToFocus className="text-3xl font-semibold">
  Sharpens into focus.
</BlurToFocus>`,
    },
    {
      label: "With delay",
      note: "Offset a supporting line a beat after the hero settles.",
      code: `<BlurToFocus>
  <h1>Leads</h1>
</BlurToFocus>
<BlurToFocus delay={0.15}>
  <p>Follows, a beat later.</p>
</BlurToFocus>`,
    },
    {
      label: "Hero image",
      note: "`filter: blur` is GPU-costly — reserve BlurToFocus for a hero / single focal element, never a list (use BlurFadeRise for repeated items).",
      code: `<BlurToFocus className="overflow-hidden rounded-md">
  <img
    src="/hero.jpg"
    alt="Product hero"
    className="h-full w-full object-cover"
  />
</BlurToFocus>`,
    },
  ],
  props,
};

export default entry;
