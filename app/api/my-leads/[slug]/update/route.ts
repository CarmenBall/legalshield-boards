import { NextResponse } from "next/server";
import { verifyAssociatePin } from "@/lib/associates";
import { updateLeadForOwner } from "@/lib/leads";

const TOUCH_FIELDS = ["touch_text1", "touch_text2", "touch_video_sent", "touch_text3", "touch_text4", "touch_text5"];

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await request.json();
  const pin = (body.pin || "").toString();

  if (!/^\d{4,6}$/.test(pin)) {
    return NextResponse.json({ error: "Invalid PIN." }, { status: 400 });
  }

  const associate = await verifyAssociatePin(slug, pin);
  if (!associate) {
    return NextResponse.json({ error: "Incorrect PIN." }, { status: 401 });
  }

  if (!body.leadId) {
    return NextResponse.json({ error: "Missing leadId." }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (typeof body.status === "string") updates.status = body.status;
  for (const field of TOUCH_FIELDS) {
    if (typeof body[field] === "boolean") updates[field] = body[field];
  }
  if (typeof body.noteToAppend === "string" && body.noteToAppend.trim()) {
    const dateStr = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    updates.noteToAppend = ` | [${dateStr}] ${body.noteToAppend.trim()}`;
  }
  if (body.follow_up_date === null || typeof body.follow_up_date === "string") {
    updates.follow_up_date = body.follow_up_date;
  }

  const updated = await updateLeadForOwner(body.leadId, associate.name, updates);
  if (!updated) {
    return NextResponse.json({ error: "Lead not found or nothing to update." }, { status: 404 });
  }

  return NextResponse.json(updated);
}
