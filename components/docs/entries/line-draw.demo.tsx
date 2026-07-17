"use client";

import { useState } from "react";
import { LineDraw, LineDrawPath } from "@/components/motion/line-draw";

/* ── Live preview (client) ────────────────────────────────────────────
 * LineDraw plays on mount (initial → visible), not on scroll-into-view,
 * so a replay button is the only way to feel it again without a full
 * reload — the one legitimate reason this demo needs its own state.
 */
function Cell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {children}
      <span className="font-mono text-[0.625rem] text-muted-foreground">{label}</span>
    </div>
  );
}

export function Demo() {
  const [replay, setReplay] = useState(0);

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-6">
      <div className="grid grid-cols-2 gap-10">
        <Cell label="stagger={0.25}, fill">
          <LineDraw key={`badge-${replay}`} stagger={0.25} viewBox="0 0 24 24" className="size-16">
            <LineDrawPath
              d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z"
              className="stroke-foreground fill-signal/20"
              strokeWidth={1.5}
            />
            <LineDrawPath
              d="M7.5 12.5l3 3 6-6"
              className="stroke-signal fill-none"
              strokeWidth={1.75}
            />
          </LineDraw>
        </Cell>
        <Cell label="delay={0.2}, stagger={0.15}">
          <LineDraw
            key={`route-${replay}`}
            delay={0.2}
            stagger={0.15}
            viewBox="0 0 96 32"
            className="h-8 w-24"
          >
            <LineDrawPath d="M4 26 L26 8" className="stroke-signal fill-none" strokeWidth={2} />
            <LineDrawPath d="M26 8 L50 22" className="stroke-signal fill-none" strokeWidth={2} />
            <LineDrawPath
              d="M50 22 L74 6 L92 16"
              className="stroke-signal fill-none"
              strokeWidth={2}
            />
          </LineDraw>
        </Cell>
      </div>
      <button
        type="button"
        onClick={() => setReplay((n) => n + 1)}
        className="rounded-sm border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
      >
        Replay
      </button>
    </div>
  );
}
