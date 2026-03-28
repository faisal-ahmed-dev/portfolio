import fs from "node:fs";
import path from "node:path";
import type { DataOverrides } from "@/types/portfolio.types";
import { EDITABLE_SECTIONS } from "@/lib/portfolio-schema";

const DATA_DIR = path.join(process.cwd(), "content", "data");

export function loadDataOverrides(): DataOverrides {
  if (!fs.existsSync(DATA_DIR)) return {};

  const overrides: Record<string, unknown> = {};
  for (const key of EDITABLE_SECTIONS) {
    const filePath = path.join(DATA_DIR, `${key}.json`);
    if (fs.existsSync(filePath)) {
      try {
        overrides[key] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      } catch {
        // Skip malformed files
      }
    }
  }
  return overrides as DataOverrides;
}

export function getOverriddenSections(): string[] {
  if (!fs.existsSync(DATA_DIR)) return [];
  return EDITABLE_SECTIONS.filter((key) =>
    fs.existsSync(path.join(DATA_DIR, `${key}.json`))
  );
}
