"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DOCS_FLAT, DOCS_NAV } from "./docs-data";

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<string>(DOCS_FLAT[0]?.id ?? "");

  useEffect(() => {
    const els = DOCS_FLAT.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (els.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Activate a heading once it clears the sticky nav; the lower bound keeps
      // the last section from flickering as it leaves the top.
      { rootMargin: "-96px 0px -55% 0px", threshold: 0 },
    );
    els.forEach((el) => {
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <div className="mx-auto grid max-w-[88rem] gap-10 px-6 py-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:px-12 lg:py-16 xl:grid-cols-[13rem_minmax(0,1fr)_13rem] xl:gap-12">
      <aside className="hidden lg:block">
        <nav aria-label="Documentation" className="sticky top-24 flex flex-col gap-6">
          {DOCS_NAV.map((group) => (
            <div key={group.group}>
              <p className="fig-label text-muted-foreground">{group.group}</p>
              <ul className="mt-2.5 flex flex-col gap-0.5">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={active === item.id ? "true" : undefined}
                      className={cn(
                        "block rounded-sm px-2.5 py-1.5 text-sm transition-colors",
                        active === item.id
                          ? "bg-signal/10 text-signal"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <div className="min-w-0">
        <details className="mb-10 rounded-md border border-border bg-card lg:hidden">
          <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-foreground">
            On this page
          </summary>
          <ul className="flex flex-col gap-0.5 border-t border-border px-4 py-3">
            {DOCS_FLAT.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="block py-1 text-sm text-muted-foreground hover:text-foreground">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
        {children}
      </div>

      <aside className="hidden xl:block">
        <div className="sticky top-24">
          <p className="fig-label text-muted-foreground">On this page</p>
          <ul className="mt-3 flex flex-col border-l border-border">
            {DOCS_FLAT.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "-ml-px block border-l py-1 pl-3 text-sm transition-colors",
                    active === item.id
                      ? "border-signal text-signal"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
