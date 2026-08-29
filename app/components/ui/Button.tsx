"use client";

import type {
	ReactNode,
	ButtonHTMLAttributes,
	MouseEvent,
	TouchEvent,
} from "react";
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
	onMouseDown,
	onTouchStart,
	...props
}: ButtonProps) {
	const isPositioned = x !== undefined || y !== undefined;

	const stopCanvasDrag = (e: MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onMouseDown?.(e);
	};

	const stopCanvasTouch = (e: TouchEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		onTouchStart?.(e);
	};

	if (isPositioned) {
		return (
			<button
				type={type ?? "button"}
				className={cn(
					"absolute -translate-x-1/2 -translate-y-1/2 bg-amber-400 text-black text-nowrap rounded-lg w-fit p-8 py-3 cursor-pointer select-none",
					className,
				)}
				style={{ left: x, top: y }}
				onMouseDown={stopCanvasDrag}
				onTouchStart={stopCanvasTouch}
				{...props}
			>
				{children}
			</button>
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
			onMouseDown={onMouseDown}
			onTouchStart={onTouchStart}
			{...props}
		>
			{children}
		</button>
	);
}
