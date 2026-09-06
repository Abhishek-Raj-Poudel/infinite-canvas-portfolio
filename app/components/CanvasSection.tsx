import { type ReactNode } from "react";

interface CanvasSectionProps {
	x: number;
	y: number;
	id?: string;
	children: ReactNode;
}

export default function CanvasSection({ x, y, id, children }: CanvasSectionProps) {
	return (
		<div
			id={id}
			className="absolute -translate-x-1/2 -translate-y-1/2 max-w-[90vw]"
			style={{ left: x, top: y }}
		>
			{children}
		</div>
	);
}
