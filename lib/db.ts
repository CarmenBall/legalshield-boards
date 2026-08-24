import { Pool } from "pg";

let pool: Pool | undefined;

export function getPool(): Pool {
  if (!pool) {
    pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  }
  return pool;
}

export async function ensureLeadsTable() {
  const p = getPool();
  await p.query(`
    CREATE TABLE IF NOT EXISTS leads (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      owner TEXT NOT NULL,
      first_name TEXT NOT NULL,
      last_name TEXT DEFAULT '',
      email TEXT DEFAULT '',
      phone TEXT NOT NULL,
      city TEXT DEFAULT '',
      state TEXT DEFAULT '',
      source TEXT DEFAULT '',
      purchased_date DATE NOT NULL DEFAULT CURRENT_DATE,
      time_available TEXT DEFAULT '',
      investment TEXT DEFAULT '',
      best_time_to_call TEXT DEFAULT '',
      touch_text1 BOOLEAN DEFAULT FALSE,
      touch_text2 BOOLEAN DEFAULT FALSE,
      touch_video_sent BOOLEAN DEFAULT FALSE,
      touch_text3 BOOLEAN DEFAULT FALSE,
      touch_text4 BOOLEAN DEFAULT FALSE,
      touch_text5 BOOLEAN DEFAULT FALSE,
      status TEXT NOT NULL DEFAULT 'Not Started',
      last_reply TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
    CREATE UNIQUE INDEX IF NOT EXISTS leads_owner_phone_idx ON leads (owner, regexp_replace(phone, '\\D', '', 'g'));
    ALTER TABLE leads ADD COLUMN IF NOT EXISTS follow_up_date DATE;
  `);
}
