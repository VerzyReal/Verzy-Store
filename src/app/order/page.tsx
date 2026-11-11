"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { siteConfig, TopUpPackage } from "@/config/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Zap,
  CheckCircle2,
  ShieldCheck,
  HelpCircle,
  ArrowRight,
  Loader2,
  AlertCircle,
  User,
  LogIn,
} from "lucide-react";

function OrderForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialGameId = searchParams.get("game") || "mlbb";

  const [selectedGameId, setSelectedGameId] = useState<string>(initialGameId);
  const [selectedPackage, setSelectedPackage] = useState<TopUpPackage | null>(null);
  const [userGameId, setUserGameId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [nickname, setNickname] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const currentGame =
    siteConfig.games.find((g) => g.id === selectedGameId) || siteConfig.games[0];
  const packages = siteConfig.gamePackages[selectedGameId] || siteConfig.gamePackages.mlbb;

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .finally(() => setLoadingUser(false));
  }, []);

  useEffect(() => {
    // Set default package when game changes
    if (packages && packages.length > 0) {
      setSelectedPackage(packages[0]);
    }
  }, [selectedGameId]);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!currentUser) {
      // Redirect to login with return path
      router.push(`/login?redirect=/order?game=${selectedGameId}`);
      return;
    }

    if (!selectedPackage) {
      setErrorMessage("Silakan pilih paket nominal top up terlebih dahulu.");
      return;
    }

    if (!userGameId.trim()) {
      setErrorMessage("User ID Game wajib diisi.");
      return;
    }

    if (!whatsapp.trim() || whatsapp.trim().length < 8) {
      setErrorMessage("Nomor WhatsApp wajib diisi dengan benar.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game_id: currentGame.id,
          game_name: currentGame.name,
          item_name: selectedPackage.name,
          price: selectedPackage.price,
          user_game_id: userGameId.trim(),
          zone_id: zoneId.trim(),
          nickname: nickname.trim(),
          whatsapp: whatsapp.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal membuat pesanan.");
      }

      // Redirect ke halaman pembayaran tiket
      router.push(`/order/${data.order.id}/payment`);
    } catch (err: any) {
      setErrorMessage(err.message);
      setSubmitting(false);
    }
  };

  const needsZoneId = selectedGameId === "mlbb" || selectedGameId === "genshin";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Stepper Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-surface-container-high/60 dark:border-cyan-500/20">
        <div>
          <span className="px-3.5 py-1 rounded-full bg-secondary-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 text-on-secondary-container dark:text-cyan-300 font-sans text-xs font-bold uppercase tracking-wider">
            SISTEM TRANSAKSI OTOMATIS
          </span>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface dark:text-white mt-1">
            Form Pemesanan Top-Up Game
          </h1>
        </div>

        {/* 3 Steps Indicator */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs font-headline font-bold">
          <div className="flex items-center gap-1.5 text-primary-container dark:text-cyan-400">
            <span className="w-6 h-6 rounded-full bg-primary-container dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center text-xs">
              1
            </span>
            <span>Input ID</span>
          </div>
          <span className="text-surface-container-high dark:text-slate-700">──</span>
          <div className="flex items-center gap-1.5 text-primary-container dark:text-cyan-400">
            <span className="w-6 h-6 rounded-full bg-primary-container dark:bg-cyan-400 text-white dark:text-slate-950 flex items-center justify-center text-xs">
              2
            </span>
            <span>Pilih Nominal</span>
          </div>
          <span className="text-surface-container-high dark:text-slate-700">──</span>
          <div className="flex items-center gap-1.5 text-on-surface-variant dark:text-slate-500">
            <span className="w-6 h-6 rounded-full bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-400 flex items-center justify-center text-xs">
              3
            </span>
            <span>Bayar QRIS</span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-500/40 text-red-800 dark:text-red-300 text-xs sm:text-sm font-medium flex items-center gap-2.5">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Form & Sticky Summary Layout */}
      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Content */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          {/* STEP 1: Pilih Game */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-xl bg-primary-container/10 dark:bg-cyan-500/20 text-primary-container dark:text-cyan-400 flex items-center justify-center font-headline font-bold text-sm">
                1
              </span>
              <h2 className="font-headline text-lg font-bold text-on-surface dark:text-white">
                Pilih Judul Game / Voucher
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {siteConfig.games.map((g) => {
                const isSelected = selectedGameId === g.id;
                return (
                  <button
                    type="button"
                    key={g.id}
                    onClick={() => setSelectedGameId(g.id)}
                    className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                      isSelected
                        ? "bg-primary-container/5 dark:bg-cyan-500/10 border-primary-container dark:border-cyan-400 ring-2 ring-primary-container/30 dark:ring-cyan-400/40 shadow-sm"
                        : "bg-surface-low dark:bg-[#0a0e18] border-surface-container-high dark:border-cyan-500/20 hover:border-secondary-container"
                    }`}
                  >
                    <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0">
                      <Image src={g.image} alt={g.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <span className="font-headline text-xs font-bold text-on-surface dark:text-white block truncate">
                        {g.name}
                      </span>
                      <span className="font-sans text-[10px] text-on-surface-variant dark:text-slate-400">
                        {g.startingPrice}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Masukkan ID Akun Game */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-xl bg-primary-container/10 dark:bg-cyan-500/20 text-primary-container dark:text-cyan-400 flex items-center justify-center font-headline font-bold text-sm">
                2
              </span>
              <h2 className="font-headline text-lg font-bold text-on-surface dark:text-white">
                Masukkan Data Akun {currentGame.name}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                  User ID Game <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={userGameId}
                  onChange={(e) => setUserGameId(e.target.value)}
                  placeholder="Contoh: 12345678"
                  className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
                />
              </div>

              {needsZoneId && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                    Server / Zone ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    placeholder="Contoh: 2104"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
                  />
                </div>
              )}

              <div className={needsZoneId ? "sm:col-span-2" : ""}>
                <div className="flex flex-col gap-1.5">
                  <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200 flex items-center gap-1">
                    <span>Nickname Akun (Opsional)</span>
                    <HelpCircle className="w-3.5 h-3.5 text-on-surface-variant dark:text-slate-400" />
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Untuk verifikasi nama profil game Anda"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* STEP 3: Pilih Paket Nominal */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-xl bg-primary-container/10 dark:bg-cyan-500/20 text-primary-container dark:text-cyan-400 flex items-center justify-center font-headline font-bold text-sm">
                3
              </span>
              <h2 className="font-headline text-lg font-bold text-on-surface dark:text-white">
                Pilih Nominal Top Up
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {packages.map((pkg) => {
                const isSelected = selectedPackage?.id === pkg.id;
                return (
                  <button
                    type="button"
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between gap-3 transition-all relative ${
                      isSelected
                        ? "bg-primary-container/5 dark:bg-cyan-500/10 border-primary-container dark:border-cyan-400 ring-2 ring-primary-container/30 dark:ring-cyan-400/40 shadow-md"
                        : "bg-surface-low dark:bg-[#0a0e18] border-surface-container-high dark:border-cyan-500/20 hover:border-secondary-container"
                    }`}
                  >
                    {pkg.bonus && (
                      <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-secondary-container dark:bg-cyan-950 text-on-secondary-container dark:text-cyan-300 font-sans text-[10px] font-bold uppercase shadow-sm">
                        {pkg.bonus}
                      </span>
                    )}
                    <span className="font-headline text-sm font-bold text-on-surface dark:text-white leading-snug">
                      {pkg.name}
                    </span>
                    <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/40 dark:border-cyan-500/10">
                      <span className="font-headline text-sm font-bold text-primary-container dark:text-cyan-400">
                        Rp {pkg.price.toLocaleString("id-ID")}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-primary-container dark:text-cyan-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Kontak WhatsApp Pembeli */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-xl bg-primary-container/10 dark:bg-cyan-500/20 text-primary-container dark:text-cyan-400 flex items-center justify-center font-headline font-bold text-sm">
                4
              </span>
              <h2 className="font-headline text-lg font-bold text-on-surface dark:text-white">
                Nomor WhatsApp untuk Tiket &amp; Konfirmasi
              </h2>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                Nomor WhatsApp Aktif <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Contoh: 081299887722"
                className="w-full px-4 py-2.5 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400"
              />
              <span className="font-sans text-[11px] text-on-surface-variant dark:text-slate-400">
                Bukti transaksi dan konfirmasi dari admin Verzy Store akan dikirimkan ke nomor ini.
              </span>
            </div>
          </div>
        </div>

        {/* Right Sticky Checkout Summary */}
        <div className="lg:col-span-4 sticky top-28 flex flex-col gap-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/30 shadow-lg flex flex-col gap-5">
            <h3 className="font-headline text-lg font-bold text-on-surface dark:text-white pb-3 border-b border-surface-container-high/60 dark:border-cyan-500/20">
              Ringkasan Pembelian
            </h3>

            <div className="flex flex-col gap-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant dark:text-slate-400">Game:</span>
                <span className="font-bold text-on-surface dark:text-white">{currentGame.name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant dark:text-slate-400">Item:</span>
                <span className="font-bold text-on-surface dark:text-white">
                  {selectedPackage?.name || "Belum dipilih"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant dark:text-slate-400">Metode Bayar:</span>
                <span className="inline-flex items-center gap-1 font-bold text-primary dark:text-cyan-400">
                  <span>QRIS Nasional</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary-container dark:bg-cyan-950 text-primary dark:text-cyan-300">
                    INSTAN
                  </span>
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant dark:text-slate-400">Biaya Layanan:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">GRATIS</span>
              </div>

              <div className="pt-3 border-t border-surface-container-high/60 dark:border-cyan-500/20 flex items-center justify-between">
                <span className="font-headline text-base font-bold text-on-surface dark:text-white">
                  Total Bayar:
                </span>
                <span className="font-headline text-xl font-bold text-primary-container dark:text-cyan-400">
                  Rp {(selectedPackage?.price || 0).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* Auth Condition Badge */}
            {!currentUser && (
              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs flex items-start gap-2">
                <LogIn className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  Anda belum masuk akun. Anda akan diarahkan untuk login terlebih dahulu agar pesanan tersimpan di menu <strong>"Pesanan Anda"</strong>.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline text-sm font-semibold dark:font-bold hover:bg-primary shadow-glow dark:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Membuat Tiket Pesanan...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>{currentUser ? "Lanjut ke Pembayaran QRIS" : "Masuk & Lanjut Pembayaran"}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-on-surface-variant dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Garansi 100% Legal &amp; Anti-Banned</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-surface dark:bg-[#0a0e18] flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-20">
        <Suspense
          fallback={
            <div className="p-20 text-center text-sm text-on-surface-variant dark:text-slate-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary-container dark:text-cyan-400" />
              <span className="block mt-2">Memuat halaman pemesanan...</span>
            </div>
          }
        >
          <OrderForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

