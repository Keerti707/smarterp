"use client";

import { Bell, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090B]/90 backdrop-blur-xl">
      <div className="flex h-20 items-center justify-between px-8">

        <div className="relative w-full max-w-md">

          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <Input
            placeholder="Search customers, invoices, inventory..."
            className="h-12 rounded-2xl border-white/10 bg-white/5 pl-11 text-white placeholder:text-gray-500"
          />

        </div>

        <div className="flex items-center gap-5">

          <button className="relative rounded-2xl bg-white/5 p-3 transition hover:bg-white/10">
            <Bell className="h-5 w-5" />

            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-2">

            <Avatar>
              <AvatarFallback className="bg-violet-600 text-white">
                K
              </AvatarFallback>
            </Avatar>

            <div>

              <p className="text-sm font-semibold">
                Keerti
              </p>

              <p className="text-xs text-gray-400">
                Administrator
              </p>

            </div>

          </div>

        </div>

      </div>
    </header>
  );
}
