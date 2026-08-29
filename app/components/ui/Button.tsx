"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Button({
	children,
	className,
  x,y,
}: {
	children: ReactNode;
	className?: string;
  x?: number;
  y?: number;
}) {
	return (
		<div className={cn("absolute -translate-x-1/2 -translate-y-1/2  bg-amber-400 text-black text-nowrap rounded-lg w-fit p-8 py-3", className)} style={{left:x, top:y}}>
			{children}
		</div>
	);
}
