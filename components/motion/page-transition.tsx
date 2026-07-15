"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { durations, ease } from "@/lib/motion";

type PageTransitionProps = {
  children: ReactNode;
  /** A stable key for the current route — NOT `key` (React strips that). */
  routeKey: string;
  className?: string;
  style?: CSSProperties;
};

/** Route transition — fades + shifts the page on `routeKey` change. */
export function PageTransition({ children, routeKey, className, style }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={routeKey}
        className={className}
        style={style}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: durations.base, ease: ease.soft }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  );
}
