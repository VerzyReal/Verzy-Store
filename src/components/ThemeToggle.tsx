"use client";

import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
      title={isDark ? "Mode Terang" : "Mode Gelap"}
      className={`relative p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center ${
        isDark
          ? "bg-slate-800/80 border border-cyan-400/40 text-cyan-300 shadow-[0_0_12px_rgba(0,210,255,0.25)] hover:border-cyan-300 hover:text-white hover:shadow-[0_0_16px_rgba(0,210,255,0.45)]"
          : "bg-surface-container-low border border-surface-container-high text-primary hover:bg-surface-container hover:text-primary-container shadow-sm"
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (shown when dark to switch to light) */}
        <Sun
          className={`w-5 h-5 transition-all duration-300 transform ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-amber-300"
              : "-rotate-90 scale-0 opacity-0 absolute"
          }`}
        />
        {/* Moon Icon (shown when light to switch to dark) */}
        <Moon
          className={`w-5 h-5 transition-all duration-300 transform ${
            isDark
              ? "rotate-90 scale-0 opacity-0 absolute"
              : "rotate-0 scale-100 opacity-100 text-primary-container"
          }`}
        />
      </div>
    </button>
  );
}
