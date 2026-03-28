import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { parseVariant } from "@/lib/variant-schema";
import { authenticate } from "@/lib/api-auth";

const VARIANTS_DIR = path.join(process.cwd(), "content", "variants");

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!fs.existsSync(VARIANTS_DIR)) {
    return NextResponse.json({ variants: [] });
  }

  const files = fs.readdirSync(VARIANTS_DIR).filter((f) => f.endsWith(".json"));
  const variants = files.map((f) => {
    const raw = JSON.parse(fs.readFileSync(path.join(VARIANTS_DIR, f), "utf-8"));
    return {
      slug: raw.slug,
      company: raw.company,
      role: raw.role,
      url: `/for/${raw.slug}`,
    };
  });

  return NextResponse.json({ variants });
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const result = parseVariant(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Validation failed", details: result.errors },
      { status: 400 }
    );
  }

  const { slug } = result.data;

  if (!fs.existsSync(VARIANTS_DIR)) {
    fs.mkdirSync(VARIANTS_DIR, { recursive: true });
  }

  const filePath = path.join(VARIANTS_DIR, `${slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(result.data, null, 2), "utf-8");

  return NextResponse.json(
    { message: `Variant "${slug}" saved`, url: `/for/${slug}` },
    { status: 201 }
  );
}

export async function DELETE(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid or missing slug" }, { status: 400 });
  }

  const filePath = path.join(VARIANTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  }

  fs.unlinkSync(filePath);

  return NextResponse.json({ message: `Variant "${slug}" deleted` });
}
