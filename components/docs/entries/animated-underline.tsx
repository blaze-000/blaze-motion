import type { DocEntry, PropRow } from "@/components/docs/registry";
import { AnimatedUnderline } from "@/components/motion/animated-underline";

/* ── Live preview ──────────────────────────────────────────────────────
 * Pure CSS (group-hover scale-x), no Motion / no state — a plain server
 * component composing the real <AnimatedUnderline>. Covers the polymorphic
 * `as`: the default `<a>` (hash-only href, so a raw anchor is fine here),
 * `as="button"`, `as="span"` for non-interactive text, and a custom
 * `underlineClassName` color. Hover any of them to draw the underline.
 */
function Demo() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-4 text-sm">
      <p className="text-muted-foreground">
        Read the{" "}
        <AnimatedUnderline href="#" className="text-foreground">
          documentation
        </AnimatedUnderline>{" "}
        or try the{" "}
        <AnimatedUnderline
          as="button"
          type="button"
          className="text-foreground"
          underlineClassName="bg-signal"
        >
          button variant
        </AnimatedUnderline>
        .
      </p>
      <AnimatedUnderline as="span" className="cursor-default text-base font-medium text-foreground">
        Or wrap any element — hover me
      </AnimatedUnderline>
    </div>
  );
}

const props: PropRow[] = [
  {
    prop: "as",
    type: "ElementType",
    def: '"a"',
    desc: "Polymorphic tag/component — AnimatedUnderline BECOMES it, so href/onClick/type pass straight through.",
  },
  {
    prop: "children",
    type: "ReactNode",
    def: "—",
    desc: "The label the underline draws beneath.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed to the rendered element — no wrapper span.",
  },
  {
    prop: "underlineClassName",
    type: "string",
    def: "—",
    desc: "Classes for the underline bar itself — override height, color, or radius.",
  },
  {
    prop: "...props",
    type: "ComponentPropsWithoutRef<T>",
    def: "—",
    desc: "Any other prop the rendered tag accepts — href, onClick, type, target, etc.",
  },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "Basic",
      note: "Renders an <a> by default. Underline draws left-to-right on hover, retracts out to the right on leave.",
      code: `import { AnimatedUnderline } from "@/components/motion/animated-underline";

<AnimatedUnderline href="/pricing">Pricing</AnimatedUnderline>`,
    },
    {
      label: "With next/link",
      note: "For internal routes, pass Link via `as` so navigation stays client-side (FG-021) while the underline still draws.",
      code: `import Link from "next/link";
import { AnimatedUnderline } from "@/components/motion/animated-underline";

<AnimatedUnderline as={Link} href="/docs">
  Read the docs
</AnimatedUnderline>`,
    },
    {
      label: "As button",
      note: 'Not every underline is a link — `as="button"` keeps it a real, keyboard-operable control.',
      code: `<AnimatedUnderline as="button" type="button" onClick={handleClick}>
  Show more
</AnimatedUnderline>`,
    },
    {
      label: "As span (non-interactive)",
      note: "Decorative emphasis with no navigation — pair with `cursor-default`.",
      code: `<AnimatedUnderline as="span" className="cursor-default">
  Featured
</AnimatedUnderline>`,
    },
    {
      label: "Custom underline color",
      note: "underlineClassName overrides the bar — defaults to bg-current so it inherits text color.",
      code: `<AnimatedUnderline underlineClassName="bg-signal" href="/changelog">
  What's new
</AnimatedUnderline>`,
    },
  ],
  props,
};

export default entry;
