"use client";

import { cn } from "@/lib/utils";
import { Card as ShadcnCard } from "@/components/ui/card";
import { forwardRef, HTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <ShadcnCard
        ref={ref}
        className={cn(
          "card-clean p-6 border-white/10",
          hover && "transition-all cursor-pointer hover:border-white/20 hover:bg-white/[0.02]",
          className
        )}
        {...props}
      >
        {children}
      </ShadcnCard>
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
    <GlassCard className={cn("", className)}>
      <p className="text-sm text-muted-foreground mb-2">{label}</p>
      <p className="stat-number">{value}</p>
      {(subValue || trend !== undefined) && (
        <div className="flex items-center gap-2 mt-2">
          {trend !== undefined && (
            <span
              className={cn(
                "text-sm font-medium font-mono",
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

interface ResultCardProps {
  metric: string;
  before: string;
  after: string;
  supplier?: string;
}

export function ResultCard({ metric, before, after, supplier }: ResultCardProps) {
  return (
    <div className="result-highlight py-3">
      <p className="text-sm text-muted-foreground mb-1">{metric}</p>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground line-through">{before}</span>
        <ArrowRight className="w-3 h-3 text-accent-green" />
        <span className="font-semibold text-accent-green">{after}</span>
      </div>
      {supplier && (
        <p className="text-xs text-muted-foreground mt-1">via {supplier}</p>
      )}
    </div>
  );
}

export { GlassCard };
