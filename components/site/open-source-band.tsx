import { ArrowUpRight } from "lucide-react";
import { EasingCurveMark } from "./easing-curve-mark";
import { GitHubStarsReadout } from "./github-stars";

const REPO_URL = "https://github.com/blaze-000/blaze-motion";

/** Open-source as the headline — the live star count at a bigger weight. */
export function OpenSourceBand() {
  return (
    <section aria-label="Open source" className="container-page px-6 py-20 lg:px-12">
      <div className="flex flex-col items-center gap-6 rounded-md border border-border bg-card px-6 py-12 text-center sm:py-16">
        <EasingCurveMark variant="hero" className="h-14 w-16" />
        <h2 className="text-h2 text-foreground">Open-source. MIT. Own the files.</h2>
        <p className="text-lead mx-auto text-center">
          No opaque dependency, no lock-in — the source lands in your repo and stays yours. Star the
          work if it saves you time.
        </p>
        <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
          <GitHubStarsReadout />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-signal-strong"
          >
            View on GitHub
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </div>
    </section>
  );
}
