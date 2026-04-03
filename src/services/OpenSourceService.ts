import { openSourceRepository } from "@/repositories";
import { createOpenSourceStatSchema, createPinnedRepoSchema, updateOpenSourceStatSchema, updatePinnedRepoSchema } from "@/lib/entity-schemas";
import type { OpenSourceStatEntity, PinnedRepoEntity } from "@/repositories/types";
import { GITHUB_STATS, PINNED_REPOS } from "@/data/openSource";
import { withDbFallback } from "@/lib/api-utils";

export class OpenSourceService {
  async getStats(): Promise<OpenSourceStatEntity[]> {
    return withDbFallback(
      openSourceRepository.getStats(),
      GITHUB_STATS.map((s, i) => ({ ...s, id: `stat-${i}`, order: i }))
    );
  }

  async getRepos(): Promise<PinnedRepoEntity[]> {
    return withDbFallback(
      openSourceRepository.getRepos(),
      PINNED_REPOS.map((r, i) => ({ ...r, order: i }))
    );
  }

  async upsertStat(id: string, raw: unknown): Promise<OpenSourceStatEntity> {
    const parsed = updateOpenSourceStatSchema.safeParse(raw);
    if (!parsed.success) throw { type: "validation", message: "Validation failed", details: parsed.error.flatten() };
    return openSourceRepository.upsertStat(id, parsed.data as Record<string, unknown>);
  }

  async upsertRepo(id: string, raw: unknown): Promise<PinnedRepoEntity> {
    const parsed = updatePinnedRepoSchema.safeParse(raw);
    if (!parsed.success) throw { type: "validation", message: "Validation failed", details: parsed.error.flatten() };
    return openSourceRepository.upsertRepo(id, parsed.data as Record<string, unknown>);
  }

  async createStat(raw: unknown): Promise<OpenSourceStatEntity> {
    const parsed = createOpenSourceStatSchema.safeParse(raw);
    if (!parsed.success) throw { type: "validation", message: "Validation failed", details: parsed.error.flatten() };
    return openSourceRepository.upsertStat(parsed.data.id, parsed.data as Record<string, unknown>);
  }

  async createRepo(raw: unknown): Promise<PinnedRepoEntity> {
    const parsed = createPinnedRepoSchema.safeParse(raw);
    if (!parsed.success) throw { type: "validation", message: "Validation failed", details: parsed.error.flatten() };
    return openSourceRepository.upsertRepo(parsed.data.id, parsed.data as Record<string, unknown>);
  }

  async deleteStat(id: string): Promise<void> { return openSourceRepository.deleteStat(id); }
  async deleteRepo(id: string): Promise<void> { return openSourceRepository.deleteRepo(id); }
}

export const openSourceService = new OpenSourceService();
