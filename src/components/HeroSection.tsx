"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { ThreeDWrapper } from "@/components/ui/ThreeDWrapper";

const NeuralBackground = dynamic(
  () => import("@/components/three/NeuralBackground").then((m) => ({ default: m.NeuralBackground })),
  { ssr: false }
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const roles = [
  "Full Stack Engineer",
  "AI Systems Architect",
  "React & Next.js Expert",
  "AI & ML Engineer",
  "Deep Learning Developer",
  "Full Stack Developer",
  "Python Engineer",
  "Data Science Student @ IIT Jodhpur",
];

function TypewriterText({ texts }: { texts: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const timer = setTimeout(() => setIsPaused(false), 1500);
      return () => clearTimeout(timer);
    }

    const current = texts[currentIndex];
    const timeout = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < current.length) {
          setDisplayText(current.slice(0, displayText.length + 1));
        } else {
          setIsPaused(true);
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(current.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, isPaused, currentIndex, texts]);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-emerald-400">
      {displayText}
      <span className="animate-cursor text-primary ml-0.5 font-thin">|</span>
    </span>
  );
}

const floatingItems = [
  { icon: "🧠", label: "AI & ML", x: "8%", y: "20%", delay: 0 },
  { icon: "🐍", label: "Python", x: "85%", y: "15%", delay: 0.5 },
  { icon: "⚡", label: "React.js", x: "90%", y: "70%", delay: 1 },
  { icon: "📈", label: "Prophet", x: "5%", y: "75%", delay: 1.5 },
  { icon: "🔬", label: "LSTM", x: "50%", y: "5%", delay: 0.8 },
];

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background is now handled globally in layout.tsx */}

      {/* ─── Grid overlay ─── */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.025]" />

      {/* Aurora blobs */}
      <motion.div
        className="absolute top-[-20%] left-[10%] w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          x: mousePos.x * -20,
          y: mousePos.y * -20,
        }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
          x: mousePos.x * 20,
          y: mousePos.y * 20,
        }}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.15, 1], y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      {/* Floating Tech Badges */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingItems.map((item) => (
          <motion.div
            key={item.label}
            className="absolute"
            style={{ left: item.x, top: item.y }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.6, 1, 0.6], y: [0, -15, 0], scale: [0.95, 1.05, 0.95] }}
            transition={{
              delay: item.delay + 1,
              duration: 5 + item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ThreeDWrapper intensity={30}>
              <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-card text-xs font-mono text-white/60 border border-white/[0.06] shadow-xl">
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            </ThreeDWrapper>
          </motion.div>
        ))}
      </div>

      {/* ─── Content ─── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center md:text-left pt-24 pb-16">
        <div className="max-w-4xl md:mx-0 mx-auto">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex mb-8"
          >
            <ThreeDWrapper intensity={40}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-sm font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>{portfolioData.personal.availability}</span>
              </div>
            </ThreeDWrapper>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="font-display text-[56px] md:text-[80px] lg:text-[96px] font-bold leading-[1.0] tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="block text-white">Hey, I'm</span>
            <span className="block gradient-text-hero">{portfolioData.personal.name}</span>
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            className="font-display text-2xl md:text-4xl font-semibold mb-8 h-12 flex items-center justify-center md:justify-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <TypewriterText texts={roles} />
          </motion.div>

          {/* Bio */}
          <motion.p
            className="text-lg md:text-xl text-white/50 leading-relaxed mb-12 max-w-2xl md:mx-0 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {portfolioData.personal.bio}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-4 justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <ThreeDWrapper intensity={20}>
              <a
                href="#projects"
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-base overflow-hidden shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-shadow duration-300 flex items-center gap-2"
              >
                <Sparkles size={18} />
                View My Work
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </ThreeDWrapper>

            <ThreeDWrapper intensity={15}>
              <a
                href="#contact"
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/[0.04] text-white/80 font-semibold text-base hover:border-primary/30 hover:bg-primary/5 hover:text-white transition-all duration-300"
              >
                Let's Talk →
              </a>
            </ThreeDWrapper>

            <div className="flex items-center gap-3 ml-2">
              {[
                { href: portfolioData.personal.github, icon: <GithubIcon />, label: "GitHub" },
                { href: portfolioData.personal.linkedin, icon: <LinkedinIcon />, label: "LinkedIn" },
              ].map(({ href, icon, label }) => (
                <ThreeDWrapper key={label} intensity={25}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={label}
                    className="w-11 h-11 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-white/50 hover:text-white hover:border-primary/40 hover:bg-primary/10 transition-all duration-200"
                  >
                    {icon}
                  </a>
                </ThreeDWrapper>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 flex flex-wrap gap-8 justify-center md:justify-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          {portfolioData.stats.map((stat, i) => (
            <ThreeDWrapper key={i} intensity={10}>
              <div className="text-center md:text-left px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
                <div className="font-display text-4xl font-bold gradient-text-primary">{stat.value}{stat.suffix}</div>
                <div className="text-sm text-white/40 font-medium mt-1">{stat.label}</div>
              </div>
            </ThreeDWrapper>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 hover:text-white/60 transition-colors"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <ArrowDown size={16} />
      </motion.a>
    </section>
  );
}
