"use client";

import { motion } from "framer-motion";
import { DollarSign, ShoppingCart, Activity, Home, Film, Sparkles } from "lucide-react";

import { ElementType } from "react";

interface Industry {
  name: string;
  icon: ElementType;
  desc: string;
  glow: string;
}

const industries: Industry[] = [
  {
    name: "FinTech & Banking",
    icon: DollarSign,
    desc: "Building highly secure native desktop portals and dashboards with multi-layered encryption schemas.",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] hover:border-emerald-500/30",
  },
  {
    name: "E-Commerce Retail",
    icon: ShoppingCart,
    desc: "Speed-optimized Next.js architectures, headless content integrations, and lead conversion models.",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:border-cyan-500/30",
  },
  {
    name: "Digital HealthCare",
    icon: Activity,
    desc: "Fluid iOS & Android healthcare apps with secure biometric access and real-time syncing pipelines.",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] hover:border-violet-500/30",
  },
  {
    name: "Real Estate & Props",
    icon: Home,
    desc: "Sophisticated branding, responsive web listings, interactive mapping widgets, and visual content assets.",
    glow: "group-hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:border-orange-500/30",
  },
  {
    name: "Entertainment & Media",
    icon: Film,
    desc: "Cinematic commercial videography, social media reels, dynamic transitions, and video assets.",
    glow: "group-hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:border-red-500/30",
  },
  {
    name: "Corporate Events",
    icon: Sparkles,
    desc: "Onsite stage visual grids, registration apps, custom web dashboards, and physical logistics coordination.",
    glow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] hover:border-yellow-500/30",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="relative py-24 md:py-36 bg-zinc-50 overflow-hidden border-t border-black/5">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-glow-radial opacity-20 -translate-y-1/2 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Header info */}
        <div className="flex flex-col gap-4 text-center items-center mb-16 md:mb-24">
          <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            Sectors We Serve
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-950">
            Industries We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]">
              Transform
            </span>
          </h2>
          <p className="font-sans text-base text-zinc-600 max-w-lg mt-2">
            Tailoring our software, media campaigns, and marketing setups to excel in each unique industry sector.
          </p>
        </div>

        {/* Grid of Industry Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((industry, index) => {
            const Icon = industry.icon;

            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-3xl p-8 border border-zinc-200 flex flex-col gap-6 text-left relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-emerald-500/30 shadow-sm"
              >
                <div className="absolute top-0 right-0 h-24 w-24 bg-glow-radial opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10 pointer-events-none" />

                {/* Icon Container */}
                <div className="rounded-2xl bg-zinc-100 p-4 text-emerald-600 max-w-max border border-zinc-200 group-hover:border-emerald-500/30 group-hover:bg-emerald-50 transition-all duration-500 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Text Block */}
                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-xl font-bold text-zinc-950 group-hover:text-emerald-600 transition-colors duration-300">
                    {industry.name}
                  </h3>
                  <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                    {industry.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
