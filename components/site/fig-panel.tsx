import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Corner = "tl" | "tr" | "bl" | "br";

const CORNERS: Record<Corner, { pos: string; barH: string; barV: string }> = {
  tl: { pos: "-left-1.5 -top-1.5", barH: "left-0 top-0", barV: "left-0 top-0" },
  tr: { pos: "-right-1.5 -top-1.5", barH: "right-0 top-0", barV: "right-0 top-0" },
  bl: { pos: "-bottom-1.5 -left-1.5", barH: "bottom-0 left-0", barV: "bottom-0 left-0" },
  br: { pos: "-bottom-1.5 -right-1.5", barH: "bottom-0 right-0", barV: "bottom-0 right-0" },
};

function CropMark({ corner }: { corner: Corner }) {
  const c = CORNERS[corner];
  return (
    <span className={cn("pointer-events-none absolute size-2.5", c.pos)} aria-hidden>
      <span className={cn("absolute h-px w-2.5 bg-border", c.barH)} />
      <span className={cn("absolute h-2.5 w-px bg-border", c.barV)} />
    </span>
  );
}

type FigPanelProps = {
  figNo: string;
  title: string;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Extra classes for the inner content region. */
  bodyClassName?: string;
};

export function FigPanel({
  figNo,
  title,
  headerRight,
  children,
  className,
  bodyClassName,
}: FigPanelProps) {
  return (
    <div className={cn("relative h-full", className)}>
      <CropMark corner="tl" />
      <CropMark corner="tr" />
      <CropMark corner="bl" />
      <CropMark corner="br" />
      <div className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card">
        <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5">
          <span className="fig-label text-muted-foreground">
            FIG.&nbsp;{figNo}
            <span className="px-1.5 text-border">·</span>
            <span className="text-foreground">{title}</span>
          </span>
          {headerRight ? <div className="shrink-0">{headerRight}</div> : null}
        </div>
        <div className={cn("flex-1", bodyClassName)}>{children}</div>
      </div>
    </div>
  );
}
