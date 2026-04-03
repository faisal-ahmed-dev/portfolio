export interface BlogPostEntity {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  published: boolean;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
}

export type BlogPostSummary = Omit<BlogPostEntity, "content">;

export interface LinkedInPostEntity {
  id: string;
  content: string;
  date: string;
  url: string | null;
  likes: number | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPostInput {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  published: boolean;
  coverImage?: string | null;
}

export type UpdateBlogPostInput = Partial<Omit<CreateBlogPostInput, "slug">>;

export interface CreateLinkedInPostInput {
  content: string;
  date: string;
  url?: string | null;
  likes?: number | null;
  featured: boolean;
}

export type UpdateLinkedInPostInput = Partial<CreateLinkedInPostInput>;
