"use client";

import { useEffect, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, Landmark, Wallet } from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { apiRequest } from "@/services/api";
import { Card, CardContent } from "@/components/ui/card";

type Company = {
  id: string;
};

type BankingSummary = {
  openingBalance: number;
  totalReceipts: number;
  totalPayments: number;
  closingBalance: number;
};

export default function BankingPage() {
  const [summary, setSummary] = useState<BankingSummary>({
    openingBalance: 0,
    totalReceipts: 0,
    totalPayments: 0,
    closingBalance: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem("smarterp_company");
    if (!saved) return;

    const company: Company = JSON.parse(saved);

    apiRequest(`/banking/${company.id}`).then(setSummary);
  }, []);

  const cards = [
    { title: "Opening Balance", value: summary.openingBalance, icon: Wallet },
    { title: "Total Receipts", value: summary.totalReceipts, icon: ArrowUpCircle },
    { title: "Total Payments", value: summary.totalPayments, icon: ArrowDownCircle },
    { title: "Closing Balance", value: summary.closingBalance, icon: Landmark },
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <p className="text-sm text-muted-foreground">Cash Flow</p>
          <h1 className="text-5xl font-black">Banking</h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <Card key={card.title} className="border-white/10 bg-white/[0.03]">
              <CardContent className="p-7">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B87333]/20">
                  <card.icon className="h-7 w-7 text-[#F3C56B]" />
                </div>

                <p className="text-sm text-muted-foreground">{card.title}</p>

                <h2 className="mt-3 text-4xl font-black">
                  ₹{card.value.toLocaleString("en-IN")}
                </h2>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}