"use client";

import { useState } from "react";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { track } from "@/lib/analytics";
import { useReveal, revealAttr } from "@/lib/useReveal";
import { reportBlock } from "@/lib/content/variant-a";
import { phone, phoneHref } from "@/lib/content/variant-a";

type SendState = "idle" | "sending" | "sent" | "pending" | "error";

/**
 * Free-guide email capture (the fliptechpro lead-magnet pattern in GT's
 * register). Delivery rides /api/report (Resend). When delivery isn't
 * configured yet the server answers 503 and the section says so honestly —
 * no fake success states, ever.
 */
export function ReportSection() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SendState>("idle");
  const { ref, inView } = useReveal<HTMLDivElement>();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.status === 503) {
        setState("pending");
        return;
      }
      if (!res.ok) {
        setState("error");
        return;
      }
      track("report_submit", { placement: "report" });
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <section
      id="guide"
      aria-label="Free family guide"
      className="border-t border-[var(--va-line)] bg-[var(--va-paper)] transition-colors duration-[550ms]"
    >
      <div ref={ref} className="mx-auto max-w-[820px] px-6 py-[96px] text-center md:px-16">
        <MonoLabel
          data-reveal={revealAttr(inView)}
          className="mb-[18px] block !text-[11px] text-sage"
        >
          {reportBlock.kicker}
        </MonoLabel>
        <h2
          data-reveal={revealAttr(inView)}
          className="font-display font-light leading-[1.08] tracking-[-0.01em] text-[var(--va-ink)]"
          style={
            {
              fontSize: "clamp(30px, 4.2vw, 44px)",
              "--reveal-delay": "120ms",
            } as React.CSSProperties
          }
        >
          {reportBlock.headline}
        </h2>
        <p
          data-reveal={revealAttr(inView)}
          className="mx-auto mt-6 max-w-[560px] text-[15.5px] leading-[1.7] text-[var(--va-muted)]"
          style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
        >
          {reportBlock.body}
        </p>

        {state === "sent" ? (
          <p className="mt-9 text-[15px] text-[var(--va-ink)]">
            {reportBlock.successNote}
          </p>
        ) : state === "pending" ? (
          <p className="mx-auto mt-9 max-w-[520px] text-[14px] leading-[1.7] text-[var(--va-muted)]">
            {reportBlock.pendingNote}{" "}
            <a className="underline decoration-[var(--va-gold)] underline-offset-4" href={phoneHref}>
              {phone}
            </a>
          </p>
        ) : (
          <form
            onSubmit={submit}
            data-reveal={revealAttr(inView)}
            style={{ "--reveal-delay": "360ms" } as React.CSSProperties}
            className="mx-auto mt-9 flex max-w-[460px] flex-col gap-3 sm:flex-row"
          >
            <label className="sr-only" htmlFor="guide-email">
              {reportBlock.emailLabel}
            </label>
            <input
              id="guide-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={reportBlock.emailPlaceholder}
              className="gt-field flex-1 rounded-[40px] border border-[var(--va-line)] bg-[var(--va-surface)] px-6 py-[13px] text-[14px] text-[var(--va-ink)] outline-none"
            />
            <button
              type="submit"
              disabled={state === "sending"}
              className="gt-label gt-press inline-flex items-center justify-center gap-[10px] rounded-[40px] border border-[var(--va-gold)] bg-[var(--va-gold)] px-7 py-[13px] !text-[11px] !tracking-[0.14em] text-[var(--va-paper)] hover:opacity-90 disabled:opacity-60"
            >
              {state === "sending" ? "Sending…" : reportBlock.submit}
            </button>
          </form>
        )}
        {state === "error" ? (
          <p className="mt-4 text-[13.5px] text-[var(--va-muted)]">
            {reportBlock.errorNote}
          </p>
        ) : null}
      </div>
    </section>
  );
}
