"use client";

import { BoardCategory, Language } from "@/types";
import { cn } from "@/lib/utils";
import { FolderOpen, Shield, MessageSquare, AlertCircle, Calendar, Users } from "lucide-react";

const ICONS: Record<string, typeof FolderOpen> = {
  recruiting: MessageSquare,
  "identity-theft": Shield,
  "opening-scripts": FolderOpen,
  objections: AlertCircle,
  networking: Calendar,
  onboarding: Users,
};

interface BoardSidebarProps {
  boards: BoardCategory[];
  activeId: string;
  language: Language;
  onSelect: (id: string) => void;
}

export function BoardSidebar({ boards, activeId, language, onSelect }: BoardSidebarProps) {
  return (
    <aside className="w-full shrink-0 space-y-1 border-r bg-muted/30 p-4 md:w-64">
      <h2 className="mb-4 px-2 text-lg font-bold">
        {language === "en" ? "Boards" : "Tableros"}
      </h2>
      {boards.map((board) => {
        const Icon = ICONS[board.id] ?? FolderOpen;
        const isActive = board.id === activeId;
        return (
          <button
            key={board.id}
            onClick={() => onSelect(board.id)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-accent",
              isActive && "bg-accent font-medium"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span>{board.label[language]}</span>
            <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {board.items.length}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
