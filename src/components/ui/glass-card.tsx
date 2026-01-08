"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "highlight" | "subtle";
  hover?: boolean;
  glow?: "warm" | "green" | "none";
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = "default", hover = true, glow = "none", children, ...props }, ref) => {
    const variants = {
      default: "glass-panel",
      highlight: "glass-panel-highlight",
      subtle: "bg-white/[0.02] border border-white/[0.05] rounded-2xl",
    };

    const glowClasses = {
      warm: "glow-warm",
      green: "glow-green",
      none: "",
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          variants[variant],
          glowClasses[glow],
          hover && "transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]",
          className
        )}
        whileHover={hover ? { y: -2, scale: 1.005 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
GlassCard.displayName = "GlassCard";

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: number;
  className?: string;
}

export function StatCard({ label, value, subValue, trend, className }: StatCardProps) {
  return (
    <GlassCard className={cn("p-6", className)}>
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className="stat-number text-gradient">{value}</p>
      {(subValue || trend !== undefined) && (
        <div className="flex items-center gap-2 mt-2">
          {trend !== undefined && (
            <span
              className={cn(
                "text-sm font-medium",
                trend >= 0 ? "text-accent-green" : "text-accent-red"
              )}
            >
              {trend >= 0 ? "+" : ""}
              {trend.toFixed(1)}%
            </span>
          )}
          {subValue && <span className="text-sm text-muted-foreground">{subValue}</span>}
        </div>
      )}
    </GlassCard>
  );
}

export { GlassCard };
