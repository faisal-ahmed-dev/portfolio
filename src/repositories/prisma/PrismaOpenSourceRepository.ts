import { prisma } from "@/lib/prisma";
import type { IOpenSourceRepository } from "../interfaces/IOpenSourceRepository";
import type { OpenSourceStatEntity, PinnedRepoEntity } from "../types";
import { serialize } from "./_serialize";

export class PrismaOpenSourceRepository implements IOpenSourceRepository {
  async getStats(): Promise<OpenSourceStatEntity[]> {
    const rows = await prisma.openSourceStat.findMany({ orderBy: { order: "asc" } });
    return rows.map(serialize) as unknown as OpenSourceStatEntity[];
  }

  async getRepos(): Promise<PinnedRepoEntity[]> {
    const rows = await prisma.pinnedRepo.findMany({ orderBy: { order: "asc" } });
    return rows.map(serialize) as unknown as PinnedRepoEntity[];
  }

  async upsertStat(id: string, data: Record<string, unknown>): Promise<OpenSourceStatEntity> {
    const row = await prisma.openSourceStat.upsert({
      where: { id },
      create: { id, ...data } as Parameters<typeof prisma.openSourceStat.create>[0]["data"],
      update: data as Parameters<typeof prisma.openSourceStat.update>[0]["data"],
    });
    return serialize(row) as unknown as OpenSourceStatEntity;
  }

  async upsertRepo(id: string, data: Record<string, unknown>): Promise<PinnedRepoEntity> {
    const row = await prisma.pinnedRepo.upsert({
      where: { id },
      create: { id, ...data } as Parameters<typeof prisma.pinnedRepo.create>[0]["data"],
      update: data as Parameters<typeof prisma.pinnedRepo.update>[0]["data"],
    });
    return serialize(row) as unknown as PinnedRepoEntity;
  }

  async deleteStat(id: string): Promise<void> {
    await prisma.openSourceStat.delete({ where: { id } });
  }

  async deleteRepo(id: string): Promise<void> {
    await prisma.pinnedRepo.delete({ where: { id } });
  }
}
