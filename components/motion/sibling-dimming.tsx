import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { feel } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Container: when it HAS a hovered item, every non-hovered item dims to 50%.
// `:not(:hover)` keeps the hovered item untouched, so there's no self-hover
// specificity race. Pair with SiblingDimmingItem (adds the `.dim-item` marker).
export function SiblingDimming({
	className,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn(
				"[&:has(.dim-item:hover)_.dim-item:not(:hover)]:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

const dimTransition: CSSProperties = {
	transitionDuration: `${feel.duration.fast}s`,
	transitionTimingFunction: `cubic-bezier(${feel.ease.join(",")})`,
};

export function SiblingDimmingItem({
	className,
	style,
	...props
}: ComponentPropsWithoutRef<"div">) {
	return (
		<div
			className={cn(
				"dim-item transition-opacity motion-reduce:transition-none",
				className,
			)}
			style={{ ...dimTransition, ...style }}
			{...props}
		/>
	);
}
