"use client";

import type { ReactNode, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
	x?: number;
	y?: number;
	variant?: "default" | "outline";
	size?: "default" | "icon";
}

export default function Button({
	children,
	className,
	x,
	y,
	variant = "default",
	size = "default",
	type,
	...props
}: ButtonProps) {
	const isPositioned = x !== undefined || y !== undefined;

	if (isPositioned) {
		return (
			<div
				className={cn(
					"absolute -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-black text-nowrap rounded-lg w-fit p-8 py-3",
					className,
				)}
				style={{ left: x, top: y }}
			>
				{children}
			</div>
		);
	}

	return (
		<button
			type={type ?? "button"}
			className={cn(
				"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
				variant === "default" && "bg-amber-400 text-black hover:bg-amber-300",
				variant === "outline" &&
					"border border-amber-400 bg-white text-black hover:bg-amber-100",
				size === "default" && "h-9 px-4 py-2",
				size === "icon" && "h-8 w-8",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
}
