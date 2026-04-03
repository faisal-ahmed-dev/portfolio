import type { JobVariantEntity } from "../types";

export interface IJobVariantRepository {
  findAll(): Promise<JobVariantEntity[]>;
  findBySlug(slug: string): Promise<JobVariantEntity | null>;
  slugExists(slug: string): Promise<boolean>;
  create(data: Record<string, unknown>): Promise<JobVariantEntity>;
  update(slug: string, data: Record<string, unknown>): Promise<JobVariantEntity>;
  delete(slug: string): Promise<void>;
}
