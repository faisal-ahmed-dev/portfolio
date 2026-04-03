import { NextResponse } from "next/server";

interface ServiceError {
  type: "validation" | "conflict" | "not_found";
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details?: any;
}

function isServiceError(e: unknown): e is ServiceError {
  return typeof e === "object" && e !== null && "type" in e;
}

export function handleServiceError(error: unknown): NextResponse {
  if (isServiceError(error)) {
    const status = error.type === "validation" ? 400 : error.type === "conflict" ? 409 : 404;
    return NextResponse.json({ error: error.message, details: error.details }, { status });
  }
  console.error("[API Error]", error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}

export async function withDbFallback<T>(dbCall: Promise<T[]>, fallback: T[]): Promise<T[]> {
  try {
    const result = await dbCall;
    return result.length > 0 ? result : fallback;
  } catch {
    return fallback;
  }
}
