import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fade } from "@/components/motion/fade";
import { DraftingFrame } from "@/components/site/drafting-frame";
import { EasingCurveMark } from "@/components/site/easing-curve-mark";
import { Footer } from "@/components/site/footer";
import { Nav } from "@/components/site/nav";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This route doesn't exist in blaze-motion — check the address or head back home.",
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative">
        <DraftingFrame />
        <div className="container-page relative z-10 px-6 py-24 sm:py-32 lg:px-12 lg:py-40">
          <Fade className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
            <EasingCurveMark variant="hero" className="h-24 w-28 opacity-80 sm:h-28 sm:w-32" />
            <p className="fig-label text-muted-foreground">
              FIG.&nbsp;404<span className="px-1.5 text-border">·</span>
              <span className="text-foreground">off the plot</span>
            </p>
            <h1 className="text-display text-foreground">
              No route <span className="text-signal">plotted</span> here.
            </h1>
            <p className="text-lead">
              This page doesn&apos;t exist — moved, renamed, or never drawn. Check the address, or
              pick a coordinate below.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-signal-strong"
              >
                <ArrowLeft className="size-4" aria-hidden />
                Back home
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-signal/50 hover:text-signal"
              >
                Browse components
              </Link>
            </div>
          </Fade>
        </div>
      </main>
      <Footer />
    </>
  );
}
