import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PROPS } from "@/components/docs/docs-data";
import { DocsShell } from "@/components/docs/docs-shell";
import { type DemoName, PrimitiveDemo } from "@/components/docs/primitive-demo";
import { PropsTable } from "@/components/docs/props-table";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CodeBlock } from "@/components/site/code-block";
import { Footer } from "@/components/site/footer";
import { InstallBlock } from "@/components/site/install-block";
import { Nav } from "@/components/site/nav";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Install blaze-motion and compose its six RSC-safe motion primitives — FadeIn, Reveal, Stagger, CinematicImage, PageTransition — all tuned from one feel object.",
  alternates: { canonical: "/docs" },
};

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

const FADEIN_CODE = `import { FadeIn } from "@/components/motion/fade-in";

<FadeIn delay={0.1}>
  <h1>Above the fold</h1>
</FadeIn>`;

const REVEAL_CODE = `import { Reveal } from "@/components/motion/reveal";

<Reveal className="grid gap-4">
  <h2>Rises into view, once.</h2>
</Reveal>`;

const STAGGER_CODE = `import { Stagger, StaggerItem } from "@/components/motion/stagger";

<Stagger className="grid gap-2">
  <StaggerItem>One</StaggerItem>
  <StaggerItem>Two</StaggerItem>
  <StaggerItem>Three</StaggerItem>
</Stagger>`;

const CINEMATIC_CODE = `import Image from "next/image";
import { CinematicImage } from "@/components/motion/cinematic-image";

<CinematicImage className="relative aspect-video overflow-hidden">
  <Image src="/hero.jpg" alt="" fill className="object-cover" />
</CinematicImage>`;

const PAGETRANSITION_CODE = `// app/template.tsx
"use client";
import { usePathname } from "next/navigation";
import { PageTransition } from "@/components/motion/page-transition";

export default function Template({ children }) {
  const pathname = usePathname();
  return <PageTransition routeKey={pathname}>{children}</PageTransition>;
}`;

const HARD_RULES = [
  {
    k: "m from motion/react-m",
    v: "The provider runs LazyMotion strict — import m from motion/react-m, never the raw motion object.",
  },
  {
    k: "Flat Stagger / StaggerItem",
    v: "Two named exports, never Stagger.Item — a compound property is undefined across the RSC boundary and crashes the build.",
  },
  {
    k: "className passes through",
    v: "Every primitive forwards className + style, so it becomes your layout element — no orphan wrapper div.",
  },
  {
    k: "CinematicImage clips",
    v: "Its 110% start scale overflows unless the wrapper (or a parent) carries overflow-hidden.",
  },
  {
    k: "PageTransition routeKey",
    v: "Key it with a routeKey prop — React reserves and strips a prop literally named key.",
  },
];

type Primitive = {
  id: string;
  title: string;
  demoName: DemoName;
  figNo: string;
  oneLine: string;
  desc: string;
  when: string;
  code: string;
  propsKey: keyof typeof PROPS;
};

const PRIMITIVES: Primitive[] = [
  {
    id: "fadein",
    title: "FadeIn",
    demoName: "fadein",
    figNo: "01",
    oneLine: "Pure opacity fade — for above-the-fold, on-mount content.",
    desc: "FadeIn animates opacity 0 → 1 over the slow duration (0.8s) the moment it mounts. No movement, no scroll trigger.",
    when: "Above the fold, where there's no scroll to trigger on — hero headlines, the first paragraph. Reach for Reveal once content sits below the fold.",
    code: FADEIN_CODE,
    propsKey: "fadein",
  },
  {
    id: "reveal",
    title: "Reveal",
    demoName: "reveal",
    figNo: "02",
    oneLine: "A straight rise from below, once, on scroll-into-view.",
    desc: "Reveal lifts content opacity 0 → 1 and y +28px → 0 the first time it is 30% in view. No spring, no overshoot, no scale — a calm settle.",
    when: "Section content below the fold. Use it deliberately, not on every band — some sections read better with no entrance motion at all.",
    code: REVEAL_CODE,
    propsKey: "reveal",
  },
  {
    id: "stagger",
    title: "Stagger",
    demoName: "stagger",
    figNo: "03",
    oneLine: "Sibling choreography — children rise in sequence.",
    desc: "Stagger is the container (staggerChildren 0.08s); each StaggerItem does the same straight rise as Reveal. Two flat exports, never a compound Stagger.Item.",
    when: "Lists and grids of peers — cards, rows, chips — where a sequenced reveal beats all-at-once. Give a StaggerItem className=\"flex\" when it wraps a grid or flex child.",
    code: STAGGER_CODE,
    propsKey: "stagger",
  },
  {
    id: "cinematicimage",
    title: "CinematicImage",
    demoName: "cinematicimage",
    figNo: "04",
    oneLine: "A scale-down settle for large images only.",
    desc: "Starts at opacity 0 / scale 1.1 and settles to opacity 1 / scale 1 on scroll-into-view, over 0.8s. Reserved for large imagery — titles and text always get the plain rise.",
    when: "Hero banners, cover images, full-bleed stills. The wrapper (or a parent) must carry overflow-hidden or the 110% start scale overflows and shifts layout.",
    code: CINEMATIC_CODE,
    propsKey: "cinematicimage",
  },
  {
    id: "pagetransition",
    title: "PageTransition",
    demoName: "pagetransition",
    figNo: "05",
    oneLine: "Route changes fade + shift, keyed by route.",
    desc: "Wraps route content in AnimatePresence (mode=\"wait\") and fades + shifts (y 8 → 0) on each route change using the softer easeSoft curve. Keyed via routeKey, not key.",
    when: "Once, in app/template.tsx, so every navigation inherits the transition — including the move between this page and home.",
    code: PAGETRANSITION_CODE,
    propsKey: "pagetransition",
  },
];

function DocSection({
  id,
  title,
  oneLine,
  children,
}: {
  id: string;
  title: string;
  oneLine: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-border pt-16 first-of-type:border-0 first-of-type:pt-0"
    >
      <div className="flex flex-col gap-2">
        <h2 className="text-h2 text-foreground">{title}</h2>
        <p className="font-mono text-sm text-signal">{oneLine}</p>
      </div>
      <div className="mt-8 flex flex-col gap-6">{children}</div>
    </section>
  );
}

function WhenToUse({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-card p-4">
      <p className="fig-label text-signal">When to use</p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function PropsHeading() {
  return <h3 className="text-h3 text-foreground">Props</h3>;
}

export default function DocsPage() {
  return (
    <>
      <Nav />
      <main className="relative">
        <div className="relative z-10">
          <div className="mx-auto max-w-[88rem] px-6 pt-12 lg:px-12 lg:pt-20">
            <Reveal className="flex max-w-3xl flex-col gap-4">
              <p className="fig-label text-muted-foreground">Documentation</p>
              <h1 className="text-display text-foreground">
                Own the files. <span className="text-signal">Tune the feel.</span>
              </h1>
              <p className="text-lead">
                Install once, then compose six RSC-safe primitives around your own markup. Every
                animation derives from a single feel object — retune the whole engine from one place.
              </p>
            </Reveal>
          </div>

          <DocsShell>
            <DocSection
              id="installation"
              title="Installation"
              oneLine="One command. Works today, no config."
            >
              <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
                blaze-motion installs the shadcn way — the source files land in your repo, editable,
                not as an opaque npm dependency. One command brings the tokens, the provider, and all
                six primitives.
              </p>
              <InstallBlock />
              <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
                It pulls a single runtime dependency,{" "}
                <code className="rounded bg-panel-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
                  motion@^12.42.2
                </code>{" "}
                — the shadcn CLI installs it for you.
              </p>
              <div>
                <h3 className="text-h3 text-foreground">The hard rules</h3>
                <Stagger className="mt-4 flex flex-col gap-2">
                  {HARD_RULES.map((rule) => (
                    <StaggerItem key={rule.k}>
                      <div className="flex flex-col gap-1 rounded-md border border-border bg-card p-4 sm:flex-row sm:gap-4">
                        <span className="font-mono text-sm text-signal sm:w-56 sm:shrink-0">
                          {rule.k}
                        </span>
                        <span className="text-sm leading-relaxed text-muted-foreground">{rule.v}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </DocSection>

            <DocSection
              id="provider-setup"
              title="Provider Setup"
              oneLine="Mount MotionProvider once, at the root."
            >
              <p className="max-w-prose text-base leading-relaxed text-muted-foreground">
                MotionProvider wraps your whole app in LazyMotion (domAnimation, strict) and
                MotionConfig (reducedMotion=&quot;user&quot;). Mount it once, in the root layout — it is
                a single client leaf, so every page around it stays a Server Component.
              </p>
              <CodeBlock code={MOUNT_CODE} caption="app/layout.tsx" />
              <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-signal" aria-hidden>
                    ·
                  </span>
                  LazyMotion strict + domAnimation keeps the animation bundle lean and forces every
                  primitive to import <code className="font-mono text-foreground">m</code> from{" "}
                  <code className="font-mono text-foreground">motion/react-m</code>.
                </li>
                <li className="flex gap-2">
                  <span className="text-signal" aria-hidden>
                    ·
                  </span>
                  reducedMotion=&quot;user&quot; honors the OS prefers-reduced-motion setting
                  automatically, for every primitive.
                </li>
              </ul>
              <div>
                <PropsHeading />
                <div className="mt-4">
                  <PropsTable rows={PROPS.provider} />
                </div>
              </div>
            </DocSection>

            {PRIMITIVES.map((p) => (
              <DocSection key={p.id} id={p.id} title={p.title} oneLine={p.oneLine}>
                <p className="max-w-prose text-base leading-relaxed text-muted-foreground">{p.desc}</p>
                <WhenToUse>{p.when}</WhenToUse>
                <PrimitiveDemo name={p.demoName} figNo={p.figNo} />
                <CodeBlock code={p.code} caption="usage" />
                <div>
                  <PropsHeading />
                  <div className="mt-4">
                    <PropsTable rows={PROPS[p.propsKey]} />
                  </div>
                </div>
                {p.id === "stagger" ? (
                  <div>
                    <h3 className="text-h3 text-foreground">StaggerItem props</h3>
                    <div className="mt-4">
                      <PropsTable rows={PROPS.staggerItem} />
                    </div>
                  </div>
                ) : null}
              </DocSection>
            ))}
          </DocsShell>
        </div>
      </main>
      <Footer />
    </>
  );
}
