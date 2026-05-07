"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolioData } from "@/data/portfolio";
import { GraduationCap, Calendar, Star } from "lucide-react";
import dynamic from "next/dynamic";

const AiBrainScene = dynamic(
  () => import("@/components/three/AiBrainScene").then((m) => ({ default: m.AiBrainScene })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-white/20 text-sm font-mono animate-pulse">loading 3d brain...</span>
      </div>
    ),
  }
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="section-label mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
    {children}
  </div>
);

export function EducationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="relative py-32">
      {/* Subtle separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left — 3D AI Brain */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Glow behind */}
            <div className="absolute -inset-6 bg-gradient-to-br from-primary/10 via-violet-500/5 to-transparent rounded-3xl blur-3xl pointer-events-none" />

            <div className="relative glass-card rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
              {/* Terminal titlebar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-[10px] font-mono text-white/25 ml-2">ai-brain.three.tsx</span>
                <span className="ml-auto text-[10px] font-mono text-indigo-400/70 animate-pulse">● neural active</span>
              </div>

              <div className="h-[380px] md:h-[440px]">
                <AiBrainScene />
              </div>

              {/* Stats bar at bottom */}
              <div className="px-5 py-3.5 bg-white/[0.02] border-t border-white/[0.05] flex items-center gap-6">
                <div className="text-center">
                  <div className="text-lg font-display font-bold gradient-text-primary">15+</div>
                  <div className="text-[10px] text-white/35 font-mono">Neural Nodes</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-display font-bold text-cyan-400">5+</div>
                  <div className="text-[10px] text-white/35 font-mono">ML Models</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-display font-bold text-violet-400">2</div>
                  <div className="text-[10px] text-white/35 font-mono">Degrees</div>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div className="text-center">
                  <div className="text-lg font-display font-bold text-emerald-400">Real-time</div>
                  <div className="text-[10px] text-white/35 font-mono">Interactive</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Education cards */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <SectionLabel>// education</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Academic{" "}
              <span className="gradient-text-primary">Foundation</span>
            </h2>
            <p className="text-white/45 text-lg leading-relaxed mb-10">
              Pursuing dual degrees in AI, Data Science, and Computer Science Engineering —
              building the theoretical and practical foundation for intelligent systems.
            </p>

            {/* Education cards */}
            <div className="flex flex-col gap-5">
              {portfolioData.education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  className="group relative glass-card rounded-2xl border border-white/[0.06] hover:border-white/[0.12] p-5 transition-all duration-300 overflow-hidden"
                  style={{
                    boxShadow: isInView ? `0 0 30px ${edu.color}12` : "none",
                  }}
                >
                  {/* Accent side stripe */}
                  <div
                    className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
                    style={{ background: edu.color }}
                  />

                  <div className="pl-4">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: `${edu.color}18`, border: `1px solid ${edu.color}30` }}
                        >
                          <GraduationCap size={18} style={{ color: edu.color }} />
                        </div>
                        <div>
                          <h3 className="font-display text-base font-bold text-white/90">
                            {edu.institution}
                          </h3>
                          <span
                            className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                            style={{ background: `${edu.color}18`, color: edu.color }}
                          >
                            {edu.type}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-white/35 shrink-0 ml-2">
                        <Calendar size={11} />
                        <span className="text-xs font-mono">{edu.duration}</span>
                      </div>
                    </div>

                    {/* Degree */}
                    <p className="text-sm font-medium text-white/75 mb-3 leading-relaxed">
                      {edu.degree}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-col gap-1.5">
                      {edu.highlights.map((h, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <Star size={10} style={{ color: edu.color }} className="mt-0.5 shrink-0" />
                          <span className="text-xs text-white/45 leading-relaxed">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(ellipse at 30% 50%, ${edu.color}08 0%, transparent 70%)` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* IIT Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-6 flex items-center gap-3 p-3.5 rounded-xl border border-primary/20 bg-primary/5"
            >
              <div className="text-2xl">🎓</div>
              <div>
                <div className="text-sm font-semibold text-white/80">
                  IIT Jodhpur — Premier AI Research Institute
                </div>
                <div className="text-xs text-white/40 font-mono">
                  Indian Institute of Technology · Est. 2008
                </div>
              </div>
              <div className="ml-auto text-xs font-mono text-primary/70 bg-primary/10 px-2.5 py-1 rounded-lg">
                Ongoing
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
