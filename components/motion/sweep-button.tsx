import type { ComponentPropsWithoutRef } from "react";
import { feel } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SweepOrigin = "left" | "right" | "top" | "bottom";

type SweepButtonProps = ComponentPropsWithoutRef<"button"> & {
  origin?: SweepOrigin;
  sweepClassName?: string;
};

const sweepOrigin: Record<SweepOrigin, string> = {
  left: "origin-left scale-x-0 group-hover:scale-x-100",
  right: "origin-right scale-x-0 group-hover:scale-x-100",
  top: "origin-top scale-y-0 group-hover:scale-y-100",
  bottom: "origin-bottom scale-y-0 group-hover:scale-y-100",
};

// A CSS-only fill that sweeps in from `origin` on hover — no JS animation.
export function SweepButton({
  children,
  className,
  origin = "left",
  sweepClassName,
  ...props
}: SweepButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        style={{
          transitionDuration: `${feel.duration.fast}s`,
          transitionTimingFunction: `cubic-bezier(${feel.ease.join(",")})`,
        }}
        className={cn(
          "absolute inset-0 bg-signal transition-transform motion-reduce:transition-none",
          sweepOrigin[origin],
          sweepClassName,
        )}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
