"use client";

import { Star, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  courseOrService: string;
  content: string;
  rating: number;
  timeAgo: string;
}

const googleMapsUrl =
  "https://www.google.com/maps/place/Chameleon+IT+Academy+%7C+Digital+Marketing+%7C+Web+Developing+%7C+Graphic+Designing./@11.2831612,76.2357097,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba63b25cc6dec37:0x865b8d22ffd054f2!8m2!3d11.2831612!4d76.2357097!16s%2Fg%2F11q4bqk33t?entry=ttu&g_ep=EgoyMDI2MDgwNS4xIKXMDSoASAFQAw%3D%3D";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Muhammed Shibili",
    role: "Full Stack Developer",
    courseOrService: "Web Development",
    content: "Best IT Academy in Nilambur for Full Stack Web Development and Digital Marketing. Practical training with real live projects and outstanding mentor support.",
    rating: 5,
    timeAgo: "Google Review",
  },
  {
    id: 2,
    name: "Anfas K",
    role: "UI/UX Designer",
    courseOrService: "Graphic Designing & Branding",
    content: "The graphic design and UI/UX branding mentorship here is exceptional. The instructors explain every tool in detail with hands-on exercises.",
    rating: 5,
    timeAgo: "Google Review",
  },
  {
    id: 3,
    name: "Rinshad P",
    role: "Frontend Engineer",
    courseOrService: "Next.js & React",
    content: "Learned modern web technologies and Next.js from scratch. The atmosphere and one-on-one doubt clearance helped me build high-standard portfolios.",
    rating: 5,
    timeAgo: "Google Review",
  },
  {
    id: 4,
    name: "Fathima Hiba",
    role: "Digital Marketer",
    courseOrService: "Digital Marketing & SEO",
    content: "Top-notch Digital Marketing and SEO training. The real-time campaign strategies, analytics, and Google ranking techniques were clearly taught.",
    rating: 5,
    timeAgo: "Google Review",
  },
  {
    id: 5,
    name: "Shamseer Ali",
    role: "Software Student",
    courseOrService: "Full Stack Coding",
    content: "Very friendly and professional environment. The practical lab sessions and guidance gave me the confidence to handle live software solutions.",
    rating: 5,
    timeAgo: "Google Review",
  },
  {
    id: 6,
    name: "Nihal Mohammed",
    role: "Web Specialist",
    courseOrService: "Web Applications",
    content: "Great place to learn web technologies and computer programming in Nilambur. High quality computer labs and supportive instructors.",
    rating: 5,
    timeAgo: "Google Review",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="relative py-24 bg-white overflow-hidden border-t border-black/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-glow-radial opacity-15 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col gap-10 text-center items-center">
        {/* Header */}
        <div className="flex flex-col gap-4 items-center">
          {/* Google Verified Rating Card */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-200 hover:border-emerald-500/50 hover:shadow-md transition-all duration-300 group shadow-sm"
          >
            <div className="flex items-center gap-1">
              {/* Google G icon styling */}
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="font-sans text-xs font-bold text-zinc-900 ml-1">4.9</span>
            </div>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-zinc-300">|</span>
            <span className="font-sans text-xs font-semibold text-zinc-600 group-hover:text-emerald-600 transition-colors">
              Google Maps Reviews
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </a>

          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-950 mt-2">
            What People{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]">
              Say on Google
            </span>
          </h2>
          <p className="font-sans text-base text-zinc-600 max-w-lg">
            Real feedback from students, clients, and partners at Chameleon Nilambur.
          </p>
        </div>

        {/* Infinite CSS Marquee Rows */}
        <div className="w-full flex flex-col gap-8 overflow-hidden relative">
          {/* Row 1 - Left to Right */}
          <div className="flex w-[200%] gap-6 animate-marquee-left">
            {[...testimonials, ...testimonials].map((test, index) => (
              <div
                key={`${test.id}-${index}`}
                className="w-[320px] sm:w-[390px] bg-zinc-50/90 hover:bg-white rounded-3xl p-6 border border-zinc-200 flex flex-col justify-between gap-6 text-left shrink-0 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  {/* Top Rating + Google Verified */}
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" />
                      {test.timeAgo}
                    </div>
                  </div>

                  <p className="font-sans text-sm text-zinc-700 leading-relaxed font-normal">
                    &quot;{test.content}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-zinc-200/80">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold font-display shadow-sm uppercase">
                    {test.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold text-zinc-950 leading-none">
                      {test.name}
                    </span>
                    <span className="font-sans text-[11px] text-zinc-500 mt-1 font-medium">
                      {test.role} • <span className="text-emerald-600">{test.courseOrService}</span>
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
                className="w-[320px] sm:w-[390px] bg-zinc-50/90 hover:bg-white rounded-3xl p-6 border border-zinc-200 flex flex-col justify-between gap-6 text-left shrink-0 shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {Array.from({ length: test.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" />
                      {test.timeAgo}
                    </div>
                  </div>

                  <p className="font-sans text-sm text-zinc-700 leading-relaxed font-normal">
                    &quot;{test.content}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-zinc-200/80">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold font-display shadow-sm uppercase">
                    {test.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-sans text-xs font-bold text-zinc-950 leading-none">
                      {test.name}
                    </span>
                    <span className="font-sans text-[11px] text-zinc-500 mt-1 font-medium">
                      {test.role} • <span className="text-cyan-600">{test.courseOrService}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Overlay gradient shadows on sides to fade edges */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>

        {/* Direct Google Maps Action Button */}
        <div className="mt-2">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-zinc-950 text-white font-sans text-xs sm:text-sm font-semibold hover:bg-emerald-600 hover:shadow-lg transition-all duration-300 shadow-md group"
          >
            <MapPin className="h-4 w-4 text-emerald-400 group-hover:text-white transition-colors" />
            View Location & All Reviews on Google Maps
            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
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
          animation: marquee-l 34s linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-r 34s linear infinite;
        }
        .animate-marquee-left:hover, .animate-marquee-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
