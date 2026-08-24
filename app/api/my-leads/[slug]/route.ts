import { NextResponse } from "next/server";
import { verifyAssociatePin } from "@/lib/associates";
import { getLeadsByOwner } from "@/lib/leads";
import { ensureLeadsTable } from "@/lib/db";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json();
  const pin = (body.pin || "").toString();

  if (!/^\d{4,6}$/.test(pin)) {
    return NextResponse.json({ error: "Enter your 4 to 6 digit PIN." }, { status: 400 });
  }

  const associate = await verifyAssociatePin(slug, pin);
  if (!associate) {
    return NextResponse.json({ error: "Incorrect PIN." }, { status: 401 });
  }

  await ensureLeadsTable();
  const leads = await getLeadsByOwner(associate.name);

  return NextResponse.json({ associateName: associate.name, leads });
}
