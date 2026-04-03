"use client";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Star, Pencil } from "lucide-react";
import { cn } from "@/lib/cn";
import type { LinkedInPostEntity } from "@/repositories/types";

interface LinkedInPanelProps {
  apiKey: string;
}

const EMPTY_FORM = {
  content: "",
  date: new Date().toISOString().slice(0, 16),
  url: "",
  likes: "",
  featured: false,
};

export function LinkedInPanel({ apiKey }: LinkedInPanelProps) {
  const [posts, setPosts] = useState<LinkedInPostEntity[]>([]);
  const [selected, setSelected] = useState<LinkedInPostEntity | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/linkedin");
      const data = await res.json();
      setPosts(data.posts ?? []);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  function openNew() {
    setSelected(null);
    setIsNew(true);
    setForm(EMPTY_FORM);
  }

  function openEdit(post: LinkedInPostEntity) {
    setSelected(post);
    setIsNew(false);
    setForm({
      content: post.content,
      date: new Date(post.date).toISOString().slice(0, 16),
      url: post.url ?? "",
      likes: post.likes != null ? String(post.likes) : "",
      featured: post.featured,
    });
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        content: form.content,
        date: new Date(form.date).toISOString(),
        url: form.url || null,
        likes: form.likes ? parseInt(form.likes, 10) : null,
        featured: form.featured,
      };

      const url = isNew ? "/api/linkedin" : `/api/linkedin/${selected?.id}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "x-api-key": apiKey },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Save failed"); return; }
      toast.success(isNew ? "Post created" : "Post updated");
      setSelected(data.post);
      setIsNew(false);
      fetchPosts();
    } catch {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    try {
      const res = await fetch(`/api/linkedin/${id}`, {
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
              onClick={() => openEdit(p)}
              className={cn(
                "text-left px-3 py-2.5 rounded-lg transition-colors",
                selected?.id === p.id
                  ? "bg-[#1a1a1f] ring-1 ring-[#3b82f6]/30"
                  : "hover:bg-[#131316]"
              )}
            >
              <div className="flex items-center gap-1.5 mb-0.5">
                {p.featured && <Star size={10} className="text-yellow-400 shrink-0" />}
                <span className="text-xs text-[#f4f4f5] font-mono truncate">
                  {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
              <p className="text-[10px] text-[#52525b] line-clamp-2 leading-relaxed">
                {p.content.slice(0, 60)}...
              </p>
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
            <div>
              <label className="block text-xs text-[#52525b] font-mono mb-1">Content</label>
              <textarea
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={8}
                className="w-full px-3 py-2.5 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-xl text-sm text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40 resize-none leading-relaxed"
                placeholder="Paste your LinkedIn post content here..."
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-[#52525b] font-mono mb-1">Date</label>
                <input
                  type="datetime-local"
                  value={form.date}
                  onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-lg text-sm text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40"
                />
              </div>
              <div>
                <label className="block text-xs text-[#52525b] font-mono mb-1">LinkedIn URL (optional)</label>
                <input
                  value={form.url}
                  onChange={(e) => setForm((f) => ({ ...f, url: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-lg text-sm text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40"
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div>
                <label className="block text-xs text-[#52525b] font-mono mb-1">Reactions count</label>
                <input
                  type="number"
                  value={form.likes}
                  onChange={(e) => setForm((f) => ({ ...f, likes: e.target.value }))}
                  className="w-full px-3 py-2 bg-[#131316] border border-[rgba(255,255,255,0.06)] rounded-lg text-sm text-[#f4f4f5] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]/40"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 rounded accent-yellow-400"
                />
                <span className="text-xs text-[#a1a1aa] font-mono">Featured</span>
              </label>

              <div className="flex items-center gap-2">
                {!isNew && selected && (
                  <button
                    onClick={() => handleDelete(selected.id)}
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
