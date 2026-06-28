"use client";

import {
  Bell,
  ChevronDown,
  Search,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-20 items-center justify-between border-b border-white/10 bg-[#09090B]/80 px-8 backdrop-blur-xl">

      <div className="flex items-center gap-6">

        <div>
          <Badge className="mb-2 border-[#F3C56B]/30 bg-[#F3C56B]/10 text-[#F3C56B]">
            SmartERP Workspace
          </Badge>

          <h1 className="text-3xl font-black tracking-tight text-white">
            Dashboard
          </h1>
        </div>

        <div className="relative hidden xl:block">
          <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />

          <Input
            placeholder="Search anything...   Ctrl + K"
            className="h-12 w-[420px] rounded-2xl border-white/10 bg-white/5 pl-11"
          />
        </div>

      </div>

      <div className="flex items-center gap-4">

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10">
          <Sparkles className="h-5 w-5 text-[#F3C56B]" />
        </button>

        <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition hover:bg-white/10">
          <Bell className="h-5 w-5 text-white" />

          <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#F3C56B]" />
        </button>

        <button className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 transition hover:bg-white/10">

          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-violet-600 via-[#B87333] to-[#F3C56B] font-bold text-white">
              K
            </AvatarFallback>
          </Avatar>

          <div className="hidden text-left lg:block">
            <p className="font-semibold text-white">
              Keerti Gupta
            </p>

            <p className="text-xs text-muted-foreground">
              Administrator
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-muted-foreground" />

        </button>

      </div>

    </header>
  );
}