"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { projectsApi } from "@/lib/api";
import type { LucideIcon } from "lucide-react";
import { ThreeDWrapper } from "@/components/ui/ThreeDWrapper";
import {
  ExternalLink, ArrowUpRight, ChevronRight,
  Layers, Cpu, Globe, Code2, Sparkles, Star,
  X, Terminal, Info, Layout, Eye,
  BarChart, TrendingUp, Search
} from "lucide-react";

// ── types ─────────────────────────────────────────────────────────────────────
type Project = typeof portfolioData.projects[0];

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

// ── category config ───────────────────────────────────────────────────────────
const CAT: Record<string, { text: string; bg: string; border: string; icon: LucideIcon }> = {
  "AI / ML":         { text: "text-violet-400",  bg: "bg-violet-400/10",  border: "border-violet-400/25", icon: Cpu },
  "Full Stack + AI": { text: "text-cyan-400",    bg: "bg-cyan-400/10",    border: "border-cyan-400/25",   icon: Layers },
  "Full Stack":      { text: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/25", icon: Globe },
  "Frontend":        { text: "text-amber-400",   bg: "bg-amber-400/10",   border: "border-amber-400/25",  icon: Layout },
};

const getCatConfig = (c: string) => CAT[c] ?? { text: "text-white/50", bg: "bg-white/5", border: "border-white/10", icon: Code2 };

// ── Project Detail Modal ──────────────────────────────────────────────────────
function ProjectModal({ project, isOpen, onClose }: { project: Project; isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
        
        <motion.div
          layoutId={`project-card-${project.title}`}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-[#0A0A0F] border border-white/10 rounded-3xl shadow-2xl flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>

          {/* Left Side: Visual/Code */}
          <div className="md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-white/5 bg-[#05050A] flex flex-col overflow-hidden">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" 
                   style={{ background: `${project.accentColor}15`, border: `1px solid ${project.accentColor}30` }}>
                {project.category.includes("AI") ? "🤖" : "🚀"}
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">{project.title}</h3>
                <p className="text-xs font-mono" style={{ color: project.accentColor }}>{project.year} • {project.category}</p>
              </div>
            </div>

            {/* Code Snippet */}
            <div className="flex-1 rounded-2xl bg-black/40 border border-white/5 overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
                <Terminal size={14} className="text-white/20" />
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Inference Engine</span>
              </div>
              <div className="p-5 font-mono text-[11px] leading-relaxed overflow-y-auto custom-scrollbar">
                <pre className="text-white/60">
                  <code>{project.codeSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Tech stack tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span key={i} className="px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-[10px] font-mono text-white/40">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side: Info */}
          <div className="md:w-1/2 p-8 overflow-y-auto custom-scrollbar">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono uppercase tracking-widest text-white/20">
              <Info size={12} /> Project Overview
            </div>
            
            <h4 className="text-xl font-bold text-white mb-4 leading-tight">{project.tagline}</h4>
            <p className="text-white/50 text-sm leading-relaxed mb-8">
              {project.longDescription || project.description}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {project.metrics.map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${project.accentColor}10` }}>
                    <Star size={14} style={{ color: project.accentColor }} />
                  </div>
                  <span className="text-xs font-mono text-white/60 leading-snug">{m}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4 mt-auto">
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl font-bold text-sm text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: project.accentColor }}
              >
                Launch Live Demo <ArrowUpRight size={18} />
              </a>
              <a 
                href={project.github}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <GithubIcon />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Project Card ──────────────────────────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const cfg = getCatConfig(project.category);
  const Icon = cfg.icon;

  return (
    <motion.div
      layoutId={`project-card-${project.title}`}
      onClick={onClick}
      className="group relative cursor-pointer h-full"
    >
      <ThreeDWrapper intensity={10} className="h-full">
        {/* Dynamic Glow */}
        <div 
          className="absolute -inset-px rounded-[2rem] blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.accentColor}, transparent 70%)` }}
        />

        <div 
          className="relative h-full bg-[#0A0A0F]/90 backdrop-blur-sm border border-white/[0.06] rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:bg-[#0F0F1A]"
        >
          {/* Accent Strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)` }} />

          <div className="p-8 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className={`flex items-center gap-1.5 text-[10px] font-mono px-3 py-1.5 rounded-full ${cfg.bg} ${cfg.border} border ${cfg.text}`}>
                <Icon size={10} />
                {project.category}
              </div>
              <div className="text-[10px] font-mono text-white/20 tracking-[0.2em]">
                {project.year}
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="mb-4">
              <h3 className="font-display text-2xl font-bold text-white group-hover:gradient-text-primary transition-all duration-500 mb-1">
                {project.title}
              </h3>
              <p className="text-sm font-medium opacity-60" style={{ color: project.accentColor }}>
                {project.tagline}
              </p>
            </div>

            {/* Preview Description */}
            <p className="text-white/40 text-xs leading-relaxed line-clamp-3 mb-6">
              {project.description}
            </p>

            {/* Tech Peek */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.slice(0, 3).map((t, i) => (
                <span key={i} className="text-[9px] font-mono px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/30 uppercase tracking-widest">
                  {t}
                </span>
              ))}
              {project.tech.length > 3 && (
                <span className="text-[9px] font-mono px-2 py-1 rounded-lg text-white/20 uppercase tracking-widest">
                  +{project.tech.length - 3}
                </span>
              )}
            </div>

            {/* Footer Action */}
            <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/[0.04]">
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest group-hover:text-white transition-colors">
                Explore Project <ArrowUpRight size={12} />
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/[0.03] border border-white/[0.06] group-hover:bg-white/[0.08] transition-all">
                <Eye size={16} className="text-white/40 group-hover:text-white" />
              </div>
            </div>
          </div>

          {/* Hover Pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700"
            style={{ 
              backgroundImage: `radial-gradient(circle at 1px 1px, ${project.accentColor} 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }}
          />
        </div>
      </ThreeDWrapper>
    </motion.div>
  );
}

// ── Main Section ──────────────────────────────────────────────────────────────
export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(portfolioData.projects);
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        if (data && data.length > 0) {
          setProjects(data);
        }
      } catch (err) {
        console.warn("⚠️ Backend unavailable, using local data.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];
  
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono text-primary uppercase tracking-[0.3em] mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Project Portfolio
            </div>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Crafting <span className="gradient-text-primary italic">Intelligence</span> through Code.
            </h2>
            <p className="text-white/40 text-lg leading-relaxed">
              A curated selection of 12+ AI/ML and full-stack systems developed to solve complex real-world challenges. From hybrid fraud detection to real-time neural vision.
            </p>
          </motion.div>

          {/* Stats Summary */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex gap-4"
          >
            {[
              { label: "Systems", value: "12+", icon: Cpu },
              { label: "AI Models", value: "10+", icon: Sparkles },
              { label: "Success Rate", value: "98%", icon: TrendingUp },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center w-28 h-28 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-white/10 transition-all group">
                <stat.icon size={16} className="text-white/20 mb-2 group-hover:text-primary transition-colors" />
                <span className="text-xl font-bold text-white mb-0.5">{stat.value}</span>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-500 ${
                  filter === cat ? "text-white" : "text-white/30 hover:text-white/60"
                }`}
              >
                {filter === cat && (
                  <motion.div
                    layoutId="active-filter"
                    className="absolute inset-0 bg-white/[0.08] border border-white/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => setSelectedProject(project)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-40 text-center">
            <Search className="mx-auto text-white/10 mb-4" size={40} />
            <p className="text-white/20 font-mono text-sm uppercase tracking-widest">No projects found in this category.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <ProjectModal 
        project={selectedProject!} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}
