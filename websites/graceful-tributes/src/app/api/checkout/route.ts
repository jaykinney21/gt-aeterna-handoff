import { NextResponse } from "next/server";
import { PLANS, planById, urnById } from "@/lib/pricing";

/**
 * The checkout seam.
 *
 * GET  → { payments: boolean } so the client can promise truthfully.
 * POST → two honest endings:
 *   - STRIPE_SECRET_KEY set → a Stripe Checkout Session built ONLY from the
 *     server-side price table (lib/pricing.ts) — client input never sets an
 *     amount — returning { url } to the hosted secure page.
 *   - not set → the arrangement request is HELD: fanned out to lead-engine's
 *     inbound receiver (which never drafts or sends) when that seam is
 *     configured, and always answered { held: true }. No payment, no
 *     pretending.
 *
 * Env: STRIPE_SECRET_KEY · CHECKOUT_BASE_URL (default https://graceful-tributes.com)
 *      LEAD_ENGINE_INBOUND_URL / LEAD_ENGINE_INBOUND_KEY (optional fan-out)
 */

export function GET() {
  return NextResponse.json({ payments: Boolean(process.env.STRIPE_SECRET_KEY) });
}

interface CheckoutBody {
  plan?: string | null;
  urn?: string | null;
  name?: string;
  email?: string;
  phone?: string;
  for_whom?: string;
  notes?: string;
}

export async function POST(req: Request) {
  let body: CheckoutBody;
  try {
    body = (await req.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }

  const plan = planById(body.plan);
  const urn = urnById(body.urn);
  if (!plan && !urn) {
    return NextResponse.json({ error: "nothing selected" }, { status: 400 });
  }
  const email = (body.email ?? "").trim().toLowerCase();
  const name = (body.name ?? "").trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json({ error: "name and a valid email are required" }, { status: 400 });
  }

  // The Full Care plan includes the urn — the chosen finish rides as metadata,
  // never as a second charge.
  const urnIsIncluded = Boolean(urn && plan?.from);

  const secret = process.env.STRIPE_SECRET_KEY;
  if (secret) {
    const base = process.env.CHECKOUT_BASE_URL ?? "https://graceful-tributes.com";
    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("success_url", `${base}/checkout/thank-you`);
    params.set(
      "cancel_url",
      `${base}/checkout?${new URLSearchParams({
        ...(plan ? { plan: plan.id } : {}),
        ...(urn ? { urn: urn.id } : {}),
      }).toString()}`,
    );
    params.set("customer_email", email);
    let i = 0;
    const addLine = (nameStr: string, cents: number) => {
      params.set(`line_items[${i}][quantity]`, "1");
      params.set(`line_items[${i}][price_data][currency]`, "usd");
      params.set(`line_items[${i}][price_data][unit_amount]`, String(cents));
      params.set(`line_items[${i}][price_data][product_data][name]`, nameStr);
      i += 1;
    };
    if (plan) addLine(`Graceful Tributes — ${plan.name}`, plan.amountCents);
    if (urn && !urnIsIncluded) addLine(`AETERNA urn — ${urn.name}`, urn.amountCents);
    params.set("metadata[plan]", plan?.id ?? "");
    params.set("metadata[urn]", urn?.id ?? "");
    params.set("metadata[for_whom]", (body.for_whom ?? "").slice(0, 200));
    params.set("metadata[phone]", (body.phone ?? "").slice(0, 40));
    params.set("metadata[notes]", (body.notes ?? "").slice(0, 400));

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "payment session failed" }, { status: 502 });
    }
    const session = (await res.json()) as { url?: string };
    if (!session.url) {
      return NextResponse.json({ error: "payment session failed" }, { status: 502 });
    }
    return NextResponse.json({ url: session.url });
  }

  // ── Held path: no payment configured — a coordinator takes it from here ──
  const inboundUrl = process.env.LEAD_ENGINE_INBOUND_URL;
  const inboundKey = process.env.LEAD_ENGINE_INBOUND_KEY;
  if (inboundUrl && inboundKey) {
    const chosen = [
      plan ? `${plan.name} (${PLANS[plan.id].amountCents / 100} USD)` : null,
      urn ? `AETERNA urn: ${urn.name}${urnIsIncluded ? " (included)" : ` (${urn.amountCents / 100} USD)`}` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    await fetch(inboundUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-secret": inboundKey,
      },
      body: JSON.stringify({
        source: "graceful-tributes:checkout",
        property: "graceful-tributes",
        contact: { email, name },
        context: [
          `ARRANGEMENT REQUEST — ${chosen}`,
          body.phone ? `Phone: ${body.phone}` : null,
          body.for_whom ? `For: ${body.for_whom}` : null,
          body.notes ? `Notes: ${body.notes}` : null,
          "No payment taken; coordinator confirms then collects securely.",
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    }).catch(() => {
      // Best-effort — the request is still acknowledged honestly below and
      // surfaces via the operator's normal channels.
    });
  }

  return NextResponse.json({ held: true });
}
