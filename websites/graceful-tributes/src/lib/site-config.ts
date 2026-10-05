/**
 * Central integration config. Everything is functional today via no-backend
 * fallbacks (tel: / mailto: / in-page scroll). To activate a real integration,
 * set the matching NEXT_PUBLIC_* env (or edit the default here) and the wired
 * CTAs upgrade automatically — no code changes needed.
 *
 *   NEXT_PUBLIC_BOOKING_URL    Calendly / Cal.com scheduling link
 *   NEXT_PUBLIC_PORTAL_URL     Client-portal login URL supplied by the project owner
 *   NEXT_PUBLIC_LEAD_ENDPOINT  Form backend POST URL (Formspree, Basin, etc.)
 *   NEXT_PUBLIC_CHAT_URL       Hosted live-chat link (opens in new tab)
 *   NEXT_PUBLIC_STRIPE_DIRECT  Stripe Payment Link — Direct Cremation
 *   NEXT_PUBLIC_STRIPE_TRIBUTE Stripe Payment Link — Cremation + Tribute
 *   NEXT_PUBLIC_STRIPE_FULL    Stripe Payment Link — Full Care + AETERNA
 */

// NOTE: each env must be a LITERAL `process.env.NEXT_PUBLIC_*` expression —
// Next.js inlines those at build time; a dynamic `process.env[k]` lookup is
// never replaced and silently reads as undefined in the browser (found
// 2026-07-09 — the previous helper meant no env ever activated client-side).

export const CONTACT = {
  phone: "(805) 555-0142",
  phoneHref: "tel:+18055550142",
  email: "hello@gracefultributes.com",
} as const;

export const INTEGRATIONS = {
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || "",
  /** Configure a project-owned portal before enabling this integration. */
  portalUrl: process.env.NEXT_PUBLIC_PORTAL_URL || "",
  leadEndpoint: process.env.NEXT_PUBLIC_LEAD_ENDPOINT || "",
  chatUrl: process.env.NEXT_PUBLIC_CHAT_URL || "",
  /** Faith chat service base URL (service/faith). Empty → chat degrades to the phone path. */
  faithApi: process.env.NEXT_PUBLIC_FAITH_API || "",
  /** Indexed to the Variant B package order: 0 Direct, 1 Tribute, 2 Full. */
  stripeLinks: [
    process.env.NEXT_PUBLIC_STRIPE_DIRECT || "",
    process.env.NEXT_PUBLIC_STRIPE_TRIBUTE || "",
    process.env.NEXT_PUBLIC_STRIPE_FULL || "",
  ],
} as const;

/** Prefilled mailto — the universal fallback for any lead/contact CTA. */
export function mailtoHref(subject: string, body?: string): string {
  const qs = new URLSearchParams({ subject, ...(body ? { body } : {}) });
  return `mailto:${CONTACT.email}?${qs.toString()}`;
}

/** Where "Book a call" should point: real scheduler link, or a local fallback. */
export function bookingHref(fallback: string): string {
  return INTEGRATIONS.bookingUrl || fallback;
}

/** Client-portal entry point, kept as the seam for a future per-page override. */
export function portalHref(): string {
  return INTEGRATIONS.portalUrl;
}

/** Buy CTA target for a package index: Stripe link, or a local fallback. */
export function buyHref(pkgIndex: number, fallback: string): string {
  return INTEGRATIONS.stripeLinks[pkgIndex] || fallback;
}
