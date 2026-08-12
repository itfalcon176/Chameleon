"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Eye, Layers, Radio, Rocket, BookOpen, CheckCircle2, ArrowRight } from "lucide-react";
import { ElementType } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface NotebookPage {
  num: string;
  title: string;
  subtitle: string;
  icon: ElementType;
  desc: string;
  details: string[];
  color: string;
  paperBg: string;
}

const pages: NotebookPage[] = [
  {
    num: "01",
    title: "Discovery & Blueprint",
    subtitle: "STEP 01 // OPERATIONAL ANALYSIS",
    icon: Search,
    desc: "We open our blueprint notebook by mapping your business operations. We document user journeys, define database schema boundaries, and outline exact technical specifications.",
    details: ["Workflow & Operations Audit", "Database Schema Mapping", "Technical Architecture Specification"],
    color: "#059669",
    paperBg: "#ffffff",
  },
  {
    num: "02",
    title: "High-Fidelity Prototyping",
    subtitle: "STEP 02 // FIGMA WIREFRAMES & DESIGN",
    icon: Eye,
    desc: "Our creative designers sketch grid guides, color schemes, and construct interactive Figma layouts. We validate usability before writing a single line of production code.",
    details: ["Interactive Wireframe Layouts", "Brand Color & Type Tokens", "Usability Validation Prototypes"],
    color: "#0284c7",
    paperBg: "#fdfbf7",
  },
  {
    num: "03",
    title: "Adaptive Agile Coding",
    subtitle: "STEP 03 // FULL-STACK DEVELOPMENT",
    icon: Layers,
    desc: "We code standard-compliant Next.js websites, mobile layouts, and native desktop systems. Clean TypeScript architecture ensuring blisteringly fast performance.",
    details: ["Next.js & React 19 Speedhouse", "Native OS Executables (Tauri)", "Clean Modular Architecture"],
    color: "#7c3aed",
    paperBg: "#ffffff",
  },
  {
    num: "04",
    title: "Search Authority & SEO",
    subtitle: "STEP 04 // RANK & PERFORMANCE AUDIT",
    icon: Radio,
    desc: "We tweak Core Web Vitals, adjust schema structures, optimize headers, and build high-authority backlink channels to push your brand to #1 on Google organic ranks.",
    details: ["Core Web Vitals 100/100", "Structured Schema Graphs", "Organic Rank Elevation"],
    color: "#db2777",
    paperBg: "#fdfbf7",
  },
  {
    num: "05",
    title: "Event Launch & Promotion",
    subtitle: "STEP 05 // GLOBAL LAUNCH & TRACTION",
    icon: Rocket,
    desc: "We launch your platform, run targeted ads across SMM, publish cinematic video packages, and coordinate virtual or physical events to gather customer traction.",
    details: ["Omni-Channel Ad Funnels", "Cinematic Video Reels", "Live Onboarding Portals"],
    color: "#ea580c",
    paperBg: "#ffffff",
  },
];

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePageIndex, setActivePageIndex] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const pageElements = pageRefs.current.filter(Boolean) as HTMLDivElement[];
    if (pageElements.length === 0) return;

    const totalPages = pageElements.length;

    const ctx = gsap.context(() => {
      // Main pinned notebook timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalPages * 1000}`,
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.floor(self.progress * totalPages),
              totalPages - 1
            );
            setActivePageIndex(idx);
          },
        },
      });

      // Animate authentic page flips in sequence
      pageElements.forEach((page, i) => {
        if (i === totalPages - 1) return;

        tl.to(page, {
          rotateY: -168,
          scale: 0.97,
          ease: "power1.inOut",
          duration: 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative h-screen w-screen bg-[#faf8f5] text-zinc-900 overflow-hidden border-t border-zinc-200 flex flex-col justify-center items-center select-none"
    >
      {/* Authentic Soft Notebook Desk Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.01)_0%,rgba(0,0,0,0.04)_100%)] pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-20 flex flex-col items-center text-center gap-2 mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white border border-zinc-200 text-emerald-700 text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
          <BookOpen className="h-3.5 w-3.5" /> Authentic Notebook Flip
        </div>
        <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight">
          The Process{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
            Notebook
          </span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-600 max-w-md">
          Scroll down to turn the pages and see how we adapt your project step-by-step.
        </p>
      </div>

      {/* Authentic Light Notebook Stage */}
      <div className="relative w-[94vw] max-w-5xl h-[560px] sm:h-[620px] rounded-3xl bg-[#f2ede4] border border-zinc-300 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.12)] p-4 sm:p-7 z-10 [perspective:2000px] flex items-center justify-center">

        {/* Wire Coil Spiral Binding Rings on Left Spine */}
        <div className="absolute left-3 sm:left-6 top-8 bottom-8 z-50 flex flex-col justify-between pointer-events-none">
          {[...Array(12)].map((_, rIdx) => (
            <div key={rIdx} className="flex items-center gap-1">
              <div className="w-7 h-3 rounded-full bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 shadow-sm border border-zinc-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 shadow-inner" />
            </div>
          ))}
        </div>

        {/* Notebook Page Stack Deck */}
        <div className="relative w-full h-full rounded-2xl bg-white border border-zinc-300 shadow-xl overflow-visible pl-12 sm:pl-16 pr-6 sm:pr-10 py-6 sm:py-8 flex flex-col justify-between">

          {pages.map((page, idx) => {
            const IconComponent = page.icon;

            return (
              <div
                key={page.num}
                ref={(el) => {
                  pageRefs.current[idx] = el;
                }}
                className="absolute inset-y-0 right-0 left-12 sm:left-16 rounded-r-2xl border-l-2 border-zinc-300/80 p-6 sm:p-10 flex flex-col justify-between text-left shadow-[-12px_0_30px_rgba(0,0,0,0.06)] transition-shadow duration-300 overflow-hidden group"
                style={{
                  backgroundColor: page.paperBg,
                  zIndex: pages.length - idx,
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                data-cursor="FLIP"
              >
                {/* Lined Notebook Paper Rule lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_27px,#e5e7eb_28px)] bg-[size:100%_28px] pointer-events-none opacity-50" />

                {/* Vertical Red Margin Line */}
                <div className="absolute top-0 bottom-0 left-8 sm:left-12 w-[1.5px] bg-rose-400/70 pointer-events-none" />

                {/* Subtle Dog-Ear Corner Fold */}
                <div className="absolute top-0 right-0 w-10 h-10 bg-amber-50/90 border-l border-b border-zinc-300 rounded-bl-xl shadow-inner pointer-events-none group-hover:bg-amber-100 transition-colors" />

                {/* Page Header */}
                <div className="flex justify-between items-center relative z-10 border-b border-zinc-300/80 pb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-2xl p-3 text-white flex items-center justify-center shadow-md"
                      style={{ backgroundColor: page.color }}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-zinc-500 tracking-widest uppercase block">
                        {page.subtitle}
                      </span>
                      <h3 className="font-display text-xl sm:text-3xl font-extrabold text-zinc-950 mt-0.5">
                        {page.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-display text-3xl sm:text-4xl font-black text-zinc-300">
                      PAGE {page.num}
                    </span>
                  </div>
                </div>

                {/* Page Main Content Paragraph */}
                <div className="relative z-10 flex-1 flex flex-col justify-center py-4">
                  <p className="font-sans text-sm sm:text-base text-zinc-800 leading-relaxed font-normal max-w-2xl">
                    {page.desc}
                  </p>

                  {/* Bullet Points / Checklist inside notebook */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
                    {page.details.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="bg-white/90 border border-zinc-300 rounded-xl p-3 flex items-center gap-2.5 text-xs font-sans font-semibold text-zinc-800 shadow-sm"
                      >
                        <CheckCircle2
                          className="h-4 w-4 flex-shrink-0"
                          style={{ color: page.color }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Page Bottom Footer Bar */}
                <div className="relative z-10 flex justify-between items-center border-t border-zinc-300/80 pt-3 text-[11px] font-mono text-zinc-500">
                  <span>CHAMELEON EXEC NOTEBOOK // STEP 0{idx + 1}</span>
                  <span className="flex items-center gap-1.5 font-bold text-zinc-800">
                    TURN PAGE TO CONTINUE <ArrowRight className="h-3.5 w-3.5 text-emerald-600" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notebook Bottom Page Indicator Dots */}
      <div className="relative z-20 flex items-center gap-2 mt-5 bg-white px-4 py-2 rounded-full border border-zinc-300 shadow-sm">
        {pages.map((p, idx) => (
          <div
            key={p.num}
            className={`h-2 rounded-full transition-all duration-300 ${activePageIndex === idx
                ? "w-7 bg-emerald-600 shadow-[0_0_8px_rgba(5,150,105,0.4)]"
                : "w-2 bg-zinc-300"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
