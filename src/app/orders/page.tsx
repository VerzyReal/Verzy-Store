"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  MessageCircle,
  Gamepad2,
  Search,
  Filter,
  Loader2,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function UserOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.status === 401) {
        router.push("/login?redirect=/orders");
        return;
      }
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Gagal memuat pesanan:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      filterStatus === "all" || order.status === filterStatus;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.game_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user_game_id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-surface dark:bg-[#0a0e18] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-surface-container-high dark:border-cyan-500/20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-secondary-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 text-on-secondary-container dark:text-cyan-300 font-sans text-xs font-bold uppercase tracking-wider">
                RIWAYAT TRANSAKSI
              </span>
            </div>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface dark:text-white">
              Pesanan Top Up Anda
            </h1>
            <p className="font-sans text-sm text-on-surface-variant dark:text-slate-400 mt-1">
              Pantau status verifikasi dan pembayaran tiket top up game Anda di sini.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setRefreshing(true);
                fetchOrders();
              }}
              disabled={refreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 text-on-surface dark:text-slate-200 text-xs sm:text-sm font-semibold hover:border-primary-container dark:hover:border-cyan-400 transition-all shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-cyan-400" : ""}`} />
              <span>Segarkan</span>
            </button>
            <Link
              href="/order"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-white dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] dark:text-slate-950 dark:font-bold font-headline text-xs sm:text-sm font-semibold shadow-glow dark:shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-cyan transition-all"
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Top Up Baru</span>
            </Link>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "Semua Pesanan" },
              { id: "menunggu_konfirmasi", label: "Menunggu Konfirmasi" },
              { id: "dikonfirmasi", label: "Dikonfirmasi" },
              { id: "dibatalkan", label: "Dibatalkan" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterStatus(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  filterStatus === tab.id
                    ? "bg-primary-container text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:border dark:border-cyan-500/40 dark:shadow-[0_0_12px_rgba(0,210,255,0.2)] shadow-sm"
                    : "bg-surface-container-low dark:bg-[#121929] text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white dark:border dark:border-cyan-500/15"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400" />
            <input
              type="text"
              placeholder="Cari ID tiket atau Game..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 text-xs sm:text-sm text-on-surface dark:text-white placeholder:text-on-surface-variant/60 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary-container dark:focus:border-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Content Section */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-container dark:text-cyan-400 mb-3" />
            <span className="font-headline text-sm font-bold text-on-surface dark:text-white">
              Memuat Riwayat Pesanan...
            </span>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-16 px-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-surface-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 flex items-center justify-center text-primary dark:text-cyan-400 mx-auto mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-headline text-lg font-bold text-on-surface dark:text-white">
              {orders.length === 0 ? "Belum Ada Pesanan" : "Tidak Ada Pesanan Sesuai Filter"}
            </h3>
            <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400 mt-2 mb-6 max-w-sm mx-auto">
              {orders.length === 0
                ? "Anda belum pernah melakukan pemesanan top up game. Pilih game favorit Anda dan lakukan top up sekarang!"
                : "Tidak ditemukan transaksi yang cocok dengan kata kunci atau filter status yang dipilih."}
            </p>
            {orders.length === 0 && (
              <Link
                href="/order"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-container text-white dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] dark:text-slate-950 dark:font-bold font-headline text-sm font-semibold shadow-glow"
              >
                <span>Mulai Top Up Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredOrders.map((order) => {
              const isConfirmed = order.status === "dikonfirmasi";
              const isCancelled = order.status === "dibatalkan";
              const isPending = order.status === "menunggu_konfirmasi";

              const waText = encodeURIComponent(
                `Halo Admin Verzy Store, saya ingin menanyakan status pesanan saya dengan nomor tiket #${order.id} (${order.game_name} - ${order.item_name}). Terima kasih!`
              );

              return (
                <div
                  key={order.id}
                  className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 shadow-sm hover:border-secondary-container dark:hover:border-cyan-400/40 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  {/* Left Column: Game & Order details */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-2xl bg-surface-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 flex items-center justify-center text-primary dark:text-cyan-400 shrink-0">
                      <Gamepad2 className="w-6 h-6" />
                    </div>

                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs font-bold text-primary dark:text-cyan-400 bg-surface-container-low dark:bg-cyan-950/40 px-2 py-0.5 rounded-lg border border-surface-container-high dark:border-cyan-500/20">
                          #{order.id}
                        </span>
                        <button
                          onClick={() => handleCopy(order.id)}
                          className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-cyan-300 transition-colors p-1"
                          title="Salin nomor tiket"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        {copiedId === order.id && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                            Tersalin!
                          </span>
                        )}

                        <span className="text-xs text-on-surface-variant dark:text-slate-400">
                          • {order.created_at ? new Date(order.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }) : "-"}
                        </span>
                      </div>

                      <h3 className="font-headline text-base sm:text-lg font-bold text-on-surface dark:text-white">
                        {order.game_name} —{" "}
                        <span className="text-primary-container dark:text-cyan-300">
                          {order.item_name}
                        </span>
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-on-surface-variant dark:text-slate-400 mt-1">
                        <div>
                          <span className="font-semibold text-on-surface dark:text-slate-300">
                            User ID:
                          </span>{" "}
                          <span className="font-mono font-bold text-primary dark:text-cyan-400">
                            {order.user_game_id}
                          </span>
                          {order.zone_id && ` (${order.zone_id})`}
                        </div>
                        {order.nickname && (
                          <div>
                            <span className="font-semibold text-on-surface dark:text-slate-300">
                              Nick:
                            </span>{" "}
                            <span>{order.nickname}</span>
                          </div>
                        )}
                        <div>
                          <span className="font-semibold text-on-surface dark:text-slate-300">
                            WhatsApp:
                          </span>{" "}
                          <span>{order.whatsapp}</span>
                        </div>
                      </div>

                      {order.rejection_reason && (
                        <div className="mt-2 text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 p-2.5 rounded-xl border border-rose-200 dark:border-rose-500/20">
                          <span className="font-bold">Alasan Dibatalkan:</span>{" "}
                          {order.rejection_reason}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Status & Actions */}
                  <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row items-start sm:items-center md:items-end lg:items-center justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-surface-container-high dark:border-cyan-500/10">
                    <div className="flex flex-col md:items-end">
                      <span className="font-sans text-[11px] text-on-surface-variant dark:text-slate-400 uppercase font-semibold">
                        Total Pembayaran
                      </span>
                      <span className="font-headline text-lg sm:text-xl font-bold text-on-surface dark:text-white">
                        Rp {order.price ? order.price.toLocaleString("id-ID") : 0}
                      </span>

                      {/* Status Badge */}
                      <div className="mt-1.5">
                        {isConfirmed && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border dark:border-emerald-500/30">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                            <span>Dikonfirmasi &amp; Masuk</span>
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 dark:border dark:border-amber-500/30">
                            <Clock className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                            <span>Menunggu Konfirmasi</span>
                          </span>
                        )}
                        {isCancelled && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300 dark:border dark:border-rose-500/30">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                            <span>Dibatalkan</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Link
                        href={`/order/${order.id}/payment`}
                        className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container dark:bg-cyan-950/70 dark:border dark:border-cyan-500/30 text-primary dark:text-cyan-300 hover:bg-primary-container hover:text-white dark:hover:bg-cyan-500/20 text-xs sm:text-sm font-semibold transition-all shadow-sm"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Tiket QRIS</span>
                      </Link>

                      <a
                        href={`https://wa.me/6281299887722?text=${waText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2.5 rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border dark:border-emerald-500/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-colors"
                        title="Chat CS WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
