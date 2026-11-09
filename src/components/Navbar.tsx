"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Menu, X, User, ArrowRight } from "lucide-react";

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
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_12px_rgba(8,98,136,0.08)] py-3"
          : "bg-surface/90 backdrop-blur-sm py-4 border-b border-surface-container-high/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="#beranda" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm ring-2 ring-primary/20 group-hover:ring-primary-container transition-all">
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
            <span className="font-headline text-2xl font-bold tracking-tight text-primary">
              Verzy<span className="text-primary-container">Store</span>
            </span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-sans text-[11px] font-bold uppercase tracking-wider">
              TOPUP
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-surface-container-low/70 p-1.5 rounded-2xl border border-surface-container-high/50">
          {siteConfig.navigation.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary-container text-white shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </nav>

        {/* Action Button & User */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-white font-headline text-sm font-semibold shadow-glow hover:bg-primary hover:shadow-cyan transition-all"
          >
            <User className="w-4 h-4" />
            <span>Masuk / Login</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
          className="lg:hidden p-2 rounded-xl text-on-surface hover:bg-surface-container transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-surface-container-high px-6 py-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
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
                      ? "bg-primary-container text-white"
                      : "text-on-surface hover:bg-surface-container-low"
                  }`}
                >
                  <span>{item.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </a>
              );
            })}
            <div className="pt-4 border-t border-surface-container-high mt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-container text-white font-headline font-semibold shadow-md"
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
