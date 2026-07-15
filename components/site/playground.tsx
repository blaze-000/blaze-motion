"use client";

import { Check, Link2, RotateCw } from "lucide-react";
import * as m from "motion/react-m";
import { useEffect, useState } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const PRESETS = [
  { key: "default", label: "Default", duration: 0.55, rise: 28, stagger: 0.08 },
  { key: "smooth", label: "Smooth", duration: 0.8, rise: 40, stagger: 0.12 },
  { key: "snappy", label: "Snappy", duration: 0.22, rise: 12, stagger: 0.03 },
] as const;

const ITEMS = [
  { title: "Deploy succeeded", meta: "2m ago", dot: "bg-emerald-400" },
  { title: "New comment on PR #42", meta: "8m ago", dot: "bg-primary" },
  { title: "Build passed — 4 checks green", meta: "15m ago", dot: "bg-sky-400" },
  { title: "Teammate accepted your invite", meta: "1h ago", dot: "bg-violet-400" },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
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
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="font-mono text-sm tabular-nums text-primary">{display}</span>
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
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary [&::-webkit-slider-thumb]:size-3.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
      />
    </label>
  );
}

export function Playground() {
  const [duration, setDuration] = useState(0.55);
  const [rise, setRise] = useState(28);
  const [stagger, setStagger] = useState(0.08);
  const [runKey, setRunKey] = useState(1);
  const [copied, setCopied] = useState(false);
  const [linked, setLinked] = useState(false);

  // hydrate from a shared config link, then play once
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const d = Number.parseFloat(p.get("d") ?? "");
    const r = Number.parseInt(p.get("r") ?? "", 10);
    const s = Number.parseFloat(p.get("s") ?? "");
    if (!Number.isNaN(d)) setDuration(clamp(d, 0.15, 0.8));
    if (!Number.isNaN(r)) setRise(clamp(r, 4, 40));
    if (!Number.isNaN(s)) setStagger(clamp(s, 0.02, 0.15));
    setRunKey((k) => k + 1);
  }, []);

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
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    });
  };

  const copyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}?d=${round(duration)}&r=${rise}&s=${round(stagger)}#playground`;
    navigator.clipboard.writeText(url).then(() => {
      setLinked(true);
      window.setTimeout(() => setLinked(false), 1500);
    });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
      {/* controls */}
      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6">
        <div className="flex flex-col gap-5">
          <Slider
            label="base duration"
            value={duration}
            display={`${Math.round(duration * 1000)}ms`}
            min={0.15}
            max={0.8}
            step={0.01}
            onChange={(v) => setDuration(round(v))}
            onCommit={replay}
          />
          <Slider
            label="rise distance"
            value={rise}
            display={`${rise}px`}
            min={4}
            max={40}
            step={1}
            onChange={setRise}
            onCommit={replay}
          />
          <Slider
            label="stagger gap"
            value={stagger}
            display={`${Math.round(stagger * 1000)}ms`}
            min={0.02}
            max={0.15}
            step={0.01}
            onChange={(v) => setStagger(round(v))}
            onCommit={replay}
          />
        </div>

        <div>
          <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">steal a config</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => applyPreset(p)}
                className={`rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
                  activePreset === p.key
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <button
            type="button"
            onClick={replay}
            className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            <RotateCw className="size-3.5" aria-hidden />
            Replay
          </button>
          <button
            type="button"
            onClick={copyLink}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 font-mono text-xs text-primary transition-colors hover:bg-primary/15"
          >
            {linked ? <Check className="size-3.5" aria-hidden /> : <Link2 className="size-3.5" aria-hidden />}
            {linked ? "Link copied" : "Copy config link"}
          </button>
        </div>
      </div>

      {/* preview + code */}
      <div className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">live preview</span>
            <span className="font-mono text-[11px] text-muted-foreground">Recent activity</span>
          </div>
          <m.ul
            key={runKey}
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
            className="flex flex-col gap-2"
          >
            {ITEMS.map((it) => (
              <m.li
                key={it.title}
                variants={{
                  hidden: { opacity: 0, y: rise },
                  show: { opacity: 1, y: 0, transition: { duration, ease: EASE } },
                }}
                className="flex items-center gap-3 rounded-xl border border-border bg-background/50 px-4 py-3"
              >
                <span className={`size-2 shrink-0 rounded-full ${it.dot}`} />
                <span className="flex-1 truncate text-sm text-foreground">{it.title}</span>
                <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{it.meta}</span>
              </m.li>
            ))}
          </m.ul>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="font-mono text-[11px] text-muted-foreground">lib/motion.ts</span>
            <button
              type="button"
              onClick={copyCode}
              className="flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            >
              {copied ? <Check className="size-3.5 text-primary" aria-hidden /> : null}
              {copied ? "copied" : "copy"}
            </button>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[12.5px] leading-relaxed text-foreground">
            <code>
              <span className="text-muted-foreground">export const</span> feel = {"{"}
              {"\n  duration: { fast: "}
              <span className="text-ember-bright">0.2</span>
              {", base: "}
              <span className="text-primary">{round(duration)}</span>
              {", slow: "}
              <span className="text-ember-bright">0.8</span>
              {" },"}
              {"\n  ease: ["}
              <span className="text-ember-bright">0.22, 0.61, 0.36, 1</span>
              {"],"}
              {"\n  rise: "}
              <span className="text-primary">{rise}</span>
              {",\n  inView: "}
              <span className="text-ember-bright">0.3</span>
              {",\n  stagger: "}
              <span className="text-primary">{round(stagger)}</span>
              {",\n} "}
              <span className="text-muted-foreground">as const</span>;
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
