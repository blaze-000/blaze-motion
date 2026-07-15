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
  className?: string;
  /** hide the hover copy button (e.g. for tiny inline-ish snippets) */
  noCopy?: boolean;
};

/** Build-time syntax-highlighted code block (Shiki, zero runtime JS). */
export async function CodeBlock({ code, lang = "tsx", className, noCopy }: CodeBlockProps) {
  const highlighter = await getHighlighter();
  const trimmed = code.trim();
  const html = highlighter.codeToHtml(trimmed, { lang, theme: "vesper" });

  return (
    <div className={cn("group relative overflow-hidden rounded-xl border border-border bg-card", className)}>
      <div
        className="overflow-x-auto p-4 text-[13px] leading-relaxed [&_code]:font-mono [&_pre]:!m-0 [&_pre]:!bg-transparent [&_pre]:!p-0"
        // Trusted build-time input: `code` is hardcoded doc source, never user input (FG-001).
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {!noCopy && (
        <CopyButton
          text={trimmed}
          className="absolute right-2.5 top-2.5 rounded-md border border-border bg-background/80 p-1.5 text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
        />
      )}
    </div>
  );
}
