import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gamepad2, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface dark:bg-[#0a0e18] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="max-w-md w-full text-center p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/30 shadow-xl dark:shadow-[0_0_40px_rgba(0,210,255,0.15)] flex flex-col items-center">
          <div className="w-20 h-20 rounded-3xl bg-surface-container dark:bg-cyan-950/80 border border-transparent dark:border-cyan-500/40 flex items-center justify-center text-primary dark:text-cyan-400 mb-6 shadow-glow">
            <Gamepad2 className="w-10 h-10 animate-bounce" />
          </div>

          <span className="font-mono text-5xl font-black text-primary dark:text-cyan-400 tracking-wider">
            404
          </span>

          <h1 className="font-headline text-2xl font-bold text-on-surface dark:text-white mt-3 mb-2">
            Halaman Tidak Ditemukan
          </h1>

          <p className="font-sans text-xs sm:text-sm text-on-surface-variant dark:text-slate-400 leading-relaxed mb-8">
            Waduh! Rute yang Anda cari mungkin telah dipindahkan, dihapus, atau sedang dalam pemeliharaan server.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <Link
              href="/"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary-container text-white dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] dark:text-slate-950 dark:font-bold font-headline text-xs sm:text-sm font-semibold shadow-glow hover:shadow-cyan transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Kembali ke Beranda</span>
            </Link>
            <Link
              href="/order"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-surface-container dark:bg-cyan-950/70 border border-surface-container-high dark:border-cyan-500/30 text-primary dark:text-cyan-300 font-headline text-xs sm:text-sm font-semibold hover:border-cyan-400 transition-all"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Katalog Top Up</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

