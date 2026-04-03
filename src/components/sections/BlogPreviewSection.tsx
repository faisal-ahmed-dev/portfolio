"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { BlogPostSummary } from "@/repositories/types";

export function BlogPreviewSection() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((r) => r.json())
      .then((d) => setPosts((d.posts ?? []).slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <SectionHeader
            eyebrow="Blog"
            title="From the Blog"
            description="Production war stories, architecture breakdowns, and engineering insights."
          />
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm text-[#60a5fa] hover:text-white transition-colors shrink-0 mb-2"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-5"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={staggerItem}>
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <TonalCard hover shadow ghostBorder className="p-5 group h-full flex flex-col">
                  <div className="flex items-center gap-1.5 text-xs text-[#52525b] mb-3">
                    <Calendar size={10} />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <h3 className="text-[#f4f4f5] font-semibold text-sm leading-snug mb-2 group-hover:text-white transition-colors flex-1">
                    {post.title}
                  </h3>

                  <p className="text-[#52525b] text-xs leading-relaxed mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] text-[#52525b] bg-[#1a1a1f] px-2 py-0.5 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-[#3f3f46] group-hover:text-[#60a5fa] transition-colors">
                      <BookOpen size={13} />
                    </span>
                  </div>
                </TonalCard>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 flex sm:hidden justify-center">
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-sm text-[#60a5fa] hover:text-white transition-colors"
          >
            View all posts <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
