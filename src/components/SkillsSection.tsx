"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { skillsApi } from "@/lib/api";
import type { LucideIcon } from "lucide-react";
import { Monitor, Server, Brain, Wrench } from "lucide-react";
import dynamic from "next/dynamic";
import { ThreeDWrapper } from "@/components/ui/ThreeDWrapper";

const SkillsGlobe = dynamic(
  () => import("@/components/three/SkillsGlobe").then((m) => ({ default: m.SkillsGlobe })),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

// ── helpers ──────────────────────────────────────────────────────────────────
function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function polyPoints(items: { level: number }[], cx: number, cy: number, maxR: number) {
  return items
    .map((s, i) => {
      const p = polar(cx, cy, (s.level / 100) * maxR, (i * 360) / items.length);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

// ── color tokens ─────────────────────────────────────────────────────────────
const COLOR: Record<string, { stroke: string; fillId: string; text: string; bg: string; border: string }> = {
  violet: { stroke: "#8b5cf6", fillId: "violet", text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/25" },
  cyan:   { stroke: "#06b6d4", fillId: "cyan",   text: "text-cyan-400",   bg: "bg-cyan-500/10",   border: "border-cyan-500/25"   },
  emerald:{ stroke: "#10b981", fillId: "emerald",text: "text-emerald-400",bg: "bg-emerald-500/10",border: "border-emerald-500/25" },
  amber:  { stroke: "#f59e0b", fillId: "amber",  text: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/25"  },
};

const ICONS: Record<string, LucideIcon> = {
  monitor: Monitor, server: Server, brain: Brain, wrench: Wrench,
};

type SkillGroup = typeof portfolioData.skills[0];

// ── RadarChart ────────────────────────────────────────────────────────────────
function RadarChart({
  group,
  idx,
  isInView,
}: {
  group: SkillGroup;
  idx: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const c = COLOR[group.color] ?? COLOR.cyan;
  const Icon = ICONS[group.icon] ?? Brain;
  const CX = 130, CY = 130, R = 95;
  const n = group.items.length;
  const avg = Math.round(group.items.reduce((a, b) => a + b.level, 0) / n);
  const rings = [0.25, 0.5, 0.75, 1.0];
  const CIRC = 2 * Math.PI * 18;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: idx * 0.13 }}
      className="group relative"
    >
      <ThreeDWrapper intensity={10} className="h-full">
        {/* card */}
        <div
          className={`relative glass-card rounded-2xl border ${c.border} p-5 transition-all duration-500 overflow-hidden h-full`}
          style={{ boxShadow: `0 0 32px ${c.stroke}12` }}
        >
          {/* hover glow overlay */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
            style={{ background: `radial-gradient(ellipse at 50% 50%, ${c.stroke}08 0%, transparent 70%)` }}
          />

          {/* card header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl ${c.bg} border ${c.border} flex items-center justify-center shrink-0`}>
                <Icon size={17} className={c.text} />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-white/90">{group.category}</h3>
                <p className={`text-[10px] font-mono ${c.text}`}>{n} skills · avg {avg}%</p>
              </div>
            </div>

            {/* avg score ring */}
            <div className="relative w-11 h-11 shrink-0">
              <svg viewBox="0 0 40 40" className="w-full h-full -rotate-90">
                <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3.5" />
                <motion.circle
                  cx="20" cy="20" r="18" fill="none"
                  stroke={c.stroke} strokeWidth="3.5" strokeLinecap="round"
                  strokeDasharray={CIRC}
                  initial={{ strokeDashoffset: CIRC }}
                  animate={isInView ? { strokeDashoffset: CIRC * (1 - avg / 100) } : {}}
                  transition={{ duration: 1.5, delay: idx * 0.13 + 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-[10px] font-mono font-bold ${c.text}`}>
                {avg}%
              </span>
            </div>
          </div>

          {/* SVG radar */}
          <svg viewBox="0 0 260 260" className="w-full" style={{ height: 210 }}>
            <defs>
              <radialGradient id={`rf-${idx}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={c.stroke} stopOpacity="0.28" />
                <stop offset="100%" stopColor={c.stroke} stopOpacity="0.04" />
              </radialGradient>
            </defs>

            {/* rings */}
            {rings.map((lv) => (
              <polygon key={lv} fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1"
                points={polyPoints(group.items.map(() => ({ level: lv * 100 })), CX, CY, R)} />
            ))}

            {/* axis lines */}
            {group.items.map((_, i) => {
              const pt = polar(CX, CY, R, (i * 360) / n);
              return <line key={i} x1={CX} y1={CY} x2={pt.x} y2={pt.y} stroke="rgba(255,255,255,0.055)" strokeWidth="1" />;
            })}

            {/* animated skill polygon */}
            <motion.g style={{ transformOrigin: `${CX}px ${CY}px` }}
              initial={{ scale: 0 }} animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 1.3, delay: idx * 0.13 + 0.25, ease: [0.22, 1, 0.36, 1] }}>
              <polygon points={polyPoints(group.items, CX, CY, R)}
                fill={`url(#rf-${idx})`} stroke={c.stroke} strokeWidth="1.8" strokeLinejoin="round"
                style={{ filter: `drop-shadow(0 0 5px ${c.stroke}55)` }} />
            </motion.g>

            {/* skill nodes + labels */}
            {group.items.map((skill, i) => {
              const angle = (i * 360) / n;
              const r = (skill.level / 100) * R;
              const pt = polar(CX, CY, r, angle);
              const lp = polar(CX, CY, R + 20, angle);
              const isH = hovered === i;
              const label = skill.name.length > 9 ? skill.name.slice(0, 8) + "…" : skill.name;

              return (
                <g key={i} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
                  <text x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="central"
                    fontSize="8.5" fontFamily="'JetBrains Mono', monospace"
                    fill={isH ? c.stroke : "rgba(255,255,255,0.3)"}
                    style={{ transition: "fill 0.2s", cursor: "default", userSelect: "none" }}>
                    {label}
                  </text>
                  <motion.circle cx={pt.x} cy={pt.y} r={isH ? 5.5 : 3.5} fill={c.stroke}
                    style={{ cursor: "pointer", filter: isH ? `drop-shadow(0 0 7px ${c.stroke})` : "none", transition: "r 0.15s, filter 0.15s" }} />
                </g>
              );
            })}

            {/* center circle */}
            <circle cx={CX} cy={CY} r="16" fill="rgba(5,5,18,0.85)" stroke={c.stroke} strokeWidth="1.2" strokeOpacity="0.45" />
          </svg>

          {/* skill tag chips */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {group.items.slice(0, 4).map((s, i) => (
              <span key={i}
                className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${c.bg} border ${c.border} ${c.text}`}>
                {s.name.split(" ")[0]} {s.level}%
              </span>
            ))}
          </div>
        </div>
      </ThreeDWrapper>
    </motion.div>
  );
}

// ── marquee ───────────────────────────────────────────────────────────────────
function TechMarquee({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="overflow-hidden" style={{ maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)" }}>
      <motion.div className="flex gap-3 w-max"
        animate={{ x: reverse ? [0, "-50%"] : ["-50%", 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
        {[...items, ...items].map((t, i) => (
          <div key={i}
            className="px-4 py-2 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/50 text-xs font-mono whitespace-nowrap hover:text-white hover:border-primary/30 transition-colors">
            {t}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ── main export ───────────────────────────────────────────────────────────────
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="section-label mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
    {children}
  </div>
);

export function SkillsSection() {
  const [skills, setSkills] = useState<SkillGroup[]>(portfolioData.skills);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const data = await skillsApi.getAll();
        if (data && data.length > 0) {
          setSkills(data);
        }
      } catch (err) {
        console.warn("⚠️ Backend unavailable, using local skills data.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const allTech = Array.from(new Set(skills.flatMap(s => s.items.map(i => i.name))));

  return (
    <section id="skills" className="relative py-28 bg-[#070710]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionLabel>// technical skills</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Skill <span className="gradient-text-primary">Radar</span>
            </h2>
            <p className="text-white/45 max-w-lg text-lg leading-relaxed">
              Interactive radar charts visualising proficiency across every domain.
              Every chart is a 3D-reactive object.
            </p>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative glass-card rounded-2xl border border-white/[0.06] overflow-hidden" style={{ height: 360 }}>
              <div className="h-full"><SkillsGlobe /></div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
          {skills.map((g, i) => (
            <RadarChart key={g.category} group={g} idx={i} isInView={isInView} />
          ))}
        </div>

        {allTech.length > 0 && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="flex flex-col gap-3">
            <TechMarquee items={allTech.slice(0, Math.ceil(allTech.length / 2))} />
            <TechMarquee items={allTech.slice(Math.ceil(allTech.length / 2))} reverse />
          </motion.div>
        )}
      </div>
    </section>
  );
}
