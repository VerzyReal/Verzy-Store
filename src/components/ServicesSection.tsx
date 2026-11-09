"use client";

import React, { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { ChevronRight, ArrowUpRight } from "lucide-react";

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
    <section id="layanan" className="w-full bg-surface py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-12">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-sans text-xs font-bold uppercase tracking-wider self-start">
              KATALOG LENGKAP
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface">
              Layanan &amp; Ekosistem Game Verzy Store
            </h2>
            <p className="font-sans text-base text-on-surface-variant">
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
                    ? "bg-primary-container text-white shadow-sm"
                    : "bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
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
              className="p-6 rounded-3xl bg-white shadow-sm border border-surface-container-high/60 hover:shadow-xl hover:border-secondary-container hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm ring-1 ring-surface-container-high group-hover:ring-secondary-container transition-all">
                    <Image
                      src={game.image}
                      alt={game.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary-container/80 text-on-secondary-container font-sans text-xs font-bold uppercase">
                    {game.tag}
                  </span>
                </div>

                <div>
                  <h3 className="font-headline text-lg sm:text-xl font-bold text-on-surface group-hover:text-primary transition-colors">
                    {game.name}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant mt-2 leading-relaxed">
                    {game.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-surface-container-low flex items-center justify-between">
                <div>
                  <span className="block font-sans text-[11px] text-on-surface-variant uppercase font-medium">
                    Mulai Dari
                  </span>
                  <span className="font-headline text-base font-bold text-primary-container">
                    {game.startingPrice}
                  </span>
                </div>
                <a
                  href={`https://wa.me/6281299887722?text=Halo%20Admin%20Verzy%20Store,%20saya%20ingin%20top%20up%20${encodeURIComponent(
                    game.name
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-container text-primary font-headline text-xs sm:text-sm font-semibold group-hover:bg-primary-container group-hover:text-white transition-all shadow-sm"
                >
                  <span>Top Up</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
