"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  DollarSign,
  Package,
  Receipt,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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

  const cards = [
    {
      title: "Sales",
      value: `₹${stats.sales.toLocaleString("en-IN")}`,
      icon: DollarSign,
    },
    {
      title: "Purchases",
      value: `₹${stats.purchases.toLocaleString("en-IN")}`,
      icon: ShoppingCart,
    },
    {
      title: "Inventory",
      value: stats.inventory,
      icon: Package,
    },
    {
      title: "Customers",
      value: stats.customers,
      icon: Users,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8">

        <section className="rounded-[32px] border border-white/10 bg-gradient-to-br from-violet-950/40 via-[#181424] to-[#B87333]/20 p-8">

          <Badge className="mb-4">
            SmartERP Workspace
          </Badge>

          <h1 className="text-5xl font-black">
            {company?.name}
          </h1>

          <p className="mt-3 text-muted-foreground">
            {company?.state} • FY {company?.financial_year}
          </p>

        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {cards.map((card) => (

            <Card
              key={card.title}
              className="border-white/10 bg-white/[0.03]"
            >

              <CardContent className="p-6">

                <div className="mb-5 flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B87333]/20">

                    <card.icon className="h-7 w-7 text-[#F3C56B]" />

                  </div>

                  <TrendingUp className="h-5 w-5 text-muted-foreground" />

                </div>

                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h2 className="mt-2 text-4xl font-black">
                  {card.value}
                </h2>

              </CardContent>

            </Card>

          ))}

        </section>

        <section className="grid gap-6 xl:grid-cols-2">

          <Card className="border-white/10 bg-white/[0.03]">

            <CardContent className="flex h-72 items-center justify-center">

              <div className="text-center">

                <BarChart3 className="mx-auto mb-3 h-10 w-10 text-[#F3C56B]" />

                <h2 className="text-xl font-bold">
                  Analytics
                </h2>

                <p className="text-muted-foreground">
                  Revenue charts coming next
                </p>

              </div>

            </CardContent>

          </Card>

          <Card className="border-white/10 bg-white/[0.03]">

            <CardContent className="flex h-72 items-center justify-center">

              <div className="text-center">

                <Receipt className="mx-auto mb-3 h-10 w-10 text-[#F3C56B]" />

                <h2 className="text-xl font-bold">
                  Quick Summary
                </h2>

                <div className="mt-6 space-y-3 text-left">

                  <p>Products : {stats.inventory}</p>

                  <p>Customers : {stats.customers}</p>

                  <p>Suppliers : {stats.suppliers}</p>

                  <p>Sales : ₹{stats.sales.toLocaleString("en-IN")}</p>

                  <p>Purchases : ₹{stats.purchases.toLocaleString("en-IN")}</p>

                </div>

              </div>

            </CardContent>

          </Card>

        </section>

      </div>
    </AppShell>
  );
}
