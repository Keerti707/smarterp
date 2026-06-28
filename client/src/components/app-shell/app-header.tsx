"use client";

import { Bell, ChevronDown, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-white/10 bg-background/70 px-8 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#F3C56B]">
            SmartERP
          </p>

          <h1 className="text-2xl font-bold">
            Dashboard
          </h1>
        </div>

        <div className="relative hidden lg:block">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search customers, invoices, products..."
            className="h-11 w-[360px] rounded-2xl border-white/10 bg-white/5 pl-11"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10">
          <Bell className="h-5 w-5" />

          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-[#F3C56B]" />
        </button>

        <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10">
          <Avatar>
            <AvatarFallback className="bg-violet-700 text-white">
              K
            </AvatarFallback>
          </Avatar>

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold">
              Keerti
            </p>

            <p className="text-xs text-muted-foreground">
              Owner
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}