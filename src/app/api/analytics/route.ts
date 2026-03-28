import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/api-auth";
import { getAnalyticsSummary } from "@/data/analytics";

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = getAnalyticsSummary();
  return NextResponse.json(summary);
}
