import { Building2, LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6">

      <div className="absolute left-[-120px] top-[-120px] h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] h-96 w-96 rounded-full bg-amber-600/20 blur-3xl" />

      <Card className="glass-card w-full max-w-md rounded-[32px] border-white/10">
        <CardContent className="p-10">

          <div className="mb-10 flex flex-col items-center">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600 to-amber-500">

              <Building2 className="h-8 w-8 text-white" />

            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              SmartERP
            </h1>

            <p className="mt-2 text-center text-muted-foreground">
              Welcome back. Sign in to continue.
            </p>

          </div>

          <form className="space-y-6">

            <div className="space-y-2">

              <Label>Email</Label>

              <div className="relative">

                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

                <Input
                  type="email"
                  placeholder="name@company.com"
                  className="h-12 pl-12"
                />

              </div>

            </div>

            <div className="space-y-2">

              <Label>Password</Label>

              <div className="relative">

                <LockKeyhole className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />

                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-12 pl-12"
                />

              </div>

            </div>

            <Button className="h-12 w-full rounded-xl bg-violet-600 hover:bg-violet-700">
              Sign In
            </Button>

          </form>

        </CardContent>
      </Card>

    </main>
  );
}
