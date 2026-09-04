"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const marqueeItems = [
  "NATIVE DESKTOP APPS",
  "NEXT.JS SPEED HOUSES",
  "GSAP SCROLL TRIGGER",
  "SEO DOMINATION #1",
  "FLUID MOBILE APPS",
  "CINEMATIC VIDEOGRAPHY",
  "UI/UX DESIGN SYSTEMS",
  "SHAPE-SHIFTING DIGITAL AGENCY",
];

export default function MarqueeTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tickerRef.current) return;

    // Fast endless smooth marquee
    const anim = gsap.to(tickerRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 20,
      repeat: -1,
    });

    // Accelerate marquee based on scroll speed
    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity() / 300);
        const timeScale = 1 + vel;
        gsap.to(anim, { timeScale, duration: 0.3, overwrite: "auto" });
      },
    });

    return () => {
      anim.kill();
      trigger.kill();
    };
  }, []);

  return (
    <div className="relative py-6 bg-zinc-950 text-white overflow-hidden border-y border-white/10 select-none">
      <div className="flex w-max" ref={tickerRef}>
        {[...marqueeItems, ...marqueeItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8 px-6">
            <span className="font-display text-lg sm:text-2xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-purple-400 whitespace-nowrap">
              {item}
            </span>
            <Sparkles className="h-4 w-4 text-emerald-400 flex-shrink-0 animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}
