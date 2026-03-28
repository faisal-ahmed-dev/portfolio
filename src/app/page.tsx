"use client";
import dynamic from "next/dynamic";
import { useAtomValue } from "jotai";
import { bootCompletedAtom } from "@/store/atoms";
import { BootAnimation } from "@/components/sections/BootAnimation";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { TechStack } from "@/components/sections/TechStack";
import { LiveMetricsBar } from "@/components/sections/LiveMetricsBar";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { PrinciplesShowcase } from "@/components/sections/PrinciplesShowcase";
import { OpenSourceSection } from "@/components/sections/OpenSourceSection";
import { WritingsSection } from "@/components/sections/WritingsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

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

      {bootCompleted && (
        <div className="relative min-h-screen">
          <AnnouncementBar />
          <Navbar />
          <main>
            <Hero />
            <TechStack />
            <LiveMetricsBar />
            <ServicesSection />
            <ExperienceTimeline />
            <ProjectSimulator />
            <ArchitectureHologram />
            <NeonTerminal />
            <PrinciplesShowcase />
            <OpenSourceSection />
            <WritingsSection />
            <TestimonialsSection />
            <CertificationsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
