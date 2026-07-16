"use client";

import type { Variants } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, ReactNode } from "react";
import { feel, staggerItem, viewportOnce } from "@/lib/motion";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** seconds between each child (LinearStagger — tunable step) */
  staggerChildren?: number;
  /** seconds before the first child */
  delayChildren?: number;
};

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * Staggered children reveal. FLAT exports on purpose — never a compound
 * `Stagger.Item` (a bolted-on property is undefined across the RSC
 * client-reference boundary and crashes a Server Component at build).
 */
export function Stagger({
  children,
  className,
  style,
  staggerChildren = feel.stagger,
  delayChildren = feel.staggerDelay,
}: StaggerProps) {
  // Built from props so the step is tunable; defaults reproduce staggerContainer exactly.
  const container: Variants = {
    initial: {},
    animate: { transition: { staggerChildren, delayChildren } },
  };
  return (
    <m.div
      className={className}
      style={style}
      variants={container}
      initial="initial"
      whileInView="animate"
      viewport={viewportOnce}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className, style }: StaggerItemProps) {
  return (
    <m.div className={className} style={style} variants={staggerItem}>
      {children}
    </m.div>
  );
}
