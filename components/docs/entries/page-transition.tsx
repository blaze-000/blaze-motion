import type { DocEntry, PropRow } from "@/components/docs/registry";
import { Demo } from "./page-transition.demo";

const props: PropRow[] = [
  { prop: "children", type: "ReactNode", def: "—", desc: "The route's content to transition in." },
  {
    prop: "routeKey",
    type: "string",
    def: "—",
    desc: "A stable key for the current route — NOT `key` (React strips that). Change it to re-trigger the transition, e.g. `usePathname()`.",
  },
  {
    prop: "className",
    type: "string",
    def: "—",
    desc: "Passed straight through — PageTransition becomes your layout element.",
  },
  { prop: "style", type: "CSSProperties", def: "—", desc: "Inline style passthrough." },
];

const entry: DocEntry = {
  Demo,
  usage: [
    {
      label: "App Router layout",
      note: "Wrap {children} in a layout and key it on the pathname — every navigation fades + shifts 8px.",
      code: `"use client";

import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/motion/page-transition";

export function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return <PageTransition routeKey={pathname}>{children}</PageTransition>;
}`,
    },
    {
      label: "As an App Router template",
      note: "`template.tsx` remounts on every navigation (unlike layout.tsx), which is what re-plays the exit + enter.",
      code: `// app/template.tsx
"use client";

import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/motion/page-transition";

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition routeKey={usePathname()}>{children}</PageTransition>;
}`,
    },
    {
      label: "Manual routeKey",
      note: "Any string works — a tab id, a step index, a query param — not only a real route.",
      code: `const [tab, setTab] = useState("overview");

<PageTransition routeKey={tab} className="min-h-[12rem]">
  {tab === "overview" ? <Overview /> : <Pricing />}
</PageTransition>`,
    },
  ],
  props,
};

export default entry;
