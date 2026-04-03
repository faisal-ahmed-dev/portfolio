"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import { TonalCard } from "@/components/ui/TonalCard";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { BlogPostSummary } from "@/repositories/types";

interface BlogListClientProps {
  posts: BlogPostSummary[];
}

export function BlogListClient({ posts }: BlogListClientProps) {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

  const filtered = posts.filter((p) => {
    const matchTag = !activeTag || p.tags.includes(activeTag);
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchTag && matchSearch;
  });

  return (
    <div>
      {/* Search + Tag Filter */}
      <div className="mb-10 space-y-4">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52525b]" />
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-xl text-sm text-[#f4f4f5] placeholder-[#52525b] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTag(null)}
              className={`text-xs px-3 py-1 rounded-full transition-colors ${
                !activeTag
                  ? "bg-[#3b82f6] text-white"
                  : "bg-[#1a1a1f] text-[#52525b] hover:text-[#a1a1aa]"
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  activeTag === tag
                    ? "bg-[#3b82f6] text-white"
                    : "bg-[#1a1a1f] text-[#52525b] hover:text-[#a1a1aa]"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-[#52525b] py-20 text-sm">No posts found.</p>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-5"
        >
          {filtered.map((post) => (
            <motion.div key={post.id} variants={staggerItem}>
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <TonalCard hover shadow ghostBorder className="p-5 sm:p-6 group h-full flex flex-col">
                  {post.coverImage && (
                    <div
                      className="w-full h-36 rounded-xl mb-4 bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.coverImage})` }}
                    />
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-[#52525b] mb-3">
                    <Calendar size={10} />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <h2 className="text-[#f4f4f5] font-semibold text-base leading-snug mb-2 group-hover:text-white transition-colors flex-1">
                    {post.title}
                  </h2>

                  <p className="text-[#52525b] text-xs leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#52525b] bg-[#1a1a1f] px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <BookOpen size={13} className="text-[#3f3f46] group-hover:text-[#60a5fa] transition-colors" />
                  </div>
                </TonalCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
