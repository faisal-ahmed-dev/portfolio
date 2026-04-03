"use client";
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { Plus, Trash2, Eye, EyeOff, Pencil } from "lucide-react";
import { cn } from "@/lib/cn";
import type { BlogPostEntity, BlogPostSummary } from "@/repositories/types";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface BlogPanelProps {
  apiKey: string;
}

const EMPTY_FORM = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  tags: "",
  publishedAt: new Date().toISOString().slice(0, 16),
  published: false,
  coverImage: "",
};

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function BlogPanel({ apiKey }: BlogPanelProps) {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [selected, setSelected] = useState<BlogPostEntity | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog?all=true", { headers: { "x-api-key": apiKey } });
      const data = await res.json();
      setPosts(data.posts ?? []);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, [apiKey]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  function openNew() {
    setSelected(null);
    setIsNew(true);
    setForm(EMPTY_FORM);
  }

  async function openEdit(slug: string) {
    try {
      const res = await fetch(`/api/blog/${slug}`, { headers: { "x-api-key": apiKey } });
      const data = await res.json();
      const post: BlogPostEntity = data.post;
      setSelected(post);
      setIsNew(false);
      setForm({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags.join(", "),
        publishedAt: new Date(post.publishedAt).toISOString().slice(0, 16),
        published: post.published,
        coverImage: post.coverImage ?? "",
      });
    } catch {
      toast.error("Failed to load post");
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        publishedAt: new Date(form.publishedAt).toISOString(),
        published: form.published,
        coverImage: form.coverImage || null,
      };

      const url = isNew ? "/api/blog" : `/api/blog/${selected?.slug}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Save failed");
        return;
      }
      toast.success(isNew ? "Post created" : "Post updated");
      setIsNew(false);
      setSelected(data.post);
      fetchPosts();
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"?`)) return;
    try {
      const res = await fetch(`/api/blog/${slug}`, {
        method: "DELETE",
        headers: { "x-api-key": apiKey },
      });
      if (!res.ok) { toast.error("Delete failed"); return; }
      toast.success("Post deleted");
      setSelected(null);
      setIsNew(false);
      fetchPosts();
    } catch {
      toast.error("Delete failed");
    }
  }

  const showEditor = isNew || selected !== null;

  return (
    <div className="flex gap-4 h-[calc(100vh-7rem)]">
      {/* Post list */}
      <div className="w-56 shrink-0 flex flex-col gap-2 overflow-y-auto">
        <button
          onClick={openNew}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-[#1a1a1f] text-[#60a5fa] hover:bg-[#22222a] transition-colors w-full"
        >
          <Plus size={12} /> New Post
        </button>

        {loading ? (
          <div className="text-center py-10 text-[#3f3f46] text-xs">Loading...</div>
        ) : posts.length === 0 ? (
          <div className="text-center py-10 text-[#3f3f46] text-xs">No posts yet</div>
        ) : (
          posts.map((p) => (
            <button
              key={p.id}
              onClick={() => openEdit(p.slug)}
              className={cn(
                "text-left px-3 py-2.5 rounded-lg transition-colors group",
                selected?.slug === p.slug
                  ? "bg-[#1a1a1f] ring-1 ring-[#3b82f6]/30"
                  : "hover:bg-[#131316]"
              )}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                {p.published ? (
                  <Eye size={10} className="text-emerald-500 shrink-0" />
                ) : (
                  <EyeOff size={10} className="text-[#52525b] shrink-0" />
                )}
                <span className="text-xs text-[#f4f4f5] truncate font-mono">{p.title}</span>
              </div>
              <span className="text-[10px] text-[#52525b] font-mono">{p.slug}</span>
            </button>
          ))
        )}
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto">
        {!showEditor ? (
          <div className="flex items-center justify-center h-full text-[#3f3f46] text-sm">
            Select a post or create a new one
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#52525b] font-mono mb-1">Title</label>
                <input
                  value={form.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setForm((f) => ({
                      ...f,
                      title,
                      ...(isNew ? { slug: slugify(title) } : {}),
                    }));
                  }}
                  className="w-full px-3 py-2 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-lg text-sm text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40"
                  placeholder="Post title"
                />
              </div>
              <div>
                <label className="block text-xs text-[#52525b] font-mono mb-1">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  disabled={!isNew}
                  className="w-full px-3 py-2 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-lg text-sm text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40 disabled:opacity-50"
                  placeholder="post-slug"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#52525b] font-mono mb-1">Excerpt</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-lg text-sm text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40 resize-none"
                placeholder="Short description"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-[#52525b] font-mono mb-1">Tags (comma-separated)</label>
                <input
                  value={form.tags}
                  onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-lg text-sm text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40"
                  placeholder="React, Next.js"
                />
              </div>
              <div>
                <label className="block text-xs text-[#52525b] font-mono mb-1">Published At</label>
                <input
                  type="datetime-local"
                  value={form.publishedAt}
                  onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-lg text-sm text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40"
                />
              </div>
              <div>
                <label className="block text-xs text-[#52525b] font-mono mb-1">Cover Image URL</label>
                <input
                  value={form.coverImage}
                  onChange={(e) => setForm((f) => ({ ...f, coverImage: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-lg text-sm text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-[#52525b] font-mono mb-1">Content (Markdown)</label>
              <div data-color-mode="dark">
                <MDEditor
                  value={form.content}
                  onChange={(v) => setForm((f) => ({ ...f, content: v ?? "" }))}
                  height={400}
                  preview="edit"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                  className="w-4 h-4 rounded accent-blue-500"
                />
                <span className="text-xs text-[#a1a1aa] font-mono">Published</span>
              </label>

              <div className="flex items-center gap-2">
                {!isNew && selected && (
                  <button
                    onClick={() => handleDelete(selected.slug)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                )}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-mono bg-[#3b82f6] text-white hover:bg-[#2563eb] transition-colors disabled:opacity-50"
                >
                  <Pencil size={12} />
                  {saving ? "Saving..." : isNew ? "Create Post" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
