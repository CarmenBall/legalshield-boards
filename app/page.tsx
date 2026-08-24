"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { boards } from "@/lib/content";
import { Language } from "@/types";
import { BoardSidebar } from "@/components/board-sidebar";
import { ScriptCard } from "@/components/script-card";
import { LanguageToggle } from "@/components/language-toggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Shield, ExternalLink, Users, Plus } from "lucide-react";

export default function HomePage() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeBoardId, setActiveBoardId] = useState(boards[0].id);
  const [query, setQuery] = useState("");

  const activeBoard = useMemo(
    () => boards.find((b) => b.id === activeBoardId) ?? boards[0],
    [activeBoardId]
  );

  const filteredItems = useMemo(() => {
    if (!query.trim()) return activeBoard.items;
    const q = query.toLowerCase();
    return activeBoard.items.filter(
      (item) =>
        item.title[language].toLowerCase().includes(q) ||
        item.body[language].toLowerCase().includes(q) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [activeBoard, query, language]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/95 px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h1 className="text-lg font-bold leading-none">LegalShield Boards</h1>
              <p className="text-xs text-muted-foreground">
                {language === "en" ? "Team content library" : "Biblioteca de contenido del equipo"}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/join" className="gap-1.5">
                <Plus className="h-3.5 w-3.5" />
                {language === "en" ? "Get My Link" : "Mi Enlace"}
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/team" className="gap-1.5">
                <Users className="h-3.5 w-3.5" />
                {language === "en" ? "Team Links" : "Enlaces del Equipo"}
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/opportunity" target="_blank" className="gap-1.5">
                {language === "en" ? "Opportunity Page" : "Página de Oportunidad"}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link href="/vip" target="_blank" className="gap-1.5">
                {language === "en" ? "VIP Form" : "Formulario VIP"}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <LanguageToggle language={language} onChange={setLanguage} />
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-0 md:flex-row">
        <BoardSidebar
          boards={boards}
          activeId={activeBoardId}
          language={language}
          onSelect={setActiveBoardId}
        />

        <main className="flex-1 space-y-6 p-6">
          <div>
            <h2 className="text-2xl font-bold">{activeBoard.label[language]}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeBoard.description[language]}
            </p>
          </div>

          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={language === "en" ? "Search this board..." : "Buscar en este tablero..."}
              className="pl-9"
            />
          </div>

          {filteredItems.length === 0 ? (
            <p className="py-12 text-center text-sm text-muted-foreground">
              {language === "en" ? "No scripts match your search." : "Ningún guion coincide con tu búsqueda."}
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {filteredItems.map((item) => (
                <ScriptCard key={item.id} item={item} language={language} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
