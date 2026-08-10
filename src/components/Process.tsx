"use client";

import { useEffect, useRef, useState, ElementType } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye, Search, Layers, Radio, Rocket } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  num: string;
  title: string;
  icon: ElementType;
  desc: string;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Discovery & Blueprint",
    icon: Search,
    desc: "We start by analyzing your operations. We map user journeys, outline database boundaries, and write a thorough technical blueprint outlining exact specifications.",
  },
  {
    num: "02",
    title: "High-Fidelity Prototyping",
    icon: Eye,
    desc: "Our creative designers sketch grid guides, color schemes, and construct interactive Figma layouts. We validate usability before writing a single line of production code.",
  },
  {
    num: "03",
    title: "Adaptive Agile Coding",
    icon: Layers,
    desc: "We code standard-compliant Next.js websites, mobile layouts, and native desktop systems. We write clean TypeScript architecture, ensuring high performance.",
  },
  {
    num: "04",
    title: "Search Authority & SEO",
    icon: Radio,
    desc: "We tweak Core Web Vitals, adjust schema structures, optimize headers, and build high-authority backlink channels to push your brand to the top of Google organic ranks.",
  },
  {
    num: "05",
    title: "Event Launch & Promotion",
    icon: Rocket,
    desc: "We launch your platform, run targeted ads across SMM, publish cinematic video packages, and coordinate virtual or physical events to gather customer traction.",
  },
];

// Modern geometric blooming flower component
function ModernFlower({ isActive }: { isActive: boolean }) {
  return (
    <svg
      className="absolute h-16 w-16 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
      style={{ left: "50%", top: "50%" }}
      viewBox="0 0 100 100"
    >
      <defs>
        <radialGradient id="flowerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft background glow */}
      <circle
        cx="50"
        cy="50"
        r="32"
        className={`transition-all duration-1000 ease-out origin-center ${
          isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
        fill="url(#flowerGlow)"
      />

      {/* Flower Petals (Staggered Bloom) */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <path
          key={i}
          d="M 50 50 C 42 32, 45 14, 50 14 C 55 14, 58 32, 50 50"
          fill="none"
          stroke="url(#vineGradient)"
          strokeWidth="1.5"
          className="transition-all duration-1000 ease-out origin-center"
          style={{
            transform: `rotate(${angle}deg) scale(${isActive ? 1 : 0})`,
            transformOrigin: "50px 50px",
            transitionDelay: `${i * 60}ms`,
            opacity: isActive ? 0.8 : 0,
          }}
        />
      ))}

      {/* Core seed */}
      <circle
        cx="50"
        cy="50"
        r="5"
        className="fill-accent transition-transform duration-500 origin-center"
        style={{ transform: `scale(${isActive ? 1.4 : 0.8})` }}
      />
    </svg>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeSteps, setActiveSteps] = useState<boolean[]>([false, false, false, false, false]);
  const [nodePositions, setNodePositions] = useState<number[]>([]);
  const [windowWidth, setWindowWidth] = useState(0);

  // Sync window width
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Measure node offsets relative to process section top
  useEffect(() => {
    const updatePositions = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const positions = nodeRefs.current.map((node) => {
        if (!node) return 0;
        const rect = node.getBoundingClientRect();
        return rect.top + rect.height / 2 - containerRect.top;
      });
      setNodePositions(positions);
    };

    // Delay slightly to let layout stabilize
    const timer = setTimeout(updatePositions, 150);
    window.addEventListener("resize", updatePositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updatePositions);
    };
  }, [windowWidth]);

  // Main scroll animations
  useEffect(() => {
    if (!triggerRef.current || nodePositions.length === 0) return;

    // 1. Winding vine drawing animation
    let vineAnim: gsap.core.Tween | undefined;
    if (pathRef.current) {
      const path = pathRef.current;
      const length = path.getTotalLength();

      // Initialize path stroke dash offset
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;

      vineAnim = gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 35%",
          end: "bottom 65%",
          scrub: 1,
        },
      });
    }

    // 2. Fading in steps and triggering active step flower blooming
    const stepsCtx = gsap.context(() => {
      const stepItems = gsap.utils.toArray(".process-step");
      stepItems.forEach((step, idx) => {
        const target = step as HTMLElement;
        gsap.fromTo(
          target,
          { opacity: 0.1, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: target,
              start: "top 75%",
              end: "top 35%",
              scrub: true,
              // Bloom flower when scrolling down past node
              onEnter: () => {
                setActiveSteps((prev) => {
                  const next = [...prev];
                  next[idx] = true;
                  return next;
                });
              },
              // Un-bloom flower when scrolling back up above node
              onLeaveBack: () => {
                setActiveSteps((prev) => {
                  const next = [...prev];
                  next[idx] = false;
                  return next;
                });
              },
            },
          }
        );
      });
    }, containerRef);

    return () => {
      vineAnim?.scrollTrigger?.kill();
      stepsCtx.revert();
    };
  }, [nodePositions]);

  // Generate Bezier path coordinates winding between nodes
  const getSvgPath = () => {
    if (nodePositions.length === 0) return "";

    const isMobile = windowWidth < 768;
    const cx = isMobile ? 15 : (containerRef.current?.clientWidth || 1000) / 2;
    const waveWidth = isMobile ? 12 : 110;

    // Start path slightly above the first node
    let d = `M ${cx} 0`;

    const y0 = nodePositions[0];
    const cp0x = isMobile ? cx + 6 : cx - waveWidth;
    d += ` C ${cp0x} ${y0 * 0.3}, ${cp0x} ${y0 * 0.7}, ${cx} ${y0}`;

    // Loop through step nodes
    for (let i = 0; i < nodePositions.length - 1; i++) {
      const yStart = nodePositions[i];
      const yEnd = nodePositions[i + 1];
      const dy = yEnd - yStart;

      // On mobile, curve slightly to the right (towards card content)
      // On desktop, alternate curve left/right based on card layout
      const dir = isMobile ? 1 : (i % 2 === 0 ? 1 : -1);

      const cp1x = cx + dir * waveWidth;
      const cp1y = yStart + dy * 0.35;
      const cp2x = cp1x;
      const cp2y = yEnd - dy * 0.35;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${cx} ${yEnd}`;
    }

    // Extend path slightly below the last node
    const yLast = nodePositions[nodePositions.length - 1];
    const cpLastx = isMobile ? cx + 6 : cx + ((nodePositions.length - 1) % 2 === 0 ? -waveWidth : waveWidth);
    const endY = yLast + 80;
    d += ` C ${cpLastx} ${yLast + 25}, ${cpLastx} ${yLast + 55}, ${cx} ${endY}`;

    return d;
  };

  return (
    <section
      id="process"
      ref={containerRef}
      className="relative py-24 md:py-36 bg-white overflow-hidden border-t border-black/5"
    >
      {/* Dynamic Winding Vine SVG Background */}
      {nodePositions.length > 0 && (
        <svg className="absolute inset-x-0 top-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="vineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00c078" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
          </defs>
          {/* Subtle background path track */}
          <path
            d={getSvgPath()}
            fill="none"
            stroke="rgba(0, 0, 0, 0.05)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Animated vine path */}
          <path
            ref={pathRef}
            d={getSvgPath()}
            fill="none"
            stroke="url(#vineGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: "drop-shadow(0 0 5px rgba(0, 192, 120, 0.3))",
            }}
          />
        </svg>
      )}

      <div className="mx-auto max-w-5xl px-6 md:px-12 relative z-10">
        {/* Header info */}
        <div className="flex flex-col gap-4 text-center items-center mb-20 md:mb-28">
          <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            Our Flow
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-950">
            The Shape-Shifting{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]">
              Process
            </span>
          </h2>
          <p className="font-sans text-base text-zinc-600 max-w-lg mt-2">
            How we adapt our teams to bring your product from blueprint to global scale.
          </p>
        </div>

        {/* Steps Container */}
        <div ref={triggerRef} className="relative flex flex-col gap-24 md:gap-32 pl-8 md:pl-0">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            const isEven = idx % 2 === 0;

            return (
              <div
                key={step.num}
                className={`process-step relative flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Block */}
                <div className={`w-full md:w-1/2 flex ${isEven ? "md:justify-start md:pl-16" : "md:justify-end md:pr-16"}`}>
                  <div className="bg-zinc-50/80 hover:bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 flex flex-col gap-4 text-left max-w-md w-full relative group hover:border-emerald-500/30 hover:shadow-xl transition-all duration-300 shadow-sm">
                    <span className="font-display text-3xl font-extrabold text-zinc-200 group-hover:text-emerald-500/20 transition-colors duration-300 absolute top-4 right-4">
                      {step.num}
                    </span>
                    <div className="rounded-xl bg-white p-3 text-emerald-600 max-w-max border border-zinc-200 shadow-sm group-hover:border-emerald-500/30 transition-all duration-300">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-zinc-950">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {/* Center Node dot / Blooming Flower (desktop: centered, mobile: aligned left) */}
                <div
                  ref={(el) => {
                    nodeRefs.current[idx] = el;
                  }}
                  className={`absolute left-[15px] md:left-1/2 top-6 -translate-x-1/2 h-8 w-8 rounded-full bg-white border transition-colors duration-500 flex items-center justify-center z-10 shadow-sm ${
                    activeSteps[idx] ? "border-emerald-500/80" : "border-zinc-300"
                  }`}
                >
                  {/* Central seed dot */}
                  <span
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-500 ${
                      activeSteps[idx]
                        ? "bg-emerald-500 scale-110 shadow-[0_0_8px_var(--accent-color)]"
                        : "bg-zinc-300"
                    }`}
                  />
                  {/* Blooming flower petals & glow */}
                  <ModernFlower isActive={activeSteps[idx]} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
