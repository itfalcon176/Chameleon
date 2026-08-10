"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Layers, Rocket, Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState(0); // 0 = Statement, 1 = Design, 2 = Build, 3 = Market
  const activeSlideRef = useRef(0);

  // GSAP ScrollTrigger Configuration
  useEffect(() => {
    if (!containerRef.current || !triggerRef.current) return;

    const words = triggerRef.current.querySelectorAll(".reveal-word");

    ScrollTrigger.getAll().forEach((t) => {
      if (t.vars.trigger === containerRef.current) t.kill();
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3800",
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;

          let current = 0;
          if (progress < 0.26) {
            current = 0;
          } else if (progress < 0.52) {
            current = 1;
          } else if (progress < 0.76) {
            current = 2;
          } else {
            current = 3;
          }

          if (current !== activeSlideRef.current) {
            activeSlideRef.current = current;
            setActiveSlide(current);
          }
        },
      },
    });

    // Phase 1: Scroll-linked word highlight & smooth logo reveal on the left
    tl.fromTo(
      ".chameleon-scroll-logo",
      { opacity: 0, scale: 0.5, x: -70, rotate: -20 },
      { opacity: 1, scale: 1, x: 0, rotate: 0, duration: 1.4, ease: "power2.out" },
      0
    );

    tl.to(
      words,
      {
        opacity: 1,
        color: "#09090b",
        stagger: 0.12,
        duration: 1.6,
        ease: "power1.out",
      },
      0
    );

    // Fade out statement container
    tl.to(".statement-container", {
      opacity: 0,
      scale: 0.96,
      y: -40,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Phase 2: Design Slide Reveal
    tl.fromTo(
      ".slide-design",
      { opacity: 0, y: 50, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
    );
    tl.to({}, { duration: 1.1 });
    tl.to(".slide-design", { opacity: 0, y: -40, duration: 0.8, ease: "power2.inOut" });

    // Phase 3: Build Slide Reveal
    tl.fromTo(
      ".slide-build",
      { opacity: 0, y: 50, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
    );
    tl.to({}, { duration: 1.1 });
    tl.to(".slide-build", { opacity: 0, y: -40, duration: 0.8, ease: "power2.inOut" });

    // Phase 4: Market Slide Reveal
    tl.fromTo(
      ".slide-market",
      { opacity: 0, y: 50, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }
    );
    tl.to({}, { duration: 1.2 });

    return () => {
      tl.scrollTrigger?.kill();
    };
  }, []);

  const statementText =
    "At Chameleon, we believe in a world where technology inspires people, connects them, and drives meaningful experiences - and we're here to build it.";
  const wordSpans = statementText.split(" ");

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative w-screen h-screen bg-white overflow-hidden border-t border-black/5"
    >
      {/* 1. Subtle Ambient Meshes */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ease-out">
        {activeSlide === 0 && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,192,120,0.06)_0%,transparent_65%)]" />
        )}
        {activeSlide === 1 && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(236,72,153,0.08)_0%,transparent_60%)]" />
        )}
        {activeSlide === 2 && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(2,132,199,0.08)_0%,transparent_60%)]" />
        )}
        {activeSlide === 3 && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(0,192,120,0.08)_0%,transparent_60%)]" />
        )}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none opacity-50" />

      {/* 2. Modern Interactive Progress Dots (Bottom Indicator) */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-zinc-100/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-zinc-200 shadow-sm">
        {[
          { id: 0, label: "Philosophy" },
          { id: 1, label: "Design" },
          { id: 2, label: "Build" },
          { id: 3, label: "Market" },
        ].map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-2 transition-all duration-300 ${
              activeSlide === item.id ? "opacity-100" : "opacity-40"
            }`}
          >
            <span
              className={`h-2 rounded-full transition-all duration-300 ${
                activeSlide === item.id
                  ? "w-6 bg-gradient-to-r from-emerald-500 to-cyan-500"
                  : "w-2 bg-zinc-400"
              }`}
            />
            {activeSlide === item.id && (
              <span className="font-sans text-[11px] font-bold text-zinc-900 uppercase tracking-wider">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 3. Text & Content Overlays */}
      <div className="relative z-20 h-full w-full mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-center">
        
        {/* Phase 1: Scroll-reveal Statement */}
        <div
          ref={triggerRef}
          className="statement-container absolute inset-x-6 md:inset-x-12 flex flex-col justify-center items-center text-center max-w-5xl mx-auto"
        >
          {/* Chameleon Logo emerging smoothly on scroll on the left */}
          <div className="chameleon-scroll-logo absolute -left-4 sm:-left-12 lg:-left-24 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-0 z-20">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-[0_20px_50px_-10px_rgba(0,192,120,0.25)] flex items-center justify-center p-3">
              {/* Outer soft multi-color glow */}
              <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-emerald-400/25 via-cyan-400/25 to-purple-400/20 blur-xl opacity-80" />
              {/* Rotating subtle dashed ring */}
              <div className="absolute inset-1.5 rounded-full border border-dashed border-emerald-500/30 animate-spin-slow" />
              {/* Official Mascot Image */}
              <div className="relative w-16 h-16 sm:w-22 sm:h-22 lg:w-28 lg:h-28 flex items-center justify-center">
                <Image
                  src="/CH.png"
                  alt="Chameleon Mascot"
                  width={150}
                  height={150}
                  priority
                  className="w-full h-full object-contain drop-shadow-[0_6px_16px_rgba(0,192,120,0.35)]"
                />
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
            <Compass className="h-3.5 w-3.5" />
            Our Philosophy
          </div>

          <p className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold tracking-tight text-zinc-300 leading-[1.35] max-w-4xl">
            {wordSpans.map((word, idx) => (
              <span
                key={idx}
                className="reveal-word inline-block mr-2.5 md:mr-3.5 transition-all duration-200 opacity-20"
                style={{ color: "rgba(0,0,0,0.18)" }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Phase 2: Slide 01 - Design */}
        <div className="slide-design absolute inset-0 opacity-0 pointer-events-none grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-center">
          <div className="lg:col-span-7 flex flex-col justify-center gap-6 text-left max-w-2xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-pink-700 text-xs font-bold uppercase tracking-wider max-w-max shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Pillar 01 // Aesthetics
            </div>
            <h2 className="font-display text-6xl sm:text-7xl md:text-9xl font-black tracking-tight text-zinc-950 leading-none">
              Design
            </h2>
            <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed max-w-xl font-normal">
              Intelligent design is the essence of nature; that&apos;s our inspiration in crafting tomorrow&apos;s digital realm and user journeys.
            </p>
            <div className="mt-2">
              <a
                href="#services"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-950 text-white font-sans text-xs sm:text-sm font-semibold hover:bg-pink-600 transition-all duration-300 group shadow-md"
              >
                Explore Services
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 h-[30vh] lg:h-auto" />
        </div>

        {/* Phase 3: Slide 02 - Build */}
        <div className="slide-build absolute inset-0 opacity-0 pointer-events-none grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-center">
          <div className="lg:col-span-5 h-[30vh] lg:h-auto" />
          
          <div className="lg:col-span-7 flex flex-col justify-center gap-6 text-left lg:text-right lg:items-end max-w-2xl pointer-events-auto lg:ml-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-700 text-xs font-bold uppercase tracking-wider max-w-max shadow-sm">
              <Layers className="h-3.5 w-3.5" />
              Pillar 02 // Engineering
            </div>
            <h2 className="font-display text-6xl sm:text-7xl md:text-9xl font-black tracking-tight text-zinc-950 leading-none">
              Build
            </h2>
            <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed max-w-xl lg:text-right font-normal">
              Constantly adopting cutting edge native architectures and Next.js performance for your enterprise to leave a lasting global imprint.
            </p>
            <div className="mt-2">
              <a
                href="#process"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-950 text-white font-sans text-xs sm:text-sm font-semibold hover:bg-cyan-600 transition-all duration-300 group shadow-md"
              >
                Explore Process
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Phase 4: Slide 03 - Market */}
        <div className="slide-market absolute inset-0 opacity-0 pointer-events-none grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-center">
          <div className="lg:col-span-7 flex flex-col justify-center gap-6 text-left max-w-2xl pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase tracking-wider max-w-max shadow-sm">
              <Rocket className="h-3.5 w-3.5" />
              Pillar 03 // Acceleration
            </div>
            <h2 className="font-display text-6xl sm:text-7xl md:text-9xl font-black tracking-tight text-zinc-950 leading-none">
              Market
            </h2>
            <p className="font-sans text-base sm:text-lg md:text-xl text-zinc-600 leading-relaxed max-w-xl font-normal">
              Experts in solving the WHY, WHERE and HOW of propelling your brand rank, SEO authority, and customer traction to new heights.
            </p>
            <div className="mt-2">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-950 text-white font-sans text-xs sm:text-sm font-semibold hover:bg-emerald-600 transition-all duration-300 group shadow-md"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-5 h-[30vh] lg:h-auto" />
        </div>

      </div>
    </section>
  );
}
