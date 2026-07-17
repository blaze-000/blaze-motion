import type { DocEntry, PropRow } from "@/components/docs/registry";
import { Hover } from "@/components/motion/hover";

/* ── Live preview ──────────────────────────────────────────────────────
 * All four hover effects side by side. Server component — the pointer
 * response lives in <Hover>'s whileHover/whileTap (motion, client), so no
 * local state is needed here. Hover (or focus) a tile to feel each settle.
 */
const EFFECTS = [
  { effect: "lift", label: "lift" },
  { effect: "scale", label: "scale" },
  { effect: "tilt", label: "tilt" },
  { effect: "glow", label: "glow" },
] as const;

function Demo() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-4 sm:grid-cols-4">
      {EFFECTS.map(({ effect, label }) => (
        <div key={effect} className="flex flex-col items-center gap-2">
          <Hover
            effect={effect}
            className="flex aspect-square w-full cursor-pointer items-center justify-center rounded-md border border-border bg-panel-2 text-sm text-foreground"
          >
            {label}
          </Hover>
          <span className="font-mono text-[0.625rem] text-muted-foreground">
            effect=&quot;{effect}&quot;
          </span>
        </div>
      ))}
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "The element that answers the pointer — Hover wraps it and BECOMES the layout element.",
  },
  {
    prop: "effect",
    type: '"lift" | "scale" | "tilt" | "glow"',
    def: '"lift"',
    desc: "How it responds on hover. lift/scale/tilt are transforms; glow animates boxShadow.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — no orphan wrapper div.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Lift (default)",
      note: "Rises a few px on hover, with a subtle tap press-down. The default effect.",
      code: `import { Hover } from "@/components/motion/hover";

<Hover className="rounded-md border p-4">
  <Card />
</Hover>`,
    },
    {
      label: "Scale",
      note: "Grows slightly toward the pointer — good for thumbnails and icons.",
      code: `<Hover effect="scale">
  <img src="/thumb.jpg" alt="" />
</Hover>`,
    },
    {
      label: "Tilt",
      note: "A small rotation — playful on tags and chips.",
      code: `<Hover effect="tilt">
  <Badge>New</Badge>
</Hover>`,
    },
    {
      label: "Glow",
      note: "Animates a soft accent shadow. Unlike the transforms, it is silenced under reduced motion.",
      code: `<Hover effect="glow" className="rounded-md">
  <Button>Get started</Button>
</Hover>`,
    },
  ],
  props,
};

export default entry;
