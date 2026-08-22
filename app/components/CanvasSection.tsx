import { ReactNode } from "react";

interface CanvasSectionProps {
  x: number;
  y: number;
  children: ReactNode;
}

export default function CanvasSection({ x, y, children }: CanvasSectionProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ left: x, top: y }}
    >
      {children}
    </div>
  );
}
