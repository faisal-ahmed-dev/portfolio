import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/api-auth";
import { handleServiceError } from "@/lib/api-utils";
import { EDITABLE_SECTIONS } from "@/lib/portfolio-schema";
import { portfolioInfoService } from "@/services/PortfolioInfoService";
import { experienceService } from "@/services/ExperienceService";
import { projectService } from "@/services/ProjectService";
import { metricService } from "@/services/MetricService";
import { serviceService } from "@/services/ServiceService";
import { testimonialService } from "@/services/TestimonialService";
import { writingService } from "@/services/WritingService";
import { certificationService } from "@/services/CertificationService";
import { openSourceService } from "@/services/OpenSourceService";

async function getSectionData(key: string): Promise<unknown> {
  switch (key) {
    case "portfolio": return portfolioInfoService.get();
    case "experience": return experienceService.findAll();
    case "projects": return projectService.findAll();
    case "metrics": return metricService.findAll();
    case "services": return serviceService.findAll();
    case "testimonials": return testimonialService.findAll();
    case "writings": return writingService.findAll();
    case "certifications": return certificationService.findAll();
    case "openSource": return Promise.all([openSourceService.getStats(), openSourceService.getRepos()]).then(([githubStats, pinnedRepos]) => ({ githubStats, pinnedRepos }));
    default: return null;
  }
}

async function resetSection(key: string): Promise<void> {
  switch (key) {
    case "experience": await experienceService.deleteAll(); break;
    case "projects": await projectService.deleteAll(); break;
    case "metrics": await metricService.deleteAll(); break;
    case "services": await serviceService.deleteAll(); break;
    case "testimonials": await testimonialService.deleteAll(); break;
    case "writings": await writingService.deleteAll(); break;
    case "certifications": await certificationService.deleteAll(); break;
  }
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sections: Record<string, { source: string; data: unknown }> = {};
  await Promise.all(
    EDITABLE_SECTIONS.map(async (key) => {
      const data = await getSectionData(key);
      sections[key] = { source: "db", data };
    })
  );

  return NextResponse.json({
    sections,
    editableSections: EDITABLE_SECTIONS,
    excludedSections: ["techStack (contains React component references)"],
  });
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const keys = Object.keys(body).filter((k) => EDITABLE_SECTIONS.includes(k));
  if (keys.length === 0) {
    return NextResponse.json({ error: "No valid sections provided", editableSections: EDITABLE_SECTIONS }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  const updated: string[] = [];

  for (const key of keys) {
    try {
      switch (key) {
        case "portfolio":
          await portfolioInfoService.upsert(body[key]);
          break;
        case "experience":
          await experienceService.deleteAll();
          for (const item of body[key] as unknown[]) await experienceService.create(item);
          break;
        case "projects":
          await projectService.deleteAll();
          for (const item of body[key] as unknown[]) await projectService.create(item);
          break;
        case "metrics":
          await metricService.deleteAll();
          for (const item of body[key] as unknown[]) await metricService.create(item);
          break;
        case "services":
          await serviceService.deleteAll();
          for (const item of body[key] as unknown[]) await serviceService.create(item);
          break;
        case "testimonials":
          await testimonialService.deleteAll();
          for (const item of body[key] as unknown[]) await testimonialService.create(item);
          break;
        case "writings":
          await writingService.deleteAll();
          for (const item of body[key] as unknown[]) await writingService.create(item);
          break;
        case "certifications":
          await certificationService.deleteAll();
          for (const item of body[key] as unknown[]) await certificationService.create(item);
          break;
      }
      updated.push(key);
    } catch (e) {
      errors[key] = e instanceof Object && "message" in e ? String((e as { message: string }).message) : "Unknown error";
    }
  }

  if (Object.keys(errors).length > 0 && updated.length === 0) {
    return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
  }

  return NextResponse.json({
    message: `Updated ${updated.length} section(s)`,
    updated,
    ...(Object.keys(errors).length > 0 ? { errors } : {}),
  });
}

export async function DELETE(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const section = request.nextUrl.searchParams.get("section");
  if (!section || !EDITABLE_SECTIONS.includes(section)) {
    return NextResponse.json({ error: "Invalid or missing section", editableSections: EDITABLE_SECTIONS }, { status: 400 });
  }

  try {
    await resetSection(section);
    return NextResponse.json({ message: `Section "${section}" reset to defaults (DB records deleted, fallback to TS defaults active)` });
  } catch (e) {
    return handleServiceError(e);
  }
}
