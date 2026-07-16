import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { CinematicBand } from "@/components/site/cinematic-band";
import { CodeBlock } from "@/components/site/code-block";
import { DocsPreview } from "@/components/site/docs-preview";
import { DraftingFrame } from "@/components/site/drafting-frame";
import { EasingCurveMark } from "@/components/site/easing-curve-mark";
import { FeelPlayground } from "@/components/site/feel-playground";
import { FigPanel } from "@/components/site/fig-panel";
import { Footer } from "@/components/site/footer";
import { HeroInstall } from "@/components/site/hero-install";
import { InstallBlock } from "@/components/site/install-block";
import { Nav } from "@/components/site/nav";
import { OpenSourceBand } from "@/components/site/open-source-band";
import { PrimitiveShowcase } from "@/components/site/primitive-showcase";
import { ShaderBackground } from "@/components/site/shader-background";
import { TechnicalTruths } from "@/components/site/technical-truths";

const MOUNT_CODE = `// app/layout.tsx
import { MotionProvider } from "@/components/motion/motion-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}`;

const WRAP_CODE = `import { Reveal } from "@/components/motion/reveal";

<Reveal>
  <h2>Rises into view, once.</h2>
</Reveal>`;

const STEPS = [
  { n: "01", label: "Install the engine" },
  { n: "02", label: "Mount the provider, once" },
  { n: "03", label: "Wrap anything" },
] as const;

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top" className="relative">
        <DraftingFrame />

        <div className="relative z-10">
          <section className="relative overflow-hidden">
            <ShaderBackground />
            <div className="container-page relative z-10 px-6 py-20 sm:py-24 lg:px-12 lg:py-28">
              <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                <FadeIn className="flex min-w-0 flex-col gap-6">
                  <p className="fig-label text-muted-foreground">
                    Motion registry · built on motion.dev
                  </p>
                  <h1 className="text-display text-foreground">
                    Motion, <span className="text-signal">tuned once.</span>
                  </h1>
                  <p className="text-lead">
                    Subtle, RSC-safe motion primitives for Next.js + shadcn. One command installs the
                    whole engine into your repo — you own the files, and retune the entire feel from a
                    single object.
                  </p>
                  <HeroInstall />
                </FadeIn>

                <FadeIn delay={0.15} className="min-w-0">
                  <FigPanel figNo="—" title="ease · the curve" bodyClassName="p-6 sm:p-8">
                    <EasingCurveMark variant="hero" className="mx-auto block h-40 w-48 sm:h-52 sm:w-64" />
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
                </FadeIn>
              </div>
            </div>
          </section>

          <section id="install" className="border-t border-border">
            <div className="container-page px-6 py-20 lg:px-12 lg:py-24">
              <Reveal className="flex flex-col gap-3">
                <h2 className="text-h2 text-foreground">Three steps to your first animation.</h2>
                <p className="text-lead">
                  One command lands all 7 files — the tokens, the provider, and every primitive. The
                  registry declares its single runtime dependency (motion@^12.42.2); the CLI installs
                  it for you.
                </p>
              </Reveal>

              <div className="mt-12 flex flex-col gap-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                  <div className="flex items-baseline gap-3 sm:w-52 sm:shrink-0">
                    <span className="font-mono text-2xl tabular-nums text-signal">{STEPS[0].n}</span>
                    <span className="text-sm font-medium text-foreground">{STEPS[0].label}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <InstallBlock />
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  <div className="flex min-w-0 flex-col gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-2xl tabular-nums text-signal">{STEPS[1].n}</span>
                      <span className="text-sm font-medium text-foreground">{STEPS[1].label}</span>
                    </div>
                    <CodeBlock code={MOUNT_CODE} caption="app/layout.tsx" />
                    <p className="text-sm text-muted-foreground">
                      One client leaf. Every page around it stays a Server Component.
                    </p>
                  </div>
                  <div className="flex min-w-0 flex-col gap-4">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-2xl tabular-nums text-signal">{STEPS[2].n}</span>
                      <span className="text-sm font-medium text-foreground">{STEPS[2].label}</span>
                    </div>
                    <CodeBlock code={WRAP_CODE} caption="any component" />
                    <p className="text-sm text-muted-foreground">
                      The primitive becomes your layout element — no orphan wrapper div.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-t border-border">
            <div className="container-page px-6 py-20 lg:px-12 lg:py-24">
              <Reveal className="flex flex-col gap-3">
                <h2 className="text-h2 text-foreground">One file. The whole feel.</h2>
                <p className="text-lead">
                  Every primitive derives from one <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">feel</code>{" "}
                  object. Drag a value — the demo retunes live, and the source updates to copy.
                  Per-instance props still override.
                </p>
              </Reveal>
              <div className="mt-12">
                <FeelPlayground />
              </div>
            </div>
          </section>

          <section id="primitives" className="border-t border-border">
            <div className="container-page px-6 py-20 lg:px-12 lg:py-24">
              <div className="flex flex-col gap-3">
                <h2 className="text-h2 text-foreground">Six primitives. Each one load-bearing.</h2>
                <p className="text-lead">
                  Not a catalog of effects — a small, tuned set you wrap around your own markup. Every
                  panel below is a real, running instance.
                </p>
              </div>
              <div className="mt-12">
                <PrimitiveShowcase />
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
                <h2 className="text-h2 text-foreground">Why it&apos;s safe to drop in.</h2>
                <p className="text-lead">
                  The discipline is the product — the real engineering decisions behind the six files.
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
              <Reveal className="flex flex-col gap-3">
                <h2 className="text-h2 text-foreground">Docs, built like the rest.</h2>
                <p className="text-lead">
                  A grouped sidebar, live Preview/Code, and a props table per primitive — plus an
                  llms.txt and Copy-Markdown for AI-native reading.
                </p>
              </Reveal>
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
