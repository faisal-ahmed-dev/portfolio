import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/api-auth";
import { linkedInPostService } from "@/services";

export async function GET() {
  const posts = await linkedInPostService.getAll();
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
    const post = await linkedInPostService.create(body);
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    const e = err as { type: string; issues?: unknown };
    if (e.type === "validation") {
      return NextResponse.json({ error: "Validation failed", details: e.issues }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
