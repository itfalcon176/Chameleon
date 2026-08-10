"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Monitor,
  Smartphone,
  Briefcase,
  PenTool,
  Video,
  Search,
  MessageSquare,
  Calendar,
} from "lucide-react";
import { ElementType } from "react";

const FigmaIcon = () => (
  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5A3.5 3.5 0 0 1 19 5.5v0A3.5 3.5 0 0 1 15.5 9H12V2z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M12 9h3.5A3.5 3.5 0 0 1 19 12.5v0A3.5 3.5 0 0 1 15.5 16H12V9z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 0 1-3.5 3.5h0A3.5 3.5 0 0 1 5 19.5z" />
  </svg>
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceData {
  title: string;
  subtitle: string;
  icon: ElementType;
  desc: string;
  features: string[];
  color: string;
  graphicType: string;
}

const servicesList: ServiceData[] = [
  {
    title: "Website Development",
    subtitle: "Modern Web Experiences",
    icon: Globe,
    desc: "We construct blisteringly fast, hyper-optimized, and premium websites. From headless custom layouts to Next.js speedhouses, we optimize for flawless visual narrative and fluid scrolling.",
    features: ["Next.js & React Architectures", "Headless CMS Integrations", "Lenis & GSAP Animation Packs"],
    color: "#10b981",
    graphicType: "web",
  },
  {
    title: "Desktop Application Development",
    subtitle: "Native System Engines",
    icon: Monitor,
    desc: "Native, high-performance applications built for Windows and macOS. We build secure multi-threaded architectures, hardware integrations, and sleek, modern interfaces.",
    features: ["Native OS Integrations", "Multi-threaded Execution", "Offline Database Engines"],
    color: "#06b6d4",
    graphicType: "desktop",
  },
  {
    title: "Mobile App Development",
    subtitle: "Fluid Android & iOS",
    icon: Smartphone,
    desc: "Cross-platform and native mobile software designed to fit in your palm. Fluid gestures, offline caching, and responsive screen updates mapped to perfection.",
    features: ["React Native & Flutter", "Biometric Authentication", "Real-Time Synchronization"],
    color: "#8b5cf6",
    graphicType: "mobile",
  },
  {
    title: "UI/UX Design",
    subtitle: "Interactive Blueprints",
    icon: FigmaIcon,
    desc: "Designing visually striking, intuitive layouts that guide users seamlessly. Wireframes, high-fidelity interactive mockups, and micro-interaction prototypes.",
    features: ["User Journey Blueprints", "High-Fidelity Prototypes", "Design System Libraries"],
    color: "#ec4899",
    graphicType: "uiux",
  },
  {
    title: "Branding",
    subtitle: "Identity Formulations",
    icon: Briefcase,
    desc: "We formulate unique digital brand strategies that anchor customer trust. Corporate guidelines, typography guidelines, and brand narratives built for longevity.",
    features: ["Brand Guideline Portals", "Corporate Positioning", "Narrative Tone Design"],
    color: "#f97316",
    graphicType: "branding",
  },
  {
    title: "Logo Design",
    subtitle: "Iconic Landmarks",
    icon: PenTool,
    desc: "Memorable corporate logos engineered from vector geometry grids. Scaling perfectly from favicons to billboard banners, reflecting your business values.",
    features: ["Vector Geometry Grids", "Responsive Logo Systems", "Complete Identity Packages"],
    color: "#eab308",
    graphicType: "logo",
  },
  {
    title: "Videography",
    subtitle: "Cinematic Digital Stories",
    icon: Video,
    desc: "High-production corporate ads, reels, and video packages. Storyboarding, professional filming, editing, color grading, and dynamic title overlays.",
    features: ["Ad Film Production", "Social Reels & Promos", "Visual Effects & Transitions"],
    color: "#ef4444",
    graphicType: "video",
  },
  {
    title: "SEO Optimization",
    subtitle: "Search Page Domination",
    icon: Search,
    desc: "Climbing organic search ladders to rank #1. Extensive keyword audits, high-authority backlink maps, technical schema tags, and page speed adjustments.",
    features: ["Core Web Vitals Optimization", "Structured Schema Graphs", "Competitor Analytics Systems"],
    color: "#10b981",
    graphicType: "seo",
  },
  {
    title: "Social Media Marketing",
    subtitle: "Engagement Engines",
    icon: MessageSquare,
    desc: "Targeted digital marketing campaigns designed to build loyal customer bases. Custom copy, graphics, scheduling pipelines, and full lead-generation funnels.",
    features: ["Ad Funnel Campaigns", "Community Building Guides", "Key Performance Tracking"],
    color: "#06b6d4",
    graphicType: "smm",
  },
  {
    title: "Event Management",
    subtitle: "Exquisite Event Formats",
    icon: Calendar,
    desc: "Flawless execution of physical and virtual corporate events. Stage designs, sound systems, guest onboarding portals, and complete event coordination schedules.",
    features: ["Virtual Webinar Portals", "Corporate Stage Engineering", "Audience Onboarding Apps"],
    color: "#8b5cf6",
    graphicType: "events",
  },
];

export default function Services() {
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!pinRef.current) return;

    // Pin the layout and track scroll progress to update service index
    const trigger = ScrollTrigger.create({
      trigger: pinRef.current,
      start: "top top",
      end: `+=${servicesList.length * 90}vh`,
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const rawProgress = self.progress;
        // Interpolate to get active service index
        const index = Math.min(Math.floor(rawProgress * servicesList.length), servicesList.length - 1);
        setActiveIndex(index);
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const activeService = servicesList[activeIndex];
  const IconComponent = activeService.icon;

  return (
    <section ref={pinRef} id="services" className="relative h-screen bg-zinc-50 overflow-hidden border-t border-black/5">
      <div className="absolute inset-0 bg-glow-radial opacity-15 pointer-events-none -z-10" />
      
      <div className="h-full mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column - Service Content Panel */}
        <div className="lg:col-span-6 flex flex-col justify-center gap-6 text-left h-[70vh] lg:h-auto">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
              Our Capabilities
            </span>
            <span className="h-[1px] w-8 bg-zinc-300" />
            <span className="font-mono text-xs text-zinc-400">
              {String(activeIndex + 1).padStart(2, "0")} / {String(servicesList.length).padStart(2, "0")}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex flex-col gap-5"
            >
              <div className="flex items-center gap-4">
                <div
                  className="rounded-2xl p-4 text-white flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: activeService.color }}
                >
                  <IconComponent className="h-7 w-7" />
                </div>
                <div>
                  <span className="font-sans text-xs tracking-wider text-zinc-500 block">
                    {activeService.subtitle}
                  </span>
                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-zinc-950 mt-0.5">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <p className="font-sans text-base text-zinc-600 leading-relaxed max-w-xl">
                {activeService.desc}
              </p>

              {/* Service tags */}
              <div className="flex flex-col gap-3 mt-2">
                {activeService.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: activeService.color }}
                    />
                    <span className="font-sans text-sm text-zinc-800 font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="h-[2px] w-full bg-zinc-200 relative mt-6 overflow-hidden">
            <motion.div
              className="h-full absolute left-0 top-0 bg-emerald-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeIndex + 1) / servicesList.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Right Column - Dynamic Graphical Showcase */}
        <div className="lg:col-span-6 flex justify-center items-center h-[35vh] lg:h-auto">
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-3xl bg-white border border-zinc-200 flex items-center justify-center overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.03)_100%)] z-10" />

            <AnimatePresence mode="wait">
              {/* Render dynamic background visual based on graphicType */}
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-8 flex flex-col justify-center items-center"
              >
                {/* 1. Web Graphic */}
                {activeService.graphicType === "web" && (
                  <div className="w-full h-full flex flex-col justify-between border border-zinc-200 rounded-xl bg-zinc-50 overflow-hidden shadow-md p-4">
                    <div className="flex gap-1.5 pb-3 border-b border-zinc-200">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    </div>
                    <div className="flex-1 flex flex-col gap-3 py-4">
                      <div className="h-5 w-2/3 bg-emerald-500/20 rounded-md animate-pulse" />
                      <div className="h-3 w-full bg-zinc-200 rounded-sm" />
                      <div className="h-3 w-4/5 bg-zinc-200 rounded-sm" />
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="h-10 bg-white rounded-md border border-zinc-200" />
                        <div className="h-10 bg-white rounded-md border border-zinc-200" />
                        <div className="h-10 bg-white rounded-md border border-zinc-200" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Desktop Graphic */}
                {activeService.graphicType === "desktop" && (
                  <div className="w-full h-full border border-zinc-200 rounded-xl bg-zinc-950 font-mono text-[10px] text-emerald-400 p-4 shadow-xl flex flex-col gap-2">
                    <div className="text-zinc-400 border-b border-zinc-800 pb-1 flex justify-between">
                      <span>chameleon_terminal.sh</span>
                      <span>120 FPS</span>
                    </div>
                    <div className="text-white">$ npm run build</div>
                    <div className="text-zinc-400">Executing native binaries...</div>
                    <div className="text-cyan-400 animate-pulse">✓ Compilation successful.</div>
                    <div className="text-zinc-500 mt-auto">Process completed in 24.8ms</div>
                  </div>
                )}

                {/* 3. Mobile Graphic */}
                {activeService.graphicType === "mobile" && (
                  <div className="w-48 h-full border-4 border-zinc-300 rounded-3xl bg-zinc-900 shadow-xl relative overflow-hidden flex flex-col">
                    <div className="h-4 w-16 bg-zinc-700 rounded-full mx-auto mt-2 mb-1" />
                    <div className="flex-1 flex flex-col p-3 gap-3">
                      <div className="h-8 rounded-lg bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 border border-white/10 flex items-center justify-center text-[10px] text-white font-bold uppercase tracking-wider">
                        Fluid App
                      </div>
                      <div className="flex-1 rounded-lg bg-zinc-800 p-2 flex flex-col gap-1.5">
                        <span className="h-1.5 w-1/2 bg-zinc-600 rounded-full" />
                        <span className="h-1.5 w-4/5 bg-zinc-700 rounded-full" />
                        <div className="flex-1 flex items-end justify-between mt-2">
                          <span className="h-5 w-5 rounded-full bg-emerald-500/40" />
                          <span className="h-5 w-5 rounded-full bg-cyan-500/40" />
                          <span className="h-5 w-5 rounded-full bg-zinc-600" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. UIUX Graphic */}
                {activeService.graphicType === "uiux" && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute w-36 h-36 border border-dashed border-zinc-300 rounded-full animate-spin-slow" />
                    <div className="absolute w-24 h-24 border border-zinc-300 rounded-xl bg-white shadow-sm" />
                    {/* Node points */}
                    <span className="absolute top-8 left-8 h-3 w-3 rounded-full bg-pink-500 border-2 border-white shadow-sm" />
                    <span className="absolute bottom-8 right-8 h-3 w-3 rounded-full bg-pink-500 border-2 border-white shadow-sm" />
                    <span className="absolute top-12 right-12 h-3 w-3 rounded-full bg-cyan-500 border-2 border-white shadow-sm" />
                    {/* Measurement line */}
                    <div className="absolute w-28 h-[1px] bg-emerald-500/60 rotate-45" />
                    <span className="absolute bg-emerald-600 text-white font-mono text-[8px] font-bold px-1 rounded transform rotate-45 -translate-y-2">
                      R: 240px
                    </span>
                  </div>
                )}

                {/* 5. Branding Graphic */}
                {activeService.graphicType === "branding" && (
                  <div className="w-full h-full flex flex-col gap-3 p-4">
                    <div className="text-left">
                      <span className="font-display text-4xl font-extrabold tracking-tight text-zinc-950 block">
                        Aa
                      </span>
                      <span className="font-sans text-[10px] text-zinc-400 tracking-wider font-semibold">
                        BRAND STYLE GUIDE / TYPEFACE
                      </span>
                    </div>
                    <div className="flex gap-2.5 mt-2">
                      <span className="h-10 w-10 rounded-xl bg-orange-500 shadow-md" />
                      <span className="h-10 w-10 rounded-xl bg-zinc-200 shadow-sm" />
                      <span className="h-10 w-10 rounded-xl bg-zinc-900 shadow-md" />
                    </div>
                    <div className="h-[2px] w-full bg-zinc-200 mt-2" />
                    <div className="font-sans text-xs text-zinc-500 italic text-left">
                      &quot;Adapting aesthetics seamlessly.&quot;
                    </div>
                  </div>
                )}

                {/* 6. Logo Graphic */}
                {activeService.graphicType === "logo" && (
                  <div className="w-full h-full flex items-center justify-center p-6 relative">
                    {/* Isometric alignment grid lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:16px_16px]" />
                    <svg
                      viewBox="0 0 100 100"
                      className="w-32 h-32 text-emerald-600 drop-shadow-[0_4px_12px_var(--accent-glow)] stroke-[1.5]"
                      fill="none"
                      stroke="currentColor"
                    >
                      {/* Technical draw outline */}
                      <polygon points="50,10 80,35 80,65 50,90 20,65 20,35" />
                      <circle cx="50" cy="50" r="25" />
                      <path d="M 50 10 L 50 90" strokeDasharray="2 2" />
                      <path d="M 20 50 L 80 50" strokeDasharray="2 2" />
                    </svg>
                  </div>
                )}

                {/* 7. Video Graphic */}
                {activeService.graphicType === "video" && (
                  <div className="w-full h-full border border-zinc-200 rounded-xl bg-zinc-950 shadow-xl overflow-hidden flex flex-col p-4">
                    <div className="flex justify-between items-center text-xs text-zinc-400 pb-2 border-b border-zinc-800">
                      <span className="text-red-400 font-semibold">REC [🔴]</span>
                      <span>4K 60FPS</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border-2 border-zinc-700 flex items-center justify-center text-emerald-400 animate-pulse cursor-pointer hover:scale-110 transition-transform">
                        <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-12 border-l-emerald-400 ml-1" />
                      </div>
                    </div>
                    <div className="h-6 flex items-center justify-between text-[10px] text-zinc-400 font-mono mt-auto">
                      <span>00:14:28:02</span>
                      <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-emerald-500" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 8. SEO Graphic */}
                {activeService.graphicType === "seo" && (
                  <div className="w-full h-full flex flex-col gap-4 p-4 text-left">
                    <span className="font-sans text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                      SERP Growth Analytics
                    </span>
                    <div className="flex-1 flex items-end gap-3 mt-2 h-24">
                      <div className="w-full bg-zinc-200 rounded-t h-1/4" />
                      <div className="w-full bg-zinc-200 rounded-t h-2/5" />
                      <div className="w-full bg-zinc-300 rounded-t h-1/2 animate-pulse" />
                      <div className="w-full bg-gradient-to-t from-emerald-500 to-cyan-500 rounded-t h-4/5 shadow-[0_4px_12px_var(--accent-glow)]" />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] text-emerald-600 font-bold mt-2">
                      <span>Rank: #1</span>
                      <span>Growth: +420%</span>
                    </div>
                  </div>
                )}

                {/* 9. SMM Graphic */}
                {activeService.graphicType === "smm" && (
                  <div className="w-full h-full flex flex-col gap-3 p-4 justify-center">
                    <div className="bg-white rounded-xl p-3 border border-zinc-200 shadow-sm text-left flex items-start gap-3">
                      <span className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 text-xs font-bold font-display">
                        CH
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-zinc-900">Chameleon Marketing</span>
                        <span className="text-[9px] text-zinc-400">Sponsored</span>
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-zinc-200 shadow-sm text-left flex justify-between items-center">
                      <span className="text-xs text-zinc-700 font-medium">Total Engagements</span>
                      <span className="font-mono text-sm text-cyan-600 font-bold">14.2k</span>
                    </div>
                  </div>
                )}

                {/* 10. Events Graphic */}
                {activeService.graphicType === "events" && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Concentric radiating spheres */}
                    <div className="absolute w-36 h-36 border border-emerald-500/25 rounded-full animate-ping" />
                    <div className="absolute w-24 h-24 border border-cyan-500/30 rounded-full animate-pulse" />
                    <div className="absolute w-12 h-12 bg-emerald-50 border border-zinc-200 rounded-full flex items-center justify-center shadow-sm">
                      <Calendar className="h-5 w-5 text-emerald-600 animate-bounce" />
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
