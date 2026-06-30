"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { apiRequest } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";

type Company = {
  id: string;
};

type Report = {
  sales: number;
  purchases: number;
  profit: number;
  inventory: number;
  customers: number;
  suppliers: number;
};

export default function ReportsPage() {
  const [report, setReport] = useState<Report>({
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

    apiRequest(`/reports/${company.id}`).then(setReport);
  }, []);

  const cards = [
    {
      title: "Sales",
      value: `₹${report.sales.toLocaleString("en-IN")}`,
      icon: DollarSign,
    },
    {
      title: "Purchases",
      value: `₹${report.purchases.toLocaleString("en-IN")}`,
      icon: ShoppingCart,
    },
    {
      title: "Profit",
      value: `₹${report.profit.toLocaleString("en-IN")}`,
      icon: TrendingUp,
    },
    {
      title: "Inventory Items",
      value: report.inventory,
      icon: Package,
    },
    {
      title: "Customers",
      value: report.customers,
      icon: Users,
    },
    {
      title: "Suppliers",
      value: report.suppliers,
      icon: BarChart3,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8">

        <div>
          <p className="text-sm text-muted-foreground">
            Business Analytics
          </p>

          <h1 className="text-5xl font-black">
            Reports
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {cards.map((card) => (

            <Card
              key={card.title}
              className="border-white/10 bg-white/[0.03]"
            >

              <CardContent className="p-7">

                <div className="mb-6 flex items-center justify-between">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B87333]/20">

                    <card.icon className="h-7 w-7 text-[#F3C56B]" />

                  </div>

                </div>

                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-black">
                  {card.value}
                </h2>

              </CardContent>

            </Card>

          ))}

        </div>

      </div>
    </AppShell>
  );
}