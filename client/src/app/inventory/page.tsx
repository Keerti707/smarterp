"use client";

import { useEffect, useMemo, useState } from "react";
import { Package, Plus, Search } from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { apiRequest } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Company = { id: string };

type Item = {
  id: string;
  name: string;
  sku: string;
  hsn_code: string;
  purchase_price: string;
  selling_price: string;
  current_stock: string;
};

export default function InventoryPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    hsn_code: "",
    purchase_price: "",
    selling_price: "",
    opening_stock: "",
  });

  async function loadInventory(companyId: string) {
    const data = await apiRequest(`/inventory/${companyId}`);
    setItems(data);
  }

  useEffect(() => {
    const saved = localStorage.getItem("smarterp_company");
    if (!saved) return;

    const parsed = JSON.parse(saved);
    setCompany(parsed);
    loadInventory(parsed.id);
  }, []);

  const filtered = useMemo(() => {
    return items.filter((item) =>
      [item.name, item.sku, item.hsn_code]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [items, query]);

  async function createItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!company) return;

    await apiRequest(`/inventory/${company.id}`, {
      method: "POST",
      body: JSON.stringify({
        ...form,
        purchase_price: Number(form.purchase_price || 0),
        selling_price: Number(form.selling_price || 0),
        opening_stock: Number(form.opening_stock || 0),
      }),
    });

    setOpen(false);
    setForm({
      name: "",
      sku: "",
      hsn_code: "",
      purchase_price: "",
      selling_price: "",
      opening_stock: "",
    });

    loadInventory(company.id);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Stock Management</p>
            <h1 className="text-4xl font-black">Inventory</h1>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>

            <DialogContent className="glass-card border-white/10">
              <DialogHeader>
                <DialogTitle>Add Inventory Item</DialogTitle>
              </DialogHeader>

              <form onSubmit={createItem} className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Item Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>SKU</Label>
                    <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label>HSN Code</Label>
                    <Input value={form.hsn_code} onChange={(e) => setForm({ ...form, hsn_code: e.target.value })} />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label>Purchase</Label>
                    <Input type="number" value={form.purchase_price} onChange={(e) => setForm({ ...form, purchase_price: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Selling</Label>
                    <Input type="number" value={form.selling_price} onChange={(e) => setForm({ ...form, selling_price: e.target.value })} />
                  </div>
                  <div className="grid gap-2">
                    <Label>Stock</Label>
                    <Input type="number" value={form.opening_stock} onChange={(e) => setForm({ ...form, opening_stock: e.target.value })} />
                  </div>
                </div>

                <Button className="bg-violet-600 hover:bg-violet-700">
                  Save Item
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="p-5">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, SKU, or HSN..."
                className="h-12 rounded-2xl border-white/10 bg-white/5 pl-11"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filtered.map((item) => (
            <Card key={item.id} className="border-white/10 bg-white/[0.03]">
              <CardContent className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B87333]/20 text-[#F3C56B]">
                    <Package className="h-6 w-6" />
                  </div>

                  <div>
                    <h2 className="font-bold">{item.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      SKU {item.sku || "N/A"} • HSN {item.hsn_code || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">Stock: {Number(item.current_stock).toFixed(0)}</p>
                  <p className="text-sm text-muted-foreground">
                    ₹{Number(item.selling_price).toLocaleString("en-IN")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
