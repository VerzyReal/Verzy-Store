import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Zap, ArrowRight, ShieldCheck, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="beranda" className="relative w-full overflow-hidden bg-surface dark:bg-[#0a0e18] pt-28 pb-16 lg:pt-36 lg:pb-24 transition-colors duration-300">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-secondary-container/25 dark:bg-cyan-500/10 blur-3xl dark:blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary-fixed/25 dark:bg-blue-600/15 blur-3xl dark:blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 cyber-grid opacity-0 dark:opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-surface-container-high dark:bg-[#121929] text-primary dark:text-cyan-300 font-sans text-xs sm:text-sm font-semibold shadow-sm border border-secondary-container/30 dark:border-cyan-500/30 dark:shadow-[0_0_12px_rgba(0,210,255,0.15)]">
              <span className="w-2 h-2 rounded-full bg-primary-container dark:bg-cyan-400 animate-pulse dark:shadow-[0_0_8px_#00d2ff]" />
              <span>{siteConfig.slogan}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface dark:text-white leading-tight tracking-tight">
              Top Up Game Cepat, Hemat, &amp;{" "}
              <span className="text-primary-container dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-cyan-400 dark:to-blue-400 dark:drop-shadow-[0_0_15px_rgba(0,210,255,0.3)] relative inline-block">
                100% Legal
                <span className="absolute bottom-1 left-0 w-full h-2 bg-secondary-container/40 dark:bg-cyan-500/20 -z-10 rounded" />
              </span>
            </h1>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg text-on-surface-variant dark:text-slate-300 max-w-xl leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#layanan"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline text-base font-semibold dark:font-bold shadow-glow dark:shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:bg-primary dark:hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] hover:shadow-cyan dark:hover:brightness-110 transition-all group"
              >
                <Zap className="w-5 h-5 text-cyan-accent dark:text-slate-950 group-hover:scale-110 transition-transform" />
                <span>Mulai Top Up Sekarang</span>
              </a>
              <a
                href="#promo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-surface-container-low dark:bg-[#121929] text-primary dark:text-cyan-300 font-headline text-base font-semibold hover:bg-surface-container-high dark:hover:bg-[#172036] dark:hover:border-cyan-400/60 dark:hover:text-white transition-all border border-surface-container-high dark:border-cyan-500/30 dark:shadow-[0_0_12px_rgba(0,210,255,0.1)]"
              >
                <span>Jelajahi Promo Game</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Stats Cards */}
            <div className="grid grid-cols-3 gap-3 pt-6 max-w-lg">
              {siteConfig.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#121929] shadow-sm border border-surface-container-high/60 dark:border-cyan-500/20 flex flex-col hover:border-secondary-container/50 dark:hover:border-cyan-400/50 transition-colors"
                >
                  <span className="font-headline text-lg sm:text-xl font-bold text-primary dark:text-cyan-400 dark:drop-shadow-[0_0_8px_rgba(0,210,255,0.4)]">
                    {stat.value}
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_0_35px_rgba(0,210,255,0.18)] bg-white dark:bg-[#121929] p-2 border border-surface-container-high dark:border-cyan-500/30">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
                <Image
                  src={siteConfig.heroIllustration}
                  alt="Verzy Store Gaming Top Up Showcase"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>

              {/* Floating Badge 1: Instant Process */}
              <div className="absolute top-6 left-6 px-4 py-2 rounded-xl glass-panel shadow-lg flex items-center gap-2.5 text-primary dark:text-cyan-300 font-headline text-xs sm:text-sm font-semibold">
                <div className="w-6 h-6 rounded-lg bg-primary-container/10 dark:bg-cyan-500/20 flex items-center justify-center text-primary-container dark:text-cyan-300">
                  <Zap className="w-4 h-4 text-primary-container dark:text-cyan-300 fill-primary-container dark:fill-cyan-300" />
                </div>
                <span>⚡ Proses 3-15 Detik</span>
              </div>

              {/* Floating Badge 2: Anti-Banned Guarantee */}
              <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl glass-panel shadow-lg flex items-center gap-2.5 text-primary dark:text-cyan-300 font-headline text-xs sm:text-sm font-semibold">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span>🛡️ Garansi 100% Legal</span>
              </div>

              {/* Floating Badge 3: User Rating */}
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 hidden sm:flex px-4 py-3 rounded-2xl glass-panel shadow-xl flex-col gap-1 text-on-surface dark:text-white border border-secondary-container/40 dark:border-cyan-500/40">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-headline text-base font-bold text-on-surface dark:text-white">4.9 / 5.0</span>
                </div>
                <span className="font-sans text-xs text-on-surface-variant dark:text-slate-400 font-medium">
                  Rating 120k+ Gamers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
