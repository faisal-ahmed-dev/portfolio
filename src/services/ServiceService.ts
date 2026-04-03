import { GenericCrudService } from "./GenericCrudService";
import { serviceRepository } from "@/repositories";
import { createServiceSchema, updateServiceSchema } from "@/lib/entity-schemas";
import type { ServiceEntity } from "@/repositories/types";
import { SERVICES } from "@/data/services";
import { withDbFallback } from "@/lib/api-utils";

export class ServiceService extends GenericCrudService<ServiceEntity> {
  constructor() {
    super(serviceRepository, createServiceSchema, updateServiceSchema);
  }

  override async findAll(): Promise<ServiceEntity[]> {
    return withDbFallback(
      this.repo.findAll(),
      SERVICES.map((s, i) => ({ ...s, order: i, updatedAt: new Date().toISOString() }))
    );
  }
}

export const serviceService = new ServiceService();
