"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Menu, X, User, ArrowRight, ShoppingBag, ShieldCheck, LogOut, ChevronDown } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setCurrentUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      setUserDropdownOpen(false);
      setMobileMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === "/") {
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
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const getNavHref = (href: string) => {
    if (pathname === "/") return href;
    return `/${href}`;
  };

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
        <Link href={getNavHref("#beranda")} className="flex items-center gap-3 group">
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
            const isActive = pathname === "/" && activeSection === sectionId;
            return (
              <a
                key={item.name}
                href={getNavHref(item.href)}
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

          {currentUser && (
            <Link
              href="/orders"
              className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all ${
                pathname === "/orders"
                  ? "bg-primary-container text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:border dark:border-cyan-500/30 shadow-sm"
                  : "text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-surface-container dark:hover:bg-slate-800/60"
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-primary-container dark:text-cyan-400" />
              <span>Pesanan Saya</span>
            </Link>
          )}
        </nav>

        {/* Action Button, Theme Toggle & User */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />

          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/30 text-on-surface dark:text-white hover:border-primary-container dark:hover:border-cyan-400 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-primary-container/20 dark:bg-cyan-950 flex items-center justify-center text-primary dark:text-cyan-400">
                  <User className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-headline text-xs font-bold leading-tight truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-on-surface-variant dark:text-cyan-300 capitalize">
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-1" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/30 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-surface-container-high dark:border-cyan-500/15">
                    <p className="text-xs font-bold text-on-surface dark:text-white truncate">
                      {currentUser.name}
                    </p>
                    <p className="text-[11px] text-on-surface-variant dark:text-slate-400 truncate">
                      {currentUser.email}
                    </p>
                  </div>

                  <Link
                    href="/orders"
                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-on-surface dark:text-slate-200 hover:bg-surface-container dark:hover:bg-slate-800"
                  >
                    <ShoppingBag className="w-4 h-4 text-primary dark:text-cyan-400" />
                    <span>Pesanan Saya</span>
                  </Link>

                  {currentUser.role === "admin" && (
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-on-surface dark:text-slate-200 hover:bg-surface-container dark:hover:bg-slate-800"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Dashboard Admin</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-t border-surface-container-high dark:border-cyan-500/15 mt-1"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar / Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-white dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] dark:text-slate-950 dark:font-bold font-headline text-sm font-semibold shadow-glow dark:shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:bg-primary dark:hover:shadow-[0_0_28px_rgba(0,210,255,0.65)] hover:shadow-cyan transition-all"
            >
              <User className="w-4 h-4" />
              <span>Masuk / Login</span>
            </Link>
          )}
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
              const isActive = pathname === "/" && activeSection === sectionId;
              return (
                <a
                  key={item.name}
                  href={getNavHref(item.href)}
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

            {currentUser && (
              <Link
                href="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  pathname === "/orders"
                    ? "bg-primary-container text-white dark:bg-cyan-500/10 dark:text-cyan-300 dark:border dark:border-cyan-500/30"
                    : "text-on-surface dark:text-slate-300 hover:bg-surface-container-low dark:hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary-container dark:text-cyan-400" />
                  <span>Pesanan Saya</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </Link>
            )}

            <div className="pt-4 border-t border-surface-container-high dark:border-cyan-500/20 mt-2 flex flex-col gap-3">
              {currentUser ? (
                <>
                  <div className="p-3 rounded-xl bg-surface-container dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-on-surface dark:text-white">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-on-surface-variant dark:text-slate-400">
                        {currentUser.email}
                      </p>
                    </div>
                    {currentUser.role === "admin" && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 text-[10px] font-bold uppercase">
                        Admin
                      </span>
                    )}
                  </div>

                  {currentUser.role === "admin" && (
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-headline font-semibold text-sm shadow-md"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Buka Dashboard Admin</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-headline font-semibold text-sm border border-rose-200 dark:border-rose-500/30"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar / Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-primary-container dark:bg-gradient-to-r dark:from-[#00d2ff] dark:to-[#086288] text-white dark:text-slate-950 font-headline font-semibold shadow-md dark:shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                >
                  <User className="w-5 h-5" />
                  <span>Masuk ke Dashboard / Akun</span>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
