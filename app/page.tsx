"use client";
import useCanvasPan from "@/hooks/useCanvasPan";
import CanvasSection from "@/components/CanvasSection";
import Button from "./components/ui/Button";

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
          <div className="relative flex h-[24rem] w-[36rem] items-center justify-center">
            <Button className="absolute left-[28%] top-[14%]">About me</Button>
            <Button className="absolute left-[70%] top-[14%]">My Notes</Button>
            <Button className="absolute left-[4%] top-[50%]">Projects</Button>
            <Button className="absolute left-[47%] top-[76%]">Hire Me</Button>

            <div className="text-center">
              <h1 className="text-5xl">Hey! I make cook stuff</h1>
              <p className="text-ex-sm mt-2">
                This is a simple showcase of all the things i can do and
                <br />
                have made
              </p>
            </div>
          </div>
        </CanvasSection>

        <CanvasSection x={-400} y={-600}>
          About section
        </CanvasSection>
      </div>
    </main>
  );
}
