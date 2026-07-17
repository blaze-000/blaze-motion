import type { ReactNode } from "react";
import { Fade } from "@/components/motion/fade";
import { CinematicBand } from "@/components/site/cinematic-band";
import { CodeBlock } from "@/components/site/code-block";
import { DocsPreview } from "@/components/site/docs-preview";
import { DraftingFrame } from "@/components/site/drafting-frame";
import { EasingCurveMark } from "@/components/site/easing-curve-mark";
import { EffectsShowcase } from "@/components/site/effects-showcase";
import { FeelPlayground } from "@/components/site/feel-playground";
import { FigPanel } from "@/components/site/fig-panel";
import { Footer } from "@/components/site/footer";
import { HeroInstall } from "@/components/site/hero-install";
import { InstallBlock } from "@/components/site/install-block";
import { Nav } from "@/components/site/nav";
import { OpenSourceBand } from "@/components/site/open-source-band";
import { PrimitiveShowcase } from "@/components/site/primitive-showcase";
import { TechnicalTruths } from "@/components/site/technical-truths";
import { WrapShowcase } from "@/components/site/wrap-showcase";

// Truthful excerpt of the actual `feel` block at the top of lib/motion.ts.
const FEEL_CODE = `// lib/motion.ts — the whole engine's feel, in one place.
export const feel = {
  duration: { fast: 0.2, base: 0.55, slow: 0.8 },
  ease: [0.22, 0.61, 0.36, 1],
  rise: 28,
  inView: 0.3,
  stagger: 0.08,
  // …one object; every primitive derives from it.
} as const;`;

function BeatLabel({ n, label }: { n: string; label: string }) {
  return (
    <p className="fig-label flex items-center gap-2.5 text-muted-foreground">
      <span className="tabular-nums text-signal">{n}</span>
      <span className="h-px w-6 bg-border" aria-hidden />
      <span className="text-foreground">{label}</span>
    </p>
  );
}

function SectionHead({
  beat,
  label,
  title,
  children,
}: {
  beat: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <Fade direction="up" trigger="inView" className="flex flex-col gap-3">
      <BeatLabel n={beat} label={label} />
      <h2 className="text-h2 text-foreground">{title}</h2>
      <p className="text-lead">{children}</p>
    </Fade>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className="relative">
        <DraftingFrame />

        <div className="relative z-10">
          {/* ── HERO — the pitch ── */}
          <section className="relative">
            <div className="container-page relative z-10 px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
              <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <Fade className="flex min-w-0 flex-col gap-6">
                  <p className="fig-label text-muted-foreground">
                    Motion registry · built on motion.dev
                  </p>
                  <h1 className="text-display text-foreground">
                    One file decides how <span className="text-signal">your whole app moves.</span>
                  </h1>
                  <p className="text-lead">
                    Install cold, wrap anything, ship motion that feels designed — not decorated.
                    Every primitive derives from a single feel object you own.
                  </p>
                  <HeroInstall />
                </Fade>

                <Fade delay={0.15} className="min-w-0">
                  <FigPanel figNo="—" title="ease · the curve" bodyClassName="p-6 sm:p-8">
                    <EasingCurveMark
                      variant="hero"
                      className="mx-auto block h-40 w-48 sm:h-52 sm:w-64"
                    />
                    <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-border pt-5 font-mono text-xs">
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">ease</dt>
                        <dd className="tabular-nums text-foreground">0.22, 0.61</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">&nbsp;</dt>
                        <dd className="tabular-nums text-foreground">0.36, 1</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">base</dt>
                        <dd className="tabular-nums text-signal">0.55s</dd>
                      </div>
                      <div className="flex items-center justify-between">
                        <dt className="text-muted-foreground">rise</dt>
                        <dd className="tabular-nums text-signal">28px</dd>
                      </div>
                    </dl>
                  </FigPanel>
                </Fade>
              </div>
            </div>
          </section>

          {/* ── 01 · INSTALL ── */}
          <section id="install" className="border-t border-border">
            <div className="container-page px-6 py-20 lg:px-12 lg:py-24">
              <SectionHead beat="01" label="Install" title="Install cold. It just moves.">
                One command lands the whole engine — tokens, provider, every primitive — into your
                project. No config, no setup. Mount it once; everything around it stays fast and
                server-rendered.
              </SectionHead>

              <div className="mt-12">
                <InstallBlock />
              </div>
            </div>
          </section>

          {/* ── 02 · WRAP ── */}
          <section id="wrap" className="border-t border-border">
            <div className="container-page px-6 py-20 lg:px-12 lg:py-24">
              <SectionHead beat="02" label="Wrap" title="Wrap it. That's the API.">
                No keyframes, no per-element setup. Wrap a card, a heading, a button — it becomes
                your layout element and forwards your styles, so there&apos;s no throwaway wrapper.
                Every panel below is live, running on this page.
              </SectionHead>
              <div className="mt-12">
                <WrapShowcase />
              </div>
            </div>
          </section>

          {/* ── 03 · TUNE ── */}
          <section id="tune" className="border-t border-border">
            <div className="container-page px-6 py-20 lg:px-12 lg:py-24">
              <SectionHead beat="03" label="Tune" title="Change one value. The whole app re-feels.">
                Duration, ease, rise, stagger — all of it flows from one feel object. Nudge a number
                and every animation retunes at once. Drag it live below. Per-instance tweaks still
                win when you want them.
              </SectionHead>

              <div className="mt-12 flex flex-col gap-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-center">
                  <CodeBlock code={FEEL_CODE} caption="lib/motion.ts" />
                  <p className="text-lead">
                    The source lands in your project, yours to edit — not a dependency you can only
                    configure from the outside. Change it, and the update propagates to every
                    primitive at once. Drag it below to watch the whole set re-tune live.
                  </p>
                </div>
                <FeelPlayground />
              </div>
            </div>
          </section>

          {/* ── Supporting — the full set ── */}
          <section id="primitives" className="border-t border-border">
            <div className="container-page px-6 py-20 lg:px-12 lg:py-24">
              <div className="flex flex-col gap-3">
                <h2 className="text-h2 text-foreground">A tuned core that earns its place.</h2>
                <p className="text-lead">
                  Not a catalog of effects — a small, considered set you wrap around your own
                  markup. Every panel below is a real, running instance.
                </p>
              </div>
              <div className="mt-12">
                <PrimitiveShowcase />
              </div>
            </div>
          </section>

          <section id="effects" className="border-t border-border">
            <div className="container-page px-6 py-20 lg:px-12 lg:py-24">
              <div className="flex flex-col gap-3">
                <h2 className="text-h2 text-foreground">More effects. Same engine, same feel.</h2>
                <p className="text-lead">
                  Entrance, hover, stagger, and text — every one tuned from the same feel object.
                  Hover, click, or flip to Code on any panel.
                </p>
              </div>
              <div className="mt-12">
                <EffectsShowcase />
              </div>
            </div>
          </section>
        </div>

        <div className="relative z-10 border-y border-border">
          <CinematicBand />
        </div>

        <div className="relative z-10">
          <section className="border-b border-border">
            <div className="container-page px-6 py-20 lg:px-12 lg:py-24">
              <div className="flex flex-col gap-3">
                <h2 className="text-h2 text-foreground">Boring where it counts.</h2>
                <p className="text-lead">
                  The flashy part is optional. The discipline isn&apos;t — here&apos;s what&apos;s
                  behind it.
                </p>
              </div>
              <TechnicalTruths />
            </div>
          </section>

          <div className="border-b border-border">
            <OpenSourceBand />
          </div>

          <section id="docs">
            <div className="container-page px-6 py-20 lg:px-12 lg:py-24">
              <Fade direction="up" trigger="inView" className="flex flex-col gap-3">
                <h2 className="text-h2 text-foreground">Docs, built like the rest of it.</h2>
                <p className="text-lead">
                  Grouped sidebar, live Preview / Code, and a props table per component — plus a
                  copy-ready format so the AI in your editor reads it as fast as you do.
                </p>
              </Fade>
              <div className="mt-12">
                <DocsPreview />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
