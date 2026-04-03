import { prisma } from "@/lib/prisma";
import { serialize } from "./_serialize";

type PrismaDelegate = {
  findMany: (args?: unknown) => Promise<unknown[]>;
  findFirst: (args?: unknown) => Promise<unknown | null>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
};

export abstract class GenericCrudRepository<TEntity> {
  protected abstract get modelName(): keyof typeof prisma;
  protected get orderBy(): Record<string, unknown> {
    return { order: "asc" };
  }

  private get delegate(): PrismaDelegate {
    return prisma[this.modelName] as unknown as PrismaDelegate;
  }

  async findAll(): Promise<TEntity[]> {
    const rows = await this.delegate.findMany({ orderBy: this.orderBy });
    return (rows as Record<string, unknown>[]).map(serialize) as unknown as TEntity[];
  }

  async findById(id: string): Promise<TEntity | null> {
    const row = await this.delegate.findFirst({ where: { id } });
    return row ? (serialize(row as Record<string, unknown>) as unknown as TEntity) : null;
  }

  async create(data: Record<string, unknown>): Promise<TEntity> {
    const row = await this.delegate.create({ data });
    return serialize(row as Record<string, unknown>) as unknown as TEntity;
  }

  async update(id: string, data: Record<string, unknown>): Promise<TEntity> {
    const row = await this.delegate.update({ where: { id }, data });
    return serialize(row as Record<string, unknown>) as unknown as TEntity;
  }

  async delete(id: string): Promise<void> {
    await this.delegate.delete({ where: { id } });
  }
}
