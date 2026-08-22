"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Button({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={cn("bg-amber-400 text-black rounded-lg w-fit p-8 py-3", className)}>
			{children}
		</div>
	);
}
