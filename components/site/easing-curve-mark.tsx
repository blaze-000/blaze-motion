"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

// Plot box: 10..110 (100 units) inside a 120×120 viewBox (10u padding).
// (u, v) in [0,1]² → svg (10 + u·100, 110 − v·100). y is inverted.
const P0 = { x: 10, y: 110 }; // (0, 0)
const P1 = { x: 32, y: 49 }; //  (0.22, 0.61)
const P2 = { x: 46, y: 10 }; //  (0.36, 1)
const P3 = { x: 110, y: 10 }; // (1, 1)
const CURVE = `M${P0.x},${P0.y} C${P1.x},${P1.y} ${P2.x},${P2.y} ${P3.x},${P3.y}`;

function bezierAt(t: number) {
  const mt = 1 - t;
  const a = mt * mt * mt;
  const b = 3 * mt * mt * t;
  const c = 3 * mt * t * t;
  const d = t * t * t;
  return {
    x: a * P0.x + b * P1.x + c * P2.x + d * P3.x,
    y: a * P0.y + b * P1.y + c * P2.y + d * P3.y,
  };
}

type EasingCurveMarkProps = {
  variant?: "nav" | "hero";
  className?: string;
};

export function EasingCurveMark({ variant = "nav", className }: EasingCurveMarkProps) {
  const reduce = useReducedMotion();
  const isHero = variant === "hero";

  const samples = useMemo(() => {
    const n = 36;
    const xs: number[] = [];
    const ys: number[] = [];
    for (let i = 0; i <= n; i++) {
      const pt = bezierAt(i / n);
      xs.push(pt.x);
      ys.push(pt.y);
    }
    return { xs, ys };
  }, []);

  const strokeW = isHero ? 2.4 : 3;
  const gridW = isHero ? 0.8 : 1;

  return (
    <m.svg
      viewBox="0 0 120 120"
      fill="none"
      className={cn("overflow-visible", className)}
      role="img"
      aria-label="blaze-motion ease curve, cubic-bezier(0.22, 0.61, 0.36, 1)"
      initial="rest"
      whileHover={reduce ? undefined : "ride"}
    >
      <rect
        x={10}
        y={10}
        width={100}
        height={100}
        stroke="var(--color-grid)"
        strokeWidth={gridW}
        rx={2}
      />
      {isHero ? (
        <g stroke="var(--color-grid)" strokeWidth={gridW}>
          <line x1={60} y1={10} x2={60} y2={110} />
          <line x1={10} y1={60} x2={110} y2={60} />
        </g>
      ) : null}
      <m.path
        d={CURVE}
        stroke="var(--color-signal)"
        strokeWidth={strokeW}
        strokeLinecap="round"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 1.1, ease: [0.22, 0.61, 0.36, 1] }}
      />
      <circle cx={P0.x} cy={P0.y} r={isHero ? 2.6 : 3} fill="var(--color-signal)" opacity={0.55} />
      <circle cx={P3.x} cy={P3.y} r={isHero ? 2.6 : 3} fill="var(--color-signal)" opacity={0.55} />
      {!reduce ? (
        <m.circle
          r={isHero ? 4 : 4.5}
          fill="var(--color-signal-strong)"
          variants={{
            rest: { opacity: 0, cx: P3.x, cy: P3.y },
            ride: { opacity: 1, cx: samples.xs, cy: samples.ys },
          }}
          transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
        />
      ) : null}
    </m.svg>
  );
}
