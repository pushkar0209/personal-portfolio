"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { experienceApi } from "@/lib/api";
import { MapPin, Calendar, CheckCircle2 } from "lucide-react";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="section-label mb-4">
    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
    {children}
  </div>
);

type Experience = typeof portfolioData.experience[0];

export function ExperienceSection() {
  const [experience, setExperience] = useState<Experience[]>(portfolioData.experience);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const data = await experienceApi.getAll();
        if (data && data.length > 0) {
          setExperience(data);
        }
      } catch (err) {
        console.warn("⚠️ Backend unavailable, using local experience data.");
      } finally {
        setLoading(false);
      }
    };
    fetchExperience();
  }, []);

  return (
    <section id="experience" className="relative py-28 bg-[#070710]/30">
      {/* Subtle separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-16">
          <SectionLabel>// work history</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Where I've <span className="gradient-text-primary">worked</span>
          </h2>
          <p className="text-white/45 max-w-xl text-lg leading-relaxed">
            Real-world experience building products people love, from scrappy startups to growing teams.
          </p>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-[19px] md:left-[11px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

          <div className="flex flex-col gap-12">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.15 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-10 md:pl-10"
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 flex items-center justify-center">
                  <div className="w-[22px] h-[22px] rounded-full border-2 border-primary/50 bg-[#050508] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                </div>

                {/* Card */}
                <div className="group glass-card rounded-2xl p-6 md:p-8 border border-white/[0.06] hover:border-primary/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <div className="text-primary/80 font-semibold mt-0.5">{exp.company}</div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={13} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-white/50 leading-relaxed mb-5">{exp.description}</p>

                  {/* Achievements */}
                  <div className="flex flex-col gap-2.5 mb-5">
                    {exp.achievements.map((ach, j) => (
                      <div key={j} className="flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-white/60 leading-relaxed">{ach}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech used */}
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tech.map((t, j) => (
                      <span key={j} className="tech-badge">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
