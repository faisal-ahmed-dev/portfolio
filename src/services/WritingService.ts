import { GenericCrudService } from "./GenericCrudService";
import { writingRepository } from "@/repositories";
import { createWritingSchema, updateWritingSchema } from "@/lib/entity-schemas";
import type { WritingEntity } from "@/repositories/types";
import { WRITINGS } from "@/data/writings";
import { withDbFallback } from "@/lib/api-utils";

export class WritingService extends GenericCrudService<WritingEntity> {
  constructor() {
    super(writingRepository, createWritingSchema, updateWritingSchema);
  }

  override async findAll(): Promise<WritingEntity[]> {
    return withDbFallback(
      this.repo.findAll(),
      WRITINGS.map((w, i) => ({ ...w, order: i, updatedAt: new Date().toISOString() }))
    );
  }
}

export const writingService = new WritingService();
