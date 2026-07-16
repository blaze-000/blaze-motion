"use client";

import { RotateCw } from "lucide-react";
import Image from "next/image";
import { type ReactNode, useState } from "react";
import { CinematicImage } from "@/components/motion/cinematic-image";
import { FadeIn } from "@/components/motion/fade-in";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { EFFECT_META, type EffectName, renderEffectDemo } from "@/components/site/effect-demos";
import { FigPanel } from "@/components/site/fig-panel";

type CorePrimitive = "fadein" | "reveal" | "stagger" | "cinematicimage" | "pagetransition";
export type DemoName = CorePrimitive | EffectName;

function Swatch({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-14 w-full max-w-[16rem] items-center justify-center rounded-sm border border-border bg-panel-2 px-4 text-sm text-foreground">
      {children}
    </div>
  );
}

function RouteSwap({ swap }: { swap: number }) {
  const routes = ["/", "/docs"];
  // swap % 2 is always 0 or 1 — both in-bounds for this fixed 2-element array.
  const current = routes[swap % 2]!;
  return (
    <PageTransition routeKey={current} className="w-full max-w-[16rem]">
      <div className="flex flex-col gap-1.5 rounded-sm border border-border bg-panel-2 px-4 py-3">
        <span className="font-mono text-[0.6875rem] text-muted-foreground">route</span>
        <span className="font-mono text-sm text-signal">{current}</span>
      </div>
    </PageTransition>
  );
}

function renderDemo(name: DemoName, k: number): ReactNode {
  switch (name) {
    case "fadein":
      return (
        <FadeIn key={k} className="w-full max-w-[16rem]">
          <Swatch>opacity 0 → 1</Swatch>
        </FadeIn>
      );
    case "reveal":
      return (
        <Reveal key={k} className="w-full max-w-[16rem]">
          <Swatch>y +28 → 0</Swatch>
        </Reveal>
      );
    case "stagger":
      return (
        <Stagger key={k} className="grid w-full max-w-[16rem] gap-2">
          {["One", "Two", "Three"].map((label) => (
            <StaggerItem key={label}>
              <div className="rounded-sm border border-border bg-panel-2 px-4 py-2 text-sm text-foreground">
                {label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      );
    case "cinematicimage":
      return (
        <CinematicImage
          key={k}
          className="relative aspect-video w-full max-w-[16rem] overflow-hidden rounded-sm border border-border"
        >
          <Image
            src="/cinematic/light-trails.jpg"
            alt="Long-exposure light trails settling into a single streak"
            fill
            sizes="256px"
            className="object-cover"
          />
        </CinematicImage>
      );
    case "pagetransition":
      return <RouteSwap swap={k} />;
    default:
      return renderEffectDemo(name, k);
  }
}

export function PrimitiveDemo({ name, figNo }: { name: DemoName; figNo: string }) {
  const [replayKey, setReplayKey] = useState(0);
  const meta = EFFECT_META[name as EffectName];
  const replayable = meta ? meta.replayable : true;
  return (
    <FigPanel
      figNo={figNo}
      title="Preview"
      headerRight={
        replayable ? (
          <button
            type="button"
            onClick={() => setReplayKey((k) => k + 1)}
            aria-label="Replay demo"
            className="inline-flex size-6 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-signal/50 hover:text-foreground"
          >
            <RotateCw className="size-3" aria-hidden />
          </button>
        ) : meta?.hint ? (
          <span className="fig-label text-muted-foreground">{meta.hint}</span>
        ) : null
      }
      bodyClassName="flex min-h-[12rem] items-center justify-center p-6"
    >
      {renderDemo(name, replayKey)}
    </FigPanel>
  );
}
