"use client";

import React, { useState, useEffect } from "react";
import { Shield, Plus, Trash2, CheckCircle2, AlertCircle, Loader2, Lock } from "lucide-react";

export default function RolesManagementPage() {
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Form New Role
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [permissions, setPermissions] = useState("read,order");
  const [creating, setCreating] = useState(false);

  const fetchRoles = async () => {
    try {
      const res = await fetch("/api/admin/roles");
      const data = await res.json();
      if (data.roles) setRoles(data.roles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setCreating(true);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/roles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.toLowerCase().replace(/[^a-z0-9_-]/g, ""),
          description,
          permissions,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal membuat role");

      setFeedback({ type: "success", text: `Role "${name}" berhasil dibuat` });
      setName("");
      setDescription("");
      await fetchRoles();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteRole = async (roleId: string, roleName: string) => {
    if (!confirm(`Hapus role "${roleName}"?`)) return;

    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/roles?id=${roleId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus role");

      setFeedback({ type: "success", text: `Role "${roleName}" berhasil dihapus` });
      await fetchRoles();
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-white">
          Manajemen Hak Akses &amp; Role
        </h1>
        <p className="font-sans text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 mt-0.5">
          Atur permission hak akses sistem. Role bawaan dilindungi untuk menjaga stabilitas otorisasi.
        </p>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Roles List */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h2 className="font-headline text-lg font-bold text-on-surface dark:text-white">
            Daftar Role Aktif
          </h2>

          <div className="bg-white dark:bg-[#121929] rounded-3xl border border-surface-container-high dark:border-cyan-500/20 shadow-sm overflow-hidden">
            {loading ? (
              <div className="p-10 flex flex-col items-center justify-center gap-2 text-on-surface-variant dark:text-slate-400">
                <Loader2 className="w-5 h-5 animate-spin text-primary-container dark:text-cyan-400" />
                <span className="text-xs">Memuat role...</span>
              </div>
            ) : (
              <div className="divide-y divide-surface-container-high/60 dark:divide-cyan-500/15">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className="p-5 flex items-start justify-between gap-4 hover:bg-surface-low/30 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-surface-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 flex items-center justify-center shrink-0 text-primary dark:text-cyan-400">
                        <Shield className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-headline text-base font-bold text-on-surface dark:text-white">
                            {role.name}
                          </span>
                          {role.is_system ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high dark:bg-slate-800 text-[10px] font-bold text-primary dark:text-cyan-300 uppercase tracking-wider">
                              <Lock className="w-2.5 h-2.5" />
                              Sistem
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">
                              Kustom
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                          {role.description}
                        </p>
                        <span className="font-mono text-[11px] text-primary dark:text-cyan-400 mt-1">
                          Izin: {role.permissions}
                        </span>
                      </div>
                    </div>

                    {!role.is_system && (
                      <button
                        onClick={() => handleDeleteRole(role.id, role.name)}
                        className="p-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                        title="Hapus Role Kustom"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add Role Form */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h2 className="font-headline text-lg font-bold text-on-surface dark:text-white">
            Tambah Role Baru
          </h2>

          <form
            onSubmit={handleCreateRole}
            className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                Nama Role (Identifier)
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="misal: editor, finance, cs"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                Deskripsi Tanggung Jawab
              </label>
              <input
                type="text"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="misal: Mengelola artikel & promo berita"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                Hak Izin (Permissions)
              </label>
              <input
                type="text"
                value={permissions}
                onChange={(e) => setPermissions(e.target.value)}
                placeholder="misal: read,news_crud,order"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
              />
              <span className="font-sans text-[11px] text-on-surface-variant dark:text-slate-400">
                Pisahkan izin dengan koma (contoh: <code>read, news_crud</code>)
              </span>
            </div>

            <button
              type="submit"
              disabled={creating}
              className="w-full py-2.5 rounded-xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline text-xs sm:text-sm font-semibold dark:font-bold hover:bg-primary transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-1 shadow-sm"
            >
              {creating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Membuat...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Simpan Role Baru</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
