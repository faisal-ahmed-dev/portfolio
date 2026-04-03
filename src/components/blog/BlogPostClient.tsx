"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";
import type { BlogPostEntity } from "@/repositories/types";

interface BlogPostClientProps {
  post: BlogPostEntity;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  return (
    <article className="min-h-screen bg-[#09090b] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[#52525b] hover:text-[#a1a1aa] transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to blog
        </Link>

        {/* Cover image */}
        {post.coverImage && (
          <div
            className="w-full h-56 sm:h-72 rounded-2xl mb-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-[#52525b] mb-4">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl font-bold text-[#f4f4f5] tracking-[-0.04em] leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-[#71717a] text-base sm:text-lg leading-relaxed mb-6">{post.excerpt}</p>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mb-10">
            <Tag size={11} className="text-[#52525b]" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] text-[#52525b] bg-[#1a1a1f] px-2.5 py-0.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-[rgba(255,255,255,0.06)] mb-10" />

        {/* Markdown content */}
        <div className="prose-blog">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl sm:text-3xl font-bold text-[#f4f4f5] mt-10 mb-4 tracking-[-0.03em]">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl sm:text-2xl font-bold text-[#f4f4f5] mt-8 mb-3 tracking-[-0.02em]">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-[#e4e4e7] mt-6 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-[#a1a1aa] text-base leading-[1.8] mb-5">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-outside pl-5 mb-5 space-y-1.5 text-[#a1a1aa] text-base leading-relaxed">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside pl-5 mb-5 space-y-1.5 text-[#a1a1aa] text-base leading-relaxed">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-2 border-[#3b82f6] pl-4 my-5 text-[#71717a] italic">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isBlock = className?.includes("language-");
                return isBlock ? (
                  <code className="block bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-xl p-4 text-sm text-[#a1a1aa] font-mono overflow-x-auto mb-5 whitespace-pre">
                    {children}
                  </code>
                ) : (
                  <code className="bg-[#1a1a1f] text-[#60a5fa] text-[13px] font-mono px-1.5 py-0.5 rounded">
                    {children}
                  </code>
                );
              },
              pre: ({ children }) => <pre className="mb-5">{children}</pre>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#60a5fa] hover:text-white underline underline-offset-2 transition-colors"
                >
                  {children}
                </a>
              ),
              hr: () => (
                <hr className="border-t border-[rgba(255,255,255,0.06)] my-8" />
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-5">
                  <table className="w-full text-sm text-[#a1a1aa] border-collapse">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="text-left text-[#f4f4f5] font-semibold border-b border-[rgba(255,255,255,0.08)] px-3 py-2">
                  {children}
                </th>
              ),
              td: ({ children }) => (
                <td className="border-b border-[rgba(255,255,255,0.04)] px-3 py-2">{children}</td>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[#52525b] hover:text-[#a1a1aa] transition-colors"
          >
            <ArrowLeft size={14} /> All posts
          </Link>
        </div>
      </div>
    </article>
  );
}
