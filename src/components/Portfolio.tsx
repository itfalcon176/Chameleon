"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Laptop, Smartphone, Palette, Globe, Target } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

import { ElementType } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  icon: ElementType;
  desc: string;
  tech: string[];
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "OmniDesk Portal",
    category: "Desktop Application",
    icon: Laptop,
    desc: "A native, highly multi-threaded telemetry manager for enterprise logistics, utilizing secure offline databases.",
    tech: ["Rust", "Tauri", "TypeScript", "SQLite"],
    gradient: "from-[#10b981]/20 to-[#06b6d4]/20",
  },
  {
    id: 2,
    title: "Pulse Mobile App",
    category: "Mobile Application",
    icon: Smartphone,
    desc: "Fluid cross-platform application with biometric logins, background synchronization, and animated layout widgets.",
    tech: ["React Native", "Expo", "Framer Motion", "Supabase"],
    gradient: "from-[#8b5cf6]/20 to-[#ec4899]/20",
  },
  {
    id: 3,
    title: "Vertex Biotech Brand",
    category: "Logo & Branding",
    icon: Palette,
    desc: "Complete visual guideline, geometric vector logo, typography, and stationery layout design for a biotech brand.",
    tech: ["Vector Math", "Figma", "Branding Guide", "3D Renders"],
    gradient: "from-[#f97316]/20 to-[#eab308]/20",
  },
  {
    id: 4,
    title: "Apex Search Campaign",
    category: "SEO Optimization",
    icon: Target,
    desc: "Complete organic visibility upgrade, structured schema graphs, and page speed audit scaling domain traffic by +300%.",
    tech: ["Technical Audit", "Rank Tracker", "Structured Schema", "Lighthouse"],
    gradient: "from-[#ef4444]/20 to-[#f43f5e]/20",
  },
  {
    id: 5,
    title: "Prism Event Platform",
    category: "Event Management",
    icon: Globe,
    desc: "Custom virtual onboarding portal, live interactive voting apps, and stage visual design for a corporate summit.",
    tech: ["Realtime Sockets", "Next.js", "WebRTC", "Event Apps"],
    gradient: "from-[#3b82f6]/20 to-[#06b6d4]/20",
  },
];

export default function Portfolio() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    const scrollWidth = scrollRef.current.scrollWidth;
    const containerWidth = containerRef.current.clientWidth;
    const scrollAmount = scrollWidth - containerWidth;

    const anim = gsap.to(scrollRef.current, {
      x: -scrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollAmount}`,
        pin: true,
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="portfolio"
      className="relative h-screen bg-zinc-50 overflow-hidden border-t border-black/5"
    >
      {/* Title block fixed top/left inside section */}
      <div className="absolute top-12 left-6 md:left-12 z-20 flex flex-col gap-2">
        <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
          Our Projects
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-bold text-zinc-950 tracking-tight leading-none">
          Adaptable{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]">
            Showcase
          </span>
        </h2>
      </div>

      {/* Horizontal Scroll wrapper */}
      <div className="h-full flex items-center pl-6 md:pl-12">
        <div
          ref={scrollRef}
          className="flex gap-8 pr-12 md:pr-24"
          style={{ width: "max-content" }}
        >
          {projects.map((project) => {
            const Icon = project.icon;

            return (
              <div
                key={project.id}
                className="w-80 sm:w-[480px] h-[460px] rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 flex flex-col justify-between relative group overflow-hidden hover:border-emerald-500/40 transition-all duration-500 shadow-xl"
              >
                {/* Glow Background */}
                <div
                  className={`absolute -inset-10 bg-gradient-to-tr ${project.gradient} blur-3xl opacity-20 -z-10 group-hover:opacity-40 transition-opacity duration-500`}
                />

                <div className="flex flex-col gap-4">
                  {/* Category Header */}
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs tracking-wider text-zinc-500 uppercase font-semibold">
                      {project.category}
                    </span>
                    <div className="rounded-xl bg-zinc-100 p-2.5 text-emerald-600 border border-zinc-200 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Title & Desc */}
                  <div className="flex flex-col gap-2 text-left">
                    <h3 className="font-display text-xl sm:text-3xl font-extrabold text-zinc-950 leading-none">
                      {project.title}
                    </h3>
                    <p className="font-sans text-sm text-zinc-600 leading-relaxed mt-2">
                      {project.desc}
                    </p>
                  </div>
                </div>

                {/* Tech & Bottom Link */}
                <div className="flex flex-col gap-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-3.5 py-1 text-[10px] font-semibold text-zinc-700 border border-zinc-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="h-[1px] w-full bg-zinc-200" />

                  {/* Link */}
                  <div className="flex justify-between items-center">
                    <span className="font-sans text-xs font-semibold text-zinc-900 group-hover:text-emerald-600 transition-colors duration-300">
                      View Case Study
                    </span>
                    <div className="h-10 w-10 rounded-full border border-zinc-300 bg-zinc-50 flex items-center justify-center text-zinc-600 group-hover:border-emerald-500 group-hover:text-emerald-600 group-hover:rotate-45 transition-all duration-300 shadow-sm">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
