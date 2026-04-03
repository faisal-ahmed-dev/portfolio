import { prisma } from "@/lib/prisma";
import type { IJobVariantRepository } from "../interfaces/IJobVariantRepository";
import type { JobVariantEntity } from "../types";
import { serialize } from "./_serialize";

export class PrismaJobVariantRepository implements IJobVariantRepository {
  async findAll(): Promise<JobVariantEntity[]> {
    const rows = await prisma.jobVariant.findMany({ orderBy: { createdAt: "asc" } });
    return rows.map(serialize) as unknown as JobVariantEntity[];
  }

  async findBySlug(slug: string): Promise<JobVariantEntity | null> {
    const row = await prisma.jobVariant.findUnique({ where: { slug } });
    return row ? (serialize(row) as unknown as JobVariantEntity) : null;
  }

  async slugExists(slug: string): Promise<boolean> {
    const count = await prisma.jobVariant.count({ where: { slug } });
    return count > 0;
  }

  async create(data: Record<string, unknown>): Promise<JobVariantEntity> {
    const row = await prisma.jobVariant.create({
      data: data as Parameters<typeof prisma.jobVariant.create>[0]["data"],
    });
    return serialize(row) as unknown as JobVariantEntity;
  }

  async update(slug: string, data: Record<string, unknown>): Promise<JobVariantEntity> {
    const row = await prisma.jobVariant.update({
      where: { slug },
      data: data as Parameters<typeof prisma.jobVariant.update>[0]["data"],
    });
    return serialize(row) as unknown as JobVariantEntity;
  }

  async delete(slug: string): Promise<void> {
    await prisma.jobVariant.delete({ where: { slug } });
  }
}
