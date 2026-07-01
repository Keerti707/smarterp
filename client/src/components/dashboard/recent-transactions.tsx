"use client";

import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

type Transaction = {
  invoice_number: string;
  party_name: string;
  total_amount: string;
  type: "sale" | "purchase";
};

type Props = {
  transactions: Transaction[];
};

export function RecentTransactions({ transactions }: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold">Recent Transactions</h2>
        <span className="rounded-full bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
          Live
        </span>
      </div>

      <div className="space-y-3">
        {transactions.map((row, index) => {
          const sale = row.type === "sale";

          return (
            <div
              key={`${row.invoice_number}-${index}`}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#18161F] px-4 py-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    sale
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "bg-orange-500/10 text-orange-400"
                  }`}
                >
                  {sale ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownLeft className="h-5 w-5" />}
                </div>

                <div>
                  <p className="font-semibold">{row.invoice_number}</p>
                  <p className="text-sm text-gray-400">{row.party_name}</p>
                </div>
              </div>

              <p className={`font-bold ${sale ? "text-emerald-400" : "text-orange-400"}`}>
                ₹{Number(row.total_amount).toLocaleString("en-IN")}
              </p>
            </div>
          );
        })}

        {transactions.length === 0 && (
          <p className="text-sm text-gray-400">No transactions yet</p>
        )}
      </div>
    </div>
  );
}