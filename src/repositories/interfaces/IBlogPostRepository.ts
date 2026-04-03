import type {
  BlogPostEntity,
  BlogPostSummary,
  CreateBlogPostInput,
  UpdateBlogPostInput,
} from "../types";

export interface IBlogPostRepository {
  findAll(options?: { publishedOnly?: boolean }): Promise<BlogPostSummary[]>;
  findBySlug(slug: string): Promise<BlogPostEntity | null>;
  findLatest(limit: number, publishedOnly?: boolean): Promise<BlogPostSummary[]>;
  create(data: CreateBlogPostInput): Promise<BlogPostEntity>;
  update(slug: string, data: UpdateBlogPostInput): Promise<BlogPostEntity>;
  delete(slug: string): Promise<void>;
  slugExists(slug: string): Promise<boolean>;
}
