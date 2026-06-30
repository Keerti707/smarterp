"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  Landmark,
  Receipt,
  TrendingUp,
  Wallet,
  ArrowDownCircle,
} from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { apiRequest } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";

type Company = {
  id: string;
};

type AccountingSummary = {
  sales: number;
  purchases: number;
  grossProfit: number;
  cashInHand: number;
  payable: number;
  receivable: number;
};

export default function AccountingPage() {
  const [summary, setSummary] = useState<AccountingSummary>({
    sales: 0,
    purchases: 0,
    grossProfit: 0,
    cashInHand: 0,
    payable: 0,
    receivable: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("smarterp_company");
    if (!saved) return;

    const company: Company = JSON.parse(saved);

    apiRequest(`/accounting/${company.id}`).then(setSummary);
  }, []);

  const cards = [
    {
      title: "Sales",
      value: `₹${summary.sales.toLocaleString("en-IN")}`,
      icon: DollarSign,
    },
    {
      title: "Purchases",
      value: `₹${summary.purchases.toLocaleString("en-IN")}`,
      icon: Receipt,
    },
    {
      title: "Gross Profit",
      value: `₹${summary.grossProfit.toLocaleString("en-IN")}`,
      icon: TrendingUp,
    },
    {
      title: "Cash in Hand",
      value: `₹${summary.cashInHand.toLocaleString("en-IN")}`,
      icon: Wallet,
    },
    {
      title: "Receivable",
      value: `₹${summary.receivable.toLocaleString("en-IN")}`,
      icon: Landmark,
    },
    {
      title: "Payable",
      value: `₹${summary.payable.toLocaleString("en-IN")}`,
      icon: ArrowDownCircle,
    },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-muted-foreground">
            Finance
          </p>

          <h1 className="text-5xl font-black">
            Accounting
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
