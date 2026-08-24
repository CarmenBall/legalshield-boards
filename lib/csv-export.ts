import { LeadRecord } from "@/lib/leads";

const HEADERS = [
  "First Name",
  "Last Name",
  "Phone",
  "Email",
  "Status",
  "Source",
  "Follow-Up Date",
  "Text 1",
  "Text 2",
  "Video Sent",
  "Text 3",
  "Text 4",
  "Text 5",
  "Notes",
  "Created At",
];

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes("\n") || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function boolToYesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

export function leadsToCsv(leads: LeadRecord[]): string {
  const rows = leads.map((lead) =>
    [
      lead.firstName,
      lead.lastName,
      lead.phone,
      lead.email,
      lead.status,
      lead.source,
      lead.followUpDate || "",
      boolToYesNo(lead.touchText1),
      boolToYesNo(lead.touchText2),
      boolToYesNo(lead.touchVideoSent),
      boolToYesNo(lead.touchText3),
      boolToYesNo(lead.touchText4),
      boolToYesNo(lead.touchText5),
      lead.notes,
      lead.createdAt,
    ]
      .map((field) => escapeCsvField(String(field ?? "")))
      .join(",")
  );
  return [HEADERS.join(","), ...rows].join("\n");
}

export function downloadLeadsCsv(leads: LeadRecord[], filenamePrefix = "my-leads") {
  const csv = leadsToCsv(leads);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStr = new Date().toISOString().slice(0, 10);
  link.href = url;
  link.download = `${filenamePrefix}-${dateStr}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
