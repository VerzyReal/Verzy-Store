"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ArrowLeft, Lock, Mail, ShieldAlert, Loader2, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const forbiddenError = searchParams.get("error") === "forbidden";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    forbiddenError ? "Akses ditolak: Hanya akun administrator yang dapat membuka dashboard." : ""
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal masuk");
      }

      // Berhasil login
      if (data.user.role === "admin") {
        router.push(redirect);
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-[#121929] rounded-3xl p-8 shadow-xl dark:shadow-[0_0_35px_rgba(0,210,255,0.18)] border border-surface-container-high dark:border-cyan-500/30 relative z-10">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary dark:text-cyan-400 hover:text-primary-container dark:hover:text-cyan-300 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm ring-1 ring-primary/20 dark:ring-cyan-500/30">
          <Image
            src={siteConfig.logo}
            alt={siteConfig.name}
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-white">Masuk Akun</h1>
          <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
            Dashboard Admin &amp; Pelanggan {siteConfig.name}
          </p>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-500/40 text-red-700 dark:text-red-300 text-xs font-medium flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">Email</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-on-surface-variant dark:text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">Kata Sandi</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-on-surface-variant dark:text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline text-sm font-semibold dark:font-bold hover:bg-primary shadow-glow dark:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Memproses...</span>
            </>
          ) : (
            <span>Masuk Sekarang</span>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-surface-container-high dark:border-cyan-500/20 text-center">
        <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="font-bold text-primary dark:text-cyan-400 hover:underline inline-flex items-center gap-0.5"
          >
            <span>Daftar Akun Baru</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-[#0a0e18] flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Background Glows */}
      <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-secondary-container/20 dark:bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-fixed/30 dark:bg-blue-600/15 blur-3xl pointer-events-none" />

      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      <Suspense
        fallback={
          <div className="p-12 text-center text-sm text-on-surface-variant dark:text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary-container dark:text-cyan-400" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
