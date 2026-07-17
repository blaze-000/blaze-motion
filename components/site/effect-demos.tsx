"use client";

import type { ReactNode } from "react";
import { AnimatedUnderline } from "@/components/motion/animated-underline";
import { BlurToFocus } from "@/components/motion/blur-to-focus";
import { LineDraw, LineDrawPath } from "@/components/motion/line-draw";
import { NumberTicker } from "@/components/motion/number-ticker";
import { RadialStagger } from "@/components/motion/radial-stagger";
import { ScrollProgressBar } from "@/components/motion/scroll-progress-bar";
import { SiblingDimming, SiblingDimmingItem } from "@/components/motion/sibling-dimming";
import { SpringPop } from "@/components/motion/spring-pop";
import { TextReveal } from "@/components/motion/text-reveal";

export type EffectName =
  | "springpop"
  | "blurtofocus"
  | "linedraw"
  | "animatedunderline"
  | "siblingdimming"
  | "radialstagger"
  | "textreveal"
  | "numberticker"
  | "scrollprogressbar";

type EffectMeta = {
  /** true when a replay button meaningfully re-triggers the demo (mount-driven) */
  replayable: boolean;
  /** short mono hint for interaction-driven demos (hover / click / scroll) */
  hint?: string;
};

export const EFFECT_META: Record<EffectName, EffectMeta> = {
  springpop: { replayable: true },
  blurtofocus: { replayable: true },
  linedraw: { replayable: true },
  animatedunderline: { replayable: false, hint: "Hover" },
  siblingdimming: { replayable: false, hint: "Hover a tile" },
  radialstagger: { replayable: false, hint: "Click a tile" },
  textreveal: { replayable: true },
  numberticker: { replayable: true },
  scrollprogressbar: { replayable: false, hint: "Scroll the page" },
};

function Swatch({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-14 w-full max-w-[15rem] items-center justify-center rounded-sm border border-border bg-panel-2 px-4 text-sm text-foreground">
      {children}
    </div>
  );
}

function ScrollDemo() {
  // Bound to whole-page scroll (no target) — the bar fills as you scroll the page.
  return (
    <div className="relative w-full max-w-[15rem] overflow-hidden rounded-md border border-border bg-panel-2">
      <ScrollProgressBar className="absolute" height={4} />
      <div className="flex flex-col gap-1.5 p-4 pt-5">
        <span className="font-mono text-[0.625rem] text-muted-foreground">scrollYProgress</span>
        <span className="text-sm text-foreground">Fills with page scroll →</span>
      </div>
    </div>
  );
}

export function renderEffectDemo(name: EffectName, k: number): ReactNode {
  switch (name) {
    case "springpop":
      return (
        <SpringPop key={k} className="w-full max-w-[15rem]">
          <Swatch>scale 0.8 → 1</Swatch>
        </SpringPop>
      );
    case "blurtofocus":
      return (
        <BlurToFocus key={k} className="w-full max-w-[15rem]">
          <Swatch>blur(10px) → blur(0)</Swatch>
        </BlurToFocus>
      );
    case "linedraw":
      return (
        <LineDraw
          key={k}
          viewBox="0 0 200 100"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          stagger={0.15}
          className="w-full max-w-[15rem] text-signal"
        >
          <LineDrawPath d="M8 92 L192 92" strokeWidth={1.5} className="text-border" />
          <LineDrawPath d="M8 78 L56 52 L104 64 L152 24 L192 12" />
        </LineDraw>
      );
    case "animatedunderline":
      return (
        <AnimatedUnderline as="span" className="cursor-default text-base text-foreground">
          Hover me
        </AnimatedUnderline>
      );
    case "siblingdimming":
      return (
        <SiblingDimming className="grid w-full max-w-[15rem] grid-cols-3 gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <SiblingDimmingItem
              // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static demo grid
              key={i}
              className="flex aspect-square items-center justify-center rounded-sm border border-border bg-panel-2 text-xs text-muted-foreground"
            >
              {i + 1}
            </SiblingDimmingItem>
          ))}
        </SiblingDimming>
      );
    case "radialstagger":
      return (
        <RadialStagger
          key={k}
          columns={5}
          step={0.05}
          className="w-full max-w-[13rem] gap-1.5"
          itemClassName="aspect-square rounded-sm bg-signal/70"
        >
          {Array.from({ length: 25 }, (_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: fixed-length static demo grid
            <span key={i} className="block size-full" />
          ))}
        </RadialStagger>
      );
    case "textreveal":
      return (
        <TextReveal
          key={k}
          as="p"
          trigger="mount"
          className="max-w-[15rem] text-center text-h3 text-foreground"
        >
          Motion, tuned once.
        </TextReveal>
      );
    case "numberticker":
      return (
        <div key={k} className="text-center">
          <NumberTicker value={1240} suffix="+" className="text-h2 text-signal" />
          <p className="mt-1 font-mono text-xs text-muted-foreground">installs</p>
        </div>
      );
    case "scrollprogressbar":
      return <ScrollDemo />;
  }
}
