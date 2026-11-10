"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import ThemeToggle from "@/components/ThemeToggle";
import {
  LayoutDashboard,
  Users,
  Shield,
  Newspaper,
  LogOut,
  ExternalLink,
  Menu,
  X,
  User,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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
      router.push("/login");
      router.refresh();
    } catch {}
  };

  const navLinks = [
    {
      name: "Ringkasan",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      exact: true,
    },
    {
      name: "Manajemen User",
      href: "/dashboard/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      name: "Manajemen Role",
      href: "/dashboard/roles",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      name: "CRUD Berita & Promo",
      href: "/dashboard/news",
      icon: <Newspaper className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-surface dark:bg-[#0a0e18] flex flex-col transition-colors duration-300">
      {/* Top Navbar */}
      <header className="h-20 bg-white/95 dark:bg-[#0a0e18]/95 backdrop-blur-md border-b border-surface-container-high dark:border-cyan-500/20 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="lg:hidden p-2 rounded-xl text-on-surface dark:text-white hover:bg-surface-container dark:hover:bg-slate-800"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden ring-1 ring-primary/20 dark:ring-cyan-500/30">
              <Image src={siteConfig.logo} alt={siteConfig.name} fill className="object-cover" sizes="36px" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-headline text-lg font-bold text-primary dark:text-white">
                Verzy<span className="text-primary-container dark:text-cyan-400">Store</span>
              </span>
              <span className="font-sans text-[10px] text-on-surface-variant dark:text-cyan-300 font-bold uppercase tracking-wider">
                Admin Panel
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-low dark:bg-[#121929] border border-surface-container-high dark:border-cyan-500/20 text-xs font-semibold text-primary dark:text-cyan-300 hover:bg-surface-container dark:hover:bg-slate-800 transition-colors"
          >
            <span>Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="flex items-center gap-2 pl-2 border-l border-surface-container-high dark:border-cyan-500/20">
            <div className="w-8 h-8 rounded-full bg-primary-container/10 dark:bg-cyan-500/20 flex items-center justify-center text-primary-container dark:text-cyan-400">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="font-headline text-xs font-bold text-on-surface dark:text-white">
                {currentUser?.name || "Admin"}
              </span>
              <span className="font-sans text-[10px] text-on-surface-variant dark:text-slate-400">
                {currentUser?.email || "admin@gmail.com"}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Keluar / Logout"
            className="p-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors ml-1"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-[#121929] rounded-3xl p-4 border border-surface-container-high dark:border-cyan-500/20 shadow-sm shrink-0 sticky top-28">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = link.exact
                ? pathname === link.href
                : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-primary-container dark:bg-cyan-500/10 text-white dark:text-cyan-300 dark:border dark:border-cyan-500/40 shadow-sm dark:shadow-[0_0_12px_rgba(0,210,255,0.15)]"
                      : "text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white hover:bg-surface-low dark:hover:bg-slate-800/60"
                  }`}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-8 pt-6 border-t border-surface-container-high dark:border-cyan-500/15 flex flex-col gap-2">
            <Link
              href="/"
              className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-primary dark:text-cyan-400 hover:bg-surface-container dark:hover:bg-slate-800/60 transition-colors"
            >
              <span>Lihat Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Sesi</span>
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex animate-in fade-in">
            <div className="w-72 bg-white dark:bg-[#121929] h-full p-6 flex flex-col justify-between shadow-2xl border-r border-surface-container-high dark:border-cyan-500/20">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-surface-container-high dark:border-cyan-500/20">
                  <span className="font-headline text-lg font-bold text-primary dark:text-white">
                    Menu Admin
                  </span>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-1 rounded-lg text-on-surface dark:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const isActive = link.exact
                      ? pathname === link.href
                      : pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-primary-container dark:bg-cyan-500/10 text-white dark:text-cyan-300 dark:border dark:border-cyan-500/40"
                            : "text-on-surface-variant dark:text-slate-400 hover:bg-surface-low dark:hover:bg-slate-800/60"
                        }`}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-surface-container-high dark:border-cyan-500/20 flex flex-col gap-2">
                <Link
                  href="/"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-primary dark:text-cyan-400"
                >
                  <span>Lihat Website Utama</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 w-full min-w-0">{children}</main>
      </div>
    </div>
  );
}
