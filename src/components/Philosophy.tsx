"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Layers, Rocket, Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration for morphing particle count and 3D projection
const PARTICLE_COUNT = 750;
const FOCUS = 320;

interface Particle {
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  color: string;
  targetColor: string;
  size: number;
  baseSize: number;
  alpha: number;
}

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeSlide, setActiveSlide] = useState(0); // 0 = Statement, 1 = Design, 2 = Build, 3 = Market

  // References for Canvas Animation Loop
  const particlesRef = useRef<Particle[]>([]);
  const activeSlideRef = useRef(0);
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const targetRotationX = useRef(0);
  const targetRotationY = useRef(0);

  // Initialize particles once
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.width || 1200;
    const height = canvas.height || 800;
    const particles: Particle[] = [];

    const logoPalette = [
      "rgba(0, 192, 120, 0.85)", // Chameleon Emerald
      "rgba(2, 132, 199, 0.85)", // Cyber Cyan
      "rgba(124, 58, 237, 0.85)", // Spectrum Violet
      "rgba(236, 72, 153, 0.85)", // Neon Pink
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 250;
      const col = logoPalette[i % logoPalette.length];
      const sz = 1.5 + Math.random() * 2.2;

      particles.push({
        x,
        y,
        z,
        targetX: x,
        targetY: y,
        targetZ: z,
        color: col,
        targetColor: col,
        size: sz,
        baseSize: sz,
        alpha: 0.4 + Math.random() * 0.5,
      });
    }

    particlesRef.current = particles;
  }, []);

  // Update particle positions based on active slide
  const updateTargets = (slide: number) => {
    activeSlideRef.current = slide;
    const canvas = canvasRef.current;
    if (!canvas || particlesRef.current.length === 0) return;

    const w = canvas.width / (window.devicePixelRatio || 1);
    const h = canvas.height / (window.devicePixelRatio || 1);
    const particles = particlesRef.current;

    if (slide === 0) {
      // Dispersed ambient vortex cloud
      particles.forEach((p, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 8;
        const radius = 50 + (i / PARTICLE_COUNT) * Math.min(w, h) * 0.45;
        p.targetX = Math.cos(angle) * radius;
        p.targetY = Math.sin(angle) * (radius * 0.6);
        p.targetZ = (Math.random() - 0.5) * 200;
        p.targetColor = i % 2 === 0 ? "rgba(0, 192, 120, 0.75)" : "rgba(2, 132, 199, 0.75)";
      });
    } else if (slide === 1) {
      // Butterfly / Morphing curve points (Design)
      particles.forEach((p, i) => {
        const t = (i / PARTICLE_COUNT) * Math.PI * 12;
        const r = Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
        const sizeFactor = Math.min(w, h) * 0.16;
        p.targetX = r * Math.sin(t) * sizeFactor;
        p.targetY = -r * Math.cos(t) * sizeFactor;
        p.targetZ = Math.sin(t * 5) * 30;
        p.targetColor = i % 2 === 0 ? "rgba(236, 72, 153, 0.9)" : "rgba(124, 58, 237, 0.9)";
      });
    } else if (slide === 2) {
      // Fibonacci Sphere points (Build)
      particles.forEach((p, i) => {
        const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = i * Math.PI * (3 - Math.sqrt(5));
        const sphereScale = Math.min(w, h) * 0.28;
        p.targetX = Math.cos(theta) * radius * sphereScale;
        p.targetY = y * sphereScale;
        p.targetZ = Math.sin(theta) * radius * sphereScale;
        p.targetColor = i % 2 === 0 ? "rgba(2, 132, 199, 0.9)" : "rgba(0, 192, 120, 0.9)";
      });
    } else if (slide === 3) {
      // 3D Growth Arrow (Market)
      particles.forEach((p, i) => {
        let tx = 0;
        let ty = 0;
        let tz = 0;
        const arrowScale = Math.min(w, h) * 0.28;

        if (i < PARTICLE_COUNT * 0.5) {
          const progress = i / (PARTICLE_COUNT * 0.5);
          const angle = i * 2.4;
          const shaftRadius = 12;
          tx = Math.cos(angle) * shaftRadius;
          ty = -90 + progress * 110;
          tz = Math.sin(angle) * shaftRadius;
        } else {
          const progress = (i - PARTICLE_COUNT * 0.5) / (PARTICLE_COUNT * 0.5);
          const angle = i * 2.4;
          const coneRadius = 32 * (1 - progress);
          tx = Math.cos(angle) * coneRadius;
          ty = 20 + progress * 90;
          tz = Math.sin(angle) * coneRadius;
        }

        p.targetX = tx * (arrowScale / 120);
        p.targetY = -ty * (arrowScale / 120);
        p.targetZ = tz * (arrowScale / 120);
        p.targetColor = i % 2 === 0 ? "rgba(0, 192, 120, 0.95)" : "rgba(245, 158, 11, 0.9)";
      });
    }
  };

  useEffect(() => {
    updateTargets(activeSlide);
  }, [activeSlide]);

  // Mouse tilt tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      targetRotationY.current = x * 0.35;
      targetRotationX.current = -y * 0.35;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = parent.clientWidth * dpr;
      canvas.height = parent.clientHeight * dpr;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.scale(dpr, dpr);
      updateTargets(activeSlideRef.current);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      time += 0.015;
      const dpr = window.devicePixelRatio || 1;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      // CLEAN WHITE CLEAR - Ensures section stays bright and pure white!
      ctx.clearRect(0, 0, w, h);

      // Smooth camera tilt rotation
      rotationX.current += (targetRotationX.current - rotationX.current) * 0.08;
      rotationY.current += (targetRotationY.current - rotationY.current) * 0.08;

      const cosX = Math.cos(rotationX.current);
      const sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current + (activeSlideRef.current === 2 ? time * 0.25 : time * 0.05));
      const sinY = Math.sin(rotationY.current + (activeSlideRef.current === 2 ? time * 0.25 : time * 0.05));

      const particles = particlesRef.current;

      // 3D rotation & depth mapping
      const rotatedParticles = particles.map((p) => {
        p.x += (p.targetX - p.x) * 0.09;
        p.y += (p.targetY - p.y) * 0.09;
        p.z += (p.targetZ - p.z) * 0.09;

        let currentX = p.x;
        let currentY = p.y;
        let currentZ = p.z;

        if (activeSlideRef.current === 1) {
          const flap = Math.abs(Math.sin(time * 3.5));
          currentX = p.x * (0.3 + 0.7 * flap);
          currentZ = p.z + Math.cos(time * 3.5) * Math.abs(p.x) * 0.35;
        }

        // 3D Rotations
        let rx = currentX * cosY - currentZ * sinY;
        let rz = currentX * sinY + currentZ * cosY;

        let ry = currentY * cosX - rz * sinX;
        rz = currentY * sinX + rz * cosX;

        return { rx, ry, rz, original: p };
      });

      // Sort back-to-front
      rotatedParticles.sort((a, b) => b.rz - a.rz);

      // Render particles
      rotatedParticles.forEach(({ rx, ry, rz, original }) => {
        const scale = FOCUS / (FOCUS + rz);
        const px = rx * scale + w / 2;
        const py = ry * scale + h / 2;

        if (px < 0 || px > w || py < 0 || py > h) return;

        const size = Math.max(0.6, original.size * scale);

        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = original.targetColor;
        ctx.fill();
      });

      // Plexus lines on Build sphere
      if (activeSlideRef.current === 2) {
        ctx.strokeStyle = "rgba(2, 132, 199, 0.12)";
        ctx.lineWidth = 0.75;

        for (let i = 0; i < rotatedParticles.length; i += 6) {
          const pi = rotatedParticles[i];
          const scaleI = FOCUS / (FOCUS + pi.rz);
          const pxI = pi.rx * scaleI + w / 2;
          const pyI = pi.ry * scaleI + h / 2;

          for (let j = i + 1; j < Math.min(i + 7, rotatedParticles.length); j++) {
            const pj = rotatedParticles[j];
            const dist = Math.hypot(pi.rx - pj.rx, pi.ry - pj.ry, pi.rz - pj.rz);
            if (dist < 48) {
              const scaleJ = FOCUS / (FOCUS + pj.rz);
              const pxJ = pj.rx * scaleJ + w / 2;
              const pyJ = pj.ry * scaleJ + h / 2;

              ctx.beginPath();
              ctx.moveTo(pxI, pyI);
              ctx.lineTo(pxJ, pyJ);
              ctx.stroke();
            }
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animId);
    };
  }, []);

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
            setActiveSlide(current);
          }
        },
      },
    });

    // Phase 1: Scroll-linked word highlight
    tl.to(words, {
      opacity: 1,
      color: "#09090b",
      stagger: 0.12,
      duration: 1.6,
      ease: "power1.out",
    });

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

      {/* 2. Interactive Morphing 3D Particle Canvas */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      {/* 3. Modern Interactive Progress Dots (Bottom Indicator) */}
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

      {/* 4. Text & Content Overlays */}
      <div className="relative z-20 h-full w-full mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-center">
        
        {/* Phase 1: Scroll-reveal Statement */}
        <div
          ref={triggerRef}
          className="statement-container absolute inset-x-6 md:inset-x-12 flex flex-col justify-center items-center text-center max-w-5xl mx-auto"
        >
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
