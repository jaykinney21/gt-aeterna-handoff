import { NextResponse } from "next/server";

/**
 * POST /api/report — deliver the free family guide by email via Resend.
 *
 * Honest-pending by design: with no RESEND_API_KEY (or no guide URL) the
 * route answers 503 and the client tells the visitor the guide isn't ready —
 * it never pretends to have sent something it didn't.
 *
 * Env (all optional until launch):
 *   RESEND_API_KEY        — Resend secret (server-only)
 *   REPORT_FROM_EMAIL     — verified sender, e.g. "Graceful Tributes <care@graceful-tributes.com>"
 *   REPORT_GUIDE_URL      — where the finished guide lives (PDF/page)
 *   LEAD_ENGINE_INBOUND_URL / LEAD_ENGINE_INBOUND_KEY — optional lead fan-out
 *     (same receiver Faith's service uses; receiver never drafts or sends)
 */
export async function POST(req: Request) {
  let email: string;
  try {
    const body = (await req.json()) as { email?: unknown };
    email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.REPORT_FROM_EMAIL;
  const guideUrl = process.env.REPORT_GUIDE_URL;
  if (!apiKey || !from || !guideUrl) {
    // Delivery not wired yet — the client renders the honest pending note.
    return NextResponse.json({ pending: true }, { status: 503 });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [email],
      subject: "The guide you asked for — Graceful Tributes",
      text: [
        "Hello,",
        "",
        "Here is the guide you asked for — the questions families wish they'd asked, in plain language:",
        guideUrl,
        "",
        "Take your time with it. If it raises anything you'd like to talk through, a real person answers whenever you're ready.",
        "",
        "— Graceful Tributes",
      ].join("\n"),
    }),
  });
  if (!res.ok) {
    return NextResponse.json({ error: "delivery failed" }, { status: 502 });
  }

  // Optional, best-effort lead fan-out to lead-engine's inbound receiver
  // (structurally read-only on the receiving side: it never drafts or sends).
  const inboundUrl = process.env.LEAD_ENGINE_INBOUND_URL;
  const inboundKey = process.env.LEAD_ENGINE_INBOUND_KEY;
  if (inboundUrl && inboundKey) {
    fetch(inboundUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": inboundKey,
      },
      body: JSON.stringify({
        source: "graceful-tributes:report",
        property: "graceful-tributes",
        contact: { email },
        context: "Requested the family guide (site report section)",
      }),
    }).catch(() => {
      // Best-effort only — guide delivery already succeeded.
    });
  }

  return NextResponse.json({ ok: true });
}
