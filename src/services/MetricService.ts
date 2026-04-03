import { GenericCrudService } from "./GenericCrudService";
import { metricRepository } from "@/repositories";
import { createMetricSchema, updateMetricSchema } from "@/lib/entity-schemas";
import type { MetricEntity } from "@/repositories/types";
import { METRICS } from "@/data/metrics";
import { withDbFallback } from "@/lib/api-utils";

export class MetricService extends GenericCrudService<MetricEntity> {
  constructor() {
    super(metricRepository, createMetricSchema, updateMetricSchema);
  }

  override async findAll(): Promise<MetricEntity[]> {
    return withDbFallback(
      this.repo.findAll(),
      METRICS.map((m, i) => ({ ...m, prefix: m.prefix ?? null, order: i, updatedAt: new Date().toISOString() }))
    );
  }
}

export const metricService = new MetricService();
