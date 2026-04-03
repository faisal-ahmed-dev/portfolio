import { visitRepository } from "@/repositories";
import { createVisitSchema } from "@/lib/entity-schemas";
import type { VisitRecordEntity, AnalyticsSummary } from "@/repositories/types";

export class VisitService {
  async isDuplicate(fingerprint: string, withinMinutes = 30): Promise<boolean> {
    return visitRepository.isDuplicate(fingerprint, withinMinutes);
  }

  async create(raw: unknown): Promise<VisitRecordEntity> {
    const parsed = createVisitSchema.safeParse(raw);
    if (!parsed.success) {
      throw { type: "validation", message: "Validation failed", details: parsed.error.flatten() };
    }
    return visitRepository.create(parsed.data);
  }

  async getSummary(): Promise<AnalyticsSummary> {
    return visitRepository.getSummary();
  }

  async pruneOld(beforeDate: Date): Promise<void> {
    return visitRepository.pruneOld(beforeDate);
  }
}

export const visitService = new VisitService();
