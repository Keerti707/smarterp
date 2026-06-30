import Link from "next/link";
import {
  BarChart3,
  Boxes,
  Building2,
  CreditCard,
  FileBarChart,
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
  { label: "Dashboard", icon: Home, href: "/dashboard", active: true },
  { label: "Company", icon: Building2, href: "/company-selection" },
  { label: "Inventory", icon: Package, href: "/inventory" },
  { label: "Stock", icon: Boxes, href: "#" },
  { label: "Customers", icon: Users, href: "/customers" },
  { label: "Suppliers", icon: Building2, href: "/suppliers" },
  { label: "Sales", icon: ReceiptText, href: "#" },
  { label: "Purchases", icon: ShoppingCart, href: "/purchases" },
  { label: "Accounting", icon: WalletCards, href: "#" },
  { label: "Banking", icon: CreditCard, href: "/banking" },
  { label: "Reports", icon: FileBarChart, href: "#" },
  { label: "Settings", icon: Settings, href: "#" },
];

export function AppSidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-white/10 bg-gradient-to-b from-[#0E0A18] via-[#13111F] to-[#09090B] px-5 py-6 text-white">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 via-[#B87333] to-[#F3C56B] shadow-xl shadow-violet-950/50">
          <FileText className="h-6 w-6" />
        </div>

        <div>
          <h1 className="text-xl font-black tracking-tight">
            SmartERP
          </h1>

          <p className="text-xs text-muted-foreground">
            Enterprise Workspace
          </p>
        </div>

      </div>

      <div className="my-8 h-px bg-white/10" />

      <nav className="flex-1 space-y-2">

        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={[
              "group flex items-center gap-4 rounded-2xl px-4 py-3 transition-all duration-200",
              item.active
                ? "bg-gradient-to-r from-violet-600/30 to-[#B87333]/20 ring-1 ring-violet-500/30"
                : "hover:bg-white/5",
            ].join(" ")}
          >
            <item.icon
              className={[
                "h-5 w-5",
                item.active
                  ? "text-[#F3C56B]"
                  : "text-muted-foreground group-hover:text-[#F3C56B]",
              ].join(" ")}
            />

            <span
              className={[
                "font-medium",
                item.active
                  ? "text-white"
                  : "text-muted-foreground group-hover:text-white",
              ].join(" ")}
            >
              {item.label}
            </span>

          </Link>
        ))}

      </nav>

      <div className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-violet-950/40 to-[#B87333]/10 p-5">

        <div className="mb-4 flex items-center gap-3">
          <BarChart3 className="h-5 w-5 text-[#F3C56B]" />

          <div>
            <p className="font-semibold">
              Business Insights
            </p>

            <p className="text-xs text-muted-foreground">
              Reports available soon
            </p>
          </div>
        </div>

        <button className="w-full rounded-2xl bg-[#F3C56B] py-2 text-sm font-bold text-black transition hover:scale-[1.02]">
          View Analytics
        </button>

      </div>

    </aside>
  );
}