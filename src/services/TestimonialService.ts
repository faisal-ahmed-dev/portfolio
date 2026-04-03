import { GenericCrudService } from "./GenericCrudService";
import { testimonialRepository } from "@/repositories";
import { createTestimonialSchema, updateTestimonialSchema } from "@/lib/entity-schemas";
import type { TestimonialEntity } from "@/repositories/types";
import { TESTIMONIALS } from "@/data/testimonials";
import { withDbFallback } from "@/lib/api-utils";

export class TestimonialService extends GenericCrudService<TestimonialEntity> {
  constructor() {
    super(testimonialRepository, createTestimonialSchema, updateTestimonialSchema);
  }

  override async findAll(): Promise<TestimonialEntity[]> {
    return withDbFallback(
      this.repo.findAll(),
      TESTIMONIALS.map((t, i) => ({ ...t, avatar: t.avatar ?? null, relationship: t.relationship ?? null, order: i, updatedAt: new Date().toISOString() }))
    );
  }
}

export const testimonialService = new TestimonialService();
