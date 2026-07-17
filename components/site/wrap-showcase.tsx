"use client";

import { RotateCw } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { Hover } from "@/components/motion/hover";
import { Reveal } from "@/components/motion/reveal";
import { SlideIn } from "@/components/motion/slide-in";
import { FigPanel } from "./fig-panel";

/** A neutral thing to wrap — stands in for "your card / heading / button". */
function DemoBox({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full max-w-[16rem] items-center justify-center rounded-sm border border-border bg-panel-2 px-4 py-3 text-center text-sm text-foreground">
      {children}
    </div>
  );
}

type WrapDemo = {
  figNo: string;
  title: string;
  /** How this instance re-plays — an entrance (re-mounts on replay) or a live pointer effect. */
  trigger: "entrance" | "pointer";
  hint: string;
  snippet: string;
  render: (replayKey: number) => ReactNode;
};

const DEMOS: WrapDemo[] = [
  {
    figNo: "01",
    title: "SlideIn",
    trigger: "entrance",
    hint: "slides in on view",
    snippet: `<SlideIn direction="up">
  <Card />
</SlideIn>`,
    render: (k) => (
      <SlideIn key={k} direction="up" trigger="mount" className="flex justify-center">
        <DemoBox>Your card</DemoBox>
      </SlideIn>
    ),
  },
  {
    figNo: "02",
    title: "FadeIn",
    trigger: "entrance",
    hint: "fades in on mount",
    snippet: `<FadeIn>
  <Stat />
</FadeIn>`,
    render: (k) => (
      <FadeIn key={k} className="flex justify-center">
        <DemoBox>
          <span className="font-mono tabular-nums text-signal">99.9%</span>
          <span className="ml-2 text-muted-foreground">uptime</span>
        </DemoBox>
      </FadeIn>
    ),
  },
  {
    figNo: "03",
    title: "Reveal",
    trigger: "entrance",
    hint: "rises in on view",
    snippet: `<Reveal>
  <h3>Tuned once.</h3>
</Reveal>`,
    render: (k) => (
      <Reveal key={k} className="flex justify-center">
        <DemoBox>
          <span className="text-h3 text-foreground">Tuned once.</span>
        </DemoBox>
      </Reveal>
    ),
  },
  {
    figNo: "04",
    title: "Hover",
    trigger: "pointer",
    hint: "hover the button",
    snippet: `<Hover effect="lift">
  <button>Deploy</button>
</Hover>`,
    render: () => (
      <Hover effect="lift" className="flex justify-center">
        <DemoBox>
          <span className="font-semibold text-signal">Deploy</span>
        </DemoBox>
      </Hover>
    ),
  },
];

export function WrapShowcase() {
  const [replayKey, setReplayKey] = useState(1);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <p className="fig-label text-muted-foreground">Real primitives · running on this page</p>
        <button
          type="button"
          onClick={() => setReplayKey((k) => k + 1)}
          className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1 font-mono text-[0.6875rem] text-muted-foreground transition-colors hover:border-signal/50 hover:text-foreground"
        >
          <RotateCw className="size-3" aria-hidden />
          Replay all
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {DEMOS.map((demo) => (
          <FigPanel
            key={demo.figNo}
            figNo={demo.figNo}
            title={demo.title}
            headerRight={<span className="fig-label text-signal">{demo.hint}</span>}
            bodyClassName="flex flex-col"
          >
            <pre className="overflow-x-auto border-b border-border px-4 py-4 font-mono text-[0.75rem] leading-relaxed text-muted-foreground [scrollbar-width:none]">
              <code>{demo.snippet}</code>
            </pre>
            <div className="flex min-h-[7.5rem] items-center justify-center p-5">
              {demo.render(replayKey)}
            </div>
          </FigPanel>
        ))}
      </div>
    </div>
  );
}
