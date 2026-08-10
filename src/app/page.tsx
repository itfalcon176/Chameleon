"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

// Core Providers & Layout elements
import LenisProvider from "@/components/LenisProvider";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";

// Page Sections
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Industries from "@/components/Industries";
import Testimonials from "@/components/Testimonials";
import Technologies from "@/components/Technologies";
import Team from "@/components/Team";
import ChameleonLab from "@/components/ChameleonLab";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LenisProvider>
      {/* Premium Loader screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <Philosophy />
            <About />
            <Services />
            <Process />
            <Portfolio />
            <Industries />
            <Testimonials />
            <Technologies />
            <Team />
            <ChameleonLab />
            <FAQ />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </LenisProvider>
  );
}
