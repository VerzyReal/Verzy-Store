"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, User, ArrowRight } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["beranda", "tentang-kami", "layanan", "promo", "kontak"];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-[#0a0e18]/95 backdrop-blur-md shadow-[0_2px_12px_rgba(8,98,136,0.08)] dark:shadow-[0_4px_24px_rgba(0,210,255,0.08)] border-b border-surface-container-high/60 dark:border-cyan-500/20 py-3"
          : "bg-surface/90 dark:bg-[#0a0e18]/90 backdrop-blur-sm py-4 border-b border-surface-container-high/60 dark:border-cyan-500/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="#beranda" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm ring-2 ring-primary/20 dark:ring-cyan-500/30 group-hover:ring-primary-container dark:group-hover:ring-cyan-400 transition-all">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              fill
              className="object-cover"
              sizes="40px"
              priority
            />
          </div>
          <div className="flex items-center">
            <span className="font-headline text-2xl font-bold tracking-tight text-primary dark:text-white flex items-center">
              Verzy
              <span className="text-primary-container dark:text-cyan-400 dark:drop-shadow-[0_0_12px_rgba(0,210,255,0.5)]">
                Store
              </span>
            </span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary-container dark:bg-cyan-950/80 border border-transparent dark:border-cyan-400/40 text-on-secondary-container dark:text-cyan-300 font-sans text-[11px] font-bold uppercase tracking-wider dark:shadow-[0_0_8px_rgba(0,210,255,0.2)]">
              TOPUP
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low/70 dark:bg-[#121929]/70 p-1.5 rounded-2xl border border-surface-container-high/50 dark:border-cyan-500/20">
          {siteConfig.navigation.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary-container text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:border dark:border-cyan-500/30 dark:shadow-[0_0_12px_rgba(0,210,255,0.15)] shadow-sm"
                    : "text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-surface-container dark:hover:bg-slate-800/60"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Action Button, Theme Toggle & User */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-white dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] dark:text-slate-950 dark:font-bold font-headline text-sm font-semibold shadow-glow dark:shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:bg-primary dark:hover:shadow-[0_0_28px_rgba(0,210,255,0.65)] hover:shadow-cyan transition-all"
          >
            <User className="w-4 h-4" />
            <span>Masuk / Login</span>
          </Link>
        </div>

        {/* Mobile Controls (Theme Toggle + Hamburger) */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
            className="p-2 rounded-xl text-on-surface dark:text-white hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-[#0a0e18]/98 backdrop-blur-xl border-b border-surface-container-high dark:border-cyan-500/20 px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {siteConfig.navigation.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "bg-primary-container text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:border dark:border-cyan-500/30"
                      : "text-on-surface dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-800/60"
                  }`}
                >
                  <span>{item.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </a>
              );
            })}
            <div className="pt-4 border-t border-surface-container-high dark:border-cyan-500/20 mt-2 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline font-semibold shadow-md dark:shadow-[0_0_20px_rgba(0,210,255,0.4)]"
              >
                <User className="w-5 h-5" />
                <span>Masuk ke Dashboard / Akun</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
