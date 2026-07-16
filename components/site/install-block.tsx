import { CopyButton } from "./copy-button";

const URL_CMD = "npx shadcn add https://motion.asmitsah.dev/r/all.json";

export function InstallBlock() {
  return (
    <div className="rounded-md border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
        <span className="fig-label text-muted-foreground">Install · works today</span>
        <span className="fig-label text-signal">no config, no setup</span>
      </div>
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-center gap-3 rounded-sm border border-border bg-panel-2 px-4 py-3 font-mono text-[0.8125rem]">
          <span className="select-none text-signal" aria-hidden>
            $
          </span>
          <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-foreground [scrollbar-width:none]">
            {URL_CMD}
          </code>
          <CopyButton
            text={URL_CMD}
            label="Copy install command"
            className="shrink-0 rounded-md p-1"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Resolves for anyone today — no{" "}
          <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
            components.json
          </code>{" "}
          entry, no prior setup. One command lands the whole engine — the tokens, the provider, and
          every primitive — into your repo, editable.
        </p>
      </div>
    </div>
  );
}
