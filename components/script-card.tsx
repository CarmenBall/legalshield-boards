"use client";

import { useState } from "react";
import { ScriptItem, Language } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check } from "lucide-react";

interface ScriptCardProps {
  item: ScriptItem;
  language: Language;
}

export function ScriptCard({ item, language }: ScriptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(item.body[language]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard permission denied — no-op, button just won't confirm
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-3">
        <div>
          <CardTitle className="text-base">{item.title[language]}</CardTitle>
          {item.tags && item.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
        <Button
          size="sm"
          variant={copied ? "default" : "outline"}
          onClick={handleCopy}
          className="shrink-0 gap-1.5"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              {language === "en" ? "Copied" : "Copiado"}
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              {language === "en" ? "Copy" : "Copiar"}
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {item.body[language]}
        </p>
      </CardContent>
    </Card>
  );
}
