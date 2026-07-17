"use client";

import { useState } from "react";
import { PageTransition } from "@/components/motion/page-transition";

/* ── Live preview ──────────────────────────────────────────────────────
 * A tiny mock browser: three tabs share one <PageTransition> keyed on the
 * active tab. Switching tabs re-triggers the fade + 8px shift — needs its
 * own click state, so it lives here (client) and the entry stays server.
 */
const ROUTES = [
  { key: "overview", label: "Overview", body: "The current route's content." },
  { key: "pricing", label: "Pricing", body: "Swap tabs to re-trigger the transition." },
  { key: "about", label: "About", body: "Each change fades + shifts 8px, then settles." },
] as const;

export function Demo() {
  const [active, setActive] = useState<(typeof ROUTES)[number]["key"]>("overview");
  const route = ROUTES.find((r) => r.key === active) ?? ROUTES[0];

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-sm border border-border bg-panel-2">
      <div className="flex border-b border-border">
        {ROUTES.map((r) => (
          <button
            key={r.key}
            type="button"
            onClick={() => setActive(r.key)}
            aria-current={r.key === active ? "page" : undefined}
            className={
              r.key === active
                ? "flex-1 px-3 py-2 text-xs text-foreground"
                : "flex-1 px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            }
          >
            {r.label}
          </button>
        ))}
      </div>
      <div className="relative h-24 overflow-hidden px-4 py-3">
        <PageTransition routeKey={route.key} className="text-sm text-foreground">
          {route.body}
        </PageTransition>
      </div>
    </div>
  );
}
