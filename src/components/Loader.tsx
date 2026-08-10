"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "Adapting to the Future",
  "Desktop, Mobile & Web Experience",
  "Cinematic Videography & Branding",
  "Event Management & SEO Excellence",
  "Chameleon IT Services",
];

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Counter animation
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(Math.round((currentStep / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress === 100) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 600); // Small pause at 100%
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Phrase cycling
  useEffect(() => {
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 450);

    return () => clearInterval(phraseInterval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col justify-between bg-white p-10 md:p-20 select-none"
      exit={{
        y: "-100%",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Image
          src="/logo.png"
          alt="Chameleon"
          width={180}
          height={38}
          className="h-6 md:h-7 w-auto object-contain"
        />
        <span className="font-sans text-xs tracking-widest text-zinc-400 uppercase font-medium">
          Digital Excellence
        </span>
      </div>

      {/* Center Phrase */}
      <div className="my-auto py-10">
        <AnimatePresence mode="wait">
          <motion.h2
            key={phraseIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="font-display text-2xl md:text-5xl lg:text-6xl font-light text-zinc-900 leading-tight"
          >
            {phrases[phraseIndex]}
          </motion.h2>
        </AnimatePresence>
      </div>

      {/* Bottom Progress Counter */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-end">
          <span className="font-sans text-xs tracking-widest text-zinc-400 uppercase font-medium">
            Loading Experience
          </span>
          <span className="font-display text-5xl md:text-7xl lg:text-8xl font-thin tracking-tighter text-accent">
            {progress}%
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-[2px] w-full bg-zinc-100 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-[#0284c7]"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
