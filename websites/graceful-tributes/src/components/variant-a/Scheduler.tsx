"use client";

import { useMemo, useState } from "react";
import { GlassCard } from "@/components/shared/GlassCard";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { cn } from "@/lib/utils";
import { INTEGRATIONS } from "@/lib/site-config";
import { track } from "@/lib/analytics";
import * as A from "@/lib/content/variant-a";

/**
 * Book-a-call section: copy left, glass booking card right.
 *
 * Honest by construction (QA 2026-07-18 — the old widget showed a hardcoded
 * November, a fabricated availability count, and a fake "Booked ✓"):
 *   - days are the REAL next five days, computed at render;
 *   - no availability claims, only the true "a real person answers" line;
 *   - Confirm sends a REAL request (/api/schedule → coordinator queue) and
 *     only then says so; if scheduling delivery isn't wired, the visitor is
 *     told plainly and pointed at the phone. Nothing pretends.
 */

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

function upcomingDays(count: number) {
  const days: { d: string; n: string; iso: string }[] = [];
  const cursor = new Date();
  for (let i = 0; i < count; i++) {
    days.push({
      d: DAY_NAMES[cursor.getDay()],
      n: String(cursor.getDate()),
      iso: cursor.toISOString().slice(0, 10),
    });
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

type SendState = "idle" | "sending" | "requested" | "pending" | "error";

export function Scheduler() {
  const days = useMemo(() => upcomingDays(5), []);
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [sendState, setSendState] = useState<SendState>("idle");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
  const ready = slot !== null && emailOk;

  const buttonLabel =
    sendState === "sending"
      ? A.scheduler.states.sending
      : slot === null
        ? A.scheduler.states.idle
        : !emailOk
          ? A.scheduler.states.needsContact
          : A.scheduler.states.ready;

  async function requestCall() {
    if (!ready || sendState === "sending") return;
    track("book_call_click", { variant: "a", placement: "scheduler" });
    if (INTEGRATIONS.bookingUrl) {
      window.open(INTEGRATIONS.bookingUrl, "_blank", "noopener,noreferrer");
      return;
    }
    setSendState("sending");
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          date: days[day].iso,
          time: A.scheduler.slots[slot as number],
        }),
      });
      if (res.status === 503) {
        setSendState("pending");
        return;
      }
      setSendState(res.ok ? "requested" : "error");
    } catch {
      setSendState("error");
    }
  }

  return (
    <section
      id="scheduler"
      aria-label="Book a call"
      className="scroll-mt-20 border-b border-[var(--va-line)] bg-[var(--va-surface)] transition-colors duration-[550ms]"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 py-[84px] md:grid-cols-[0.95fr_1.05fr] md:gap-[54px] md:px-16">
        <div>
          <MonoLabel className="mb-[18px] block !text-[11px] text-[var(--va-gold)]">
            {A.scheduler.kicker}
          </MonoLabel>
          <h2
            className="font-display font-light leading-[1.04] tracking-[-0.01em] text-[var(--va-ink)]"
            style={{ fontSize: "clamp(34px, 5vw, 50px)" }}
          >
            {A.scheduler.headline}
          </h2>
          <p className="mt-5 max-w-[380px] text-[15px] leading-[1.7] text-[var(--va-muted)]">
            {A.scheduler.body}
          </p>
          <div className="mt-[26px] flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] text-[var(--va-muted)]">
            <span
              aria-hidden
              data-motion
              className="h-[7px] w-[7px] rounded-full bg-sage"
              style={{ animation: "gtPulse 2s ease-in-out infinite" }}
            />
            {A.scheduler.availability}
          </div>
        </div>

        <GlassCard className="rounded-[18px] p-[30px]">
          {sendState === "requested" || sendState === "pending" ? (
            <p
              aria-live="polite"
              className="py-8 text-center text-[14.5px] leading-[1.7] text-[var(--va-ink)]"
            >
              {sendState === "requested"
                ? A.scheduler.states.requested
                : A.scheduler.states.pending}
            </p>
          ) : (
            <>
              <MonoLabel className="mb-4 block !text-[11px] !tracking-[0.14em] text-[var(--va-muted)]">
                {A.scheduler.dayLabel}
              </MonoLabel>
              <div className="flex gap-[9px]" role="radiogroup" aria-label="Choose a day">
                {days.map((d, i) => (
                  <button
                    type="button"
                    key={d.iso}
                    role="radio"
                    onClick={() => setDay(i)}
                    aria-checked={i === day}
                    aria-label={`${d.d} ${d.n}`}
                    className={cn(
                      "flex-1 rounded-[12px] px-0 pb-[10px] pt-3 text-center transition-all duration-300 active:translate-y-[1px]",
                      i === day
                        ? "bg-[var(--va-ink)] text-[var(--va-paper)]"
                        : "bg-[var(--va-fill)] text-[var(--va-ink)] hover:bg-[var(--va-line)]",
                    )}
                    style={
                      i === day
                        ? {
                            // letterpress: the chosen day presses INTO the card
                            boxShadow:
                              "inset 0 2px 5px rgba(0,0,0,.28), 0 6px 14px -8px rgba(46,61,51,.5)",
                          }
                        : undefined
                    }
                  >
                    <span className="block font-mono text-[9.5px] tracking-[0.1em]">
                      {d.d}
                    </span>
                    <span className="mt-[3px] block font-display text-[21px]">
                      {d.n}
                    </span>
                  </button>
                ))}
              </div>

              <MonoLabel className="mb-[14px] mt-[22px] block !text-[11px] !tracking-[0.14em] text-[var(--va-muted)]">
                {A.scheduler.timeLabel}
              </MonoLabel>
              <div className="grid grid-cols-5 gap-[9px]" role="radiogroup" aria-label="Preferred time">
                {A.scheduler.slots.map((s, i) => (
                  <button
                    type="button"
                    key={s}
                    role="radio"
                    onClick={() => setSlot(i)}
                    aria-checked={i === slot}
                    className={cn(
                      "rounded-[10px] py-[11px] text-center font-mono text-[12px] transition-all duration-300 active:translate-y-[1px]",
                      i === slot
                        ? "bg-[var(--va-gold)] text-ink-deep"
                        : "border border-[var(--va-line)] bg-[var(--va-fill)] text-[var(--va-muted)] hover:border-[var(--va-gold)] hover:text-[var(--va-ink)]",
                    )}
                    style={
                      i === slot
                        ? {
                            boxShadow:
                              "inset 0 2px 4px rgba(0,0,0,.22), 0 6px 14px -8px rgba(185,142,84,.6)",
                          }
                        : undefined
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>

              {slot !== null ? (
                <div data-motion style={{ animation: "gtWordIn 0.5s ease both" }}>
                  <p
                    aria-live="polite"
                    className="mt-[16px] text-center font-mono text-[11px] tracking-[0.08em] text-[var(--va-muted)]"
                  >
                    {A.scheduler.chosenTemplate
                      .replace("{day}", days[day].d)
                      .replace("{date}", days[day].n)
                      .replace("{time}", A.scheduler.slots[slot])}
                  </p>
                  <label
                    className="gt-label mt-[18px] block !text-[10.5px] !tracking-[0.12em] text-[var(--va-muted)]"
                    htmlFor="schedule-email"
                  >
                    {A.scheduler.contactLabel}
                  </label>
                  <input
                    id="schedule-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={A.scheduler.contactPlaceholder}
                    className="gt-field mt-2 w-full rounded-[10px] border border-[var(--va-line)] bg-[var(--va-fill)] px-4 py-3 text-[14px] text-[var(--va-ink)] outline-none"
                  />
                </div>
              ) : null}

              <button
                type="button"
                onClick={requestCall}
                aria-disabled={!ready}
                className={cn(
                  "gt-label mt-[22px] w-full rounded-[13px] p-4 text-center !text-[12px] !tracking-[0.12em] transition-all duration-300",
                  ready
                    ? "bg-[var(--va-gold)] text-ink-deep hover:brightness-[1.04] active:translate-y-[1px]"
                    : "cursor-default bg-[var(--va-fill)] text-[var(--va-muted)]",
                )}
                style={
                  ready
                    ? { boxShadow: "0 14px 30px -12px rgba(185,142,84,.8)" }
                    : undefined
                }
              >
                {buttonLabel}
              </button>
              {sendState === "error" ? (
                <p className="mt-3 text-center text-[12px] text-[#96604e]">
                  {A.scheduler.states.error}
                </p>
              ) : null}
            </>
          )}
          <p className="mt-[13px] text-center font-mono text-[10.5px] tracking-[0.06em] text-[var(--va-muted)]">
            {A.scheduler.reassurance}
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
