"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Globe,
  Monitor,
  Smartphone,
  PenTool,
  Search,
  ArrowUpRight,
  Sparkles,
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
  id: string;
  title: string;
  subtitle: string;
  icon: ElementType;
  desc: string;
  features: string[];
  color: string;
  gradient: string;
}

const servicesList: ServiceData[] = [
  {
    id: "web",
    title: "Website Development",
    subtitle: "Modern Web Experiences",
    icon: Globe,
    desc: "We construct blisteringly fast, hyper-optimized, and premium websites. From custom headless Next.js speedhouses to complex WebGL interfaces, we optimize for fluid scrolling and user engagement.",
    features: ["Next.js & React Architectures", "Headless CMS & Commerce", "Lenis & GSAP Smooth Scrub"],
    color: "#10b981",
    gradient: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    id: "desktop",
    title: "Desktop Applications",
    subtitle: "Native System Engines",
    icon: Monitor,
    desc: "High-performance native applications built for Windows and macOS. We engineer secure multi-threaded architectures, hardware integrations, and modern desktop UI systems.",
    features: ["Native OS Executables", "Multi-Threaded Performance", "Offline Encrypted Storage"],
    color: "#06b6d4",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: "mobile",
    title: "Mobile App Engineering",
    subtitle: "Fluid Android & iOS",
    icon: Smartphone,
    desc: "Cross-platform and native mobile software designed to fit in your palm. Fluid micro-gestures, offline caching, and real-time screen synchronization.",
    features: ["React Native & Flutter", "Biometric Authentication", "Real-Time Push Sockets"],
    color: "#8b5cf6",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: "uiux",
    title: "UI/UX Design Systems",
    subtitle: "Interactive Blueprints",
    icon: FigmaIcon,
    desc: "Designing visually striking, intuitive layouts that guide users seamlessly. Interactive Figma wireframes, design tokens, and motion prototypes.",
    features: ["User Journey Mapping", "Design System Libraries", "Interactive Prototypes"],
    color: "#ec4899",
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    id: "branding",
    title: "Branding & Logo Systems",
    subtitle: "Identity Formulations",
    icon: PenTool,
    desc: "We formulate unique digital brand identities that anchor customer trust. Vector logo geometry, corporate styling guides, and brand positioning.",
    features: ["Vector Geometry Grids", "Brand Guideline Portals", "Typography & Color Tokens"],
    color: "#f97316",
    gradient: "from-amber-500/20 to-orange-500/20",
  },
  {
    id: "marketing",
    title: "SEO & Digital Acceleration",
    subtitle: "Search Page Domination",
    icon: Search,
    desc: "Climbing organic search ladders to rank #1. Extensive keyword audits, high-authority backlink maps, schema graphs, and page performance optimization.",
    features: ["Core Web Vitals 100/100", "Structured Schema Graphs", "Organic Rank Tracking"],
    color: "#10b981",
    gradient: "from-emerald-500/20 to-teal-500/20",
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        const nextCard = cards[i + 1];

        // Pin current card while next card slides over
        ScrollTrigger.create({
          trigger: card,
          start: "top top+=100",
          endTrigger: nextCard,
          end: "top top+=100",
          pin: true,
          pinSpacing: false,
          scrub: 0.5,
        });

        // Scale down and blur previous card as next card enters
        gsap.to(card, {
          scale: 0.92,
          opacity: 0.4,
          filter: "blur(4px)",
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top bottom",
            end: "top top+=100",
            scrub: 0.5,
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative py-24 md:py-36 bg-zinc-950 text-white overflow-hidden border-t border-white/10"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-4 text-center items-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-bold uppercase tracking-widest">
            <Sparkles className="h-3.5 w-3.5" /> GSAP Pinned Card Deck
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
            Our Adaptive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400">
              Capabilities
            </span>
          </h2>
          <p className="font-sans text-base md:text-lg text-zinc-400 max-w-xl">
            Scroll down to watch our service modules stack smoothly with GSAP ScrollTrigger card deck mechanics.
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative flex flex-col gap-12 max-w-5xl mx-auto pb-24">
          {servicesList.map((service, idx) => {
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="w-full rounded-3xl bg-zinc-900/90 border border-white/10 p-8 sm:p-12 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden transition-all duration-300 group"
                data-cursor="STACK"
              >
                {/* Glow ambient layer */}
                <div
                  className={`absolute -inset-10 bg-gradient-to-tr ${service.gradient} blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none -z-10`}
                />

                {/* Left Card Info */}
                <div className="lg:col-span-7 flex flex-col gap-6 text-left">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="rounded-2xl p-3.5 text-white flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: service.color }}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase font-semibold">
                        {service.subtitle}
                      </span>
                    </div>
                    <span className="font-mono text-xl font-bold text-zinc-600">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                    {service.title}
                  </h3>

                  <p className="font-sans text-base text-zinc-300 leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="flex flex-wrap gap-2.5 mt-2">
                    {service.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="rounded-full bg-white/5 border border-white/10 px-3.5 py-1.5 text-xs font-medium text-zinc-300"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 transition-colors group/link"
                    >
                      Start Project with this Stack
                      <ArrowUpRight className="h-4 w-4 transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                    </a>
                  </div>
                </div>

                {/* Right Interactive Card Preview Visual */}
                <div className="lg:col-span-5 flex justify-center items-center">
                  <div className="w-full h-56 sm:h-64 rounded-2xl bg-zinc-950/80 border border-white/10 p-6 flex flex-col justify-between relative overflow-hidden group-hover:border-emerald-500/40 transition-colors duration-500">
                    <div className="flex justify-between items-center text-xs font-mono text-zinc-500 border-b border-white/10 pb-2">
                      <span>MODULE_{service.id.toUpperCase()}</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>

                    <div className="flex-1 flex flex-col items-center justify-center gap-3 py-4">
                      <IconComponent
                        className="h-12 w-12 transition-transform duration-500 group-hover:scale-110"
                        style={{ color: service.color }}
                      />
                      <span className="font-mono text-xs text-zinc-400 tracking-widest uppercase">
                        GSAP SCROLLTRIGGER READY
                      </span>
                    </div>

                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${((idx + 1) / servicesList.length) * 100}%`,
                          backgroundColor: service.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
