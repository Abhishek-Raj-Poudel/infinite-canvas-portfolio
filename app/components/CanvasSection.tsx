"use client";

import { useEffect, type ReactNode } from "react";
import { useSectionRegistry } from "@/context/SectionRegistryContext";

interface CanvasSectionProps {
	x: number;
	y: number;
	id?: string;
	children: ReactNode;
}

export default function CanvasSection({ x, y, id, children }: CanvasSectionProps) {
	const { register, unregister } = useSectionRegistry();

	useEffect(() => {
		if (!id) return;
		register(id, x, y);
		return () => unregister(id);
	}, [id, x, y, register, unregister]);

	return (
		<div
			id={id}
			className="absolute -translate-x-1/2 -translate-y-1/2 w-xl max-w-[90vw]"
			style={{ left: x, top: y }}
		>
			{children}
		</div>
	);
}
