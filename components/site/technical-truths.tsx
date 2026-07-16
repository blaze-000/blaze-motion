const TRUTHS = [
  {
    key: "RSC-safe",
    detail:
      "Six 'use client' leaves, Server pages composed around them. MotionProvider is the one client boundary you mount; every page stays a Server Component.",
  },
  {
    key: "One runtime dep",
    detail: "motion@^12.42.2 — the motion.dev package. Nothing else is pulled into your app.",
  },
  {
    key: "Lean bundle",
    detail:
      "LazyMotion with strict + domAnimation loads only the DOM-animation feature set, not the whole library.",
  },
  {
    key: "Reduced-motion",
    detail:
      "reducedMotion=\"user\" on MotionConfig honors the OS setting for everyone — transforms fall back to a clean opacity fade, no special-casing.",
  },
  {
    key: "Flat exports",
    detail:
      "Stagger and StaggerItem ship as two named exports — a compound Stagger.Item is undefined across the RSC client-reference boundary and crashes next build's prerender.",
  },
  {
    key: "className passthrough",
    detail:
      "Every primitive forwards className + style, so it becomes your grid or flex child instead of adding an orphan wrapper div.",
  },
  {
    key: "Own and tweak",
    detail:
      "The shadcn CLI copies the source into your repo — lib/motion.ts + components/motion/* — not an opaque node_modules dependency. Retune the whole feel from one object.",
  },
];

export function TechnicalTruths() {
  return (
    <dl className="mt-12 divide-y divide-border border-y border-border">
      {TRUTHS.map((t) => (
        <div key={t.key} className="grid gap-2 py-5 md:grid-cols-[14rem_1fr] md:gap-8">
          <dt className="flex items-baseline gap-3">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-signal" aria-hidden />
            <span className="text-base font-semibold text-foreground">{t.key}</span>
          </dt>
          <dd className="text-sm leading-relaxed text-muted-foreground md:pt-0.5">{t.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
