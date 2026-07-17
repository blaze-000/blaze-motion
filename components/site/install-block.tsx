import { CopyButton } from "./copy-button";

const ALL_CMD = "npx shadcn add https://motion.asmitsah.dev/r/all.json";
const ONE_CMD = "npx shadcn add https://motion.asmitsah.dev/r/slide-in.json";
const NS_REGISTER =
  "npx shadcn registry add @blaze-motion=https://motion.asmitsah.dev/r/{name}.json";
const NS_ADD = "npx shadcn add @blaze-motion/all";

function CommandRow({ text, label }: { text: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-border bg-panel-2 px-4 py-3 font-mono text-[0.8125rem]">
      <span className="select-none text-signal" aria-hidden>
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-foreground [scrollbar-width:none]">
        {text}
      </code>
      <CopyButton text={text} label={label} className="shrink-0 rounded-md p-1" />
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

      <div className="flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex flex-col gap-2">
          <span className="fig-label text-foreground">Everything at once</span>
          <CommandRow text={ALL_CMD} label="Copy full-engine install command" />
          <p className="text-sm text-muted-foreground">
            Resolves for anyone today — no{" "}
            <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
              components.json
            </code>{" "}
            entry, no prior setup. One command lands the whole engine — the tokens, the provider,
            and every primitive — into your repo, editable.
          </p>
        </div>

        <div className="grid gap-5 border-t border-border pt-4 md:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-2">
            <span className="fig-label text-foreground">Any single component</span>
            <CommandRow text={ONE_CMD} label="Copy single-component install command" />
            <p className="text-sm text-muted-foreground">
              Every primitive installs on its own — swap{" "}
              <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                slide-in
              </code>{" "}
              for any name. It pulls the shared engine in automatically.
            </p>
          </div>

          <div className="flex min-w-0 flex-col gap-2">
            <span className="fig-label text-foreground">Repeat users — register once</span>
            <CommandRow text={NS_REGISTER} label="Copy namespace registration command" />
            <CommandRow text={NS_ADD} label="Copy namespace install command" />
            <p className="text-sm text-muted-foreground">
              Register the{" "}
              <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                @blaze-motion
              </code>{" "}
              namespace once, then add by shorthand across every project.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
