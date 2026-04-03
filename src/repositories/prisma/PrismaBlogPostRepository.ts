import { prisma } from "@/lib/prisma";
import type { IBlogPostRepository } from "../interfaces/IBlogPostRepository";
import type {
  BlogPostEntity,
  BlogPostSummary,
  CreateBlogPostInput,
  UpdateBlogPostInput,
} from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serialize(obj: Record<string, any>): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v instanceof Date ? v.toISOString() : v])
  );
}

const SUMMARY_SELECT = {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  tags: true,
  publishedAt: true,
  published: true,
  coverImage: true,
  createdAt: true,
  updatedAt: true,
} as const;

export class PrismaBlogPostRepository implements IBlogPostRepository {
  async findAll({ publishedOnly = false } = {}): Promise<BlogPostSummary[]> {
    const posts = await prisma.blogPost.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { publishedAt: "desc" },
      select: SUMMARY_SELECT,
    });
    return posts.map(serialize) as unknown as BlogPostSummary[];
  }

  async findBySlug(slug: string): Promise<BlogPostEntity | null> {
    const post = await prisma.blogPost.findUnique({ where: { slug } });
    return post ? (serialize(post) as unknown as BlogPostEntity) : null;
  }

  async findLatest(limit: number, publishedOnly = true): Promise<BlogPostSummary[]> {
    const posts = await prisma.blogPost.findMany({
      where: publishedOnly ? { published: true } : undefined,
      orderBy: { publishedAt: "desc" },
      take: limit,
      select: SUMMARY_SELECT,
    });
    return posts.map(serialize) as unknown as BlogPostSummary[];
  }

  async create(data: CreateBlogPostInput): Promise<BlogPostEntity> {
    const post = await prisma.blogPost.create({
      data: { ...data, publishedAt: new Date(data.publishedAt) },
    });
    return serialize(post) as unknown as BlogPostEntity;
  }

  async update(slug: string, data: UpdateBlogPostInput): Promise<BlogPostEntity> {
    const updateData = {
      ...data,
      ...(data.publishedAt ? { publishedAt: new Date(data.publishedAt) } : {}),
    };
    const post = await prisma.blogPost.update({ where: { slug }, data: updateData });
    return serialize(post) as unknown as BlogPostEntity;
  }

  async delete(slug: string): Promise<void> {
    await prisma.blogPost.delete({ where: { slug } });
  }

  async slugExists(slug: string): Promise<boolean> {
    const count = await prisma.blogPost.count({ where: { slug } });
    return count > 0;
  }
}
