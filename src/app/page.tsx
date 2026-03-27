"use client";
import dynamic from "next/dynamic";
import { useAtomValue } from "jotai";
import { bootCompletedAtom } from "@/store/atoms";
import { BootAnimation } from "@/components/sections/BootAnimation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { LiveMetricsBar } from "@/components/sections/LiveMetricsBar";
import { PrinciplesShowcase } from "@/components/sections/PrinciplesShowcase";
import { WritingsSection } from "@/components/sections/WritingsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { MouseParticles } from "@/components/background/MouseParticles";

// Heavy sections — dynamic import
const ProjectSimulator = dynamic(
  () => import("@/components/sections/ProjectSimulator").then((m) => ({ default: m.ProjectSimulator })),
  { ssr: false }
);
const ArchitectureHologram = dynamic(
  () => import("@/components/sections/ArchitectureHologram").then((m) => ({ default: m.ArchitectureHologram })),
  { ssr: false }
);
const NeonTerminal = dynamic(
  () => import("@/components/sections/NeonTerminal").then((m) => ({ default: m.NeonTerminal })),
  { ssr: false }
);

export default function Home() {
  const bootCompleted = useAtomValue(bootCompletedAtom);

  return (
    <>
      <BootAnimation />
      <MouseParticles />

      {bootCompleted && (
        <div className="relative min-h-screen">
          <AnnouncementBar />
          <Navbar />
          <main>
            <Hero />
            <LiveMetricsBar />
            <ProjectSimulator />
            <ArchitectureHologram />
            <NeonTerminal />
            <PrinciplesShowcase />
            <WritingsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
