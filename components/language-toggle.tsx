"use client";

import { Language } from "@/types";
import { cn } from "@/lib/utils";
import { Globe } from "lucide-react";

interface LanguageToggleProps {
  language: Language;
  onChange: (lang: Language) => void;
}

export function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  return (
    <div className="flex items-center gap-2 rounded-full border bg-muted/40 p-1">
      <Globe className="ml-2 h-4 w-4 text-muted-foreground" />
      {(["en", "es"] as Language[]).map((lang) => (
        <button
          key={lang}
          onClick={() => onChange(lang)}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            language === lang
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent"
          )}
        >
          {lang === "en" ? "English" : "Español"}
        </button>
      ))}
    </div>
  );
}
