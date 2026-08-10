"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, Code, Sparkles, TrendingUp } from "lucide-react";
import Magnetic from "./Magnetic";
import ThreeBackground from "./ThreeBackground";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);
  const badge3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax on scroll using GSAP
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Float badge animations
      gsap.to(badge1Ref.current, {
        y: -40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(badge2Ref.current, {
        y: 60,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(badge3Ref.current, {
        y: -90,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Scale visual shape on scroll
      gsap.to(visualRef.current, {
        scale: 0.85,
        rotate: 15,
        opacity: 0.3,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 bg-white overflow-hidden z-10 select-none"
    >
      {/* 3D WebGL Background Canvas */}
      <ThreeBackground />

      {/* Glow shapes */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-glow-radial opacity-40 -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-glow-radial opacity-20 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        {/* Left Content column */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Subtle Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 max-w-max rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-emerald-700"
          >
            <Sparkles className="h-3 w-3" /> Adapting to the Digital Edge
          </motion.div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.05]">
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="block"
            >
              We Adapt.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]"
            >
              We Shape-Shift.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="block font-light text-zinc-800"
            >
              We Dominate.
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-sans text-base md:text-lg text-zinc-600 max-w-xl leading-relaxed mt-2"
          >
            Chameleon is an award-winning creative agency. We construct state-of-the-art
            native desktop tools, mobile architectures, stunning videography, dynamic events
            and rank your business #1 with specialized SEO systems.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <Magnetic>
              <a
                href="#services"
                className="rounded-full bg-zinc-950 px-8 py-4 font-sans text-sm font-semibold text-white hover:bg-accent hover:text-zinc-950 hover:shadow-[0_8px_25px_var(--accent-glow)] transition-all duration-300 shadow-sm"
              >
                Explore Solutions
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="rounded-full border border-zinc-300 bg-white hover:bg-zinc-50 hover:border-zinc-400 px-8 py-4 font-sans text-sm font-semibold text-zinc-800 transition-all duration-300 shadow-sm"
              >
                Let&apos;s Collaborate
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Right Graphic/Mockup column */}
        <div className="lg:col-span-5 flex justify-center items-center relative mt-10 lg:mt-0">
          {/* Main Visual Shape */}
          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-zinc-200 bg-zinc-50/80 flex items-center justify-center backdrop-blur-sm shadow-xl overflow-visible"
          >
            {/* Morphing glass orb */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-accent/10 to-[#0284c7]/10 border border-zinc-200 animate-spin-slow" />
            
            {/* Chameleon wireframe visual using custom styling */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-full flex items-center justify-center bg-glow-radial p-4">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full text-emerald-600 drop-shadow-[0_4px_12px_var(--accent-glow)] animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
              >
                {/* Clean polygon/wireframe representation of a chameleon shape */}
                <polygon points="50,15 70,30 85,50 80,75 50,90 20,75 15,50 30,30" strokeDasharray="3 3" />
                <polygon points="50,15 50,90" />
                <polygon points="15,50 85,50" />
                <polygon points="30,30 80,75" />
                <polygon points="70,30 20,75" />
                {/* Eyes */}
                <circle cx="50" cy="50" r="10" strokeWidth="1.5" />
                <circle cx="50" cy="50" r="4" fill="currentColor" />
                {/* Spiral tail */}
                <path d="M 50 50 A 20 20 0 1 1 30 70 A 15 15 0 1 1 45 80 A 10 10 0 1 1 40 70" />
              </svg>
            </div>
          </motion.div>

          {/* Floating Badges */}
          <div
            ref={badge1Ref}
            className="absolute top-10 -left-6 sm:-left-12 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 border border-zinc-200 shadow-xl"
          >
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600">
              <Code className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-sm font-bold text-zinc-900 leading-none">Desktop Apps</span>
              <span className="font-sans text-[10px] text-zinc-500 mt-0.5">High Performance</span>
            </div>
          </div>

          <div
            ref={badge2Ref}
            className="absolute bottom-6 -right-6 sm:-right-12 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 border border-zinc-200 shadow-xl"
          >
            <div className="rounded-lg bg-cyan-500/10 p-2 text-cyan-600">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-sm font-bold text-zinc-900 leading-none">SEO Domination</span>
              <span className="font-sans text-[10px] text-zinc-500 mt-0.5">Organic Visibility</span>
            </div>
          </div>

          <div
            ref={badge3Ref}
            className="absolute -top-6 right-10 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 border border-zinc-200 shadow-lg text-xs font-semibold text-zinc-800 flex items-center gap-2"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            Creative Digital Agency
          </div>
        </div>
      </div>

      {/* Down arrow link */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <a
          href="#about"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white hover:border-accent hover:text-emerald-600 transition-all duration-300 text-zinc-400 shadow-sm animate-bounce"
        >
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
