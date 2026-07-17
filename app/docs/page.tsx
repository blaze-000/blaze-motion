import type { Metadata } from "next";
import { ComponentIndex } from "@/components/docs/component-index";
import { Reveal } from "@/components/motion/reveal";
import { CodeBlock } from "@/components/site/code-block";
import { InstallBlock } from "@/components/site/install-block";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Install blaze-motion and browse its RSC-safe motion primitives — the core five plus entrance, hover, stagger, and text effects — all tuned from one feel object.",
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

export default function DocsPage() {
  return (
    <div className="relative">
      <div className="relative z-10">
        <div className="mx-auto max-w-[88rem] px-6 pt-12 lg:px-12 lg:pt-20">
          <Reveal className="flex max-w-3xl flex-col gap-4">
            <p className="fig-label text-muted-foreground">Documentation</p>
            <h1 className="text-display text-foreground">
              Own the files. <span className="text-signal">Tune the feel.</span>
            </h1>
            <p className="text-lead">
              Install once, then compose primitives around your own markup. Every component has its
              own page below — a live preview, source, and props.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-[88rem] px-6 py-16 lg:px-12 lg:py-24">
          <section className="border-t border-border pt-16 first-of-type:border-0 first-of-type:pt-0">
            <div className="flex flex-col gap-2">
              <h2 className="text-h2 text-foreground">One-time setup</h2>
              <p className="font-mono text-sm text-signal">
                Install, then mount the provider once at the root.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-6">
              <InstallBlock />
              <CodeBlock code={MOUNT_CODE} caption="app/layout.tsx" />
            </div>
          </section>

          <section className="border-t border-border pt-16 mt-16">
            <div className="flex flex-col gap-2">
              <h2 className="text-h2 text-foreground">All components</h2>
              <p className="font-mono text-sm text-signal">26 primitives, one page each.</p>
            </div>
            <div className="mt-8">
              <ComponentIndex />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
