"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";

const INSTALL = "npx shadcn add https://motion.asmitsah.dev/r/all.json";
const REPO_URL = "https://github.com/blaze-000/blaze-motion";

export function HeroInstall() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard
      ?.writeText(INSTALL)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 rounded-md border border-border bg-card/80 px-4 py-3 font-mono text-[0.8125rem] backdrop-blur-sm">
        <span className="select-none text-signal" aria-hidden>
          $
        </span>
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-foreground [scrollbar-width:none]">
          {INSTALL}
        </code>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy install command"}
          className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
        >
          {copied ? (
            <Check className="size-4 text-signal" aria-hidden />
          ) : (
            <Copy className="size-4" aria-hidden />
          )}
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-signal-strong"
        >
          {copied ? (
            <Check className="size-4" aria-hidden />
          ) : (
            <Copy className="size-4" aria-hidden />
          )}
          {copied ? "Copied" : "Copy install"}
        </button>
        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-signal/50 hover:text-signal"
        >
          Star on GitHub
          <ArrowUpRight className="size-4" aria-hidden />
        </a>
      </div>
    </div>
  );
}
