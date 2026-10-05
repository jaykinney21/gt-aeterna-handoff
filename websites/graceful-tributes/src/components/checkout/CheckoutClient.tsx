"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { UrnSculpture } from "@/components/shared/UrnSculpture";
import { track } from "@/lib/analytics";
import { phone as gtPhone, phoneHref } from "@/lib/content/variant-a";
import { checkout as C } from "@/lib/content/checkout";
import { formatUsd, type Plan, type Urn } from "@/lib/pricing";

type State = "idle" | "sending" | "held" | "error";

/**
 * The arrangement page — one calm column: what you chose, who you are, one
 * button. Two honest endings:
 *   - Stripe configured → the server returns a secure payment URL and we go.
 *   - Not configured    → the request is HELD; a coordinator confirms first.
 * The copy tells the visitor which ending they're in before they commit.
 */
export function CheckoutClient({
  plan,
  urn,
}: {
  plan: Plan | null;
  urn: Urn | null;
}) {
  const [state, setState] = useState<State>("idle");
  const [payMode, setPayMode] = useState<boolean | null>(null); // null until probed
  // The Full Care plan already includes an urn — choosing a finish is free
  // with it; standalone or with other plans the urn is its own line.
  const urnCents = urn && !plan?.from ? urn.amountCents : 0;
  const total = (plan?.amountCents ?? 0) + urnCents;
  const nothingChosen = !plan && !urn;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plan: plan?.id ?? null,
          urn: urn?.id ?? null,
          ...data,
        }),
      });
      const body = (await res.json()) as {
        url?: string;
        held?: boolean;
        error?: string;
      };
      if (res.ok && body.url) {
        track("buy_click", { variant: "checkout", placement: "pay", pkg: plan?.id ?? urn?.id ?? "" });
        window.location.href = body.url;
        return;
      }
      if (res.ok && body.held) {
        track("lead_submit", { variant: "checkout", placement: "hold" });
        setState("held");
        return;
      }
      setState("error");
    } catch {
      setState("error");
    }
  }

  if (nothingChosen) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e7] px-6 text-[#2e3d33]">
        <div className="text-center">
          <p className="text-[15px] opacity-75">Choose a plan or an urn first.</p>
          <Link href="/ap" className="gt-label mt-6 inline-block underline underline-offset-4">
            {C.backToPlans}
          </Link>
        </div>
      </main>
    );
  }

  if (state === "held") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f1e7] px-6 text-[#2e3d33]">
        <div className="max-w-[540px] text-center">
          <MonoLabel className="mb-4 block !text-[11px] !tracking-[0.24em] text-sage">
            {C.kicker}
          </MonoLabel>
          <h1 className="font-display font-light" style={{ fontSize: "clamp(32px,4.6vw,46px)" }}>
            {C.heldTitle}
          </h1>
          <p className="mt-5 text-[15.5px] leading-[1.7] opacity-75">{C.heldBody}</p>
          <a href={phoneHref} className="gt-label mt-8 inline-block underline decoration-[#b98e54] underline-offset-4">
            {gtPhone}
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f1e7] px-6 py-[64px] text-[#2e3d33]">
      <div className="mx-auto grid max-w-[980px] gap-12 lg:grid-cols-[1fr_380px]">
        <div>
          <Link href={plan ? "/ap" : "/urns"} className="gt-label !text-[11px] !tracking-[0.14em] opacity-60 hover:opacity-100">
            {C.backToPlans}
          </Link>
          <MonoLabel className="mb-4 mt-8 block !text-[11px] !tracking-[0.24em] text-sage">
            {C.kicker}
          </MonoLabel>
          <h1 className="font-display font-light leading-[1.08]" style={{ fontSize: "clamp(32px,4.6vw,46px)" }}>
            {C.headline}
          </h1>
          <p className="mt-4 max-w-[480px] text-[14.5px] leading-[1.7] opacity-70">
            {C.sub}{" "}
            <a href={phoneHref} className="underline decoration-[#b98e54] underline-offset-4">
              {gtPhone}
            </a>
          </p>

          <form onSubmit={submit} className="mt-9 space-y-4">
            {(
              [
                ["name", C.form.name, "text", true, ""],
                ["email", C.form.email, "email", true, ""],
                ["phone", C.form.phone, "tel", true, ""],
                ["for_whom", C.form.forWhom, "text", false, C.form.forWhomPlaceholder],
              ] as const
            ).map(([id, label, type, required, ph]) => (
              <div key={id}>
                <label htmlFor={id} className="gt-label block !text-[10.5px] !tracking-[0.12em] opacity-70">
                  {label}
                </label>
                <input
                  className="gt-field mt-2 w-full rounded-[12px] border border-[#d9cfba] bg-white/70 px-4 py-3 text-[15px] outline-none"
                  id={id}
                  name={id}
                  placeholder={ph}
                  required={required}
                  type={type}
                />
              </div>
            ))}
            <div>
              <label htmlFor="notes" className="gt-label block !text-[10.5px] !tracking-[0.12em] opacity-70">
                {C.form.notes}
              </label>
              <textarea
                className="gt-field mt-2 w-full rounded-[12px] border border-[#d9cfba] bg-white/70 px-4 py-3 text-[15px] outline-none"
                id="notes"
                name="notes"
                placeholder={C.form.notesPlaceholder}
                rows={3}
              />
            </div>

            <button
              className="gt-label gt-press mt-2 w-full rounded-[40px] border border-[#b98e54] bg-[#b98e54] px-7 py-[15px] !text-[11.5px] !tracking-[0.14em] text-[#f6f1e7] hover:opacity-90 disabled:opacity-60"
              disabled={state === "sending"}
              type="submit"
            >
              {state === "sending"
                ? "One moment…"
                : payMode
                  ? C.payCta
                  : C.holdCta}
            </button>
            <p className="text-center text-[12.5px] leading-[1.6] opacity-60">
              {payMode ? C.payNote : C.holdNote}
            </p>
            {state === "error" ? (
              <p className="text-center text-[13px] text-[#96604e]">{C.errorNote}</p>
            ) : null}
          </form>
        </div>

        <aside
          data-motion
          className="h-fit rounded-[18px] border border-[#d9cfba] bg-white/60 p-7"
          style={{
            boxShadow: "0 24px 54px -30px rgba(46,61,51,.4)",
            // A soft candle-warm wash greets the choice you arrived with,
            // then fades for good. Stilled under reduced motion.
            animation: "gtSummaryIn 1.8s ease-out 0.4s both",
          }}
        >
          <p className="gt-label !text-[10.5px] !tracking-[0.14em] opacity-70">{C.summaryTitle}</p>
          {plan ? (
            <div className="mt-5">
              <p className="font-display text-[20px] font-light">{plan.name}</p>
              <p className="mt-1 text-[13px] leading-[1.55] opacity-65">{plan.desc}</p>
              <p className="mt-2 font-display text-[22px] font-light">
                {plan.from ? "from " : ""}
                {formatUsd(plan.amountCents)}
              </p>
            </div>
          ) : null}
          {urn ? (
            <div className="mt-6 flex items-center gap-4 border-t border-[#e4dbc7] pt-6">
              <div className="scale-[0.34] origin-top-left" style={{ width: 62, height: 92 }}>
                <UrnSculpture compact turning={false} palette={urn.palette} />
              </div>
              <div>
                <p className="gt-label !text-[9.5px] !tracking-[0.12em] opacity-60">{C.urnLabel}</p>
                <p className="font-display text-[18px] font-light">{urn.name}</p>
                <p className="font-display text-[16px] opacity-80">
                  {plan?.from ? "included" : formatUsd(urn.amountCents)}
                </p>
              </div>
            </div>
          ) : null}
          <div className="mt-6 border-t border-[#e4dbc7] pt-6">
            <p className="gt-label !text-[10.5px] !tracking-[0.14em] opacity-70">{C.totalLabel}</p>
            <p className="mt-1 font-display text-[30px] font-light">{formatUsd(total)}</p>
            <p className="mt-2 text-[12px] leading-[1.6] opacity-60">{C.totalNote}</p>
          </div>
          <PayModeProbe onKnown={setPayMode} />
        </aside>
      </div>
    </main>
  );
}

/** Asks the server once whether secure payment is configured so the button
 *  and its promise are truthful BEFORE the visitor commits. */
function PayModeProbe({ onKnown }: { onKnown: (pay: boolean) => void }) {
  useEffect(() => {
    let alive = true;
    void fetch("/api/checkout")
      .then((r) => r.json())
      .then((b: { payments?: boolean }) => {
        if (alive) onKnown(Boolean(b.payments));
      })
      .catch(() => {
        if (alive) onKnown(false);
      });
    return () => {
      alive = false;
    };
  }, [onKnown]);
  return null;
}
