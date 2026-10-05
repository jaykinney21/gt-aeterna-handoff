/**
 * Lightweight conversion tracking for the A/B test. Fires to whichever
 * provider is on the page — Plausible (`window.plausible`) or a GTM/GA
 * dataLayer — and no-ops (with a dev console echo) until one is installed.
 * No vendor lock: adding the provider <script> in layout.tsx is the only step.
 */

export type GtEvent =
  | "book_call_click" // A — primary conversion
  | "portal_click" // either — client portal entry
  | "buy_click" // B — primary conversion
  | "lead_submit" // B — lead form success
  | "chat_open" // either — chat CTA
  | "chat_message" // Faith live chat — message sent
  | "chat_contact" // Faith live chat — contact captured
  | "call_click" // either — tel: link
  | "email_click" // either — mailto: link
  | "pricing_plan_click" // A-with-pricing — plan card → scheduler
  | "report_submit"; // either — free-guide email capture

type GtProps = Record<string, string | number>;

declare global {
  interface Window {
    plausible?: (event: string, opts?: { props?: GtProps }) => void;
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: GtEvent, props?: GtProps): void {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.plausible === "function") {
      window.plausible(event, props ? { props } : undefined);
    } else if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event, ...props });
    } else if (process.env.NODE_ENV !== "production") {
      console.debug("[gt-track]", event, props ?? {});
    }
  } catch {
    // Tracking must never break the page.
  }
}
