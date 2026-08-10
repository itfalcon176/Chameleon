"use client";

import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aravind Nair",
    role: "Chief Technology Officer",
    company: "TechCorp India",
    content: "Chameleon changed the way we handle our native desktop software. The application is blisteringly fast, secure, and the interface is stunning.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "VP of Product",
    company: "Velo Wellness",
    content: "Their mobile app development skills are unmatched. The cross-platform app they built is incredibly fluid, responsive, and handles offline data flawlessly.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohan Matthews",
    role: "Founder & Creative Director",
    company: "Prizm Media Studio",
    content: "The videography and logo rebranding campaign they executed was spectacular. They gave our brand a modern digital identity that immediately elevated conversions.",
    rating: 5,
  },
  {
    id: 4,
    name: "Aditi Sharma",
    role: "Marketing Director",
    company: "FinGro Capital",
    content: "Our organic web traffic scaled by +300% in 4 months. Their technical SEO audit and structured metadata schemas pushed us to Google page #1.",
    rating: 5,
  },
  {
    id: 5,
    name: "David Miller",
    role: "Global Coordinator",
    company: "Summit Summit",
    content: "Flawless event management! They built a custom live-onboarding mobile portal and handled coordinate logistics for our virtual summit of 3,000 attendees.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24 bg-white overflow-hidden select-none border-t border-black/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-glow-radial opacity-15 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col gap-12 text-center items-center">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            Client Reviews
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-950">
            What Clients{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]">
              Say
            </span>
          </h2>
          <p className="font-sans text-base text-zinc-600 max-w-lg mt-2">
            Read stories of how we adapt and shape our digital engines to boost client outcomes.
          </p>
        </div>

        {/* Infinite CSS Marquee Rows */}
        <div className="w-full flex flex-col gap-8 overflow-hidden relative">
          {/* Row 1 - Left to Right */}
          <div className="flex w-[200%] gap-6 animate-marquee-left">
            {[...testimonials, ...testimonials].map((test, index) => (
              <div
                key={`${test.id}-${index}`}
                className="w-[300px] sm:w-[380px] bg-zinc-50/80 hover:bg-white rounded-3xl p-6 border border-zinc-200 flex flex-col justify-between gap-6 text-left shrink-0 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  {/* Stars */}
                  <div className="flex gap-1">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                    ))}
                  </div>
                  <p className="font-sans text-sm text-zinc-700 italic leading-relaxed">
                    &quot;{test.content}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 text-xs font-bold font-display shadow-sm">
                    {test.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold text-zinc-900 leading-none">
                      {test.name}
                    </span>
                    <span className="font-sans text-[10px] text-zinc-500 mt-1">
                      {test.role}, {test.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 - Right to Left */}
          <div className="flex w-[200%] gap-6 animate-marquee-right">
            {[...testimonials, ...testimonials].reverse().map((test, index) => (
              <div
                key={`${test.id}-rev-${index}`}
                className="w-[300px] sm:w-[380px] bg-zinc-50/80 hover:bg-white rounded-3xl p-6 border border-zinc-200 flex flex-col justify-between gap-6 text-left shrink-0 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex gap-1">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-cyan-500 text-cyan-500" />
                    ))}
                  </div>
                  <p className="font-sans text-sm text-zinc-700 italic leading-relaxed">
                    &quot;{test.content}&quot;
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-700 text-xs font-bold font-display shadow-sm">
                    {test.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold text-zinc-900 leading-none">
                      {test.name}
                    </span>
                    <span className="font-sans text-[10px] text-zinc-500 mt-1">
                      {test.role}, {test.company}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overlay gradient shadows on sides to fade edges */}
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      {/* CSS custom keyframe definitions for Marquee scrolling */}
      <style jsx global>{`
        @keyframes marquee-l {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-r {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-l 32s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-r 32s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
