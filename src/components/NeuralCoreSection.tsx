"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Cpu, Zap, Activity } from "lucide-react";

const CyberDeck = dynamic(
  () => import("@/components/three").then((m) => m.CyberDeck),
  { 
    ssr: false, 
    loading: () => <div className="w-full h-[600px] flex items-center justify-center text-white/20 font-mono">Initializing Neural Core...</div> 
  }
);

export function NeuralCoreSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 bg-[#050508]">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-[0.3em] mb-8">
              <Activity size={12} className="animate-pulse" />
              Intelligence Layer
            </div>
            
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              The <span className="gradient-text-primary">Neural Core</span> of My Systems.
            </h2>
            
            <p className="text-white/50 text-lg leading-relaxed mb-12">
              Beyond standard full-stack development, I architect intelligent layers that process data, learn patterns, and provide predictive insights. This interactive visualization represents the convergence of AI and Software Engineering.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <Cpu size={20} />, title: "Distributed Processing", desc: "Handling complex ML workloads across cloud & edge." },
                { icon: <Zap size={20} />, title: "Real-time Inference", desc: "Sub-millisecond latency for vision & fraud models." },
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-primary/30 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-white/30 group-hover:text-primary transition-colors mb-4">
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
            className="order-1 lg:order-2 perspective-1000"
          >
            <div className="relative glass-card rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent pointer-events-none" />
              <CyberDeck />
            </div>
          </motion.div>
          
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
