"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ArrowRight, Calendar, X } from "lucide-react";

export default function NewsSection() {
  const [articles, setArticles] = useState<any[]>(siteConfig.articles);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  useEffect(() => {
    fetch("/api/admin/news?status=published")
      .then((res) => res.json())
      .then((data) => {
        if (data.news && data.news.length > 0) {
          // Format artikel dari database agar serasi
          const mapped = data.news.map((item: any) => ({
            id: item.id,
            title: item.title,
            slug: item.slug,
            tag: item.tag || "Berita & Promo",
            date: new Date(item.created_at || Date.now()).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            }),
            excerpt: item.excerpt,
            content: item.content,
            thumbnail: item.thumbnail_path || "/images/hero-illustration.png",
          }));
          setArticles(mapped);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="promo" className="w-full bg-surface-low dark:bg-[#0f1422] dark:border-y dark:border-cyan-500/10 py-16 lg:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-secondary-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 text-on-secondary-container dark:text-cyan-300 font-sans text-xs font-bold uppercase tracking-wider dark:shadow-[0_0_10px_rgba(0,210,255,0.15)]">
            UPDATE &amp; PENAWARAN
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface dark:text-white">
            Berita, Tips Gaming &amp; Promo Spesial
          </h2>
          <p className="font-sans text-base text-on-surface-variant dark:text-slate-300 max-w-2xl">
            Update info turnamen, event diskon mingguan, dan tips meta game terhangat langsung dari tim editorial Verzy Store.
          </p>
        </div>

        {/* Dynamic Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article
              key={article.id}
              className="flex flex-col rounded-3xl bg-white dark:bg-[#121929] shadow-sm border border-surface-container-high/60 dark:border-cyan-500/20 overflow-hidden hover:shadow-xl dark:hover:shadow-[0_0_20px_rgba(0,210,255,0.15)] hover:border-secondary-container dark:hover:border-cyan-400/50 transition-all group"
            >
              {/* Thumbnail Container */}
              <div className="h-48 w-full relative overflow-hidden bg-surface-container dark:bg-slate-900">
                <Image
                  src={article.thumbnail || "/images/hero-illustration.png"}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-[#0a0e18]/90 dark:border dark:border-cyan-500/30 backdrop-blur-md text-primary dark:text-cyan-300 font-sans text-xs font-bold uppercase shadow-sm">
                  {article.tag || "Promo"}
                </span>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-on-surface-variant dark:text-slate-400 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-headline text-lg font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant dark:text-slate-300 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1.5 font-headline text-sm font-semibold text-primary-container dark:text-cyan-400 group-hover:text-primary dark:group-hover:text-cyan-300 transition-colors text-left"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#121929] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl dark:shadow-[0_0_35px_rgba(0,210,255,0.2)] border border-surface-container-high dark:border-cyan-500/30 p-6 sm:p-8 flex flex-col gap-6 relative">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-surface-container dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors"
              aria-label="Tutup pratinjau artikel"
            >
              <X className="w-5 h-5 text-on-surface dark:text-white" />
            </button>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-secondary-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 text-on-secondary-container dark:text-cyan-300 font-sans text-xs font-bold uppercase">
                {selectedArticle.tag || "Artikel"}
              </span>
              <span className="text-xs text-on-surface-variant dark:text-slate-400">{selectedArticle.date}</span>
            </div>

            <h2 className="font-headline text-2xl sm:text-3xl font-bold text-on-surface dark:text-white">
              {selectedArticle.title}
            </h2>

            <div className="relative h-60 w-full rounded-2xl overflow-hidden bg-surface-container dark:bg-slate-800">
              <Image
                src={selectedArticle.thumbnail || "/images/hero-illustration.png"}
                alt={selectedArticle.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="font-sans text-base text-on-surface dark:text-slate-200 leading-relaxed flex flex-col gap-4">
              {selectedArticle.excerpt && (
                <p className="font-semibold text-primary-container dark:text-cyan-400">
                  {selectedArticle.excerpt}
                </p>
              )}
              <p className="whitespace-pre-line">{selectedArticle.content}</p>
            </div>

            <div className="pt-4 border-t border-surface-container dark:border-cyan-500/20 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-6 py-2.5 rounded-xl bg-surface-container dark:bg-slate-800 text-primary dark:text-cyan-300 font-headline text-sm font-semibold hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
