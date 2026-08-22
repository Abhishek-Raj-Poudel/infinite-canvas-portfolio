import { ReactNode } from "react";

interface CanvasSectionProps {
  x: number;
  y: number;
  children: ReactNode;
}

export default function CanvasSection({ x, y, children }: CanvasSectionProps) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 w-[36rem] max-w-[90vw]"
      style={{ left: x, top: y }}
    >
      {children}
    </div>
  );
}
