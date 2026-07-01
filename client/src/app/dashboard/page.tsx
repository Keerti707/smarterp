"use client";

import { useEffect, useState } from "react";

import { ProDashboard } from "@/components/dashboard/pro-dashboard";
import { AppShell } from "@/components/app-shell/app-shell";
import { apiRequest } from "@/services/api";

type Company = {
  id: string;
  name: string;
  state: string;
  financial_year: string;
};

type Stats = {
  inventory: number;
  customers: number;
  suppliers: number;
  sales: number;
  purchases: number;
};

export default function DashboardPage() {
  const [company, setCompany] = useState<Company | null>(null);

  const [stats, setStats] = useState<Stats>({
    inventory: 0,
    customers: 0,
    suppliers: 0,
    sales: 0,
    purchases: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("smarterp_company");
    if (!saved) return;

    const c = JSON.parse(saved);
    setCompany(c);

    apiRequest(`/dashboard/${c.id}`).then(setStats);
  }, []);

  return (
    <AppShell>
      <ProDashboard company={company} stats={stats} />
    </AppShell>
  );
}
