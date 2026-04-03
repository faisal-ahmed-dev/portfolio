import type { Metadata } from "next";
import { blogPostService } from "@/services";
import { BlogListClient } from "@/components/blog/BlogListClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — Faisal Ahmed",
  description: "Engineering deep dives, architecture patterns, and production lessons by Faisal Ahmed.",
};

export default async function BlogPage() {
  const posts = await blogPostService.getPublishedList();

  return (
    <main className="min-h-screen bg-[#09090b] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#52525b] mb-3 font-mono">
            Blog
          </p>
          <h1 className="text-4xl sm:text-6xl font-bold text-[#f4f4f5] tracking-[-0.04em] mb-4">
            Engineering Notes
          </h1>
          <p className="text-[#a1a1aa] text-sm sm:text-lg max-w-2xl leading-relaxed">
            Production war stories, architecture breakdowns, and engineering insights.
          </p>
        </div>

        <BlogListClient posts={posts} />
      </div>
    </main>
  );
}
