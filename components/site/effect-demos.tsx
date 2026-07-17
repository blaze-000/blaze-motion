"use client";

import type { ReactNode } from "react";
import { RadialStagger } from "@/components/motion/radial-stagger";
import { SiblingDimming, SiblingDimmingItem } from "@/components/motion/sibling-dimming";
import { SpringPop } from "@/components/motion/spring-pop";
import { TextReveal } from "@/components/motion/text-reveal";

export type EffectName = "springpop" | "siblingdimming" | "radialstagger" | "textreveal";

type EffectMeta = {
  /** true when a replay button meaningfully re-triggers the demo (mount-driven) */
  replayable: boolean;
  /** short mono hint for interaction-driven demos (hover / click / scroll) */
  hint?: string;
};

export const EFFECT_META: Record<EffectName, EffectMeta> = {
  springpop: { replayable: true },
  siblingdimming: { replayable: false, hint: "Hover a tile" },
  radialstagger: { replayable: false, hint: "Click a tile" },
  textreveal: { replayable: true },
};

function Swatch({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-14 w-full max-w-[15rem] items-center justify-center rounded-sm border border-border bg-panel-2 px-4 text-sm text-foreground">
      {children}
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
        <TextReveal key={k} trigger="mount">
          <p className="max-w-[15rem] text-center text-h3 text-foreground">Motion, tuned once.</p>
        </TextReveal>
      );
  }
}
