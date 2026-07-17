import type { DocEntry, PropRow } from "@/components/docs/registry";
import { SiblingDimming, SiblingDimmingItem } from "@/components/motion/sibling-dimming";

/* ── Live preview ──────────────────────────────────────────────────────
 * A small nav-like row. Server component — the effect is pure CSS
 * (`:has(.dim-item:hover)`), so there's no state to own here: hover any
 * item and its siblings dim to 50% opacity while it stays full-strength.
 */
const ITEMS = ["Overview", "Pricing", "Docs", "Changelog"];

function Demo() {
  return (
    <SiblingDimming className="flex w-full max-w-sm flex-wrap items-center justify-center gap-2 sm:gap-3">
      {ITEMS.map((label) => (
        <SiblingDimmingItem
          key={label}
          className="cursor-pointer rounded-sm border border-border bg-panel-2 px-4 py-2 text-sm text-foreground"
        >
          {label}
        </SiblingDimmingItem>
      ))}
    </SiblingDimming>
  );
}

const props: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "The SiblingDimmingItem elements to group — hovering one dims its non-hovered siblings.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — SiblingDimming becomes your layout element (e.g. a flex row or grid).",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
];

const secondaryProps: PropRow[] = [
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "The item's content.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — SiblingDimmingItem becomes your item element.",
  },
  {
    prop: "style",
    type: "CSSProperties",
    def: "—",
    desc: "Merged after the built-in opacity-transition timing, so you can override it per instance.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic group",
      note: "Wrap a set of items in SiblingDimming, each item in SiblingDimmingItem. Pure CSS — no JS, no state.",
      code: `import { SiblingDimming, SiblingDimmingItem } from "@/components/motion/sibling-dimming";

<SiblingDimming className="flex gap-3">
  <SiblingDimmingItem>Overview</SiblingDimmingItem>
  <SiblingDimmingItem>Pricing</SiblingDimmingItem>
  <SiblingDimmingItem>Docs</SiblingDimmingItem>
</SiblingDimming>`,
    },
    {
      label: "Nav bar",
      note: "A common home — hovering a nav link dims the others so the active hover reads clearly. SiblingDimming renders the container div itself.",
      code: `<SiblingDimming className="flex items-center gap-6">
  <SiblingDimmingItem>
    <Link href="/product">Product</Link>
  </SiblingDimmingItem>
  <SiblingDimmingItem>
    <Link href="/pricing">Pricing</Link>
  </SiblingDimmingItem>
  <SiblingDimmingItem>
    <Link href="/about">About</Link>
  </SiblingDimmingItem>
</SiblingDimming>`,
    },
    {
      label: "Feature grid",
      note: "Works in a grid just as well — the :has() selector only cares about the dim-item marker, not layout.",
      code: `<SiblingDimming className="grid grid-cols-3 gap-4">
  {features.map((f) => (
    <SiblingDimmingItem key={f.title} className="rounded-md border p-4">
      <h3>{f.title}</h3>
      <p>{f.description}</p>
    </SiblingDimmingItem>
  ))}
</SiblingDimming>`,
    },
  ],
  props,
  secondaryProps: { heading: "SiblingDimmingItem", rows: secondaryProps },
};

export default entry;
