import type { DocEntry, PropRow } from "@/components/docs/registry";
import { CinematicImage } from "@/components/motion/cinematic-image";
import { cn } from "@/lib/utils";

/* ── Live preview ──────────────────────────────────────────────────────
 * Two gradient "photo" frames settle 110% → 100% inside their
 * overflow-hidden wrapper the first time they scroll into view — the
 * wrapper owns the clip, CinematicImage owns the scale. Server component:
 * it only composes the <CinematicImage> client primitive, no local state.
 */
function Frame({ label, className }: { label: string; className: string }) {
  return (
    <div className="overflow-hidden rounded-sm border border-border">
      <CinematicImage className={cn("flex h-32 w-full items-end justify-start p-3", className)}>
        <span className="font-mono text-[0.625rem] text-foreground/80">{label}</span>
      </CinematicImage>
    </div>
  );
}

function Demo() {
  return (
    <div className="grid w-full max-w-sm grid-cols-2 gap-3">
      <Frame label="hero.jpg" className="bg-gradient-to-br from-signal/30 via-panel-2 to-panel" />
      <Frame label="detail.jpg" className="bg-gradient-to-tr from-panel via-panel-2 to-signal/20" />
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "The large image (or media) that scales down into place.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — CinematicImage becomes your layout element. Must NOT set overflow-hidden itself; that belongs on a parent frame.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "The wrapper (or a parent) must be overflow-hidden — the 1.1 scale is clipped there, never left to overflow and shift layout.",
      code: `import { CinematicImage } from "@/components/motion/cinematic-image";
import Image from "next/image";

<div className="overflow-hidden rounded-sm">
  <CinematicImage>
    <Image src="/hero.jpg" alt="" width={1600} height={900} className="h-full w-full object-cover" />
  </CinematicImage>
</div>`,
    },
    {
      label: "Full-bleed hero",
      note: "Large, single-focal images only — this is a deliberate scale-DOWN settle (110% → 100%), never applied to titles or text.",
      code: `<div className="overflow-hidden">
  <CinematicImage className="h-[70vh] w-full">
    <Image src="/cover.jpg" alt="" fill className="object-cover" />
  </CinematicImage>
</div>`,
    },
  ],
  props,
};

export default entry;
