import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/api-auth";
import { blogPostService } from "@/services";

export async function GET(request: NextRequest) {
  const showAll = request.nextUrl.searchParams.get("all") === "true";

  if (showAll && !authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = showAll
    ? await blogPostService.getAllForAdmin()
    : await blogPostService.getPublishedList();

  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const post = await blogPostService.create(body);
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    const e = err as { type: string; issues?: unknown; message?: string };
    if (e.type === "validation") {
      return NextResponse.json({ error: "Validation failed", details: e.issues }, { status: 400 });
    }
    if (e.type === "conflict") {
      return NextResponse.json({ error: e.message }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
