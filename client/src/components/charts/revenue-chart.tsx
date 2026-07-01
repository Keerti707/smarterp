"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  sales: number;
  purchases: number;
};

function formatINR(value: number) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${value}`;
}

export function RevenueChart({ sales, purchases }: Props) {
  const profit = sales - purchases;

  const data = [
    { name: "Purchases", amount: purchases },
    { name: "Sales", amount: sales },
    { name: "Profit", amount: profit },
  ];

  return (
    <div className="h-[380px] w-full rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Revenue Overview</h2>
          <p className="text-sm text-muted-foreground">
            Sales, purchases and profit snapshot
          </p>
        </div>

        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-300">
          Profit {formatINR(profit)}
        </div>
      </div>

      <ResponsiveContainer width="100%" height="82%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="erpRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#F3C56B" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#B87333" stopOpacity={0.02} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#27272A" />

          <XAxis dataKey="name" stroke="#A1A1AA" tickLine={false} axisLine={false} />

          <YAxis
            stroke="#A1A1AA"
            tickFormatter={(value) => formatINR(Number(value))}
            tickLine={false}
            axisLine={false}
          />

          <Tooltip
            formatter={(value) => formatINR(Number(value))}
            contentStyle={{
              background: "#111018",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "16px",
              color: "white",
            }}
          />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#F3C56B"
            strokeWidth={4}
            fill="url(#erpRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}