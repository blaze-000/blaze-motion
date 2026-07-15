import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CodeBlock } from "@/components/site/code-block";
import { Command } from "@/components/site/command";
import { LiveDemos } from "@/components/site/live-demos";
import { Playground } from "@/components/site/playground";

const INSTALL = "npx shadcn add https://motion.asmitsah.dev/r/all.json";

function Eyebrow({ n, children }: { n: string; children: string }) {
  return (
    <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-primary">
      <span className="text-muted-foreground">{n}</span> &nbsp; {children}
    </p>
  );
}

const PATTERNS = [
  {
    title: "Reveal a section",
    blurb: "A straight rise from below, once, as it scrolls into view.",
    code: `<Reveal>
  <h2>Your headline rises in.</h2>
  <p>Once, when it enters the viewport.</p>
</Reveal>`,
  },
  {
    title: "Stagger a grid",
    blurb: "Cards cascade in sequence — the dashboard load.",
    code: `<Stagger className="grid grid-cols-3 gap-4">
  {items.map((item) => (
    <StaggerItem key={item.id}>
      <Card {...item} />
    </StaggerItem>
  ))}
</Stagger>`,
  },
  {
    title: "Cinematic hero image",
    blurb: "A big image settles from 110% to 100% as it fades in.",
    code: `<CinematicImage className="relative aspect-video overflow-hidden rounded-2xl">
  <Image src={hero} alt="Product" fill className="object-cover" />
</CinematicImage>`,
  },
  {
    title: "Page transitions",
    blurb: "Fade every route change with one app-router template.",
    code: `// app/template.tsx
"use client";
import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/motion/page-transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition routeKey={usePathname()}>{children}</PageTransition>;
}`,
  },
];

const SOON = [
  { name: "SpringPop", note: "hover / tap scale-up — the one sanctioned overshoot" },
  { name: "BlurToFocus", note: "blur → sharp settle, for text or media" },
  { name: "TextReveal", note: "per-word blur + rise, scroll-triggered" },
  { name: "NumberTicker", note: "spring-eased in-view counter for stats" },
  { name: "ScrollProgressBar", note: "a slim bar bound to scroll progress" },
  { name: "Hover pack", note: "sweep · directional underline · spotlight dimming" },
];

const SETUP_ONCE = "npx shadcn registry add @blaze-motion=https://motion.asmitsah.dev/r/{name}.json";

export default function Home() {
  return (
    <div className="relative">
      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-6 px-6">
          <a href="#top" className="flex items-center gap-2.5 font-mono text-sm font-medium text-foreground">
            <span className="size-2.5 rounded-full bg-primary shadow-[0_0_14px_1px] shadow-primary/40" />
            blaze-motion
          </a>
          <nav className="ml-auto hidden items-center gap-1 font-mono text-xs sm:flex">
            <a href="#playground" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">Playground</a>
            <a href="#start" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">Install</a>
            <a href="#primitives" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">Primitives</a>
            <a href="#patterns" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">Patterns</a>
            <a href="https://github.com/blaze-000/blaze-motion" target="_blank" rel="noopener noreferrer" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">GitHub ↗</a>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section id="top" className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] bg-[radial-gradient(50%_50%_at_35%_20%,rgba(240,137,74,0.13),transparent_70%)]"
        />
        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <FadeIn>
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              The <span className="text-primary">shadcn</span> of motion · built on motion.dev
            </p>
            <h1 className="max-w-3xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
              Motion, <span className="text-primary">tuned once.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Subtle, production-grade motion primitives for Next.js. Install the engine, wrap a{" "}
              <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">&lt;div&gt;</code>, and tune the whole feel — slower here, faster there — from a single editable file.
            </p>
            <div className="mt-8 max-w-xl">
              <Command>{INSTALL}</Command>
              <p className="mt-2.5 font-mono text-[11px] text-muted-foreground">
                One command, zero setup · RSC-safe · reduced-motion honored · own the files. Install it often? Grab the <span className="text-primary">@blaze-motion</span> shorthand below.
              </p>
            </div>
          </FadeIn>

          <div className="mt-14 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Subtle by default", "Tuned tween, no slop"],
              ["RSC-safe as a rule", "Client leaves, one provider"],
              ["Own, don't depend", "Editable files, not a dep"],
              ["Reduced-motion", "Honored by default"],
            ].map(([t, d]) => (
              <div key={t} className="rounded-xl border border-border bg-card px-4 py-3.5">
                <p className="text-[13px] font-semibold text-foreground">{t}</p>
                <p className="mt-1 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* playground */}
      <section id="playground" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <Eyebrow n="01">Playground</Eyebrow>
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground">
              Tune the feel. Watch it move.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Every primitive reads from one <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">feel</code> object. Drag the sliders — the list re-animates live and the config updates to copy. Grab a preset, or <span className="text-foreground">copy a config link</span> and hand someone your exact feel.
            </p>
          </Reveal>
          <div className="mt-10">
            <Playground />
          </div>
          <p className="mt-5 font-mono text-[11px] text-muted-foreground">
            global default in lib/motion.ts · per-instance props override · real JS values, no CSS-variable guesswork
          </p>
        </div>
      </section>

      {/* quick start */}
      <section id="start" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <Eyebrow n="02">Install</Eyebrow>
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground">
              Three steps to your first animation.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Reveal className="flex flex-col gap-3">
              <p className="font-mono text-xs text-muted-foreground">1 — install the engine</p>
              <Command>{"npx shadcn add https://motion.asmitsah.dev/r/all.json"}</Command>
              <p className="text-sm text-muted-foreground">One command, zero setup — drops the tokens, the provider, and all five primitives into your repo, editable.</p>
            </Reveal>
            <Reveal className="flex flex-col gap-3" delay={0.06}>
              <p className="font-mono text-xs text-muted-foreground">2 — mount once, in your root layout</p>
              <CodeBlock
                code={`// app/layout.tsx
<MotionProvider>{children}</MotionProvider>`}
              />
              <p className="text-sm text-muted-foreground">One provider. Pages stay Server Components.</p>
            </Reveal>
            <Reveal className="flex flex-col gap-3" delay={0.12}>
              <p className="font-mono text-xs text-muted-foreground">3 — wrap anything</p>
              <CodeBlock
                code={`<Reveal>
  <h2>rises into view</h2>
</Reveal>`}
              />
              <p className="text-sm text-muted-foreground">That&apos;s it. The primitive becomes your layout element — no orphan wrapper.</p>
            </Reveal>
          </div>

          <Reveal className="mt-8">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
              <p className="font-mono text-sm text-foreground">
                Installing across projects? Get the <span className="text-primary">@blaze-motion</span> shorthand.
              </p>
              <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
                Register the namespace once — a single CLI command into your{" "}
                <code className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">components.json</code> — and every future install shortens to{" "}
                <code className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">@blaze-motion/all</code>. Ideal for your own project template.
              </p>
              <div className="mt-5 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">register once</p>
                  <Command>{SETUP_ONCE}</Command>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-[11px] uppercase tracking-wider text-primary">then it&apos;s just</p>
                  <Command>{"npx shadcn add @blaze-motion/all"}</Command>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* primitives */}
      <section id="primitives" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <Eyebrow n="03">The primitives</Eyebrow>
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground">
              Five wrappers. Each one load-bearing.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Not a catalog of effects — a small, tuned set you wrap around your own markup. Hit replay to watch each one.
            </p>
          </Reveal>
          <div className="mt-10">
            <LiveDemos />
          </div>
          <p className="mt-6 font-mono text-xs text-muted-foreground">
            + <span className="text-foreground">PageTransition</span> — an <span className="text-foreground">AnimatePresence</span> route transition keyed on your route.
          </p>
        </div>
      </section>

      {/* usage patterns */}
      <section id="patterns" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <Eyebrow n="04">Usage patterns</Eyebrow>
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground">
              Real code, real contexts.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              The everyday places motion earns its keep — copy-paste ready.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {PATTERNS.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 0.06} className="flex flex-col gap-3">
                <div>
                  <h3 className="font-mono text-sm text-foreground">{p.title}</h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{p.blurb}</p>
                </div>
                <CodeBlock code={p.code} className="flex-1" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* why safe */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <Eyebrow n="05">Why it&apos;s safe</Eyebrow>
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground">
              The discipline is the product.
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              ["Flat exports, no compound components", "Stagger + StaggerItem ship as two named exports — a bolted-on X.Item is undefined across the RSC boundary and crashes a Server Component at build."],
              ["m from motion/react-m", "The provider runs strict, so primitives import the light m component through LazyMotion — only the DOM-animation feature set loads, and a raw motion.* throws on purpose."],
              ["className passthrough", "Every primitive forwards className + style, so it becomes your grid or flex child instead of adding an orphan wrapper div."],
              ["Reduced-motion, honored", "MotionConfig respects the OS setting for everyone — transforms drop to a clean opacity fade, no special-casing."],
            ].map(([t, d]) => (
              <StaggerItem key={t}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <h3 className="text-base font-semibold text-foreground">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* coming soon */}
      <section id="soon" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <Eyebrow n="06">Coming soon</Eyebrow>
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground">
              More boilerplates, same restraint.
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              The next set of opt-in primitives — each one held to the same subtle, RSC-safe bar before it ships.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOON.map((s) => (
              <div
                key={s.name}
                className="group relative overflow-hidden rounded-2xl border border-dashed border-border/60 bg-card/40 p-5"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground">{s.name}</h3>
                    <p className="mt-1 text-xs text-muted-foreground/80">{s.note}</p>
                  </div>
                  <span className="shrink-0 rounded-md border border-border/60 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    WIP
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-14 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5 font-mono text-sm text-foreground">
              <span className="size-2.5 rounded-full bg-primary shadow-[0_0_14px_1px] shadow-primary/40" />
              blaze-motion
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Subtle, RSC-safe motion primitives for Next.js + shadcn. Free &amp; open. Own-and-tweak, never a runtime dependency.
            </p>
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            <a href="https://github.com/blaze-000/blaze-motion" target="_blank" rel="noopener noreferrer" className="text-foreground transition-colors hover:text-primary">GitHub ↗</a>
            <p className="mt-1">motion.asmitsah.dev</p>
            <p className="mt-1">Motion, tuned once.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
