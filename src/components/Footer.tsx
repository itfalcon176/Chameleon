"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import Magnetic from "./Magnetic";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-zinc-50 border-t border-zinc-200 pt-20 pb-10 overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-glow-radial opacity-10 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          {/* Logo & Bio Column */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <a href="#" className="inline-block">
              <Image
                src="/logo.png"
                alt="Chameleon"
                width={200}
                height={42}
                className="h-8 md:h-9 w-auto object-contain"
              />
            </a>

            <p className="font-sans text-sm text-zinc-600 leading-relaxed max-w-sm">
              We shape-shift design and programming schemas to fit your brand guidelines and dominate markets across web, native desktop, mobile, video campaigns, and events.
            </p>

            <div className="flex gap-4">
              <a href="#" className="h-9 w-9 rounded-full bg-white border border-zinc-200 hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center text-zinc-600 transition-colors shadow-sm">
                <GithubIcon />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white border border-zinc-200 hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center text-zinc-600 transition-colors shadow-sm">
                <LinkedinIcon />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white border border-zinc-200 hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center text-zinc-600 transition-colors shadow-sm">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 text-left">
            <h4 className="font-display text-sm font-bold text-zinc-950 uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <div className="flex flex-col gap-3 font-sans text-sm">
              <a href="#about" className="text-zinc-600 hover:text-emerald-600 transition-colors duration-300">About Agency</a>
              <a href="#services" className="text-zinc-600 hover:text-emerald-600 transition-colors duration-300">Our Services</a>
              <a href="#process" className="text-zinc-600 hover:text-emerald-600 transition-colors duration-300">Process & Flow</a>
              <a href="#portfolio" className="text-zinc-600 hover:text-emerald-600 transition-colors duration-300">Portfolio Work</a>
              <a href="#reviews" className="text-zinc-600 hover:text-emerald-600 transition-colors duration-300">Google Reviews</a>
              <a
                href="https://www.google.com/maps/place/Chameleon+IT+Academy+%7C+Digital+Marketing+%7C+Web+Developing+%7C+Graphic+Designing./@11.2831612,76.2357097,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba63b25cc6dec37:0x865b8d22ffd054f2!8m2!3d11.2831612!4d76.2357097!16s%2Fg%2F11q4bqk33t?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 font-semibold hover:underline"
              >
                📍 Nilambur, Kerala (Map)
              </a>
            </div>
          </div>

          {/* Core Services Column */}
          <div className="lg:col-span-4 text-left">
            <h4 className="font-display text-sm font-bold text-zinc-950 uppercase tracking-wider mb-6">
              Capabilities
            </h4>
            <div className="flex flex-col gap-3 font-sans text-sm text-zinc-600">
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">Web Development</span>
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">Desktop App Development</span>
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">Mobile App Development</span>
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">UI/UX & Logo Design</span>
              <span className="hover:text-emerald-600 cursor-pointer transition-colors">SEO & Event Management</span>
            </div>
          </div>
        </div>

        <div className="h-[1px] w-full bg-zinc-200" />

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} Chameleon IT Services. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-emerald-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">Terms of Service</a>
            
            <Magnetic>
              <button
                onClick={scrollToTop}
                className="h-10 w-10 rounded-full border border-zinc-300 bg-white hover:border-emerald-500 hover:text-emerald-600 flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}
