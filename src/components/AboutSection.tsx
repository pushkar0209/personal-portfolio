"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { MapPin, Code2, Zap, Heart } from "lucide-react";
import { aboutApi } from "@/lib/api";
import dynamic from "next/dynamic";

const GeometricOrb = dynamic(
  () => import("@/components/three/GeometricOrb").then((m) => ({ default: m.GeometricOrb })),
  { ssr: false, loading: () => <div className="w-full h-[420px] flex items-center justify-center text-white/20 text-sm font-mono">initializing 3d...</div> }
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="section-label mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
    {children}
  </div>
);

export function AboutSection() {
  const [personal, setPersonal] = useState(portfolioData.personal);
  const [stats, setStats] = useState(portfolioData.stats);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const data = await aboutApi.get();
        if (data) {
          setPersonal(data);
          if (data.stats) setStats(data.stats);
        }
      } catch (err) {
        console.warn("⚠️ Backend unavailable, using local about data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const highlights = [
    { icon: <Code2 size={18} />, text: "Full Stack AI Expert", color: "text-primary" },
    { icon: <Zap size={18} />, text: `Shipped ${stats.find(s => s.label.includes("Projects"))?.value || "12"}+ projects`, color: "text-accent" },
    { icon: <Heart size={18} />, text: "Passionate about UX & AI", color: "text-rose-400" },
    { icon: <MapPin size={18} />, text: personal.location, color: "text-emerald-400" },
  ];

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
  };

  return (
    <section id="about" className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left - Text */}
          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={item}>
              <SectionLabel>// about me</SectionLabel>
            </motion.div>

            <motion.h2
              variants={item}
              className="font-display text-4xl md:text-5xl font-bold mb-6 leading-tight"
            >
              Engineer by profession,{" "}
              <span className="gradient-text-primary">Creator</span> by passion
            </motion.h2>

            <motion.p variants={item} className="text-white/55 text-lg leading-relaxed mb-6">
              {personal.bio}
            </motion.p>

            <motion.p variants={item} className="text-white/40 leading-relaxed mb-10">
              {personal.longBio}
            </motion.p>

            {/* Highlights */}
            <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.10] transition-colors"
                >
                  <span className={h.color}>{h.icon}</span>
                  <span className="text-sm text-white/60">{h.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - 3D Orb + Code Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-6"
          >
            {/* 3D Geometric Orb */}
            <div className="relative">
              {/* Glow halo behind orb */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-accent/8 to-transparent rounded-3xl blur-3xl" />
              <div className="relative glass-card rounded-2xl border border-white/[0.07] overflow-hidden shadow-2xl">
                {/* mini titlebar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/[0.03] border-b border-white/[0.05]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <span className="text-[10px] font-mono text-white/25 ml-2">scene.three.tsx · interactive</span>
                  <span className="ml-auto text-[10px] font-mono text-primary/60 animate-pulse">● live</span>
                </div>
                <div className="h-[340px] md:h-[400px]">
                  <GeometricOrb />
                </div>
              </div>

              {/* Floating stat widgets */}
              <motion.div
                className="absolute -bottom-5 -right-4 glass-card rounded-xl p-3.5 border border-white/[0.08] shadow-xl z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-xs font-mono text-white/40 mb-1">Current Focus</div>
                <div className="text-sm font-semibold text-white/90">AI + Full Stack</div>
                <div className="mt-2 flex gap-1">
                  {["🤖", "⚡", "🔥"].map((e, i) => (
                    <span key={i} className="text-base">{e}</span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-4 -left-4 glass-card rounded-xl p-3.5 border border-white/[0.08] shadow-xl z-10"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-2xl font-display font-bold gradient-text-primary">
                  {stats.find(s => s.label.includes("Projects"))?.value || "12"}+
                </div>
                <div className="text-xs text-white/40">Projects Built</div>
              </motion.div>
            </div>

            {/* Code card below */}
            <div className="relative glass-card rounded-2xl overflow-hidden border border-white/[0.07] shadow-xl">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.06]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-xs font-mono text-white/30 ml-2">philosophy.ts</span>
              </div>
              <pre className="p-6 text-sm font-mono leading-relaxed overflow-x-auto">
                <code className="text-white/70">
                  <span className="text-white/30">{"// My development philosophy\n"}</span>
                  <span className="text-accent">{"const "}</span>
                  <span className="text-white/90">{"approach = {"}</span>
                  {"\n"}
                  <span className="text-white/40">{"  craft: "}</span>
                  <span className="text-emerald-400">{"\"pixel-perfect UIs\""}</span>
                  {",\n"}
                  <span className="text-white/40">{"  scale: "}</span>
                  <span className="text-emerald-400">{"\"robust architectures\""}</span>
                  {",\n"}
                  <span className="text-white/40">{"  innovate: "}</span>
                  <span className="text-emerald-400">{"\"AI-first solutions\""}</span>
                  {",\n"}
                  <span className="text-white/40">{"  deliver: "}</span>
                  <span className="text-emerald-400">{"\"always on time\""}</span>
                  {",\n"}
                  <span className="text-white/90">{"}"}</span>
                  {"\n\n"}
                  <span className="text-primary">{"export default "}</span>
                  <span className="text-white/90">{"approach;"}</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
