import {
  BarChart3,
  Building2,
  CreditCard,
  FileText,
  Home,
  Package,
  ReceiptText,
  Settings,
  ShoppingCart,
  Users,
  WalletCards,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", icon: Home, active: true },
  { label: "Masters", icon: Building2 },
  { label: "Inventory", icon: Package },
  { label: "Customers", icon: Users },
  { label: "Sales", icon: ReceiptText },
  { label: "Purchases", icon: ShoppingCart },
  { label: "Accounting", icon: WalletCards },
  { label: "Banking", icon: CreditCard },
  { label: "Reports", icon: BarChart3 },
  { label: "Settings", icon: Settings },
];

export function AppSidebar() {
  return (
    <aside className="h-screen w-72 shrink-0 border-r border-white/10 bg-[#0f0b18]/90 p-5 text-white">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-[#B87333] to-[#F3C56B] shadow-lg shadow-violet-950/40">
          <FileText className="h-5 w-5" />
        </div>

        <div>
          <h1 className="text-lg font-black tracking-tight">SmartERP</h1>
          <p className="text-xs text-muted-foreground">Tally-inspired Cloud ERP</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={[
              "group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition",
              item.active
                ? "bg-violet-600/20 text-white ring-1 ring-violet-500/30"
                : "text-muted-foreground hover:bg-white/5 hover:text-white",
            ].join(" ")}
          >
            <item.icon
              className={[
                "h-4 w-4 transition",
                item.active
                  ? "text-[#F3C56B]"
                  : "text-muted-foreground group-hover:text-[#F3C56B]",
              ].join(" ")}
            />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#F3C56B]">
          Shortcuts
        </p>

        <div className="mt-4 space-y-2 text-xs text-muted-foreground">
          <p>F8 — Sales Voucher</p>
          <p>F9 — Purchase Voucher</p>
          <p>Alt + L — Ledger</p>
          <p>Ctrl + K — Search</p>
        </div>
      </div>
    </aside>
  );
}