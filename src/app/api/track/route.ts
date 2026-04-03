import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { visitService } from "@/services/VisitService";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pathname = typeof body.pathname === "string" ? body.pathname : "/";
    const referrer = typeof body.referrer === "string" ? body.referrer : "";

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      "unknown";
    const userAgent = request.headers.get("user-agent") ?? "unknown";
    const country =
      request.headers.get("x-vercel-ip-country") ??
      request.headers.get("cf-ipcountry") ??
      "";

    const fingerprint = crypto
      .createHash("sha256")
      .update(`${ip}:${userAgent}`)
      .digest("hex")
      .slice(0, 16);

    if (await visitService.isDuplicate(fingerprint)) {
      return NextResponse.json({ tracked: false });
    }

    await visitService.create({
      fingerprint,
      timestamp: new Date().toISOString(),
      pathname,
      referrer,
      userAgent,
      country,
    });

    return NextResponse.json({ tracked: true });
  } catch {
    return NextResponse.json({ tracked: false }, { status: 400 });
  }
}
