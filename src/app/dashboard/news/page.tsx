"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  X,
  Calendar,
} from "lucide-react";

export default function NewsCrudPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("published");
  const [thumbnailPath, setThumbnailPath] = useState("/images/hero-illustration.png");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);

  // Preview Modal
  const [previewArticle, setPreviewArticle] = useState<any | null>(null);

  const fetchNews = async () => {
    try {
      const res = await fetch("/api/admin/news");
      const data = await res.json();
      if (data.news) setNews(data.news);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openCreateModal = () => {
    setIsEditing(false);
    setEditId(null);
    setTitle("");
    setSlug("");
    setExcerpt("");
    setContent("");
    setStatus("published");
    setThumbnailPath("/images/hero-illustration.png");
    setModalOpen(true);
  };

  const openEditModal = (article: any) => {
    setIsEditing(true);
    setEditId(article.id);
    setTitle(article.title);
    setSlug(article.slug);
    setExcerpt(article.excerpt);
    setContent(article.content);
    setStatus(article.status);
    setThumbnailPath(article.thumbnail_path || "/images/hero-illustration.png");
    setModalOpen(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengunggah thumbnail");

      setThumbnailPath(data.url);
      setFeedback({ type: "success", text: "Gambar thumbnail berhasil diunggah!" });
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSaving(true);
    setFeedback(null);

    try {
      if (isEditing && editId) {
        const res = await fetch("/api/admin/news", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editId,
            title,
            slug,
            excerpt,
            content,
            thumbnail_path: thumbnailPath,
            status,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal memperbarui berita");
        setFeedback({ type: "success", text: "Berita berhasil diperbarui" });
      } else {
        const res = await fetch("/api/admin/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            slug,
            excerpt,
            content,
            thumbnail_path: thumbnailPath,
            status,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Gagal membuat berita");
        setFeedback({ type: "success", text: "Berita baru berhasil diterbitkan" });
      }

      setModalOpen(false);
      await fetchNews();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteArticle = async (id: string, artTitle: string) => {
    if (!confirm(`Hapus artikel "${artTitle}"?`)) return;

    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/news?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus berita");

      setFeedback({ type: "success", text: "Artikel berita berhasil dihapus" });
      await fetchNews();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-white">
            CRUD Berita &amp; Promo
          </h1>
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 mt-0.5">
            Kelola artikel, informasi event, dan promo yang tampil di halaman utama website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline text-xs sm:text-sm font-semibold dark:font-bold hover:bg-primary shadow-glow dark:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Berita Baru</span>
        </button>
      </div>

      {feedback && (
        <div
          className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300"
              : "bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-500/40 text-red-800 dark:text-red-300"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* News Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-12 flex flex-col items-center justify-center gap-2 text-on-surface-variant dark:text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin text-primary-container dark:text-cyan-400" />
            <span className="text-xs">Memuat daftar berita...</span>
          </div>
        ) : news.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-on-surface-variant dark:text-slate-400 bg-white dark:bg-[#121929] rounded-3xl border border-surface-container-high dark:border-cyan-500/20">
            Belum ada artikel berita. Klik tombol <strong>Tambah Berita Baru</strong> di atas.
          </div>
        ) : (
          news.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#121929] rounded-3xl border border-surface-container-high dark:border-cyan-500/20 shadow-sm overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full bg-surface-container dark:bg-slate-800 overflow-hidden">
                  <Image
                    src={item.thumbnail_path || "/images/hero-illustration.png"}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      item.status === "published"
                        ? "bg-emerald-500 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {item.status === "published" ? "Tayang" : "Draft"}
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-xs text-on-surface-variant dark:text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(item.created_at || Date.now()).toLocaleDateString("id-ID")}</span>
                  </div>
                  <h3 className="font-headline text-base font-bold text-on-surface dark:text-white line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {item.excerpt || item.content}
                  </p>
                </div>
              </div>

              <div className="p-4 border-t border-surface-container-high/60 dark:border-cyan-500/15 flex items-center justify-between">
                <button
                  onClick={() => setPreviewArticle(item)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-primary dark:text-cyan-400 hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Pratinjau</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 rounded-xl text-primary dark:text-cyan-400 hover:bg-surface-low dark:hover:bg-slate-800 transition-colors"
                    title="Ubah Berita"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(item.id, item.title)}
                    className="p-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Hapus Berita"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#121929] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-surface-container-high dark:border-cyan-500/30 p-6 sm:p-8 flex flex-col gap-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high dark:border-cyan-500/20">
              <h2 className="font-headline text-xl font-bold text-on-surface dark:text-white">
                {isEditing ? "Ubah Artikel Berita" : "Tulis Berita / Promo Baru"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-on-surface dark:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                  Judul Artikel
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Contoh: Flash Sale Diamond MLBB Weekend"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    placeholder="flash-sale-diamond-mlbb"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                    Status Publikasi
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
                  >
                    <option value="published">Tayangkan (Published)</option>
                    <option value="draft">Simpan sebagai Draft</option>
                  </select>
                </div>
              </div>

              {/* Upload Media Thumbnail */}
              <div className="flex flex-col gap-2 p-4 rounded-2xl bg-surface-low dark:bg-[#0f1422] border border-surface-container-high dark:border-cyan-500/20">
                <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200 flex items-center justify-between">
                  <span>Foto Thumbnail (Disimpan ke public/uploads/)</span>
                  {uploadingImage && <span className="text-primary dark:text-cyan-400">Mengunggah...</span>}
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-surface-container dark:bg-slate-800 border shrink-0">
                    <Image src={thumbnailPath} alt="Thumbnail preview" fill className="object-cover" />
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-surface-container-high dark:border-cyan-500/30 text-xs font-semibold text-primary dark:text-cyan-300 hover:bg-surface-container transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Pilih Foto Baru</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                  Ringkasan Singkat (Excerpt)
                </label>
                <textarea
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Ringkasan 1-2 kalimat untuk ditampilkan di kartu berita..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                  Konten Lengkap Berita
                </label>
                <textarea
                  required
                  rows={6}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tuliskan isi berita, ketentuan promo, tanggal berlaku..."
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-container-high dark:border-cyan-500/20">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-xs sm:text-sm font-semibold text-on-surface dark:text-slate-300 hover:bg-surface-container-high"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving || uploadingImage}
                  className="px-6 py-2.5 rounded-xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline text-xs sm:text-sm font-semibold dark:font-bold hover:bg-primary transition-all flex items-center gap-2 disabled:opacity-70 shadow-sm"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>{isEditing ? "Perbarui Artikel" : "Terbitkan Artikel"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Article Live Preview Modal */}
      {previewArticle && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white dark:bg-[#121929] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-surface-container-high dark:border-cyan-500/30 p-6 sm:p-8 flex flex-col gap-6 relative">
            <button
              onClick={() => setPreviewArticle(null)}
              className="absolute top-6 right-6 p-1.5 rounded-full bg-surface-container dark:bg-slate-800 text-on-surface dark:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-secondary-container dark:bg-cyan-950/80 text-on-secondary-container dark:text-cyan-300 font-sans text-xs font-bold uppercase">
                {previewArticle.status === "published" ? "Tayang di Beranda" : "Status Draft"}
              </span>
            </div>

            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface dark:text-white">
              {previewArticle.title}
            </h2>

            <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-surface-container dark:bg-slate-800">
              <Image
                src={previewArticle.thumbnail_path || "/images/hero-illustration.png"}
                alt={previewArticle.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="font-sans text-sm sm:text-base text-on-surface dark:text-slate-200 leading-relaxed flex flex-col gap-4">
              {previewArticle.excerpt && (
                <p className="font-semibold text-primary dark:text-cyan-400">
                  {previewArticle.excerpt}
                </p>
              )}
              <p className="whitespace-pre-line">{previewArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-surface-container-high dark:border-cyan-500/20 flex justify-end">
              <button
                onClick={() => setPreviewArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-primary dark:text-cyan-300 font-headline text-xs sm:text-sm font-semibold"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
