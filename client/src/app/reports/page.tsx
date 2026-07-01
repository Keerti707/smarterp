"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { AppShell } from "@/components/app-shell/app-shell";
import { apiRequest } from "@/services/api";

type Company = { id: string };

type ReportData = {
  sales: number;
  purchases: number;
  profit: number;
  inventory: number;
  customers: number;
  suppliers: number;
};

const COLORS = ["#8B5CF6", "#F59E0B", "#10B981"];

export default function ReportsPage() {
  const [data, setData] = useState<ReportData>({
    sales: 0,
    purchases: 0,
    profit: 0,
    inventory: 0,
    customers: 0,
    suppliers: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("smarterp_company");
    if (!saved) return;

    const company: Company = JSON.parse(saved);

    apiRequest(`/reports/${company.id}`).then(setData);
  }, []);

  const revenue = [
    { name: "Purchases", value: data.purchases },
    { name: "Sales", value: data.sales },
    { name: "Profit", value: data.profit },
  ];

  const distribution = [
    { name: "Products", value: data.inventory },
    { name: "Customers", value: data.customers },
    { name: "Suppliers", value: Math.max(data.suppliers, 1) },
  ];

  return (
    <AppShell>
      <div className="space-y-8">

        <div>
          <p className="text-sm text-gray-400">Business Analytics</p>
          <h1 className="text-5xl font-black">Reports</h1>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 h-[420px]">
            <h2 className="mb-5 text-xl font-bold">Revenue Trend</h2>

            <ResponsiveContainer width="100%" height="90%">
              <AreaChart data={revenue}>
                <CartesianGrid stroke="#2a2a2a" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  dataKey="value"
                  stroke="#8B5CF6"
                  fill="#8B5CF655"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 h-[420px]">
            <h2 className="mb-5 text-xl font-bold">Business Distribution</h2>

            <ResponsiveContainer width="100%" height="90%">
              <PieChart>
                <Pie
                  data={distribution}
                  dataKey="value"
                  outerRadius={110}
                >
                  {distribution.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </AppShell>
  );
}