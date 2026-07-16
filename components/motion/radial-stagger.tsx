"use client";

import type { Variants } from "motion/react";
import { useAnimationControls } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { Children, useEffect, useState } from "react";
import { feel, springPop, springPopTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type DistanceMetric = "euclidean" | "manhattan" | "chebyshev";

type RadialStaggerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** classes for each tile (the grid cell) */
  itemClassName?: string;
  /** grid columns — drives both the layout and the distance geometry */
  columns?: number;
  /** seconds of delay added per unit of distance from the clicked origin */
  step?: number;
  /** how ring distance is measured from the origin cell */
  distance?: DistanceMetric;
  /** index the first cascade ripples out from (before any click) */
  defaultOrigin?: number;
  /**
   * Opt into real interactive controls — each tile renders as a focusable
   * `<button>`. Requires an accessible name per tile (see `getItemLabel`),
   * otherwise you ship nameless buttons (WCAG 4.1.2). Leave off (default) for
   * a decorative ripple grid: tiles render as non-focusable `role="presentation"`
   * elements, so keyboard/SR users never hit empty controls.
   */
  interactive?: boolean;
  /** Accessible name for the tile at `index` — required when `interactive`. */
  getItemLabel?: (index: number) => string;
  /** Fires with the tile index when an interactive tile is selected. */
  onSelect?: (index: number) => void;
};

const radialItem: Variants = {
  hidden: springPop.initial,
  visible: (delay: number) => ({
    ...springPop.animate,
    transition: { ...springPopTransition, delay },
  }),
};

function ringDistance(a: number, b: number, columns: number, metric: DistanceMetric) {
  const cols = Math.max(1, columns);
  const dr = Math.abs(Math.floor(a / cols) - Math.floor(b / cols));
  const dc = Math.abs((a % cols) - (b % cols));
  if (metric === "manhattan") return dr + dc;
  if (metric === "chebyshev") return Math.max(dr, dc);
  return Math.hypot(dr, dc);
}

// FLAT export (never a compound `RadialStagger.Item` — bolted-on props are
// stripped across the RSC client boundary and crash a Server Component at build).
export function RadialStagger({
  children,
  className,
  style,
  itemClassName,
  columns = 4,
  step = feel.stagger,
  distance = "euclidean",
  defaultOrigin = 0,
  interactive = false,
  getItemLabel,
  onSelect,
}: RadialStaggerProps) {
  const [origin, setOrigin] = useState(defaultOrigin);
  const [nonce, setNonce] = useState(0);
  const controls = useAnimationControls();

  // biome-ignore lint/correctness/useExhaustiveDependencies: origin/nonce are the replay trigger — re-running after the fresh `custom` delays commit is the point
  useEffect(() => {
    controls.set("hidden");
    controls.start("visible");
  }, [origin, nonce, controls]);

  function ripple(index: number) {
    setOrigin(index);
    setNonce((n) => n + 1);
  }

  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.max(1, columns)}, minmax(0, 1fr))`,
        ...style,
      }}
    >
      {Children.map(children, (child, index) => {
        const motionProps = {
          custom: ringDistance(index, origin, columns, distance) * step,
          variants: radialItem,
          initial: "hidden" as const,
          animate: controls,
        };

        // Opt-in interactive: real focusable button, must be labelled.
        if (interactive) {
          return (
            <m.button
              {...motionProps}
              type="button"
              aria-label={getItemLabel?.(index)}
              onClick={() => {
                ripple(index);
                onSelect?.(index);
              }}
              className={cn(
                "cursor-pointer appearance-none border-0 bg-transparent p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-2",
                itemClassName,
              )}
            >
              {child}
            </m.button>
          );
        }

        // Default decorative: non-focusable, no accessible name needed. The
        // click-to-ripple-outward effect still works — clicking a tile cascades
        // ripples from it — it just isn't exposed to keyboard/SR as a control.
        return (
          <m.div
            {...motionProps}
            role="presentation"
            onClick={() => ripple(index)}
            className={cn("cursor-pointer", itemClassName)}
          >
            {child}
          </m.div>
        );
      })}
    </div>
  );
}
