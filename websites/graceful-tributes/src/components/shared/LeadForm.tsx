"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CONTACT, INTEGRATIONS, mailtoHref } from "@/lib/site-config";
import { track } from "@/lib/analytics";

type Tone = "va" | "light";

interface LeadFormProps {
  /** Used in the mailto subject + lead payload so you know which CTA fired. */
  context?: string;
  submitLabel?: string;
  tone?: Tone;
  className?: string;
  /** Optional message-box; some placements only need name + contact. */
  withMessage?: boolean;
}

/**
 * Working lead-capture form. Posts to NEXT_PUBLIC_LEAD_ENDPOINT when set,
 * otherwise opens a prefilled email (mailto) — so it captures a lead today
 * with zero backend. Validates name + (email or phone) and confirms inline.
 */
export function LeadForm({
  context = "Website enquiry",
  submitLabel = "Send",
  tone = "light",
  className,
  withMessage = true,
}: LeadFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const va = tone === "va";
  const muted = va ? "text-[var(--va-muted)]" : "text-ink/60";
  const field = cn(
    "w-full rounded-xl border px-4 py-3 text-[14px] outline-none transition-colors",
    va
      ? "border-[var(--va-line)] bg-[var(--va-paper)] text-[var(--va-ink)] placeholder:text-[var(--va-muted)] focus:border-[var(--va-gold)]"
      : "border-ink/15 bg-white text-ink placeholder:text-ink/40 focus:border-gold",
  );

  async function submit() {
    if (!name.trim()) return setError("Please share your name.");
    if (!email.trim() && !phone.trim())
      return setError("Add an email or phone and we'll reach out.");
    setError(null);
    setBusy(true);

    const payload = { context, name, email, phone, message };
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;

    track("lead_submit", { context });
    try {
      if (INTEGRATIONS.leadEndpoint) {
        await fetch(INTEGRATIONS.leadEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // No backend configured yet — open a prefilled email instead.
        window.location.href = mailtoHref(`${context} — ${name}`, body);
      }
      setDone(true);
    } catch {
      window.location.href = mailtoHref(`${context} — ${name}`, body);
      setDone(true);
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div
        className={cn(
          "rounded-2xl border p-7 text-center",
          va ? "border-[var(--va-line)] bg-[var(--va-surface)]" : "border-ink/12 bg-surface",
          className,
        )}
        role="status"
      >
        <div className={cn("mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full", va ? "bg-[var(--va-gold)]/20 text-[var(--va-gold)]" : "bg-gold/15 text-gold")}>
          ✓
        </div>
        <p className={cn("font-display text-[22px]", va ? "text-[var(--va-ink)]" : "text-ink")}>
          Thank you — we&apos;ll be in touch shortly.
        </p>
        <p className={cn("mt-2 text-[13px]", muted)}>
          Prefer to talk now? Call{" "}
          <a href={CONTACT.phoneHref} className="underline">
            {CONTACT.phone}
          </a>
          , day or night.
        </p>
      </div>
    );
  }

  return (
    <div role="group" aria-label={context} className={cn("flex flex-col gap-3", className)}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          aria-label="Your name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          className={field}
        />
        <input
          aria-label="Phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          inputMode="tel"
          className={field}
        />
      </div>
      <input
        aria-label="Email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="email"
        inputMode="email"
        className={field}
      />
      {withMessage && (
        <textarea
          aria-label="How can we help?"
          placeholder="How can we help?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          className={cn(field, "resize-none")}
        />
      )}
      {error && (
        <p role="alert" className={cn("text-[13px]", va ? "text-[var(--va-gold)]" : "text-gold")}>
          {error}
        </p>
      )}
      <button
        type="button"
        onClick={submit}
        disabled={busy}
        className={cn(
          "gt-label mt-1 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 !tracking-[0.12em] text-ink-deep transition-all disabled:opacity-60",
          va ? "bg-[var(--va-gold)]" : "bg-gold",
        )}
      >
        {busy ? "Sending…" : submitLabel}
      </button>
      <p className={cn("text-[12px]", muted)}>A real person reads every message.</p>
    </div>
  );
}
