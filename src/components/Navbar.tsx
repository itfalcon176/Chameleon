"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Industries", href: "#industries" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-md border-b border-black/5 shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between">
          {/* Logo container */}
          <a href="#" className="flex items-center select-none group">
            <Image
              src="/logo.png"
              alt="Chameleon"
              width={220}
              height={46}
              priority
              className="h-8 md:h-10 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative font-sans text-sm font-medium text-zinc-600 hover:text-zinc-950 transition-colors duration-300 group"
              >
                {link.name}
                <span className="absolute bottom-[-4px] left-0 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="relative inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full border border-black/10 bg-zinc-950 px-6 py-2.5 font-sans text-sm font-semibold text-white transition-all duration-300 hover:bg-accent hover:text-zinc-950 hover:shadow-[0_4px_20px_var(--accent-glow)] group shadow-sm"
            >
              <span className="relative z-10 flex items-center gap-1 transition-colors duration-300">
                Let&apos;s Talk <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-zinc-800 hover:text-black p-2"
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
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl pt-24 px-8 pb-10 flex flex-col justify-between border-b border-black/5"
          >
            <div className="flex flex-col gap-6 mt-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-3xl font-light text-zinc-800 hover:text-black transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <div className="h-[1px] w-full bg-black/5" />
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-zinc-950 py-4 text-center font-sans font-semibold text-white hover:bg-accent hover:text-zinc-950 transition-all duration-300 shadow-md"
              >
                Get In Touch <ArrowUpRight className="h-5 w-5" />
              </a>
              <div className="text-center text-xs text-zinc-400 tracking-wider uppercase">
                Chameleon IT Services © {new Date().getFullYear()}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
