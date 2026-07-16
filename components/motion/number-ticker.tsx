"use client";

import {
	animate,
	useInView,
	useMotionValue,
	useReducedMotion,
	useTransform,
} from "motion/react";
import * as m from "motion/react-m";
import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import { feel, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

type NumberTickerProps = {
	value: number;
	from?: number;
	duration?: number;
	decimals?: number;
	prefix?: string;
	suffix?: string;
	className?: string;
	style?: CSSProperties;
};

export function NumberTicker({
	value,
	from = 0,
	duration = 1.2,
	decimals = 0,
	prefix = "",
	suffix = "",
	className,
	style,
}: NumberTickerProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, viewportOnce);
	const reduced = useReducedMotion();
	const mv = useMotionValue(from);
	const text = useTransform(mv, (latest) => {
		const body = latest.toLocaleString(undefined, {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals,
		});
		return `${prefix}${body}${suffix}`;
	});

	useEffect(() => {
		if (!inView) return;
		if (reduced) {
			mv.set(value);
			return;
		}
		const controls = animate(mv, value, { duration, ease: feel.ease });
		return () => controls.stop();
	}, [inView, reduced, value, duration, mv]);

	return (
		<m.span ref={ref} className={cn("tabular-nums", className)} style={style}>
			{text}
		</m.span>
	);
}
