import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SIDEBAR = [
  { group: "Getting Started", items: ["Installation", "Provider Setup"] },
  {
    group: "Primitives",
    items: ["FadeIn", "Reveal", "Stagger", "CinematicImage", "PageTransition"],
    active: "Reveal",
  },
];

const PROPS = [
  { prop: "children", type: "ReactNode", def: "—", desc: "The content that rises into view." },
  { prop: "className", type: "string", def: "—", desc: "Passed straight through to the element." },
  { prop: "delay", type: "number", def: "0", desc: "Seconds before this instance animates." },
];

const TOC = ["Overview", "When to use", "Preview", "Props"];

export function DocsPreview() {
  return (
    <div className="flex flex-col gap-6">
      <div aria-hidden className="overflow-hidden rounded-md border border-border bg-card">
        <div className="grid lg:grid-cols-[15rem_1fr_12rem]">
          <div className="hidden border-b border-border p-5 md:block lg:border-b-0 lg:border-r">
            <div className="flex flex-col gap-5">
              {SIDEBAR.map((section) => (
                <div key={section.group}>
                  <p className="fig-label text-muted-foreground">{section.group}</p>
                  <ul className="mt-2.5 flex flex-col gap-1.5">
                    {section.items.map((item) => {
                      const active = "active" in section && section.active === item;
                      return (
                        <li
                          key={item}
                          className={
                            active
                              ? "rounded-sm bg-signal/10 px-2.5 py-1 text-sm text-signal"
                              : "px-2.5 py-1 text-sm text-muted-foreground"
                          }
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-7">
            <h3 className="text-h3 text-foreground">Reveal</h3>
            <p className="mt-2 max-w-prose text-sm text-muted-foreground">
              A straight rise from below, once, the first time it scrolls into view.
            </p>

            <div className="mt-5 flex w-fit rounded-sm border border-border p-0.5 font-mono text-xs">
              <span className="rounded-[3px] bg-signal/15 px-3 py-1 text-signal">Preview</span>
              <span className="px-3 py-1 text-muted-foreground">Code</span>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Prop", "Type", "Default", "Description"].map((h) => (
                      <th key={h} className="fig-label py-2 pr-4 font-normal text-muted-foreground">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PROPS.map((row) => (
                    <tr key={row.prop} className="border-b border-border/60 last:border-0">
                      <td className="py-2.5 pr-4 font-mono text-[0.8125rem] text-signal">
                        {row.prop}
                      </td>
                      <td className="py-2.5 pr-4 font-mono text-[0.8125rem] text-muted-foreground">
                        {row.type}
                      </td>
                      <td className="py-2.5 pr-4 font-mono text-[0.8125rem] tabular-nums text-muted-foreground">
                        {row.def}
                      </td>
                      <td className="py-2.5 text-[0.8125rem] text-muted-foreground">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="hidden border-l border-border p-5 lg:block">
            <p className="fig-label text-muted-foreground">On this page</p>
            <ul className="mt-3 flex flex-col gap-2">
              {TOC.map((item, i) => (
                <li
                  key={item}
                  className={i === 0 ? "text-sm text-signal" : "text-sm text-muted-foreground"}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div>
        <Link
          href="/docs"
          className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-signal-strong"
        >
          Read the docs
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
