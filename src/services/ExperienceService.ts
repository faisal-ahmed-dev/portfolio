import { GenericCrudService } from "./GenericCrudService";
import { experienceRepository } from "@/repositories";
import { createExperienceSchema, updateExperienceSchema } from "@/lib/entity-schemas";
import type { ExperienceEntity } from "@/repositories/types";
import { EXPERIENCE } from "@/data/experience";
import { withDbFallback } from "@/lib/api-utils";

export class ExperienceService extends GenericCrudService<ExperienceEntity> {
  constructor() {
    super(experienceRepository, createExperienceSchema, updateExperienceSchema);
  }

  override async findAll(): Promise<ExperienceEntity[]> {
    return withDbFallback(
      this.repo.findAll(),
      EXPERIENCE.map((e, i) => ({ ...e, order: i, updatedAt: new Date().toISOString() }))
    );
  }
}

export const experienceService = new ExperienceService();
