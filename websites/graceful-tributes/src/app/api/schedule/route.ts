import { NextResponse } from "next/server";

/**
 * POST /api/schedule — a call request from the site scheduler.
 *
 * Honest by construction: the request is only acknowledged when it actually
 * reaches the coordinator queue (lead-engine's inbound receiver, which never
 * drafts and never sends). With no delivery seam configured the route answers
 * 503 and the widget tells the visitor plainly to call instead — a grieving
 * visitor is never shown a confirmation that went nowhere.
 *
 * Env: LEAD_ENGINE_INBOUND_URL + LEAD_ENGINE_INBOUND_KEY (x-webhook-secret).
 */
export async function POST(req: Request) {
  let body: { email?: unknown; date?: unknown; time?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const date = typeof body.date === "string" ? body.date.slice(0, 10) : "";
  const time = typeof body.time === "string" ? body.time.slice(0, 12) : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || !date || !time) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }

  const inboundUrl = process.env.LEAD_ENGINE_INBOUND_URL;
  const inboundKey = process.env.LEAD_ENGINE_INBOUND_KEY;
  if (!inboundUrl || !inboundKey) {
    return NextResponse.json({ pending: true }, { status: 503 });
  }

  const res = await fetch(inboundUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-webhook-secret": inboundKey,
    },
    body: JSON.stringify({
      source: "graceful-tributes:schedule",
      property: "graceful-tributes",
      contact: { email },
      context: `CALL REQUEST — ${date} at ${time} (15-minute call). A coordinator confirms the time with the family; nothing is booked until they speak.`,
    }),
  }).catch(() => null);

  if (!res || !res.ok) {
    return NextResponse.json({ error: "delivery failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
