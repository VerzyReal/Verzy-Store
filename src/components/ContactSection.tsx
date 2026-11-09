"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Send, CheckCircle2, MessageCircle, Mail, MapPin, ExternalLink } from "lucide-react";

export default function ContactSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    category: "topup",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setFormData({ name: "", contact: "", category: "topup", message: "" });
    setTimeout(() => {
      setFormSubmitted(false);
    }, 6000);
  };

  return (
    <section id="kontak" className="w-full bg-surface dark:bg-[#0a0e18] py-16 lg:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="px-4 py-1.5 rounded-full bg-secondary-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 text-on-secondary-container dark:text-cyan-300 font-sans text-xs font-bold uppercase tracking-wider dark:shadow-[0_0_10px_rgba(0,210,255,0.15)] self-start">
            PUSAT BANTUAN
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface dark:text-white">
            Punya Pertanyaan atau Kendala Transaksi?
          </h2>
          <p className="font-sans text-base text-on-surface-variant dark:text-slate-300">
            Hubungi tim spesialis kami kapan saja. Kami siap membantu menyelesaikan order top-up Anda dalam hitungan menit.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Info Cards & Contact Form */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* 3 Detail Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={siteConfig.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-white dark:bg-[#121929] border border-surface-container-high/60 dark:border-cyan-500/20 shadow-sm hover:border-secondary-container dark:hover:border-cyan-400/50 transition-colors flex flex-col gap-1 group"
              >
                <div className="flex items-center gap-2 text-primary dark:text-cyan-400 font-sans text-xs font-bold uppercase">
                  <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>WhatsApp CS 24 Jam</span>
                </div>
                <span className="font-headline text-base font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-cyan-300 transition-colors">
                  {siteConfig.contact.whatsapp}
                </span>
                <span className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                  Respon rata-rata &lt; 2 menit
                </span>
              </a>

              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="p-4 rounded-2xl bg-white dark:bg-[#121929] border border-surface-container-high/60 dark:border-cyan-500/20 shadow-sm hover:border-secondary-container dark:hover:border-cyan-400/50 transition-colors flex flex-col gap-1 group"
              >
                <div className="flex items-center gap-2 text-primary dark:text-cyan-400 font-sans text-xs font-bold uppercase">
                  <Mail className="w-4 h-4 text-primary-container dark:text-cyan-400" />
                  <span>Email Resmi</span>
                </div>
                <span className="font-headline text-base font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-cyan-300 transition-colors">
                  {siteConfig.contact.email}
                </span>
                <span className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                  Solusi tiket kendala formal
                </span>
              </a>

              <div className="sm:col-span-2 p-4 rounded-2xl bg-white dark:bg-[#121929] border border-surface-container-high/60 dark:border-cyan-500/20 shadow-sm flex flex-col gap-1">
                <div className="flex items-center gap-2 text-primary dark:text-cyan-400 font-sans text-xs font-bold uppercase">
                  <MapPin className="w-4 h-4 text-primary-container dark:text-cyan-400" />
                  <span>Alamat Kantor Pusat</span>
                </div>
                <p className="font-sans text-sm text-on-surface dark:text-slate-200 font-medium">
                  {siteConfig.contact.office}
                </p>
                <span className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                  {siteConfig.contact.hours}
                </span>
              </div>
            </div>

            {/* Direct Form */}
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high/70 dark:border-cyan-500/25 shadow-sm dark:shadow-[0_0_20px_rgba(0,210,255,0.08)] flex flex-col gap-4"
            >
              <h3 className="font-headline text-lg font-bold text-on-surface dark:text-white">
                Kirim Pesan Langsung ke Helpdesk
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                    Nama Lengkap
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Contoh: Farhan Pratama"
                    className="w-full px-4 py-3 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact" className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                    Email / No. WhatsApp
                  </label>
                  <input
                    id="contact"
                    type="text"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="0812xxxx atau email@domain.com"
                    className="w-full px-4 py-3 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="category" className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                  Kategori Kendala
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400 transition-all"
                >
                  <option value="topup">Top Up Belum Masuk</option>
                  <option value="partnership">Kerjasama Bisnis &amp; Reseller</option>
                  <option value="general">Pertanyaan Umum &amp; Event Promo</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="font-sans text-xs font-bold text-on-surface dark:text-slate-200">
                  Detail Pesan / No. Invoice
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan nomor invoice ID transaksi dan ceritakan kendala Anda..."
                  className="w-full px-4 py-3 rounded-xl bg-surface-low dark:bg-[#0a0e18] border border-surface-container-high dark:border-cyan-500/30 text-on-surface dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-container dark:focus:ring-cyan-400 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline text-sm font-semibold dark:font-bold hover:bg-primary dark:shadow-[0_0_20px_rgba(0,210,255,0.4)] dark:hover:shadow-[0_0_28px_rgba(0,210,255,0.65)] shadow-glow transition-all flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Pesan Sekarang</span>
              </button>

              {formSubmitted && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-sm font-medium flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    Pesan Anda berhasil terkirim! Tim helpdesk kami akan merespons dalam hitungan menit via WhatsApp/Email.
                  </span>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Google Maps Embed Card */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="w-full rounded-3xl bg-white dark:bg-[#121929] border border-surface-container-high/70 dark:border-cyan-500/30 overflow-hidden shadow-lg flex flex-col">
              {/* Maps Header */}
              <div className="p-5 border-b border-surface-container-high/60 dark:border-cyan-500/20 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-primary-container/10 dark:bg-cyan-500/20 flex items-center justify-center text-primary-container dark:text-cyan-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-headline text-base font-bold text-on-surface dark:text-white">
                      Headquarters Verzy Store
                    </h3>
                    <p className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                      Kuningan Barat, Jakarta Selatan
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-transparent dark:border-emerald-400/40 text-emerald-700 dark:text-emerald-300 font-sans text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Buka Sekarang
                </span>
              </div>

              {/* Responsive Google Maps Iframe */}
              <div className="relative w-full h-[360px] sm:h-[420px] bg-surface-container dark:bg-slate-900">
                <iframe
                  title="Lokasi Kantor Pusat Verzy Store di Cyber 2 Tower Jakarta"
                  src={siteConfig.contact.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Maps Footer Action Bar */}
              <div className="p-5 bg-surface-low dark:bg-[#0f1422] border-t border-surface-container-high/60 dark:border-cyan-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <span className="font-headline text-sm font-bold text-on-surface dark:text-white">
                    Akses Transportasi Mudah
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant dark:text-slate-400">
                    Dekat Stasiun LRT Rasuna Said &amp; Halte TransJakarta Kuningan
                  </span>
                </div>
                <a
                  href={siteConfig.contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline text-xs sm:text-sm font-semibold dark:font-bold hover:bg-primary dark:shadow-[0_0_15px_rgba(0,210,255,0.35)] transition-all shrink-0 shadow-sm"
                >
                  <span>Buka di Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
