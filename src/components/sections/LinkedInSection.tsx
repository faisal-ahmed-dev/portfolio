"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, ThumbsUp, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TonalCard } from "@/components/ui/TonalCard";
import { staggerContainer, staggerItem } from "@/lib/animations";
import type { LinkedInPostEntity } from "@/repositories/types";

export function LinkedInSection() {
  const [posts, setPosts] = useState<LinkedInPostEntity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/linkedin")
      .then((r) => r.json())
      .then((d) => setPosts(d.posts ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;
  if (posts.length === 0) return null;

  return (
    <section id="linkedin" className="py-16 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="LinkedIn"
          title="On the Feed"
          description="Thoughts, updates, and engineering takes from LinkedIn."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 grid md:grid-cols-2 gap-5"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={staggerItem}>
              <TonalCard hover shadow ghostBorder className="p-5 sm:p-6 group h-full flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#0a66c2]/10 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" width={13} height={13} fill="#0a66c2" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </span>
                    <span className="text-xs font-mono text-[#52525b]">LinkedIn</span>
                  </div>
                  <span className="flex items-center gap-1 text-xs text-[#52525b]">
                    <Calendar size={10} />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <p className="text-[#a1a1aa] text-sm leading-relaxed flex-1 whitespace-pre-line line-clamp-6">
                  {post.content}
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(255,255,255,0.04)]">
                  {post.likes != null ? (
                    <span className="flex items-center gap-1 text-xs text-[#52525b]">
                      <ThumbsUp size={10} />
                      {post.likes.toLocaleString()} reactions
                    </span>
                  ) : (
                    <span />
                  )}
                  {post.url && (
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3f3f46] hover:text-[#60a5fa] transition-colors"
                      aria-label="View on LinkedIn"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </TonalCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
