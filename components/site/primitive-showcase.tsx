"use client";

import { RotateCw } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { CinematicImage } from "@/components/motion/cinematic-image";
import { Fade } from "@/components/motion/fade";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";
import { FigPanel } from "./fig-panel";

function Swatch({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-14 w-full max-w-[15rem] items-center justify-center rounded-sm border border-border bg-panel-2 px-4 text-sm text-foreground">
      {children}
    </div>
  );
}

type Primitive = {
  figNo: string;
  title: string;
  code: string;
  replayable: boolean;
  render: (k: number) => ReactNode;
};

const PRIMITIVES: Primitive[] = [
  {
    figNo: "01",
    title: "Fade",
    replayable: true,
    code: `<Fade direction="none">
  <h1>Above the fold</h1>
</Fade>`,
    render: (k) => (
      <Fade key={k} direction="none" trigger="mount" className="w-full max-w-[15rem]">
        <Swatch>opacity 0 → 1</Swatch>
      </Fade>
    ),
  },
  {
    figNo: "02",
    title: "Fade · reveal",
    replayable: true,
    code: `<Fade direction="up" trigger="inView">
  <h2>Rises into view</h2>
</Fade>`,
    render: (k) => (
      <Fade key={k} direction="up" trigger="mount" className="w-full max-w-[15rem]">
        <Swatch>y +16 → 0</Swatch>
      </Fade>
    ),
  },
  {
    figNo: "03",
    title: "Stagger",
    replayable: true,
    code: `<Stagger className="grid gap-2">
  <StaggerItem>One</StaggerItem>
  <StaggerItem>Two</StaggerItem>
  <StaggerItem>Three</StaggerItem>
</Stagger>`,
    render: (k) => (
      <Stagger key={k} className="grid w-full max-w-[15rem] gap-2">
        {["One", "Two", "Three"].map((label) => (
          <StaggerItem key={label}>
            <div className="rounded-sm border border-border bg-panel-2 px-4 py-2 text-sm text-foreground">
              {label}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    ),
  },
  {
    figNo: "04",
    title: "CinematicImage",
    replayable: true,
    code: `<CinematicImage className="relative aspect-video overflow-hidden">
  <Image src={src} alt="" fill className="object-cover" />
</CinematicImage>`,
    render: (k) => (
      <CinematicImage
        key={k}
        className="relative aspect-video w-full max-w-[15rem] overflow-hidden rounded-sm border border-border"
      >
        <Image
          src="/cinematic/light-trails.jpg"
          alt="Long-exposure light trails settling into a single streak"
          fill
          sizes="240px"
          className="object-cover"
        />
      </CinematicImage>
    ),
  },
  {
    figNo: "05",
    title: "MotionProvider",
    replayable: false,
    code: `// app/layout.tsx
<MotionProvider>{children}</MotionProvider>`,
    render: () => (
      <div className="w-full max-w-[15rem] font-mono text-[0.6875rem] leading-relaxed">
        <div className="rounded-sm border border-signal/40 bg-signal/5 px-3 py-2 text-signal">
          LazyMotion · strict · domAnimation
          <div className="mt-2 rounded-sm border border-border bg-panel-2 px-3 py-2 text-muted-foreground">
            MotionConfig · reducedMotion=&quot;user&quot;
            <div className="mt-2 rounded-sm border border-border bg-card px-3 py-2 text-foreground">
              your app
            </div>
          </div>
        </div>
        <p className="mt-2 text-muted-foreground">Mounted once in the root layout.</p>
      </div>
    ),
  },
];

function PrimitiveCard({ primitive }: { primitive: Primitive }) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [replayKey, setReplayKey] = useState(0);

  return (
    <FigPanel
      figNo={primitive.figNo}
      title={primitive.title}
      className="h-full"
      headerRight={
        <div className="flex items-center gap-2">
          <div className="flex rounded-sm border border-border p-0.5">
            {(["preview", "code"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={cn(
                  "rounded-[3px] px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wide transition-colors",
                  view === v
                    ? "bg-signal/15 text-signal"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {v}
              </button>
            ))}
          </div>
          {primitive.replayable && view === "preview" ? (
            <button
              type="button"
              onClick={() => setReplayKey((k) => k + 1)}
              aria-label={`Replay ${primitive.title} demo`}
              className="inline-flex size-6 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-signal/50 hover:text-foreground"
            >
              <RotateCw className="size-3" aria-hidden />
            </button>
          ) : null}
        </div>
      }
      bodyClassName="flex min-h-[11rem] items-center justify-center p-5"
    >
      {view === "preview" ? (
        primitive.render(replayKey)
      ) : (
        <pre
          // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable code block must be keyboard-focusable (WCAG 2.1.1 / axe scrollable-region-focusable).
          tabIndex={0}
          className="w-full overflow-x-auto font-mono text-[0.75rem] leading-relaxed text-muted-foreground [scrollbar-width:none]"
        >
          <code>{primitive.code}</code>
        </pre>
      )}
    </FigPanel>
  );
}

export function PrimitiveShowcase() {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PRIMITIVES.map((p) => (
        <StaggerItem key={p.figNo} className="flex min-w-0">
          <div className="w-full min-w-0">
            <PrimitiveCard primitive={p} />
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
