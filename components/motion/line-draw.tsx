"use client";

import * as m from "motion/react-m";
import type { ComponentPropsWithoutRef } from "react";
import type { Variants } from "motion/react";
import { durations, ease } from "@/lib/motion";

// pathLength + fillOpacity are variant animations — supported by domAnimation, no domMax/extra feature import.
// Each path draws its stroke, then the fill fades in once the stroke is fully drawn.
const drawPath: Variants = {
  hidden: { pathLength: 0, fillOpacity: 0 },
  visible: {
    pathLength: 1,
    fillOpacity: 1,
    transition: {
      pathLength: { duration: durations.slow, ease: ease.out },
      fillOpacity: { duration: durations.base, delay: durations.slow },
    },
  },
};

type LineDrawProps = ComponentPropsWithoutRef<typeof m.svg> & {
  delay?: number;
  stagger?: number;
};

export function LineDraw({ children, className, style, delay = 0, stagger = 0, ...rest }: LineDrawProps) {
  return (
    <m.svg
      {...rest}
      className={className}
      style={style}
      variants={{ visible: { transition: { delayChildren: delay, staggerChildren: stagger } } }}
      initial="hidden"
      animate="visible"
    >
      {children}
    </m.svg>
  );
}

// Inherits the parent LineDraw's variant label via context — draws then fills.
export function LineDrawPath({ strokeLinecap = "round", ...pathProps }: ComponentPropsWithoutRef<typeof m.path>) {
  return <m.path strokeLinecap={strokeLinecap} {...pathProps} variants={drawPath} />;
}
