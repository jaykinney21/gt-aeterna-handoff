"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { track } from "@/lib/analytics";
import { INTEGRATIONS } from "@/lib/site-config";
import { faith } from "@/lib/content/faith";

/**
 * Faith — the live care-guide chat. Porter's architecture (SSE streaming,
 * server-enforced guardrails, contact capture) ported onto the Graceful
 * Tributes design system and Faith's register. Themed against the `--va-*`
 * vars so it is light/dark correct inside Variant A.
 *
 * The brain is the external Faith service (static export has no API routes):
 * `NEXT_PUBLIC_FAITH_API` → service/faith. Every failure path degrades to
 * the human path — the phone line is the one thing that must never break.
 */

type ChatMessage = { role: "user" | "assistant"; content: string };

type DoneMeta = {
  crisis?: boolean;
  cap?: boolean;
  contactGate?: boolean;
};

const F = faith.chat;

export function FaithChat({
  variant = "a",
  className,
}: {
  variant?: "a" | "b";
  className?: string;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: F.intro },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [gateOpen, setGateOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contact, setContact] = useState<{ email?: string; phone?: string } | null>(null);
  const [contactSaved, setContactSaved] = useState(false);
  const [contactError, setContactError] = useState("");
  const [capped, setCapped] = useState(false);
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, streaming, gateOpen]);

  async function streamAnswer(
    convo: ChatMessage[],
    contactArg?: { email?: string; phone?: string },
  ) {
    const api = INTEGRATIONS.faithApi;
    if (!api) {
      // Keep the visitor's words on screen even when the service URL is not
      // configured — a vanished message reads as a broken page.
      setMessages(convo);
      setError(F.error);
      return;
    }
    setStreaming(true);
    setError("");
    setMessages([...convo, { role: "assistant", content: "" }]);

    // The canned intro (index 0) stays out of the model context.
    const apiMessages = convo.slice(1).map((m) => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch(`${api.replace(/\/$/, "")}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          contact: contactArg ?? contact ?? undefined,
          variant,
        }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}) as { error?: string });
        throw new Error(data.error || F.error);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let assembled = "";
      let meta: DoneMeta = {};

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split("\n\n");
        buffer = parts.pop() ?? "";
        for (const part of parts) {
          const line = part.trim();
          if (!line.startsWith("data:")) continue;
          const payload = line.slice(5).trim();
          if (payload === "[DONE]") continue;
          try {
            const evt = JSON.parse(payload) as {
              delta?: string;
              done?: boolean;
              error?: string;
            } & DoneMeta;
            if (evt.delta) {
              assembled += evt.delta;
              setMessages((prev) => {
                const copy = [...prev];
                copy[copy.length - 1] = { role: "assistant", content: assembled };
                return copy;
              });
            }
            if (evt.done) meta = evt;
            if (evt.error) setError(String(evt.error));
          } catch {
            // keep-alive / malformed frames
          }
        }
      }

      if (meta.contactGate && !contactSaved) setGateOpen(true);
      if (meta.cap) setCapped(true);
    } catch (err) {
      setError((err as Error).message || F.error);
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[copy.length - 1];
        if (last?.role === "assistant" && !last.content) copy.pop();
        return copy;
      });
    } finally {
      setStreaming(false);
    }
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming || capped) return;
    setInput("");
    if (!opened) {
      setOpened(true);
      track("chat_open", { variant, placement: "faith" });
    }
    track("chat_message", { variant, placement: "faith" });
    void streamAnswer([...messages, { role: "user", content: trimmed }]);
  }

  function saveContact(e: FormEvent) {
    e.preventDefault();
    const em = email.trim();
    const ph = phone.trim();
    const emailOk = em.includes("@") && em.length >= 5;
    const phoneOk = ph.replace(/\D/g, "").length >= 7;
    if (!emailOk && !phoneOk) {
      setContactError(F.contact.invalid);
      return;
    }
    setContactError("");
    const c = {
      ...(emailOk ? { email: em } : {}),
      ...(phoneOk ? { phone: ph } : {}),
    };
    setContact(c);
    setContactSaved(true);
    setGateOpen(false);
    track("chat_contact", { variant, placement: "faith" });
    if (capped) {
      // After the cap there is nothing to re-answer — just deliver the
      // contact to the service (it fans out the final transcript) without
      // appending a duplicate cap message to the transcript.
      const api = INTEGRATIONS.faithApi;
      if (api) {
        void fetch(`${api.replace(/\/$/, "")}/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: messages.slice(1).map((m) => ({ role: m.role, content: m.content })),
            contact: c,
            variant,
          }),
        }).catch(() => {});
      }
      return;
    }
    // Re-answer the turn the gate interrupted, now that contact exists.
    const base =
      messages[messages.length - 1]?.role === "assistant"
        ? messages.slice(0, -1)
        : messages;
    void streamAnswer(base, c);
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div
        className="overflow-hidden rounded-[20px] border border-[var(--va-line)] bg-[var(--va-paper)]"
        style={{ boxShadow: "0 30px 70px -30px rgba(46,61,51,.55)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-[var(--va-line)] bg-[var(--va-surface)] px-[22px] py-[18px]">
          <span
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(150deg,#8FA08E,#6E8C96)" }}
          >
            <span className="font-display text-[17px] italic text-white">{F.avatar}</span>
          </span>
          <div>
            <div className="text-[14px] font-semibold text-[var(--va-ink)]">{F.name}</div>
            <div className="gt-label !text-[9.5px] !tracking-[0.1em] text-[var(--va-muted)]">
              {F.status}
            </div>
          </div>
          <span
            data-motion
            className="ml-auto h-2 w-2 rounded-full bg-sage"
            style={{ animation: "gtPulse 2s ease-in-out infinite" }}
          />
        </div>

        {/* Transcript */}
        <div
          ref={scrollRef}
          className="flex max-h-[420px] min-h-[280px] flex-col gap-[14px] overflow-y-auto px-[22px] py-6"
          aria-live="polite"
        >
          {messages.map((m, i) =>
            m.role === "assistant" ? (
              <div
                key={i}
                className="max-w-[84%] self-start whitespace-pre-wrap rounded-[16px_16px_16px_4px] bg-[var(--va-surface)] px-[17px] py-[13px] text-[14px] leading-[1.5] text-[var(--va-ink)]"
              >
                {m.content || <TypingDots />}
              </div>
            ) : (
              <div
                key={i}
                className="max-w-[82%] self-end whitespace-pre-wrap rounded-[16px_16px_4px_16px] bg-[var(--va-ink)] px-[17px] py-[13px] text-[14px] leading-[1.5] text-[var(--va-paper)]"
              >
                {m.content}
              </div>
            ),
          )}
        </div>

        {/* Preset openings */}
        {messages.length <= 1 && !capped && (
          <div className="flex flex-wrap gap-2 px-[22px] pb-4">
            {F.presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => send(p)}
                disabled={streaming}
                className="rounded-full border border-[var(--va-line)] bg-[var(--va-paper)] px-3.5 py-1.5 text-left text-[12.5px] leading-snug text-[var(--va-ink)] transition-colors hover:border-[var(--va-gold)] disabled:opacity-50"
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Contact (gate or after cap) */}
        {(gateOpen || (capped && !contactSaved)) && (
          <form
            onSubmit={saveContact}
            className="flex flex-col gap-2 border-t border-[var(--va-line)] bg-[var(--va-surface)] px-[18px] py-[14px]"
          >
            <p className="text-[12.5px] text-[var(--va-muted)]">{F.contact.lead}</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={F.contact.emailPlaceholder}
                aria-label={F.contact.emailPlaceholder}
                className="w-full rounded-[30px] border border-[var(--va-line)] bg-[var(--va-paper)] px-4 py-2 text-[13px] text-[var(--va-ink)] outline-none placeholder:text-[var(--va-muted)] focus-visible:border-[var(--va-gold)]"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={F.contact.phonePlaceholder}
                aria-label={F.contact.phonePlaceholder}
                className="w-full rounded-[30px] border border-[var(--va-line)] bg-[var(--va-paper)] px-4 py-2 text-[13px] text-[var(--va-ink)] outline-none placeholder:text-[var(--va-muted)] focus-visible:border-[var(--va-gold)]"
              />
              <button
                type="submit"
                disabled={streaming}
                className="gt-label shrink-0 cursor-pointer rounded-[30px] bg-[var(--va-gold)] px-[18px] py-[10px] !tracking-[0.1em] text-ink-deep disabled:opacity-60"
              >
                {F.contact.submit}
              </button>
            </div>
            {contactError && (
              <p className="text-[12px] text-[var(--va-muted)]">{contactError}</p>
            )}
          </form>
        )}
        {contactSaved && (
          <p className="border-t border-[var(--va-line)] px-[22px] py-2.5 text-[12px] text-[var(--va-muted)]">
            {F.contact.saved}
          </p>
        )}

        {/* Composer */}
        {!capped ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-[10px] border-t border-[var(--va-line)] px-[18px] py-[14px]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={F.placeholder}
              aria-label={F.placeholder}
              disabled={streaming}
              autoComplete="off"
              className="w-full flex-1 rounded-[30px] border border-[var(--va-line)] bg-[var(--va-paper)] px-4 py-2.5 text-[13.5px] text-[var(--va-ink)] outline-none placeholder:text-[var(--va-muted)] focus-visible:border-[var(--va-gold)] disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={streaming || !input.trim()}
              className="gt-label inline-flex shrink-0 cursor-pointer items-center rounded-[30px] bg-[var(--va-gold)] px-[18px] py-[10px] !tracking-[0.1em] text-ink-deep disabled:opacity-50"
            >
              {streaming ? "…" : F.send}
            </button>
          </form>
        ) : (
          <div className="border-t border-[var(--va-line)] px-[22px] py-[14px]">
            <p className="gt-label !text-[10px] !tracking-[0.1em] text-[var(--va-muted)]">
              {F.capped}
            </p>
          </div>
        )}

        {error && (
          <p className="border-t border-[var(--va-line)] px-[22px] py-2.5 text-[12.5px] text-[var(--va-muted)]">
            {error}
          </p>
        )}
      </div>

      {/* The human path — always visible, never gated. */}
      <p className="mt-3 px-1 text-[12.5px] text-[var(--va-muted)]">
        <a href={F.humanHref} className="underline decoration-[var(--va-gold)] underline-offset-2">
          {F.humanLine}
        </a>
      </p>
      <p className="mt-1.5 px-1 font-mono text-[10px] leading-relaxed tracking-[0.02em] text-[var(--va-muted)] opacity-80">
        {F.consent}
      </p>
    </div>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-1" aria-label="Faith is typing">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          data-motion
          className="h-1.5 w-1.5 rounded-full bg-sage"
          style={{ animation: `gtFloat 1s ease-in-out ${i * 0.12}s infinite` }}
        />
      ))}
    </span>
  );
}
