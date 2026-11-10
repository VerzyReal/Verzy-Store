"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Shield,
  Newspaper,
  ShieldAlert,
  ArrowRight,
  Database,
  CheckCircle2,
  Lock,
  Loader2,
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [stats, setStats] = useState({
    usersCount: 0,
    rolesCount: 0,
    newsCount: 0,
  });
  const [loading, setLoading] = useState(true);

  // Form Ganti Password Admin
  const [newPassword, setNewPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const [usersRes, rolesRes, newsRes] = await Promise.all([
          fetch("/api/admin/users"),
          fetch("/api/admin/roles"),
          fetch("/api/admin/news"),
        ]);

        const usersData = await usersRes.json();
        const rolesData = await rolesRes.json();
        const newsData = await newsRes.json();

        setStats({
          usersCount: usersData.users ? usersData.users.length : 0,
          rolesCount: rolesData.roles ? rolesData.roles.length : 0,
          newsCount: newsData.news ? newsData.news.length : 0,
        });
      } catch (err) {
        console.error("Gagal memuat statistik:", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordFeedback({ type: "error", text: "Kata sandi baru minimal 6 karakter" });
      return;
    }

    setPasswordLoading(true);
    setPasswordFeedback(null);

    try {
      // Ambil ID user admin saat ini
      const meRes = await fetch("/api/auth/me");
      const meData = await meRes.json();
      if (!meData.user) throw new Error("Sesi kedaluwarsa");

      const updateRes = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: meData.user.id,
          password: newPassword,
        }),
      });

      const resData = await updateRes.json();
      if (!updateRes.ok) throw new Error(resData.error || "Gagal mengubah kata sandi");

      setPasswordFeedback({
        type: "success",
        text: "Kata sandi admin berhasil diperbarui!",
      });
      setNewPassword("");
    } catch (err: any) {
      setPasswordFeedback({ type: "error", text: err.message });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Page Title */}
      <div>
        <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface dark:text-white">
          Ringkasan Dashboard
        </h1>
        <p className="font-sans text-sm text-on-surface-variant dark:text-slate-400 mt-1">
          Selamat datang di panel kontrol terpadu Verzy Store.
        </p>
      </div>

      {/* Security Warning Alert Banner (Wajib Step 2.4) */}
      <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex flex-col">
            <span className="font-headline text-sm font-bold text-amber-900 dark:text-amber-300">
              Peringatan Keamanan Kredensial Default
            </span>
            <p className="font-sans text-xs text-amber-800 dark:text-amber-400/90 leading-relaxed mt-0.5">
              Akun admin awal menggunakan kredensial publik (<code className="font-mono font-bold">admin@gmail.com / 123456</code>). Harap segera ubah kata sandi sebelum website dipublikasikan ke production.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-xs text-on-surface-variant dark:text-slate-400 font-semibold uppercase tracking-wider">
              Total Pengguna
            </span>
            <span className="font-headline text-3xl font-bold text-primary dark:text-cyan-400 mt-1">
              {loading ? "..." : stats.usersCount}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-surface-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 flex items-center justify-center text-primary dark:text-cyan-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-xs text-on-surface-variant dark:text-slate-400 font-semibold uppercase tracking-wider">
              Total Hak Akses / Role
            </span>
            <span className="font-headline text-3xl font-bold text-primary dark:text-cyan-400 mt-1">
              {loading ? "..." : stats.rolesCount}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-surface-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 flex items-center justify-center text-primary dark:text-cyan-400">
            <Shield className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-sans text-xs text-on-surface-variant dark:text-slate-400 font-semibold uppercase tracking-wider">
              Artikel Berita &amp; Promo
            </span>
            <span className="font-headline text-3xl font-bold text-primary dark:text-cyan-400 mt-1">
              {loading ? "..." : stats.newsCount}
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-surface-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 flex items-center justify-center text-primary dark:text-cyan-400">
            <Newspaper className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Columns: Quick Actions & Change Password Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Quick Actions */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <h2 className="font-headline text-lg font-bold text-on-surface dark:text-white">
            Aksi Cepat
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/dashboard/news"
              className="p-5 rounded-2xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 hover:border-secondary-container dark:hover:border-cyan-400/50 shadow-sm transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-low dark:bg-cyan-950/80 flex items-center justify-center text-primary dark:text-cyan-400">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                    Kelola Berita &amp; Promo
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                    Tambah artikel atau promo flash sale
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary dark:text-cyan-400">
                <span>Buka CRUD</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/dashboard/users"
              className="p-5 rounded-2xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 hover:border-secondary-container dark:hover:border-cyan-400/50 shadow-sm transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-low dark:bg-cyan-950/80 flex items-center justify-center text-primary dark:text-cyan-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                    Manajemen Pengguna
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                    Ubah role &amp; status akun pengguna
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary dark:text-cyan-400">
                <span>Buka User</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <Link
              href="/dashboard/roles"
              className="p-5 rounded-2xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 hover:border-secondary-container dark:hover:border-cyan-400/50 shadow-sm transition-all flex flex-col justify-between gap-4 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-low dark:bg-cyan-950/80 flex items-center justify-center text-primary dark:text-cyan-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                    Manajemen Role
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                    Atur izin role admin &amp; pelanggan
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-primary dark:text-cyan-400">
                <span>Buka Role</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-surface-low dark:bg-cyan-950/80 flex items-center justify-center text-primary dark:text-cyan-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-headline text-sm font-bold text-on-surface dark:text-white">
                    Status Google Sheet
                  </h3>
                  <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                    File <code className="font-mono">code.gs</code> &amp; <code className="font-mono">setup.gs</code> siap
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Lihat Panduan di SETUP.md</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Ganti Password Form */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <h2 className="font-headline text-lg font-bold text-on-surface dark:text-white">
            Ganti Kata Sandi Admin
          </h2>

          <form
            onSubmit={handleChangePassword}
            className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-on-surface-variant dark:text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Ketik kata sandi baru (min 6 karakter)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
                />
              </div>
            </div>

            {passwordFeedback && (
              <div
                className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  passwordFeedback.type === "success"
                    ? "bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300"
                    : "bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-500/40 text-red-800 dark:text-red-300"
                }`}
              >
                {passwordFeedback.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                )}
                <span>{passwordFeedback.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={passwordLoading}
              className="w-full py-2.5 rounded-xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline text-xs sm:text-sm font-semibold dark:font-bold hover:bg-primary transition-all flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm"
            >
              {passwordLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>Simpan Kata Sandi Baru</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
