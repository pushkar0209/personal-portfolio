"use client";

import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "secondary" | "outline" | "accent" | "glow";
  className?: string;
  size?: "sm" | "md";
}

export function Badge({ children, variant = "default", className, size = "md" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-mono font-medium transition-all duration-200",
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs",
        variant === "default" && "bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20",
        variant === "secondary" && "bg-white/5 text-white/70 border border-white/10 hover:border-white/20 hover:text-white/90",
        variant === "outline" && "border border-border text-muted-foreground hover:border-primary hover:text-primary",
        variant === "accent" && "bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20",
        variant === "glow" && "bg-primary/10 text-primary border border-primary/30 shadow-[0_0_12px_rgba(99,102,241,0.2)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]",
        className
      )}
    >
      {children}
    </span>
  );
}
