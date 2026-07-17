"use client";

import { RotateCcw } from "lucide-react";
import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type ReplayPreviewProps = {
  /** Short heading shown top-left — usually the variant / direction on show. */
  label: string;
  /** The live demo. Remounted (via `key`) each time Replay is pressed so a
   *  play-once / on-mount animation re-triggers. */
  children: ReactNode;
  className?: string;
};

/**
 * A labelled, bordered preview panel with its OWN replay button. Pressing
 * replay bumps a local `key`, remounting `children` so an on-mount animation
 * (trigger="mount") plays again — scoped to THIS panel only. Generic enough
 * for any entrance entry to drop one per variant.
 */
export function ReplayPreview({ label, children, className }: ReplayPreviewProps) {
  const [replay, setReplay] = useState(0);

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-sm border border-border bg-panel-2/40",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 border-border border-b px-3 py-2">
        <span className="font-mono text-[0.625rem] text-muted-foreground">{label}</span>
        <button
          type="button"
          aria-label={`Replay ${label}`}
          onClick={() => setReplay((n) => n + 1)}
          className="inline-flex size-6 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
        >
          <RotateCcw className="size-3.5" aria-hidden />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center px-4 py-6">
        <div key={replay} className="flex w-full items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
