"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ChevronRight } from "lucide-react";

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Semua Judul" },
    { id: "mobile", label: "Mobile Games" },
    { id: "pc", label: "PC & Konsol" },
    { id: "voucher", label: "Voucher & Hiburan" },
  ];

  const filteredGames =
    activeCategory === "all"
      ? siteConfig.games
      : siteConfig.games.filter((g) => g.category === activeCategory);

  return (
    <section id="layanan" className="w-full bg-surface dark:bg-[#0a0e18] py-16 lg:py-24 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="px-4 py-1.5 rounded-full bg-secondary-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 text-on-secondary-container dark:text-cyan-300 font-sans text-xs font-bold uppercase tracking-wider dark:shadow-[0_0_10px_rgba(0,210,255,0.15)] self-start">
              KATALOG LENGKAP
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface dark:text-white">
              Layanan &amp; Ekosistem Game Verzy Store
            </h2>
            <p className="font-sans text-base text-on-surface-variant dark:text-slate-300">
              Pilihan isi ulang lengkap untuk judul game mobile, PC, konsol, dan voucher hiburan digital terpopuler di Indonesia.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeCategory === cat.id
                    ? "bg-primary-container text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:border dark:border-cyan-500/40 dark:shadow-[0_0_12px_rgba(0,210,255,0.2)] shadow-sm"
                    : "bg-surface-container-low dark:bg-[#121929] text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-surface-container dark:hover:bg-slate-800/60 dark:border dark:border-cyan-500/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Interactive Game Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              className="p-6 rounded-3xl bg-white dark:bg-[#121929] shadow-sm border border-surface-container-high/60 dark:border-cyan-500/20 hover:shadow-xl dark:hover:shadow-[0_0_25px_rgba(0,210,255,0.18)] hover:border-secondary-container dark:hover:border-cyan-400/50 hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm ring-1 ring-surface-container-high dark:ring-cyan-500/20 group-hover:ring-secondary-container dark:group-hover:ring-cyan-400 transition-all">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary-container/80 dark:bg-cyan-950/80 dark:border dark:border-cyan-500/30 text-on-secondary-container dark:text-cyan-300 font-sans text-xs font-bold uppercase">
                    {game.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-cyan-400 transition-colors">
                    {game.name}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant dark:text-slate-300 mt-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-surface-container-low dark:border-cyan-500/15 flex items-center justify-between">
                <div>
                  <span className="block font-sans text-[11px] text-on-surface-variant dark:text-slate-400 uppercase font-medium">
                    Mulai Dari
                  </span>
                  <span className="font-headline text-base font-bold text-primary-container dark:text-cyan-400 dark:drop-shadow-[0_0_6px_rgba(0,210,255,0.3)]">
                    {game.startingPrice}
                  </span>
                </div>
                <Link
                  href={`/order?game=${game.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container dark:bg-cyan-950/80 dark:border dark:border-cyan-500/40 text-primary dark:text-cyan-300 font-headline text-xs sm:text-sm font-semibold group-hover:bg-primary-container dark:group-hover:bg-cyan-400 group-hover:text-white dark:group-hover:text-slate-950 dark:group-hover:shadow-[0_0_15px_rgba(0,210,255,0.5)] transition-all shadow-sm"
                >
                  <span>Top Up</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
