import { NextResponse } from "next/server";
import { getPool, ensureLeadsTable } from "@/lib/db";
import { getAssociateBySlug } from "@/lib/associates";

interface VipSubmission {
  name: string;
  phone: string;
  email?: string;
  day?: string;
  language?: string;
  howFound?: string;
  slug?: string;
}

let schemaReady: Promise<void> | null = null;
async function ready() {
  if (!schemaReady) schemaReady = ensureLeadsTable();
  await schemaReady;
}

function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/);
  const firstName = parts.shift() || fullName.trim();
  const lastName = parts.join(" ");
  return { firstName, lastName };
}

export async function POST(request: Request) {
  const body = (await request.json()) as VipSubmission;

  if (!body.name?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }

  await ready();
  const { firstName, lastName } = splitName(body.name);

  let owner = "Carmen";
  let source = "VIP Form - Zoom Overview";
  if (body.slug) {
    const associate = await getAssociateBySlug(body.slug);
    if (associate) {
      owner = associate.name;
      source = `VIP Form - Zoom Overview (${associate.name}'s link)`;
    }
  }

  const noteParts: string[] = ["VIP Form submission"];
  if (body.day) noteParts.push(`Preferred day: ${body.day}`);
  if (body.language) noteParts.push(`Preferred language: ${body.language}`);
  if (body.howFound) noteParts.push(`How they found us: ${body.howFound}`);
  const notes = noteParts.join(" | ");

  const { rows } = await getPool().query(
    `INSERT INTO leads (owner, first_name, last_name, email, phone, source, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     ON CONFLICT (owner, (regexp_replace(phone, '\\D', '', 'g')))
     DO UPDATE SET notes = leads.notes || ' || ' || EXCLUDED.notes
     RETURNING *`,
    [owner, firstName, lastName, body.email || "", body.phone, source, notes]
  );

  return NextResponse.json(rows[0], { status: 201 });
}
