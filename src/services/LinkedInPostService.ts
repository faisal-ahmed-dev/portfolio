import type { ILinkedInPostRepository } from "@/repositories/interfaces/ILinkedInPostRepository";
import { linkedInPostCreateSchema, linkedInPostUpdateSchema } from "@/lib/blog-schema";
import type { CreateLinkedInPostInput, UpdateLinkedInPostInput } from "@/repositories/types";

export class LinkedInPostService {
  constructor(private readonly repo: ILinkedInPostRepository) {}

  async getAll(featuredOnly = false) {
    return this.repo.findAll({ featuredOnly });
  }

  async getById(id: string) {
    return this.repo.findById(id);
  }

  async create(raw: unknown) {
    const result = linkedInPostCreateSchema.safeParse(raw);
    if (!result.success) {
      throw { type: "validation" as const, issues: result.error.issues };
    }
    return this.repo.create(result.data as CreateLinkedInPostInput);
  }

  async update(id: string, raw: unknown) {
    const result = linkedInPostUpdateSchema.safeParse(raw);
    if (!result.success) {
      throw { type: "validation" as const, issues: result.error.issues };
    }
    return this.repo.update(id, result.data as UpdateLinkedInPostInput);
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }
}
