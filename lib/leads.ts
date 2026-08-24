import { getPool } from "@/lib/db";

export interface LeadRecord {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  notes: string;
  createdAt: string;
  followUpDate: string | null;
  touchText1: boolean;
  touchText2: boolean;
  touchVideoSent: boolean;
  touchText3: boolean;
  touchText4: boolean;
  touchText5: boolean;
}

interface LeadRow {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  notes: string;
  created_at: string;
  follow_up_date: string | null;
  touch_text1: boolean;
  touch_text2: boolean;
  touch_video_sent: boolean;
  touch_text3: boolean;
  touch_text4: boolean;
  touch_text5: boolean;
}

const SELECT_COLUMNS = `id, first_name, last_name, email, phone, source, status, notes, created_at,
  to_char(follow_up_date, 'YYYY-MM-DD') AS follow_up_date,
  touch_text1, touch_text2, touch_video_sent, touch_text3, touch_text4, touch_text5`;

function mapRow(r: LeadRow): LeadRecord {
  return {
    id: r.id,
    firstName: r.first_name,
    lastName: r.last_name,
    email: r.email,
    phone: r.phone,
    source: r.source,
    status: r.status,
    notes: r.notes,
    createdAt: r.created_at,
    followUpDate: r.follow_up_date,
    touchText1: r.touch_text1,
    touchText2: r.touch_text2,
    touchVideoSent: r.touch_video_sent,
    touchText3: r.touch_text3,
    touchText4: r.touch_text4,
    touchText5: r.touch_text5,
  };
}

export async function getLeadsByOwner(owner: string): Promise<LeadRecord[]> {
  const { rows } = await getPool().query<LeadRow>(
    `SELECT ${SELECT_COLUMNS} FROM leads WHERE owner = $1 ORDER BY created_at DESC`,
    [owner]
  );
  return rows.map(mapRow);
}

export interface LeadUpdateInput {
  status?: string;
  touch_text1?: boolean;
  touch_text2?: boolean;
  touch_video_sent?: boolean;
  touch_text3?: boolean;
  touch_text4?: boolean;
  touch_text5?: boolean;
  noteToAppend?: string;
  follow_up_date?: string | null;
}

const TOUCH_COLUMNS = ["touch_text1", "touch_text2", "touch_video_sent", "touch_text3", "touch_text4", "touch_text5"] as const;

export async function updateLeadForOwner(leadId: string, owner: string, updates: LeadUpdateInput): Promise<LeadRecord | null> {
  const setClauses: string[] = [];
  const values: unknown[] = [];
  let idx = 1;

  if (updates.status !== undefined) {
    setClauses.push(`status = $${idx++}`);
    values.push(updates.status);
  }
  for (const col of TOUCH_COLUMNS) {
    if (updates[col] !== undefined) {
      setClauses.push(`${col} = $${idx++}`);
      values.push(updates[col]);
    }
  }
  if (updates.noteToAppend) {
    setClauses.push(`notes = notes || $${idx++}`);
    values.push(updates.noteToAppend);
  }
  if (updates.follow_up_date !== undefined) {
    setClauses.push(`follow_up_date = $${idx++}::date`);
    values.push(updates.follow_up_date);
  }

  if (setClauses.length === 0) return null;

  values.push(leadId, owner);
  const { rows } = await getPool().query<LeadRow>(
    `UPDATE leads SET ${setClauses.join(", ")} WHERE id = $${idx++} AND owner = $${idx++} RETURNING ${SELECT_COLUMNS}`,
    values
  );
  if (rows.length === 0) return null;
  return mapRow(rows[0]);
}
