import { jobVariantRepository } from "@/repositories";
import { createJobVariantSchema, updateJobVariantSchema } from "@/lib/entity-schemas";
import type { JobVariantEntity } from "@/repositories/types";

export class JobVariantService {
  async findAll(): Promise<JobVariantEntity[]> {
    return jobVariantRepository.findAll();
  }

  async findBySlug(slug: string): Promise<JobVariantEntity> {
    const variant = await jobVariantRepository.findBySlug(slug);
    if (!variant) throw { type: "not_found", message: `Variant '${slug}' not found` };
    return variant;
  }

  async create(raw: unknown): Promise<JobVariantEntity> {
    const parsed = createJobVariantSchema.safeParse(raw);
    if (!parsed.success) {
      throw { type: "validation", message: "Validation failed", details: parsed.error.flatten() };
    }
    if (await jobVariantRepository.slugExists(parsed.data.slug)) {
      throw { type: "conflict", message: `Variant with slug '${parsed.data.slug}' already exists` };
    }
    return jobVariantRepository.create(parsed.data as Record<string, unknown>);
  }

  async update(slug: string, raw: unknown): Promise<JobVariantEntity> {
    await this.findBySlug(slug); // throws not_found if missing
    const parsed = updateJobVariantSchema.safeParse(raw);
    if (!parsed.success) {
      throw { type: "validation", message: "Validation failed", details: parsed.error.flatten() };
    }
    return jobVariantRepository.update(slug, parsed.data as Record<string, unknown>);
  }

  async delete(slug: string): Promise<void> {
    await this.findBySlug(slug); // throws not_found if missing
    return jobVariantRepository.delete(slug);
  }

  async deleteAll(): Promise<void> {
    const all = await jobVariantRepository.findAll();
    await Promise.all(all.map((v) => jobVariantRepository.delete(v.slug)));
  }
}

export const jobVariantService = new JobVariantService();
