import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/api-auth";
import { linkedInPostService } from "@/services";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    const post = await linkedInPostService.update(id, body);
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

  const { id } = await params;
  await linkedInPostService.delete(id);
  return NextResponse.json({ message: `Post "${id}" deleted` });
}
