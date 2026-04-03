import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/api-auth";
import { handleServiceError } from "@/lib/api-utils";
import { jobVariantService } from "@/services/JobVariantService";

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const variants = await jobVariantService.findAll();
  return NextResponse.json({
    variants: variants.map((v) => ({
      slug: v.slug,
      company: v.company,
      role: v.role,
      url: `/for/${v.slug}`,
    })),
  });
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const variant = await jobVariantService.create(body);
    return NextResponse.json({ message: `Variant "${variant.slug}" saved`, url: `/for/${variant.slug}` }, { status: 201 });
  } catch (e) {
    return handleServiceError(e);
  }
}

export async function DELETE(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid or missing slug" }, { status: 400 });
  }

  try {
    await jobVariantService.delete(slug);
    return NextResponse.json({ message: `Variant "${slug}" deleted` });
  } catch (e) {
    return handleServiceError(e);
  }
}
