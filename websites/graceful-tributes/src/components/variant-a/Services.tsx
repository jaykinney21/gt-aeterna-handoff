"use client";

import { MonoLabel } from "@/components/shared/MonoLabel";
import { cn } from "@/lib/utils";
import { mailtoHref } from "@/lib/site-config";
import { useReveal, revealAttr } from "@/lib/useReveal";
import * as A from "@/lib/content/variant-a";

/** Per-card destination keyed by the card number. */
const CARD_HREFS: Record<string, string> = {
  "01": "#scheduler",
  "02": mailtoHref("Celebration-of-Life tribute enquiry"),
  "03": "#urns",
};

/**
 * "How we help" — three service cards. Cards 01/02 are light (var-driven,
 * hover-lift); card 03 is fixed-dark with the gold AETERNA accents.
 * Cards rise in a slow stagger as the section enters view; on hover the
 * card lifts, the border warms toward gold, and the arrow chip nudges.
 */
export function Services() {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <section id="services" aria-label="How we help" className="bg-[var(--va-paper)]">
      <div className="mx-auto max-w-[1280px] px-6 pb-[84px] pt-[96px] md:px-16">
        <MonoLabel className="mb-[22px] block !text-[11px] text-sage">
          {A.services.kicker}
        </MonoLabel>
        <h2
          className="max-w-[680px] font-display font-light leading-[1.08] tracking-[-0.01em] text-[var(--va-ink)]"
          style={{ fontSize: "clamp(32px, 4.6vw, 46px)" }}
        >
          {A.services.headline}
        </h2>

        <div ref={ref} className="mt-[54px] grid grid-cols-1 gap-6 md:grid-cols-3">
          {A.services.cards.map((card, i) => (
            <a
              key={card.no}
              href={CARD_HREFS[card.no] ?? "#scheduler"}
              data-reveal={revealAttr(inView)}
              className={cn(
                "group flex min-h-[300px] flex-col rounded-[6px] p-8 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-[6px]",
                card.dark
                  ? "bg-ink text-[#F6F1E7]"
                  : "border border-[var(--va-line)] bg-[var(--va-paper)] text-[var(--va-ink)] hover:border-[var(--va-gold)]",
              )}
              style={
                {
                  "--reveal-delay": `${i * 140}ms`,
                  boxShadow: card.dark
                    ? "0 24px 50px -22px rgba(20,28,23,.7)"
                    : "0 24px 50px -26px rgba(46,61,51,.5), 0 2px 5px rgba(46,61,51,.05)",
                } as React.CSSProperties
              }
            >
              {card.dark ? (
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-gold-light">
                    {card.no}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-[rgba(246,241,231,0.55)]">
                    {card.tag}
                  </span>
                </div>
              ) : (
                <span className="font-mono text-[11px] tracking-[0.16em] text-[var(--va-gold)]">
                  {card.no}
                </span>
              )}

              <h3 className="mt-7 font-display text-[27px] font-normal leading-[1.15]">
                {card.title}
              </h3>
              <p
                className={cn(
                  "mt-[15px] flex-1 text-[14.5px] leading-[1.65]",
                  card.dark
                    ? "text-[rgba(246,241,231,0.72)]"
                    : "text-[var(--va-muted)]",
                )}
              >
                {card.body}
              </p>
              <span
                aria-hidden
                className={cn(
                  "gt-arrow mt-[22px] flex h-10 w-10 items-center justify-center rounded-full text-[14px]",
                  card.dark
                    ? "bg-gold text-ink-deep"
                    : "bg-[var(--va-ink)] text-[var(--va-paper)]",
                )}
              >
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
