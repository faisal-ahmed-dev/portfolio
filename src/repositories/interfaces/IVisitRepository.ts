import type { VisitRecordEntity, CreateVisitInput, AnalyticsSummary } from "../types";

export interface IVisitRepository {
  isDuplicate(fingerprint: string, withinMinutes?: number): Promise<boolean>;
  create(data: CreateVisitInput): Promise<VisitRecordEntity>;
  getSummary(): Promise<AnalyticsSummary>;
  pruneOld(beforeDate: Date): Promise<void>;
  count(): Promise<number>;
}
