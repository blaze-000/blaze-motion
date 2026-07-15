"use client";

import { RotateCw } from "lucide-react";
import { type ReactNode, useState } from "react";
import { CinematicImage } from "@/components/motion/cinematic-image";
import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";

function DemoCell({
  name,
  usage,
  blurb,
  children,
}: {
  name: string;
  usage: string;
  blurb: string;
  children: ReactNode;
}) {
  const [replayKey, setReplayKey] = useState(0);
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-start justify-between gap-3 border-b border-border px-5 py-3.5">
        <div className="min-w-0">
          <h3 className="font-mono text-sm text-foreground">{name}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">{blurb}</p>
        </div>
        <button
          type="button"
          onClick={() => setReplayKey((k) => k + 1)}
          className="flex shrink-0 items-center gap-1.5 rounded-lg border border-border px-2.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
        >
          <RotateCw className="size-3" aria-hidden />
          Replay
        </button>
      </div>

      <div className="relative flex min-h-[188px] flex-1 items-center justify-center overflow-hidden p-6">
        <div key={replayKey} className="flex w-full items-center justify-center">
          {children}
        </div>
      </div>

      <div className="border-t border-border px-5 py-3">
        <code className="block overflow-x-auto whitespace-nowrap font-mono text-[11px] text-muted-foreground [scrollbar-width:none]">
          {usage}
        </code>
      </div>
    </div>
  );
}

const Swatch = ({ children }: { children: ReactNode }) => (
  <div className="flex h-16 items-center justify-center rounded-xl border border-border bg-background/60 px-5 text-sm text-foreground">
    {children}
  </div>
);

export function LiveDemos() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <DemoCell name="Reveal" usage="<Reveal>…</Reveal>" blurb="Scroll rise — straight, no overshoot">
        <Reveal className="w-full max-w-[240px]">
          <Swatch>Rises into view</Swatch>
        </Reveal>
      </DemoCell>

      <DemoCell name="FadeIn" usage="<FadeIn>…</FadeIn>" blurb="Opacity only — for on-mount">
        <FadeIn className="w-full max-w-[240px]">
          <Swatch>Fades in</Swatch>
        </FadeIn>
      </DemoCell>

      <DemoCell name="Stagger" usage="<Stagger> <StaggerItem/> </Stagger>" blurb="Sequenced children cascade">
        <Stagger className="grid w-full max-w-[240px] gap-2">
          {["One", "Two", "Three", "Four"].map((label) => (
            <StaggerItem key={label}>
              <div className="rounded-lg border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground">
                {label}
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </DemoCell>

      <DemoCell name="CinematicImage" usage="<CinematicImage className='overflow-hidden'>" blurb="Scale-down settle — big images only">
        <CinematicImage className="relative aspect-video w-full max-w-[240px] overflow-hidden rounded-xl border border-border">
          <div className="size-full bg-[radial-gradient(120%_120%_at_20%_10%,#f0894a_0%,#c76a32_35%,#131620_80%)]" />
        </CinematicImage>
      </DemoCell>
    </div>
  );
}
