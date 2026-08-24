"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LayoutList, Columns3, Phone, AlertCircle, CalendarClock, Download } from "lucide-react";
import { LeadRecord } from "@/lib/leads";
import { followUpUrgency, formatFollowUpDate } from "@/lib/date-utils";
import { downloadLeadsCsv } from "@/lib/csv-export";
import { MyLeadsList } from "@/components/my-leads-list";
import { MyLeadsPipeline } from "@/components/my-leads-pipeline";

interface MyLeadsWorkspaceProps {
  leads: LeadRecord[];
  slug: string;
  pin: string;
}

export function MyLeadsWorkspace({ leads: initialLeads, slug, pin }: MyLeadsWorkspaceProps) {
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [view, setView] = useState<"list" | "pipeline">("list");

  const applyUpdate = async (leadId: string, payload: Record<string, unknown>) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, ...(payload as Partial<LeadRecord>) } : l)));
    try {
      const res = await fetch(`/api/my-leads/${slug}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin, leadId, ...payload }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLeads((prev) =>
          prev.map((l) =>
            l.id === leadId
              ? {
                  ...l,
                  status: updated.status,
                  notes: updated.notes,
                  followUpDate: updated.followUpDate,
                  touchText1: updated.touchText1,
                  touchText2: updated.touchText2,
                  touchVideoSent: updated.touchVideoSent,
                  touchText3: updated.touchText3,
                  touchText4: updated.touchText4,
                  touchText5: updated.touchText5,
                }
              : l
          )
        );
      }
    } catch {
      // silent — optimistic update stays; worst case is a stale row until next reload
    }
  };

  const reminders = useMemo(
    () =>
      leads
        .filter((l) => followUpUrgency(l.followUpDate) === "overdue" || followUpUrgency(l.followUpDate) === "today")
        .sort((a, b) => (a.followUpDate || "").localeCompare(b.followUpDate || "")),
    [leads]
  );

  return (
    <div className="space-y-6">
      {reminders.length > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center gap-1.5 text-sm font-semibold">
              <AlertCircle className="h-4 w-4 text-primary" />
              {reminders.length} follow-up{reminders.length === 1 ? "" : "s"} due today or overdue
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {reminders.map((lead) => {
                const urgency = followUpUrgency(lead.followUpDate);
                return (
                  <div key={lead.id} className="flex items-center justify-between gap-2 rounded-md border bg-background px-3 py-2 text-sm">
                    <div className="flex items-center gap-2 truncate">
                      <CalendarClock className={`h-3.5 w-3.5 shrink-0 ${urgency === "overdue" ? "text-destructive" : "text-primary"}`} />
                      <span className="truncate font-medium">
                        {lead.firstName} {lead.lastName}
                      </span>
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {urgency === "overdue" ? `was due ${formatFollowUpDate(lead.followUpDate!)}` : "due today"}
                      </span>
                    </div>
                    <a href={`tel:${lead.phone}`} className="shrink-0 text-muted-foreground hover:text-foreground">
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")} className="gap-1.5">
            <LayoutList className="h-3.5 w-3.5" /> List View
          </Button>
          <Button variant={view === "pipeline" ? "default" : "outline"} size="sm" onClick={() => setView("pipeline")} className="gap-1.5">
            <Columns3 className="h-3.5 w-3.5" /> Pipeline View
          </Button>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadLeadsCsv(leads, `my-leads-${slug}`)}
          disabled={leads.length === 0}
          className="gap-1.5"
        >
          <Download className="h-3.5 w-3.5" /> Export CSV
        </Button>
      </div>

      {view === "list" ? <MyLeadsList leads={leads} onUpdate={applyUpdate} /> : <MyLeadsPipeline leads={leads} onUpdate={applyUpdate} />}
    </div>
  );
}
