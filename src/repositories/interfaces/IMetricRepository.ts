import type { MetricEntity } from "../types";

export interface IMetricRepository {
  findAll(): Promise<MetricEntity[]>;
  findById(id: string): Promise<MetricEntity | null>;
  create(data: Record<string, unknown>): Promise<MetricEntity>;
  update(id: string, data: Record<string, unknown>): Promise<MetricEntity>;
  delete(id: string): Promise<void>;
}
