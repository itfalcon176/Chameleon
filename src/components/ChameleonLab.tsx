"use client";

import { useState } from "react";
import { Sliders, Check, RotateCcw } from "lucide-react";

interface ColorPreset {
  name: string;
  primary: string;
  secondary: string;
  glow: string;
  description: string;
}

const presets: ColorPreset[] = [
  {
    name: "Chameleon Signature",
    primary: "#00f59b",
    secondary: "#00d2ff",
    glow: "rgba(0, 245, 155, 0.25)",
    description: "The authentic chameleon electric green & cyber cyan look directly from your logo.",
  },
  {
    name: "Cyber Prism",
    primary: "#7928ca",
    secondary: "#00d2ff",
    glow: "rgba(121, 40, 202, 0.25)",
    description: "Ultra-modern chromatic violet & cyan representing creative digital power.",
  },
  {
    name: "Solar Ember",
    primary: "#ff5e3a",
    secondary: "#ffb800",
    glow: "rgba(255, 94, 58, 0.25)",
    description: "High-energy chameleon warm spectrum for dynamic agency impact.",
  },
  {
    name: "Electric Aqua",
    primary: "#00d2ff",
    secondary: "#00f59b",
    glow: "rgba(0, 210, 255, 0.25)",
    description: "Vibrant high-contrast cyan & emerald for futuristic technology appeal.",
  },
];

export default function ChameleonLab() {
  const [activePreset, setActivePreset] = useState(presets[0]);
  const [customHue, setCustomHue] = useState(150);

  const applyColors = (primary: string, secondary: string, glow: string) => {
    document.documentElement.style.setProperty("--accent-color", primary);
    document.documentElement.style.setProperty("--accent-gradient-start", primary);
    document.documentElement.style.setProperty("--accent-gradient-end", secondary);
    document.documentElement.style.setProperty("--accent-glow", glow);
  };

  const handlePresetSelect = (preset: ColorPreset) => {
    setActivePreset(preset);
    applyColors(preset.primary, preset.secondary, preset.glow);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hue = parseInt(e.target.value);
    setCustomHue(hue);

    // Calculate secondary hue (+60 degrees)
    const primary = `hsl(${hue}, 80%, 50%)`;
    const secondary = `hsl(${(hue + 60) % 360}, 85%, 50%)`;
    const glow = `hsla(${hue}, 80%, 50%, 0.2)`;

    applyColors(primary, secondary, glow);
    setActivePreset({
      name: "Custom Chromatic",
      primary,
      secondary,
      glow,
      description: `Adapting hues dynamically at ${hue}° to match your specific corporate brand.`,
    });
  };

  const handleReset = () => {
    handlePresetSelect(presets[0]);
  };

  return (
    <section className="relative py-24 md:py-36 bg-zinc-50 overflow-hidden border-t border-black/5">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-glow-radial opacity-15 -z-10" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left column info */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            Interactive Playground
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-950 leading-tight">
            Chameleon Lab: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]">
              Adaptable Identity
            </span>
          </h2>
          <p className="font-sans text-base text-zinc-600 max-w-lg leading-relaxed">
            A chameleon changes colors to match its environment. At Chameleon IT Services,
            we shape-shift our design, technologies, and marketing strategies to fit your
            business seamlessly. Pick a preset or craft a custom hue below to watch the
            entire website adapt in real-time.
          </p>

          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm flex items-start gap-4">
            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-600 border border-emerald-100">
              <Sliders className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-display text-lg font-bold text-zinc-950">
                {activePreset.name}
              </h4>
              <p className="font-sans text-sm text-zinc-600 mt-1">
                {activePreset.description}
              </p>
            </div>
          </div>
        </div>

        {/* Right column interface */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-3xl p-8 md:p-10 border border-zinc-200 shadow-xl flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-glow-radial opacity-15 -z-10" />

            <div className="flex justify-between items-center">
              <h3 className="font-display text-xl font-bold text-zinc-950">
                Customize Theme
              </h3>
              <button
                onClick={handleReset}
                className="text-zinc-500 hover:text-zinc-950 p-2 flex items-center gap-2 text-xs transition-colors duration-300 font-semibold"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>

            {/* Presets Grid */}
            <div className="flex flex-col gap-4">
              <span className="font-sans text-xs tracking-wider text-zinc-500 uppercase font-semibold text-left">
                Select Accent Preset
              </span>
              <div className="grid grid-cols-2 gap-4">
                {presets.map((preset) => {
                  const isActive = activePreset.name === preset.name;
                  return (
                    <button
                      key={preset.name}
                      onClick={() => handlePresetSelect(preset)}
                      className={`relative flex items-center justify-between p-4 rounded-xl border transition-all duration-300 text-left ${
                        isActive
                          ? "border-emerald-500 bg-emerald-50/50 shadow-sm"
                          : "border-zinc-200 bg-zinc-50 hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-sm font-semibold text-zinc-900">
                          {preset.name}
                        </span>
                        <div className="flex gap-1.5 mt-1">
                          <span
                            className="h-3 w-3 rounded-full border border-zinc-300"
                            style={{ backgroundColor: preset.primary }}
                          />
                          <span
                            className="h-3 w-3 rounded-full border border-zinc-300"
                            style={{ backgroundColor: preset.secondary }}
                          />
                        </div>
                      </div>
                      {isActive && (
                        <div className="rounded-full bg-emerald-500 p-1 text-white shadow-sm">
                          <Check className="h-3 w-3 stroke-[3]" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="h-[1px] w-full bg-zinc-200" />

            {/* Custom Sliders */}
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-sans text-xs tracking-wider text-zinc-500 uppercase font-semibold">
                  Custom Chromatic Hue Slider
                </span>
                <span className="font-mono text-sm text-emerald-600 font-bold">{customHue}°</span>
              </div>

              <div className="flex flex-col gap-2">
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={customHue}
                  onChange={handleSliderChange}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-emerald-500 shadow-inner"
                  style={{
                    background:
                      "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
                  }}
                />
                <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1 font-semibold">
                  <span>RED</span>
                  <span>GREEN</span>
                  <span>BLUE</span>
                  <span>RED</span>
                </div>
              </div>
            </div>

            {/* Chameleon Preview Visual */}
            <div className="relative h-20 w-full rounded-2xl bg-gradient-to-r from-accent to-[#0284c7] flex items-center justify-center font-display font-bold text-white text-base md:text-lg tracking-widest shadow-md overflow-hidden uppercase">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.15)_100%)]" />
              Adaptable Visual Mesh Active
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
