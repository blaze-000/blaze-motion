import type {
	ComponentPropsWithoutRef,
	CSSProperties,
	ElementType,
	ReactNode,
} from "react";
import { feel } from "@/lib/motion";
import { cn } from "@/lib/utils";

type AnimatedUnderlineProps<T extends ElementType = "a"> = {
	as?: T;
	children: ReactNode;
	className?: string;
	underlineClassName?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const underlineTransition: CSSProperties = {
	transitionDuration: `${feel.duration.fast}s`,
	transitionTimingFunction: `cubic-bezier(${feel.ease.join(",")})`,
};

// Underline draws L->R on enter, retracts OUT to the right on leave
// (origin-right at rest, origin-left while hovered). Pure CSS.
export function AnimatedUnderline<T extends ElementType = "a">({
	as,
	children,
	className,
	underlineClassName,
	...props
}: AnimatedUnderlineProps<T>) {
	const Comp = (as ?? "a") as ElementType;
	return (
		<Comp className={cn("group relative inline-block", className)} {...props}>
			{children}
			<span
				aria-hidden
				style={underlineTransition}
				className={cn(
					"pointer-events-none absolute inset-x-0 bottom-0 block h-0.5 origin-right scale-x-0 bg-current transition-transform group-hover:origin-left group-hover:scale-x-100 motion-reduce:transition-none",
					underlineClassName,
				)}
			/>
		</Comp>
	);
}
