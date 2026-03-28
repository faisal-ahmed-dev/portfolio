import { exampleCorp } from "./example-corp";
import type { JobVariant } from "@/types/portfolio.types";

const VARIANTS: Record<string, JobVariant> = {
  "example-corp": exampleCorp,
};

export const getAllVariantSlugs = () => Object.keys(VARIANTS);
export const getVariant = (slug: string): JobVariant | null =>
  VARIANTS[slug] ?? null;
