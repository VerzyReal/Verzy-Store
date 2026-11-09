import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Zap, ArrowRight, ShieldCheck, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="beranda" className="relative w-full overflow-hidden bg-surface pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute -top-32 right-10 w-96 h-96 rounded-full bg-secondary-container/25 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-primary-fixed/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-surface-container-high text-primary font-sans text-xs sm:text-sm font-semibold shadow-sm border border-secondary-container/30">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              <span>{siteConfig.slogan}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-on-surface leading-tight tracking-tight">
              Top Up Game Cepat, Hemat, &amp;{" "}
              <span className="text-primary-container relative inline-block">
                100% Legal
                <span className="absolute bottom-1 left-0 w-full h-2 bg-secondary-container/40 -z-10 rounded" />
              </span>
            </h1>

            {/* Description */}
            <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#layanan"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary-container text-white font-headline text-base font-semibold shadow-glow hover:bg-primary hover:shadow-cyan transition-all group"
              >
                <Zap className="w-5 h-5 text-cyan-accent group-hover:scale-110 transition-transform" />
                <span>Mulai Top Up Sekarang</span>
              </a>
              <a
                href="#promo"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-surface-container-low text-primary font-headline text-base font-semibold hover:bg-surface-container-high transition-all border border-surface-container-high"
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
                  className="p-3.5 rounded-2xl bg-white shadow-sm border border-surface-container-high/60 flex flex-col hover:border-secondary-container/50 transition-colors"
                >
                  <span className="font-headline text-lg sm:text-xl font-bold text-primary">
                    {stat.value}
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-white p-2 border border-surface-container-high">
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
              <div className="absolute top-6 left-6 px-4 py-2 rounded-xl glass-panel shadow-lg flex items-center gap-2.5 text-primary font-headline text-xs sm:text-sm font-semibold animate-bounce duration-1000">
                <div className="w-6 h-6 rounded-lg bg-primary-container/10 flex items-center justify-center text-primary-container">
                  <Zap className="w-4 h-4 text-primary-container fill-primary-container" />
                </div>
                <span>⚡ Proses 3-15 Detik</span>
              </div>

              {/* Floating Badge 2: Anti-Banned Guarantee */}
              <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl glass-panel shadow-lg flex items-center gap-2.5 text-primary font-headline text-xs sm:text-sm font-semibold">
                <div className="w-6 h-6 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                </div>
                <span>🛡️ Garansi 100% Legal</span>
              </div>

              {/* Floating Badge 3: User Rating */}
              <div className="absolute top-1/2 -right-3 -translate-y-1/2 hidden sm:flex px-4 py-3 rounded-2xl glass-panel shadow-xl flex-col gap-1 text-on-surface border border-secondary-container/40">
                <div className="flex items-center gap-1.5 text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-headline text-base font-bold text-on-surface">4.9 / 5.0</span>
                </div>
                <span className="font-sans text-xs text-on-surface-variant font-medium">
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
