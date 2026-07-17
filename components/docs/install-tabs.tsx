"use client";

import { type ReactNode, useState } from "react";
import { CopyButton } from "@/components/site/copy-button";
import { cn } from "@/lib/utils";

type Method = "cli" | "manual";
type Manager = "npm" | "pnpm" | "yarn" | "bun";

const MANAGERS: Record<Manager, (pkg: string) => string> = {
  npm: (pkg) => `npm install ${pkg}`,
  pnpm: (pkg) => `pnpm add ${pkg}`,
  yarn: (pkg) => `yarn add ${pkg}`,
  bun: (pkg) => `bun add ${pkg}`,
};

/** A single `$ command` row — mono, horizontally scrollable, with a copy button. */
function CommandRow({ command }: { command: string }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-border bg-panel-2 px-4 py-3 font-mono text-[0.8125rem]">
      <span className="select-none text-signal" aria-hidden>
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-foreground [scrollbar-width:none]">
        {command}
      </code>
      <CopyButton text={command} label="Copy command" className="shrink-0 rounded-md p-1" />
    </div>
  );
}

function MethodTab({
  active,
  id,
  controls,
  onClick,
  children,
}: {
  active: boolean;
  id: string;
  controls: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      role="tab"
      id={id}
      aria-selected={active}
      aria-controls={controls}
      onClick={onClick}
      className={cn(
        "rounded-sm px-3 py-1.5 text-sm transition-colors",
        active ? "bg-signal/10 text-signal" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

/**
 * The Installation block — CLI vs Manual method tabs, matching the shadcn docs
 * shape. CLI is the one-line registry install. Manual walks through installing
 * any registry prerequisites (e.g. the provider base), then the runtime
 * dependency, then pasting the full component source (passed in as a slot
 * because it is highlighted at build time by Shiki).
 */
export function InstallTabs({
  installCommand,
  sourceBlock,
  targetPath,
  dependencies = ["motion"],
  registryDependencies = [],
}: {
  installCommand: string;
  /** the highlighted full-source CodeBlock, server-rendered and passed in */
  sourceBlock: ReactNode;
  /** where the source file should land, e.g. components/motion/fade.tsx */
  targetPath: string;
  /** npm runtime deps the manual path installs first, e.g. ["motion"] */
  dependencies?: string[];
  /** other registry items this one needs (e.g. the provider base) — full registry URLs */
  registryDependencies?: string[];
}) {
  const [method, setMethod] = useState<Method>("cli");
  const [manager, setManager] = useState<Manager>("npm");

  const pkg = (dependencies.length > 0 ? dependencies : ["motion"]).join(" ");

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div
        role="tablist"
        aria-label="Installation method"
        className="flex items-center gap-1 border-b border-border px-2 py-1.5"
      >
        <MethodTab
          active={method === "cli"}
          id="install-tab-cli"
          controls="install-panel-cli"
          onClick={() => setMethod("cli")}
        >
          CLI
        </MethodTab>
        <MethodTab
          active={method === "manual"}
          id="install-tab-manual"
          controls="install-panel-manual"
          onClick={() => setMethod("manual")}
        >
          Manual
        </MethodTab>
      </div>

      <div
        role="tabpanel"
        id="install-panel-cli"
        aria-labelledby="install-tab-cli"
        hidden={method !== "cli"}
        className="flex flex-col gap-3 p-4 sm:p-5"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          One command drops the source into your repo — editable, with the provider and{" "}
          <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
            motion
          </code>{" "}
          pulled in automatically.
        </p>
        <CommandRow command={installCommand} />
      </div>

      <div
        role="tabpanel"
        id="install-panel-manual"
        aria-labelledby="install-tab-manual"
        hidden={method !== "manual"}
        className="flex flex-col gap-6 p-4 sm:p-5"
      >
        {registryDependencies.length > 0 ? (
          <div className="flex flex-col gap-3 rounded-sm border border-dashed border-border bg-panel-2/50 p-3">
            <div className="flex items-baseline gap-2">
              <span className="fig-label text-signal">Prerequisite</span>
              <span className="text-sm text-foreground">Install the provider base first</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              This component imports from{" "}
              <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                @/lib/motion
              </code>{" "}
              and needs{" "}
              <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                {"<MotionProvider>"}
              </code>{" "}
              mounted in your root layout — install the base once, before copying this component.
            </p>
            {registryDependencies.map((dep) => (
              <CommandRow key={dep} command={`npx shadcn add ${dep}`} />
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="fig-label text-signal">Step 1</span>
            <span className="text-sm text-foreground">Install the runtime dependency</span>
          </div>
          <fieldset className="flex w-fit items-center gap-1 rounded-sm border border-border bg-panel-2 p-0.5">
            <legend className="sr-only">Package manager</legend>
            {(Object.keys(MANAGERS) as Manager[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={manager === m}
                onClick={() => setManager(m)}
                className={cn(
                  "rounded-[0.1875rem] px-2.5 py-1 font-mono text-xs transition-colors",
                  manager === m
                    ? "bg-signal/15 text-signal"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {m}
              </button>
            ))}
          </fieldset>
          <CommandRow command={MANAGERS[manager](pkg)} />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="fig-label text-signal">Step 2</span>
            <span className="text-sm text-foreground">
              Copy the source into{" "}
              <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                {targetPath}
              </code>
            </span>
          </div>
          {sourceBlock}
        </div>
      </div>
    </div>
  );
}
