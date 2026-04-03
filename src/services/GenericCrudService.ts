import type { ZodSchema } from "zod";
import type { GenericCrudRepository } from "@/repositories/prisma/GenericCrudRepository";

interface ServiceError {
  type: "validation" | "not_found";
  message: string;
  details?: unknown;
}

export abstract class GenericCrudService<TEntity> {
  constructor(
    protected readonly repo: GenericCrudRepository<TEntity>,
    protected readonly createSchema: ZodSchema,
    protected readonly updateSchema: ZodSchema
  ) {}

  async findAll(): Promise<TEntity[]> {
    return this.repo.findAll();
  }

  async findById(id: string): Promise<TEntity> {
    const item = await this.repo.findById(id);
    if (!item) throw { type: "not_found", message: `Item '${id}' not found` } as ServiceError;
    return item;
  }

  async create(raw: unknown): Promise<TEntity> {
    const parsed = this.createSchema.safeParse(raw);
    if (!parsed.success) {
      throw { type: "validation", message: "Validation failed", details: parsed.error.flatten() } as ServiceError;
    }
    return this.repo.create(parsed.data as Record<string, unknown>);
  }

  async update(id: string, raw: unknown): Promise<TEntity> {
    await this.findById(id); // throws not_found if missing
    const parsed = this.updateSchema.safeParse(raw);
    if (!parsed.success) {
      throw { type: "validation", message: "Validation failed", details: parsed.error.flatten() } as ServiceError;
    }
    return this.repo.update(id, parsed.data as Record<string, unknown>);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id); // throws not_found if missing
    return this.repo.delete(id);
  }

  async deleteAll(): Promise<void> {
    const all = await this.repo.findAll();
    await Promise.all(all.map((item) => this.repo.delete((item as { id: string }).id)));
  }
}
