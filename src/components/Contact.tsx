"use client";

import { useState } from "react";
import { Send, ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "website",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", service: "website", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-white overflow-hidden border-t border-black/5">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-glow-radial opacity-15 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Column - Contact info */}
        <div className="lg:col-span-5 flex flex-col gap-8 text-left">
          <div className="flex flex-col gap-4">
            <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
              Start a Project
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-950 leading-tight">
              Let&apos;s make it <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7] font-extrabold">
                Adaptable
              </span>
            </h2>
            <p className="font-sans text-base text-zinc-600 leading-relaxed max-w-md mt-2">
              Ready to shape-shift your brand&apos;s digital presence? Get in touch and let&apos;s construct native desktop apps, mobile platforms, video, or events.
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-zinc-100 border border-zinc-200 p-3 text-emerald-600 shadow-sm">
                <Mail className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                  Email Us
                </span>
                <a href="mailto:info@chameleon-it.com" className="font-sans text-sm font-bold text-zinc-900 hover:text-emerald-600 transition-colors duration-300">
                  info@chameleon-it.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-zinc-100 border border-zinc-200 p-3 text-cyan-600 shadow-sm">
                <Phone className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                  Call Tech & Academy Lab
                </span>
                <a href="tel:+916235660067" className="font-sans text-sm font-bold text-zinc-900 hover:text-cyan-600 transition-colors duration-300">
                  +91 6235 660 067
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-zinc-100 border border-zinc-200 p-3 text-emerald-600 shadow-sm">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                  Chameleon Location
                </span>
                <a
                  href="https://www.google.com/maps/place/Chameleon+IT+Academy+%7C+Digital+Marketing+%7C+Web+Developing+%7C+Graphic+Designing./@11.2831612,76.2357097,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba63b25cc6dec37:0x865b8d22ffd054f2!8m2!3d11.2831612!4d76.2357097!16s%2Fg%2F11q4bqk33t?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-zinc-900 hover:text-emerald-600 font-semibold transition-colors flex items-center gap-1.5"
                >
                  Zain Tower, 1st Floor, Nilambur, Kerala 679329
                  <ArrowUpRight className="h-3.5 w-3.5 text-emerald-600" />
                </a>
              </div>
            </div>

            {/* Google Map Mini Embed Box */}
            <div className="mt-2 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm h-40 w-full relative">
              <iframe
                title="Chameleon Google Map"
                src="https://maps.google.com/maps?q=11.2831612,76.2357097&hl=en&z=16&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Premium Form */}
        <div className="lg:col-span-7">
          <div className="bg-zinc-50/80 rounded-3xl p-8 md:p-10 border border-zinc-200 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 h-40 w-40 bg-glow-radial opacity-15 -z-10" />

            {submitted ? (
              <div className="h-96 flex flex-col justify-center items-center gap-4 text-center">
                <div className="h-16 w-16 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 animate-bounce">
                  <Send className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-zinc-950 mt-4">
                  Message Sent Successfully!
                </h3>
                <p className="font-sans text-sm text-zinc-600 max-w-sm mt-1 leading-relaxed">
                  Thank you! Our digital wizards are reviewing your requirements and will reach back in 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-sans text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    className="w-full rounded-xl bg-white border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-5 py-4 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-300 shadow-sm"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-sans text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-xl bg-white border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-5 py-4 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-300 shadow-sm"
                  />
                </div>

                {/* Service Selection */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="font-sans text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    Required Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-5 py-4 font-sans text-sm text-zinc-900 outline-none transition-all duration-300 shadow-sm appearance-none cursor-pointer"
                  >
                    <option value="website">Website Development</option>
                    <option value="desktop">Desktop App Development</option>
                    <option value="mobile">Mobile App Development</option>
                    <option value="branding">UI/UX Design & Branding</option>
                    <option value="videography">Videography & Commercials</option>
                    <option value="seo">SEO & Marketing Analytics</option>
                    <option value="events">Event Management Planning</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="font-sans text-xs font-semibold uppercase tracking-wider text-zinc-600">
                    Project Brief
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Briefly describe your goals..."
                    className="w-full rounded-xl bg-white border border-zinc-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 px-5 py-4 font-sans text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-300 shadow-sm resize-none"
                  />
                </div>

                {/* Submit Button */}
                <div className="mt-4 flex justify-start">
                  <Magnetic>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-full bg-zinc-950 hover:bg-accent hover:text-zinc-950 shadow-md hover:shadow-lg px-8 py-4 font-sans text-sm font-semibold text-white transition-all duration-300"
                    >
                      Send Message <ArrowUpRight className="h-4 w-4 stroke-[3]" />
                    </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
