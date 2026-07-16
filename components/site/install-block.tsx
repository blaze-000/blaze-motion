"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

const URL_CMD = "npx shadcn add https://motion.asmitsah.dev/r/all.json";
const SHORT_CMD = "npx shadcn add @blaze-motion/all";
const REGISTRY_ENTRY = `"registries": {
  "@blaze-motion": "https://motion.asmitsah.dev/r/{name}.json"
}`;

const TABS = [
  { id: "url", label: "URL — works today" },
  { id: "shorthand", label: "@blaze-motion — shorthand" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/** A copy-able shell command row. */
function CommandRow({ command, label }: { command: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-border bg-panel-2 px-4 py-3 font-mono text-[0.8125rem]">
      <span className="select-none text-signal" aria-hidden>
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-foreground [scrollbar-width:none]">
        {command}
      </code>
      <CopyButton text={command} label={label} className="shrink-0 rounded-md p-1" />
    </div>
  );
}

export function InstallBlock() {
  const [active, setActive] = useState<TabId>("url");
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (index + 1) % TABS.length : (index - 1 + TABS.length) % TABS.length;
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="rounded-md border border-border bg-card">
      <div role="tablist" aria-label="Install command" className="flex border-b border-border">
        {TABS.map((tab, i) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={cn(
                "relative px-4 py-3 font-mono text-xs transition-colors sm:text-[0.8125rem]",
                selected ? "text-signal" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {tab.label}
              {selected ? (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-signal" aria-hidden />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="p-4 sm:p-5">
        {active === "url" ? (
          <div
            role="tabpanel"
            id={`${baseId}-panel-url`}
            aria-labelledby={`${baseId}-tab-url`}
            className="flex flex-col gap-3"
          >
            <CommandRow command={URL_CMD} label="Copy install command" />
            <p className="text-sm text-muted-foreground">
              Cold-working, zero setup — resolves for anyone today. One command lands all 7 files
              (the tokens, the provider, and every primitive) into your repo, editable.
            </p>
          </div>
        ) : (
          <div
            role="tabpanel"
            id={`${baseId}-panel-shorthand`}
            aria-labelledby={`${baseId}-tab-shorthand`}
            className="flex flex-col gap-3"
          >
            <CommandRow command={SHORT_CMD} label="Copy shorthand install command" />
            <p className="text-sm text-muted-foreground">
              The shorthand needs a one-time <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">components.json</code>{" "}
              registries entry — until the shadcn directory PR{" "}
              <a
                href="https://github.com/shadcn-ui/ui/pull/11188"
                target="_blank"
                rel="noopener noreferrer"
                className="text-signal underline decoration-signal/40 underline-offset-2 hover:decoration-signal"
              >
                #11188
              </a>{" "}
              merges, at which point it resolves cold like any namespaced registry.
            </p>
            <pre className="overflow-x-auto rounded-sm border border-border bg-panel-2 p-3 font-mono text-[0.75rem] leading-relaxed text-muted-foreground [scrollbar-width:none]">
              <code>{REGISTRY_ENTRY}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
