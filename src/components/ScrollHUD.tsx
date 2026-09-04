"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Gauge } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navSections = [
  { id: "hero", label: "Hero" },
  { id: "philosophy", label: "Philosophy" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "portfolio", label: "Projects" },
  { id: "lab", label: "GSAP Lab" },
  { id: "contact", label: "Contact" },
];

export default function ScrollHUD() {
  const [progress, setProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    // Create global ScrollTrigger to track progress & velocity
    const trigger = ScrollTrigger.create({
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const prog = Math.round(self.progress * 100);
        setProgress(prog);
        const vel = Math.abs(Math.round(self.getVelocity()));
        setVelocity(vel);
      },
    });

    // Intersection Observer to detect current section
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    navSections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => {
      trigger.kill();
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4 pointer-events-none transition-all duration-300">
      <div className="bg-zinc-950/85 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex items-center justify-between text-white shadow-[0_10px_35px_rgba(0,0,0,0.3)] pointer-events-auto">
        {/* Left: Brand & Velocity Gauge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-emerald-400 font-mono text-[10px] font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            GSAP.ENGINE
          </div>
          <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
            <Gauge className="h-3.5 w-3.5 text-cyan-400" />
            <span>{velocity} px/s</span>
          </div>
        </div>

        {/* Center: Interactive Nav Jump Pills */}
        <div className="hidden md:flex items-center gap-1">
          {navSections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`px-3 py-1 rounded-full text-xs font-sans font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white/15 text-white font-semibold shadow-inner"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {sec.label}
              </button>
            );
          })}
        </div>

        {/* Right: Scroll Progress & Bar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-400 min-w-[34px] text-right">
              {progress}%
            </span>
            <div className="w-16 h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-150 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
