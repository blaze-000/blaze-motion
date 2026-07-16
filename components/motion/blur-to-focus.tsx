"use client";

import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { blurToFocus, durations, ease } from "@/lib/motion";

type BlurToFocusProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
};

// `filter` blur is GPU-costly — reserve for a hero / single focal element, not lists.
// No transform here, so reduced motion leaves a gentle blur+opacity focus (no positional motion).
export function BlurToFocus({ children, className, style, delay = 0 }: BlurToFocusProps) {
  return (
    <m.div
      className={className}
      style={style}
      initial={blurToFocus.initial}
      animate={blurToFocus.animate}
      transition={{ duration: durations.base, ease: ease.out, delay }}
    >
      {children}
    </m.div>
  );
}
