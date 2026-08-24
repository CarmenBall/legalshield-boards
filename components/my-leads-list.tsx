"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, FileText, Loader2, Check, CalendarClock } from "lucide-react";
import { LeadRecord } from "@/lib/leads";
import { followUpUrgency, formatFollowUpDate } from "@/lib/date-utils";

export const STATUS_OPTIONS = ["Not Started", "Contacted", "Follow-Up Scheduled", "Enrolled", "Not Interested"];

const TOUCH_FIELDS: { key: keyof LeadRecord; column: string; label: string }[] = [
  { key: "touchText1", column: "touch_text1", label: "Text 1" },
  { key: "touchText2", column: "touch_text2", label: "Text 2" },
  { key: "touchVideoSent", column: "touch_video_sent", label: "Video Sent" },
  { key: "touchText3", column: "touch_text3", label: "Text 3" },
  { key: "touchText4", column: "touch_text4", label: "Text 4" },
  { key: "touchText5", column: "touch_text5", label: "Text 5" },
];

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}

export function statusVariant(status: string): "default" | "secondary" | "outline" {
  const s = status.toLowerCase();
  if (s.includes("not started")) return "outline";
  if (s.includes("enroll")) return "default";
  return "secondary";
}

export interface MyLeadsListProps {
  leads: LeadRecord[];
  onUpdate: (leadId: string, payload: Record<string, unknown>) => Promise<void>;
}

export function MyLeadsList({ leads, onUpdate }: MyLeadsListProps) {
  if (leads.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        No leads yet. Once someone fills out your VIP form, they&apos;ll show up here — only visible to you.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {leads.map((lead) => (
        <LeadCard key={lead.id} lead={lead} onUpdate={onUpdate} />
      ))}
    </div>
  );
}

export function LeadCard({ lead, onUpdate }: { lead: LeadRecord; onUpdate: (leadId: string, payload: Record<string, unknown>) => Promise<void> }) {
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [noteSaved, setNoteSaved] = useState(false);

  const handleAddNote = async () => {
    if (!note.trim()) return;
    setSavingNote(true);
    await onUpdate(lead.id, { noteToAppend: note });
    setNote("");
    setSavingNote(false);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  const urgency = followUpUrgency(lead.followUpDate);

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <CardTitle className="text-base">
          {lead.firstName} {lead.lastName}
        </CardTitle>
        <Badge variant={statusVariant(lead.status)}>{lead.status}</Badge>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          <a href={`tel:${lead.phone}`} className="hover:text-foreground hover:underline">
            {lead.phone}
          </a>
        </div>
        {lead.email && (
          <div className="flex items-center gap-2">
            <Mail className="h-3.5 w-3.5 shrink-0" />
            <a href={`mailto:${lead.email}`} className="hover:text-foreground hover:underline">
              {lead.email}
            </a>
          </div>
        )}
        <div className="flex items-center gap-2">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          {formatDate(lead.createdAt)} · {lead.source}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Status</label>
          <select
            value={lead.status}
            onChange={(e) => onUpdate(lead.id, { status: e.target.value })}
            className="flex h-9 w-full rounded-md border border-input bg-background px-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="flex items-center gap-1.5 text-xs font-medium text-foreground">
            <CalendarClock className="h-3.5 w-3.5" /> Next Follow-Up
          </label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={lead.followUpDate || ""}
              onChange={(e) => onUpdate(lead.id, { follow_up_date: e.target.value || null })}
              className="flex h-9 flex-1 rounded-md border border-input bg-background px-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            {lead.followUpDate && (
              <Badge
                variant={urgency === "overdue" ? "destructive" : urgency === "today" ? "default" : "secondary"}
                className="shrink-0"
              >
                {urgency === "overdue" ? "Overdue" : urgency === "today" ? "Today" : formatFollowUpDate(lead.followUpDate)}
              </Badge>
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Follow-Up Touches</label>
          <div className="grid grid-cols-3 gap-2">
            {TOUCH_FIELDS.map((field) => (
              <label key={field.column} className="flex items-center gap-1.5 text-xs">
                <input
                  type="checkbox"
                  checked={Boolean(lead[field.key])}
                  onChange={(e) => onUpdate(lead.id, { [field.column]: e.target.checked })}
                  className="h-3.5 w-3.5 accent-primary"
                />
                {field.label}
              </label>
            ))}
          </div>
        </div>

        {lead.notes && (
          <div className="flex items-start gap-2 rounded-md bg-muted/40 p-2 text-xs">
            <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="whitespace-pre-line">{lead.notes}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Add a Note</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Left voicemail, will try again Friday"
              className="flex h-9 w-full rounded-md border border-input bg-background px-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
            <Button size="sm" variant={noteSaved ? "default" : "outline"} onClick={handleAddNote} disabled={savingNote || !note.trim()}>
              {savingNote ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : noteSaved ? <Check className="h-3.5 w-3.5" /> : "Save"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
