"use client";

import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "card-clean p-6",
          hover && "transition-colors cursor-pointer hover:border-[#333]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

interface StatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: number;
  className?: string;
}

export function StatCard({ label, value, subValue, trend, className }: StatCardProps) {
  return (
    <Card className={cn("", className)}>
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
    </Card>
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
        <span className="text-accent-green">→</span>
        <span className="font-semibold text-accent-green">{after}</span>
      </div>
      {supplier && (
        <p className="text-xs text-muted-foreground mt-1">via {supplier}</p>
      )}
    </div>
  );
}

// keeping GlassCard as alias for backwards compat
export { Card as GlassCard };
