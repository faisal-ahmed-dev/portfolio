import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/api-auth";
import { blogPostService } from "@/services";

type Params = { params: Promise<{ slug: string }> };

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  const isAuth = authenticate(request);

  const post = await blogPostService.getBySlug(slug, isAuth);
  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ post });
}

export async function PUT(request: NextRequest, { params }: Params) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const post = await blogPostService.update(slug, body);
    return NextResponse.json({ post });
  } catch (err) {
    const e = err as { type: string; issues?: unknown };
    if (e.type === "validation") {
      return NextResponse.json({ error: "Validation failed", details: e.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  await blogPostService.delete(slug);
  return NextResponse.json({ message: `Post "${slug}" deleted` });
}
