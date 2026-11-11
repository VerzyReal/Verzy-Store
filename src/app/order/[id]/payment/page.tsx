"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  MessageCircle,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Download,
  Loader2,
} from "lucide-react";

export default function OrderPaymentPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const orderId = params.id;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      const data = await res.json();
      if (data.order) {
        setOrder(data.order);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrder();
    // Auto-refresh status every 10 seconds to check if admin confirmed
    const interval = setInterval(fetchOrder, 10000);
    return () => clearInterval(interval);
  }, [orderId]);

  const handleCopyTicket = () => {
    if (order) {
      navigator.clipboard.writeText(order.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface dark:bg-[#0a0e18] flex flex-col justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-container dark:text-cyan-400" />
        <span className="text-sm font-headline font-bold text-on-surface dark:text-white mt-3">
          Memuat Tiket Pembayaran...
        </span>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-surface dark:bg-[#0a0e18] flex flex-col justify-center items-center px-4">
        <div className="p-8 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h1 className="font-headline text-xl font-bold text-on-surface dark:text-white">
            Tiket Pesanan Tidak Ditemukan
          </h1>
          <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400 mt-2 mb-6">
            Nomor pesanan mungkin tidak valid atau Anda belum masuk dengan akun pemesan.
          </p>
          <Link
            href="/order"
            className="px-6 py-2.5 rounded-xl bg-primary-container text-white font-headline text-sm font-semibold"
          >
            Buat Pesanan Baru
          </Link>
        </div>
      </div>
    );
  }

  const isConfirmed = order.status === "dikonfirmasi";
  const isCancelled = order.status === "dibatalkan";
  const isPending = order.status === "menunggu_konfirmasi";

  const waConfirmText = encodeURIComponent(
    `Halo Admin Verzy Store, saya sudah melakukan pembayaran QRIS untuk tiket #${order.id}.\n\nDetail:\n- Game: ${order.game_name}\n- User ID: ${order.user_game_id} ${order.zone_id ? `(${order.zone_id})` : ""}\n- Item: ${order.item_name}\n- Total: Rp ${order.price.toLocaleString("id-ID")}\n\nMohon bantuannya untuk diproses. Terima kasih!`
  );

  return (
    <div className="min-h-screen bg-surface dark:bg-[#0a0e18] flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
          {/* Status Header Alert */}
          {isPending && (
            <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                <div>
                  <h2 className="font-headline text-base font-bold text-amber-900 dark:text-amber-200">
                    Menunggu Konfirmasi Pembayaran
                  </h2>
                  <p className="font-sans text-xs text-amber-800 dark:text-amber-300/90 mt-0.5">
                    Silakan selesaikan pembayaran melalui scan QRIS di bawah ini. Status akan otomatis diperbarui setelah admin mengonfirmasi.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setRefreshing(true);
                  fetchOrder();
                }}
                disabled={refreshing}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-500/40 text-xs font-bold text-amber-900 dark:text-amber-300 shrink-0 shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} />
                <span>Perbarui Status</span>
              </button>
            </div>
          )}

          {isConfirmed && (
            <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-500/40 flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-headline text-lg font-bold text-emerald-900 dark:text-emerald-200">
                  Selamat, Pembayaran Anda Telah Dikonfirmasi!
                </h2>
                <p className="font-sans text-sm text-emerald-800 dark:text-emerald-300 mt-1 leading-relaxed">
                  Diamond / voucher item Anda telah berhasil diproses ke akun game{" "}
                  <strong>{order.user_game_id}</strong>. Silakan periksa akun game Anda atau hubungi admin jika membutuhkan bantuan lebih lanjut.
                </p>
              </div>
            </div>
          )}

          {isCancelled && (
            <div className="p-6 rounded-3xl bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-500/40 flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div>
                <h2 className="font-headline text-lg font-bold text-red-900 dark:text-red-200">
                  Pesanan Dibatalkan
                </h2>
                <p className="font-sans text-sm text-red-800 dark:text-red-300 mt-1">
                  Alasan pembatalan:{" "}
                  <strong>{order.rejection_reason || "Pembayaran tidak diterima atau dibatalkan oleh admin."}</strong>
                </p>
              </div>
            </div>
          )}

          {/* Main Payment & Ticket Card */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: QRIS Card */}
            <div className="md:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/30 p-6 shadow-xl flex flex-col items-center gap-4">
                <span className="font-headline text-sm font-bold text-on-surface dark:text-white uppercase tracking-wider">
                  Scan QRIS Pembayaran
                </span>

                <div className="w-full relative rounded-2xl overflow-hidden border border-surface-container-high dark:border-cyan-500/20 bg-white">
                  <Image
                    src="/images/qris-dummy.svg"
                    alt="QRIS Barcode Verzy Store"
                    width={400}
                    height={520}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>

                <div className="w-full flex items-center justify-between text-xs text-on-surface-variant dark:text-slate-400 pt-2 border-t border-surface-container-high/60 dark:border-cyan-500/15">
                  <a
                    href="/images/qris-dummy.svg"
                    download={`QRIS-VerzyStore-${order.id}.svg`}
                    className="inline-flex items-center gap-1.5 font-bold text-primary dark:text-cyan-400 hover:underline"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Unduh Barcode</span>
                  </a>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">Verifikasi 24/7</span>
                </div>
              </div>
            </div>

            {/* Right: Order Ticket Details & Actions */}
            <div className="md:col-span-6 flex flex-col gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/30 shadow-sm flex flex-col gap-5">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container-high/60 dark:border-cyan-500/20">
                  <div>
                    <span className="font-sans text-[11px] text-on-surface-variant dark:text-slate-400 uppercase font-semibold">
                      Nomor Tiket Pesanan
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-headline text-xl font-bold text-primary dark:text-cyan-400">
                        #{order.id}
                      </span>
                      <button
                        onClick={handleCopyTicket}
                        className="p-1 rounded-lg text-on-surface-variant hover:text-primary dark:text-slate-400 dark:hover:text-cyan-300"
                        title="Salin Nomor Tiket"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      isConfirmed
                        ? "bg-emerald-500 text-white"
                        : isCancelled
                        ? "bg-red-500 text-white"
                        : "bg-amber-500 text-white"
                    }`}
                  >
                    {isConfirmed
                      ? "Dikonfirmasi"
                      : isCancelled
                      ? "Dibatalkan"
                      : "Menunggu"}
                  </span>
                </div>

                {copied && (
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ Nomor tiket berhasil disalin ke clipboard!
                  </div>
                )}

                {/* Ticket Attributes */}
                <div className="flex flex-col gap-3 text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant dark:text-slate-400">Judul Game:</span>
                    <span className="font-bold text-on-surface dark:text-white">{order.game_name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant dark:text-slate-400">Paket Item:</span>
                    <span className="font-bold text-on-surface dark:text-white">{order.item_name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant dark:text-slate-400">User ID &amp; Server:</span>
                    <span className="font-mono font-bold text-on-surface dark:text-white">
                      {order.user_game_id} {order.zone_id ? `(${order.zone_id})` : ""}
                    </span>
                  </div>

                  {order.nickname && (
                    <div className="flex items-center justify-between">
                      <span className="text-on-surface-variant dark:text-slate-400">Nickname:</span>
                      <span className="font-bold text-on-surface dark:text-white">{order.nickname}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-on-surface-variant dark:text-slate-400">WhatsApp:</span>
                    <span className="font-bold text-on-surface dark:text-white">{order.whatsapp}</span>
                  </div>

                  <div className="pt-3 border-t border-surface-container-high/60 dark:border-cyan-500/20 flex items-center justify-between">
                    <span className="font-headline text-base font-bold text-on-surface dark:text-white">
                      Total Tagihan:
                    </span>
                    <span className="font-headline text-2xl font-bold text-primary-container dark:text-cyan-400">
                      Rp {order.price.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-surface-container-high/60 dark:border-cyan-500/20 flex flex-col gap-3">
                  <a
                    href={`https://wa.me/6281299887722?text=${waConfirmText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-2xl bg-emerald-600 text-white font-headline text-sm font-semibold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Konfirmasi Cepat via WhatsApp</span>
                  </a>

                  <Link
                    href="/orders"
                    className="w-full py-3 rounded-2xl bg-surface-low dark:bg-slate-800 border border-surface-container-high dark:border-cyan-500/30 text-on-surface dark:text-white font-headline text-xs sm:text-sm font-semibold hover:bg-surface-container text-center flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Cek Daftar di Pesanan Anda</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="flex items-center gap-2 p-4 rounded-2xl bg-surface-low dark:bg-[#121929] border border-surface-container-high/60 dark:border-cyan-500/20 text-xs text-on-surface-variant dark:text-slate-400">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  Admin Verzy Store memverifikasi transaksi 24 jam non-stop. Simpan nomor tiket pesanan Anda.
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

