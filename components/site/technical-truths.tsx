const TRUTHS = [
  {
    key: "Server-first by design",
    detail:
      "One client boundary and that's it. Everything you build around it stays fast and server-rendered — you add motion, not overhead.",
  },
  {
    key: "One dependency, that's the deal",
    detail: "Just the motion.dev package under the hood. Nothing smuggled in behind it.",
  },
  {
    key: "Ships light on purpose",
    detail:
      "Loads only the animation features it needs, not the whole library. Your bundle barely notices.",
  },
  {
    key: "Respects 'reduce motion'",
    detail:
      "Honors the OS setting for everyone — motion gracefully becomes a clean fade. No motion sickness.",
  },
  {
    key: "Calm is the default",
    detail:
      "Subtle out of the box. It reads as designed, not decorated — you turn the dial up, it never shouts first.",
  },
  {
    key: "Slots into your layout",
    detail:
      "Every primitive becomes your real grid or flex child instead of wrapping one in a throwaway element.",
  },
  {
    key: "You own every line",
    detail:
      "The source lands right in your project — yours to read, edit, and retune. No black box, no lock-in.",
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
