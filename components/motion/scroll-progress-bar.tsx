"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties, RefObject } from "react";
import { cn } from "@/lib/utils";

type ScrollProgressBarProps = {
	className?: string;
	style?: CSSProperties;
	height?: number;
	position?: "top" | "bottom";
	target?: RefObject<HTMLElement | null>;
	color?: string;
};

export function ScrollProgressBar({
	className,
	style,
	height = 3,
	position = "top",
	target,
	color,
}: ScrollProgressBarProps) {
	const { scrollYProgress } = useScroll(
		target ? { target, offset: ["start start", "end end"] } : undefined,
	);
	// Spring-smooth the raw scroll so the fill glides instead of snapping.
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 30,
		mass: 0.3,
	});

	return (
		<m.div
			aria-hidden
			className={cn("fixed inset-x-0 z-50 origin-left bg-signal", className)}
			style={{
				// Prop-driven defaults first, so consumer `style` below can compose over them.
				height,
				top: position === "top" ? 0 : undefined,
				bottom: position === "bottom" ? 0 : undefined,
				...(color ? { backgroundColor: color } : {}),
				...style,
				// Functional transforms last — they drive the fill and must always win.
				scaleX,
				transformOrigin: "left",
			}}
		/>
	);
}
