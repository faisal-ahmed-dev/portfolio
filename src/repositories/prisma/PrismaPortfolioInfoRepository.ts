import { prisma } from "@/lib/prisma";
import type { IPortfolioInfoRepository } from "../interfaces/IPortfolioInfoRepository";
import type { PortfolioInfoEntity } from "../types";
import { serialize } from "./_serialize";

export class PrismaPortfolioInfoRepository implements IPortfolioInfoRepository {
  async get(): Promise<PortfolioInfoEntity | null> {
    const row = await prisma.portfolioInfo.findFirst({ orderBy: { updatedAt: "desc" } });
    return row ? (serialize(row) as unknown as PortfolioInfoEntity) : null;
  }

  async upsert(data: Record<string, unknown>): Promise<PortfolioInfoEntity> {
    const existing = await prisma.portfolioInfo.findFirst({ orderBy: { updatedAt: "desc" } });
    const row = existing
      ? await prisma.portfolioInfo.update({
          where: { id: existing.id },
          data: data as Parameters<typeof prisma.portfolioInfo.update>[0]["data"],
        })
      : await prisma.portfolioInfo.create({
          data: data as Parameters<typeof prisma.portfolioInfo.create>[0]["data"],
        });
    return serialize(row) as unknown as PortfolioInfoEntity;
  }
}
