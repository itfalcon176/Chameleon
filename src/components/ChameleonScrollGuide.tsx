"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function ChameleonScrollGuide() {
  const { scrollYProgress } = useScroll();
  const [isClient, setIsClient] = useState(false);
  const [currentSection, setCurrentSection] = useState("hero");

  // Spring physics for buttery smooth scrolling mascot movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  // Dynamic 2D path coordinates that guide user as they scroll down:
  // Hero (0.0) -> Philosophy (0.15) -> About (0.30) -> Services (0.45) -> Process (0.60) -> Portfolio (0.75) -> Testimonials (0.88) -> Contact (1.0)
  const mascotX = useTransform(
    smoothProgress,
    [0, 0.12, 0.28, 0.44, 0.60, 0.74, 0.88, 1],
    ["28vw", "-22vw", "24vw", "-26vw", "2vw", "26vw", "-24vw", "22vw"]
  );

  const mascotY = useTransform(
    smoothProgress,
    [0, 0.12, 0.28, 0.44, 0.60, 0.74, 0.88, 1],
    ["0vh", "10vh", "-6vh", "12vh", "0vh", "8vh", "-4vh", "0vh"]
  );

  const mascotScale = useTransform(
    smoothProgress,
    [0, 0.08, 0.28, 0.60, 0.85, 1],
    [1.15, 0.78, 0.82, 0.72, 0.80, 0.88]
  );

  const mascotRotate = useTransform(
    smoothProgress,
    [0, 0.15, 0.35, 0.55, 0.75, 0.95, 1],
    [0, -8, 10, -10, 8, -6, 0]
  );

  // Active section tracker
  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      const p = scrollYProgress.get();
      if (p < 0.08) setCurrentSection("hero");
      else if (p < 0.22) setCurrentSection("philosophy");
      else if (p < 0.38) setCurrentSection("about");
      else if (p < 0.54) setCurrentSection("services");
      else if (p < 0.68) setCurrentSection("process");
      else if (p < 0.82) setCurrentSection("portfolio");
      else setCurrentSection("contact");
    };

    const unsubscribe = scrollYProgress.on("change", handleScroll);
    return () => unsubscribe();
  }, [scrollYProgress]);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
      {/* Floating Chameleon Companion Container */}
      <motion.div
        style={{
          x: mascotX,
          y: mascotY,
          scale: mascotScale,
          rotate: mascotRotate,
        }}
        className="relative flex items-center justify-center pointer-events-auto cursor-pointer group select-none"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.92 }}
        drag
        dragConstraints={{ left: -300, right: 300, top: -300, bottom: 300 }}
        dragElastic={0.2}
      >
        {/* Luminous Multi-Color Aura Glow */}
        <div className="absolute -inset-6 rounded-full bg-gradient-to-tr from-emerald-400/25 via-cyan-400/25 to-purple-400/20 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Orbiting Telemetry Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-4 rounded-full border border-dashed border-emerald-500/20 pointer-events-none"
        />

        {/* Orbiting Satellite Star Bead */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-6 pointer-events-none"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#0284c7]" />
        </motion.div>

        {/* Frosted Glass Disk Base */}
        <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-white/90 backdrop-blur-xl border border-zinc-200/85 shadow-[0_18px_45px_-10px_rgba(0,192,120,0.22)] flex items-center justify-center p-4 overflow-hidden">
          {/* Subtle Glare reflection */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-transparent to-transparent pointer-events-none" />

          {/* Chameleon Mascot Image */}
          <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center">
            <Image
              src="/CH.png"
              alt="Chameleon Scroll Guide"
              width={200}
              height={200}
              priority
              className="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,192,120,0.3)] transition-transform duration-300 group-hover:scale-108"
            />
          </div>

          {/* Interactive Speech / Guide Bubble on Hover */}
          <div className="absolute -bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-zinc-950 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
            Exploring {currentSection.toUpperCase()} 🦎
          </div>
        </div>
      </motion.div>
    </div>
  );
}
