"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatPrice } from "@/lib/data";

interface PriceChartProps {
  data: { time: string; price: number }[];
  height?: number;
  showAxis?: boolean;
  color?: "warm" | "green" | "red";
  className?: string;
}

export function PriceChart({
  data,
  height = 200,
  showAxis = false,
  color = "warm",
  className,
}: PriceChartProps) {
  const colors = {
    warm: { stroke: "#FEEFC7", fill: "rgba(254, 239, 199, 0.1)" },
    green: { stroke: "#4ADE80", fill: "rgba(74, 222, 128, 0.1)" },
    red: { stroke: "#F87171", fill: "rgba(248, 113, 113, 0.1)" },
  };

  const { stroke, fill } = colors[color];

  const priceChange = useMemo(() => {
    if (data.length < 2) return 0;
    const first = data[0].price;
    const last = data[data.length - 1].price;
    return ((last - first) / first) * 100;
  }, [data]);

  const chartColor = priceChange >= 0 ? colors.green : colors.red;

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={chartColor.stroke} stopOpacity={0.3} />
              <stop offset="100%" stopColor={chartColor.stroke} stopOpacity={0} />
            </linearGradient>
          </defs>
          {showAxis && (
            <>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717A", fontSize: 10 }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#71717A", fontSize: 10 }}
                tickFormatter={(value) => `$${formatPrice(value)}`}
                width={60}
              />
            </>
          )}
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="glass-panel p-3">
                    <p className="text-xs text-muted-foreground">{data.time}</p>
                    <p className="text-sm font-semibold text-foreground">
                      ${formatPrice(data.price)}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke={chartColor.stroke}
            strokeWidth={2}
            fill={`url(#gradient-${color})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// Mini sparkline version
export function MiniChart({
  data,
  width = 100,
  height = 32,
}: {
  data: { time: string; price: number }[];
  width?: number;
  height?: number;
}) {
  const priceChange = useMemo(() => {
    if (data.length < 2) return 0;
    const first = data[0].price;
    const last = data[data.length - 1].price;
    return ((last - first) / first) * 100;
  }, [data]);

  const color = priceChange >= 0 ? "#4ADE80" : "#F87171";

  return (
    <ResponsiveContainer width={width} height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="miniGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke={color}
          strokeWidth={1.5}
          fill="url(#miniGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
