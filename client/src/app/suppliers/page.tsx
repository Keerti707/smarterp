"use client";

import { useEffect, useMemo, useState } from "react";
import { Edit, Plus, Search, Trash2, UserRound } from "lucide-react";

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

type Company = {
  id: string;
};

type Supplier = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  gst_number: string;
  credit_limit: string;
  tag: string;
  notes: string;
};

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  gst_number: "",
  credit_limit: "",
  tag: "",
  notes: "",
};

export default function SuppliersPage() {
  const [company, setCompany] = useState<Company | null>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Supplier | null>(null);

  const [form, setForm] = useState(emptyForm);

  async function load(companyId: string) {
    const data = await apiRequest(`/suppliers/${companyId}`);
    setSuppliers(data);
  }

  useEffect(() => {
    const saved = localStorage.getItem("smarterp_company");
    if (!saved) return;

    const c = JSON.parse(saved);
    setCompany(c);
    load(c.id);
  }, []);

  const filtered = useMemo(() => {
    return suppliers.filter((c) =>
      `${c.name} ${c.phone} ${c.email}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
  }, [suppliers, query]);

  function createNew() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function editSupplier(c: Supplier) {
    setEditing(c);

    setForm({
      name: c.name || "",
      phone: c.phone || "",
      email: c.email || "",
      address: c.address || "",
      gst_number: c.gst_number || "",
      credit_limit: c.credit_limit || "",
      tag: c.tag || "",
      notes: c.notes || "",
    });

    setOpen(true);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!company) return;

    if (editing) {
      await apiRequest(`/suppliers/${editing.id}`, {
        method: "PUT",
        body: JSON.stringify({
          ...form,
          credit_limit: Number(form.credit_limit || 0),
        }),
      });
    } else {
      await apiRequest(`/suppliers/${company.id}`, {
        method: "POST",
        body: JSON.stringify({
          ...form,
          credit_limit: Number(form.credit_limit || 0),
        }),
      });
    }

    setOpen(false);
    setEditing(null);
    setForm(emptyForm);

    load(company.id);
  }

  async function remove(id: string) {
    if (!company) return;

    if (!confirm("Delete supplier?")) return;

    await apiRequest(`/suppliers/${id}`, {
      method: "DELETE",
    });

    load(company.id);
  }

  return (
    <AppShell>
      <div className="space-y-6">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-sm text-muted-foreground">
              CRM
            </p>

            <h1 className="text-4xl font-black">
              Suppliers
            </h1>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
              <Button onClick={createNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add Supplier
              </Button>
            </DialogTrigger>

            <DialogContent className="glass-card border-white/10">

              <DialogHeader>
                <DialogTitle>
                  {editing ? "Edit Supplier" : "Add Supplier"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={save} className="grid gap-4">

                {[
                  ["name", "Supplier Name"],
                  ["phone", "Phone"],
                  ["email", "Email"],
                  ["address", "Address"],
                  ["gst_number", "GST Number"],
                  ["credit_limit", "Credit Limit"],
                  ["tag", "Tag"],
                  ["notes", "Notes"],
                ].map(([key, label]) => (
                  <div key={key} className="grid gap-2">
                    <Label>{label}</Label>

                    <Input
                      value={(form as any)[key]}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          [key]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}

                <Button>
                  {editing ? "Save Changes" : "Create Supplier"}
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
                placeholder="Search supplier..."
                className="pl-11"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />

            </div>

          </CardContent>

        </Card>

        <div className="grid gap-4">

          {filtered.map((c) => (

            <Card key={c.id} className="border-white/10 bg-white/[0.03]">

              <CardContent className="flex items-center justify-between p-5">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20">

                    <UserRound className="h-6 w-6 text-[#F3C56B]" />

                  </div>

                  <div>

                    <h2 className="font-bold">
                      {c.name}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                      {c.phone} • {c.email}
                    </p>

                  </div>

                </div>

                <div className="flex gap-2">

                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => editSupplier(c)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>

                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => remove(c.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

      </div>
    </AppShell>
  );
}
