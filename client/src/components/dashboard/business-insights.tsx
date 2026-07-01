"use client";

import {
  BarChart3,
  Package,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

type Props = {
  sales: number;
  purchases: number;
  inventory: number;
  customers: number;
  suppliers: number;
};

type Item = {
  label: string;
  value: string;
  icon: LucideIcon;
  bg: string;
};

export function BusinessInsights({
  sales,
  purchases,
  inventory,
  customers,
  suppliers,
}: Props) {
  const profit = sales - purchases;
  const margin = sales > 0 ? (profit / sales) * 100 : 0;

  const items: Item[] = [
    {
      label: "Gross Profit",
      value: `₹${(profit / 100000).toFixed(2)}L`,
      icon: TrendingUp,
      bg: "bg-emerald-500/10 text-emerald-400",
    },
    {
      label: "Profit Margin",
      value: `${margin.toFixed(1)}%`,
      icon: BarChart3,
      bg: "bg-violet-500/10 text-violet-300",
    },
    {
      label: "Products",
      value: inventory.toString(),
      icon: Package,
      bg: "bg-amber-500/10 text-amber-300",
    },
    {
      label: "Customers",
      value: customers.toString(),
      icon: Users,
      bg: "bg-sky-500/10 text-sky-300",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-[#18161F] p-5 transition-all duration-300 hover:border-violet-500/40 hover:-translate-y-1"
          >
            <div
              className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <p className="text-xs uppercase tracking-wider text-gray-500">
              {item.label}
            </p>

            <h3 className="mt-2 text-3xl font-black">{item.value}</h3>
          </div>
        );
      })}
    </div>
  );
}