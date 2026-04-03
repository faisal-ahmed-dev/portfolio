import type { OpenSourceStatEntity, PinnedRepoEntity } from "../types";

export interface IOpenSourceRepository {
  getStats(): Promise<OpenSourceStatEntity[]>;
  getRepos(): Promise<PinnedRepoEntity[]>;
  upsertStat(id: string, data: Record<string, unknown>): Promise<OpenSourceStatEntity>;
  upsertRepo(id: string, data: Record<string, unknown>): Promise<PinnedRepoEntity>;
  deleteStat(id: string): Promise<void>;
  deleteRepo(id: string): Promise<void>;
}
