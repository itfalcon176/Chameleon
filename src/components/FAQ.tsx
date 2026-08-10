"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "What capabilities does Chameleon offer?",
    a: "Chameleon is a multi-disciplinary digital agency. We construct native desktop utilities (via Rust & Tauri), iOS & Android apps (via React Native), high-performance Next.js websites, vector logo guidelines, cinematic video storytelling, organic SEO rank expansion, and coordinate corporate physical/virtual events.",
  },
  {
    q: "How does Chameleon implement custom web animations?",
    a: "We utilize GSAP ScrollTrigger combined with Lenis smooth scrolling. This connects the browser scroll updates directly to GSAP's timeline tick, ensuring that animations reveal fluidly without causing any layout shift, rendering lag, or CPU spikes.",
  },
  {
    q: "Can you optimize our existing website's page speed and SEO?",
    a: "Yes! We run technical core audits. We adjust layout shifts, restructure metadata with JSON-LD graphs, compile assets, and deploy to server-edge platforms (like Vercel or AWS) to achieve a 95+ Lighthouse Performance target.",
  },
  {
    q: "Why do you use Rust and Tauri for desktop apps?",
    a: "Unlike traditional Electron setups that bundle Chrome and node modules causing massive memory bloat, Tauri compiles native binaries utilizing the OS's native Webview, producing apps that run at 60+ FPS using less than 40MB of RAM.",
  },
  {
    q: "How do we launch a project with Chameleon?",
    a: "Fill out the contact form below or email our team directly. We will schedule a scoping session, map your requirements, and deliver a detailed technical blueprint and scoping estimate within 48 hours.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 bg-white overflow-hidden border-t border-black/5">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-glow-radial opacity-15 -translate-y-1/2 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 md:px-12 flex flex-col gap-12 text-left">
        {/* Header */}
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            Got Questions?
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-950">
            Frequently Asked{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]">
              Questions
            </span>
          </h2>
          <p className="font-sans text-base text-zinc-600 max-w-lg mt-2 text-center">
            Everything you need to know about our technology, animations, design, and onboarding.
          </p>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4 mt-6">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-zinc-50/80 rounded-2xl border border-zinc-200 overflow-hidden transition-all duration-300 hover:border-zinc-300 shadow-sm"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-display text-base md:text-lg font-bold text-zinc-900 transition-colors duration-300">
                    {faq.q}
                  </span>
                  <div className={`rounded-full p-1.5 bg-zinc-200/70 text-emerald-700 border border-zinc-300 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 font-sans text-sm md:text-base text-zinc-600 leading-relaxed border-t border-zinc-200 bg-white/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
