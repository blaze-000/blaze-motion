import type { ReactNode } from "react";
import { CopyButton } from "./copy-button";

const ALL_CMD = "npx shadcn add https://motion.asmitsah.dev/r/all.json";
const ONE_CMD = "npx shadcn add https://motion.asmitsah.dev/r/slide.json";
const NS_REGISTER =
  "npx shadcn registry add @blaze-motion=https://motion.asmitsah.dev/r/{name}.json";
const NS_ADD = "npx shadcn add @blaze-motion/all";

function CommandRow({ text, label }: { text: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-border bg-panel-2 px-4 py-3 font-mono text-[0.8125rem]">
      <span className="select-none text-signal" aria-hidden>
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-foreground [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {text}
      </code>
      <CopyButton text={text} label={label} className="shrink-0 rounded-md p-1" />
    </div>
  );
}

function InstallStep({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <span className="fig-label text-foreground">{label}</span>
      <div className="mt-2 flex flex-col gap-2">{children}</div>
    </div>
  );
}

export function InstallBlock() {
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <span className="fig-label text-muted-foreground">Install · works today</span>
        <span className="fig-label text-signal">no config, no setup</span>
      </div>

      {/* Full-width command rows — each `npx shadcn add …` gets the whole card width so
          nothing clips. A genuinely long URL (the namespace register) stays swipeable with
          the scrollbar chrome hidden, never a hard clip. */}
      <div className="flex flex-col divide-y divide-border">
        <InstallStep label="Everything at once" className="p-4 sm:p-5">
          <CommandRow text={ALL_CMD} label="Copy full-engine install command" />
          <p className="text-sm text-muted-foreground">
            Resolves for anyone today — no{" "}
            <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
              components.json
            </code>{" "}
            entry, no prior setup. One command lands the whole engine — the tokens, the provider,
            and every primitive — into your repo, editable.
          </p>
        </InstallStep>

        <InstallStep label="Any single component" className="p-4 sm:p-5">
          <CommandRow text={ONE_CMD} label="Copy single-component install command" />
          <p className="text-sm text-muted-foreground">
            Every primitive installs on its own — swap{" "}
            <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
              slide
            </code>{" "}
            for any name. It pulls the shared engine in automatically.
          </p>
        </InstallStep>

        <InstallStep label="Repeat users — register once" className="p-4 sm:p-5">
          <CommandRow text={NS_REGISTER} label="Copy namespace registration command" />
          <CommandRow text={NS_ADD} label="Copy namespace install command" />
          <p className="text-sm text-muted-foreground">
            Register the{" "}
            <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
              @blaze-motion
            </code>{" "}
            namespace once, then add by shorthand across every project.
          </p>
        </InstallStep>
      </div>
    </div>
  );
}
