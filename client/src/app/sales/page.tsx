"use client";

import { useEffect, useMemo, useState } from "react";
import { FilePlus2, Plus, Receipt, Search, Trash2 } from "lucide-react";

import { AppShell } from "@/components/app-shell/app-shell";
import { apiRequest } from "@/services/api";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Company = { id: string };

type Customer = {
  id: string;
  name: string;
};

type InventoryItem = {
  id: string;
  name: string;
  selling_price: string;
  current_stock: string;
};

type Invoice = {
  id: string;
  invoice_number: string;
  invoice_date: string;
  customer_name: string | null;
  subtotal: string;
  gst_amount: string;
  total_amount: string;
};

type InvoiceItem = {
  inventory_item_id: string;
  item_name: string;
  quantity: string;
  rate: string;
  gst_percent: string;
};

const emptyItem: InvoiceItem = {
  inventory_item_id: "",
  item_name: "",
  quantity: "1",
  rate: "",
  gst_percent: "18",
};

export default function SalesPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const [customerId, setCustomerId] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now()}`);
  const [items, setItems] = useState<InvoiceItem[]>([emptyItem]);

  async function load(companyId: string) {
    const [salesData, customerData, inventoryData] = await Promise.all([
      apiRequest(`/sales/${companyId}`),
      apiRequest(`/customers/${companyId}`),
      apiRequest(`/inventory/${companyId}`),
    ]);

    setInvoices(salesData);
    setCustomers(customerData);
    setInventory(inventoryData);
  }

  useEffect(() => {
    const saved = localStorage.getItem("smarterp_company");
    if (!saved) return;

    const c = JSON.parse(saved);
    setCompany(c);
    load(c.id);
  }, []);

  const filtered = useMemo(() => {
    return invoices.filter((invoice) =>
      `${invoice.invoice_number} ${invoice.customer_name ?? ""}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [invoices, query]);

  function updateItem(index: number, field: keyof InvoiceItem, value: string) {
    const updated = [...items];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    if (field === "inventory_item_id") {
      const selected = inventory.find((item) => item.id === value);

      if (selected) {
        updated[index].item_name = selected.name;
        updated[index].rate = selected.selling_price;
      }
    }

    setItems(updated);
  }

  function addLine() {
    setItems([...items, { ...emptyItem }]);
  }

  function removeLine(index: number) {
    setItems(items.filter((_, itemIndex) => itemIndex !== index));
  }

  async function createInvoice(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!company) return;

    await apiRequest(`/sales/${company.id}`, {
      method: "POST",
      body: JSON.stringify({
        customer_id: customerId || null,
        invoice_number: invoiceNumber,
        notes: "",
        items: items.map((item) => ({
          ...item,
          quantity: Number(item.quantity || 0),
          rate: Number(item.rate || 0),
          gst_percent: Number(item.gst_percent || 0),
        })),
      }),
    });

    setOpen(false);
    setCustomerId("");
    setInvoiceNumber(`INV-${Date.now()}`);
    setItems([{ ...emptyItem }]);

    await load(company.id);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Sales</p>
            <h1 className="text-4xl font-black">Sales Invoices</h1>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <FilePlus2 className="mr-2 h-4 w-4" />
                New Invoice
              </Button>
            </DialogTrigger>

            <DialogContent className="glass-card max-w-4xl border-white/10">
              <DialogHeader>
                <DialogTitle>Create Sales Invoice</DialogTitle>
              </DialogHeader>

              <form onSubmit={createInvoice} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid gap-2">
                    <Label>Invoice Number</Label>
                    <Input
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Customer</Label>
                    <select
                      value={customerId}
                      onChange={(e) => setCustomerId(e.target.value)}
                      className="h-10 rounded-md border border-white/10 bg-background px-3"
                    >
                      <option value="">Walk-in Customer</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="grid gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:grid-cols-[1.5fr_0.6fr_0.7fr_0.6fr_auto]"
                    >
                      <div className="grid gap-2">
                        <Label>Item</Label>
                        <select
                          value={item.inventory_item_id}
                          onChange={(e) =>
                            updateItem(index, "inventory_item_id", e.target.value)
                          }
                          className="h-10 rounded-md border border-white/10 bg-background px-3"
                          required
                        >
                          <option value="">Select item</option>
                          {inventory.map((inventoryItem) => (
                            <option key={inventoryItem.id} value={inventoryItem.id}>
                              {inventoryItem.name} — Stock {Number(inventoryItem.current_stock)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid gap-2">
                        <Label>Qty</Label>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(index, "quantity", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>Rate</Label>
                        <Input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            updateItem(index, "rate", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label>GST %</Label>
                        <Input
                          type="number"
                          value={item.gst_percent}
                          onChange={(e) =>
                            updateItem(index, "gst_percent", e.target.value)
                          }
                        />
                      </div>

                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="mt-8"
                        onClick={() => removeLine(index)}
                        disabled={items.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <Button type="button" variant="outline" onClick={addLine}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Line
                  </Button>

                  <Button type="submit">
                    Create Invoice
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="border-white/10 bg-white/[0.03]">
          <CardContent className="p-5">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search invoices..."
                className="pl-11"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4">
          {filtered.length === 0 ? (
            <Card className="border-white/10 bg-white/[0.03]">
              <CardContent className="flex h-48 flex-col items-center justify-center gap-3">
                <Receipt className="h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">No sales invoices yet</p>
              </CardContent>
            </Card>
          ) : (
            filtered.map((invoice) => (
              <Card key={invoice.id} className="border-white/10 bg-white/[0.03]">
                <CardContent className="flex items-center justify-between p-5">
                  <div>
                    <h2 className="font-bold">{invoice.invoice_number}</h2>
                    <p className="text-sm text-muted-foreground">
                      {invoice.customer_name ?? "Walk-in Customer"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {invoice.invoice_date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold">
                      ₹{Number(invoice.total_amount).toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      GST ₹{Number(invoice.gst_amount).toLocaleString("en-IN")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}