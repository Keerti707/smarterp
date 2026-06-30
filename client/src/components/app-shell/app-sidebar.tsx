"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building2,
  CreditCard,
  FileText,
  Home,
  Landmark,
  Package,
  ReceiptText,
  Settings,
  ShoppingCart,
  Users,
  WalletCards,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Home },
  { label: "Inventory", href: "/inventory", icon: Package },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "Suppliers", href: "/suppliers", icon: Building2 },
  { label: "Sales", href: "/sales", icon: ReceiptText },
  { label: "Purchases", href: "/purchases", icon: ShoppingCart },
  { label: "Reports", href: "/reports", icon: BarChart3 },
  { label: "Accounting", href: "/accounting", icon: WalletCards },
  { label: "Banking", href: "/banking", icon: CreditCard },
  { label: "Settings", href: "#", icon: Settings },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r border-white/10 bg-[#0f0b18] lg:flex lg:flex-col">
      <div className="border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-[#B87333] to-[#F3C56B]">
            <FileText className="h-6 w-6 text-white" />
          </div>

          <div>
            <h1 className="text-xl font-black text-white">
              SmartERP
            </h1>

            <p className="text-xs text-gray-400">
              Cloud ERP
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${
                active
                  ? "bg-violet-600 text-white shadow-lg"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-5">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#F3C56B]">
            Shortcuts
          </p>

          <div className="space-y-2 text-sm text-gray-400">
            <p>F8 — Sales</p>
            <p>F9 — Purchase</p>
            <p>Alt + L — Ledger</p>
            <p>Ctrl + K — Search</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
