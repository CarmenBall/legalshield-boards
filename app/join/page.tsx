"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Shield, Loader2, Copy, Check, ExternalLink, Lock } from "lucide-react";

interface CreatedLinks {
  name: string;
  opportunityUrl: string;
  vipUrl: string;
  leadsUrl: string;
  pin: string;
}

export default function JoinPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [story, setStory] = useState("");
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [result, setResult] = useState<CreatedLinks | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setErrorMsg("Please fill in your name and phone number.");
      setStatus("error");
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      setErrorMsg("Create a PIN that's 4 to 6 digits.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/associates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, story, pin }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Request failed");
      }
      const associate = await res.json();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      setResult({
        name: associate.name,
        opportunityUrl: `${origin}/o/${associate.slug}`,
        vipUrl: `${origin}/vip/${associate.slug}`,
        leadsUrl: `${origin}/my-leads/${associate.slug}`,
        pin,
      });
      setStatus("idle");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
        <div className="mx-auto max-w-md px-6 py-12">
          <div className="mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-muted-foreground">LegalShield</span>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">You&apos;re all set, {result.name}! 🎉</CardTitle>
              <p className="text-sm text-muted-foreground">
                These are your personal links. Bookmark them, share them anywhere — every lead that comes through will be tagged with your name, and your leads are locked behind your PIN.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <LinkRow label="Your Opportunity Page (share this)" url={result.opportunityUrl} copiedKey="opp" copied={copied} onCopy={handleCopy} />
              <LinkRow label="Your VIP Sign-Up Form (share this)" url={result.vipUrl} copiedKey="vip" copied={copied} onCopy={handleCopy} />
              <LinkRow label="Your Leads (private — PIN required)" url={result.leadsUrl} copiedKey="leads" copied={copied} onCopy={handleCopy} />
              <div className="flex items-center gap-2 rounded-lg border bg-primary/5 p-3">
                <Lock className="h-4 w-4 shrink-0 text-primary" />
                <p className="text-sm">
                  Your PIN is <span className="font-mono font-bold tracking-widest">{result.pin}</span> — write it down, you&apos;ll need it every time you open your Leads link.
                </p>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" asChild className="flex-1 gap-1.5">
                  <Link href={result.opportunityUrl.replace(/^https?:\/\/[^/]+/, "")} target="_blank">
                    Preview <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href="/">Go to Boards</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="mx-auto max-w-md px-6 py-12">
        <div className="mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-muted-foreground">LegalShield</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Get Your Personal Link</CardTitle>
            <p className="text-sm text-muted-foreground">
              Create your own opportunity page, VIP sign-up form, and a PIN-protected leads view. Every lead you generate will be tagged with your name automatically, and only you (with your PIN) can see them.
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email (optional)</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="pin">Create a PIN (4-6 digits)</Label>
                <Input
                  id="pin"
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                  placeholder="••••"
                  required
                />
                <p className="text-xs text-muted-foreground">You'll use this to unlock your private Leads page. Pick something you'll remember.</p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="story">Your Story (optional)</Label>
                <textarea
                  id="story"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  rows={5}
                  placeholder="Why did you start this business? Write it in your own words — this shows on your personal opportunity page. Leave blank to use a simple default."
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
              {status === "error" && <p className="text-sm text-destructive">{errorMsg}</p>}
              <Button type="submit" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating your links...
                  </>
                ) : (
                  "Create My Personal Link"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function LinkRow({
  label,
  url,
  copiedKey,
  copied,
  onCopy,
}: {
  label: string;
  url: string;
  copiedKey: string;
  copied: string | null;
  onCopy: (key: string, value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Input readOnly value={url} className="text-xs" />
        <Button size="icon" variant={copied === copiedKey ? "default" : "outline"} onClick={() => onCopy(copiedKey, url)} type="button">
          {copied === copiedKey ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
}
