import { portfolioInfoRepository } from "@/repositories";
import { upsertPortfolioInfoSchema } from "@/lib/entity-schemas";
import type { PortfolioInfoEntity } from "@/repositories/types";
import { PORTFOLIO } from "@/data/portfolio";

export class PortfolioInfoService {
  async get(): Promise<PortfolioInfoEntity> {
    const row = await portfolioInfoRepository.get();
    if (row) return row;
    // fallback to TS default
    return { ...PORTFOLIO, id: "default", updatedAt: new Date().toISOString() };
  }

  async upsert(raw: unknown): Promise<PortfolioInfoEntity> {
    const parsed = upsertPortfolioInfoSchema.safeParse(raw);
    if (!parsed.success) {
      throw { type: "validation", message: "Validation failed", details: parsed.error.flatten() };
    }
    return portfolioInfoRepository.upsert(parsed.data as Record<string, unknown>);
  }
}

export const portfolioInfoService = new PortfolioInfoService();
