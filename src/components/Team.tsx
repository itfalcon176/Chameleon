"use client";

import { motion } from "framer-motion";

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarGradient: string;
  socials: { github?: string; linkedin?: string; twitter?: string };
}

const team: TeamMember[] = [
  {
    name: "Vikram Dev",
    role: "Founder & Chief Architect",
    bio: "Systems architect specialize in C++, Rust, and native desktop app compiles.",
    avatarGradient: "from-emerald-400 via-teal-500 to-cyan-500",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Kiran Sen",
    role: "Creative Director",
    bio: "Designing clean vector architectures, branding guides, and high-fidelity layouts.",
    avatarGradient: "from-purple-500 via-pink-500 to-rose-500",
    socials: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    name: "Anjali Nair",
    role: "Lead SEO & Marketing Analyst",
    avatarGradient: "from-amber-400 via-orange-500 to-red-500",
    bio: "Expert SEO auditor, keyword search intent mapping, and digital lead campaigns.",
    socials: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Devika Lal",
    role: "Lead Mobile Engineer",
    avatarGradient: "from-blue-500 via-indigo-500 to-violet-500",
    bio: "React Native developer coding fluid gestures, offline state sync and encryption.",
    socials: { github: "#", linkedin: "#" },
  },
];

export default function Team() {
  return (
    <section id="team" className="relative py-24 bg-zinc-50 overflow-hidden border-t border-black/5">
      <div className="absolute bottom-1/2 left-0 w-[400px] h-[400px] bg-glow-radial opacity-15 -z-10 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col gap-12 text-center items-center">
        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className="font-sans text-xs font-semibold tracking-widest text-emerald-600 uppercase">
            Our Crew
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-zinc-950">
            Meet the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#0284c7]">
              Wizards
            </span>
          </h2>
          <p className="font-sans text-base text-zinc-600 max-w-lg mt-2">
            The multi-disciplinary wizards adapting their skills to shape and launch your platforms.
          </p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full mt-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-3xl p-6 border border-zinc-200 flex flex-col gap-6 text-left relative overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-emerald-500/30 shadow-sm"
            >
              {/* Animated Avatar Box */}
              <div className="relative w-full aspect-square rounded-2xl bg-zinc-100 overflow-hidden border border-zinc-200 group-hover:border-emerald-500/30 transition-all duration-500 flex items-center justify-center">
                {/* Dynamic colorful gradient mesh */}
                <div
                  className={`absolute inset-4 rounded-full bg-gradient-to-tr ${member.avatarGradient} opacity-20 filter blur-xl group-hover:scale-125 group-hover:opacity-40 transition-all duration-700`}
                />
                
                {/* Initial monogram avatar */}
                <div className="relative z-10 font-display text-4xl font-extrabold text-zinc-800 group-hover:text-zinc-950 transition-colors duration-500 drop-shadow-sm uppercase">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="flex gap-4">
                    {member.socials.github && (
                      <a href={member.socials.github} className="text-zinc-600 hover:text-emerald-600 p-1 transition-colors">
                        <GithubIcon />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} className="text-zinc-600 hover:text-emerald-600 p-1 transition-colors">
                        <LinkedinIcon />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} className="text-zinc-600 hover:text-emerald-600 p-1 transition-colors">
                        <TwitterIcon />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Identity Detail */}
              <div className="flex flex-col gap-2">
                <span className="font-sans text-[10px] text-emerald-600 tracking-widest font-semibold uppercase leading-none">
                  {member.role}
                </span>
                <h3 className="font-display text-lg font-bold text-zinc-950 leading-none">
                  {member.name}
                </h3>
                <p className="font-sans text-xs text-zinc-600 leading-relaxed mt-1">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
