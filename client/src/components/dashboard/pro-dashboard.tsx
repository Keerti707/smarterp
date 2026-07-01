"use client";

import { BarChart3, Package, ReceiptText, ShoppingCart, TrendingUp } from "lucide-react";

import { RevenueChart } from "@/components/charts/revenue-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";

type Company = {
  name?: string;
  state?: string;
  financial_year?: string;
};

type Transaction = {
  invoice_number: string;
  party_name: string;
  total_amount: string;
  type: "sale" | "purchase";
};

type Stats = {
  inventory: number;
  customers: number;
  suppliers: number;
  sales: number;
  purchases: number;
  transactions?: Transaction[];
};

function money(value: number) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

export function ProDashboard({
  company,
  stats,
}: {
  company: Company | null;
  stats: Stats;
}) {
  const profit = stats.sales - stats.purchases;

  const cards = [
    { label: "Sales", value: money(stats.sales), icon: ReceiptText },
    { label: "Purchases", value: money(stats.purchases), icon: ShoppingCart },
    { label: "Profit", value: money(profit), icon: TrendingUp },
    { label: "Inventory", value: stats.inventory.toString(), icon: Package },
  ];

  return (
    <div className="space-y-7">
      <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-950/60 via-[#171321] to-[#B87333]/30 p-8 shadow-2xl shadow-black/30">
        <p className="mb-4 inline-flex rounded-full border border-[#F3C56B]/20 bg-[#F3C56B]/10 px-3 py-1 text-xs font-semibold text-[#F3C56B]">
          SmartERP Command Center
        </p>

        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-black tracking-tight">
              {company?.name || "SmartERP"}
            </h1>

            <p className="mt-3 text-gray-400">
              {company?.state || "Company"} • FY {company?.financial_year || "2026-27"}
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-4">
            <p className="text-sm text-emerald-300">Net Profit</p>
            <h2 className="mt-1 text-3xl font-black text-emerald-300">
              {money(profit)}
            </h2>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#17131F] to-[#111018] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#B87333]/40"
            >
              <div className="mb-7 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B87333]/20 text-[#F3C56B]">
                  <Icon className="h-6 w-6" />
                </div>

                <BarChart3 className="h-5 w-5 text-gray-500" />
              </div>

              <p className="text-sm text-gray-400">{card.label}</p>

              <h3 className="mt-2 text-3xl font-black">{card.value}</h3>
            </div>
          );
        })}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <RevenueChart
            sales={stats.sales}
            purchases={stats.purchases}
          />

          <RecentTransactions
            transactions={stats.transactions ?? []}
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-bold">Business Snapshot</h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="text-sm text-gray-400">Customers</span>
              <span className="font-bold">{stats.customers}</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="text-sm text-gray-400">Suppliers</span>
              <span className="font-bold">{stats.suppliers}</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="text-sm text-gray-400">Inventory Items</span>
              <span className="font-bold">{stats.inventory}</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <span className="text-sm text-gray-400">Profit Margin</span>
              <span className="font-bold">
                {stats.sales > 0
                  ? `${((profit / stats.sales) * 100).toFixed(1)}%`
                  : "0%"}
              </span>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-violet-500/10 p-4">
            <p className="text-sm text-violet-300">System status</p>
            <p className="mt-1 font-bold">All modules connected 🚀</p>
          </div>
        </div>
      </section>
    </div>
  );
}