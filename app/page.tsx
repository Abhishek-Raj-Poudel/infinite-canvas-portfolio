"use client";
import CanvasSection from "@/components/CanvasSection";
import useCanvasPan from "@/hooks/useCanvasPan";
import Button from "./components/ui/Button";
import AboutSection from "./components/AboutSection";

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
          <section className=" flex hx-[24rem] w-xl items-center justify-center">
            <Button x={285} y={-200} >About me</Button>
            <Button x={530} y={-200}>My Notes</Button>
            <Button x={-125} y={35}>Projects</Button>
            <Button x={285} y={290}>Hire Me</Button>

            <div className="text-center">
              <h1 className="text-5xl">Hey! I make cook stuff</h1>
              <p className="text-ex-sm mt-2">
                This is a simple showcase of all the things i can do and
                <br />
                have made
              </p>
            </div>
          </section>
        </CanvasSection>

        <CanvasSection x={-400} y={-600}>
          <AboutSection />
        </CanvasSection>
      </div>
    </main>
  );
}
