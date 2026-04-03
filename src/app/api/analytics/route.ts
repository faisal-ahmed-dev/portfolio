import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "@/lib/api-auth";
import { visitService } from "@/services/VisitService";

export async function GET(request: NextRequest) {
  if (!authenticate(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await visitService.getSummary();
  return NextResponse.json(summary);
}
