"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Configuration for the morphing particles
const PARTICLE_COUNT = 700;
const FOCUS = 300;

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
  alpha: number;
}

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeSlide, setActiveSlide] = useState(0); // 0 = Statement, 1 = Design, 2 = Build, 3 = Market
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // References to track animations in standard Canvas loop
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

    const width = canvas.width;
    const height = canvas.height;
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Start dispersed randomly
      const x = (Math.random() - 0.5) * width;
      const y = (Math.random() - 0.5) * height;
      const z = (Math.random() - 0.5) * 200;

      particles.push({
        x,
        y,
        z,
        targetX: x,
        targetY: y,
        targetZ: z,
        color: "rgba(255, 255, 255, 0.15)",
        targetColor: "rgba(255, 255, 255, 0.15)",
        size: 1 + Math.random() * 2,
        alpha: 0.1 + Math.random() * 0.4,
      });
    }

    particlesRef.current = particles;
  }, []);

  // Update morph targets when slide changes
  const updateTargets = (slide: number) => {
    activeSlideRef.current = slide;
    const canvas = canvasRef.current;
    if (!canvas || particlesRef.current.length === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const particles = particlesRef.current;

    // Define colors for each state on light theme
    const colors = {
      0: "rgba(0, 0, 0, 0.2)",       // Statement: soft charcoal
      1: "rgba(219, 39, 119, 0.85)",  // Design: vivid deep pink
      2: "rgba(2, 132, 199, 0.85)",   // Build: vibrant cyan blue
      3: "rgba(5, 150, 105, 0.85)",   // Market: vivid emerald
    };

    const targetColor = colors[slide as keyof typeof colors] || colors[0];

    if (slide === 0) {
      // Dispersed background cloud
      particles.forEach((p) => {
        p.targetX = (Math.random() - 0.5) * w * 0.8;
        p.targetY = (Math.random() - 0.5) * h * 0.8;
        p.targetZ = (Math.random() - 0.5) * 300;
        p.targetColor = targetColor;
      });
    } else if (slide === 1) {
      // Butterfly Curve points
      particles.forEach((p, i) => {
        // Butterfly curve: r = e^sin(t) - 2cos(4t) + sin^5((2t - pi)/24)
        const t = (i / PARTICLE_COUNT) * Math.PI * 12; // 6 full wings outline
        const r = Math.exp(Math.sin(t)) - 2 * Math.cos(4 * t) + Math.pow(Math.sin((2 * t - Math.PI) / 24), 5);
        
        // Scale and orient butterfly
        const sizeFactor = Math.min(w, h) * 0.14;
        p.targetX = r * Math.sin(t) * sizeFactor;
        p.targetY = -r * Math.cos(t) * sizeFactor; // negative to stand upright
        p.targetZ = Math.sin(t * 5) * 20; // 3D wing shape
        p.targetColor = targetColor;
      });
    } else if (slide === 2) {
      // Fibonacci Sphere points
      particles.forEach((p, i) => {
        const y = 1 - (i / (PARTICLE_COUNT - 1)) * 2; // y goes from 1 to -1
        const radius = Math.sqrt(1 - y * y); // radius at y
        const theta = i * Math.PI * (3 - Math.sqrt(5)); // golden angle increment

        const sphereScale = Math.min(w, h) * 0.28;
        p.targetX = Math.cos(theta) * radius * sphereScale;
        p.targetY = y * sphereScale;
        p.targetZ = Math.sin(theta) * radius * sphereScale;
        p.targetColor = targetColor;
      });
    } else if (slide === 3) {
      // 3D Growth Arrow points (cylinder shaft + cone arrowhead)
      particles.forEach((p, i) => {
        let tx = 0;
        let ty = 0;
        let tz = 0;
        const arrowScale = Math.min(w, h) * 0.25;

        // Distribute particles between shaft and arrowhead (50/50 split)
        if (i < PARTICLE_COUNT * 0.5) {
          // 1. Arrow Shaft: Cylinder structure
          const progress = i / (PARTICLE_COUNT * 0.5);
          const angle = i * 2.399963; // Golden angle
          const shaftRadius = 10;
          tx = Math.cos(angle) * shaftRadius;
          ty = -85 + progress * 100; // extending from -85 to 15
          tz = Math.sin(angle) * shaftRadius;
        } else {
          // 2. Arrowhead: Cone structure
          const progress = (i - PARTICLE_COUNT * 0.5) / (PARTICLE_COUNT * 0.5);
          const angle = i * 2.399963; // Golden angle
          const coneRadius = 28 * (1 - progress); // starting at 28, tapering to 0
          tx = Math.cos(angle) * coneRadius;
          ty = 15 + progress * 80; // extending from 15 to 95
          tz = Math.sin(angle) * coneRadius;
        }

        p.targetX = tx * (arrowScale / 120);
        p.targetY = -ty * (arrowScale / 120); // flip vertically
        p.targetZ = tz * (arrowScale / 120);
        p.targetColor = targetColor;
      });
    }
  };

  // Listen to activeSlide change and trigger target updates
  useEffect(() => {
    updateTargets(activeSlide);
  }, [activeSlide]);

  // Handle Mouse Tilt Effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const y = (e.clientY - innerHeight / 2) / (innerHeight / 2);
      setMouse({ x, y });

      targetRotationY.current = x * 0.4;
      targetRotationX.current = -y * 0.4;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Main Canvas Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resizeCanvas = () => {
      // Maintain proper canvas resolution
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth * window.devicePixelRatio;
      canvas.height = parent.clientHeight * window.devicePixelRatio;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      updateTargets(activeSlideRef.current);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const draw = () => {
      time += 0.015;
      const w = canvas.width / window.devicePixelRatio;
      const h = canvas.height / window.devicePixelRatio;

      // Clear with dark transparent trail
      ctx.fillStyle = "rgba(3, 3, 3, 0.25)";
      ctx.fillRect(0, 0, w, h);

      // Rotate camera angle smoothly towards target mouse rotations
      rotationX.current += (targetRotationX.current - rotationX.current) * 0.08;
      rotationY.current += (targetRotationY.current - rotationY.current) * 0.08;

      const cosX = Math.cos(rotationX.current);
      const sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current + (activeSlideRef.current === 2 ? time * 0.2 : 0)); // Auto rotate sphere
      const sinY = Math.sin(rotationY.current + (activeSlideRef.current === 2 ? time * 0.2 : 0));

      const particles = particlesRef.current;

      // Sort particles by rotated Z index (Painters Algorithm) to draw correct depth layers
      const rotatedParticles = particles.map((p) => {
        // Interpolate position towards morph target
        p.x += (p.targetX - p.x) * 0.09;
        p.y += (p.targetY - p.y) * 0.09;
        p.z += (p.targetZ - p.z) * 0.09;

        // Flutter butterfly wings dynamically
        let currentX = p.x;
        let currentY = p.y;
        let currentZ = p.z;

        if (activeSlideRef.current === 1) {
          // Butterfly wing flap: compress horizontal scale based on time
          const flap = Math.abs(Math.sin(time * 3.5));
          currentX = p.x * (0.25 + 0.75 * flap);
          currentZ = p.z + Math.cos(time * 3.5) * Math.abs(p.x) * 0.3; // wing lift
        }



        // Apply 3D Rotations
        // 1. Rotate Y (left-right)
        let rx = currentX * cosY - currentZ * sinY;
        let rz = currentX * sinY + currentZ * cosY;

        // 2. Rotate X (up-down)
        let ry = currentY * cosX - rz * sinX;
        rz = currentY * sinX + rz * cosX;

        return { rx, ry, rz, original: p };
      });

      // Sort back-to-front
      rotatedParticles.sort((a, b) => b.rz - a.rz);

      // Render sorted projected particles
      rotatedParticles.forEach(({ rx, ry, rz, original }) => {
        // Perspective scaling calculation
        const scale = FOCUS / (FOCUS + rz);
        const px = rx * scale + w / 2;
        const py = ry * scale + h / 2;

        // Keep inside bounds
        if (px < 0 || px > w || py < 0 || py > h) return;

        // Compute particle glow and size
        const size = Math.max(0.2, original.size * scale);

        // Draw core particle
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fillStyle = original.targetColor;
        ctx.fill();
      });

      // Draw interactive connections for the "Build" Sphere
      if (activeSlideRef.current === 2) {
        ctx.shadowBlur = 0; // disable glow for line paths
        ctx.strokeStyle = "rgba(6, 182, 212, 0.05)";
        ctx.lineWidth = 0.5;

        // Link close particles together to form a geometric plexus web
        for (let i = 0; i < rotatedParticles.length; i += 7) {
          const pi = rotatedParticles[i];
          const scaleI = FOCUS / (FOCUS + pi.rz);
          const pxI = pi.rx * scaleI + w / 2;
          const pyI = pi.ry * scaleI + h / 2;

          for (let j = i + 1; j < Math.min(i + 8, rotatedParticles.length); j++) {
            const pj = rotatedParticles[j];
            
            // Euclidean distance in 3D
            const dist = Math.hypot(pi.rx - pj.rx, pi.ry - pj.ry, pi.rz - pj.rz);
            if (dist < 45) {
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

  // GSAP ScrollTrigger timeline configuration
  useEffect(() => {
    if (!containerRef.current || !triggerRef.current) return;

    const words = triggerRef.current.querySelectorAll(".reveal-word");

    // Clear previous timeline instances
    ScrollTrigger.getAll().forEach((t) => {
      if (t.vars.trigger === containerRef.current) t.kill();
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3500", // Pinned scroll track length
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;

          // Slide calculation mapping
          // 0.00 - 0.25: Statement Paragraph
          // 0.25 - 0.50: Design
          // 0.50 - 0.75: Build
          // 0.75 - 1.00: Market
          let current = 0;
          if (progress < 0.25) {
            current = 0;
          } else if (progress < 0.5) {
            current = 1;
          } else if (progress < 0.75) {
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
      stagger: 0.15,
      duration: 1.5,
      ease: "power1.out",
    });

    // Fade out statement container
    tl.to(".statement-container", {
      opacity: 0,
      y: -50,
      duration: 0.8,
      ease: "power2.inOut",
    });

    // Phase 2: Design Slide Reveal
    tl.fromTo(
      ".slide-design",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    tl.to({}, { duration: 1 }); // read pause for Design slide
    tl.to(".slide-design", { opacity: 0, y: -50, duration: 0.8, ease: "power2.inOut" });

    // Phase 3: Build Slide Reveal
    tl.fromTo(
      ".slide-build",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    tl.to({}, { duration: 1 }); // read pause for Build slide
    tl.to(".slide-build", { opacity: 0, y: -50, duration: 0.8, ease: "power2.inOut" });

    // Phase 4: Market Slide Reveal
    tl.fromTo(
      ".slide-market",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
    tl.to({}, { duration: 1.2 }); // read pause for Market slide

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
      className="relative w-screen h-screen bg-white overflow-hidden select-none border-t border-black/5"
    >
      {/* 1. Ambient Background Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-all duration-1000 ease-out">
        {activeSlide === 0 && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02)_0%,transparent_70%)]" />
        )}
        {activeSlide === 1 && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(219,39,119,0.08)_0%,transparent_60%)]" />
        )}
        {activeSlide === 2 && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(2,132,199,0.08)_0%,transparent_60%)]" />
        )}
        {activeSlide === 3 && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(5,150,105,0.08)_0%,transparent_60%)]" />
        )}
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] z-0 pointer-events-none opacity-60" />

      {/* 2. Interactive Morphing Canvas */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <canvas ref={canvasRef} className="block w-full h-full" />
      </div>

      {/* 3. Text & Layout overlays */}
      <div className="relative z-20 h-full w-full mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-center">
        
        {/* Phase 1: Scroll-reveal paragraph */}
        <div
          ref={triggerRef}
          className="statement-container absolute inset-x-6 md:inset-x-12 flex flex-col justify-center items-center text-center select-none"
        >
          <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase mb-6 block">
            Our Philosophy
          </span>
          <p className="font-display text-2xl md:text-5xl font-bold tracking-tight text-zinc-300 leading-relaxed max-w-4xl">
            {wordSpans.map((word, idx) => (
              <span
                key={idx}
                className="reveal-word inline-block mr-2 md:mr-3 transition-colors duration-200 opacity-20"
                style={{ color: "rgba(0,0,0,0.2)" }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        {/* Phase 2: Slide Design */}
        <div className="slide-design absolute inset-0 opacity-0 pointer-events-none grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-center">
          <div className="lg:col-span-7 flex flex-col justify-center gap-6 text-left max-w-2xl pointer-events-auto">
            <span className="font-sans text-xs font-semibold tracking-widest text-pink-600 uppercase">
              Pillar 01 // Aesthetics
            </span>
            {/* Title with slight overlay design */}
            <h2 className="font-display text-7xl md:text-[9rem] font-extrabold tracking-tighter text-zinc-950 leading-none">
              Design
            </h2>
            <p className="font-sans text-base md:text-xl text-zinc-600 leading-relaxed max-w-xl">
              Intelligent design is the essence of nature; that's our inspiration in crafting tomorrow's tech realm.
            </p>
            <div className="mt-2">
              <a
                href="#services"
                className="inline-flex items-center gap-3 font-sans text-sm font-bold text-pink-600 hover:text-zinc-950 transition-colors duration-300 group"
              >
                Explore services
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
          {/* Spacer column - canvas renders here */}
          <div className="lg:col-span-5 h-[30vh] lg:h-auto" />
        </div>

        {/* Phase 3: Slide Build */}
        <div className="slide-build absolute inset-0 opacity-0 pointer-events-none grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-center">
          {/* Spacer column - canvas renders on left column */}
          <div className="lg:col-span-5 h-[30vh] lg:h-auto" />
          
          <div className="lg:col-span-7 flex flex-col justify-center gap-6 text-left lg:text-right lg:items-end max-w-2xl pointer-events-auto lg:ml-auto">
            <span className="font-sans text-xs font-semibold tracking-widest text-cyan-600 uppercase">
              Pillar 02 // Engineering
            </span>
            <h2 className="font-display text-7xl md:text-[9rem] font-extrabold tracking-tighter text-zinc-950 leading-none">
              Build
            </h2>
            <p className="font-sans text-base md:text-xl text-zinc-600 leading-relaxed max-w-xl lg:text-right">
              Constantly adopting cutting edge technology for your enterprise to harness its endless possibilities and leave a global imprint.
            </p>
            <div className="mt-2">
              <a
                href="#process"
                className="inline-flex items-center gap-3 font-sans text-sm font-bold text-cyan-600 hover:text-zinc-950 transition-colors duration-300 group"
              >
                Explore process
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>

        {/* Phase 4: Slide Market */}
        <div className="slide-market absolute inset-0 opacity-0 pointer-events-none grid grid-cols-1 lg:grid-cols-12 gap-10 items-center justify-center">
          <div className="lg:col-span-7 flex flex-col justify-center gap-6 text-left max-w-2xl pointer-events-auto">
            <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
              Pillar 03 // Acceleration
            </span>
            <h2 className="font-display text-7xl md:text-[9rem] font-extrabold tracking-tighter text-zinc-950 leading-none">
              Market
            </h2>
            <p className="font-sans text-base md:text-xl text-zinc-600 leading-relaxed max-w-xl">
              Experts in solving the WHY, WHERE and HOW of propelling your business to new frontiers.
            </p>
            <div className="mt-2">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-3 font-sans text-sm font-bold text-emerald-600 hover:text-zinc-950 transition-colors duration-300 group"
              >
                Explore projects
                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
          {/* Spacer column - canvas renders here */}
          <div className="lg:col-span-5 h-[30vh] lg:h-auto" />
        </div>

      </div>
    </section>
  );
}
