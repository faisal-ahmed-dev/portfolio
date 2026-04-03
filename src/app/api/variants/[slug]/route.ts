import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/api-auth";
import { handleServiceError } from "@/lib/api-utils";
import { jobVariantService } from "@/services/JobVariantService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  try {
    const variant = await jobVariantService.findBySlug(slug);
    return NextResponse.json(variant);
  } catch (e) {
    return handleServiceError(e);
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  try {
    const body = await request.json();
    const variant = await jobVariantService.update(slug, body);
    return NextResponse.json(variant);
  } catch (e) {
    return handleServiceError(e);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  try {
    await jobVariantService.delete(slug);
    return new NextResponse(null, { status: 204 });
  } catch (e) {
    return handleServiceError(e);
  }
}
