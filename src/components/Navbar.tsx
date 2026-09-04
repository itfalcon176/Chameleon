"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Philosophy", href: "#philosophy" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Industries", href: "#industries" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Background blur toggle on scroll
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track active section with IntersectionObserver
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    navLinks.forEach((link) => {
      const sectionId = link.href.replace("#", "");
      const el = document.getElementById(sectionId);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Top 2px Scroll Progress Accent Bar */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-[2.5px] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.05)] py-3.5"
            : "bg-white/60 backdrop-blur-md border-b border-black/[0.03] py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center select-none group">
            <Image
              src="/logo.png"
              alt="Chameleon IT Services"
              width={220}
              height={46}
              priority
              style={{ width: "auto" }}
              className="h-8 md:h-9.5 object-contain transform group-hover:scale-102 transition-transform duration-300"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-zinc-100/70 border border-zinc-200/60 p-1.5 rounded-full backdrop-blur-md shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide transition-all duration-300 ${
                    isActive
                      ? "bg-white text-emerald-700 shadow-sm border border-zinc-200/50"
                      : "text-zinc-600 hover:text-zinc-950 hover:bg-white/60"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Medium screen Navigation fallback without pill background */}
          <nav className="hidden md:flex lg:hidden items-center gap-5">
            {navLinks.slice(0, 5).map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-xs font-semibold text-zinc-600 hover:text-zinc-950 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center gap-1.5 rounded-full bg-zinc-950 px-5 py-2.5 font-sans text-xs font-bold text-white transition-all duration-300 hover:bg-emerald-600 hover:shadow-[0_4px_20px_rgba(16,185,129,0.35)] group shadow-sm"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label="Toggle Menu"
            className="md:hidden p-2 rounded-xl text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-x-0 top-[60px] z-40 bg-white/95 backdrop-blur-2xl px-6 pt-6 pb-8 border-b border-zinc-200 shadow-2xl flex flex-col gap-4 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl font-sans text-base font-medium text-zinc-700 hover:text-emerald-600 hover:bg-emerald-50/60 transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-zinc-100 flex flex-col gap-3">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-zinc-950 py-3 text-center font-sans text-sm font-bold text-white hover:bg-emerald-600 transition-colors shadow-md"
              >
                Let&apos;s Talk <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
