import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowLeft, Lock, Mail, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-surface-container-high relative z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-container mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm ring-1 ring-primary/20">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <h1 className="font-headline text-2xl font-bold text-on-surface">Masuk Akun</h1>
            <p className="font-sans text-xs text-on-surface-variant">
              Dashboard Admin &amp; Pelanggan {siteConfig.name}
            </p>
          </div>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-on-surface">Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="admin@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-low border border-surface-container-high text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-bold text-on-surface">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3.5" />
              <input
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-low border border-surface-container-high text-sm focus:outline-none focus:ring-2 focus:ring-primary-container"
              />
            </div>
          </div>

          <button
            type="button"
            className="w-full py-3 rounded-xl bg-primary-container text-white font-headline text-sm font-semibold hover:bg-primary shadow-glow transition-all mt-2"
          >
            Masuk Sekarang
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-surface-container-high flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Sistem autentikasi &amp; database Google Spreadsheet diaktifkan pada <strong>Step 2</strong>.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
