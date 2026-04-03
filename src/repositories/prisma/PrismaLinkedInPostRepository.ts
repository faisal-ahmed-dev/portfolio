import { prisma } from "@/lib/prisma";
import type { ILinkedInPostRepository } from "../interfaces/ILinkedInPostRepository";
import type {
  LinkedInPostEntity,
  CreateLinkedInPostInput,
  UpdateLinkedInPostInput,
} from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serialize(obj: Record<string, any>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v instanceof Date ? v.toISOString() : v])
  );
}

export class PrismaLinkedInPostRepository implements ILinkedInPostRepository {
  async findAll({ featuredOnly = false } = {}): Promise<LinkedInPostEntity[]> {
    const posts = await prisma.linkedInPost.findMany({
      where: featuredOnly ? { featured: true } : undefined,
      orderBy: { date: "desc" },
    });
    return posts.map(serialize) as unknown as LinkedInPostEntity[];
  }

  async findById(id: string): Promise<LinkedInPostEntity | null> {
    const post = await prisma.linkedInPost.findUnique({ where: { id } });
    return post ? (serialize(post) as unknown as LinkedInPostEntity) : null;
  }

  async create(data: CreateLinkedInPostInput): Promise<LinkedInPostEntity> {
    const post = await prisma.linkedInPost.create({
      data: { ...data, date: new Date(data.date) },
    });
    return serialize(post) as unknown as LinkedInPostEntity;
  }

  async update(id: string, data: UpdateLinkedInPostInput): Promise<LinkedInPostEntity> {
    const updateData = {
      ...data,
      ...(data.date ? { date: new Date(data.date) } : {}),
    };
    const post = await prisma.linkedInPost.update({ where: { id }, data: updateData });
    return serialize(post) as unknown as LinkedInPostEntity;
  }

  async delete(id: string): Promise<void> {
    await prisma.linkedInPost.delete({ where: { id } });
  }
}
