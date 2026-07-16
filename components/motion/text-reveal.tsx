"use client";

import * as m from "motion/react-m";
import type { CSSProperties } from "react";
import { Fragment } from "react";
import {
	feel,
	textRevealContainer,
	textRevealItem,
	viewportOnce,
} from "@/lib/motion";

const TAGS = {
	span: m.span,
	div: m.div,
	p: m.p,
	h1: m.h1,
	h2: m.h2,
	h3: m.h3,
	h4: m.h4,
	h5: m.h5,
	h6: m.h6,
} as const;

type TextRevealProps = {
	children: string;
	className?: string;
	style?: CSSProperties;
	delay?: number;
	by?: "word" | "char";
	as?: keyof typeof TAGS;
	stagger?: number;
	trigger?: "inView" | "mount";
};

export function TextReveal({
	children,
	className,
	style,
	delay = 0,
	by = "word",
	as = "span",
	stagger,
	trigger = "inView",
}: TextRevealProps) {
	const Container = TAGS[as] as typeof m.span;
	const step =
		stagger ?? (by === "char" ? feel.textStaggerChar : feel.textStagger);
	const words = children.trim().split(/\s+/);
	const play =
		trigger === "mount"
			? ({ animate: "animate" } as const)
			: ({ whileInView: "animate", viewport: viewportOnce } as const);

	return (
		// aria-label carries the full string so SR reads it whole, not per-span.
		<Container
			className={className}
			style={style}
			aria-label={children}
			variants={textRevealContainer(step, delay)}
			initial="initial"
			{...play}
		>
			{words.map((word, wi) => {
				const wordKey = `w${wi}`;
				return (
					<Fragment key={wordKey}>
						{by === "word" ? (
							<m.span
								aria-hidden
								variants={textRevealItem}
								style={{ display: "inline-block" }}
							>
								{word}
							</m.span>
						) : (
							<span aria-hidden style={{ display: "inline-block" }}>
								{Array.from(word).map((ch, ci) => {
									const charKey = `${wordKey}c${ci}`;
									return (
										<m.span
											key={charKey}
											variants={textRevealItem}
											style={{ display: "inline-block" }}
										>
											{ch}
										</m.span>
									);
								})}
							</span>
						)}
						{wi < words.length - 1 ? " " : null}
					</Fragment>
				);
			})}
		</Container>
	);
}
