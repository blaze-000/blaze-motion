import { CopyButton } from "./copy-button";

/** A copy-able shell command block. */
export function Command({ children, className }: { children: string; className?: string }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 font-mono text-[13px] ${className ?? ""}`}
    >
      <span className="select-none text-primary" aria-hidden>
        $
      </span>
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap text-foreground [scrollbar-width:none]">
        {children}
      </code>
      <CopyButton
        text={children}
        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground"
      />
    </div>
  );
}
