export type Language = "en" | "es";

export interface ScriptItem {
  id: string;
  title: { en: string; es: string };
  body: { en: string; es: string };
  tags?: string[];
}

export interface BoardCategory {
  id: string;
  label: { en: string; es: string };
  description: { en: string; es: string };
  items: ScriptItem[];
}
