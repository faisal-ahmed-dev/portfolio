import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { authenticate } from "@/lib/api-auth";
import { EDITABLE_SECTIONS, parseSection } from "@/lib/portfolio-schema";
import { PORTFOLIO } from "@/data/portfolio";
import { EXPERIENCE } from "@/data/experience";
import { PROJECTS } from "@/data/projects";
import { METRICS } from "@/data/metrics";
import { SERVICES } from "@/data/services";
import { TESTIMONIALS } from "@/data/testimonials";
import { WRITINGS } from "@/data/writings";
import { CERTIFICATIONS } from "@/data/certifications";
import { GITHUB_STATS, PINNED_REPOS } from "@/data/openSource";

const DATA_DIR = path.join(process.cwd(), "content", "data");

const DEFAULTS: Record<string, unknown> = {
  portfolio: PORTFOLIO,
  experience: EXPERIENCE,
  projects: PROJECTS,
  metrics: METRICS,
  services: SERVICES,
  testimonials: TESTIMONIALS,
  writings: WRITINGS,
  certifications: CERTIFICATIONS,
  openSource: { githubStats: GITHUB_STATS, pinnedRepos: PINNED_REPOS },
};

function readOverride(key: string): unknown | null {
  const filePath = path.join(DATA_DIR, `${key}.json`);
  if (!fs.existsSync(filePath)) return null;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sections: Record<string, { source: string; data: unknown }> = {};
  for (const key of EDITABLE_SECTIONS) {
    const override = readOverride(key);
    sections[key] = {
      source: override ? "override" : "default",
      data: override ?? DEFAULTS[key],
    };
  }

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
    return NextResponse.json(
      { error: "No valid sections provided", editableSections: EDITABLE_SECTIONS },
      { status: 400 }
    );
  }

  const errors: Record<string, string[]> = {};
  const updated: string[] = [];

  for (const key of keys) {
    const result = parseSection(key, body[key]);
    if (!result.success) {
      errors[key] = result.errors;
      continue;
    }

    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(
      path.join(DATA_DIR, `${key}.json`),
      JSON.stringify(result.data, null, 2),
      "utf-8"
    );
    updated.push(key);
  }

  if (Object.keys(errors).length > 0 && updated.length === 0) {
    return NextResponse.json({ error: "Validation failed", details: errors }, { status: 400 });
  }

  return NextResponse.json(
    {
      message: `Updated ${updated.length} section(s)`,
      updated,
      ...(Object.keys(errors).length > 0 ? { errors } : {}),
    },
    { status: 200 }
  );
}

export async function DELETE(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const section = request.nextUrl.searchParams.get("section");
  if (!section || !EDITABLE_SECTIONS.includes(section)) {
    return NextResponse.json(
      { error: "Invalid or missing section", editableSections: EDITABLE_SECTIONS },
      { status: 400 }
    );
  }

  const filePath = path.join(DATA_DIR, `${section}.json`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "No override exists for this section" }, { status: 404 });
  }

  fs.unlinkSync(filePath);
  return NextResponse.json({ message: `Override for "${section}" removed, reverted to default` });
}
