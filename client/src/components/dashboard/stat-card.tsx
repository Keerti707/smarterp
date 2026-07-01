"use client";

import CountUp from "react-countup";
import { ArrowUpRight, LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  title: string;
  value: number;
  icon: LucideIcon;
  prefix?: string;
  color?: string;
};

function compact(value: number) {
  if (value >= 10000000) return `${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toString();
}

export function StatCard({
  title,
  value,
  icon: Icon,
  prefix = "",
  color = "#F3C56B",
}: Props) {
  const display = compact(value);
  const numeric = parseFloat(display);
  const suffix = display.replace(/[0-9.]/g, "");

  return (
    <Card className="group overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#17131F] to-[#111018] transition-all duration-300 hover:-translate-y-1 hover:border-[#B87333]/40 hover:shadow-2xl hover:shadow-[#B87333]/10">

      <CardContent className="p-7">

        <div className="mb-8 flex items-center justify-between">

          <div
            className="flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ backgroundColor: `${color}22` }}
          >
            <Icon className="h-7 w-7" style={{ color }} />
          </div>

          <ArrowUpRight className="h-5 w-5 text-gray-500 transition-all group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1" />

        </div>

        <p className="text-sm text-gray-400">
          {title}
        </p>

        <h2 className="mt-3 text-[2.2rem] font-black tracking-tight">

          {prefix}

          <CountUp
            end={numeric}
            duration={1.4}
            decimals={display.includes(".") ? 2 : 0}
          />

          {suffix}

        </h2>

      </CardContent>

    </Card>
  );
}