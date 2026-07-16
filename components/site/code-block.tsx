import { createHighlighter, type Highlighter } from "shiki";
import { cn } from "@/lib/utils";
import { CopyButton } from "./copy-button";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["vesper"],
      langs: ["tsx", "ts", "bash", "json", "css"],
    });
  }
  return highlighterPromise;
}

type CodeBlockProps = {
  code: string;
  lang?: "tsx" | "ts" | "bash" | "json" | "css";
  /** Optional mono caption shown in the panel header (e.g. a file path). */
  caption?: string;
  className?: string;
  noCopy?: boolean;
};

export async function CodeBlock({
  code,
  lang = "tsx",
  caption,
  className,
  noCopy,
}: CodeBlockProps) {
  const highlighter = await getHighlighter();
  const trimmed = code.trim();
  const html = highlighter.codeToHtml(trimmed, { lang, theme: "vesper" });

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-md border border-border bg-card",
        className,
      )}
    >
      {caption ? (
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <span className="fig-label text-muted-foreground">{caption}</span>
        </div>
      ) : null}
      <div
        className="overflow-x-auto p-4 text-[0.8125rem] leading-relaxed [&_code]:font-mono [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: build-time Shiki output over hardcoded doc source — never user input (FG-001).
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {!noCopy && (
        <CopyButton
          text={trimmed}
          label="Copy code"
          className="absolute right-2.5 top-2.5 rounded-md border border-border bg-background/80 p-1.5 opacity-0 backdrop-blur-sm transition-opacity focus-visible:opacity-100 group-hover:opacity-100"
        />
      )}
    </div>
  );
}
