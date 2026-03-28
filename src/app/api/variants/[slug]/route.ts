import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { authenticate } from "@/lib/api-auth";

const VARIANTS_DIR = path.join(process.cwd(), "content", "variants");

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

  const filePath = path.join(VARIANTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Variant not found" }, { status: 404 });
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  return NextResponse.json(data);
}
