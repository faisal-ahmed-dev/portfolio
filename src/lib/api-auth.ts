import { NextRequest } from "next/server";

export function authenticate(request: NextRequest): boolean {
  const key = request.headers.get("x-api-key");
  const secret = process.env.VARIANT_SECRET_KEY;
  if (!secret || !key) return false;
  return key === secret;
}
