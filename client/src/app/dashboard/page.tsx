"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  DollarSign,
  Package,
  Receipt,
  TrendingUp,
  Users,
  WalletCards,
} from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Company = {
  name: string;
  state: string;
  financial_year: string;
};

const stats = [
  {
    title: "Revenue",
    value: "₹0",
    subtitle: "Today's sales",
    icon: DollarSign,
  },
  {
    title: "Products",
    value: "0",
    subtitle: "Inventory items",
    icon: Package,
  },
  {
    title: "Customers",
    value: "0",
    subtitle: "Registered",
    icon: Users,
  },
  {
    title: "Balance",
    value: "₹0",
    subtitle: "Cash & Bank",
    icon: WalletCards,
  },
];

export default function DashboardPage() {
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("smarterp_company");
    if (saved) setCompany(JSON.parse(saved));
  }, []);

  return (
    <AppShell>
      <div className="space-y-8">

        <section className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-950/40 via-[#181424] to-[#B87333]/20 p-8">

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <Badge className="mb-4 bg-[#F3C56B]/10 text-[#F3C56B] border-[#F3C56B]/20">
                SmartERP Workspace
              </Badge>

              <h1 className="text-5xl font-black tracking-tight">
                {company?.name ?? "SmartERP"}
              </h1>

              <p className="mt-3 text-muted-foreground">
                {company?.state} • FY {company?.financial_year}
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

              <div className="flex items-center gap-3">

                <TrendingUp className="h-6 w-6 text-[#F3C56B]" />

                <div>

                  <p className="text-sm text-muted-foreground">
                    Business Health
                  </p>

                  <h2 className="text-2xl font-bold">
                    Ready to Start 🚀
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </section>

        <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">

          {stats.map((item) => (
            <Card
              key={item.title}
              className="border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-[#F3C56B]/20"
            >
              <CardContent className="p-6">

                <div className="mb-6 flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B87333]/20">
                    <item.icon className="h-7 w-7 text-[#F3C56B]" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-muted-foreground" />

                </div>

                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <h2 className="mt-2 text-4xl font-black">
                  {item.value}
                </h2>

                <p className="mt-3 text-xs text-muted-foreground">
                  {item.subtitle}
                </p>

              </CardContent>
            </Card>
          ))}

        </section>

        <section className="grid gap-6 2xl:grid-cols-[1.6fr_0.9fr]">

          <Card className="border-white/10 bg-white/[0.03]">
            <CardContent className="p-6">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    Revenue Analytics
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Graphs will populate automatically after sales entries.
                  </p>

                </div>

                <BarChart3 className="h-6 w-6 text-[#F3C56B]" />

              </div>

              <div className="flex h-[340px] items-center justify-center rounded-3xl border border-dashed border-white/10 bg-gradient-to-br from-violet-950/20 to-[#B87333]/10">

                <p className="text-muted-foreground">
                  Interactive Charts Coming Next
                </p>

              </div>

            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.03]">
            <CardContent className="p-6">

              <div className="mb-6 flex items-center gap-3">

                <Receipt className="h-6 w-6 text-[#F3C56B]" />

                <h2 className="text-xl font-bold">
                  Recent Activity
                </h2>

              </div>

              <div className="space-y-4">

                {[
                  "Company selected",
                  "Authentication successful",
                  "Database connected",
                  "ERP initialized",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="font-medium">
                      {item}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      SmartERP System
                    </p>
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
