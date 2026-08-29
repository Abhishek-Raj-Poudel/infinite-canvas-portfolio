"use client";
import CanvasSection from "@/components/CanvasSection";
import useCanvasPan from "@/hooks/useCanvasPan";
import Button from "./components/ui/Button";
import AboutSection from "./components/AboutSection";
import { SectionRegistryProvider } from "@/context/SectionRegistryContext";

export default function Home() {
  return (
    <SectionRegistryProvider>
      <Canvas />
    </SectionRegistryProvider>
  );
}

function Canvas() {
  const { offset, handlers, centerOnSection } = useCanvasPan();

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
            <Button x={285} y={-200} onClick={() => centerOnSection("about-section")}>About me</Button>
            <Button x={530} y={-200} onClick={() => centerOnSection("notes-section")}>My Notes</Button>
            <Button x={-125} y={35} onClick={() => centerOnSection("projects-section")}>Projects</Button>
            <Button x={285} y={290} onClick={() => centerOnSection("hireme-section")}>Hire Me</Button>

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

        <CanvasSection x={-400} y={-600} id="about-section">
          <AboutSection />
        </CanvasSection>

        <CanvasSection x={400} y={-550} id="notes-section">
          <section className="text-center">
            <h2 className="text-3xl">My Notes</h2>
          </section>
        </CanvasSection>

        <CanvasSection x={-550} y={150} id="projects-section">
          <section className="text-center">
            <h2 className="text-3xl">Projects</h2>
          </section>
        </CanvasSection>

        <CanvasSection x={450} y={300} id="hireme-section">
          <section className="text-center">
            <h2 className="text-3xl">Hire Me</h2>
          </section>
        </CanvasSection>
      </div>
    </main>
  );
}
