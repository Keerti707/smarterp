"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, LockKeyhole, Mail, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("keerti@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("smarterp_token", data.token);
      localStorage.setItem("smarterp_user", JSON.stringify(data.user));
      router.push("/company-selection");
    } else {
      alert(data.message || "Login failed");
    }

    setLoading(false);
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">
      <div className="absolute left-[-120px] top-[-120px] h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-[#B87333]/25 blur-3xl" />

      <Card className="glass-card w-full max-w-md rounded-[32px] border-white/10">
        <CardContent className="p-10">
          <div className="mb-10 flex flex-col items-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 via-[#B87333] to-[#F3C56B]">
              <Building2 className="h-8 w-8 text-white" />
            </div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-[#F3C56B]" />
              Copper desk edition
            </div>

            <h1 className="text-4xl font-bold tracking-tight">SmartERP</h1>

            <p className="mt-2 text-center text-muted-foreground">
              Sign in to manage companies, inventory, vouchers, and reports.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-12 pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-12 pl-12"
                  required
                />
              </div>
            </div>

            <Button
              disabled={loading}
              className="h-12 w-full rounded-xl bg-violet-600 hover:bg-violet-700"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
