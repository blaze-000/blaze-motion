"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { componentsByCategory, getDocMeta } from "./registry";

const GROUPS = componentsByCategory();

/** The grouped component list — shared by the desktop rail and the mobile drawer. */
function SidebarNav({
  activeSlug,
  onNavigate,
}: {
  activeSlug: string | null;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Components" className="flex flex-col gap-7">
      {GROUPS.map((group) => (
        <div key={group.category} className="flex flex-col gap-2">
          <p className="fig-label px-3 text-muted-foreground">{group.category}</p>
          <ul className="flex flex-col gap-0.5">
            {group.items.map((item) => {
              const active = item.slug === activeSlug;
              return (
                <li key={item.slug}>
                  <Link
                    href={`/docs/${item.slug}`}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-1.5 text-sm transition-colors",
                      active
                        ? "bg-signal/10 font-medium text-signal"
                        : "text-muted-foreground hover:bg-card hover:text-foreground",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

/**
 * Persistent component navigation for every /docs page.
 * - lg+: a sticky, own-scrolling left rail.
 * - below lg: a sticky disclosure bar that expands the same grouped list.
 * Highlights the active component from the current pathname.
 */
export function DocsSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Derive the active slug from /docs/<slug>; the landing page has none.
  const match = pathname?.match(/^\/docs\/([^/]+)/);
  const activeSlug = match?.[1] ?? null;
  const activeTitle = activeSlug ? (getDocMeta(activeSlug)?.title ?? null) : null;

  // Collapse the mobile drawer whenever the route changes (covers browser
  // back/forward, not just link clicks). pathname is the intended trigger.
  // biome-ignore lint/correctness/useExhaustiveDependencies: run on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile disclosure — full-width bar above the content */}
      <div className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur-md lg:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="docs-mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="container-page flex w-full items-center justify-between gap-3 px-6 py-3 text-left"
        >
          <span className="flex min-w-0 items-center gap-2">
            <span className="fig-label text-muted-foreground">Components</span>
            {activeTitle ? (
              <span className="truncate text-sm font-medium text-foreground">{activeTitle}</span>
            ) : null}
          </span>
          <ChevronDown
            aria-hidden
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
        <div
          id="docs-mobile-nav"
          className={cn("overflow-hidden border-t border-border", open ? "block" : "hidden")}
        >
          <div className="container-page max-h-[70vh] overflow-y-auto px-3 py-4">
            <SidebarNav activeSlug={activeSlug} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </div>

      {/* Desktop rail — sticky, own scroll */}
      <aside className="hidden w-64 shrink-0 border-r border-border lg:block">
        <div className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-3 py-10">
          <SidebarNav activeSlug={activeSlug} />
        </div>
      </aside>
    </>
  );
}
