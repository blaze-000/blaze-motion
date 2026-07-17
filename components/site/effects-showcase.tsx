"use client";

import { RotateCw } from "lucide-react";
import { useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { cn } from "@/lib/utils";
import { EFFECT_META, type EffectName, renderEffectDemo } from "./effect-demos";
import { FigPanel } from "./fig-panel";

type Effect = {
  figNo: string;
  title: string;
  name: EffectName;
  code: string;
};

const EFFECTS: Effect[] = [
  {
    figNo: "06",
    title: "SpringPop",
    name: "springpop",
    code: `<SpringPop>
  <Badge>New</Badge>
</SpringPop>`,
  },
  {
    figNo: "07",
    title: "BlurToFocus",
    name: "blurtofocus",
    code: `<BlurToFocus className="relative overflow-hidden">
  <Image src={hero} alt="" fill />
</BlurToFocus>`,
  },
  {
    figNo: "08",
    title: "LineDraw",
    name: "linedraw",
    code: `<LineDraw viewBox="0 0 200 100" stagger={0.15}>
  <LineDrawPath d="M8 78 L104 64 L192 12" />
</LineDraw>`,
  },
  {
    figNo: "10",
    title: "AnimatedUnderline",
    name: "animatedunderline",
    code: `<AnimatedUnderline as={Link} href="/docs">
  Read the docs
</AnimatedUnderline>`,
  },
  {
    figNo: "11",
    title: "SiblingDimming",
    name: "siblingdimming",
    code: `<SiblingDimming className="grid grid-cols-3 gap-2">
  <SiblingDimmingItem>…</SiblingDimmingItem>
</SiblingDimming>`,
  },
  {
    figNo: "12",
    title: "RadialStagger",
    name: "radialstagger",
    code: `<RadialStagger columns={5} itemClassName="aspect-square">
  {cells}
</RadialStagger>`,
  },
  {
    figNo: "13",
    title: "TextReveal",
    name: "textreveal",
    code: `<TextReveal as="h2" by="word">
  Motion, tuned once.
</TextReveal>`,
  },
  {
    figNo: "14",
    title: "NumberTicker",
    name: "numberticker",
    code: `<NumberTicker value={1240} suffix="+" />`,
  },
  {
    figNo: "15",
    title: "ScrollProgressBar",
    name: "scrollprogressbar",
    code: `// once, high in your layout
<ScrollProgressBar />`,
  },
];

function EffectCard({ effect }: { effect: Effect }) {
  const [view, setView] = useState<"preview" | "code">("preview");
  const [replayKey, setReplayKey] = useState(0);
  const meta = EFFECT_META[effect.name];

  return (
    <FigPanel
      figNo={effect.figNo}
      title={effect.title}
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
          {view === "preview" ? (
            meta.replayable ? (
              <button
                type="button"
                onClick={() => setReplayKey((k) => k + 1)}
                aria-label={`Replay ${effect.title} demo`}
                className="inline-flex size-6 items-center justify-center rounded-sm border border-border text-muted-foreground transition-colors hover:border-signal/50 hover:text-foreground"
              >
                <RotateCw className="size-3" aria-hidden />
              </button>
            ) : meta.hint ? (
              <span className="fig-label text-muted-foreground">{meta.hint}</span>
            ) : null
          ) : null}
        </div>
      }
      bodyClassName="flex min-h-[11rem] items-center justify-center p-5"
    >
      {view === "preview" ? (
        renderEffectDemo(effect.name, replayKey)
      ) : (
        <pre className="w-full overflow-x-auto font-mono text-[0.75rem] leading-relaxed text-muted-foreground [scrollbar-width:none]">
          <code>{effect.code}</code>
        </pre>
      )}
    </FigPanel>
  );
}

export function EffectsShowcase() {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {EFFECTS.map((e) => (
        <StaggerItem key={e.figNo} className="flex min-w-0">
          <div className="w-full min-w-0">
            <EffectCard effect={e} />
          </div>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
