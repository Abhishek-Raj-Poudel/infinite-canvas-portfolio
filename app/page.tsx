"use client";
import useCanvasPan from "@/hooks/useCanvasPan";
import CanvasSection from "@/components/CanvasSection";

export default function Home() {
  const { offset, handlers } = useCanvasPan();

  return (
    <main
      className="w-screen h-screen overflow-hidden relative cursor-grab"
      {...handlers}
    >
      <div
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          position: "absolute",
        }}
      >
        <CanvasSection x={0} y={0}>
          <h1 className="text-4xl font-bold">Infinite Canvas</h1>
        </CanvasSection>

        <CanvasSection x={-400} y={-600}>
          About section
        </CanvasSection>
      </div>
    </main>
  );
}
