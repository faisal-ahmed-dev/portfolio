import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPostService } from "@/services";
import { BlogPostClient } from "@/components/blog/BlogPostClient";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await blogPostService.getPublishedList();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await blogPostService.getBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Faisal Ahmed`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await blogPostService.getBySlug(slug);

  if (!post) notFound();

  return <BlogPostClient post={post} />;
}
