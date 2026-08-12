"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Eye, Layers, Radio, Rocket, BookOpen, CheckCircle2, ArrowRight, CornerDownRight } from "lucide-react";
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

const notebookPages: NotebookPage[] = [
  {
    num: "01",
    title: "Discovery & Blueprint",
    subtitle: "PAGE 01 // OPERATIONAL BLUEPRINT",
    icon: Search,
    desc: "We open our notebook by mapping your business operations. We document user journeys, define database schema boundaries, and outline exact technical specifications.",
    details: ["Operational Workflow Audit", "Database Schema Boundaries", "High-Level Architecture Map"],
    color: "#059669",
    paperBg: "#ffffff",
  },
  {
    num: "02",
    title: "High-Fidelity Prototyping",
    subtitle: "PAGE 02 // FIGMA WIREFRAMES & DESIGN",
    icon: Eye,
    desc: "Our creative designers sketch grid guides, color schemes, and construct interactive Figma layouts. We validate usability before writing a single line of production code.",
    details: ["Interactive Wireframe Layouts", "Brand Color & Type Tokens", "Usability Validation Prototypes"],
    color: "#0284c7",
    paperBg: "#fcfbf7",
  },
  {
    num: "03",
    title: "Adaptive Agile Coding",
    subtitle: "PAGE 03 // FULL-STACK ARCHITECTURE",
    icon: Layers,
    desc: "We code standard-compliant Next.js websites, mobile layouts, and native desktop systems. Clean TypeScript architecture ensuring blisteringly fast performance.",
    details: ["Next.js & React 19 Speedhouse", "Native OS Executables (Tauri)", "Clean Modular Architecture"],
    color: "#7c3aed",
    paperBg: "#ffffff",
  },
  {
    num: "04",
    title: "Search Authority & SEO",
    subtitle: "PAGE 04 // RANK & PERFORMANCE AUDIT",
    icon: Radio,
    desc: "We tweak Core Web Vitals, adjust schema structures, optimize headers, and build high-authority backlink channels to push your brand to #1 on Google ranks.",
    details: ["Core Web Vitals 100/100", "Structured Schema Graphs", "Organic Rank Elevation"],
    color: "#db2777",
    paperBg: "#fdfbf7",
  },
  {
    num: "05",
    title: "Event Launch & Promotion",
    subtitle: "PAGE 05 // GLOBAL LAUNCH & TRACTION",
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
          end: `+=${totalPages * 1200}`,
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

      // Animate page flips: flip page to -180deg AND set autoAlpha: 0 so it disappears completely
      pageElements.forEach((page, i) => {
        if (i === totalPages - 1) return;

        tl.to(page, {
          rotateY: -180,
          autoAlpha: 0,
          xPercent: -10,
          ease: "power2.inOut",
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
      className="relative h-screen w-screen bg-[#f7f5f0] text-zinc-900 overflow-hidden border-t border-zinc-200 flex flex-col justify-center items-center select-none"
    >
      {/* Warm Ambient Desk Shadow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.01)_0%,rgba(0,0,0,0.05)_100%)] pointer-events-none" />

      {/* Header Info */}
      <div className="relative z-20 flex flex-col items-center text-center gap-2 mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-emerald-800 text-xs font-mono font-bold uppercase tracking-widest shadow-sm">
          <BookOpen className="h-3.5 w-3.5 text-emerald-600" /> Spiral Notebook Flip
        </div>
        <h2 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-950 tracking-tight">
          The Process{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-cyan-600 to-amber-600">
            Notebook
          </span>
        </h2>
        <p className="font-sans text-xs sm:text-sm text-zinc-600 max-w-md">
          Scroll down to flip the notebook pages one-by-one.
        </p>
      </div>

      {/* NORMAL REAL SPIRAL NOTEBOOK */}
      <div className="relative w-[95vw] max-w-5xl h-[600px] sm:h-[660px] rounded-2xl bg-white border border-zinc-300 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.15)] z-10 [perspective:2200px] flex items-center justify-center">
        
        {/* Real Wire Spiral Binding Rings Attached on Left Edge */}
        <div className="absolute -left-4 sm:-left-6 top-8 bottom-8 z-50 flex flex-col justify-between pointer-events-none">
          {[...Array(14)].map((_, rIdx) => (
            <div key={rIdx} className="flex items-center gap-1">
              <div className="w-8 h-3.5 rounded-full bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 shadow-md border border-zinc-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-800 shadow-inner" />
            </div>
          ))}
        </div>

        {/* Notebook Page Stack Deck */}
        <div className="relative w-full h-full rounded-2xl bg-white overflow-hidden flex flex-col justify-between">
          
          {notebookPages.map((page, idx) => {
            const IconComponent = page.icon;

            return (
              <div
                key={page.num}
                ref={(el) => {
                  pageRefs.current[idx] = el;
                }}
                className="absolute inset-0 rounded-r-2xl border-l-2 border-zinc-300 pl-14 sm:pl-20 pr-8 sm:pr-14 py-8 sm:py-12 flex flex-col justify-between text-left shadow-[-15px_0_35px_rgba(0,0,0,0.08)] transition-shadow duration-300 overflow-hidden group"
                style={{
                  backgroundColor: page.paperBg,
                  zIndex: notebookPages.length - idx,
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
                data-cursor="FLIP"
              >
                {/* Lined Notebook Blue Ruled Lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_31px,#e5e7eb_32px)] bg-[size:100%_32px] pointer-events-none opacity-60" />

                {/* Vertical Red Margin Line */}
                <div className="absolute top-0 bottom-0 left-10 sm:left-14 w-[1.5px] bg-rose-400/80 pointer-events-none" />

                {/* Corner Dog-Ear Paper Fold */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-amber-50/90 border-l border-b border-zinc-300 rounded-bl-xl shadow-inner pointer-events-none group-hover:bg-amber-100 transition-colors" />

                {/* Page Header */}
                <div className="flex justify-between items-center relative z-10 border-b-2 border-zinc-300/80 pb-5">
                  <div className="flex items-center gap-4">
                    <div
                      className="rounded-2xl p-3.5 text-white flex items-center justify-center shadow-md"
                      style={{ backgroundColor: page.color }}
                    >
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-zinc-500 tracking-widest uppercase block">
                        {page.subtitle}
                      </span>
                      <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-zinc-950 mt-0.5">
                        {page.title}
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-display text-4xl sm:text-5xl font-black text-zinc-300">
                      PAGE {page.num}
                    </span>
                  </div>
                </div>

                {/* Page Main Content Paragraph */}
                <div className="relative z-10 flex-1 flex flex-col justify-center py-6">
                  <p className="font-sans text-base sm:text-lg text-zinc-800 leading-relaxed font-normal max-w-3xl">
                    {page.desc}
                  </p>

                  {/* Bullet Points / Checklist inside notebook */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                    {page.details.map((item, dIdx) => (
                      <div
                        key={dIdx}
                        className="bg-white/90 border border-zinc-300 rounded-2xl p-4 flex items-center gap-3 text-xs sm:text-sm font-sans font-semibold text-zinc-800 shadow-sm"
                      >
                        <CheckCircle2
                          className="h-5 w-5 flex-shrink-0"
                          style={{ color: page.color }}
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Page Bottom Footer Bar */}
                <div className="relative z-10 flex justify-between items-center border-t-2 border-zinc-300/80 pt-4 text-xs font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <CornerDownRight className="h-4 w-4 text-emerald-600" />
                    NORMAL_SPIRAL_NOTEBOOK_PAGE_{page.num}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-zinc-900">
                    SCROLL DOWN TO TURN PAGE <ArrowRight className="h-4 w-4 text-emerald-600" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notebook Bottom Page Indicator Dots */}
      <div className="relative z-20 flex items-center gap-2.5 mt-6 bg-white px-5 py-2.5 rounded-full border border-zinc-300 shadow-sm">
        {notebookPages.map((p, idx) => (
          <div
            key={p.num}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activePageIndex === idx
                ? "w-8 bg-emerald-600 shadow-[0_0_10px_rgba(5,150,105,0.4)]"
                : "w-2.5 bg-zinc-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
