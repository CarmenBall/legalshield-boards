"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, GripVertical } from "lucide-react";
import { LeadRecord } from "@/lib/leads";
import { followUpUrgency } from "@/lib/date-utils";
import { STATUS_OPTIONS, statusVariant } from "@/components/my-leads-list";

export interface MyLeadsPipelineProps {
  leads: LeadRecord[];
  onUpdate: (leadId: string, payload: Record<string, unknown>) => Promise<void>;
}

export function MyLeadsPipeline({ leads, onUpdate }: MyLeadsPipelineProps) {
  const [dragLeadId, setDragLeadId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const handleDrop = (status: string) => {
    if (dragLeadId) {
      onUpdate(dragLeadId, { status });
    }
    setDragLeadId(null);
    setDragOverColumn(null);
  };

  return (
    <div className="grid grid-cols-1 gap-4 overflow-x-auto sm:grid-cols-2 lg:grid-cols-5">
      {STATUS_OPTIONS.map((status) => {
        const columnLeads = leads.filter((l) => l.status === status);
        return (
          <div
            key={status}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverColumn(status);
            }}
            onDragLeave={() => setDragOverColumn(null)}
            onDrop={(e) => {
              e.preventDefault();
              handleDrop(status);
            }}
            className={`min-h-[120px] rounded-lg border-2 border-dashed p-2 transition-colors ${
              dragOverColumn === status ? "border-primary bg-primary/5" : "border-transparent"
            }`}
          >
            <div className="mb-2 flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold">{status}</h3>
              <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{columnLeads.length}</span>
            </div>
            <div className="space-y-2">
              {columnLeads.map((lead) => (
                <PipelineCard
                  key={lead.id}
                  lead={lead}
                  isDragging={dragLeadId === lead.id}
                  onDragStart={() => setDragLeadId(lead.id)}
                  onDragEnd={() => {
                    setDragLeadId(null);
                    setDragOverColumn(null);
                  }}
                  onMove={(newStatus) => onUpdate(lead.id, { status: newStatus })}
                />
              ))}
              {columnLeads.length === 0 && <p className="px-1 text-xs text-muted-foreground">No leads here.</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PipelineCard({
  lead,
  isDragging,
  onDragStart,
  onDragEnd,
  onMove,
}: {
  lead: LeadRecord;
  isDragging: boolean;
  onDragStart: () => void;
  onDragEnd: () => void;
  onMove: (status: string) => void;
}) {
  const urgency = followUpUrgency(lead.followUpDate);

  return (
    <Card
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? "opacity-40" : ""}`}
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 p-3 pb-1.5">
        <CardTitle className="flex items-center gap-1.5 text-sm">
          <GripVertical className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          {lead.firstName} {lead.lastName}
        </CardTitle>
        {(urgency === "overdue" || urgency === "today") && (
          <Badge variant={urgency === "overdue" ? "destructive" : "default"} className="shrink-0 text-[10px]">
            {urgency === "overdue" ? "Overdue" : "Due Today"}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="space-y-2 p-3 pt-0">
        <a href={`tel:${lead.phone}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground hover:underline">
          <Phone className="h-3 w-3 shrink-0" /> {lead.phone}
        </a>
        <select
          value={lead.status}
          onChange={(e) => onMove(e.target.value)}
          className="flex h-7 w-full rounded-md border border-input bg-background px-1.5 text-xs ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </CardContent>
    </Card>
  );
}
