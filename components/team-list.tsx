"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ExternalLink, User } from "lucide-react";

interface TeamListAssociate {
  slug: string;
  name: string;
  phone: string;
  createdAt: string;
}

export function TeamList({ associates, origin }: { associates: TeamListAssociate[]; origin: string }) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    } catch {}
  };

  if (associates.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No personal links yet. Be the first —{" "}
        <Link href="/join" className="text-primary underline">
          create yours
        </Link>
        .
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {associates.map((a) => {
        const oppUrl = `${origin}/o/${a.slug}`;
        const vipUrl = `${origin}/vip/${a.slug}`;
        return (
          <Card key={a.slug}>
            <CardHeader className="flex flex-row items-center gap-2 pb-3">
              <User className="h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-base">{a.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <LinkLine label="Opportunity Page" url={oppUrl} copyKey={`opp-${a.slug}`} copied={copied} onCopy={handleCopy} />
              <LinkLine label="VIP Form" url={vipUrl} copyKey={`vip-${a.slug}`} copied={copied} onCopy={handleCopy} />
              <Button variant="outline" size="sm" asChild className="gap-1.5">
                <Link href={`/o/${a.slug}`} target="_blank">
                  Preview <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function LinkLine({
  label,
  url,
  copyKey,
  copied,
  onCopy,
}: {
  label: string;
  url: string;
  copyKey: string;
  copied: string | null;
  onCopy: (key: string, value: string) => void;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-medium text-muted-foreground">{label}</p>
      <div className="flex items-center gap-2">
        <p className="flex-1 truncate rounded-md border bg-muted/40 px-2 py-1.5 text-xs">{url}</p>
        <Button size="icon" variant={copied === copyKey ? "default" : "outline"} onClick={() => onCopy(copyKey, url)} className="h-7 w-7 shrink-0">
          {copied === copyKey ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
    </div>
  );
}
