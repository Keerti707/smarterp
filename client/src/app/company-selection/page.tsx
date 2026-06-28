"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Plus } from "lucide-react";

import { apiRequest } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Company = {
  id: string;
  name: string;
  state: string;
  financial_year: string;
  gst_number: string;
};

export default function CompanySelectionPage() {
  const router = useRouter();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    gst_number: "",
    financial_year: "2026-27",
    state: "",
    contact_email: "",
    contact_phone: "",
  });

  async function loadCompanies() {
    try {
      const data = await apiRequest("/companies");
      setCompanies(data);
    } catch {
      router.push("/login");
    }
  }

  useEffect(() => {
    loadCompanies();
  }, []);

  async function createCompany(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      await apiRequest("/companies", {
        method: "POST",
        body: JSON.stringify(form),
      });

      setOpen(false);
      setForm({
        name: "",
        address: "",
        gst_number: "",
        financial_year: "2026-27",
        state: "",
        contact_email: "",
        contact_phone: "",
      });

      await loadCompanies();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Failed to create company");
    }

    setLoading(false);
  }

  function selectCompany(company: Company) {
    localStorage.setItem("smarterp_company", JSON.stringify(company));
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">SmartERP Workspace</p>
            <h1 className="text-4xl font-bold tracking-tight">Select Company</h1>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Company
              </Button>
            </DialogTrigger>

            <DialogContent className="glass-card border-white/10 sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Create Company</DialogTitle>
              </DialogHeader>

              <form onSubmit={createCompany} className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Company Name</Label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>State</Label>
                    <Input
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Financial Year</Label>
                    <Input
                      value={form.financial_year}
                      onChange={(e) => setForm({ ...form, financial_year: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>GST Number</Label>
                  <Input
                    value={form.gst_number}
                    onChange={(e) => setForm({ ...form, gst_number: e.target.value })}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Address</Label>
                  <Input
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Email</Label>
                    <Input
                      value={form.contact_email}
                      onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label>Phone</Label>
                    <Input
                      value={form.contact_phone}
                      onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                    />
                  </div>
                </div>

                <Button disabled={loading} className="mt-2 bg-violet-600 hover:bg-violet-700">
                  {loading ? "Creating..." : "Create Company"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="glass-card rounded-3xl border-white/10">
          <CardContent className="space-y-4 p-6">
            {companies.map((company) => (
              <button
                key={company.id}
                onClick={() => selectCompany(company)}
                className="flex w-full items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:bg-white/10"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#B87333]/20 text-[#F3C56B]">
                  <Building2 className="h-7 w-7" />
                </div>

                <div>
                  <h2 className="text-xl font-bold">{company.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {company.state || "No state"} • FY {company.financial_year || "Not set"} • GST {company.gst_number ? "enabled" : "not set"}
                  </p>
                </div>
              </button>
            ))}

            {companies.length === 0 && (
              <p className="text-muted-foreground">
                No companies found. Create your first company to continue.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
