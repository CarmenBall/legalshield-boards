import { NextResponse } from "next/server";
import { createAssociate, listAssociates } from "@/lib/associates";

export async function GET() {
  const associates = await listAssociates();
  return NextResponse.json(associates);
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.name?.trim() || !body.phone?.trim()) {
    return NextResponse.json({ error: "Name and phone are required." }, { status: 400 });
  }

  if (!/^\d{4,6}$/.test(body.pin || "")) {
    return NextResponse.json({ error: "PIN must be 4 to 6 digits." }, { status: 400 });
  }

  try {
    const associate = await createAssociate({
      name: body.name,
      phone: body.phone,
      email: body.email,
      story: body.story,
      pin: body.pin,
    });
    return NextResponse.json(associate, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
