"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  MessageCircle,
  Search,
  Filter,
  Loader2,
  Check,
  X,
  RefreshCw,
  Phone,
  Gamepad2,
} from "lucide-react";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Modal Pembatalan / Penolakan
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedOrderForReject, setSelectedOrderForReject] = useState<any | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error("Gagal memuat pesanan:", err);
      setFeedback({ type: "error", text: "Gagal memuat data pesanan" });
    } finally {
      setLoading(false);
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

  const handleUpdateStatus = async (id: string, newStatus: string, reason?: string) => {
    setProcessingId(id);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: newStatus,
          rejection_reason: reason || "",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Gagal mengubah status pesanan");
      }

      setFeedback({
        type: "success",
        text: `Pesanan #${id} berhasil diubah ke status: ${newStatus.replace("_", " ")}`,
      });

      // Update state locally
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? { ...o, status: newStatus, rejection_reason: reason || o.rejection_reason }
            : o
        )
      );

      // Close modal if open
      setRejectModalOpen(false);
      setSelectedOrderForReject(null);
      setRejectionReason("");
    } catch (err: any) {
      setFeedback({ type: "error", text: err.message });
    } finally {
      setProcessingId(null);
    }
  };

  const openRejectModal = (order: any) => {
    setSelectedOrderForReject(order);
    setRejectionReason("");
    setRejectModalOpen(true);
  };

  const counts = {
    all: orders.length,
    menunggu_konfirmasi: orders.filter((o) => o.status === "menunggu_konfirmasi").length,
    dikonfirmasi: orders.filter((o) => o.status === "dikonfirmasi").length,
    dibatalkan: orders.filter((o) => o.status === "dibatalkan").length,
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.game_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user_game_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.whatsapp.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface dark:text-white flex items-center gap-2.5">
            <ShoppingBag className="w-7 h-7 text-primary dark:text-cyan-400" />
            <span>Manajemen Pesanan Masuk</span>
          </h1>
          <p className="font-sans text-sm text-on-surface-variant dark:text-slate-400 mt-1">
            Verifikasi dan perbarui status pesanan top up QRIS dari pelanggan.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 text-on-surface dark:text-slate-200 text-xs sm:text-sm font-semibold hover:border-primary-container dark:hover:border-cyan-400 transition-all shadow-sm self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-cyan-400" : ""}`} />
          <span>Muat Ulang</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div
          className={`p-4 rounded-2xl border text-sm flex items-center justify-between animate-in fade-in ${
            feedback.type === "success"
              ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300"
              : "bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-500/30 text-rose-800 dark:text-rose-300"
          }`}
        >
          <div className="flex items-center gap-2">
            {feedback.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            )}
            <span className="font-medium">{feedback.text}</span>
          </div>
          <button
            onClick={() => setFeedback(null)}
            className="p-1 hover:opacity-75 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "Semua", count: counts.all },
            {
              id: "menunggu_konfirmasi",
              label: "Menunggu",
              count: counts.menunggu_konfirmasi,
              badgeClass: "bg-amber-500 text-slate-950",
            },
            {
              id: "dikonfirmasi",
              label: "Dikonfirmasi",
              count: counts.dikonfirmasi,
              badgeClass: "bg-emerald-500 text-slate-950",
            },
            {
              id: "dibatalkan",
              label: "Dibatalkan",
              count: counts.dibatalkan,
              badgeClass: "bg-rose-500 text-white",
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                statusFilter === tab.id
                  ? "bg-primary-container text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:border dark:border-cyan-500/40 dark:shadow-[0_0_12px_rgba(0,210,255,0.2)] shadow-sm"
                  : "bg-white dark:bg-[#121929] text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white border border-surface-container-high dark:border-cyan-500/15"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  tab.badgeClass || "bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-300"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant dark:text-slate-400" />
          <input
            type="text"
            placeholder="Cari ID tiket, user ID, WhatsApp..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 text-xs sm:text-sm text-on-surface dark:text-white placeholder:text-on-surface-variant/60 dark:placeholder:text-slate-500 focus:outline-none focus:border-primary-container dark:focus:border-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-[#121929] rounded-3xl border border-surface-container-high dark:border-cyan-500/20 shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary-container dark:text-cyan-400 mb-3" />
            <span className="font-headline text-sm font-bold text-on-surface dark:text-white">
              Memuat Data Pesanan...
            </span>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-20 text-center px-4">
            <ShoppingBag className="w-12 h-12 text-on-surface-variant/40 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="font-headline text-base font-bold text-on-surface dark:text-white">
              Tidak Ada Pesanan Ditemukan
            </h3>
            <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400 mt-1">
              {orders.length === 0
                ? "Belum ada pesanan yang masuk ke database."
                : "Tidak ada pesanan yang cocok dengan kriteria filter atau pencarian Anda."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-surface-container-high dark:border-cyan-500/15 bg-surface-container-low/50 dark:bg-[#0a0e18]/50 text-on-surface-variant dark:text-slate-400 font-semibold">
                  <th className="py-3.5 px-4">Tiket &amp; Tanggal</th>
                  <th className="py-3.5 px-4">Game &amp; Paket</th>
                  <th className="py-3.5 px-4">Akun Tujuan</th>
                  <th className="py-3.5 px-4">WhatsApp</th>
                  <th className="py-3.5 px-4">Nominal</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Aksi Verifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high/60 dark:divide-cyan-500/10">
                {filteredOrders.map((order) => {
                  const isPending = order.status === "menunggu_konfirmasi";
                  const isConfirmed = order.status === "dikonfirmasi";
                  const isCancelled = order.status === "dibatalkan";
                  const isBusy = processingId === order.id;

                  const waChatUrl = `https://wa.me/${order.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Halo dari Admin Verzy Store, terkait pesanan tiket #${order.id} (${order.game_name} - ${order.item_name})...`
                  )}`;

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-surface-container-low/30 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      {/* Ticket & Time */}
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-primary dark:text-cyan-400 text-xs">
                            #{order.id}
                          </span>
                          <button
                            onClick={() => handleCopy(order.id)}
                            className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-cyan-300 transition-colors"
                            title="Salin ID"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        {copiedId === order.id && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">
                            Tersalin!
                          </span>
                        )}
                        <span className="text-[11px] text-on-surface-variant dark:text-slate-500 block mt-0.5">
                          {order.created_at
                            ? new Date(order.created_at).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </span>
                        <Link
                          href={`/order/${order.id}/payment`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline mt-1"
                        >
                          <span>Lihat Tiket QRIS</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>

                      {/* Game & Item */}
                      <td className="py-4 px-4 align-top">
                        <div className="font-headline font-bold text-on-surface dark:text-white">
                          {order.game_name}
                        </div>
                        <div className="text-xs text-primary-container dark:text-cyan-300 font-semibold mt-0.5">
                          {order.item_name}
                        </div>
                      </td>

                      {/* User Account */}
                      <td className="py-4 px-4 align-top">
                        <div className="font-mono text-xs font-bold text-on-surface dark:text-slate-200">
                          {order.user_game_id}
                          {order.zone_id && (
                            <span className="text-on-surface-variant dark:text-slate-400 ml-1">
                              ({order.zone_id})
                            </span>
                          )}
                        </div>
                        {order.nickname && (
                          <div className="text-[11px] text-on-surface-variant dark:text-slate-400 mt-0.5">
                            Nick: {order.nickname}
                          </div>
                        )}
                      </td>

                      {/* WhatsApp */}
                      <td className="py-4 px-4 align-top">
                        <a
                          href={waChatUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 transition-colors text-xs font-medium"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{order.whatsapp}</span>
                        </a>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 align-top">
                        <div className="font-headline font-bold text-on-surface dark:text-white text-xs sm:text-sm">
                          Rp {order.price ? order.price.toLocaleString("id-ID") : 0}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 align-top">
                        {isConfirmed && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            <span>Dikonfirmasi</span>
                          </span>
                        )}
                        {isPending && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
                            <Clock className="w-3 h-3 text-amber-500" />
                            <span>Menunggu</span>
                          </span>
                        )}
                        {isCancelled && (
                          <div>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border border-rose-300 dark:border-rose-500/30">
                              <AlertCircle className="w-3 h-3 text-rose-500" />
                              <span>Dibatalkan</span>
                            </span>
                            {order.rejection_reason && (
                              <p className="text-[10px] text-rose-600 dark:text-rose-400 mt-1 max-w-[140px] truncate" title={order.rejection_reason}>
                                {order.rejection_reason}
                              </p>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isPending ? (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(order.id, "dikonfirmasi")}
                                disabled={isBusy}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-headline text-xs font-semibold shadow-sm transition-all disabled:opacity-50"
                                title="Konfirmasi & masukkan diamond"
                              >
                                {isBusy ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Check className="w-3.5 h-3.5" />
                                )}
                                <span>Konfirmasi</span>
                              </button>

                              <button
                                onClick={() => openRejectModal(order)}
                                disabled={isBusy}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 font-headline text-xs font-semibold transition-all disabled:opacity-50"
                                title="Tolak / batalkan pesanan"
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>Tolak</span>
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleUpdateStatus(order.id, isConfirmed ? "menunggu_konfirmasi" : "dikonfirmasi")}
                                disabled={isBusy}
                                className="text-[11px] text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white underline p-1 disabled:opacity-50"
                              >
                                {isConfirmed ? "Ubah ke Menunggu" : "Ubah ke Konfirmasi"}
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Tolak Pesanan */}
      {rejectModalOpen && selectedOrderForReject && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#121929] rounded-3xl border border-surface-container-high dark:border-cyan-500/30 shadow-2xl p-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high dark:border-cyan-500/20">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-headline font-bold text-base">
                <AlertCircle className="w-5 h-5" />
                <span>Tolak / Batalkan Pesanan</span>
              </div>
              <button
                onClick={() => setRejectModalOpen(false)}
                className="text-on-surface-variant dark:text-slate-400 hover:text-on-surface p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 flex flex-col gap-3">
              <p className="text-xs text-on-surface dark:text-slate-300">
                Apakah Anda yakin ingin membatalkan pesanan tiket{" "}
                <span className="font-mono font-bold text-primary dark:text-cyan-400">
                  #{selectedOrderForReject.id}
                </span>{" "}
                ({selectedOrderForReject.game_name} - {selectedOrderForReject.item_name})?
              </p>

              <div>
                <label className="block text-xs font-semibold text-on-surface dark:text-slate-300 mb-1">
                  Alasan Pembatalan (Akan tampil pada status tiket pembeli):
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Contoh: Bukti QRIS tidak terverifikasi, nominal transfer tidak sesuai, atau User ID game salah."
                  rows={3}
                  className="w-full p-3 rounded-xl bg-surface-container-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/20 text-xs text-on-surface dark:text-white focus:outline-none focus:border-rose-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container-high dark:border-cyan-500/20">
              <button
                type="button"
                onClick={() => setRejectModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-surface-container dark:bg-slate-800 text-on-surface dark:text-slate-300 text-xs font-semibold"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={() =>
                  handleUpdateStatus(
                    selectedOrderForReject.id,
                    "dibatalkan",
                    rejectionReason || "Pesanan dibatalkan oleh admin"
                  )
                }
                disabled={processingId !== null}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-headline text-xs font-semibold shadow-sm transition-all"
              >
                {processingId ? "Memproses..." : "Ya, Tolak Pesanan"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
