import { FadeIn } from "@/components/motion/fade-in";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Command } from "@/components/site/command";
import { LiveDemos } from "@/components/site/live-demos";

const INSTALL = "npx shadcn@latest add https://motion.asmitsah.dev/r/all.json";

function Eyebrow({ n, children }: { n: string; children: string }) {
  return (
    <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-primary">
      <span className="text-muted-foreground">{n}</span> &nbsp; {children}
    </p>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-card p-5 font-mono text-[13px] leading-relaxed text-foreground">
      <code>{children}</code>
    </pre>
  );
}

const c = { key: "text-primary", com: "text-muted-foreground", str: "text-ember-bright" };

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
          <nav className="ml-auto flex items-center gap-1 font-mono text-xs">
            <a href="#start" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">Start</a>
            <a href="#tune" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">Tune</a>
            <a href="#primitives" className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-card hover:text-foreground">Primitives</a>
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
              A <span className="text-primary">motion.dev</span> engine · shipped as a shadcn registry
            </p>
            <h1 className="max-w-3xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
              Motion, <span className="text-primary">tuned once.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Install the primitives, wrap a{" "}
              <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">&lt;div&gt;</code>, and get a subtle, RSC-safe animation. Tune the whole feel — slower here, faster there — from a single file.
            </p>
            <div className="mt-8 max-w-xl">
              <Command>{INSTALL}</Command>
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

      {/* quick start */}
      <section id="start" className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <Eyebrow n="01">Quick start</Eyebrow>
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground">
              Three steps to your first animation.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <Reveal className="flex flex-col gap-3">
              <p className="font-mono text-xs text-muted-foreground">1 — install the engine</p>
              <Command>{"npx shadcn add …/r/all.json"}</Command>
              <p className="text-sm text-muted-foreground">One command drops the tokens, the provider, and all five primitives into your repo — editable.</p>
            </Reveal>
            <Reveal className="flex flex-col gap-3" delay={0.06}>
              <p className="font-mono text-xs text-muted-foreground">2 — mount once, in your root layout</p>
              <Code>
                <span className={c.com}>{"// app/layout.tsx"}</span>
                {"\n<"}<span className={c.key}>MotionProvider</span>{">{children}</"}<span className={c.key}>MotionProvider</span>{">"}
              </Code>
              <p className="text-sm text-muted-foreground">One provider. Pages stay Server Components.</p>
            </Reveal>
            <Reveal className="flex flex-col gap-3" delay={0.12}>
              <p className="font-mono text-xs text-muted-foreground">3 — wrap anything</p>
              <Code>
                {"<"}<span className={c.key}>Reveal</span>{">"}
                {"\n  <h2>rises into view</h2>"}
                {"\n</"}<span className={c.key}>Reveal</span>{">"}
              </Code>
              <p className="text-sm text-muted-foreground">That&apos;s it. The primitive becomes your layout element — no orphan wrapper.</p>
            </Reveal>
          </div>

          <Reveal className="mt-8">
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-7">
              <p className="font-mono text-sm text-foreground">
                Prefer the <span className="text-primary">@blaze-motion</span> shorthand?
              </p>
              <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
                Register the namespace in your{" "}
                <code className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">components.json</code>{" "}
                once — then pull the whole engine with{" "}
                <code className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">@blaze-motion/all</code>, exactly like{" "}
                <code className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">@shadcn</code> or{" "}
                <code className="rounded bg-background/60 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">@magicui</code>.
              </p>
              <div className="mt-5 grid gap-4 lg:grid-cols-2 lg:items-center">
                <Code>{`// components.json
"registries": {
  "@blaze-motion": "https://motion.asmitsah.dev/r/{name}.json"
}`}</Code>
                <div className="flex flex-col justify-center gap-2.5">
                  <Command>{"npx shadcn add @blaze-motion/all"}</Command>
                  <p className="font-mono text-[11px] text-muted-foreground">One command — tokens, provider, and all five primitives, editable.</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* tune — the differentiator */}
      <section id="tune" className="border-t border-border">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Eyebrow n="02">Tune it</Eyebrow>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
              The whole feel lives in <span className="text-primary">one block</span>.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Every primitive derives from a single{" "}
              <code className="rounded bg-card px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">feel</code>{" "}
              object. Need a slower project? Raise the durations. A snappier one? Lower them. One edit re-tunes everything — and a per-instance prop still wins where a section wants something different.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex gap-3"><span className="mt-2 h-px w-4 shrink-0 bg-primary" />Global default lives in <code className="font-mono text-[0.85em] text-foreground">lib/motion.ts</code></li>
              <li className="flex gap-3"><span className="mt-2 h-px w-4 shrink-0 bg-primary" />Per-instance override wins where a section needs it</li>
              <li className="flex gap-3"><span className="mt-2 h-px w-4 shrink-0 bg-primary" />Real JS values motion consumes directly — no CSS-variable guesswork</li>
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <Code>
              <span className={c.com}>{"// lib/motion.ts — edit here, retune everything"}</span>
              {"\n"}<span className={c.key}>export const</span>{" feel = {"}
              {"\n  duration: { fast: "}<span className={c.str}>0.2</span>{", base: "}<span className={c.str}>0.55</span>{", slow: "}<span className={c.str}>0.8</span>{" },"}
              {"\n  ease: ["}<span className={c.str}>0.22, 0.61, 0.36, 1</span>{"],"}
              {"\n  rise: "}<span className={c.str}>28</span>{",       "}<span className={c.com}>{"// px a Reveal rises from"}</span>
              {"\n  inView: "}<span className={c.str}>0.3</span>{","}
              {"\n  stagger: "}<span className={c.str}>0.08</span>{","}
              {"\n} "}<span className={c.key}>as const</span>{";"}
            </Code>
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

      {/* why safe */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <Reveal>
            <Eyebrow n="04">Why it&apos;s safe</Eyebrow>
            <h2 className="max-w-2xl text-balance text-3xl font-bold tracking-tight text-foreground">
              The discipline is the product.
            </h2>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              ["Flat exports, no compound components", "Stagger + StaggerItem ship as two named exports — a bolted-on X.Item is undefined across the RSC boundary and crashes a Server Component at build."],
              ["m from motion/react-m", "The provider runs strict, so primitives import the light m component. A raw motion.* throws — on purpose, so the bundle stays lean."],
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
            <p className="text-foreground">motion.asmitsah.dev</p>
            <p className="mt-1">Motion, tuned once.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
