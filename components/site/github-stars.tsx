"use client";

import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { GitHubMark } from "./icons";

const REPO = "blaze-000/blaze-motion";
const REPO_URL = "https://github.com/blaze-000/blaze-motion";
const API = "https://api.github.com/repos/blaze-000/blaze-motion";
const CACHE_KEY = "bm:stars";

// null until resolved, and stays null on fetch failure so callers keep the
// icon-only fallback. Cached in sessionStorage so the count never re-jitters.
function useGitHubStars(): number | null {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached !== null) {
      const n = Number.parseInt(cached, 10);
      if (!Number.isNaN(n)) {
        setStars(n);
        return;
      }
    }
    const controller = new AbortController();
    fetch(API, {
      signal: controller.signal,
      headers: { Accept: "application/vnd.github+json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data: { stargazers_count?: number }) => {
        if (typeof data.stargazers_count === "number") {
          setStars(data.stargazers_count);
          sessionStorage.setItem(CACHE_KEY, String(data.stargazers_count));
        }
      })
      .catch(() => {
        /* graceful — leave the count out, keep the repo link */
      });
    return () => controller.abort();
  }, []);

  return stars;
}

/** Nav-sized repo link with the live star count (icon-only until/if it fails). */
export function GitHubStars({ className }: { className?: string }) {
  const stars = useGitHubStars();
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        stars === null ? "blaze-motion on GitHub" : `blaze-motion on GitHub — ${stars} stars`
      }
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border bg-card px-2.5 py-1.5 text-sm text-foreground transition-colors hover:border-signal/50 hover:text-signal",
        className,
      )}
    >
      <GitHubMark className="size-4" />
      {stars !== null ? (
        <span className="inline-flex items-center gap-1 font-mono tabular-nums">
          <Star className="size-3.5 fill-signal text-signal" aria-hidden />
          {stars.toLocaleString("en-US")}
        </span>
      ) : null}
    </a>
  );
}

/** Larger readout for the open-source band. */
export function GitHubStarsReadout() {
  const stars = useGitHubStars();
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        stars === null
          ? `Star ${REPO} on GitHub`
          : `Star ${REPO} on GitHub — ${stars} stars`
      }
      className="group inline-flex items-center gap-4 rounded-md border border-border bg-card px-5 py-4 transition-colors hover:border-signal/50"
    >
      <GitHubMark className="size-6 text-foreground" />
      <span className="flex flex-col text-left">
        <span className="font-mono text-xs text-muted-foreground">{REPO}</span>
        <span className="inline-flex items-center gap-1.5 text-lg font-semibold tabular-nums text-foreground">
          <Star className="size-4 fill-signal text-signal" aria-hidden />
          {stars !== null ? (
            <>
              {stars.toLocaleString("en-US")}
              <span className="font-normal text-muted-foreground">stars</span>
            </>
          ) : (
            <span className="text-base font-normal text-muted-foreground group-hover:text-signal">
              Star on GitHub
            </span>
          )}
        </span>
      </span>
    </a>
  );
}
