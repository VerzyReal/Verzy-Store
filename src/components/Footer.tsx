import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MessageCircle, Disc as Discord, ShieldCheck, Zap, Headphones } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-surface-container-high/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-surface-container-high/60">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link href="#beranda" className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-sm ring-1 ring-primary/20">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  sizes="36px"
                />
              </div>
              <div className="flex items-center">
                <span className="font-headline text-2xl font-bold tracking-tight text-primary">
                  Verzy<span className="text-primary-container">Store</span>
                </span>
                <span className="w-2 h-2 rounded-full bg-secondary-container ml-2" />
              </div>
            </Link>

            <p className="font-sans text-sm text-on-surface-variant max-w-sm leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Verzy Store"
                className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-all"
              >
                <svg
                  className="w-5 h-5 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Verzy Store"
                className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.socials.discord}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord Verzy Store"
                className="w-10 h-10 rounded-xl bg-surface-low flex items-center justify-center text-primary hover:bg-secondary-container hover:text-on-secondary-container transition-all"
              >
                <Discord className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Menu Cepat */}
          <div>
            <h4 className="font-headline text-base font-bold text-on-surface mb-4">
              Menu Cepat
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-sans">
              <li>
                <a href="#beranda" className="text-on-surface-variant hover:text-primary transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#tentang-kami" className="text-on-surface-variant hover:text-primary transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#layanan" className="text-on-surface-variant hover:text-primary transition-colors">
                  Layanan &amp; Game
                </a>
              </li>
              <li>
                <a href="#promo" className="text-on-surface-variant hover:text-primary transition-colors">
                  Promo &amp; Diskon
                </a>
              </li>
              <li>
                <a href="#kontak" className="text-on-surface-variant hover:text-primary transition-colors">
                  Pusat Bantuan
                </a>
              </li>
            </ul>
          </div>

          {/* Kategori Game */}
          <div>
            <h4 className="font-headline text-base font-bold text-on-surface mb-4">
              Kategori Game
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-sans">
              {siteConfig.games.slice(0, 5).map((game) => (
                <li key={game.id}>
                  <a href="#layanan" className="text-on-surface-variant hover:text-primary transition-colors">
                    {game.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bantuan & Legalitas */}
          <div>
            <h4 className="font-headline text-base font-bold text-on-surface mb-4">
              Bantuan &amp; Info
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm font-sans">
              <li>
                <a href="#kontak" className="text-on-surface-variant hover:text-primary transition-colors">
                  Hubungi Helpdesk
                </a>
              </li>
              <li>
                <Link href="/login" className="text-on-surface-variant hover:text-primary transition-colors">
                  Login Admin &amp; Dashboard
                </Link>
              </li>
              <li>
                <span className="text-on-surface-variant/80">Syarat &amp; Ketentuan Layanan</span>
              </li>
              <li>
                <span className="text-on-surface-variant/80">Kebijakan Privasi Pengguna</span>
              </li>
              <li>
                <span className="text-on-surface-variant/80">FAQ Transaksi</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Sub-Footer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs sm:text-sm text-on-surface-variant text-center md:text-left">
            © 2026 {siteConfig.legalName}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-outline uppercase">
            <span className="inline-flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-primary-container" />
              Instant Delivery
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Legal &amp; Safe
            </span>
            <span className="w-1 h-1 rounded-full bg-outline-variant" />
            <span className="inline-flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-primary" />
              Layanan CS 24/7
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
