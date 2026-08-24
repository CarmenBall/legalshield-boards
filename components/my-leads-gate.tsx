"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MyLeadsWorkspace } from "@/components/my-leads-workspace";
import { LeadRecord } from "@/lib/leads";
import { Shield, Lock, Loader2, LogOut } from "lucide-react";

function storageKey(slug: string) {
  return `legalshield-boards:pin:${slug}`;
}

export function MyLeadsGate({ slug }: { slug: string }) {
  const [pin, setPin] = useState("");
  const [activePin, setActivePin] = useState("");
  const [status, setStatus] = useState<"idle" | "checking" | "unlocked" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [associateName, setAssociateName] = useState("");

  const attemptUnlock = async (candidatePin: string) => {
    setStatus("checking");
    try {
      const res = await fetch(`/api/my-leads/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: candidatePin }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error || "Incorrect PIN.");
        setStatus("error");
        try {
          sessionStorage.removeItem(storageKey(slug));
        } catch {}
        return;
      }
      const data = await res.json();
      setAssociateName(data.associateName);
      setLeads(data.leads);
      setActivePin(candidatePin);
      setStatus("unlocked");
      try {
        sessionStorage.setItem(storageKey(slug), candidatePin);
      } catch {}
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  useEffect(() => {
    try {
      const cached = sessionStorage.getItem(storageKey(slug));
      if (cached) attemptUnlock(cached);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\d{4,6}$/.test(pin)) {
      setErrorMsg("Enter your 4 to 6 digit PIN.");
      setStatus("error");
      return;
    }
    attemptUnlock(pin);
  };

  const handleLock = () => {
    try {
      sessionStorage.removeItem(storageKey(slug));
    } catch {}
    setStatus("idle");
    setLeads([]);
    setAssociateName("");
    setActivePin("");
    setPin("");
  };

  if (status === "unlocked") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-background/95 px-6 py-4">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-semibold text-muted-foreground">LegalShield · My Leads</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">{associateName}</span>
              <Button variant="outline" size="sm" onClick={handleLock} className="gap-1.5">
                <LogOut className="h-3.5 w-3.5" /> Lock
              </Button>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-5xl space-y-6 px-6 py-10">
          <div>
            <h1 className="text-2xl font-bold">Your Leads</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <Lock className="h-3.5 w-3.5" />
              {leads.length} lead{leads.length === 1 ? "" : "s"} — unlocked with your PIN, visible only to you.
            </p>
          </div>
          <MyLeadsWorkspace leads={leads} slug={slug} pin={activePin} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-xl">Enter Your PIN</CardTitle>
          <p className="text-sm text-muted-foreground">Your leads are private. Enter the PIN you created to view them.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="pin">PIN</Label>
              <Input
                id="pin"
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                placeholder="••••"
                className="text-center text-lg tracking-widest"
                autoFocus
              />
            </div>
            {status === "error" && <p className="text-center text-sm text-destructive">{errorMsg}</p>}
            <Button type="submit" className="w-full" disabled={status === "checking"}>
              {status === "checking" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking...
                </>
              ) : (
                "Unlock My Leads"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
