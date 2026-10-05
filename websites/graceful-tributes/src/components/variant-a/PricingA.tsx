"use client";

import Link from "next/link";
import { MonoLabel } from "@/components/shared/MonoLabel";
import { track } from "@/lib/analytics";
import { pricingA } from "@/lib/content/variant-a";
import { pricing as pricingB } from "@/lib/content/variant-b";
import { PLANS, type PlanId } from "@/lib/pricing";
import { cn } from "@/lib/utils";
import { useReveal } from "@/lib/useReveal";

/** Display order mirrors variant-b's packages; ids come from the canonical
 *  price table so every card lands on the same checkout the server prices. */
const PLAN_ORDER: PlanId[] = ["direct", "tribute", "full"];

/**
 * The "A with pricing" section — Variant A's room, Variant B's transparency.
 * Cards rise in one after another, lift under the pointer, and the featured
 * plan carries a slow candle-glow. Primary CTA = the checkout; the quieter
 * path ("talk it through first") keeps the scheduler one step away.
 */
export function PricingA() {
  const { ref, inView } = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id="pricing"
      aria-label="Pricing"
      className="border-b border-[var(--va-line)] bg-[var(--va-surface)] transition-colors duration-[550ms]"
    >
      <div className="mx-auto max-w-[1280px] px-6 py-[96px] md:px-16">
        <div className="mb-[46px] flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <MonoLabel className="mb-[18px] block !text-[11px] text-[var(--va-gold)]">
              {pricingA.kicker}
            </MonoLabel>
            <h2
              className="font-display font-light leading-[1.04] tracking-[-0.01em] text-[var(--va-ink)]"
              style={{ fontSize: "clamp(34px, 5vw, 50px)" }}
            >
              {pricingA.headline}
            </h2>
          </div>
          <p className="max-w-[360px] text-[14.5px] leading-[1.65] text-[var(--va-muted)]">
            {pricingA.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {pricingB.packages.map((pkg, i) => {
            const planId = PLAN_ORDER[i] ?? "direct";
            const featured = i === pricingB.defaultPkg;
            return (
              <article
                key={pkg.name}
                data-reveal={inView ? "in" : ""}
                style={
                  {
                    "--reveal-delay": `${i * 140}ms`,
                    ...(featured
                      ? {
                          boxShadow: "0 24px 54px -28px rgba(46,61,51,.5)",
                          animation: inView ? "gtGlow 6s ease-in-out 1.2s infinite" : undefined,
                        }
                      : {}),
                  } as React.CSSProperties
                }
                className={cn(
                  "group flex flex-col rounded-[18px] border bg-[var(--va-paper)] p-8 transition-all duration-500 hover:-translate-y-[6px]",
                  featured
                    ? "border-[var(--va-gold)]"
                    : "border-[var(--va-line)] hover:border-[var(--va-gold)] hover:shadow-[0_24px_54px_-30px_rgba(46,61,51,.4)]",
                )}
              >
                <h3 className="font-display text-[22px] font-light leading-[1.15] text-[var(--va-ink)]">
                  {pkg.name}
                </h3>
                <p className="mt-3 min-h-[63px] text-[13.5px] leading-[1.6] text-[var(--va-muted)]">
                  {pkg.desc}
                </p>
                <div className="mt-6 flex items-baseline gap-2 border-t border-[var(--va-line)] pt-6">
                  {pkg.from ? (
                    <span className="gt-label !text-[10.5px] !tracking-[0.12em] text-[var(--va-muted)]">
                      from
                    </span>
                  ) : null}
                  <span className="font-display text-[34px] font-light text-[var(--va-ink)] transition-transform duration-500 group-hover:scale-[1.04]" style={{ transformOrigin: "left center" }}>
                    ${pkg.price}
                  </span>
                  <span className="text-[13px] text-[var(--va-muted)]">
                    all-inclusive
                  </span>
                </div>
                <Link
                  href={`/checkout?plan=${planId}`}
                  onClick={() =>
                    track("pricing_plan_click", { variant: "ap", plan: PLANS[planId].name })
                  }
                  className={cn(
                    "gt-label gt-press mt-7 inline-flex items-center justify-center gap-[10px] rounded-[40px] border px-6 py-[13px] !text-[11px] !tracking-[0.14em]",
                    featured
                      ? "border-[var(--va-gold)] bg-[var(--va-gold)] text-[var(--va-paper)] hover:opacity-90"
                      : "border-[var(--va-line)] text-[var(--va-ink)] hover:border-[var(--va-gold)]",
                  )}
                >
                  {pricingA.cta}
                  <span aria-hidden className="gt-arrow inline-block">
                    →
                  </span>
                </Link>
                <a
                  href="#scheduler"
                  className="mt-3 text-center text-[12px] text-[var(--va-muted)] underline decoration-[var(--va-line)] underline-offset-4 transition-colors hover:text-[var(--va-ink)]"
                >
                  or talk it through first
                </a>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-[13px] leading-[1.6] text-[var(--va-muted)]">
          {pricingA.note}
        </p>
      </div>
    </section>
  );
}
