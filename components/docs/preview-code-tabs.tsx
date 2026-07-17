"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

type Tab = "preview" | "code";

/**
 * The tabbed Preview / Code block at the top of a component page — the shape of
 * the shadcn component docs. `preview` is the live demo (server-rendered and
 * passed in as a slot); `code` is its highlighted usage snippet.
 */
export function PreviewCodeTabs({ preview, code }: { preview: ReactNode; code: ReactNode }) {
  const [tab, setTab] = useState<Tab>("preview");

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div
        role="tablist"
        aria-label="Preview and code"
        className="flex items-center gap-1 border-b border-border px-2 py-1.5"
      >
        {(["preview", "code"] as const).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`pc-tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`pc-panel-${t}`}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-sm px-3 py-1.5 text-sm capitalize transition-colors",
              tab === t
                ? "bg-signal/10 text-signal"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id="pc-panel-preview"
        aria-labelledby="pc-tab-preview"
        hidden={tab !== "preview"}
        className="flex min-h-[16rem] items-center justify-center p-8"
      >
        {preview}
      </div>

      <div role="tabpanel" id="pc-panel-code" aria-labelledby="pc-tab-code" hidden={tab !== "code"}>
        {code}
      </div>
    </div>
  );
}
