import { createHash, randomBytes } from "crypto";
import { getPool } from "@/lib/db";

export interface Associate {
  slug: string;
  name: string;
  phone: string;
  email: string;
  story: string;
  createdAt: string;
}

let ready: Promise<void> | null = null;
async function ensureAssociatesTable() {
  if (!ready) {
    ready = getPool()
      .query(
        `
        CREATE TABLE IF NOT EXISTS associates (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          slug TEXT UNIQUE NOT NULL,
          name TEXT NOT NULL,
          phone TEXT DEFAULT '',
          email TEXT DEFAULT '',
          story TEXT DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        CREATE EXTENSION IF NOT EXISTS pgcrypto;
        ALTER TABLE associates ADD COLUMN IF NOT EXISTS pin_hash TEXT DEFAULT '';
        ALTER TABLE associates ADD COLUMN IF NOT EXISTS pin_salt TEXT DEFAULT '';
      `
      )
      .then(() => undefined);
  }
  await ready;
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-") || "associate"
  );
}

function hashPin(pin: string, salt: string): string {
  return createHash("sha256").update(`${salt}:${pin}`).digest("hex");
}

interface AssociateRow {
  slug: string;
  name: string;
  phone: string;
  email: string;
  story: string;
  created_at: string;
}

interface AssociateRowWithPin extends AssociateRow {
  pin_hash: string;
  pin_salt: string;
}

function mapRow(row: AssociateRow): Associate {
  return {
    slug: row.slug,
    name: row.name,
    phone: row.phone,
    email: row.email,
    story: row.story,
    createdAt: row.created_at,
  };
}

export async function createAssociate(input: {
  name: string;
  phone: string;
  email?: string;
  story?: string;
  pin: string;
}): Promise<Associate> {
  if (!/^\d{4,6}$/.test(input.pin)) {
    throw new Error("PIN must be 4 to 6 digits.");
  }

  await ensureAssociatesTable();
  const pool = getPool();
  const base = slugify(input.name);
  let slug = base;
  let attempt = 1;
  while (true) {
    const existing = await pool.query("SELECT 1 FROM associates WHERE slug = $1", [slug]);
    if (existing.rowCount === 0) break;
    attempt += 1;
    slug = `${base}-${attempt}`;
  }

  const salt = randomBytes(8).toString("hex");
  const pinHash = hashPin(input.pin, salt);

  const { rows } = await pool.query<AssociateRow>(
    `INSERT INTO associates (slug, name, phone, email, story, pin_hash, pin_salt)
     VALUES ($1,$2,$3,$4,$5,$6,$7)
     RETURNING slug, name, phone, email, story, created_at`,
    [slug, input.name.trim(), input.phone?.trim() || "", input.email?.trim() || "", input.story?.trim() || "", pinHash, salt]
  );
  return mapRow(rows[0]);
}

export async function getAssociateBySlug(slug: string): Promise<Associate | null> {
  await ensureAssociatesTable();
  const { rows } = await getPool().query<AssociateRow>(
    `SELECT slug, name, phone, email, story, created_at FROM associates WHERE slug = $1`,
    [slug]
  );
  if (rows.length === 0) return null;
  return mapRow(rows[0]);
}

export async function verifyAssociatePin(slug: string, pin: string): Promise<Associate | null> {
  await ensureAssociatesTable();
  const { rows } = await getPool().query<AssociateRowWithPin>(
    `SELECT slug, name, phone, email, story, created_at, pin_hash, pin_salt FROM associates WHERE slug = $1`,
    [slug]
  );
  if (rows.length === 0) return null;
  const row = rows[0];
  if (!row.pin_hash || !row.pin_salt) return null;
  if (hashPin(pin, row.pin_salt) !== row.pin_hash) return null;
  return mapRow(row);
}

export async function listAssociates(): Promise<Associate[]> {
  await ensureAssociatesTable();
  const { rows } = await getPool().query<AssociateRow>(
    `SELECT slug, name, phone, email, story, created_at FROM associates ORDER BY created_at DESC`
  );
  return rows.map(mapRow);
}
