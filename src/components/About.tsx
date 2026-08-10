"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const sphereContainerRef = useRef<HTMLDivElement>(null);

  // Smooth springs for mouse tilt
  const rotateX = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sphereContainerRef.current) return;
    const { left, top, width, height } = sphereContainerRef.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    
    // Tilt calculations
    rotateX.set(-y * 0.08);
    rotateY.set(x * 0.08);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Text reveal scroll effect
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom bottom",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-24 md:py-36 bg-white overflow-hidden border-t border-black/5"
    >
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-glow-radial opacity-20 -translate-y-1/2 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column - Story Text */}
        <div ref={textRef} className="lg:col-span-6 flex flex-col gap-6 text-left">
          <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            Our Story
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-950 leading-tight">
            Adapting technology to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]">
              your unique vision
            </span>
          </h2>
          <p className="font-sans text-base md:text-lg text-zinc-600 leading-relaxed">
            In an ever-evolving digital ecosystem, standing still is the equivalent of
            disappearing. Chameleon was founded with a singular, adaptive vision: to shape-shift
            the core frameworks of technology and design to fit our client&apos;s unique market
            demands.
          </p>
          <p className="font-sans text-sm md:text-base text-zinc-500 leading-relaxed">
            We are not just code builders; we are digital architects. From native desktop
            engines and highly optimized mobile apps to complete SEO authority and premium event planning,
            we blend technical supremacy with outstanding creativity.
          </p>

          <div className="mt-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-emerald-600 hover:text-zinc-950 transition-colors duration-300 group"
            >
              Learn more about us{" "}
              <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </div>
        </div>

        {/* Right Column - Interactive 3D Sphere & Orbiting Stats */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <motion.div
            ref={sphereContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-80 h-80 sm:w-96 sm:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing group"
          >
            {/* The Glowing Glass Sphere with Optimized Chameleon Mascot */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-zinc-200/90 bg-white/95 shadow-[0_20px_50px_-10px_rgba(0,192,120,0.20)] backdrop-blur-xl flex items-center justify-center p-6 overflow-visible">
              {/* Outer soft ambient glow */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-emerald-400/20 via-cyan-400/20 to-purple-400/15 blur-xl opacity-70 pointer-events-none -z-10 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Internal spinning technical rings */}
              <div className="absolute inset-2 rounded-full border border-dashed border-emerald-500/25 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-5 rounded-full border border-cyan-500/20 pointer-events-none" />

              {/* Centered Optimized Chameleon Mascot Logo */}
              <motion.div
                style={{ transform: "translateZ(35px)" }}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center z-10 select-none"
              >
                <Image
                  src="/CH.png"
                  alt="Chameleon Mascot"
                  width={150}
                  height={150}
                  priority
                  className="w-full h-full object-contain drop-shadow-[0_8px_18px_rgba(0,192,120,0.28)] transition-transform duration-300 group-hover:scale-108"
                />
              </motion.div>
            </div>

            {/* Orbiting Stat 1: Top-Left */}
            <motion.div
              style={{ transform: "translateZ(80px)" }}
              className="absolute -top-4 -left-4 sm:-left-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-zinc-200 shadow-xl text-left"
            >
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-950 leading-none block">
                600+
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-emerald-600 font-semibold mt-1 block">
                Projects Completed
              </span>
            </motion.div>

            {/* Orbiting Stat 2: Bottom-Right */}
            <motion.div
              style={{ transform: "translateZ(100px)" }}
              className="absolute -bottom-6 -right-4 sm:-right-8 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-zinc-200 shadow-xl text-left"
            >
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-950 leading-none block">
                98%
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-emerald-600 font-semibold mt-1 block">
                Client Satisfaction
              </span>
            </motion.div>

            {/* Orbiting Stat 3: Top-Right */}
            <motion.div
              style={{ transform: "translateZ(-60px)" }}
              className="absolute top-4 -right-4 sm:-right-10 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-zinc-200 shadow-lg text-left"
            >
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-none block">
                50+
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-cyan-600 font-semibold mt-1 block">
                Expert Wizards
              </span>
            </motion.div>

            {/* Orbiting Stat 4: Bottom-Left */}
            <motion.div
              style={{ transform: "translateZ(-80px)" }}
              className="absolute bottom-6 -left-4 sm:-left-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-zinc-200 shadow-lg text-left"
            >
              <span className="font-display text-2xl sm:text-3xl font-extrabold text-zinc-900 leading-none block">
                12+
              </span>
              <span className="font-sans text-[10px] uppercase tracking-widest text-cyan-600 font-semibold mt-1 block">
                Global Honors
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
