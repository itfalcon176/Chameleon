"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

  // 3D Interactive Tilt & Glare Physics
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [16, -16]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-16, 16]), springConfig);
  const mascotZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [40, 50]), springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  useEffect(() => {
    // Parallax on scroll using GSAP
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Float badge animations gently
      gsap.to(badge1Ref.current, {
        y: -30,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(badge2Ref.current, {
        y: 40,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(badge3Ref.current, {
        y: -50,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 bg-white overflow-hidden z-10"
    >
      {/* 3D WebGL Background Canvas */}
      <ThreeBackground />

      {/* Glow shapes */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-glow-radial opacity-30 -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-glow-radial opacity-15 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        {/* Left Content column */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Subtle Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 max-w-max rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 font-sans text-xs font-semibold uppercase tracking-widest text-emerald-700 shadow-sm"
          >
            <Sparkles className="h-3 w-3" /> Adapting to the Digital Edge
          </motion.div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-950 leading-[1.05]">
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="block"
            >
              We Adapt.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]"
            >
              We Shape-Shift.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="block font-light text-zinc-800"
            >
              We Dominate.
            </motion.span>
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
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
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <Magnetic>
              <a
                href="#services"
                className="rounded-full bg-zinc-950 px-8 py-4 font-sans text-sm font-semibold text-white hover:bg-accent hover:text-zinc-950 hover:shadow-[0_8px_25px_var(--accent-glow)] transition-all duration-300 shadow-md"
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

        {/* Right Graphic/Mockup column with 3D WOW Interactive Tilt */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-5 flex justify-center items-center relative mt-10 lg:mt-0 [perspective:1000px] cursor-pointer"
        >
          {/* Main Visual 3D Tilt Card */}
          <motion.div
            ref={visualRef}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-80 h-80 sm:w-[410px] sm:h-[410px] rounded-full border border-zinc-200/90 bg-white/95 flex items-center justify-center backdrop-blur-xl shadow-[0_25px_60px_-15px_rgba(0,192,120,0.15),0_15px_30px_-10px_rgba(0,0,0,0.06)] overflow-visible group"
          >
            {/* Outer soft ambient glow */}
            <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-emerald-400/20 via-cyan-400/20 to-purple-400/15 blur-2xl opacity-70 pointer-events-none -z-10 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Rotating Technical Orbital Rings */}
            <div
              style={{ transform: "translateZ(20px)" }}
              className="absolute inset-3 rounded-full border border-dashed border-emerald-500/25 animate-spin-slow pointer-events-none"
            />
            <div
              style={{ transform: "translateZ(15px)" }}
              className="absolute inset-8 rounded-full border border-cyan-500/20 pointer-events-none"
            />

            {/* Subtle Orbiting Satellite Particle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 shadow-[0_0_12px_#00c078] animate-ping opacity-75" />
              <div className="absolute top-2 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#00c078]" />
            </motion.div>

            {/* Dynamic Glass Glare Sheen Reflection on Mouse Move */}
            <div
              className={`absolute inset-0 rounded-full transition-opacity duration-300 pointer-events-none ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background: `radial-gradient(circle at ${(mouseX.get() + 0.5) * 100}% ${(mouseY.get() + 0.5) * 100}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 65%)`,
              }}
            />

            {/* Inner mascot container - Clean without muddy background tints */}
            <motion.div
              style={{
                transform: `translateZ(${mascotZ}px)`,
              }}
              className="relative w-56 h-56 sm:w-68 sm:h-68 flex items-center justify-center z-10 select-none"
            >
              {/* Standalone Official Chameleon Mascot from /CH.png */}
              <div className="relative w-44 h-44 sm:w-56 sm:h-56 flex items-center justify-center">
                <Image
                  src="/CH.png"
                  alt="Chameleon Mascot"
                  width={300}
                  height={300}
                  priority
                  className="w-full h-full object-contain drop-shadow-[0_12px_28px_rgba(0,192,120,0.35)] transition-transform duration-300 group-hover:scale-108"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Badges with 3D Depth */}
          <div
            ref={badge1Ref}
            style={{ transform: "translateZ(55px)" }}
            className="absolute top-8 -left-4 sm:-left-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 border border-zinc-200/90 shadow-xl z-20 transition-transform duration-300 hover:scale-105"
          >
            <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-2.5 text-emerald-600 shadow-sm">
              <Code className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-sm font-bold text-zinc-900 leading-none">Desktop Apps</span>
              <span className="font-sans text-[10px] text-zinc-500 mt-1 font-semibold">High Performance</span>
            </div>
          </div>

          <div
            ref={badge2Ref}
            style={{ transform: "translateZ(55px)" }}
            className="absolute bottom-6 -right-4 sm:-right-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 flex items-center gap-3 border border-zinc-200/90 shadow-xl z-20 transition-transform duration-300 hover:scale-105"
          >
            <div className="rounded-xl bg-cyan-50 border border-cyan-100 p-2.5 text-cyan-600 shadow-sm">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-display text-sm font-bold text-zinc-900 leading-none">SEO Domination</span>
              <span className="font-sans text-[10px] text-zinc-500 mt-1 font-semibold">Organic Visibility</span>
            </div>
          </div>

          <div
            ref={badge3Ref}
            style={{ transform: "translateZ(50px)" }}
            className="absolute -top-4 right-8 bg-white/95 backdrop-blur-md rounded-full px-4 py-2 border border-zinc-200/90 shadow-lg text-xs font-bold text-zinc-800 flex items-center gap-2 z-20"
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
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white hover:border-emerald-500 hover:text-emerald-600 transition-all duration-300 text-zinc-500 shadow-sm animate-bounce"
        >
          <ArrowDown className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
