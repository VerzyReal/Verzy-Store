import React from "react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Zap, ShieldCheck, Headphones } from "lucide-react";

export default function AboutSection() {
  const iconMap = {
    Zap: <Zap className="w-6 h-6 text-primary-container" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-primary-container" />,
    Headphones: <Headphones className="w-6 h-6 text-primary-container" />,
  };

  return (
    <section id="tentang-kami" className="w-full bg-surface-low py-16 lg:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col gap-14">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-sans text-xs font-bold uppercase tracking-wider">
            TENTANG VERZY STORE
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-bold text-on-surface max-w-2xl">
            Partner Terpercaya Jutaan Gamers Indonesia Sejak {siteConfig.foundedYear}
          </h2>
          <p className="font-sans text-base text-on-surface-variant max-w-2xl leading-relaxed">
            {siteConfig.aboutStory}
          </p>
        </div>

        {/* Main Grid: Team Photo Showcase & Strengths Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Team Photo Card */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-3xl overflow-hidden shadow-lg bg-white border border-surface-container-high group">
              <div className="relative h-80 sm:h-96 w-full overflow-hidden">
                <Image
                  src={siteConfig.aboutImage}
                  alt="Tim Verzy Store Headquarters"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 550px"
                />
              </div>
              <div className="p-5 bg-white flex items-center justify-between border-t border-surface-container-high/60">
                <div className="flex flex-col">
                  <span className="font-headline text-base font-bold text-on-surface">
                    Tim Support &amp; Operasional
                  </span>
                  <span className="font-sans text-xs text-on-surface-variant">
                    Gedung Cyber 2 Tower, Kuningan Jakarta
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container-high text-primary font-sans text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                  24/7 Aktif
                </span>
              </div>
            </div>
          </div>

          {/* 3 Strengths List */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {siteConfig.strengths.map((item, idx) => {
              const iconKey = item.icon as keyof typeof iconMap;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white shadow-sm border border-surface-container-high/60 hover:shadow-md hover:border-secondary-container transition-all flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center shrink-0">
                    {iconMap[iconKey] || <Zap className="w-6 h-6 text-primary-container" />}
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-headline text-lg font-bold text-on-surface">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
