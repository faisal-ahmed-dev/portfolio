import fs from "node:fs";
import path from "node:path";
import type { JobVariant } from "@/types/portfolio.types";
import { parseVariant } from "@/lib/variant-schema";

const VARIANTS_DIR = path.join(process.cwd(), "content", "variants");

export function getAllVariantSlugs(): string[] {
  if (!fs.existsSync(VARIANTS_DIR)) return [];
  return fs
    .readdirSync(VARIANTS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getVariant(slug: string): JobVariant | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;

  const filePath = path.join(VARIANTS_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const result = parseVariant(raw);
    if (!result.success) return null;
    return result.data as JobVariant;
  } catch {
    return null;
  }
}
