import type { IBlogPostRepository } from "@/repositories/interfaces/IBlogPostRepository";
import { blogPostCreateSchema, blogPostUpdateSchema } from "@/lib/blog-schema";
import type { CreateBlogPostInput, UpdateBlogPostInput } from "@/repositories/types";

export class BlogPostService {
  constructor(private readonly repo: IBlogPostRepository) {}

  async getPublishedList() {
    return this.repo.findAll({ publishedOnly: true });
  }

  async getAllForAdmin() {
    return this.repo.findAll({ publishedOnly: false });
  }

  async getLatestPreview(count = 3) {
    return this.repo.findLatest(count, true);
  }

  async getBySlug(slug: string, allowDraft = false) {
    const post = await this.repo.findBySlug(slug);
    if (!post) return null;
    if (!post.published && !allowDraft) return null;
    return post;
  }

  async create(raw: unknown) {
    const result = blogPostCreateSchema.safeParse(raw);
    if (!result.success) {
      throw { type: "validation" as const, issues: result.error.issues };
    }
    if (await this.repo.slugExists(result.data.slug)) {
      throw { type: "conflict" as const, message: "Slug already exists" };
    }
    return this.repo.create(result.data as CreateBlogPostInput);
  }

  async update(slug: string, raw: unknown) {
    const result = blogPostUpdateSchema.safeParse(raw);
    if (!result.success) {
      throw { type: "validation" as const, issues: result.error.issues };
    }
    return this.repo.update(slug, result.data as UpdateBlogPostInput);
  }

  async delete(slug: string) {
    return this.repo.delete(slug);
  }
}
