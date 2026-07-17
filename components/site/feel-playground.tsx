"use client";

import { Check, RotateCw } from "lucide-react";
import * as m from "motion/react-m";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FigPanel } from "./fig-panel";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const PRESETS = [
  { key: "default", label: "Default", duration: 0.55, rise: 28, stagger: 0.08 },
  { key: "smooth", label: "Smooth", duration: 0.8, rise: 40, stagger: 0.12 },
  { key: "snappy", label: "Snappy", duration: 0.22, rise: 12, stagger: 0.03 },
] as const;

const ROWS = [
  "Deploy succeeded",
  "New comment on PR #42",
  "Build passed — 4 checks green",
  "Invite accepted",
];

const round = (v: number, p = 2) => Number(v.toFixed(p));

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
  onCommit,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  onCommit: () => void;
}) {
  return (
    <label className="block">
      <div className="mb-2 flex items-baseline justify-between">
        <span className="fig-label text-muted-foreground">{label}</span>
        <span className="font-mono text-sm tabular-nums text-signal">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseUp={onCommit}
        onTouchEnd={onCommit}
        onKeyUp={onCommit}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-signal [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-signal"
      />
    </label>
  );
}

export function FeelPlayground() {
  const [duration, setDuration] = useState(0.55);
  const [rise, setRise] = useState(28);
  const [stagger, setStagger] = useState(0.08);
  const [runKey, setRunKey] = useState(1);
  const [copied, setCopied] = useState(false);

  const replay = () => setRunKey((k) => k + 1);

  const applyPreset = (p: (typeof PRESETS)[number]) => {
    setDuration(p.duration);
    setRise(p.rise);
    setStagger(p.stagger);
    setRunKey((k) => k + 1);
  };

  const activePreset = PRESETS.find(
    (p) => p.duration === duration && p.rise === rise && p.stagger === stagger,
  )?.key;

  const code = `export const feel = {
  duration: { fast: 0.2, base: ${round(duration)}, slow: 0.8 },
  ease: [0.22, 0.61, 0.36, 1],
  rise: ${rise},
  inView: 0.3,
  stagger: ${round(stagger)},
} as const;`;

  const copyCode = () => {
    navigator.clipboard
      ?.writeText(code)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-6 rounded-md border border-border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-5">
          <Slider
            label="duration.base"
            value={duration}
            display={`${Math.round(duration * 1000)}ms`}
            min={0.15}
            max={0.8}
            step={0.01}
            onChange={(v) => setDuration(round(v))}
            onCommit={replay}
          />
          <Slider
            label="rise"
            value={rise}
            display={`${rise}px`}
            min={4}
            max={40}
            step={1}
            onChange={setRise}
            onCommit={replay}
          />
          <Slider
            label="stagger"
            value={stagger}
            display={`${Math.round(stagger * 1000)}ms`}
            min={0.02}
            max={0.15}
            step={0.01}
            onChange={(v) => setStagger(round(v))}
            onCommit={replay}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => applyPreset(p)}
              className={cn(
                "rounded-sm border px-3 py-1.5 font-mono text-xs transition-colors",
                activePreset === p.key
                  ? "border-signal bg-signal/10 text-signal"
                  : "border-border text-muted-foreground hover:border-signal/50 hover:text-foreground",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-sm border border-border bg-panel-2">
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <span className="fig-label text-muted-foreground">lib/motion.ts</span>
            <button
              type="button"
              onClick={copyCode}
              className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted-foreground transition-colors hover:text-foreground"
            >
              {copied ? <Check className="size-3.5 text-signal" aria-hidden /> : null}
              {copied ? "copied" : "copy"}
            </button>
          </div>
          <pre
            // biome-ignore lint/a11y/noNoninteractiveTabindex: a scrollable code block must be keyboard-focusable (WCAG 2.1.1 / axe scrollable-region-focusable).
            tabIndex={0}
            className="overflow-x-auto p-4 font-mono text-[0.75rem] leading-relaxed text-foreground [scrollbar-width:none]"
          >
            <code>
              <span className="text-muted-foreground">export const</span> feel = {"{"}
              {"\n  duration: { fast: "}
              <span className="text-muted-foreground">0.2</span>
              {", base: "}
              <span className="tabular-nums text-signal">{round(duration)}</span>
              {", slow: "}
              <span className="text-muted-foreground">0.8</span>
              {" },"}
              {"\n  ease: ["}
              <span className="text-muted-foreground">0.22, 0.61, 0.36, 1</span>
              {"],"}
              {"\n  rise: "}
              <span className="tabular-nums text-signal">{rise}</span>
              {",\n  inView: "}
              <span className="text-muted-foreground">0.3</span>
              {",\n  stagger: "}
              <span className="tabular-nums text-signal">{round(stagger)}</span>
              {",\n}"} <span className="text-muted-foreground">as const</span>
              {";"}
            </code>
          </pre>
        </div>
      </div>

      <FigPanel
        figNo="00"
        title="feel · live"
        className="min-w-0"
        headerRight={
          <button
            type="button"
            onClick={replay}
            className="inline-flex items-center gap-1.5 rounded-sm border border-border px-2.5 py-1 font-mono text-[0.6875rem] text-muted-foreground transition-colors hover:border-signal/50 hover:text-foreground"
          >
            <RotateCw className="size-3" aria-hidden />
            Replay
          </button>
        }
        bodyClassName="relative flex items-center p-5 sm:p-8"
      >
        <div
          className="pointer-events-none absolute left-4 top-8 bottom-8 hidden items-center sm:flex"
          aria-hidden
        >
          <div className="relative h-full w-px bg-border">
            <span className="absolute -left-px top-0 h-px w-2 bg-signal/70" />
            <span className="absolute -left-px bottom-0 h-px w-2 bg-signal/70" />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[0.625rem] tabular-nums text-muted-foreground">
              rise {rise}px
            </span>
          </div>
        </div>

        <m.ul
          key={runKey}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
          className="flex w-full flex-col gap-2 sm:pl-16"
        >
          {ROWS.map((row) => (
            <m.li
              key={row}
              variants={{
                hidden: { opacity: 0, y: rise },
                show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
              }}
              className="flex items-center gap-3 rounded-sm border border-border bg-panel-2 px-4 py-3"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
              <span className="flex-1 truncate text-sm text-foreground">{row}</span>
              <span className="shrink-0 font-mono text-[0.6875rem] tabular-nums text-muted-foreground">
                {Math.round(duration * 1000)}ms
              </span>
            </m.li>
          ))}
        </m.ul>
      </FigPanel>
    </div>
  );
}
