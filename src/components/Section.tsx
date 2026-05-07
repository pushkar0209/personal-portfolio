"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

export function Section({ id, children, className, animate = true, delay = 0 }: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView && animate) {
      controls.start("visible");
    }
  }, [isInView, animate, controls]);

  return (
    <section
      id={id}
      ref={ref}
      className={cn("w-full px-4 md:px-6 lg:px-8 py-24 max-w-7xl mx-auto", className)}
    >
      {animate ? (
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {children}
        </motion.div>
      ) : (
        children
      )}
    </section>
  );
}
