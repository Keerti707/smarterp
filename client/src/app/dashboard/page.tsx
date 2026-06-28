"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Clock3,
  Package,
  ReceiptText,
  Users,
  WalletCards,
} from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Company = {
  name: string;
  state: string;
  financial_year: string;
};

const kpis = [
  { title: "Total Sales", value: "₹0", icon: ReceiptText, note: "Ready for invoices" },
  { title: "Inventory Items", value: "0", icon: Package, note: "Add stock items next" },
  { title: "Customers", value: "0", icon: Users, note: "No customers yet" },
  { title: "Cash & Bank", value: "₹0", icon: WalletCards, note: "Opening balance pending" },
];

export default function DashboardPage() {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const savedCompany = localStorage.getItem("smarterp_company");
    if (savedCompany) setCompany(JSON.parse(savedCompany));
  }, []);

  return (
    <AppShell>
      <div className="space-y-8">
        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-950/40 via-white/[0.04] to-[#B87333]/20 p-8 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge className="mb-4 border-[#F3C56B]/30 bg-[#F3C56B]/10 text-[#F3C56B]">
                Gateway of SmartERP
              </Badge>
              <h1 className="max-w-3xl text-5xl font-black tracking-tight">
                {company?.name || "SmartERP Dashboard"}
              </h1>
              <p className="mt-3 text-muted-foreground">
                {company?.state || "Company"} • FY {company?.financial_year || "2026-27"} • Cloud ERP workspace
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Today
              </p>
              <p className="mt-1 text-2xl font-bold">No pending alerts</p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
          {kpis.map((item) => (
            <Card key={item.title} className="glass-card group border-white/10 transition hover:-translate-y-1 hover:border-[#F3C56B]/30">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B87333]/20 text-[#F3C56B]">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:text-[#F3C56B]" />
                </div>

                <p className="text-sm text-muted-foreground">{item.title}</p>
                <h2 className="mt-2 text-4xl font-black">{item.value}</h2>
                <p className="mt-3 text-xs text-muted-foreground">{item.note}</p>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="grid gap-5 2xl:grid-cols-[1.4fr_0.8fr]">
          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Sales Overview</h2>
                  <p className="text-sm text-muted-foreground">Monthly revenue will appear here after sales entries.</p>
                </div>
                <BarChart3 className="h-5 w-5 text-[#F3C56B]" />
              </div>

              <div className="flex h-64 items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/[0.03]">
                <p className="text-sm text-muted-foreground">Chart placeholder • Sales module coming next</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="mb-6 flex items-center gap-3">
                <Clock3 className="h-5 w-5 text-[#F3C56B]" />
                <h2 className="text-xl font-bold">Recent Activity</h2>
              </div>

              <div className="space-y-4">
                {["Company selected", "Database connected", "Authentication verified"].map((activity) => (
                  <div key={activity} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-medium">{activity}</p>
                    <p className="mt-1 text-xs text-muted-foreground">SmartERP system activity</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
