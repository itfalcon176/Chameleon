"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TechItem {
  name: string;
  level: string;
  category: "dev" | "design" | "marketing";
}

const techStack: TechItem[] = [
  // Development
  { name: "Next.js & React", level: "Expert Mastery", category: "dev" },
  { name: "TypeScript & JS", level: "Full Authority", category: "dev" },
  { name: "Rust & C++", level: "System Level", category: "dev" },
  { name: "Tauri Framework", level: "Native Desktop", category: "dev" },
  { name: "Node.js Engines", level: "Scalable API", category: "dev" },
  { name: "React Native", level: "Cross-Mobile", category: "dev" },
  { name: "SQLite & PostgreSQL", level: "Database Schema", category: "dev" },
  { name: "GraphQL & REST", level: "Query Engines", category: "dev" },
  
  // Design & Branding
  { name: "Figma Studio", level: "UI/UX Architecture", category: "design" },
  { name: "Adobe Illustrator", level: "Geometric Vectors", category: "design" },
  { name: "Adobe Photoshop", level: "Creative Raster", category: "design" },
  { name: "Premiere Pro", level: "Cinematic Cut", category: "design" },
  { name: "After Effects", level: "Motion Dynamics", category: "design" },
  { name: "3D Spline / Blender", level: "Spatial Renders", category: "design" },

  // Marketing & SEO
  { name: "Core Web Vitals", level: "Speed Auditing", category: "marketing" },
  { name: "Google Analytics", level: "Data Telemetry", category: "marketing" },
  { name: "Semrush Suite", level: "Rank Tracking", category: "marketing" },
  { name: "Meta Business Ads", level: "Targeted Funnels", category: "marketing" },
  { name: "Structured Schema", level: "JSON-LD Graphs", category: "marketing" },
  { name: "Keyword Audit", level: "Intent Search", category: "marketing" },
];

export default function Technologies() {
  const [activeTab, setActiveTab] = useState<"dev" | "design" | "marketing">("dev");

  const filteredTech = techStack.filter((t) => t.category === activeTab);

  return (
    <section id="technologies" className="relative py-24 bg-white overflow-hidden select-none border-t border-black/5">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-glow-radial opacity-20 -translate-y-1/2 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col gap-12 text-center items-center">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            Our Stack
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-950">
            Technologies We{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]">
              Wield
            </span>
          </h2>
          <p className="font-sans text-base text-zinc-600 max-w-lg mt-2">
            The programming languages, frameworks, and creative software we adapt to master every digital channel.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex rounded-full bg-zinc-100 p-1.5 border border-zinc-200 max-w-max shadow-inner">
          <button
            onClick={() => setActiveTab("dev")}
            className={`rounded-full px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "dev" ? "bg-zinc-950 text-white shadow-md" : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Development
          </button>
          <button
            onClick={() => setActiveTab("design")}
            className={`rounded-full px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "design" ? "bg-zinc-950 text-white shadow-md" : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            Design & Branding
          </button>
          <button
            onClick={() => setActiveTab("marketing")}
            className={`rounded-full px-6 py-2.5 font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeTab === "marketing" ? "bg-zinc-950 text-white shadow-md" : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            SEO & Marketing
          </button>
        </div>

        {/* Technology Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-zinc-50/70 hover:bg-white rounded-2xl p-6 border border-zinc-200 hover:border-emerald-500/40 hover:shadow-xl flex flex-col justify-center items-center text-center group transition-all duration-300 shadow-sm"
              >
                <span className="font-display text-lg font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors duration-300">
                  {tech.name}
                </span>
                <span className="font-sans text-xs text-zinc-500 mt-2 font-medium">
                  {tech.level}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
