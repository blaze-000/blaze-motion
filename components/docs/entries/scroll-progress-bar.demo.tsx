"use client";

import { useRef } from "react";
import { ScrollProgressBar } from "@/components/motion/scroll-progress-bar";

/* ── Live preview ──────────────────────────────────────────────────────
 * A full-page ScrollProgressBar can't be shown scoped inside a doc — it
 * would pin to the real viewport. So this demo scopes it to its own
 * scrollable panel via `target`, which needs a ref — hence its own
 * "use client" state, kept out of the (server) entry file. The default
 * `fixed` position is overridden to `sticky` so the bar stays pinned to
 * the top of the panel's own scroll, not the window's.
 */
const LINES = [
  "Scroll this panel — the bar above tracks its progress, not the page's.",
  "The raw scroll fraction is spring-smoothed, so the fill glides instead of snapping.",
  "Pass a `target` ref to scope it to any scrollable container like this one.",
  "Omit `target` and it tracks the whole page instead — the common case.",
  "Reach the bottom and the bar settles at 100%.",
  "You made it.",
];

export function Demo() {
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-sm">
      <div
        ref={panelRef}
        className="h-40 overflow-y-auto rounded-sm border border-border bg-panel-2"
      >
        <ScrollProgressBar target={panelRef} className="sticky" />
        <div className="space-y-3 px-4 pt-6 pb-4 text-sm text-muted-foreground">
          {LINES.map((line, i) => (
            <p key={line} className={i === LINES.length - 1 ? "text-foreground" : undefined}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
