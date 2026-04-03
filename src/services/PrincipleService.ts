import { GenericCrudService } from "./GenericCrudService";
import { principleRepository } from "@/repositories";
import { createPrincipleSchema, updatePrincipleSchema } from "@/lib/entity-schemas";
import type { PrincipleEntity } from "@/repositories/types";
import { PRINCIPLES } from "@/data/principles";
import { withDbFallback } from "@/lib/api-utils";

export class PrincipleService extends GenericCrudService<PrincipleEntity> {
  constructor() {
    super(principleRepository, createPrincipleSchema, updatePrincipleSchema);
  }

  override async findAll(): Promise<PrincipleEntity[]> {
    return withDbFallback(
      this.repo.findAll(),
      PRINCIPLES.map((p, i) => ({ ...p, order: i, updatedAt: new Date().toISOString() }))
    );
  }
}

export const principleService = new PrincipleService();
