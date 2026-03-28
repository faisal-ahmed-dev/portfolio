"use client";
import dynamic from "next/dynamic";
import { useAtomValue } from "jotai";
import { bootCompletedAtom } from "@/store/atoms";
import { VariantProvider, useVariant } from "@/components/providers/VariantProvider";
import { DataOverrideProvider } from "@/components/providers/DataOverrideProvider";
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
import { CoverLetterSection } from "@/components/sections/CoverLetterSection";
import { Footer } from "@/components/layout/Footer";
import type { JobVariant, DataOverrides } from "@/types/portfolio.types";

const ProjectSimulator = dynamic(
  () =>
    import("@/components/sections/ProjectSimulator").then((m) => ({
      default: m.ProjectSimulator,
    })),
  { ssr: false }
);
const ArchitectureHologram = dynamic(
  () =>
    import("@/components/sections/ArchitectureHologram").then((m) => ({
      default: m.ArchitectureHologram,
    })),
  { ssr: false }
);
const NeonTerminal = dynamic(
  () =>
    import("@/components/sections/NeonTerminal").then((m) => ({
      default: m.NeonTerminal,
    })),
  { ssr: false }
);

interface SectionDef {
  id: string;
  component: React.ComponentType;
  variantOnly?: boolean;
}

const ALL_SECTIONS: SectionDef[] = [
  { id: "hero", component: Hero },
  { id: "cover-letter", component: CoverLetterSection, variantOnly: true },
  { id: "tech", component: TechStack },
  { id: "metrics", component: LiveMetricsBar },
  { id: "services", component: ServicesSection },
  { id: "experience", component: ExperienceTimeline },
  { id: "projects", component: ProjectSimulator },
  { id: "architecture", component: ArchitectureHologram, variantOnly: true },
  { id: "terminal", component: NeonTerminal, variantOnly: true },
  { id: "principles", component: PrinciplesShowcase, variantOnly: true },
  { id: "opensource", component: OpenSourceSection },
  { id: "writings", component: WritingsSection },
  { id: "testimonials", component: TestimonialsSection },
  { id: "certifications", component: CertificationsSection },
  { id: "contact", component: ContactSection },
];

function PortfolioContent() {
  const variant = useVariant();
  const bootCompleted = useAtomValue(bootCompletedAtom);

  const hidden = new Set(variant?.hideSections ?? []);
  const isVariant = variant !== null;

  let sections = ALL_SECTIONS.filter((s) => {
    if (s.variantOnly && !isVariant) return false;
    if (hidden.has(s.id)) return false;
    return true;
  });

  if (variant?.sectionOrder?.length) {
    const order = variant.sectionOrder;
    sections = [
      ...order
        .map((id) => sections.find((s) => s.id === id))
        .filter(Boolean) as SectionDef[],
      ...sections.filter((s) => !order.includes(s.id)),
    ];
  }

  return (
    <>
      <BootAnimation />
      {bootCompleted && (
        <div className="relative min-h-screen">
          <AnnouncementBar />
          <Navbar />
          <main>
            {sections.map((section) => {
              const Component = section.component;
              return <Component key={section.id} />;
            })}
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}

export function PortfolioPage({
  variant,
  dataOverrides = {},
}: {
  variant: JobVariant | null;
  dataOverrides?: DataOverrides;
}) {
  return (
    <DataOverrideProvider overrides={dataOverrides}>
      <VariantProvider variant={variant}>
        <PortfolioContent />
      </VariantProvider>
    </DataOverrideProvider>
  );
}
